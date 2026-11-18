# Kip squads

Use these stages when a task needs coordinated handoffs or the user requests manual QA, a pull request, a merge, or a promotion. The current chat owns the task through the requested outcome. Pick roles within Kip's existing team tier and use the current host adapter and profile for dispatch. Use only the stages the task needs. A build or fix ordinarily ends with local verification. [Orchestration](orchestration.md) · [Subagent roles](subagents.md)

## Building

1. Identify the acceptance checks, the existing code to reuse, and any decisions that could change the outcome. Investigate first. Ask only if the remaining decision materially changes the requested outcome and the project cannot settle it.
2. If a technical assumption needs proof, define a bounded experiment and run it only within writable, authorized scope. For a change spanning components or a dependency order, sketch the plan and review its scope, reuse opportunities, and coverage. Use TDD when requested or required by the project. [Feasibility spikes](engineering/spike.md) · [Test-driven development](engineering/tdd.md)
3. Implement and verify against the acceptance checks. When delegating, give workers disjoint ownership where practical. Record the exact workspace, diff or revision tested, results, and remaining gaps. Reuse the test recipe when an isolated or reproducible setup is needed. [Test environments](engineering/test-environment.md)
4. For a fix after review, send the exact finding and its reproduction to the existing worker. Revisit planning only when the finding invalidates a plan assumption, or when the user changes the scope. Recheck the affected behavior and earlier failures.

## Review

Use a distinct reviewer for Lean or Full. Start from the user's requirements, current workspace or revision, relevant base, and acceptance checks. Give the reviewer a way to inspect the full task scope, including staged, unstaged, or untracked changes when present. Provide paths and observed checks. The reviewer independently assesses correctness, edge cases and security, unnecessary complexity, and verification coverage. Combine lenses within the tier. [Subagent roles](subagents.md)

For `plan` and `review`, inspect source and existing evidence in read-only scope. For writable work, run relevant isolated verification when needed. A blocking finding identifies the affected behavior, evidence, and fix direction. Record coverage gaps and distinguish reproduced baseline failures from new ones. Return actionable findings to the existing worker and send the amended change to the same independent reviewer for the affected rechecks. [Orchestration](orchestration.md)

## Ready for a pull request

Report what changed, what was verified, and any remaining manual QA. If the user requests a preview, reuse the project's test recipe and present the reviewed change with a short list of steps, prerequisites, coverage gaps, and any shared services. Keep an authorized handoff preview running while cleaning up test-only resources. Verify that it remains reachable, open the affected screen when supported, and provide the endpoint and teardown instructions. Report any launch or reachability check you could not verify. [Test environments](engineering/test-environment.md)

When a user explicitly requests opening a pull request, resolve the intended repository, head, base, and draft status from the request and repository. Check for an existing matching PR before creating one. If opening the PR requires publishing an identifiable branch, push its intended committed changes normally. Leave unrelated and uncommitted work out. Use the repository's normal tooling and include the summary, checks, and remaining gaps. Return the PR link and observed status.

## Merge or promote

Treat a request to merge or promote as a separate release action. Check the repository, requested target, current head, required checks and approvals, mergeability, and the project's release procedure. Stop if the head differs from a revision the user authorized. If it changed since review, reassess the changed diff and recheck CI and approvals for the new head. Recheck the head and gates after any wait or conflict resolution. Bind the merge to the verified head when the host supports it. Honor repository protections, use standard permissions and fast-forward pushes, and choose a permitted merge strategy. If a conflict or missing check blocks the operation, report the affected branch or PR and the specific blocker. Resolve conflicts, edit dependent PRs, or delete branches only when the user authorizes those actions.

For promotion, identify the exact commits or PRs and the destination, preserve their order and traceability where relevant, and check for changes already present. Use the repository's existing promotion workflow and run its required checks. If the request is to prepare or open a promotion PR, stop at the requested handoff. For a requested merge or completed promotion, confirm the resulting status with the host. [Source attribution](squad-sources.md)
