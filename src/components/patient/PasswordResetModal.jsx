import React, { useState } from 'react';
import bcrypt from 'bcryptjs';

const PasswordResetModal = ({ closeModal, cedula }) => {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const [formData, setFormData] = useState({
    verificationCode: '',
    passwordToSend: '',
    cedula: cedula,
  });

  const handleVerificationCodeChange = (e, index) => {
    const value = e.target.value;
    const newVerificationCode = [...verificationCode];

    if (value.match(/^\d+$/) || value === '') {
      // Permitir dígitos o valores vacíos en el código
      newVerificationCode[index] = value;
      setVerificationCode(newVerificationCode);

      if (value === '' && index > 0) {
        // Si el usuario borra un dígito y el campo está vacío, regresar al campo anterior
        document.getElementById(`verificationCode${index - 1}`).focus();
      } else if (index < 5 && value !== '') {
        // Avanzar al siguiente campo de entrada cuando se ingresa un dígito válido
        document.getElementById(`verificationCode${index + 1}`).focus();
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'newPassword') {
      setNewPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (verificationCode.some((digit) => digit === '') || newPassword !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden o algún campo está vacío.');
      return;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    formData.passwordToSend = hashedPassword;
    formData.verificationCode = verificationCode.join('');

    try {
      const response = await fetch('http://localhost:9009/usuarios/gestion/login/cambiarContrasena', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Mostrar un mensaje, por ejemplo, usando la biblioteca swal
        swal({
          title: 'Contraseña cambiada',
          text: 'Contraseña cambiada con éxito.',
          icon: 'success',
          timer: '2000', // Mostrar el mensaje durante 2 segundos
          buttons: false,
        });

        // Esperar 2 segundos antes de redirigir y cerrar el modal
        setTimeout(() => {
          // Redirigir a '/'
          window.location.href = '/';
          closeModal(); // Cierra el modal después de enviar el formulario
        }, 2000);
      } else {
        // Manejar errores si la solicitud no fue exitosa
        console.error('Error en la solicitud:', response.status, response.statusText);
        swal({
          title: 'Codigo ingresado incorrecto',
          text: 'El código proporcionado no corresponde.',
          icon: 'error',
          timer: '3000',
          buttons: false,
        });
        setTimeout(() => {
          // Redirigir a '/'
          window.location.href = '/';
          closeModal(); // Cierra el modal después de enviar el formulario
        }, 2000);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error.message);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-4">Cambiar Contraseña</h2>
      <p className="text-center text-gray-600 mb-4">Ingrese el código de verificación</p> 
      <div className="h-4"></div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4 flex justify-center">
          {verificationCode.map((digit, index) => (
            <input
              type="text"
              id={`verificationCode${index}`}
              name={`verificationCode${index}`}
              key={index}
              className="w-10 h-10 border text-center rounded mx-1 px-2 py-1 focus:outline-none focus:ring focus:border-blue-500"
              value={digit}
              onChange={(e) => handleVerificationCodeChange(e, index)}
              maxLength="1"
            />
          ))}
        </div>
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-gray-800 font-medium">Nueva Contraseña:</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            value={newPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-800 font-medium">Confirmar Contraseña:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            value={confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-full focus:outline-none focus:ring focus:border-blue-700"
          >
            Cambiar Contraseña
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordResetModal;
