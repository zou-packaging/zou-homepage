import React, { useState, useEffect, useCallback } from 'react';

// Navbar dinámico elegante (transformado desde ElegantPromoBanner)
const ElegantPromoBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const phoneNumber = '5493512341463';

  // Secciones dinámicas del navbar con rotación
  const navSections = [
    {
      icon: '✨',
      title: 'Diseño personalizado',
      subtitle: 'Tu marca, nuestra experiencia',
      cta: 'Solicitar presupuesto',
      bgGradient: 'linear-gradient(135deg, #FF9A8A, #FFA726)',
      message: '✨ Hola! Me interesa el diseño personalizado para mi marca. ¿Podrían ayudarme con un presupuesto?',
      link: '#categorias'
    },
    {
      icon: '🌱',
      title: 'Packaging sustentable',
      subtitle: 'Cuidamos el planeta juntos',
      cta: 'Ver opciones eco',
      bgGradient: 'linear-gradient(135deg, #81C784, #4FD1C7)',
      message: '🌱 Hola! Me interesa conocer sus opciones de packaging sustentable. ¿Pueden mostrarme las alternativas eco?',
      link: '#valor'
    },
    {
      icon: '🎯',
      title: 'Consultoría gratuita',
      subtitle: 'Te asesoramos sin compromiso',
      cta: 'Agendar llamada',
      bgGradient: 'linear-gradient(135deg, #F48FB1, #EC407A)',
      message: '🎯 Hola! Me interesa la consultoría gratuita. ¿Podríamos agendar una llamada para hablar de mi proyecto?',
      link: '#nosotros'
    }
  ];

  // Menú tradicional siempre visible
  const menuItems = [
    { label: 'Inicio', link: '#inicio' },
    { label: 'Productos', link: '#categorias' },
    { label: 'Nosotros', link: '#nosotros' },
    { label: 'Contacto', link: '#contacto' }
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Rotar secciones cada 10 segundos
    const rotateTimer = setInterval(() => {
      setCurrentSection((prev) => (prev + 1) % navSections.length);
    }, 10000);

    return () => {
      clearInterval(rotateTimer);
    };
  }, []);

  // Accesibilidad: cerrar con ESC
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleSectionClick = useCallback(() => {
    const section = navSections[currentSection];
    const encodedMessage = encodeURIComponent(section.message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Tracking navbar dinámico
    if (typeof gtag !== 'undefined') {
      gtag('event', 'conversion', {
        send_to: 'AW-CONVERSION_ID/Dynamic_Navbar_Click',
        event_category: 'Navigation',
        event_label: `nav_section_${currentSection + 1}`,
        value: 1,
        currency: 'ARS'
      });
    }
    
    window.open(whatsappUrl, '_blank');
  }, [currentSection, phoneNumber]);


  const handleMenuClick = useCallback((link) => {
    const element = document.querySelector(link);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  if (!isVisible) return null;

  const currentSectionData = navSections[currentSection];

  return (
    <nav className="elegant-navbar">
      <div className="navbar-background">
        <div className="navbar-overlay"></div>
      </div>
      
      <div className="navbar-content">
        {/* Logo */}
        <div className="navbar-logo">
          <span className="logo-text">Zou</span>
          <span className="logo-subtitle">Packaging</span>
        </div>
        
        {/* Botón hamburguesa (solo móviles) */}
        <button
          className="navbar-hamburger"
          aria-label="Abrir menú"
          onClick={() => setDrawerOpen(true)}
        >
          <span className="hamburger-icon">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
        
        {/* Menú tradicional (desktop) */}
        <div className="navbar-menu">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="menu-item"
              onClick={() => handleMenuClick(item.link)}
            >
              {item.label}
            </button>
          ))}
        </div>
        
        {/* Sección dinámica rotativa */}
        <div className="navbar-dynamic">
          <div className="dynamic-left">
            <div className="dynamic-icon">
              <span className="section-emoji">{currentSectionData.icon}</span>
            </div>
            
            <div className="dynamic-text">
              <h3 className="dynamic-title">{currentSectionData.title}</h3>
              <p className="dynamic-subtitle">{currentSectionData.subtitle}</p>
            </div>
          </div>
          
          <div className="navbar-actions">
            <button 
              className="navbar-cta"
              onClick={handleSectionClick}
              style={{ background: currentSectionData.bgGradient }}
            >
              <span className="cta-text">{currentSectionData.cta}</span>
              <span className="cta-arrow">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Drawer lateral para móviles */}
      {drawerOpen && (
        <div
          className="navbar-drawer-overlay"
          onClick={() => setDrawerOpen(false)}
        />
      )}
      <aside className={`navbar-drawer${drawerOpen ? ' open' : ''}`}>
        <button
          className="drawer-close"
          aria-label="Cerrar menú"
          onClick={() => setDrawerOpen(false)}
        >
          &times;
        </button>
        <div className="drawer-scroll">
          <div className="drawer-logo">
            <span className="logo-text">Zou</span>
            <span className="logo-subtitle">Packaging</span>
          </div>
          <div className="drawer-menu">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className="drawer-menu-item"
                onClick={() => {
                  handleMenuClick(item.link);
                  setDrawerOpen(false);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="drawer-sections">
            {navSections.map((section, idx) => (
              <div key={idx} className="drawer-section">
                <span className="drawer-section-icon">{section.icon}</span>
                <div className="drawer-section-text">
                  <span className="drawer-section-title">{section.title}</span>
                  <span className="drawer-section-subtitle">{section.subtitle}</span>
                </div>
                <button
                  className="drawer-section-cta"
                  style={{ background: section.bgGradient }}
                  onClick={() => {
                    const encodedMessage = encodeURIComponent(section.message);
                    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
                    window.open(whatsappUrl, '_blank');
                    setDrawerOpen(false);
                  }}
                >
                  {section.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <style jsx>{`
        .elegant-navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          height: 90px;
          overflow: hidden;
          animation: slideDown 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }
        
        .navbar-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
        }
        
        .navbar-background::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url('/src/assets/packaging-banner.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          z-index: 1;
        }

        .navbar-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.97) 0%,
            rgba(255, 248, 240, 0.95) 25%,
            rgba(252, 228, 236, 0.95) 50%,
            rgba(240, 248, 255, 0.97) 100%
          );
          z-index: 2;
          backdrop-filter: blur(2px);
        }
        
        .navbar-content {
          position: relative;
          z-index: 3;
          max-width: 1200px;
          margin: 0 auto;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          gap: 40px;
        }
        
        .navbar-logo {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          flex-shrink: 0;
        }
        
        .logo-text {
          font-size: 1.8rem;
          font-weight: 800;
          color: #4fd1c7;
          line-height: 1;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        .logo-subtitle {
          font-size: 0.7rem;
          font-weight: 600;
          color: #64748b;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        .navbar-menu {
          display: flex;
          gap: 32px;
          flex-shrink: 0;
        }

        /* Botón hamburguesa */
        .navbar-hamburger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          position: absolute;
          right: calc(16px + env(safe-area-inset-right, 0px));
          top: 50%;
          transform: translateY(-50%);
          z-index: 4;
        }
        .hamburger-icon {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .hamburger-icon span {
          display: block;
          width: 28px;
          height: 3px;
          background: #4fd1c7;
          border-radius: 2px;
        }
        
        .menu-item {
          background: none;
          border: none;
          color: #4a5568;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          padding: 8px 16px;
          border-radius: 20px;
          transition: all 0.3s ease;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        .menu-item:hover {
          background: rgba(79, 209, 199, 0.1);
          color: #4fd1c7;
          transform: translateY(-1px);
        }
        
        .navbar-dynamic {
          display: flex;
          align-items: center;
          gap: 20px;
          flex: 1;
          max-width: 500px;
        }
        
        .dynamic-left {
          display: flex;
          align-items: center;
          gap: 16px;
          flex: 1;
        }
        
        .dynamic-icon {
          width: 48px;
          height: 48px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          flex-shrink: 0;
        }
        
        .section-emoji {
          font-size: 1.5rem;
          animation: float 3s ease-in-out infinite;
        }
        
        .dynamic-text {
          min-width: 0;
          flex: 1;
        }
        
        .dynamic-title {
          font-size: 1rem;
          font-weight: 700;
          margin: 0 0 2px 0;
          color: #2d3748;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .dynamic-subtitle {
          font-size: 0.8rem;
          margin: 0;
          opacity: 0.8;
          color: #64748b;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .navbar-actions {
          flex-shrink: 0;
        }

        /* Drawer lateral */
        .navbar-drawer {
          position: fixed;
          top: 0;
          left: 0;
          width: 82vw;
          max-width: 360px;
          height: 100vh;
          background: #ffffff;
          box-shadow: 2px 0 20px rgba(0,0,0,0.12);
          z-index: 2000;
          transform: translateX(-100%);
          transition: transform 0.28s cubic-bezier(.4,0,.2,1);
          display: flex;
          flex-direction: column;
          padding-top: calc(env(safe-area-inset-top, 0px) + 8px);
          box-sizing: border-box;
        }
        .navbar-drawer.open {
          transform: translateX(0);
        }
        .navbar-drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.18);
          z-index: 1999;
        }
        .drawer-close {
          background: none;
          border: none;
          font-size: 2rem;
          color: #4fd1c7;
          align-self: flex-end;
          cursor: pointer;
          padding: 8px 16px;
        }
        .drawer-scroll { overflow-y: auto; padding: 0 16px 16px 16px; }
        .drawer-logo {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin: 4px 0 16px 0;
        }
        .drawer-menu {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
        }
        .drawer-menu-item {
          background: none;
          border: none;
          color: #1f2937;
          font-size: 1.05rem;
          font-weight: 600;
          cursor: pointer;
          padding: 10px 8px;
          border-radius: 8px;
          text-align: left;
          transition: background 0.2s;
        }
        .drawer-menu-item:hover {
          background: rgba(79, 209, 199, 0.1);
          color: #0f766e;
        }
        .drawer-sections {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .drawer-section {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          gap: 8px;
          padding: 12px 10px;
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 12px;
        }
        .drawer-section-icon { display: none; }
        .drawer-section-text { flex: 1; display: flex; flex-direction: column; order: 1; }
        .drawer-section-title { font-weight: 800; font-size: 1.05rem; color: #111827; margin: 0; }
        .drawer-section-subtitle { font-size: 0.9rem; color: #6b7280; margin-top: 2px; }
        .drawer-section-cta {
          background: linear-gradient(135deg, #FF9A8A, #FFA726);
          color: #fff;
          border: none;
          padding: 6px 12px;
          border-radius: 16px;
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          transition: background 0.2s;
          white-space: nowrap;
          order: 2;
          align-self: flex-start;
          margin-top: 4px;
        }
        .drawer-section-cta:hover {
          background: linear-gradient(135deg, #FFA726, #FF9A8A);
        }
        
        .navbar-cta {
          background: linear-gradient(135deg, #FF9A8A, #FFA726);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 25px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(255, 154, 138, 0.3);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          min-height: 44px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        .navbar-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(255, 154, 138, 0.4);
        }
        
        .cta-arrow {
          font-size: 1rem;
          transition: transform 0.3s ease;
        }
        
        .navbar-cta:hover .cta-arrow {
          transform: translateX(2px);
        }
        
        /* Animaciones */
        @keyframes slideDown {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px); 
          }
          50% { 
            transform: translateY(-3px); 
          }
        }
        
        /* Typography */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        
        /* Mobile Optimization */
        @media (max-width: 1024px) {
          .navbar-menu {
            display: none;
          }
          .navbar-hamburger { display: block; }
          
          .navbar-content {
            gap: 20px;
          }
        }
        
        @media (max-width: 768px) {
          .elegant-navbar {
            height: 110px;
          }
          
          .navbar-content {
            padding: 0 16px;
            flex-direction: column;
            justify-content: center;
            text-align: center;
            gap: 12px;
          }
          
          .navbar-dynamic {
            flex-direction: column;
            gap: 12px;
            max-width: 100%;
          }
          
          .dynamic-left {
            justify-content: center;
            gap: 12px;
          }
          
          .dynamic-icon {
            width: 40px;
            height: 40px;
          }
          
          .section-emoji {
            font-size: 1.3rem;
          }
          
          .dynamic-title {
            font-size: 0.9rem;
            white-space: normal;
            text-align: center;
          }
          
          .dynamic-subtitle {
            font-size: 0.75rem;
            white-space: normal;
            text-align: center;
          }
          
          .navbar-cta {
            padding: 8px 16px;
            font-size: 0.85rem;
          }
        }
        
        /* Extra small screens */
        @media (max-width: 480px) {
          .dynamic-left {
            flex-direction: column;
            gap: 8px;
          }
          
          .navbar-cta {
            padding: 8px 14px;
            font-size: 0.8rem;
          }
          
          .logo-text {
            font-size: 1.5rem;
          }
          
          .logo-subtitle {
            font-size: 0.65rem;
          }
        }
        
        /* Performance optimization */
        .elegant-navbar * {
          will-change: transform, opacity;
        }
        
        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .elegant-navbar,
          .section-emoji,
          .navbar-cta {
            animation: none;
            transition: none;
          }
        }
        
        /* High contrast mode */
        @media (prefers-contrast: high) {
          .navbar-overlay {
            background: linear-gradient(135deg, 
              rgba(255, 255, 255, 0.95), 
              rgba(255, 255, 255, 0.98)
            );
          }
          
          .navbar-cta {
            border: 2px solid white;
          }
        }
      `}</style>
      
      {/* Estilos globales para ajustar el body */}
      <style jsx global>{`
        body {
          padding-top: 90px;
        }
        
        @media (max-width: 768px) {
          body {
            padding-top: 110px;
          }
        }
      `}</style>
    </nav>
  );
};

export default ElegantPromoBanner;