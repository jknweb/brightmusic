import Image from 'next/image';
import styles from './Hero.module.css';
import { Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.background}>
        <Image
          src="/rhanybg.jpeg"
          alt="Bright Music Live"
          fill
          priority
          className={styles.image}
        />
        <div className={styles.overlay}></div>
      </div>
      
      <div className={`${styles.content} animate-fade-in`}>
        <h1 className={styles.title}>BRIGHT MUSIC</h1>
        <p className={styles.subtitle}>La lumière de Christ par la musique.</p>
        <p className={styles.signature}>Rhany Bright Luyindula</p>
        <a
          href="https://www.youtube.com/watch?v=_3cddQ3VelY"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
        >
          <Play size={18} fill="currentColor" />
          <span>Écouter le dernier album</span>
        </a>
      </div>
    </section>
  );
}
