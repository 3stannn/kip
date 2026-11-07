import { promises as fs } from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { pathToFileURL } from "node:url";

// Estimates only: real tokenizers vary by model and content (code is denser
// than prose). Use the numbers to compare before/after, not as billing.
export const charsPerToken = 4;
export const limits = { fileBytes: 1024 * 1024, files: 2000, duplicates: 20 };

// Loaded into every session by their hosts; their cost repeats every chat.
const alwaysFiles = [
  "AGENTS.md",
  "CLAUDE.md",
  "CLAUDE.local.md",
  "GEMINI.md",
  ".github/copilot-instructions.md",
  ".cursorrules",
  ".windsurfrules",
];
// Skills, agents, commands, and rules. Bodies load on demand.
const contextDirectories = [
  ".claude",
  ".agents",
  ".codex",
  ".gemini",
  ".cursor/rules",
  ".windsurf/rules",
  ".github/instructions",
  ".github/prompts",
];
const textExtensions = new Set([".md", ".mdc", ".txt", ".yaml", ".yml"]);
const skipped = new Set(["node_modules", ".git", "kip-backups"]);

export const estimateTokens = (text) => Math.ceil(text.length / charsPerToken);

function inside(root, target) {
  const relative = path.relative(root, target);
  if (relative.startsWith("..") || path.isAbsolute(relative))
    throw Error(`Path escapes the project root: ${target}`);
  return relative.replaceAll("\\", "/");
}

async function collect(root, target, found) {
  let stat;
  try {
    stat = await fs.lstat(target);
  } catch (error) {
    if (error.code === "ENOENT") return;
    throw error;
  }
  if (stat.isSymbolicLink()) return;
  if (stat.isDirectory()) {
    for (const entry of await fs.readdir(target)) {
      if (!skipped.has(entry))
        await collect(root, path.join(target, entry), found);
    }
  } else if (
    stat.isFile() &&
    (textExtensions.has(path.extname(target).toLowerCase()) ||
      alwaysFiles.includes(inside(root, target)))
  ) {
    if (found.size >= limits.files)
      throw Error(`More than ${limits.files} files; pass narrower paths`);
    found.add(inside(root, target));
  }
}

// A skill's frontmatter (name, description) is listed in every session; the
// body loads only when the skill is invoked.
function split(file, text) {
  if (alwaysFiles.includes(file)) return { always: text, onDemand: "" };
  if (path.basename(file) === "SKILL.md") {
    const match = /^---\r?\n[\s\S]*?\r?\n---\r?\n?/.exec(text);
    if (match)
      return { always: match[0], onDemand: text.slice(match[0].length) };
  }
  return { always: "", onDemand: text };
}

