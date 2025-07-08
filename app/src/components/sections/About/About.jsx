import { useState, useEffect } from "react";
import { Container, Card } from "../../common";
import styles from "./About.module.css";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { number: "500+", label: "Clientes Satisfechos", icon: "👥" },
    { number: "50K+", label: "Productos Entregados", icon: "📦" },
    { number: "5", label: "Años de Experiencia", icon: "🏆" },
    { number: "24/7", label: "Atención al Cliente", icon: "📞" },
  ];

  const values = [
    {
      icon: "🌱",
      title: "Sustentabilidad",
      description:
        "Productos eco-friendly que cuidan el medio ambiente sin comprometer la calidad.",
    },
    {
      icon: "🎨",
      title: "Personalización",
      description:
        "Diseños únicos que reflejan la identidad de tu marca con total precisión.",
    },
    {
      icon: "⚡",
      title: "Rapidez",
      description:
        "Entrega en tiempo récord sin comprometer la calidad de nuestros productos.",
    },
    {
      icon: "🏆",
      title: "Calidad Premium",
      description:
        "Materiales de primera calidad en todos nuestros productos y procesos.",
    },
  ];

  return (
    <section id="nosotros" className={styles.section}>
      <Container>
        {/* Header */}
        <div className={`${styles.header} ${isVisible ? styles.visible : ""}`}>
          <h2 className={styles.title}>Sobre ZOU</h2>
          <p className={styles.subtitle}>
            Somos especialistas en productos descartables personalizados que
            ayudan a tu empresa a destacar en cada detalle
          </p>
        </div>

        {/* Historia */}
        <div className={`${styles.story} ${isVisible ? styles.visible : ""}`}>
          <div className={styles.storyContent}>
            <h3 className={styles.storyTitle}>Nuestra Historia</h3>
            <p className={styles.storyText}>
              Fundada en 2019, ZOU nació con la misión de revolucionar la
              industria de productos descartables, combinando sostenibilidad,
              calidad y personalización. Lo que comenzó como un pequeño
              emprendimiento familiar, hoy se ha convertido en la elección
              preferida de cientos de empresas que buscan productos únicos y
              responsables con el medio ambiente.
            </p>
            <p className={styles.storyText}>
              Creemos que cada producto cuenta una historia, y nos
              especializamos en ayudar a las marcas a contar la suya de manera
              memorable y sostenible. Nuestro compromiso va más allá del
              producto: construimos relaciones duraderas con nuestros clientes.
            </p>
            <div className={styles.highlights}>
              <div className={styles.highlight}>
                <span className={styles.highlightIcon}>✓</span>
                <span>Productos 100% personalizables</span>
              </div>
              <div className={styles.highlight}>
                <span className={styles.highlightIcon}>✓</span>
                <span>Materiales eco-friendly certificados</span>
              </div>
              <div className={styles.highlight}>
                <span className={styles.highlightIcon}>✓</span>
                <span>Entrega en toda Argentina</span>
              </div>
            </div>
          </div>
          <div className={styles.storyImage}>
            <img
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop"
              alt="Equipo ZOU trabajando en productos personalizados"
              className={styles.image}
              loading="lazy"
            />
            <div className={styles.imageOverlay}>
              <span className={styles.overlayText}>
                Calidad en cada detalle
              </span>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className={`${styles.stats} ${isVisible ? styles.visible : ""}`}>
          <h3 className={styles.statsTitle}>Nuestros Números</h3>
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div
                key={index}
                className={styles.statItem}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={styles.statIcon}>{stat.icon}</div>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Valores */}
        <div className={`${styles.values} ${isVisible ? styles.visible : ""}`}>
          <h3 className={styles.valuesTitle}>¿Por qué elegirnos?</h3>
          <div className={styles.valuesGrid}>
            {values.map((value, index) => (
              <Card
                key={index}
                variant="elevated"
                className={`${styles.valueCard}`}
                style={{ animationDelay: `${index * 0.15}s` }}
                hoverable
              >
                <div className={styles.valueIcon}>{value.icon}</div>
                <h4 className={styles.valueTitle}>{value.title}</h4>
                <p className={styles.valueDescription}>{value.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={`${styles.cta} ${isVisible ? styles.visible : ""}`}>
          <Card variant="filled" className={styles.ctaCard}>
            <h3 className={styles.ctaTitle}>
              ¿Listo para personalizar tus productos?
            </h3>
            <p className={styles.ctaText}>
              Contactanos hoy y descubrí cómo podemos ayudar a tu empresa a
              destacar
            </p>
            <button
              className={styles.ctaButton}
              onClick={() =>
                document
                  .getElementById("contacto")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Solicitar Presupuesto Gratuito
            </button>
          </Card>
        </div>
      </Container>
    </section>
  );
};

export default About;
