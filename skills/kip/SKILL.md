---
name: kip
description: Orchestrate Kip coding tasks through workers and an independent reviewer, using remembered project profiles and focused guidance. Use when the user invokes Kip or continues an active Kip task.
---

# Kip

Use the current chat's tools, permissions, and project conventions. Kip adds no account, API key, model service, or separate runner. Do not launch the legacy runner or change host model settings.

Kip is an orchestrator. Invoking Kip for actionable work requests subagents; never require the user to add “use subagents.” A selected or task-specific profile supplies the team's model and effort settings. Without a profile, delegate with host-inherited settings. Profile display/selection/reset and installation/update commands without a coding task are administrative operations and do not start a coding team. Follow explicit user instructions to work solo and higher-priority host limits. If the host cannot delegate, report the blocker rather than automatically implementing alone.

Interpret `$kip <purpose> <task>`, `/kip <purpose> <task>`, and “use Kip to …” as this workflow. Continue an active Kip task when the user steers it. With no task or command, ask for an outcome without editing files.

## Commands

- For `profiles`, `profile [name|number|reset]`, a task's `--profile`, or a natural language profile choice, read [references/profiles.md](references/profiles.md). Resolve project memory before every Kip task, including a new chat. Selection alone never starts agents or implementation.
- For `update` or a request to refresh an installed skill, read [references/update.md](references/update.md). This is maintenance, not profile dispatch.
- For `glisse` or a request to use Glisse with Kip, read `references/glisse.md` after installation or `../kip-glisse/SKILL.md` in this checkout. Preserve the active profile. With no task, explain the mode and ask what to build.

## Execution contract

1. Establish the requested outcome, project root, applicable instructions, and existing changes. Resolve the effective profile using the profile reference; distinguish requested settings from the host's actual settings. Give one short status line when work starts or the profile changes.
2. Read only needed guidance below. For substantial work, use token-efficiency. Apply anti-ai-slop to generated code, copy, and UI; no separate critique agent is required. Installed references use the table's names; source folders are `../kip-<name>/SKILL.md`.
3. Read [references/orchestration.md](references/orchestration.md) before execution. Dispatch two workers and one independent reviewer when a profile is effective; without a profile dispatch at least one worker and one independent reviewer. The root coordinates and integrates. Keep scopes bounded and honor host capacity; a small task calls for smaller assignments, not a silent solo bypass.
4. Deliver a coherent, reviewable change. A plan request delegates analysis and stays a plan; a review delegates inspection and reports actionable findings; implementation continues through appropriate verification. Preserve the requested language, stack, and deliberate product style. Continue an existing task with its agents rather than spawning a new team on every follow-up.
5. Inspect the final diff for unsupported claims, unnecessary abstractions, generic copy, unrelated edits, and lost failure handling. Report the result, verification actually performed, and material limits. Do not claim models changed, work ran, or tokens were saved without evidence.

| Guidance | Read for |
| --- | --- |
| token-efficiency | Context selection, tool calls, handoffs, and stopping criteria |
| anti-ai-slop | Product-specific code, copy, and visual craft |
| frontend-design | Visual direction, typography, and composition |
| responsive-design | Layout, viewport, reflow, and overflow changes |
| frontend | Components, interactions, accessibility, and client state |
| backend | Server contracts, persistence, retries, and migrations |
| security | Changes to trust boundaries or a requested security review |
| testing | Regression coverage and meaningful verification |

Supporting guidance belongs to Kip. Delegation follows this orchestration contract and grants no authority for unrelated work, external actions, or framework migrations. Keep profile state and task handoffs separate; never persist prompts, credentials, or agent transcripts as profile memory.

For a new website or substantial visual redesign, load frontend-design before choosing a layout. Its website reference carries the user's preferred visual direction; apply it when the brand and brief leave room. Give that guidance to the assigned frontend worker without adding an extra specialist solely for the skill name. Complete the page's composition and real interactions, then inspect the rendered result using the available browser tools.
