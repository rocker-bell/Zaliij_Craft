import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/LogoFooter.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Colonne 1: Marque & Description */}
        <div className="footer-brand">
          <div className="logo">
            {/* <div className="logo-icon"></div>
            <span>Zellige Artisan</span> */}
            <img src={Logo} alt="" />
          </div>
          <p>
            Fabrication artisanale de zellige marocain depuis 1985. Nous perpétuons l'art ancestral de la mosaïque avec passion pour sublimer vos espaces.
          </p>
          <div className="footer-socials">
            <a href="#" className="social-icon" aria-label="Instagram">📸</a>
            <a href="#" className="social-icon" aria-label="Email">✉️</a>
            <a href="#" className="social-icon" aria-label="Phone">📞</a>
          </div>
        </div>

        {/* Colonne 2: Navigation */}
        <div className="footer-nav">
          <h4>Navigation</h4>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/about">Qui sommes-nous ?</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Colonne 3: Contact Direct */}
        <div className="footer-contact">
          <h4>Contact</h4>
          <p>📞 +212 660 271 360</p>
          <p>✉️ contact@zellige-artisan.ma</p>
          <p>📍 Médina de Fès, Maroc</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Zellige ArtTravaux. Tous droits réservés.</p>
        <div className="footer-legal">
          <a href="/mentions-legales">Mentions légales</a>
          <a href="/confidentialite">Politique de confidentialité</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;