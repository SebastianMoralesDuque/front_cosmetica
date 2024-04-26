import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Servicios from './pages/Servicios';
import Contacto from './pages/Contacto';
import HomePatient from './pages/patient/HomePatient';
import HistorialMedico from './pages/patient/HistorialMedico';
import Pqrs from './pages/patient/Pqrs';
import PatientNavbar from './components/patient/PatientNavbar';
import DoctorNavbar from './components/doctor/DoctorNavbar';
import AdminNavbar from './components/admin/AdminNavbar';
import Navbar from './components/Nabvar';
import HomeAdmin from './pages/admin/HomeAdmin';
import CreateMedico from './pages/admin/CreateMedico';
import PqrsAdmin from './pages/admin/PqrsAdmin';
import HistorialConsultasMed from './pages/admin/HistorialConsultasMed';
import CrudMed from './pages/admin/CrudMed';
import HomeDoctor from './pages/doctor/HomeDoctor';
import AtenderCita from './pages/doctor/AtenderCita';
import NotFoundPage from './pages/NotFoundPage';
import MaintenancePage from './pages/MaintenancePage';

const AppRoutes = () => {
  // Obtener el tipo de usuario almacenado en localStorage
  const userType = localStorage.getItem('');
  // Estado para forzar la actualización de las rutas al cambiar el tipo de usuario
  const [userTypeState, setUserTypeState] = useState(userType);

  // Función para redirigir a la página de mantenimiento si es necesario
  const redirectToMaintenance = () => <Navigate to="/maintenancePage" />;

  useEffect(() => {
    // Obtener el tipo de usuario almacenado en localStorage
    const storedUserType = localStorage.getItem('userType');

    // Actualizar el estado con el tipo de usuario
    setUserTypeState(storedUserType);
  }, []);

  console.log(localStorage.getItem(''));
  return (

    <Router>

      {/* Renderizar el Navbar según el tipo de usuario o Navbar por defecto */}
      {userTypeState === 'medico' && <DoctorNavbar />}
      {userTypeState === 'paciente' && <PatientNavbar />}
      {userTypeState === 'admin' && <AdminNavbar />}
      {!userTypeState && <Navbar />}

      {/* Lógica condicional para renderizar el componente Home correspondiente */}
      {userTypeState === 'paciente' ? (
        <Routes>
          <Route path="/" element={<HomePatient />} />
          <Route path="/historialMedico" element={<HistorialMedico />} />
          <Route path="/pqrs" element={<Pqrs />} />
          <Route path="*" element={<Navigate to="/notFoundPage" />} />
        </Routes>
      ) : userTypeState === 'medico' ? (
        <Routes>
          <Route path="/" element={<HomeDoctor />} />
          <Route path="/atenderCita/:citaId/:cedulaPaciente" element={<AtenderCita />} />
          <Route path="*" element={<Navigate to="/notFoundPage" />} />
        </Routes>
      ) : userTypeState === 'admin' ? (
        <Routes>
          <Route path="/" element={<HomeAdmin />} />
          <Route path="/crudmed" element={<CrudMed />} />
          <Route path="/createmedico" element={<CreateMedico />} />
          <Route path="/pqrsadmin" element={<PqrsAdmin />} />
          <Route path="/historialconsultasmed" element={<HistorialConsultasMed />} />
          <Route path="*" element={<Navigate to="/notFoundPage" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/maintenancePage" element={<MaintenancePage />} />
          <Route path="/notFoundPage" element={<NotFoundPage />} />
          <Route path="/maintenance" element={redirectToMaintenance} />

          {/* Redirección a NotFoundPage en caso de no encontrar la página */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      )}

      {/* Botón para recargar la página y borrar localStorage */}
    </Router>
  );
};

export default AppRoutes;
