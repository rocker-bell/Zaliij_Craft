import React, { useEffect, useState } from "react";
import "../Styles/AdminDashboard.css";
import { useNavigate, Link } from "react-router-dom";
import supabase from "../utils/supabase";
import {useModal} from "../utils/ModalContext";
import StatistiquesChart from "./statistiquesChart";
import { Quote } from "lucide-react";
import { Contact } from "lucide-react";
import { Briefcase } from "lucide-react";
import { Flag } from "lucide-react";
import { ReceiptText } from "lucide-react";
import { ChartNoAxesCombined } from "lucide-react";
import { Trash } from "lucide-react";
import { MapPinned } from "lucide-react";
import { Activity } from "lucide-react";
import { BicepsFlexed } from "lucide-react";
const AdminDashboard = () => {
  const navigate = useNavigate();

  // -----------------------------
  // STATE
  // -----------------------------
  const [quotes, setQuotes] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [ActiveProjects, setActiveProject] = useState([]);
  const [workingHand, setWorkingHand] = useState([]);
  const [exports, setExports] = useState([]);
const [factures, setFactures] = useState([]);
const [statistiques, setStatistiques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("quotes");
  const [Filter, setFilter] = useState('');

  const [showModal, setShowModal] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chartData, setChartData] = useState(null);
const [barData, setBarData] = useState(null);
const [isWorkerModalOpen, setIsWorkerModalOpen] = useState(false);  


  const [workers, setWorkers] = useState([]);
  const [newProject, setNewProject] = useState({
    name: "",
    type: "",
    description: "",
    status: "nouveau",
    allocated_date: ""
  });



//   const handleAddNewWorker = () => {
//   if (!newWorker.full_name || !newWorker.age || !newWorker.occupation) {
//     alert("Please fill all fields");
//     return;
//   }

//   const workerToAdd = {
//     ...newWorker,
//     id: Date.now(), // temporary id
//   };

//   setWorkers((prev) => [...prev, workerToAdd]);

//   // reset form
//   setNewWorker({
//     full_name: "",
//     age: "",
//     occupation: "",
//     status: "active",
//   });

//   // close modal
//   setIsWorkerModalOpen(false);
// };

      const [selectedWorker, setSelectedWorker] = useState(null);
const [isEditModalOpen, setIsEditModalOpen] = useState(false);

const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
const [projectToAssign, setProjectToAssign] = useState(null);

  const handleAddNewWorker = async () => {
  if (!newWorker.full_name) {
    alert("Full name is required");
    return;
  }

  const { data, error } = await supabase
    .from("workers") // 👈 your table name
    .insert([
      {
        full_name: newWorker.full_name,
        age: newWorker.age ? parseInt(newWorker.age) : null,
        occupation: newWorker.occupation || null,
        status: newWorker.status || "active",
      },
    ])
    .select(); // returns inserted row

  if (error) {
    console.error("Insert error:", error.message);
    alert("Failed to add worker");
    return;
  }

  // update UI state with DB result
  setWorkers((prev) => [...prev, data[0]]);

  // reset form
  setNewWorker({
    full_name: "",
    age: "",
    occupation: "",
    status: "active",
  });

  setIsWorkerModalOpen(false);
};  

const openEditModal = (worker) => {
  setSelectedWorker(worker);
  setIsEditModalOpen(true);
};

const handleUpdateWorker = async () => {
  const { error } = await supabase
    .from("workers")
    .update({
      full_name: selectedWorker.full_name,
      age: selectedWorker.age,
      occupation: selectedWorker.occupation,
      status: selectedWorker.status,
    })
    .eq("id", selectedWorker.id);

  if (error) {
    console.error(error);
    return;
  }

  setWorkers((prev) =>
    prev.map((w) =>
      w.id === selectedWorker.id ? selectedWorker : w
    )
  );

  setIsEditModalOpen(false);
};

  const [newExport, setNewExport] = useState({
  client: "",
  product: "",
  country: "",
  amount: "",
  status: "pending",
});

const openAssignProjectModal = (worker) => {
  setSelectedWorker(worker);
  setIsProjectModalOpen(true);
};

const handleAssignProject = async (projectId) => {
  const project = projects.find((p) => p.id === projectId);

  const { error } = await supabase
    .from("workers")
    .update({
      project_id: projectId,
      project_name: project?.name, // optional
    })
    .eq("id", selectedWorker.id);

  if (error) {
    console.error(error);
    return;
  }

  setWorkers((prev) =>
    prev.map((w) =>
      w.id === selectedWorker.id
        ? {
            ...w,
            project_id: projectId,
            project_name: project?.name,
          }
        : w
    )
  );

  setIsProjectModalOpen(false);
};

const handleDeleteWorker = async (id) => {
  const { error } = await supabase
    .from("workers")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    return;
  }

  setWorkers((prev) => prev.filter((w) => w.id !== id));
};

    // const [ProjectStatus, setProjectStatus] = useState("")

  // Pagination


  const ITEMS_PER_PAGE = 5;

  const [quotesPage, setQuotesPage] = useState(1);
  const [contactsPage, setContactsPage] = useState(1);
  const [projectsPage, setProjectsPage] = useState(1);
  const [exportsPage, setexportsPage] = useState(1);
  const [facturesPage, setFacturesPage] = useState(1);
  const [statistiquesPage, setStatistiquesPage] = useState(1);
  const [ActiveProjectPage, setActiveProjectPage] = useState(1);
  const [workingHandPage, setWorkingHandPage] = useState(1);

    const paginate = (data, page) => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return data.slice(start, start + ITEMS_PER_PAGE);
  };

  const filteredProjects = Filter && Filter !== "Filter"
  ? projects.filter((p) => p.type === Filter)
  : projects;


  const [newWorker, setNewWorker] = useState({
  full_name: "",
  age: "",
  occupation: "",
  status: "active",
});

    // fake simulation


    // -----------------------------
