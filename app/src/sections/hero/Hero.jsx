import React, { useState, useEffect } from 'react';
import './Hero.css';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides = [
    {
      headline: "Packaging Sustentable que",
      highlight: "IMPULSA tu Marca",
      subtitle: "Desde vasos hasta bolsas ecológicas, diseñados para destacar tu identidad",
      cta: "SOLICITAR PRESUPUESTO GRATIS"
    },
    {
      headline: "Entrega Express en",
      highlight: "24-48 HORAS",
      subtitle: "Tu packaging listo cuando lo necesitas, sin comprometer la calidad",
      cta: "VER PRODUCTOS DISPONIBLES"
    },
    {
      headline: "Personalización sin",
      highlight: "COSTO MÍNIMO",
      subtitle: "Tu logo y colores en productos premium biodegradables",
      cta: "PERSONALIZAR AHORA"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handlePrimaryAction = () => {
    const phoneNumber = '5493512341463';
    const message = '¡Hola! Me interesa solicitar un presupuesto gratuito para productos de packaging. ¿Podrían ayudarme?';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Track conversion
    if (typeof gtag !== 'undefined') {
      gtag('event', 'hero_cta_click', {
        event_category: 'conversion',
        event_label: 'primary_cta',
        value: 1
      });
    }
    
    window.open(whatsappUrl, '_blank');
  };

  const handleSecondaryAction = () => {
    // Scroll to products section
    const productsSection = document.getElementById('productos');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Track engagement
    if (typeof gtag !== 'undefined') {
      gtag('event', 'hero_secondary_click', {
        event_category: 'engagement',
        event_label: 'view_catalog'
      });
    }
  };

  const currentSlideData = heroSlides[currentSlide];

  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          {/* Main headline */}
          <div className="hero-headline">
            <h1 className="headline-text">
              {currentSlideData.headline} <br />
              <span className="headline-highlight">{currentSlideData.highlight}</span>
            </h1>
          </div>
          
          {/* Subtitle */}
          <p className="hero-subtitle">
            {currentSlideData.subtitle}
          </p>
          
          {/* CTA Buttons */}
          <div className="hero-actions">
            <button 
              className="hero-cta-primary"
              onClick={handlePrimaryAction}
            >
              <span className="cta-icon">💬</span>
              {currentSlideData.cta}
            </button>
            
            <button 
              className="hero-cta-secondary"
              onClick={handleSecondaryAction}
            >
              Ver Catálogo
            </button>
          </div>
          
          {/* Trust indicators */}
          <div className="hero-trust-indicators">
            <div className="trust-item">
              <span className="trust-icon">💚</span>
              <span className="trust-text">Entrega 24-48hs</span>
            </div>
            <div className="trust-divider">|</div>
            <div className="trust-item">
              <span className="trust-icon">⭐</span>
              <span className="trust-text">+500 clientes satisfechos</span>
            </div>
            <div className="trust-divider">|</div>
            <div className="trust-item">
              <span className="trust-icon">🌱</span>
              <span className="trust-text">100% Biodegradable</span>
            </div>
          </div>
        </div>
        
        {/* Visual elements */}
        <div className="hero-visual">
          <div className="hero-image-container">
            {/* Placeholder for hero image */}
            <div className="hero-image-placeholder">
              <div className="floating-product product-1">🥤</div>
              <div className="floating-product product-2">📦</div>
              <div className="floating-product product-3">🛍️</div>
              <div className="floating-product product-4">🍽️</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Slide indicators */}
      <div className="hero-indicators">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="scroll-arrow">
          <span>Ver productos</span>
          <div className="arrow-down"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;