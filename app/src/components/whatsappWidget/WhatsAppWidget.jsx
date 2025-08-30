import React, { useState, useEffect } from 'react';
import './WhatsAppWidget.css';

const WhatsAppWidget = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    // Show widget after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    // Simulate message notifications
    const messageTimer = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance every 30 seconds
        setMessageCount(prev => prev + 1);
      }
    }, 30000);

    return () => {
      clearTimeout(timer);
      clearInterval(messageTimer);
    };
  }, []);

  const handleClick = () => {
    const phoneNumber = '5493512341463';
    const message = '¡Hola! Vi su página web y me interesa conocer más sobre sus productos de packaging. ¿Podrían ayudarme?';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Track widget click
    if (typeof gtag !== 'undefined') {
      gtag('event', 'whatsapp_widget_click', {
        event_category: 'conversion',
        event_label: 'floating_widget',
        value: 1
      });
    }
    
    window.open(whatsappUrl, '_blank');
    
    // Clear message count after click
    setMessageCount(0);
  };

  if (!isVisible) return null;

  return (
    <div className={`whatsapp-widget ${isVisible ? 'visible' : ''}`}>
      {/* Chat bubble with messages */}
      <div className={`chat-bubble ${isHovered ? 'expanded' : ''}`}>
        <div className="chat-messages">
          <div className="message">
            <div className="message-avatar">
              <span>👋</span>
            </div>
            <div className="message-content">
              <p>¡Hola! ¿Te ayudo con tu cotización?</p>
              <span className="message-time">Ahora</span>
            </div>
          </div>
          {messageCount > 0 && (
            <div className="message">
              <div className="message-avatar">
                <span>💬</span>
              </div>
              <div className="message-content">
                <p>Respondemos en menos de 5 minutos</p>
                <span className="message-time">hace 2 min</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main WhatsApp button */}
      <button
        className="whatsapp-button"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Contactar por WhatsApp"
      >
        <div className="button-content">
          <svg 
            className="whatsapp-icon"
            viewBox="0 0 24 24" 
            width="28" 
            height="28" 
            fill="currentColor"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
          </svg>
          
          {/* Message counter */}
          {messageCount > 0 && (
            <div className="message-counter">
              {messageCount}
            </div>
          )}
        </div>

        {/* Tooltip */}
        <div className="tooltip">
          <span>💬 Chateemos!</span>
          <small>Respuesta inmediata</small>
        </div>

        {/* Ripple effect */}
        <div className="ripple"></div>
        <div className="ripple ripple-2"></div>
      </button>
    </div>
  );
};

export default WhatsAppWidget;