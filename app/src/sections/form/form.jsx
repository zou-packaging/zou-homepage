import React, { useState } from 'react';
import './form.css';
import { createContactRequest, validateContactForm } from '../../services/contactService';

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    enterprise_name: '', // Nuevo campo para empresa
    email: '',           // Nuevo campo para email
    phone: '',
    subject: '',         // Nuevo campo para asunto
    content: '',         // Renombrado de 'message' a 'content'
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

  // Estados para manejar la UI
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Productos disponibles para seleccionar
  const availableProducts = [
    {
      id: 1,
      name: 'Vaso Térmico 440cc',
      category: 'Vasos',
      image: '/api/placeholder/80/80'
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
    
    // Limpiar error del campo cuando el usuario escribe
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
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

  // Función para generar el contenido del mensaje incluyendo productos seleccionados
  const generateMessageContent = () => {
    let content = formData.content || '';
    
    if (formData.selectedProducts.length > 0) {
      content += '\n\n**PRODUCTOS SELECCIONADOS:**\n';
      formData.selectedProducts.forEach((product, index) => {
        content += `${index + 1}. ${product.name} - ${product.category}\n`;
      });
    }
    
    return content.trim();
  };

  // Función para enviar el formulario al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccessMessage('');

    // Preparar datos para enviar al backend
    const dataToSend = {
      name: formData.name.trim(),
      enterprise_name: formData.enterprise_name.trim() || '', // Opcional
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      subject: formData.subject.trim(),
      content: generateMessageContent()
    };

    // Validar datos
    const validation = validateContactForm(dataToSend);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      setLoading(false);
      return;
    }

    try {
      // Enviar al backend
      const result = await createContactRequest(dataToSend);
      
      if (result.success) {
        setSuccessMessage('¡Solicitud enviada exitosamente! Te contactaremos pronto.');
        // Limpiar formulario después del éxito
        setFormData({
          name: '',
          enterprise_name: '',
          email: '',
          phone: '',
          subject: '',
          content: '',
          selectedProducts: []
        });
      } else {
        setErrors({ general: result.error || 'Error al enviar la solicitud' });
      }
    } catch (error) {
      setErrors({ general: 'Error de conexión. Por favor intenta nuevamente.' });
    } finally {
      setLoading(false);
    }
  };

  // Función original para WhatsApp (como backup)
  const sendToWhatsApp = () => {
    const { name, phone, selectedProducts } = formData;
    
    if (!name || !phone) {
      alert('Por favor completa los campos obligatorios (Nombre y Teléfono)');
      return;
    }

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
    
    if (formData.content) {
      whatsappMessage += `*Mensaje adicional:*\n${formData.content}\n\n`;
    }
    
    whatsappMessage += `¡Gracias por contactarnos!`;

    const phoneNumber = '5491234567890'; // Cambiar por el número real
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
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
              <h3 className="quote-form-subtitle">Formulario de Contacto</h3>
              <p className="quote-form-description">
                Completa tus datos para que podamos personalizar tu presupuesto.
              </p>

              {/* Mensajes de éxito o error general */}
              {successMessage && (
                <div className="quote-success-message">
                  {successMessage}
                </div>
              )}
              
              {errors.general && (
                <div className="quote-error-message">
                  {errors.general}
                </div>
              )}

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
                    className={errors.name ? 'error' : ''}
                    required
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>

                <div className="quote-input-group">
                  <label htmlFor="enterprise_name">Nombre de la Empresa (opcional)</label>
                  <input
                    type="text"
                    id="enterprise_name"
                    name="enterprise_name"
                    value={formData.enterprise_name}
                    onChange={handleInputChange}
                    placeholder="Mi Empresa S.A."
                  />
                </div>

                <div className="quote-input-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="juan@email.com"
                    className={errors.email ? 'error' : ''}
                    required
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>
                
                <div className="quote-input-group">
                  <label htmlFor="phone">Teléfono *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="11 2345-6789"
                    className={errors.phone ? 'error' : ''}
                    required
                  />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                  <small>Número de teléfono con WhatsApp</small>
                </div>

                <div className="quote-input-group">
                  <label htmlFor="subject">Asunto *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Solicitud de presupuesto"
                    className={errors.subject ? 'error' : ''}
                    required
                  />
                  {errors.subject && <span className="error-text">{errors.subject}</span>}
                </div>
                
                <div className="quote-input-group">
                  <label htmlFor="content">Mensaje *</label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Contanos más sobre lo que necesitas..."
                    rows="4"
                    className={errors.content ? 'error' : ''}
                    required
                  ></textarea>
                  {errors.content && <span className="error-text">{errors.content}</span>}
                  <small>{formData.content.length}/500</small>
                </div>
                
                <div className="quote-form-buttons">
                  <button 
                    type="submit" 
                    className="quote-submit-btn"
                    disabled={loading}
                  >
                    {loading ? 'Enviando...' : 'Enviar Solicitud'}
                  </button>
                  
                  <button 
                    type="button" 
                    onClick={sendToWhatsApp}
                    className="quote-whatsapp-btn"
                    disabled={loading}
                  >
                    Enviar por WhatsApp
                  </button>
                </div>
              </form>
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
