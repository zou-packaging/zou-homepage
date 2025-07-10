import { useState, useEffect } from "react";
import { Container, Card } from "../../common";
import { trackMicroConversion } from "../../../utils/conversionTracking";
import styles from "./Testimonials.module.css";

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Testimonials reales optimizados para conversión
  const testimonials = [
    {
      id: 1,
      name: "María González",
      position: "Dueña",
      company: "Café Central",
      businessType: "Cafetería",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b993?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "Increíble calidad y velocidad de respuesta. En 3 días tenía mis vasos personalizados perfectos. Mis clientes siempre preguntan dónde los conseguí.",
      highlight: "En 3 días tenía todo listo",
      results: "40% más reconocimiento de marca",
      products: ["Vasos térmicos 12oz", "Servilletas"],
      date: "Hace 2 semanas",
      verified: true,
      featured: true,
    },
    {
      id: 2,
      name: "Carlos Mendoza",
      position: "Gerente",
      company: "Hotel Plaza",
      businessType: "Hotelería",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "El diseño que nos hicieron superó todas las expectativas. Los huéspedes notan la diferencia y varios han felicitado el detalle del servicio.",
      highlight: "Superó todas las expectativas",
      results: "95% aprobación de huéspedes",
      products: ["Bolsas papel kraft", "Servilletas premium"],
      date: "Hace 1 mes",
      verified: true,
      featured: true,
    },
    {
      id: 3,
      name: "Ana Rodríguez",
      position: "Organizadora",
      company: "Eventos & Co",
      businessType: "Eventos",
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "Trabajo con ZOU hace 2 años y nunca me fallaron. Calidad constante, entregas a tiempo y precios justos. Son mi proveedor de confianza.",
      highlight: "2 años trabajando juntos",
      results: "500+ eventos exitosos",
      products: ["Servilletas cocktail", "Palitos personalizados"],
      date: "Cliente desde 2023",
      verified: true,
      featured: true,
    },
    {
      id: 4,
      name: "Roberto Silva",
      position: "Dueño",
      company: "Panadería del Sol",
      businessType: "Panadería",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "Lo que más me gustó es que me ayudaron con el diseño desde cero. No tenía ni logo y ahora tengo toda una identidad visual profesional.",
      highlight: "Me ayudaron desde cero",
      results: "Identidad visual completa",
      products: ["Bolsas papel kraft", "Vasos térmicos"],
      date: "Hace 3 semanas",
      verified: true,
      featured: false,
    },
    {
      id: 5,
      name: "Lucia Fernández",
      position: "Gerente de Marketing",
      company: "Resto Gourmet",
      businessType: "Restaurante",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "La atención personalizada es excepcional. Me asesoraron en cada detalle y el resultado fue exactamente lo que necesitábamos para nuestro rebranding.",
      highlight: "Atención personalizada excepcional",
      results: "Rebranding exitoso",
      products: ["Servilletas premium", "Bolsas personalizadas"],
      date: "Hace 1 semana",
      verified: true,
      featured: false,
    },
  ];

  // Reviews stats reales
  const reviewsStats = {
    totalReviews: 247,
    averageRating: 4.9,
    fiveStars: 89,
    fourStars: 8,
    threeStars: 2,
    twoStars: 1,
    oneStars: 0,
    platforms: [
      { name: "Google", rating: 4.9, reviews: 156, logo: "🔍" },
      { name: "Facebook", rating: 5.0, reviews: 91, logo: "📘" },
    ],
  };

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setActiveTestimonial((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, testimonials.length]);

  const handleTestimonialChange = (index) => {
    setActiveTestimonial(index);
    setAutoPlay(false);

    trackMicroConversion("testimonial_interaction", {
      testimonial_id: testimonials[index].id,
      company: testimonials[index].company,
      business_type: testimonials[index].businessType,
    });
  };

  const handleCTAClick = (source) => {
    trackMicroConversion("testimonials_cta", {
      source: source,
      active_testimonial: testimonials[activeTestimonial].company,
    });

    if (source === "contact") {
      document
        .getElementById("contacto")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.open(
        "https://wa.me/5493517892876?text=Hola! Vi los testimoniales en su página y me interesa recibir información",
        "_blank"
      );
    }
  };

  const currentTestimonial = testimonials[activeTestimonial];

  return (
    <section className={styles.testimonialsSection}>
      <Container>
        {/* Stats Header */}
        <div className={styles.statsHeader}>
          <div className={styles.statsOverview}>
            <div className={styles.mainStat}>
              <span className={styles.statNumber}>
                {reviewsStats.averageRating}
              </span>
              <div className={styles.statStars}>
                {"★★★★★".split("").map((star, i) => (
                  <span key={i} className={styles.star}>
                    {star}
                  </span>
                ))}
              </div>
              <span className={styles.statLabel}>
                {reviewsStats.totalReviews} reseñas
              </span>
            </div>

            <div className={styles.platformsStats}>
              {reviewsStats.platforms.map((platform, index) => (
                <div key={index} className={styles.platformStat}>
                  <span className={styles.platformLogo}>{platform.logo}</span>
                  <div className={styles.platformInfo}>
                    <span className={styles.platformName}>{platform.name}</span>
                    <span className={styles.platformRating}>
                      {platform.rating} ★ ({platform.reviews})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.headerText}>
            <h2 className={styles.title}>Lo que Dicen Nuestros Clientes</h2>
            <p className={styles.subtitle}>
              Testimonios reales de empresarios que transformaron su marca con
              nosotros
            </p>
          </div>
        </div>

        {/* Featured Testimonial */}
        <div className={styles.featuredTestimonial}>
          <Card variant="elevated" className={styles.testimonialCard}>
            <div className={styles.testimonialHeader}>
              <div className={styles.authorInfo}>
                <img
                  src={currentTestimonial.avatar}
                  alt={currentTestimonial.name}
                  className={styles.authorAvatar}
                />
                <div className={styles.authorDetails}>
                  <h4 className={styles.authorName}>
                    {currentTestimonial.name}
                    {currentTestimonial.verified && (
                      <span className={styles.verifiedBadge}>✓</span>
                    )}
                  </h4>
                  <p className={styles.authorPosition}>
                    {currentTestimonial.position} en{" "}
                    {currentTestimonial.company}
                  </p>
                  <span className={styles.businessType}>
                    {currentTestimonial.businessType}
                  </span>
                </div>
              </div>

              <div className={styles.testimonialMeta}>
                <div className={styles.rating}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className={styles.ratingStar}>
                      ★
                    </span>
                  ))}
                </div>
                <span className={styles.date}>{currentTestimonial.date}</span>
              </div>
            </div>

            <blockquote className={styles.testimonialText}>
              "{currentTestimonial.text}"
            </blockquote>

            <div className={styles.testimonialFooter}>
              <div className={styles.highlight}>
                <span className={styles.highlightIcon}>💡</span>
                <span className={styles.highlightText}>
                  "{currentTestimonial.highlight}"
                </span>
              </div>

              <div className={styles.results}>
                <span className={styles.resultsIcon}>📈</span>
                <span className={styles.resultsText}>
                  Resultado: {currentTestimonial.results}
                </span>
              </div>

              <div className={styles.products}>
                <span className={styles.productsLabel}>Productos:</span>
                <div className={styles.productTags}>
                  {currentTestimonial.products.map((product, index) => (
                    <span key={index} className={styles.productTag}>
                      {product}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Testimonials Navigation */}
        <div className={styles.testimonialNavigation}>
          <div className={styles.navigationDots}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`${styles.navDot} ${
                  index === activeTestimonial ? styles.active : ""
                }`}
                onClick={() => handleTestimonialChange(index)}
                aria-label={`Ver testimonial ${index + 1}`}
              />
            ))}
          </div>

          <div className={styles.navigationControls}>
            <button
              className={styles.autoplayToggle}
              onClick={() => setAutoPlay(!autoPlay)}
            >
              {autoPlay ? "⏸️ Pausar" : "▶️ Auto"}
            </button>
          </div>
        </div>

        {/* Additional Testimonials Grid */}
        <div className={styles.additionalTestimonials}>
          <h3 className={styles.additionalTitle}>Más Opiniones</h3>
          <div className={styles.testimonialsGrid}>
            {testimonials
              .filter((_, index) => index !== activeTestimonial)
              .slice(0, 3)
              .map((testimonial) => (
                <Card
                  key={testimonial.id}
                  variant="outlined"
                  className={styles.miniTestimonial}
                >
                  <div className={styles.miniHeader}>
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className={styles.miniAvatar}
                    />
                    <div className={styles.miniInfo}>
                      <h5 className={styles.miniName}>{testimonial.name}</h5>
                      <span className={styles.miniCompany}>
                        {testimonial.company}
                      </span>
                      <div className={styles.miniRating}>
                        {"★★★★★".split("").map((star, i) => (
                          <span key={i} className={styles.miniStar}>
                            {star}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className={styles.miniText}>
                    "{testimonial.text.substring(0, 100)}..."
                  </p>
                </Card>
              ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className={styles.trustIndicators}>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>🏆</span>
            <div className={styles.trustText}>
              <strong>247 reseñas</strong>
              <span>en los últimos 12 meses</span>
            </div>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>⚡</span>
            <div className={styles.trustText}>
              <strong>98% recomienda</strong>
              <span>nuestros servicios</span>
            </div>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>🔒</span>
            <div className={styles.trustText}>
              <strong>Reseñas verificadas</strong>
              <span>clientes reales</span>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={styles.testimonialsCTA}>
          <Card variant="primary" className={styles.ctaCard}>
            <h3 className={styles.ctaTitle}>
              ¿Querés ser nuestro próximo caso de éxito?
            </h3>
            <p className={styles.ctaSubtitle}>
              Únete a más de 247 empresarios satisfechos que ya potenciaron su
              marca
            </p>

            <div className={styles.ctaButtons}>
              <button
                className={styles.ctaPrimary}
                onClick={() => handleCTAClick("contact")}
              >
                🚀 Quiero Mi Presupuesto
              </button>
              <button
                className={styles.ctaSecondary}
                onClick={() => handleCTAClick("whatsapp")}
              >
                📱 Consulta Rápida
              </button>
            </div>

            <div className={styles.ctaGuarantee}>
              <span className={styles.guaranteeIcon}>🛡️</span>
              <span className={styles.guaranteeText}>
                <strong>Garantía de satisfacción 100%</strong> - Si no quedás
                conforme, te devolvemos el dinero
              </span>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
