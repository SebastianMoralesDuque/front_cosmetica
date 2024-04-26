import React, { useState, useEffect } from 'react';
import DocCitasDelDia from '../../components/doctor/DocCitasDelDia';
import DocHistorialCitas from '../../components/doctor/DocHistorialCitas';
import DoctorDayOffModal from '../../components/doctor/DoctorDayOffModal';
import CitasPendientesModal from '../../components/doctor/CitasPendientesModal';

function HomeDoctor() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCitasPendientesModalOpen, setIsCitasPendientesModalOpen] = useState(false);
  const [doctorData, setDoctorData] = useState(null);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('medicoData'));
    if (storedData && storedData.userData && storedData.userData[0][1]) {
      setDoctorData(storedData);
    }
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openCitasPendientesModal = () => {
    setIsCitasPendientesModalOpen(true);
  };

  const closeCitasPendientesModal = () => {
    setIsCitasPendientesModalOpen(false);
  };

  const handleRegisterDayOff = (selectedDate) => {
    // Implementa la lógica de registro aquí
    console.log(`Se registró un día libre para la fecha: ${selectedDate}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        {doctorData && (
          <h1 className="text-3xl font-bold">{`Bienvenido, ${doctorData.userData[0][0].nombre}`}</h1>
        )}
        <div className="flex space-x-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-full focus:outline-none focus:ring focus:border-blue-700"
            onClick={openModal}
          >
            Registrar Día Libre
          </button>
        </div>
      </div>

      <DocCitasDelDia />
      <DocHistorialCitas />

      {isModalOpen && <DoctorDayOffModal closeModal={closeModal} />}
      <CitasPendientesModal isOpen={isCitasPendientesModalOpen} onClose={closeCitasPendientesModal} />
    </div>
  );
}

export default HomeDoctor;
