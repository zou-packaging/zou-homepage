import React, { useState, useEffect, useCallback } from 'react';

// Banner estético inspirado en la imagen mostrada
const ElegantPromoBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentOffer, setCurrentOffer] = useState(0);

  const phoneNumber = '5493512341463';

  // Ofertas con la nueva estética y colores suaves
  const elegantOffers = [
    {
      icon: '✨',
      title: 'Diseño personalizado',
      subtitle: 'Tu marca, nuestra experiencia',
      cta: 'Solicitar presupuesto',
      bgGradient: 'linear-gradient(135deg, #FF9A8A, #FFA726)',
      message: '✨ Hola! Me interesa el diseño personalizado para mi marca. ¿Podrían ayudarme con un presupuesto?'
    },
    {
      icon: '🌱',
      title: 'Packaging sustentable',
      subtitle: 'Cuidamos el planeta juntos',
      cta: 'Ver opciones eco',
      bgGradient: 'linear-gradient(135deg, #81C784, #4FD1C7)',
      message: '🌱 Hola! Me interesa conocer sus opciones de packaging sustentable. ¿Pueden mostrarme las alternativas eco?'
    },
    {
      icon: '🎯',
      title: 'Consultoría gratuita',
      subtitle: 'Te asesoramos sin compromiso',
      cta: 'Agendar llamada',
      bgGradient: 'linear-gradient(135deg, #F48FB1, #EC407A)',
      message: '🎯 Hola! Me interesa la consultoría gratuita. ¿Podríamos agendar una llamada para hablar de mi proyecto?'
    }
  ];

  useEffect(() => {
    // Mostrar banner después de 2 segundos
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    // Rotar ofertas cada 12 segundos
    const rotateTimer = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % elegantOffers.length);
    }, 12000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(rotateTimer);
    };
  }, []);

  const handleOfferClick = useCallback(() => {
    const offer = elegantOffers[currentOffer];
    const encodedMessage = encodeURIComponent(offer.message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Tracking elegante
    if (typeof gtag !== 'undefined') {
      gtag('event', 'conversion', {
        send_to: 'AW-CONVERSION_ID/Elegant_Banner_Click',
        event_category: 'Promo Banner',
        event_label: `elegant_offer_${currentOffer + 1}`,
        value: 1,
        currency: 'ARS'
      });
    }
    
    window.open(whatsappUrl, '_blank');
  }, [currentOffer, phoneNumber]);

  const handleDismiss = useCallback(() => {
    setIsVisible(false);
  }, []);

  if (!isVisible) return null;

  const offer = elegantOffers[currentOffer];

  return (
    <div className="elegant-promo-banner">
      <div className="banner-background">
        <div className="banner-overlay"></div>
      </div>
      
      <div className="banner-content">
        <div className="banner-left">
          <div className="offer-icon">
            <span className="icon-emoji">{offer.icon}</span>
          </div>
          
          <div className="offer-text">
            <h3 className="offer-title">{offer.title}</h3>
            <p className="offer-subtitle">{offer.subtitle}</p>
          </div>
        </div>
        
        <div className="banner-right">
          <button 
            className="elegant-cta"
            onClick={handleOfferClick}
            style={{ background: offer.bgGradient }}
          >
            <span className="cta-text">{offer.cta}</span>
            <span className="cta-arrow">→</span>
          </button>
          
          <button 
            className="banner-close"
            onClick={handleDismiss}
            aria-label="Cerrar banner"
          >
            ✕
          </button>
        </div>
      </div>
      
      {/* Indicadores de progreso */}
      <div className="progress-indicators">
        {elegantOffers.map((_, index) => (
          <div 
            key={index}
            className={`progress-dot ${index === currentOffer ? 'active' : ''}`}
            style={{ 
              background: index === currentOffer ? offer.bgGradient : 'rgba(255,255,255,0.3)' 
            }}
          />
        ))}
      </div>

      <style jsx>{`
        .elegant-promo-banner {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 998;
          height: 80px;
          overflow: hidden;
          animation: slideDown 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .banner-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url('/src/assets/packaging-banner.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        
        .banner-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, 
            rgba(255, 154, 138, 0.95), 
            rgba(255, 167, 38, 0.9), 
            rgba(244, 143, 177, 0.95)
          );
          backdrop-filter: blur(1px);
        }
        
        .banner-content {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          margin: 0 auto;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
        }
        
        .banner-left {
          display: flex;
          align-items: center;
          gap: 16px;
          flex: 1;
        }
        
        .offer-icon {
          width: 48px;
          height: 48px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .icon-emoji {
          font-size: 1.5rem;
          animation: float 3s ease-in-out infinite;
        }
        
        .offer-text {
          color: white;
        }
        
        .offer-title {
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0 0 4px 0;
          text-shadow: 0 1px 2px rgba(0,0,0,0.1);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        .offer-subtitle {
          font-size: 0.9rem;
          margin: 0;
          opacity: 0.95;
          font-weight: 400;
          text-shadow: 0 1px 2px rgba(0,0,0,0.1);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        
        .banner-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        
        .elegant-cta {
          background: linear-gradient(135deg, #FF9A8A, #FFA726);
          color: white;
          border: none;
          padding: 12px 24px;
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
        
        .elegant-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(255, 154, 138, 0.4);
        }
        
        .cta-arrow {
          font-size: 1rem;
          transition: transform 0.3s ease;
        }
        
        .elegant-cta:hover .cta-arrow {
          transform: translateX(2px);
        }
        
        .banner-close {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }
        
        .banner-close:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }
        
        .progress-indicators {
          position: absolute;
          bottom: 8px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          z-index: 3;
        }
        
        .progress-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
        }
        
        .progress-dot.active {
          transform: scale(1.3);
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
        @media (max-width: 768px) {
          .elegant-promo-banner {
            height: 100px;
          }
          
          .banner-content {
            padding: 0 16px;
            flex-direction: column;
            justify-content: center;
            text-align: center;
            gap: 12px;
          }
          
          .banner-left {
            justify-content: center;
            gap: 12px;
          }
          
          .banner-right {
            justify-content: center;
            gap: 12px;
          }
          
          .offer-icon {
            width: 40px;
            height: 40px;
          }
          
          .icon-emoji {
            font-size: 1.3rem;
          }
          
          .offer-title {
            font-size: 1rem;
          }
          
          .offer-subtitle {
            font-size: 0.8rem;
          }
          
          .elegant-cta {
            padding: 10px 20px;
            font-size: 0.85rem;
          }
          
          .progress-indicators {
            bottom: 4px;
          }
        }
        
        /* Extra small screens */
        @media (max-width: 480px) {
          .banner-left {
            flex-direction: column;
            gap: 8px;
          }
          
          .elegant-cta {
            padding: 8px 16px;
            font-size: 0.8rem;
          }
          
          .banner-close {
            position: absolute;
            top: 8px;
            right: 8px;
            width: 28px;
            height: 28px;
            font-size: 0.8rem;
          }
        }
        
        /* Performance optimization */
        .elegant-promo-banner * {
          will-change: transform, opacity;
        }
        
        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .elegant-promo-banner,
          .icon-emoji,
          .elegant-cta {
            animation: none;
            transition: none;
          }
        }
        
        /* High contrast mode */
        @media (prefers-contrast: high) {
          .banner-overlay {
            background: linear-gradient(135deg, 
              rgba(0, 0, 0, 0.8), 
              rgba(0, 0, 0, 0.9)
            );
          }
          
          .elegant-cta {
            border: 2px solid white;
          }
        }
      `}</style>
    </div>
  );
};

export default ElegantPromoBanner;