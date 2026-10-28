# Kip in Antigravity

Apply the shared [orchestration contract](orchestration.md) and Antigravity's table in [profiles.md](profiles.md). Keep this chat as the root. Do not launch an Antigravity CLI process or start `/boost` or `/teamwork-preview` as another orchestrator. Do not write persistent `.agents/agents` or global agent definitions for an ordinary task.

## Define and invoke

1. Inspect the running surface for native `define_subagent`, `invoke_subagent`, and result/status/message controls, including their exact schemas. Native subagent documentation covers App and CLI; do not assume an IDE-only or older surface exposes them. Missing required controls follow the shared blocker policy; documentation does not prove they are exposed in this session.
2. When supported, create transient scoped worker definitions with `define_subagent`, plus a distinct reviewer definition. Use the native tool's returned identifier with `invoke_subagent`. A definition alone has not executed work. Use `pro` or `flash` for a profile and `inherit` without a profile, where the runtime accepts those model tiers. Omit any unsupported effort field: agent thinking is host-controlled, not a claimed per-agent override.
3. Use exact tool names from the current runtime when specifying allowed tools. Give coding workers the required file and verification tools, and narrow the reviewer to inspection. Preserve inherited permission and execution policies; do not request stronger shell policies to bypass approvals. A misspelled tool allowlist can prevent useful execution.
4. Pass the full scoped handoff required by the shared contract. Children start with fresh conversation context. Include project/workspace paths, ownership, acceptance conditions, and the explicit prohibition on invoking Kip orchestration or creating subagents. Do not use built-in `research` for implementation or assume built-in `browser` is a general worker. If a runtime offers only `self`, it inherits the root's instructions and tools: use it only when a scoped handoff and exposed controls can satisfy the same boundaries, and explicitly prevent recursive Kip dispatch.

## Workspace, completion, and review

Select a supported workspace mode deliberately. Shared or inherited workspaces need disjoint file ownership and serialized conflicting edits. An isolated branch/worktree requires the parent to inspect and integrate its changes before review; record its returned path/revision. Do not assume all workspace modes write into the parent's checkout.

Invocation is asynchronous. Retain each returned agent ID and collect its final response through available status/result controls or completion events. `running` is still executing; `idle` permits follow-up but does not alone prove acceptance conditions passed. Send a message through the supported control to wake the same idle agent. A `killed` agent cannot resume; replacements still count against the shared task limit.

Once worker changes are integrated, invoke the separate reviewer against that result with actual check evidence. Route fixes to the existing worker and affected rechecks to the reviewer. Do not count definitions, launch acknowledgments, or the worker's self-review as completed independent review.

Native reference: [Antigravity subagents](https://antigravity.google/docs/subagents/). Verify the [shared smoke scenarios](orchestration.md#host-smoke-checks) on the actual surface before claiming live compatibility.
