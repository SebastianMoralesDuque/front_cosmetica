import React, { useRef, useState } from 'react';

const DoctorDayOffModal = ({ closeModal }) => {
  const modalRef = useRef(null);

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para registrar el día libre del Trabajador.
    // Por ejemplo, puedes enviar una solicitud al servidor para guardar la fecha.
    // Luego, cierra el modal si la operación es exitosa o muestra un mensaje de error.
    console.log('Formulario enviado para registrar día libre');
    closeModal(); // Cierra el modal después de enviar el formulario
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={handleOutsideClick}>
      <div className="bg-white rounded-lg p-8" ref={modalRef}>
        <h2 className="text-2xl font-semibold text-center mb-4">Registrar Día Libre</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-800 font-medium">Fecha del Día Libre:</label>
            <input
              type="date"
              id="date"
              name="date"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="reason" className="block text-gray-800 font-medium">Motivo:</label>
            <textarea
              id="reason"
              name="reason"
              rows="4"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              required
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-full focus:outline-none focus:ring focus:border-blue-700"
            >
              Registrar Día Libre
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DoctorDayOffModal;
