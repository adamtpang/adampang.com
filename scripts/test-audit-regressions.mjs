import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { mergeSightImages, listSightImages } from '../src/lib/blob.ts';

const photo = (pathname, uploadedAt, url = pathname) => ({ pathname, uploadedAt, url, caption: pathname });
const local = [photo('sights/local.png', 0), photo('sights/shared.png', 1)];
const remote = [photo('sights/shared.png', 10, 'https://example.com/shared.png'), photo('sights/new.png', 20)];
assert.deepEqual(mergeSightImages(local, remote).map(p => p.pathname), ['sights/new.png', 'sights/shared.png', 'sights/local.png']);
assert.equal(mergeSightImages(local, remote)[1].url, 'https://example.com/shared.png');
assert.deepEqual(mergeSightImages(local, []), local);
assert.deepEqual(mergeSightImages([], []), []);
assert.equal(remote[0].uploadedAt, 10, 'merge must not mutate source ordering');

// Force the real local-only path without reading a cloud store in tests.
const token = process.env.BLOB_READ_WRITE_TOKEN;
delete process.env.BLOB_READ_WRITE_TOKEN;
try {
  assert.ok((await listSightImages()).some(p => p.url.startsWith('/sights/')));
} finally {
  if (token !== undefined) process.env.BLOB_READ_WRITE_TOKEN = token;
}

const read = p => readFile(new URL('../' + p, import.meta.url), 'utf8');
const support = await read('src/app/support/SupportContent.tsx');
assert.match(support, /https:\/\/zcash\.me\/adamtpang/);
assert.doesNotMatch(support, /navigator\.clipboard|forever|patrons wall|every dollar buys an hour/);
assert.doesNotMatch(await read('src/app/support/page.tsx'), /paid subscriber/);
const sounds = await read('src/components/Sounds.tsx');
assert.doesNotMatch(sounds, /setInterval|ROTATE_MS/);
assert.match(sounds, /useReducedMotion/);
assert.doesNotMatch(await read('src/components/Building.tsx'), /className="truncate/);
assert.doesNotMatch(await read('src/app/about/page.tsx'), /500\+/);

// ink is a fixed light-mode token: validate its actual use against both fills.
const tokens = JSON.parse(await read('src/design/tokens.json'));
const luminance = hex => {
  const c = hex.match(/[a-f\d]{2}/gi).map(h => parseInt(h, 16) / 255)
    .map(v => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return c.reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i], 0);
};
const ink = luminance(tokens.color.content.fg.light);
for (const mode of ['light', 'dark']) {
  for (const name of ['sights', 'spirit', 'curiosity']) {
    const fill = luminance(tokens.color.section[name][mode]);
    assert.ok((fill + 0.05) / (ink + 0.05) >= 4.5, `${name} label contrast in ${mode}`);
  }
}
const sights = await read('src/components/Sights.tsx');
assert.match(sights, /bg-sights text-ink/);
assert.match(sights, /aria-label="Next photos"/);
console.log('Audit regressions: gallery merge/fallback, support links/copy, motion, readable projects and social-label contrast pass.');
