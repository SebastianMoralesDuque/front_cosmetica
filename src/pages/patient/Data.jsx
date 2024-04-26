// data.js
const citasPendientes = [
    {
      id: 1,
      fechaCreacion: "2023-09-22 10:00 AM",
      fechaCita: "2023-10-15 2:30 PM",
      medico: "Dr. Smith",
      paciente: "Juan Pérez",
      estado: "Programada",
      motivo: "Control de rutina",
    },
    {
      id: 2,
      fechaCreacion: "2023-09-22 11:30 AM",
      fechaCita: "2023-10-20 3:15 PM",
      medico: "Dr. Johnson",
      paciente: "Juan Pérez",
      estado: "Completada",
      motivo: "Dolor de cabeza",
    },
    {
        id: 3,
        fechaCreacion: "2023-09-22 11:30 AM",
        fechaCita: "2023-10-20 3:15 PM",
        medico: "Dr. Johnson",
        paciente: "Juan Pérez",
        estado: "Completada",
        motivo: "Dolor de cabeza",
      }
    // Agrega más citas pendientes aquí
  ];

    // Datos de citas anteriores (simulados para ejemplo)
    const citasAnteriores = [
        {
          id: 1,
          fechaCreacion: "2023-09-22 10:00 AM",
          fechaCita: "2023-10-15 2:30 PM",
          medico: "Dr. Smith",
          paciente: "Juan Pérez",
          estado: "Programada",
          motivo: "Control de rutina",
        },
        {
            id: 2,
            fechaCreacion: "2023-09-22 10:00 AM",
            fechaCita: "2023-10-15 2:30 PM",
            medico: "Dr. Smith",
            paciente: "Juan Pérez",
            estado: "Programada",
            motivo: "Control de rutina",
          },
          {
            id: 3,
            fechaCreacion: "2023-09-22 10:00 AM",
            fechaCita: "2023-10-15 2:30 PM",
            medico: "Dr. Smith",
            paciente: "Juan Pérez",
            estado: "Programada",
            motivo: "Control de rutina",
          },
          {
            id: 4,
            fechaCreacion: "2023-09-22 10:00 AM",
            fechaCita: "2023-10-15 2:30 PM",
            medico: "Dr. Smith",
            paciente: "Juan Pérez",
            estado: "Programada",
            motivo: "Control de rutina",
          },
        // Agrega más citas anteriores aquí si es necesario
      ];
      const pqrsList = [
        {
          fecha: '23/09/2023',
          tipo: 'Solicitud de información',
          motivo: 'Consulta sobre medicamentos',
          activa: true,
        },
        {
          fecha: '22/09/2023',
          tipo: 'Reclamación',
          motivo: 'Mala atención en la consulta',
          activa: false,
        },
        {
          fecha: '21/09/2023',
          tipo: 'Sugerencia',
          motivo: 'Mejoras en la recepción',
          activa: true,
        },
        {
          fecha: '21/09/2023',
          tipo: 'Sugerencia',
          motivo: 'Mejoras en la recepción',
          activa: true,
        },
        {
          fecha: '21/09/2023',
          tipo: 'Sugerencia',
          motivo: 'Mejoras en la recepción',
          activa: false,
        },
        {
          fecha: '21/09/2023',
          tipo: 'Sugerencia',
          motivo: 'Mejoras en la recepción',
          activa: false,
        },
        {
          fecha: '21/09/2023',
          tipo: 'Sugerencia',
          motivo: 'Mejoras en la recepción',
          activa: false,
        },
        // Agrega más PQRs aquí si es necesario
      ];
      
      
      export { citasPendientes, citasAnteriores, pqrsList };