import React from 'react';
import './contact.css';

const Contact = () => {
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
            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Nombre:</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Correo:</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input type="tel" id="phone" name="phone" />
              </div>
              <div className="form-group">
                <label htmlFor="message">Mensaje:</label>
                <textarea id="message" name="message" rows="4" required></textarea>
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
