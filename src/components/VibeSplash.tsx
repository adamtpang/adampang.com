'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;
const STORAGE_KEY = 'vibe-entered';

/**
 * Landing modal. Sunrise card centered on a dimmed backdrop. The
 * bento is visible (blurred) behind. Click "enter the vibe" to
 * dismiss + autoplay Spotify. Click outside or skip to close
 * silently. Skips on subsequent same-session visits.
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

  const enter = () => {
    close();
    setTimeout(() => {
      const iframe = document.getElementById('spotify-player') as HTMLIFrameElement | null;
      if (iframe?.contentWindow) {
        iframe.contentWindow.postMessage({ command: 'toggle' }, '*');
      }
    }, 500);
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
          {/* Backdrop. Dim + blur the bento behind. */}
          <div className="absolute inset-0 bg-black/35 backdrop-blur-md" />

          {/* Modal card. */}
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease, delay: 0.05 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-3xl shadow-2xl"
            style={{
              background:
                'radial-gradient(ellipse at 50% 0%, #FF8970 0%, #FF5C39 50%, #C84520 100%)',
            }}
          >
            {/* Subtle grain on top of gradient */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-25 mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              }}
            />

            <div className="relative flex flex-col items-center gap-5 p-8 text-center sm:p-10">
              <span className="text-[0.6rem] uppercase tracking-[0.32em] text-white/75">
                welcome
              </span>
              <h2
                className="font-display text-3xl leading-[0.95] tracking-tightest text-white sm:text-4xl"
                style={{ fontVariationSettings: '"opsz" 144' }}
              >
                press play.
                <br />
                <span className="italic">enter the vibe.</span>
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={enter}
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink shadow-xl transition-all hover:-translate-y-0.5"
                >
                  <span
                    aria-hidden
                    className="flex h-5 w-5 items-center justify-center rounded-full bg-sunrise text-[0.6rem] text-white"
                  >
                    ▶
                  </span>
                  <span>enter the vibe</span>
                </button>
                <button
                  onClick={close}
                  className="text-[0.65rem] uppercase tracking-[0.2em] text-white/65 transition-colors hover:text-white"
                >
                  skip
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
