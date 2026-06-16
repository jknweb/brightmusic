import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Music from '@/components/Music';
import Videos from '@/components/Videos';
import Bio from '@/components/Bio';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Music />
      <Videos />
      <Bio />
      <Footer />
    </main>
  );
}
