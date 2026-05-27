'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './Videos.module.css';
import { ExternalLink, Music, Play } from 'lucide-react';
import discography from '@/data/discography.json';

const monthFormatter = new Intl.DateTimeFormat('fr-FR', { month: 'long' });

export default function Videos() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeAlbum, setActiveAlbum] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef(null);

  const sortedAlbums = useMemo(() => {
    return [...discography].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, []);

  const albums = showAll ? sortedAlbums : sortedAlbums.slice(0, 4);

  const albumsByYear = useMemo(() => {
    return albums.reduce((acc, album) => {
      const year = new Date(album.date).getFullYear();
      if (!acc[year]) acc[year] = [];
      acc[year].push(album);
      return acc;
    }, {});
  }, [albums]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="discographie"
      className={`${styles.section} ${isVisible ? styles.visible : ''}`}
      ref={sectionRef}
    >
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.titleGroup}>
            <span className={styles.label}>Parcours musical</span>
            <h2 className={styles.title}>Une discographie spirituelle, immersive et élégante.</h2>
            <p className={styles.description}>
              Découvrez l’évolution de Bright Music à travers des temps forts marquants, présentés comme une timeline
              sensible et raffinée.
            </p>
          </div>
          <div className={styles.note}>
            <p>De 2017 à 2026, chaque projet raconte un moment musical unique.</p>
          </div>
        </div>

        <div className={styles.timeline}>
          {Object.entries(albumsByYear)
            .sort((a, b) => Number(b[0]) - Number(a[0]))
            .map(([year, yearAlbums]) => (
              <div key={year} className={styles.yearGroup}>
                <div className={styles.yearHeader}>
                  <span className={styles.yearLabel}>{year}</span>
                </div>
                <div className={styles.yearCards}>
                  {yearAlbums.map((album) => (
                    <article key={album.id} className={styles.timelineItem}>
                      <div className={styles.metaBadge}>
                        {monthFormatter.format(new Date(album.date))}
                      </div>
                      <div className={styles.card}>
                        <div className={styles.cover}>
                          <Image
                            src={album.cover}
                            alt={album.title}
                            fill
                            sizes="240px"
                            style={{ objectFit: 'cover' }}
                          />
                          <div className={styles.playOverlay}>
                            <Play size={20} />
                          </div>
                        </div>

                        <div className={styles.cardBody}>
                          <div className={styles.cardHeader}>
                            <div>
                              <p className={styles.albumLabel}>{album.label}</p>
                              <h3 className={styles.albumTitle}>{album.title}</h3>
                            </div>
                            <button
                              type="button"
                              className={styles.moreButton}
                              onClick={() => setActiveAlbum(album)}
                            >
                              Voir plus
                            </button>
                          </div>

                          <ul className={styles.trackList}>
                            {album.tracks.slice(0, 2).map((track) => (
                              <li key={track} className={styles.trackItem}>{track}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
        </div>

        <div className={styles.footer}>
          <button
            type="button"
            className={styles.btnBottom}
            onClick={() => setShowAll((current) => !current)}
          >
            {showAll ? 'Voir moins de projets' : 'Voir toute la discographie'}
          </button>
        </div>
      </div>

      {activeAlbum && (
        <div className={styles.modalOverlay} onClick={() => setActiveAlbum(null)}>
          <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <p className={styles.modalYear}>{new Date(activeAlbum.date).toLocaleDateString('fr-FR', {
                  month: 'long',
                  year: 'numeric',
                })}</p>
                <h3 className={styles.modalTitle}>{activeAlbum.title}</h3>
              </div>
              <button className={styles.modalClose} type="button" onClick={() => setActiveAlbum(null)}>
                Fermer
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.modalCover}>
                <Image
                  src={activeAlbum.cover}
                  alt={activeAlbum.title}
                  fill
                  sizes="100vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.modalContent}>
                <p className={styles.modalDescription}>{activeAlbum.description}</p>
                <div className={styles.modalTracks}>
                  <h4>Titres clés</h4>
                  <ul>
                    {activeAlbum.tracks.map((track) => (
                      <li key={track}>{track}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.modalLinks}>
                  <a href={activeAlbum.links.spotify} target="_blank" rel="noopener noreferrer">
                    <Music size={18} /> Spotify
                  </a>
                  <a href={activeAlbum.links.youtube} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={18} /> YouTube
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
