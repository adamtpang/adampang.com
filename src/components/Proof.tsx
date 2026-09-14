import { ArrowUpRight } from 'lucide-react';
import { clientWork, songs, podcast } from '@/data/proof';
import { apps } from '@/data/apps';

/**
 * Proof of work. Full-width lead bento: the strongest real, public things
 * first, so a visitor sees what Adam has done before what he likes.
 * Every claim here is sourced in src/data/proof.ts.
 */

const liveCount = apps.filter((a) => a.status === 'live').length;

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 text-caption uppercase tracking-label text-muted">{children}</p>
  );
}

function Out({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="group inline-flex items-baseline gap-0.5 text-ink transition-colors hover:text-accent-ink dark:text-paper dark:hover:text-accent"
    >
      <span className="underline decoration-ink/15 decoration-1 underline-offset-4 group-hover:decoration-accent dark:decoration-paper/15">
        {children}
      </span>
      <ArrowUpRight aria-hidden size={11} className="opacity-50 transition-opacity group-hover:opacity-100" />
    </a>
  );
}

export default function Proof() {
  return (
    <section
      id="proof"
      aria-labelledby="proof-title"
      className="relative min-w-0 rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 md:p-7 lg:col-span-2 dark:border-paper/15 dark:bg-ink-soft"
    >
      <h2
        id="proof-title"
        className="mb-5 font-display text-2xl tracking-tighter text-ink dark:text-paper lg:text-3xl"
      >
        proof of work
      </h2>

      <div className="grid min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Client */}
        <div className="min-w-0">
          <Label>client</Label>
          {clientWork.map((c) => (
            <div key={c.client}>
              <p className="font-display text-xl tracking-tighter text-ink dark:text-paper">
                <Out href={c.href}>{c.client}</Out>
              </p>
              <p className="mt-1 text-sm text-muted">{c.work}</p>
            </div>
          ))}
        </div>

        {/* Products */}
        <div className="min-w-0">
          <Label>products</Label>
          <p className="font-display text-xl tracking-tighter text-ink dark:text-paper">
            <a
              href="#building"
              className="underline decoration-ink/15 decoration-1 underline-offset-4 transition-colors hover:text-accent-ink hover:decoration-accent dark:decoration-paper/15 dark:hover:text-accent"
            >
              <span className="nums">{liveCount}</span> live
            </a>
          </p>
          <p className="mt-1 text-sm text-muted">shipped solo, all public and usable</p>
        </div>

        {/* Songs */}
        <div className="min-w-0">
          <Label>songs</Label>
          <ul className="space-y-1 text-sm">
            {songs.map((s) => (
              <li key={s.href} className="flex items-baseline justify-between gap-3">
                <Out href={s.href}>{s.title}</Out>
                <span className="nums shrink-0 text-caption text-faint">{s.year}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Podcast */}
        <div className="min-w-0">
          <Label>podcast</Label>
          <p className="font-display text-xl tracking-tighter text-ink dark:text-paper">
            <Out href={podcast.href}>{podcast.name}</Out>
          </p>
          <p className="mt-1 text-sm text-muted">{podcast.line}</p>
        </div>
      </div>
    </section>
  );
}
