import React from 'react';

function Contacto() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-2xl">
        <h1 className="text-4xl font-semibold mb-8 text-center">Contacto</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Formulario de Contacto */}
          <form className="space-y-4">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                placeholder="Ingrese su nombre"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                placeholder="Ingrese su correo electrónico"
              />
            </div>
            <div>
              <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700">
                Mensaje
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows="4"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                placeholder="Escriba su mensaje"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Enviar Mensaje
            </button>
          </form>
          
          {/* Mapa de Ubicación (Ejemplo con Google Maps) */}
          <div className="md:h-96">
            {/* Puedes integrar aquí un mapa interactivo, como Google Maps */}
            <iframe
              title="Ubicación de la Clínica"
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387284.0592647664!2d-74.25908989999999!3d40.6976701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1633604293767!5m2!1sen!2sin"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacto;
