import React, { useState } from 'react';
import './chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: '¡Hola! Soy tu asistente virtual de Zou Packaging. ¿En qué puedo ayudarte hoy?',
      options: [
        { text: 'Productos disponibles', value: 'productos' },
        { text: 'Materiales ecológicos', value: 'materiales' },
        { text: 'Precios y cotizaciones', value: 'precios' },
        { text: 'Proceso de pedidos', value: 'pedidos' }
      ]
    }
  ]);
  const [currentStep, setCurrentStep] = useState('inicio');

  const responses = {
    productos: {
      text: 'Ofrecemos una amplia gama de productos descartables:',
      options: [
        { text: 'Vasos y recipientes', value: 'vasos' },
        { text: 'Platos y bandejas', value: 'platos' },
        { text: 'Cubiertos', value: 'cubiertos' },
        { text: 'Servilletas y papel', value: 'servilletas' },
        { text: 'Volver al menú principal', value: 'inicio' }
      ]
    },
    materiales: {
      text: 'Nos especializamos en materiales sustentables:',
      options: [
        { text: 'Papel reciclado', value: 'papel-reciclado' },
        { text: 'Cartón biodegradable', value: 'carton' },
        { text: 'Materiales compostables', value: 'compostables' },
        { text: 'Certificaciones ecológicas', value: 'certificaciones' },
        { text: 'Volver al menú principal', value: 'inicio' }
      ]
    },
    precios: {
      text: 'Para cotizaciones personalizadas:',
      options: [
        { text: 'Pedidos al por mayor', value: 'mayoreo' },
        { text: 'Precios unitarios', value: 'unitarios' },
        { text: 'Descuentos por volumen', value: 'descuentos' },
        { text: 'Contactar vendedor', value: 'contacto' },
        { text: 'Volver al menú principal', value: 'inicio' }
      ]
    },
    pedidos: {
      text: 'El proceso de pedido es muy sencillo:',
      options: [
        { text: 'Tiempo de entrega', value: 'entrega' },
        { text: 'Métodos de pago', value: 'pago' },
        { text: 'Zonas de cobertura', value: 'cobertura' },
        { text: 'Seguimiento de pedido', value: 'seguimiento' },
        { text: 'Volver al menú principal', value: 'inicio' }
      ]
    },
    vasos: {
      text: 'Nuestros vasos y recipientes incluyen: vasos de papel, vasos de cartón, recipientes para comida, tapers biodegradables.',
      options: [{ text: 'Volver a productos', value: 'productos' }, { text: 'Menú principal', value: 'inicio' }]
    },
    platos: {
      text: 'Platos y bandejas disponibles: platos de papel, bandejas de cartón, platos hondos, bandejas para eventos.',
      options: [{ text: 'Volver a productos', value: 'productos' }, { text: 'Menú principal', value: 'inicio' }]
    },
    cubiertos: {
      text: 'Cubiertos ecológicos: tenedores, cuchillos y cucharas de madera, cubiertos compostables, sets completos.',
      options: [{ text: 'Volver a productos', value: 'productos' }, { text: 'Menú principal', value: 'inicio' }]
    },
    servilletas: {
      text: 'Papel y servilletas: servilletas de papel reciclado, papel tissue, servilletas impresas personalizadas.',
      options: [{ text: 'Volver a productos', value: 'productos' }, { text: 'Menú principal', value: 'inicio' }]
    },
    mayoreo: {
      text: 'Para pedidos al por mayor ofrecemos los mejores precios. Mínimo 1000 unidades por producto.',
      options: [{ text: 'Contactar vendedor', value: 'contacto' }, { text: 'Volver a precios', value: 'precios' }, { text: 'Menú principal', value: 'inicio' }]
    },
    contacto: {
      text: '📞 Contacta a nuestro equipo de ventas: WhatsApp: +54 9 11 1234-5678 | Email: ventas@zoupackaging.com',
      options: [{ text: 'Menú principal', value: 'inicio' }]
    },
    entrega: {
      text: 'Tiempos de entrega: 2-3 días hábiles en CABA, 3-5 días en GBA, 5-7 días en interior del país.',
      options: [{ text: 'Volver a pedidos', value: 'pedidos' }, { text: 'Menú principal', value: 'inicio' }]
    }
  };

  const handleOptionClick = (value) => {
    if (value === 'inicio') {
      setMessages([
        {
          type: 'bot',
          text: '¡Hola! Soy tu asistente virtual de Zou Packaging. ¿En qué puedo ayudarte hoy?',
          options: [
            { text: 'Productos disponibles', value: 'productos' },
            { text: 'Materiales ecológicos', value: 'materiales' },
            { text: 'Precios y cotizaciones', value: 'precios' },
            { text: 'Proceso de pedidos', value: 'pedidos' }
          ]
        }
      ]);
      setCurrentStep('inicio');
      return;
    }

    const response = responses[value];
    if (response) {
      setMessages(prev => [...prev, {
        type: 'bot',
        text: response.text,
        options: response.options
      }]);
      setCurrentStep(value);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatbot-container">
      {/* Botón flotante */}
      <div className={`chatbot-toggle ${isOpen ? 'open' : ''}`} onClick={toggleChat}>
        <div className="chatbot-avatar">
          <img 
            src="/src/assets/abatar/abatar.png" 
            alt="Asistente Virtual" 
            className="avatar-image"
          />
        </div>
      </div>

      {/* Ventana del chat */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="header-content">
              <img 
                src="/src/assets/abatar/abatar.png" 
                alt="Zou Assistant" 
                className="header-avatar"
              />
              <div className="header-text">
                <h4>Zou Assistant</h4>
                <span className="status">En línea</span>
              </div>
            </div>
            <button className="close-button" onClick={toggleChat}>
              ✕
            </button>
          </div>
          
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.type}`}>
                <div className="message-content">
                  <p>{message.text}</p>
                  {message.options && (
                    <div className="message-options">
                      {message.options.map((option, optIndex) => (
                        <button
                          key={optIndex}
                          className="option-button"
                          onClick={() => handleOptionClick(option.value)}
                        >
                          {option.text}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
