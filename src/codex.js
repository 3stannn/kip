import { spawn } from "node:child_process";
import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";

export function accountEnvironment(source = process.env) {
  const env = { ...source };
  for (const key of [
    "OPENAI_API_KEY",
    "CODEX_API_KEY",
    "OPENAI_BASE_URL",
    "OPENAI_API_BASE",
    "CODEX_ACCESS_TOKEN",
  ])
    delete env[key];
  return env;
}
export function invoke(
  args,
  { input = "", cwd, timeoutMs = 90000, env = accountEnvironment() } = {},
) {
  return new Promise((resolve, reject) => {
    if (
      !Number.isSafeInteger(timeoutMs) ||
      timeoutMs < 1 ||
      timeoutMs > 2_147_483_647
    ) {
      reject(Error("Invalid Codex timeout"));
      return;
    }
    const child = spawn("codex", args, {
      cwd,
      env,
      shell: false,
      stdio: ["pipe", "pipe", "pipe"],
    });
    let stdout = "",
      stderr = "",
      failed = false;
    function fail(message) {
      if (failed) return;
      failed = true;
      clearTimeout(timer);
      child.kill("SIGKILL");
      reject(Object.assign(Error(message), { stdout, stderr }));
    }
    const timer = setTimeout(
      () => fail("Codex timed out; no automatic retry"),
      timeoutMs,
    );
    child.on("error", (error) =>
      fail(
        error.code === "ENOENT"
          ? "Install Codex CLI, then run kip login"
          : error.message,
      ),
    );
    child.stdin.on("error", () => {});
    for (const [stream, name] of [
      [child.stdout, "stdout"],
      [child.stderr, "stderr"],
    ]) {
      stream.setEncoding("utf8");
      stream.on("data", (chunk) => {
        if (failed) return;
        if (name === "stdout") stdout += chunk;
        else stderr += chunk;
        if (Buffer.byteLength(stdout) + Buffer.byteLength(stderr) > 4_000_000)
          fail("Codex output exceeded limit");
      });
    }
    child.on("close", (code, signal) => {
      clearTimeout(timer);
      if (!failed) resolve({ code, signal, stdout, stderr });
    });
    child.stdin.end(input);
  });
}
export function requireChatGPT(status) {
  const message = (status.stdout || "") + (status.stderr || "");
  if (
    status.code !== 0 ||
    !/logged in using chatgpt/i.test(message) ||
    /api key/i.test(message)
  ) {
    throw Error(
      "ChatGPT sign-in required. Run kip login and sign in with your ChatGPT account. API-key fallback is disabled.",
    );
  }
}
export async function authenticate(command = "status", invokeImpl = invoke) {
  if (command === "status") {
    requireChatGPT(await invokeImpl(["login", "status"], { timeoutMs: 15000 }));
    return;
  }
  if (command !== "login") throw Error("Unknown authentication command");
  const args = ["login", "-c", 'forced_login_method="chatgpt"'];
  const env = accountEnvironment();
  await new Promise((resolve, reject) => {
    const child = spawn("codex", args, { env, shell: false, stdio: "inherit" });
    child.on("error", () => reject(Error("Install Codex CLI first")));
    child.on("close", (code) =>
      code === 0
        ? resolve()
        : reject(Error("Codex authentication did not succeed")),
    );
  });
  requireChatGPT(await invokeImpl(["login", "status"], { timeoutMs: 15000 }));
}
export function buildPrompt(request) {
  return (
    request.instructions +
    "\n\nUse only the supplied excerpts. Do not use tools or inspect local files.\n\n" +
    request.input
  );
}
export async function checkCodex(invokeImpl = invoke) {
  const help = await invokeImpl(["exec", "--help"], { timeoutMs: 15000 });
  if (
    help.code !== 0 ||
    !["--json", "--ephemeral", "--ignore-user-config", "--ignore-rules"].every(
      (flag) => help.stdout.includes(flag),
    )
  ) {
    throw Error(
      "Codex CLI is incompatible. Update it with npm install --global @openai/codex. Required exec flags: --json, --ephemeral, --ignore-user-config, --ignore-rules.",
    );
  }
  requireChatGPT(await invokeImpl(["login", "status"], { timeoutMs: 15000 }));
}
export async function executeCodex(prepared, invokeImpl = invoke) {
  const status = await invokeImpl(["login", "status"], { timeoutMs: 15000 });
  requireChatGPT(status);
  const cwd = await fs.mkdtemp(path.join(os.tmpdir(), "kip-run-"));
  try {
    const args = [
      "exec",
      "--json",
      "--ephemeral",
      "--ignore-user-config",
      "--ignore-rules",
      "--skip-git-repo-check",
      "--sandbox",
      "read-only",
      "-c",
      'forced_login_method="chatgpt"',
      "-c",
      'model_provider="openai"',
      "-c",
      'approval_policy="never"',
      "-c",
      "features.shell_tool=false",
    ];
    if (prepared.request.model) args.push("--model", prepared.request.model);
    args.push("-");
    const result = await invokeImpl(args, {
      cwd,
      timeoutMs: prepared.config.timeoutMs,
      input: buildPrompt(prepared.request),
    });
    const events = [];
    let parseError;
    for (const line of result.stdout
      .split("\n")
      .filter((line) => line.trim())) {
      try {
        const event = JSON.parse(line);
        if (!event || typeof event.type !== "string")
          throw Error("Invalid event");
        events.push(event);
      } catch {
        parseError = "Codex returned invalid JSON events";
      }
    }
    const completion = events.findLast((e) => e.type === "turn.completed");
    const text = events
      .filter(
        (e) =>
          e.type === "item.completed" &&
          e.item?.type === "agent_message" &&
          typeof e.item.text === "string",
      )
      .map((e) => e.item.text)
      .join("\n");
    const errors = events
      .filter((e) => ["error", "turn.failed"].includes(e.type))
      .map((e) => e.message || e.error?.message || "Codex turn failed");
    const success =
      result.code === 0 &&
      completion &&
      !errors.length &&
      !parseError &&
      text.trim();
    return {
      status: success ? "completed" : "failed",
      text,
      usage: completion?.usage,
      error: success
        ? undefined
        : errors.join("\n") ||
          parseError ||
          result.stderr?.trim() ||
          `Codex exited ${result.signal || result.code} without a completed response`,
      exitCode: result.code,
      signal: result.signal,
      stderr: result.stderr,
      ...(parseError ? { stdout: result.stdout } : {}),
      id: events.find((e) => e.type === "thread.started")?.thread_id,
      model: prepared.request.model || "codex-default",
    };
  } finally {
    await fs.rm(cwd, { recursive: true, force: true });
  }
}
