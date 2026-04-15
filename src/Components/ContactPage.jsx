import "../Styles/ContactPage.css"

import React, { useState } from "react";
import "../Styles/ContactPage.css";

import supabase from "../utils/supabase";
import { useModal } from "../utils/ModalContext";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    sujet: "Selectionnez un sujet",
    message: ""
  });

  const { showModal } = useModal();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

//  const handleSubmit = async (e) => {
//   e.preventDefault();

//   const { data, error } = await supabase
//     .from("contactus")
//     .insert([
//       {
//         fullname: formData.nom,
//         email: formData.email,
//         telephone: formData.telephone,
//         subject: formData.sujet,
//         message: formData.message
//       }
//     ]);

//   if (error) {
//     console.error("Erreur Supabase:", error.message);
//     alert("Erreur lors de l'envoi ❌");
//   } else {
//     console.log("Succès:", data);
//     alert("Message envoyé avec succès ✅");

//     // reset form
//     setFormData({
//       nom: "",
//       email: "",
//       telephone: "",
//       sujet: "Selectionnez un sujet",
//       message: ""
//     });
//   }
// };

    const handleSubmit = async (e) => {
  e.preventDefault();

  // show loading modal
  showModal("loading", "Envoi du message...");

  const { data, error } = await supabase
    .from("contactus")
    .insert([
      {
        fullname: formData.nom,
        email: formData.email,
        telephone: formData.telephone,
        subject: formData.sujet,
        message: formData.message
      }
    ]);

  if (error) {
    console.error("Erreur Supabase:", error.message);

    showModal("error", "Erreur lors de l'envoi ❌");
    return;
  }

  // success
  showModal("success", "Message envoyé avec succès ✅");

  setFormData({
    nom: "",
    email: "",
    telephone: "",
    sujet: "Selectionnez un sujet",
    message: ""
  });
};

  return (
    <main className="contact-page">
      {/* SECTION HERO MINI */}
      <header className="hero mini-hero">
        <div className="pattern-overlay"></div>
        <div className="hero-content">
          <span className="badge">Parlons de votre projet</span>
          <h1>Contactez-<span>Nous</span></h1>
          <p>Notre équipe est à votre écoute pour répondre à toutes vos questions.</p>
        </div>
      </header>

      {/* CARTES INFO (Contact direct) */}
      <section className="contact-grid-info">
        <div className="info-stat-card">
          <div className="icon-circle">📞</div>
          <p>Téléphone</p>
          <h3>+212 660 271 360</h3>
          <span>+212 523 123 456</span>
        </div>
        <div className="info-stat-card">
          <div className="icon-circle">✉️</div>
          <p>Email</p>
          <h3>contact@zellige-artisan.ma</h3>
          <span>info@zellige-artisan.ma</span>
        </div>
        <div className="info-stat-card">
          <div className="icon-circle">📍</div>
          <p>Adresse</p>
          <h3>Médina de Fès</h3>
          <span>Rue des Artisans, Fès 30000</span>
        </div>
        <div className="info-stat-card">
          <div className="icon-circle">🕒</div>
          <p>Horaires</p>
          <h3>Lun - Sam: 9h00 - 18h00</h3>
          <span>Dimanche: Sur rendez-vous</span>
        </div>
      </section>

      {/* SECTION FORMULAIRE + FAQ */}
      <section className="form-section">
        <div className="form-container">
          <span className="section-subtitle">Demande de devis</span>
          <h2>Parlez-nous de votre projet</h2>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="input-group">
                <label>Nom complet *</label>
                <input type="text" name="nom" placeholder="Votre nom" value={formData.nom} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>Email *</label>
                <input type="email" name="email" placeholder="votre@email.com" value={formData.email} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label>Téléphone *</label>
                <input type="tel" name="telephone" placeholder="+212 XXX XXX XXX"  value={formData.telephone} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>Sujet *</label>
                <select name="sujet" value={formData.sujet} onChange={handleChange}>
                  <option>Sélectionnez un sujet</option>
                  <option value="Zellige-Traditionnel">Zellige Traditionnel</option>
                  <option value="Restauration-de-façade">Restauration de façade</option>
                  <option value="Design-moderne">Design moderne</option>
                </select>
              </div>
            </div>

            <div className="input-group">
              <label>Message *</label>
              <textarea name="message" placeholder="Décrivez-nous votre projet..." rows="6" value={formData.message} onChange={handleChange} required></textarea>
            </div>

            <button type="submit" className="btn-primary">Envoyer le message</button>
          </form>
        </div>

        {/* SIDEBAR D'INFORMATION */}
        <aside className="contact-sidebar">
          <div className="faq-box">
            <h3>Pourquoi nous choisir ?</h3>
            <ul>
              <li>✅ Devis gratuit et sans engagement</li>
              <li>✅ Réponse rapide sous 24h</li>
              <li>✅ Conseils d'experts personnalisés</li>
              <li>✅ Visite de notre atelier possible</li>
              <li>✅ Garantie qualité sur tous nos travaux</li>
            </ul>
          </div>

          <div className="emergency-box">
            <p>Besoin d'une réponse rapide ?</p>
            <a href="tel:+212660271360" className="phone-link">📞 +212 660 271 360</a>
          </div>
        </aside>
      </section>
    </main>
  );
};

export default ContactPage;