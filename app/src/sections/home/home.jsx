import React from 'react';
import './home.css';
import home1Image from '../../assets/homeImagenes/home1.png';
import home2Image from '../../assets/homeImagenes/home2.png';

const Home = () => {
  return (
    <section className="home-section">
      <div className="home-container">
        <div className="home-content">
          {/* Título - Ancho completo */}
          <div className="home-title-container">
            <h1 className="home-title">
              Diseñados para usar, <span className="highlight-text">personalizados</span> para tu <span className="underline-text">marca</span>.
            </h1>
          </div>
          
          {/* Contenido principal - 3 columnas */}
          <div className="home-main-content">
            {/* Imagen izquierda */}
            <div className="left-image-container">
              <div className="product-image">
                <img src={home1Image} alt="Productos en uso" className="home-image" />
              </div>
            </div>
            
            {/* Contenido central */}
            <div className="home-text">
              <p className="home-description">
                En cada detalle hay una oportunidad de destacar. Ya sea en un café, 
                un evento o una tienda, tus productos hablan por vos. Que reflejen tu 
                identidad también es parte de la experiencia.
              </p>
              
              <p className="home-subdescription">
                Vasos, servilletas, bolsas y mucho más...
              </p>
              
              <button className="home-cta-button">
                Ver productos
              </button>
            </div>
            
            {/* Imagen derecha */}
            <div className="right-image-container">
              <div className="product-image">
                <img src={home2Image} alt="Bolsas personalizadas" className="home-image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
