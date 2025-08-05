import React from 'react';
import './about.css';
import manosImage from '../../assets/about/manos.png';

const About = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-header">
          <h2 className="about-title">Somos <span className="about-highlight">Zou Packaging</span></h2>
          <p className="about-subtitle">
            Nacida en Córdoba en 2021, de la fusión entre Zapatí Impresiones y Only Use.<br/>
            Tenemos una idea muy clara: acompañar con productos de diseño único y calidad sin<br/>
            que tengas que comprar grandes cantidades.
          </p>
        </div>
        
        <div className="about-features">
          <div className="about-feature">
            <div className="about-feature-icon">
              <div className="icon-circle eco-friendly">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 4C16 4 10 6.5 10 13C10 16.5 12.5 19 16 19C19.5 19 22 16.5 22 13C22 6.5 16 4 16 4Z" stroke="white" strokeWidth="1.5" fill="none"/>
                  <path d="M16 19V28" stroke="white" strokeWidth="1.5"/>
                  <path d="M12 24H20" stroke="white" strokeWidth="1.5"/>
                </svg>
              </div>
            </div>
            <h3 className="about-feature-title">Productos ecofriendly</h3>
            <p className="about-feature-description">
              Porque creemos que también es<br/>
              importante cuidar de que nos rodea
            </p>
          </div>
          
          <div className="about-feature">
            <div className="about-feature-icon">
              <div className="icon-circle personalized">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="11" r="6" stroke="white" strokeWidth="1.5" fill="none"/>
                  <circle cx="9" cy="16" r="2" fill="white"/>
                  <circle cx="23" cy="16" r="2" fill="white"/>
                  <circle cx="12" cy="23" r="2" fill="white"/>
                  <circle cx="20" cy="23" r="2" fill="white"/>
                  <circle cx="16" cy="27" r="2" fill="white"/>
                  <path d="M16 17V21" stroke="white" strokeWidth="1.5"/>
                </svg>
              </div>
            </div>
            <h3 className="about-feature-title">Productos personalizados</h3>
            <p className="about-feature-description">
              Diseño pensados con una calidad de<br/>
              impresión cuidada al detalle
            </p>
          </div>
          
          <div className="about-feature">
            <div className="about-feature-icon">
              <div className="icon-circle delivery">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="14" width="16" height="10" rx="1" stroke="white" strokeWidth="1.5" fill="none"/>
                  <rect x="20" y="17" width="6" height="7" rx="1" stroke="white" strokeWidth="1.5" fill="none"/>
                  <circle cx="9" cy="27" r="1.5" stroke="white" strokeWidth="1.5" fill="none"/>
                  <circle cx="22" cy="27" r="1.5" stroke="white" strokeWidth="1.5" fill="none"/>
                  <path d="M20 20H26" stroke="white" strokeWidth="1.5"/>
                  <rect x="22" y="10" width="4" height="4" rx="0.5" stroke="white" strokeWidth="1.5" fill="none"/>
                </svg>
              </div>
            </div>
            <h3 className="about-feature-title">Envíos a todo el país</h3>
            <p className="about-feature-description">
              Realizamos entregas inmediatas y<br/>
              coordinamos packaging para todo el<br/>
              país
            </p>
          </div>
        </div>
        
        <div className="about-content">
          <div className="about-text">
            <p className="about-main-text">
              Nos mueve el entusiasmo por lo que hacemos, el<br/>
              trabajo en equipo y la confianza que se genera<br/>
              con cada cliente.
            </p>
            <p className="about-commitment">
              ¡Tenemos un compromiso con la calidad!
            </p>
            <p className="about-description">
              En Zou queremos que encuentres una<br/>
              alternativa real: calidad de impresión cuidada al<br/>
              detalle y un servicio que te acompañe en todo el<br/>
              proceso.
            </p>
          </div>
          
          <div className="about-divider"></div>
          
          <div className="about-image">
            <div className="about-image-container">
              <img src={manosImage} alt="Manos trabajando en equipo" className="about-hands-image" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
