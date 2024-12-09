import { motion, AnimatePresence } from 'framer-motion';
import { useBooking } from '../../contexts/BookingContext';
import { FiX } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

export default function BookingModal() {
  const { isBookingOpen, closeBooking, bookingStep } = useBooking();
  const { t } = useTranslation();

  if (!isBookingOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 transition-opacity"
            onClick={closeBooking}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-lg max-w-2xl w-full mx-auto shadow-xl"
          >
            <button
              onClick={closeBooking}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <FiX size={24} />
            </button>

            <div className="p-6">
              <h2 className="text-2xl font-display text-primary mb-4">
                {t('booking.title')} - {t('booking.step')} {bookingStep}
              </h2>
              
              {/* Contenido del paso actual irá aquí */}
              
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
