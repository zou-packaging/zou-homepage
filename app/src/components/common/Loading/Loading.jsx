import PropTypes from "prop-types";
import styles from "./Loading.module.css";

const Loading = ({
  size = "medium",
  color = "primary",
  text = "",
  fullScreen = false,
  overlay = false,
  className = "",
  ...props
}) => {
  const containerClasses = [
    styles.container,
    fullScreen && styles.fullScreen,
    overlay && styles.overlay,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const spinnerClasses = [styles.spinner, styles[size], styles[color]]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={containerClasses}
      role="status"
      aria-live="polite"
      {...props}
    >
      <div className={styles.content}>
        <div className={spinnerClasses}>
          <svg viewBox="0 0 50 50">
            <circle
              className={styles.circle}
              cx="25"
              cy="25"
              r="20"
              fill="none"
              strokeWidth="4"
            />
          </svg>
        </div>
        {text && <p className={styles.text}>{text}</p>}
        <span className="sr-only">{text || "Cargando..."}</span>
      </div>
    </div>
  );
};

// Componente Skeleton para estados de carga de contenido
export const Skeleton = ({
  variant = "text",
  width,
  height,
  animation = true,
  rounded = false,
  className = "",
  ...props
}) => {
  const classes = [
    styles.skeleton,
    styles[`skeleton-${variant}`],
    animation && styles.skeletonAnimation,
    rounded && styles.skeletonRounded,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const style = {
    width: width || (variant === "text" ? "100%" : undefined),
    height: height || (variant === "text" ? "1em" : undefined),
  };

  return (
    <div className={classes} style={style} aria-hidden="true" {...props} />
  );
};

// Componente Spinner simple
export const Spinner = ({
  size = "medium",
  color = "currentColor",
  className = "",
  ...props
}) => {
  const classes = [styles.spinnerSimple, styles[size], className]
    .filter(Boolean)
    .join(" ");

  return (
    <svg
      className={classes}
      viewBox="0 0 24 24"
      fill="none"
      style={{ color }}
      {...props}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.25"
      />
      <path
        d="M12 2a10 10 0 0 1 0 20"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};

Loading.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf(["primary", "secondary", "white", "dark"]),
  text: PropTypes.string,
  fullScreen: PropTypes.bool,
  overlay: PropTypes.bool,
  className: PropTypes.string,
};

Skeleton.propTypes = {
  variant: PropTypes.oneOf(["text", "circular", "rectangular", "rounded"]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  animation: PropTypes.bool,
  rounded: PropTypes.bool,
  className: PropTypes.string,
};

Spinner.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.string,
  className: PropTypes.string,
};

export default Loading;
