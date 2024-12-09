import { useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import DateSelection from '../components/BookingSteps/DateSelection';
import GuestsSelection from '../components/BookingSteps/GuestsSelection';
import PersonalInfo from '../components/BookingSteps/PersonalInfo';
import DietaryPreferences from '../components/BookingSteps/DietaryPreferences';
import BookingSummary from '../components/BookingSteps/BookingSummary';

const steps = [
  { id: 1, title: 'Selección de Fecha' },
  { id: 2, title: 'Cantidad de Comensales' },
  { id: 3, title: 'Información Personal' },
  { id: 4, title: 'Preferencias y Dietas' },
  { id: 5, title: 'Resumen y Pago' }
];

export default function Booking() {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    event: null,
    date: null,
    guests: null,
    personalInfo: null,
    dietaryPreferences: null
  });

  const handleDateSelection = (data) => {
    setBookingData(prev => ({
      ...prev,
      event: data.event,
      date: data.date
    }));
  };

  const handleGuestsSelection = (guestsData) => {
    setBookingData(prev => ({
      ...prev,
      guests: guestsData
    }));
  };

  const handlePersonalInfo = (data) => {
    setBookingData(prev => ({
      ...prev,
      personalInfo: data
    }));
  };

  const handleDietaryPreferences = (data) => {
    setBookingData(prev => ({
      ...prev,
      dietaryPreferences: data
    }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return bookingData.event && bookingData.date;
      case 2:
        return bookingData.guests && bookingData.guests.count > 0;
      case 3:
        const info = bookingData.personalInfo;
        return info && info.fullName && info.email && info.phone && info.nationality;
      case 4:
        return true; // Las preferencias dietéticas son opcionales
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length && canProceed()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <DateSelection onSelect={handleDateSelection} />;
      case 2:
        return (
          <GuestsSelection 
            onSelect={handleGuestsSelection}
            availableSeats={bookingData.date?.availableSeats}
            selectedEvent={bookingData}
          />
        );
      case 3:
        return (
          <PersonalInfo 
            onSelect={handlePersonalInfo}
            bookingData={bookingData}
          />
        );
      case 4:
        return (
          <DietaryPreferences
            onSelect={handleDietaryPreferences}
            bookingData={bookingData}
          />
        );
      case 5:
        return (
          <BookingSummary
            bookingData={bookingData}
          />
        );
      default:
        return <div>Paso no encontrado</div>;
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center relative z-10">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center
                    ${currentStep > step.id ? 'bg-primary text-white' : 
                      currentStep === step.id ? 'bg-primary text-white' : 
                      'bg-gray-200 text-gray-500'}`}
                >
                  {currentStep > step.id ? <FiCheck size={20} /> : step.id}
                </div>
                <span className="text-sm mt-2 text-gray-600">{step.title}</span>
              </div>
            ))}
            {/* Línea de progreso */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200">
              <div 
                className="absolute h-full bg-primary transition-all duration-300"
                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Contenedor del formulario */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-display text-primary mb-6">
            {steps[currentStep - 1].title}
          </h2>
          
          {renderStepContent()}
          
          {/* Botones de navegación */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="px-6 py-2 border-2 border-primary text-primary rounded-md 
                disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/5"
            >
              Anterior
            </button>
            <button
              onClick={handleNext}
              disabled={currentStep === steps.length || !canProceed()}
              className="px-6 py-2 bg-primary text-white rounded-md
                disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90"
            >
              {currentStep === steps.length ? 'Confirmar' : 'Siguiente'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
