// estadoService.js
const obtenerEstados = async (token) => {
    try {
      const response = await fetch("https://www.universal-tutorial.com/api/states/colombia", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener datos de departamentos:", error);
      throw error;
    }
  };
  
  export default obtenerEstados;
  