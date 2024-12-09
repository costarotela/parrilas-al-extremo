import { useState } from 'react';
import { FiUsers, FiInfo, FiHome, FiBriefcase } from 'react-icons/fi';

const RESERVATION_TYPES = {
  FAMILY: {
    id: 'family',
    name: 'Grupo Familiar',
    icon: FiHome,
    maxGuests: 15,
    description: 'Para familias y grupos pequeños hasta 15 personas'
  },
  TOURISM: {
    id: 'tourism',
    name: 'Grupo Turismo',
    icon: FiBriefcase,
    maxGuests: 100,
    description: 'Para grupos turísticos organizados hasta 100 personas'
  }
};

export default function GuestsSelection({ onSelect, availableSeats, selectedEvent }) {
  const [reservationType, setReservationType] = useState(null);
  const [guestsCount, setGuestsCount] = useState(1);

  const handleGuestsChange = (value) => {
    const maxGuests = reservationType === RESERVATION_TYPES.FAMILY.id 
      ? RESERVATION_TYPES.FAMILY.maxGuests 
      : Math.min(RESERVATION_TYPES.TOURISM.maxGuests, availableSeats);
    
    const newValue = Math.max(1, Math.min(maxGuests, value));
    setGuestsCount(newValue);
    
    onSelect?.({
      type: reservationType,
      count: newValue,
      maxGuests
    });
  };

  return (
    <div className="space-y-8">
      {/* Resumen del evento seleccionado */}
      {selectedEvent && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">{selectedEvent.event.name}</h3>
          <div className="text-gray-600">
            <p>Fecha: {new Date(selectedEvent.date.date).toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</p>
            <p>Horario: {selectedEvent.date.time}hs - {selectedEvent.date.type}</p>
            <p>Lugares disponibles: {selectedEvent.date.availableSeats}</p>
          </div>
        </div>
      )}

      {/* Selección de tipo de reserva */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700">Tipo de Reserva</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {Object.values(RESERVATION_TYPES).map((type) => {
            const Icon = type.icon;
            return (
              <div
                key={type.id}
                onClick={() => {
                  setReservationType(type.id);
                  setGuestsCount(1);
                }}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all
                  ${reservationType === type.id 
                    ? 'border-primary bg-primary/5' 
                    : 'border-gray-200 hover:border-primary/50'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    reservationType === type.id ? 'bg-primary text-white' : 'bg-gray-100'
                  }`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium">{type.name}</h4>
                    <p className="text-sm text-gray-500">{type.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selección de cantidad de comensales */}
      {reservationType && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">Cantidad de Comensales</h3>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleGuestsChange(guestsCount - 1)}
              className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center text-xl text-gray-600 hover:border-primary hover:text-primary transition-colors"
            >
              -
            </button>
            <div className="flex flex-col items-center min-w-[100px]">
              <input
                type="number"
                value={guestsCount}
                onChange={(e) => handleGuestsChange(parseInt(e.target.value) || 1)}
                min="1"
                max={reservationType === RESERVATION_TYPES.FAMILY.id 
                  ? RESERVATION_TYPES.FAMILY.maxGuests 
                  : Math.min(RESERVATION_TYPES.TOURISM.maxGuests, availableSeats)}
                className="w-20 text-center border-2 border-gray-200 rounded-md p-2 text-lg"
              />
              <span className="text-sm text-gray-500 mt-1">comensales</span>
            </div>
            <button
              onClick={() => handleGuestsChange(guestsCount + 1)}
              className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center text-xl text-gray-600 hover:border-primary hover:text-primary transition-colors"
            >
              +
            </button>
          </div>

          {/* Información de límites */}
          <div className="flex items-start gap-2 text-sm bg-gray-50 p-4 rounded-lg">
            <FiInfo className="mt-0.5 text-primary" />
            <div className="space-y-1">
              <p>Límite máximo: {
                reservationType === RESERVATION_TYPES.FAMILY.id 
                  ? `${RESERVATION_TYPES.FAMILY.maxGuests} personas`
                  : `${Math.min(RESERVATION_TYPES.TOURISM.maxGuests, availableSeats)} personas`
              }</p>
              {reservationType === RESERVATION_TYPES.TOURISM.id && (
                <p className="text-gray-500">
                  Para grupos turísticos grandes, la disponibilidad está sujeta a la capacidad del evento 
                  ({availableSeats} lugares disponibles)
                </p>
              )}
            </div>
          </div>

          {/* Resumen de costos */}
          <div className="mt-6 p-4 bg-primary/5 rounded-lg">
            <h4 className="font-medium text-primary mb-2">Resumen de Reserva</h4>
            <div className="space-y-2 text-gray-600">
              <p>Tipo: {RESERVATION_TYPES[reservationType.toUpperCase()].name}</p>
              <p>Comensales: {guestsCount}</p>
              <p className="font-medium">Total estimado: ${selectedEvent?.date.price * guestsCount}</p>
              <p className="text-sm text-gray-500">*Precio base por persona sin bebidas</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
