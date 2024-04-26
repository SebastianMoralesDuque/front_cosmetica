const user = JSON.parse(localStorage.getItem('userData')) || null;

const obtenerCitasProximas = async () => {
  try {
    const cedulaPaciente = user.userData[0][0].cedula;
    const response = await fetch(`http://localhost:9009/citas/gestion/citasProximas?cedula=${cedulaPaciente}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener las citas próximas');
    }

    const data = await response.json();

    // Ajustar las fechas concatenando la hora
    const citasAjustadas = data.map(cita => {
        const fechaCreacion = `${cita.fechaCreacion} ${cita.horaCreacion}`;
        const fechaCita = `${cita.fechaCita} ${cita.horaCita}`;
        
        // Crear una copia del objeto cita sin las propiedades horaCreacion y horaCita
        const { horaCreacion, horaCita, ...citaSinHoras } = cita;
      
        return {
          ...citaSinHoras,
          fechaCreacion,
          fechaCita,
        };
      });
      
      

    return citasAjustadas;
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return [];
  }
  console.log(data)
};

const obtenerCitasAnteriores = async () => {
    try {
      const cedulaPaciente = user.userData[0][0].cedula;
      const response = await fetch(`http://localhost:9009/citas/gestion/citasAnteriores?cedula=${cedulaPaciente}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Error al obtener las citas anteriores');
      }
  
      const data = await response.json();
  
      // Ajustar las fechas concatenando la hora
      const citasAjustadas = data.map(cita => {
        const fechaCreacion = `${cita.fechaCreacion} ${cita.horaCreacion}`;
        const fechaCita = `${cita.fechaCita} ${cita.horaCita}`;
        
        // Crear una copia del objeto cita sin las propiedades horaCreacion y horaCita
        const { horaCreacion, horaCita, ...citaSinHoras } = cita;
  
        return {
          ...citaSinHoras,
          fechaCreacion,
          fechaCita,
        };
      });
  
      return citasAjustadas;
    } catch (error) {
      console.error('Error en la solicitud:', error);
      return [];
    }
  };

export { obtenerCitasProximas, obtenerCitasAnteriores };
