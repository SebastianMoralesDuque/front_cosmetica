import React, { useState } from 'react';

function PqrModal({ citaId, closeModal }) {
  const [detalle, setDetalle] = useState(''); // Estado para almacenar el detalle del PQR

  const cita = {
    id: citaId,
    atencion: 'Atención de la cita número 1',
    diagnostico: 'Observaciones de la cita',
    tratamiento: 'Tratamiento de la cita',
    notasMedicas: 'Notas Cosméticas de la cita',
  };

  // Función para generar PQR (aquí puedes agregar tu lógica)
  const generarPQR = () => {
    // Lógica para generar PQR
    // Puedes mostrar una alerta o realizar alguna acción específica con el detalle
    alert(`Se generó el PQR con éxito. Detalle: ${detalle}`);
  };

  // Manejador de clic en el fondo oscuro para cerrar el modal
  const handleModalOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      closeModal();
    }
  };

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-700 bg-opacity-50 modal-overlay" onClick={handleModalOverlayClick}>
      <div className="bg-white p-4 rounded shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Detalles de la Cita</h2>
        <div className="mb-4">
          <strong>ID de Cita: {cita.id}</strong>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Atención de la Cita:
          </label>
          <div className="border border-gray-300 rounded py-2 px-3">{cita.atencion}</div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Observaciones:</label>
          <div className="border border-gray-300 rounded py-2 px-3">{cita.diagnostico}</div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Tratamiento:</label>
          <div className="border border-gray-300 rounded py-2 px-3">{cita.tratamiento}</div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Notas Cosméticas:</label>
          <div className="border border-gray-300 rounded py-2 px-3">{cita.notasMedicas}</div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Detalle del PQR:</label>
          <textarea
            className="border border-gray-300 rounded py-2 px-3 w-full h-24"
            value={detalle}
            onChange={(e) => setDetalle(e.target.value)}
          ></textarea>
        </div>
        <div className="text-center">
          <button
            onClick={generarPQR}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Generar PQR
          </button>
          <button
            onClick={closeModal}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-2"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default PqrModal;
