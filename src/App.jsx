import { createContext, useContext, useState } from 'react';

// 1. Crear el contexto (esto es como una "caja vacía" que llenaremos después)
const AppContext = createContext();

// 2. Crear el componente proveedor (el que "rellena la caja")
function AppProvider({ children }) {
  const [count, setCount] = useState(0);

  // Función para incrementar el contador
  const increment = () => {
    setCount(count + 1);
  };

  return (
    <AppContext.Provider value={{ count, increment }}>
      {children}
    </AppContext.Provider>
  );
}

// 3. Componente que muestra el contador
function CounterDisplay() {
  const { count } = useContext(AppContext);
  
  return (
    <div style={{
      fontSize: '2rem',
      margin: '20px',
      padding: '20px',
      backgroundColor: '#f0f0f0',
      borderRadius: '10px'
    }}>
      Contador: {count}
    </div>
  );
}

// 4. Componente con el botón para incrementar
function IncrementButton() {
  const { increment } = useContext(AppContext);
  
  return (
    <button
      onClick={increment}
      style={{
        padding: '10px 20px',
        fontSize: '1.2rem',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}
    >
      Sumar +1
    </button>
  );
}

// 5. Componente principal que ENVUELVE todo
function App() {
  return (
    <AppProvider>
      <div style={{
        textAlign: 'center',
        padding: '40px',
        minHeight: '100vh',
        backgroundColor: '#f9f9f9'
      }}>
        <h1>Ejemplo de useContext</h1>
        <CounterDisplay />
        <IncrementButton />
        <p style={{ marginTop: '20px' }}>
          Haz clic en el botón para aumentar el contador
        </p>
      </div>
    </AppProvider>
  );
}

export default App;