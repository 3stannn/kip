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

export function buildPrompt({ task, purpose, host, implicit, profile }) {
  const instructions = task.trim() || "Describe your task";
  const selected = profiles.find((item) => item.slug === profile);
  if (implicit) {
    return `Use Kip to ${purpose}${selected ? ` with the ${selected.name} profile` : ""} — ${instructions}`;
  }
  return `${host === "codex" ? "$kip" : "/kip"} ${purpose}${selected ? ` --profile ${selected.slug}` : ""} ${instructions}`;
}
