import test from "node:test";
import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import { installSkills, inspectSkills, destinations } from "../src/install.js";
const execute = promisify(execFile);
const cli = fileURLToPath(new URL("../bin/kip.js", import.meta.url));
const gsapBundle = fileURLToPath(
  new URL("../skills/kip/vendor/gsap-skills/", import.meta.url),
);
const gsapSkills = [
  "gsap-core",
  "gsap-timeline",
  "gsap-scrolltrigger",
  "gsap-plugins",
  "gsap-utils",
  "gsap-react",
  "gsap-performance",
  "gsap-frameworks",
];
async function regularFiles(directory, prefix = "") {
  const files = [];
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const relative = prefix + entry.name;
    if (entry.isDirectory())
      files.push(
        ...(await regularFiles(
          path.join(directory, entry.name),
          `${relative}/`,
        )),
      );
    else {
      assert.ok(entry.isFile(), `Unexpected linked bundle entry: ${relative}`);
      files.push(relative);
    }
  }
  return files.sort();
}
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
  const gsapFiles = await regularFiles(gsapBundle);
  assert.deepEqual(
    (await fs.readdir(gsapBundle, { withFileTypes: true }))
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort(),
    [...gsapSkills].sort(),
  );
  for (const skill of gsapSkills)
    assert.ok(gsapFiles.includes(`${skill}/SKILL.md`));
  for (const resource of ["LICENSE", "SOURCE.md", "llms.txt"])
    assert.ok(gsapFiles.includes(resource));
  const targets = await installSkills("all", options);
  assert.equal(targets.length, 4);
  const inspections = await inspectSkills("all", options);
  assert.ok(inspections.every((entry) => entry.ready));
  for (const target of targets) {
    const installedGsap = path.join(target, "vendor/gsap-skills");
    assert.deepEqual(await regularFiles(installedGsap), gsapFiles);
    for (const file of gsapFiles) {
      assert.deepEqual(
        await fs.readFile(path.join(installedGsap, file)),
        await fs.readFile(path.join(gsapBundle, file)),
        `Offline GSAP resource differs: ${file}`,
      );
    }
    assert.equal(
      await fs.readFile(path.join(target, "references/profiles.md"), "utf8"),
      await fs.readFile(
        new URL("../skills/kip/references/profiles.md", import.meta.url),
        "utf8",
      ),
    );
    for (const name of ["orchestration-claude", "orchestration-antigravity"]) {
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
    assert.deepEqual(
      (await fs.readdir(path.join(target, "references"))).sort(),
      [
        "frontend-design.md",
        "frontend-engineering.md",
        "notes.md",
        "orchestration-antigravity.md",
        "orchestration-claude.md",
        "orchestration-codex.md",
        "orchestration.md",
        "profiles.md",
        "security-audit.md",
        "token-efficiency.md",
        "unslop.md",
        "update.md",
      ],
    );
    await assertLocalMarkdownLinks(target);
    const { stdout } = await execute(
      process.execPath,
      [
        path.join(target, "vendor/taste-skill/scripts/draw.mjs"),
        "--list",
        "directions",
      ],
      { cwd: options.home },
    );
    assert.ok(
      stdout.trim(),
      "Installed Taste can read its bundled library offline",
    );
    assert.match(
      await fs.readFile(
        path.join(target, "vendor/taste-skill/LICENSE"),
        "utf8",
      ),
      /MIT License/,
    );
    assert.ok((await fs.lstat(target)).isDirectory());
    for (const file of [
      "SKILL.md",
      "agents/openai.yaml",
      "SOURCE.md",
      "LICENSE",
    ]) {
      const bundledPath = `vendor/build-awwwards-quality-sites/${file}`;
      assert.deepEqual(
        await fs.readFile(path.join(target, bundledPath)),
        await fs.readFile(
          new URL(`../skills/kip/${bundledPath}`, import.meta.url),
        ),
      );
    }
    for (const file of ["SKILL.md", "SOURCE.md", "LICENSE.txt"]) {
      const bundledPath = `vendor/frontend-design/${file}`;
      assert.deepEqual(
        await fs.readFile(path.join(target, bundledPath)),
        await fs.readFile(
          new URL(`../skills/kip/${bundledPath}`, import.meta.url),
        ),
      );
    }
  }
});

test("doctor detects missing GSAP skill, supporting resource, and attribution", async (t) => {
  const options = await fixture(t);
  const [target] = await installSkills("claude", options);
  const files = ["gsap-react/SKILL.md", "LICENSE", "SOURCE.md", "llms.txt"].map(
    (file) => `vendor/gsap-skills/${file}`,
  );
  for (const file of files) await fs.rm(path.join(target, file));
  const [inspection] = await inspectSkills("claude", options);
  assert.equal(inspection.ready, false);
  assert.deepEqual([...inspection.missing].sort(), [...files].sort());
});

test("HeroUI skills ship complete to every host and doctor detects missing resources", async (t) => {
  const options = await fixture(t);
  const targets = await installSkills("all", options);
  const resources = [];
  for (const skill of ["heroui-react", "heroui-native", "heroui-migration"]) {
    const source = fileURLToPath(
      new URL(`../skills/kip/vendor/${skill}/`, import.meta.url),
    );
    const files = await regularFiles(source);
    for (const required of ["SKILL.md", "SOURCE.md", "LICENSE.txt"])
      assert.ok(files.includes(required));
    assert.ok(
      files.some(
        (file) => file.startsWith("scripts/") && file.endsWith(".mjs"),
      ),
    );
    for (const target of targets) {
      const installed = path.join(target, "vendor", skill);
      assert.deepEqual(await regularFiles(installed), files);
      for (const file of files)
        assert.deepEqual(
          await fs.readFile(path.join(installed, file)),
          await fs.readFile(path.join(source, file)),
        );
    }
    resources.push(...files.map((file) => `vendor/${skill}/${file}`));
  }
  for (const resource of resources)
    await fs.rm(path.join(targets[0], resource));
  const [inspection] = await inspectSkills("codex", options);
  assert.equal(inspection.ready, false);
  assert.deepEqual([...inspection.missing].sort(), resources.sort());
});

