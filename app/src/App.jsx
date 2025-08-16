import './App.css'
import Nav from './sections/nav/nav'
import Home from './sections/home/home'
import About from './sections/about/about'
import Partners from './sections/partners/partners'
import Contact from './sections/contact/contact'
import Footer from './sections/footer/footer'
import WhatsApp from './components/whatsapp/whatsapp'

function App() {
  return (
    <div className="App">
      <Nav />
      <div id="home">
        <Home />
      </div>
      <div id="nosotros">
        <About />
      </div>
      <div id="clientes">
        <Partners />
      </div>
      <Contact />
      <Footer />
      <WhatsApp />
    </div>
  )
}

export default App
