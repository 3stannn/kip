# Security audits with Cloudflare

`kip audit <target or scope>` invokes a full source security audit. A security question under `ask`, or a focused question without an audit request, uses guidance mode and creates no files. Read the pinned [upstream skill](../vendor/security-audit/SKILL.md); its [provenance and license](../vendor/security-audit/SOURCE.md) identify the bundled revision. Load its domain companions only where relevant. Do not fetch or install another skill at runtime.

## Single root and staged team

Kip remains the only coordinating root. Map upstream parent/Task roles onto the current host's native delegation controls. Children are scoped hunters, reconnaissance analysts, critics, or verifiers; they cannot invoke Kip orchestration, create agents, edit target source, or update shared run files. The root owns the ledger and canonical reports.

Full audit is an explicit exception to Kip's ordinary lifetime limit of two workers and one reviewer. Preserve the upstream independent and fresh-agent requirements rather than reusing a hunter as its own verifier or presenting a resumed agent as fresh. Use staged dispatch within actual host concurrency limits, inspect supported slot-release behavior, and stop affected dispatch if the host cannot supply required fresh roles. Never substitute role-play or another CLI runner.

Resolve Kip's saved/task model profile as usual for role settings. Separately resolve the upstream audit scope profile (`quick`, `standard`, or `deep`, default `standard`); it is not a Kip model-profile slug or a replacement for `--profile`. Explicit requests such as “quick audit” select audit breadth. Use reconnaissance/hunter role settings from Kip's workers and critic/verifier settings from its reviewer, inherited when no Kip profile is effective. Disclose unsupported controls.

Before reconnaissance, estimate and record the upstream minimum invocation reserves, scope, chosen breadth, host capacity, and any explicit total invocation budget. Apply the upstream budget gate before launching agents and again before each wave. Do not silently choose `quick`, skip independent verification, or overrun an explicit budget. Record deferred coverage and exact incomplete reasons if a budget or capability blocks completion. Standard/deep final record checks require fresh agents as upstream specifies.

## Output and execution boundaries

Target source, ordinary project notes, and profile state remain unchanged. Report artifacts are authorized by `audit`; this does not authorize fixes or live probing. Resolve a new writable output directory outside the target using upstream defaults and current host permissions. An in-repository output is allowed only when the user explicitly selects it and the entire directory is verified ignored by version control. Validate output paths and do not overwrite an existing run. If no permitted location is available, report the concrete output blocker rather than silently writing into the repository. Root alone writes shared metadata, architecture, coverage, findings, and reports; keep each agent's scratch directory separate.

Source inspection is read-only. Before running any target-controlled code, establish every upstream isolation control: disabled external networking, a sanitized allowlisted environment, read-only source/toolchain, scratch-only writes, and bounded resources. A host's generic sandbox or approval label is not evidence that all these controls exist. If they cannot be enforced, continue static inspection; leave execution-dependent claims unresolved with the exact missing capability and safe validation plan. Do not run builds, dependency installation, browsers, fuzzers, or fixtures as a workaround. Apply upstream race-safe artifact promotion or discard the scratch evidence if it cannot be enforced. Never probe production or external services.

## Evidence and completion

Follow all six upstream phases using [reconnaissance](../vendor/security-audit/RECONNAISSANCE.md), [hunting](../vendor/security-audit/HUNTING.md), and [validation/reporting](../vendor/security-audit/VALIDATION-AND-REPORTING.md). Relevant existing project notes provide navigation hints only; prior audit ledgers and evidence need current-source revalidation under upstream rules. Keep sensitive finding details out of ordinary notes.

For each confirmed finding, establish the trust boundary, concrete impact, source locations, conditions, independent verification, and smallest effective remediation. Preserve the distinct confirmed, needs-validation, and rejected verdicts; unresolved evidence is not a severity-rated vulnerability. Report source revision and dirty state, scope, coverage gaps, and actual validation limits.

Run the bundled zero-dependency validators with the host's Node executable, following upstream timing (after every ledger update and final finding replacement):

```text
node "<kip-skill>/vendor/security-audit/validate-coverage-ledger.cjs" "<output>/coverage-ledger.json"
node "<kip-skill>/vendor/security-audit/validate-findings.cjs" "<output>/findings.json"
```

The pinned upstream CLIs require nonzero `O_NOFOLLOW` and `O_NONBLOCK` file-open flags. Windows Node does not expose these protections, so these CLIs deliberately fail closed there. Do not bypass their file protection or treat in-memory schema checks as equivalent. Use a supported isolated host for full artifact validation; otherwise retain static results and mark the run incomplete with the validator capability blocker. This is separate from target-code sandbox availability. Preserve the upstream files when updating this adapter.

Derive `REPORT.md`, `FINDINGS-DETAIL.md`, and `NEEDS-VALIDATION.md` from verified records. A full run ends only with upstream artifacts and passing validators, or recorded `run_status: "incomplete"` and the exact unmet requirements disclosed in its partial report. If even metadata/report creation is blocked, state that in chat and do not claim a run completed. Missing runtime isolation can coexist with a completed static-source audit whose unresolved validation is clearly reported; it is never evidence of runtime confirmation or exhaustive security.
