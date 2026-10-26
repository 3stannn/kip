import test from "node:test";
import assert from "node:assert/strict";
import { getCompletions } from "../web/data/completions.js";
import { profiles } from "../web/data/profiles.js";

test("suggests invocations and filters command prefixes for either host", () => {
  assert.equal(getCompletions("/ki", 3, "/kip")[0].text, "/kip ");
  for (const prefix of ["$kip", "/kip"]) {
    assert.deepEqual(
      getCompletions(`${prefix} p`).map((item) => item.label),
      ["plan", "profiles", "profile"],
    );
    assert.equal(getCompletions(`${prefix} bu`)[0].text, `${prefix} build `);
    assert.equal(getCompletions(`${prefix} `).length, 6);
  }
});

test("suggests all profile names and reset only for saved selection", () => {
  assert.deepEqual(
    getCompletions("$kip profile ").map((item) => item.label),
    [...profiles.map((profile) => profile.slug), "reset"],
  );
  assert.equal(
    getCompletions("$kip profile str")[0].text,
    "$kip profile strong-lead ",
  );
  assert.equal(
    getCompletions("$kip profile re")[0].text,
    "$kip profile reset ",
  );
  assert.equal(getCompletions("$kip build --profile re").length, 0);
});

test("offers task override flags and profile values before freeform task text", () => {
  for (const purpose of ["build", "fix", "plan", "review"]) {
    assert.equal(
      getCompletions(`$kip ${purpose} --`)[0].text,
      `$kip ${purpose} --profile `,
    );
    assert.equal(getCompletions(`$kip ${purpose} --profile `).length, 7);
    assert.equal(
      getCompletions(`$kip ${purpose} --profile val`)[0].text,
      `$kip ${purpose} --profile value `,
    );
    assert.equal(
      getCompletions(`$kip ${purpose} --profile value Fix the bug`).length,
      0,
    );
  }
  for (const text of [
    "$kip profiles ",
    "$kip build Fix profile bugs",
    "Use Kip to build",
    "$kip profile value ",
    "$other ",
  ]) {
    assert.equal(getCompletions(text).length, 0);
  }
});

test("completion replaces the word at the cursor without losing task text", () => {
  const text = "$kip build --profile balnced Fix a bug";
  const result = getCompletions(text, text.indexOf("balnced") + 3)[0];
  assert.equal(result.text, "$kip build --profile balanced Fix a bug");
  assert.equal(result.caret, result.text.indexOf("Fix"));
});
