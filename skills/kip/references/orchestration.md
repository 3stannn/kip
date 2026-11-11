# Kip orchestration contract

Applies to Lean, Full, and Audit tiers (see `SKILL.md`). The root plans, coordinates, integrates, and answers. Children never orchestrate or create subagents.

Naming Kip on a task of these tiers is the user's explicit request for subagents: dispatch them even where the host's default is not to spawn agents unasked. A stated tier is a commitment. The root does not quietly do a worker's job or stand in for the reviewer.

## Roles

| Purpose | Worker | Reviewer |
| --- | --- | --- |
| `build` / `fix` / `unslop` | Implements its owned files and runs their checks. | Assesses the integrated change against the acceptance checks. |
| `plan` | Read-only: maps the code the plan depends on (files, lines, constraints, risks). | Checks the root's draft plan against source: wrong assumptions, missed files, bad ordering. |
| `review` | Read-only: finds issues in scope, each with evidence. | Confirms or rejects each finding against source and adds any blocking miss. |

The reviewer is always a new agent that did none of the work: never a continued worker, never the root. Reviewers do not edit. Workers never write notes. Read-only roles use the host's read-only or research agent type where it fits the job. `audit` takes its roles, stages, and report formats from its adapter.

## Preflight

Use only the current host's adapter and its native delegation tools; the running tool schema decides valid arguments. Confirm from that schema, without test calls, that you can start a worker, collect its result, continue it, and run a separate reviewer. Resolve the profile against the adapter's table and disclose unsupported model/effort controls in the dispatch update. Never launch a vendor CLI, write persistent agent files, or change host settings.

## Dispatch order

1. Split the work: owned files per worker (disjoint across workers), acceptance checks, stop conditions. Post the one-line dispatch update (tier, profile, roles).
2. Start the workers: independent ones in parallel in one turn, shared-file or dependent edits one after another. While a worker owns files, the root does not edit them.
3. Wait for every worker's result through the host's completion signal, not polling. Never write, predict, or summarize a result that has not arrived.
4. Inspect returned work through the diff (summary first, then the hunks that matter) and the reported evidence; do not re-read whole changed files. Integrate, making only small integration fixes and never redoing the task, then run verification.
5. Only now start the reviewer, on the integrated and verified result: never alongside the workers, never before there is something to review.
6. The root fixes trivial findings itself and sends the rest to the worker that owns those files, as a follow-up to that same agent. Send the fixes back to the same reviewer; recheck only what changed, in one round unless a blocking finding remains.
7. Report done only after the reviewer has answered and every blocking finding is fixed or listed as open. Name any role that did not run, and why.

## Handoffs

Children start cold, and anything pasted is paid for twice: written by the root, then read by the child. Point, don't paste: no file contents, diffs, or logs the child can read itself, no whole skills, no conversation. The root locates with notes and search and leaves full reads of delegated files to their owner. Fill every line of this template; a missing line is what sends a child exploring or out of scope.

```text
You are a scoped Kip <worker|reviewer>. Do not invoke Kip orchestration or create subagents. Complete only this assignment and report to the parent.
Outcome: <what must be true when you stop>
Boundary: <purpose; worker: files you may write | read-only role: edit nothing>
Project root: <path>
Scope: <worker: owned files | reviewer: changed paths and how to view the change, e.g. git diff -- <paths>>
Start at: <file:line ranges>
Known facts: <relevant note facts, or none>
Guidance: <10–20 line digest, plus paths to the specific rules to apply>
Checks: <acceptance checks | reviewer: also the verification already run and its results>
Stop when: <condition>. If blocked, stop and report; do not widen the scope.
Work lean: search before reading; do not re-read files you edited; keep command output small; reply briefly.
Report, 20 lines at most: <worker: changed paths, checks run with results, note facts with evidence, blockers | reviewer: verdict (accept or changes needed), then each finding as severity (blocking, should-fix, nit), file:line, problem, evidence>
```

Paste a diff only when the reviewer cannot produce it. The reviewer assesses; it does not repeat the full test suite or re-audit untouched code.

## Limits and continuity

Ordinary tasks use at most the tier's agents for the whole task, including replacements; only `audit` exceeds this, per its adapter. Reuse existing agents for follow-ups in scope. If capacity blocks parallel roles, stage them. Keep a compact ledger (agents, settings, ownership, pending findings, checks) through compaction.

If delegation is unavailable or fails after one focused recovery, name the missing capability and affected roles, and ask whether to continue solo; a Solo-sized task may proceed solo with disclosure. Never role-play agents or describe sequential root passes as independent review.
