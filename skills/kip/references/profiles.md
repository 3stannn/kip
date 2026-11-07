# Kip profiles (administration)

Read this only for `profiles`, `profile [name|number|reset]`, or a natural-language request to select a profile. These commands never start agents. Each host's preset table lives in its adapter: [Claude Code](orchestration-claude.md), [Antigravity](orchestration-antigravity.md), [Codex](orchestration-codex.md).

## Commands

- `profiles`: list the current host's presets and the effective selection with its source.
- `profile`: show the saved selection, any active task override, and the current host's role settings.
- `profile <name|number>`: save the slug for later Kip tasks in this project. Confirm only after the write succeeds.
- `profile reset`: save null (host defaults). Do not delete other `.kip` files.
- `<purpose> --profile <name|number> <task>`: task-only override; saved memory is unchanged. Reject missing, unknown, or conflicting values before work.

Names are case-insensitive; display names, slugs, and numbers 1–5 are accepted. "Select/use X from now on" saves; "use X for this task" overrides. If the scope is ambiguous, treat it as task-only and say so. Selecting during active work affects later tasks, not running agents. Recommend Value when asked for a default; never select it silently.

## Memory

Use the target project root, never the skill directory. Precedence: task override, saved selection, chat-only fallback, host defaults. A saved null means host defaults. The helper validates, maps retired names (`premium`, `strong-lead` → `maximum`), and writes atomically:

~~~text
node "<kip-skill>/scripts/profile.mjs" show --root "<project-root>"
node "<kip-skill>/scripts/profile.mjs" select <slug> --root "<project-root>"
node "<kip-skill>/scripts/profile.mjs" reset --root "<project-root>"
~~~

`.kip/profile.json` holds only `{"version":1,"profile":"<slug>"|null}`; the helper also adds it to `.kip/.gitignore`. Store no host names, model IDs, prompts, or credentials. Reading never creates state. If the file is malformed, preserve it, explain the issue, and fall back to host defaults. If filesystem access or Node is unavailable, keep the selection chat-only and say it is not persisted. `ask`, `plan`, `review`, and `audit` never persist a profile change.

## Honesty

The current chat stays the root; the user picks its model in the host. Report requested versus actual settings, or mark them unverified. If a requested model or effort control is unavailable, use inherited settings with disclosure unless the user requires an exact match. Never map a model from one host's table to another vendor.
