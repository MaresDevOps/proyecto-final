import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login(); // Simula validación exitosa en backend
    navigate('/control-center'); // Redirige a ruta protegida
  };

  return (
    <div className="dashboard-container" style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div className="mission-panel" style={{ width: '300px', textAlign: 'center' }}>
        <h2>Acceso Restringido</h2>
        <p>Identificación requerida para el Centro de Control.</p>
        <button onClick={handleLogin} className="btn-primary" style={{ width: '100%', marginTop: '1rem', cursor: 'pointer' }}>
          Simular Inicio de Sesión
        </button>
      </div>
    </div>
  );
};

export default Login;
