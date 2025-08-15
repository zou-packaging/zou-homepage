import './App.css'
import Nav from './sections/nav/nav'
import Home from './sections/home/home'
import About from './sections/about/about'
import Partners from './sections/partners/partners'
import Form from './sections/form/form'
import Footer from './sections/footer/footer'
import Chatbot from './components/chatbot/chatbot'
import WhatsApp from './components/whatsapp/whatsapp'
// Importar solo para desarrollo
import ContactTest from './components/testing/ContactTest'

function App() {
  // Solo mostrar el test en desarrollo
  const isDevelopment = import.meta.env.DEV;

  return (
    <div className="App">
      <Nav />
      <Home />
      <Form />
      {/* Componente de testing solo en desarrollo */}
      {isDevelopment && <ContactTest />}
      <About />
      <Partners />
      <Footer />
      <Chatbot />
      <WhatsApp />
    </div>
  )
}

export default App
