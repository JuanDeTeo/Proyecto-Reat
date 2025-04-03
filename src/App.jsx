import React, { useState, useEffect } from 'react';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Función para obtener los datos de la API
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // El array vacío [] significa que se ejecuta solo al montar el componente

  if (loading) {
    return <div>Cargando usuarios...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Lista de Usuarios</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Nombre</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Username</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} style={{ border: '1px solid #ddd' }}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.name}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.username}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;