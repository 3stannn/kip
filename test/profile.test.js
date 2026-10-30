import test from "node:test";
import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { installSkills, inspectSkills } from "../src/install.js";
import {
  profileNames,
  resolveProfile,
} from "../skills/kip/scripts/profile.mjs";

const execute = promisify(execFile);

async function fixture(t) {
  const home = await fs.mkdtemp(path.join(os.tmpdir(), "kip-profile-"));
  t.after(() => fs.rm(home, { recursive: true, force: true }));
  const [installed] = await installSkills("claude", { home });
  const root = path.join(home, "project with spaces");
  await fs.mkdir(root);
  const run = async (action, value, project = root) => {
    const args = [path.join(installed, "scripts/profile.mjs"), action];
    if (value !== undefined) args.push(value);
    const result = await execute(
      process.execPath,
      [...args, "--root", project],
      { cwd: home },
    );
    return JSON.parse(result.stdout);
  };
  return { home, installed, root, run };
}

test("installed helper restores project selection across fresh processes and resets", async (t) => {
  const { home, root, run } = await fixture(t);
  assert.equal((await run("show")).profile, null);
  assert.equal((await run("show")).persisted, false);
  assert.equal(Object.hasOwn(await run("show"), "migratedFrom"), false);
  await assert.rejects(fs.stat(path.join(root, ".kip")), { code: "ENOENT" });
  await fs.mkdir(path.join(root, ".kip"));
  await fs.writeFile(path.join(root, ".kip/config.json"), "legacy settings");
  await fs.writeFile(path.join(root, ".kip/.gitignore"), "runs/");
  assert.equal((await run("select", "Balanced")).profile, "balanced");
  assert.equal((await run("show")).profile, "balanced");
  assert.equal((await run("show")).persisted, true);
  assert.equal(Object.hasOwn(await run("show"), "migratedFrom"), false);
  const other = path.join(home, "other project");
  await fs.mkdir(other);
  assert.equal((await run("show", undefined, other)).profile, null);
  assert.equal((await run("select", "3")).profile, "value");
  const before = await fs.readFile(
    path.join(root, ".kip/profile.json"),
    "utf8",
  );
  await assert.rejects(run("select", "unknown"), /Unknown profile/);
  assert.equal(
    await fs.readFile(path.join(root, ".kip/profile.json"), "utf8"),
    before,
  );
  await run("reset");
  assert.equal((await run("show")).profile, null);
  assert.equal(
    await fs.readFile(path.join(root, ".kip/config.json"), "utf8"),
    "legacy settings",
  );
  assert.equal(
    await fs.readFile(path.join(root, ".kip/.gitignore"), "utf8"),
    "runs/\n/profile.json\n",
  );
});

test("five active profiles resolve names and numbers in order", () => {
  assert.deepEqual(profileNames, [
    "maximum",
    "balanced",
    "value",
    "budget",
    "minimum-cost",
  ]);
  for (const [index, name] of profileNames.entries()) {
    assert.equal(resolveProfile(String(index + 1)), name);
    assert.equal(resolveProfile(name.replaceAll("-", " ").toUpperCase()), name);
  }
  for (const removed of ["premium", "Strong Lead", "6", "7", "0"]) {
    assert.throws(() => resolveProfile(removed), /Unknown profile.*1–5/);
  }
});

test("retired saved profiles resolve to maximum without rewriting memory", async (t) => {
  const { root, run } = await fixture(t);
  await run("select", "value");
  const file = path.join(root, ".kip/profile.json");
  for (const retired of ["premium", "strong-lead"]) {
    const original = JSON.stringify({ version: 1, profile: retired });
    await fs.writeFile(file, original);
    const shown = await run("show");
    assert.equal(shown.profile, "maximum");
    assert.equal(shown.migratedFrom, retired);
    assert.equal(shown.persisted, true);
    assert.equal(await fs.readFile(file, "utf8"), original);
    await assert.rejects(run("select", retired), /Unknown profile/);
    assert.equal(await fs.readFile(file, "utf8"), original);
    const selected = await run("select", "balanced");
    assert.equal(selected.profile, "balanced");
    assert.equal(Object.hasOwn(selected, "migratedFrom"), false);
    assert.equal(Object.hasOwn(await run("show"), "migratedFrom"), false);
    assert.equal(
      JSON.parse(await fs.readFile(file, "utf8")).profile,
      "balanced",
    );
    await fs.writeFile(file, original);
    const reset = await run("reset");
    assert.equal(Object.hasOwn(reset, "migratedFrom"), false);
    assert.deepEqual(JSON.parse(await fs.readFile(file, "utf8")), {
      version: 1,
      profile: null,
    });
  }
});

test("invalid or unfamiliar memory is preserved instead of overwritten", async (t) => {
  const { root, run } = await fixture(t);
  await run("select", "value");
  const file = path.join(root, ".kip/profile.json");
  for (const content of [
    "{bad",
    '{"version":2,"profile":"value"}',
    '{"version":1,"profile":"unknown"}',
    '{"version":1,"profile":["premium"]}',
    '{"version":1,"profile":"value","delegate":true}',
  ]) {
    await fs.writeFile(file, content);
    await assert.rejects(run("select", "budget"));
    await assert.rejects(run("reset"));
    assert.equal(await fs.readFile(file, "utf8"), content);
  }
});

test("linked profile directories cannot mutate another project", async (t) => {
  const { home, root, run } = await fixture(t);
  const outside = path.join(home, "outside");
  await fs.mkdir(outside);
  await fs.symlink(
    outside,
    path.join(root, ".kip"),
    process.platform === "win32" ? "junction" : "dir",
  );
  await assert.rejects(run("select", "value"), /regular directory/);
  assert.deepEqual(await fs.readdir(outside), []);
});

test("doctor detects missing profile helper and orchestration reference", async (t) => {
  const { home, installed } = await fixture(t);
  await fs.rm(path.join(installed, "scripts/profile.mjs"));
  await fs.rm(path.join(installed, "references/orchestration.md"));
  const [inspection] = await inspectSkills("claude", { home });
  assert.equal(inspection.ready, false);
  assert.deepEqual(inspection.missing.sort(), [
    "references/orchestration.md",
    "scripts/profile.mjs",
  ]);
});
