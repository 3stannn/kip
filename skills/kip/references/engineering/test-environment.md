# Test environment

Use this workflow when Kip needs to run project checks or verify a changed user flow and the local test setup is missing, stale, or undocumented. Follow the current purpose's write and execution boundary. `ask` uses existing evidence only.

## Reuse or establish the setup

1. Check `.kip/test-environment.md` and the repo's testing guide, CI workflows, scripts, and sample configuration. Reuse applicable steps from an existing recipe after checking them against the current setup. If a step is stale, verify its replacement before recording it. Read sample configuration for required variable names and obtain test credentials through the project's approved mechanism. Keep values out of commands, logs, and artifacts.
2. Pick checks that exercise what changed. Follow required project checks as well, including separate type, build, integration, or platform checks when the project calls for them. Prefer repo tools and scripts. Prepare dependencies only as needed. For isolated verification, use a clean worktree or disposable copy with the intended revision and changes, and use disposable state and data. Use an available test port, or the configured port when required, and leave unrelated processes alone.
3. If a changed flow needs a running app, drive its relevant states with the available project or host tools. Give browser runs a fresh context and desktop runs isolated data. Capture requested evidence using available tools. For a walkthrough where recording applies, use cursor-visible video when supported and avoid exposing test credentials or private data. Report screens, platforms, and evidence you could not cover. For CLI or library changes, capture the command results.
4. Start only local or authorized test services. If a shared backend is unavoidable, document it, use only permitted operations, and leave checks that would mutate it uncovered unless authorized. Keep temporary scripts and outputs outside project source. Close sessions, stop services started by this run, and remove disposable state after retaining requested evidence.

## Record a reusable recipe

When the task authorizes creating or repairing a persistent recipe, update the existing project guide or use `.kip/test-environment.md`. Include prerequisites, exact setup and check commands in order, required configuration names, ports, expected success, smoke steps, isolation and shared-service limits, cleanup, and uncovered cases. Include the revision or environment used to verify the recipe. Exercise repeatability from clean state when practical, and label any unverified steps.

Report which checks ran and their outcomes, the evidence locations, and anything uncovered. Identify a failure as pre-existing only when a comparable baseline demonstrates it.
