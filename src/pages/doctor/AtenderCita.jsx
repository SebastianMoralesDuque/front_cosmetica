import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { obtenerAtencionesPorPaciente } from '../../services/atencionesService';

function AtenderCita() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { citaId } = useParams();
  const { cedulaPaciente } = useParams();
  const [diagnostico, setDiagnostico] = useState('');
  const [tratamiento, setTratamiento] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [notasMedicas, setNotasMedicas] = useState('');
  const [atenciones, setAtenciones] = useState([]);

  useEffect(() => {
    obtenerAtencionesPorPaciente(cedulaPaciente)
      .then((data) => {
        setAtenciones(data);
      })
      .catch((error) => {
        console.error('Error al obtener las atenciones:', error);
      });
  }, [cedulaPaciente]);

  const handleGuardarAtencion = () => {
    const datosAtencion = {
      idCita: citaId,
      sintomas,
      diagnostico,
      notasMedicas,
      tratamiento,
    };

    swal({
      title: 'Registrando Atención',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        swal.showLoading();
      },
    });
    const idCita = parseInt(citaId, 10); // Convierte citaId a un entero
    // Hacer la solicitud POST a la primera ruta
    fetch('http://localhost:9009/atenciones/gestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosAtencion),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al guardar la atención');
        }
        // Hacer la solicitud POST adicional a la segunda ruta
        return fetch('http://localhost:9009/citas/gestion/cambiarEstadoCita', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id_cita: idCita }),
        });
      })
      .then((response) => {
        if (!response.ok) {
          throw Error('Error al cambiar el estado de la cita');
        }

        // Cerrar el mensaje de carga y mostrar un mensaje de éxito
        swal({
          title: 'Atención Registrada',
          icon: 'success',
        });

        // Redirigir después de mostrar la alerta
        setTimeout(() => {
          window.location.reload();
        }, 1600);
      })
      .catch((error) => {
        // Cerrar el mensaje de carga y mostrar un mensaje de error
        swal({
          title: 'Error',
          text: error.message,
          icon: 'error',
        });
      });
  };

  return (
    <div className="container mx-auto p-4">

      <h2 className="text-2xl font-bold mb-4">Atender Cita</h2>

      <div className="bg-blue-100 p-4 rounded-lg shadow-md mb-4">
        <div className="mt-4">

          <h3 className="text-lg font-semibold mb-2">Registrar la Atención</h3>
          <div className="container mx-auto p-4">
            {/* Contenedor flex para alinear los botones */}
            <div className="flex justify-between mb-4">
              {/* Botón para regresar a la página anterior (izquierda) */}
              <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded">
                ⇦
              </Link>

              {/* Botón para mostrar el historial Trabajador (derecha) */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Mostrar Historial del Cliente
              </button>
            </div>
          </div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
          Observaciones
          </label>
          <textarea
            className="border rounded w-full py-2 px-3"
            rows="4"
            value={diagnostico}
            onChange={(e) => setDiagnostico(e.target.value)}
          ></textarea>

          <label className="block text-gray-700 text-sm font-bold mt-4 mb-2">
            Tratamiento
          </label>
          <textarea
            className="border rounded w-full py-2 px-3"
            rows="4"
            value={tratamiento}
            onChange={(e) => setTratamiento(e.target.value)}
          ></textarea>

          <label className="block text-gray-700 text-sm font-bold mt-4 mb-2">
            Objetivos
          </label>
          <textarea
            className="border rounded w-full py-2 px-3"
            rows="4"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          ></textarea>

          <label className="block text-gray-700 text-sm font-bold mt-4 mb-2">
           Notas Cosméticas:
          </label>
          <textarea
            className="border rounded w-full py-2 px-3"
            rows="4"
            value={notasMedicas}
            onChange={(e) => setNotasMedicas(e.target.value)}
          ></textarea>
        </div>

        <div className="mt-4">
          <Link to="/">
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleGuardarAtencion}
            >
              Finalizar Atención
            </button>
          </Link>
        </div>
      </div>
      {isModalOpen && (
        <div
          className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-70"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white p-4 rounded-lg shadow-md w-2/3"
            onClick={(e) => e.stopPropagation()} // Evita que se cierre al hacer clic dentro del modal
          >
            <h2 className="text-2xl font-bold mb-4">Historial Trabajador del Paciente</h2>
            <div className="p-4"> {/* Nuevo div para separar la tabla y el botón */}
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
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default AtenderCita;