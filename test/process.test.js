import test from "node:test";
import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";
import { invoke, checkCodex } from "../src/codex.js";
import { install, prepare, run } from "../src/core.js";

async function fixture(t) {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "kip-process-"));
  t.after(() => fs.rm(dir, { recursive: true, force: true }));
  const bin = path.join(dir, "bin");
  await fs.mkdir(bin);
  await fs.writeFile(
    path.join(bin, "codex"),
    `#!${process.execPath}
const args = process.argv.slice(2);
if (args[0] === 'unicode') {
  const data = Buffer.from('世界');
  process.stdout.write(data.subarray(0, 1));
  setTimeout(() => process.stdout.write(data.subarray(1)), 20);
} else if (args[0] === 'timeout') {
  process.stderr.write('waiting for provider');
  setInterval(() => {}, 1000);
} else if (args[0] === 'overflow') {
  process.stdout.write('x'.repeat(4_000_001));
} else if (args[0] === 'signal') {
  process.kill(process.pid, 'SIGTERM');
} else if (args[0] === 'login') {
  console.error('Logged in using ChatGPT');
} else if (args.includes('--help')) {
  console.log('--json --ephemeral --ignore-user-config --ignore-rules');
} else {
  let input = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', chunk => input += chunk);
  process.stdin.on('end', () => {
    if (!input.includes('Fix bug') || !input.includes('sample.js')) process.exit(2);
    console.log(JSON.stringify({ type:'item.completed', item:{type:'agent_message',text:'Verified fake response'} }));
    console.log(JSON.stringify({ type:'turn.completed',usage:{input_tokens:10,output_tokens:3} }));
  });
}
`,
    { mode: 0o700 },
  );
  return {
    dir,
    env: { ...process.env, PATH: `${bin}${path.delimiter}${process.env.PATH}` },
  };
}

test("process boundary handles split UTF-8, missing executable, and signals", async (t) => {
  const { dir, env } = await fixture(t);
  const result = await invoke(["unicode"], { env });
  assert.equal(result.stdout, "世界");
  await assert.rejects(invoke([], { env: { PATH: dir } }), /Install Codex CLI/);
  const terminated = await invoke(["signal"], { env });
  assert.equal(terminated.code, null);
  assert.equal(terminated.signal, "SIGTERM");
});

test("process timeout and output limit terminate the child with diagnostics", async (t) => {
  const { env } = await fixture(t);
  await assert.rejects(
    invoke(["timeout"], { env, timeoutMs: 1500 }),
    (error) => {
      assert.match(error.message, /timed out/);
      assert.match(error.stderr, /waiting for provider/);
      return true;
    },
  );
  await assert.rejects(invoke(["overflow"], { env }), /output exceeded limit/);
  await assert.rejects(
    invoke([], { env, timeoutMs: 2 ** 31 }),
    /Invalid Codex timeout/,
  );
});

test("legacy runner modules still handle a real subprocess boundary", async (t) => {
  const { dir, env } = await fixture(t);
  const invokeImpl = (args, options) => invoke(args, { ...options, env });
  await install(dir);
  await fs.writeFile(
    path.join(dir, "sample.js"),
    "export const broken = true;",
  );
  const plan = await prepare(dir, "Fix bug", { files: ["sample.js"] });
  assert.ok(plan.skills.includes("testing"));
  await checkCodex(invokeImpl);
  const result = await run(dir, plan, { invokeImpl });
  assert.equal(result.status, "completed");
  assert.equal(result.text, "Verified fake response");
  assert.equal(result.usage.output_tokens, 3);
  const records = await fs.readdir(path.join(dir, ".kip/runs"));
  assert.equal(records.length, 1);
});
