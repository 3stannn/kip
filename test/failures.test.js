import test from "node:test";
import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";
import { install, prepare, run, defaults } from "../src/core.js";
import { authenticate, buildPrompt, checkCodex } from "../src/codex.js";

async function project(t) {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "kip-check-"));
  t.after(() => fs.rm(dir, { recursive: true, force: true }));
  await install(dir);
  return dir;
}
const loggedIn = { code: 0, stdout: "", stderr: "Logged in using ChatGPT" };
const success = [
  { type: "item.completed", item: { type: "agent_message", text: "OK" } },
  { type: "turn.completed", usage: { input_tokens: 1, output_tokens: 1 } },
]
  .map(JSON.stringify)
  .join("\n");

async function failureRecord(dir) {
  const files = await fs.readdir(path.join(dir, ".kip/runs"));
  assert.equal(files.length, 1);
  return JSON.parse(
    await fs.readFile(path.join(dir, ".kip/runs", files[0]), "utf8"),
  );
}

test("configuration errors give actionable messages before execution", async (t) => {
  const dir = await project(t);
  const configFile = path.join(dir, ".kip/config.json");
  for (const [config, pattern] of [
    [null, /version/],
    [[], /version/],
    [{ ...defaults, version: 999 }, /version/],
    [{ ...defaults, maxContextBytes: 0 }, /maxContextBytes/],
    [{ ...defaults, timeoutMs: 2 ** 31 }, /timer range/],
    [{ ...defaults, models: "bad" }, /models/],
    [{ ...defaults, models: { complex: 123 } }, /model/],
  ]) {
    await fs.writeFile(configFile, JSON.stringify(config));
    await assert.rejects(prepare(dir, "Check"), pattern);
  }
  await fs.writeFile(configFile, "{");
  await assert.rejects(prepare(dir, "Check"), /Invalid JSON/);
  await fs.unlink(configFile);
  await assert.rejects(prepare(dir, "Check"), /kip install/);
});

test("reinstall repairs missing skills and run ignore rule while preserving edits", async (t) => {
  const dir = await project(t);
  const skill = path.join(dir, ".kip/skills/token-efficiency/SKILL.md");
  const config = path.join(dir, ".kip/config.json");
  const custom = JSON.stringify({ ...defaults, timeoutMs: 12345 });
  await fs.writeFile(config, custom);
  await fs.writeFile(path.join(dir, ".kip/.gitignore"), "custom/");
  await fs.unlink(skill);
  await assert.rejects(
    prepare(dir, "Check"),
    /Missing skill token-efficiency.*kip install/,
  );
  await install(dir);
  assert.equal(await fs.readFile(config, "utf8"), custom);
  assert.equal(
    await fs.readFile(path.join(dir, ".kip/.gitignore"), "utf8"),
    "custom/\nruns/\n",
  );
  await install(dir);
  assert.equal(
    await fs.readFile(path.join(dir, ".kip/.gitignore"), "utf8"),
    "custom/\nruns/\n",
  );
  await prepare(dir, "Check");
});

test("file aliases cannot bypass secret and run-artifact exclusions", async (t) => {
  const dir = await project(t);
  for (const name of [".env", ".npmrc", "auth.json", "id_ed25519"]) {
    await fs.writeFile(path.join(dir, name), "secret");
    await fs.symlink(name, path.join(dir, `${name}.alias`));
    await assert.rejects(
      prepare(dir, "Check", { files: [`${name}.alias`] }),
      /Sensitive or excluded/,
    );
  }
  await fs.mkdir(path.join(dir, ".kip/runs"));
  await fs.writeFile(path.join(dir, ".kip/runs/old.json"), "private output");
  await fs.symlink(".kip/runs/old.json", path.join(dir, "output.txt"));
  await assert.rejects(
    prepare(dir, "Check", { files: ["output.txt"] }),
    /Sensitive or excluded/,
  );
});

