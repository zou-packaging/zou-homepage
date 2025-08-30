import './App.css'
import Navigation from './sections/navigation/Navigation'
import Hero from './sections/hero/Hero'
import ProductGrid from './sections/productGrid/ProductGrid'
import Categories from './sections/categories/Categories'
import ValueProposition from './sections/valueProposition/ValueProposition'
import { Calculator, SocialProof, UrgencySection, FAQ } from './components/PlaceholderSections'
import About from './sections/about/about'
import Footer from './sections/footer/footer'
import WhatsAppWidget from './components/whatsappWidget/WhatsAppWidget'
import ExitIntentPopup from './components/exitIntent/ExitIntentPopup'

function App() {
  return (
    <div className="App">
      {/* Navegación sticky optimizada */}
      <Navigation />
      
      {/* Hero section con CTA principal */}
      <section id="inicio">
        <Hero />
      </section>
      
      {/* Productos destacados - 6 productos max */}
      <section id="productos">
        <ProductGrid />
      </section>
      
      {/* Categorías principales */}
      <section id="categorias">
        <Categories />
      </section>
      
      {/* Propuesta de valor única */}
      <section id="valor">
        <ValueProposition />
      </section>
      
      {/* Calculadora express */}
      <section id="calculadora">
        <Calculator />
      </section>
      
      {/* Prueba social */}
      <section id="testimonios">
        <SocialProof />
      </section>
      
      {/* Urgencia genuina */}
      <section id="oferta">
        <UrgencySection />
      </section>
      
      {/* Sobre nosotros optimizado */}
      <section id="nosotros">
        <About />
      </section>
      
      {/* FAQ inteligente */}
      <section id="faq">
        <FAQ />
      </section>
      
      {/* Footer con acción */}
      <Footer />
      
      {/* Widgets flotantes */}
      <WhatsAppWidget />
      <ExitIntentPopup />
    </div>
  )
}

export default App