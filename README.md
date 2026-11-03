# Kip

A coding workflow for Codex, Claude Code, and Antigravity. Kip coordinates workers and an independent reviewer inside your existing coding chat, using the host's models, tools, and permissions. No separate sign-in, API key, or server.

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
$kip deslop Improve the existing website’s typography and layout
$kip audit Audit this repository for security vulnerabilities
```

Use `/kip` instead of `$kip` in Claude Code and Antigravity. You can also say `Use Kip to <task>` in any supported host.

Kip uses host-native workers and an independent reviewer for actionable tasks. Available models and delegation controls depend on your host; profiles do not change the current chat's model.

These are chat purposes, not terminal commands:

| Purpose | Result |
| --- | --- |
| `build` | Implement the task and verify it. |
| `fix` | Investigate an issue, resolve it, and verify the fix. |
| `plan` | Return an implementation plan without changing source or notes. |
| `review` | Report actionable code findings without changing source or notes. |
| `ask` | Answer questions in chat with no persistent writes: no edits, reports, note updates, profile saves, or commands that generate files. |
| `deslop` | Improve an existing website using Kip's bundled design skills. Preserve its brand, functionality, and stack; compare before/after browser views and check relevant interactions. |
| `audit` | Run the bundled Cloudflare security-audit workflow. Keep target source and ordinary notes unchanged; write separate audit reports with evidence, remediation, and coverage gaps. |

`audit` does not apply fixes or probe live services. Runtime checks require the upstream workflow's execution isolation; unavailable checks are disclosed as validation gaps. Its staged delegation supports fresh independent validators within host capacity. Audit scope and available capabilities determine coverage, so a report is not a guarantee that a project is secure. See [Kip's security-audit adapter](skills/kip/references/security-audit.md).

## Project notes

Kip keeps concise, structured project memory in `.kip/notes.json`, separate from profile preferences and ignored by Git. New tasks retrieve relevant topics to find code and remember verified changes, decisions, pitfalls, and useful checks. Agents still inspect current task-relevant source: file fingerprints can flag changed dependencies, but cannot prove that a remembered conclusion remains correct.

Notes are bounded to 64 KiB, with a small retrieved context rather than an accumulated conversation history. The coordinating agent updates affected notes after verified `build`, `fix`, or `deslop` work. Workers propose updates; revision checks prevent concurrent chats silently overwriting each other. `ask`, `plan`, `review`, and `audit` only read notes. Missing notes trigger targeted discovery, without creating storage during a read-only task.

Memory persists across chats and supported hosts using the same project directory. Separate clones and worktrees have separate notes. Agents must not store credentials, transcripts, or saved permissions. See the [notes workflow](skills/kip/references/notes.md).

## Profiles

Choose from **Maximum, Balanced, Value, Budget,** and **Minimum cost**. Value is the recommended starting point.

```text
$kip profiles
$kip profile value
$kip build --profile maximum Fix the permissions bug
$kip profile reset
```

`profile value` saves the choice for this project across chats. `--profile` overrides it for one task. See the [host-specific profile settings](skills/kip/references/profiles.md).

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

## Website development

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
- [Host orchestration and smoke checks](skills/kip/references/orchestration.md)
- [Project notes](skills/kip/references/notes.md)
- [Security-audit integration](skills/kip/references/security-audit.md)

Kip is licensed under [MIT](LICENSE). Bundled third-party skills retain their own licenses and source attributions.
