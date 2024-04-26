// AssignScheduleModal.js
import React, { useState } from 'react';

const AssignScheduleModal = ({ cedula, closeModal }) => {
  const [formData, setFormData] = useState({
    jornada: '', // Nuevo campo para la jornada
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let idJornada;

      switch (formData.jornada) {
        case '7am-1pm':
          idJornada = 1;
          break;
        case '1pm-8pm':
          idJornada = 2;
          break;
        case '8pm-12am':
          idJornada = 3;
          break;
        default:
          idJornada = -1; // Valor por defecto o manejo de error si no coincide ninguna jornada
      }

      if (idJornada !== -1) {
        const response = await fetch('http://localhost:9009/medicos/horario', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id_jornada: idJornada,
            cedula_medico: cedula,
          }),
        });

        if (response.ok) {
          // Mostrar SweetAlert si la asignación fue exitosa
          swal('¡Éxito!', 'Horario asignado con éxito', 'success');
        } else {
          // Mostrar SweetAlert si hubo un error
          swal('Error', 'Hubo un problema al asignar el horario', 'error');
        }
      } else {
        // Mostrar SweetAlert si la jornada no coincide con ninguna de las opciones
        swal('Error', 'Jornada no válida', 'error');
        console.error('Jornada no válida');
      }
    } catch (error) {
      // Mostrar SweetAlert si hubo un error en la solicitud
      swal('Error', 'Hubo un problema al comunicarse con el servidor', 'error');
      console.error('Error en la solicitud:', error);
    }

    closeModal();
  };

  const handleChange = (e) => {
    // Aquí puedes manejar los cambios en los campos del formulario
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Fondo del modal, para cerrar el modal haciendo clic fuera del contenido */}
        <div className="fixed inset-0 transition-opacity" onClick={closeModal}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* Contenido del modal */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full sm:max-w-md">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <span className="close absolute top-0 right-0 p-4 cursor-pointer" onClick={closeModal}>
              &times;
            </span>
            <h2 className="text-xl font-semibold mb-4">Asignar Horario</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Jornada</label>
                <div className="flex justify-between">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="jornada"
                      value="7am-1pm"
                      checked={formData.jornada === '7am-1pm'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-sm">7 am - 1 pm</span>
                  </label>

                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="jornada"
                      value="1pm-8pm"
                      checked={formData.jornada === '1pm-8pm'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-sm">1 pm - 8 pm</span>
                  </label>

                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="jornada"
                      value="8pm-12am"
                      checked={formData.jornada === '8pm-12am'}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="text-sm">8 pm - 12 am</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
              >
                Guardar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignScheduleModal;
