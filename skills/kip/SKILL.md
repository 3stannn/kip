---
name: kip
description: Orchestrate staged coding work through workers and an independent reviewer, using remembered project profiles. Use for build, fix, planning, and review tasks that benefit from delegated implementation or analysis and independent verification, when explicitly invoked as Kip, or when continuing an active Kip task. Supports implicit host selection without a Kip command.
---

# Kip

Use the current chat's tools, permissions, and project conventions. Kip adds no account, API key, model service, or separate runner. Do not launch the legacy runner or change host model settings.

If the parent assigned this agent a scoped Kip worker or reviewer role, follow that assignment and report back without starting orchestration, selecting another profile, or creating subagents. The root execution contract below belongs to the parent. Inherited skill instructions or a cloned agent do not turn a child into a second root.

Kip is an orchestrator. Whether the host selects this skill implicitly for a matching task or the user invokes it explicitly, actionable work uses native subagents under the same orchestration contract. Never require a Kip command or an extra “use subagents” phrase after implicit activation, and never reduce implicit activation to root-only implementation. The host controls skill selection; enabling implicit invocation makes Kip eligible, not guaranteed to activate for every coding request. A selected or task-specific profile supplies the team's model and effort settings. Without a profile, delegate with host-inherited settings. Profile display/selection/reset and installation/update commands without a coding task are administrative operations and do not start a coding team. Follow explicit user instructions to work solo and higher-priority host limits. If the host cannot delegate, report the blocker rather than automatically implementing alone.

Interpret `$kip <purpose> <task>`, `/kip <purpose> <task>`, and “use Kip to …” as explicit invocation of this workflow. For implicit activation, infer the requested purpose and outcome from the coding request without rewriting it as a command or expanding its scope. Continue an active Kip task when the user steers it. With no task or command, ask for an outcome without editing files.

## Commands

- For `profiles`, `profile [name|number|reset]`, a task's `--profile`, or a natural language profile choice, read [references/profiles.md](references/profiles.md). Resolve project memory and the current host's preset table before every Kip task, including a new chat. Codex, Claude Code, and Antigravity share profile slugs but use their own native models and controls. Selection alone never starts agents or implementation.
- For `update` or a request to refresh an installed skill, read [references/update.md](references/update.md). This is maintenance, not profile dispatch.

## Execution contract

1. Establish the requested outcome, project root, applicable instructions, and existing changes. Resolve the effective profile using the profile reference; distinguish requested settings from the host's actual settings. Give one short status line when work starts or the profile changes.
2. Use the task brief, applicable project instructions, and existing conventions to scope worker and reviewer assignments. Kip supplies orchestration rather than specialist implementation or design guidance.
3. Read [references/orchestration.md](references/orchestration.md) before execution, then load the current host's adapter: [Claude Code](references/orchestration-claude.md) or [Antigravity](references/orchestration-antigravity.md). Codex uses its exposed native collaboration schema. Preflight dispatch and result/continuation controls; never copy another host's tool calls. Dispatch two workers and one independent reviewer when a profile is effective; without a profile dispatch at least one worker and one independent reviewer. The root coordinates and integrates. Keep scopes bounded and honor host capacity; a small task calls for smaller assignments, not a silent solo bypass.
4. Deliver a coherent, reviewable change. A plan request delegates analysis and stays a plan; a review delegates inspection and reports actionable findings; implementation continues through appropriate verification. Preserve the requested language, stack, and deliberate product style. Continue an existing task with its agents rather than spawning a new team on every follow-up.
5. Inspect the final diff for unsupported claims, unnecessary abstractions, generic copy, unrelated edits, and lost failure handling. Report the result, verification actually performed, and material limits. Do not claim models changed, work ran, or tokens were saved without evidence.

Supporting project guidance belongs to the task and its existing conventions. Delegation follows this orchestration contract and grants no authority for unrelated work, external actions, or framework migrations. Keep profile state and task handoffs separate; never persist prompts, credentials, or agent transcripts as profile memory.
