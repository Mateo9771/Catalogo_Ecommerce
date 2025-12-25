// Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import HamburgerButton from "../Buttons/HamburgerButton/HamburgerButton";
import CartButton from "../Buttons/CartButton/CartButton";
import { useAuth } from "../../components/Context/AuthContext"; // Ajusta ruta
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    logout();
    toggleMenu();
    navigate("/");
  };

  // Evitar renderizado prematuro
  if (loading) return null;

  return (
    <>
    <nav className="navbar">
      <div className="container-navbar">
        <div>
          <Link to="/" className="catalogo-navbar">Catálogo</Link>
        </div>
        <CartButton />
        <HamburgerButton menuOpen={menuOpen} toggleMenu={toggleMenu} />
        
        <div className={`links-navbar ${menuOpen ? "open" : ""}`}>
          <Link to="/product" className="nav-link" onClick={toggleMenu}>
            Productos
          </Link>

          {/* BOTONES SEGÚN ESTADO */}
          {user?.role === 'admin' ? (
            <>
              <Link to="/admin/dashboard" className="nav-link" onClick={toggleMenu}>
                Panel Admin
              </Link>
              <button className="nav-link logout-btn" onClick={handleLogout}>
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link to="/admin" className="nav-link" onClick={toggleMenu}>
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
      {menuOpen && (
  <div 
    className="menu-overlay" 
    onClick={toggleMenu}
    style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(5,4,7,0.85)',
      backdropFilter: 'blur(8px)',
      zIndex: 998,
    }}
  />
)}
    </nav>
     {menuOpen && (
      <div 
        className="menu-overlay" 
        onClick={toggleMenu}
      />
    )}
    </>
  );
};

export default Navbar;