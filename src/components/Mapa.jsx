import React from 'react';
import MapContainer from './MapContainer';

function Mapa() {
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px'
    },
    title: {
      color: '#333',
      textAlign: 'center',
      marginBottom: '30px',
      fontSize: '2rem'
    },
    mapWrapper: {
      margin: '20px 0',
      padding: '15px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    infoText: {
      textAlign: 'center',
      color: '#666',
      marginTop: '10px',
      fontSize: '0.9rem'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Google Maps en React</h1>
      <div style={styles.mapWrapper}>
        <MapContainer />
      </div>
      <p style={styles.infoText}>
        Mapa mostrando la ubicación central de Mazatlán, Sinaloa.
      </p>
    </div>
  );
}

export default Mapa;