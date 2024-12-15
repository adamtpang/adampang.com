'use client';

import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useTheme } from 'next-themes';

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

export function FloatingBubbles() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const controls = useAnimation();
  const { theme } = useTheme();

  useEffect(() => {
    const newBubbles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 100 + 50,
      delay: Math.random() * 2
    }));
    setBubbles(newBubbles);

    controls.start(i => ({
      y: [0, -50, 0],
      x: [0, Math.sin(i * 0.5) * 50, 0],
      transition: {
        duration: 5 + Math.random() * 2,
        repeat: Infinity,
        delay: i * 0.2
      }
    }));
  }, [controls]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          custom={bubble.id}
          animate={controls}
          style={{
            position: 'absolute',
            left: bubble.x,
            top: bubble.y,
            width: bubble.size,
            height: bubble.size,
            borderRadius: '50%',
            background: theme === 'dark'
              ? 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01))'
              : 'radial-gradient(circle at 30% 30%, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.01))',
            backdropFilter: 'blur(1px)'
          }}
        />
      ))}
    </div>
  );
}