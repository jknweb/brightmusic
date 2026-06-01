import Image from 'next/image';
import { Music2 } from 'lucide-react';
import styles from './Music.module.css';

const tracks = [
  'Jésus le vrai Roi de mon coeur',
  'Tu es merveilleux',
  'Kati na makila na yo',
  'Ceci est comme le ciel pour moi',
  'Tout est possible à celui qui croit',
  'Je l\'ai trouvé',
];

export default function Music() {
  const leftTracks = tracks.slice(0, 5);
  const rightTracks = tracks.slice(5);

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
              src="/redemption.jpeg" 
              alt="Parle moi de la rédemption" 
              width={400} 
              height={400} 
              className={styles.cover}
            />
          </div>
          <div className={styles.info}>
            <h3 className={styles.albumTitle}>Parle moi de la rédemption</h3>
            <p className={styles.albumDesc}>Découvrez le nouvel album</p>

            <div className={styles.trackTableWrapper}>
              <table className={styles.trackTable}>
                <tbody>
                  {leftTracks.map((track, index) => (
                    <tr key={track}>
                      <td>
                        <Music2 size={16} className={styles.trackIcon} />
                        {track}
                      </td>
          
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className={styles.platforms}>
              <a href="https://www.youtube.com/watch?v=_3cddQ3VelY" target="_blank" rel="noopener noreferrer" className={styles.btnApple}>Écouter sur Youtube</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
