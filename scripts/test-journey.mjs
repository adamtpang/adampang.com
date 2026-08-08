/**
 * Unit tests for the /about journey camera.
 *
 * The strip is driven by scroll position, and the headless browser pane
 * used to develop this repo does not composite, so scrollTop is pinned at
 * 0 and the real interaction cannot be exercised. The geometry therefore
 * lives in lib/journey.ts as pure functions and is checked here.
 *
 *   node scripts/test-journey.mjs
 */

import { beatPoints, cameraOffset, nearestBeat, PATH } from '../src/lib/journey.ts';
import { readingProgress } from '../src/lib/progress.ts';

let failures = 0;
const t = (label, got, want, eps = 0.01) => {
  const ok = Math.abs(got - want) < eps;
  if (!ok) failures++;
  console.log(
    `  ${ok ? 'ok  ' : 'FAIL'}  ${label.padEnd(40)} ${Number(got).toFixed(3)}  (want ${want})`
  );
};

const P = beatPoints(6);

console.log('\n  beat positions');
t('six beats generated', P.length, 6);
t('first sits at PATH start', P[0].x, PATH.x.from);
t('last sits at PATH end', P[5].x, PATH.x.to);
t('spacing is even', P[1].x - P[0].x, P[3].x - P[2].x);
t('path descends', P[5].y > P[0].y ? 1 : 0, 1);

// Stage is 6 x 100vh; at a 720px viewport that is 4320px, sticky is 720px,
// so the usable travel is 3600px.
console.log('\n  progress through the stage');
t('above the section', readingProgress(-800, 4320, 720), 0);
t('section reaches top', readingProgress(0, 4320, 720), 0);
t('halfway', readingProgress(1800, 4320, 720), 0.5);
t('final beat', readingProgress(3600, 4320, 720), 1);
t('scrolled well past', readingProgress(9999, 4320, 720), 1);

console.log('\n  camera');
const strip = { w: 5320, h: 1800 };
const vp = { w: 1280, h: 720 };
const c0 = cameraOffset(0, P, strip.w, strip.h, vp.w, vp.h);
const cMid = cameraOffset(0.5, P, strip.w, strip.h, vp.w, vp.h);
const c1 = cameraOffset(1, P, strip.w, strip.h, vp.w, vp.h);

t('start centres first beat, x', c0.dx + (P[0].x / 100) * strip.w, vp.w / 2);
t('start centres first beat, y', c0.dy + (P[0].y / 100) * strip.h, vp.h / 2);
t('end centres last beat, x', c1.dx + (P[5].x / 100) * strip.w, vp.w / 2);
t('end centres last beat, y', c1.dy + (P[5].y / 100) * strip.h, vp.h / 2);
t('camera pans left over time', c1.dx < c0.dx ? 1 : 0, 1);
t('camera pans up over time', c1.dy < c0.dy ? 1 : 0, 1);
t('midpoint is between the ends', cMid.dx < c0.dx && cMid.dx > c1.dx ? 1 : 0, 1);

console.log('\n  year rail');
t('at start, first year is active', nearestBeat(P, c0.x, c0.y), 0);
t('at end, last year is active', nearestBeat(P, c1.x, c1.y), 5);
const mid = nearestBeat(P, cMid.x, cMid.y);
t('at halfway, a middle year is active', mid === 2 || mid === 3 ? 1 : 0, 1);

console.log('\n  degenerate input');
t('single beat does not divide by zero', beatPoints(1).length, 1);
t('single beat is finite', Number.isFinite(beatPoints(1)[0].x) ? 1 : 0, 1);

console.log(`\n  ${failures} failure${failures === 1 ? '' : 's'}\n`);
process.exit(failures ? 1 : 0);
