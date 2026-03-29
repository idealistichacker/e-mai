import { spawn } from 'node:child_process';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const npmCommand = process.platform === 'win32' ? 'npm' : 'npm';

const children = [];

function run(name, cwd, colorCode) {
  const child = spawn(`${npmCommand} run dev`, {
    cwd,
    stdio: ['inherit', 'pipe', 'pipe'],
    env: process.env,
    shell: true
  });

  const colorPrefix = `\u001b[${colorCode}m[${name}]\u001b[0m`;

  child.stdout.on('data', (chunk) => {
    process.stdout.write(`${colorPrefix} ${chunk}`);
  });

  child.stderr.on('data', (chunk) => {
    process.stderr.write(`${colorPrefix} ${chunk}`);
  });

  child.on('exit', (code) => {
    if (code !== 0) {
      console.error(`${colorPrefix} exited with code ${code}`);
    }
  });

  children.push(child);
}

run('server', fileURLToPath(new URL('../server', import.meta.url)), '36');
run('client', fileURLToPath(new URL('../client', import.meta.url)), '35');

function shutdown(signal) {
  for (const child of children) {
    if (!child.killed) {
      child.kill(signal);
    }
  }
  process.exit(0);
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
