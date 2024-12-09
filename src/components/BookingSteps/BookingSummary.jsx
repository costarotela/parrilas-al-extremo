import { useState } from 'react';
import { FiDownload, FiMail, FiCheck } from 'react-icons/fi';

export default function BookingSummary({ bookingData }) {
  const [successMessage, setSuccessMessage] = useState('');

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDownloadPDF = () => {
    setSuccessMessage('PDF generado exitosamente');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleSendEmail = () => {
    const subject = `Reserva - ${bookingData.event.name}`;
    const body = `
      Resumen de su reserva:
      
      Evento: ${bookingData.event.name}
      Fecha: ${formatDate(bookingData.date.date)}
      Horario: ${bookingData.date.time}
      Comensales: ${bookingData.guests.count}
      Total: $${bookingData.date.price * bookingData.guests.count}
    `;

    window.location.href = `mailto:${bookingData.personalInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    setSuccessMessage('Email preparado para envío');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Resumen de la reserva */}
      <div id="booking-summary" className="bg-gray-50 p-6 rounded-lg space-y-6">
        <h3 className="text-xl font-semibold text-primary">Resumen de su Reserva</h3>
        
        {/* Detalles del evento */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3">Detalles del Evento</h4>
            <div className="space-y-2 text-gray-600">
              <p><span className="font-medium">Evento:</span> {bookingData.event.name}</p>
              <p><span className="font-medium">Fecha:</span> {formatDate(bookingData.date.date)}</p>
              <p><span className="font-medium">Horario:</span> {bookingData.date.time}</p>
              <p><span className="font-medium">Ubicación:</span> {bookingData.event.location}</p>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Detalles de la Reserva</h4>
            <div className="space-y-2 text-gray-600">
              <p><span className="font-medium">Comensales:</span> {bookingData.guests.count}</p>
              <p><span className="font-medium">Tipo:</span> {bookingData.guests.type === 'family' ? 'Grupo Familiar' : 'Grupo Turismo'}</p>
              <p><span className="font-medium">Precio por persona:</span> ${bookingData.date.price}</p>
              <p className="text-lg font-medium text-primary">
                Total: ${bookingData.date.price * bookingData.guests.count}
              </p>
            </div>
          </div>
        </div>

        {/* Información personal */}
        <div className="border-t border-gray-200 pt-4">
          <h4 className="font-medium mb-3">Información de Contacto</h4>
          <div className="grid md:grid-cols-2 gap-4 text-gray-600">
            <p><span className="font-medium">Nombre:</span> {bookingData.personalInfo.fullName}</p>
            <p><span className="font-medium">Email:</span> {bookingData.personalInfo.email}</p>
            <p><span className="font-medium">Teléfono:</span> {bookingData.personalInfo.phone}</p>
            <p><span className="font-medium">Nacionalidad:</span> {bookingData.personalInfo.nationality}</p>
          </div>
        </div>

        {/* Preferencias dietéticas */}
        {bookingData.dietaryPreferences && (
          <div className="border-t border-gray-200 pt-4">
            <h4 className="font-medium mb-3">Preferencias Dietéticas</h4>
            <div className="space-y-2 text-gray-600">
              {bookingData.dietaryPreferences.diets?.length > 0 && (
                <p><span className="font-medium">Restricciones:</span> {bookingData.dietaryPreferences.diets.join(', ')}</p>
              )}
              {bookingData.dietaryPreferences.allergies?.length > 0 && (
                <p><span className="font-medium">Alergias:</span> {bookingData.dietaryPreferences.allergies.join(', ')}</p>
              )}
              {bookingData.dietaryPreferences.specialRequests && (
                <p><span className="font-medium">Solicitudes especiales:</span> {bookingData.dietaryPreferences.specialRequests}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Botones de acción */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleDownloadPDF}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          <FiDownload />
          Descargar PDF
        </button>
        <button
          onClick={handleSendEmail}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-md hover:bg-primary/5"
        >
          <FiMail />
          Enviar por Email
        </button>
      </div>

      {/* Mensaje de éxito */}
      {successMessage && (
        <div className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-lg">
          <FiCheck />
          {successMessage}
        </div>
      )}

      {/* Términos y condiciones */}
      <div className="text-sm text-gray-500 space-y-1">
        <p>* Los precios incluyen IVA pero no incluyen bebidas.</p>
        <p>* La reserva está sujeta a confirmación según disponibilidad.</p>
        <p>* Política de cancelación: Hasta 48 horas antes del evento.</p>
      </div>
    </div>
  );
}
