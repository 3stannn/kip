import test from "node:test";
import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import {
  installSkills,
  inspectSkills,
  destinations,
  specialties,
} from "../src/install.js";
const execute = promisify(execFile);
const cli = fileURLToPath(new URL("../bin/kip.js", import.meta.url));
async function fixture(t) {
  const home = await fs.mkdtemp(path.join(os.tmpdir(), "kip-skills-"));
  t.after(() => fs.rm(home, { recursive: true, force: true }));
  return { home, codexHome: path.join(home, ".codex") };
}

async function assertLocalMarkdownLinks(root) {
  let checked = 0;
  async function scan(directory) {
    for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
      if (entry.name === "node_modules" || entry.name === ".git") continue;
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        await scan(file);
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        const markdown = await fs.readFile(file, "utf8");
        for (const [, href] of markdown.matchAll(/\[[^\]]*\]\(([^)\s]+)\)/g)) {
          if (/^[a-z][a-z0-9+.-]*:|^#|^\/\//i.test(href)) continue;
          const localPath = decodeURIComponent(href.split(/[?#]/, 1)[0]);
          const resolved = path.resolve(path.dirname(file), localPath);
          const relative = path.relative(root, resolved);
          assert.ok(
            relative !== ".." &&
              !relative.startsWith(`..${path.sep}`) &&
              !path.isAbsolute(relative),
            `${file}: link escapes the skill bundle: ${href}`,
          );
          assert.ok(
            (await fs.stat(resolved)).isFile(),
            `${file}: missing local Markdown target: ${href}`,
          );
          checked++;
        }
      }
    }
  }
  await scan(root);
  assert.ok(checked > 0, `No local Markdown links checked under ${root}`);
}

test("source skill Markdown links resolve within the skill bundle", async () => {
  await assertLocalMarkdownLinks(
    fileURLToPath(new URL("../skills/", import.meta.url)),
  );
});

test("installs self-contained skills for every host without external dependencies", async (t) => {
  const options = await fixture(t);
  const targets = await installSkills("all", options);
  assert.equal(targets.length, 5);
  const inspections = await inspectSkills("all", options);
  assert.ok(inspections.every((entry) => entry.ready));
  for (const target of targets) {
    assert.equal(
      await fs.readFile(path.join(target, "references/profiles.md"), "utf8"),
      await fs.readFile(
        new URL("../skills/kip/references/profiles.md", import.meta.url),
        "utf8",
      ),
    );
    for (const name of [
      "portfolio-design",
      "website-art-direction",
      "website-layouts",
      "orchestration-claude",
      "orchestration-antigravity",
    ]) {
      assert.equal(
        await fs.readFile(
          path.join(target, "references", `${name}.md`),
          "utf8",
        ),
        await fs.readFile(
          new URL(`../skills/kip/references/${name}.md`, import.meta.url),
          "utf8",
        ),
      );
    }
    for (const name of specialties) {
      const guidance = await fs.readFile(
        path.join(target, "references", `${name}.md`),
        "utf8",
      );
      assert.match(guidance, new RegExp(`^name: kip-${name}$`, "m"));
    }
    await assertLocalMarkdownLinks(target);
    assert.ok((await fs.lstat(target)).isDirectory());
  }
});

test("doctor detects a missing profile catalog in an installed skill", async (t) => {
  const options = await fixture(t);
  const [target] = await installSkills("claude", options);
  await fs.rm(path.join(target, "references/profiles.md"));
  const [inspection] = await inspectSkills("claude", options);
  assert.equal(inspection.ready, false);
  assert.deepEqual(inspection.missing, ["references/profiles.md"]);
});

test("doctor detects missing host orchestration adapters", async (t) => {
  for (const host of ["claude", "antigravity"]) {
    await t.test(host, async (t) => {
      const options = await fixture(t);
      const targets = await installSkills(host, options);
      const reference = `references/orchestration-${host}.md`;
      for (const target of targets) {
        await fs.rm(path.join(target, reference));
      }
      const inspections = await inspectSkills(host, options);
      assert.equal(inspections.length, targets.length);
      for (const inspection of inspections) {
        assert.equal(inspection.ready, false);
        assert.deepEqual(inspection.missing, [reference]);
      }
    });
  }
});

