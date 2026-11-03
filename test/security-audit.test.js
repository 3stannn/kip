import test from "node:test";
import assert from "node:assert/strict";
import { promises as fs, constants } from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import findings from "../skills/kip/vendor/security-audit/validate-findings.cjs";
import coverage from "../skills/kip/vendor/security-audit/validate-coverage-ledger.cjs";
import schema from "../skills/kip/vendor/security-audit/report-schema.json" with { type: "json" };

const execute = promisify(execFile);

test("bundled validators reject malformed records without confusing unresolved evidence with confirmation", () => {
  assert.deepEqual(findings.validateDocument([], schema), []);
  assert.ok(
    findings.validateDocument(
      [{ verdict: "confirmed", title: "Missing evidence" }],
      schema,
    ).length,
  );
  assert.ok(
    findings.validateDocument(
      [{ verdict: "needs_validation", severity: "high" }],
      schema,
    ).length,
  );
  assert.ok(
    coverage.validateDocument({ units: [{ status: "covered" }] }).length,
  );
});

test("validator CLI preserves fail-closed behavior when safe input-open flags are unavailable", async (t) => {
  const directory = await fs.mkdtemp(
    path.join(os.tmpdir(), "kip-audit-capability-"),
  );
  t.after(() => fs.rm(directory, { recursive: true, force: true }));
  const input = path.join(directory, "findings.json");
  await fs.writeFile(input, "[]\n");
  const args = [
    path.resolve("skills/kip/vendor/security-audit/validate-findings.cjs"),
    input,
  ];
  const supported =
    Number.isInteger(constants.O_NOFOLLOW) &&
    constants.O_NOFOLLOW !== 0 &&
    Number.isInteger(constants.O_NONBLOCK) &&
    constants.O_NONBLOCK !== 0;
  if (supported) {
    const { stdout } = await execute(process.execPath, args);
    assert.match(stdout, /PASS/);
  } else {
    await assert.rejects(execute(process.execPath, args), (error) => {
      assert.equal(error.code, 1);
      assert.match(
        error.stderr,
        /OS no-follow and nonblocking input protection is unavailable/,
      );
      return true;
    });
    t.diagnostic(
      "Full upstream CLI validation unavailable on this host; static/in-memory results cannot complete an audit.",
    );
  }
  assert.equal(await fs.readFile(input, "utf8"), "[]\n");
});
