import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Identities from '@/components/Identities';
import Currently from '@/components/Currently';
import Sounds from '@/components/Sounds';
import Building from '@/components/Building';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <Identities />
      <Currently />
      <Sounds />
      <Building />
      {/* TODO. Writing (substack RSS + view counts), FAQ, NS pitch teaser. */}
      <Footer />
    </main>
  );
}
