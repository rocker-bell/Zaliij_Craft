import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar">
    <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
      <div className="logo-icon"></div>
      <span>Zellige Artisan</span>
    </Link>

    <div className="nav-links">
      <Link to="/">Accueil</Link>
      <Link to="/about">Qui sommes-nous ?</Link>
      <Link to="/contact">Contact</Link>
    </div>

    <Link to="/contact">
      <button className="btn-quote-nav">Devis gratuit</button>
    </Link>
  </nav>
);

export default Navbar;