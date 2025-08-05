import './App.css'
import Nav from './sections/nav/nav'
import Home from './sections/home/home'
import About from './sections/about/about'
import Form from './sections/form/form'
import Footer from './sections/footer/footer'

function App() {
  return (
    <div className="App">
      <Nav />
      <Home />
      <Form />
      <About />
      <Footer />
    </div>
  )
}

export default App
