import { useState } from "react";
import { Container, Card } from "../../common";
import styles from "./Clients.module.css";

const Clients = () => {
  const [activeCase, setActiveCase] = useState(0);

  // Datos de empresas cliente (logos placeholder - reemplazar con logos reales)
  const clients = [
    {
      name: "Café Central",
      logo: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=200&h=100&fit=crop",
      industry: "Gastronomía",
    },
    {
      name: "Hotel Plaza",
      logo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&h=100&fit=crop",
      industry: "Hotelería",
    },
    {
      name: "Eventos & Co",
      logo: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=200&h=100&fit=crop",
      industry: "Eventos",
    },
    {
      name: "Resto Gourmet",
      logo: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&h=100&fit=crop",
      industry: "Restaurantes",
    },
    {
      name: "Panadería del Sol",
      logo: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=100&fit=crop",
      industry: "Panadería",
    },
    {
      name: "Catering Premium",
      logo: "https://images.unsplash.com/photo-1555244162-803834f70033?w=200&h=100&fit=crop",
      industry: "Catering",
    },
  ];

  // Casos de éxito detallados
  const successCases = [
    {
      company: "Café Central",
      challenge:
        "Necesitaban vasos térmicos personalizados para su cadena de 12 locales",
      solution:
        "Diseñamos vasos de 8oz y 12oz con su logo y colores corporativos",
      results: [
        "40% aumento en reconocimiento de marca",
        "Reducción del 60% en costos de marketing",
        "100% satisfacción del cliente",
      ],
      products: [
        "Vasos térmicos 8oz",
        "Vasos térmicos 12oz",
        "Servilletas personalizadas",
      ],
      image:
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=500&h=300&fit=crop",
    },
    {
      company: "Hotel Plaza",
      challenge:
        "Buscaban una línea completa de productos para sus servicios de room service",
      solution:
        "Desarrollamos una línea integral con su identidad visual elegante",
      results: [
        "95% aprobación de huéspedes",
        "30% mejora en imagen corporativa",
        "Certificación eco-friendly obtenida",
      ],
      products: ["Bolsas papel kraft", "Servilletas premium", "Vasos térmicos"],
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=300&fit=crop",
    },
    {
      company: "Eventos & Co",
      challenge:
        "Productos descartables personalizados para eventos corporativos de alto nivel",
      solution: "Creamos líneas temáticas adaptables para cada tipo de evento",
      results: [
        "500+ eventos exitosos",
        "100% clientes que repiten",
        "Expansión a 3 provincias",
      ],
      products: [
        "Servilletas cocktail",
        "Bolsas regalo",
        "Palitos personalizados",
      ],
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=500&h=300&fit=crop",
    },
  ];

  const industries = [
    { name: "Gastronomía", count: 12, icon: "🍽️" },
    { name: "Hotelería", count: 8, icon: "🏨" },
    { name: "Eventos", count: 15, icon: "🎉" },
    { name: "Retail", count: 6, icon: "🛍️" },
    { name: "Corporativo", count: 20, icon: "🏢" },
  ];

  return (
    <section id="clientes" className={styles.section}>
      <Container>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Empresas que Confían en ZOU</h2>
          <p className={styles.subtitle}>
            Más de 60 empresas ya eligieron nuestros productos para potenciar su
            marca
          </p>
        </div>

        {/* Logos Grid */}
        <div className={styles.clientsGrid}>
          {clients.map((client, index) => (
            <div key={index} className={styles.clientLogo}>
              <img
                src={client.logo}
                alt={`Logo de ${client.name}`}
                className={styles.logoImage}
                loading="lazy"
              />
              <div className={styles.clientInfo}>
                <h4 className={styles.clientName}>{client.name}</h4>
                <span className={styles.clientIndustry}>{client.industry}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Industries Stats */}
        <div className={styles.industries}>
          <h3 className={styles.industriesTitle}>Sectores que Atendemos</h3>
          <div className={styles.industriesGrid}>
            {industries.map((industry, index) => (
              <div key={index} className={styles.industryItem}>
                <span className={styles.industryIcon}>{industry.icon}</span>
                <div className={styles.industryInfo}>
                  <h4 className={styles.industryName}>{industry.name}</h4>
                  <span className={styles.industryCount}>
                    {industry.count}+ clientes
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Success Cases */}
        <div className={styles.successCases}>
          <h3 className={styles.casesTitle}>Casos de Éxito</h3>

          {/* Case Navigation */}
          <div className={styles.caseNavigation}>
            {successCases.map((_, index) => (
              <button
                key={index}
                className={`${styles.caseButton} ${
                  activeCase === index ? styles.active : ""
                }`}
                onClick={() => setActiveCase(index)}
              >
                {successCases[index].company}
              </button>
            ))}
          </div>

          {/* Active Case */}
          <Card variant="elevated" className={styles.activeCase}>
            <div className={styles.caseContent}>
              <div className={styles.caseText}>
                <h4 className={styles.caseCompany}>
                  {successCases[activeCase].company}
                </h4>

                <div className={styles.caseSection}>
                  <h5 className={styles.caseSectionTitle}>🎯 Desafío</h5>
                  <p className={styles.caseSectionText}>
                    {successCases[activeCase].challenge}
                  </p>
                </div>

                <div className={styles.caseSection}>
                  <h5 className={styles.caseSectionTitle}>💡 Solución</h5>
                  <p className={styles.caseSectionText}>
                    {successCases[activeCase].solution}
                  </p>
                </div>

                <div className={styles.caseSection}>
                  <h5 className={styles.caseSectionTitle}>📈 Resultados</h5>
                  <ul className={styles.resultsList}>
                    {successCases[activeCase].results.map((result, index) => (
                      <li key={index} className={styles.resultItem}>
                        <span className={styles.resultIcon}>✓</span>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.caseSection}>
                  <h5 className={styles.caseSectionTitle}>
                    📦 Productos Utilizados
                  </h5>
                  <div className={styles.productTags}>
                    {successCases[activeCase].products.map((product, index) => (
                      <span key={index} className={styles.productTag}>
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className={styles.caseImage}>
                <img
                  src={successCases[activeCase].image}
                  alt={`Caso de éxito ${successCases[activeCase].company}`}
                  className={styles.caseImg}
                />
              </div>
            </div>
          </Card>
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <Card variant="filled" className={styles.ctaCard}>
            <h3 className={styles.ctaTitle}>
              ¿Querés ser nuestro próximo caso de éxito?
            </h3>
            <p className={styles.ctaText}>
              Únete a las empresas que ya potencian su marca con nuestros
              productos personalizados
            </p>
            <div className={styles.ctaButtons}>
              <button
                className={styles.ctaButton}
                onClick={() =>
                  document
                    .getElementById("contacto")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                Solicitar Propuesta
              </button>
              <button
                className={styles.ctaButtonSecondary}
                onClick={() =>
                  document
                    .getElementById("productos")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                Ver Catálogo
              </button>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
};

export default Clients;
