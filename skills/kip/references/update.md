# Update Kip

`/kip update` (or `$kip update` in Codex) requests a one-time pull from the Kip clone's configured upstream and refresh of installed skills. It does not schedule background updates or register a new host slash command.

1. Read `installation.json` beside the installed `SKILL.md` to find `sourceRoot`. In the source checkout, use the repository containing `bin/kip.js` and `src/install.js`. If the metadata is absent or the clone moved, inspect the current workspace for that clone; ask for its location only if it cannot be identified. Never pull the user's unrelated project or clone a replacement silently.
2. Run `node bin/kip.js update --host codex` from the identified clone in Codex, `--host claude` in Claude Code, or `--host antigravity` in Antigravity. An explicit `--host all` updates existing copies for all hosts. Accept only these host options; do not interpolate arbitrary extra command text. Quote paths using the host shell's rules. Do not select a model profile or launch agents.
3. The updater requires a clean Git working tree and a tracking branch, then runs `git pull --ff-only`. It stages replacements and saves the previous installations under `kip-backups/<id>/previous` outside host skill discovery. Custom skill edits remain in the backups; they are not merged. Missing installations are skipped; no new hosts are installed.
4. On a dirty clone, missing upstream, divergent branch, permissions problem, or network failure, report the actual blocker and stop. Do not reset files, force-pull, discard changes, remove locks, or retry repeatedly. Follow the host's existing approval flow if network or installation paths require it.
5. Report the actual updater result, revision change, and backup paths. Tell the user to restart the host or open a new session. Do not claim the running session reloaded the new instructions.

Older installations need a one-time bootstrap: pull the Kip clone and run `node bin/kip.js update --host <host>` in a terminal. After restarting, the installed skill includes this update workflow and its clone location. If the clone was removed, ordinary skill use still works; updating requires locating or restoring a clone.

Codex new installs use only `~/.agents/skills/kip`. If an older install has both this folder and `$CODEX_HOME/skills/kip` (default `~/.codex/skills/kip`), refresh archives the legacy duplicate outside skill discovery, retaining its files in the reported backup. A legacy-only installation is refreshed in place. Report archived duplicates separately from refreshed installations.
