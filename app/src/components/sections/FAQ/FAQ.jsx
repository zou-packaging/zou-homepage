import { useState } from "react";
import { Container, Card } from "../../common";
import styles from "./FAQ.module.css";

const FAQ = () => {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  const faqData = [
    {
      category: "Productos y Personalización",
      questions: [
        {
          question: "¿Qué tipos de productos pueden personalizar?",
          answer:
            "Personalizamos vasos térmicos (8oz, 12oz, 16oz), servilletas (cocktail, almuerzo, cena), bolsas de papel kraft, palitos removedores, tapas, y prácticamente cualquier producto descartable que necesites para tu empresa.",
        },
        {
          question: "¿Cuál es la cantidad mínima de pedido?",
          answer:
            "La cantidad mínima varía según el producto: vasos térmicos desde 500 unidades, servilletas desde 1000 unidades, bolsas desde 300 unidades. Consultanos para productos específicos ya que siempre buscamos adaptarnos a tus necesidades.",
        },
        {
          question: "¿Puedo ver una muestra antes de hacer el pedido completo?",
          answer:
            "¡Absolutamente! Ofrecemos muestras gratuitas para que puedas evaluar la calidad y el diseño. Las muestras están listas en 2-3 días hábiles y te las enviamos sin costo.",
        },
        {
          question: "¿Qué formatos de archivo necesitan para el diseño?",
          answer:
            "Aceptamos archivos en AI, EPS, PDF, PNG de alta resolución. Si no tenés el diseño, nuestro equipo puede crearlo desde cero basándose en tu logo y colores corporativos.",
        },
      ],
    },
    {
      category: "Plazos y Entrega",
      questions: [
        {
          question: "¿Cuánto tiempo demora la producción?",
          answer:
            "El tiempo estándar es de 7-10 días hábiles una vez aprobado el diseño y confirmado el pago. Para pedidos urgentes, ofrecemos servicio express en 3-5 días con recargo del 20%.",
        },
        {
          question: "¿Realizan envíos a todo el país?",
          answer:
            "Sí, enviamos a toda Argentina. Los envíos dentro de Córdoba capital son gratuitos para pedidos superiores a $50.000. Para el interior, el costo se calcula según destino y peso.",
        },
        {
          question: "¿Puedo retirar el pedido en planta?",
          answer:
            "¡Por supuesto! Tenés la opción de retirar en nuestra planta ubicada en Córdoba capital, con descuento del 5% en el total del pedido. Coordinamos el horario que más te convenga.",
        },
      ],
    },
    {
      category: "Calidad y Materiales",
      questions: [
        {
          question: "¿Qué materiales utilizan?",
          answer:
            "Utilizamos únicamente materiales de primera calidad: papel kraft certificado, cartón alimentario, tintas ecológicas sin plomo. Todos nuestros productos cumplen con normativas ANMAT y son aptos para contacto con alimentos.",
        },
        {
          question: "¿Los productos son eco-friendly?",
          answer:
            "Sí, todos nuestros productos son biodegradables y compostables. Utilizamos tintas base agua, papeles de bosques sustentables y procesos que minimizan el impacto ambiental.",
        },
        {
          question: "¿Ofrecen garantía de calidad?",
          answer:
            "Garantizamos 100% la calidad de nuestros productos. Si hay algún inconveniente con la impresión, materiales o terminación, reponemos el producto sin costo adicional.",
        },
      ],
    },
    {
      category: "Precios y Pagos",
      questions: [
        {
          question: "¿Cómo funcionan los precios por cantidad?",
          answer:
            "Manejamos escalas de precios: a mayor cantidad, menor precio unitario. Por ejemplo, 1000 vasos tienen un precio, pero 5000 tienen un descuento significativo. Te enviamos tabla de precios completa.",
        },
        {
          question: "¿Qué métodos de pago aceptan?",
          answer:
            "Aceptamos transferencia bancaria, depósito, efectivo, y tarjetas de crédito/débito. Para empresas ofrecemos cuenta corriente con términos de pago de 30 días.",
        },
        {
          question: "¿Hacen factura A?",
          answer:
            "Sí, emitimos factura A, B o C según corresponda. Somos empresa registrada con todos los impuestos al día. Podés solicitar nuestro comprobante de inscripción.",
        },
      ],
    },
    {
      category: "Servicios Adicionales",
      questions: [
        {
          question: "¿Ofrecen servicio de diseño gráfico?",
          answer:
            "Sí, tenemos un equipo de diseñadores especializados en branding para productos descartables. El servicio de diseño está incluido en pedidos superiores a $100.000.",
        },
        {
          question: "¿Pueden almacenar productos para entregas periódicas?",
          answer:
            "Ofrecemos servicio de stock para clientes recurrentes. Producimos grandes cantidades con mejor precio y entregamos según tus necesidades mensuales.",
        },
        {
          question: "¿Atienden eventos puntuales?",
          answer:
            "¡Absolutamente! Somos especialistas en eventos corporativos, casamientos, cumpleaños empresariales. Ofrecemos productos temáticos y entregas just-in-time.",
        },
      ],
    },
  ];

  return (
    <section id="faq" className={styles.section}>
      <Container>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Preguntas Frecuentes</h2>
          <p className={styles.subtitle}>
            Resolvemos todas tus dudas sobre nuestros productos y servicios
          </p>
        </div>

        {/* FAQ Categories */}
        <div className={styles.categories}>
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className={styles.category}>
              <h3 className={styles.categoryTitle}>{category.category}</h3>

              <div className={styles.questions}>
                {category.questions.map((item, questionIndex) => {
                  const globalIndex = categoryIndex * 10 + questionIndex;
                  const isOpen = openItem === globalIndex;

                  return (
                    <Card
                      key={questionIndex}
                      variant="outlined"
                      className={styles.questionCard}
                    >
                      <button
                        className={`${styles.questionButton} ${
                          isOpen ? styles.open : ""
                        }`}
                        onClick={() => toggleItem(globalIndex)}
                      >
                        <span className={styles.questionText}>
                          {item.question}
                        </span>
                        <span className={styles.questionIcon}>
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>

                      <div
                        className={`${styles.answerContainer} ${
                          isOpen ? styles.open : ""
                        }`}
                      >
                        <div className={styles.answerContent}>
                          <p className={styles.answerText}>{item.answer}</p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className={styles.contactCTA}>
          <Card variant="filled" className={styles.ctaCard}>
            <h3 className={styles.ctaTitle}>
              ¿No encontraste lo que buscabas?
            </h3>
            <p className={styles.ctaText}>
              Nuestro equipo está listo para resolver cualquier duda específica
              sobre tu proyecto
            </p>
            <div className={styles.ctaButtons}>
              <button
                className={styles.ctaButton}
                onClick={() =>
                  window.open(
                    "https://wa.me/5493517892876?text=Hola! Tengo una consulta que no está en el FAQ",
                    "_blank"
                  )
                }
              >
                Consultar por WhatsApp
              </button>
              <button
                className={styles.ctaButtonSecondary}
                onClick={() =>
                  document
                    .getElementById("contacto")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                Escribir Email
              </button>
            </div>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className={styles.quickStats}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>95%</span>
            <span className={styles.statLabel}>
              Consultas resueltas en 24hs
            </span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>500+</span>
            <span className={styles.statLabel}>Dudas respondidas este mes</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>100%</span>
            <span className={styles.statLabel}>Clientes satisfechos</span>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FAQ;
