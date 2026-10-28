# Kip orchestration contract

Kip is the root coordinator of a delegated workflow. For actionable work, dispatch subagents through the host's native tools whether Kip was selected implicitly by the host or explicitly invoked by the user. Both activation paths use the same worker/reviewer contract without requesting another delegation phrase or a Kip command. This includes build, fix, planning, and review requests, with or without a profile. Do not treat “the user did not explicitly say subagents” as a reason to work alone.

## Host preflight

Identify the running host from trusted session context and its exposed tools. In Claude Code, read [Claude orchestration](orchestration-claude.md); in Antigravity, read [Antigravity orchestration](orchestration-antigravity.md). Load only the current host's reference. In Codex, use the current session's native collaboration tools and their schemas. Never send Codex tool names or model IDs to another host.

Before dispatch, confirm a supported way to create a capable worker, collect its result, continue it when needed, and run a separate reviewer. Inspect model/effort controls, permissions, workspace behavior, and capacity. Documentation is guidance; the running tool schema determines valid arguments. Resolve [profiles.md](profiles.md) against this host. Disclose unavailable controls before affected delegation, following its inheritance and exact-match rules. Missing delegation is a blocker, not an invitation to launch a vendor CLI, create persistent agent files, or change host settings.

## Team and task scope

- With an effective profile (task override, saved project selection, or chat fallback), use its two worker roles and one independent reviewer. A profile in `$kip build --profile balanced <task>` applies to that task and requests the Balanced team immediately; it does not change saved profile memory.
- Without a profile, use at least one worker and one independent reviewer with inherited host settings. Add a second worker only for a useful scope. Do not silently select a preset.
- Profile list/show/select/reset alone, installation, doctor, and skill updater commands are administrative operations. Run them directly without a coding team. No task means no speculative work. Editing Kip's source skills or code is actionable development, not an administrative exception.
- Plan requests delegate analysis without implementation. Review requests delegate inspection without edits unless fixing was also requested. Tool access does not expand the requested purpose.
- An explicit user request for solo work or a smaller team overrides the default. Higher-priority limits and unavailable host capabilities also take precedence. Explain affected roles; do not invent delegation or ask for additional permission already covered by the Kip request. Host limitations alone do not authorize silently reducing the team or switching to root-only implementation.

## Dispatch and ownership

Resolve the effective profile and inspect available tools, model IDs, effort controls, and capacity before dispatch. Give one compact dispatch update with the profile, roles, and any unsupported settings. Use the exact supported profile settings as described in [profiles.md](profiles.md); do not change the root's host model or launch another CLI/API runner.

1. Assign Worker 1 a bounded implementation or investigation outcome. Assign Worker 2 a complementary implementation, contract analysis, or verification outcome. Keep file ownership distinct; serialize dependencies and shared-file edits. On a small change, use a narrow verification assignment for Worker 2 rather than inventing extra features or skipping the profile role.
2. Send each worker the outcome, project root and workspace, necessary project instructions, relevant paths/evidence, constraints, ownership, acceptance checks, effective role settings, and a stop condition. Explicitly state: “You are a scoped Kip worker/reviewer. Do not invoke Kip orchestration or create subagents. Complete only this assignment and report to the parent.” Use focused context instead of copying the conversation or every skill. Require a result containing changed paths or findings, verification actually run and its results, blockers, and the workspace/revision needed for integration. Reviewers report findings with file/line evidence and do not edit.
3. The root owns planning, coordination, integration, and the final answer. It may resolve integration issues and targeted fixes, but must not perform the entire task alone and label that orchestration. Inspect returned diffs and execution evidence before relying on them.
4. Once the result is integrated, give the independent reviewer the acceptance conditions, applicable instructions, current diff/artifacts, and actual verification evidence. Keep the reviewer out of implementation edits. For a plan, review the proposed plan; for a code review, cross-check the evidence and findings. Workers or root resolve actionable findings and repeat only affected checks.

Do not make workers and reviewer run duplicate full audits by default. Distinguish worker verification from the reviewer's independent assessment. Keep all roles useful and focused on the requested outcome.

## Capacity, continuity, and failure

At most two workers and one reviewer across the entire task, including replacements, unless the user explicitly requests a different limit. No recursive delegation from children. Reuse existing task agents for follow-ups within their scope; do not start another team merely because a message arrived. A task continues while the same outcome remains unresolved; once its result has been delivered and accepted or the user clearly requests a separate outcome, start a new task ledger and discard the previous override. If an agent fails or requested settings change after this allowance is used, resume or reconfigure an existing agent through supported controls; otherwise disclose that the limit prevents replacement and stop affected work. Keep a compact ledger of agents used, role settings, ownership, pending findings, and checks through compaction.

If capacity prevents simultaneous dispatch, stage the roles: complete workers first, release their slots through supported lifecycle tools if needed, then dispatch the independent reviewer. Confirm whether completed agents release capacity in this host; do not invent a close tool or assume that interrupting an agent frees its slot. If the host cannot release slots or support all distinct roles, report the capacity limit and which work or review remains blocked. Use a reduced team only if the user requested or already authorized that exception. Parallel execution is useful only for independent work. Do not equate unavailable parallelism with unavailable delegation.

If delegation tools are absent, forbidden by higher-priority instructions, or fail after a focused supported recovery, disclose the concrete limitation and affected roles. Stop the affected delegated execution and explain what capability is needed; do not automatically replace the task with root-only implementation. Root-only fallback requires an explicit user solo/fallback instruction, including one already given for this task. Continue independent coordination or administrative work when useful and permitted. Never replace agents with role-play, describe sequential root passes as independent agents, or bypass host restrictions.

Wait on meaningful status changes while continuing independent coordination work. Avoid unchanged polling, idle agents, and repeated identical failed dispatches. Reuse an existing agent when possible; failure does not grant unlimited replacements or model upgrades. Retain blockers and report material deviations at completion along with checks actually performed. Never save task authorization, agent transcripts, or tool instructions in profile memory.

## Host smoke checks

Use a disposable project when verifying host behavior. Record the host/version, supported controls, returned agent IDs, completion evidence, and observed result. A documentation walkthrough or bundle test is not a live host run; label each accordingly. Never claim Claude Code or Antigravity execution based on a Codex run.

| Scenario | Required observation |
| --- | --- |
| Show/select/reset only | No agents start; only explicit selection/reset persists a slug or null. |
| Task without a profile | A worker and separate reviewer inherit settings; review follows integration. |
| Saved or task profile | Two workers and a separate reviewer use the current host's table; a task override leaves saved state intact. |
| Worker continuation | A follow-up reuses the returned agent ID/context through a supported control. |
| Plan/review task | Delegated work stays read-only; no recursive teams start. |
| Limited capacity | Roles stage without exceeding capacity or silently reducing the team. |
| Unsupported setting | The mismatch is disclosed; inherited fallback or exact-match blocking follows the profile contract. |
| Missing delegation | A concrete blocker is reported without a second runner or invented successful agents. |
