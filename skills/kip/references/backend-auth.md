# Kip Better Auth implementation

Resolve the installed `better-auth` version from the lockfile before choosing APIs, plugin names, or configuration. Use documentation for that release; separate current-version behavior from a proposed target version during upgrades. Inspect the framework adapter, existing `auth.ts`, route handler, environment conventions, database driver, generated schema, and client setup before changing them.

Keep the server configuration authoritative. Read secrets and the canonical base URL from environment variables, never client code or checked-in defaults. Configure trusted origins narrowly. Do not disable CSRF or origin checks to work around a routing problem, and enable secure cookies in HTTPS deployments. Treat proxy-derived IP addresses as trusted only when the deployment's proxy chain is understood.

Choose the persistence model deliberately:

- Match the Better Auth adapter and provider to the actual database driver. Adapter configuration uses ORM model identities rather than physical table names; preserve explicit mappings.
- Understand where sessions live before changing caching or storage. Secondary storage may become the primary session store unless database persistence is explicitly enabled. Cookie-backed sessions trade database reads for revocation and freshness constraints; do not assume custom session fields are cached.
- Set session lifetime, refresh behavior, cookie caching, and invalidation policy from product and security requirements. Version a cookie cache when a deployment must invalidate all cached sessions.
- Generate or migrate authentication schema after enabling plugins or changing models. Inspect generated changes and follow the project's migration workflow. Do not run a production migration, destructive reset, or overwrite customized schema without explicit authorization and a rollback plan.

Enable only requested sign-in methods and plugins. Import plugins from their dedicated paths when supported and configure matching client plugins separately. Email verification, password reset, magic-link, and similar flows are incomplete until their delivery callbacks, expiry behavior, redirect targets, and failure paths are implemented. Avoid account linking based only on an unverified identifier.

Use endpoint hooks for request or response policy and database hooks for record lifecycle behavior. Keep hooks small, deterministic, and idempotent where retries are possible. Do not perform slow, failure-prone external work inline with authentication unless the result is required for the auth decision; enqueue post-auth side effects when the architecture supports it.

Infer session and user types from the configured server instance and share those types with a separate client when the build architecture permits. Do not duplicate user or session shapes by hand. Keep authorization checks on the server even when the client hides unavailable actions.

Verify the health endpoint or framework route, sign-up and sign-in, sign-out, session refresh and revocation, provider callback failures, expired or invalid tokens, rate limits, and object-level authorization. Exercise both fresh and cached sessions when secondary storage or cookie caching is enabled. Confirm secrets and tokens are absent from logs, serialized errors, browser bundles, and test snapshots.
