import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import EspecializacionService from '../../services/EspecializacionService';
import swal from 'sweetalert';

const AgendarCitaModal = ({ modalVisible, closeModal, handleAgendarCita }) => {
  const [formularioCita, setFormularioCita] = useState({
    especializacion: '',
    medico: '',
    fecha: null,
    hora: '',
    motivo: '',
  });

  const [especializaciones, setEspecializaciones] = useState([]);
  const [medicosDisponibles, setMedicosDisponibles] = useState({});
  const [horariosMedico, setHorariosMedico] = useState([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const especialidadesData = await EspecializacionService.getEspecialidades();
        setEspecializaciones(especialidadesData);
      } catch (error) {
        console.error('Error al obtener especialidades:', error);
      }
    };
    fetchData();
  }, []);

  const handleEspecializacionChange = async (e) => {
    const especializacionSeleccionada = e.target.value;

    console.log(JSON.parse(localStorage.getItem('userData')).userData[0][1].cedula_usuario);

    try {
      const url = `http://localhost:9009/medicos/gestion/medicosPorEspecializacion?especializacion=${encodeURIComponent(especializacionSeleccionada)}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMedicosDisponibles({ [especializacionSeleccionada]: data });
      } else {
        console.error('Error al obtener Trabajadors por especialización:', response.status);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }

    setFormularioCita({
      ...formularioCita,
      especializacion: especializacionSeleccionada,
      medico: '',
    });
  };

  const handleFormularioChange = (e) => {
    const { name, value } = e.target;
    setFormularioCita({
      ...formularioCita,
      [name]: value,
    });
  };



  const handleFechaChange = async (date) => {
    setFechaSeleccionada(date);

    if (formularioCita.medico) {
      // Realizar la petición al backend para obtener las horas disponibles
      try {
        const url = `http://localhost:9009/citas/gestion/horas_disponibles`;
        const data = {
          cedula_medico: medicosDisponibles[formularioCita.especializacion]?.[0]?.[0]?.cedula,
          fecha_cita: date.toISOString().split('T')[0], // Formatear la fecha a 'yyyy-MM-dd'
        };
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const horarios = await response.json();
          setHorariosMedico(horarios);
        } else {
          console.error('Error al obtener las horas disponibles:', response.status);
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    }
  };

  const handleSubmitFormulario = async (e) => {
    e.preventDefault();
  
    if (
      formularioCita.especializacion &&
      formularioCita.medico &&
      fechaSeleccionada &&
      formularioCita.hora &&
      formularioCita.motivo
    ) {
      try {
        swal({
          title: "Agendando Cita",
          text: "Por favor, espera...",
          icon: "info",
          buttons: false,
          closeOnClickOutside: false,
          closeOnEsc: false,
        });
  
        const url = 'http://localhost:9009/citas/gestion';
        const cedulaPaciente = JSON.parse(localStorage.getItem('userData')).userData[0][1].cedula_usuario;
        const data = {
          fecha_cita: fechaSeleccionada.toISOString().split('T')[0],
          hora_cita: formularioCita.hora,
          cedula_medico: medicosDisponibles[formularioCita.especializacion]?.[0]?.[0]?.cedula,
          cedula_paciente: cedulaPaciente,
          estado: 'Agendada',
          motivo: formularioCita.motivo,
        };
  
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        if (response.ok) {
          swal("Cita Agendada", "¡Cita agendada con éxito!", "success");
          
          closeModal();
          setTimeout(() => {
            window.location.reload();
          }, 1600);
  
          // Limpia los campos restableciendo el estado del formulario
          setFormularioCita({
            especializacion: '',
            medico: '',
            fecha: null,
            hora: '',
            motivo: '',
          });
        } else {
          console.error('Error al agendar la cita:', response.status);
          swal("Error", "Hubo un problema al agendar la cita.", "error");
        }
      } catch (error) {
        console.error('Error de red:', error);
        swal("Error", "Hubo un problema al agendar la cita.", "error");
      }
    } else {
      swal("Campos Incompletos", "Por favor, completa todos los campos.", "warning");
    }
  };
  
  useEffect(() => {
    const handleCloseModalOnOutsideClick = (e) => {
      if (modalVisible && e.target.classList.contains('modal-overlay')) {
        closeModal();
      }
    };

    window.addEventListener('click', handleCloseModalOnOutsideClick);

    return () => {
      window.removeEventListener('click', handleCloseModalOnOutsideClick);
    };
  }, [modalVisible, closeModal]);

  console.log(medicosDisponibles[formularioCita.especializacion]?.[0]?.[0]?.cedula);

  return (
    modalVisible && (
      <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-700 bg-opacity-50 modal-overlay">
        <div className="bg-white p-4 rounded shadow-lg w-96">
          <h2 className="text-lg font-semibold mb-4">Agendar Cita</h2>
          <form onSubmit={handleSubmitFormulario}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Especialización:
              </label>
              <select
                name="especializacion"
                className="w-full border border-gray-300 rounded py-2 px-3"
                onChange={handleEspecializacionChange}
                value={formularioCita.especializacion}
              >
                <option value="">Seleccionar Especialización</option>
                {especializaciones.map((esp) => (
                  <option key={esp.id} value={esp.nombre}>
                    {esp.nombre}
                  </option>
                ))}
              </select>
            </div>
            {formularioCita.especializacion && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Trabajador:
                </label>
                <select
                  name="medico"
                  className="w-full border border-gray-300 rounded py-2 px-3"
                  onChange={handleFormularioChange}
                  value={formularioCita.medico}
                >
                  <option value="">Seleccionar Trabajador</option>
                  {medicosDisponibles[formularioCita.especializacion]?.map((medico) => (
                    <option key={medico[0]} value={medico[0]}>
                      {medico[0].nombre}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {formularioCita.medico && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Fecha de la Cita:
                </label>
                <DatePicker
                  selected={fechaSeleccionada}
                  onChange={handleFechaChange}
                  minDate={new Date()}
                  className="w-full border border-gray-300 rounded py-2 px-3"
                />
              </div>
            )}
            {formularioCita.medico && fechaSeleccionada && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Hora de la Cita:
                </label>
                <select
                  name="hora"
                  className="w-full border border-gray-300 rounded py-2 px-3"
                  onChange={handleFormularioChange}
                  value={formularioCita.hora}
                >
                  <option value="">Seleccionar Hora</option>
                  {horariosMedico.map((hora) => (
                    <option key={hora} value={hora}>
                      {hora}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Motivo para Cita:
              </label>
              <textarea
                name="motivo"
                className="w-full border border-gray-300 rounded py-2 px-3 h-32"
                onChange={handleFormularioChange}
                value={formularioCita.motivo}
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Agendar Cita
              </button>
              <button
                type="button"
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ml-2"
                onClick={closeModal}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );  
};


export default AgendarCitaModal;
