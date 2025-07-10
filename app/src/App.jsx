import "./styles/reset.css";
import "./styles/variables.css";
import "./styles/global.css";
import "./styles/animations.css";
import "./utils/conversionTracking"; // Auto-inicializa el tracking
import { ProductsProvider } from "./contexts/ProductsContext";
import SEO from "./components/common/SEO/SEO";
import { Header, Footer, WhatsAppButton } from "./components/layout";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Clients from "./components/sections/Clients";
import Process from "./components/sections/Process";
import Products from "./components/sections/Products";
import Testimonials from "./components/sections/Testimonials";
import FAQ from "./components/sections/FAQ";
import ContactForm from "./components/sections/ContactForm";
import { Button } from "./components/common";

// Importar imagen optimizada para el hero
const heroBackground =
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&q=80&w=2000";

function App() {
  // Datos de navegación actualizados
  const navItems = [
    { label: "Inicio", href: "#inicio" },
    { label: "Nosotros", href: "#nosotros" },
    { label: "Clientes", href: "#clientes" },
    { label: "Proceso", href: "#proceso" },
    { label: "Productos", href: "#productos" },
    { label: "Contacto", href: "#contacto" },
    { label: "FAQ", href: "#faq" },
  ];

  // Datos del footer
  const footerSections = [
    {
      title: "Productos Destacados",
      links: [
        { label: "Vasos Térmicos Personalizados", href: "#vasos" },
        { label: "Servilletas Empresariales", href: "#servilletas" },
        { label: "Bolsas Papel Kraft", href: "#bolsas" },
        { label: "Palitos Removedores", href: "#palitos" },
      ],
    },
    {
      title: "Empresa",
      links: [
        { label: "Sobre Nosotros", href: "#nosotros" },
        { label: "Nuestros Clientes", href: "#clientes" },
        { label: "Proceso de Trabajo", href: "#proceso" },
        { label: "Garantía de Calidad", href: "#calidad" },
      ],
    },
  ];

  const contactInfo = {
    phone: "+54 9 351 789-2876",
    email: "info@zou.com.ar",
    address: "Córdoba, Argentina",
    hours: "Lun a Vie 9:00 - 18:00",
  };

  const socialLinks = [
    {
      label: "Facebook",
      href: "https://facebook.com/zou",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      href: "https://instagram.com/zou",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/company/zou",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ];

  return (
    <ProductsProvider>
      <div className="app">
        {/* SEO Component optimizado para conversión */}
        <SEO
          title="Vasos Térmicos Personalizados en Córdoba | ZOU - Productos Descartables"
          description="Productos descartables personalizados para empresas en Córdoba. Vasos térmicos, servilletas, bolsas personalizadas. Diseño gratuito, entrega en 7 días. ¡Presupuesto sin compromiso!"
          keywords="vasos térmicos personalizados córdoba, productos descartables personalizados, servilletas empresariales, bolsas papel kraft personalizadas, vasos café personalizados, impresión productos descartables córdoba"
        />

        <Header
          navItems={navItems}
          ctaButton={
            <Button
              variant="primary"
              onClick={() =>
                document
                  .getElementById("contacto")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Presupuesto Gratis
            </Button>
          }
          sticky
          transparent
        />

        <main>
          <section id="inicio">
            {/* Hero optimizado para conversión */}
            <Hero
              backgroundImage={heroBackground}
              overlay
              overlayOpacity={0.6}
              height="full"
              alignment="center"
              animate
            />
          </section>

          <About />

          <Clients />

          <Process />

          <Products />

          {/* Testimonials estratégicamente posicionados para máximo impacto */}
          <Testimonials />

          {/* CTA Section estratégica antes del formulario */}
          <section
            className="pre-form-cta"
            style={{
              padding: "var(--spacing-16) 0",
              background:
                "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)",
              color: "white",
              textAlign: "center",
            }}
          >
            <div
              style={{
                maxWidth: "800px",
                margin: "0 auto",
                padding: "0 var(--spacing-4)",
              }}
            >
              <h2
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 3rem)",
                  fontWeight: "var(--font-weight-bold)",
                  marginBottom: "var(--spacing-4)",
                  lineHeight: "1.2",
                }}
              >
                ¿Listo para Ser Nuestro Próximo Caso de Éxito?
              </h2>
              <p
                style={{
                  fontSize: "var(--font-size-xl)",
                  marginBottom: "var(--spacing-8)",
                  color: "rgba(255, 255, 255, 0.9)",
                }}
              >
                Únete a más de 247 empresarios que ya transformaron su marca con
                nosotros
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "var(--spacing-4)",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <Button
                  variant="secondary"
                  size="large"
                  onClick={() =>
                    document
                      .getElementById("contacto")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  style={{
                    background: "white",
                    color: "var(--color-primary)",
                    minWidth: "200px",
                  }}
                >
                  🚀 Mi Presupuesto Ahora
                </Button>
                <Button
                  variant="ghost"
                  size="large"
                  onClick={() =>
                    window.open(
                      "https://wa.me/5493517892876?text=Hola! Vi los testimoniales y quiero información sobre productos personalizados",
                      "_blank"
                    )
                  }
                  style={{
                    color: "white",
                    borderColor: "white",
                    minWidth: "180px",
                  }}
                >
                  📱 WhatsApp Express
                </Button>
              </div>

              {/* Trust badges actualizados */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "var(--spacing-6)",
                  marginTop: "var(--spacing-8)",
                  fontSize: "var(--font-size-sm)",
                  opacity: "0.9",
                  flexWrap: "wrap",
                }}
              >
                <div>✅ 247+ empresas satisfechas</div>
                <div>✅ 4.9⭐ en Google</div>
                <div>✅ Garantía 100%</div>
              </div>
            </div>
          </section>

          {/* Formulario de contacto - Posición estratégica optimizada */}
          <ContactForm />

          {/* FAQ compacto - Después del formulario para resolver objeciones post-conversión */}
          <FAQ />
        </main>

        <Footer
          sections={footerSections}
          contactInfo={contactInfo}
          socialLinks={socialLinks}
        />

        <WhatsAppButton
          phoneNumber="5493517892876"
          message="Hola! Me gustaría recibir información sobre los productos personalizados de ZOU. Vi su página web y me interesa conocer más."
          showTooltip={true}
        />
      </div>
    </ProductsProvider>
  );
}

export default App;
