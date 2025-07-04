import { useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "../../common";
import { useProducts } from "../../../contexts/ProductsContext";
import styles from "./ProductModal.module.css";

const ProductModal = ({ product, isOpen, onClose }) => {
  const { toggleProduct, isProductSelected } = useProducts();
  const isSelected = isProductSelected(product.id);

  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Cerrar con ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleToggleProduct = () => {
    toggleProduct(product);
  };

  return (
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <h3 id="modal-title" className={styles.title}>
            {product.name}
          </h3>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className={styles.content}>
          <div className={styles.imageSection}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.image}
            />
            {product.popular && (
              <span className={styles.popularBadge}>⭐ Producto Popular</span>
            )}
          </div>

          <div className={styles.infoSection}>
            <p className={styles.description}>{product.description}</p>

            <div className={styles.features}>
              <h4 className={styles.featuresTitle}>Características:</h4>
              <ul className={styles.featuresList}>
                {product.features.map((feature, index) => (
                  <li key={index} className={styles.feature}>
                    <span className={styles.featureIcon}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {product.customizable && (
              <div className={styles.customizable}>
                <span className={styles.customizableIcon}>🎨</span>
                <div>
                  <h4 className={styles.customizableTitle}>
                    Producto Personalizable
                  </h4>
                  <p className={styles.customizableText}>
                    Podemos personalizar este producto con tu logo, colores
                    corporativos y diseño exclusivo.
                  </p>
                </div>
              </div>
            )}

            <div className={styles.category}>
              <span className={styles.categoryLabel}>Categoría:</span>
              <span className={styles.categoryValue}>
                {product.category.charAt(0).toUpperCase() +
                  product.category.slice(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <Button
            variant={isSelected ? "success" : "primary"}
            size="large"
            fullWidth
            onClick={handleToggleProduct}
          >
            {isSelected ? "Producto Seleccionado ✓" : "Seleccionar Producto"}
          </Button>
          <Button variant="ghost" size="large" fullWidth onClick={onClose}>
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
};

ProductModal.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
    image: PropTypes.string.isRequired,
    popular: PropTypes.bool,
    customizable: PropTypes.bool,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ProductModal;
