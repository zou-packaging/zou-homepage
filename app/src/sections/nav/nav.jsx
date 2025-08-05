import React, { useState } from 'react';
import './nav.css';
import zouLogo from '../../assets/nav/zouLogo.png';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-logo">
          <img src={zouLogo} alt="Zou Logo" className="logo-image" />
        </div>

        {/* Navigation Links */}
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <a href="#nosotros" className="nav-link">
              Nosotros
            </a>
          </li>
          <li className="nav-item">
            <a href="#productos" className="nav-link">
              Productos
            </a>
          </li>
          <li className="nav-item">
            <a href="#clientes" className="nav-link">
              Clientes
            </a>
          </li>
          <li className="nav-item">
            <a href="#contacto" className="nav-link">
              Contacto
            </a>
          </li>
        </ul>

        {/* CTA Button */}
        <div className="nav-cta">
          <button className="cta-button">
            Solicitar presupuesto
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="nav-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
