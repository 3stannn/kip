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
      for (const purpose of ["build", "fix", "plan", "review"]) {
        assert.equal(
          buildPrompt({ ...task, host, purpose, profile: profile.slug }),
          `${host === "codex" ? "$kip" : "/kip"} ${purpose} --profile ${profile.slug} Fix mobile overflow.`,
        );
      }
    }
  }
});

test("profile selections remain portable while role models match the host", () => {
  const slugs = ["maximum", "balanced", "value", "budget", "minimum-cost"];
  assert.deepEqual(
    profiles.map(({ slug }) => slug),
    slugs,
  );
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
  const expectedRoles = {
    codex: [
      ["Astra / ultra", "Astra / ultra", "Astra / high", "Astra / high"],
      ["Sol / high", "Sol / high", "Sol / medium", "Sol / medium"],
      ["Sol / high", "Sol / medium", "Luna / medium", "Luna / medium"],
      ["Sol / medium", "Luna / high", "Luna / low", "Luna / low"],
      ["Luna / medium", "Luna / medium", "Luna / low", "Luna / low"],
    ],
    claude: [
      ["Opus / max", "Opus / max", "Opus / high", "Opus / high"],
      ["Sonnet / high", "Sonnet / high", "Sonnet / medium", "Sonnet / medium"],
      ["Sonnet / high", "Sonnet / medium", "Haiku / medium", "Haiku / medium"],
      ["Sonnet / medium", "Haiku / high", "Haiku / low", "Haiku / low"],
      ["Haiku / medium", "Haiku / medium", "Haiku / low", "Haiku / low"],
    ],
    antigravity: [
      ["Pro / high", "Pro / inherited", "Pro / inherited", "Pro / inherited"],
      [
        "Pro / medium",
        "Pro / inherited",
        "Flash / inherited",
        "Flash / inherited",
      ],
      [
        "Pro / medium",
        "Flash / inherited",
        "Flash / inherited",
        "Flash / inherited",
      ],
      [
        "Flash / medium",
        "Flash / inherited",
        "Flash / inherited",
        "Flash / inherited",
      ],
      [
        "Flash / low",
        "Flash / inherited",
        "Flash / inherited",
        "Flash / inherited",
      ],
    ],
  };
  for (const [host, roles] of Object.entries(expectedRoles)) {
    assert.equal(getProfiles(host).length, 5);
    assert.deepEqual(
      getProfiles(host).map((profile) => profile.roles),
      roles,
    );
  }
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
    buildPrompt({ ...task, implicit: true, profile: "balanced" }),
    "Use Kip with the Balanced profile to fix: Fix mobile overflow.",
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
