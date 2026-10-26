---
name: kip-orchestrator
description: Migrate older Kip CLI workflows to the Kip skill in the current chat.
---

# Kip migration

Kip now runs inside the current host chat. Do not use `kip login`, `kip status`, `kip plan`, or `kip run`. Install the portable skill using `node bin/kip.js install` from the GitHub clone, then restart the host. Use `$kip` in Codex or `/kip` in Claude Code and Antigravity. Natural language invocation and host-selected implicit invocation are also supported. Kip adds no authentication or API calls. Read the installed `kip/SKILL.md` for the workflow; preserve existing project `.kip` files.
