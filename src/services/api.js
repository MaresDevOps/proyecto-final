// Archivo para configurar la comunicación con el Backend (API)
// Utilizaremos la API pública de SpaceX como nuestro backend para consultar misiones espaciales.

const API_BASE_URL = 'https://api.spacexdata.com/v4';

/**
 * Obtiene la próxima misión espacial de SpaceX
 * @returns {Promise<Object>} Datos de la misión
 */
export const fetchNextMission = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/launches/next`);
    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener la siguiente misión:', error);
    throw error;
  }
};
