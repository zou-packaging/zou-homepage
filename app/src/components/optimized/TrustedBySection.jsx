import React, { useEffect, useRef } from 'react';
import cortadiniLogo from '../../assets/logoszou/cortadini.jpg';
import cremuaLogo from "../../assets/logoszou/cremuá.jpg";
import donGenuarioLogo from "../../assets/logoszou/donGenuario.jpg";
import giuseppeLogo from "../../assets/logoszou/giuseppe.jpg";
import laTribuLogo from "../../assets/logoszou/laTribu.jpg";
import passageCafeLogo from "../../assets/logoszou/passageCafe.jpg";
import shiokLogo from "../../assets/logoszou/shiok.jpg";
import standar69Logo from "../../assets/logoszou/standar69.jpg";

const TrustedBySection = () => {
  const scrollRef = useRef(null);

  // Auto-scroll infinito para los logos
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollSpeed = 0.5;

    const scroll = () => {
      scrollAmount += scrollSpeed;
      if (scrollAmount >= scrollContainer.scrollWidth / 2) {
        scrollAmount = 0;
      }
      scrollContainer.scrollLeft = scrollAmount;
      requestAnimationFrame(scroll);
    };

    const animation = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animation);
  }, []);

  // Datos de los clientes
  const clients = [
    {
      name: 'Cortadini',
      image: cortadiniLogo,
      category: 'Panadería Artesanal',
      testimonial: 'Packaging que refleja nuestra calidad'
    },
    {
      name: 'Cremuá',
      image: cremuaLogo,
      category: 'Heladería Premium',
      testimonial: 'Envases perfectos para delivery'
    },
    {
      name: 'Don Genuario',
      image: donGenuarioLogo,
      category: 'Restaurante',
      testimonial: 'Soluciones sustentables excepcionales'
    },
    {
      name: 'Giuseppe',
      image: giuseppeLogo,
      category: 'Cocina Italiana',
      testimonial: 'Packaging elegante y funcional'
    },
    {
      name: 'La Tribu',
      image: laTribuLogo,
      category: 'Cafetería',
      testimonial: 'Comprometidos con el medio ambiente'
    },
    {
      name: 'Passage Café',
      image: passageCafeLogo,
      category: 'Coffee Shop',
      testimonial: 'Vasos que destacan nuestra marca'
    },
    {
      name: 'Shiok Coffee Roaster',
      image: shiokLogo,
      category: 'Tostador de Café',
      testimonial: 'Packaging premium para café premium'
    },
    {
      name: 'Standard 69',
      image: standar69Logo,
      category: 'Bar & Cocina',
      testimonial: 'Diseño que comunica nuestra esencia'
    }
  ];

  // Duplicar array para scroll infinito
  const duplicatedClients = [...clients, ...clients];

  const handleWhatsAppContact = () => {
    const phoneNumber = '5493512341463';
    const message = '🏆 Hola! Vi que trabajan con empresas como Giuseppe, La Tribu y otros. Me interesa ser parte de sus clientes. ¿Pueden ayudarme?';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    if (typeof gtag !== 'undefined') {
      gtag('event', 'conversion', {
        send_to: 'AW-CONVERSION_ID/Trusted_By_CTA',
        event_category: 'WhatsApp',
        event_label: 'trusted_by_section',
        value: 1
      });
    }
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <section className="trusted-by-section">
        <div className="container">
          <div className="section-header">
            <div className="stats-container">
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Empresas confían</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">50k+</span>
                <span className="stat-label">Productos entregados</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">4.9★</span>
                <span className="stat-label">Rating promedio</span>
              </div>
            </div>
            
            <h2 className="section-title">
              Empresas que eligieron marcar la 
              <span className="title-highlight"> diferencia</span>
            </h2>
            <p className="section-subtitle">
              Más de 60 empresas ya potencian su marca con nuestro packaging sustentable
            </p>
          </div>

          <div className="logos-carousel">
            <div className="carousel-container" ref={scrollRef}>
              <div className="logos-track">
                {duplicatedClients.map((client, index) => (
                  <div key={index} className="client-card">
                    <div className="client-logo-container">
                      <img 
                        src={client.image} 
                        alt={`Logo de ${client.name}`}
                        className="client-logo"
                        loading="lazy"
                      />
                      <div className="client-overlay">
                        <div className="client-info">
                          <h4 className="client-name">{client.name}</h4>
                          <p className="client-category">{client.category}</p>
                          <blockquote className="client-testimonial">
                            "{client.testimonial}"
                          </blockquote>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="carousel-gradient carousel-gradient-left"></div>
            <div className="carousel-gradient carousel-gradient-right"></div>
          </div>

          <div className="social-proof-enhanced">
            <div className="proof-content">
              <div className="proof-icon">
                <div className="icon-badge">
                  <span className="badge-emoji">🏆</span>
                </div>
              </div>
              <div className="proof-text">
                <h3 className="proof-headline">¡Únete a empresas exitosas!</h3>
                <p className="proof-description">
                  Restaurantes, cafeterías y marcas líderes eligen Zou para destacar 
                  su compromiso con la sustentabilidad y la calidad.
                </p>
              </div>
            </div>
            
            <div className="proof-cta">
              <button 
                className="cta-button-main"
                onClick={handleWhatsAppContact}
                aria-label="Ser parte de nuestros clientes exitosos"
              >
                <span className="cta-icon">💬</span>
                <div className="cta-content">
                  <span className="cta-text">Quiero ser parte</span>
                  <span className="cta-subtext">Cotización gratuita</span>
                </div>
              </button>
            </div>
          </div>

          <div className="trust-indicators">
            <div className="trust-item">
              <span className="trust-icon">🌱</span>
              <span className="trust-text">100% Biodegradable</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">⚡</span>
              <span className="trust-text">Entrega 24-48hs</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">🎨</span>
              <span className="trust-text">Personalización gratis</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">📜</span>
              <span className="trust-text">ISO 9001 Certificado</span>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .trusted-by-section {
          padding: 100px 0;
          background: linear-gradient(135deg, #f0fdfa 0%, #ffffff 50%, #f0fdfa 100%);
          position: relative;
          overflow: hidden;
        }

        .trusted-by-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #4fd1c7, transparent);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .stats-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 30px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          color: #4fd1c7;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .stat-label {
          font-size: 0.9rem;
          color: #718096;
          font-weight: 500;
          text-align: center;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .stat-divider {
          width: 1px;
          height: 50px;
          background: linear-gradient(to bottom, transparent, #e2e8f0, transparent);
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 15px;
          line-height: 1.2;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .title-highlight {
          color: #4fd1c7;
          position: relative;
          font-weight: 800;
        }

        .title-highlight::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #4fd1c7, #38b2ac);
          border-radius: 2px;
        }

        .section-subtitle {
          font-size: 1.2rem;
          color: #718096;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.5;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .logos-carousel {
          position: relative;
          margin: 60px 0;
          overflow: hidden;
        }

        .carousel-container {
          overflow: hidden;
          width: 100%;
        }

        .logos-track {
          display: flex;
          gap: 30px;
          width: fit-content;
        }

        .client-card {
          flex-shrink: 0;
          width: 200px;
          height: 140px;
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          background: white;
          box-shadow: 0 4px 20px rgba(79, 209, 199, 0.1);
          border: 1px solid #e6fffa;
          transition: all 0.3s ease;
        }

        .client-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(79, 209, 199, 0.2);
        }

        .client-logo-container {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .client-logo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.3s ease;
        }

        .client-card:hover .client-logo {
          transform: scale(1.05);
        }

        .client-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(79, 209, 199, 0.95), rgba(56, 178, 172, 0.95));
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .client-card:hover .client-overlay {
          opacity: 1;
        }

        .client-info {
          text-align: center;
          color: white;
        }

        .client-name {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 5px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .client-category {
          font-size: 0.85rem;
          opacity: 0.9;
          margin-bottom: 10px;
          font-weight: 500;
        }

        .client-testimonial {
          font-size: 0.8rem;
          font-style: italic;
          opacity: 0.95;
          line-height: 1.3;
        }

        .carousel-gradient {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 100px;
          pointer-events: none;
          z-index: 2;
        }

        .carousel-gradient-left {
          left: 0;
          background: linear-gradient(90deg, #f0fdfa, transparent);
        }

        .carousel-gradient-right {
          right: 0;
          background: linear-gradient(270deg, #f0fdfa, transparent);
        }

        .social-proof-enhanced {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 40px;
          align-items: center;
          background: white;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 8px 30px rgba(79, 209, 199, 0.1);
          border: 1px solid #e6fffa;
          margin: 60px 0;
          position: relative;
          overflow: hidden;
        }

        .social-proof-enhanced::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #4fd1c7, #38b2ac, #4fd1c7);
        }

        .proof-content {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .proof-icon {
          flex-shrink: 0;
        }

        .icon-badge {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #4fd1c7, #38b2ac);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(79, 209, 199, 0.3);
        }

        .badge-emoji {
          font-size: 1.8rem;
        }

        .proof-headline {
          font-size: 1.8rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 10px;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .proof-description {
          color: #718096;
          line-height: 1.6;
          font-size: 1rem;
        }

        .proof-cta {
          flex-shrink: 0;
        }

        .cta-button-main {
          background: linear-gradient(135deg, #4fd1c7, #38b2ac);
          color: white;
          border: none;
          padding: 16px 24px;
          border-radius: 50px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(79, 209, 199, 0.3);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .cta-button-main:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(79, 209, 199, 0.4);
        }

        .cta-icon {
          font-size: 1.2rem;
        }

        .cta-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .cta-text {
          font-weight: 600;
          font-size: 1rem;
          line-height: 1;
        }

        .cta-subtext {
          font-size: 0.8rem;
          opacity: 0.9;
          font-weight: 400;
        }

        .trust-indicators {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-top: 40px;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 20px;
          background: white;
          border-radius: 16px;
          border-left: 4px solid #4fd1c7;
          box-shadow: 0 2px 10px rgba(79, 209, 199, 0.1);
          transition: transform 0.2s ease;
        }

        .trust-item:hover {
          transform: translateY(-2px);
        }

        .trust-icon {
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .trust-text {
          font-weight: 600;
          color: #2d3748;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        @media (max-width: 768px) {
          .trusted-by-section {
            padding: 60px 0;
          }

          .container {
            padding: 0 15px;
          }

          .section-title {
            font-size: 1.8rem;
          }

          .section-subtitle {
            font-size: 1rem;
          }

          .stats-container {
            gap: 20px;
          }

          .stat-number {
            font-size: 2rem;
          }

          .stat-divider {
            display: none;
          }

          .client-card {
            width: 160px;
            height: 120px;
          }

          .social-proof-enhanced {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 20px;
            padding: 30px 20px;
          }

          .proof-content {
            flex-direction: column;
            text-align: center;
          }

          .proof-headline {
            font-size: 1.4rem;
          }

          .cta-button-main {
            width: 100%;
            justify-content: center;
          }

          .trust-indicators {
            grid-template-columns: 1fr;
            gap: 15px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .logos-track,
          .client-logo,
          .cta-button-main {
            animation: none;
            transition: none;
          }
        }
      `}</style>
    </>
  );
};

export default TrustedBySection;