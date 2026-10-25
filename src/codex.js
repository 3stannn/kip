import { spawn } from 'node:child_process';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

export function accountEnvironment(source = process.env) {
  const env = { ...source };
  for (const key of ['OPENAI_API_KEY', 'CODEX_API_KEY', 'OPENAI_BASE_URL', 'OPENAI_API_BASE', 'CODEX_ACCESS_TOKEN']) delete env[key];
  return env;
}
export function invoke(args, { input = '', cwd, timeoutMs = 90000, env = accountEnvironment() } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn('codex', args, { cwd, env, shell: false, stdio: ['pipe', 'pipe', 'pipe'] });
    let stdout = '', stderr = '', failed = false;
    const timer = setTimeout(() => { failed = true; child.kill('SIGKILL'); reject(Error('Codex timed out; no automatic retry')); }, timeoutMs);
    child.on('error', error => { clearTimeout(timer); reject(Error(error.code === 'ENOENT' ? 'Install Codex CLI, then run kip login' : error.message)); });
    child.stdin.on('error', () => {});
    for (const [stream, name] of [[child.stdout, 'stdout'], [child.stderr, 'stderr']]) stream.on('data', chunk => {
      if (name === 'stdout') stdout += chunk; else stderr += chunk;
      if (Buffer.byteLength(stdout) + Buffer.byteLength(stderr) > 4_000_000 && !failed) {
        failed = true; child.kill('SIGKILL'); clearTimeout(timer); reject(Error('Codex output exceeded limit'));
      }
    });
    child.on('close', code => { clearTimeout(timer); if (!failed) resolve({ code, stdout, stderr }); });
    child.stdin.end(input);
  });
}
export async function authenticate(command = 'status') {
  const args = command === 'login' ? ['login'] : ['login', 'status'];
  const env = accountEnvironment();
  return new Promise((resolve, reject) => {
    const child = spawn('codex', args, { env, shell: false, stdio: 'inherit' });
    child.on('error', () => reject(Error('Install Codex CLI first')));
    child.on('close', code => code === 0 ? resolve() : reject(Error('Codex authentication did not succeed')));
  });
}
export async function executeCodex(prepared, invokeImpl = invoke) {
  const status = await invokeImpl(['login', 'status'], { timeoutMs: 15000 });
  if (status.code !== 0 || !/chatgpt/i.test(status.stdout + status.stderr) || /api key/i.test(status.stdout + status.stderr)) {
    throw Error('ChatGPT sign-in required. Run kip login and sign in with your ChatGPT account. API-key fallback is disabled.');
  }
  const cwd = await fs.mkdtemp(path.join(os.tmpdir(), 'kip-run-'));
  try {
    const args = ['exec', '--json', '--ephemeral', '--ignore-user-config', '--ignore-rules', '--skip-git-repo-check', '--sandbox', 'read-only', '-c', 'forced_login_method="chatgpt"', '-c', 'model_provider="openai"', '-c', 'approval_policy="never"', '-c', 'features.shell_tool=false'];
    if (prepared.request.model) args.push('--model', prepared.request.model);
    args.push('-');
    const result = await invokeImpl(args, { cwd, timeoutMs: prepared.config.timeoutMs,
      input: prepared.request.instructions + '\n\nUse only the supplied excerpts. Do not use tools or inspect local files.\n\n' + prepared.request.input });
    const events = result.stdout.split('\n').filter(line => line.trim()).map(line => JSON.parse(line));
    const completion = events.findLast(e => e.type === 'turn.completed');
    const text = events.filter(e => e.type === 'item.completed' && e.item?.type === 'agent_message').map(e => e.item.text).join('\n');
    const success = result.code === 0 && completion && !events.some(e => ['error','turn.failed'].includes(e.type));
    return { status: success ? 'completed' : 'failed', text, usage: completion?.usage,
      id: events.find(e => e.type === 'thread.started')?.thread_id, model: prepared.request.model || 'codex-default' };
  } finally { await fs.rm(cwd, { recursive: true, force: true }); }
}
