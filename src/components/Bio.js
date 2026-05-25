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
          <div className={styles.subtitle}>Bienvenue dans mon univers musical.</div>
          
          <div className={styles.text}>
            <p>
              La musique est pour moi bien plus qu’un art : c’est un langage universel capable de toucher les cœurs, transmettre des émotions profondes et rapprocher les âmes. Depuis plusieurs années, je consacre mon énergie et ma passion à créer une musique authentique, inspirante et porteuse de valeurs positives.
            </p>
            <p>
              En tant qu’artiste musicien et chantre, mon univers musical est marqué par l’adoration, la louange et le désir de communiquer un message d’espérance, de foi et d’amour à travers chaque note et chaque parole. Mon objectif est d’utiliser la musique comme un moyen d’impact spirituel, culturel et humain.
            </p>
            <p>
             À travers ce site, je vous invite à découvrir mon parcours, mes œuvres, mes projets musicaux ainsi que les événements et prestations qui rythment mon ministère artistique. Chaque chanson raconte une histoire, chaque mélodie traduit une émotion, et chaque scène devient un moment de partage avec le public.
            </p>
            <p>
              Merci de faire partie de cette aventure musicale. Que cette plateforme soit pour vous un espace de découverte, d’inspiration et de bénédiction.
            </p>
          </div>
          
          <a href="#contact" className={styles.btnContact}>Rhany Bright LUYINDULA</a>
        </div>
      </div>
    </section>
  );
}
