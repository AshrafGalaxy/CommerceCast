const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('\x1b[36m%s\x1b[0m', '═══════════════════════════════════════════════════════');
console.log('\x1b[1m\x1b[34m%s\x1b[0m', '  🔍 CommerceCast Fast Local Verification Suite');
console.log('\x1b[36m%s\x1b[0m', '═══════════════════════════════════════════════════════');

let passed = true;

// 1. Check TypeScript types
console.log('\n\x1b[33m[1/3]\x1b[0m Running TypeScript typecheck (tsc --noEmit)...');
const tsc = spawnSync(process.platform === 'win32' ? 'npx.cmd' : 'npx', ['tsc', '--noEmit'], {
  stdio: 'inherit',
  shell: true,
});

if (tsc.status === 0) {
  console.log('\x1b[32m  ✓ TypeScript check passed!\x1b[0m');
} else {
  console.log('\x1b[31m  ✗ TypeScript errors found.\x1b[0m');
  passed = false;
}

// 2. Check Next.js Build
console.log('\n\x1b[33m[2/3]\x1b[0m Testing Next.js Turbopack build compilation...');
const build = spawnSync(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'build'], {
  stdio: 'inherit',
  shell: true,
});

if (build.status === 0) {
  console.log('\x1b[32m  ✓ Production build compiled successfully!\x1b[0m');
} else {
  console.log('\x1b[31m  ✗ Next.js build failed.\x1b[0m');
  passed = false;
}

// 3. Check Python backend syntax
console.log('\n\x1b[33m[3/3]\x1b[0m Validating Python Backend syntax...');
const rootDir = path.resolve(__dirname, '..');
const venvPy = path.join(rootDir, 'python-backend', 'venv', 'Scripts', 'python.exe');
const pyBin = fs.existsSync(venvPy) ? venvPy : 'python';

const pyCheck = spawnSync(pyBin, ['-m', 'py_compile', 'main.py'], {
  cwd: path.join(rootDir, 'python-backend'),
  stdio: 'inherit',
  shell: true,
});

if (pyCheck.status === 0) {
  console.log('\x1b[32m  ✓ Python backend syntax valid!\x1b[0m');
} else {
  console.log('\x1b[31m  ✗ Python backend syntax errors.\x1b[0m');
  passed = false;
}

console.log('\n\x1b[36m%s\x1b[0m', '───────────────────────────────────────────────────────');
if (passed) {
  console.log('\x1b[1m\x1b[32m%s\x1b[0m', '  🎉 ALL CHECKS PASSED! Clean and ready to push.');
} else {
  console.log('\x1b[1m\x1b[31m%s\x1b[0m', '  ⚠️ Some checks failed. Please fix before pushing.');
}
console.log('\x1b[36m%s\x1b[0m\n', '───────────────────────────────────────────────────────');

process.exit(passed ? 0 : 1);
