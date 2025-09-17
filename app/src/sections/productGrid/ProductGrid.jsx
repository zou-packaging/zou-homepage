import React, { useState } from 'react';
import './ProductGrid.css';

const ProductGrid = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Productos destacados (máximo 6 según mejores prácticas)
  const featuredProducts = [
    {
      id: 1,
      name: "Vaso Térmico Premium",
      category: "Vasos",
      material: "Cartón biodegradable",
      size: "8oz - 12oz - 16oz",
      price: "Desde $45",
      image: "/api/placeholder/300/300",
      badge: "Más vendido",
      features: ["Doble pared", "Personalizable", "Biodegradable"]
    },
    {
      id: 2,
      name: "Caja Delivery Eco",
      category: "Cajas",
      material: "Cartón kraft",
      size: "S - M - L - XL",
      price: "Desde $85",
      image: "/api/placeholder/300/300",
      badge: "Nuevo",
      features: ["Resistente al vapor", "Apilable", "Reciclable"]
    },
    {
      id: 3,
      name: "Bolsa Kraft Premium",
      category: "Bolsas",
      material: "Papel kraft",
      size: "Varios tamaños",
      price: "Desde $25",
      image: "/api/placeholder/300/300",
      badge: "Oferta",
      features: ["Manijas reforzadas", "Impermeable", "FSC Certificado"]
    },
    {
      id: 4,
      name: "Kit Cubiertos Bambú",
      category: "Varios",
      material: "Bambú natural",
      size: "Set completo",
      price: "Desde $35",
      image: "/api/placeholder/300/300",
      badge: "Eco",
      features: ["100% natural", "Reutilizable", "Compostable"]
    },
    {
      id: 5,
      name: "Contenedor Ensaladas",
      category: "Cajas",
      material: "PLA compostable",
      size: "500ml - 750ml",
      price: "Desde $65",
      image: "/api/placeholder/300/300",
      badge: "Premium",
      features: ["Tapa hermética", "Transparente", "Microondas OK"]
    },
    {
      id: 6,
      name: "Servilletas Personalizadas",
      category: "Varios",
      material: "Papel reciclado",
      size: "20x20cm - 33x33cm",
      price: "Consultar",
      image: "/api/placeholder/300/300",
      badge: "Personalizable",
      features: ["Tu logo", "Colores a medida", "Absorción premium"]
    }
  ];

  const handleAddToQuote = (product) => {
    if (!selectedProducts.find(p => p.id === product.id)) {
      setSelectedProducts([...selectedProducts, product]);
    }
    
    // Track product selection
    if (typeof gtag !== 'undefined') {
      gtag('event', 'product_select', {
        event_category: 'engagement',
        event_label: product.name,
        value: 1
      });
    }
  };

  const handleQuoteRequest = () => {
    const phoneNumber = '5493512341463';
    let message = '¡Hola! Me interesa cotizar los siguientes productos:\n\n';
    
    if (selectedProducts.length > 0) {
      selectedProducts.forEach((product, index) => {
        message += `${index + 1}. ${product.name} (${product.category})\n`;
      });
      message += '\n¿Podrían enviarme precios y disponibilidad?';
    } else {
      message = '¡Hola! Me interesa conocer más sobre sus productos de packaging. ¿Podrían enviarme información?';
    }
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Track conversion
    if (typeof gtag !== 'undefined') {
      gtag('event', 'quote_request', {
        event_category: 'conversion',
        event_label: 'product_grid',
        value: selectedProducts.length
      });
    }
    
    window.open(whatsappUrl, '_blank');
  };

  const getBadgeClass = (badge) => {
    const badgeClasses = {
      'Más vendido': 'badge-bestseller',
      'Nuevo': 'badge-new',
      'Oferta': 'badge-sale',
      'Eco': 'badge-eco',
      'Premium': 'badge-premium',
      'Personalizable': 'badge-custom'
    };
    return badgeClasses[badge] || 'badge-default';
  };

  return (
    <section className="product-grid-section">
      <div className="product-grid-container">
        {/* Header */}
        <div className="grid-header">
          <h2 className="grid-title">Productos Destacados</h2>
          <p className="grid-subtitle">
            Los productos más elegidos por nuestros clientes
          </p>
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {featuredProducts.map((product) => (
            <div key={product.id} className="product-card">
              {/* Badge */}
              <div className={`product-badge ${getBadgeClass(product.badge)}`}>
                {product.badge}
              </div>

              {/* Image */}
              <div className="product-image">
                <img src={product.image} alt={product.name} loading="lazy" />
                <div className="product-overlay">
                  <button 
                    className="quick-view-btn"
                    onClick={() => handleAddToQuote(product)}
                  >
                    Vista rápida
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="product-content">
                <div className="product-category">{product.category}</div>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-material">{product.material}</p>
                <p className="product-size">{product.size}</p>
                
                {/* Features */}
                <div className="product-features">
                  {product.features.slice(0, 2).map((feature, index) => (
                    <span key={index} className="feature-tag">{feature}</span>
                  ))}
                </div>

                {/* Price and Action */}
                <div className="product-footer">
                  <div className="product-price">{product.price}</div>
                  <button 
                    className={`add-quote-btn ${selectedProducts.find(p => p.id === product.id) ? 'selected' : ''}`}
                    onClick={() => handleAddToQuote(product)}
                  >
                    {selectedProducts.find(p => p.id === product.id) ? '✓ Agregado' : 'Agregar'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quote Summary */}
        {selectedProducts.length > 0 && (
          <div className="quote-summary">
            <div className="summary-content">
              <span className="summary-text">
                {selectedProducts.length} producto{selectedProducts.length > 1 ? 's' : ''} seleccionado{selectedProducts.length > 1 ? 's' : ''} para cotizar
              </span>
              <button className="quote-btn" onClick={handleQuoteRequest}>
                <span className="quote-icon">💬</span>
                Solicitar Cotización
              </button>
            </div>
          </div>
        )}

        {/* View All CTA */}
        <div className="view-all-section">
          <p className="view-all-text">¿No encuentras lo que buscas?</p>
          <button className="view-all-btn" onClick={handleQuoteRequest}>
            Ver Catálogo Completo
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;