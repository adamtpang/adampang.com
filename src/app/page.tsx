import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: { absolute: 'Adam Pang' },
  description: 'Adam Pang.',
  alternates: { canonical: '/' },
};

/**
 * The whole site. Rules (Adam, 2026-10-01): no identity lines, no work or
 * client material, no unfinished projects, least possible. Add a line only
 * for something real and finished.
 */
export default function Home() {
  return (
    <main className="mx-auto max-w-xl px-6 py-16 sm:py-24">
      <h1 className="font-display text-2xl font-bold">Adam Pang</h1>

      <p className="mt-6">
        text or whatsapp <a href="sms:+15122540011">+1 (512) 254-0011</a>, or email{' '}
        <a href="mailto:adamtpang@gmail.com">adamtpang@gmail.com</a>.
      </p>

      <iframe
        src="https://strummer.fun/vibe/card/adam?embed=1"
        title="ult, a playlist"
        height={200}
        loading="lazy"
        allow="autoplay; encrypted-media"
        className="mt-10 block w-full max-w-[420px] border-0"
      />

      <p className="mt-16 text-sm text-muted">
        <Link href="/privacy">privacy</Link>
      </p>
    </main>
  );
}
