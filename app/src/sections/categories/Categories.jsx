import React, { useState } from 'react';
import './Categories.css';

// Importar imágenes correctamente
import fullVasos from '../../assets/productos/fullVasos.jpg';
import fullCajas from '../../assets/productos/fullCajas.jpg';
import fullBolsas from '../../assets/productos/fullBolsas.jpeg';
import fullCubiertos from '../../assets/productos/fullCubiertos.jpg';

const Categories = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const categories = [
    {
      id: 1,
      name: "Vasos & Recipientes",
      icon: "🥤",
      description: "Soluciones para bebidas frías y calientes",
      products: [
        "Vasos térmicos doble pared",
        "Vasos fríos biodegradables", 
        "Recipientes con tapa",
        "Vasos personalizados"
      ],
      badge: "Más popular",
      color: "#25d366",
      backgroundImage: fullVasos
    },
    {
      id: 2,
      name: "Cajas & Contenedores",
      icon: "📦",
      description: "Para delivery, takeaway y e-commerce",
      products: [
        "Cajas para delivery",
        "Contenedores de comida",
        "Cajas para e-commerce",
        "Bandejas apilables"
      ],
      badge: "Envío gratis",
      color: "#ff6b35",
      backgroundImage: fullCajas
    },
    {
      id: 3,
      name: "Bolsas Eco",
      icon: "🛍️",
      description: "Bolsas sustentables para todo uso",
      products: [
        "Bolsas kraft con manija",
        "Bolsas biodegradables",
        "Bolsas personalizadas",
        "Bolsas compostables"
      ],
      badge: "100% Eco",
      color: "#28a745",
      backgroundImage: fullBolsas
    },
    {
      id: 4,
      name: "Accesorios Varios",
      icon: "🍽️",
      description: "Complementos esenciales",
      products: [
        "Cubiertos de bambú",
        "Servilletas premium",
        "Tapas y complementos",
        "Kits personalizados"
      ],
      badge: "Nuevo",
      color: "#17a2b8",
      backgroundImage: fullCubiertos
    }
  ];

  const handleCategoryClick = (category) => {
    const phoneNumber = '5493512341463';
    // Mensaje enriquecido y consistente (siempre irá como texto prellenado)
    const baseMessage = `Hola! Me interesa la categoría "${category.name}". Podrían brindarme más información sobre estos productos: ${category.products.join(', ')}?`;

    const encodedMessage = encodeURIComponent(baseMessage);

    // Detección básica de dispositivo
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Siempre incluir el parámetro text, también en desktop
    const whatsappUrl = isMobile
      ? `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`
      : `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Analytics (si está disponible)
    if (typeof gtag !== 'undefined') {
      try {
        gtag('event', 'category_select', {
          event_category: 'engagement',
          event_label: category.name,
          value: 1
        });
      } catch (e) {
        // Silencioso: no romper UX
      }
    }

    const newTab = window.open(whatsappUrl, '_blank');

    // Fallback para navegadores que bloqueen open o protocolo
    if (!newTab) {
      navigator.clipboard?.writeText(baseMessage);
      alert('No se pudo abrir WhatsApp automáticamente. El mensaje se copió al portapapeles.');
    }
  };

  return (
    <section className="categories-section">
      <div className="categories-container">
        {/* Header */}
        <div className="categories-header">
          <h2 className="categories-title">Nuestras Categorías</h2>
          <p className="categories-subtitle">
            Encuentra la solución perfecta para tu negocio
          </p>
        </div>

        {/* Categories Grid */}
        <div className="categories-grid">
          {categories.map((category) => (
            <div
              key={category.id}
              className="category-card"
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
              onClick={() => handleCategoryClick(category)}
              style={{
                backgroundImage: `url(${category.backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                filter: 'opacity(0.9)'
              }}
            >
              {/* Background Overlay para legibilidad */}
              <div className="category-overlay"></div>
              
              {/* Badge */}
              <div 
                className="category-badge"
                style={{ backgroundColor: category.color }}
              >
                {category.badge}
              </div>

              {/* Icon */}
              <div className="category-icon">
                <span className="icon-emoji">{category.icon}</span>
              </div>

              {/* Content */}
              <div className="category-content">
                <h3 className="category-name">{category.name}</h3>
                <p className="category-description">{category.description}</p>

                {/* Products List */}
                <div className={`category-products ${hoveredCategory === category.id ? 'visible' : ''}`}>
                  <ul className="products-list">
                    {category.products.map((product, index) => (
                      <li key={index} className="product-item">
                        <span className="product-bullet">•</span>
                        {product}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <button 
                  className="category-cta"
                  style={{ borderColor: category.color, color: category.color }}
                  onClick={(e) => { e.stopPropagation(); handleCategoryClick(category); }}
                  aria-label={`Consultar por categoría ${category.name} en WhatsApp`}
                >
                  <span>Ver Productos</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>

              {/* Hover Effect Background */}
              <div 
                className="category-bg"
                style={{ backgroundColor: `${category.color}10` }}
              ></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="categories-bottom-cta">
          <div className="bottom-cta-content">
            <h3 className="bottom-cta-title">¿Necesitas algo específico?</h3>
            <p className="bottom-cta-subtitle">
              Nuestro equipo puede crear productos personalizados para tu negocio
            </p>
            <button 
              className="bottom-cta-button"
              onClick={() => {
                const phoneNumber = '5493512341463';
                const message = '¡Hola! Necesito productos personalizados para mi negocio. ¿Podrían ayudarme con una consulta especializada?';
                const encodedMessage = encodeURIComponent(message);
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
                window.open(whatsappUrl, '_blank');
              }}
            >
              <span className="cta-icon">💬</span>
              Consulta Personalizada
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;