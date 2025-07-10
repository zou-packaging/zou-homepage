import { useState } from "react";
import { Container, Card } from "../../common";
import { trackMicroConversion } from "../../../utils/conversionTracking";
import styles from "./FAQ.module.css";

const FAQ = () => {
  const [openItem, setOpenItem] = useState(null);

  const toggleItem = (index) => {
    setOpenItem(openItem === index ? null : index);
    
    // Trackear interacción con FAQ
    if (openItem !== index) {
      trackMicroConversion("faq_question_opened", {
        question_index: index,
        question_category: "common_objections"
      });
    }
  };

  // FAQ súper compacto - Solo las preguntas que más frenan la conversión
  const faqData = [
    {
      question: "¿Cuál es la cantidad mínima para pedidos personalizados?",
      answer: "Desde solo 500 unidades para vasos térmicos y 1000 para servilletas. Si necesitás menos cantidad, consultanos porque siempre buscamos soluciones flexibles para nuestros clientes."
    },
    {
      question: "¿Cuánto tiempo demora mi pedido personalizado?",
      answer: "Entre 7-10 días hábiles una vez aprobado el diseño. Para pedidos urgentes ofrecemos servicio express en 3-5 días con un recargo mínimo del 20%."
    },
    {
      question: "¿El diseño gráfico tiene costo adicional?",
      answer: "¡No! El diseño está incluido sin costo en todos los pedidos. Nuestro equipo crea tu diseño basándose en tu logo y colores. Si no tenés logo, también te ayudamos a crearlo."
    },
    {
      question: "¿Puedo ver una muestra antes de hacer el pedido completo?",
      answer: "¡Absolutamente! Te enviamos muestras físicas gratis para que evalúes calidad y diseño. Las muestras están listas en 2-3 días y te las enviamos sin costo a Córdoba capital."
    },
    {
      question: "¿Qué formas de pago aceptan?",
      answer: "Transferencia, efectivo, tarjetas de crédito/débito y cuenta corriente para empresas. Trabajamos con factura A, B o C según corresponda."
    },
    {
      question: "¿Hacen envíos a otras provincias?",
      answer: "Sí, enviamos a todo el país. Córdoba capital: envío gratis en pedidos +$50.000. Interior: costo según destino. Te cotizamos el envío sin compromiso."
    }
  ];

  const handleWhatsAppCTA = () => {
    trackMicroConversion("faq_whatsapp_cta", {
      source: "faq_section",
      action: "whatsapp_contact"
    });
    window.open(
      "https://wa.me/5493517892876?text=Hola! Tengo una consulta que no está en el FAQ de la página web",
      "_blank"
    );
  };

  const handleContactFormCTA = () => {
    trackMicroConversion("faq_contact_form_cta", {
      source: "faq_section", 
      action: "scroll_to_form"
    });
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="faq" className={styles.compactSection}>
      <Container>
        {/* Header compacto */}
        <div className={styles.compactHeader}>
          <h2 className={styles.compactTitle}>
            Preguntas Frecuentes
          </h2>
          <p className={styles.compactSubtitle}>
            Resolvemos las dudas más comunes en segundos
          </p>
        </div>

        {/* FAQ Lista compacta */}
        <div className={styles.compactQuestions}>
          {faqData.map((item, index) => {
            const isOpen = openItem === index;

            return (
              <div key={index} className={styles.compactQuestionCard}>
                <button
                  className={`${styles.compactQuestionButton} ${
                    isOpen ? styles.open : ""
                  }`}
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                  aria-controls={`answer-${index}`}
                >
                  <span className={styles.compactQuestionText}>
                    {item.question}
                  </span>
                  <span className={styles.compactQuestionIcon}>
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <div
                  id={`answer-${index}`}
                  className={`${styles.compactAnswerContainer} ${
                    isOpen ? styles.open : ""
                  }`}
                >
                  <div className={styles.compactAnswerContent}>
                    <p className={styles.compactAnswerText}>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA compacto */}
        <div className={styles.compactCTA}>
          <div className={styles.compactCTAContent}>
            <h3 className={styles.compactCTATitle}>
              ¿Tenés otra consulta?
            </h3>
            <p className={styles.compactCTAText}>
              Te respondemos en menos de 2 horas
            </p>
            <div className={styles.compactCTAButtons}>
              <button
                className={styles.compactCTAWhatsApp}
                onClick={handleWhatsAppCTA}
              >
                📱 WhatsApp Directo
              </button>
              <button
                className={styles.compactCTAEmail}
                onClick={handleContactFormCTA}
              >
                ✉️ Enviar Email
              </button>
            </div>
          </div>
        </div>

        {/* Trust indicator final */}
        <div className={styles.finalTrust}>
          <span className={styles.trustIcon}>⚡</span>
          <span className={styles.trustText}>
            <strong>Respuesta garantizada:</strong> Si no te contestamos en 24hs, tu primer pedido tiene 10% de descuento adicional
          </span>
        </div>
      </Container>
    </section>
  );
};

export default FAQ;
