import PropTypes from "prop-types";
import styles from "./Card.module.css";

const Card = ({
  children,
  title,
  subtitle,
  header,
  footer,
  image,
  imageAlt = "",
  imagePosition = "top",
  variant = "elevated",
  padding = "medium",
  onClick,
  hoverable = false,
  selected = false,
  disabled = false,
  className = "",
  ...props
}) => {
  const classes = [
    styles.card,
    styles[variant],
    styles[`padding-${padding}`],
    styles[`image-${imagePosition}`],
    hoverable && styles.hoverable,
    selected && styles.selected,
    disabled && styles.disabled,
    onClick && styles.clickable,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleClick = (e) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  const handleKeyDown = (e) => {
    if (!disabled && onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick(e);
    }
  };

  const cardProps = {
    className: classes,
    onClick: handleClick,
    "aria-disabled": disabled,
    "aria-selected": selected,
    ...props,
  };

  if (onClick && !disabled) {
    cardProps.role = "button";
    cardProps.tabIndex = 0;
    cardProps.onKeyDown = handleKeyDown;
  }

  return (
    <article {...cardProps}>
      {image && imagePosition === "top" && (
        <div className={styles.imageWrapper}>
          <img src={image} alt={imageAlt} className={styles.image} />
        </div>
      )}

      {header && <div className={styles.header}>{header}</div>}

      <div className={styles.content}>
        {image && imagePosition === "left" && (
          <div className={styles.imageWrapper}>
            <img src={image} alt={imageAlt} className={styles.image} />
          </div>
        )}

        <div className={styles.body}>
          {(title || subtitle) && (
            <div className={styles.titleWrapper}>
              {title && <h3 className={styles.title}>{title}</h3>}
              {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            </div>
          )}

          {children && <div className={styles.children}>{children}</div>}
        </div>

        {image && imagePosition === "right" && (
          <div className={styles.imageWrapper}>
            <img src={image} alt={imageAlt} className={styles.image} />
          </div>
        )}
      </div>

      {footer && <div className={styles.footer}>{footer}</div>}
    </article>
  );
};

Card.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  header: PropTypes.node,
  footer: PropTypes.node,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  imagePosition: PropTypes.oneOf(["top", "left", "right"]),
  variant: PropTypes.oneOf(["elevated", "outlined", "filled", "flat"]),
  padding: PropTypes.oneOf(["none", "small", "medium", "large"]),
  onClick: PropTypes.func,
  hoverable: PropTypes.bool,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Card;
