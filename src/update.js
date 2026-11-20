import { execFile } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";
import { promisify } from "node:util";
import { fileURLToPath, pathToFileURL } from "node:url";
import { destinations } from "./install.js";

const execute = promisify(execFile);
const defaultRoot = fileURLToPath(new URL("../", import.meta.url));

export async function updateSkills(host = "all", options = {}) {
  destinations(host, options); // Validate arguments before touching Git.
  const sourceRoot = await fs.realpath(options.sourceRoot || defaultRoot);
  async function git(args) {
    try {
      const { stdout } = await execute("git", args, {
        cwd: sourceRoot,
        timeout: 60_000,
        env: { ...process.env, GIT_TERMINAL_PROMPT: "0" },
      });
      return stdout.trim();
    } catch (error) {
      throw Error(
        `Kip update stopped: ${error.stderr?.trim() || error.message}`,
        { cause: error },
      );
    }
  }

  const gitRoot = await fs.realpath(
    await git(["rev-parse", "--show-toplevel"]),
  );
  if (gitRoot !== sourceRoot)
    throw Error(
      "Run the updater from a Kip repository root, not a nested directory.",
    );
  if (await git(["status", "--porcelain", "--untracked-files=normal"]))
    throw Error(
      "Kip clone has local changes. Commit, stash, or move them aside before updating; nothing was pulled or installed.",
    );
  await git([
    "rev-parse",
    "--abbrev-ref",
    "--symbolic-full-name",
    "@{upstream}",
  ]);
  const before = await git(["rev-parse", "HEAD"]);
  await git(["pull", "--ff-only"]);
  const after = await git(["rev-parse", "HEAD"]);

  // Load the newly pulled installer rather than a pre-update cached module.
  const installer = await import(
    `${pathToFileURL(path.join(sourceRoot, "src", "install.js")).href}?revision=${after}`
  );
  const updated = await installer.refreshSkills(host, options);
  return { before, after, updated };
}
