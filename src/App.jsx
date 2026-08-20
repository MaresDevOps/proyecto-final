import { useState, useEffect } from 'react';
import { fetchNextMission } from './services/api';
import './App.css';

function App() {
  const [mission, setMission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Solicitud de muestra para validar comunicación Frontend-Backend
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

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>🛰️ Dashboard de Misiones Espaciales</h1>
        <p>Monitoreo y control de misiones en curso</p>
      </header>
      
      <main className="dashboard-content">
        <section className="mission-panel">
          <h2>Próxima Misión Destacada</h2>
          
          {loading && <p className="loading">Obteniendo datos desde el backend...</p>}
          
          {error && <p className="error">{error}</p>}
          
          {mission && (
            <div className="mission-card">
              <h3>{mission.name}</h3>
              <p><strong>Fecha de lanzamiento:</strong> {new Date(mission.date_utc).toLocaleDateString()}</p>
              <p><strong>Detalles:</strong> {mission.details || 'No hay detalles adicionales disponibles por el momento.'}</p>
              <a href={mission.links?.webcast} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Ver Transmisión
              </a>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
