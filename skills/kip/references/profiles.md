# Kip profiles

Profiles are instructions interpreted by the installed skill in chat, not terminal commands or host slash-command registrations. They use the current host's tools; there is no Kip model service.

## Commands and selection

Use `$kip` in Codex, `/kip` in Claude Code or Antigravity, or equivalent natural language:

```text
$kip profiles
$kip profile
$kip profile value
$kip profile 2
$kip build --profile premium Add authentication
$kip profile reset
```

- `profiles`: list all seven presets, their role settings, and the current selection.
- `profile`: show the current chat selection, or `host defaults` if unset.
- `profile <name|number>`: select a preset for subsequent Kip tasks in this chat. Confirm its name and role settings, without launching agents or requiring a task.
- `<purpose> --profile <name|number> <instructions>`: apply a preset to this task only. Preserve the chat selection afterward. Parse the flag in the invocation's options, not quoted task content or code. Reject missing, unknown, or conflicting profile values and show valid choices without executing the task.
- `profile reset`: clear the chat selection and return to host defaults.

Names are case-insensitive; accept the display name with spaces or its slug below. Numbers 1–7 are aliases. Carry the current selection through chat summaries. A new chat starts with host defaults; do not write profile state into project files, installed skills, or host settings. Selecting a profile does not change running agents; apply it when dispatching the next task. A task override also works without a prior selection.

## Presets

Ordered by intended cost, highest to lowest; actual usage depends on tokens, task complexity, and host billing. Effort is a requested thinking setting, not a fixed token budget.

| #   | Name (slug)                   | Root          | Reviewer      | Worker 1      | Worker 2      |
| --- | ----------------------------- | ------------- | ------------- | ------------- | ------------- |
| 1   | Maximum (`maximum`)           | Astra / ultra | Astra / ultra | Astra / high  | Astra / high  |
| 2   | Premium (`premium`)           | Astra / xhigh | Astra / high  | Sol / high    | Sol / high    |
| 3   | Strong lead (`strong-lead`)   | Astra / high  | Sol / high    | Sol / medium  | Sol / medium  |
| 4   | Balanced (`balanced`)         | Sol / high    | Sol / high    | Sol / medium  | Sol / medium  |
| 5   | Value (`value`)               | Sol / high    | Sol / medium  | Luna / medium | Luna / medium |
| 6   | Budget (`budget`)             | Sol / medium  | Luna / high   | Luna / low    | Luna / low    |
| 7   | Minimum cost (`minimum-cost`) | Luna / medium | Luna / medium | Luna / low    | Luna / low    |

Exact model IDs: Astra = `gpt-6-astra`, Sol = `gpt-6.1-sol`, Luna = `gpt-6-luna`. Recommend Value when asked for a default; do not select it silently.

## Applying a selected profile

1. The current chat is the single root. The root owns planning, integration, validation, and the final response. Report the requested root model and effort; users must select those in their host app. Do not claim that reading a profile changed the current model or its thinking effort. If actual settings are unavailable, say they are unverified. Continue useful work under the current settings while disclosing any known mismatch.
2. Selecting a profile for an implementation task requests one reviewer and two workers through host-native delegation, subject to host instructions and available capabilities. Never spawn agents for profile display or selection alone. A plan-only request stays a plan. Without delegation support, execute the roles sequentially in the current chat and disclose that the requested role models and efforts were not applied.
3. Inspect the host tool schema and available models before dispatch. Pass exact model IDs and reasoning effort through supported tool parameters. Where a fresh context is required for overrides, use it and supply the task, project instructions, file ownership, acceptance criteria, selected role settings, and relevant context explicitly. Never invent tool parameters or use a separate CLI/API process to bypass the host.
4. If a requested model or effort is unavailable, state which role/settings cannot be applied. Use host inheritance where allowed, identifying the effective settings or marking them unverified; never silently substitute a model, map OpenAI names onto other vendors, or claim the preset fully applied. Respect a user requirement for exact settings by waiting for that requirement to be resolved before dispatching affected work.
5. Assign the two workers distinct, useful scopes. Run independent work concurrently only when supported and safe; serialize dependencies and shared-file edits. Reuse workers within a task rather than creating extra workers. If a task cannot usefully divide into two scopes, avoid idle agents and disclose the reduced team.
6. Use one reviewer to inspect the integrated result for correctness, regressions, and missing verification. Have workers resolve actionable findings, then complete appropriate checks. Keep the reviewer independent of implementation. Do not delegate further agents from these three roles.
7. At dispatch, briefly identify the selected profile and any limitations. In the result, report material deviations from requested role settings and actual verification. Do not claim measured cost savings without usage data.
