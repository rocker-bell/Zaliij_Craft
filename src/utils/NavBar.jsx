// import { useState } from "react";
// import { Link } from "react-router-dom";
// import Logo from "../assets/Logo_1.svg";
// import QuoteModal from "./QuoteModal";

// const Navbar = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const [isMobile, setisMobile] = useState(window.innerwidth < 768)


//   useState(() => {
//     const handleResize = () => {
//       setisMobile(window.innerWidth < 768);
//     }

//     window.addEventListener("resize", handleResize);

//     return () => window.removeEventListener("resize", handleResize);
//   }, [])

//   return (
//     <nav className="navbar">
//       <Link to="/" className="logo" style={{ textDecoration: "none" }}>
//         <img src={Logo} alt=""  className="logo_representative"/>
//           <p className="entreprise_nom_representative"> Zellige ArtTravaux</p>
//       </Link>

//       <div className="nav-links">
//         <Link className="navLink-link" to="/">Accueil</Link>
//         <Link  className="navLink-link" to="/about">Qui sommes-nous ?</Link>
//         <Link className="navLink-link" to="/contact">Contact</Link>
//       </div>

//       <button
//         className="btn-primary"
//         onClick={() => setIsModalOpen(true)}
//       >
//         Demander un devis
//       </button>

//       <QuoteModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//       />
//     </nav>
//   );
// };

// export default Navbar;


// import { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import Logo from "../assets/Logo_1.svg";
// import QuoteModal from "./QuoteModal";

// const Navbar = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Detect mobile
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

//   const location = useLocation();

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     window.addEventListener("resize", handleResize);

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Navigation items
//   const navItems = [
//     { label: "Accueil", path: "/" },
//     { label: "Qui sommes-nous ?", path: "/about" },
//     { label: "Contact", path: "/contact" },
//   ];

//   // Current selected page
//   const currentPage =
//     navItems.find((item) => item.path === location.pathname) || navItems[0];

//   return (
//     <nav className="navbar">
//       <Link to="/" className="logo" style={{ textDecoration: "none" }}>
//         <img src={Logo} alt="" className="logo_representative" />
//         <p className="entreprise_nom_representative">
//           Zellige ArtTravaux
//         </p>
//       </Link>

//       {/* Desktop Navigation */}
//       {!isMobile && (
//         <div className="nav-links">
//           {navItems.map((item) => (
//             <Link
//               key={item.path}
//               className="navLink-link"
//               to={item.path}
//             >
//               {item.label}
//             </Link>
//           ))}
//         </div>
//       )}

//       {/* Mobile Dropdown */}
//       {isMobile && (
//         <select
//           className="mobile-nav-dropdown"
//           value={currentPage.path}
//           onChange={(e) => {
//             window.location.href = e.target.value;
//           }}
//         >
//           {navItems.map((item) => (
//             <option key={item.path} value={item.path}>
//               {item.label}
//             </option>
//           ))}
//         </select>
//       )}

//       <button
//         className="btn-primary"
//         onClick={() => setIsModalOpen(true)}
//       >
//         Demander un devis
//       </button>

//       <QuoteModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//       />
//     </nav>
//   );
// };

// export default Navbar;


import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo_1.svg";
import QuoteModal from "./QuoteModal";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { label: "Accueil", path: "/" },
    { label: "Qui sommes-nous ?", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const currentPage =
    navItems.find((item) => item.path === location.pathname) || navItems[0];

  const handleNavigation = (path) => {
    navigate(path);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo" style={{ textDecoration: "none" }}>
        <img src={Logo} alt="" className="logo_representative" />
        <p className="entreprise_nom_representative">
          Zellige ArtTravaux
        </p>
      </Link>

      {/* Desktop Navigation */}
      {!isMobile && (
        <div className="nav-links">
          {navItems.map((item) => (
            <Link
              key={item.path}
              className="navLink-link"
              to={item.path}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}

      {/* Mobile Dropdown */}
      {/* {isMobile && (
        <div className="mobile-dropdown">
          <button
            className="mobile-dropdown-btn"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {currentPage.label} 
          </button>

          {isDropdownOpen && (
            <div className="mobile-dropdown-menu">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  className="mobile-dropdown-item"
                  onClick={() => handleNavigation(item.path)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )} */}

      {/* Mobile Dropdown */}
{isMobile && (
  <div
    className="mobile-dropdown"
    onMouseEnter={() => setIsDropdownOpen(true)}
    onMouseLeave={() => setIsDropdownOpen(false)}
  >
    <button
      className="mobile-dropdown-btn"
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
    >
      {currentPage.label} ▼
    </button>

    {isDropdownOpen && (
      <div className="mobile-dropdown-menu">
        {navItems.map((item) => (
          <button
            key={item.path}
            className="mobile-dropdown-item"
            onClick={() => handleNavigation(item.path)}
          >
            {item.label}
          </button>
        ))}
      </div>
    )}
  </div>
)}

      <button
        className="btn-primary"
        onClick={() => setIsModalOpen(true)}
      >
        Demander un devis
      </button>

      <QuoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </nav>
  );
};

export default Navbar;