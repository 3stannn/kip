import test from "node:test";
import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { pathToFileURL } from "node:url";
import { updateSkills } from "../src/update.js";
import { installSkills, refreshSkills, destinations } from "../src/install.js";

const execute = promisify(execFile);
async function git(cwd, ...args) {
  const { stdout } = await execute("git", args, { cwd });
  return stdout.trim();
}

async function fixture(t) {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "kip-update-"));
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  const remote = path.join(root, "remote.git");
  const sourceRoot = path.join(root, "clone with spaces");
  const publisher = path.join(root, "publisher");
  await fs.mkdir(sourceRoot);
  await git(root, "init", "--bare", remote);
  await git(sourceRoot, "init", "-b", "main");
  for (const name of ["bin", "src", "skills", "package.json"]) {
    await fs.cp(
      new URL(`../${name}`, import.meta.url),
      path.join(sourceRoot, name),
      { recursive: true },
    );
  }
  for (const cwd of [sourceRoot]) {
    await git(cwd, "config", "user.email", "test@example.invalid");
    await git(cwd, "config", "user.name", "Kip tests");
    await git(cwd, "config", "core.autocrlf", "false");
  }
  await git(sourceRoot, "add", ".");
  await git(sourceRoot, "commit", "-m", "Initial fixture");
  await git(sourceRoot, "remote", "add", "origin", remote);
  await git(sourceRoot, "push", "-u", "origin", "main");
  await git(root, "clone", "--branch", "main", remote, publisher);
  await git(publisher, "config", "user.email", "test@example.invalid");
  await git(publisher, "config", "user.name", "Kip tests");
  const options = {
    sourceRoot,
    home: path.join(root, "home"),
    codexHome: path.join(root, "home", ".codex"),
  };
  const installer = await import(
    pathToFileURL(path.join(sourceRoot, "src", "install.js")).href
  );
  const targets = await installer.installSkills("codex", options);
  async function publish(
    relative = "skills/kip/SKILL.md",
    addition = "\nUpdated fixture.\n",
  ) {
    await fs.appendFile(path.join(publisher, relative), addition);
    await git(publisher, "add", ".");
    await git(publisher, "commit", "-m", "Publish update");
    await git(publisher, "push");
  }
  return { root, options, targets, installer, publisher, publish };
}

test("pulls upstream, backs up custom edits, updates only the selected host", async (t) => {
  const { options, targets, installer, publish } = await fixture(t);
  const [claude] = await installer.installSkills("claude", options);
  await fs.appendFile(
    path.join(targets[0], "SKILL.md"),
    "\nLocal customization.\n",
  );
  await publish();
  const result = await updateSkills("codex", options);
  assert.notEqual(result.before, result.after);
  assert.equal(result.updated.length, 2);
  for (const { target, backup } of result.updated) {
    assert.match(
      await fs.readFile(path.join(target, "SKILL.md"), "utf8"),
      /Updated fixture/,
    );
    assert.equal(
      path.dirname(path.dirname(backup)),
      path.join(path.dirname(path.dirname(target)), "kip-backups"),
    );
    assert.equal(
      JSON.parse(
        await fs.readFile(path.join(target, "installation.json"), "utf8"),
      ).sourceRoot,
      options.sourceRoot,
    );
  }
  assert.match(
    await fs.readFile(path.join(result.updated[0].backup, "SKILL.md"), "utf8"),
    /Local customization/,
  );
  assert.doesNotMatch(
    await fs.readFile(path.join(claude, "SKILL.md"), "utf8"),
    /Updated fixture/,
  );
  const unchanged = await updateSkills("all", options);
  assert.equal(unchanged.before, unchanged.after);
  assert.equal(unchanged.updated.length, 3); // No new Antigravity installation.
  assert.ok(
    (await installer.inspectSkills("codex", options)).every(
      (entry) => entry.ready,
    ),
  );
});

test("dirty and untracked clone files stop updates before pulling or replacing skills", async (t) => {
  const { options, targets, publish } = await fixture(t);
  const before = await git(options.sourceRoot, "rev-parse", "HEAD");
  const original = await fs.readFile(path.join(targets[0], "SKILL.md"), "utf8");
  await publish();
  const local = path.join(options.sourceRoot, "local.txt");
  await fs.writeFile(local, "keep this");
  await assert.rejects(updateSkills("codex", options), /local changes/);
  assert.equal(await fs.readFile(local, "utf8"), "keep this");
  await fs.rm(local);
  await fs.appendFile(path.join(options.sourceRoot, "package.json"), "\n");
  await assert.rejects(updateSkills("codex", options), /local changes/);
  assert.equal(await git(options.sourceRoot, "rev-parse", "HEAD"), before);
  assert.equal(
    await fs.readFile(path.join(targets[0], "SKILL.md"), "utf8"),
    original,
  );
});

