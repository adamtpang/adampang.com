'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

export function Background() {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        {/* Gradient Orbs */}
        <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] rotate-[12deg]">
          <motion.div
            animate={{
              x: [0, 10, 0],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-[40%] left-[20%] w-[30rem] h-[30rem] rounded-full"
            style={{
              background: theme === 'dark'
                ? 'radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 70%)'
                : 'radial-gradient(circle at center, rgba(0,0,0,0.03) 0%, transparent 70%)',
              filter: 'blur(40px)'
            }}
          />
          <motion.div
            animate={{
              x: [0, -15, 0],
              y: [0, 10, 0],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-[60%] right-[20%] w-[35rem] h-[35rem] rounded-full"
            style={{
              background: theme === 'dark'
                ? 'radial-gradient(circle at center, rgba(255,255,255,0.02) 0%, transparent 70%)'
                : 'radial-gradient(circle at center, rgba(0,0,0,0.02) 0%, transparent 70%)',
              filter: 'blur(40px)'
            }}
          />
          <motion.div
            animate={{
              x: [0, 15, 0],
              y: [0, 15, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-[20%] right-[30%] w-[25rem] h-[25rem] rounded-full"
            style={{
              background: theme === 'dark'
                ? 'radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 70%)'
                : 'radial-gradient(circle at center, rgba(0,0,0,0.03) 0%, transparent 70%)',
              filter: 'blur(40px)'
            }}
          />
        </div>

        {/* Noise Texture */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            transform: 'translate3d(0, 0, 0)'
          }}
        />
      </motion.div>
    </div>
  );
}