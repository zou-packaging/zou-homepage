import React, { useState, useEffect, useCallback } from 'react';

const OptimizedNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [isOnline, setIsOnline] = useState(true);

  const phoneNumber = '5493512341463';

  // Arquitectura optimizada para B2B packaging (por aplicaciones)
  const navigationItems = [
    {
      id: 'inicio',
      label: 'Inicio',
      href: '#inicio',
      description: 'Packaging sustentable premium'
    },
    {
      id: 'productos',
      label: 'Productos',
      href: '#productos',
      description: 'Catálogo completo'
    },
    {
      id: 'nosotros',
      label: 'Nosotros',
      href: '#nosotros',
      description: 'Certificación ISO 9001'
    },
    {
      id: 'contacto',
      label: 'Contacto',
      href: '#contacto',
      description: 'Hablemos de tu proyecto'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Detectar sección activa para navegación inteligente
      const sections = ['inicio', 'productos', 'nosotros', 'contacto'];
      const current = sections.find(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current && current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  // Check business hours para status online
  useEffect(() => {
    const checkBusinessHours = () => {
      const now = new Date();
      const hour = now.getHours();
      const isBusinessHour = hour >= 9 && hour <= 18;
      const isWeekday = now.getDay() >= 1 && now.getDay() <= 5;
      setIsOnline(isBusinessHour && isWeekday);
    };
    
    checkBusinessHours();
    const interval = setInterval(checkBusinessHours, 60000);
    return () => clearInterval(interval);
  }, []);

  // Smooth scroll optimizado para Quality Score
  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      // Close mobile menu
      setIsMobileMenuOpen(false);
      
      // Smooth scroll con offset para header sticky
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Track navigation for analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'navigation_click', {
          event_category: 'navigation',
          event_label: targetId,
        });
      }
    }
  }, []);

  // WhatsApp contact optimizado
  const handleWhatsAppContact = useCallback(() => {
    const message = '🏢 Hola! Contacto desde su página web. Necesito información sobre packaging para mi empresa. ¿Pueden ayudarme?';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Enhanced tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'conversion', {
        send_to: 'AW-CONVERSION_ID/Navigation_WhatsApp',
        event_category: 'WhatsApp',
        event_label: 'header_contact',
        value: 1
      });
    }
    
    window.open(whatsappUrl, '_blank');
  }, [phoneNumber]);

  return (
    <>
      <nav className={`main-navigation ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          {/* Logo optimizado para brand recognition */}
          <div className="nav-logo">
            <button 
              onClick={(e) => handleNavClick(e, '#inicio')}
              className="logo-button"
              aria-label="Zou Packaging - Ir al inicio"
            >
              <div className="logo-text">
                <span className="logo-main">Zou</span>
              </div>
            </button>
          </div>

          {/* Navegación principal - Desktop */}
          <div className="nav-menu">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, item.href)}
                aria-label={`${item.label} - ${item.description}`}
              >
                <span className="nav-label">{item.label}</span>
              </button>
            ))}
          </div>

          {/* CTA principal en header */}
          <div className="nav-cta">
            <button 
              className="cta-button"
              onClick={handleWhatsAppContact}
              aria-label="Solicitar presupuesto por WhatsApp"
            >
              Solicitar presupuesto
            </button>
          </div>

          {/* Mobile menu button */}
          <button 
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-content">
            {/* CTA prominente en mobile */}
            <div className="mobile-cta">
              <button 
                className="mobile-cta-button"
                onClick={handleWhatsAppContact}
              >
                💬 Solicitar presupuesto
              </button>
            </div>

            {/* Navigation items */}
            <div className="mobile-nav-items">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  className={`mobile-nav-item ${activeSection === item.id ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  <span className="mobile-nav-label">{item.label}</span>
                  <span className="mobile-nav-desc">{item.description}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Overlay para mobile menu */}
        {isMobileMenuOpen && (
          <div 
            className="mobile-menu-overlay"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </nav>

      <style jsx>{`
        .main-navigation {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(79, 209, 199, 0.1);
          transition: all 0.3s ease;
        }

        .main-navigation.scrolled {
          background: rgba(255, 255, 255, 0.98);
          box-shadow: 0 2px 20px rgba(79, 209, 199, 0.1);
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 80px;
        }

        .nav-logo {
          flex-shrink: 0;
        }

        .logo-button {
          background: none;
          border: none;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .logo-button:hover {
          transform: scale(1.05);
        }

        .logo-text {
          display: flex;
          align-items: center;
        }

        .logo-main {
          font-size: 2rem;
          font-weight: 800;
          color: #4fd1c7;
          font-style: italic;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .nav-menu {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-item {
          background: none;
          border: none;
          padding: 12px 20px;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 500;
          color: #2d3748;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .nav-item:hover {
          background: #e6fffa;
          color: #4fd1c7;
        }

        .nav-item.active {
          color: #4fd1c7;
          font-weight: 600;
          background: #e6fffa;
        }

        .nav-cta {
          flex-shrink: 0;
        }

        .cta-button {
          background: #4fd1c7;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 50px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .cta-button:hover {
          background: #38b2ac;
          transform: translateY(-1px);
        }

        .mobile-menu-toggle {
          display: none;
          background: none;
          border: none;
          flex-direction: column;
          justify-content: space-between;
          width: 24px;
          height: 18px;
          cursor: pointer;
        }

        .hamburger-line {
          width: 100%;
          height: 2px;
          background: #2d3748;
          transition: all 0.3s ease;
          transform-origin: center;
        }

        .mobile-menu-toggle.open .hamburger-line:nth-child(1) {
          transform: rotate(45deg) translateY(8px);
        }

        .mobile-menu-toggle.open .hamburger-line:nth-child(2) {
          opacity: 0;
        }

        .mobile-menu-toggle.open .hamburger-line:nth-child(3) {
          transform: rotate(-45deg) translateY(-8px);
        }

        .mobile-menu {
          position: fixed;
          top: 80px;
          left: 0;
          right: 0;
          background: white;
          transform: translateY(-100%);
          transition: transform 0.3s ease;
          z-index: 99;
          max-height: calc(100vh - 80px);
          overflow-y: auto;
        }

        .mobile-menu.open {
          transform: translateY(0);
        }

        .mobile-menu-content {
          padding: 20px;
        }

        .mobile-cta {
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid #e6fffa;
        }

        .mobile-cta-button {
          width: 100%;
          background: #4fd1c7;
          color: white;
          border: none;
          padding: 16px;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .mobile-nav-items {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .mobile-nav-item {
          background: none;
          border: none;
          padding: 16px 12px;
          text-align: left;
          cursor: pointer;
          border-radius: 16px;
          transition: background 0.2s ease;
        }

        .mobile-nav-item:hover {
          background: #f0fdfa;
        }

        .mobile-nav-item.active {
          background: #e6fffa;
          border-left: 4px solid #4fd1c7;
        }

        .mobile-nav-label {
          display: block;
          font-weight: 600;
          color: #2d3748;
          font-size: 1rem;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .mobile-nav-desc {
          display: block;
          font-size: 0.85rem;
          color: #718096;
          margin-top: 2px;
        }

        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 98;
        }

        /* Typography */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .nav-menu,
          .nav-cta {
            display: none;
          }

          .mobile-menu-toggle {
            display: flex;
          }

          .nav-container {
            height: 70px;
            padding: 0 15px;
          }

          .logo-main {
            font-size: 1.7rem;
          }

          .mobile-menu {
            top: 70px;
            max-height: calc(100vh - 70px);
          }
        }
      `}</style>
    </>
  );
};

export default OptimizedNavigation;