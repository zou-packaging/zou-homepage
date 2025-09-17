// Placeholder components for missing sections
import React from 'react';

export const Calculator = () => (
  <section style={{ padding: '80px 20px', textAlign: 'center' }}>
    <h2>Calculadora Express</h2>
    <p>Conoce el precio de tu pedido en 30 segundos</p>
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px', background: '#f8f9fa', borderRadius: '12px' }}>
      <p>🚧 Calculadora en desarrollo</p>
      <button 
        style={{ 
          background: '#25d366', 
          color: 'white', 
          border: 'none', 
          padding: '12px 24px', 
          borderRadius: '8px', 
          cursor: 'pointer' 
        }}
        onClick={() => {
          const phoneNumber = '5493512341463';
          const message = '¡Hola! Me interesa conocer precios de productos. ¿Podrían ayudarme?';
          window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
        }}
      >
        Solicitar Cotización Personalizada
      </button>
    </div>
  </section>
);

export const SocialProof = () => (
  <section style={{ padding: '80px 20px', background: '#f8f9fa', textAlign: 'center' }}>
    <h2>Confían en nosotros</h2>
    <p>⭐⭐⭐⭐⭐ 4.9/5 en Google (127 reseñas)</p>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '40px 0', flexWrap: 'wrap' }}>
      <div style={{ padding: '20px', background: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <p>"Zou nos ayudó a reducir 40% los costos"</p>
        <small>- María González, Restaurante Don Mario</small>
      </div>
    </div>
  </section>
);

export const UrgencySection = () => (
  <section style={{ padding: '80px 20px', background: '#dc3545', color: 'white', textAlign: 'center' }}>
    <h2>⚡ OFERTA LIMITADA - Solo este mes</h2>
    <h3>20% OFF en tu primer pedido + Envío GRATIS</h3>
    <button 
      style={{ 
        background: 'white', 
        color: '#dc3545', 
        border: 'none', 
        padding: '16px 32px', 
        borderRadius: '8px', 
        fontSize: '1.1rem', 
        fontWeight: '600', 
        cursor: 'pointer' 
      }}
      onClick={() => {
        const phoneNumber = '5493512341463';
        const message = '¡Hola! Vi la oferta del 20% OFF en su página. Me interesa aprovecharla. ¿Podrían darme información?';
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
      }}
    >
      Reclamar Descuento
    </button>
  </section>
);

export const FAQ = () => (
  <section style={{ padding: '80px 20px', maxWidth: '800px', margin: '0 auto' }}>
    <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Preguntas Frecuentes</h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {[
        { q: '¿Cuál es el pedido mínimo?', a: 'No tenemos pedido mínimo. Puedes pedir desde 1 unidad.' },
        { q: '¿Qué formas de pago aceptan?', a: 'Efectivo, transferencia y todas las tarjetas de crédito/débito.' },
        { q: '¿A qué ciudades envían?', a: 'Enviamos a toda Argentina. Córdoba 24-48hs, resto del país 3-7 días.' },
        { q: '¿Cuánto demora la personalización?', a: 'Entre 2-5 días hábiles según el producto y cantidad.' }
      ].map((item, index) => (
        <div key={index} style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
          <h4 style={{ color: '#25d366', margin: '0 0 10px 0' }}>🤔 {item.q}</h4>
          <p style={{ margin: 0 }}>{item.a}</p>
        </div>
      ))}
    </div>
  </section>
);