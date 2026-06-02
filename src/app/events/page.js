'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import events from '@/data/events.json';
import styles from './events.module.css';

export default function EventsPage() {
  const [activeEvent, setActiveEvent] = useState(null);

  const openModal = (event) => setActiveEvent(event);
  const closeModal = () => setActiveEvent(null);

  return (
    <main className={styles.eventsPage}>
      <Navbar />
      <section className={styles.sectionInner}>
        <header className={styles.header}>
          <p className={styles.subtitle}>Événements en live</p>
          <h1 className={styles.title}>Retrouvez les prochains events</h1>
        </header>

        <div className={styles.grid}>
          {events.map((event) => (
            <button
              key={event.id}
              className={styles.card}
              type="button"
              onClick={() => openModal(event)}
            >
              <div className={styles.cardImage}>
                <Image
                  src={event.photo}
                  alt={event.title}
                  fill
                  sizes="88px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardDate}>{new Date(event.date).toLocaleDateString('fr-FR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}</span>
                <h2 className={styles.cardTitle}>{event.title}</h2>
                <p className={styles.cardText}>{event.description}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {activeEvent && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <p className={styles.modalDate}>{new Date(activeEvent.date).toLocaleDateString('fr-FR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}</p>
                <h2 className={styles.modalTitle}>{activeEvent.title}</h2>
              </div>
              <button className={styles.closeButton} type="button" onClick={closeModal}>
                Fermer
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.modalImage}>
                <Image
                  src={activeEvent.photo}
                  alt={activeEvent.title}
                  fill
                    sizes="100vw"
                    style={{ objectFit: 'contain' }}
                />
              </div>
              <div className={styles.modalInfo}>
                <p className={styles.modalDescription}>{activeEvent.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
