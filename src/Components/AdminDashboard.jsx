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
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("quotes");
  const [Filter, setFilter] = useState('')

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

      const {data: projectsData, error: projectsError} = await supabase
        .from("projects")
        .select("*")
        .order("id", {ascending:false});
      

      if (!quotesError) setQuotes(quotesData || []);
      if (!contactsError) setContacts(contactsData || []);
      if (!projectsError) setProjects(projectsData || []);

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

  const handleNewProject = () => {
    alert("new project click")
  }


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
         <div className="stat-card-admin">
          <p>Projects</p>
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

          <button
          className={activeTab === "projects" ? "tab active" : "tab"}
          onClick={() => setActiveTab("projects")}
        >
          ✉️ Projects({projects.length})
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
        <section className="contacts-section">
          <div className="contacts-header">
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


{/* 
       {activeTab === "projects" && (
        <section className="projects-section">
          <div className="projects-header">
            <h2>liste des projets</h2>
            <button>
                  Nouveau Projet
            </button>
            
          </div>

          <div className="table-wrapper">
            <table className="projects-table">
              <thead>
                <tr>
                  <th>id</th>
                  <th>Nom</th>
                  
                  <th>TYPE</th>
                  <th>BUDGET</th>
                  <th>DATE</th>
                  <th>STATUT</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {projects.map((item) => (
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
      )} */}
      {activeTab === "projects" && (
  <section className="projects-section">
    <div className="projects-header">
      <h2>Liste des projets</h2>
      <div className="projects-header-actions">
      <button className="btn-new-project" onClick={handleNewProject}>+ Nouveau Projet</button>
      <select name="" id="" className="projects-filter"  value={Filter} onChange={(e) => setFilter(target.value)}>
        <option value="Filter" selected>filter</option>
        <option value="decoration">decoration</option>
        <option value="construction">construction</option>
        <option value="artisanat">artisanat</option>
        <option value="export">export</option>
        <option value="autre">autre</option>
      </select>
      </div>
    </div>

    <div className="table-wrapper">
      <table className="devis-table">
        <thead>
          <tr>
            <th>NOM</th>
            <th>TYPE</th>
            <th>DESCRIPTION</th>
            <th>DATE CRÉATION</th>
            <th>DATE ALLOUÉE</th>
            <th>STATUT</th>
            <th>ACTIONS</th>
          </tr>
        </thead>

        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>
                <strong>{project.name}</strong>
              </td>

              <td>{project.type || "-"}</td>

              <td className="description-cell">
                {project.description || "-"}
              </td>

              <td>
                {project.created_at
                  ? new Date(project.created_at).toLocaleDateString()
                  : "-"}
              </td>

              <td>
                {project.allocated_date
                  ? new Date(project.allocated_date).toLocaleDateString()
                  : "-"}
              </td>

              <td>
                <span className={`status-badge ${project.status}`}>
                  {project.status}
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
    </div>
  );
};

export default AdminDashboard;