import React, { useRef } from 'react';
import { citasPendientes } from '../../pages/doctor/Data'; // Importa los datos de citas pendientes

const CitasPendientesModal = ({ isOpen, onClose }) => {
    const modalRef = useRef(null);

    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose(); // Llama a la función onClose para cerrar el modal
        }
    };

    return (
        // Agrega un div para el overlay y un evento onClick para cerrar el modal haciendo clic fuera
        <div
            className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${isOpen ? '' : 'hidden'}`}
            onClick={handleOutsideClick}
        >
            <div className="bg-white rounded-lg p-8 max-h-96 overflow-y-auto" ref={modalRef}>
                <h2 className="text-2xl font-semibold text-center mb-4">Citas Pendientes</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border border-collapse">
                        <thead>
                            <tr>
                                <th className="border p-2">ID</th>
                                <th className="border p-2">Fecha Creación</th>
                                <th className="border p-2">Fecha Cita</th>
                                <th className="border p-2">Cliente</th>
                                <th className="border p-2">Estado</th>
                                <th className="border p-2">Motivo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {citasPendientes.map((cita) => (
                                <tr key={cita.id}>
                                    <td className="border p-2">{cita.id}</td>
                                    <td className="border p-2">{cita.fechaCreacion}</td>
                                    <td className="border p-2">{cita.fechaCita}</td>
                                    <td className="border p-2">{cita.paciente}</td>
                                    <td className="border p-2">{cita.estado}</td>
                                    <td className="border p-2">{cita.motivo}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="text-center mt-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-full focus:outline-none focus:ring focus:border-blue-700"
                        onClick={onClose}
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CitasPendientesModal;
