import type { Metadata } from 'next';
import Phone from './Phone';

export const metadata: Metadata = {
  title: { absolute: 'Adam Pang' },
  description: 'Adam Pang.',
  alternates: { canonical: '/' },
};

/**
 * The whole site: a phone. Rules (Adam, 2026-10-01): no identity lines, no
 * work or client material, no unfinished projects, least possible.
 */
export default function Home() {
  return (
    <main>
      {/* Without JavaScript nothing could open the lock, so hide it. */}
      <noscript>
        <style>{'[data-lock]{display:none}'}</style>
      </noscript>
      <Phone />
    </main>
  );
}
