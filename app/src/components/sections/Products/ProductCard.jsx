import { useState } from "react";
import PropTypes from "prop-types";
import { Card } from "../../common";
import { useProducts } from "../../../contexts/ProductsContext";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product, onViewDetails }) => {
  const { toggleProduct, isProductSelected } = useProducts();
  const [imageLoaded, setImageLoaded] = useState(false);

  const isSelected = isProductSelected(product.id);

  const handleToggle = (e) => {
    e.stopPropagation();
    toggleProduct(product);
  };

  const handleCardClick = () => {
    if (onViewDetails) {
      onViewDetails(product);
    }
  };

  return (
    <Card
      className={`${styles.productCard} ${isSelected ? styles.selected : ""}`}
      hoverable
      selected={isSelected}
      onClick={handleCardClick}
      variant="elevated"
    >
      {/* Imagen del producto */}
      <div className={styles.imageWrapper}>
        {!imageLoaded && <div className={styles.imageSkeleton} />}
        <img
          src={product.image}
          alt={product.name}
          className={`${styles.image} ${imageLoaded ? styles.loaded : ""}`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />

        {/* Badge de popular */}
        {product.popular && (
          <span className={styles.popularBadge}>⭐ Popular</span>
        )}

        {/* Checkbox de selección */}
        <div className={styles.selectWrapper}>
          <label className={styles.selectLabel}>
            <input
              type="checkbox"
              checked={isSelected}
              onChange={handleToggle}
              className={styles.checkbox}
              aria-label={`Seleccionar ${product.name}`}
            />
            <span className={styles.checkmark}>
              {isSelected && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
              )}
            </span>
          </label>
        </div>
      </div>

      {/* Contenido */}
      <div className={styles.content}>
        <h3 className={styles.title}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>

        {/* Características */}
        <ul className={styles.features}>
          {product.features.map((feature, index) => (
            <li key={index} className={styles.feature}>
              <span className={styles.featureIcon}>✓</span>
              {feature}
            </li>
          ))}
        </ul>

        {/* Tags */}
        <div className={styles.tags}>
          {product.customizable && (
            <span className={styles.tag}>🎨 Personalizable</span>
          )}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button
            className={styles.selectButton}
            onClick={handleToggle}
            aria-pressed={isSelected}
          >
            {isSelected ? "Seleccionado ✓" : "Seleccionar"}
          </button>
          <button
            className={styles.detailsButton}
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
          >
            Ver detalles
          </button>
        </div>
      </div>
    </Card>
  );
};

ProductCard.propTypes = {
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
  onViewDetails: PropTypes.func,
};

export default ProductCard;
