# Test-driven development

Use this workflow for behavioral changes when the user requests TDD or the project requires it. Fit it to the project's test runner and conventions. For a change with no behavior to exercise, use a direct check suited to the artifact. When a feasibility spike precedes development, start the production change afresh from its findings.

## Red, green, refactor

1. **Establish the baseline.** Identify the command that selects the relevant test and the checks the project expects before delivery. Inspect a recent, comparable baseline or run the relevant checks before edits so you can distinguish existing failures. Read [Writing good tests](writing-good-tests.md) before changing a test.
2. **Red.** Add the smallest assertion that describes the missing behavior or reproduces the bug through its normal entry point. Run it with the actual selector for your runner and verify it fails for the expected reason. An import, setup, or infrastructure error does not establish that the assertion catches the regression. If necessary for a new entry point, use a stub that reaches the assertion and still fails it. When someone has already implemented the behavior, preserve their work and reproduce the red on the earlier code in isolation if available.
3. **Green.** Make the smallest production change that satisfies the test while preserving existing contracts. Repeat the same command and verify it passes. Add a new red–green cycle for each further behavior the task needs.
4. **Refactor and verify.** Clean up what the change touched while preserving behavior. Repeat focused checks after cleanup, then run relevant broader checks from the project's own verification workflow. Use the [test environment guide](test-environment.md) when the required verification setup is missing or stale.

Record the red failure that established coverage, the green result, the broader checks run, and any gaps. If you cannot establish red or complete a check, say what prevented it and report only the verification you observed.
