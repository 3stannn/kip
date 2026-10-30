#!/usr/bin/env node
import { installSkills, inspectSkills } from "../src/install.js";
import { updateSkills } from "../src/update.js";

const help = `Kip — skills for your current coding chat. No Kip sign-in or API key.

After git clone, run:
  node bin/kip.js install [--host codex|claude|antigravity|all]
  node bin/kip.js doctor [--host codex|claude|antigravity|all]
  node bin/kip.js update [--host codex|claude|antigravity|all]

Install defaults to all hosts, globally. Existing skills are preserved.
Restart your host after installation. In chat, use:
  Codex: $kip <purpose> <instructions> (or select Kip in /skills)
  Claude Code / Antigravity: /kip <purpose> <instructions>
  Any host: Use Kip to <task>, or let the host select it automatically.

Switch profiles in chat (use /kip outside Codex):
  $kip profiles
  $kip profile value
  $kip build --profile maximum <instructions>
  $kip profile reset
  $kip update
Profiles remember project settings across chats in .kip/profile.json.
The five profile names use native models for Codex, Claude Code, or Antigravity.
Actionable Kip tasks use subagents automatically; no extra delegation phrase is needed.
An active profile assigns two workers and an independent reviewer.
Without a profile, use host-inherited settings for a worker and reviewer.
Profile-only and update commands do not launch a coding team.
Select root settings in your host; delegation settings depend on host support.

Install and doctor are offline and need only Node.js 22+.
Update needs Git and network access: fast-forward pull, back up, refresh existing skills.`;
try {
  const [command, ...args] = process.argv.slice(2);
  if (!command || ["--help", "-h"].includes(command)) console.log(help);
  else if (["install", "doctor", "update"].includes(command)) {
    let host = "all";
    if (args.length) {
      if (args.length !== 2 || args[0] !== "--host")
        throw Error("Expected --host codex|claude|antigravity|all");
      host = args[1];
    }
    if (command === "install") {
      const paths = await installSkills(host);
      console.log(
        `Installed Kip:\n${paths.join("\n")}\nRestart your host, then invoke Kip in chat. No Kip login or API key required.`,
      );
    } else if (command === "update") {
      const result = await updateSkills(host);
      console.log(
        `${result.before === result.after ? "Repository already current." : `Pulled ${result.before.slice(0, 8)} → ${result.after.slice(0, 8)}.`}\nUpdated Kip:\n${result.updated.map(({ target, backup }) => `${target}\n  Backup: ${backup}`).join("\n")}\nRestart your host or open a new session to load the updated skill.`,
      );
    } else {
      const results = await inspectSkills(host);
      console.log(JSON.stringify(results, null, 2));
      if (results.some((result) => !result.ready)) process.exitCode = 1;
    }
  } else if (["login", "status", "plan", "run"].includes(command)) {
    throw Error(
      "Kip now runs as a skill inside your current chat. Install with node bin/kip.js install, then use $kip in Codex or /kip in Claude Code and Antigravity. No Kip login or separate runner is needed.",
    );
  } else throw Error(`Unknown command: ${command}\n${help}`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
