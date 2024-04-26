const obtenerCitasPorMedico = async (cedulaMedico) => {
    try {
        const response = await fetch(`http://localhost:9009/citas/gestion/citasPorMedico?cedula=${cedulaMedico}`);
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        const data = await response.json();
        const citasAjustadas = data.map((cita) => {
            const { horaCreacion, horaCita, ...citaSinHoras } = cita; 
            return {
                ...citaSinHoras,
                fechaCreacion: `${cita.fechaCreacion} ${cita.horaCreacion}`,
                fechaCita: `${cita.fechaCita} ${cita.horaCita}`,
            };
        });
        return citasAjustadas;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return [];
    }
};

  
  export { obtenerCitasPorMedico };
  