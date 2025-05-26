import React, { useState, useCallback } from 'react';
import { GoogleMap, DrawingManager, useJsApiLoader } from '@react-google-maps/api';

const DrawingToolsMap = () => {
  // Configuración del mapa
  const containerStyle = {
    width: '100%',
    height: '100vh'
  };

  const center = {
    lat: 19.4326, // Ciudad de México
    lng: -99.1332
  };

  // Estados
  const [map, setMap] = useState(null);
  const [shapes, setShapes] = useState([]);
  const [activeTool, setActiveTool] = useState(null);

  // Cargar la API de Google Maps
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // Reemplaza con tu API key
    libraries: ['drawing']
  });

  // Evento cuando el mapa carga
  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  // Evento cuando el mapa se desmonta
  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Evento cuando el DrawingManager carga
  const onLoadDrawingManager = useCallback((drawingManager) => {
    // Listener para cuando se completa un dibujo
    window.google.maps.event.addListener(drawingManager, 'overlaycomplete', (event) => {
      // Agregar la nueva forma al estado
      const newShape = event.overlay;
      setShapes((prev) => [...prev, newShape]);
      
      // Permitir edición después de crear
      if (event.type !== 'marker') {
        newShape.setEditable(true);
      }
      
      // Cambiar el modo de dibujo a null para desactivar la herramienta actual
      drawingManager.setDrawingMode(null);
      setActiveTool(null);
    });
  }, []);

  // Limpiar todos los dibujos
  const clearShapes = useCallback(() => {
    shapes.forEach(shape => {
      if (shape.setMap) shape.setMap(null);
    });
    setShapes([]);
  }, [shapes]);

  // Activar una herramienta específica
  const activateTool = (tool) => {
    setActiveTool(tool === activeTool ? null : tool);
  };

  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <DrawingManager
          onLoad={onLoadDrawingManager}
          options={{
            drawingMode: activeTool ? 
              window.google.maps.drawing.OverlayType[activeTool.toUpperCase()] : null,
            drawingControl: false, // Desactivamos el control por defecto para crear nuestro propio UI
            drawingControlOptions: {
              position: window.google.maps.ControlPosition.TOP_CENTER,
              drawingModes: [
                window.google.maps.drawing.OverlayType.MARKER,
                window.google.maps.drawing.OverlayType.CIRCLE,
                window.google.maps.drawing.OverlayType.POLYGON,
                window.google.maps.drawing.OverlayType.POLYLINE,
                window.google.maps.drawing.OverlayType.RECTANGLE,
              ],
            },
            markerOptions: {
              draggable: true,
              icon: "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
            },
            circleOptions: {
              fillColor: '#FF0000',
              fillOpacity: 0.2,
              strokeWeight: 2,
              strokeColor: '#FF0000',
              clickable: true,
              editable: true,
              zIndex: 1
            },
            polygonOptions: {
              fillColor: '#00FF00',
              fillOpacity: 0.3,
              strokeWeight: 2,
              strokeColor: '#00FF00',
              clickable: true,
              editable: true,
              zIndex: 1
            },
            polylineOptions: {
              strokeColor: '#0000FF',
              strokeOpacity: 1.0,
              strokeWeight: 4,
              clickable: true,
              editable: true,
              zIndex: 1
            },
            rectangleOptions: {
              fillColor: '#FFFF00',
              fillOpacity: 0.3,
              strokeWeight: 2,
              strokeColor: '#FFFF00',
              clickable: true,
              editable: true,
              zIndex: 1
            }
          }}
          drawingMode={activeTool ? 
            window.google.maps.drawing.OverlayType[activeTool.toUpperCase()] : null}
        />
      </GoogleMap>

      {/* Controles personalizados */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        zIndex: '1',
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <h3 style={{margin: '0 0 10px 0'}}>Herramientas</h3>
        
        <button 
          onClick={() => activateTool('marker')}
          style={{
            padding: '8px 12px',
            margin: '5px 0',
            cursor: 'pointer',
            backgroundColor: activeTool === 'marker' ? '#4CAF50' : '#f1f1f1',
            color: activeTool === 'marker' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Marcador
        </button>
        
        <button 
          onClick={() => activateTool('polyline')}
          style={{
            padding: '8px 12px',
            margin: '5px 0',
            cursor: 'pointer',
            backgroundColor: activeTool === 'polyline' ? '#4CAF50' : '#f1f1f1',
            color: activeTool === 'polyline' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Línea
        </button>
        
        <button 
          onClick={() => activateTool('polygon')}
          style={{
            padding: '8px 12px',
            margin: '5px 0',
            cursor: 'pointer',
            backgroundColor: activeTool === 'polygon' ? '#4CAF50' : '#f1f1f1',
            color: activeTool === 'polygon' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Polígono
        </button>
        
        <button 
          onClick={() => activateTool('rectangle')}
          style={{
            padding: '8px 12px',
            margin: '5px 0',
            cursor: 'pointer',
            backgroundColor: activeTool === 'rectangle' ? '#4CAF50' : '#f1f1f1',
            color: activeTool === 'rectangle' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Rectángulo
        </button>
        
        <button 
          onClick={() => activateTool('circle')}
          style={{
            padding: '8px 12px',
            margin: '5px 0',
            cursor: 'pointer',
            backgroundColor: activeTool === 'circle' ? '#4CAF50' : '#f1f1f1',
            color: activeTool === 'circle' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Círculo
        </button>
        
        <button 
          onClick={clearShapes}
          style={{
            padding: '8px 12px',
            margin: '5px 0 0 0',
            cursor: 'pointer',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Limpiar Todo
        </button>
      </div>
    </div>
  );
};

export default DrawingToolsMap;