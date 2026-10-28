# Kip

A focused workflow for Codex, Claude Code, and Antigravity. Give Kip one task in your existing coding chat and it loads only the guidance that task needs, using the model, tools, and permissions already available there. No Kip sign-in, API key, server, or separate runner.

[Website](https://usekip.vercel.app) · [Install](#install-from-github) · [Update](#update-an-existing-installation) · [Profiles](#switch-profiles-in-chat) · [Command playground](#command-playground) · [Local development](#run-the-website-locally)

## Install from GitHub

Requires Git and Node.js 22+. No npm install or dependencies are needed to install the skill.

```sh
git clone https://github.com/3stannn/kip.git
cd kip
node bin/kip.js install
```

This installs a self-contained copy for every supported host. To install just one:

```sh
node bin/kip.js install --host codex
node bin/kip.js install --host claude
node bin/kip.js install --host antigravity
```

| Host                  | Global installation                                                                                                    |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Codex                 | `~/.codex/skills/kip/` (uses `$CODEX_HOME/skills/kip/` if set) and `~/.agents/skills/kip/` for current Codex discovery |
| Claude Code           | `~/.claude/skills/kip/`                                                                                                |
| Antigravity App / IDE | `~/.gemini/config/skills/kip/`                                                                                         |
| Antigravity CLI       | `~/.gemini/antigravity-cli/skills/kip/`                                                                                |

The `install` command never overwrites existing skill folders. If any selected destination already exists, installation stops before writing. Use [update](#update-an-existing-installation) to back up and replace installed copies. No host settings or project files are changed. Installed copies remain usable if the clone is moved or deleted; updating requires a clone. Restart the host or open a new session after installation.

Check installed files locally without signing in or running a model:

```sh
node bin/kip.js doctor
node bin/kip.js doctor --host codex
```

## Update an existing installation

In your coding chat, submit:

```text
$kip update
```

Use `/kip update` in Claude Code or Antigravity. The skill locates its source clone and runs the updater for your current host, subject to that host's tools and permissions. This is a one-time update when requested, not a background auto-update. In Codex, use `$kip update` if `/kip` is not offered.

| Host        | Submit in chat |
| ----------- | -------------- |
| Codex       | `$kip update`  |
| Claude Code | `/kip update`  |
| Antigravity | `/kip update`  |

To explicitly update existing copies across every host from chat, submit `$kip update --host all` in Codex or `/kip update --host all` in Claude Code or Antigravity.

You can also run it directly from your Kip clone:

```sh
node bin/kip.js update
```

This runs `git pull --ff-only` from the current branch's configured upstream, backs up installed Kip folders, and refreshes them from the pulled source. It updates existing installations only; it does not install missing hosts. Git, Node.js 22+, network access to the upstream, and a clean clone with a tracking branch are required. Dirty or divergent clones stop the update without discarding work. A pull failure leaves installed copies unchanged. A replacement failure attempts to restore the previous copies and reports any backups that need manual restoration. If the pull succeeded before a later failure, the clone remains at the pulled revision.

To update and check just one host:

```sh
node bin/kip.js update --host codex
node bin/kip.js doctor --host codex
```

Replace `codex` with `claude` or `antigravity` as needed. Backups are kept outside skill discovery in `kip-backups/<id>/previous` beside each host's `skills` directory. The updater prints every backup path. Custom skill edits are retained in those backups and are not merged into the new files. New installs record their clone location in `installation.json`; if you move the clone, supply its new location when asked.

Restart your coding host or open a new session after updating. Pulling the repository alone does not refresh installed skill copies.

### First update from an older installation

Older installed skills do not yet know the update command. Bootstrap it once in a terminal from your existing clone:

```sh
git pull --ff-only
node bin/kip.js update --host codex
```

Use your host name, or omit `--host codex` to refresh all existing host installations. Restart the host; subsequent updates can use the chat command. If Git reports local changes or diverged branches, resolve those before continuing. You no longer need to move installed skill folders aside manually.

## Invoke in chat

In Codex, explicitly select the skill with `$kip` or the `/skills` picker:

```text
$kip build Create an accessible React login in this project and verify it.
```

In Claude Code and Antigravity, use the skill slash command:

```text
/kip build Create an accessible React login in this project and verify it.
```

In every host, a natural language request also works:

```text
Use Kip to fix mobile overflow in the dashboard.
```

Kip supports both implicit activation for suitable multi-step coding work and explicit invocation through `$kip`, `/kip`, or a natural language Kip request. Both paths use the same worker-and-reviewer workflow for actionable tasks; neither requires an extra 'use subagents' instruction. The host decides whether to select the skill automatically; explicit invocation is the reliable choice. `/kip` is an invocation intent understood by the instructions when passed through to the model, but registering an arbitrary `/kip` command in Codex is controlled by Codex. Use `$kip` there if `/kip` is not offered.

Kip interprets the purpose and instructions, restores the project profile, inspects the relevant project context, loads only the supporting guidance needed, then performs the work with the current host's tools and permissions. It supports frontend design, responsive design, frontend, backend, security, testing, token efficiency, and refinement of code and copy. Supporting skills are namespaced `kip-*` and apply to Kip tasks. Conditional framework references load only when needed. A request for a plan produces a plan; an implementation request continues through changes and appropriate verification.

Kip adds no authentication step. The application you already use retains its own access requirements, model selection, usage limits, and approval rules. Actionable Kip tasks automatically use host-native subagents. Profiles set the role models; they do not change the current chat's model or require another subscription.

The bundled orchestration adapters explain native dispatch and result collection for [Claude Code](skills/kip/references/orchestration-claude.md) and [Antigravity](skills/kip/references/orchestration-antigravity.md). Claude uses its session's `Agent` tool; Antigravity uses transient definitions and native invocation where available. Kip checks the exposed controls, supplies scoped context, integrates worker changes, and sends the result to a separate reviewer. Children are explicitly prohibited from starting recursive Kip teams. No vendor CLI runner or persistent host agent configuration is added.

Host capabilities vary by version and surface. Bundle checks and documentation review do not demonstrate live execution in another host. The [host smoke checklist](skills/kip/references/orchestration.md#host-smoke-checks) covers dispatch, continuation, independent review, profile resolution, and unsupported controls; report actual host runs separately from static checks.

## Website design direction

For website creation and UI edits, Kip defaults to [shadcn/ui components](skills/kip/references/frontend-shadcn.md) in compatible React projects. It initializes the needed setup when no component system exists, reuses local UI components, adds only what the task needs, and applies the chosen design through shared tokens and variants. Established alternative component systems, non-React stacks, and small repair scopes are preserved. The bundled guidance covers setup, component selection, customization, accessibility, and verification using the [official documentation](https://ui.shadcn.com/docs).

Kip's bundled frontend design guidance uses [one shared typography and component system](skills/kip/references/frontend-system.md): one font family (Geist by default), readable 14px minimum supporting text and 16px body/control text, and reusable component variants. [Portfolio guidance](skills/kip/references/portfolio-design.md) requires choosing and implementing one primary skill: [Marwie Ang](skills/kip/references/marwieang.md) for work-focused personal portfolios (default), or [Bryl Lim](skills/kip/references/bryllim.md) for editorial/writing/archive portfolios. Kip states the selected filename, reads its relevant implementation sections, and reviews the rendered result against that choice; [other websites draw from Kip's own website](skills/kip/references/website-art-direction.md), with product interactions only when useful. Explicit briefs and existing brands take precedence. Boxed status dashboards, placeholder avatar tiles, oversized theme widgets, and contact pill clusters are rejected defaults. These references ship inside Kip; refresh an existing installation to receive them.

Kip also bundles [layout selection guidance](skills/kip/references/website-layouts.md) inspired by [Figma's twelve website layout ideas](https://www.figma.com/resource-library/website-layout-ideas/). It covers grids, split and asymmetric compositions, full-screen openings, horizontal collections, cards, editorial and gallery structures, zig-zag and F-pattern reading, interaction, and animation. Choose by the visitor's task and available content, then adapt for responsive behavior and accessibility within the selected visual system.

## Switch profiles in chat


After installing the skill, use these prompts in your coding chat:

```text
$kip profiles
$kip profile value
$kip build Add authentication
$kip build --profile premium Fix the permissions bug
$kip profile
$kip profile reset
```

Use `/kip` instead of `$kip` in Claude Code and Antigravity. These are chat instructions, not terminal commands. `profile value` saves Value for later tasks in this project, including new chats; `--profile premium` overrides it for one task. `profile` shows the selection and `profile reset` clears it. The helper stores only the profile slug in `.kip/profile.json`, ignored through `.kip/.gitignore`. New chats restore that project selection; other projects use their own selection or host defaults. If persistence is unavailable, Kip reports a chat-only selection.

Seven presets progress toward lower intended cost: **Maximum, Premium, Strong lead, Balanced, Value, Budget, Minimum cost**. Select by slug (`strong-lead`, `minimum-cost`) or number 1–7. Each specifies settings for a root, two workers, and one independent reviewer. The same saved slug resolves to native settings for the host running the task:

| Host | Profile model choices | Thinking controls |
| --- | --- | --- |
| Codex | Astra, Sol, Luna | Requested effort for each role |
| Claude Code | `opus`, `sonnet`, `haiku` aliases | Requested effort where the resolved model and host support it |
| Antigravity | Pro/Flash root model families; `pro`/`flash` agent tiers | Root reasoning level; agent effort remains host-controlled |

See the [complete host-specific profile tables](skills/kip/references/profiles.md); Value is the recommended starting point. A project saved as Value uses Claude settings when opened in Claude Code and Antigravity settings when opened there. No memory migration or new command is needed. Antigravity has fewer independent controls, so some role settings overlap and cost order is approximate. Model aliases and tiers resolve through the host; available models can vary by plan and version.

Select the root model and thinking effort in your host app. Whether the host selects Kip implicitly or the user invokes it explicitly, an actionable task uses host-native workers and an independent reviewer; no extra “use subagents” phrase is needed. An explicit or remembered profile assigns two workers and one independent reviewer. Without a profile, Kip uses host-inherited settings for at least one worker and an independent reviewer. Assign bounded scopes, serialize shared-file edits, and prohibit recursive delegation. A plan or review task can delegate analysis but stays read-only. Profile list/show/select/reset and update commands alone do not launch a coding team.

An explicit request to work solo or use a smaller team overrides the default. When capacity is limited, Kip stages the roles. If required delegation is unavailable or blocked by higher-priority limits, Kip reports the blocker and stops affected execution; it does not automatically implement alone or claim agents ran. Unsupported model or effort settings are disclosed before affected delegation. Profiles use each host's available models and controls; they do not grant access to models or change the current chat's settings. Actual cost depends on task usage and host billing.

For an older installation, follow [Update an existing installation](#update-an-existing-installation) to install the bundled profile catalog.

## Command playground

The [Kip website](https://usekip.vercel.app) includes a quick-start guide, the complete profile explorer, update instructions, and two ways to prepare a prompt:

- **Guided builder:** choose your coding host, task purpose, and optional model profile. Copy an explicit invocation or natural language prompt into your coding chat.
- **Type a command:** type `$kip ` or `/kip ` to see matching commands. Suggestions also cover profile names, `--profile`, and `update --host` options. Use the arrow keys to choose, Tab or Enter to complete, and Escape to dismiss. You can also click a suggestion.

The profile explorer shows the selected host's requested role settings for all seven profiles. Choosing a profile applies it and its host to the guided builder. The update guide provides commands for each host, a terminal alternative, and bootstrap steps for older installations.

The playground prepares text to copy; it does not execute commands or change host settings. Its autocomplete belongs to the website and does not add a suggestion dropdown to your host's chat input.

## Run the website locally

From the repository root, install the website dependencies and start Vite:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To build and preview the production website:

```sh
npm run build
npm run preview
```

These dependencies are for the React website. Installing or updating the Kip skill uses the Node.js CLI above and does not require `npm install`.

## Command reference

Run terminal commands from your cloned Kip folder. In chat, use `$kip` for Codex or replace it with `/kip` for Claude Code and Antigravity. Replace placeholders such as `<task>` and `<name>` with your instructions or choice.

| Where    | Command                                            | What it does                                                                            |
| -------- | -------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Terminal | `node bin/kip.js --help`                           | Show installation, invocation, and profile help.                                        |
| Terminal | `node bin/kip.js install`                          | Install the skill for every supported host.                                             |
| Terminal | `node bin/kip.js install --host <host>`            | Install for `codex`, `claude`, or `antigravity`; `all` installs for every host.         |
| Terminal | `node bin/kip.js doctor`                           | Check installed skill files for every supported host.                                   |
| Terminal | `node bin/kip.js doctor --host <host>`             | Check installed files for the selected host. Accepts the same host values as `install`. |
| Terminal | `node bin/kip.js update [--host <host>]`           | Pull upstream changes, back up existing skills, and refresh selected installations.     |
| Chat     | `$kip update [--host <host>]`                      | Update Kip for the current host, or an explicitly selected host.                        |
| Chat     | `$kip build <task>`                                | Implement the requested feature and run appropriate checks.                             |
| Chat     | `$kip fix <issue>`                                 | Investigate and fix the described issue.                                                |
| Chat     | `$kip plan <task>`                                 | Produce a plan for the task.                                                            |
| Chat     | `$kip review <scope>`                              | Review the specified code or changes.                                                   |
| Chat     | `$kip <purpose> <instructions>`                    | Apply Kip to another purpose described in your own words.                               |
| Chat     | `$kip profiles`                                    | List the current host's seven profiles, role settings, and current selection.  |
| Chat     | `$kip profile`                                     | Show the saved project profile, or host defaults if unset.                    |
| Chat     | `$kip profile <name>`                              | Save a profile for later Kip tasks in this project, such as `value` or `strong-lead`.    |
| Chat     | `$kip profile <number>`                            | Select a profile by number, from `1` (Maximum) to `7` (Minimum cost).                   |
| Chat     | `$kip <purpose> --profile <name-or-number> <task>` | Override the profile for one task without changing the saved project selection.                |
| Chat     | `$kip profile reset`                               | Clear the saved project profile and return to host defaults.                         |
| Chat     | `Use Kip to <task>`                                | Invoke Kip using natural language in any supported host.                                |

Chat commands are instructions interpreted by the skill. Model selection, thinking effort, and delegation remain subject to host support as described above.

Host documentation: [Codex skills](https://learn.chatgpt.com/docs/build-skills), [Claude Code skills](https://code.claude.com/docs/en/skills), [Antigravity skills](https://antigravity.google/docs/skills).

## License

Kip is licensed under the [MIT License](LICENSE).
