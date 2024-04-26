import React, { useState } from 'react';

function HistorialConsultasMed() {
    const consultas = Array(100).fill().map((_, index) => ({
        id: index + 1,
        fecha: `2023-09-${(index % 30) + 1}`.padStart(10, '0'),
        paciente: `Paciente ${index + 1}`,
        medico: `Dr. Trabajador ${index % 10 + 1}`
    }));

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(consultas.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const displayedItems = consultas.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h2 className="text-2xl mb-6 text-center">Historial de Consultas Médicas</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow-md text-sm divide-x divide-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-2 px-4 border-b border-gray-300 text-center">N°</th>
                            <th className="py-2 px-4 border-b border-gray-300">Fecha de Atención</th>
                            <th className="py-2 px-4 border-b border-gray-300">Cliente</th>
                            <th className="py-2 px-4 border-b border-gray-300">Trabajador</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedItems.map(consulta => (
                            <tr key={consulta.id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b border-gray-300 text-center">{consulta.id}</td>
                                <td className="py-2 px-4 border-b border-gray-300">{consulta.fecha}</td>
                                <td className="py-2 px-4 border-b border-gray-300">{consulta.paciente}</td>
                                <td className="py-2 px-4 border-b border-gray-300">{consulta.medico}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-4 flex justify-between">
                    <button onClick={handlePrevPage} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" disabled={currentPage === 1}>Anterior</button>
                    <span>Página {currentPage} de {totalPages}</span>
                    <button onClick={handleNextPage} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" disabled={currentPage === totalPages}>Siguiente</button>
                </div>
            </div>
        </div>
    );
} 

export default HistorialConsultasMed;
