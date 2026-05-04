'use client';

import { useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';

/**
 * Magnetic button. Paco-style. Cursor pulls the button toward it within
 * a small radius, releasing on leave. Subtle, never gimmicky.
 */
export default function MagneticButton({
  children,
  href,
  external,
  variant = 'primary',
  className = '',
}: {
  children: ReactNode;
  href: string;
  external?: boolean;
  variant?: 'primary' | 'ghost';
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({ x: (e.clientX - cx) * 0.25, y: (e.clientY - cy) * 0.25 });
  };

  const onLeave = () => setPos({ x: 0, y: 0 });

  const base =
    'group relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-tight transition-all';
  const styles =
    variant === 'primary'
      ? 'bg-white text-ink shadow-2xl shadow-black/15 hover:shadow-2xl hover:shadow-black/25 hover:-translate-y-0.5'
      : 'border border-white/40 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 hover:border-white/70 hover:-translate-y-0.5';
  const primaryStyle = undefined;

  return (
    <motion.a
      ref={ref}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer noopener' : undefined}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 220, damping: 18, mass: 0.4 }}
      className={`${base} ${styles} ${className}`}
      style={primaryStyle}
    >
      <span className="relative z-10">{children}</span>
      <motion.span
        aria-hidden
        className="relative z-10"
        animate={{ x: pos.x * 0.4, y: pos.y * 0.4 }}
        transition={{ type: 'spring', stiffness: 220, damping: 18 }}
      >
        →
      </motion.span>
    </motion.a>
  );
}
