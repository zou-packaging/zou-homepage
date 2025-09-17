import React, { useState, useEffect, useCallback } from 'react';

const OptimizedHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Copy optimizado basado en análisis (primera persona + acción inmediata)
  const heroSlides = [
    {
      headline: "Packaging Sustentable que",
      highlight: "IMPULSA tu Marca HOY",
      subtitle: "Desde vasos hasta bolsas ecológicas premium - Tu identidad en cada producto",
      cta: "Chat Now - Cotización GRATIS",
      ctaIcon: "💬",
      secondaryCta: "Ver Catálogo Express"
    },
    {
      headline: "Personalización Premium",
      highlight: "SIN MÍNIMOS",
      subtitle: "Tu logo y colores en productos biodegradables desde 1 unidad",
      cta: "Personalizar Ahora - WhatsApp",
      ctaIcon: "🎨",
      secondaryCta: "Calcular Precio Inmediato"
    },
    {
      headline: "Ahorra 40% vs",
      highlight: "COMPETENCIA",
      subtitle: "Calidad premium, precios directos de fábrica, entrega express",
      cta: "Cotizar y Ahorrar Ahora",
      ctaIcon: "💵",
      secondaryCta: "Comparar Precios"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000); // Aumentado para mejor lectura
    
    return () => clearInterval(interval);
  }, []);

  // Función optimizada para conversión WhatsApp
  const handlePrimaryAction = useCallback(() => {
    const phoneNumber = '5493512341463';
    const currentSlideData = heroSlides[currentSlide];
    
    // Mensaje personalizado según slide actual
    const messages = [
      '🎯 Hola! Vi su página y necesito packaging sustentable para mi marca. ¿Pueden darme una cotización GRATIS inmediata?',
      '🎨 Hola! Me interesa personalizar productos sin mínimos. ¿Podrían ayudarme con precios y opciones?',
      '💰 Hola! Vi que tienen precios 40% menores que la competencia. ¿Podrían confirmarme esto con una cotización?'
    ];
    
    const message = messages[currentSlide];
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Enhanced tracking para Google Ads
    if (typeof gtag !== 'undefined') {
      gtag('event', 'conversion', {
        send_to: 'AW-CONVERSION_ID/WhatsApp_Lead',
        event_category: 'WhatsApp',
        event_label: `hero_slide_${currentSlide + 1}`,
        value: 1,
        currency: 'ARS'
      });
    }
    
    // Micro-conversión para tracking
    if (typeof fbq !== 'undefined') {
      fbq('track', 'InitiateCheckout', {
        value: 0.00,
        currency: 'ARS',
        content_name: 'WhatsApp Lead'
      });
    }
    
    window.open(whatsappUrl, '_blank');
  }, [currentSlide]);

  const handleSecondaryAction = useCallback(() => {
    const actions = [
      () => document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' }),
      () => document.getElementById('calculadora')?.scrollIntoView({ behavior: 'smooth' }),
      () => document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' })
    ];
    
    actions[currentSlide]();
    
    if (typeof gtag !== 'undefined') {
      gtag('event', 'engagement', {
        event_category: 'hero_secondary',
        event_label: `slide_${currentSlide + 1}_secondary`,
      });
    }
  }, [currentSlide]);

  const currentSlideData = heroSlides[currentSlide];

  return (
    <section className={`hero-section ${isVisible ? 'visible' : ''}`}>
      <div className="hero-container">
        <div className="hero-content">
          {/* Main headline optimized */}
          <div className="hero-headline">
            <h1 className="headline-text">
              {currentSlideData.headline} <br />
              <span className="headline-highlight">{currentSlideData.highlight}</span>
            </h1>
          </div>
          
          {/* Enhanced subtitle */}
          <p className="hero-subtitle">
            {currentSlideData.subtitle}
          </p>
          
          {/* CTA Buttons optimized for conversion */}
          <div className="hero-actions">
            <button 
              className="hero-cta-primary"
              onClick={handlePrimaryAction}
              aria-label="Contactar por WhatsApp para cotización gratuita"
            >
              <span className="cta-icon">{currentSlideData.ctaIcon}</span>
              <span className="cta-text">{currentSlideData.cta}</span>
              <span className="cta-subtext">Respuesta en 5 minutos</span>
            </button>
            
            <button 
              className="hero-cta-secondary"
              onClick={handleSecondaryAction}
              aria-label="Ver opciones adicionales"
            >
              {currentSlideData.secondaryCta}
              <span className="secondary-arrow">→</span>
            </button>
          </div>
          
          {/* Trust indicators optimized B2B */}
          <div className="hero-trust-indicators">
            <div className="trust-item">
              <span className="trust-icon">⚡</span>
              <span className="trust-text">Entrega 24-48hs</span>
            </div>
            <div className="trust-divider">•</div>
            <div className="trust-item">
              <span className="trust-icon">⭐</span>
              <span className="trust-text">+500 empresas confían</span>
            </div>
            <div className="trust-divider">•</div>
            <div className="trust-item">
              <span className="trust-icon">🌱</span>
              <span className="trust-text">100% Biodegradable</span>
            </div>
            <div className="trust-divider">•</div>
            <div className="trust-item">
              <span className="trust-icon">🏆</span>
              <span className="trust-text">ISO 9001</span>
            </div>
          </div>
          
          {/* Social proof immediato */}
          <div className="hero-social-proof">
            <div className="proof-avatars">
              <div className="avatar">👨‍💼</div>
              <div className="avatar">👩‍💼</div>
              <div className="avatar">👨‍🍳</div>
            </div>
            <span className="proof-text">
              <strong>127 empresarios</strong> cotizaron esta semana
            </span>
          </div>
        </div>
        
        {/* Visual optimizado mobile-first */}
        <div className="hero-visual">
          <div className="hero-image-container">
            <div className="product-showcase">
              <div className="floating-product product-1">
                <div className="product-icon">🥤</div>
                <span className="product-label">Vasos Eco</span>
              </div>
              <div className="floating-product product-2">
                <div className="product-icon">📦</div>
                <span className="product-label">Cajas Custom</span>
              </div>
              <div className="floating-product product-3">
                <div className="product-icon">🛍️</div>
                <span className="product-label">Bolsas Premium</span>
              </div>
              <div className="floating-product product-4">
                <div className="product-icon">🍽️</div>
                <span className="product-label">Platos Bio</span>
              </div>
            </div>
            
            {/* Badge de garantía */}
            <div className="guarantee-badge">
              <span className="badge-text">Garantía 100%</span>
              <span className="badge-subtext">o devolvemos tu dinero</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Slide indicators mejorados */}
      <div className="hero-indicators">
        {heroSlides.map((slide, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Ir a propuesta ${index + 1}: ${slide.highlight}`}
          >
            <span className="indicator-label">{slide.highlight.split(' ')[0]}</span>
          </button>
        ))}
      </div>
      
      {/* WhatsApp sticky button adicional */}
      <div className="hero-whatsapp-sticky">
        <button 
          className="whatsapp-sticky-btn"
          onClick={handlePrimaryAction}
          aria-label="Chat directo WhatsApp"
        >
          <span className="whatsapp-icon">💬</span>
          <span className="sticky-text">Chat Inmediato</span>
        </button>
      </div>

      <style jsx>{`
        .hero-section {
          min-height: 100vh;
          background: linear-gradient(135deg, #ffffff 0%, #f8fffe 100%);
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s ease-out;
        }
        
        .hero-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .headline-text {
          font-size: 3.2rem;
          font-weight: 700;
          line-height: 1.2;
          margin: 0 0 20px 0;
          color: #2d3748;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .headline-highlight {
          color: #4fd1c7;
          position: relative;
          font-weight: 800;
        }

        .headline-highlight::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 100%;
          height: 4px;
          background: #4fd1c7;
          border-radius: 2px;
        }

        .hero-subtitle {
          font-size: 1.2rem;
          color: #718096;
          margin-bottom: 30px;
          line-height: 1.5;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .hero-actions {
          display: flex;
          gap: 15px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }

        .hero-cta-primary {
          background: #4fd1c7;
          color: white;
          border: none;
          padding: 16px 32px;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(79, 209, 199, 0.3);
          min-height: 44px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .hero-cta-primary:hover {
          background: #38b2ac;
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(79, 209, 199, 0.4);
        }

        .cta-subtext {
          font-size: 0.8rem;
          opacity: 0.9;
          font-weight: 400;
        }

        .hero-cta-secondary {
          background: transparent;
          color: #4fd1c7;
          border: 2px solid #4fd1c7;
          padding: 14px 28px;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .hero-cta-secondary:hover {
          background: #4fd1c7;
          color: white;
        }

        .hero-trust-indicators {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 25px;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.95rem;
          color: #718096;
          font-weight: 500;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .trust-divider {
          color: #e2e8f0;
          font-weight: 300;
        }

        .hero-social-proof {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 15px 20px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 2px 15px rgba(0,0,0,0.08);
          border-left: 4px solid #4fd1c7;
        }

        .proof-avatars {
          display: flex;
          margin-right: 10px;
        }

        .avatar {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: #e6fffa;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: -8px;
          border: 2px solid white;
          font-size: 1.2rem;
        }

        .proof-text {
          font-size: 0.9rem;
          color: #4a5568;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .hero-visual {
          position: relative;
          height: 500px;
        }

        .product-showcase {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .floating-product {
          position: absolute;
          background: white;
          padding: 20px;
          border-radius: 20px;
          box-shadow: 0 8px 30px rgba(79, 209, 199, 0.15);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          animation: float 3s ease-in-out infinite;
          border: 1px solid #e6fffa;
        }

        .product-1 { top: 20%; left: 10%; animation-delay: 0s; }
        .product-2 { top: 10%; right: 20%; animation-delay: 1s; }
        .product-3 { bottom: 30%; left: 20%; animation-delay: 2s; }
        .product-4 { bottom: 20%; right: 10%; animation-delay: 0.5s; }

        .product-icon {
          font-size: 2.5rem;
        }

        .product-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: #4fd1c7;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .guarantee-badge {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: linear-gradient(135deg, #4fd1c7, #38b2ac);
          color: white;
          padding: 15px 20px;
          border-radius: 50%;
          text-align: center;
          width: 120px;
          height: 120px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          box-shadow: 0 8px 30px rgba(79, 209, 199, 0.3);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .badge-text {
          font-size: 0.9rem;
          font-weight: 700;
        }

        .badge-subtext {
          font-size: 0.7rem;
          opacity: 0.9;
        }

        .hero-indicators {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 15px;
        }

        .indicator {
          padding: 8px 15px;
          background: rgba(255,255,255,0.8);
          border: 2px solid #e2e8f0;
          border-radius: 25px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.8rem;
          font-weight: 600;
          color: #4a5568;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .indicator.active {
          background: #4fd1c7;
          color: white;
          border-color: #4fd1c7;
        }

        .indicator-label {
          font-size: 0.75rem;
        }

        .hero-whatsapp-sticky {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
        }

        .whatsapp-sticky-btn {
          background: #25d366;
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 25px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.9rem;
          box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
          animation: bounce 2s infinite;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        /* Typography improvements */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        /* Mobile Optimization */
        @media (max-width: 768px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 40px;
            text-align: center;
            padding: 20px 15px;
          }

          .headline-text {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1.1rem;
          }

          .hero-actions {
            flex-direction: column;
            align-items: center;
          }

          .hero-cta-primary,
          .hero-cta-secondary {
            width: 100%;
            max-width: 300px;
            justify-content: center;
          }

          .hero-trust-indicators {
            justify-content: center;
            text-align: center;
          }

          .hero-social-proof {
            flex-direction: column;
            text-align: center;
          }

          .hero-visual {
            height: 300px;
            order: -1;
          }

          .floating-product {
            padding: 15px;
          }

          .product-icon {
            font-size: 2rem;
          }

          .guarantee-badge {
            width: 100px;
            height: 100px;
          }

          .badge-text {
            font-size: 0.8rem;
          }

          .badge-subtext {
            font-size: 0.65rem;
          }
        }

        /* Performance Optimization */
        .hero-section * {
          will-change: transform, opacity;
        }

        .floating-product {
          contain: layout style paint;
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .floating-product,
          .urgency-banner,
          .whatsapp-sticky-btn {
            animation: none;
          }
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .hero-section {
            background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
          }

          .headline-text {
            color: #f7fafc;
          }

          .hero-subtitle,
          .trust-item,
          .proof-text {
            color: #a0aec0;
          }

          .hero-social-proof {
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
          }
        }
      `}</style>
    </section>
  );
};

export default OptimizedHero;