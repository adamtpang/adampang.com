'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, LoaderCircle, Play } from 'lucide-react';
import styles from './home.module.css';

const PLAYLIST = '35KMxrfO2OqwaJ1PIoYiCa';
const SPOTIFY_URL = `https://open.spotify.com/playlist/${PLAYLIST}`;

export default function MusicPlayer() {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const frame = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (state !== 'loading') return;
    const timeout = setTimeout(() => setState('error'), 12_000);
    return () => clearTimeout(timeout);
  }, [state]);

  return (
    <section className={styles.music} aria-label="Music">
      <div className={styles.musicHeading}>
        <span>On repeat</span>
        <a href={SPOTIFY_URL} target="_blank" rel="noopener noreferrer">
          Spotify <ArrowUpRight size={12} aria-hidden />
        </a>
      </div>
      <div className={styles.musicStage} data-music-stage aria-busy={state === 'loading'}>
        {enabled ? (
          <iframe
            ref={frame}
            className={styles.nativePlayer}
            src={`https://open.spotify.com/embed/playlist/${PLAYLIST}?theme=0`}
            title="ult, Adam Pang's Spotify playlist"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            onLoad={() => {
              setState('ready');
              frame.current?.focus();
            }}
            onError={() => setState('error')}
          />
        ) : (
          <button type="button" className={styles.musicButton} onClick={() => {
            setState('loading');
            setEnabled(true);
          }}>
            <span className={styles.playCircle} aria-hidden><Play size={17} fill="currentColor" /></span>
            <span>
              <span className={styles.musicTitle}>Play music</span>
              <span className={styles.musicSubtitle}>ult · my playlist</span>
            </span>
          </button>
        )}
        {state === 'loading' && (
          <div className={styles.musicLoading} role="status">
            <LoaderCircle size={17} className={styles.spinner} aria-hidden /> Loading music
          </div>
        )}
      </div>
      {state === 'error' && <p className={styles.musicStatus} role="status">Music unavailable? Open the playlist on Spotify above.</p>}
      <noscript><style>{'[data-music-stage]{display:none}'}</style></noscript>
    </section>
  );
}
