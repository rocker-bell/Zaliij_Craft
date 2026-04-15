import React from "react";
import { useState } from "react";
import "../Styles/LandingPage.css";
import ProjectCard from "../utils/ProjectCard.jsx"

const LandingPage = () => {
    const [isActiveSlide, setActiveSlide] = useState(false);

  return (
    <div className="zellige-landing">

      {/* TOP BAR */}
      <div className="top-bar">
        <span>📍 Livraison dans tout le Maroc</span>
        <span>📞 +212 660 271 360</span>
      </div>

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">
          <div className="logo-icon"></div>
          <span>Zellige Artisan</span>
        </div>

        <div className="nav-links">
          <a href="#accueil">Accueil</a>
          <a href="#about">Qui sommes-nous ?</a>
          <a href="#contact">Contact</a>
        </div>

        <button className="btn-quote-nav">Devis gratuit</button>
      </nav>

      {/* HERO */}
      <header className="hero" id="accueil">

        <div className="pattern-overlay"></div>

        <div className="hero-content">
          <span className="badge">✨ Artisanat marocain authentique</span>

          <h1>
            L'Art du Zellige <br />
            <span>Transmis de Génération en Génération</span>
          </h1>

          <p>
            Nous créons des pièces uniques en zellige marocain pour embellir vos espaces.
          </p>

          <div className="hero-btns">
            <button className="btn-primary">Demander un devis</button>
            <button className="btn-secondary">En savoir plus</button>
          </div>
        </div>

        {/* STATS */}
        <div className="stats-container">

          <div className="stat-card">
            <h3>38+</h3>
            <p>Années</p>
          </div>

          <div className="stat-card">
            <h3>500+</h3>
            <p>Clients</p>
          </div>

          <div className="stat-card">
            <h3>1000+</h3>
            <p>Projets</p>
          </div>

          <div className="stat-card">
            <h3>100%</h3>
            <p>Fait main</p>
          </div>

        </div>
      </header>

      {/* PROJECTS */}
      <section className="projects">
        <h2>Nos Réalisations</h2>

        <div className="project-grid">

          <ProjectCard
            image="https://images.unsplash.com/photo-1590079015129-f6883bee95aa"
            title="Zellige Traditionnel"
            desc="Art ancestral marocain"
          />

          <ProjectCard
            image="https://images.unsplash.com/photo-1584622650111-993a426fbf0a"
            title="Restauration"
            desc="Façades anciennes"
          />

          <ProjectCard
            image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
            title="Design moderne"
            desc="Fusion tradition & modernité"
          />

          <ProjectCard
            image="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
            title="Architecture"
            desc="Projets haut de gamme"
          />

        </div>
      </section>

      {/* Pre footer */}
      <section className="cta">
        <h2>Prêt pour votre projet ?</h2>
        <button className="btn-primary">Contactez-nous</button>
      </section>

      {/* FOOTER */}
      <footer className="footer">
  <div className="footer-container">
    {/* Colonne 1: Marque */}
    <div className="footer-brand">
      <div className="logo">
        <div className="logo-icon"></div>
        <span>Zellige Artisan</span>
      </div>
      <p>
        Maîtres artisans spécialisés dans le zellige traditionnel marocain. 
        Nous transformons l'argile en art pour vos projets d'exception.
      </p>
      <div className="footer-socials">
        <a href="#" aria-label="Instagram"><span>📸</span></a>
        <a href="#" aria-label="Facebook"><span>👤</span></a>
        <a href="#" aria-label="Pinterest"><span>📌</span></a>
      </div>
    </div>

    {/* Colonne 2: Navigation Rapide */}
    <div className="footer-nav">
      <h4>Navigation</h4>
      <ul>
        <li><a href="#accueil">Accueil</a></li>
        <li><a href="#about">Qui sommes-nous ?</a></li>
        <li><a href="#realisations">Nos Réalisations</a></li>
        <li><a href="#devis">Demander un devis</a></li>
      </ul>
    </div>

    {/* Colonne 3: Contact Direct */}
    <div className="footer-contact">
      <h4>Contact</h4>
      <p>📍 Médina de Fès, Maroc</p>
      <p>📞 +212 660 271 360</p>
      <p>✉️ contact@zellige-artisan.ma</p>
    </div>
  </div>

  <div className="footer-bottom">
    <p>© 2026 Zellige Artisan. Tous droits réservés.</p>
    <div className="footer-legal">
      <a href="#">Mentions légales</a>
      <a href="#">Confidentialité</a>
    </div>
  </div>
</footer>

    </div>
  );
};


export default LandingPage;