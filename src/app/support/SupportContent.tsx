import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { referrals } from '@/data/referrals';

const supportLinks = [
  { title: 'Stripe', href: 'https://buy.stripe.com/bJe7sLa78cwZcMEc4NaMU08', detail: 'One-time support' },
  { title: 'Buy Me a Coffee', href: 'https://buymeacoffee.com/adamtpang', detail: 'Support my work' },
  { title: 'Zcash', href: 'https://zcash.me/adamtpang', detail: 'Open my donation page' },
];

export default function SupportContent() {
  return (
    <article className="mx-auto w-full max-w-2xl px-5 py-10 sm:px-6 sm:py-14">
      <Link href="/" className="inline-flex min-h-11 items-center gap-1.5 text-sm text-muted hover:text-accent">
        <ArrowLeft size={14} aria-hidden /> Back home
      </Link>
      <h1 className="mt-6 font-display text-3xl text-fg">Support</h1>
      <p className="mt-4 text-base leading-relaxed text-muted">
        Support my independent software, writing, and music.
      </p>
      <ul className="mt-8 divide-y divide-line">
        {supportLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href} target="_blank" rel="noreferrer noopener"
              className="group flex min-h-20 items-center justify-between gap-4 py-4 text-fg hover:text-accent-ink">
              <span>
                <span className="block font-display text-base">{link.title}</span>
                <span className="mt-1 block text-sm text-muted">{link.detail}</span>
              </span>
              <ArrowUpRight size={18} aria-hidden />
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-sm leading-relaxed text-muted">
        Support is optional. It does not purchase equity or a promised deliverable.
      </p>
      <section className="mt-10">
        <h2 className="font-display text-xl text-fg">Things I use</h2>
        <p className="mt-2 text-sm text-muted">Referral links. I may receive credit when you sign up.</p>
        <ul className="mt-4 divide-y divide-line">
          {referrals.filter((r) => r.href).map((r) => (
            <li key={r.name}>
              <a href={r.href} target="_blank" rel="noreferrer noopener"
                className="flex min-h-14 items-center justify-between gap-4 py-3 text-fg hover:text-accent-ink">
                <span>{r.name}</span>
                <ArrowUpRight size={16} aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
