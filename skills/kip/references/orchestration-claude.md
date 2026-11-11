# Kip in Claude Code

The parent chat is the root. Use native session tools only: no `claude` processes, `.claude/agents` files, team orchestrators, or settings changes.

## Dispatch

- Worker: `Agent` with `subagent_type: "general-purpose"`, a `description` naming role and scope ("Kip worker: auth routes"), and the filled handoff as `prompt`; children start with fresh context.
- Read-only roles: `subagent_type: "Explore"` for investigation and `plan` mapping. `review` workers stay `general-purpose`, told they are read-only, because Explore locates code and does not audit it.
- Parallel workers: several `Agent` calls in one message.
- Reviewer: a new `Agent` call (`general-purpose`, told it is read-only) made after integration, with the changed paths, the diff command, and the checks in its handoff. Never `SendMessage` a worker to review its own work.
- Do not use `subagent_type: "fork"` (it copies the whole conversation) or the `name` argument (it may create a teammate).
- Profile models: pass `model: "opus" | "sonnet" | "haiku"` and `effort` only where the schema accepts them. Without a profile, omit both. Report actual settings or mark them unverified.
- Results: where the schema offers foreground calls, use them for work you must wait on. A background agent answers through its completion notification: do not poll, and do not answer the user as if it had finished.
- Follow-ups, worker fixes and reviewer rechecks alike: `SendMessage` to the same agent (older schemas: `Agent` with `resume`), not a new agent. A worker's self-review is never the independent review.

## Profiles

| # | Name (slug) | Root | Reviewer | Worker 1 | Worker 2 |
| --- | --- | --- | --- | --- | --- |
| 1 | Maximum (`maximum`) | Opus / max | Opus / max | Opus / high | Opus / high |
| 2 | Balanced (`balanced`) | Sonnet / high | Sonnet / high | Sonnet / medium | Sonnet / medium |
| 3 | Value (`value`) | Sonnet / high | Sonnet / medium | Haiku / medium | Haiku / medium |
| 4 | Budget (`budget`) | Sonnet / medium | Haiku / high | Haiku / low | Haiku / low |
| 5 | Minimum cost (`minimum-cost`) | Haiku / medium | Haiku / medium | Haiku / low | Haiku / low |

The Root column is a recommendation; the user picks the root model in the host. Lean tier uses Worker 1's setting. Aliases resolve per the user's provider; organization or environment settings may override them. Docs: [subagents](https://code.claude.com/docs/en/sub-agents), [model config](https://code.claude.com/docs/en/model-config).
