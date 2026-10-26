---
name: kip
description: Coordinate focused coding tasks with selective frontend, backend, design, testing, and security guidance. Use when the user invokes Kip or asks for a staged implementation across these specialties.
---

# Kip

Work inside the current chat using its model, tools, project context, and permissions. Kip needs no account, API key, MCP server, external model call, or separate agent process. Do not launch the legacy Kip runner, request login, or change host model settings.

Treat `/kip <purpose> <instructions>`, `$kip <purpose> <instructions>`, and “use Kip to …” as requests to apply this workflow when the host passes them to you. The host may also select this skill from its description. Use the text following the invocation as the task; ask for a task if none was supplied.

1. Identify the requested outcome and inspect project instructions and the smallest useful set of files. Preserve existing user changes.
2. Load only the supporting guidance needed for the work from the table below. Supporting files are under `references/<name>.md` relative to this file after installation; in the source checkout they are sibling skill folders. Start with token-efficiency for substantial work and anti-ai-slop when refining code or copy. Avoid reading every file.
3. For multi-step work, give a short plan and execute it in the current session. Use existing project conventions and available tools. Keep the user's requested language and stack. Delegate only when the user or host instructions authorize it and suitable tools exist; otherwise work sequentially.
4. Make the requested changes, run checks appropriate to their risk, and report what changed, what was actually verified, and any remaining limitation. Never invent execution results or measured savings.

| Guidance | Read when |
| --- | --- |
| token-efficiency | Selecting context and keeping substantial work focused |
| anti-ai-slop | Refining code, writing, or visual polish |
| frontend-design | Establishing visual direction, typography, or layout |
| responsive-design | Changing browser layouts; check relevant viewports and overflow |
| frontend | Implementing components, browser behavior, or accessibility |
| backend | Implementing server logic, data flows, or interfaces |
| security | Working on authentication, secrets, permissions, uploads, or trust boundaries |
| testing | Fixing regressions or choosing meaningful verification |

A request for a plan should produce a plan. A request for implementation should continue through implementation and verification. Skill invocation does not authorize unrelated external actions. The current host controls authentication, usage, tools, and approval rules; Kip adds no separate authentication or billing flow.
