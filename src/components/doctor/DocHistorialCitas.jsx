import React, { useState, useEffect } from 'react';
import Pagination from '../patient/Pagination';

function DocHistorialCitas() {
  const elementosPorPagina = 4;
  const [paginaHistorial, setPaginaHistorial] = useState(0);
  const [historialCitas, setHistorialCitas] = useState([]);
  const doctorData = JSON.parse(localStorage.getItem('medicoData'));
  const cedulaMedico = doctorData.userData[0][0].cedula;

  const paginarHistorialCitas = (data) => {
    const indiceInicio = paginaHistorial * elementosPorPagina;
    return data.slice(indiceInicio, indiceInicio + elementosPorPagina);
  };

  const cambiarPaginaHistorial = (data) => {
    setPaginaHistorial(data.selected);
  };

  useEffect(() => {
    fetch(`http://localhost:9009/atenciones/gestion/atencionesPorMedico?cedula_medico=${cedulaMedico}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener historial de citas');
        }
        return response.json();
      })
      .then((data) => {
        // Invierte el orden de los datos
        setHistorialCitas(data.reverse());
      })
      .catch((error) => {
        console.error('Error en la solicitud:', error);
      });
  }, [cedulaMedico]);

  return (
    <div className="bg-blue-100 p-4 rounded-lg shadow-md mb-4 overflow-x-auto">
      <h2 className="text-lg font-semibold mb-2 text-center">Historial de Citas</h2>
      <ul className="flex justify-center">
        {paginarHistorialCitas(historialCitas).map((cita) => (
          <li key={cita.idAtencion} className="mr-4">
            <div className="bg-white p-4 rounded shadow">
              <strong>ID: {cita.idAtencion}</strong><br />
              <span className="block">Objetivos: {cita.sintomas}</span>
              <span className="block">Observaciones: {cita.diagnostico}</span>
              <span className="block">Notas Cosméticas: {cita.notasMedicas}</span>
              <span className="block">Tratamiento: {cita.tratamiento}</span>
            </div>
          </li>
        ))}
      </ul>
      <Pagination
        pageCount={Math.ceil(historialCitas.length / elementosPorPagina)}
        onPageChange={cambiarPaginaHistorial}
      />
    </div>
  );
}

export default DocHistorialCitas;
