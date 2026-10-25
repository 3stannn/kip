---
name: testing
description: Choose and implement meaningful verification for changed behavior, bug fixes, and new functionality.
---

# Testing

Translate acceptance conditions into observable checks. Reproduce a bug before fixing it when feasible. Exercise changed behavior and its relevant failure boundary; mock external services at the transport boundary. Avoid tests that merely repeat implementation details or assert prose wording. Use the repository test stack, and keep deterministic unit checks separate from credentialed live integration tests. Verify keyboard and responsive behavior for UI changes. Report commands actually run, results, and what remains unverified. An unexecuted suggested test is not evidence.
