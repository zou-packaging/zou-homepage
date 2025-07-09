import { Container, Card } from "../../common";
import styles from "./About.module.css";

const About = () => {
  const stats = [
    { number: "500+", label: "Clientes Satisfechos" },
    { number: "50K+", label: "Productos Entregados" },
    { number: "5", label: "Años de Experiencia" },
    { number: "24/7", label: "Atención al Cliente" },
  ];

  const values = [
    {
      icon: "🌱",
      title: "Sustentabilidad",
      description: "Productos eco-friendly que cuidan el medio ambiente",
    },
    {
      icon: "🎨",
      title: "Personalización",
      description: "Diseños únicos que reflejan la identidad de tu marca",
    },
    {
      icon: "⚡",
      title: "Rapidez",
      description: "Entrega en tiempo récord sin comprometer la calidad",
    },
    {
      icon: "🏆",
      title: "Calidad Premium",
      description: "Materiales de primera calidad en todos nuestros productos",
    },
  ];

  return (
    <section id="nosotros" className={styles.section}>
      <Container>
        <div className={styles.header}>
          <h2 className={styles.title}>Sobre ZOU</h2>
          <p className={styles.subtitle}>
            Somos especialistas en productos descartables personalizados que
            ayudan a tu empresa a destacar
          </p>
        </div>

        <div className={styles.story}>
          <div className={styles.storyContent}>
            <h3 className={styles.storyTitle}>Nuestra Historia</h3>
            <p className={styles.storyText}>
              Fundada en 2019, ZOU nació con la misión de revolucionar la
              industria de productos descartables, combinando sostenibilidad,
              calidad y personalización.
            </p>
            <p className={styles.storyText}>
              Creemos que cada producto cuenta una historia, y nos
              especializamos en ayudar a las marcas a contar la suya de manera
              memorable y sostenible.
            </p>
          </div>
          <div className={styles.storyImage}>
            <img
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600"
              alt="Equipo ZOU"
              className={styles.image}
            />
          </div>
        </div>

        <div className={styles.stats}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statItem}>
              <div className={styles.statNumber}>{stat.number}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div className={styles.values}>
          <h3 className={styles.valuesTitle}>Nuestros Valores</h3>
          <div className={styles.valuesGrid}>
            {values.map((value, index) => (
              <Card key={index} variant="elevated" className={styles.valueCard}>
                <div className={styles.valueIcon}>{value.icon}</div>
                <h4 className={styles.valueTitle}>{value.title}</h4>
                <p className={styles.valueDescription}>{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default About;
