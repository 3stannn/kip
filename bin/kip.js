#!/usr/bin/env node
import { installSkills, inspectSkills } from "../src/install.js";

const help = `Kip — skills for your current coding chat. No Kip sign-in or API key.

After git clone, run:
  node bin/kip.js install [--host codex|claude|antigravity|all]
  node bin/kip.js doctor [--host codex|claude|antigravity|all]

Install defaults to all hosts, globally. Existing skills are preserved.
Restart your host after installation. In chat, use:
  Codex: $kip <purpose> <instructions> (or select Kip in /skills)
  Claude Code / Antigravity: /kip <purpose> <instructions>
  Any host: Use Kip to <task>, or let the host select it automatically.

Switch profiles in chat (use /kip outside Codex):
  $kip profiles
  $kip profile value
  $kip build --profile premium <instructions>
  $kip profile reset
Profiles request a root, reviewer, and two workers with thinking efforts.
Select root settings in your host; delegation settings depend on host support.

The installer is local and needs only Node.js 22+. It makes no network calls.`;
try {
  const [command, ...args] = process.argv.slice(2);
  if (!command || ["--help", "-h"].includes(command)) console.log(help);
  else if (["install", "doctor"].includes(command)) {
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
