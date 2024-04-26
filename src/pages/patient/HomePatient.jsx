import React, { useState, useEffect } from 'react';
import Pagination from '../../components/patient/Pagination';
import { citasPendientes, citasAnteriores } from './Data';
import AgendarCitaModal from '../../components/patient/AgendarCitaModal';
import PqrModal from '../../components/patient/PqrModal'; // Importa el nuevo componente
import 'react-datepicker/dist/react-datepicker.css';
import { obtenerCitasProximas, obtenerCitasAnteriores } from '../../services/citasService';

function HomePatient() {
  const elementosPorPagina = 3;
  const [paginaPendientes, setPaginaPendientes] = useState(0);
  const [paginaAnteriores, setPaginaAnteriores] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [pqrModalVisible, setPqrModalVisible] = useState(false); // Estado para mostrar el modal PQR
  const [selectedCitaId, setSelectedCitaId] = useState(null); // Estado para almacenar el ID de la cita seleccionada
  const [formularioCita, setFormularioCita] = useState({
    especializacion: '',
    medico: '',
    fecha: null,
    hora: '',
    motivo: '',
  });
  const [especializaciones] = useState([
    'Especialización 1',
    'Especialización 2',
    // Agrega más especializaciones según tus necesidades
  ]);

  const [medicosDisponibles, setMedicosDisponibles] = useState({
    'Especialización 1': [
      { nombre: 'Dr. Juan Pérez', horarios: ['9:00 AM - 11:00 AM', '2:00 PM - 4:00 PM'] },
      // Agrega más Trabajadors y sus horarios según la especialización
    ],
    'Especialización 2': [
      { nombre: 'Dra. María González', horarios: ['10:00 AM - 12:00 PM', '3:00 PM - 5:00 PM'] },
      // Agrega más Trabajadors y sus horarios según la especialización
    ],
    // Agrega más especializaciones y sus Trabajadors disponibles
  });

  const [horariosMedico, setHorariosMedico] = useState([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null); // Estado para la fecha seleccionada

  const paginarCitasPendientes = (data) => {
    const indiceInicio = paginaPendientes * elementosPorPagina;
    return data.slice(indiceInicio, indiceInicio + elementosPorPagina);
  };

  const paginarCitasAnteriores = (data) => {
    const indiceInicio = paginaAnteriores * elementosPorPagina;
    return data.slice(indiceInicio, indiceInicio + elementosPorPagina);
  };

  const cambiarPaginaPendientes = (data) => {
    setPaginaPendientes(data.selected);
  };

  const cambiarPaginaAnteriores = (data) => {
    setPaginaAnteriores(data.selected);
  };

  const handleAgendarCitaClick = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleAgendarCita = (cita) => {
    // Aquí puedes agregar la lógica para guardar la cita
    alert("Cita agendada con éxito");
    setTimeout(() => {
      window.location.reload();
    }, 1600);
  };

  const handleGenerarPQRClick = (citaId) => {
    setSelectedCitaId(citaId);
    setPqrModalVisible(true);
  };

  const handleFechaChange = (date) => {
    setFechaSeleccionada(date);
    setFormularioCita({
      ...formularioCita,
      fecha: date,
    });
    // Obtener los horarios disponibles del Trabajador seleccionado para la fecha seleccionada
    const medicoSeleccionado = formularioCita.medico;
    if (medicoSeleccionado) {
      const horarios = medicosDisponibles[formularioCita.especializacion].find(
        (medico) => medico.nombre === medicoSeleccionado
      ).horarios;
      setHorariosMedico(horarios);
    }
  };

  const handleFormularioChange = (e) => {
    const { name, value } = e.target;
    setFormularioCita({
      ...formularioCita,
      [name]: value,
    });
    // Si se cambia la especialización o el Trabajador, resetear la fecha y los horarios
    if (name === 'especializacion' || name === 'medico') {
      setFechaSeleccionada(null);
      setHorariosMedico([]);
    }
  };

  const user = JSON.parse(localStorage.getItem('userData')) || null;

  // Estado para almacenar las citas próximas
  const [citasProximas, setCitasProximas] = useState([]);
  const [citasAnteriores, setCitasAnteriores] = useState([]);

  // Función para obtener las citas próximas
  const fetchCitasProximas = async () => {
    try {
      const citas = await obtenerCitasProximas(); // Llama al servicio para obtener las citas próximas
      setCitasProximas(citas);
    } catch (error) {
      console.error('Error al obtener las citas próximas:', error);
    }
  };
  const fetchCitasAnteriores = async () => {
    try {
      const citas = await obtenerCitasAnteriores(); // Llama al servicio para obtener las citas próximas
      setCitasAnteriores(citas);
    } catch (error) {
      console.error('Error al obtener las citas próximas:', error);
    }
  };

  // Llama a la función para obtener las citas próximas cuando el componente se monta
  useEffect(() => {
    fetchCitasProximas();
    fetchCitasAnteriores();
  }, []);


  const cancelarCita = (idCita) => {
    fetch(`http://localhost:9009/citas/gestion/cancelarCita?idCita=${idCita}`, {
      method: 'POST',
    })
      .then((response) => {
        if (response.ok) {
          // Si la cancelación es exitosa, muestra un SweetAlert de éxito
          swal({
            title: 'Cita Cancelada',
            text: 'La cita se ha cancelado con éxito.',
            icon: 'success',
          });

          // Redirige o actualiza la página después de un tiempo para refrescar los datos
          setTimeout(() => {
            window.location.reload();
          }, 1600);
        } else {
          // Maneja el error si la cancelación falla
          swal({
            title: 'Error al cancelar la cita',
            text: 'Hubo un error al cancelar la cita. Inténtalo de nuevo más tarde.',
            icon: 'error',
          });
        }
      })
      .catch((error) => {
        // Maneja el error en caso de un problema en la solicitud
        swal({
          title: 'Error en la solicitud',
          text: 'Hubo un error en la solicitud para cancelar la cita. Inténtalo de nuevo más tarde.',
          icon: 'error',
        });
        console.error('Error en la solicitud para cancelar la cita:', error);
      });
  };

  const confirmarCancelacionCita = (idCita) => {
    swal({
      title: "¿Está seguro de que desea cancelar esta cita?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      buttons: {
        cancel: "Cancelar",
        confirm: "Sí, cancelar cita",
      },
    }).then((confirmacion) => {
      if (confirmacion) {
        // Si el usuario confirma la cancelación, procede a cancelar la cita
        cancelarCita(idCita);
        swal("Cita Cancelada", "La cita se ha cancelado con éxito.", "success");
      }
    });
  };



  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <div className="flex justify-between items-center bg-blue-100 p-4 rounded-lg">
          <div>
            <h1 className="text-2xl font-bold">
              ¡Bienvenid@, {user && user.userData && user.userData[0] && user.userData[0][0] && user.userData[0][0].nombre}!
            </h1>
            <div className="text-sm">
              <p className="text-gray-600">Número de Identificación: {user && user.userData && user.userData[0] && user.userData[0][0] && user.userData[0][0].cedula}</p>
              <p className="text-gray-600">Ciudad de Residencia: {user && user.userData && user.userData[0] && user.userData[0][0] && user.userData[0][0].ciudad}</p>
            </div>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
            onClick={handleAgendarCitaClick}
          >
            Agendar Cita
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2 text-center">Citas Pendientes</h2>
      </div>
      <div className="bg-blue-100 p-4 rounded shadow mb-4 overflow-x-auto">
        <ul className="flex justify-center">
          {citasProximas.length === 0 ? (
            <p>No hay citas pendientes en este momento.</p>
          ) : (
            paginarCitasPendientes(citasProximas).map((cita) => (
              <li key={cita.id} className="mr-4">
                <div className="bg-white p-4 rounded shadow">
                  <strong>ID: {cita.id}</strong><br />
                  <span className="block">Fecha de Creación: {cita.fechaCreacion}</span>
                  <span className="block">Fecha de Cita: {cita.fechaCita}</span>
                  <span className="block">Trabajador: {cita.cedulaMedico}</span>
                  <span className="block">Cliente: {cita.cedulaPaciente}</span>
                  <span className="block">Estado: {cita.estado}</span>
                  <span className="block">Motivo: {cita.motivo}</span>

                  {/* Botón para cancelar la cita */}
                  <button
                    className="bg-red-500 hover-bg-red-600 text-white font-bold py-2 px-4 rounded mt-2"
                    onClick={() => confirmarCancelacionCita(cita.id)} // Llama a la función de confirmación
                  >
                    Cancelar Cita
                  </button>

                </div>
              </li>
            ))
          )}
        </ul>

        <hr />
      </div>
      <Pagination
        pageCount={Math.ceil(citasProximas.length / elementosPorPagina)}
        onPageChange={cambiarPaginaPendientes}
      />


      <div className="text-center mt-4">
        <hr className="border-t-2 border-gray-300" />
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2 text-center">Citas Anteriores</h2>
      </div>
      <div className="bg-blue-100 p-4 rounded shadow mb-4 overflow-x-auto">
        <ul className="flex justify-center">
          {paginarCitasAnteriores(citasAnteriores).map((cita) => (
            <li key={cita.id} className="mr-4">
              <div className="bg-white p-4 rounded shadow">
                <strong>ID: {cita.id}</strong><br />
                <span className="block">Fecha de Creación: {cita.fechaCreacion}</span>
                <span className="block">Fecha de Cita: {cita.fechaCita}</span>
                <span className="block">Trabajador: {cita.cedulaMedico}</span>
                <span className="block">Cliente: {cita.cedulaPaciente}</span>
                <span className="block">Estado: {cita.estado}</span>
                <span className="block">Motivo: {cita.motivo}</span>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2"
                  onClick={() => handleGenerarPQRClick(cita.id)}
                >
                  Generar PQR
                </button>
              </div>
            </li>
          ))}
        </ul>
        <hr />
      </div>
      <Pagination
        pageCount={Math.ceil(citasAnteriores.length / elementosPorPagina)}
        onPageChange={cambiarPaginaAnteriores}
      />


      <AgendarCitaModal
        modalVisible={modalVisible}
        closeModal={closeModal}
        handleAgendarCita={handleAgendarCita}
        formularioCita={formularioCita}
        especializaciones={especializaciones}
        medicosDisponibles={medicosDisponibles}
        fechaSeleccionada={fechaSeleccionada}
        horariosMedico={horariosMedico}
        handleFormularioChange={handleFormularioChange}
        handleFechaChange={handleFechaChange}
      />

      {/* Agregar el modal PQR */}
      {pqrModalVisible && (
        <PqrModal citaId={selectedCitaId} closeModal={() => setPqrModalVisible(false)} />
      )}
    </div>
  );
}

export default HomePatient;
