import React, { useState, useEffect } from 'react';
import './Navigation.css';
import zouLogo from '../../assets/nav/zouLogo.png';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    const phoneNumber = '5493512341463';
    const message = '¡Hola! Quiero solicitar una cotización para productos de packaging.';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Track conversion
    if (typeof gtag !== 'undefined') {
      gtag('event', 'whatsapp_click', {
        event_category: 'conversion',
        event_label: 'navigation_cta'
      });
    }
    
    window.open(whatsappUrl, '_blank');
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:+5493512341463';
  };

  return (
    <nav className={`zou-navigation ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-logo">
          <img src={zouLogo} alt="Zou Packaging" className="logo-image" />
          <span className="logo-text">Zou Packaging</span>
        </div>

        {/* Contact Info - Desktop */}
        <div className="nav-contact desktop-only">
          <div className="contact-item">
            <span className="contact-icon">📱</span>
            <span className="contact-text">351-234-1463</span>
          </div>
          <div className="contact-item">
            <span className="contact-icon">⏰</span>
            <span className="contact-text">Lun-Vie 8:30-18hs</span>
          </div>
        </div>

        {/* CTAs principales */}
        <div className="nav-actions">
          <button 
            className="phone-btn desktop-only"
            onClick={handlePhoneClick}
            aria-label="Llamar ahora"
          >
            <span className="btn-icon">📞</span>
            Llamar
          </button>
          
          <button 
            className="whatsapp-cta-btn"
            onClick={handleWhatsAppClick}
            aria-label="Cotizar por WhatsApp"
          >
            <span className="whatsapp-icon">💬</span>
            <span className="btn-text">
              <strong>Cotizar Ahora</strong>
              <small>Respuesta inmediata</small>
            </span>
          </button>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="scroll-progress">
        <div 
          className="progress-bar"
          style={{
            transform: `scaleX(${Math.min(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight), 1)})`
          }}
        ></div>
      </div>
    </nav>
  );
};

export default Navigation;