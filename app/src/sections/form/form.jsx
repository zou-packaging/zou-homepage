import React, { useState } from 'react';
import './form.css';
import { useQuoteForm } from '../../hooks/useQuoteForm';

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

  // Usar el hook personalizado para manejar el formulario
  const {
    loading,
    errors,
    successMessage,
    submitQuoteAndWhatsApp,
    clearFieldError,
    resetForm
  } = useQuoteForm();

  // Productos disponibles para seleccionar
  const availableProducts = [
    {
      id: 6,
      name: 'Vaso Cartón 8oz',
      category: 'Vasos',
      image: '/api/placeholder/80/80'
    },
    {
      id: 7,
      name: 'Platos Biodegradables',
      category: 'Platos', 
      image: '/api/placeholder/80/80'
    },
    {
      id: 8,
      name: 'Cubiertos Madera',
      category: 'Cubiertos',
      image: '/api/placeholder/80/80'
    },
    {
      id: 9,
      name: 'Contenedores Eco',
      category: 'Contenedores',
      image: '/api/placeholder/80/80'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      clearFieldError(name);
    }
  };

  const addProduct = (product) => {
    // Verificar que el producto no esté ya seleccionado
    const isAlreadySelected = formData.selectedProducts.some(p => p.id === product.id);
    if (!isAlreadySelected) {
      setFormData(prev => ({
        ...prev,
        selectedProducts: [...prev.selectedProducts, product]
      }));
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.phone.trim()) {
      return;
    }

    try {
      const result = await submitQuoteAndWhatsApp(formData);
      
      if (result.whatsappUrl) {
        // Abrir WhatsApp
        window.open(result.whatsappUrl, '_blank');
        
        // Si también se guardó en backend, mostrar mensaje adicional
        if (result.backendSuccess) {
          console.log('Solicitud también guardada en el sistema');
        }
        
        // Opcional: resetear formulario después del envío
        setTimeout(() => {
          setFormData(prev => ({
            ...prev,
            name: '',
            phone: '',
            message: ''
          }));
        }, 2000);
      }
    } catch (error) {
      console.error('Error al procesar solicitud:', error);
    }
  };

  // Solo enviar por WhatsApp (método original)
  const sendToWhatsAppOnly = () => {
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

    // Número de WhatsApp
    const phoneNumber = '5493512341463';
    
    // Codificar mensaje para URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Crear URL de WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Abrir WhatsApp
    window.open(whatsappURL, '_blank');
  };

  return (
    <section className="quote-request-section" id="presupuesto">
      <div className="quote-request-container">
        <div className="quote-request-header">
          <h2 className="quote-request-title">Solicita tu presupuesto en simples pasos</h2>
        </div>
        
        {/* Mostrar mensaje de éxito */}
        {successMessage && (
          <div className="quote-success-message">
            <p>{successMessage}</p>
          </div>
        )}

        {/* Mostrar errores generales */}
        {errors.general && (
          <div className="quote-error-message">
            <p>{errors.general}</p>
          </div>
        )}
        
        <div className="quote-request-content">
          {/* Formulario */}
          <div className="quote-form-left">
            <div className="quote-form-card">
              <h3 className="quote-form-subtitle">Formulario</h3>
              <p className="quote-form-description">
                Completa tus datos para que podamos personalizar tu presupuesto.
              </p>
              
              <form onSubmit={handleSubmit}>
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
                    className={errors.name ? 'input-error' : ''}
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
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
                    className={errors.phone ? 'input-error' : ''}
                  />
                  <small>Número de teléfono con WhatsApp</small>
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
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
                    className={errors.message ? 'input-error' : ''}
                  ></textarea>
                  <small>{formData.message.length}/120</small>
                  {errors.message && <span className="error-text">{errors.message}</span>}
                </div>
                
                <div className="quote-button-group">
                  {/* Botón principal: API + WhatsApp */}
                  <button 
                    type="submit"
                    disabled={loading || !formData.name.trim() || !formData.phone.trim()}
                    className="quote-whatsapp-btn primary"
                  >
                    {loading ? 'Enviando...' : 'Enviar solicitud'}
                  </button>
                  
                  {/* Botón secundario: Solo WhatsApp */}
                  <button 
                    type="button" 
                    onClick={sendToWhatsAppOnly}
                    disabled={loading}
                    className="quote-whatsapp-btn secondary"
                  >
                    Solo WhatsApp
                  </button>
                </div>
              </form>
            </div>

            {/* Sección para agregar productos */}
            <div className="quote-form-card">
              <h3 className="quote-form-subtitle">Agregar productos</h3>
              <div className="quote-available-products">
                {availableProducts.map((product) => (
                  <div key={product.id} className="quote-available-product">
                    <div className="quote-product-info">
                      <img src={product.image} alt={product.name} className="quote-product-image-small" />
                      <div className="quote-product-details-small">
                        <h5>{product.name}</h5>
                        <span>{product.category}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => addProduct(product)}
                      className="quote-add-btn"
                    >
                      +
                    </button>
                  </div>
                ))}
              </div>
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
                    <div key={`selected-${product.id}`} className="quote-product-item">
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