import React from 'react';
import { FaTools } from 'react-icons/fa'; // Importa un ícono de herramientas

function MaintenancePage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <FaTools className="text-6xl text-red-500" />
        </div>
        <h1 className="text-4xl font-semibold mb-4">Página en Mantenimiento</h1>
        <p className="text-gray-600">Estamos trabajando para mejorar nuestro sitio web.</p>
        <p className="text-gray-600">Vuelve pronto. Disculpa las molestias.</p>
      </div>
    </div>
  );
}

export default MaintenancePage;
