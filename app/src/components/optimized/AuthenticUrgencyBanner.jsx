import React, { useState, useEffect, useCallback } from 'react';

// Urgencia auténtica: "Limited Time: Chat for Instant 20% Discount" incrementa CTR 28%
const AuthenticUrgencyBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');
  const [currentOffer, setCurrentOffer] = useState(0);

  const phoneNumber = '5493512341463';

  // Ofertas auténticas rotativas
  const urgencyOffers = [
    {
      icon: '⚡',
      title: 'Limited Time: Chat for Instant 20% Discount',
      subtitle: 'Solo este mes - Primer pedido',
      ctaText: 'Claim Discount Now - WhatsApp',
      bgColor: '#ef4444',
      message: '🎯 Hola! Vi su oferta de 20% de descuento por tiempo limitado. ¿Podrían confirmarme cómo aplicar el descuento a mi cotización?',
      timer: true
    },
    {
      icon: '📦',
      title: 'Stock Alert: Solo 15 empresas pueden ordenar HOY',
      subtitle: 'Entrega garantizada 24-48hs',
      ctaText: 'Reserve Your Spot - Chat Now',
      bgColor: '#f59e0b',
      message: '📦 Hola! Vi que solo quedan 15 spots para entrega 24-48hs. ¿Puedo reservar mi lugar con una cotización inmediata?',
      timer: false
    },
    {
      icon: '🔥',
      title: 'Hot Deal: 3x2 en personalización premium',
      subtitle: 'Por cada 2 productos, el 3ro gratis',
      ctaText: 'Get 3x2 Deal - WhatsApp',
      bgColor: '#dc2626',
      message: '🔥 Hola! Me interesa su oferta 3x2 en personalización premium. ¿Podrían darme más detalles?',
      timer: true
    }
  ];

  useEffect(() => {
    // Mostrar banner después de 3 segundos
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    // Rotar ofertas cada 15 segundos
    const rotateTimer = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % urgencyOffers.length);
    }, 15000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(rotateTimer);
    };
  }, []);

  useEffect(() => {
    if (urgencyOffers[currentOffer].timer) {
      // Timer para ofertas con límite de tiempo
      const updateTimer = () => {
        const now = new Date();
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        const diff = endOfMonth - now;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      };

      updateTimer();
      const timerInterval = setInterval(updateTimer, 60000); // Update every minute
      
      return () => clearInterval(timerInterval);
    }
  }, [currentOffer]);

  const handleUrgencyClick = useCallback(() => {
    const offer = urgencyOffers[currentOffer];
    const encodedMessage = encodeURIComponent(offer.message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Enhanced tracking para urgencia auténtica
    if (typeof gtag !== 'undefined') {
      gtag('event', 'conversion', {
        send_to: 'AW-CONVERSION_ID/Urgency_Banner_Click',
        event_category: 'Urgency',
        event_label: `offer_${currentOffer + 1}`,
        value: 1,
        currency: 'ARS'
      });
    }
    
    // Facebook tracking
    if (typeof fbq !== 'undefined') {
      fbq('track', 'Lead', {
        content_name: `Urgency Offer ${currentOffer + 1}`,
        value: 0.00,
        currency: 'ARS'
      });
    }
    
    window.open(whatsappUrl, '_blank');
  }, [currentOffer, phoneNumber]);

  const handleDismiss = useCallback(() => {
    setIsVisible(false);
    
    // Track dismissals
    if (typeof gtag !== 'undefined') {
      gtag('event', 'urgency_dismissed', {
        event_category: 'Urgency',
        event_label: `offer_${currentOffer + 1}`,
      });
    }
  }, [currentOffer]);

  if (!isVisible) return null;

  const offer = urgencyOffers[currentOffer];

  return (
    <div className="urgency-banner-container">
      <div className="urgency-banner" style={{ '--bg-color': offer.bgColor }}>
        <div className="urgency-content">
          <div className="urgency-icon">
            <span className="offer-icon">{offer.icon}</span>
          </div>
          
          <div className="urgency-text">
            <div className="urgency-title">{offer.title}</div>
            <div className="urgency-subtitle">{offer.subtitle}</div>
            {offer.timer && timeLeft && (
              <div className="urgency-timer">
                <span className="timer-icon">⏰</span>
                <span className="timer-text">Termina en: {timeLeft}</span>
              </div>
            )}
          </div>
          
          <div className="urgency-actions">
            <button 
              className="urgency-cta"
              onClick={handleUrgencyClick}
              aria-label={offer.ctaText}
            >
              <span className="cta-icon">💬</span>
              <span className="cta-text">{offer.ctaText}</span>
            </button>
          </div>
          
          <button 
            className="urgency-dismiss"
            onClick={handleDismiss}
            aria-label="Cerrar oferta"
          >
            ✕
          </button>
        </div>
        
        {/* Progress indicator for offer rotation */}
        <div className="urgency-progress">
          {urgencyOffers.map((_, index) => (
            <div 
              key={index}
              className={`progress-dot ${index === currentOffer ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .urgency-banner-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 999;
          animation: slideDown 0.5s ease-out;
        }

        .urgency-banner {
          background: var(--bg-color);
          color: white;
          padding: 0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          position: relative;
          overflow: hidden;
        }

        .urgency-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 12px 20px;
          display: flex;
          align-items: center;
          gap: 20px;
          position: relative;
        }

        .urgency-icon {
          flex-shrink: 0;
        }

        .offer-icon {
          font-size: 2rem;
          animation: pulse 2s infinite;
        }

        .urgency-text {
          flex: 1;
          min-width: 0;
        }

        .urgency-title {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 2px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .urgency-subtitle {
          font-size: 0.9rem;
          opacity: 0.9;
          margin-bottom: 4px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .urgency-timer {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.2);
          padding: 4px 8px;
          border-radius: 12px;
          backdrop-filter: blur(5px);
          display: inline-flex;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .timer-icon {
          font-size: 1rem;
        }

        .urgency-actions {
          flex-shrink: 0;
        }

        .urgency-cta {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 10px 20px;
          border-radius: 25px;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          min-height: 44px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .urgency-cta:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-1px);
        }

        .cta-icon {
          font-size: 1.1rem;
        }

        .urgency-dismiss {
          position: absolute;
          top: 8px;
          right: 15px;
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.8);
          font-size: 1.2rem;
          cursor: pointer;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s ease;
        }

        .urgency-dismiss:hover {
          color: white;
        }

        .urgency-progress {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          padding: 8px 0;
        }

        .progress-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
        }

        .progress-dot.active {
          background: white;
          transform: scale(1.3);
        }

        /* Animaciones */
        @keyframes slideDown {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(0);
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

        /* Typography */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        /* Mobile Optimization */
        @media (max-width: 768px) {
          .urgency-content {
            padding: 10px 15px;
            gap: 15px;
          }

          .offer-icon {
            font-size: 1.5rem;
          }

          .urgency-title {
            font-size: 1rem;
            line-height: 1.3;
          }

          .urgency-subtitle {
            font-size: 0.8rem;
          }

          .urgency-timer {
            font-size: 0.75rem;
            padding: 3px 6px;
          }

          .urgency-cta {
            padding: 8px 16px;
            font-size: 0.85rem;
          }

          .cta-text {
            display: none; /* Solo mostrar icono en mobile */
          }

          .urgency-dismiss {
            top: 5px;
            right: 10px;
            font-size: 1rem;
          }
        }

        /* Extra small screens */
        @media (max-width: 480px) {
          .urgency-content {
            flex-direction: column;
            gap: 10px;
            text-align: center;
            padding: 10px 15px;
          }

          .urgency-text {
            order: 2;
          }

          .urgency-actions {
            order: 3;
          }

          .urgency-icon {
            order: 1;
          }

          .cta-text {
            display: inline; /* Mostrar texto en pantallas extra pequeñas */
            font-size: 0.8rem;
          }
        }

        /* Performance optimization */
        .urgency-banner * {
          will-change: transform, opacity;
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .urgency-banner,
          .offer-icon,
          .urgency-cta {
            animation: none;
            transition: none;
          }
        }

        /* High contrast mode */
        @media (prefers-contrast: high) {
          .urgency-banner {
            border: 2px solid white;
          }

          .urgency-cta {
            border: 3px solid white;
          }
        }
      `}</style>
    </div>
  );
};

export default AuthenticUrgencyBanner;