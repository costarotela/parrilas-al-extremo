import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiX, FiCalendar, FiClock, FiDollarSign, FiMapPin, FiUsers } from 'react-icons/fi';

export default function LocationModal({ location, isOpen, onClose }) {
  const { t } = useTranslation();
  
  if (!location) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 transition-opacity"
              onClick={onClose}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-lg max-w-2xl w-full mx-auto shadow-xl"
            >
              <button
                onClick={onClose}
                className="absolute right-4 top-4 text-white hover:text-gray-200 z-10"
              >
                <FiX size={24} />
              </button>

              <div className="h-64 relative">
                <img
                  src={location.image}
                  alt={location.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center gap-2 text-white/90 mb-2">
                    <FiCalendar />
                    <span>{location.date}</span>
                  </div>
                  <h2 className="text-white font-display text-2xl">{location.name}</h2>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiClock className="text-primary" />
                    <span>{t('common.duration')}: {location.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiDollarSign className="text-primary" />
                    <span>{t('common.price')}: {location.price}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiMapPin className="text-primary" />
                    <span>{t('common.location')}: {location.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiUsers className="text-primary" />
                    <span>{t('common.capacity')}: {location.capacity}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{location.fullDescription}</p>

                <div className="flex gap-4">
                  {location.status === 'current' && (
                    <button className="flex-1 px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
                      {t('locations.bookNow')}
                    </button>
                  )}
                  {location.status === 'future' && (
                    <button className="flex-1 px-6 py-3 border-2 border-primary text-primary rounded-md hover:bg-primary/5 transition-colors">
                      {t('locations.moreInfo')}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
