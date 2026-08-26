const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const rootDir = path.resolve(__dirname, '..');
const pythonDir = path.join(rootDir, 'python-backend');

// Find Python binary (prefer python-backend/venv)
let pythonBin = 'python';
const venvPyWindows = path.join(pythonDir, 'venv', 'Scripts', 'python.exe');
const venvPyUnix = path.join(pythonDir, 'venv', 'bin', 'python');

if (fs.existsSync(venvPyWindows)) {
  pythonBin = venvPyWindows;
} else if (fs.existsSync(venvPyUnix)) {
  pythonBin = venvPyUnix;
}

console.log('\x1b[36m%s\x1b[0m', '═══════════════════════════════════════════════════════════════');
console.log('\x1b[1m\x1b[35m%s\x1b[0m', '  🛒 CommerceCast Local Full-Stack Development Environment');
console.log('\x1b[36m%s\x1b[0m', '═══════════════════════════════════════════════════════════════');
console.log(`\x1b[32m[INIT]\x1b[0m Python Engine: \x1b[33m${pythonBin}\x1b[0m`);
console.log(`\x1b[32m[INIT]\x1b[0m Frontend:      \x1b[33mNext.js Turbopack (http://localhost:9002)\x1b[0m`);
console.log(`\x1b[32m[INIT]\x1b[0m Backend API:   \x1b[33mFastAPI (http://localhost:8000)\x1b[0m`);
console.log('\x1b[36m%s\x1b[0m', '───────────────────────────────────────────────────────────────\n');

const processes = [];

// 1. Spawn Python Backend
const apiProc = spawn(pythonBin, ['main.py'], {
  cwd: pythonDir,
  shell: true,
  env: { ...process.env, PYTHONUNBUFFERED: '1' },
});

apiProc.stdout.on('data', (data) => {
  const lines = data.toString().trim().split('\n');
  lines.forEach((line) => {
    if (line.trim()) console.log(`\x1b[36m[API]\x1b[0m ${line}`);
  });
});

apiProc.stderr.on('data', (data) => {
  const lines = data.toString().trim().split('\n');
  lines.forEach((line) => {
    if (line.trim()) console.log(`\x1b[33m[API:LOG]\x1b[0m ${line}`);
  });
});

processes.push(apiProc);

// 2. Spawn Next.js Frontend
const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const webProc = spawn(npmCmd, ['run', 'dev'], {
  cwd: rootDir,
  shell: true,
  env: { ...process.env, FORCE_COLOR: '1' },
});

webProc.stdout.on('data', (data) => {
  const lines = data.toString().trim().split('\n');
  lines.forEach((line) => {
    if (line.trim()) console.log(`\x1b[32m[WEB]\x1b[0m ${line}`);
  });
});

webProc.stderr.on('data', (data) => {
  const lines = data.toString().trim().split('\n');
  lines.forEach((line) => {
    if (line.trim()) console.log(`\x1b[31m[WEB:ERR]\x1b[0m ${line}`);
  });
});

processes.push(webProc);

// Graceful Exit Handler
function cleanup() {
  console.log('\n\x1b[33m%s\x1b[0m', 'Shutting down local dev servers...');
  processes.forEach((proc) => {
    try {
      if (process.platform === 'win32' && proc.pid) {
        spawn('taskkill', ['/pid', proc.pid.toString(), '/f', '/t']);
      } else {
        proc.kill('SIGTERM');
      }
    } catch (e) {}
  });
  process.exit();
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('exit', cleanup);
