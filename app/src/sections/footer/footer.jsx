import React from 'react';
import './footer.css';
import footerLogo from '../../assets/footer/footerLogo.png';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-content">
          {/* Logo y descripción */}
          <div className="footer-brand">
            <img src={footerLogo} alt="Zou" className="footer-logo-image" />
            <p className="footer-company">Zou Packaging</p>
          </div>
          
          {/* Contacto */}
          <div className="footer-contact">
            <h4 className="footer-title">Contacto</h4>
            <p>+3512341463</p>
          </div>
          
          {/* Redes sociales */}
          <div className="footer-social">
            <h4 className="footer-title">Seguinos!</h4>
            <div className="footer-social-icons">
              <a href="https://www.instagram.com/ZOU_PACKAGING/" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  <path d="m16.5 7.5.01 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2025 ZOU. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
