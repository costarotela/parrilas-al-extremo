import { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);

  const openBooking = (experience) => {
    setSelectedExperience(experience);
    setIsBookingOpen(true);
    setBookingStep(1);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
    setSelectedExperience(null);
    setBookingStep(1);
  };

  const nextStep = () => setBookingStep(prev => prev + 1);
  const prevStep = () => setBookingStep(prev => prev - 1);

  return (
    <BookingContext.Provider value={{
      isBookingOpen,
      selectedExperience,
      bookingStep,
      openBooking,
      closeBooking,
      nextStep,
      prevStep
    }}>
      {children}
    </BookingContext.Provider>
  );
}

export const useBooking = () => useContext(BookingContext);
