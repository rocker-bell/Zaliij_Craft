import {
  Heart,
  Award,
  Users,
  Lightbulb,
  ArrowRight
} from "lucide-react";
import artisanImg from "../images/artisan.png";
import lieu1 from "../images/lieu1.png";
import lieu2 from "../images/lieu2.png";
import lieu3 from "../images/lieu3.png";
import lieu4 from "../images/lieu4.png";

import "../Styles/AboutPage.css"
const AboutPage = () => {
  return (
    <main className="about-page">
      <header className="hero mini-hero">
        <div className="pattern-overlay"></div>
        <div className="hero-content">
          <span className="badge">Notre Histoire</span>
          <h1>Gardiens d'un <br /><span>Savoir-Faire Millénaire</span></h1>
        </div>
      </header>

      {/* <section className="about-details" style={{ padding: '80px 10%', background: '#fff' }}>
        <div className="project-grid">
           <img src="URL_ARTISAN_FOTOT" alt="Artisan" style={{ borderRadius: '24px', width: '100%' }} />
           <div className="text-side">
             <span className="section-subtitle">Notre Atelier</span>
             <h2>Un Héritage Familial Transmis avec Fierté</h2>
             <p className="section-desc">Fondé en 1985 au cœur de la médina de Fès...</p>
           </div>
        </div>
      </section> */}

      <section className="aboutPage__about">
        <div className="aboutPage__grid">
          <img src={artisanImg} alt="Artisan" />

          <div>
            <span className="aboutPage__subtitle">Notre Atelier</span>
            <h2>Un Héritage Familial Transmis avec Fierté</h2>
            <p>
              Depuis 1985, notre atelier perpétue l’art du zellige marocain avec passion et précision. Héritiers d’un savoir-faire ancestral, nous créons des pièces uniques, façonnées à la main, alliant tradition et élégance contemporaine.
            </p>
                        <p>
            Fondé en 1985 au cœur de la médina de Fès, notre atelier est le fruit d’une passion familiale pour l’art du zellige, transmise de génération en génération. Notre fondateur, Maître Hassan, a appris les techniques ancestrales auprès de son grand-père, perpétuant ainsi un savoir-faire d’exception.
            </p>

            <p>
            Aujourd’hui, nous sommes fiers d’être reconnus comme l’un des ateliers les plus réputés du Maroc, tout en restant fidèles à nos racines et à nos valeurs. Chaque pièce que nous créons porte en elle l’âme de nos artisans et l’essence de la tradition marocaine.
            </p>

            <p>
            Notre équipe de maîtres artisans qualifiés travaille avec des matériaux nobles et des techniques traditionnelles pour créer des œuvres d’art qui transcendent le temps et embellissent les espaces les plus prestigieux.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="aboutPage__values">
        <span className="aboutPage__subtitle center">Nos Valeurs</span>
        <h2>Ce Qui Nous Inspire Chaque Jour</h2>

        <div className="aboutPage__cards">
          <div className="aboutPage__card">
            <Heart />
            <h3>Passion</h3>
            <p>Nous aimons ce que nous faisons</p>
          </div>

          <div className="aboutPage__card">
            <Award />
            <h3>Excellence</h3>
            <p>Un engagement envers la qualité</p>
          </div>

          <div className="aboutPage__card">
            <Users />
            <h3>Tradition</h3>
            <p>Savoir-faire ancestral transmis</p>
          </div>

          <div className="aboutPage__card">
            <Lightbulb />
            <h3>Innovation</h3>
            <p>Alliance tradition & modernité</p>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="aboutPage__process">
        <div className="aboutPage__processGrid">

          <div className="AboutPageSteps_descritpion_container">
            <div className="">
            <div className="AboutPagesteps_section">
              <span className="aboutPage__subtitle">Notre Processus</span>
              <h2>De l'Argile à l'Œuvre d'Art</h2>
            </div>
            <ul className="aboutPage__steps">
            
              <li> <ArrowRight size={50} /> Argile sélectionnée</li>
              <li> <ArrowRight size={50} /> Découpe artisanale</li>
              <li> <ArrowRight size={50} /> Émaillage</li>
              <li> <ArrowRight size={50} /> Cuisson</li>
              <li> <ArrowRight size={50} /> Assemblage</li>
              <li> <ArrowRight size={50} /> Contrôle qualité</li>
            </ul>
            </div>
          </div>

          <div className="aboutPage__images">
              <img src={lieu1} />
              <img src={lieu2} />
              <img src={lieu3} />
              <img src={lieu4} />
          </div>

        </div>
      </section>

      {/* TEAM */}
      {/* <section className="aboutPage__team">
        
        <span className="aboutPage__subtitle center">Notre Équipe</span>
        <h2>Des Artisans d'Exception</h2>

        <div className="aboutPage__teamGrid">
          <div className="aboutPage__teamCard">
            <Users />
            <h3>Hassan Elmrani</h3>
            <p>Maître Artisan - Fondateur</p>
          </div>

          <div className="aboutPage__teamCard">
            <Users />
            <h3>Fatima Benali</h3>
            <p>Experte en motifs</p>
          </div>

          <div className="aboutPage__teamCard">
            <Users />
            <h3>Youssef Karim</h3>
            <p>Chef d’atelier</p>
          </div>
        </div>
      </section> */}

      <section className="aboutPage__team" style={{ position: "relative" }}>
  <div className="pattern-overlay"></div>

  <span className="aboutPage__subtitle center">Notre Équipe</span>
  <h2>Des Artisans d'Exception</h2>

  <div className="aboutPage__teamGrid">
    <div className="aboutPage__teamCard">
      <Users />
      <h3>Hassan Elmrani</h3>
      <p>Maître Artisan - Fondateur</p>
    </div>

    <div className="aboutPage__teamCard">
      <Users />
      <h3>Fatima Benali</h3>
      <p>Experte en motifs</p>
    </div>

    <div className="aboutPage__teamCard">
      <Users />
      <h3>Youssef Karim</h3>
      <p>Chef d’atelier</p>
    </div>
  </div>
</section>
    </main>
  );
};

