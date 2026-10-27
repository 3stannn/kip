---
name: kip-testing
description: Kip-specific testing guidance. Use within an active Kip task or when explicitly requested for Kip.
---

# Testing

This guidance supports Kip's assigned worker or reviewer scope. The root owns team dispatch, profile settings, and integration; do not spawn additional agents from a supporting role. Apply only sections relevant to the change.

Translate acceptance conditions into observable checks. Reproduce a bug before fixing it when feasible. Exercise changed behavior and its relevant failure boundary; mock external services at the transport boundary. Avoid tests that merely repeat implementation details or assert prose wording. Use the repository test stack, and keep deterministic unit checks separate from credentialed live integration tests. Verify keyboard and responsive behavior for UI changes. Report commands actually run, results, and what remains unverified. An unexecuted suggested test is not evidence.



For Kip, verify the installed workflow as well as the source. Exercise profile selection in a fresh process, project isolation, reset, malformed state, and preservation of existing files when changing memory behavior. Instruction wording tests cannot prove that a model follows orchestration rules. Use realistic scenario review for task overrides, team dispatch, and host capability limits; label it as review, not executed agent behavior. Reuse relevant passing checks and rerun only for new changes or unresolved risk.