test("doctor detects missing portfolio design guidance", async (t) => {
  const options = await fixture(t);
  const [target] = await installSkills("claude", options);
  await fs.rm(path.join(target, "references/portfolio-design.md"));
  const [inspection] = await inspectSkills("claude", options);
  assert.equal(inspection.ready, false);
  assert.deepEqual(inspection.missing, ["references/portfolio-design.md"]);
});

test("doctor detects missing website layout guidance", async (t) => {
  const options = await fixture(t);
  const [target] = await installSkills("claude", options);
  await fs.rm(path.join(target, "references/website-layouts.md"));
  const [inspection] = await inspectSkills("claude", options);
  assert.equal(inspection.ready, false);
  assert.deepEqual(inspection.missing, ["references/website-layouts.md"]);
});

test("isolates each host and respects CODEX_HOME", async (t) => {
  const options = await fixture(t);
  options.codexHome = path.join(options.home, "custom-codex");
  const targets = await installSkills("codex", options);
  assert.equal(targets[0], path.join(options.codexHome, "skills", "kip"));
  assert.equal((await inspectSkills("claude", options))[0].ready, false);
  assert.deepEqual(destinations("antigravity", options), [
    path.join(options.home, ".gemini/config/skills/kip"),
    path.join(options.home, ".gemini/antigravity-cli/skills/kip"),
  ]);
  assert.throws(() => destinations("unknown", options), /Unknown host/);
});

test("conflicts preserve existing content and prevent partial installation", async (t) => {
  const options = await fixture(t);
  const target = destinations("claude", options)[0];
  await fs.mkdir(target, { recursive: true });
  await fs.writeFile(path.join(target, "SKILL.md"), "user customization");
  await assert.rejects(installSkills("all", options), /already exists/);
  assert.equal(
    await fs.readFile(path.join(target, "SKILL.md"), "utf8"),
    "user customization",
  );
  assert.equal((await inspectSkills("codex", options))[0].ready, false);
});

test("CLI installs and diagnoses each host offline without host binaries or credentials", async (t) => {
  for (const host of ["codex", "claude", "antigravity"]) {
    await t.test(host, async (t) => {
      const options = await fixture(t);
      const env = {
        HOME: options.home,
        USERPROFILE: options.home,
        CODEX_HOME: options.codexHome,
        PATH: "",
      };
      const args = ["--host", host];
      await execute(process.execPath, [cli, "install", ...args], {
        env,
        cwd: options.home,
      });
      const { stdout } = await execute(
        process.execPath,
        [cli, "doctor", ...args],
        {
          env,
          cwd: options.home,
        },
      );
      const inspections = JSON.parse(stdout);
      const expectedTargets = {
        codex: [
          path.join(options.codexHome, "skills", "kip"),
          path.join(options.home, ".agents", "skills", "kip"),
        ],
        claude: [path.join(options.home, ".claude", "skills", "kip")],
        antigravity: [
          path.join(options.home, ".gemini", "config", "skills", "kip"),
          path.join(
            options.home,
            ".gemini",
            "antigravity-cli",
            "skills",
            "kip",
          ),
        ],
      };
      assert.deepEqual(
        inspections.map((entry) => entry.path),
        expectedTargets[host],
      );
      assert.ok(inspections.every((entry) => entry.ready));
      for (const otherHost of ["codex", "claude", "antigravity"].filter(
        (candidate) => candidate !== host,
      )) {
        assert.ok(
          (await inspectSkills(otherHost, options)).every(
            (entry) => !entry.ready,
          ),
        );
      }
      await fs.rm(path.join(inspections[0].path, "references/frontend.md"));
      await assert.rejects(
        execute(process.execPath, [cli, "doctor", ...args], { env }),
        (error) => error.code === 1 && error.stdout.includes('"ready": false'),
      );
    });
  }
});

test("CLI rejects legacy runner commands without host binaries or credentials", async (t) => {
  const options = await fixture(t);
  const env = {
    HOME: options.home,
    USERPROFILE: options.home,
    CODEX_HOME: options.codexHome,
    PATH: "",
  };
  for (const command of ["login", "status", "plan", "run"]) {
    await assert.rejects(
      execute(process.execPath, [cli, command, "test task"], { env }),
      (error) =>
        error.code === 1 && error.stderr.includes("inside your current chat"),
    );
  }
});
