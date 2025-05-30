import React, { useState, useCallback, useRef, useMemo } from 'react'; // Agregamos useMemo
import { GoogleMap, DirectionsRenderer, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100vh'
};

const center = {
  lat: 19.4326, // Ciudad de México
  lng: -99.1332
};

// Define las librerías fuera del componente para que no se creen en cada renderizado
const libraries = ['places', 'directions'];

const RoutesMap = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [waypoints, setWaypoints] = useState([]);
  const [directions, setDirections] = useState(null);
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef(null);

  const apiKey = import.meta.env.VITE_Maps_API_KEY; 

  // Pasa el array de libraries definido estáticamente
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
    libraries: libraries // Aquí usamos la variable definida fuera
  });

  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  const calculateRoute = useCallback(() => {
    if (!origin || !destination) return;

    // Asegúrate de que window.google esté disponible
    if (!window.google || !window.google.maps || !window.google.maps.DirectionsService) {
      console.error("Google Maps API no cargada completamente.");
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();

    const waypointsFormatted = waypoints
      .filter(wp => wp.trim() !== '')
      .map(wp => ({
        location: wp,
        stopover: true
      }));

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        waypoints: waypointsFormatted,
        travelMode: window.google.maps.TravelMode.DRIVING,
        optimizeWaypoints: true
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
          
          const routeMarkers = [];
          result.routes[0].legs.forEach(leg => {
            routeMarkers.push({
              position: leg.start_location,
              label: 'A',
              title: `Origen: ${leg.start_address}`
            });
            
            // Si hay puntos intermedios, agrega marcadores para ellos
            leg.via_waypoints.forEach((waypoint, index) => {
                routeMarkers.push({
                    position: waypoint,
                    label: String.fromCharCode(66 + index), // B, C, D, etc.
                    title: `Punto intermedio: ${waypoint.toString()}`
                });
            });

            routeMarkers.push({
              position: leg.end_location,
              label: 'Z', // Puedes ajustar la etiqueta para el destino final
              title: `Destino: ${leg.end_address}`
            });
          });
          setMarkers(routeMarkers);
        } else {
          console.error(`Error al calcular la ruta: ${status}`);
          alert(`No se pudo calcular la ruta. Error: ${status}`); // Mensaje más amigable
        }
      }
    );
  }, [origin, destination, waypoints]);

  const addWaypoint = () => {
    setWaypoints([...waypoints, '']);
  };

  const removeWaypoint = (index) => {
    const newWaypoints = [...waypoints];
    newWaypoints.splice(index, 1);
    setWaypoints(newWaypoints);
  };

  const updateWaypoint = (index, value) => {
    const newWaypoints = [...waypoints];
    newWaypoints[index] = value;
    setWaypoints(newWaypoints);
  };

  const clearRoute = () => {
    setDirections(null);
    setMarkers([]);
    setOrigin('');
    setDestination('');
    setWaypoints([]);
  };

  if (!isLoaded) return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontSize: '1.2em',
      color: '#333'
    }}>
      Cargando mapa... Si tarda mucho, revisa tu API Key de Google Maps y la conexión a internet.
    </div>
  );

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {directions && <DirectionsRenderer directions={directions} />}
        
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            label={marker.label}
            title={marker.title}
          />
        ))}
      </GoogleMap>

      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        zIndex: '1',
        backgroundColor: 'white',
        padding: '15px',
        borderRadius: '5px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
        width: '300px',
        maxHeight: 'calc(100% - 20px)', // Para que no se desborde en pantallas pequeñas
        overflowY: 'auto' // Permite scroll si el contenido es mucho
      }}>
        <h3 style={{ marginTop: 0 }}>Calculadora de Rutas</h3>
        
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="origin-input">Origen:</label>
          <input
            id="origin-input"
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            placeholder="Ingresa origen"
          />
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="destination-input">Destino:</label>
          <input
            id="destination-input"
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            placeholder="Ingresa destino"
          />
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <label>Puntos intermedios:</label>
          {waypoints.map((waypoint, index) => (
            <div key={index} style={{ display: 'flex', marginBottom: '5px' }}>
              <input
                type="text"
                value={waypoint}
                onChange={(e) => updateWaypoint(index, e.target.value)}
                style={{ flex: 1, padding: '8px' }}
                placeholder={`Punto ${index + 1}`}
              />
              <button 
                onClick={() => removeWaypoint(index)}
                style={{
                  padding: '8px',
                  marginLeft: '5px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                ×
              </button>
            </div>
          ))}
          <button 
            onClick={addWaypoint}
            style={{
              padding: '8px',
              width: '100%',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginBottom: '10px'
            }}
          >
            Agregar punto intermedio
          </button>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button 
            onClick={calculateRoute}
            style={{
              padding: '10px 15px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Calcular Ruta
          </button>
          
          <button 
            onClick={clearRoute}
            style={{
              padding: '10px 15px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Limpiar
          </button>
        </div>
        
        {directions && (
          <div style={{ marginTop: '15px' }}>
            <h4>Información de la ruta:</h4>
            <p><strong>Distancia:</strong> {directions.routes[0].legs[0].distance.text}</p>
            <p><strong>Duración:</strong> {directions.routes[0].legs[0].duration.text}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoutesMap;