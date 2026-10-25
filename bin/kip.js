#!/usr/bin/env node
import { authenticate } from '../src/codex.js';
import { install, prepare, run } from '../src/core.js';

const help = `kip login
kip status
kip install
kip plan "task" [--file path] [--skill name] [--tier standard|complex] [--model id]
kip run "task" [same options]

Install creates .kip in the current directory. Plan is offline.
Run sends the task, selected skills, and explicit files to OpenAI and saves its response.
No generated commands or patches are executed. Node.js 22+ required.`;
try {
  const [command, ...args] = process.argv.slice(2);
  if (!command || ['--help', '-h'].includes(command)) console.log(help);
  else if (['login', 'status'].includes(command)) {
    if (args.length) throw Error('Authentication commands take no arguments');
    await authenticate(command);
  } else if (command === 'install') {
    if (args.length) throw Error('install takes no arguments');
    await install(process.cwd()); console.log('Installed .kip; existing files preserved.');
  } else if (['plan', 'run'].includes(command)) {
    const task = args.shift(); const options = { files: [], skills: [] };
    while (args.length) {
      const flag = args.shift(); const value = args.shift();
      if (!['--file', '--skill', '--tier', '--model'].includes(flag) || !value || value.startsWith('--')) throw Error(`Invalid option: ${flag}`);
      if (flag === '--file') options.files.push(value);
      else if (flag === '--skill') options.skills.push(value);
      else options[flag.slice(2)] = value;
    }
    const plan = await prepare(process.cwd(), task, options);
    if (command === 'plan') console.log(JSON.stringify({ provider: 'codex-chatgpt', model: plan.request.model || 'codex-default', skills: plan.skills, files: options.files, contextBytes: plan.contextBytes, executions: 1 }, null, 2));
    else { const result = await run(process.cwd(), plan); console.log(result.text); console.log(`\nSaved: ${result.output}\nUsage: ${JSON.stringify(result.usage)}`); }
  } else throw Error(`Unknown command: ${command}`);
} catch (error) { console.error(error.message); process.exitCode = 1; }
