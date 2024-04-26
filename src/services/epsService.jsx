// services/epsService.js

const obtenerEps = async () => {
    try {
      const response = await fetch('http://localhost:9009/usuarios/gestion/eps', {
        method: 'GET',
        headers: {
          'Origin': 'http://localhost:5173', // Esta es la URL de tu aplicación React
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('No se pudo obtener la lista de EPS.');
      }
  
      const epsData = await response.json();
      return epsData;
  
    } catch (error) {
      console.error('Error al obtener datos de EPS:', error);
      throw error; // Re-lanza el error para que pueda ser manejado en el componente que lo llama.
    }
  };
  
  export default obtenerEps;
  