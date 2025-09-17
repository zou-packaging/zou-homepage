import React from 'react';
import './ValueProposition.css';

const ValueProposition = () => {
  const handleCTAClick = () => {
    const phoneNumber = '5493512341463';
    const message = '¡Hola! Después de ver sus beneficios, me interesa comenzar mi pedido. ¿Podrían ayudarme con una cotización personalizada?';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="value-proposition-section">
      <div className="value-proposition-container">
        <div className="value-header">
          <h2 className="value-title">¿Por qué elegir Zou Packaging?</h2>
          <p className="value-subtitle">
            La diferencia que tu marca necesita
          </p>
        </div>

        <div className="value-grid">
          <div className="value-item">
            <div className="value-icon">✅</div>
            <h3>Materiales 100% Biodegradables</h3>
            <p>Cuida el planeta sin comprometer la calidad</p>
          </div>
          
          <div className="value-item">
            <div className="value-icon">⚡</div>
            <h3>Entrega Express (24-48hs en Córdoba)</h3>
            <p>Tu pedido cuando lo necesites</p>
          </div>
          
          <div className="value-item">
            <div className="value-icon">🎨</div>
            <h3>Personalización sin costo mínimo</h3>
            <p>Tu logo desde el primer producto</p>
          </div>
          
          <div className="value-item">
            <div className="value-icon">💰</div>
            <h3>Mejores precios del mercado</h3>
            <p>Calidad premium a precio justo</p>
          </div>
          
          <div className="value-item">
            <div className="value-icon">🏆</div>
            <h3>+15 años de experiencia</h3>
            <p>Respaldando marcas exitosas</p>
          </div>
        </div>

        <div className="value-cta">
          <button className="cta-button" onClick={handleCTAClick}>
            Comenzar Mi Pedido
          </button>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;