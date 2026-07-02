import fs from 'fs';
import path from 'path';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Gallery from '../../components/Gallery';
import styles from './page.module.css';

export default function PhotothequePage() {
  const albumDir = path.join(process.cwd(), 'public', 'album');
  let images = [];
  try {
    images = fs.readdirSync(albumDir).filter((f) => /\.(jpe?g|png|webp|gif|svg)$/i.test(f)).map((f) => `/album/${f}`);
  } catch (e) {
    images = [];
  }

  return (
    <main className={styles.page}>
      <Navbar />
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Photothèque</h1>
          <p>Une sélection d'images — cliquez sur une miniature pour l'agrandir.</p>
        </header>

        <Gallery images={images} />
      </div>
      <Footer />
    </main>
  );
}
