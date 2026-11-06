# Bundled source

- Upstream: https://github.com/heroui-inc/heroui
- Revision: `b2c65a5b5236550526f23d475b1ad0c6e5eab1a2` (default branch: `v3`)
- Skill path: `skills/heroui-native`
- License: [Apache-2.0](LICENSE.txt), included unchanged from the upstream skill.

The upstream skill folder and its documentation helper scripts are vendored unchanged. Kip-specific routing lives in `../../references/frontend-engineering.md`. To refresh, review a new upstream revision, replace the skill folder and license, update this revision, and run Kip's installation tests. Installing Kip copies these resources offline; running documentation helpers requires network access. This bundle does not install HeroUI runtime packages.
