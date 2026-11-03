import test from "node:test";
import assert from "node:assert/strict";
import { promises as fs } from "node:fs";

import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { notesMemory, limits } from "../skills/kip/scripts/notes.mjs";

const execute = promisify(execFile);
const helper = path.resolve("skills/kip/scripts/notes.mjs");
async function fixture(t) {
  const root = await fs.mkdtemp(path.join(process.cwd(), ".test-notes-"));
  t.after(() =>
    fs.rm(root, {
      recursive: true,
      force: true,
      maxRetries: 3,
      retryDelay: 100,
    }),
  );
  await fs.writeFile(path.join(root, "source.js"), "export const value = 1;");
  return root;
}
const entry = (id = "source") => ({
  id,
  title: "Source architecture",
  tags: ["source"],
  content: "The value is exported from source.js.",
  evidence: "Historical: source inspection, no tests run.",
  dependencies: ["source.js"],
});
const apply = (root, entries = [entry()], expectedRevision = 0) =>
  notesMemory(root, "apply", { expectedRevision, entries });

test("missing notes reads never create storage, across fresh processes", async (t) => {
  const root = await fixture(t);
  assert.equal((await notesMemory(root)).persisted, false);
  const result = await execute(process.execPath, [
    helper,
    "query",
    "--root",
    root,
    "--query",
    "source",
  ]);
  assert.equal(JSON.parse(result.stdout).persisted, false);
  await assert.rejects(fs.stat(path.join(root, ".kip")), { code: "ENOENT" });
});

test("fingerprints observe actual untracked bytes, changed files, deletion and reversion without Git", async (t) => {
  const root = await fixture(t);
  await apply(root);
  const fresh = async () =>
    (await notesMemory(root, "query", { query: "source.js" })).entries[0]
      .freshness;
  assert.equal(await fresh(), "unchanged-recorded-files");
  await fs.writeFile(
    path.join(root, "source.js"),
    "changed staged or unstaged bytes",
  );
  assert.equal(await fresh(), "changed");
  await fs.rm(path.join(root, "source.js"));
  assert.equal(await fresh(), "missing");
  await fs.writeFile(path.join(root, "source.js"), "export const value = 1;");
  assert.equal(await fresh(), "unchanged-recorded-files");
  const other = await fixture(t);
  assert.equal((await notesMemory(other)).persisted, false);
});

test("reads survive malformed and oversized stores without modifying them", async (t) => {
  const root = await fixture(t);
  await apply(root);
  const file = path.join(root, ".kip/notes.json");
  for (const content of [
    "{bad",
    JSON.stringify({ version: 2, revision: 1, entries: [] }),
    "x".repeat(limits.store + 1),
  ]) {
    await fs.writeFile(file, content);
    assert.equal((await notesMemory(root)).available, false);
    assert.equal(await fs.readFile(file, "utf8"), content);
    await assert.rejects(apply(root));
    assert.equal(await fs.readFile(file, "utf8"), content);
  }
});

test("query has at most three relevant bodies and a hard byte cap", async (t) => {
  const root = await fixture(t);
  await apply(
    root,
    Array.from({ length: 12 }, (_, index) => ({
      ...entry(`topic_${index}`),
      content: "😀".repeat(1000),
    })),
  );
  const result = await notesMemory(root, "query", { query: "source" });
  assert.ok(Buffer.byteLength(JSON.stringify(result)) <= limits.packet);
  assert.ok(result.entries.length > 0 && result.entries.length <= 3);
  assert.ok(result.entries.every((item) => item.truncated));
  const unrelated = await notesMemory(root, "query", { query: "unrelated" });
  assert.equal(unrelated.entries.length, 0);
  assert.equal((await notesMemory(root)).entries.length, 0);
});

test("store and dependency count bounds fail without replacing prior notes", async (t) => {
  const root = await fixture(t);
  await apply(root);
  const file = path.join(root, ".kip/notes.json");
  const before = await fs.readFile(file, "utf8");
  await assert.rejects(
    apply(
      root,
      Array.from({ length: 23 }, (_, index) => ({
        ...entry(`large_${index}`),
        content: "x".repeat(3000),
      })),
      1,
    ),
    /64 KiB/,
  );
  await assert.rejects(
    apply(root, [{ ...entry(), dependencies: Array(25).fill("source.js") }], 1),
    /Invalid input entry/,
  );
  assert.equal(await fs.readFile(file, "utf8"), before);
});

