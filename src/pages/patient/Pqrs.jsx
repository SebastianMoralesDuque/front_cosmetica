import React, { useState } from 'react';
import Pagination from '../../components/patient/Pagination';
import { pqrsList } from './Data';
import ConversacionModal from '../../components/patient/ConversacionModal'; // Importa el componente ConversacionModal

function Pqrs() {
  // Utiliza la lista de PQRs desde data.js
  const [selectedPqr, setSelectedPqr] = useState(null);
  const [formularioPqr, setFormularioPqr] = useState({
    fecha: null,
    tipo: '',
    motivo: '',
    activa: true,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const elementsPerPage = 4; // Cambia el número de elementos por página a 4

  // Función para manejar el cambio de página
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  // Calcular el índice de inicio y final de las PQRs a mostrar en la página actual
  const startIndex = (currentPage - 1) * elementsPerPage;
  const endIndex = startIndex + elementsPerPage;

  // Obtener todas las PQRs, incluyendo las no activas
  const allPqrs = pqrsList;

  // Filtrar las PQRs activas
  const activePqrs = pqrsList.filter((pqr) => pqr.activa);

  // Estado para controlar la apertura del modal de conversación
  const [isConversacionModalOpen, setConversacionModalOpen] = useState(false);

  // Función para abrir el modal de conversación
  const handleOpenConversacionModal = () => {
    setConversacionModalOpen(true);
  };

  // Función para cerrar el modal de conversación
  const handleCloseConversacionModal = () => {
    setConversacionModalOpen(false);
  };

  // Función para abrir la conversación del chat
  const handleVerConversacion = (pqr) => {
    setSelectedPqr(pqr);
    handleOpenConversacionModal(); // Abre el modal de conversación
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        {/* ... (código previo) */}
      </div>

      <h2 className="text-lg font-semibold mb-2 text-center">Mis PQRs</h2>

      {pqrsList.length > 0 ? (
        <div className="bg-blue-100 p-4 rounded shadow mb-4 overflow-x-auto">
          <ul className="flex justify-center">
            {pqrsList.slice(startIndex, endIndex).map((pqr, index) => (
              <li key={index} className="mr-4">
                <div className={`bg-white p-4 rounded shadow ${pqr.activa ? '' : 'opacity-50'}`}>
                  <strong>Fecha: {pqr.fecha}</strong><br />
                  <span className="block">Tipo: {pqr.tipo}</span>
                  <span className="block">Motivo: {pqr.motivo}</span>
                  <span className="block">
                    Estado: {pqr.activa ? 'Activa' : 'Inactiva'}
                  </span>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2"
                    onClick={() => handleVerConversacion(pqr)} // Abre la conversación al hacer clic
                  >
                    Ver PQR
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <hr />
        </div>
      ) : (
        <p className="text-center text-gray-500">No tienes PQRs.</p>
      )}

      {/* Coloca la paginación debajo del recuadro de PQRs */}
      <div className="flex justify-center mt-4">
        <Pagination
          pageCount={Math.ceil(pqrsList.length / elementsPerPage)}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Renderiza el modal de conversación si está abierto */}
      {isConversacionModalOpen && (
        <ConversacionModal
          pqr={selectedPqr} // Pasa la PQR seleccionada al modal de conversación
          closeModal={handleCloseConversacionModal}
        />
      )}
    </div>
  );
}

export default Pqrs;
