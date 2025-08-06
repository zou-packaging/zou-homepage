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
                <i className="fas fa-leaf"></i>
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
                <i className="fas fa-palette"></i>
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
                <i className="fas fa-shipping-fast"></i>
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
