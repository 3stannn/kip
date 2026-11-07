# Kip

A coding workflow for Codex, Claude Code, and Antigravity. Kip sizes a team to each task (solo, or workers plus an independent reviewer) inside your existing coding chat, using the host's models, tools, and permissions. No separate sign-in, API key, or server.

[Website and command playground](https://usekip.vercel.app)

## Install

Requires Git and Node.js 22+. No npm dependencies are needed for the skill.

```sh
git clone https://github.com/3stannn/kip.git
cd kip
node bin/kip.js install
```

Installs for all supported hosts. Add `--host codex`, `--host claude`, or `--host antigravity` to install for one. Existing installations must use `update` instead.

Restart your host or open a new session after installing. Check the installation with `node bin/kip.js doctor`.

## Use

In Codex:

```text
$kip build Add an accessible login page
$kip fix Mobile overflow in the dashboard
$kip plan Add authentication
$kip review The current changes
$kip ask How does authentication work in this project?
$kip unslop Make the landing page read less generic
$kip audit Audit this repository for security vulnerabilities
$kip trim Cut the token cost of AGENTS.md and our skills
```

Use `/kip` instead of `$kip` in Claude Code and Antigravity. You can also say `Use Kip to <task>` in any supported host.

Kip sizes each task: small changes run solo in the root chat, typical tasks use one worker plus an independent reviewer, and only large, separable work gets two workers. Say "solo" or "full team" to override. Kip activates only when you name it. Available models and delegation controls depend on your host; profiles do not change the current chat's model.

These are chat purposes, not terminal commands:

| Purpose | Result |
| --- | --- |
| `build` | Implement the task and verify it. |
| `fix` | Investigate an issue, resolve it, and verify the fix. |
| `plan` | Return an implementation plan without changing source or notes. |
| `review` | Report actionable code findings without changing source or notes. |
| `ask` | Answer questions in chat with no persistent writes: no edits, reports, note updates, profile saves, or commands that generate files. |
| `unslop` | Find and fix what makes an existing website read as generated, broken, or untrue. Preserves its brand, functionality, and stack; never invents replacement content; compares before/after browser views. Formerly `deslop`, which still works. |
| `audit` | Run the bundled Cloudflare security-audit workflow. Keep target source and ordinary notes unchanged; write separate audit reports with evidence, remediation, and coverage gaps. |
| `trim` | Shrink the agent context your chats load (instruction files, skills, agent and command definitions) without dropping rules. Edits only those files and reports measured before/after token estimates. |

`audit` does not apply fixes or probe live services. Runtime checks require the upstream workflow's execution isolation; unavailable checks are disclosed as validation gaps. Its staged delegation supports fresh independent validators within host capacity. Audit scope and available capabilities determine coverage, so a report is not a guarantee that a project is secure. See [Kip's security-audit adapter](skills/kip/references/security-audit.md).

### Unslop a website

`unslop` judges each candidate by three questions: is it true, does it work, and was it chosen for this site rather than left by a template? It looks across content, copy, structure, visuals, motion, interaction states, accessibility, code, and metadata, starting from browser screenshots and a quick source sweep. Fixes go in order: untrue content first, then broken behavior, generic copy, structure and visuals, motion, and cleanup. The existing brand always outranks bundled style rules. Where real testimonials, photos, or numbers are missing, Kip leaves a marked gap and lists it for you rather than inventing them. See the [unslop guide](skills/kip/references/unslop.md).

### Trim token cost

