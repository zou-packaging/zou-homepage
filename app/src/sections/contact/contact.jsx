import React, { useState } from 'react';
import './contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const phoneNumber = '5493512341463'; // Número de WhatsApp de destino
    const { name, email, phone, message } = formData;
    const text = `Hola, mi nombre es ${name}. Mi correo es ${email} y mi teléfono es ${phone}. Te escribo por el siguiente motivo: ${message}`;
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="contact-section" id="contacto">
      <div className="contact-container">
        <div className="contact-content">
          <div className="contact-info-container">
            <h2 className="contact-title">Dónde estamos</h2>
            <div className="contact-info">
              <p><strong>Dirección:</strong><br/>Entre Ríos 2874<br/>X5006 Córdoba</p>
              <p><strong>Móvil:</strong><br/>3512341463</p>
              <p><strong>Horario de atención:</strong><br/>lunes a viernes 8.30 a 18 hs</p>
              <p><strong>Formas de pago:</strong><br/>Aceptamos todas las tarjetas.<br/>Efectivo</p>
            </div>
          </div>
          <div className="contact-form-container">
            <h2 className="contact-title">Formulario de contacto</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nombre:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Correo:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="message">Mensaje:</label>
                <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleChange} required></textarea>
              </div>
              <button type="submit" className="submit-button">Enviar mensaje</button>
            </form>
          </div>
        </div>
        <div className="contact-map">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2655.4253393637355!2d-64.14736882!3d-31.42462724!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432bd5c465f2b85%3A0x7b6ded8be2708b6a!2sZOU%20Packaging!5e1!3m2!1ses!2sar!4v1755364286683!5m2!1ses!2sar" 
            width="100%" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;
