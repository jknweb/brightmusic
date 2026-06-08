import Image from 'next/image';
import { Camera, Tv, Music, Mail, Phone, Eye, Users } from 'lucide-react';
import styles from './Footer.module.css';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [visits, setVisits] = useState({ totalVisits: 0, uniqueVisitors: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const trackVisit = async () => {
      try {
        // Générer ou récupérer un ID unique pour le visiteur
        let visitorId = localStorage.getItem('visitorId');
        if (!visitorId) {
          visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
          localStorage.setItem('visitorId', visitorId);
        }

        // Envoyer la visite à l'API
        const response = await fetch('/api/visits', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ visitorId }),
        });

        if (response.ok) {
          const data = await response.json();
          setVisits(data);
        }
      } catch (error) {
        console.error('Error tracking visit:', error);
        // Essayer de récupérer les données existantes
        try {
          const response = await fetch('/api/visits');
          if (response.ok) {
            const data = await response.json();
            setVisits(data);
          }
        } catch (e) {
          console.error('Error fetching visits:', e);
        }
      } finally {
        setLoading(false);
      }
    };

    trackVisit();
  }, []);

  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Image 
              src="/logoBlanc.png" 
              alt="Bright Music Logo" 
              width={150} 
              height={50} 
              className={styles.logoImg}
            />
            <p className={styles.subtitle}>Gospel Artist & Worshipper</p>
          </div>
          
          <div className={styles.contact}>
            <h3>Contact</h3>
            <div className={styles.contactDetails}>
              <a href="tel:+243810602023" className={styles.contactLink}>
                <Phone size={18} /> +243 81 060 20 23
              </a>
              <a href="https://wa.me/243898105321" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                <Phone size={18} /> +243 89 810 53 21 (WhatsApp)
              </a>
              <a href="mailto:rhanyluyindula@yahoo.fr" className={styles.contactLink}>
                <Mail size={18} /> rhanyluyindula@yahoo.fr
              </a>
              <a href="mailto:rhanyluyindula80@gmail.com" className={styles.contactLink}>
                <Mail size={18} /> rhanyluyindula80@gmail.com
              </a>
            </div>
          </div>
          
          <div className={styles.socials}>
          <h3>Suivez-nous</h3>
          <div className={styles.socialIcons}>
            <a href="#" target="_blank" rel="noopener noreferrer"><Music size={24} /></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><Tv size={24} /></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><Camera size={24} /></a>
          </div>
        </div>
        </div>
        
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Bright Music. Tous droits réservés.</p>
          <div className={styles.visits}>
            <div className={styles.visitCounter}>
              <Eye size={16} />
              <span>{!loading ? visits.totalVisits : 0}</span>
              <label>visites</label>
            </div>
            <div className={styles.visitCounter}>
              <Users size={16} />
              <span>{!loading ? visits.uniqueVisitors : 0}</span>
              <label>visiteurs uniques</label>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
