import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <Link
          to="/"
          className="navbar-brand"
          onClick={closeMenu}
        >
          Hi-Tech
        </Link>

        <button
          type="button"
          className={menuOpen ? 'hamburger open' : 'hamburger'}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div
          className={
            menuOpen
              ? 'navbar-links active'
              : 'navbar-links'
          }
        >
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>

          <Link to="/about" onClick={closeMenu}>
            About
          </Link>

          <Link to="/services" onClick={closeMenu}>
            Services
          </Link>

          <Link to="/portfolio" onClick={closeMenu}>
            Portfolio
          </Link>

          <Link to="/study-material" onClick={closeMenu}>
            Study Material
          </Link>

          <Link to="/contact" onClick={closeMenu}>
            Contact
          </Link>

          {/* Admin */}
          <Link
            to="/admin/login"
            className="admin-link"
            onClick={closeMenu}
          >
            Admin
          </Link>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;