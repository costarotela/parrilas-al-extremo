import { useState } from 'react';
import { FiMapPin, FiCalendar, FiClock, FiUsers, FiDollarSign } from 'react-icons/fi';

// Datos de ejemplo de eventos
const availableEvents = [
  {
    id: 1,
    name: "Cena en los Alpes",
    location: "Alpes Suizos",
    image: "https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&q=80",
    dates: [
      {
        date: "2023-12-16",
        time: "19:00",
        price: 180,
        availableSeats: 100,
        type: "Cena"
      },
      {
        date: "2023-12-30",
        time: "19:00",
        price: 180,
        availableSeats: 100,
        type: "Cena"
      }
    ],
    description: "Una experiencia gastronómica única entre picos nevados",
    maxGuests: 100,
    menuPrice: 180
  },
  {
    id: 2,
    name: "Almuerzo en el Bosque",
    location: "Bosque Negro",
    image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&q=80",
    dates: [
      {
        date: "2024-01-13",
        time: "13:00",
        price: 160,
        availableSeats: 100,
        type: "Almuerzo"
      },
      {
        date: "2024-01-27",
        time: "13:00",
        price: 160,
        availableSeats: 100,
        type: "Almuerzo"
      }
    ],
    description: "Descubre los sabores del bosque en un entorno mágico",
    maxGuests: 100,
    menuPrice: 160
  }
];

export default function DateSelection({ onSelect }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    setSelectedDate(null);
    onSelect?.({ event, date: null });
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    onSelect?.({ event: selectedEvent, date });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      {!selectedEvent ? (
        // Selección de evento
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Selecciona una experiencia gastronómica
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {availableEvents.map((event) => (
              <div 
                key={event.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-1"
                onClick={() => handleEventSelect(event)}
              >
                <div className="h-48 relative">
                  <img 
                    src={event.image} 
                    alt={event.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-semibold">{event.name}</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <FiMapPin />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <p className="text-gray-600">{event.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <FiCalendar />
                      <span>{event.dates.length} fechas</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiUsers />
                      <span>Hasta {event.maxGuests}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiDollarSign />
                      <span>Desde ${event.menuPrice}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Selección de fecha
        <div>
          <button 
            onClick={() => handleEventSelect(null)}
            className="mb-4 text-primary hover:underline flex items-center gap-1"
          >
            ← Volver a eventos
          </button>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-lg mb-2">{selectedEvent.name}</h3>
            <p className="text-gray-600 mb-2">{selectedEvent.description}</p>
            <div className="flex items-center gap-2 text-gray-500">
              <FiMapPin />
              <span>{selectedEvent.location}</span>
            </div>
          </div>

          <h4 className="text-lg font-medium text-gray-700 mb-4">
            Fechas disponibles
          </h4>

          <div className="space-y-4">
            {selectedEvent.dates.map((dateOption) => {
              const isSelected = selectedDate?.date === dateOption.date;

              return (
                <div 
                  key={dateOption.date}
                  onClick={() => handleDateSelect(dateOption)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all
                    ${isSelected 
                      ? 'border-primary bg-primary/5' 
                      : 'border-gray-200 hover:border-primary/50'}`}
                >
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <FiCalendar className={isSelected ? 'text-primary' : 'text-gray-500'} />
                        <span className="font-medium">
                          {formatDate(dateOption.date)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <FiClock />
                        <span>{dateOption.time}hs - {dateOption.type}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-primary">
                        ${dateOption.price}
                      </div>
                      <div className="text-sm text-gray-500">
                        {dateOption.availableSeats} lugares disponibles
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
