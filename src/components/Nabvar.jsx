import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginModal from './patient/LoginModal';

// ... (importaciones previas)

const Navbar = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <nav className="bg-gray-800 py-4 px-6 flex justify-between items-center">
      <div>
        {/* Enlace a la página de inicio */}
        <Link to="/" className="text-white text-2xl font-semibold">
          Cosmetica Coco Pink
        </Link>
      </div>
      <ul className="flex space-x-4 items-center">
        {/* Botones para otras páginas */}
        <li>
          {/* Puedes agregar más enlaces según tus necesidades */}
          <Link to="/servicios" className="text-white hover:text-blue-500 transition duration-300">
            Servicios
          </Link>
        </li>
        <li>
          <Link to="/contacto" className="text-white hover:text-blue-500 transition duration-300">
            Contacto
          </Link>
        </li>
        <li>
          <button
            className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full transition duration-300"
            onClick={openLoginModal}
          >
            Iniciar Sesión
          </button>
        </li>
      </ul>
      {/* Abre el modal de inicio de sesión si está activo */}
      {isLoginModalOpen && <LoginModal closeModal={closeModal} />}
    </nav>
  );
}

export default Navbar;
