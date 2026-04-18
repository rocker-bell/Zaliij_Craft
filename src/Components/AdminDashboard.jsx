import React, { useEffect, useState } from "react";
import "../Styles/AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import supabase from "../utils/supabase";
import {useModal} from "../utils/ModalContext"

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
  const [Filter, setFilter] = useState('');

  const [showModal, setShowModal] = useState(false);
  

  const [newProject, setNewProject] = useState({
    name: "",
    type: "",
    description: "",
    status: "nouveau",
    allocated_date: ""
  });


  const ITEMS_PER_PAGE = 5;

  const [quotesPage, setQuotesPage] = useState(1);
  const [contactsPage, setContactsPage] = useState(1);
  const [projectsPage, setProjectsPage] = useState(1);

    const paginate = (data, page) => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return data.slice(start, start + ITEMS_PER_PAGE);
  };

  const filteredProjects = Filter && Filter !== "Filter"
  ? projects.filter((p) => p.type === Filter)
  : projects;



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

  const handleChange = (e) => {
  const { name, value } = e.target;
  setNewProject((prev) => ({
    ...prev,
    [name]: value,
  }));
};

// const handleSubmitProject = async (e) => {
//   e.preventDefault();

//   const { error } = await supabase.from("projects").insert([
//     {
//       name: newProject.name,
//       type: newProject.type,
//       description: newProject.description,
//       status: newProject.status,
//       allocated_date: newProject.allocated_date || null,
//     },
//   ]);

//   if (error) {
//     alert("Error creating project");
//     console.error(error);
//   } else {
//     // refresh UI
//     const { data } = await supabase
//   .from("projects")
//   .select("*")
//   .order("created_at", { ascending: false });

// setProjects(data);

//     // reset form
//     setNewProject({
//       name: "",
//       type: "",
//       description: "",
//       status: "nouveau",
//       allocated_date: "",
//     });

//     setShowModal(false);
//   }
// };

    const { showModal: showToast } = useModal();

const handleSubmitProject = async (e) => {
  e.preventDefault();

  showToast("loading", "Création du projet...");

  const { error } = await supabase.from("projects").insert([
    {
      name: newProject.name,
      type: newProject.type,
      description: newProject.description,
      status: newProject.status,
      allocated_date: newProject.allocated_date || null,
    },
  ]);

  if (error) {
    showToast("error", "Erreur lors de creation du projet");
    console.error(error);
    return;
  }

  // refresh projects
  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  setProjects(data);

  // reset form
  setNewProject({
    name: "",
    type: "",
    description: "",
    status: "nouveau",
    allocated_date: "",
  });

  setShowModal(false);

  showToast("success", "Projet ajouté avec succès");
};

  const handleNewProject = () => {
  setShowModal(true);
};

  const closeModal = () => {
  setShowModal(false);
};

  // const handleNewProject = () => {
  //   alert("new project click")
  // }


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
          <h2>{quotes.filter(q => !q.status || q.status === "new").length}</h2>
        </div>
         <div className="stat-card-admin">
          <p>Projects</p>
          <h2>{projects.filter(q => !q.status || q.status === "nouveau").length}</h2>
        </div>
      </section>

      {/* -----------------------------
          TAB SWITCHER
      ----------------------------- */}
      <div className="dashboard-tabs">
        <button
          className={activeTab === "quotes" ? "tab active" : "tab"}
          onClick={() => {setActiveTab("quotes"); setQuotesPage(1)}}
          
        >
          📄 Quotes ({quotes.length})
        </button>

        <button
          className={activeTab === "contacts" ? "tab active" : "tab"}
          onClick={() => {setActiveTab("contacts"); setContactsPage(1)}}
        >
          ✉️ Contacts ({contacts.length})
        </button>

          <button
          className={activeTab === "projects" ? "tab active" : "tab"}
          onClick={() => {setActiveTab("projects"), setProjectsPage(1)}}
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
                {paginate(quotes, quotesPage).map((item) => (
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

            <div className="pagination">
  <button
    disabled={quotesPage === 1}
    onClick={() => setQuotesPage((p) => p - 1)}
  >
    ←
  </button>

  <span>Page {quotesPage}</span>

  <button
    disabled={quotesPage * ITEMS_PER_PAGE >= quotes.length}
    onClick={() => setQuotesPage((p) => p + 1)}
  >
    →
  </button>
</div>
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
                {paginate(contacts, contactsPage).map((c) => (
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

            <div className="pagination">
  <button
    disabled={contactsPage === 1}
    onClick={() => setContactsPage((p) => p - 1)}
  >
    ←
  </button>

  <span>Page {contactsPage}</span>

  <button
    disabled={contactsPage * ITEMS_PER_PAGE >= contacts.length}
    onClick={() => setContactsPage((p) => p + 1)}
  >
    →
  </button>
</div>
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
          <select
        className="projects-filter"
        value={Filter}
        onChange={(e) => setFilter(e.target.value)}
      >
            <option value="">Tous</option>
            <option value="decoration">Decoration</option>
            <option value="construction">Construction</option>
            <option value="artisanat">Artisanat</option>
            <option value="export">Export</option>
            <option value="autre">Autre</option>
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
          {paginate(filteredProjects, projectsPage).map((project) => (
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

      <div className="pagination">
  <button
    disabled={projectsPage === 1}
    onClick={() => setProjectsPage((p) => p - 1)}
  >
    ←
  </button>

  <span>Page {projectsPage}</span>

  <button
    disabled={projectsPage * ITEMS_PER_PAGE >= filteredProjects.length}
    onClick={() => setProjectsPage((p) => p + 1)}
  >
    →
  </button>
</div>
    </div>
  </section>
)}

              {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Nouveau Projet</h2>

              <form onSubmit={handleSubmitProject}>
                <input
                  type="text"
                  name="name"
                  placeholder="Nom du projet"
                  value={newProject.name}
                  onChange={handleChange}
                  required
                />

                <select
                  name="type"
                  value={newProject.type}
                  onChange={handleChange}
                >
                  <option value="">Type</option>
                  <option value="decoration">Decoration</option>
                  <option value="construction">Construction</option>
                  <option value="artisanat">Artisanat</option>
                  <option value="export">Export</option>
                  <option value="autre">Autre</option>
                </select>

                <textarea
                  name="description"
                  placeholder="Description"
                  value={newProject.description}
                  onChange={handleChange}
                />

                <input
                  type="date"
                  name="allocated_date"
                  value={newProject.allocated_date}
                  onChange={handleChange}
                />

                <div className="modal-actions">
                  <button type="button" onClick={closeModal}>
                    Annuler
                  </button>
                  <button type="submit" className="btn-primary">
                    Ajoute
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
    </div>
  );
};

export default AdminDashboard;