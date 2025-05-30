import { Link, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Mapa from './components/Mapa'
import Direcciones from './components/Direcciones'  // Importación añadida
import MapWithClustering from './components/MapWithClustering';
import DrawingToolsMap from './components/DrawingToolsMap';
import RoutesMap from './components/RoutesMap';

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
        <Link to="/drawingToolsMap" style={{ marginRight: '10px' }}>DrawingToolsMap</Link>
        <Link to="/routesMap" style={{ marginRight: '10px' }}>RoutesMap</Link>

      </nav>

      {/* Rutas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/direcciones" element={<Direcciones />} />
        <Route path="/mapClustering" element={<MapWithClustering />} />
        <Route path="/drawingToolsMap" element={<DrawingToolsMap />} />
        <Route path="/routesMap" element={<RoutesMap />} />
      </Routes>
    </div>
  )
}

export default App