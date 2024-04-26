import React, { useRef, useState } from 'react';
import RegisterModal from './RegisterModal';
import PasswordRecoveryModal from './PasswordRecoveryModal';
import UserService from '../../services/userLoginService'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const LoginModal = ({ closeModal }) => {
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showPasswordRecoveryModal, setShowPasswordRecoveryModal] = useState(false);

  const [formDataUser, setFormDataUser] = useState({
    cedula: '',
    password: '',
  });

  const [formDataAdmin, setFormDataAdmin] = useState({
    email: '',
    password_admin: '',
  });

  const [formDataDoctor, setFormDataDoctor] = useState({
    codigoMedico: '', // Corregido el nombre del campo
    passwordMedico: '', // Corregido el nombre del campo
  });

  const [loginType, setLoginType] = useState('user');
  const [showContent, setShowContent] = useState(true);

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  const handleLoginTypeChange = (type) => {
    setLoginType(type);
    setFormDataUser({
      cedula: '',
      password: '',
    });
    setFormDataAdmin({
      email: '',
      password_admin: '',
    });
    setFormDataDoctor({
      codigoMedico: '', // Corregido el nombre del campo
      passwordMedico: '', // Corregido el nombre del campo
    });
  };

  const handleInputChangeUser = (e) => {
    const { name, value } = e.target;
    setFormDataUser({
      ...formDataUser,
      [name]: value,
    });
  };

  const handleInputChangeAdmin = (e) => {
    const { name, value } = e.target;
    setFormDataAdmin({
      ...formDataAdmin,
      [name]: value,
    });
  };

  const handleInputChangeDoctor = (e) => {
    const { name, value } = e.target;
    setFormDataDoctor({
      ...formDataDoctor,
      [name]: value,
    });
  };

  const handleSubmitUser = async (e) => {
    e.preventDefault();
    console.log('Formulario enviado con datos:', formDataUser);
  
    const loginSuccess = await UserService.loginUser(formDataUser);
  
    if (loginSuccess) {
      swal({
        title: "Inicio de sesión",
        text: "Credenciales Correctas. Bienvenido(a)",
        icon: "success",
        timer: "2000",
        buttons: false
      });
  
      // Recargar la página después de 2 segundos
      setTimeout(() => {
        window.location.reload();
      }, 1600);
    } else {
      swal({
        title: "Inicio de sesión",
        text: "Credenciales Incorrectas. Acceso no autorizado",
        icon: "error",
        timer: "2000",
        buttons: false
      });
    }
  
    closeModal();
  };
  

  const handleSubmitDoctor = async (e) => {
    e.preventDefault();
    console.log('Formulario enviado con datos de Trabajador:', formDataDoctor);

    const loginSuccess = await UserService.loginDoctor(formDataDoctor);
    if (loginSuccess) {
      swal({
        title: "Inicio de sesión",
        text: "Credenciales Correctas. Bienvenido(a)",
        icon: "success",
        timer: "2000",
        buttons: false
      });

      setTimeout(() => {
        window.location.reload();
      }, 1600);
    } else {
      swal({
        title: "Inicio de sesión",
        text: "Credenciales Incorrectas. Acceso no autorizado",
        icon: "error",
        timer: "2000",
        buttons: false
      });
    }

    closeModal();
  };

  const handleSubmitAdmin = async (e) => {
    e.preventDefault();
    console.log('Formulario enviado con datos de admin:', formDataAdmin);

    const loginSuccess = await UserService.loginAdmin(formDataAdmin);

    if (loginSuccess) {
      swal({
        title: "Inicio de sesión",
        text: "Credenciales Correctas. Bienvenido(a)",
        icon: "success",
        timer: "2000",
        buttons: false
      });
      setTimeout(() => {
        window.location.reload();
      }, 1600);
    } else {
      swal({
        title: "Inicio de sesión",
        text: "Credenciales Incorrectas. Acceso no autorizado",
        icon: "error",
        timer: "2000",
        buttons: false
      });
    }

    closeModal();
  };

  const toggleRegisterModal = () => {
    setShowRegisterModal(!showRegisterModal);
  };

  const togglePasswordRecoveryModal = () => {
    setShowContent(!showContent);
    setShowPasswordRecoveryModal(!showPasswordRecoveryModal);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={handleOutsideClick}>
      <div className="bg-white rounded-lg p-8" ref={modalRef}>
        {showContent && (
          <div className="text-center mb-4">
            <div className="flex justify-center items-center mt-4">
              <div
                className={`cursor-pointer px-4 py-2 rounded-t-lg transition duration-300 ease-in-out ${loginType === 'user' ? 'border-b-2 border-blue-800' : 'border-b border-transparent'
                  }`}
                onClick={() => handleLoginTypeChange('user')}
              >
                Usuario
              </div>
              <div
                className={`cursor-pointer px-4 py-2 rounded-t-lg transition duration-300 ease-in-out ${loginType === 'medico' ? 'border-b-2 border-blue-800' : 'border-b border-transparent'
                  }`}
                onClick={() => handleLoginTypeChange('medico')}
              >
                Trabajador
              </div>
              <div
                className={`cursor-pointer px-4 py-2 rounded-t-lg transition duration-300 ease-in-out ${loginType === 'admin' ? 'border-b-2 border-blue-800' : 'border-b border-transparent'
                  }`}
                onClick={() => handleLoginTypeChange('admin')}
              >
                Administrador
              </div>
            </div>
          </div>
        )}

        {showContent && (
          <>
            {loginType === 'user' ? (
              <>
                <h2 className="text-2xl font-semibold text-center mb-4">Inicio Sesión Usuario</h2>
                <form onSubmit={handleSubmitUser} className="space-y-4">
                  <div className="mb-4">
                    <label htmlFor="cedula" className="block text-gray-800 font-medium">Cédula:</label>
                    <input
                      type="text"
                      id="cedula"
                      name="cedula"
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                      value={formDataUser.cedula}
                      onChange={handleInputChangeUser}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-800 font-medium">Contraseña:</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                      value={formDataUser.password}
                      onChange={handleInputChangeUser}
                      required
                    />
                  </div>
                  <p className="text-gray-600 text-sm text-center mb-4">
                    ¿No tienes una cuenta? <span className="text-blue-500 cursor-pointer" onClick={toggleRegisterModal}>Regístrate</span>
                  </p>
                  <p className="text-gray-600 text-sm text-center mb-4">
                    ¿Olvidó su contraseña? <span className="text-blue-500 cursor-pointer" onClick={togglePasswordRecoveryModal}>Recupérela aquí</span>
                  </p>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-full focus:outline-none focus:ring focus:border-blue-700"
                      onClick={handleSubmitUser}
                    >
                      Iniciar Sesión
                    </button>
                  </div>
                </form>
              </>
            ) : loginType === 'medico' ? (
              <>
                <h2 className="text-2xl font-semibold text-center mb-4">Inicio Sesión Trabajador</h2>
                <form onSubmit={handleSubmitDoctor} className="space-y-4">
                  <div className="mb-4">
                    <label htmlFor="codigoMedico" className="block text-gray-800 font-medium">Cédula:</label>
                    <input
                      type="text"
                      id="codigoMedico"
                      name="codigoMedico"
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                      value={formDataDoctor.codigoMedico}
                      onChange={handleInputChangeDoctor}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="passwordMedico" className="block text-gray-800 font-medium">Contraseña:</label>
                    <input
                      type="password"
                      id="passwordMedico"
                      name="passwordMedico"
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                      value={formDataDoctor.passwordMedico}
                      onChange={handleInputChangeDoctor}
                      required
                    />
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-full focus:outline-none focus:ring focus:border-blue-700"
                      onClick={handleSubmitDoctor}
                    >
                      Iniciar Sesión
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold text-center mb-4">Inicio Sesión Administrador</h2>
                <form onSubmit={handleSubmitAdmin} className="space-y-4">
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-800 font-medium">Email:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                      value={formDataAdmin.email}
                      onChange={handleInputChangeAdmin}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password_admin" className="block text-gray-800 font-medium">Contraseña:</label>
                    <input
                      type="password"
                      id="password_admin"
                      name="password_admin"
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                      value={formDataAdmin.password_admin}
                      onChange={handleInputChangeAdmin}
                      required
                    />
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-full focus:outline-none focus:ring focus:border-blue-700"
                      onClick={handleSubmitAdmin}
                    >
                      Iniciar Sesión
                    </button>
                  </div>
                </form>
              </>
            )}
          </>
        )}

        {showRegisterModal ? (
          <RegisterModal closeModal={toggleRegisterModal} />
        ) : null}

        {showPasswordRecoveryModal ? (
          <PasswordRecoveryModal closeModal={() => {
            setShowContent(true);
            setShowPasswordRecoveryModal(false);
            closeModal();
          }} />
        ) : null}
      </div>
    </div>
  );
}

export default LoginModal;
