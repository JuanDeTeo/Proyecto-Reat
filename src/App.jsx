import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function App() {
  const [count, setCount] = useState(0)

  useEffect(() =>{
    if(count > 10){
      
      alert("El limite es 10");
      setCount(0);
    }

  } , [count]);

  const listaUsuario =[{
    nombre: "Erick",
    apellido: "Sanchez",
    edad: 35,
  },
  {
    nombre: "Luis",
    apellido: "Perez",
    edad: 23,
  },
  {
    nombre: "Pancho",
    apellido: "Panteras",
    edad: 44,
  },
  {
    nombre: "Megumin",
    apellido: "Cramesi",
    edad: 14,
  },
  {
    nombre: "Kasuma",
    apellido: "Basuma",
    edad: 17,
  }
];

return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">nombre</TableCell>
            <TableCell align="right">apellido</TableCell>
            <TableCell align="right">edad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listaUsuario.map((usuario) => (
            <TableRow
              key={usuario.nombre}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{usuario.nombre}</TableCell>
              <TableCell align="right">{usuario.apellido}</TableCell>
              <TableCell align="right">{usuario.edad}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
