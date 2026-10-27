---
name: kip-orchestrator
description: Migrate a legacy Kip runner request to the current Kip skill. Use only for Kip migration.
---

# Kip migration

Use the current Kip skill as the authority for orchestration. Read `../kip/SKILL.md` in this checkout or the installed `kip/SKILL.md`. Do not run legacy `kip login`, `kip status`, `kip plan`, or `kip run` commands. If installation is needed, use `node bin/kip.js install` from the clone and restart the host.

Use `$kip` in Codex or `/kip` in Claude Code and Antigravity. Preserve existing project `.kip` files. Profile memory belongs to `.kip/profile.json`; do not derive it from legacy runner model settings. Actionable Kip tasks request workers and an independent reviewer automatically; the effective profile supplies their settings. Administrative profile commands alone do not dispatch a team. Never start a second orchestrator, authenticate separately, or duplicate profile tables here.
