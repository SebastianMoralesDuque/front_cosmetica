import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'react-feather';

const DoctorNavbar = () => {
  const doctorData = JSON.parse(localStorage.getItem('medicoData'));
  const [editFormIsOpen, setEditFormIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [detallesAEditar, setDetallesAEditar] = useState({
    email: doctorData.userData[0][0].email,
    cedula: doctorData.userData[0][0].cedula,
    telefono: doctorData.userData[0][0].telefono,
  });

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('medicoData');
    // Recargar la página al cerrar sesión
    window.location.href = '/'; // Cambia '/login' por la ruta que desees
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditFormIsOpen(false); // Cerrar el formulario de edición al cerrar el modal
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
        // Delete the doctor
        const doctorData = JSON.parse(localStorage.getItem('medicoData'));
        const pacienteData = doctorData.userData[0][0];
        const usuarioData = doctorData.userData[0][1];
  
        const medicoEliminar = {
          cedula_usuario: pacienteData.cedula,
          especializacion: usuarioData.especializacion,
        };
  
        const medicoResponse = await fetch('http://localhost:9009/medicos/eliminar', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(medicoEliminar),
        });
  
        if (medicoResponse.ok) {
          // Create an object with user data to delete
          const usuarioEliminar = {
            cedula: pacienteData.cedula,
            nombre: pacienteData.nombre,
            contrasena: pacienteData.contrasena,
            email: pacienteData.email,
            telefono: pacienteData.telefono,
            ciudad: pacienteData.ciudad,
          };
  
          const usuarioResponse = await fetch('http://localhost:9009/usuarios/gestion', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuarioEliminar),
          });
  
          if (usuarioResponse.ok) {
            // Show a success message with SweetAlert
            swal('¡Cuenta eliminada con éxito!', {
              icon: 'success',
              timer: 2000, // Automatically close the alert after 2 seconds
            }).then(() => {
              localStorage.removeItem('userType');
              localStorage.removeItem('medicoData');
              window.location.href = '/';
            });
          } else {
            // Error deleting the user
            console.error('Error al eliminar la cuenta');
  
            // Show an error message with SweetAlert
            swal('Error', 'Hubo un problema al eliminar la cuenta. Por favor, inténtalo de nuevo.', 'error');
          }
        } else {
          // Error deleting the doctor
          console.error('Error al eliminar el Trabajador');
  
          // Show an error message with SweetAlert
          swal('Error', 'Hubo un problema al eliminar el Trabajador', 'error');
        }
      }
    } catch (error) {
      console.error('Error:', error.message);
      // Handle error (e.g., display an error message to the user)
    }
  };  

  const saveChanges = async () => {
    try {
      // Datos a enviar en la solicitud PUT
      const usuarioData = doctorData.userData[0][1];
      const { email, telefono, cedula } = detallesAEditar;
      const datosAEditar = {
        email,
        telefono,
        cedula,
      };
  
      // Realizar la solicitud PUT para guardar los cambios
      const usuarioResponse = await fetch('http://localhost:9009/usuarios/gestion/editarUsuario', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosAEditar),
      });
  
      if (usuarioResponse.ok) {
        // Muestra un mensaje de éxito con SweetAlert
        swal({
          title: 'Éxito',
          text: 'Cambios guardados con éxito',
          icon: 'success',
          timer: 1400, // Cierra automáticamente el mensaje después de 1 segundo
          button: false,
        }).then(() => {
          // Después de 1 segundo, cierra la sesión y redirige al usuario a la página principal
          localStorage.removeItem('userType');
          localStorage.removeItem('medicoData');
          window.location.href = '/';
        });
      } else {
        // Muestra un mensaje de error con SweetAlert en caso de problemas con la solicitud
        swal('Error', 'Hubo un problema al guardar los cambios. Por favor, inténtalo de nuevo.', 'error');
      }
    } catch (error) {
      // Maneja los errores, por ejemplo, muestra un mensaje de error
      console.error('Error:', error.message);
      swal('Error', 'Hubo un problema al comunicarse con el servidor', 'error');
    }
  };
  
  

  const openEditForm = () => {
    setEditFormIsOpen(true);
  };

  const handleFieldChange = (field, value) => {
    setDetallesAEditar({
      ...detallesAEditar,
      [field]: value,
    });
  };

  const userData = doctorData ? doctorData.userData[0][0] : null;

  const userData2 = doctorData ? doctorData.userData[0][1] : null;

  return (
    <nav className="bg-gray-800 py-4 px-6 flex justify-between items-center">
      <div>
        <Link to="/" className="text-white text-2xl font-semibold">
          Cosmetica Coco Pink
        </Link>
      </div>
      <ul className="flex space-x-4 items-center">
        {doctorData && (
          <>
            <li>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-white focus:outline-none flex items-center hover:text-blue-500"
              >
                <span className="mr-2 hover:underline">{`¡Hola, ${doctorData.userData[0][0].nombre.split(' ')[0]}!`}</span>
                <img
                  src={doctorData.userData[0][0].url_foto}
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
            </li>
          </>
        )}
      </ul>

      {modalIsOpen && (
        <div
          className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex"
          onClick={closeModal}
        >
          <div
            className="relative p-8 bg-white mx-auto my-8 max-w-2xl rounded-md text-center"
            onClick={(e) => e.stopPropagation()} // Evita que el clic se propague al fondo
          >
            <h2 className="text-2xl font-semibold mb-4">Perfil de Usuario</h2>
            <button
              className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
              onClick={closeModal}
            >
              &times;
            </button>
            <div className="flex items-center justify-center mb-4">
              <img
                src={userData.url_foto}
                alt="Perfil"
                className="rounded-full h-20 w-20"
              />
            </div>
            {editFormIsOpen ? (
              <>
              <div className="mb-4">
                              <div className="mb-4">
                <label className="block text-gray-800">Cédula</label>
                <input
                  type="text"
                  value={detallesAEditar.cedula}
                  onChange={(e) => handleFieldChange('cedula', e.target.value)}
                  disabled
                  className="w-full border p-2 rounded-md"
                />
              </div>
                <label className="block text-gray-800">Email</label>
                <input
                  type="text"
                  value={detallesAEditar.email}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                  className="w-full border p-2 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-800">Teléfono</label>
                <input
                  type="text"
                  value={detallesAEditar.telefono}
                  onChange={(e) => handleFieldChange('telefono', e.target.value)}
                  className="w-full border p-2 rounded-md"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setEditFormIsOpen(false)} // Agregado para cerrar el formulario de edición
                className="w-full bg-gray-500 text-white px-4 py-2 hover:bg-gray-600"
                >
                Regresar
              </button>
              <button
                type="button"
                onClick={saveChanges}
                className="w-full bg-blue-500 text-white px-4 py-2 hover:bg-blue-600"
                >
                Guardar Cambios
              </button>

              </div>
            </>
            
            ) : (
              <table className="table-auto w-full">
                <tbody>
                  {/* Mostrar la información del perfil */}
                  <tr>
                    <td className="border px-4 py-2">Nombre</td>
                    <td className="border px-4 py-2">{userData.nombre}</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">Cédula</td>
                    <td className="border px-4 py-2">{userData.cedula}</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">Ciudad</td>
                    <td className="border px-4 py-2">{userData.ciudad}</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">Email</td>
                    <td className="border px-4 py-2">{userData.email}</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">Teléfono</td>
                    <td className="border px-4 py-2">{userData.telefono}</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">Especialización</td>
                    <td className="border px-4 py-2">{userData2.especializacion}</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">Acciones</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={deleteAccount}
                        className="bg-red-500 text-white px-2 py-1 mr-2 hover:bg-red-600"
                      >
                        Eliminar Cuenta
                      </button>
                      <button
                        onClick={openEditForm}
                        className="bg-blue-500 text-white px-2 py-1 hover:bg-blue-600"
                      >
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
    </nav>
  );
}

export default DoctorNavbar;