const normalize = (line) =>
  line
    .trim()
    .replace(/^([-*+>]|\d+[.)]|#+)\s+/, "")
    .replace(/\s+/g, " ")
    .toLowerCase();

export async function measure(root, paths = []) {
  root = path.resolve(root);
  const found = new Set();
  const targets = paths.length
    ? paths
    : [...alwaysFiles, ...contextDirectories];
  for (const target of targets)
    await collect(root, path.resolve(root, target), found);

  const files = [];
  const lines = new Map();
  for (const file of [...found].sort()) {
    const absolute = path.join(root, file);
    const { size } = await fs.stat(absolute);
    if (size > limits.fileBytes)
      throw Error(`File exceeds ${limits.fileBytes} bytes: ${file}`);
    const text = await fs.readFile(absolute, "utf8");
    const { always, onDemand } = split(file, text);
    files.push({
      file,
      bytes: size,
      lines: text.split("\n").length,
      tokens: estimateTokens(text),
      always: estimateTokens(always),
      onDemand: estimateTokens(onDemand),
      sha256: createHash("sha256").update(text).digest("hex"),
    });
    text.split(/\r?\n/).forEach((raw, index) => {
      const line = normalize(raw);
      if (line.length < 40 || /^[|`-]/.test(line)) return;
      const seen = lines.get(line) ?? [];
      seen.push(`${file}:${index + 1}`);
      lines.set(line, seen);
    });
  }
  const duplicates = [...lines]
    .filter(([, places]) => places.length > 1)
    .map(([line, places]) => ({
      line: line.length > 100 ? `${line.slice(0, 97)}...` : line,
      places,
      wasted: estimateTokens(line) * (places.length - 1),
    }))
    .sort((a, b) => b.wasted - a.wasted)
    .slice(0, limits.duplicates);
  const sum = (key) => files.reduce((total, entry) => total + entry[key], 0);
  return {
    estimate: `~${charsPerToken} characters per token; compare runs, do not bill from it`,
    totals: {
      files: files.length,
      tokens: sum("tokens"),
      always: sum("always"),
      onDemand: sum("onDemand"),
    },
    files,
    duplicates,
  };
}

export function compare(baseline, current) {
  const before = new Map(baseline.files.map((entry) => [entry.file, entry]));
  const after = new Map(current.files.map((entry) => [entry.file, entry]));
  const changes = [...new Set([...before.keys(), ...after.keys()])]
    .sort()
    .map((file) => ({
      file,
      before: before.get(file)?.tokens ?? 0,
      after: after.get(file)?.tokens ?? 0,
    }))
    .filter((entry) => entry.before !== entry.after);
  const delta = (key) => current.totals[key] - baseline.totals[key];
  return {
    estimate: current.estimate,
    totals: {
      before: baseline.totals,
      after: current.totals,
      delta: {
        tokens: delta("tokens"),
        always: delta("always"),
        onDemand: delta("onDemand"),
      },
    },
    changes,
  };
}

function format(command, result) {
  const out = [`Token estimate (${result.estimate}).`];
  if (command === "compare") {
    const { before, after, delta } = result.totals;
    for (const key of ["tokens", "always", "onDemand"])
      out.push(
        `${key.padEnd(9)} ${String(before[key]).padStart(7)} -> ${String(after[key]).padStart(7)} (${delta[key] > 0 ? "+" : ""}${delta[key]})`,
      );
    for (const { file, before: b, after: a } of result.changes)
      out.push(`  ${file}: ${b} -> ${a}`);
    return out.join("\n");
  }
  const { files, tokens, always, onDemand } = result.totals;
  out.push(
    `${files} files, ${tokens} tokens: ${always} loaded every session, ${onDemand} on demand.`,
  );
  for (const entry of [...result.files].sort((a, b) => b.tokens - a.tokens))
    out.push(
      `${String(entry.tokens).padStart(7)}  ${entry.file}${entry.always ? ` (always ${entry.always})` : ""}`,
    );
  if (result.duplicates.length) {
    out.push("Repeated lines (merge to one source):");
    for (const { line, places, wasted } of result.duplicates)
      out.push(
        `  ~${wasted} tokens x${places.length}: ${line}\n    ${places.join(", ")}`,
      );
  }
  return out.join("\n");
}

const usage =
  "Usage: tokens.mjs measure --root <dir> [--json] [path ...]\n       tokens.mjs compare --root <dir> --baseline <measure.json> [--json] [path ...]";

async function main(argv) {
  const [command, ...rest] = argv;
  if (!["measure", "compare"].includes(command)) throw Error(usage);
  const options = { root: null, baseline: null, json: false, paths: [] };
  for (let index = 0; index < rest.length; index++) {
    const arg = rest[index];
    if (arg === "--json") options.json = true;
    else if (arg === "--root" || arg === "--baseline") {
      if (!rest[index + 1]) throw Error(`${arg} needs a value\n${usage}`);
      options[arg.slice(2)] = rest[++index];
    } else if (arg.startsWith("--"))
      throw Error(`Unknown option ${arg}\n${usage}`);
    else options.paths.push(arg);
  }
  if (!options.root) throw Error(`--root is required\n${usage}`);
  let result = await measure(options.root, options.paths);
  if (command === "compare") {
    if (!options.baseline) throw Error(`--baseline is required\n${usage}`);
    const baseline = JSON.parse(await fs.readFile(options.baseline, "utf8"));
    if (!options.paths.length && baseline.files?.length)
      // Measure the same files as the baseline, plus any new context files.
      result = await measure(options.root, [
        ...new Set([
          ...baseline.files.map(({ file }) => file),
          ...result.files.map(({ file }) => file),
        ]),
      ]);
    result = compare(baseline, result);
  }
  console.log(
    options.json ? JSON.stringify(result, null, 2) : format(command, result),
  );
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  main(process.argv.slice(2)).catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
