import React, { useState } from 'react';

function PqrsAdmin() {
    // Ejemplo de datos de PQRS
    const [pqrsList, setPqrsList] = useState([
        {
            id: 1,
            paciente: 'Juan Pérez',
            consultaFecha: '2023-09-10',
            detalleConsulta: 'Consulta sobre dolor de cabeza.',
            detallePQRS: 'No recibí la medicación adecuada.',
            estado: 'noRespondida',
            fechaCreacion: '2023-09-11'
        },
        {
            id: 2,
            paciente: 'María Rodríguez',
            consultaFecha: '2023-09-15',
            detalleConsulta: 'Consulta sobre alergias.',
            detallePQRS: 'El Trabajador no revisó mi historial de alergias.',
            estado: 'enProceso',
            fechaCreacion: '2023-09-16'
        },
        {
            id: 3,
            paciente: 'Carlos Sánchez',
            consultaFecha: '2023-09-18',
            detalleConsulta: 'Consulta sobre problemas digestivos.',
            detallePQRS: 'La consulta fue muy rápida.',
            estado: 'respondida',
            fechaCreacion: '2023-09-19'
        },
        // ... puedes agregar más ejemplos aquí
    ]);

    const handleResponder = (id) => {
        console.log(`Responder a PQRS con ID: ${id}`);
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h2 className="text-2xl mb-6 text-center">Gestión de PQRS</h2>
            <div className="bg-white p-6 rounded shadow-md max-w-full mx-auto overflow-x-auto">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">ID</th>
                            <th className="border px-4 py-2">Cliente</th>
                            <th className="border px-4 py-2">Fecha Atencion</th>
                            <th className="border px-4 py-2">Detalle Atencion</th>
                            <th className="border px-4 py-2">Detalle PQRS</th>
                            <th className="border px-4 py-2">Fecha Creación PQRS</th>
                            <th className="border px-4 py-2">Estado</th>
                            <th className="border px-4 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pqrsList.map(pqrs => (
                            <tr key={pqrs.id}>
                                <td className="border px-4 py-2">{pqrs.id}</td>
                                <td className="border px-4 py-2">{pqrs.paciente}</td>
                                <td className="border px-4 py-2">{pqrs.consultaFecha}</td>
                                <td className="border px-4 py-2">{pqrs.detalleConsulta}</td>
                                <td className="border px-4 py-2">{pqrs.detallePQRS}</td>
                                <td className="border px-4 py-2">{pqrs.fechaCreacion}</td>
                                <td className="border px-4 py-2">
                                    <span className={`inline-block w-4 h-4 mr-2 rounded-full ${pqrs.estado === 'respondida' ? 'bg-green-500' : pqrs.estado === 'enProceso' ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
                                    {pqrs.estado === 'respondida' ? 'Respondida' : pqrs.estado === 'enProceso' ? 'En Proceso' : 'No Respondida'}
                                </td>
                                <td className="border px-4 py-2">
                                    <button onClick={() => handleResponder(pqrs.id)} className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
                                        Responder
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    ); 
}

export default PqrsAdmin;
