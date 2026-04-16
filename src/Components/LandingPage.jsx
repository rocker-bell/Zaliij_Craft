import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/LandingPage.css";
import ProjectCard from "../utils/ProjectCard.jsx";


const LandingPage = () => {
    

  return (
    <div className="zellige-landing">


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
        <Link to="/about" className="btn-primary">Contactez-nous</Link>
      </section>

    

    </div>
  );
};


export default LandingPage;