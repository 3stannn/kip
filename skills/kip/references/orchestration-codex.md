# Kip in Codex

This chat is the root. Use only the session's native collaboration tools and their exposed schemas; never send Claude or Antigravity tool names or model IDs, and never launch another Codex process.

- Workers: one native spawn call each (for example `spawn_agent`; the session's schema decides the name), with the filled handoff as the message. Start independent workers in the same turn. Children start with fresh context.
- Read-only roles: use a read-only or explorer agent role where the schema offers one; otherwise state the read-only boundary in the handoff.
- Reviewer: a separate spawn made after integration, never a message to an existing worker.
- Pass model and reasoning effort only where the schema accepts them; without a profile, inherit. Report actual settings or mark them unverified.
- Results: use the native wait control on every running worker before integrating, and on the reviewer before reporting.
- Follow-ups, worker fixes and reviewer rechecks alike: the native send-input control to the same agent, not a new spawn. Close the agents when the task ends.

## Profiles

| # | Name (slug) | Root | Reviewer | Worker 1 | Worker 2 |
| --- | --- | --- | --- | --- | --- |
| 1 | Maximum (`maximum`) | Astra / ultra | Astra / ultra | Astra / high | Astra / high |
| 2 | Balanced (`balanced`) | Sol / high | Sol / high | Sol / medium | Sol / medium |
| 3 | Value (`value`) | Sol / high | Sol / medium | Luna / medium | Luna / medium |
| 4 | Budget (`budget`) | Sol / medium | Luna / high | Luna / low | Luna / low |
| 5 | Minimum cost (`minimum-cost`) | Luna / medium | Luna / medium | Luna / low | Luna / low |

Model IDs: Astra = `gpt-6-astra`, Sol = `gpt-6.1-sol`, Luna = `gpt-6-luna`. The Root column is a recommendation; the user picks the root model. Lean tier uses Worker 1's setting.
