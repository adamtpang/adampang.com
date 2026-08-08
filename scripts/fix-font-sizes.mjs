/**
 * Codemod: snap arbitrary sub-12px font sizes onto the token type scale.
 *
 * Lighthouse measured only 55.82% of the homepage's text as legible
 * (its threshold is 12px). The site used four arbitrary sizes below that:
 *
 *   text-[0.7rem]   11.2px   31.81% of all text
 *   text-[0.65rem]  10.4px    5.88%
 *   text-[0.55rem]   8.8px    5.52%
 *   text-[0.6rem]    9.6px    0.96%
 *
 * All four map to `text-caption`, the smallest step the design system
 * actually documents (0.75rem / 12px). This both fixes legibility and makes
 * the components stop bypassing their own scale.
 *
 * Visual note: 0.7rem -> 0.75rem is imperceptible, but 0.55rem -> 0.75rem is
 * a 36% jump on the smallest uppercase eyebrows.
 *
 *   node scripts/fix-font-sizes.mjs          dry run
 *   node scripts/fix-font-sizes.mjs --write  apply
 */

import fs from 'node:fs';
import path from 'node:path';

const write = process.argv.includes('--write');

/** rem values below 0.75 that should become the caption step. */
const TOO_SMALL = /text-\[(0?\.\d+)rem\]/g;
const FLOOR = 0.75;

const walk = (d) =>
  fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]
  );

const files = walk('src').filter((f) => /\.tsx?$/.test(f));
const counts = {};
const touched = [];

for (const file of files) {
  const before = fs.readFileSync(file, 'utf8');
  let n = 0;

  const after = before.replace(TOO_SMALL, (m, rem) => {
    if (Number(rem) >= FLOOR) return m;
    counts[m] = (counts[m] || 0) + 1;
    n++;
    return 'text-caption';
  });

  if (n > 0) {
    touched.push({ file, n });
    if (write) fs.writeFileSync(file, after);
  }
}

console.log(`\n  ${write ? 'APPLIED' : 'DRY RUN'} . arbitrary sizes below ${FLOOR}rem -> text-caption\n`);
for (const [k, v] of Object.entries(counts).sort((a, b) => b[1] - a[1])) {
  const px = (Number(k.match(/[\d.]+/)[0]) * 16).toFixed(1);
  console.log(`  ${String(v).padStart(3)}  ${k.padEnd(18)} ${px}px -> 12px`);
}
console.log(`\n  ${touched.length} files . ${Object.values(counts).reduce((a, b) => a + b, 0)} replacements\n`);
if (!write) console.log('  re-run with --write to apply\n');
