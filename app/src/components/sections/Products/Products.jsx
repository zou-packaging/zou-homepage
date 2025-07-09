import { useState, useEffect } from "react";
import { Container } from "../../common";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import { useProducts } from "../../../contexts/ProductsContext";
import { categories, getProductsByCategory } from "./productsData";
import styles from "./Products.module.css";

const Products = () => {
  const { activeCategory, setActiveCategory, getSelectedCount } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const products = getProductsByCategory(activeCategory);
    setFilteredProducts(products);
  }, [activeCategory]);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const selectedCount = getSelectedCount();

  return (
    <section id="productos" className={styles.section}>
      <Container>
        {/* Header de la sección */}
        <div className={styles.header}>
          <h2 className={styles.title}>Nuestros Productos</h2>
          <p className={styles.subtitle}>
            Seleccioná los productos que te interesan y solicitá un presupuesto
            personalizado
          </p>
        </div>

        {/* Contador de selección */}
        {selectedCount > 0 && (
          <div className={styles.selectionCounter}>
            <span className={styles.counterText}>
              {selectedCount}{" "}
              {selectedCount === 1
                ? "producto seleccionado"
                : "productos seleccionados"}
            </span>
            <button
              className={styles.viewSelectedButton}
              onClick={() =>
                document
                  .getElementById("contacto")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Solicitar Presupuesto →
            </button>
          </div>
        )}

        {/* Filtros de categoría */}
        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`${styles.filterButton} ${
                  activeCategory === category.id ? styles.active : ""
                }`}
                onClick={() => handleCategoryChange(category.id)}
                aria-pressed={activeCategory === category.id}
              >
                <span className={styles.filterIcon}>{category.icon}</span>
                <span className={styles.filterName}>{category.name}</span>
                {category.id !== "todos" && (
                  <span className={styles.filterCount}>
                    {getProductsByCategory(category.id).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de productos */}
        <div className={styles.grid}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        {/* Mensaje si no hay productos */}
        {filteredProducts.length === 0 && (
          <div className={styles.emptyState}>
            <p>No hay productos en esta categoría</p>
          </div>
        )}
      </Container>

      {/* Modal de detalles del producto */}
      {isModalOpen && selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
};

export default Products;
