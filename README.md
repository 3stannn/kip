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
```

Use `/kip` instead of `$kip` in Claude Code and Antigravity. You can also say `Use Kip to <task>` in any supported host.

Kip uses host-native workers and an independent reviewer for actionable tasks. Available models and delegation controls depend on your host; profiles do not change the current chat's model.

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

```sh
npm install
npm run dev
```

Use `npm run build` for a production build and `npm run preview` to preview it. Website dependencies are separate from the skill installation.

## References and license

- [Frontend design guidance and bundled sources](skills/kip/references/frontend-design.md)
- [Frontend engineering guidance](skills/kip/references/frontend-engineering.md)
- [Host orchestration and smoke checks](skills/kip/references/orchestration.md)

Kip is licensed under [MIT](LICENSE). Bundled third-party skills retain their own licenses and source attributions.
