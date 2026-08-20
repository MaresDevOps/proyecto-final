import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const ControlCenter = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header" style={{ borderColor: '#ff7b72' }}>
        <h1 style={{ color: '#ff7b72' }}>⚠️ Centro de Control (Secreto)</h1>
        <p>Información clasificada para administradores de misiones.</p>
        
        <div style={{ marginTop: '1rem', gap: '1rem', display: 'flex' }}>
          <button onClick={handleLogout} className="btn-primary" style={{ backgroundColor: '#da3633', cursor: 'pointer', border: 'none' }}>
            Cerrar Sesión
          </button>
          <Link to="/" className="btn-primary" style={{ backgroundColor: '#30363d' }}>
            Volver al inicio
          </Link>
        </div>
      </header>
      
      <main className="dashboard-content">
        <section className="mission-panel">
          <h2>Datos Sensibles de la Misión</h2>
          <div className="mission-card">
            <h3>Nivel de Combustible</h3>
            <p>Estado Crítico: 85% de capacidad requerida alcanzada.</p>
          </div>
          <div className="mission-card">
            <h3>Comunicaciones Encriptadas</h3>
            <p>Señal recibida: "El satélite está en órbita estable."</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ControlCenter;
