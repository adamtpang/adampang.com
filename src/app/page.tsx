import SiteHeader from '@/components/SiteHeader';
import Sights from '@/components/Sights';
import Sounds from '@/components/Sounds';
import Curiosities from '@/components/Curiosities';
import Building from '@/components/Building';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative">
      <SiteHeader />
      <div className="grid grid-cols-1 gap-2 p-2 sm:gap-3 sm:p-3 lg:grid-cols-2">
        <Sights />
        <Sounds />
        <Curiosities />
        <Building />
      </div>
      <Footer />
    </main>
  );
}
