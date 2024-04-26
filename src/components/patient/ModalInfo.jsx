// ModalInfo.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EditForm from './EditForm';  // Ajusta la ruta según tu estructura de archivos

const ModalInfo = ({ isOpen, closeModal, userData, userData2, deleteAccount }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [detallesAEditar, setDetallesAEditar] = useState({
    email: userData.email,
    telefono: userData.telefono,
    url_foto: userData.url_foto,
    alergias: userData2.alergias,
    eps: userData2.eps,
    cedula: userData2.cedula_usuario,
  });

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleFieldChange = (field, value) => {
    setDetallesAEditar({
      ...detallesAEditar,
      [field]: value,
    });
  };


  const handleGoBack = () => {
    setIsEditing(false);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex" onClick={closeModal}>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex" onClick={closeModal}>
            <div className="relative p-8 bg-white mx-auto my-8 w-full md:max-w-2xl rounded-md text-center" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-2xl font-semibold mb-4">{isEditing ? 'Editar Información' : 'Perfil de Usuario'}</h2>
              <button className="absolute top-4 right-4 text-gray-700 hover:text-gray-900" onClick={closeModal}>
                &times;
              </button>
              <div className="flex items-center justify-center mb-4">
                <img src={userData.url_foto} alt="Perfil" className="rounded-full h-20 w-20" />
              </div>
              {isEditing ? (
                <EditForm
                  detallesAEditar={detallesAEditar}
                  handleFieldChange={handleFieldChange}
                  handleGoBack={handleGoBack}
                />
              ) : (
                <table className="table-auto w-full">
                  <tbody>
                    {Object.entries(userData).map(([key, value]) => {
                      if (key !== 'contrasena' && key !== 'url_foto' && key !== 'cedula_usuario') {
                        return (
                          <tr key={key}>
                            <td className="border px-4 py-2">{key}</td>
                            <td className="border px-4 py-2">{value}</td>
                          </tr>
                        );
                      }
                      return null;
                    })}
                    <tr>
                      <td className="border px-4 py-2">Fecha de Nacimiento</td>
                      <td className="border px-4 py-2">
                        {userData2.fecha_nacimiento ? userData2.fecha_nacimiento.substring(0, 10) : ''}
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">Sucursal</td>
                      <td className="border px-4 py-2">{userData2.eps}</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">Acciones</td>
                      <td className="border px-4 py-2">
                        <button onClick={deleteAccount} className="bg-red-500 text-white px-2 py-1 mr-2 hover:bg-red-600">
                          Eliminar Cuenta
                        </button>
                        <button onClick={handleEditClick} className="bg-blue-500 text-white px-2 py-1 hover:bg-blue-600">
                          Editar Información
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>
    )
  );
};

ModalInfo.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
  userData2: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

export default ModalInfo;
