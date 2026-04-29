'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Custom cursor. Cucinelli-grade detail.
 *
 * Two-layer system:
 *   - Inner dot: 6px sunrise, follows pointer with high spring stiffness (snappy)
 *   - Outer ring: 32px outline, follows with softer spring (lags behind, expressive)
 *
 * Hover state: ring expands to 48px and fills with sunrise at low opacity over
 * any element with [data-cursor="hover"] (or any anchor/button).
 *
 * Disabled on touch devices and respects prefers-reduced-motion.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  // Raw pointer position
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Springed positions for the two layers
  const dotX = useSpring(x, { stiffness: 800, damping: 35, mass: 0.4 });
  const dotY = useSpring(y, { stiffness: 800, damping: 35, mass: 0.4 });
  const ringX = useSpring(x, { stiffness: 220, damping: 22, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 220, damping: 22, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        'a, button, [role="button"], [data-cursor="hover"]'
      );
      setHovering(!!interactive);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full border border-sunrise"
          animate={{
            width: hovering ? 48 : 32,
            height: hovering ? 48 : 32,
            backgroundColor: hovering
              ? 'rgba(255, 92, 57, 0.10)'
              : 'rgba(255, 92, 57, 0)',
          }}
          transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full bg-sunrise"
          animate={{
            width: hovering ? 4 : 6,
            height: hovering ? 4 : 6,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      </motion.div>
    </>
  );
}
