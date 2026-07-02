'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './Gallery.module.css';

export default function Gallery({ images = [] }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const open = (i) => setSelectedIndex(i);
  const close = () => setSelectedIndex(null);

  const prev = useCallback(() => {
    setSelectedIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }, [images.length]);

  const next = useCallback(() => {
    setSelectedIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedIndex, prev, next]);

  if (!images || images.length === 0) {
    return <div className={styles.empty}>Aucune image disponible.</div>;
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.grid}>
        {images.map((src, i) => (
          <button key={i} className={styles.thumbBtn} onClick={() => open(i)}>
            <div className={styles.thumbWrap}>
              <img src={src} alt={`Photo ${i + 1}`} className={styles.thumb} />
              <span className={styles.overlay} />
            </div>
          </button>
        ))}
      </div>

      {selectedIndex !== null && (
        <div className={styles.lightbox} onClick={close} role="dialog" aria-modal="true">
          <div className={`${styles.lightboxContent} ${styles.animateIn}`} onClick={(e) => e.stopPropagation()}>
            <button className={styles.close} onClick={close} aria-label="Fermer">×</button>

            <button className={`${styles.nav} ${styles.prev}`} onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Image précédente">‹</button>
            <button className={`${styles.nav} ${styles.next}`} onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Image suivante">›</button>

            <img src={images[selectedIndex]} alt={`Photo ${selectedIndex + 1}`} className={styles.full} />
          </div>
        </div>
      )}
    </div>
  );
}
