import React, { useState, useEffect, useRef } from 'react';

function ConversacionModal({ pqr, closeModal }) {
  const [mensajeNuevo, setMensajeNuevo] = useState('');
  const [conversacion, setConversacion] = useState([]);

  const conversacionRef = useRef(null);

  const conversacionEjemplo = [
    {
      autor: 'Paciente',
      mensaje: 'Hola, necesito ayuda con mi PQR.',
    },
    {
      autor: 'Administrador',
      mensaje: 'Hola, ¿en qué puedo ayudarte?',
    },
    {
      autor: 'Paciente',
      mensaje: 'Tengo un problema con mi cita médica.',
    },
    {
      autor: 'Administrador',
      mensaje: 'Entiendo, ¿puedes proporcionarme más detalles?',
    },
  ];

  const enviarMensaje = () => {
    if (mensajeNuevo.trim() === '') return;
    const nuevoMensaje = {
      autor: 'Paciente',
      mensaje: mensajeNuevo,
    };
    setConversacion([...conversacion, nuevoMensaje]);
    setMensajeNuevo('');
  };

  const handleCloseModal = () => {
    closeModal();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      // Verifica si se hizo clic en el fondo oscuro del modal
      handleCloseModal();
    }
  };

  useEffect(() => {
    setConversacion(conversacionEjemplo);
  }, [pqr]);

  const scrollChatToBottom = () => {
    if (conversacionRef.current) {
      conversacionRef.current.scrollTop = conversacionRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollChatToBottom();
  }, [conversacion]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" onClick={handleBackdropClick}>
      <div className="bg-white w-3/4 p-4 rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-semibold mb-4">Conversación</h2>
        <div className="bg-gray-100 p-4 rounded-lg h-80 overflow-y-auto" ref={conversacionRef}>
          {conversacion.map((mensaje, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-start mb-2">
                <div className="w-10 h-10 mr-4 bg-blue-500 text-white flex items-center justify-center rounded-full">
                  {mensaje.autor === 'Paciente' ? 'U' : 'A'}
                </div>
                <div className={mensaje.autor === 'Paciente' ? 'text-blue-600' : 'text-gray-600'}>
                  {mensaje.autor}:
                </div>
              </div>
              <div className="bg-white border rounded-lg p-2 shadow-sm">
                {mensaje.mensaje}
              </div>
            </div>
          ))}
        </div>
        <div className="flex mt-4">
          <input
            type="text"
            className="border rounded-l-lg p-2 w-full"
            placeholder="Escribe tu mensaje..."
            value={mensajeNuevo}
            onChange={(e) => setMensajeNuevo(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-lg"
            onClick={enviarMensaje}
          >
            Enviar
          </button>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={handleCloseModal}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default ConversacionModal;
