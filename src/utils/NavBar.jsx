import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo_1.svg";
import QuoteModal from "./QuoteModal";
import { ArrowBigDownDash as ArrowDown } from "lucide-react";
import {ArrowBigDown as Arrows} from "lucide-react";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 810);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 810);
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
      {currentPage.label} 
      {
        isDropdownOpen ? (
          <ArrowDown
  size={20}
  color="white"
  style={{
    backgroundColor: "orange",
    padding: "6px",
    borderRadius: "50%",
  }}
/>
         
  ) : (
          <Arrows size={20} />
        )
      }
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

    <button
      className="btn-primary"
      onClick={() => {
        setIsDropdownOpen(false); // optional: close the menu
        setIsModalOpen(true);
      }}
    >
      Demander un devis
    </button>
      </div>
     
    )}
 
  </div>
)}

      <button
        className={`btn-primary demander-devis ${isMobile ? "disabled" : ""} `}
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