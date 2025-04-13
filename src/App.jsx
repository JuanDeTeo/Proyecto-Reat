import { Link, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Mapa from './components/Mapa'


function App() {
  return (
    <div>
      {/* Barra de navegación */}
      <nav style={{ padding: '10px', background: '#f0f0f0' }}>
        <Link to="/" style={{ marginRight: '10px' }}>Inicio</Link>
        <Link to="/about" style={{ marginRight: '10px' }}>Acerca de</Link>
        <Link to="/contact" style={{ marginRight: '10px' }}>Contacto</Link>
        <Link to ="/mapa" style={{ marginRight: '10px' }}>Ubucacion</Link>
      </nav>

      {/* Rutas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/mapa' element={<Mapa />} />
      </Routes>
    </div>
  )
}

export default App