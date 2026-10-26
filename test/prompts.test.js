import test from "node:test";
import assert from "node:assert/strict";
import { buildPrompt, profiles } from "../web/data/profiles.js";

const task = {
  task: " Fix mobile overflow. ",
  purpose: "fix",
  host: "codex",
  implicit: false,
  profile: "",
};

test("host defaults omit profile overrides and preserve host invocation", () => {
  assert.equal(buildPrompt(task), "$kip fix Fix mobile overflow.");
  for (const host of ["claude", "antigravity"]) {
    assert.equal(
      buildPrompt({ ...task, host }),
      "/kip fix Fix mobile overflow.",
    );
  }
});

test("every profile generates a task override for each purpose", () => {
  for (const profile of profiles) {
    for (const purpose of ["build", "fix", "plan", "review"]) {
      assert.equal(
        buildPrompt({ ...task, purpose, profile: profile.slug }),
        `$kip ${purpose} --profile ${profile.slug} Fix mobile overflow.`,
      );
    }
  }
});

test("natural language includes selected profile and blank tasks have a placeholder", () => {
  assert.equal(
    buildPrompt({ ...task, implicit: true, profile: "strong-lead" }),
    "Use Kip to fix with the Strong lead profile — Fix mobile overflow.",
  );
  assert.equal(
    buildPrompt({ ...task, implicit: true }),
    "Use Kip to fix — Fix mobile overflow.",
  );
  assert.equal(
    buildPrompt({ ...task, task: "  " }),
    "$kip fix Describe your task",
  );
});
