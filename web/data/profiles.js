export const profiles = [
  {
    name: "Maximum",
    slug: "maximum",
    roles: ["Astra / ultra", "Astra / ultra", "Astra / high", "Astra / high"],
  },
  {
    name: "Premium",
    slug: "premium",
    roles: ["Astra / xhigh", "Astra / high", "Sol / high", "Sol / high"],
  },
  {
    name: "Strong lead",
    slug: "strong-lead",
    roles: ["Astra / high", "Sol / high", "Sol / medium", "Sol / medium"],
  },
  {
    name: "Balanced",
    slug: "balanced",
    roles: ["Sol / high", "Sol / high", "Sol / medium", "Sol / medium"],
  },
  {
    name: "Value",
    slug: "value",
    roles: ["Sol / high", "Sol / medium", "Luna / medium", "Luna / medium"],
  },
  {
    name: "Budget",
    slug: "budget",
    roles: ["Sol / medium", "Luna / high", "Luna / low", "Luna / low"],
  },
  {
    name: "Minimum cost",
    slug: "minimum-cost",
    roles: ["Luna / medium", "Luna / medium", "Luna / low", "Luna / low"],
  },
];

const claudeRoles = [
  ["Opus / max", "Opus / max", "Opus / high", "Opus / high"],
  ["Opus / xhigh", "Opus / high", "Sonnet / high", "Sonnet / high"],
  ["Opus / high", "Sonnet / high", "Sonnet / medium", "Sonnet / medium"],
  ["Sonnet / high", "Sonnet / high", "Sonnet / medium", "Sonnet / medium"],
  ["Sonnet / high", "Sonnet / medium", "Haiku / medium", "Haiku / medium"],
  ["Sonnet / medium", "Haiku / high", "Haiku / low", "Haiku / low"],
  ["Haiku / medium", "Haiku / medium", "Haiku / low", "Haiku / low"],
];

const antigravityRoles = [
  ["Pro / high", "Pro / inherited", "Pro / inherited", "Pro / inherited"],
  ["Pro / high", "Pro / inherited", "Flash / inherited", "Flash / inherited"],
  ["Pro / high", "Flash / inherited", "Flash / inherited", "Flash / inherited"],
  ["Pro / medium", "Pro / inherited", "Flash / inherited", "Flash / inherited"],
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
];

export const profilesByHost = {
  codex: profiles,
  claude: profiles.map((profile, index) => ({
    ...profile,
    roles: claudeRoles[index],
  })),
  antigravity: profiles.map((profile, index) => ({
    ...profile,
    roles: antigravityRoles[index],
  })),
};

export function getProfiles(host = "codex") {
  if (!Object.hasOwn(profilesByHost, host))
    throw new Error(`Unknown profile host: ${host}`);
  return profilesByHost[host];
}

export const profileHostDetails = {
  codex: {
    name: "Codex",
    note: "Astra = gpt-6-astra · Sol = gpt-6.1-sol · Luna = gpt-6-luna. Profiles request settings through your existing host.",
  },
  claude: {
    name: "Claude Code",
    note: "Opus, Sonnet, and Haiku use Claude Code’s opus, sonnet, and haiku aliases. Effort support depends on the resolved model and host version; Kip reports unavailable settings.",
  },
  antigravity: {
    name: "Antigravity",
    note: "Pro and Flash are Antigravity’s pro and flash model tiers. Inherited means agent thinking remains host-controlled; no separate agent effort override is requested. Root thinking is selected in your chat. Intended cost can overlap between presets.",
  },
};

export function buildPrompt({ task, purpose, host, implicit, profile }) {
  const instructions = task.trim() || "Describe your task";
  const selected = getProfiles(host).find((item) => item.slug === profile);
  if (implicit) {
    return selected
      ? `Use Kip with the ${selected.name} profile to ${purpose}: ${instructions}`
      : `Use Kip to ${purpose}: ${instructions}`;
  }
  return `${host === "codex" ? "$kip" : "/kip"} ${purpose}${selected ? ` --profile ${selected.slug}` : ""} ${instructions}`;
}
