import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiX, FiClock, FiAward, FiInfo } from 'react-icons/fi';

export default function DishModal({ dish, isOpen, onClose }) {
  const { t } = useTranslation();
  
  if (!dish) return null;

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
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-lg max-w-2xl w-full mx-auto shadow-xl overflow-hidden"
            >
              <button
                onClick={onClose}
                className="absolute right-4 top-4 text-white hover:text-gray-200 z-10"
              >
                <FiX size={24} />
              </button>

              <div className="h-64 relative">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-white/80 text-sm font-medium">
                    {dish.category}
                  </span>
                  <h3 className="text-white font-display text-2xl mt-1">{dish.name}</h3>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FiClock className="text-primary" />
                    <span>{t('menu.details.preparation')}: {dish.prepTime}</span>
                  </div>
                  {dish.award && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <FiAward className="text-primary" />
                      <span>{dish.award}</span>
                    </div>
                  )}
                </div>

                <p className="text-gray-600 mb-6">{dish.description}</p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      {t('menu.details.ingredients')}
                    </h4>
                    <ul className="grid grid-cols-2 gap-2">
                      {dish.ingredients.map((ingredient, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {dish.dietaryInfo && (
                    <div className="flex items-start gap-2 text-sm text-gray-500">
                      <FiInfo className="mt-0.5 text-primary" />
                      <span>{dish.dietaryInfo}</span>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-display text-primary">${dish.price}</span>
                    <button className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
                      {t('menu.details.order')}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
