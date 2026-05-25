import Image from 'next/image';
import styles from './Music.module.css';

export default function Music() {
  return (
    <section id="music" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Dernière Sortie</h2>
          <div className={styles.line}></div>
        </div>
        
        <div className={`${styles.content} glass`}>
          <div className={styles.coverWrapper}>
            <Image 
              src="/zoe.jpeg" 
              alt="ZOE - Album Cover" 
              width={400} 
              height={400} 
              className={styles.cover}
            />
          </div>
          <div className={styles.info}>
            <h3 className={styles.albumTitle}>Zoé</h3>
            <p className={styles.albumDesc}>Découvrez le nouvel hymne de louange, un mélange parfait entre gospel traditionnel et sonorités modernes.</p>
            
            <div className={styles.platforms}>
              <a href="#" className={styles.btnSpotify}>Écouter sur Spotify</a>
              <a href="#" className={styles.btnApple}>Écouter sur Apple Music</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
