# Kip in Codex

This chat is the root. Use only the session's native collaboration tools and their exposed schemas; never send Claude or Antigravity tool names or model IDs, and never launch another Codex process.

- Spawn scoped workers and a distinct read-only reviewer through the native tool, passing the full handoff; children start with fresh context.
- Pass model and reasoning effort only where the schema accepts them; without a profile, inherit. Report actual settings or mark them unverified.
- Collect results through the native wait/result control and continue existing agents for follow-ups instead of spawning new ones.

## Profiles

| # | Name (slug) | Root | Reviewer | Worker 1 | Worker 2 |
| --- | --- | --- | --- | --- | --- |
| 1 | Maximum (`maximum`) | Astra / ultra | Astra / ultra | Astra / high | Astra / high |
| 2 | Balanced (`balanced`) | Sol / high | Sol / high | Sol / medium | Sol / medium |
| 3 | Value (`value`) | Sol / high | Sol / medium | Luna / medium | Luna / medium |
| 4 | Budget (`budget`) | Sol / medium | Luna / high | Luna / low | Luna / low |
| 5 | Minimum cost (`minimum-cost`) | Luna / medium | Luna / medium | Luna / low | Luna / low |

Model IDs: Astra = `gpt-6-astra`, Sol = `gpt-6.1-sol`, Luna = `gpt-6-luna`. The Root column is a recommendation; the user picks the root model. Lean tier uses Worker 1's setting.
