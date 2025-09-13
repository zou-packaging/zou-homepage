import React from 'react';
import './footer.css';
import footerLogo from '../../assets/footer/footerLogo.png';

const Footer = () => {
  const handleWhatsAppContact = (message) => {
    const phoneNumber = '5493512341463';
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    let whatsappUrl;
    if (isMobile) {
      whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    } else {
      whatsappUrl = `https://wa.me/${phoneNumber}`;
    }
    
    window.open(whatsappUrl, '_blank');
    
    if (!isMobile) {
      setTimeout(() => {
        if (confirm('¿Copiar mensaje para pegar en WhatsApp?')) {
          navigator.clipboard.writeText(message).catch(() => {
            prompt('Copia este mensaje:', message);
          });
        }
      }, 2000);
    }
  };

  const handleScrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo-container">
              <img src={footerLogo} alt="Zou Packaging" className="footer-logo-image" />
              <h3 className="footer-company-name">Zou Packaging</h3>
            </div>
            <p className="footer-description">
              Soluciones innovadoras en packaging sustentable. 
              Diseñamos y fabricamos productos personalizados para tu marca con calidad premium.
            </p>
            <div className="footer-certifications">
              <span className="cert-badge">🌱 Eco-Friendly</span>
              <span className="cert-badge">✨ Premium Quality</span>
            </div>
          </div>
          
          <div className="footer-nav">
            <h4 className="footer-title">Navegación</h4>
            <ul className="footer-links">
              <li>
                <button 
                  className="footer-link" 
                  onClick={() => handleScrollToSection('inicio')}
                >
                  Inicio
                </button>
              </li>
              <li>
                <button 
                  className="footer-link" 
                  onClick={() => handleScrollToSection('categorias')}
                >
                  Productos
                </button>
              </li>
              <li>
                <button 
                  className="footer-link" 
                  onClick={() => handleScrollToSection('nosotros')}
                >
                  Nosotros
                </button>
              </li>
              <li>
                <button 
                  className="footer-link" 
                  onClick={() => handleScrollToSection('contacto')}
                >
                  Contacto
                </button>
              </li>
            </ul>
          </div>
          
          <div className="footer-products">
            <h4 className="footer-title">Productos</h4>
            <ul className="footer-links">
              <li>
                <button 
                  className="footer-link" 
                  onClick={() => handleWhatsAppContact('Hola! Me interesan los vasos personalizados.')}
                >
                  Vasos & Recipientes
                </button>
              </li>
              <li>
                <button 
                  className="footer-link" 
                  onClick={() => handleWhatsAppContact('Hola! Me interesan las cajas para delivery.')}
                >
                  Cajas & Contenedores
                </button>
              </li>
              <li>
                <button 
                  className="footer-link" 
                  onClick={() => handleWhatsAppContact('Hola! Me interesan las bolsas ecológicas.')}
                >
                  Bolsas Eco
                </button>
              </li>
              <li>
                <button 
                  className="footer-link" 
                  onClick={() => handleWhatsAppContact('Hola! Me interesan cubiertos y accesorios.')}
                >
                  Accesorios Varios
                </button>
              </li>
            </ul>
          </div>
          
          <div className="footer-contact">
            <h4 className="footer-title">Contacto</h4>
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div className="contact-text">
                  <span className="contact-label">Dirección:</span>
                  <span className="contact-value">Entre Ríos 2874, X5006 Córdoba</span>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div className="contact-text">
                  <span className="contact-label">Teléfono:</span>
                  <button 
                    className="contact-value contact-link"
                    onClick={() => handleWhatsAppContact('Hola! Me gustaría contactarme con ustedes.')}
                  >
                    +54 9 351 234 1463
                  </button>
                </div>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12,6 12,12 16,14"/>
                  </svg>
                </div>
                <div className="contact-text">
                  <span className="contact-label">Horarios:</span>
                  <span className="contact-value">Lun - Vie: 8:30 - 18:00</span>
                </div>
              </div>
            </div>
            
            <button 
              className="footer-whatsapp-cta"
              onClick={() => handleWhatsAppContact('Hola! Me gustaría conocer más sobre sus productos y servicios.')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.894 3.488"/>
              </svg>
              Contactar por WhatsApp
            </button>
          </div>
          
          <div className="footer-social">
            <h4 className="footer-title">Síguenos</h4>
            <div className="footer-social-icons">
              <a 
                href="https://instagram.com/zoupackaging" 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-social-link" 
                aria-label="Síguenos en Instagram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="3"/>
                  <path d="m16.5 7.5.01 0" strokeLinecap="round"/>
                </svg>
                <span>Instagram</span>
              </a>
              <a 
                href="https://facebook.com/zoupackaging" 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-social-link" 
                aria-label="Síguenos en Facebook"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
                <span>Facebook</span>
              </a>
            </div>
            
            <div className="footer-newsletter">
              <p className="newsletter-text">¿Querés recibir noticias y ofertas?</p>
              <button 
                className="newsletter-btn"
                onClick={() => handleWhatsAppContact('Hola! Me gustaría suscribirme para recibir noticias y ofertas especiales.')}
              >
                Suscribirme
              </button>
            </div>
          </div>
        </div>
        
        <div className="footer-divider"></div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © 2025 Zou Packaging. Todos los derechos reservados.
            </p>
            <div className="footer-legal">
              <button 
                className="footer-legal-link"
                onClick={() => handleWhatsAppContact('Hola! Me gustaría conocer sus términos y condiciones.')}
              >
                Términos y Condiciones
              </button>
              <span className="legal-separator">•</span>
              <button 
                className="footer-legal-link"
                onClick={() => handleWhatsAppContact('Hola! Me gustaría conocer su política de privacidad.')}
              >
                Política de Privacidad
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;