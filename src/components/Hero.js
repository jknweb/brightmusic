import Image from 'next/image';
import styles from './Hero.module.css';
import { Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.background}>
        <Image
          src="/hero.jpeg"
          alt="Bright Music Live"
          fill
          priority
          className={styles.image}
        />
        <div className={styles.overlay}></div>
      </div>
      
      <div className={`${styles.content} animate-fade-in`}>
        <h1 className={styles.title}>BRIGHT MUSIC</h1>
        <p className={styles.subtitle}>La lumière par la musique.</p>
        <button className={styles.cta}>
          <Play size={18} fill="currentColor" />
          <span>Écouter le dernier album</span>
        </button>
      </div>
    </section>
  );
}
