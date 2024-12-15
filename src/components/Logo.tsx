'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function Logo() {
  const { theme } = useTheme();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative w-12 h-12"
    >
      <Image
        src={theme === 'dark' ? '/images/logos/logo-dark.png' : '/images/logos/logo-light.png'}
        alt="ATP Logo"
        fill
        className="object-contain"
        priority
      />
    </motion.div>
  );
}