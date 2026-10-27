---
name: kip
description: Coordinate focused coding tasks with selective frontend, backend, design, testing, and security guidance. Use when the user invokes Kip or asks for a staged implementation across these specialties.
---

# Kip

Work inside the current chat using its model, tools, project context, and permissions. Kip needs no account, API key, MCP server, or separate runner. Do not launch the legacy Kip runner, request login, or change host model settings. Selected profiles may use the host's own delegation tools and usage allowance.

Treat `/kip <purpose> <instructions>`, `$kip <purpose> <instructions>`, and “use Kip to …” as requests to apply this workflow when the host passes them to you. The host may also select this skill from its description. Use the text following the invocation as the task; ask for a task if none was supplied, except for update and profile commands below.

## Glisse

For `/kip glisse`, `$kip glisse`, or a request to use Kip with Glisse, read [references/glisse.md](references/glisse.md) and apply its workflow to the remaining task. In the source checkout, read `../glisse/SKILL.md` instead. This mode uses the Glisse React library for Liquid Glass interfaces. With no task, explain the mode and ask what to build. Apply an explicitly selected profile as usual when a task is supplied.

## Update

For `/kip update`, `$kip update`, or an explicit request to update the installed Kip skill, read [references/update.md](references/update.md). Run the updater through the host's terminal tools and permissions; this is skill maintenance, not a coding task or profile dispatch.

## Profiles

For `profiles`, `profile [name|number|reset]`, a task with `--profile <name|number>`, a natural language request to select a Kip profile, or a Kip task while a selection is active, read [references/profiles.md](references/profiles.md). It defines seven presets with a root, reviewer, two workers, and thinking effort for each role. Profile commands without a task only display or select settings; do not start work. Retain explicit selections in this chat; a task override applies only to that task. Without a selection, use the current host defaults and the workflow below.

## Workflow

1. Identify the requested outcome and inspect project instructions and the smallest useful set of files. Preserve existing user changes.
2. Load only the supporting guidance needed for the work from the table below. Supporting files are under `references/<name>.md` relative to this file after installation; in the source checkout they are sibling skill folders. Start with token-efficiency for substantial work and anti-ai-slop when refining code or copy. Avoid reading every file.
3. For multi-step work, give a short plan and execute it in the current session. Use existing project conventions and available tools. Keep the user's requested language and stack. Delegate only when the user or host instructions authorize it and suitable tools exist; otherwise work sequentially.
4. Make the requested changes, run checks appropriate to their risk, and report what changed, what was actually verified, and any remaining limitation. Never invent execution results or measured savings.

| Guidance          | Read when                                                                     |
| ----------------- | ----------------------------------------------------------------------------- |
| token-efficiency  | Selecting context and keeping substantial work focused                        |
| anti-ai-slop      | Refining code, writing, or visual polish                                      |
| frontend-design   | Establishing visual direction, typography, or layout                          |
| responsive-design | Changing browser layouts; check relevant viewports and overflow               |
| frontend          | Implementing components, browser behavior, or accessibility                   |
| backend           | Implementing server logic, data flows, or interfaces                          |
| security          | Working on authentication, secrets, permissions, uploads, or trust boundaries |
| testing           | Fixing regressions or choosing meaningful verification                        |

A request for a plan should produce a plan. A request for implementation should continue through implementation and verification. Skill invocation does not authorize unrelated external actions. The current host controls authentication, usage, tools, and approval rules; Kip adds no separate authentication or billing flow.
