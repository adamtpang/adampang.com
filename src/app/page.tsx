import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import Footer from '@/components/Footer';
import Sights from '@/components/Sights';
import Sounds from '@/components/Sounds';
import Curiosities from '@/components/Curiosities';
import Building from '@/components/Building';
import Proof from '@/components/Proof';
import { listSightImages } from '@/lib/blob';
import styles from './home.module.css';

const title = 'Adam Pang';
const description = "Explore Adam Pang's public software projects, essays, music, current work, and ways to start a thoughtful collaboration.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: '/' },
  openGraph: { title, description },
  twitter: { title, description },
};

export const revalidate = 3600;

export default async function Home() {
  const sightImages = await listSightImages();

  return (
    <main className={styles.home}>
      <SiteHeader asH1 />
      <div className={styles.grid}>
        <Sights images={sightImages} />
        <Sounds />
        <Curiosities />
        <Building />
      </div>
      <details className={styles.proof}>
        <summary>Proof of work</summary>
        <Proof />
      </details>
      <Footer />
    </main>
  );
}
