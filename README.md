# Kip

A portable coding skill for Codex, Claude Code, and Antigravity. Invoke Kip inside your existing chat, or let the host select it when relevant. Kip works with the model and tools already available in that session. No Kip sign-in, API key, server, or separate runner.

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

Existing skill folders are never overwritten. If any selected destination already exists, installation stops before writing. See [Update an existing installation](#update-an-existing-installation) to refresh installed copies. No host settings or project files are changed. Installed copies remain usable if the clone is moved or deleted. Restart the host or open a new session after installation.

Check installed files locally without signing in or running a model:

```sh
node bin/kip.js doctor
node bin/kip.js doctor --host codex
```

## Update an existing installation

Installed skills are copies of the repository files, so pulling the repository alone does not update them.

1. Open a terminal in your existing Kip clone and fetch the latest changes:

   ```sh
   cd path/to/kip
   git pull --ff-only
   ```

   Replace `path/to/kip` with your clone's location. If Git reports local changes or diverged branches, resolve those before continuing.

2. Move the existing `kip` folders for the hosts you want to update to a backup location **outside the hosts' skill directories**. Use the installation paths in the table above. For Codex, move both copies, including the one under `~/.agents/skills/`; if `CODEX_HOME` is set, use its `skills/kip/` path instead of `~/.codex/skills/kip/`. For Antigravity, move both the App / IDE and CLI copies. Keep any custom edits in the backup for reference.

3. Reinstall and check the updated files:

   ```sh
   node bin/kip.js install
   node bin/kip.js doctor
   ```

   These commands target every supported host. To update only one host, add the same host option to both commands:

   ```sh
   node bin/kip.js install --host codex
   node bin/kip.js doctor --host codex
   ```

   Replace `codex` with `claude` or `antigravity` as needed. Every existing destination for the selected host must be moved aside before installation; the installer stops if any destination still exists. Custom edits are not merged automatically.

4. Restart your coding host or open a new session so it discovers the refreshed skill. In chat, run `$kip profiles` in Codex or `/kip profiles` in Claude Code or Antigravity to view the bundled profile catalog.

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

Kip's metadata permits implicit selection for staged coding work across specialties. The host decides when to select it; explicit invocation is the reliable choice. `/kip` is an invocation intent understood by the instructions when passed through to the model, but registering an arbitrary `/kip` command in Codex is controlled by Codex. Use `$kip` there if `/kip` is not offered.

Kip interprets the purpose and instructions, inspects the relevant project context, loads only the supporting guidance needed, then performs the work with the current host's tools and permissions. It supports frontend design, responsive design, frontend, backend, security, testing, token efficiency, and refinement of code and copy. A request for a plan produces a plan; an implementation request continues through changes and appropriate verification.

Kip adds no authentication step. The application you already use retains its own access requirements, model selection, usage limits, and approval rules. Optional profiles request role models through host-native delegation; they do not change the current chat's model or require another subscription.

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

Use `/kip` instead of `$kip` in Claude Code and Antigravity. These are chat instructions, not terminal commands. `profile value` selects Value for later tasks in the same chat; `--profile premium` overrides it for one task. `profile` shows the selection and `profile reset` clears it. New chats use host defaults until you choose a profile.

Seven presets run from most to least expensive: **Maximum, Premium, Strong lead, Balanced, Value, Budget, Minimum cost**. Select by slug (`strong-lead`, `minimum-cost`) or number 1–7. Each specifies one root, one reviewer, and two workers, including model and thinking effort. See the [complete profile table](skills/kip/references/profiles.md); Value is the recommended starting point.

Select the root model and thinking effort in your host app. Kip applies reviewer and worker settings only when the host exposes suitable delegation tools and model controls. Unsupported settings are disclosed; hosts without delegation execute roles sequentially using the current model. Profiles do not add OpenAI models to Claude Code or Antigravity. Actual cost depends on task usage and host billing.

For an older installation, follow [Update an existing installation](#update-an-existing-installation) to install the bundled profile catalog.

## Command reference

Run terminal commands from your cloned Kip folder. In chat, use `$kip` for Codex or replace it with `/kip` for Claude Code and Antigravity. Replace placeholders such as `<task>` and `<name>` with your instructions or choice.

| Where    | Command                                            | What it does                                                                            |
| -------- | -------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Terminal | `node bin/kip.js --help`                           | Show installation, invocation, and profile help.                                        |
| Terminal | `node bin/kip.js install`                          | Install the skill for every supported host.                                             |
| Terminal | `node bin/kip.js install --host <host>`            | Install for `codex`, `claude`, or `antigravity`; `all` installs for every host.         |
| Terminal | `node bin/kip.js doctor`                           | Check installed skill files for every supported host.                                   |
| Terminal | `node bin/kip.js doctor --host <host>`             | Check installed files for the selected host. Accepts the same host values as `install`. |
| Chat     | `$kip build <task>`                                | Implement the requested feature and run appropriate checks.                             |
| Chat     | `$kip fix <issue>`                                 | Investigate and fix the described issue.                                                |
| Chat     | `$kip plan <task>`                                 | Produce a plan for the task.                                                            |
| Chat     | `$kip review <scope>`                              | Review the specified code or changes.                                                   |
| Chat     | `$kip <purpose> <instructions>`                    | Apply Kip to another purpose described in your own words.                               |
| Chat     | `$kip profiles`                                    | List all seven profiles, their models and thinking efforts, and the current selection.  |
| Chat     | `$kip profile`                                     | Show the current chat's selected profile, or host defaults if unset.                    |
| Chat     | `$kip profile <name>`                              | Select a profile for later Kip tasks in this chat, such as `value` or `strong-lead`.    |
| Chat     | `$kip profile <number>`                            | Select a profile by number, from `1` (Maximum) to `7` (Minimum cost).                   |
| Chat     | `$kip <purpose> --profile <name-or-number> <task>` | Override the profile for one task without changing the chat's selection.                |
| Chat     | `$kip profile reset`                               | Clear the chat's profile selection and return to host defaults.                         |
| Chat     | `Use Kip to <task>`                                | Invoke Kip using natural language in any supported host.                                |

Chat commands are instructions interpreted by the skill. Model selection, thinking effort, and delegation remain subject to host support as described above.

Host documentation: [Codex skills](https://learn.chatgpt.com/docs/build-skills), [Claude Code skills](https://code.claude.com/docs/en/skills), [Antigravity skills](https://antigravity.google/docs/skills).
