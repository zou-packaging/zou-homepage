import PropTypes from "prop-types";
import styles from "./Container.module.css";

const Container = ({
  children,
  as: Component = "div",
  size = "default",
  fluid = false,
  center = false,
  className = "",
  ...props
}) => {
  const classes = [
    styles.container,
    fluid ? styles.fluid : styles[size],
    center && styles.center,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  as: PropTypes.elementType,
  size: PropTypes.oneOf(["small", "default", "large", "full"]),
  fluid: PropTypes.bool,
  center: PropTypes.bool,
  className: PropTypes.string,
};

export default Container;
