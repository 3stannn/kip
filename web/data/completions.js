import { profiles } from "./profiles.js";

const commands = [
  ["build", "Implement a task and verify it"],
  ["fix", "Investigate and resolve an issue"],
  ["plan", "Outline the work before implementation"],
  ["review", "Review code and report findings"],
  ["glisse", "Build a Liquid Glass interface with Glisse"],
  ["profiles", "List all model profiles"],
  ["profile", "Select, show, or reset your project profile"],
  ["update", "Pull updates and refresh installed Kip skills"],
];
const profileOptions = profiles.map(({ slug, name }) => [
  slug,
  `${name} model profile`,
]);

export function getCompletions(text, caret = text.length, prefix = "$kip") {
  const before = text.slice(0, caret);
  const token = before.match(/\S*$/)[0];
  const start = caret - token.length;
  const context = before.slice(0, start).trim().split(/\s+/).filter(Boolean);
  let options = [];

  if (!context.length) {
    options = [[prefix, "Start a Kip command"]];
  } else if (/^[$/]kip$/i.test(context[0])) {
    if (context.length === 1) options = commands;
    else if (context[1] === "update") {
      if (context.length === 2)
        options = [["--host", "Choose which host installations to update"]];
      else if (context.length === 3 && context[2] === "--host")
        options = [
          ["codex", "Update existing Codex copies"],
          ["claude", "Update the existing Claude Code copy"],
          ["antigravity", "Update existing Antigravity copies"],
          ["all", "Update all existing host installations"],
        ];
    } else if (context[1] === "profile" && context.length === 2) {
      options = [...profileOptions, ["reset", "Return to host defaults"]];
    } else if (
      ["build", "fix", "plan", "review", "glisse"].includes(context[1])
    ) {
      if (context.length === 2)
        options = [["--profile", "Choose a profile for this task only"]];
      else if (context.length === 3 && context[2] === "--profile")
        options = profileOptions;
    }
  }

  // Replace the whole word under the caret, preserving surrounding task text.
  const end = caret + (text.slice(caret).match(/^\S*/)?.[0].length || 0);
  return options
    .filter(([label]) => label.toLowerCase().startsWith(token.toLowerCase()))
    .map(([label, description]) => {
      const separator = /^\s/.test(text.slice(end)) ? "" : " ";
      return {
        label,
        description,
        text: text.slice(0, start) + label + separator + text.slice(end),
        caret: start + label.length + 1,
      };
    });
}
