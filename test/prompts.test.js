import test from "node:test";
import assert from "node:assert/strict";
import { buildPrompt, getProfiles, profiles } from "../web/data/profiles.js";

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
  for (const host of ["codex", "claude", "antigravity"]) {
    for (const profile of getProfiles(host)) {
      for (const purpose of ["build", "fix", "plan", "review", "glisse"]) {
        assert.equal(
          buildPrompt({ ...task, host, purpose, profile: profile.slug }),
          `${host === "codex" ? "$kip" : "/kip"} ${purpose} --profile ${profile.slug} Fix mobile overflow.`,
        );
      }
    }
  }
});

test("profile selections remain portable while role models match the host", () => {
  const slugs = profiles.map(({ slug }) => slug);
  for (const host of ["claude", "antigravity"]) {
    assert.deepEqual(
      getProfiles(host).map(({ slug }) => slug),
      slugs,
    );
    for (const { roles } of getProfiles(host)) {
      assert.equal(roles.length, 4);
      assert.ok(roles.every((role) => !/Astra|Sol|Luna|gpt-/.test(role)));
    }
  }
  assert.equal(getProfiles("claude")[0].roles[0], "Opus / max");
  for (const { roles } of getProfiles("antigravity")) {
    assert.match(roles[0], /^(Pro|Flash) \/ (low|medium|high)$/);
    assert.ok(
      roles.slice(1).every((role) => /^(Pro|Flash) \/ inherited$/.test(role)),
    );
  }
  assert.throws(() => getProfiles("unknown"), /Unknown profile host/);
  assert.throws(() => getProfiles("toString"), /Unknown profile host/);
});

test("natural language includes selected profile and blank tasks have a placeholder", () => {
  assert.equal(
    buildPrompt({ ...task, purpose: "glisse", implicit: true }),
    "Use Kip with Glisse to Fix mobile overflow.",
  );
  assert.equal(
    buildPrompt({
      ...task,
      purpose: "glisse",
      implicit: true,
      profile: "value",
    }),
    "Use Kip with Glisse and the Value profile to Fix mobile overflow.",
  );
  assert.equal(
    buildPrompt({ ...task, implicit: true, profile: "strong-lead" }),
    "Use Kip with the Strong lead profile to fix: Fix mobile overflow.",
  );
  assert.equal(
    buildPrompt({ ...task, implicit: true }),
    "Use Kip to fix: Fix mobile overflow.",
  );
  assert.equal(
    buildPrompt({ ...task, task: "  " }),
    "$kip fix Describe your task",
  );
});
