import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { fetchNextMission } from '../services/api';
import { ErrorAlert } from '../components/ErrorAlert';

const Home = () => {
  const [mission, setMission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMission = async () => {
      try {
        const data = await fetchNextMission();
        setMission(data);
      } catch (err) {
        setError('No se pudo conectar con el backend de misiones.');
      } finally {
        setLoading(false);
      }
    };
    loadMission();
  }, []);

  // Optimizamos el cálculo de la fecha con useMemo
  // Solo se volverá a ejecutar si mission.date_utc cambia
  const formattedDate = useMemo(() => {
    if (!mission?.date_utc) return 'Fecha no disponible';
    return new Date(mission.date_utc).toLocaleDateString();
  }, [mission?.date_utc]);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>🛰️ Dashboard de Misiones Espaciales</h1>
        <p>Monitoreo público de misiones en curso</p>
        <Link to="/login" className="btn-primary" style={{marginTop: '1rem', display: 'inline-block'}}>
          Acceso Personal Autorizado
        </Link>
      </header>
      
      <main className="dashboard-content">
        <section className="mission-panel">
          <h2>Próxima Misión Destacada</h2>
          {loading && <p className="loading">Obteniendo datos desde el backend...</p>}
          
          {error && <ErrorAlert message={error} />}
          
          {mission && (
            <div className="mission-card">
              <h3>{mission.name}</h3>
              <p><strong>Fecha de lanzamiento:</strong> {formattedDate}</p>
              <p><strong>Detalles:</strong> {mission.details || 'No hay detalles disponibles.'}</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;
