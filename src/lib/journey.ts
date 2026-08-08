/**
 * Camera math for the /about journey.
 *
 * Kept pure and out of the component so it can be tested without a
 * browser: the headless pane this repo is developed against does not
 * composite, so scrollTop is pinned at 0 and the real thing cannot be
 * driven. Everything here is arithmetic on numbers the component reads
 * from the DOM.
 *
 * Deliberately dependency-free. Node's ESM resolver needs explicit file
 * extensions, which the bundler-style extensionless imports used
 * everywhere else in src/ do not provide, so an import here would make
 * this untestable outside a build. Progress lives in lib/progress.ts and
 * the component composes the two.
 */

export type Point = { x: number; y: number };

/** Beat positions, in percent of the strip. A straight descending diagonal. */
export const PATH = {
  x: { from: 14, to: 76 },
  y: { from: 18, to: 74 },
};

export function beatPoints(count: number): Point[] {
  if (count <= 1) return [{ x: PATH.x.from, y: PATH.y.from }];
  return Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1);
    return {
      x: PATH.x.from + t * (PATH.x.to - PATH.x.from),
      y: PATH.y.from + t * (PATH.y.to - PATH.y.from),
    };
  });
}

/** Translation that puts the interpolated path position at screen centre. */
export function cameraOffset(
  progress: number,
  points: Point[],
  stripWidth: number,
  stripHeight: number,
  viewportWidth: number,
  viewportHeight: number
): { dx: number; dy: number; x: number; y: number } {
  const first = points[0];
  const last = points[points.length - 1];
  const x = first.x + (last.x - first.x) * progress;
  const y = first.y + (last.y - first.y) * progress;
  return {
    x,
    y,
    dx: viewportWidth / 2 - (x / 100) * stripWidth,
    dy: viewportHeight / 2 - (y / 100) * stripHeight,
  };
}

/** Index of the beat nearest the camera, for the year rail. */
export function nearestBeat(points: Point[], x: number, y: number): number {
  let best = Infinity;
  let idx = 0;
  points.forEach((p, i) => {
    const d = Math.hypot(p.x - x, p.y - y);
    if (d < best) {
      best = d;
      idx = i;
    }
  });
  return idx;
}