test("regular text files are required and exact outgoing prompt bytes are budgeted", async (t) => {
  const dir = await project(t);
  await fs.writeFile(path.join(dir, "binary"), Buffer.from([65, 0, 66]));
  await fs.writeFile(path.join(dir, "invalid-utf8"), Buffer.from([0xff, 0xfe]));
  await fs.writeFile(path.join(dir, "text"), "Hello 世界");
  await assert.rejects(prepare(dir, "Check", { files: ["binary"] }), /Binary/);
  await assert.rejects(
    prepare(dir, "Check", { files: ["invalid-utf8"] }),
    /UTF-8/,
  );
  await assert.rejects(
    prepare(dir, "Check", { files: [".kip/skills"] }),
    /Not a regular file/,
  );
  const plan = await prepare(dir, "Check", { files: ["text", "text"] });
  assert.equal(plan.contextBytes, Buffer.byteLength(buildPrompt(plan.request)));
  assert.equal((plan.request.input.match(/"file":"text"/g) || []).length, 1);
  await fs.writeFile(
    path.join(dir, ".kip/config.json"),
    JSON.stringify({ ...defaults, maxContextBytes: plan.contextBytes - 1 }),
  );
  await assert.rejects(prepare(dir, "Check", { files: ["text"] }), /exceeds/);
});

test("oversized custom skills and absent CLI tasks fail before inference", async (t) => {
  const dir = await project(t);
  await assert.rejects(prepare(dir, "--file"), /task is required/);
  await fs.writeFile(
    path.join(dir, ".kip/skills/token-efficiency/SKILL.md"),
    "a".repeat(33000),
  );
  await assert.rejects(prepare(dir, "Check"), /File exceeds context limit/);
});

for (const [name, response, expected] of [
  [
    "stderr-only startup failure",
    { code: 1, stdout: "", stderr: "Unsupported flag --ignore-user-config" },
    /Unsupported flag/,
  ],
  [
    "malformed events",
    { code: 0, stdout: `${success}\nnot JSON`, stderr: "" },
    /invalid JSON/,
  ],
  [
    "invalid event shape",
    { code: 0, stdout: `${success}\nnull`, stderr: "" },
    /invalid JSON/,
  ],
  [
    "empty final message",
    { code: 0, stdout: success.replace('"OK"', '"  "'), stderr: "" },
    /without a completed response/,
  ],
  [
    "turn failure",
    {
      code: 0,
      stdout: `${success}\n${JSON.stringify({ type: "turn.failed", error: { message: "Quota exceeded" } })}`,
      stderr: "",
    },
    /Quota exceeded/,
  ],
  [
    "signal termination",
    { code: null, signal: "SIGTERM", stdout: "", stderr: "" },
    /SIGTERM/,
  ],
]) {
  test(`run records and explains ${name}`, async (t) => {
    const dir = await project(t);
    let calls = 0;
    await assert.rejects(
      run(dir, await prepare(dir, "Check"), {
        invokeImpl: async (args) => {
          calls++;
          return args[0] === "login" ? loggedIn : response;
        },
      }),
      expected,
    );
    assert.equal(calls, 2);
    const record = await failureRecord(dir);
    assert.equal(record.status, "failed");
    assert.match(record.error, expected);
    assert.ok(record.startedAt && record.finishedAt);
  });
}

test("transport failure preserves partial diagnostics and a run record without retry", async (t) => {
  const dir = await project(t);
  let calls = 0;
  await assert.rejects(
    run(dir, await prepare(dir, "Check"), {
      invokeImpl: async (args) => {
        calls++;
        if (args[0] === "login") return loggedIn;
        throw Object.assign(Error("Codex timed out"), {
          stdout: "partial event",
          stderr: "connection failed",
        });
      },
    }),
    /timed out/,
  );
  const record = await failureRecord(dir);
  assert.equal(record.stderr, "connection failed");
  assert.equal(record.stdout, "partial event");
  assert.equal(calls, 2);
});

test("status rejects API authentication and doctor detects incompatible CLI without inference", async () => {
  await assert.rejects(
    authenticate("status", async () => ({
      code: 0,
      stdout: "Logged in using an API key",
      stderr: "",
    })),
    /ChatGPT sign-in required/,
  );
  await assert.rejects(
    authenticate("status", async () => ({
      code: 1,
      stdout: "ChatGPT login failed",
      stderr: "",
    })),
    /ChatGPT sign-in required/,
  );
  await assert.rejects(
    checkCodex(async () => ({
      code: 0,
      stdout: "--json --ephemeral",
      stderr: "",
    })),
    /incompatible/,
  );
  const calls = [];
  await checkCodex(async (args) => {
    calls.push(args);
    return args[0] === "login"
      ? loggedIn
      : {
          code: 0,
          stdout: "--json --ephemeral --ignore-user-config --ignore-rules",
          stderr: "",
        };
  });
  assert.deepEqual(calls, [
    ["exec", "--help"],
    ["login", "status"],
  ]);
});
