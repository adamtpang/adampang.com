'use client';

import { useEffect, useMemo, useRef } from 'react';
import { milestones } from '@/data/milestones';
import { beatPoints, cameraOffset, nearestBeat } from '@/lib/journey';
import { readingProgress } from '@/lib/progress';
import Milestone from './Milestone';

/**
 * The timeline as a journey you travel rather than a list you skim.
 *
 * A tall outer section holds a sticky viewport. Scroll position drives a
 * camera that pans a wide strip, so the beats arrive one at a time along a
 * path, drawn as an actual route.
 *
 * This is scroll-LINKED, not scroll-JACKED, and the difference is the
 * whole reason it is acceptable: no wheel handler, no preventDefault, no
 * snapping. The scrollbar, keyboard paging, and find-in-page all behave
 * exactly as they would on a normal document. Scroll position is simply
 * read and mapped to a transform.
 *
 * Accessibility, in three layers:
 *   - the visual strip is aria-hidden, because scattered absolute
 *     positions are meaningless to a screen reader
 *   - the same beats are always in the DOM as an ordered list, sr-only by
 *     default, so assistive tech gets a clean linear timeline
 *   - under prefers-reduced-motion the CSS swaps them: the strip is
 *     removed and the list becomes the visible page. No JS branch, so no
 *     hydration mismatch and no flash of the wrong one.
 */

export default function JourneyTimeline() {
  const stage = useRef<HTMLDivElement>(null);
  const sticky = useRef<HTMLDivElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const route = useRef<SVGPolylineElement>(null);
  const marks = useRef<HTMLDivElement>(null);

  const n = milestones.length;
  // Memoised: an array literal here would be a new reference every render,
  // which would tear down and re-attach the scroll listener each time.
  const points = useMemo(() => beatPoints(n), [n]);

  useEffect(() => {
    // Respect the setting in JS too, so the listener never even attaches.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches) return;

    let queued = false;

    const update = () => {
      queued = false;
      const stageEl = stage.current;
      const stickyEl = sticky.current;
      const stripEl = strip.current;
      if (!stageEl || !stickyEl || !stripEl) return;

      // Progress through this section specifically, not the whole page.
      // -top is how far the stage has travelled past the top of the
      // viewport; the usable range is the stage minus one sticky screen.
      const p = readingProgress(
        -stageEl.getBoundingClientRect().top,
        stageEl.offsetHeight,
        stickyEl.clientHeight
      );

      // Camera: interpolate along the path, then translate the strip so
      // that point lands in the middle of the sticky viewport.
      const { dx, dy, x, y } = cameraOffset(
        p,
        points,
        stripEl.offsetWidth,
        stripEl.offsetHeight,
        stickyEl.clientWidth,
        stickyEl.clientHeight
      );
      stripEl.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;

      // Draw the route in behind the camera as it advances.
      const line = route.current;
      if (line) {
        const len = line.getTotalLength?.() ?? 0;
        if (len) {
          line.style.strokeDasharray = `${len}`;
          line.style.strokeDashoffset = `${len * (1 - p)}`;
        }
      }

      // Nearest beat lights up in the year rail.
      if (marks.current) {
        const nearest = nearestBeat(points, x, y);
        [...marks.current.children].forEach((el, i) => {
          el.classList.toggle('text-fg', i === nearest);
          el.classList.toggle('text-faint', i !== nearest);
        });
      }
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [n, points]);

  return (
    <>
      {/* ---------- the journey (visual only) ---------- */}
      <div className="journey" aria-hidden>
        <div
          ref={stage}
          className="relative"
          style={{ height: `${n * 100}vh` }}
        >
          <div
            ref={sticky}
            className="sticky top-0 h-screen w-full overflow-hidden"
          >
            <div
              ref={strip}
              className="absolute left-0 top-0"
              style={{ width: '380vw', height: '250vh', willChange: 'transform' }}
            >
              {/* The route. Stroke is the one place the section hues meet. */}
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="journey-route" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="rgb(var(--color-accent))" />
                    <stop offset="30%" stopColor="rgb(var(--color-sounds))" />
                    <stop offset="55%" stopColor="rgb(var(--color-curiosity))" />
                    <stop offset="78%" stopColor="rgb(var(--color-sights))" />
                    <stop offset="100%" stopColor="rgb(var(--color-creativity))" />
                  </linearGradient>
                </defs>
                {/* Faint full route, so the path ahead is implied. */}
                <polyline
                  points={points.map((p) => `${p.x},${p.y}`).join(' ')}
                  fill="none"
                  stroke="rgb(var(--color-line))"
                  strokeWidth="0.18"
                  vectorEffect="non-scaling-stroke"
                />
                {/* Travelled route, drawn in as the camera advances. */}
                <polyline
                  ref={route}
                  points={points.map((p) => `${p.x},${p.y}`).join(' ')}
                  fill="none"
                  stroke="url(#journey-route)"
                  strokeWidth="0.5"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              {milestones.map((m, i) => {
                const p = points[i];
                return (
                  <article
                    key={`${m.year}-${m.title}`}
                    className="absolute w-[min(30rem,78vw)] -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  >
                    <div
                      className="flex items-center gap-2.5 text-caption uppercase text-muted"
                      style={{ letterSpacing: '0.4em' }}
                    >
                      <span className="h-px w-[18px] shrink-0 bg-muted" />
                      <span className="nums">{m.year}</span>
                    </div>
                    <h3 className="mt-3 font-display text-display leading-[0.92] tracking-tightest text-fg">
                      {m.title}
                    </h3>
                    <p className="mt-2 text-lead italic text-fg/70">{m.role}</p>
                    {m.note && (
                      <p className="mt-3 max-w-[46ch] text-body text-muted">{m.note}</p>
                    )}
                  </article>
                );
              })}
            </div>

            {/* Year rail. Wayfinding, so the journey has a known length. */}
            <div
              ref={marks}
              className="absolute inset-x-0 bottom-6 mx-auto flex w-fit max-w-[calc(100%-2rem)] gap-4 overflow-x-auto border border-line bg-card/80 px-4 py-2 text-caption uppercase text-faint backdrop-blur"
              style={{ letterSpacing: '0.2em' }}
            >
              {milestones.map((m) => (
                <span key={m.year} className="nums shrink-0 transition-colors">
                  {m.year}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---------- the same beats, linear ----------
          sr-only normally; becomes the visible page under reduced motion.
          Same Milestone component the page used before the journey existed,
          so the two representations cannot drift apart. */}
      <ol className="journey-fallback mx-auto max-w-[62ch] px-5">
        {milestones.map((m) => (
          <Milestone key={`${m.year}-${m.title}`} {...m} />
        ))}
      </ol>
    </>
  );
}
