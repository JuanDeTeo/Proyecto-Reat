import { Link, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Mapa from './components/Mapa'
import Direcciones from './components/Direcciones'  // Importación añadida
import MapWithClustering from './components/MapWithClustering';

function App() {
  return (
    <div>
      {/* Barra de navegación */}
      <nav style={{ padding: '10px', background: '#f0f0f0' }}>
        <Link to="/" style={{ marginRight: '10px' }}>Inicio</Link>
        <Link to="/about" style={{ marginRight: '10px' }}>Acerca de</Link>
        <Link to="/contact" style={{ marginRight: '10px' }}>Contacto</Link>
        <Link to="/mapa" style={{ marginRight: '10px' }}>Ubicación</Link>
        <Link to="/direcciones" style={{ marginRight: '10px' }}>Direcciones</Link>
        <Link to="/mapClustering" style={{ marginRight: '10px' }}>MapClustering</Link>

      </nav>

      {/* Rutas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/direcciones" element={<Direcciones />} />
        <Route path="/mapClustering" element={<MapWithClustering />} />
      </Routes>
    </div>
  )
}

export default App