export default AboutPage;

// import "../Styles/AboutPage.css"
// const AboutPage = () => {
//   return (
//     <main className="aboutPage">
//       {/* HERO */}
//       <header className="aboutPage__hero">
//         <div className="aboutPage__overlay"></div>
//         <div className="aboutPage__heroContent">
//           <span className="aboutPage__badge">Notre Histoire</span>
//           <h1>
//             Gardiens d'un <br />
//             <span>Savoir-Faire Millénaire</span>
//           </h1>
//         </div>
//       </header>

//       {/* ABOUT SECTION */}
//       <section className="aboutPage__section">
//         <div className="aboutPage__grid">
          
//           {/* LEFT IMAGE */}
//           <div className="aboutPage__imageMain">
//             <img src="URL_ARTISAN_FOTO" alt="Artisan" />
//           </div>

//           {/* RIGHT TEXT */}
//           <div className="aboutPage__text">
//             <span className="aboutPage__subtitle">Notre Atelier</span>
//             <h2>Un Héritage Familial Transmis avec Fierté</h2>
//             <p>
//               Fondé en 1985 au cœur de la médina de Fès, notre atelier est le fruit
//               d'une passion familiale pour l’art du zellige...
//             </p>
//           </div>

//         </div>
//       </section>

//       {/* PROCESS SECTION (images + steps like your design) */}
//       <section className="aboutPage__process">
//         <div className="aboutPage__processGrid">

//           {/* LEFT TEXT */}
//           <div className="aboutPage__processText">
//             <h2>De l'Argile à l'Œuvre d'Art</h2>
//             <ul>
//               <li>Sélection minutieuse de l'argile</li>
//               <li>Découpe précise à la main</li>
//               <li>Application des émaux</li>
//               <li>Cuisson à haute température</li>
//               <li>Assemblage des motifs</li>
//               <li>Contrôle qualité</li>
//             </ul>
//           </div>

//           {/* RIGHT IMAGE GRID */}
//           <div className="aboutPage__processImages">
//             <img src="img1.jpg" alt="" />
//             <img src="img2.jpg" alt="" />
//             <img src="img3.jpg" alt="" />
//             <img src="img4.jpg" alt="" />
//           </div>

//         </div>
//       </section>
//     </main>
//   );
// };

// export default AboutPage;