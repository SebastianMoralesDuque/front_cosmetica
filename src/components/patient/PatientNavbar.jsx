import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'react-feather';
import ModalInfo from './ModalInfo';
import swal from 'sweetalert';

const PatientNavbar = () => {
  const user = JSON.parse(localStorage.getItem('userData')) || null;
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('userData');
    window.location.href = '/';
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };


  const deleteAccount = async () => {
    try {

      const shouldDelete = await swal({
        title: '¿Estás seguro de eliminar tu cuenta?',
        icon: 'warning',
        buttons: ['Cancelar', 'Sí, eliminar'],
        dangerMode: true,
      });

      if (shouldDelete) {
        // Delete the patient
        const pacienteData = user.userData[0][1];
        const usuarioData = user.userData[0][0];

        const pacienteEliminar = {
          cedula_usuario: pacienteData.cedula_usuario,
          fecha_nacimiento: pacienteData.fecha_nacimiento,
          alergias: pacienteData.alergias,
          eps: pacienteData.eps,
          tipo_sangre: pacienteData.tipo_sangre,
        };

        const pacienteResponse = await fetch('http://localhost:9009/usuarios/gestion/pacientes', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(pacienteEliminar),
        });

        if (!pacienteResponse.ok) {
          throw new Error('Error deleting patient');
        }

        // Delete the user
        const usuarioEliminar = {
          cedula: usuarioData.cedula,
          nombre: usuarioData.nombre,
          contrasena: usuarioData.contrasena,
          email: usuarioData.email,
          telefono: usuarioData.telefono,
          url_foto: usuarioData.url_foto,
          ciudad: usuarioData.ciudad,
        };

        const usuarioResponse = await fetch('http://localhost:9009/usuarios/gestion', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(usuarioEliminar),
        });

        if (!usuarioResponse.ok) {
          throw new Error('Error deleting user');
        }

        // Additional logic after successful deletion
        swal('¡Cuenta eliminada con éxito!', {
          icon: 'success',
          timer: 2000, // Automatically close the alert after 2 seconds
        }).then(() => {
          localStorage.removeItem('userType');
          localStorage.removeItem('userData');
          window.location.href = '/';
        });
      }
    } catch (error) {
      console.error('Error:', error.message);
      // Handle error (e.g., display an error message to the user)
    }
  };

  const userData = user ? user.userData[0][0] : null;
  const userData2 = user ? user.userData[0][1] : null;

  return (
    <nav className="bg-gray-800 py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-white text-2xl font-semibold">
        Cosmetica Coco Pink
      </Link>
      {user && (
        <div className="flex items-center">
          <ul className="flex space-x-4 items-center">
            <li>
              <Link
                to="/historialMedico"
                className="text-white hover:text-blue-500 transition duration-300"
              >
                Historial
              </Link>
            </li>
            <li>
              <Link
                to="/pqrs"
                className="text-white hover:text-blue-500 transition duration-300"
              >
                Pqrs
              </Link>
            </li>
          </ul>
          <div className="ml-4 relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white focus:outline-none flex items-center hover:text-blue-500"
            >
              <span className="mr-2 hover:underline">{`¡Hola, ${userData.nombre}!`}</span>
              <img
                src={userData.url_foto}
                alt="Perfil"
                className="rounded-full h-8 w-8 mr-2"
              />
              <ChevronDown className="text-white" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 bg-white text-gray-800 shadow-md rounded-md border w-48">
                <button
                  onClick={openModal}
                  className="block px-4 py-2 text-sm hover:bg-gray-200 w-full text-left"
                >
                  Perfil
                </button>
                <div className="border-t"></div>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-200 w-full text-left"
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <ModalInfo
        isOpen={modalIsOpen}
        closeModal={closeModal}
        userData={userData}
        userData2={userData2}
        deleteAccount={deleteAccount}
      />
    </nav>
  );
};

export default PatientNavbar;