// SIMULATION DATA
// -----------------------------
// const fakeExports = Array.from({ length: 12 }, (_, i) => ({
//   id: i + 1,
//   client: "Client " + (i + 1),
//   product: ["Tapis", "Zellige", "Bois"][i % 3],
//   country: ["France", "Espagne", "USA"][i % 3],
//   amount: Math.floor(Math.random() * 10000) + " €",
//   date: new Date().toISOString()
// }));

// const fakeFactures = Array.from({ length: 10 }, (_, i) => ({
//   id: i + 1,
//   client: "Client " + (i + 1),
//   total: Math.floor(Math.random() * 20000) + " MAD",
//   status: ["payée", "en attente", "annulée"][i % 3],
//   date: new Date().toISOString()
// }));

// const fakeStats = [
//   { label: "Total revenus", value: "120,000 MAD" },
//   { label: "Exports", value: "35" },
//   { label: "Factures payées", value: "22" },
//   { label: "Projets actifs", value: projects.length }
// ];

// setExports(fakeExports);
// setFactures(fakeFactures);
// setStatistiques(fakeStats);


useEffect(() => {
  // const fakeExports = Array.from({ length: 12 }, (_, i) => ({
  //   id: i + 1,
  //   client: "Client " + (i + 1),
  //   product: ["Tapis", "Zellige", "Bois"][i % 3],
  //   country: ["France", "Espagne", "USA"][i % 3],
  //   amount: Math.floor(Math.random() * 10000) + " €",
  //   date: new Date().toISOString()
  // }));

  const fakeFactures = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    client: "Client " + (i + 1),
    total: Math.floor(Math.random() * 20000) + " MAD",
    status: ["payée", "en attente", "annulée"][i % 3],
    date: new Date().toISOString()
  }));

  // const fakeStats = [
  //   { label: "Total revenus", value: "120,000 MAD" },
  //   { label: "Exports", value: "35" },
  //   { label: "Factures payées", value: "22" },
  //   { label: "Projets actifs", value: projects.length }
  // ];

  // setExports(fakeExports);
  setFactures(fakeFactures);
  // setStatistiques(fakeStats);
}, []); // ← IMPORTANT


  // -----------------------------
  // FETCH DATA
  // -----------------------------
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);

