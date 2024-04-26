const obtenerAtencionesPorPaciente = async (cedulaPaciente) => {
    try {
        const response = await fetch(`http://localhost:9009/atenciones/gestion/atencionesPorPaciente?cedula_paciente=${cedulaPaciente}`);
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return [];
    }
};

  
  export { obtenerAtencionesPorPaciente };
  