# Kip in Antigravity

This chat is the root. Do not launch an Antigravity CLI, `/boost`, or `/teamwork-preview`, and do not write persistent `.agents/agents` or global agent definitions.

## Dispatch

- Check that `define_subagent`, `invoke_subagent`, and result/status/message controls are exposed; documentation does not prove they exist in this session.
- Define transient scoped workers and a distinct read-only reviewer, then invoke them by the returned ID. A definition alone has not run anything.
- Use model tier `pro` or `flash` for a profile and `inherit` without one. Omit effort fields; agent thinking is host-controlled.
- Use exact runtime tool names in allowlists: file and verification tools for workers, inspection only for the reviewer. Do not request stronger shell policies.
- Do not use built-in `research` for implementation or `browser` as a general worker. Use `self` only if the handoff explicitly blocks recursive Kip dispatch.

## Workspace and completion

Shared workspaces need disjoint file ownership. Isolated worktrees must be integrated by the root before review; record their path and revision. Invocation is asynchronous: `running` is still executing; `idle` accepts follow-ups but does not prove the checks passed; `killed` cannot resume and its replacement counts against the limit. Send fixes to the existing worker and rechecks to the reviewer.

## Profiles

| # | Name (slug) | Root | Reviewer | Worker 1 | Worker 2 |
| --- | --- | --- | --- | --- | --- |
| 1 | Maximum (`maximum`) | Pro / high | pro / inherited | pro / inherited | pro / inherited |
| 2 | Balanced (`balanced`) | Pro / medium | pro / inherited | flash / inherited | flash / inherited |
| 3 | Value (`value`) | Pro / medium | flash / inherited | flash / inherited | flash / inherited |
| 4 | Budget (`budget`) | Flash / medium | flash / inherited | flash / inherited | flash / inherited |
| 5 | Minimum cost (`minimum-cost`) | Flash / low | flash / inherited | flash / inherited | flash / inherited |

The Root column is a user-selected Gemini Pro- or Flash-family model. "inherited" means no per-agent effort override. Docs: [subagents](https://antigravity.google/docs/subagents/), [models](https://antigravity.google/docs/models/).
