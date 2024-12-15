'use client';

import { motion } from 'framer-motion';

export function CalButton() {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-6 py-3 bg-primary text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow"
      onClick={() => {
        window.open('https://cal.com/adampang', '_blank');
      }}
    >
      Schedule a Meeting
    </motion.button>
  );
}