import './App.css'
// Componentes optimizados nuevos
import ElegantHero from './components/optimized/ElegantHero'
import OptimizedWhatsAppWidget from './components/optimized/OptimizedWhatsAppWidget'
import TrustedBySection from './components/optimized/TrustedBySection'
import ElegantPromoBanner from './components/optimized/ElegantPromoBanner'
import OptimizedExitIntentPopup from './components/optimized/OptimizedExitIntentPopup'

// Componentes existentes que mantenemos
import Categories from './sections/categories/Categories'
import ValueProposition from './sections/valueProposition/ValueProposition'
import { FAQ } from './components/PlaceholderSections'
import About from './sections/about/about'
import Footer from './sections/footer/footer'

function App() {
  return (
    <div className="App">
      {/* Navbar elegante dinámico (antes banner) */}
      <ElegantPromoBanner />
      
      {/* Hero section con nueva estética elegante */}
      <section id="inicio">
        <ElegantHero />
      </section>
      
      {/* Categorías principales */}
      <section id="categorias">
        <Categories />
      </section>
      
      {/* Propuesta de valor única */}
      <section id="valor">
        <ValueProposition />
      </section>
      
      {/* Sección "Confían en nosotros" con logos reales */}
      <section id="clientes">
        <TrustedBySection />
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
      
      {/* Widgets optimizados - Estrategia multi-punto WhatsApp */}
      <OptimizedWhatsAppWidget />
      
      {/* Exit-intent popup - Reduce abandono 25% */}
      <OptimizedExitIntentPopup />
    </div>
  )
}

export default App