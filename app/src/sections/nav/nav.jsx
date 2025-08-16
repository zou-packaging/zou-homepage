import React, { useState } from 'react';
import './nav.css';
import zouLogo from '../../assets/nav/zouLogo.png';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    if (isMenuOpen) {
      toggleMenu();
    }
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
            <a href="#nosotros" className="nav-link" onClick={handleNavClick}>
              Nosotros
            </a>
          </li>
          <li className="nav-item">
            <a href="#home" className="nav-link" onClick={handleNavClick}>
              Productos
            </a>
          </li>
          <li className="nav-item">
            <a href="#clientes" className="nav-link" onClick={handleNavClick}>
              Clientes
            </a>
          </li>
          <li className="nav-item">
            <a href="#contacto" className="nav-link" onClick={handleNavClick}>
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
