import test from "node:test";
import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import {
  measure,
  compare,
  estimateTokens,
} from "../skills/kip/scripts/tokens.mjs";

const execute = promisify(execFile);
const helper = path.resolve("skills/kip/scripts/tokens.mjs");
const repeated =
  "- Run the full test suite before reporting any change as done.";

async function fixture(t) {
  const root = await fs.mkdtemp(path.join(process.cwd(), ".test-tokens-"));
  t.after(() =>
    fs.rm(root, {
      recursive: true,
      force: true,
      maxRetries: 3,
      retryDelay: 100,
    }),
  );
  await fs.writeFile(path.join(root, "AGENTS.md"), `# Rules\n${repeated}\n`);
  await fs.mkdir(path.join(root, ".claude/skills/demo"), { recursive: true });
  await fs.writeFile(
    path.join(root, ".claude/skills/demo/SKILL.md"),
    `---\nname: demo\ndescription: Demo skill.\n---\n\n# Demo\n${repeated}\nLong body text.\n`,
  );
  await fs.writeFile(path.join(root, ".claude/settings.json"), "{}");
  await fs.writeFile(path.join(root, "source.js"), "export {};");
  return root;
}

test("measures context files and splits every-session from on-demand cost", async (t) => {
  const root = await fixture(t);
  const result = await measure(root);
  assert.deepEqual(
    result.files.map(({ file }) => file),
    ["AGENTS.md", ".claude/skills/demo/SKILL.md"].sort(),
  );
  const agents = result.files.find(({ file }) => file === "AGENTS.md");
  assert.equal(agents.always, agents.tokens);
  assert.equal(agents.onDemand, 0);
  const skill = result.files.find(({ file }) => file.endsWith("SKILL.md"));
  assert.equal(
    skill.always,
    estimateTokens("---\nname: demo\ndescription: Demo skill.\n---\n"),
  );
  assert.ok(skill.onDemand > 0);
  assert.equal(result.totals.tokens, agents.tokens + skill.tokens);
  assert.equal(result.duplicates.length, 1);
  assert.equal(result.duplicates[0].places.length, 2);
});

test("compare reports the delta after trimming, including removed files", async (t) => {
  const root = await fixture(t);
  const baseline = await measure(root);
  await fs.writeFile(path.join(root, "AGENTS.md"), "# Rules\n");
  const result = compare(baseline, await measure(root));
  assert.ok(result.totals.delta.tokens < 0);
  assert.ok(result.totals.delta.always < 0);
  assert.equal(result.totals.delta.onDemand, 0);
  assert.deepEqual(
    result.changes.map(({ file }) => file),
    ["AGENTS.md"],
  );
});

test("CLI measures, compares against a saved baseline, and refuses escapes", async (t) => {
  const root = await fixture(t);
  const { stdout } = await execute(process.execPath, [
    helper,
    "measure",
    "--root",
    root,
    "--json",
  ]);
  const baselineFile = path.join(root, "baseline.json");
  await fs.writeFile(baselineFile, stdout);
  await fs.rm(path.join(root, ".claude"), { recursive: true });
  const compared = await execute(process.execPath, [
    helper,
    "compare",
    "--root",
    root,
    "--baseline",
    baselineFile,
  ]);
  assert.match(compared.stdout, /\.claude\/skills\/demo\/SKILL\.md: \d+ -> 0/);
  await assert.rejects(
    execute(process.execPath, [helper, "measure", "--root", root, "../"]),
    /escapes the project root/,
  );
});
