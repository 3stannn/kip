import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";

const bundle = fileURLToPath(new URL("../skills/", import.meta.url));
const sourceRoot = fileURLToPath(new URL("../", import.meta.url));
export const specialties = [
  "glisse",
  "frontend-design",
  "responsive-design",
  "anti-ai-slop",
  "token-efficiency",
  "security",
  "testing",
  "frontend",
  "backend",
];

export function destinations(
  host = "all",
  { home = os.homedir(), codexHome = process.env.CODEX_HOME } = {},
) {
  const codex = path.resolve(codexHome || path.join(home, ".codex"));
  const hosts = {
    codex: [
      path.join(codex, "skills", "kip"),
      path.join(home, ".agents", "skills", "kip"),
    ],
    claude: [path.join(home, ".claude", "skills", "kip")],
    antigravity: [
      path.join(home, ".gemini", "config", "skills", "kip"),
      path.join(home, ".gemini", "antigravity-cli", "skills", "kip"),
    ],
  };
  if (host !== "all" && !Object.hasOwn(hosts, host))
    throw Error(
      `Unknown host: ${host}. Choose codex, claude, antigravity, or all.`,
    );
  return [
    ...new Set(host === "all" ? Object.values(hosts).flat() : hosts[host]),
  ];
}

export async function installSkills(host = "all", options = {}) {
  const targets = destinations(host, options);
  // Check every destination before writing. Never replace an existing skill.
  for (const target of targets) {
    try {
      await fs.lstat(target);
      throw Error(
        `Skill already exists: ${target}. Move it aside before reinstalling; existing skills are preserved.`,
      );
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }
  const installed = [];
  try {
    for (const target of targets) {
      await fs.mkdir(path.dirname(target), { recursive: true });
      await fs.mkdir(target); // Exclusive: a concurrent install must not be overwritten.
      installed.push(target);
      await copyBundle(target);
    }
  } catch (error) {
    await Promise.all(
      installed.map((target) =>
        fs.rm(target, { recursive: true, force: true }),
      ),
    );
    throw error;
  }
  return targets;
}

async function copyBundle(target) {
  await fs.cp(path.join(bundle, "kip"), target, { recursive: true });
  for (const name of specialties) {
    await fs.mkdir(path.join(target, "references"), { recursive: true });
    const guidance = await fs.readFile(
      path.join(bundle, `kip-${name}`, "SKILL.md"),
      "utf8",
    );
    // Specialty guidance moves beside these references in the installed bundle.
    const installedGuidance = guidance.replace(
      /(\]\()\.\.\/kip\/references\/(?=[^)\s]+\))/g,
      "$1",
    );
    await fs.writeFile(
      path.join(target, "references", `${name}.md`),
      installedGuidance,
    );
  }
  await fs.writeFile(
    path.join(target, "installation.json"),
    JSON.stringify({ sourceRoot: path.resolve(sourceRoot) }, null, 2) + "\n",
  );
}

export async function refreshSkills(host = "all", options = {}) {
  const targets = [];
  for (const target of destinations(host, options)) {
    let stat;
    try {
      stat = await fs.lstat(target);
    } catch (error) {
      if (error.code === "ENOENT") continue;
      throw error;
    }
    if (!stat.isDirectory() || stat.isSymbolicLink())
      throw Error(`Cannot update a linked or non-directory skill: ${target}`);
    const skill = await fs.readFile(path.join(target, "SKILL.md"), "utf8");
    if (!/^name:\s*kip\s*$/m.test(skill))
      throw Error(`Not an installed Kip skill: ${target}`);
    targets.push(target);
  }
  if (!targets.length)
    throw Error(
      "No installed Kip skills found for the selected host. Run install first.",
    );

  const locks = [];
  const entries = [];
  try {
    // Keep backups outside skill discovery and on the destination's filesystem.
    for (const root of [
      ...new Set(targets.map((target) => path.dirname(path.dirname(target)))),
    ].sort()) {
      const lock = path.join(root, ".kip-update.lock");
      try {
        const handle = await fs.open(lock, "wx");
        locks.push({ lock, handle });
      } catch (error) {
        if (error.code === "EEXIST")
          throw Error(
            `Another update may be running. If it was interrupted, remove the stale lock: ${lock}`,
          );
        throw error;
      }
    }
    // Finish copying every replacement before touching installed files.
    for (const target of targets) {
      const backupRoot = path.join(
        path.dirname(path.dirname(target)),
        "kip-backups",
        randomUUID(),
      );
      const entry = {
        target,
        backup: path.join(backupRoot, "previous"),
        stage: path.join(backupRoot, "new"),
        moved: false,
        activated: false,
      };
      entries.push(entry);
      await fs.mkdir(entry.stage, { recursive: true });
      await copyBundle(entry.stage);
    }
    for (const entry of entries) {
      await fs.rename(entry.target, entry.backup);
      entry.moved = true;
      await fs.rename(entry.stage, entry.target);
      entry.activated = true;
    }
    return entries.map(({ target, backup }) => ({ target, backup }));
  } catch (error) {
    const failures = [];
    for (const entry of entries.toReversed()) {
      try {
        if (entry.activated)
          await fs.rm(entry.target, { recursive: true, force: true });
        if (entry.moved) await fs.rename(entry.backup, entry.target);
      } catch (rollbackError) {
        failures.push(`${entry.backup}: ${rollbackError.message}`);
      }
    }
    if (failures.length)
      throw Error(
        `${error.message}\nRestore these retained backups manually:\n${failures.join("\n")}`,
      );
    throw error;
  } finally {
    for (const entry of entries)
      await fs.rm(entry.stage, { recursive: true, force: true });
    for (const { lock, handle } of locks) {
      await handle.close();
      await fs.rm(lock, { force: true });
    }
  }
}

export async function inspectSkills(host = "all", options = {}) {
  return Promise.all(
    destinations(host, options).map(async (target) => {
      const files = [
        "SKILL.md",
        "agents/openai.yaml",
        "references/profiles.md",
        "references/orchestration.md",
        "references/orchestration-claude.md",
        "references/orchestration-antigravity.md",
        "references/frontend-tailwind.md",
        "references/frontend-icons.md",
        "references/frontend-shadcn.md",
        "references/website-art-direction.md",
        "references/portfolio-design.md",
        "references/backend-auth.md",
        "references/update.md",
        "installation.json",
        "scripts/profile.mjs",
        ...specialties.map((name) => `references/${name}.md`),
      ];
      const missing = [];
      for (const file of files) {
        try {
          await fs.readFile(path.join(target, file));
        } catch (error) {
          if (error.code === "ENOENT") missing.push(file);
          else throw error;
        }
      }
      return { path: target, ready: missing.length === 0, missing };
    }),
  );
}
