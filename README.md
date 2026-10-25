# Kip

Folder-based JavaScript orchestration using your signed-in Codex account. No API key required. Requires Node.js 22+, npm, and a current Codex CLI supporting `--ignore-user-config`.

## Setup

```sh
npm install --global @openai/codex
# From this Kip package directory:
npm install --global .
# From your target project:
kip install
kip login
kip status
kip plan "Build an accessible React login" --file src/App.jsx
kip run "Build an accessible React login" --file src/App.jsx
```

Complete the browser sign-in with your ChatGPT account. Existing Codex ChatGPT sign-in is reused. Account eligibility, workspace policy, available Codex models and usage limits still apply. Kip cannot inherit the model selected in an open chat or unlock arbitrary ChatGPT models. It delegates authentication and credential refresh to Codex and never reads or copies its credential files. API-key sign-in is rejected, and API credential environment overrides are removed from child processes.

This package is local and has not been published to npm. For development, use `node /absolute/path/to/orchestrator/bin/kip.js` in place of `kip`.

## Workflow

`kip install` creates `.kip/config.json`, editable `.kip/skills/<name>/SKILL.md`, and a Git ignore rule for run artifacts. Reinstall preserves existing files. The eight skills are frontend-design, responsive-design, anti-ai-slop, token-efficiency, security, testing, frontend and backend. The additional kip-orchestrator skill documents operating the CLI.

`kip plan "task"` selects relevant skills using deterministic keywords, always including token-efficiency and anti-ai-slop. It reports context bytes offline without account access. Repeat `--file relative/path` for explicit text files or `--skill security` to add a specialty. Review routing before a run.

`kip run "task"` checks ChatGPT authentication, starts one ephemeral Codex execution, and records output and reported usage in `.kip/runs/<id>.json`. It does not apply generated patches. Failed turns are saved and return a failing exit code; process/transport failures may occur before an artifact is available. Kip never retries or escalates automatically, although Codex itself may make multiple requests or perform its own retries.

Models default to Codex's own default. Set `models.standard` or `models.complex` to a supported Codex model ID, or use `--model id`. `--tier complex` uses the complex entry; a null entry leaves selection to Codex. Version 1 API model settings are ignored at runtime so old API defaults do not select unsupported subscription models. User files are preserved.

The runner ignores user Codex configuration and rules, enforces ChatGPT authentication and the OpenAI provider, disables the shell tool, uses read-only sandboxing, and runs in an empty temporary directory. Prompts instruct it to use only supplied excerpts and avoid tools. These controls are not an operating-system isolation boundary for every possible read. Managed Codex policies still apply. Kip does not claim that Codex receives only the visible prompt: Codex also adds its own instructions and context.

## Efficiency and privacy

`maxContextBytes` limits the assembled task, skills and explicit files; oversized context fails rather than silently dropping content. `timeoutMs` limits each execution. There is no hard output-token or dollar limit in this account-backed runner. Old `maxOutputTokens` settings are unused. Usage comes from Codex events when available; compare a measured baseline before claiming savings.

Path traversal, escaping symlinks, common secret filenames, binary files and oversized files are rejected. Filename checks are not a secret scanner: review file contents before sending them. Skill files are trusted instructions and are sent with the task. Run artifacts may contain sensitive output. Authentication, provider data handling, entitlement checks, and plan limits belong to Codex and the user's account. No direct Responses API requests are made by Kip.

## Verification

```sh
npm test
npm pack --dry-run
```

Tests use a mocked Codex process boundary and temporary projects. No account inference is needed. Live subscription access must be verified separately.

References: [Codex authentication](https://learn.chatgpt.com/docs/auth), [non-interactive execution](https://learn.chatgpt.com/docs/non-interactive-mode).

Frontend and visual-design tasks also load `responsive-design` automatically. Use `kip plan "Fix mobile overflow"` or add `--skill responsive-design` explicitly. The skill covers fluid layouts, narrow through ultrawide viewports, zoom, orientation, content stress, and practical browser verification.