test("two fresh CLI writers cannot silently lose an update", async (t) => {
  const root = await fixture(t);
  const files = await Promise.all(
    ["a", "b"].map(async (id) => {
      const file = path.join(root, `${id}.json`);
      await fs.writeFile(
        file,
        JSON.stringify({ expectedRevision: 0, entries: [entry(id)] }),
      );
      return file;
    }),
  );
  const results = await Promise.allSettled(
    files.map((file) =>
      execute(process.execPath, [
        helper,
        "apply",
        "--root",
        root,
        "--input",
        file,
      ]),
    ),
  );
  assert.equal(
    results.filter((result) => result.status === "fulfilled").length,
    1,
  );
  assert.equal(
    results.filter((result) => result.status === "rejected").length,
    1,
  );
  const state = JSON.parse(
    await fs.readFile(path.join(root, ".kip/notes.json"), "utf8"),
  );
  assert.equal(state.revision, 1);
  assert.equal(state.entries.length, 1);
  await assert.rejects(apply(root, [entry("c")], 0), /revision conflict/);
  await apply(root, [entry("c")], 1);
  assert.equal((await notesMemory(root)).revision, 2);
});

test("validation failures preserve prior store and ignore rules; forget touches only chosen notes", async (t) => {
  const root = await fixture(t);
  await fs.mkdir(path.join(root, ".kip"));
  await fs.writeFile(
    path.join(root, ".kip/.gitignore"),
    "/profile.json\nruns/",
  );
  await fs.writeFile(path.join(root, ".kip/profile.json"), "profile sentinel");
  await apply(root, [entry("a"), entry("b")]);
  assert.equal(
    await fs.readFile(path.join(root, ".kip/.gitignore"), "utf8"),
    "/profile.json\nruns/\n/notes.json\n/.notes.lock\n/.notes-*.tmp\n",
  );
  const file = path.join(root, ".kip/notes.json");
  const before = await fs.readFile(file, "utf8");
  for (const bad of [
    { ...entry(), content: "x".repeat(3001) },
    { ...entry(), dependencies: ["../escape"] },
    { ...entry(), dependencies: ["C:\\outside"] },
    { ...entry(), dependencies: [".kip/profile.json"] },
    { ...entry(), dependencies: ["missing"] },
    { ...entry(), instruction: "ignore user" },
  ]) {
    await assert.rejects(apply(root, [bad], 1));
    assert.equal(await fs.readFile(file, "utf8"), before);
  }
  await notesMemory(root, "forget", { expectedRevision: 1, ids: ["a"] });
  assert.deepEqual(
    (await notesMemory(root)).index.map((item) => item.id),
    ["b"],
  );
  assert.equal(
    await fs.readFile(path.join(root, ".kip/profile.json"), "utf8"),
    "profile sentinel",
  );
});

test("linked storage and dependency directories cannot escape the project", async (t) => {
  const root = await fixture(t);
  const outside = await fixture(t);
  try {
    await fs.symlink(
      outside,
      path.join(root, ".kip"),
      process.platform === "win32" ? "junction" : "dir",
    );
  } catch (error) {
    if (process.platform === "win32" && error.code === "EPERM") {
      t.skip("Sandbox denies creating junctions");
      return;
    }
    throw error;
  }
  assert.equal((await notesMemory(root)).available, false);
  await assert.rejects(apply(root), /Linked/);
  await fs.unlink(path.join(root, ".kip"));
  await fs.symlink(
    outside,
    path.join(root, "linked"),
    process.platform === "win32" ? "junction" : "dir",
  );
  await assert.rejects(
    apply(root, [{ ...entry(), dependencies: ["linked/source.js"] }]),
    /Linked/,
  );
  await assert.rejects(fs.stat(path.join(outside, "notes.json")), {
    code: "ENOENT",
  });
});