//       const { data: quotesData, error: quotesError } = await supabase
//         .from("quotes")
//         .select("*")
//         .order("id", { ascending: false });

//       const { data: contactsData, error: contactsError } = await supabase
//         .from("contactus")
//         .select("*")
//         .order("id", { ascending: false });

//       const {data: projectsData, error: projectsError} = await supabase
//         .from("projects")
//         .select("*")
//         .order("id", {ascending:false});

//       const {data: exportsData, error: exportsError} = await supabase
//         .from("exports")
//         .select("*")
//         .order("created_at", {ascending: false});
      

//       if (!quotesError) setQuotes(quotesData || []);
//       if (!contactsError) setContacts(contactsData || []);
//       if (!projectsError) setProjects(projectsData || []);
//       if (!exportsError) setExports(exportsData || []);

//       console.log("exportsData:", exportsData);
// console.log("exportsError:", exportsError);

//       setLoading(false);
//     };

//     fetchData();
//   }, []);


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


// async function changeProjectStatus(projectId, ProjectStatus) {
//   const { data, error } = await supabase
//     .from("projects")
//     .update({ status: ProjectStatus })
//     .eq("id", projectId);

//   if (error) {
//     console.error(error);
//   }
// }


async function changeProjectStatus(projectId, status) {
  const { error } = await supabase
    .from("projects")
    .update({ status })
    .eq("id", projectId);

  if (error) {
    console.error(error);
    return;
  }

  // ✅ update UI instantly
  setProjects((prev) =>
    prev.map((p) =>
      p.id === projectId ? { ...p, status } : p
    )
  );
}



   // -----------------------------
  // Project Status change
  // -----------------------------
//   useEffect(() => {
//   if (ProjectStatus) {
//     changeProjectStatus(project.id, ProjectStatus);
//   }
// }, [project.id, ProjectStatus]);


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

// Handle delete project


async function handleDeleteProject(projectId) {
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", projectId);

  if (error) {
    console.error("Delete error:", error);
    alert("Failed to delete project");
    return;
  }

  // ✅ Remove from UI instantly
  setProjects((prev) => prev.filter((p) => p.id !== projectId));
}


// async function handleAddNewExport() {
//   alert('Ajouter new export')
// }

async function handleAddNewExport() {
  const { error } = await supabase
    .from("exports")
    .insert([newExport]);

  if (error) {
    console.error(error);
    return;
  }

  setExports((prev) => [...prev, newExport]);

    setNewExport({
       client: "",
  product: "",
  country: "",
  amount: "",
  status: "",
    })


     



  showToast('success', 'export enregistrer avec success')
  setTimeout(() => {
      setIsModalOpen(false)
  },7000)
  
}


async function changeExportsStatus(exportId, status) {
  console.log('exportId', exportId)
  console.log('status', status)
  const { error } = await supabase
    .from("exports")
    .update({ status })
    .eq("id", exportId);

  if (error) {
    console.error(error);
    return;
  }

  // update UI instantly
  setExports((prev) =>
    prev.map((item) =>
      item.id === exportId ? { ...item, status } : item
    )
  );

  
}

const Orderexportdetails = (orderId) => {
  navigate(`/Order/${orderId}`)
}

  // const handleNewProject = () => {
  //   alert("new project click")
  // }


  useEffect(() => {
  let interval;

  const fetchData = async () => {
    setLoading(true);

    const { data: quotesData } = await supabase
      .from("quotes")
      .select("*")
      .order("id", { ascending: false });

    const { data: contactsData } = await supabase
      .from("contactus")
      .select("*")
      .order("id", { ascending: false });

    const { data: projectsData } = await supabase
      .from("projects")
      .select("*")
      .order("id", { ascending: false });

    const { data: exportsData } = await supabase
      .from("exports")
      .select("*")
      .order("created_at", { ascending: false });

    const { data: workersData } = await supabase
      .from("workers")
      .select("*")
      .order("created_at", { ascending: false });

    if (quotesData) setQuotes(quotesData);
    if (contactsData) setContacts(contactsData);
    if (projectsData) setProjects(projectsData);
    if (exportsData) setExports(exportsData);
    if (workersData) setWorkers(workersData);

    setLoading(false);
  };

  fetchData(); // initial load

  interval = setInterval(() => {
    fetchData(); // auto refresh
  }, 10000);

  return () => clearInterval(interval);
}, []);