test("doctor detects missing bundled skills, rules, and licenses", async (t) => {
  const options = await fixture(t);
  const [target] = await installSkills("claude", options);
  const files = [
    "vendor/build-awwwards-quality-sites/SKILL.md",
    "vendor/frontend-design/SKILL.md",
    "vendor/frontend-design/LICENSE.txt",
    "vendor/vercel-react-best-practices/rules/async-parallel.md",
    "vendor/shadcn/LICENSE.md",
  ];
  for (const file of files) await fs.rm(path.join(target, file));
  const [inspection] = await inspectSkills("claude", options);
  assert.equal(inspection.ready, false);
  assert.deepEqual(inspection.missing, files);
});

test("doctor detects a missing profile catalog in an installed skill", async (t) => {
  const options = await fixture(t);
  const [target] = await installSkills("claude", options);
  await fs.rm(path.join(target, "references/profiles.md"));
  const [inspection] = await inspectSkills("claude", options);
  assert.equal(inspection.ready, false);
  assert.deepEqual(inspection.missing, ["references/profiles.md"]);
});

test("audit bundle is pinned, complete, and doctor detects drift", async (t) => {
  const options = await fixture(t);
  const [target] = await installSkills("claude", options);
  const directory = path.join(target, "vendor/security-audit");
  const manifest = JSON.parse(
    await fs.readFile(path.join(directory, "manifest.json"), "utf8"),
  );
  assert.match(manifest.revision, /^[a-f0-9]{40}$/);
  assert.equal(Object.keys(manifest.files).length, 21);
  for (const name of Object.keys(manifest.files)) {
    assert.deepEqual(
      await fs.readFile(path.join(directory, name)),
      await fs.readFile(
        new URL(`../skills/kip/vendor/security-audit/${name}`, import.meta.url),
      ),
    );
  }
  await fs.appendFile(
    path.join(directory, "validate-findings.cjs"),
    "\n// drift\n",
  );
  let [inspection] = await inspectSkills("claude", options);
  assert.equal(inspection.ready, false);
  assert.deepEqual(inspection.invalid, [
    "vendor/security-audit/validate-findings.cjs",
  ]);
  await fs.rm(path.join(directory, "AI-AND-LLM.md"));
  [inspection] = await inspectSkills("claude", options);
  assert.ok(inspection.missing.includes("vendor/security-audit/AI-AND-LLM.md"));
});

test("installed notes helpers share only the same project's memory and reads never bootstrap state", async (t) => {
  const options = await fixture(t);
  const targets = await installSkills("all", options);
  const project = path.join(options.home, "project");
  const other = path.join(options.home, "other");
  await fs.mkdir(project);
  await fs.mkdir(other);
  const run = async (target, ...args) => {
    const { stdout } = await execute(process.execPath, [
      path.join(target, "scripts/notes.mjs"),
      ...args,
    ]);
    return JSON.parse(stdout);
  };
  for (const target of targets) {
    assert.equal(
      (await run(target, "index", "--root", project)).persisted,
      false,
    );
  }
  assert.deepEqual(await fs.readdir(project), []);
  await fs.writeFile(
    path.join(project, "source.js"),
    "export const value = 1;\n",
  );
  const input = path.join(options.home, "notes-input.json");
  await fs.writeFile(
    input,
    JSON.stringify({
      expectedRevision: 0,
      entries: [
        {
          id: "source",
          title: "Source",
          content: "Value is exported here.",
          dependencies: ["source.js"],
        },
      ],
    }),
  );
  await run(targets[0], "apply", "--root", project, "--input", input);
  const before = await fs.readFile(path.join(project, ".kip/notes.json"));
  const names = await fs.readdir(path.join(project, ".kip"));
  for (const target of targets) {
    const result = await run(
      target,
      "query",
      "--root",
      project,
      "--query",
      "source",
    );
    assert.equal(result.entries[0].id, "source");
    assert.equal(result.entries[0].freshness, "unchanged-recorded-files");
    assert.equal(
      (await run(target, "index", "--root", other)).persisted,
      false,
    );
  }
  assert.deepEqual(
    await fs.readFile(path.join(project, ".kip/notes.json")),
    before,
  );
  assert.deepEqual(await fs.readdir(path.join(project, ".kip")), names);
  assert.deepEqual(await fs.readdir(other), []);
  await execute(process.execPath, [
    path.join(targets[0], "scripts/profile.mjs"),
    "reset",
    "--root",
    project,
  ]);
  assert.deepEqual(
    await fs.readFile(path.join(project, ".kip/notes.json")),
    before,
  );
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

test("isolates each host and installs Codex in one discovery location", async (t) => {
  const options = await fixture(t);
  options.codexHome = path.join(options.home, "custom-codex");
  const targets = await installSkills("codex", options);
  assert.deepEqual(targets, [
    path.join(options.home, ".agents", "skills", "kip"),
  ]);
  await assert.rejects(fs.stat(path.join(options.codexHome, "skills", "kip")), {
    code: "ENOENT",
  });
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
        codex: [path.join(options.home, ".agents", "skills", "kip")],
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
      await fs.rm(
        path.join(inspections[0].path, "references/orchestration.md"),
      );
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
