import swal from 'sweetalert';
import React, { useState, useEffect } from 'react';
import obtenerEps from '../../services/epsService';

const EditForm = ({ detallesAEditar, handleFieldChange, handleGoBack }) => {
  const [epsOptions, setEpsOptions] = useState([]);
  const [selectedEps, setSelectedEps] = useState('');

  useEffect(() => {
    const fetchEps = async () => {
      try {
        const epsData = await obtenerEps();
        setEpsOptions(epsData);
      } catch (error) {
        console.error('Error al obtener EPS:', error);
      }
    };

    fetchEps();
  }, []); // Se ejecutará una vez al montar el componente

  const handleSaveChanges = async () => {
    try {
      const { email, telefono, alergias, cedula, fecha_nacimiento, tipo_sangre } = detallesAEditar;
      const eps = selectedEps || detallesAEditar.eps; // Utiliza la EPS seleccionada o la existente

      // Actualiza el usuario
      const usuarioResponse = await fetch('http://localhost:9009/usuarios/gestion/editarUsuario', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, telefono, cedula }),
      });

      if (usuarioResponse.ok) {
        // Actualiza el paciente
        const pacienteResponse = await fetch(`http://localhost:9009/usuarios/gestion/pacientes/${cedula}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fecha_nacimiento, alergias, eps, tipo_sangre, cedula }), // Incluye la cédula para edición
        });

        if (pacienteResponse.ok) {
          // Muestra un mensaje de éxito con SweetAlert
          swal({
            title: 'Éxito',
            text: 'Paciente editado con éxito',
            icon: 'success',
            timer: 2000, // Cierra automáticamente el mensaje después de 2 segundos
            button: false,
          }).then(() => {
            // Después de 2 segundos, cierra la sesión y redirige al usuario a la página principal
            swal.close(); // Cierra el mensaje de éxito
            localStorage.removeItem('userType');
            localStorage.removeItem('userData');
            window.location.href = '/';
          });
        } else {
          // Muestra un mensaje de error con SweetAlert en caso de error en la actualización del paciente
          swal('Error', 'Hubo un error al editar el paciente. Por favor, inténtalo de nuevo.', 'error');
        }
      } else {
        // Muestra un mensaje de error con SweetAlert en caso de error en la actualización del usuario
        swal('Error', 'Hubo un error al editar el usuario. Por favor, inténtalo de nuevo.', 'error');
      }
    } catch (error) {
      console.error('Error al editar el paciente:', error);
    }
  };


  return (
    <div>
      <form className="mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="mb-4">
              <label className="block text-gray-800">Cédula</label>
              <input
                type="text"
                value={detallesAEditar.cedula}
                onChange={(e) => handleFieldChange('cedula', e.target.value)}
                disabled
                className="w-full border p-2 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800">Email</label>
              <input
                type="text"
                value={detallesAEditar.email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                className="w-full border p-2 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800">Fecha de Nacimiento</label>
              <input
                type="date"
                value={detallesAEditar.fecha_nacimiento}
                onChange={(e) => handleFieldChange('fecha_nacimiento', e.target.value)}
                className="w-full border p-2 rounded-md"
              />
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label className="block text-gray-800">Teléfono</label>
              <input
                type="text"
                value={detallesAEditar.telefono}
                onChange={(e) => handleFieldChange('telefono', e.target.value)}
                className="w-full border p-2 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-800">Alergias</label>
              <input
                type="text"
                value={detallesAEditar.alergias}
                onChange={(e) => handleFieldChange('alergias', e.target.value)}
                className="w-full border p-2 rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleGoBack}
            className="w-full bg-gray-500 text-white px-4 py-2 hover:bg-gray-600"
          >
            Regresar
          </button>
          <button
            type="button"
            onClick={handleSaveChanges}
            className="w-full bg-blue-500 text-white px-4 py-2 hover:bg-blue-600"
          >
            Guardar Cambios
          </button>

        </div>

      </form>
    </div>
  );
};

export default EditForm;
