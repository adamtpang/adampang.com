'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;
const STORAGE_KEY = 'vibe-entered';

/**
 * Simple landing prompt. Single play button. Click to play music.
 */
export default function VibeSplash() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const seen = sessionStorage.getItem(STORAGE_KEY);
      if (!seen) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const close = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {}
    setVisible(false);
  };

  const play = () => {
    close();
    setTimeout(() => {
      const iframe = document.getElementById('spotify-player') as HTMLIFrameElement | null;
      if (iframe?.contentWindow) {
        iframe.contentWindow.postMessage({ command: 'toggle' }, '*');
      }
    }, 400);
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={close}
        >
          <div className="absolute inset-0 bg-black/35 backdrop-blur-md" />

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease, delay: 0.05 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col items-center gap-3 rounded-2xl bg-white p-6 shadow-2xl"
          >
            <button
              onClick={play}
              className="group inline-flex items-center gap-2.5 rounded-full bg-sunrise px-6 py-3 text-base font-medium text-white shadow-md shadow-sunrise/30 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sunrise/40"
            >
              <span aria-hidden className="text-sm leading-none">▶</span>
              <span>play music</span>
            </button>
            <button
              onClick={close}
              className="text-[0.65rem] uppercase tracking-[0.2em] text-ink/45 transition-colors hover:text-ink"
            >
              skip
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
