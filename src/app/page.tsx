import Hero from '@/components/Hero';
import Sounds from '@/components/Sounds';
import Currently from '@/components/Currently';
import Now from '@/components/Now';
import Building from '@/components/Building';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Sounds />
      <Currently />
      <Now />
      <Building />
      <Footer />
    </main>
  );
}
