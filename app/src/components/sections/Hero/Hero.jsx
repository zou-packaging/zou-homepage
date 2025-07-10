import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Button } from "../../common";
import { trackMicroConversion } from "../../../utils/conversionTracking";
import styles from "./Hero.module.css";

const Hero = ({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
  backgroundVideo,
  overlay = true,
  overlayOpacity = 0.5,
  height = "full",
  alignment = "center",
  animate = true,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Trackear vista del hero
    trackMicroConversion("hero_view", {
      source: "hero_section",
      timestamp: Date.now()
    });

    // Mostrar stats con delay para mayor impacto
    const statsTimer = setTimeout(() => {
      setStatsVisible(true);
    }, 1500);

    return () => clearTimeout(statsTimer);
  }, []);

  const heroClasses = [
    styles.hero,
    styles[`height-${height}`],
    styles[`align-${alignment}`],
    overlay && styles.hasOverlay,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const contentClasses = [
    styles.content,
    animate && styles.animate,
    isVisible && styles.visible,
  ]
    .filter(Boolean)
    .join(" ");

  const handlePrimaryCTA = () => {
    trackMicroConversion("hero_primary_cta", {
      action: "primary_cta_click",
      position: "hero"
    });
    // Scroll suave al formulario
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSecondaryCTA = () => {
    trackMicroConversion("hero_secondary_cta", {
      action: "secondary_cta_click", 
      position: "hero"
    });
    // Scroll a productos para explorar
    document.getElementById("productos")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleWhatsAppCTA = () => {
    trackMicroConversion("hero_whatsapp_cta", {
      action: "whatsapp_cta_click",
      position: "hero"
    });
    window.open("https://wa.me/5493517892876?text=Hola! Quiero recibir información sobre productos personalizados para mi empresa", "_blank");
  };

  return (
    <section className={heroClasses}>
      {/* Background Video */}
      {backgroundVideo && (
        <div className={styles.backgroundVideo}>
          <video autoPlay muted loop playsInline className={styles.video}>
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        </div>
      )}

      {/* Background Image */}
      {backgroundImage && !backgroundVideo && (
        <div
          className={styles.backgroundImage}
          style={{ backgroundImage: `url(${backgroundImage})` }}
          role="img"
          aria-label="Productos descartables personalizados ZOU"
        />
      )}

      {/* Overlay */}
      {overlay && (
        <div className={styles.overlay} style={{ opacity: overlayOpacity }} />
      )}

      {/* Urgency Badge */}
      <div className={styles.urgencyBadge}>
        <span className={styles.urgencyIcon}>🔥</span>
        <span className={styles.urgencyText}>
          <strong>OFERTA ESPECIAL:</strong> 15% OFF en tu primer pedido
        </span>
      </div>

      {/* Content */}
      <Container className={styles.container}>
        <div className={contentClasses}>
          {/* Headline optimizado para conversión */}
          <div className={styles.headline}>
            <h1 className={styles.title}>
              <span className={styles.titleMain}>
                Vasos Térmicos y Productos Descartables
              </span>
              <span className={styles.titleHighlight}>
                Personalizados en Córdoba
              </span>
              <span className={styles.titleBenefit}>
                ✨ Calidad Premium • Entrega en 7 días
              </span>
            </h1>
          </div>

          {/* Value proposition específica */}
          <div className={styles.valueProposition}>
            <p className={styles.description}>
              <strong>Transformá tu marca en cada producto.</strong> Desde 500 unidades, 
              diseño gratuito incluido y envío sin costo en Córdoba Capital.
            </p>
          </div>

          {/* Social proof temprano */}
          <div className={`${styles.socialProof} ${statsVisible ? styles.visible : ''}`}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>2000+</span>
              <span className={styles.statLabel}>Empresas confían en nosotros</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>98%</span>
              <span className={styles.statLabel}>Satisfacción garantizada</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>7 días</span>
              <span className={styles.statLabel}>Tiempo de entrega</span>
            </div>
          </div>

          {/* Beneficios clave */}
          <div className={styles.keyBenefits}>
            <div className={styles.benefit}>
              <span className={styles.benefitIcon}>✅</span>
              <span>Diseño gráfico incluido</span>
            </div>
            <div className={styles.benefit}>
              <span className={styles.benefitIcon}>✅</span>
              <span>Materiales eco-friendly</span>
            </div>
            <div className={styles.benefit}>
              <span className={styles.benefitIcon}>✅</span>
              <span>Presupuesto en 2 horas</span>
            </div>
          </div>

          {/* CTAs optimizados */}
          <div className={styles.actions}>
            <div className={styles.primaryActions}>
              <Button
                variant="primary"
                size="large"
                onClick={handlePrimaryCTA}
                className={styles.ctaPrimary}
              >
                🚀 Obtener Presupuesto GRATIS
              </Button>
              
              <Button
                variant="whatsapp"
                size="large"
                onClick={handleWhatsAppCTA}
                className={styles.ctaWhatsApp}
              >
                📱 WhatsApp Directo
              </Button>
            </div>
            
            <div className={styles.secondaryActions}>
              <Button
                variant="ghost"
                size="medium"
                onClick={handleSecondaryCTA}
                className={styles.ctaSecondary}
              >
                👀 Ver Catálogo de Productos
              </Button>
            </div>
          </div>

          {/* Guarantee badge */}
          <div className={styles.guarantee}>
            <span className={styles.guaranteeIcon}>🛡️</span>
            <span className={styles.guaranteeText}>
              <strong>Garantía 100%:</strong> Si no te gusta el diseño, lo cambiamos gratis
            </span>
          </div>
        </div>
      </Container>

      {/* Trust indicators */}
      <div className={styles.trustIndicators}>
        <div className={styles.trustItem}>
          <span className={styles.trustIcon}>🏆</span>
          <span className={styles.trustText}>Empresa certificada</span>
        </div>
        <div className={styles.trustItem}>
          <span className={styles.trustIcon}>🚚</span>
          <span className={styles.trustText}>Envíos a todo el país</span>
        </div>
        <div className={styles.trustItem}>
          <span className={styles.trustIcon}>💳</span>
          <span className={styles.trustText}>Todos los medios de pago</span>
        </div>
      </div>

      {/* Scroll Indicator mejorado */}
      <div className={styles.scrollIndicator}>
        <span className={styles.scrollText}>Ver más productos</span>
        <div className={styles.mouse}>
          <div className={styles.wheel}></div>
        </div>
        <div className={styles.arrows}>
          <span className={styles.arrow}></span>
          <span className={styles.arrow}></span>
        </div>
      </div>
    </section>
  );
};

Hero.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.string,
  description: PropTypes.string,
  primaryCTA: PropTypes.node,
  secondaryCTA: PropTypes.node,
  backgroundImage: PropTypes.string,
  backgroundVideo: PropTypes.string,
  overlay: PropTypes.bool,
  overlayOpacity: PropTypes.number,
  height: PropTypes.oneOf(["full", "large", "medium", "auto"]),
  alignment: PropTypes.oneOf(["left", "center", "right"]),
  animate: PropTypes.bool,
  className: PropTypes.string,
};

export default Hero;
