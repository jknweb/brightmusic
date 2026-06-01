'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Camera, Tv, Music } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image 
            src="/logoBlanc.png" 
            alt="Bright Music Logo" 
            width={120} 
            height={40} 
            className={styles.logoImg}
          />
        </Link>
        
        <div className={styles.links}>
          <Link href="/#music">Musique</Link>
          <Link href="/#bio">Biographie</Link>
          <Link href="/mon-parcours">Mon parcours</Link>
          <Link href="/events">Événements</Link>
          <Link href="/#contact">Contact</Link>
        </div>

        <div className={styles.socials}>
          <a href="#" target="_blank" rel="noopener noreferrer"><Music size={20} /></a>
          <a href="#" target="_blank" rel="noopener noreferrer"><Tv size={20} /></a>
          <a href="#" target="_blank" rel="noopener noreferrer"><Camera size={20} /></a>
        </div>
      </div>
    </nav>
  );
}
