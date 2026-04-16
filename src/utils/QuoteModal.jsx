import React from 'react';
import "../Styles/QuoteModal.css";

const QuoteModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container animate-slide-up" onClick={(e) => e.stopPropagation()}>
        {/* Header avec dégradé et motif */}
        <div className="modal-header">
          <div className="modal-header-pattern"></div>
          <button className="close-btn" onClick={onClose}>✕</button>
          <h2>Demande de Devis</h2>
          <p>Parlez-nous de votre projet et recevez un devis personnalisé</p>
        </div>

        <form className="modal-form">
          <div className="modal-form-row">
            <div className="modal-input-group">
              <label>Nom complet *</label>
              <input type="text" placeholder="Votre nom" required />
            </div>
            <div className="modal-input-group">
              <label>Email *</label>
              <input type="email" placeholder="votre@email.com" required />
            </div>
          </div>

          <div className="modal-form-row">
            <div className="modal-input-group">
              <label>Téléphone *</label>
              <input type="tel" placeholder="+212 XXX XXX XXX" required />
            </div>
            <div className="modal-input-group">
              <label>Type de projet *</label>
              <select>
                <option>Sélectionnez</option>
                <option>Résidentiel</option>
                <option>Commercial</option>
                <option>Restauration</option>
              </select>
            </div>
          </div>

          <div className="modal-input-group">
            <label>Budget estimé *</label>
            <select>
              <option>Sélectionnez une fourchette</option>
              <option>5 000 - 20 000 MAD</option>
              <option>20 000 - 50 000 MAD</option>
              <option>50 000+ MAD</option>
            </select>
          </div>

          <div className="modal-input-group">
            <label>Description du projet *</label>
            <textarea placeholder="Décrivez votre projet en détail..." rows="4"></textarea>
          </div>

          <button type="submit" className="modal-submit-btn">
            🚀 Envoyer la demande
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuoteModal;