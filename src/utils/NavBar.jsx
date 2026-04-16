import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.svg";
import QuoteModal from "./QuoteModal";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="logo" style={{ textDecoration: "none" }}>
        <img src={Logo} alt="" />
      </Link>

      <div className="nav-links">
        <Link to="/">Accueil</Link>
        <Link to="/about">Qui sommes-nous ?</Link>
        <Link to="/contact">Contact</Link>
      </div>

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