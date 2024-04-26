import React, { useState, useEffect } from 'react';
import Pagination from '../patient/Pagination';
import { Link } from 'react-router-dom';
import { obtenerCitasPorMedico } from '../../services/citasMedService';

function DocCitasPend() {
  const doctorData = JSON.parse(localStorage.getItem('medicoData'));
  const [citasPendientes, setCitasPendientes] = useState([]);
  const elementosPorPagina = 3;
  const [paginaPendientes, setPaginaPendientes] = useState(0);

  const paginarCitasPendientes = (data) => {
    const indiceInicio = paginaPendientes * elementosPorPagina;
    return data.slice(indiceInicio, indiceInicio + elementosPorPagina);
  };

  const cambiarPaginaPendientes = (data) => {
    setPaginaPendientes(data.selected);
  };

  const userData = doctorData ? doctorData.userData[0][0] : null;

  useEffect(() => {
    obtenerCitasPorMedico(userData.cedula)
      .then((citasAjustadas) => {
        setCitasPendientes(citasAjustadas);
      })
      .catch((error) => {
        console.error('Error al obtener citas:', error);
      });
  }, []);

  return (
    <div className="bg-blue-100 p-4 rounded-lg shadow-md mb-4 overflow-x-auto">
      <h2 className="text-lg font-semibold mb-2 text-center">Citas Pendientes por atender</h2>
      <ul className="flex justify-center">
        {citasPendientes.length === 0 ? (
          <li>
            <p>No hay citas pendientes por atender.</p>
          </li>
        ) : (
          paginarCitasPendientes(citasPendientes).map((cita) => (
            <li key={cita.id} className="mr-4">
              <div className="bg-white p-4 rounded shadow">
                <strong>ID: {cita.id}</strong>
                <br />
                <span className="block">Fecha de Creación: {cita.fechaCreacion}</span>
                <span className="block">Fecha de Cita: {cita.fechaCita}</span>
                <span className="block">Cliente: {cita.cedulaPaciente}</span>
                <span className="block">Estado: {cita.estado}</span>
                <span className="block">Motivo: {cita.motivo}</span>
                <Link to={`/atenderCita/${cita.id}/${cita.cedulaPaciente}`}>
                  <button className="bg-blue-500 hover.bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2">
                    Atender Cita
                  </button>
                </Link>
              </div>
            </li>
          ))
        )}
      </ul>
      {citasPendientes.length > 0 && (
        <Pagination
          pageCount={Math.ceil(citasPendientes.length / elementosPorPagina)}
          onPageChange={cambiarPaginaPendientes}
        />
      )}
    </div>
  );
}

export default DocCitasPend;
