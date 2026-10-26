import test from "node:test";
import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import {
  installSkills,
  inspectSkills,
  destinations,
  specialties,
} from "../src/install.js";
const execute = promisify(execFile);
const cli = fileURLToPath(new URL("../bin/kip.js", import.meta.url));
async function fixture(t) {
  const home = await fs.mkdtemp(path.join(os.tmpdir(), "kip-skills-"));
  t.after(() => fs.rm(home, { recursive: true, force: true }));
  return { home, codexHome: path.join(home, ".codex") };
}

test("installs self-contained skills for every host without external dependencies", async (t) => {
  const options = await fixture(t);
  const targets = await installSkills("all", options);
  assert.equal(targets.length, 5);
  const inspections = await inspectSkills("all", options);
  assert.ok(inspections.every((entry) => entry.ready));
  for (const target of targets) {
    for (const name of specialties) {
      assert.equal(
        await fs.readFile(
          path.join(target, "references", `${name}.md`),
          "utf8",
        ),
        await fs.readFile(
          new URL(`../skills/${name}/SKILL.md`, import.meta.url),
          "utf8",
        ),
      );
    }
    assert.ok((await fs.lstat(target)).isDirectory());
  }
});

test("isolates each host and respects CODEX_HOME", async (t) => {
  const options = await fixture(t);
  options.codexHome = path.join(options.home, "custom-codex");
  const targets = await installSkills("codex", options);
  assert.equal(targets[0], path.join(options.codexHome, "skills", "kip"));
  assert.equal((await inspectSkills("claude", options))[0].ready, false);
  assert.deepEqual(destinations("antigravity", options), [
    path.join(options.home, ".gemini/config/skills/kip"),
    path.join(options.home, ".gemini/antigravity-cli/skills/kip"),
  ]);
  assert.throws(() => destinations("unknown", options), /Unknown host/);
});

test("conflicts preserve existing content and prevent partial installation", async (t) => {
  const options = await fixture(t);
  const target = destinations("claude", options)[0];
  await fs.mkdir(target, { recursive: true });
  await fs.writeFile(path.join(target, "SKILL.md"), "user customization");
  await assert.rejects(installSkills("all", options), /already exists/);
  assert.equal(
    await fs.readFile(path.join(target, "SKILL.md"), "utf8"),
    "user customization",
  );
  assert.equal((await inspectSkills("codex", options))[0].ready, false);
});

test("CLI installs and diagnoses offline without Codex on PATH or credentials", async (t) => {
  const options = await fixture(t);
  const env = { HOME: options.home, CODEX_HOME: options.codexHome, PATH: "" };
  const args = ["--host", "codex"];
  await execute(process.execPath, [cli, "install", ...args], {
    env,
    cwd: options.home,
  });
  const { stdout } = await execute(process.execPath, [cli, "doctor", ...args], {
    env,
    cwd: options.home,
  });
  assert.ok(JSON.parse(stdout).every((entry) => entry.ready));
  await fs.rm(
    path.join(options.codexHome, "skills/kip/references/frontend.md"),
  );
  await assert.rejects(
    execute(process.execPath, [cli, "doctor", ...args], { env }),
    (error) => error.code === 1 && error.stdout.includes('"ready": false'),
  );
  for (const command of ["login", "status", "plan", "run"]) {
    await assert.rejects(
      execute(process.execPath, [cli, command, "test task"], { env }),
      (error) =>
        error.code === 1 && error.stderr.includes("inside your current chat"),
    );
  }
});