useEffect(() => {
  const totalQuotes = quotes.length;
  const totalProjects = projects.length;
  const totalExports = exports.length;
  const totalContacts = contacts.length;

  setChartData({
    labels: ["Quotes", "Projects", "Exports", "Contacts"],
    datasets: [
      {
        data: [totalQuotes, totalProjects, totalExports, totalContacts],
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
      },
    ],
  });

  setBarData({
    labels: ["Quotes", "Projects", "Exports", "Contacts"],
    datasets: [
      {
        label: "Activity",
        data: [totalQuotes, totalProjects, totalExports, totalContacts],
        backgroundColor: "#6366f1",
      },
    ],
  });
}, [quotes, projects, exports, contacts]);

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
          className={`AdminDashboard-sidebar-actions ${activeTab === "quotes" ? "tab active" : "tab"}`}
          onClick={() => {setActiveTab("quotes"); setQuotesPage(1)}}
          
        >
          <Quote size={25} color="#4f46e5" strokeWidth={1.5} />
          
             <span className="AdminDashboarrd-sidebar-title">Quotes ({quotes.length})</span>
        </button>

        <button
          className={`AdminDashboard-sidebar-actions ${activeTab === "contacts" ? "tab active" : "tab"}`}
          onClick={() => {setActiveTab("contacts"); setContactsPage(1)}}
        >
          <Contact size={25} color="#4f46e5" strokeWidth={1.5} /> <span className="AdminDashboarrd-sidebar-title"> Contacts  ({contacts.length})</span>
        </button>

          <button
          className={`AdminDashboard-sidebar-actions ${activeTab === "projects" ? "tab active" : "tab"}`}
          onClick={() => {setActiveTab("projects"), setProjectsPage(1)}}
        >
          <Briefcase size={25} color="#4f46e5" strokeWidth={1.5} /> <span className="AdminDashboarrd-sidebar-title">Projects({projects.length})</span>
        </button>


        <button
          className={`AdminDashboard-sidebar-actions ${activeTab === "Projet en cours" ? "tab active" : "tab"}`}
          onClick={() => {setActiveTab("Projet en cours"), setActiveProjectPage(1)}}
        >
          <Activity size={25} color="#4f46e5" strokeWidth={1.5} /> <span className="AdminDashboarrd-sidebar-title">Project en cours({projects.length})</span>
        </button>

        <button
          className={`AdminDashboard-sidebar-actions ${activeTab === "main d'oevre" ? "tab active" : "tab"}`}
          onClick={() => {setActiveTab("main d'oevre"), setWorkingHandPage(1)}}
        >
          <BicepsFlexed size={25} color="#4f46e5" strokeWidth={1.5} /> <span className="AdminDashboarrd-sidebar-title">main d'oevre({projects.length})</span>
        </button>

         <button
          className={`AdminDashboard-sidebar-actions ${activeTab === "exports" ? "tab active" : "tab"}`}
          onClick={() => {setActiveTab("exports"); setexportsPage(1)}}
        >
          
          <Flag size={25} color="#4f46e5" strokeWidth={1.5} /> <span className="AdminDashboarrd-sidebar-title">exports({exports.length})</span>
        </button>

         <button
          className={`AdminDashboard-sidebar-actions  ${activeTab === "factures" ? "tab active" : "tab"}`}
          onClick={() => {setActiveTab("factures"); setFacturesPage(1)}}

        >
          <ReceiptText size={25} color="#4f46e5" strokeWidth={1.5} />  <span className="AdminDashboarrd-sidebar-title" >factures({factures.length}) </span> 
        </button>
        <button
          className={`AdminDashboard-sidebar-actions ${activeTab === "statistiques" ? "tab active" : "tab"}`}
          onClick={() => {setActiveTab("statistiques"); setStatistiquesPage(1)}}
        >
          <ChartNoAxesCombined size={25} color="#4f46e5" strokeWidth={1.5} /> <span className="AdminDashboarrd-sidebar-title"> statistiques({statistiques.length}) </span>
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
                  {/* <th>ACTIONS</th> */}
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

                    {/* <td className="actions-cell">
                      <button className="btn-view">👁️</button>
                      <button className="btn-delete">🗑️</button>
                    </td> */}
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
                <div className="Project-actions">
                                      {/* <select
                                        value={ProjectStatus}
                                        onChange={(e) => {
                                          const value = e.target.value;
                                          setProjectStatus(value);
                                          changeProjectStatus(project.id, value);
                                        }}
                                      >

                          <option value="nouveau">nouveau</option>
                          <option value="termine">termine</option>
                          <option value="en_cours">en_cours</option>
                          <option value="annuler">annuler</option>

                </select> */}

                                <select
                  value={project.status || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    changeProjectStatus(project.id, value);
                  }}
                >
                  <option value="nouveau">nouveau</option>
                  <option value="termine">termine</option>
                  <option value="en_cours">en_cours</option>
                  <option value="annuler">annuler</option>
                </select>
                                      
                </div>
                               <button
  className="btn-delete"
  onClick={() => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (confirmed) {
      handleDeleteProject(project.id);
    }
  }}
