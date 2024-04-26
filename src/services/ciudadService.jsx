// ciudadService.js
const obtenerCiudades = async (token, estado) => {
    try {
      const response = await fetch(`https://www.universal-tutorial.com/api/cities/${estado}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener datos de ciudades:", error);
      throw error;
    }
  };
  
  export default obtenerCiudades;
  