/**
 * Codemod: retire sub-70% text-opacity utilities in favour of the AA-safe
 * semantic tokens.
 *
 * Alpha-composited text is where the site's WCAG failures were:
 *   text-ink/55 on white measures 3.90:1, text-ink/40 measures 2.83:1.
 * Both need 4.5:1.
 *
 * --color-muted and --color-faint are mode-aware, so one class replaces the
 * `text-ink/NN dark:text-paper/NN` pair and the dark: twin goes away.
 *
 *   50-69  -> text-muted   (5.84:1 light, 7.19:1 dark)
 *   below 50 -> text-faint (4.62:1 light, 5.45:1 dark)
 *   70+    -> left alone, already passes
 *
 *   node scripts/fix-text-contrast.mjs          dry run
 *   node scripts/fix-text-contrast.mjs --write  apply
 */

import fs from 'node:fs';
import path from 'node:path';

const write = process.argv.includes('--write');
const FLOOR = 70;

const bucket = (n) => (n >= 50 ? 'muted' : 'faint');

const walk = (d) =>
  fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]
  );

const files = walk('src').filter((f) => /\.tsx?$/.test(f));

let edits = 0;
const log = [];

for (const file of files) {
  const before = fs.readFileSync(file, 'utf8');
  let after = before;

  // 1. Paired light+dark. Collapse to one mode-aware class.
  after = after.replace(
    /text-ink\/(\d+)\s+dark:text-paper\/(\d+)/g,
    (m, a) => (Number(a) >= FLOOR ? m : `text-${bucket(Number(a))}`)
  );

  // 2. Lone light. \b stops "55" backtracking to "5".
  after = after.replace(/text-ink\/(\d+)\b/g, (m, a) =>
    Number(a) >= FLOOR ? m : `text-${bucket(Number(a))}`
  );

  // 3. Lone dark. Keep the dark: prefix so the light value is untouched.
  after = after.replace(/dark:text-paper\/(\d+)\b/g, (m, a) =>
    Number(a) >= FLOOR ? m : `dark:text-${bucket(Number(a))}`
  );

  if (after !== before) {
    const n = before.split('\n').filter((l, i) => l !== after.split('\n')[i]).length;
    edits += n;
    log.push(`  ${n.toString().padStart(3)}  ${file}`);
    if (write) fs.writeFileSync(file, after);
  }
}

console.log(`\n  ${write ? 'APPLIED' : 'DRY RUN'} . sub-${FLOOR}% text opacity -> semantic tokens\n`);
console.log(log.join('\n'));
console.log(`\n  ${log.length} files . ${edits} lines changed\n`);
if (!write) console.log('  re-run with --write to apply\n');
