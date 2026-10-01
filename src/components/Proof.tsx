import { ArrowUpRight } from 'lucide-react';
import { proofs, whatIDo } from '@/data/proof';

/**
 * Top of the homepage: one plain line saying what Adam does, then a few
 * real proofs with one honest sentence each. Sourced in src/data/proof.ts.
 */
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
        {whatIDo}
      </h2>

      <ul className="grid min-w-0 grid-cols-1 gap-6 sm:grid-cols-2">
        {proofs.map((p) => (
          <li key={p.name} className="min-w-0">
            <p className="font-display text-xl tracking-tighter text-ink dark:text-paper">
              {p.href ? (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-baseline gap-0.5 transition-colors hover:text-accent-ink dark:hover:text-accent"
                >
                  <span className="underline decoration-ink/15 decoration-1 underline-offset-4 group-hover:decoration-accent dark:decoration-paper/15">
                    {p.name}
                  </span>
                  <ArrowUpRight aria-hidden size={11} className="opacity-50 transition-opacity group-hover:opacity-100" />
                </a>
              ) : (
                p.name
              )}
            </p>
            <p className="mt-1 text-sm text-muted">{p.line}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
