import { createContext, useContext, useState, useCallback } from "react";
import PropTypes from "prop-types";

// Crear el contexto
const ProductsContext = createContext();

// Hook personalizado para usar el contexto
export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts debe ser usado dentro de ProductsProvider");
  }
  return context;
};

// Provider del contexto
export const ProductsProvider = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("todos");

  // Agregar o quitar un producto
  const toggleProduct = useCallback((product) => {
    setSelectedProducts((prev) => {
      const isSelected = prev.some((p) => p.id === product.id);

      if (isSelected) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  }, []);

  // Verificar si un producto está seleccionado
  const isProductSelected = useCallback(
    (productId) => {
      return selectedProducts.some((p) => p.id === productId);
    },
    [selectedProducts]
  );

  // Limpiar selección
  const clearSelection = useCallback(() => {
    setSelectedProducts([]);
  }, []);

  // Obtener cantidad de productos seleccionados
  const getSelectedCount = useCallback(() => {
    return selectedProducts.length;
  }, [selectedProducts]);

  const value = {
    selectedProducts,
    activeCategory,
    setActiveCategory,
    toggleProduct,
    isProductSelected,
    clearSelection,
    getSelectedCount,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

ProductsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
