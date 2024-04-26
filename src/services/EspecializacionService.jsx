const EspecializacionService = {
    getEspecialidades: async () => {
      try {
        const especialidadesResponse = await fetch('http://localhost:9009/medicos/especialidades');
        const especialidadesData = await especialidadesResponse.json();
        return especialidadesData;
      } catch (error) {
        console.error('Error al obtener especialidades:', error);
        throw error; 
      }
    },
  };
  
  export default EspecializacionService;
  