import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Identities from '@/components/Identities';

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <Identities />

      {/* Placeholder for the remaining living-dashboard sections.
          Building these in subsequent passes:
            Story (timeline), Currently (Spotify, NS counter, life bar),
            Building (apps grid), Sounds (Wrapped 2025 + vibecheck.style),
            Writing (Substack RSS + view counts), Network School pitch,
            FAQ, CTAs, outlinks, Footer */}
      <section className="mx-auto w-full max-w-3xl px-6 py-32 text-center text-ink/40 dark:text-paper/40 text-sm uppercase tracking-[0.2em]">
        <div className="hairline mb-12" />
        more sections coming · v0
      </section>
    </main>
  );
}
