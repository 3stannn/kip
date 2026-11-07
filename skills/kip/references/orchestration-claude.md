# Kip in Claude Code

The parent chat is the root. Use native session tools only: no `claude` processes, `.claude/agents` files, team orchestrators, or settings changes.

## Dispatch

- Workers: `Agent` with `subagent_type: "general-purpose"`. Read-only investigation: `Explore`. Do not use fork subagents (they copy the whole conversation) or the `name` argument (it may create a teammate).
- Reviewer: a separate `general-purpose` agent told it is read-only, given the diff and checks in the prompt.
- Put the full handoff in `prompt`; children start with fresh context.
- Profile models: pass `model: "opus" | "sonnet" | "haiku"` and `effort` only where the schema accepts them. Without a profile, omit both. Report actual settings or mark them unverified.
- Prefer foreground calls for work you must wait on; for background calls, wait for the completion notification and do not poll.
- Continue an agent with `SendMessage` (older schemas: `Agent` with `resume`) instead of starting a new one. A worker's self-review is never the independent review.

## Profiles

| # | Name (slug) | Root | Reviewer | Worker 1 | Worker 2 |
| --- | --- | --- | --- | --- | --- |
| 1 | Maximum (`maximum`) | Opus / max | Opus / max | Opus / high | Opus / high |
| 2 | Balanced (`balanced`) | Sonnet / high | Sonnet / high | Sonnet / medium | Sonnet / medium |
| 3 | Value (`value`) | Sonnet / high | Sonnet / medium | Haiku / medium | Haiku / medium |
| 4 | Budget (`budget`) | Sonnet / medium | Haiku / high | Haiku / low | Haiku / low |
| 5 | Minimum cost (`minimum-cost`) | Haiku / medium | Haiku / medium | Haiku / low | Haiku / low |

The Root column is a recommendation; the user picks the root model in the host. Lean tier uses Worker 1's setting. Aliases resolve per the user's provider; organization or environment settings may override them. Docs: [subagents](https://code.claude.com/docs/en/sub-agents), [model config](https://code.claude.com/docs/en/model-config).
