import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: { absolute: 'Adam Pang' },
  description: 'Adam Pang. From Guam.',
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
      <p className="mt-6">from Guam.</p>

      <ul className="mt-6 space-y-2">
        <li>
          <a href="https://pangpod.com">PangPod</a>, a podcast.
        </li>
        <li>
          <a href="https://github.com/adamtpang/helium-harness">helium-harness</a>, a tool that
          lets an ai agent drive my browser.
        </li>
      </ul>

      <p className="mt-6">
        text or whatsapp <a href="sms:+15122540011">+1 (512) 254-0011</a>, or email{' '}
        <a href="mailto:adamtpang@gmail.com">adamtpang@gmail.com</a>.
      </p>

      <p className="mt-16 text-sm text-muted">
        <Link href="/privacy">privacy</Link>
      </p>
    </main>
  );
}
