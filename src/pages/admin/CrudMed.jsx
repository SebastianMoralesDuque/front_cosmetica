import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import AssignScheduleModal from '../../components/admin/AssignScheduleModal'; // Ajusta la ruta según tu estructura de archivos

function CrudMed() {
    const [medicoData, setMedicoData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAssignScheduleModalOpen, setIsAssignScheduleModalOpen] = useState(false);
    const [selectedCedula, setSelectedCedula] = useState(null);
    const [detallesAEditar, setDetallesAEditar] = useState({
        email: '',
        telefono: '',
        cedula: '',
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:9009/medicos/gestion');
            if (response.ok) {
                const data = await response.json();
                setMedicoData(data);
            } else {
                console.error('Error al obtener datos de Trabajadors');
            }
        } catch (error) {
            console.error('Error en la solicitud para obtener datos de Trabajadors:', error);
        }
    };

    const handleEdit = (cedula, email, telefono) => {
        setDetallesAEditar({ cedula, email, telefono });
        setIsModalOpen(true);
    };

    const handleAssignSchedule = (cedula) => {
        setSelectedCedula(cedula); // Guarda la cédula del médico seleccionado
        setIsAssignScheduleModalOpen(true); // Abre el modal de asignación de horario
    };

    const closeAssignScheduleModal = () => {
        setIsAssignScheduleModalOpen(false);
    };

    const handleEditSubmit = async () => {
        try {
          // Primero, obtenemos los valores de email, telefono y cedula desde detallesAEditar
          const { email, telefono, cedula } = detallesAEditar;
      
          // Luego, creamos un objeto con los datos a editar
          const datosAEditar = {
            email,
            telefono,
            cedula,
          };
      
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
              timer: 1400,
              button: false,
            }).then(() => {
              // Cierra el modal
              
              closeModal();
              window.location.href = '/crudmed';

      
              // Puedes realizar cualquier acción adicional aquí si es necesario
            });
          } else {
            swal('Error', 'Hubo un problema al guardar los cambios. Por favor, inténtalo de nuevo.', 'error');
          }
        } catch (error) {
          console.error('Error:', error.message);
          swal('Error', 'Hubo un problema al comunicarse con el servidor', 'error');
        }
      };
      

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="p-8">
            <h2 className="text-2xl mb-6 text-center">Listado de Trabajadores</h2>
    
            <div>
                <Link to="/" className="mb-4 mr-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
                    ⇦
                </Link>
    
                <Link to="/createmedico" className="mb-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
                    Registrar Trabajador
                </Link>
            </div>
    
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Foto</th>
                        <th className="border border-gray-300 px-4 py-2">Cédula</th>
                        <th className="border border-gray-300 px-4 py-2">Nombre</th>
                        <th className="border border-gray-300 px-4 py-2">Email</th>
                        <th className="border border-gray-300 px-4 py-2">Teléfono</th>
                        <th className="border border-gray-300 px-4 py-2">Ciudad</th>
                        <th className="border border-gray-300 px-4 py-2">Especialidad</th>
                        <th className="border border-gray-300 px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {medicoData.map((medico, index) => (
                        <tr key={index} className="items-center">
                            <td className="px-4 py-8 flex items-center justify-center">
                                {medico[0].url_foto && <img src={medico[0].url_foto} alt="Foto del Trabajador" className="w-16 h-16" />}
                                {!medico[0].url_foto && "Sin foto"}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">{medico[0].cedula}</td>
                            <td className="border border-gray-300 px-4 py-2">{medico[0].nombre}</td>
                            <td className="border border-gray-300 px-4 py-2">{medico[0].email}</td>
                            <td className="border border-gray-300 px-4 py-2">{medico[0].telefono}</td>
                            <td className="border border-gray-300 px-4 py-2">{medico[0].ciudad}</td>
                            <td className="border border-gray-300 px-4 py-2">{medico[2]}</td>
                            <td className="text-center">
                                <div className="mx-auto">
                                    <button
                                        onClick={() => handleEdit(medico[0].cedula, medico[0].email, medico[0].telefono)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(medico[0].cedula, medico[2], {
                                            cedula: medico[0].cedula,
                                            nombre: medico[0].nombre,
                                            email: medico[0].email,
                                            contrasena: medico[0].contrasena,
                                            telefono: medico[0].telefono,
                                            ciudad: medico[0].ciudad,
                                        })}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                                    >
                                        Eliminar
                                    </button>
                                    <button
                                        onClick={() => handleAssignSchedule(medico[0].cedula)}
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Asignar Horario
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
    
            {/* Renderizar el modal de asignación de horario si está abierto */}
            {isAssignScheduleModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="modal-container">
                        <AssignScheduleModal
                            cedula={selectedCedula} // Pasa la cédula del médico seleccionado al modal
                            closeModal={closeAssignScheduleModal} // Pasa la función para cerrar el modal
                        />
                    </div>
                </div>
            )}
    
            {/* Renderizar el modal de edición si está abierto */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="modal-container">
        <div className="bg-white rounded shadow-lg w-3/4 mx-auto">
            <div className="modal-content py-4 text-left px-6">
                <h2 className="text-2xl mb-6">Editar Trabajador</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={detallesAEditar.email}
                            onChange={(e) => setDetallesAEditar({ ...detallesAEditar, email: e.target.value })}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">
                            Teléfono
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="telefono"
                            type="text"
                            placeholder="Teléfono"
                            value={detallesAEditar.telefono}
                            onChange={(e) => setDetallesAEditar({ ...detallesAEditar, telefono: e.target.value })}
                        />
                    </div>
                </form>
                <div className="text-right mt-12">
    <div className="flex">
        <button
            className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
            onClick={(e)=> {
                e.preventDefault();
                handleEditSubmit();
            }}
        >                  
            Guardar Cambios
        </button>
        <button
            onClick={closeModal}
            className="bg-gray-500 text-white px-4 py-2 rounded"
        >
            Cerrar
        </button>
    </div>
</div>

            </div>
        </div>
    </div>
</div>

            )}
        </div>
    );
    
}

export default CrudMed;
