---
name: kip-backend
description: Kip-specific backend guidance. Use within an active Kip task or when explicitly requested for Kip.
---

# Backend

This guidance supports Kip's assigned worker or reviewer scope. The root owns team dispatch, profile settings, and integration; do not spawn additional agents from a supporting role. Apply only sections relevant to the change.



Define input, output, errors, and authorization at each endpoint. Validate inputs at the boundary, parameterize persistence, and preserve data invariants with appropriate transactions. Make retries bounded and side effects idempotent where duplicate delivery is possible. Set timeouts for external services and distinguish retryable from permanent errors. Prefer existing architecture over speculative service layers. Plan migrations for existing records and rollback constraints. Log actionable metadata without credentials or sensitive payloads. Include meaningful success and failure verification.

## When the project uses Better Auth

Read [backend-auth.md](backend-auth.md) only for this stack or requested integration. In the source checkout, use `../kip/references/backend-auth.md`.

## Kip maintenance

For Kip maintenance, inspect the installer and installed bundle as well as source guidance. Keep profile memory separate from runner configuration, credentials, and permission state. Verify updates preserve user data and a fresh installed copy works without importing from the source checkout. Do not add a service or database for a local preference that a validated file can hold.
