import React, { useCallback, useRef, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { MarkerClusterer } from '@googlemaps/markerclusterer';

const MapWithClustering = () => {
  // Configuración del mapa
  const containerStyle = {
    width: '100%',
    height: '100vh'
  };

  const center = {
    lat: 19.4326,  // Ciudad de México
    lng: -99.1332
  };

  // Estado para los marcadores
  const [markers, setMarkers] = useState([]);

  // Referencias
  const mapRef = useRef(null);
  const clustererRef = useRef(null);

  // Cargar la API de Google Maps
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['visualization']
  });

  // Generar marcadores aleatorios
  const generateRandomMarkers = (center, count = 50) => {
    const newMarkers = [];
    for (let i = 0; i < count; i++) {
      newMarkers.push({
        id: i,
        lat: center.lat + (Math.random() - 0.5) * 2,
        lng: center.lng + (Math.random() - 0.5) * 2,
        title: `Marcador ${i + 1}`
      });
    }
    return newMarkers;
  };

  // Cuando el mapa carga
  const onLoad = useCallback((map) => {
    mapRef.current = map;
    
    // Generar marcadores aleatorios
    const randomMarkers = generateRandomMarkers(center, 100);
    setMarkers(randomMarkers);
    
    // Inicializar el clusterer
    if (window.google) {
      clustererRef.current = new MarkerClusterer({
        map,
        markers: [],
        renderer: {
          render: ({ count, position }) => {
            // Personalizar el cluster
            const svg = `
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="14" fill="#4285F4"/>
                <text x="18" y="18" text-anchor="middle" dominant-baseline="middle" fill="white" font-size="12">${count}</text>
              </svg>
            `;
            return new window.google.maps.Marker({
              position,
              icon: {
                url: `data:image/svg+xml;base64,${btoa(svg)}`,
                scaledSize: new window.google.maps.Size(36, 36)
              },
              label: {
                text: String(count),
                color: "white",
                fontSize: "12px"
              }
            });
          }
        }
      });
    }
  }, []);

  // Cuando el mapa se desmonta
  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Renderizar marcadores */}
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            title={marker.title}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default MapWithClustering;