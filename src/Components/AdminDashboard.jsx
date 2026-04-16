import React, { useEffect, useState } from "react";
import "../Styles/AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import supabase from "../utils/supabase";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // -----------------------------
  // STATE
  // -----------------------------
  const [quotes, setQuotes] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("quotes");

  // -----------------------------
  // FETCH DATA
  // -----------------------------
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const { data: quotesData, error: quotesError } = await supabase
        .from("quotes")
        .select("*")
        .order("id", { ascending: false });

      const { data: contactsData, error: contactsError } = await supabase
        .from("contactus")
        .select("*")
        .order("id", { ascending: false });

      if (!quotesError) setQuotes(quotesData || []);
      if (!contactsError) setContacts(contactsData || []);

      setLoading(false);
    };

    fetchData();
  }, []);

  // -----------------------------
  // LOGOUT
  // -----------------------------
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/LoginPage");
  };

  // -----------------------------
  // LOADING
  // -----------------------------
  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="AdminDashboard-container">

      {/* HEADER */}
      <header className="AdminDashboard-header">
        <div className="admin-brand">
          <div className="logo-icon-admin"></div>
          <div>
            <h1>Admin Dashboard</h1>
            <p>Gestion des devis & messages</p>
          </div>
        </div>

        <button className="btn-logout" onClick={handleLogout}>
          Logout →
        </button>
      </header>

      {/* -----------------------------
          STATS
      ----------------------------- */}
      <section className="stats-grid">
        <div className="stat-card-admin">
          <p>Total Devis</p>
          <h2>{quotes.length}</h2>
        </div>

        <div className="stat-card-admin">
          <p>Messages Contact</p>
          <h2>{contacts.length}</h2>
        </div>

        <div className="stat-card-admin">
          <p>En attente</p>
          <h2>{quotes.filter(q => !q.status || q.status === "pending").length}</h2>
        </div>
      </section>

      {/* -----------------------------
          TAB SWITCHER
      ----------------------------- */}
      <div className="dashboard-tabs">
        <button
          className={activeTab === "quotes" ? "tab active" : "tab"}
          onClick={() => setActiveTab("quotes")}
        >
          📄 Quotes ({quotes.length})
        </button>

        <button
          className={activeTab === "contacts" ? "tab active" : "tab"}
          onClick={() => setActiveTab("contacts")}
        >
          ✉️ Contacts ({contacts.length})
        </button>
      </div>

      {/* -----------------------------
          QUOTES
      ----------------------------- */}
      {activeTab === "quotes" && (
        <section className="devis-section">
          <div className="devis-header">
            <h2>Demandes de Devis</h2>
            <p>Liste des demandes reçues</p>
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
                {quotes.map((item) => (
                  <tr key={item.id}>
                    <td className="client-cell">
                      <strong>{item.full_name}</strong>
                      
                      <span>{item.email}</span>
                      <span>{item.phone}</span>
                    </td>

                    <td>{item.project_type}</td>

                    <td>{item.budget_range}</td>

                    <td>
                      {item.created_at
                        ? new Date(item.created_at).toLocaleDateString()
                        : "-"}
                    </td>

                    <td>
                      <span className="status-badge">
                        {item.status || "En attente"}
                      </span>
                    </td>

                    <td className="actions-cell">
                      <button className="btn-view">👁️</button>
                      <button className="btn-delete">🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* -----------------------------
          CONTACTS
      ----------------------------- */}
      {activeTab === "contacts" && (
        <section className="devis-section">
          <div className="devis-header">
            <h2>Messages Contact</h2>
            <p>Messages envoyés via le formulaire contact</p>
          </div>

          <div className="table-wrapper">
            <table className="devis-table">
              <thead>
                <tr>
                  <th>NOM</th>
                  <th>EMAIL</th>
                  <th>TELEPHONE</th>
                  <th>sujet</th>
                  <th>MESSAGE</th>
                  <th>DATE</th>
                </tr>
              </thead>

              <tbody>
                {contacts.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <strong>{c.fullname}</strong>
                    </td>

                    <td>{c.email}</td>

                    

                    <td>{c.telephone}</td>

                    <td>{c.subject}</td>

                    <td>{c.message}</td>

                    <td>
                      {c.created_at
                        ? new Date(c.created_at).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </section>
      )}
    </div>
  );
};

export default AdminDashboard;