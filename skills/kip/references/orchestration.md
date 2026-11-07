# Kip orchestration contract

Applies to Lean, Full, and Audit tiers (see `SKILL.md`). The root plans, coordinates, integrates, and answers. Children never orchestrate or create subagents.

## Preflight

Use only the current host's adapter and its native delegation tools; the running tool schema decides valid arguments. Confirm you can start a worker, collect its result, continue it, and run a separate reviewer. Resolve the profile against the adapter's table and disclose unsupported model/effort controls in the one-line dispatch update (tier, profile, roles). Never launch a vendor CLI, write persistent agent files, or change host settings.

## Handoffs

Children start cold, so the handoff is what keeps them cheap. Send each one:

- Outcome, purpose and write boundary, project root, owned files (disjoint across workers), acceptance checks, stop condition.
- The exact files and line ranges to start from, plus relevant note facts, so they do not re-explore the repo.
- A digest of applicable guidance (10–20 lines) and paths to only the specific rules they must apply. Do not send whole skills or the conversation.
- This line: "You are a scoped Kip worker/reviewer. Do not invoke Kip orchestration or create subagents. Complete only this assignment and report to the parent."
- Required report: changed paths or findings, checks run with results, proposed note facts with evidence, blockers. Keep it brief; no restating the task.

Use a read-only/research agent type for pure investigation. Workers never write notes. Reviewers do not edit.

## Flow

1. Dispatch workers; run independent ones in parallel, serialize shared-file or dependent edits.
2. Inspect returned diffs and evidence before relying on them; the root may make small integration fixes but must not redo the whole task.
3. Give the reviewer the integrated diff, acceptance checks, and verification already run. The reviewer assesses; it does not repeat the full test suite or re-audit untouched code.
4. Route findings to the existing worker; recheck only what changed.

## Limits and continuity

Ordinary tasks use at most the tier's agents for the whole task, including replacements; only `audit` exceeds this, per its adapter. Reuse existing agents for follow-ups in scope. Wait for completion notifications rather than polling. If capacity blocks parallel roles, stage them. Keep a compact ledger (agents, settings, ownership, pending findings, checks) through compaction.

If delegation is unavailable or fails after one focused recovery, name the missing capability and affected roles, and ask whether to continue solo; a Solo-sized task may proceed solo with disclosure. Never role-play agents or describe sequential root passes as independent review.
