import Image from 'next/image';
import styles from './Bio.module.css';

export default function Bio() {
  return (
    <section id="bio" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <Image
            src="/brightR.jpeg"
            alt="Bright Music - Artiste Gospel"
            fill
            className={styles.image}
          />
        </div>
        
        <div className={styles.content}>
          <h2 className={styles.title}>L'Artiste</h2>
          <div className={styles.subtitle}>Un message d'espoir à travers la musique</div>
          
          <div className={styles.text}>
            <p>
              Plongez dans l'univers de Bright Music. Inspiré par les sonorités gospel traditionnelles et les arrangements modernes, Bright Music crée des ponts entre les générations.
            </p>
            <p>
              Chaque note, chaque mélodie est conçue pour toucher les cœurs et élever les esprits. Avec une voix puissante et un message d'amour inconditionnel, l'artiste parcourt les scènes pour partager son don.
            </p>
            <p>
              [Ce texte est temporaire et sera remplacé par la véritable biographie issue de votre document annexe une fois fourni.]
            </p>
          </div>
          
          <a href="#contact" className={styles.btnContact}>Contacter pour Booking</a>
        </div>
      </div>
    </section>
  );
}
