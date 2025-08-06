import './App.css'
import Nav from './sections/nav/nav'
import Home from './sections/home/home'
import About from './sections/about/about'
import Partners from './sections/partners/partners'
import Form from './sections/form/form'
import Footer from './sections/footer/footer'
import Chatbot from './components/chatbot/chatbot'

function App() {
  return (
    <div className="App">
      <Nav />
      <Home />
      <Form />
      <About />
      <Partners />
      <Footer />
      <Chatbot />
    </div>
  )
}

export default App
