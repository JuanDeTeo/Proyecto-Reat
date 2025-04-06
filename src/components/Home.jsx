import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div>
      <h1>Bienvenido a mi sitio</h1>
      <p>Este es el inicio de mi aplicación con React Router.</p>
      <button onClick={() => navigate('/about')}>Ir a Acerca de</button>
    </div>
  )
}

export default Home