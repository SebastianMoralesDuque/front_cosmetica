import React, { useState, useEffect } from 'react';
import { obtenerAtencionesPorPaciente } from '../../services/atencionesService';

function HistorialMedico() {
  const [atenciones, setAtenciones] = useState([]);
  const user = JSON.parse(localStorage.getItem('userData')) || null;
  const cedulaPaciente = user.userData[0][0].cedula;

  useEffect(() => {
    obtenerAtencionesPorPaciente(cedulaPaciente)
      .then((data) => {
        setAtenciones(data);
      })
      .catch((error) => {
        console.error('Error al obtener las atenciones:', error);
      });
  }, [cedulaPaciente]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Historial</h2>
      <div className="bg-blue-100 p-4 rounded-lg shadow-md">
        <table className="w-full">
          <thead>
            <tr>
              <th className="border p-2">ID Atención</th>
              <th className="border p-2">ID Cita</th>
              <th className="border p-2">Objetivos</th>
              <th className="border p-2">Observaciones</th>
              <th className="border p-2">Notas Cosméticas</th>
              <th className="border p-2">Tratamiento</th>
            </tr>
          </thead>
          <tbody>
            {atenciones.map((atencion) => (
              <tr key={atencion.idAtencion}>
                <td className="border p-2">{atencion.idAtencion}</td>
                <td className="border p-2">{atencion.idCita}</td>
                <td className="border p-2">{atencion.sintomas}</td>
                <td className="border p-2">{atencion.diagnostico}</td>
                <td className="border p-2">{atencion.notasMedicas}</td>
                <td className="border p-2">{atencion.tratamiento}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HistorialMedico;
