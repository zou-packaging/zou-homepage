import React, { useState, useEffect, useCallback } from 'react';

const ElegantHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Copy optimizado con estética elegante
  const heroSlides = [
    {
      headline: "Diseñados para usar,",
      highlight: "personalizados",
      endline: "para tu marca.",
      subtitle: "En cada detalle hay una oportunidad de destacar. Ya sea en un café, un evento o una tienda, tus productos hablan por vos.",
      cta: "Solicitar presupuesto",
      ctaIcon: "✨",
      secondaryCta: "Ver productos",
      bgGradient: "linear-gradient(135deg, #FF9A8A, #FFA726)"
    },
    {
      headline: "Packaging que cuida",
      highlight: "el planeta",
      endline: "y tu negocio.",
      subtitle: "Soluciones sustentables sin comprometer la calidad. Conectá con clientes que valoran el cuidado del medio ambiente.",
      cta: "Explorar opciones eco",
      ctaIcon: "🌱",
      secondaryCta: "Ver materiales",
      bgGradient: "linear-gradient(135deg, #81C784, #4FD1C7)"
    },
    {
      headline: "Tu identidad visual",
      highlight: "en cada producto",
      endline: "que entregas.",
      subtitle: "Desde el diseño hasta la entrega, creamos experiencias que fortalecen la conexión con tu marca.",
      cta: "Crear mi identidad",
      ctaIcon: "🎨",
      secondaryCta: "Ver portfolio",
      bgGradient: "linear-gradient(135deg, #F48FB1, #EC407A)"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8000); // Más lento para mejor lectura
    
    return () => clearInterval(interval);
  }, []);

  // Función optimizada para conversión WhatsApp
  const handlePrimaryAction = useCallback(() => {
    const phoneNumber = '5493512341463';
    const currentSlideData = heroSlides[currentSlide];
    
    // Mensaje personalizado según slide actual
    const messages = [
      '✨ Hola! Me interesa el diseño personalizado para mi marca. Vi su página y me gustaría solicitar un presupuesto.',
      '🌱 Hola! Me interesa conocer sus opciones sustentables. ¿Podrían mostrarme los materiales eco-friendly disponibles?',
      '🎨 Hola! Me interesa crear una identidad visual fuerte para mi negocio. ¿Podrían ayudarme con el diseño?'
    ];
    
    const message = messages[currentSlide];
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Enhanced tracking para Google Ads
    if (typeof gtag !== 'undefined') {
      gtag('event', 'conversion', {
        send_to: 'AW-CONVERSION_ID/Hero_WhatsApp_Lead',
        event_category: 'WhatsApp',
        event_label: `hero_slide_${currentSlide + 1}`,
        value: 1,
        currency: 'ARS'
      });
    }
    
    window.open(whatsappUrl, '_blank');
  }, [currentSlide]);

  const handleSecondaryAction = useCallback(() => {
    const actions = [
      () => document.getElementById('categorias')?.scrollIntoView({ behavior: 'smooth' }),
      () => document.getElementById('categorias')?.scrollIntoView({ behavior: 'smooth' }),
      () => document.getElementById('categorias')?.scrollIntoView({ behavior: 'smooth' })
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
    <section className={`elegant-hero ${isVisible ? 'visible' : ''}`}>
      {/* Fondo con imagen y overlay elegante */}
      <div className="hero-background">
        <div className="hero-overlay"></div>
      </div>
      
      <div className="hero-container">
        <div className="hero-content">
          {/* Headline principal con estética elegante */}
          <div className="hero-headline">
            <h1 className="headline-text">
              {currentSlideData.headline}{' '}
              <span 
                className="headline-highlight"
                style={{ background: currentSlideData.bgGradient }}
              >
                {currentSlideData.highlight}
              </span>{' '}
              {currentSlideData.endline}
            </h1>
          </div>
          
          {/* Subtitle elegante */}
          <p className="hero-subtitle">
            {currentSlideData.subtitle}
          </p>
          
          {/* CTA Buttons con nueva estética */}
          <div className="hero-actions">
            <button 
              className="hero-cta-primary"
              onClick={handlePrimaryAction}
              style={{ background: currentSlideData.bgGradient }}
              aria-label={`${currentSlideData.cta} - Contactar por WhatsApp`}
            >
              <span className="cta-icon">{currentSlideData.ctaIcon}</span>
              <span className="cta-text">{currentSlideData.cta}</span>
            </button>
            
            <button 
              className="hero-cta-secondary"
              onClick={handleSecondaryAction}
              aria-label={currentSlideData.secondaryCta}
            >
              <span className="secondary-text">{currentSlideData.secondaryCta}</span>
              <span className="secondary-arrow">→</span>
            </button>
          </div>
          

        </div>
        
        {/* Elementos decorativos elegantes */}
        <div className="hero-decoration">
          <div className="floating-elements">
            <div className="elegant-circle circle-1"></div>
            <div className="elegant-circle circle-2"></div>
            <div className="elegant-circle circle-3"></div>
          </div>
          
          {/* Iconos de productos reales en espiral */}
          <div className="product-icons-spiral">
            <div className="product-icon-item icon-1">
              <img src="/src/assets/productos/vasoDeCafe.jpg" alt="Vaso de café personalizado" className="product-image" />
            </div>
            
            <div className="product-icon-item icon-2">
              <img src="/src/assets/productos/cajaSimple.jpg" alt="Caja de packaging sustentable" className="product-image" />
            </div>
            
            <div className="product-icon-item icon-3">
              <img src="/src/assets/productos/bolsaSimple.png" alt="Bolsa ecológica personalizada" className="product-image" />
            </div>
            
            <div className="product-icon-item icon-4">
              <img src="/src/assets/productos/caja-pasteles.png" alt="Caja para pasteles" className="product-image" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation dots elegantes */}
      <div className="elegant-navigation">
        {heroSlides.map((slide, index) => (
          <button
            key={index}
            className={`nav-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
            style={{
              background: index === currentSlide 
                ? slide.bgGradient 
                : 'rgba(255,255,255,0.3)'
            }}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>

      <style jsx>{`
        .elegant-hero {
          min-height: 100vh;
          position: relative;
          display: flex;
          align-items: center;
          opacity: 0;
          transform: translateY(20px);
          transition: all 1s ease-out;
          overflow: hidden;
        }
        
        .elegant-hero.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
        }
        
        .hero-background::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url('/src/assets/productos/packagingVarios.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          z-index: 1;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.95) 0%,
            rgba(255, 248, 240, 0.9) 25%,
            rgba(252, 228, 236, 0.9) 50%,
            rgba(240, 248, 255, 0.95) 100%
          );
          z-index: 2;
        }

        .hero-container {
          position: relative;
          z-index: 3;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .hero-content {
          animation: fadeInUp 1.2s ease-out 0.3s both;
        }

        .headline-text {
          font-size: 3.5rem;
          font-weight: 400;
          line-height: 1.2;
          margin: 0 0 24px 0;
          color: #2d3748;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .headline-highlight {
          font-weight: 700;
          color: #2d3748;
          position: relative;
          padding: 0 8px;
          border-radius: 8px;
        }

        .hero-subtitle {
          font-size: 1.2rem;
          color: #64748b;
          margin-bottom: 32px;
          line-height: 1.6;
          font-weight: 400;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .hero-actions {
          display: flex;
          gap: 20px;
          align-items: center;
          flex-wrap: wrap;
        }

        .hero-cta-primary {
          background: linear-gradient(135deg, #FF9A8A, #FFA726);
          color: white;
          border: none;
          padding: 18px 36px;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.3s ease;
          box-shadow: 0 6px 25px rgba(255, 154, 138, 0.3);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          min-height: 44px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .hero-cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(255, 154, 138, 0.4);
        }

        .cta-icon {
          font-size: 1.3rem;
        }

        .hero-cta-secondary {
          background: transparent;
          color: #64748b;
          border: 2px solid rgba(100, 116, 139, 0.3);
          padding: 16px 32px;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          backdrop-filter: blur(10px);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .hero-cta-secondary:hover {
          border-color: rgba(100, 116, 139, 0.5);
          background: rgba(255, 255, 255, 0.5);
          transform: translateY(-1px);
        }

        .secondary-arrow {
          transition: transform 0.3s ease;
        }

        .hero-cta-secondary:hover .secondary-arrow {
          transform: translateX(3px);
        }


        .hero-decoration {
          position: relative;
          height: 500px;
          animation: fadeInUp 1.2s ease-out 0.6s both;
        }

        .floating-elements {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        .elegant-circle {
          position: absolute;
          border-radius: 50%;
          opacity: 0.6;
          animation: float 4s ease-in-out infinite;
        }

        .circle-1 {
          width: 120px;
          height: 120px;
          background: linear-gradient(135deg, #FF9A8A, #FFA726);
          top: 10%;
          right: 20%;
          animation-delay: 0s;
        }

        .circle-2 {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #F48FB1, #EC407A);
          bottom: 30%;
          left: 10%;
          animation-delay: 1s;
        }

        .circle-3 {
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, #81C784, #4FD1C7);
          top: 50%;
          right: 10%;
          animation-delay: 2s;
        }

        .feature-highlights {
          position: absolute;
          top: 20%;
          left: 20%;
          right: 20%;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        
        .product-icons-spiral {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }
        
        .product-icon-item {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s ease;
          cursor: pointer;
          pointer-events: auto;
          animation: floatProduct 4s ease-in-out infinite;
          width: 120px;
          height: 120px;
          border-radius: 20px;
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.8));
          box-shadow: 0 12px 35px rgba(0,0,0,0.12), 0 4px 15px rgba(0,0,0,0.06);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.6);
          transform-style: preserve-3d;
        }
        
        .product-icon-item:hover {
          transform: translateY(-12px) scale(1.08) rotateY(5deg);
          box-shadow: 0 20px 45px rgba(0,0,0,0.18), 0 8px 25px rgba(0,0,0,0.1);
        }
        
        .product-image {
          width: 90px;
          height: 90px;
          object-fit: cover;
          border-radius: 15px;
          transition: all 0.4s ease;
          filter: brightness(1.05) saturate(1.1) contrast(1.05);
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        
        .product-icon-item:hover .product-image {
          filter: brightness(1.15) saturate(1.25) contrast(1.1);
          transform: scale(1.02);
        }
        
        /* Posicionamiento centralizado entre círculos */
        .icon-1 { 
          top: 25%; 
          right: 35%; 
          animation-delay: 0s; 
        }
        
        .icon-2 { 
          top: 55%; 
          right: 15%; 
          animation-delay: 1s; 
        }
        
        .icon-3 { 
          bottom: 35%; 
          right: 40%; 
          animation-delay: 2s; 
        }
        
        .icon-4 { 
          bottom: 25%; 
          left: 25%; 
          animation-delay: 0.5s; 
        }


        .feature-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          transition: transform 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-2px);
        }

        .feature-icon {
          font-size: 2rem;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
        }

        .feature-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .feature-title {
          font-size: 1rem;
          font-weight: 600;
          color: #2d3748;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .feature-desc {
          font-size: 0.85rem;
          color: #64748b;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .elegant-navigation {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 12px;
          z-index: 4;
        }

        .nav-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          background: rgba(255,255,255,0.3);
        }

        .nav-dot.active {
          transform: scale(1.5);
        }

        /* Animaciones */
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% { 
            transform: translateY(0px); 
          }
          50% { 
            transform: translateY(-20px); 
          }
        }
        
        @keyframes floatProduct {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          33% { 
            transform: translateY(-8px) rotate(1deg); 
          }
          66% { 
            transform: translateY(-4px) rotate(-1deg); 
          }
        }
        
        @keyframes bounce {
          0%, 100% { 
            transform: scale(1); 
          }
          50% { 
            transform: scale(1.1); 
          }
        }

        /* Typography */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        /* Mobile Optimization */
        @media (max-width: 768px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 40px;
            text-align: center;
            padding: 20px 16px;
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


          
          .hero-decoration {
            height: 300px;
            order: -1;
          }

          .feature-highlights {
            top: 10%;
            left: 10%;
            right: 10%;
          }
          
          .product-icons-spiral {
            position: relative;
            height: 150px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            gap: 20px;
          }
          
          .product-icon-item {
            position: relative !important;
            display: inline-flex;
          }
          
          /* Reset positioning for mobile */
          .icon-1, .icon-2, .icon-3, .icon-4 { 
            top: auto !important;
            right: auto !important;
            bottom: auto !important;
            left: auto !important;
          }
          
          .product-icon-item {
            width: 100px;
            height: 100px;
            position: relative !important;
            display: inline-flex;
          }
          
          .product-image {
            width: 75px;
            height: 75px;
          }

          .feature-card {
            padding: 16px;
          }

          .feature-icon {
            font-size: 1.5rem;
            width: 50px;
            height: 50px;
          }

          .elegant-navigation {
            bottom: 20px;
          }
        }

        /* Performance Optimization */
        .elegant-hero * {
          will-change: transform, opacity;
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .elegant-circle,
          .hero-cta-primary,
          .feature-card {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default ElegantHero;