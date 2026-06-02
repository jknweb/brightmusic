import Image from 'next/image';
import { Camera, Tv, Music, Mail, Phone } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
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
              <a href="tel:+243898105321" className={styles.contactLink}>
                <Phone size={18} /> +243 89 810 53 21
              </a>
              <a href="https://wa.me/2438105321" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                <Phone size={18} /> +243 810 53 21 (WhatsApp)
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
        </div>
      </div>
    </footer>
  );
}
