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
              Je suis Rhany Bright LUYINDULA, artiste musicien et chantre du Gospel. La musique occupe une place essentielle dans ma vie depuis mon enfance. Mon histoire musicale commence véritablement en juillet 1989, lorsque mes parents m’ont conduit à l’église Logos Tabernacle Ministries. Dès cette période, j’ai grandi dans un environnement profondément marqué par la louange et l’adoration.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.column}>
            <p>
            À la maison de mon grand-père, nous passions beaucoup de temps à chanter en famille avec mes oncles et ma tante — Roger, Franck et Gertrude LUYINDULA. Ces moments de communion musicale ont nourri en moi l’amour du chant et ont façonné ma sensibilité artistique dès mon plus jeune âge.</p>
            <p>
            Pendant mes années à l’école du dimanche, ma passion pour la musique gospel ne cessait de grandir. Je faisais toujours l’effort de rentrer rapidement à la maison afin de suivre les programmes musicaux du célèbre groupe Hosanna Music, notamment les chants de Ron Kenoly et Don Moen. Ces moments me permettaient de demeurer dans une atmosphère de louange qui a profondément influencé mon parcours spirituel et musical.</p>
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
            En 1998, j’ai interprété mon tout premier « special » à l’église, en signe de reconnaissance et d’action de grâce envers le Seigneur. Cette expérience a marqué un tournant important dans ma vie. Quelques jours plus tard, j’ai intégré le groupe de la jeunesse appelé « Groupe Sion », où j’ai commencé à développer davantage mon ministère musical.</p>
            <p>
            En février 2001, j’ai eu l’opportunité de chanter pour la première fois dans le grand culte avec le chant intitulé « Sa façon de me dire qu’il m’aime ». À partir de cette période, j’ai commencé à conduire la louange et l’adoration à l’église. Ce ministère s’est étendu sur vingt-quatre années, de février 2001 à février 2025, une longue expérience riche en apprentissages, en bénédictions et en rencontres spirituelles.</p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.columnWide}>
            <p>
            Au fil des années, j’ai eu la grâce de composer plusieurs chansons inspirées, parmi lesquelles : Kembo na Yesu, Le bâton de Moïse, Entends nos cris, We Worship You, et bien d’autres. À travers ces œuvres, mon désir est de transmettre un message de foi, d’espérance et d’adoration authentique.</p>
            <p>
            Notre ministère musical ne se limite pas uniquement aux compositions originales. Nous interprétons également de nombreux cantiques et explorons plusieurs styles musicaux afin de toucher des publics variés tout en conservant l’essence du message de l’Évangile.</p>
            <p>
              Après mon parcours de conducteur de louange à l’église, je me suis lancé dans une nouvelle dynamique musicale à travers les réseaux sociaux, avec la production de plusieurs albums et maxi-singles. Aujourd’hui, lorsque nous sommes invités dans une église, pour un projet de concert, un live recording, un cover ou encore une soirée d’adoration, nous répondons toujours présents pour la gloire de Dieu.
            </p>
            <p>
              Grâce aux plateformes numériques, notre musique dépasse désormais les frontières physiques : le monde entier est devenu notre paroisse, et les chants sont suivis et écoutés partout à travers le monde.
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
