import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

// Supply the SHA returned by a fresh lookup of the live domain, not a deployment list.
const productionSha = process.argv[2];
if (!/^[a-f0-9]{40}$/i.test(productionSha ?? '')) {
  throw new Error('Usage: pnpm check:release <verified-live-domain-commit-sha>');
}
const windowsGit = join(process.env.ProgramFiles ?? 'C:\\Program Files', 'Git', 'cmd', 'git.exe');
const executable = process.platform === 'win32' && existsSync(windowsGit) ? windowsGit : 'git';
const git = (...args) => execFileSync(executable, args, { encoding: 'utf8' }).trim();
if (git('status', '--porcelain')) {
  throw new Error('Release blocked: commit the reviewed changes in this checkout first.');
}
try {
  git('merge-base', '--is-ancestor', productionSha, 'HEAD');
} catch {
  throw new Error('Release blocked: this checkout does not contain the active production baseline. Reconcile it before deploying.');
}
console.log(`Release source gate passed: ${git('rev-parse', 'HEAD')} contains ${productionSha}. Run pnpm verify and browser checks before deployment.`);
