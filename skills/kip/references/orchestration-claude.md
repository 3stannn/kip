# Kip in Claude Code

Apply the shared [orchestration contract](orchestration.md) and Claude's table in [profiles.md](profiles.md). The parent chat remains the root. Use native session tools; do not start `claude` processes, create `.claude/agents` files, enable another team orchestrator, or alter host settings to run Kip.

## Dispatch

1. Inspect the current `Agent` tool schema and available agent types. For implementation, use `subagent_type: "general-purpose"` when available. Prefer ordinary non-fork subagents; use an explicit non-fork option only if exposed. `Explore` and `Plan` are research roles, not coding workers. If the session disables the needed type, use an already available agent with equivalent capabilities or report the concrete blocker. Do not assume a slash command or prompt text alone created a child. Avoid the optional `name` argument for ordinary subagents: with agent teams enabled it may create a teammate instead. Track returned IDs without changing the user's team configuration.
2. Send the scoped handoff required by the shared contract in the tool's task/prompt field. Ordinary non-fork subagents start with fresh conversation context: include the project path, ownership, relevant instructions, and evidence explicitly. State the no-recursion instruction even if a child receives Kip through skills or project context.
3. For a profile, request the native `opus`, `sonnet`, or `haiku` alias using `model` where the schema permits. For inherited settings, omit that field; do not pass a literal `inherit` as an `Agent` invocation model unless the running schema explicitly accepts it. Pass requested `effort` only if supported by the current invocation and resolved model. Environment or organization controls may take precedence. Report actual settings when exposed and otherwise mark them unverified; apply the profile's disclosed fallback rules.
4. Give implementation workers write access only within their assigned scope. Give the separate reviewer a read-only assignment and use available native restrictions where supported. Do not modify persistent permissions to obtain these capabilities.

## Results and continuation

Foreground calls return the result directly; inspect it before integration. When running in the background, record the returned agent/task ID and use the runtime's completion notification or supported result/wait control. A launch acknowledgment is not completion. Collect the final response and actual workspace diff. Stage roles if the host's concurrency limit requires it.

Use the supported continuation control with the returned agent ID for follow-up work: current versions expose `SendMessage` for resumption; older schemas may expose `Agent` with `resume`. Inspect the runtime before choosing either. Preserve the agent's role and ownership rather than starting a new child for each clarification. After workers finish and changes are integrated, invoke a distinct reviewer with the integrated diff and verification evidence. Resume the appropriate worker for fixes and the reviewer for affected rechecks. Never treat a worker's self-review as independent review.

Native reference: [Claude Code subagents](https://code.claude.com/docs/en/sub-agents), including model, effort, background execution, and resumption. Verify the [shared smoke scenarios](orchestration.md#host-smoke-checks) in the actual host before claiming live compatibility.
