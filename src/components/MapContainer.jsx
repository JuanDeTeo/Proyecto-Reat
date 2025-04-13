import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 23.23149,  // Latitud de la Ciudad de México
  lng: -106.42658  // Longitud de la Ciudad de México
};

const MapContainer = () => {

  const apiKey = "AIzaSyAXJkCBcZJ1pEBsmT_-d8evJPGUe4Tb_KM";

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {/* Marcador en la ubicación central */}
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}

export default MapContainer;
