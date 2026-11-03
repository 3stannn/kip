# Bundled source

- Upstream: https://github.com/cloudflare/security-audit-skill
- Revision: `c1c8a8c1471069fb0e188eeaff69b8e8db6564a8`
- Skill path: `skills/security-audit`
- License: [MIT](LICENSE), copied from the repository root.

The complete upstream skill directory is included unchanged, together with its validator tests. `manifest.json` records SHA-256 checksums of these files and the license. Kip verifies these checksums during installation, refresh, and doctor. They detect accidental drift against the shipped manifest, not the authenticity of an attacker-replaced manifest.

Kip's command routing, role settings, and host adapter live outside this directory in [security-audit.md](../../references/security-audit.md). To update, review a new upstream revision, replace all upstream files including the license, regenerate the manifest from the exact Git blob bytes, update this provenance, and run the validator, bundle, and installation tests. Never update from a moving branch at installation time.
