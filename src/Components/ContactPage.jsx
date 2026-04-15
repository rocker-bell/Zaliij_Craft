import "../Styles/ContactPage.css"
// const ContactPage = () => {
//   return (
//     <main className="contact-page">
//       <header className="hero mini-hero">
//         <div className="pattern-overlay"></div>
//         <div className="hero-content">
//           <span className="badge">Parlons de votre projet</span>
//           <h1>Contactez-<span>Nous</span></h1>
//         </div>
//       </header>

//       <section className="contact-grid-info" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px', padding: '0 10%', marginTop: '-50px' }}>
//          <div className="stat-card" style={{ background: '#fff', color: '#333' }}>
//             <p>📞 Téléphone</p>
//             <h3>+212 660...</h3>
//          </div>
         
//       </section>

//       <section className="form-section" style={{ padding: '80px 10%', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '40px' }}>
//          <form className="contact-form">
            
//             <button className="btn-primary">Envoyer le message</button>
//          </form>
//          <div className="faq-box" style={{ background: 'var(--teal-dark)', color: '#fff', padding: '30px', borderRadius: '20px' }}>
//             <h3>Pourquoi nous choisir ?</h3>
//             <ul>
//                <li>Devis gratuit et sans engagement</li>
//                <li>Réponse rapide sous 24h</li>
//             </ul>
//          </div>
//       </section>
//     </main>
//   );
// };

// export default ContactPage;


import React, { useState } from "react";
import "../Styles/ContactPage.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    sujet: "Selectionnez un sujet",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulaire envoyé :", formData);
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
                <input type="text" name="nom" placeholder="Votre nom" onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>Email *</label>
                <input type="email" name="email" placeholder="votre@email.com" onChange={handleChange} required />
              </div>
            </div>

            <div className="form-row">
              <div className="input-group">
                <label>Téléphone *</label>
                <input type="tel" name="telephone" placeholder="+212 XXX XXX XXX" onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>Sujet *</label>
                <select name="sujet" onChange={handleChange}>
                  <option>Sélectionnez un sujet</option>
                  <option>Zellige Traditionnel</option>
                  <option>Restauration de façade</option>
                  <option>Design moderne</option>
                </select>
              </div>
            </div>

            <div className="input-group">
              <label>Message *</label>
              <textarea name="message" placeholder="Décrivez-nous votre projet..." rows="6" onChange={handleChange} required></textarea>
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