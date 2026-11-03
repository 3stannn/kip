# Bundled source

- Upstream: https://github.com/greensock/gsap-skills
- Revision: `aed9cfd3277740755f6bfc1155c7aa645403b760`
- Skill paths: all eight `skills/gsap-*` directories and `skills/llms.txt`
- License: [MIT](LICENSE), included unchanged from the repository root.

The official skill directories and index are included unchanged. Kip's routing and precedence live in [frontend-design.md](../../references/frontend-design.md) and [frontend-engineering.md](../../references/frontend-engineering.md), outside the vendored instructions. Skill examples are guidance, not a dependency installation or permission to change a project's animation system. The skills' MIT license does not replace the GSAP runtime's own license.

In this bundle, names from the upstream index resolve beside `llms.txt`: for example, `gsap-react/SKILL.md` relative to this directory, rather than another nested `skills/` directory.

To refresh, review a new upstream revision, replace all eight directories, the index and license together, update this revision, and run Kip's installation tests. Normal Kip installs and updates copy these files offline; they do not run `npx skills add` or fetch a moving upstream revision.
