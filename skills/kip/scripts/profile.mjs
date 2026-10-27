import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { pathToFileURL } from "node:url";

export const profileNames = [
  "maximum",
  "premium",
  "strong-lead",
  "balanced",
  "value",
  "budget",
  "minimum-cost",
];

export function resolveProfile(value) {
  const name = String(value).trim().toLowerCase().replace(/\s+/g, "-");
  const slug = /^[1-7]$/.test(name) ? profileNames[Number(name) - 1] : name;
  if (!profileNames.includes(slug))
    throw Error(`Unknown profile. Choose ${profileNames.join(", ")} or 1–7.`);
  return slug;
}

async function checkEntry(file, directory = false) {
  try {
    const stat = await fs.lstat(file);
    if (
      stat.isSymbolicLink() ||
      (directory ? !stat.isDirectory() : !stat.isFile())
    )
      throw Error(
        `Profile memory requires a regular ${directory ? "directory" : "file"}: ${file}`,
      );
    return true;
  } catch (error) {
    if (error.code === "ENOENT") return false;
    throw error;
  }
}

export async function profileMemory(root, action = "show", value) {
  if (!["show", "select", "reset"].includes(action))
    throw Error("Expected show, select, or reset.");
  const selected = action === "select" ? resolveProfile(value) : null;
  const base = await fs.realpath(root);
  const dir = path.join(base, ".kip");
  const file = path.join(dir, "profile.json");
  await checkEntry(dir, true);
  let state = { version: 1, profile: null };
  const persisted = await checkEntry(file);
  if (persisted) {
    state = JSON.parse(await fs.readFile(file, "utf8"));
    if (
      !state ||
      state.version !== 1 ||
      !Object.hasOwn(state, "profile") ||
      !(state.profile === null || profileNames.includes(state.profile)) ||
      Object.keys(state).some((key) => !["version", "profile"].includes(key))
    )
      throw Error(
        `Invalid profile memory; preserve and repair explicitly: ${file}`,
      );
  }
  if (action === "show") return { ...state, path: file, persisted };

  await fs.mkdir(dir, { recursive: true });
  await checkEntry(dir, true);
  const ignore = path.join(dir, ".gitignore");
  const hasIgnore = await checkEntry(ignore);
  const rules = hasIgnore ? await fs.readFile(ignore, "utf8") : "";
  if (
    !rules
      .split(/\r?\n/)
      .some((line) => ["profile.json", "/profile.json"].includes(line.trim()))
  )
    await fs.appendFile(
      ignore,
      `${rules && !rules.endsWith("\n") ? "\n" : ""}/profile.json\n`,
    );
  state = { version: 1, profile: selected };
  const temporary = path.join(dir, `.profile-${randomUUID()}.tmp`);
  try {
    await fs.writeFile(temporary, JSON.stringify(state, null, 2) + "\n", {
      flag: "wx",
    });
    await fs.rename(temporary, file);
  } finally {
    await fs.rm(temporary, { force: true });
  }
  return { ...state, path: file, persisted: true };
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href
) {
  try {
    const [action, ...args] = process.argv.slice(2);
    const value = action === "select" ? args.shift() : undefined;
    if (!action || args.length !== 2 || args[0] !== "--root")
      throw Error(
        "Usage: profile.mjs show|reset --root <project> OR select <profile> --root <project>",
      );
    console.log(JSON.stringify(await profileMemory(args[1], action, value)));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
