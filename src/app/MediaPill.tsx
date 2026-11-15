'use client';

import { useState } from 'react';
import styles from './home.module.css';

type Props = {
  /** Short action label, e.g. "On repeat". */
  label: string;
  /** Muted text after the label, e.g. the playlist or show name. */
  detail: string;
  /** Embed URL. Nothing is requested from the provider until the pill is pressed. */
  src: string;
  /** The same thing on the provider's own site. Used when JavaScript is off. */
  href: string;
  title: string;
  kind: 'audio' | 'video';
};

/**
 * A small pill that reveals a media player in place when pressed.
 * It is a real link, so without JavaScript it opens the provider's page instead.
 */
export default function MediaPill({ label, detail, src, href, title, kind }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.media}>
      <a
        className={styles.pill}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        role="button"
        aria-expanded={open}
        onClick={(e) => {
          e.preventDefault();
          setOpen((v) => !v);
        }}
        onKeyDown={(e) => {
          if (e.key === ' ') {
            e.preventDefault();
            setOpen((v) => !v);
          }
        }}
      >
        <span className={styles.disc} aria-hidden>▶</span> {label} <span className={styles.muted}>{detail}</span>
      </a>
      {open && (
        <iframe
          className={kind === 'audio' ? styles.audioPlayer : styles.videoPlayer}
          src={src}
          title={title}
          referrerPolicy="strict-origin-when-cross-origin"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen={kind === 'video'}
        />
      )}
    </div>
  );
}
