'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;
const STORAGE_KEY = 'vibe-entered';

/**
 * cfcf-style entry splash. First visit shows a click-to-enter overlay.
 * On click:
 *   1. dismiss splash with a soft fade
 *   2. scroll to the Spotify embed
 *   3. trigger Spotify play via postMessage. Browser allows because
 *      the click is a real user gesture.
 *
 * Subsequent visits in the same session skip the splash. Cleared on
 * tab close (sessionStorage), so each new tab gets the entry vibe.
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
      // sessionStorage blocked. Show splash anyway, dismiss on click.
      setVisible(true);
    }
  }, []);

  const enter = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {}
    setVisible(false);

    // After splash fade, kick off Spotify play.
    setTimeout(() => {
      const iframe = document.getElementById('spotify-player') as HTMLIFrameElement | null;
      if (iframe?.contentWindow) {
        iframe.contentWindow.postMessage({ command: 'toggle' }, '*');
      }
    }, 600);
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{
            background:
              'radial-gradient(ellipse at center, #FF8970 0%, #FF5C39 35%, #C84520 75%, #6B1F0E 100%)',
          }}
        >
          {/* Subtle warm grain on top of the gradient */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-30 mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7, ease }}
            className="relative flex flex-col items-center gap-8 px-6 text-center"
          >
            <span className="text-[0.7rem] uppercase tracking-[0.3em] text-white/70">
              welcome.
            </span>
            <h2
              className="font-display text-5xl leading-[0.95] tracking-tightest text-white md:text-7xl"
              style={{ fontVariationSettings: '"opsz" 144' }}
            >
              press play.
              <br />
              <span className="italic">enter the vibe.</span>
            </h2>
            <p className="max-w-md text-base leading-relaxed text-white/85">
              this site sounds best with the music on. sunrise mood, one tap
              away.
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={enter}
                className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-medium tracking-tight text-ink shadow-2xl transition-all hover:-translate-y-0.5"
              >
                <span
                  aria-hidden
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-sunrise text-white"
                >
                  ▶
                </span>
                <span>enter the vibe</span>
              </button>
              <button
                onClick={() => {
                  try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch {}
                  setVisible(false);
                }}
                className="text-xs uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white"
              >
                skip music
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="absolute bottom-8 left-0 right-0 text-center text-[0.65rem] uppercase tracking-[0.3em] text-white/45 nums"
          >
            adampang.com . internet hub
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
