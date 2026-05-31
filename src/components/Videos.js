'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './Videos.module.css';
import { ExternalLink, Music } from 'lucide-react';
import discography from '@/data/discography.json';

export default function Videos() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeYear, setActiveYear] = useState('');
  const sectionRef = useRef(null);

  const sortedAlbums = useMemo(
    () => [...discography].sort((a, b) => new Date(b.date) - new Date(a.date)),
    []
  );

  const years = useMemo(
    () => [...new Set(sortedAlbums.map((album) => album.year))].sort((a, b) => Number(b) - Number(a)),
    [sortedAlbums]
  );

  const albumsByYear = useMemo(
    () =>
      sortedAlbums.reduce((acc, album) => {
        const year = album.year;
        if (!acc[year]) acc[year] = [];
        acc[year].push(album);
        return acc;
      }, {}),
    [sortedAlbums]
  );

  useEffect(() => {
    if (!activeYear && years.length) {
      setActiveYear(years[0]);
    }
  }, [years, activeYear]);

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

  const selectedAlbums = activeYear ? albumsByYear[activeYear] || [] : [];

  return (
    <section
      id="discographie"
      className={`${styles.section} ${isVisible ? styles.visible : ''}`}
      ref={sectionRef}
    >
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.titleGroup}>
            <span className={styles.label}>Discographie</span>
            <h2 className={styles.title}>Discographie</h2>
            <p className={styles.description}>
              Parcourez chaque année d’activité musicale et découvrez les albums, chants et liens YouTube associés.
            </p>
          </div>
        </div>

        <div className={styles.tabs}>
          {years.map((year) => (
            <button
              key={year}
              type="button"
              className={`${styles.tabButton} ${activeYear === year ? styles.tabActive : ''}`}
              onClick={() => setActiveYear(year)}
            >
              {year}
            </button>
          ))}
        </div>

        <div className={styles.albumsGrid}>
          {selectedAlbums.length > 0 ? (
            selectedAlbums.map((album) => (
              <article key={album.id} className={styles.albumCard}>
                <div className={styles.albumCover}>
                  <Image
                    src={album.cover}
                    alt={album.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className={styles.albumBody}>
                  <div className={styles.albumHeader}>
                    <div>
                      <p className={styles.albumLabel}>{album.label}</p>
                      <h3 className={styles.albumTitle}>{album.title}</h3>
                    </div>
                    <span className={styles.albumDate}>
                      {new Date(album.date).toLocaleDateString('fr-FR', {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <p className={styles.albumDescription}>{album.description}</p>

                  <div className={styles.albumTracks}>
                    <h4>Chants</h4>
                    <ul>
                      {album.tracks.map((track) => (
                        <li key={track}>{track}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.albumLinks}>
                    {album.links.youtube && (
                      <a href={album.links.youtube} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={18} /> YouTube
                      </a>
                    )}
                    {album.links.spotify && (
                      <a href={album.links.spotify} target="_blank" rel="noopener noreferrer">
                        <Music size={18} /> Spotify
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p className={styles.emptyMessage}>Aucun album disponible pour cette année.</p>
          )}
        </div>
      </div>
    </section>
  );
}
