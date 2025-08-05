import React, { useState } from 'react';
import './form.css';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
    selectedProducts: [
      {
        id: 1,
        name: 'Vaso Térmico 440cc',
        category: 'Vasos',
        image: '/api/placeholder/60/60'
      },
      {
        id: 2,
        name: 'Vaso Térmico 440cc',
        category: 'Vasos',
        image: '/api/placeholder/60/60'
      },
      {
        id: 3,
        name: 'Servilletas Personalizadas',
        category: 'Servilletas',
        image: '/api/placeholder/60/60'
      },
      {
        id: 4,
        name: 'Bolsas Ecológicas',
        category: 'Bolsas',
        image: '/api/placeholder/60/60'
      },
      {
        id: 5,
        name: 'Taza Personalizada',
        category: 'Tazas',
        image: '/api/placeholder/60/60'
      }
    ]
  });

  // Productos disponibles para seleccionar
  const availableProducts = [
    {
      id: 1,
      name: 'Vaso Térmico 440cc',
      category: 'Vasos',
      image: '/api/placeholder/80/80' // Placeholder hasta tener imágenes reales
    },
    {
      id: 2,
      name: 'Vaso Térmico 440cc',
      category: 'Vasos', 
      image: '/api/placeholder/80/80'
    },
    {
      id: 3,
      name: 'Servilletas Personalizadas',
      category: 'Servilletas',
      image: '/api/placeholder/80/80'
    },
    {
      id: 4,
      name: 'Bolsas Ecológicas',
      category: 'Bolsas',
      image: '/api/placeholder/80/80'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addProduct = (product) => {
    setFormData(prev => ({
      ...prev,
      selectedProducts: [...prev.selectedProducts, product]
    }));
  };

  const removeProduct = (productId) => {
    setFormData(prev => ({
      ...prev,
      selectedProducts: prev.selectedProducts.filter(p => p.id !== productId)
    }));
  };

  const clearSelection = () => {
    setFormData(prev => ({
      ...prev,
      selectedProducts: []
    }));
  };

  const sendToWhatsApp = () => {
    const { name, phone, message, selectedProducts } = formData;
    
    if (!name || !phone) {
      alert('Por favor completa los campos obligatorios (Nombre y Teléfono)');
      return;
    }

    // Crear mensaje para WhatsApp
    let whatsappMessage = `¡Hola! Me interesa solicitar un presupuesto.\n\n`;
    whatsappMessage += `*Datos del cliente:*\n`;
    whatsappMessage += `Nombre: ${name}\n`;
    whatsappMessage += `Teléfono: ${phone}\n\n`;
    
    if (selectedProducts.length > 0) {
      whatsappMessage += `*Productos seleccionados (${selectedProducts.length}):*\n`;
      selectedProducts.forEach((product, index) => {
        whatsappMessage += `${index + 1}. ${product.name} - ${product.category}\n`;
      });
      whatsappMessage += `\n`;
    }
    
    if (message) {
      whatsappMessage += `*Mensaje adicional:*\n${message}\n\n`;
    }
    
    whatsappMessage += `¡Gracias por contactarnos!`;

    // Número de WhatsApp (cambiar por el número real)
    const phoneNumber = '5491234567890'; // Formato: código país + número sin +
    
    // Codificar mensaje para URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Crear URL de WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Abrir WhatsApp
    window.open(whatsappURL, '_blank');
  };

  return (
    <section className="quote-request-section">
      <div className="quote-request-container">
        <div className="quote-request-header">
          <h2 className="quote-request-title">Solicita tu presupuesto en simples pasos</h2>
        </div>
        
        <div className="quote-request-content">
          {/* Formulario */}
          <div className="quote-form-left">
            <div className="quote-form-card">
              <h3 className="quote-form-subtitle">Formulario</h3>
              <p className="quote-form-description">
                Completa tus datos para que podamos personalizar tu presupuesto.
              </p>
              
              <div className="quote-input-group">
                <label htmlFor="name">Nombre y Apellido *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Juan Pérez"
                  required
                />
              </div>
              
              <div className="quote-input-group">
                <label htmlFor="phone">Teléfono *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="11 234568"
                  required
                />
                <small>Número de teléfono con WhatsApp</small>
              </div>
              
              <div className="quote-input-group">
                <label htmlFor="message">Mensaje adicional (opcional)</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Contanos más sobre lo que necesitas..."
                  maxLength="120"
                ></textarea>
                <small>{formData.message.length}/120</small>
              </div>
              
              <button 
                type="button" 
                onClick={sendToWhatsApp}
                className="quote-whatsapp-btn"
              >
                Enviar por WhatsApp
              </button>
            </div>
          </div>
          
          {/* Productos Seleccionados */}
          <div className="quote-form-right">
            <div className="quote-products-card">
              <h3 className="quote-products-subtitle">
                Productos seleccionados ({formData.selectedProducts.length})
              </h3>
              <p className="quote-products-description">
                Los productos seleccionados serán incluidos para generar el presupuesto.
              </p>
              
              <div className="quote-selected-products">
                {formData.selectedProducts.length === 0 ? (
                  <div className="quote-no-products">
                    <p>No hay productos seleccionados aún.</p>
                    <p>Puedes agregar productos desde nuestro catálogo.</p>
                  </div>
                ) : (
                  formData.selectedProducts.map((product) => (
                    <div key={product.id} className="quote-product-item">
                      <div className="quote-product-info">
                        <img src={product.image} alt={product.name} className="quote-product-image" />
                        <div className="quote-product-details">
                          <h4>{product.name}</h4>
                          <span>{product.category}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeProduct(product.id)}
                        className="quote-remove-btn"
                      >
                        ×
                      </button>
                    </div>
                  ))
                )}
              </div>
              
              {formData.selectedProducts.length > 0 && (
                <button 
                  onClick={clearSelection}
                  className="quote-clear-btn"
                >
                  Limpiar selección
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;
