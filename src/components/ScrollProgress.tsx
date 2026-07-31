'use client';

import { useEffect, useRef } from 'react';
import { readingProgress } from '@/lib/progress';

/**
 * 1px reading-progress rule pinned under the header.
 *
 * The gradient is the only place all five section hues appear together.
 * That is deliberate: the hues are decorative, so this is decoration, and
 * quarantining them here means they never have to pass a contrast check
 * the way text does.
 *
 * Width is driven straight from scroll position rather than animated, so
 * it tracks the finger exactly and has nothing to settle. rAF-throttled
 * and passive, so it never blocks scrolling.
 *
 * No prefers-reduced-motion branch: this is a position readout, not
 * motion. It moves only while the user is already moving the page.
 */
export default function ScrollProgress() {
  const fill = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let queued = false;

    const update = () => {
      queued = false;
      const el = fill.current;
      if (!el) return;
      el.style.transform = `scaleX(${readingProgress(
        window.scrollY,
        document.documentElement.scrollHeight,
        window.innerHeight
      )})`;
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
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-px bg-line"
    >
      <div
        ref={fill}
        className="h-full w-full origin-left"
        style={{
          transform: 'scaleX(0)',
          backgroundImage:
            'linear-gradient(90deg, rgb(var(--color-accent)), rgb(var(--color-sounds)), rgb(var(--color-curiosity)), rgb(var(--color-sights)), rgb(var(--color-creativity)))',
        }}
      />
    </div>
  );
}
