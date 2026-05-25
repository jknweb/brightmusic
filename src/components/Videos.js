'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './Videos.module.css';
import { Tv } from 'lucide-react';

export default function Videos() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const videoIds = [
    '_3cddQ3VelY',
    'srISxpuNwYY',
    'NTTDSQKp0_8',
    'BhMQNUzxFkc',
    '9g0YqbYeIA8',
    'wPcn_v4k3tE'
  ];

  const channelUrl = 'https://www.youtube.com/@RhanyLuyindula';

  // Fade-in animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="videos" 
      className={`${styles.section} ${isVisible ? styles.visible : ''}`} 
      ref={sectionRef}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <h2 className={styles.title}>Vidéos</h2>
            <div className={styles.line}></div>
          </div>
          <a href={channelUrl} target="_blank" rel="noopener noreferrer" className={styles.btnTop}>
            Voir plus de vidéos <Tv size={18} />
          </a>
        </div>
        
        <div className={styles.grid}>
          {videoIds.map((id, index) => (
            <div key={index} className={styles.videoCard}>
              <div className={styles.iframeContainer}>
                <iframe
                  src={`https://www.youtube.com/embed/${id}?rel=0`}
                  title={`YouTube video player ${index + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className={styles.iframe}
                ></iframe>
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.footer}>
          <a href={channelUrl} target="_blank" rel="noopener noreferrer" className={styles.btnBottom}>
            Voir toute la chaîne
          </a>
        </div>
      </div>
    </section>
  );
}
