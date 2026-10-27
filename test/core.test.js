import test from "node:test";
import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";
import { install, prepare, run, route, safePath } from "../src/core.js";
async function project(t) {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "kip-"));
  t.after(() => fs.rm(dir, { recursive: true, force: true }));
  await install(dir);
  return dir;
}
test("install preserves custom settings and skill edits", async (t) => {
  const dir = await project(t);
  const file = path.join(dir, ".kip/skills/frontend/SKILL.md");
  await fs.writeFile(file, "custom");
  await install(dir);
  assert.equal(await fs.readFile(file, "utf8"), "custom");
});
test("routing selects relevant skills without loading all specialties", () => {
  assert.ok(route("Build a React login").includes("security"));
  assert.ok(route("Standardize our Tailwind theme").includes("frontend"));
  assert.ok(route("Configure Better Auth sessions").includes("backend"));
  assert.ok(route("Configure Better Auth sessions").includes("security"));
  assert.ok(route("Use Keyline Icons").includes("frontend"));
  assert.ok(route("Use Keyline Icons").includes("frontend-design"));
  assert.ok(!route("Explain sorting").includes("frontend"));
  assert.throws(() => route("task", ["unknown"]));
});
test("context rejects escape, secrets, symlinks and budget excess", async (t) => {
  const dir = await project(t);
  await assert.rejects(safePath(dir, "../outside"));
  await fs.symlink(os.tmpdir(), path.join(dir, "escape"));
  await assert.rejects(safePath(dir, "escape/file"));
  await assert.rejects(prepare(dir, "inspect", { files: [".env"] }));
  await fs.writeFile(path.join(dir, "big.js"), "a".repeat(33000));
  await assert.rejects(prepare(dir, "inspect", { files: ["big.js"] }));
});

function mockCodex(extra = {}) {
  return async (args, options) => {
    if (args[0] === "login")
      return { code: 0, stdout: "Logged in using ChatGPT", stderr: "" };
    assert.ok(args.includes("--ignore-user-config"));
    assert.ok(args.includes('forced_login_method="chatgpt"'));
    assert.ok(args.includes("read-only"));
    assert.ok(options.input.includes("Fix bug"));
    return {
      code: 0,
      stderr: "",
      stdout: [
        { type: "thread.started", thread_id: "mock" },
        {
          type: "item.completed",
          item: { type: "agent_message", text: "patch" },
        },
        {
          type: "turn.completed",
          usage: { input_tokens: 100, output_tokens: 20 },
        },
      ]
        .map(JSON.stringify)
        .join("\n"),
      ...extra,
    };
  };
}
test("account runner saves output and usage without an API key", async (t) => {
  const dir = await project(t);
  const plan = await prepare(dir, "Fix bug");
  assert.equal(plan.request.model, null);
  const result = await run(dir, plan, { invokeImpl: mockCodex() });
  assert.equal(result.text, "patch");
  assert.equal(result.provider, "codex-chatgpt");
  assert.equal(
    JSON.parse(await fs.readFile(result.output)).usage.input_tokens,
    100,
  );
});
test("API-key sign-in is rejected before inference", async (t) => {
  const dir = await project(t);
  let calls = 0;
  await assert.rejects(
    run(dir, await prepare(dir, "Fix bug"), {
      invokeImpl: async () => {
        calls++;
        return { code: 0, stdout: "Logged in using an API key", stderr: "" };
      },
    }),
    /ChatGPT sign-in required/,
  );
  assert.equal(calls, 1);
});
test("failed turns are recorded without retrying", async (t) => {
  const dir = await project(t);
  let calls = 0;
  const mock = mockCodex({ code: 1 });
  await assert.rejects(
    run(dir, await prepare(dir, "Fix bug"), {
      invokeImpl: async (...args) => {
        calls++;
        return mock(...args);
      },
    }),
    /failed/,
  );
  assert.equal(calls, 2);
  assert.equal((await fs.readdir(path.join(dir, ".kip/runs"))).length, 1);
});
test("legacy API model settings migrate to account default at runtime", async (t) => {
  const dir = await project(t);
  const file = path.join(dir, ".kip/config.json");
  const config = JSON.parse(await fs.readFile(file));
  config.version = 1;
  config.models = { standard: "gpt-4.1-mini" };
  await fs.writeFile(file, JSON.stringify(config));
  assert.equal((await prepare(dir, "Fix bug")).request.model, null);
});
test("provider credentials are removed from child environment", async () => {
  const { accountEnvironment } = await import("../src/codex.js");
  const env = accountEnvironment({
    PATH: "bin",
    OPENAI_API_KEY: "secret",
    CODEX_API_KEY: "secret",
    CODEX_ACCESS_TOKEN: "secret",
    OPENAI_BASE_URL: "custom",
  });
  assert.deepEqual(env, { PATH: "bin" });
});

test("responsive skill routes for viewport and frontend tasks without unrelated overhead", async (t) => {
  for (const task of [
    "Fix mobile overflow",
    "Improve responsiveness for all viewports",
    "Build React component",
    "Design a landing page",
  ]) {
    assert.ok(route(task).includes("responsive-design"), task);
  }
  assert.ok(!route("Optimize database query").includes("responsive-design"));
  assert.ok(route("Review this", ["frontend"]).includes("responsive-design"));
  const dir = await project(t);
  const plan = await prepare(dir, "Fix narrow viewport layout");
  assert.ok(plan.skills.includes("responsive-design"));
  assert.ok(plan.request.instructions.includes("# Responsive Design"));
  assert.ok(
    route("Review this", ["responsive-design"]).includes("responsive-design"),
  );
});
