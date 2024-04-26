import React, { useState } from 'react';
import Modal from 'react-modal';

const EditarInformacionModal = ({ isOpen, closeModal, userData2, handleEdit }) => {
  const [editedData, setEditedData] = useState({
    fecha_nacimiento: userData2.fecha_nacimiento,
    alergias: userData2.alergias,
    eps: userData2.eps,
    tipo_sangre: userData2.tipo_sangre,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    // Add logic for saving the edited data
    handleEdit(editedData);
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Editar Información Modal"
      className="modal bg-white rounded-md p-8 mx-auto mt-20 w-96"
      overlayClassName="overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <h2 className="text-2xl font-semibold mb-4">Editar Información</h2>
      <table className="table-auto w-full mb-4">
        <tbody>
          <tr>
            <td className="border px-4 py-2">Fecha de Nacimiento</td>
            <td className="border px-4 py-2">
              <input
                className="w-full border rounded p-2"
                type="text"
                name="fecha_nacimiento"
                value={editedData.fecha_nacimiento}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Alergias</td>
            <td className="border px-4 py-2">
              <input
                className="w-full border rounded p-2"
                type="text"
                name="alergias"
                value={editedData.alergias}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Sucursal</td>
            <td className="border px-4 py-2">
              <input
                className="w-full border rounded p-2"
                type="text"
                name="eps"
                value={editedData.eps}
                onChange={handleChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-end">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600"
          onClick={handleSave}
        >
          Guardar
        </button>
        <button
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
          onClick={closeModal}
        >
          Cancelar
        </button>
      </div>
    </Modal>
  );
};

export default EditarInformacionModal;
