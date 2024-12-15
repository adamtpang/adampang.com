'use client';

import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

export function Logo() {
  const { theme } = useTheme();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative w-12 h-12 flex items-center justify-center font-bold text-2xl"
    >
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
        AP
      </span>
    </motion.div>
  );
}