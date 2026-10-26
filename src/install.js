import { promises as fs } from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";

const bundle = fileURLToPath(new URL("../skills/", import.meta.url));
export const specialties = [
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
      await fs.cp(path.join(bundle, "kip"), target, { recursive: true });
      for (const name of specialties) {
        await fs.mkdir(path.join(target, "references"), {
          recursive: true,
        });
        await fs.copyFile(
          path.join(bundle, name, "SKILL.md"),
          path.join(target, "references", `${name}.md`),
        );
      }
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

export async function inspectSkills(host = "all", options = {}) {
  return Promise.all(
    destinations(host, options).map(async (target) => {
      const files = [
        "SKILL.md",
        "agents/openai.yaml",
        "references/profiles.md",
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
