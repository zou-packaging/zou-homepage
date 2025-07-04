import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Container, Button } from "../../common";
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

  useEffect(() => {
    setIsVisible(true);
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
          aria-label="Imagen de fondo"
        />
      )}

      {/* Overlay */}
      {overlay && (
        <div className={styles.overlay} style={{ opacity: overlayOpacity }} />
      )}

      {/* Content */}
      <Container className={styles.container}>
        <div className={contentClasses}>
          {title && <h1 className={styles.title}>{title}</h1>}

          {subtitle && <h2 className={styles.subtitle}>{subtitle}</h2>}

          {description && <p className={styles.description}>{description}</p>}

          {(primaryCTA || secondaryCTA) && (
            <div className={styles.actions}>
              {primaryCTA && (
                <div className={styles.primaryAction}>{primaryCTA}</div>
              )}
              {secondaryCTA && (
                <div className={styles.secondaryAction}>{secondaryCTA}</div>
              )}
            </div>
          )}
        </div>
      </Container>

      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator}>
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
