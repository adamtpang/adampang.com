'use client';

import Image from 'next/image';
import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion';
import styles from './home.module.css';

export default function Portrait() {
  const reducedMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation} strict>
      <m.figure
        className={styles.portrait}
        initial={false}
        whileHover={reducedMotion ? undefined : { y: -2 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.frame}>
          <div className={styles.mat}>
            <div className={styles.photo}>
              <Image
                src="/profile.png"
                alt="Adam Pang smiling on a flight of outdoor steps"
                fill
                priority
                sizes="(max-width: 600px) 250px, (max-width: 800px) 290px, 260px"
              />
            </div>
          </div>
        </div>
      </m.figure>
    </LazyMotion>
  );
}
