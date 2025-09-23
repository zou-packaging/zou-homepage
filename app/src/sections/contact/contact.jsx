import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    mensaje: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Construir el mensaje con todos los datos del formulario
    const message = `Hola! Soy ${formData.nombre}.%0ACorreo: ${formData.correo}%0ATeléfono: ${formData.telefono}%0AMensaje: ${formData.mensaje}`;

    const phoneNumber = '5493512341463';
    
    // Estrategia múltiple para WhatsApp con mensaje incluido en ambos casos
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    let whatsappUrl;
    if (isMobile) {
      whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${message}`;
    } else {
      whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    }

    // Google Analytics tracking
    if (typeof gtag !== 'undefined') {
      gtag('event', 'conversion', {
        send_to: 'AW-CONVERSION_ID/Contact_Form_Submit',
        event_category: 'Contact',
        event_label: 'form_contact',
        value: 1,
        currency: 'ARS'
      });
    }

    // Abrir WhatsApp inmediatamente
    try {
      window.open(whatsappUrl, '_blank');
      
      // Mostrar mensaje de éxito
      setSubmitMessage('¡Redirigiendo a WhatsApp! Si no se abre automáticamente, revisa los pop-ups.');
      
      // Limpiar formulario
      setTimeout(() => {
        setFormData({
          nombre: '',
          correo: '',
          telefono: '',
          mensaje: ''
        });
        setIsSubmitting(false);
      }, 1000);
      
      // Limpiar mensaje de éxito
      setTimeout(() => setSubmitMessage(''), 5000);
      
    } catch (error) {
      console.error('Error al abrir WhatsApp:', error);
      setSubmitMessage('Error al abrir WhatsApp. Por favor, inténtalo nuevamente.');
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(''), 5000);
    }
  };

  return (
    <section className="contact-section" id="contacto">
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="contact-title">Contacto</h2>
          <p className="contact-subtitle">
            Estamos aquí para ayudarte. Contáctanos y empecemos a trabajar juntos.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info-section">
            <div className="contact-info-card">
              <h3 className="info-title">Dónde estamos</h3>
              
              <div className="info-item">
                <div className="info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div className="info-content">
                  <span className="info-label">Dirección:</span>
                  <span className="info-value">Entre Ríos 2874<br />X5006 Córdoba</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div className="info-content">
                  <span className="info-label">Móvil:</span>
                  <span className="info-value">351 234 1463</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12,6 12,12 16,14"/>
                  </svg>
                </div>
                <div className="info-content">
                  <span className="info-label">Horario de atención:</span>
                  <span className="info-value">Lunes a viernes 8.30 a 18 hs</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div className="info-content">
                  <span className="info-label">Formas de pago:</span>
                  <span className="info-value">Aceptamos todas las tarjetas.<br />Efectivo</span>
                </div>
              </div>

              <div className="map-container">
                <div className="map-header">
                  <h4>Nuestra ubicación</h4>
                  <p>Encuéntranos fácilmente</p>
                </div>
                <div className="map-frame">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3404.4662644862887!2d-64.17989708518824!3d-31.418739281404157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432985f478f5b69%3A0x88d5b238de9ea33b!2sEntre%20R%C3%ADos%202874%2C%20X5006%20C%C3%B3rdoba!5e0!3m2!1ses!2sar!4v1647234567890!5m2!1ses!2sar"
                    width="100%"
                    height="200"
                    style={{ border: 0, borderRadius: '12px' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación Zou Packaging"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-section">
            <div className="contact-form-card">
              <h3 className="form-title">Formulario de contacto</h3>
              <p className="form-subtitle">
                Completa el formulario y te responderemos a la brevedad
              </p>

              {submitMessage && (
                <div className="submit-success">
                  <div className="success-icon">✓</div>
                  <p>{submitMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre:</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="correo">Correo:</label>
                  <input
                    type="email"
                    id="correo"
                    name="correo"
                    value={formData.correo}
                    onChange={handleInputChange}
                    required
                    placeholder="tu@email.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="telefono">Teléfono:</label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    required
                    placeholder="+54 9 351 234 1463"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="mensaje">Mensaje:</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    placeholder="Contanos en qué podemos ayudarte..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="loading-spinner"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 2L11 13"/>
                        <polygon points="22,2 15,22 11,13 2,9"/>
                      </svg>
                      Enviar mensaje
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;