# Token efficiency

Two uses: the `trim` purpose, which shrinks a project's agent context, and lean running, which any Kip task applies when the user asks to save tokens.

## `trim`: shrink agent context

Write boundary: only the agent context files in scope (instruction files, skills, agent and command definitions, rules, prompt templates). No source code, host settings, or third-party vendored skills: report a vendored file's cost and how it loads instead of editing it. Default tier is Solo; use Lean when many files change, so the reviewer can check for lost rules.

1. **Baseline.** Measure before editing, and save the JSON outside the project (a temp or scratch directory):
   ```text
   node "<kip-skill>/scripts/tokens.mjs" measure --root "<project-root>" --json [paths...]
   ```
   With no paths it finds `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, Copilot, Cursor, and Windsurf rules, and the `.claude`, `.agents`, `.codex`, `.gemini` folders. Pass paths for anything else, such as a skill repository's own `skills/` folder.
2. **Rank.** Context that loads in every session (root instruction files, skill frontmatter) costs tokens in every chat; skill bodies and references cost them only when used. Cut the always-loaded part first, then the largest on-demand files, then the repeated lines the report lists.
3. **Cut what does nothing:**
   - Rules repeated across files. Keep one source and link to it.
   - Host defaults and generic advice the model already follows ("write clean code", "be helpful", "think step by step").
   - Emphasis and filler: "IMPORTANT", "always remember to", "please make sure", motivational preambles, restated summaries.
   - Several examples where one shows the pattern; prose where a table or list is shorter.
   - Stale content: commands, paths, flags, or files that no longer exist (check before removing).
   - Detail needed only for one task type. Move it to an on-demand reference with a one-line pointer saying when to read it.
4. **Keep every working part:** each concrete rule, command, path, limit, prohibition, permission or safety rule, and output format. Keep skill `name` and the trigger terms in `description`, since descriptions decide when a skill loads. Shorten wording, not meaning. When unsure whether a line changes behavior, keep it.
5. **Verify.** Re-measure against the baseline:
   ```text
   node "<kip-skill>/scripts/tokens.mjs" compare --root "<project-root>" --baseline "<baseline-json>"
   ```
   Check that local links still resolve and run the project's own checks for these files, if any. List each removed or merged rule with where it now lives, or why it was redundant. The reviewer gets the diff and that list and checks for lost constraints, not style.
6. **Report** the before and after estimates (total, every-session, on-demand), what moved where, and anything left alone and why. The numbers are character-based estimates for comparison; never present them as billed tokens or claim runtime savings beyond them.

## Lean running (any purpose)

Apply these when the user asks Kip to save tokens, or a Budget or Minimum cost profile is active. They never override verification the purpose requires.

- Pick the smallest tier; reuse existing agents rather than starting new ones; never fork the conversation into a child.
- Search before reading: grep for symbols, then read line ranges. Do not read whole large files, lockfiles, generated output, or vendored code without a reason.
- Do not re-read a file you just wrote or edited; the edit result is enough.
- Keep command output small: quiet or summary reporters, `--silent`, and only the failing tests' output, filtered to the relevant lines. Re-run only the failing scope.
- Handoffs follow the [orchestration contract](orchestration.md): paths and line ranges plus a short digest, never whole skills or the conversation. Ask for brief reports.
- Keep chat replies to results, evidence, and limits; skip restating the task or narrating tool calls.