>
  <Trash />
</button>
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

            {activeTab === "exports" && (
  <section className="section">
    <div className="exports-tab-header">
      <h2>Exports</h2>
      <button className="btn-add-export" onClick={(e) => setIsModalOpen(true)}>Ajouter Export</button>
    </div>

    {/* <table className="devis-table">
      <thead>
        <tr>
          <th>Client</th>
          <th>Produit</th>
          <th>Pays</th>

          <th>Montant</th>
          <th>Date</th>
          <th>status</th>
          <th>actions</th>
        </tr>
      </thead>

      <tbody>
        {paginate(exports, exportsPage).map((e) => (
          <tr key={e.id}>
            <td>{e.client}</td>
            <td>{e.product}</td>
            <td>{e.country}</td>
            <td>{e.amount}</td>
            <td>{new Date(e.date).toLocaleDateString()}</td>
          </tr>
        ))}

        {isModalOpen && (
  <div className="modal-overlay">
    <div className="modal-content">
      
      <h2>Add New Export</h2>

      <input placeholder="Client" />
      <input placeholder="Produit" />
      <input placeholder="Pays" />
      <input placeholder="Montant" />

      <div className="modal-actions">
        <button onClick={() => setIsModalOpen(false)}>
          Cancel
        </button>

        <button onClick={handleAddNewExport}>
          Save
        </button>
      </div>

    </div>
  </div>
)}
      </tbody>
    </table> */}
    <table className="devis-table">
  <thead>
    <tr>
      <th>Client</th>
      <th>Produit</th>
      <th>Pays</th>
      <th>Montant</th>
      <th>Date</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  </thead>

  <tbody>
    {paginate(exports, exportsPage).map((exportOrder) => (
      <tr key={exportOrder.id}>
        <td>{exportOrder.client}</td>
        <td>{exportOrder.product}</td>
        <td>{exportOrder.country}</td>
        <td>{exportOrder.amount}</td>
        <td>{new Date(exportOrder.created_at).toLocaleDateString()}</td>
        <td>{exportOrder.status}</td>
        <td className="centered-td">
              {/* <select name="" id="">
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
              </select> */}
                    <select
                  value={exportOrder.status || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    changeExportsStatus(exportOrder.id, value);
                  }}
                >
                  <option value="pending">pending</option>
                  <option value="en_route">en route</option>
                  <option value="a_la_diwan">a la diwan</option>
                  <option value="chez_la_poste">chez_la_poste</option>
                </select>


              
                  <MapPinned className="MapPinned"  onClick={() => Orderexportdetails(exportOrder.id)}/>
              

        </td>
      </tr>
    ))}
  </tbody>
</table>
        

  </section>
)}



