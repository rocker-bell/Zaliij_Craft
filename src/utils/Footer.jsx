import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo_1.svg";
import { Phone } from "lucide-react";
import { Mail } from "lucide-react";
import { BookImage } from "lucide-react";
import { MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Colonne 1: Marque & Description */}
        <div className="footer-brand">
          <div className="logo_footer">
            {/* <div className="logo-icon"></div>
            <span>Zellige Artisan</span> */}
            <img src={Logo} alt=""  className="logo_representative"/>
            <p className="entreprise_nom_representative"> Zellige ArtTravaux</p>
          </div>
          <p>
            Fabrication artisanale de zellige marocain depuis 1985. Nous perpétuons l'art ancestral de la mosaïque avec passion pour sublimer vos espaces.
          </p>
          <div className="footer-socials">
            {/* <a href="#" className="social-icon" aria-label="Instagram">📸</a> */}
            <BookImage className="icons" size={20} />
            {/* <a href="#" className="social-icon" aria-label="Email">✉️</a> */}
            <Mail className="icons" size={20} />
            {/* <a href="#" className="social-icon" aria-label="Phone">📞</a> */}
            <Phone className="icons" size={20} />
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
          <p className="Pfooter-contact"><Phone size={20} className="icons" /> +212 660 271 360</p>
          <p className="Pfooter-contact"><Mail size={20} className="icons" /> contact@zellige-artisan.ma</p>
          <p className="Pfooter-contact"><MapPin size={20} className="icons" />  Médina de Fès, Maroc</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Zellige ArtTravaux SARLAU. Tous droits réservés.</p>
        <div className="footer-legal">
          <a href="/mentions-legales">Mentions légales</a>
          <a href="/confidentialite">Politique de confidentialité</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;