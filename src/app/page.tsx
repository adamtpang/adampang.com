import Hero from '@/components/Hero';
import Sounds from '@/components/Sounds';
import Building from '@/components/Building';
import Footer from '@/components/Footer';

/**
 * Bento layout. 2x2 grid on desktop fits the entire site in one
 * viewport. No scroll. Mobile stacks naturally.
 */
export default function Home() {
  return (
    <main className="relative grid grid-cols-1 gap-2 p-2 sm:gap-3 sm:p-3 lg:h-[100vh] lg:max-h-[100vh] lg:grid-cols-2 lg:grid-rows-2 lg:overflow-hidden">
      <Hero />
      <Sounds />
      <Building />
      <Footer />
    </main>
  );
}
