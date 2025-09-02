import React, { useState, useEffect, useCallback } from 'react';

const ElegantHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Copy optimizado con estética elegante + imágenes dinámicas
  const heroSlides = [
    {
      headline: "Diseñados para usar,",
      highlight: "personalizados",
      endline: "para tu marca.",
      subtitle: "En cada detalle hay una oportunidad de destacar. Ya sea en un café, un evento o una tienda, tus productos hablan por vos.",
      cta: "Solicitar presupuesto",
      ctaIcon: "✨",
      secondaryCta: "Ver productos",
      bgGradient: "linear-gradient(135deg, #FF9A8A, #FFA726)",
      productImage: "/src/assets/productos/fullCollage.webp",
      productAlt: "Colección completa de productos Zou Packaging"
    },
    {
      headline: "Packaging que cuida",
      highlight: "el planeta",
      endline: "y tu negocio.",
      subtitle: "Soluciones sustentables sin comprometer la calidad. Conectá con clientes que valoran el cuidado del medio ambiente.",
      cta: "Explorar opciones eco",
      ctaIcon: "🌱",
      secondaryCta: "Ver materiales",
      bgGradient: "linear-gradient(135deg, #81C784, #4FD1C7)",
      productImage: "/src/assets/productos/fullBolsas.jpeg",
      productAlt: "Colección de bolsas ecológicas y sustentables"
    },
    {
      headline: "Tu identidad visual",
      highlight: "en cada producto",
      endline: "que entregas.",
      subtitle: "Desde el diseño hasta la entrega, creamos experiencias que fortalecen la conexión con tu marca.",
      cta: "Crear mi identidad",
      ctaIcon: "🎨",
      secondaryCta: "Ver portfolio",
      bgGradient: "linear-gradient(135deg, #F48FB1, #EC407A)",
      productImage: "/src/assets/productos/fullCajas.jpg",
      productAlt: "Variedad de cajas personalizadas para tu marca"
    },
    {
      headline: "Vasos únicos",
      highlight: "para cada bebida",
      endline: "especial.",
      subtitle: "Desde café hasta smoothies, vasos diseñados para realzar la experiencia de tus clientes y fortalecer tu marca.",
      cta: "Ver línea de vasos",
      ctaIcon: "☕",
      secondaryCta: "Consultar medidas",
      bgGradient: "linear-gradient(135deg, #FF7043, #D84315)",
      productImage: "/src/assets/productos/fullVasos.jpg",
      productAlt: "Colección completa de vasos personalizados"
    },
    {
      headline: "Experiencias completas",
      highlight: "para cada momento",
      endline: "especial.",
      subtitle: "Cubiertos y accesorios que complementan la experiencia de tus clientes con elegancia y funcionalidad.",
      cta: "Ver toda la línea",
      ctaIcon: "🍴",
      secondaryCta: "Consultar stock",
      bgGradient: "linear-gradient(135deg, #9C27B0, #673AB7)",
      productImage: "/src/assets/productos/fullCubiertos.jpg",
      productAlt: "Cubiertos y accesorios para experiencias completas"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // Tiempo optimizado: 5 segundos
    
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // Función optimizada para conversión WhatsApp
  const handlePrimaryAction = useCallback(() => {
    const phoneNumber = '5493512341463';
    const currentSlideData = heroSlides[currentSlide];
    
    // Mensaje personalizado según slide actual
    const messages = [
      '✨ Hola! Me interesa el diseño personalizado para mi marca. Vi su página y me gustaría solicitar un presupuesto.',
      '🌱 Hola! Me interesa conocer sus opciones sustentables. ¿Podrían mostrarme los materiales eco-friendly disponibles?',
      '🎨 Hola! Me interesa crear una identidad visual fuerte para mi negocio. ¿Podrían ayudarme con el diseño?',
      '☕ Hola! Me interesan los vasos personalizados para mi negocio. ¿Podrían mostrarme la línea completa y medidas disponibles?',
      '🍴 Hola! Me interesan los cubiertos y accesorios para complementar la experiencia de mis clientes. ¿Qué opciones tienen disponibles?'
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
          
          {/* Showcase de productos con imágenes dinámicas */}
          <div className="product-showcase">
            <div className="showcase-container">
              <div className="showcase-image-wrapper">
                <img 
                  src={currentSlideData.productImage} 
                  alt={currentSlideData.productAlt} 
                  className="packaging-collage" 
                  key={currentSlide} // For smooth transitions
                />
                <div className="showcase-overlay">
                  <span className="showcase-label">Nuestros Productos</span>
                </div>
              </div>
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
          width: 160px;
          height: 160px;
          background: linear-gradient(135deg, #FF9A8A, #FFA726);
          top: 10%;
          right: 20%;
          animation-delay: 0s;
        }

        .circle-2 {
          width: 120px;
          height: 120px;
          background: linear-gradient(135deg, #F48FB1, #EC407A);
          bottom: 30%;
          left: 10%;
          animation-delay: 1s;
        }

        .circle-3 {
          width: 140px;
          height: 140px;
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
        
        .product-showcase {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }
        
        .showcase-container {
          position: relative;
          animation: floatShowcase 6s ease-in-out infinite;
          pointer-events: auto;
        }
        
        .showcase-image-wrapper {
          position: relative;
          width: 380px;
          height: 340px;
          border-radius: 25px;
          overflow: hidden;
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85));
          box-shadow: 
            0 25px 60px rgba(0,0,0,0.15),
            0 10px 25px rgba(0,0,0,0.08),
            inset 0 1px 0 rgba(255,255,255,0.8);
          backdrop-filter: blur(20px);
          border: 2px solid rgba(255, 255, 255, 0.6);
          transition: all 0.5s ease;
          cursor: pointer;
          transform-style: preserve-3d;
        }
        
        .showcase-image-wrapper:hover {
          transform: translateY(-10px) scale(1.03) rotateX(2deg) rotateY(2deg);
          box-shadow: 
            0 35px 80px rgba(0,0,0,0.2),
            0 15px 35px rgba(0,0,0,0.12),
            inset 0 1px 0 rgba(255,255,255,0.9);
        }
        
        .packaging-collage {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.8s ease-in-out;
          filter: brightness(1.05) saturate(1.1) contrast(1.02);
          animation: fadeInImage 0.8s ease-in-out;
        }
        
        .showcase-image-wrapper:hover .packaging-collage {
          filter: brightness(1.1) saturate(1.15) contrast(1.05);
          transform: scale(1.02);
        }
        
        .showcase-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.3), transparent);
          padding: 20px;
          transform: translateY(100%);
          transition: all 0.4s ease;
        }
        
        .showcase-image-wrapper:hover .showcase-overlay {
          transform: translateY(0);
        }
        
        .showcase-label {
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
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
        
        @keyframes fadeInImage {
          0% {
            opacity: 0;
            transform: scale(1.05);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes floatShowcase {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          33% { 
            transform: translateY(-12px) rotate(1deg); 
          }
          66% { 
            transform: translateY(-8px) rotate(-0.5deg); 
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
          
          .product-showcase {
            position: relative;
            height: 250px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          
          .showcase-image-wrapper {
            width: 240px;
            height: 210px;
            border-radius: 20px;
          }
          
          .showcase-label {
            font-size: 0.9rem;
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