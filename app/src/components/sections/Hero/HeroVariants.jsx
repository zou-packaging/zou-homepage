import PropTypes from "prop-types";
import Hero from "./Hero";
import { Button } from "../../common";
import styles from "./HeroVariants.module.css";

// Hero con patrón de fondo
export const HeroPattern = ({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  pattern = "dots",
  ...props
}) => {
  const patternClasses = [styles.heroPattern, styles[`pattern-${pattern}`]]
    .filter(Boolean)
    .join(" ");

  return (
    <Hero
      title={title}
      subtitle={subtitle}
      description={description}
      primaryCTA={primaryCTA}
      secondaryCTA={secondaryCTA}
      className={patternClasses}
      overlay={false}
      {...props}
    />
  );
};

// Hero Split con imagen lateral
export const HeroSplit = ({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  image,
  imageAlt = "",
  imagePosition = "right",
  ...props
}) => {
  return (
    <section className={styles.heroSplit}>
      <div className={styles.splitContainer}>
        <div
          className={`${styles.splitContent} ${
            styles[`image-${imagePosition}`]
          }`}
        >
          <div className={styles.textContent}>
            {subtitle && <p className={styles.splitSubtitle}>{subtitle}</p>}
            {title && <h1 className={styles.splitTitle}>{title}</h1>}
            {description && (
              <p className={styles.splitDescription}>{description}</p>
            )}
            {(primaryCTA || secondaryCTA) && (
              <div className={styles.splitActions}>
                {primaryCTA}
                {secondaryCTA}
              </div>
            )}
          </div>
          <div className={styles.imageContent}>
            <img src={image} alt={imageAlt} className={styles.splitImage} />
          </div>
        </div>
      </div>
    </section>
  );
};

// Hero Minimalista
export const HeroMinimal = ({ title, subtitle, primaryCTA, ...props }) => {
  return (
    <section className={styles.heroMinimal}>
      <div className={styles.minimalContent}>
        {title && <h1 className={styles.minimalTitle}>{title}</h1>}
        {subtitle && <p className={styles.minimalSubtitle}>{subtitle}</p>}
        {primaryCTA && <div className={styles.minimalAction}>{primaryCTA}</div>}
      </div>
    </section>
  );
};

// PropTypes
HeroPattern.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.string,
  description: PropTypes.string,
  primaryCTA: PropTypes.node,
  secondaryCTA: PropTypes.node,
  pattern: PropTypes.oneOf(["dots", "lines", "waves", "circles"]),
};

HeroSplit.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.string,
  description: PropTypes.string,
  primaryCTA: PropTypes.node,
  secondaryCTA: PropTypes.node,
  image: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  imagePosition: PropTypes.oneOf(["left", "right"]),
};

HeroMinimal.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.string,
  primaryCTA: PropTypes.node,
};