test("diverged branches and missing tracking branches leave installed skills alone", async (t) => {
  const { options, targets, publish } = await fixture(t);
  const original = await fs.readFile(path.join(targets[0], "SKILL.md"), "utf8");
  await fs.writeFile(
    path.join(options.sourceRoot, "local.txt"),
    "committed local work",
  );
  await git(options.sourceRoot, "add", ".");
  await git(options.sourceRoot, "commit", "-m", "Local branch work");
  const before = await git(options.sourceRoot, "rev-parse", "HEAD");
  await publish();
  await assert.rejects(updateSkills("codex", options), /Kip update stopped/);
  assert.equal(await git(options.sourceRoot, "rev-parse", "HEAD"), before);
  await git(options.sourceRoot, "branch", "--unset-upstream");
  await assert.rejects(updateSkills("codex", options), /Kip update stopped/);
  assert.equal(
    await fs.readFile(path.join(targets[0], "SKILL.md"), "utf8"),
    original,
  );
});

test("a broken upstream bundle fails staging without replacing installed skills", async (t) => {
  const { options, targets, publisher, publish } = await fixture(t);
  const original = await fs.readFile(path.join(targets[0], "SKILL.md"), "utf8");
  await fs.rm(path.join(publisher, "skills/frontend/SKILL.md"));
  await publish();
  await assert.rejects(updateSkills("codex", options), /ENOENT/);
  for (const target of targets) {
    assert.equal(
      await fs.readFile(path.join(target, "SKILL.md"), "utf8"),
      original,
    );
    await assert.rejects(
      fs.lstat(
        path.join(path.dirname(path.dirname(target)), ".kip-update.lock"),
      ),
      { code: "ENOENT" },
    );
  }
});

test("replacement failure rolls back every installed copy", async (t) => {
  const home = await fs.mkdtemp(path.join(os.tmpdir(), "kip-rollback-"));
  t.after(() => fs.rm(home, { recursive: true, force: true }));
  const options = { home, codexHome: path.join(home, ".codex") };
  const targets = await installSkills("codex", options);
  await fs.appendFile(
    path.join(targets[0], "SKILL.md"),
    "\nKeep custom content.\n",
  );
  const originals = await Promise.all(
    targets.map((target) => fs.readFile(path.join(target, "SKILL.md"), "utf8")),
  );
  const rename = fs.rename.bind(fs);
  let swaps = 0;
  t.mock.method(fs, "rename", async (from, to) => {
    if (path.basename(from) === "new" && ++swaps === 2)
      throw Error("Simulated rename failure");
    return rename(from, to);
  });
  await assert.rejects(
    refreshSkills("codex", options),
    /Simulated rename failure/,
  );
  for (const [index, target] of targets.entries()) {
    assert.equal(
      await fs.readFile(path.join(target, "SKILL.md"), "utf8"),
      originals[index],
    );
  }
});

test("updater refuses unrelated directories and respects update locks", async (t) => {
  const { options, targets } = await fixture(t);
  const lock = path.join(options.codexHome, ".kip-update.lock");
  await fs.writeFile(lock, "another updater");
  await assert.rejects(refreshSkills("codex", options), /Another update/);
  assert.equal(await fs.readFile(lock, "utf8"), "another updater");
  await fs.rm(lock);
  await fs.writeFile(path.join(targets[1], "SKILL.md"), "name: another-skill");
  await assert.rejects(refreshSkills("codex", options), /Not an installed Kip/);
  await assert.rejects(updateSkills("unknown", options), /Unknown host/);
  await assert.rejects(refreshSkills("claude", options), /No installed Kip/);
});

test("CLI update runs from a clone with spaces and reports backups", async (t) => {
  const { options, publish } = await fixture(t);
  await publish();
  const { stdout } = await execute(
    process.execPath,
    [path.join(options.sourceRoot, "bin/kip.js"), "update", "--host", "codex"],
    {
      cwd: options.home,
      env: {
        ...process.env,
        HOME: options.home,
        USERPROFILE: options.home,
        CODEX_HOME: options.codexHome,
      },
    },
  );
  assert.match(stdout, /Pulled/);
  assert.match(stdout, /Backup:/);
  assert.match(stdout, /Restart your host/);
  for (const target of destinations("codex", options)) {
    assert.match(
      await fs.readFile(path.join(target, "SKILL.md"), "utf8"),
      /Updated fixture/,
    );
  }
});