{activeTab === "factures" && (
  <section className="section">
    <h2>Factures</h2>

    <table className="devis-table">
      <thead>
        <tr>
          <th>Client</th>
          <th>Total</th>
          <th>Status</th>
          <th>Date</th>
        </tr>
      </thead>

      <tbody>
        {paginate(factures, facturesPage).map((f) => (
          <tr key={f.id}>
            <td>{f.client}</td>
            <td>{f.total}</td>
            <td>
              <span className={`status-badge ${f.status}`}>
                {f.status}
              </span>
            </td>
            <td>{new Date(f.date).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
)}


{activeTab === "main d'oevre" && (
  <section className="section">
    <div className="workinghand-header">
    <h2>main d'oevre</h2>
    <button className="btn-add-workinghand" onClick={(e) => setIsWorkerModalOpen(true)}>Ajouter main d'oevre</button>
      </div>
    <table className="devis-table">
      <thead>
        <tr>
          <th>nom complet</th>
          <th>age</th>
          <th>occupation</th>
          <th>status</th>
          <th>projet associer</th>
          <th>actions</th>
          
          
        </tr>
      </thead>

     <tbody>
  {workers.map((w, i) => (
    <tr key={i}>
      <td>{w.full_name}</td>
      <td>{w.age}</td>
      <td>{w.occupation}</td>
      <td>{w.status}</td>
      <td>{w.project_name}</td>
      {/* <td>
            <button>edit</button>
            <button>delete</button>
            <button>associer projet</button>
      </td> */}
      <td>
  <button onClick={() => openEditModal(w)}>Edit</button>

  <button onClick={() => handleDeleteWorker(w.id)}>
    Delete
  </button>

  <button onClick={() => openAssignProjectModal(w)}>
    Associer projet
  </button>
</td>
    </tr>
  ))}
</tbody>
    </table>
  </section>
)}


{/* {activeTab === "Projet en cours" && (
  <section className="section">
    <h2>projets en cours</h2>

    <table className="devis-table">
      <thead>
        <tr>
          <th>Client posilobi</th>
          
        </tr>
      </thead>

      <tbody>
        <td>test batobit</td>
      </tbody>
    </table>
  </section>
)} */}

{activeTab === "Projet en cours" && (
  <section className="section">
    <h2>Projets en cours</h2>

    <table className="devis-table">
      <thead>
        <tr>
          <th>Nom du projet</th>
          <th>Type</th>
          <th>Description</th>
          <th>date d'innitiation</th>
          <th>Date allouée</th>
          <th>status</th>
          {/* <th>action</th> */}
        </tr>
      </thead>

      <tbody>
  {paginate(
    projects.filter((p) => p.status === "en_cours"),
    ActiveProjectPage
  ).map((project) => (
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

      {/* <td className="actions-cell">
        <div className="Project-actions">
          <select
            value={project.status || ""}
            onChange={(e) => {
              changeProjectStatus(project.id, e.target.value);
            }}
          >
            <option value="nouveau">nouveau</option>
            <option value="termine">termine</option>
            <option value="en_cours">en_cours</option>
            <option value="annuler">annuler</option>
          </select>
        </div>

       
      </td> */}
    </tr>
  ))}
</tbody>
    </table>
     <div className="pagination">
  <button
    disabled={projectsPage === 1}
    onClick={() => setActiveProjectPage((p) => p - 1)}
  >
    ←
  </button>

  <span>Page {ActiveProjectPage}</span>

  <button
    disabled={projectsPage * ITEMS_PER_PAGE >= filteredProjects.length}
    onClick={() => setActiveProjectPage((p) => p + 1)}
  >
    →
  </button>
</div>
  </section>
)}

{/* {activeTab === "statistiques" && (
  <section className="section">
    <h2>Statistiques</h2>

    <div className="stats-grid">
      {statistiques.map((s, i) => (
        <div key={i} className="stat-card-admin">
          <p>{s.label}</p>
          <h2>{s.value}</h2>
        </div>
      ))}
    </div>
  </section>
)} */}

{activeTab === "statistiques" && (
  <section className="section">
    <h2>Statistiques</h2>

    {/* <StatistiquesChart
      pieData={chartData}
      barData={revenueData}
    /> */}
    <StatistiquesChart
  pieData={chartData}
  barData={barData}
/>
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



        {isModalOpen && (
  <div className="modal-overlay">
    <div className="modal">

      <h2>Add New Export</h2>

      <input
        placeholder="Client"
        value={newExport.client}
        onChange={(e) =>
          setNewExport({ ...newExport, client: e.target.value })
        }
      />

      <input
        placeholder="Produit"
        value={newExport.product}
        onChange={(e) =>
          setNewExport({ ...newExport, product: e.target.value })
        }
      />

      <input
        placeholder="Pays"
        value={newExport.country}
        onChange={(e) =>
          setNewExport({ ...newExport, country: e.target.value })
        }
      />

      <input
        placeholder="Montant"
        type="number"
        value={newExport.amount}
        onChange={(e) =>
          setNewExport({ ...newExport, amount: e.target.value })
        }
      />

      <div className="modal-actions">
        <button className="cancel-export" onClick={() => setIsModalOpen(false)}>
          Cancel
        </button>

        <button className="btn-primary" onClick={handleAddNewExport}>
          Save
        </button>
      </div>

    </div>
  </div>
)}

{isWorkerModalOpen && (
  <div className="modal-overlay">
    <div className="modal">

      <h2>Add New Worker</h2>

      <input
        placeholder="Nom complet"
        value={newWorker.full_name}
        onChange={(e) =>
          setNewWorker({ ...newWorker, full_name: e.target.value })
        }
      />

      <input
        placeholder="Age"
        type="number"
        value={newWorker.age}
        onChange={(e) =>
          setNewWorker({ ...newWorker, age: e.target.value })
        }
      />

      <input
        placeholder="Occupation"
        value={newWorker.occupation}
        onChange={(e) =>
          setNewWorker({ ...newWorker, occupation: e.target.value })
        }
      />

      <select
        value={newWorker.status}
        onChange={(e) =>
          setNewWorker({ ...newWorker, status: e.target.value })
        }
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="on_leave">En Vacances</option>
      </select>

      <div className="modal-actions">
        <button
          className="cancel-export"
          onClick={() => setIsWorkerModalOpen(false)}
        >
          Cancel
        </button>

        <button className="btn-primary" onClick={handleAddNewWorker}>
          Save
        </button>
      </div>

    </div>
  </div>
)}

        {isEditModalOpen && selectedWorker && (
  <div className="modal-overlay">
    <div className="modal">

      <h2>Edit Worker</h2>

      <input
        value={selectedWorker.full_name}
        onChange={(e) =>
          setSelectedWorker({
            ...selectedWorker,
            full_name: e.target.value,
          })
        }
      />

      <input
        type="number"
        value={selectedWorker.age}
        onChange={(e) =>
          setSelectedWorker({
            ...selectedWorker,
            age: e.target.value,
          })
        }
      />

      <input
        value={selectedWorker.occupation}
        onChange={(e) =>
          setSelectedWorker({
            ...selectedWorker,
            occupation: e.target.value,
          })
        }
      />

      <select
        value={selectedWorker.status}
        onChange={(e) =>
          setSelectedWorker({
            ...selectedWorker,
            status: e.target.value,
          })
        }
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="on_leave">On leave</option>
      </select>

      <button onClick={handleUpdateWorker}>Save</button>
      <button onClick={() => setIsEditModalOpen(false)}>
        Cancel
      </button>

    </div>
  </div>
)}

{isProjectModalOpen && selectedWorker && (
  <div className="modal-overlay">
    <div className="modal">

      <h2>Associer projet</h2>

      <select
        onChange={(e) => handleAssignProject(e.target.value)}
      >
        <option value="">Select project</option>

        {projects.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      <button onClick={() => setIsProjectModalOpen(false)}>
        Cancel
      </button>

    </div>
  </div>
)}
    </div>
  );
};

export default AdminDashboard;