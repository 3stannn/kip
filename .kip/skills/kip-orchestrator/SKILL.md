---
name: kip-orchestrator
description: Configure and operate the Kip JavaScript CLI for folder-based OpenAI tasks with selective skills and bounded context.
---

# Kip Orchestrator

Use this skill for the Kip CLI, not unrelated orchestration systems. Run commands from the target project with Node.js 22 or later.

Run `kip install` to create project-local `.kip/config.json` and editable skills without overwriting existing files. Use `kip plan "task" --file relative/path` to inspect routing and context bytes before a paid call. Add repeated `--file` or `--skill` options only when relevant. Use `--tier complex` or `--model id` explicitly when the standard configured model is insufficient.

Use `kip login` to sign in with ChatGPT, or reuse existing Codex ChatGPT authentication. Use `kip status` to inspect sign-in. Run `kip run "task"` when sending this task and selected files through Codex is authorized. No API key is required; API-key sign-in is rejected. Read the saved run JSON for response status, actual token usage, and output. Review generated code and apply it using the host's normal editing workflow; the CLI does not execute code or apply patches. Never claim it has tested or changed the target application.

The seven supporting skills live beside this folder. Read only the relevant SKILL.md: frontend-design for visual direction; anti-ai-slop for content and code refinement; token-efficiency for context and call choices; security for trust boundaries; testing for verification; frontend for browser code; backend for server code. The CLI routes a subset automatically; review the offline plan and override with `--skill` if needed.

Null model settings use the Codex default, not the model selected in an open chat. Account Codex eligibility and usage limits apply. Byte limits are context-size guards, not exact token or monetary budgets. The account runner does not enforce an output-token cap; Codex may make multiple inference requests internally. Model access and suitability depend on the user's account; supported Codex model IDs are configurable. Do not add automatic retries, escalation, or parallel calls merely to improve perceived quality. Preserve user edits on reinstall.
