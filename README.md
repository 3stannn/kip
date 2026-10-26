# Kip

A portable coding skill for Codex, Claude Code, and Antigravity. Invoke Kip inside your existing chat, or let the host select it when relevant. Kip works with the model and tools already available in that session. No Kip sign-in, API key, server, or additional model process.

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

| Host | Global installation |
| --- | --- |
| Codex | `~/.codex/skills/kip/` (uses `$CODEX_HOME/skills/kip/` if set) and `~/.agents/skills/kip/` for current Codex discovery |
| Claude Code | `~/.claude/skills/kip/` |
| Antigravity App / IDE | `~/.gemini/config/skills/kip/` |
| Antigravity CLI | `~/.gemini/antigravity-cli/skills/kip/` |

Existing skill folders are never overwritten. If any selected destination already exists, installation stops before writing. To update, pull the repository, move your existing Kip folders aside, and rerun the installer. No host settings or project files are changed. Installed copies remain usable if the clone is moved or deleted. Restart the host or open a new session after installation.

Check installed files locally without signing in or running a model:

```sh
node bin/kip.js doctor
node bin/kip.js doctor --host codex
```

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

Kip adds no authentication step. The application you already use retains its own access requirements, model selection, usage limits, and approval rules. Kip does not select another model, bypass host restrictions, or require another subscription.

## Migration from the standalone runner

`kip login`, `kip status`, `kip plan`, and `kip run` are retired from the public CLI. They explain how to switch to chat invocation and never start authentication or inference. Existing `.kip` project files are left intact. The previous runner modules and their tests remain in `src/core.js` and `src/codex.js` for reference; the installer and current CLI do not import them.

The GitHub install command uses the files in your clone. Local changes must be committed and pushed before other people can clone those changes.

## Website development

The React website explains installation and builds chat prompts locally:

```sh
npm install
npm run dev
npm run build
npm run format:check
```

The development server binds to `127.0.0.1`. Website dependencies are unnecessary for skill installation. Optionally install the `kip` terminal helper with `npm install --global .` from this clone; `kip install` and `kip doctor` then mirror the Node commands above.

## Verification

```sh
npm test
npm run build
npm pack --dry-run
```

Installer tests use temporary home directories and check complete bundles, all host locations, conflict preservation, offline CLI execution, and retired commands. They do not perform model calls. Actual skill selection and tool execution depend on the host and should be smoke-tested in a new chat.

Host documentation: [Codex skills](https://learn.chatgpt.com/docs/build-skills), [Claude Code skills](https://code.claude.com/docs/en/skills), [Antigravity skills](https://antigravity.google/docs/skills).
