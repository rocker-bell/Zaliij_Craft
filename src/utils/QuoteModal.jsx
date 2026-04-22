import React, { useState } from 'react';
import "../Styles/QuoteModal.css";


import { useModal } from './ModalContext';
import supabase from './supabase';

const QuoteModal = ({ isOpen, onClose }) => {
  
      const { showModal } = useModal();
    const [formData, setFormData] = useState({
      nom: "",
      email: "",
      Telephone: "",
      TypeProjet: "",
      Budget: "",
      Description: ""
    })

    if (!isOpen) return null;

    const handleChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value})
    };
    const handleSubmit = async (e) => {
      e.preventDefault();

      showModal("loading", "Envoi du devis gratuit...");

      const {data, error} = await supabase
        .from("quotes")
        .insert([
          {
            full_name: formData.nom,
            email: formData.email,
            phone: formData.Telephone,
            project_type: formData.TypeProjet,
            budget_range: formData.Budget,
            description: formData.Description
          }
        ]);

        if (error) {
          console.error("Erreur Supabase:", error.message);

          showModal("error", "Erreur lors de l'envoi du Devis ❌");
          return;
        }

        showModal("success", "Devise envoyé avec succès ✅")


        setTimeout(() => {
          onClose()
        }, 6500)

        setFormData({
          nom: "",
          email: "",
          Telephone: "",
          TypeProjet: "",
          Budget: "",
          Description: "" 
        })

        
    }

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

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="modal-form-row">
            <div className="modal-input-group">
              <label>Nom complet *</label>
              <input type="text" name='nom' placeholder="Votre nom" value={formData.nom}  onChange={handleChange} required />
            </div>
            <div className="modal-input-group">
              <label>Email *</label>
              <input type="email" name='email' placeholder="votre@email.com" value={formData.email} onChange={handleChange} required />
            </div>
          </div>

          <div className="modal-form-row">
            <div className="modal-input-group">
              <label>Téléphone *</label>
              <input type="tel" name='Telephone' placeholder="+212 XXX XXX XXX" value={formData.Telephone} onChange={handleChange} required />
            </div>
            <div className="modal-input-group">
              <label>Type de projet *</label>
              <select name='TypeProjet' value={formData.TypeProjet} onChange={handleChange}>
                <option value="">Sélectionnez</option>
                <option value="Résidentiel">Résidentiel</option>
                <option value="Commercial">Commercial</option>
                <option value="Restauration">Restauration</option>
              </select>
            </div>
          </div>

          <div className="modal-input-group">
            <label>Budget estimé *</label>
            <select name="Budget" value={formData.Budget} onChange={handleChange}>
              <option value="">Sélectionnez votre budget estimé</option>
              <option value="5 000 - 20 000 MAD">5 000 - 20 000 MAD</option>
              <option value="20 000 - 50 000 MAD">20 000 - 50 000 MAD</option>
              <option value="50 000+ MAD">50 000+ MAD</option>
            </select>
          </div>

          <div className="modal-input-group">
            <label>Description du projet *</label>
            <textarea name='Description' placeholder="Décrivez votre projet en détail..." rows="4" value={formData.Description} onChange={handleChange}></textarea>
          </div>

          <button type="submit" className="modal-submit-btn">
             Envoyer la demande
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuoteModal;