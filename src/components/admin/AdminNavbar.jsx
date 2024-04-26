import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('adminData');
    // Redirige al usuario a la página de inicio de sesión o a la página principal
    window.location.href = '/'; // Cambia '/login' por la ruta que desees
  };
  

  // Obtén la información del administrador desde el localStorage
  const adminData = JSON.parse(localStorage.getItem('userData'));
  const adminEmail = adminData ? adminData.adminData.email : '';
  // Obtén el nombre del administrador hasta el "@" (correo sin el dominio)
  const adminName = adminEmail ? adminEmail.split('@')[0] : '';

  return (
    <nav className="bg-gray-800 py-4 px-6 flex justify-between items-center">
      <div>
        <Link to="/" className="text-white text-2xl font-semibold">
          Cosmetica Coco Pink
        </Link>
      </div>
      <ul className="flex space-x-4 items-center">
        <li>
          {adminData && (
            <span className="text-white">{`¡Bienvenido, ${adminName}!`}</span>
          )}
        </li>
        {adminData && (
          <li>
            <button
              className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full transition duration-300"
              onClick={handleLogout}
            >
              Cerrar Sesión
            </button>
          </li>
        )}
      </ul>
      {isLoginModalOpen && <LoginModal closeModal={closeModal} />}
    </nav>
  );
};

export default Navbar;
