import React from 'react';
//import './App.css';
import MapContainer from './MapContainer';

function Mapa() {
  return (
    <div className="Mapa">
      <h1>Google Maps en React</h1>
      <div style={{ margin: '20px' }}>
        <MapContainer />
      </div>
    </div>
  );
}

export default Mapa;