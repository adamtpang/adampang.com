import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Sounds from '@/components/Sounds';
import Currently from '@/components/Currently';
import Now from '@/components/Now';
import Leverage from '@/components/Leverage';
import Building from '@/components/Building';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <Sounds />
      <Currently />
      <Now />
      <Leverage />
      <Building />
      <Footer />
    </main>
  );
}
