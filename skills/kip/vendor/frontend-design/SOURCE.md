# Bundled source

- Upstream: https://github.com/anthropics/skills
- Revision: `ca45fc496a3436251f191354091d557da31c15b5`
- Skill path: `skills/frontend-design`
- License: [Apache License 2.0](LICENSE.txt), included unchanged from the upstream skill folder.

The upstream skill folder is vendored unchanged. Kip-specific routing and precedence live in `../../references/frontend-design.md`, outside the vendored instructions. To refresh, review a new upstream revision, replace the vendored folder including its license and any notices, update this revision, and run Kip's installation tests. Installing Kip never fetches a moving upstream revision.
