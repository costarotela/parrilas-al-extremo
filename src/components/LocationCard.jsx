import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiDollarSign, FiMapPin } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

export default function LocationCard({ location, onClick }) {
  const { t } = useTranslation();

  const isPast = location.status === 'past';

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className={`location-card group cursor-pointer ${isPast ? 'opacity-75' : ''}`}
      onClick={() => onClick(location)}
    >
      <div className="relative h-64 overflow-hidden rounded-t-lg">
        <motion.img 
          src={location.image} 
          alt={location.name}
          className={`w-full h-full object-cover transition-transform duration-500 
            ${isPast ? 'filter grayscale' : ''}`}
          whileHover={{ scale: 1.1 }}
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium inline-flex items-center
            ${isPast ? 'bg-gray-500 text-white' : 'bg-primary text-white'}`}>
            <FiCalendar className="mr-2" />
            {location.date}
          </span>
        </div>
      </div>
      
      <div className={`p-6 bg-white rounded-b-lg shadow-lg ${isPast ? 'bg-gray-50' : ''}`}>
        <h3 className={`text-xl font-display font-bold mb-2 
          ${isPast ? 'text-gray-600' : 'text-primary'}`}>
          {location.name}
        </h3>
        <p className={`mb-4 line-clamp-2 ${isPast ? 'text-gray-500' : 'text-gray-600'}`}>
          {location.description}
        </p>
        
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <FiClock className={isPast ? 'text-gray-400' : 'text-primary'} />
            <span>{t('common.duration')}: {location.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <FiDollarSign className={isPast ? 'text-gray-400' : 'text-primary'} />
            <span>{t('common.price')}: {location.price}</span>
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <FiMapPin className={isPast ? 'text-gray-400' : 'text-primary'} />
            <span>{t('common.location')}: {location.location}</span>
          </div>
        </div>

        {isPast && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <span className="text-gray-500 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              {t('locations.completed')}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
