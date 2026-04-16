import React from "react";
import "../Styles/AdminDashboard.css";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate()
  const stats = [
    { label: "Total Devis", value: 3, icon: "📄", color: "blue" },
    { label: "En attente", value: 1, icon: "🕒", color: "orange" },
    { label: "En révision", value: 1, icon: "📈", color: "purple" },
    { label: "Devis envoyés", value: 1, icon: "✅", color: "green" },
  ];

  const devisData = [
    { id: 1, client: "Mohammed Alami", email: "mohammed.alami@email.com", tel: "+212 661 234 567", type: "Résidentiel", budget: "50,000 - 100,000 MAD", date: "14/04/2026", statut: "En attente" },
    { id: 2, client: "Fatima Bennani", email: "f.bennani@email.com", tel: "+212 662 345 678", type: "Commercial", budget: "100,000 - 200,000 MAD", date: "13/04/2026", statut: "En révision" },
    { id: 3, client: "Youssef Tazi", email: "youssef.tazi@email.com", tel: "+212 663 456 789", type: "Restauration", budget: "200,000+ MAD", date: "12/04/2026", statut: "Devis envoyé" },
  ];

  const HandleLogout = () => {
    navigate('/')
  }

  return (
    <div className="AdminDashboard-container">
      {/* Header du AdminDashboard */}
      <header className="AdminDashboard-header">
        <div className="admin-brand">
          <div className="logo-icon-admin"></div>
          <div>
            <h1>AdminDashboard Admin</h1>
            <p>Bienvenue, Admin Zellige</p>
          </div>
        </div>
        <button className="btn-logout" onClick={HandleLogout}>Logout →</button>
      </header>

      {/* Cartes de Statistiques */}
      <section className="stats-grid">
        {stats.map((item, index) => (
          <div key={index} className="stat-card-admin">
            <div className="stat-info">
              <p>{item.label}</p>
              <h2>{item.value}</h2>
            </div>
            <div className={`stat-icon-bg ${item.color}`}>{item.icon}</div>
          </div>
        ))}
      </section>

      {/* Section Tableau des Devis */}
      <section className="devis-section">
        <div className="devis-header">
          <div>
            <h2>Demandes de Devis</h2>
            <p>Gérez toutes les demandes de devis reçues</p>
          </div>
          <select className="status-filter">
            <option>Tous les statuts</option>
            <option>En attente</option>
            <option>En révision</option>
            <option>Devis envoyé</option>
          </select>
        </div>

        <div className="table-wrapper">
          <table className="devis-table">
            <thead>
              <tr>
                <th>CLIENT</th>
                <th>TYPE</th>
                <th>BUDGET</th>
                <th>DATE</th>
                <th>STATUT</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {devisData.map((devis) => (
                <tr key={devis.id}>
                  <td className="client-cell">
                    <strong>{devis.client}</strong>
                    <span>{devis.email}</span>
                    <span>{devis.tel}</span>
                  </td>
                  <td>{devis.type}</td>
                  <td>{devis.budget}</td>
                  <td>{devis.date}</td>
                  <td>
                    <span className={`status-badge ${devis.statut.toLowerCase().replace(" ", "-")}`}>
                      {devis.statut}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button className="btn-view">👁️</button>
                    <select className="status-select">
                      <option>{devis.statut}</option>
                      <option>Changer statut...</option>
                    </select>
                    <button className="btn-delete">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;