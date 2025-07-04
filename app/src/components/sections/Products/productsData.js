// Datos de productos
export const categories = [
  { id: "todos", name: "Todos", icon: "🎯" },
  { id: "vasos", name: "Vasos", icon: "☕" },
  { id: "servilletas", name: "Servilletas", icon: "🧻" },
  { id: "bolsas", name: "Bolsas", icon: "🛍️" },
  { id: "palitos", name: "Palitos", icon: "🥄" },
];

export const products = [
  // Vasos
  {
    id: "vaso-termico-8oz",
    name: "Vaso Térmico 8oz",
    category: "vasos",
    description:
      "Ideal para café y bebidas calientes. Mantiene la temperatura.",
    features: ["Capacidad: 240ml", "Doble pared", "Tapa incluida"],
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400",
    popular: true,
    customizable: true,
  },
  {
    id: "vaso-termico-12oz",
    name: "Vaso Térmico 12oz",
    category: "vasos",
    description: "Perfecto para bebidas medianas. Diseño ergonómico.",
    features: ["Capacidad: 360ml", "Antideslizante", "Biodegradable"],
    image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400",
    popular: true,
    customizable: true,
  },
  {
    id: "vaso-termico-16oz",
    name: "Vaso Térmico 16oz",
    category: "vasos",
    description: "Gran capacidad para bebidas XL. Resistente y duradero.",
    features: ["Capacidad: 480ml", "Extra resistente", "Personalizable"],
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400",
    customizable: true,
  },

  // Servilletas
  {
    id: "servilleta-cocktail",
    name: "Servilleta Cocktail",
    category: "servilletas",
    description: "Servilletas pequeñas ideales para eventos y cocktails.",
    features: ["20x20cm", "2 capas", "Papel reciclado"],
    image: "https://images.unsplash.com/photo-1604709521245-d97c5b93ff7a?w=400",
    popular: true,
    customizable: true,
  },
  {
    id: "servilleta-almuerzo",
    name: "Servilleta Almuerzo",
    category: "servilletas",
    description: "Tamaño estándar para restaurantes y cafeterías.",
    features: ["33x33cm", "3 capas", "Alta absorción"],
    image: "https://images.unsplash.com/photo-1607077352583-ce29280f4f2b?w=400",
    customizable: true,
  },
  {
    id: "servilleta-cena",
    name: "Servilleta Cena",
    category: "servilletas",
    description: "Servilletas elegantes para cenas formales.",
    features: ["40x40cm", "4 capas", "Textura premium"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    customizable: true,
  },

  // Bolsas
  {
    id: "bolsa-papel-pequena",
    name: "Bolsa de Papel Pequeña",
    category: "bolsas",
    description: "Perfecta para delivery de productos pequeños.",
    features: ["18x22cm", "Papel kraft", "Asas reforzadas"],
    image: "https://images.unsplash.com/photo-1594969155368-f19485a9d88c?w=400",
    popular: true,
    customizable: true,
  },
  {
    id: "bolsa-papel-mediana",
    name: "Bolsa de Papel Mediana",
    category: "bolsas",
    description: "Ideal para pedidos medianos y takeaway.",
    features: ["26x32cm", "Base reforzada", "Biodegradable"],
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400",
    customizable: true,
  },
  {
    id: "bolsa-papel-grande",
    name: "Bolsa de Papel Grande",
    category: "bolsas",
    description: "Gran capacidad para pedidos familiares.",
    features: ["32x42cm", "Extra resistente", "Doble asa"],
    image: "https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?w=400",
    customizable: true,
  },

  // Palitos
  {
    id: "palito-cafe-madera",
    name: "Palito Café Madera",
    category: "palitos",
    description: "Removedor ecológico de madera natural.",
    features: ["11cm largo", "Madera de abedul", "Compostable"],
    image: "https://images.unsplash.com/photo-1610632380989-680fe40816c6?w=400",
    popular: true,
    customizable: false,
  },
  {
    id: "palito-cafe-bambu",
    name: "Palito Café Bambú",
    category: "palitos",
    description: "Alternativa sustentable en bambú.",
    features: ["14cm largo", "Bambú natural", "100% biodegradable"],
    image: "https://images.unsplash.com/photo-1609205807490-b15b9677c2e0?w=400",
    customizable: false,
  },
  {
    id: "cuchara-postre-madera",
    name: "Cuchara Postre Madera",
    category: "palitos",
    description: "Cucharita ideal para postres y helados.",
    features: ["10cm largo", "Madera lisa", "Sin astillas"],
    image: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=400",
    customizable: false,
  },
];

// Función helper para obtener productos por categoría
export const getProductsByCategory = (category) => {
  if (category === "todos") {
    return products;
  }
  return products.filter((product) => product.category === category);
};

// Función helper para obtener productos populares
export const getPopularProducts = () => {
  return products.filter((product) => product.popular);
};
