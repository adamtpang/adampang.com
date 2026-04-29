import Header from '@/components/Header';
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />

      {/* Placeholder for the rest of the living-dashboard sections.
          Building these in subsequent passes:
            - Story (timeline)
            - Currently (Spotify now-playing, NS counter, life bar, location)
            - Building (apps grid)
            - Sounds (Wrapped 2025 + vibecheck.style link)
            - Heroes (preview → thedojo.fun)
            - Bookshelf (preview → book.movie)
            - Writing (Substack RSS + view counts)
            - Network School pitch
            - FAQ
            - CTAs
            - Outlinks
            - Footer */}
      <section className="mx-auto w-full max-w-3xl px-6 py-32 text-center text-ink/40 dark:text-paper/40 text-sm uppercase tracking-[0.2em]">
        <div className="hairline mb-12" />
        more sections coming · v0
      </section>
    </main>
  );
}
