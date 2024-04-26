import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa'; // Importa un ícono de advertencia

function NotFoundPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <FaExclamationTriangle className="text-6xl text-yellow-500" />
        </div>
        <h1 className="text-4xl font-semibold mb-4">Página No Encontrada</h1>
        <p className="text-gray-600">La página que estás buscando no existe.</p>
        <p className="text-gray-600">Verifica la URL o vuelve a la página de inicio.</p>
      </div>
    </div>
  );
}

export default NotFoundPage;
