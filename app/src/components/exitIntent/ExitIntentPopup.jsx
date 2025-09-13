import React, { useState, useEffect } from 'react';
import './ExitIntentPopup.css';

const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    let startTime = Date.now();
    let timeInterval;

    // Track time spent on page
    timeInterval = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    // Exit intent detection
    const handleMouseLeave = (e) => {
      // Only trigger if mouse leaves from top of viewport and user has spent at least 10 seconds
      if (e.clientY <= 0 && timeSpent >= 10 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    // Mobile scroll detection (alternative for exit intent)
    let lastScrollTop = 0;
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // If user scrolls up quickly after spending time (mobile exit intent)
      if (scrollTop < lastScrollTop - 50 && timeSpent >= 15 && !hasShown && window.innerWidth <= 768) {
        setIsVisible(true);
        setHasShown(true);
      }
      lastScrollTop = scrollTop;
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timeInterval);
    };
  }, [timeSpent, hasShown]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleGetDiscount = () => {
    const phoneNumber = '5493512341463';
    const message = '¡Hola! Vi el descuento del 20% en su página web. Me interesa aprovechar esta oferta para productos de packaging. ¿Podrían darme más información?';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Track exit intent conversion
    if (typeof gtag !== 'undefined') {
      gtag('event', 'exit_intent_conversion', {
        event_category: 'conversion',
        event_label: 'discount_offer',
        value: 20
      });
    }
    
    window.open(whatsappUrl, '_blank');
    handleClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="exit-intent-overlay" onClick={handleBackdropClick}>
      <div className="exit-intent-popup">
        <button className="close-btn" onClick={handleClose} aria-label="Cerrar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        <div className="popup-content">
          {/* Header */}
          <div className="popup-header">
            <div className="popup-icon">🎉</div>
            <h2 className="popup-title">¡Espera! No te vayas sin tu descuento</h2>
          </div>

          {/* Body */}
          <div className="popup-body">
            <div className="discount-badge">
              <span className="discount-percent">20% OFF</span>
              <span className="discount-text">en tu primer pedido</span>
            </div>

            <div className="offer-details">
              <div className="offer-item">
                <span className="offer-icon">✅</span>
                <span>Descuento válido solo por hoy</span>
              </div>
              <div className="offer-item">
                <span className="offer-icon">🚚</span>
                <span>Envío GRATIS a toda Argentina</span>
              </div>
              <div className="offer-item">
                <span className="offer-icon">💬</span>
                <span>Cotización inmediata por WhatsApp</span>
              </div>
            </div>

            <p className="popup-description">
              Únete a más de <strong>500 empresas</strong> que ya eligieron nuestro packaging sustentable para impulsar su marca.
            </p>
          </div>

          {/* Actions */}
          <div className="popup-actions">
            <button 
              className="get-discount-btn"
              onClick={handleGetDiscount}
            >
              <span className="btn-icon">💬</span>
              Reclamar Mi Descuento
            </button>
            <button 
              className="no-thanks-btn"
              onClick={handleClose}
            >
              No gracias, continuar sin descuento
            </button>
          </div>

          {/* Urgency */}
          <div className="urgency-bar">
            <div className="urgency-text">
              <span className="urgency-icon">⏰</span>
              Esta oferta caduca en: <strong>23:59</strong> hs
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="popup-decoration decoration-1"></div>
        <div className="popup-decoration decoration-2"></div>
      </div>
    </div>
  );
};

export default ExitIntentPopup;