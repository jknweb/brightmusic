import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import styles from './page.module.css';

export default function MonParcoursPage() {
  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <section className={`${styles.hero} glass`}> 
          <div className={styles.heading}>
            <span className={styles.subtitle}>Mon histoire</span>
            <h1>Mon parcours artistique</h1>
            <p>
              Depuis les premières notes chantées dans la petite église de mon quartier,
              j'ai toujours senti que la musique était un appel plus grand que moi.
              Ce voyage commence par des répétitions à la lueur d'une bougie, des voix
              partagées avec des amis, et une conviction profonde que chaque chanson porte
              un message d'espérance.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.column}>
            <p>
              Mon parcours s'est construit entre studio et scène, toujours guidé par la
              volonté de créer des hymnes accessibles, vrais et élégants. J'ai appris à
              fusionner le gospel de mes racines avec des arrangements contemporains,
              pour que chaque morceau résonne autant dans le cœur que dans l'âme.
            </p>
            <p>
              Aujourd'hui, je travaille avec des artistes inspirants et des mentors qui
              m'ont aidé à polir mon univers. C'est une expérience où l'<span className={styles.highlight}>exigence musicale</span>
              rencontre la simplicité d'un message authentique.
            </p>
          </div>

          <div className={styles.card}>
            <Image
              src="/brightL.jpeg"
              alt="Bright L"
              width={520}
              height={380}
              className={styles.image}
            />
            
          </div>
        </section>

        <section className={styles.sectionReverse}>
          <div className={styles.card}>
            <Image
              src="/luyindula.jpeg"
              alt="Luyindula"
              width={520}
              height={380}
              className={styles.image}
            />
            
          </div>

          <div className={styles.column}>
            <p>
              Chaque concert est une nouvelle rencontre : des visages, des attentes, des émotions.
              Mon objectif a toujours été de proposer un récit musical puissant, sans jamais perdre
              la délicatesse et le raffinement attendus d'une création professionnelle.
            </p>
            <p>
              Les images que je partage ici représentent des moments forts, des instants où
              l'engagement artistique devient une véritable source
              d'inspiration pour mes fans et pour moi-même.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.columnWide}>
            <p>
              En studio comme sur scène, je suis animé par la même passion : transmettre la lumière,
              transformer l'énergie en mélodie, et inviter chacun à se retrouver dans un chant.
              Ce parcours reste humble, mais il est déjà riche en rencontres et en projets.
            </p>
            <p>
              Je continue aujourd'hui en m'appuyant sur des collaborations fortes, des expériences
              partagées avec des artistes comme Rhany, et une ambition claire : faire vibrer
              chaque auditeur avec des paroles vraies et des productions soignées.
            </p>
          </div>

          <div className={styles.cardSmall}>
            <Image
              src="/rhany.jpeg"
              alt="Rhany"
              width={520}
              height={380}
              className={styles.image}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
