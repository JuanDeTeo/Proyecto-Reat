import React, { useState, useRef, useCallback } from 'react';
import { GoogleMap, DirectionsRenderer, Autocomplete, useLoadScript } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '500px'
};
const center = {
  lat: 19.4326,
  lng: -99.1332
};

function Direcciones() {
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const originRef = useRef();
  const destinationRef = useRef();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // Reemplaza con tu API key
    libraries
  });

  const calculateRoute = useCallback(async () => {
    if (!originRef.current.value || !destinationRef.current.value) {
      alert('Por favor ingresa origen y destino');
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: window.google.maps.TravelMode.DRIVING
    });

    setDirections(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }, []);

  const clearRoute = () => {
    setDirections(null);
    setDistance('');
    setDuration('');
    originRef.current.value = '';
    destinationRef.current.value = '';
  };

  if (loadError) return <div>Error al cargar el mapa</div>;
  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Calculadora de Rutas</h1>
      <div style={{ margin: '20px 0' }}>
        <Autocomplete>
          <input
            type="text"
            placeholder="Origen"
            ref={originRef}
            style={{ width: '300px', padding: '10px' }}
          />
        </Autocomplete>
        <Autocomplete>
          <input
            type="text"
            placeholder="Destino"
            ref={destinationRef}
            style={{ width: '300px', padding: '10px', marginLeft: '10px' }}
          />
        </Autocomplete>
      </div>
      <div>
        <button 
          onClick={calculateRoute} 
          style={{ 
            padding: '10px 20px', 
            marginRight: '10px',
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
            padding: '10px 20px',
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
      {distance && duration && (
        <div style={{ 
          margin: '20px 0', 
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px',
          borderLeft: '4px solid #4CAF50'
        }}>
          <p><strong>Distancia:</strong> {distance}</p>
          <p><strong>Duración estimada:</strong> {duration}</p>
        </div>
      )}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </div>
  );
}

export default Direcciones;