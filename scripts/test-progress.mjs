/**
 * Unit tests for readingProgress().
 *
 * The scroll bar cannot be exercised in the headless browser pane used to
 * develop this repo (it does not composite, so scrollTop stays pinned at
 * 0). The math lives in a pure function specifically so it can be checked
 * here instead of going out unverified.
 *
 * Node 24 strips TypeScript natively, so the .ts source is imported directly.
 *
 *   node scripts/test-progress.mjs
 */

import { readingProgress as p } from '../src/lib/progress.ts';

const cases = [
  ['top of page', [0, 2289, 720], 0],
  ['quarter way', [392.25, 2289, 720], 0.25],
  ['halfway', [784.5, 2289, 720], 0.5],
  ['bottom', [1569, 2289, 720], 1],
  ['overscroll past end', [3000, 2289, 720], 1],
  ['negative (rubber band)', [-80, 2289, 720], 0],
  ['page shorter than viewport', [0, 400, 720], 0],
  ['page exactly viewport height', [0, 720, 720], 0],
];

let failures = 0;
for (const [label, args, want] of cases) {
  const got = p(...args);
  const ok = Math.abs(got - want) < 1e-9;
  if (!ok) failures++;
  console.log(
    `  ${ok ? 'ok  ' : 'FAIL'}  ${label.padEnd(28)} -> ${got.toFixed(4)} (want ${want})`
  );
}

console.log(`\n  ${cases.length} cases . ${failures} failure${failures === 1 ? '' : 's'}\n`);
process.exit(failures ? 1 : 0);