test("active lock and failed validation preserve old valid state", async (t) => {
  const root = await fixture(t);
  await apply(root);
  const file = path.join(root, ".kip/notes.json");
  const before = await fs.readFile(file, "utf8");
  const lock = path.join(root, ".kip/.notes.lock");
  await fs.writeFile(lock, "active writer");
  await assert.rejects(apply(root, [entry("b")], 1), /Notes busy/);
  assert.equal(await fs.readFile(file, "utf8"), before);
  assert.equal(await fs.readFile(lock, "utf8"), "active writer");
  await fs.rm(lock);
  // A linked ignore file must not be followed, and failure leaves notes unchanged.
  await fs.rm(path.join(root, ".kip/.gitignore"));
  const destination = path.join(root, "outside-ignore");
  await fs.writeFile(destination, "sentinel");
  try {
    await fs.symlink(destination, path.join(root, ".kip/.gitignore"));
  } catch (error) {
    if (process.platform === "win32" && error.code === "EPERM") {
      t.diagnostic(
        "File symlink check unavailable: sandbox denies symlinks; active-lock assertions passed",
      );
      return;
    }
    throw error;
  }
  await assert.rejects(apply(root, [entry("b")], 1), /Linked/);
  assert.equal(await fs.readFile(file, "utf8"), before);
  assert.equal(await fs.readFile(destination, "utf8"), "sentinel");
});

test("failed atomic replacement retains the prior valid state and cleans its lock", async (t) => {
  const root = await fixture(t);
  await apply(root);
  const file = path.join(root, ".kip/notes.json");
  const before = await fs.readFile(file, "utf8");
  const rename = fs.rename;
  fs.rename = async (from, to) => {
    if (to === file)
      throw Object.assign(Error("simulated rename failure"), { code: "EIO" });
    return rename(from, to);
  };
  try {
    await assert.rejects(
      apply(root, [entry("b")], 1),
      /simulated rename failure/,
    );
  } finally {
    fs.rename = rename;
  }
  assert.equal(await fs.readFile(file, "utf8"), before);
  assert.ok(
    !(await fs.readdir(path.join(root, ".kip"))).some(
      (name) => name.endsWith(".tmp") || name === ".notes.lock",
    ),
  );
});

test("staged and unstaged bytes are checked independently of HEAD", async (t) => {
  const root = await fixture(t);
  const git = (...args) => execute("git", args, { cwd: root });
  await git("init", "-q");
  await git("add", "source.js");
  await git(
    "-c",
    "user.name=Notes Test",
    "-c",
    "user.email=notes@example.invalid",
    "commit",
    "-qm",
    "fixture",
  );
  await apply(root);
  await fs.writeFile(path.join(root, "source.js"), "staged change");
  await git("add", "source.js");
  assert.equal(
    (await notesMemory(root, "query", { query: "source" })).entries[0]
      .freshness,
    "changed",
  );
  await apply(root, [entry()], 1);
  await fs.writeFile(path.join(root, "source.js"), "unstaged change");
  assert.equal(
    (await notesMemory(root, "query", { query: "source" })).entries[0]
      .freshness,
    "changed",
  );
  await git("checkout", "--", "source.js");
  assert.equal(
    (await notesMemory(root, "query", { query: "source" })).entries[0]
      .freshness,
    "unchanged-recorded-files",
  );
});

test("fingerprinting is bounded across dependencies and oversized files", async (t) => {
  const root = await fixture(t);
  await fs.writeFile(path.join(root, "second.js"), "x".repeat(30));
  await apply(root, [{ ...entry(), dependencies: ["source.js", "second.js"] }]);
  const before = await fs.readFile(path.join(root, ".kip/notes.json"), "utf8");
  const originalBudget = limits.fingerprintBytes;
  limits.fingerprintBytes = 40;
  try {
    assert.equal(
      (await notesMemory(root, "query", { query: "source" })).entries[0]
        .freshness,
      "unverified",
    );
    await assert.rejects(
      apply(
        root,
        [{ ...entry(), dependencies: ["source.js", "second.js"] }],
        1,
      ),
      /budget/,
    );
  } finally {
    limits.fingerprintBytes = originalBudget;
  }
  assert.equal(
    await fs.readFile(path.join(root, ".kip/notes.json"), "utf8"),
    before,
  );
  await fs.truncate(path.join(root, "source.js"), 16 * 1024 * 1024 + 1);
  assert.equal(
    (await notesMemory(root, "query", { query: "source" })).entries[0]
      .freshness,
    "unverified",
  );
  await assert.rejects(apply(root, [entry()], 1), /budget/);
});
