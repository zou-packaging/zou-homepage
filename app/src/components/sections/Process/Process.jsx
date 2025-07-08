import { useState } from "react";
import { Container, Card } from "../../common";
import styles from "./Process.module.css";

const Process = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      step: "01",
      title: "Consulta Inicial",
      subtitle: "Conocemos tu proyecto",
      description:
        "Nos ponemos en contacto contigo para entender tus necesidades específicas, cantidad de productos, diseño deseado y tiempos de entrega.",
      details: [
        "Análisis de necesidades específicas",
        "Definición de cantidades y productos",
        "Evaluación de diseño y personalización",
        "Establecimiento de cronograma",
      ],
      icon: "📞",
      duration: "24-48 hs",
      image:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop",
    },
    {
      step: "02",
      title: "Diseño y Propuesta",
      subtitle: "Creamos tu propuesta personalizada",
      description:
        "Nuestro equipo de diseño desarrolla una propuesta visual con tu branding y te enviamos un presupuesto detallado sin compromiso.",
      details: [
        "Desarrollo de diseño personalizado",
        "Adaptación a tu identidad corporativa",
        "Presupuesto detallado y transparente",
        "Múltiples opciones si es necesario",
      ],
      icon: "🎨",
      duration: "2-3 días",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    },
    {
      step: "03",
      title: "Aprobación y Producción",
      subtitle: "Tu proyecto toma forma",
      description:
        "Una vez aprobado el diseño y firmado el presupuesto, iniciamos la producción con materiales de primera calidad y control de calidad estricto.",
      details: [
        "Confirmación de diseño final",
        "Selección de materiales premium",
        "Proceso de producción supervisado",
        "Control de calidad en cada etapa",
      ],
      icon: "⚙️",
      duration: "5-10 días",
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
    },
    {
      step: "04",
      title: "Entrega",
      subtitle: "Recibís tu pedido perfecto",
      description:
        "Coordinamos la entrega en tiempo y forma. Tu satisfacción es nuestra prioridad, por eso verificamos que todo esté perfecto antes del envío.",
      details: [
        "Empaque cuidadoso y seguro",
        "Coordinación de entrega flexible",
        "Verificación final de calidad",
        "Soporte post-entrega garantizado",
      ],
      icon: "🚚",
      duration: "1-2 días",
      image:
        "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=400&h=300&fit=crop",
    },
  ];

  const timeline = [
    { day: "Día 1", activity: "Recibimos tu consulta" },
    { day: "Día 2", activity: "Contacto y análisis de necesidades" },
    { day: "Día 3-4", activity: "Diseño y desarrollo de propuesta" },
    { day: "Día 5", activity: "Envío de presupuesto y diseño" },
    { day: "Día 6-7", activity: "Revisión y aprobación del cliente" },
    { day: "Día 8-15", activity: "Producción y control de calidad" },
    { day: "Día 16", activity: "Entrega del pedido completo" },
  ];

  const guarantees = [
    {
      icon: "🛡️",
      title: "Garantía de Calidad",
      description: "100% satisfacción garantizada o reponemos el producto",
    },
    {
      icon: "⏱️",
      title: "Entrega Puntual",
      description:
        "Cumplimos con los tiempos acordados o compensamos el retraso",
    },
    {
      icon: "🎯",
      title: "Diseño Exacto",
      description: "El producto final será exactamente como lo aprobaste",
    },
    {
      icon: "💬",
      title: "Soporte Completo",
      description: "Acompañamiento durante todo el proceso y post-venta",
    },
  ];

  return (
    <section id="proceso" className={styles.section}>
      <Container>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>¿Cómo Trabajamos?</h2>
          <p className={styles.subtitle}>
            Un proceso simple y transparente que garantiza resultados
            excepcionales
          </p>
        </div>

        {/* Steps Navigation */}
        <div className={styles.stepsNavigation}>
          {steps.map((step, index) => (
            <button
              key={index}
              className={`${styles.stepButton} ${
                activeStep === index ? styles.active : ""
              }`}
              onClick={() => setActiveStep(index)}
            >
              <span className={styles.stepNumber}>{step.step}</span>
              <span className={styles.stepTitle}>{step.title}</span>
            </button>
          ))}
        </div>

        {/* Active Step Detail */}
        <Card variant="elevated" className={styles.activeStep}>
          <div className={styles.stepContent}>
            <div className={styles.stepInfo}>
              <div className={styles.stepHeader}>
                <span className={styles.stepIcon}>
                  {steps[activeStep].icon}
                </span>
                <div>
                  <h3 className={styles.stepMainTitle}>
                    {steps[activeStep].title}
                  </h3>
                  <p className={styles.stepSubtitle}>
                    {steps[activeStep].subtitle}
                  </p>
                </div>
                <div className={styles.stepDuration}>
                  <span className={styles.durationLabel}>Duración</span>
                  <span className={styles.durationValue}>
                    {steps[activeStep].duration}
                  </span>
                </div>
              </div>

              <p className={styles.stepDescription}>
                {steps[activeStep].description}
              </p>

              <div className={styles.stepDetails}>
                <h4 className={styles.detailsTitle}>
                  ¿Qué incluye esta etapa?
                </h4>
                <ul className={styles.detailsList}>
                  {steps[activeStep].details.map((detail, index) => (
                    <li key={index} className={styles.detailItem}>
                      <span className={styles.detailIcon}>✓</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.stepImage}>
              <img
                src={steps[activeStep].image}
                alt={`Paso ${steps[activeStep].step}: ${steps[activeStep].title}`}
                className={styles.stepImg}
              />
              <div className={styles.stepBadge}>
                <span className={styles.badgeText}>
                  Paso {steps[activeStep].step}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Timeline */}
        <div className={styles.timeline}>
          <h3 className={styles.timelineTitle}>Timeline Típico de Proyecto</h3>
          <div className={styles.timelineContainer}>
            {timeline.map((item, index) => (
              <div key={index} className={styles.timelineItem}>
                <div className={styles.timelineDay}>{item.day}</div>
                <div className={styles.timelineActivity}>{item.activity}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantees */}
        <div className={styles.guarantees}>
          <h3 className={styles.guaranteesTitle}>Nuestras Garantías</h3>
          <div className={styles.guaranteesGrid}>
            {guarantees.map((guarantee, index) => (
              <Card
                key={index}
                variant="filled"
                className={styles.guaranteeCard}
              >
                <div className={styles.guaranteeIcon}>{guarantee.icon}</div>
                <h4 className={styles.guaranteeTitle}>{guarantee.title}</h4>
                <p className={styles.guaranteeDescription}>
                  {guarantee.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <Card variant="filled" className={styles.ctaCard}>
            <h3 className={styles.ctaTitle}>
              ¿Listo para empezar tu proyecto?
            </h3>
            <p className={styles.ctaText}>
              Iniciá hoy mismo y recibí tu pedido en menos de 2 semanas
            </p>
            <button
              className={styles.ctaButton}
              onClick={() =>
                document
                  .getElementById("contacto")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Comenzar Proyecto
            </button>
          </Card>
        </div>
      </Container>
    </section>
  );
};

export default Process;
