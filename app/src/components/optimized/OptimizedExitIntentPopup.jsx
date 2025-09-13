import React, { useState, useEffect, useCallback } from 'react';

// Exit-intent CTAs de WhatsApp reducen el abandono 25%
const OptimizedExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [timeOnPage, setTimeOnPage] = useState(0);

  const phoneNumber = '5493512341463';

  // Ofertas de exit-intent basadas en tiempo en página
  const getExitOffer = useCallback(() => {
    if (timeOnPage < 10) {
      return {
        headline: '¡Espera! Antes de irte...',
        subheadline: 'Consigue tu cotización GRATIS en 2 minutos',
        offer: '20% OFF tu primer pedido + Entrega Express',
        cta: 'Get My Quote Now - WhatsApp',
        urgency: 'Solo válido HOY',
        icon: '🎯',
        message: '🎯 Hola! Estaba por salir de su página pero vi la oferta de 20% OFF + entrega express. ¿Podrían darme más información?'
      };
    } else if (timeOnPage < 30) {
      return {
        headline: '¿Comparando precios?',
        subheadline: 'Te garantizamos el mejor precio del mercado',
        offer: 'Price Match + 10% adicional de descuento',
        cta: 'Beat Any Price - Chat Now',
        urgency: 'Garantía escrita',
        icon: '💰',
        message: '💰 Hola! Vi que garantizan el mejor precio + 10% adicional. ¿Podrían confirmarme esta oferta por escrito?'
      };
    } else {
      return {
        headline: '¡Has estado navegando un rato!',
        subheadline: 'Déjanos ayudarte a encontrar exactamente lo que necesitas',
        offer: 'Consultoría GRATUITA personalizada',
        cta: 'Get Free Consultation - WhatsApp',
        urgency: 'Experto disponible ahora',
        icon: '🧠',
        message: '🧠 Hola! He estado navegando su página y me interesa la consultoría gratuita personalizada. ¿Está disponible un experto ahora?'
      };
    }
  }, [timeOnPage]);

  useEffect(() => {
    // Track time on page
    const pageTimer = setInterval(() => {
      setTimeOnPage(prev => prev + 1);
    }, 1000);

    return () => clearInterval(pageTimer);
  }, []);

  useEffect(() => {
    let exitTimer;

    const handleMouseLeave = (e) => {
      // Detectar exit-intent (mouse hacia arriba de la ventana)
      if (e.clientY <= 0 && !hasTriggered && timeOnPage > 5) {
        setIsVisible(true);
        setHasTriggered(true);
      }
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // También activar por inactividad después de 45 segundos
    exitTimer = setTimeout(() => {
      if (!hasTriggered && timeOnPage > 45) {
        setIsVisible(true);
        setHasTriggered(true);
      }
    }, 45000);

    // Activar en mobile por scroll rápido hacia arriba
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY - 100 && !hasTriggered && timeOnPage > 10) {
        setIsVisible(true);
        setHasTriggered(true);
      }
      lastScrollY = currentScrollY;
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(exitTimer);
    };
  }, [hasTriggered, timeOnPage]);

  const handleExitAction = useCallback(() => {
    const offer = getExitOffer();
    const encodedMessage = encodeURIComponent(offer.message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Enhanced tracking para exit-intent
    if (typeof gtag !== 'undefined') {
      gtag('event', 'conversion', {
        send_to: 'AW-CONVERSION_ID/Exit_Intent_Recovery',
        event_category: 'Exit Intent',
        event_label: `time_on_page_${Math.floor(timeOnPage/10)*10}s`,
        value: 1,
        currency: 'ARS'
      });
    }
    
    // Facebook tracking
    if (typeof fbq !== 'undefined') {
      fbq('track', 'Lead', {
        content_name: 'Exit Intent Recovery',
        value: 0.00,
        currency: 'ARS'
      });
    }

    setIsVisible(false);
    window.open(whatsappUrl, '_blank');
  }, [getExitOffer, phoneNumber, timeOnPage]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    
    // Track closes
    if (typeof gtag !== 'undefined') {
      gtag('event', 'exit_intent_dismissed', {
        event_category: 'Exit Intent',
        event_label: `time_on_page_${Math.floor(timeOnPage/10)*10}s`,
      });
    }
  }, [timeOnPage]);

  const handleBackdropClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }, [handleClose]);

  if (!isVisible) return null;

  const offer = getExitOffer();

  return (
    <div className="exit-intent-overlay" onClick={handleBackdropClick}>
      <div className="exit-intent-popup">
        <button 
          className="exit-close-btn"
          onClick={handleClose}
          aria-label="Cerrar"
        >
          ✕
        </button>

        <div className="exit-content">
          <div className="exit-icon">
            <span className="offer-emoji">{offer.icon}</span>
          </div>

          <div className="exit-text">
            <h3 className="exit-headline">{offer.headline}</h3>
            <p className="exit-subheadline">{offer.subheadline}</p>
          </div>

          <div className="exit-offer-box">
            <div className="offer-content">
              <div className="offer-text">{offer.offer}</div>
              <div className="offer-urgency">
                <span className="urgency-icon">⚡</span>
                <span className="urgency-text">{offer.urgency}</span>
              </div>
            </div>
          </div>

          <div className="exit-actions">
            <button 
              className="exit-cta-primary"
              onClick={handleExitAction}
              aria-label={offer.cta}
            >
              <span className="cta-icon">💬</span>
              <span className="cta-text">{offer.cta}</span>
              <span className="cta-subtext">Respuesta en 2 minutos</span>
            </button>
            
            <button 
              className="exit-cta-secondary"
              onClick={handleClose}
            >
              No gracias, continuar navegando
            </button>
          </div>

          <div className="exit-trust">
            <div className="trust-items">
              <div className="trust-item">
                <span className="trust-icon">⭐</span>
                <span className="trust-text">+500 clientes</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">🚀</span>
                <span className="trust-text">Entrega 24-48hs</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">🏆</span>
                <span className="trust-text">ISO 9001</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .exit-intent-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
          animation: fadeIn 0.3s ease-out;
        }

        .exit-intent-popup {
          background: white;
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          max-width: 480px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          animation: slideUp 0.4s ease-out;
        }

        .exit-close-btn {
          position: absolute;
          top: 15px;
          right: 20px;
          background: none;
          border: none;
          font-size: 1.5rem;
          color: #a0aec0;
          cursor: pointer;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.2s ease;
        }

        .exit-close-btn:hover {
          background: #f7fafc;
          color: #4a5568;
        }

        .exit-content {
          padding: 40px 30px 30px;
          text-align: center;
        }

        .exit-icon {
          margin-bottom: 20px;
        }

        .offer-emoji {
          font-size: 4rem;
          display: inline-block;
          animation: bounce 2s infinite;
        }

        .exit-text {
          margin-bottom: 25px;
        }

        .exit-headline {
          font-size: 1.8rem;
          font-weight: 800;
          color: #2d3748;
          margin: 0 0 10px 0;
          line-height: 1.2;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .exit-subheadline {
          font-size: 1.1rem;
          color: #718096;
          margin: 0;
          line-height: 1.4;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .exit-offer-box {
          background: linear-gradient(135deg, #4fd1c7, #38b2ac);
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 25px;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .offer-content {
          position: relative;
          z-index: 1;
        }

        .offer-text {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 10px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .offer-urgency {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 0.95rem;
          font-weight: 600;
          opacity: 0.9;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .urgency-icon {
          font-size: 1.1rem;
          animation: pulse 2s infinite;
        }

        .exit-actions {
          margin-bottom: 25px;
        }

        .exit-cta-primary {
          background: #25D366;
          color: white;
          border: none;
          padding: 16px 32px;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          width: 100%;
          margin-bottom: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(37, 211, 102, 0.3);
          min-height: 44px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .exit-cta-primary:hover {
          background: #128C7E;
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(37, 211, 102, 0.4);
        }

        .cta-icon {
          font-size: 1.3rem;
        }

        .cta-text {
          font-size: 1rem;
        }

        .cta-subtext {
          font-size: 0.8rem;
          opacity: 0.9;
          font-weight: 400;
        }

        .exit-cta-secondary {
          background: none;
          border: none;
          color: #a0aec0;
          font-size: 0.9rem;
          cursor: pointer;
          text-decoration: underline;
          transition: color 0.2s ease;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .exit-cta-secondary:hover {
          color: #718096;
        }

        .exit-trust {
          border-top: 1px solid #e2e8f0;
          padding-top: 20px;
        }

        .trust-items {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          color: #718096;
          font-weight: 500;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .trust-icon {
          font-size: 1rem;
        }

        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }

        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes bounce {
          0%, 100% { 
            transform: translateY(0); 
          }
          50% { 
            transform: translateY(-10px); 
          }
        }

        @keyframes pulse {
          0%, 100% { 
            transform: scale(1); 
          }
          50% { 
            transform: scale(1.1); 
          }
        }

        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        @media (max-width: 768px) {
          .exit-intent-popup {
            max-width: 95%;
            margin: 0 10px;
          }

          .exit-content {
            padding: 30px 20px 25px;
          }

          .offer-emoji {
            font-size: 3rem;
          }

          .exit-headline {
            font-size: 1.5rem;
          }

          .exit-subheadline {
            font-size: 1rem;
          }

          .offer-text {
            font-size: 1.1rem;
          }

          .exit-cta-primary {
            padding: 14px 24px;
            font-size: 1rem;
          }

          .trust-items {
            gap: 15px;
          }

          .trust-item {
            font-size: 0.8rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .exit-intent-overlay,
          .exit-intent-popup,
          .offer-emoji,
          .urgency-icon {
            animation: none;
          }
        }

        .exit-intent-popup * {
          will-change: transform, opacity;
        }
      `}</style>
    </div>
  );
};

export default OptimizedExitIntentPopup;