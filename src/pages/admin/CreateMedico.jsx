import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import swal from 'sweetalert';
import bcrypt from 'bcryptjs';
import { Link } from 'react-router-dom';
import EspecializacionService from '../../services/EspecializacionService';
import userRegisterService from '../../services/userRegisterService';

function CreateMedico() {
  const [formData, setFormData] = useState({
    cedula: '',
    nombre: '',
    contrasena: '',
    confirmarContrasena: '',
    email: '',
    telefono: '',
    ciudad: '',
    especialidad: '',
    fotoPerfil: null,
  });

  const [especialidades, setEspecialidades] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [errores, setErrores] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const especialidadesData = await EspecializacionService.getEspecialidades();
        setEspecialidades(especialidadesData);

        const ciudadesResponse = await fetch('https://api-colombia.com/api/v1/City');
        const ciudadesData = await ciudadesResponse.json();
        setCiudades(ciudadesData);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      setFormData(prevState => ({
        ...prevState,
        [name]: files[0],
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const validarFormulario = () => {
    let errores = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errores.email = 'Correo electrónico inválido';
    }

    if (formData.contrasena !== formData.confirmarContrasena) {
      errores.confirmarContrasena = 'Las contraseñas no coinciden';
    }

    setErrores(errores);
    return Object.keys(errores).length === 0;
  };

  const mostrarNotificacion = () => {
    swal('¡Éxito!', 'Trabajador agregado con éxito', 'success');
    setTimeout(() => {
      window.location.href = '/crudmed';
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validarFormulario()) {
      try {
        swal({
          title: 'Cargando...',
          text: 'Por favor, espera un momento.',
          icon: 'info',
          button: false,
        });

        const hashedPassword = await bcrypt.hash(formData.contrasena, 10);

        let imageUrl = null;
        if (formData.fotoPerfil) {
          imageUrl = await userRegisterService.uploadPhotoToCloudinary(formData.fotoPerfil, formData.cedula);
          console.log('Foto cargada en Cloudinary con éxito:', imageUrl);
        }

        const data1 = {
          cedula: formData.cedula,
          nombre: formData.nombre,
          contrasena: hashedPassword,
          email: formData.email,
          telefono: formData.telefono,
          ciudad: formData.ciudad,
          url_foto: imageUrl,
        };

        const responseUsuario = await fetch('http://localhost:9009/usuarios/gestion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data1),
        });

        const dataUsuario = await responseUsuario.json();

        const datosMedico = {
          cedula_usuario: formData.cedula,
          especializacion: formData.especialidad,
        };

        const responseMedico = await fetch('http://localhost:9009/medicos/crear', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(datosMedico),
        });

        const dataMedico = await responseMedico.json();

        swal.close();
        console.log('Respuesta del servidor (Registro de Usuario):', dataUsuario);
        console.log('Respuesta del servidor (Registro de Trabajador):', dataMedico);
        mostrarNotificacion();
      } catch (error) {
        swal.close();
        console.error('Error:', error);
      }
    }
  };

  return (

    <div className="p-8 bg-gray-100 min-h-screen">
      <Link to="/crudmed" className="mb-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
        ⇦
      </Link>
      <h2 className="text-2xl mb-6 text-center">Registrar Trabajador</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md max-w-lg mx-auto">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            name="fotoPerfil"
            id="fotoPerfil"
            onChange={handleInputChange}
            className="hidden"
          />
          <label htmlFor="fotoPerfil" className="bg-blue-500 text-white rounded-full p-2 cursor-pointer hover:bg-blue-600 mr-2 absolute top-0 right-0">
            +
          </label>
          <img src={formData.fotoPerfil ? URL.createObjectURL(formData.fotoPerfil) : "data:image/png;base64,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"} alt="Foto del Trabajador" className="w-full h-full rounded-full shadow-lg object-cover" />
        </div>

        <input
          type="text"
          name="cedula"
          placeholder="Cédula"
          onChange={handleInputChange}
          className="p-2 w-full border rounded"
          maxLength={10}
        />
        <input type="text" name="nombre" placeholder="Nombre" onChange={handleInputChange} className="p-2 w-full border rounded" />
        <input type="password" name="contrasena" placeholder="Contraseña" onChange={handleInputChange} className="p-2 w-full border rounded" />
        <input type="password" name="confirmarContrasena" placeholder="Confirmar Contraseña" onChange={handleInputChange} className="p-2 w-full border rounded" />
        {errores.confirmarContrasena && <p className="text-red-500">{errores.confirmarContrasena}</p>}
        <input type="email" name="email" placeholder="Correo Electrónico" onChange={handleInputChange} className="p-2 w-full border rounded" />
        {errores.email && <p className="text-red-500">{errores.email}</p>}
        <input type="tel" name="telefono" placeholder="Teléfono" onChange={handleInputChange} className="p-2 w-full border rounded" maxLength={10}/>

        <Select
          options={ciudades.map(ciudad => ({ value: ciudad.name, label: ciudad.name }))}
          isSearchable
          placeholder="Selecciona una ciudad"
          onChange={(selectedOption) => setFormData({ ...formData, ciudad: selectedOption.value })}
        />

        <select
          name="especialidad"
          onChange={handleInputChange}
          value={formData.especialidad}
          className="p-2 w-full border rounded"
        >
          <option value="" disabled>Elija una especialidad</option>
          {especialidades.map(especialidad => (
            <option key={especialidad.id} value={especialidad.nombre}>{especialidad.nombre}</option>
          ))}
        </select>

        <button type="submit" className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none w-full">
          Registrar Trabajador
        </button>
      </form>
    </div>
  );
}

export default CreateMedico;
