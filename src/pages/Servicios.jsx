import React from 'react';

function Servicios() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-2xl">
        <h1 className="text-4xl font-semibold mb-8 text-center">Nuestros Servicios</h1>
        <p className="text-gray-600 text-center">
          En Coco Pink, nos esforzamos por proporcionar una amplia gama de servicios de estética para satisfacer tus necesidades. Nuestro equipo de profesionales altamente capacitados se dedica a garantizar tu belleza y comodidad.
        </p>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Algunos de Nuestros Servicios Incluyen:</h2>
          <ul className="list-disc pl-6">
            <li>Consultas de Belleza: Ofrecemos consultas con esteticistas especializados para abordar tus preocupaciones estéticas y proporcionar orientación.</li>
            <li>Tratamientos Faciales: Realizamos una variedad de tratamientos faciales para mejorar y mantener la salud y apariencia de tu piel.</li>
            <li>Depilación: Proporcionamos servicios de depilación adaptados a tus necesidades específicas, utilizando técnicas modernas y productos de alta calidad.</li>
            {/* Agrega más servicios según sea necesario */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Servicios;