`trim` shrinks the context your agents load: `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, editor rules, and the skills, agents, and commands under `.claude`, `.agents`, `.codex`, and `.gemini`. Files loaded in every session are trimmed first. Duplicate rules are merged, filler and stale content are removed, and task-specific detail moves into on-demand references, while every concrete rule, command, and safety constraint stays. Vendored third-party skills are reported, not edited. You can measure any project directly:

```sh
node ~/.claude/skills/kip/scripts/tokens.mjs measure --root .
```

Use the installed skill path for your host. Add `--json` to save a baseline, and run `compare --baseline <file>` after changes. Numbers are character-based estimates for comparing runs, not billed tokens. When you ask Kip to save tokens, or use the Budget or Minimum cost profile, it also applies the guide's lean-running rules to the task itself. See the [token efficiency guide](skills/kip/references/token-efficiency.md).

## Project notes

Kip keeps concise, structured project memory in `.kip/notes.json`, separate from profile preferences and ignored by Git. New tasks retrieve relevant topics to find code and remember verified changes, decisions, pitfalls, and useful checks. Agents still inspect current task-relevant source: file fingerprints can flag changed dependencies, but cannot prove that a remembered conclusion remains correct.

Notes are bounded to 64 KiB, with a small retrieved context rather than an accumulated conversation history. The coordinating agent updates affected notes after verified `build`, `fix`, or `unslop` work. Workers propose updates; revision checks prevent concurrent chats silently overwriting each other. `ask`, `plan`, `review`, `audit`, and `trim` only read notes. Missing notes trigger targeted discovery, without creating storage during a read-only task.

Memory persists across chats and supported hosts using the same project directory. Separate clones and worktrees have separate notes. Agents must not store credentials, transcripts, or saved permissions. See the [notes workflow](skills/kip/references/notes.md).

## Profiles

Choose from **Maximum, Balanced, Value, Budget,** and **Minimum cost**. Value is the recommended starting point.

```text
$kip profiles
$kip profile value
$kip build --profile maximum Fix the permissions bug
$kip profile reset
```

`profile value` saves the choice for this project across chats. `--profile` overrides it for one task. A profile sets models and effort for whichever roles run; it does not enlarge the team. Preset tables live in each host adapter: [Claude Code](skills/kip/references/orchestration-claude.md), [Antigravity](skills/kip/references/orchestration-antigravity.md), [Codex](skills/kip/references/orchestration-codex.md).

## Update

In your coding chat:

```text
$kip update
```

Use `/kip update` in Claude Code and Antigravity. This updates the current host; add `--host all` to update every installed host.

Alternatively, from your clone:

```sh
node bin/kip.js update
```

The terminal command pulls upstream changes, backs up installed copies, and refreshes all existing installations. It requires a clean clone with a tracking branch. Restart your host or open a new session afterward.

For older installations without the chat update command, run `git pull --ff-only` followed by `node bin/kip.js update` once from your clone.

## Verifying a host

Use a disposable project. Record the host/version, supported controls, returned agent IDs, and observed results. A documentation walkthrough or bundle test is not a live host run, and a Codex run does not prove Claude Code or Antigravity behavior.

| Scenario | Expected |
| --- | --- |
| Show/select/reset only | No agents start; only explicit select/reset persists a slug or null. |
| Small task | Runs solo; no subagents or reviewer. |
| Typical task | One worker and a separate reviewer; review follows integration. |
| Large task or "full team" | Two workers with disjoint ownership plus a reviewer, using the host's profile table. |
| Worker continuation | A follow-up reuses the returned agent ID. |
| Plan/review/ask | Stays read-only; no recursive teams. |
| Unsupported setting | Mismatch is disclosed; inherited settings are used. |
| Missing delegation | A concrete blocker is reported, with no second runner or invented agents. |

## Website development

Kip bundles HeroUI's React, Native, and v2-to-v3 migration skills with their documentation helpers and Apache-2.0 licenses. HeroUI tasks load only the relevant guide and preserve the project's component system and installed version. The [pinned source](skills/kip/vendor/heroui-react/SOURCE.md) ships with every host installation; documentation helpers need network access, and runtime packages are installed only when the task calls for them.

Kip bundles GreenSock's eight official GSAP skills for core animation, timelines, ScrollTrigger, plugins, utilities, React, performance, and other frameworks. Animation tasks load only relevant topics alongside Kip's design guidance. Existing animation libraries and project dependencies stay authoritative. The [pinned source and MIT license](skills/kip/vendor/gsap-skills/SOURCE.md) ship with every host installation; adding the skills does not install the GSAP runtime into your website.

```sh
npm install
npm run dev
```

Use `npm run build` for a production build and `npm run preview` to preview it. Website dependencies are separate from the skill installation.

Run `npm test` for Kip's tests. `npm run test:audit` separately runs the unchanged upstream security-audit validator suite. Its CLI requires OS file-open protections unavailable in Windows Node; those upstream CLI tests fail there. Kip preserves that fail-closed behavior: full audits on an unsupported host report incomplete validation rather than bypassing the protections. Source inspection and in-memory schema checks do not establish full audit validation.

## References and license

- [Frontend design guidance and bundled sources](skills/kip/references/frontend-design.md)
- [Frontend engineering guidance](skills/kip/references/frontend-engineering.md)
- [Unslop guide](skills/kip/references/unslop.md)
- [Token efficiency and `trim`](skills/kip/references/token-efficiency.md)
- [Host orchestration and smoke checks](skills/kip/references/orchestration.md)
- [Project notes](skills/kip/references/notes.md)
- [Security-audit integration](skills/kip/references/security-audit.md)

Kip is licensed under [MIT](LICENSE). Bundled third-party skills retain their own licenses and source attributions.
