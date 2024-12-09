import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FiX, FiClock, FiMapPin, FiAward } from 'react-icons/fi';

export default function GastronomyHighlight() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // ... (HeightMenuModal permanece igual) ...

  return (
    <section className="relative min-h-screen bg-gray-50 overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80" 
          alt="Montañas y gastronomía"
          className="w-full h-full object-cover opacity-30 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 via-transparent to-gray-50/50" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenido izquierdo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="font-display text-4xl lg:text-5xl text-primary mb-6">
              Gastronomía en las Alturas
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Donde la cocina de altura se encuentra con paisajes majestuosos. 
              Cada plato está inspirado en la grandeza de la cordillera, 
              utilizando ingredientes locales que cuentan la historia de estas tierras.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span className="text-gray-700">Ingredientes de altura cultivados sobre los 2.000 metros</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span className="text-gray-700">Técnicas ancestrales de cocina andina</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span className="text-gray-700">Maridaje con vinos de viñedos de montaña</span>
              </div>
            </div>

            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowModal(true)}
                className="bg-primary text-white px-8 py-3 rounded-md text-lg hover:bg-primary/90 transition-colors"
              >
                Descubrir Menú de Altura
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/menu')}
                className="border-2 border-primary text-primary px-8 py-3 rounded-md text-lg hover:bg-primary/5 transition-colors"
              >
                Ver Menú Completo
              </motion.button>
            </div>
          </motion.div>

          {/* Contenido derecho - Plato destacado */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "reverse", 
                duration: 2.5,
                ease: "easeInOut"
              }}
              className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg"
            >
              <div className="relative h-72 rounded-lg overflow-hidden mb-6">
                <img
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80"
                  alt="Plato de altura"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-primary/90 text-white px-4 py-2 rounded-full text-sm">
                    Especialidad
                  </span>
                </div>
              </div>
              <h3 className="font-display text-2xl text-gray-800 mb-2">
                Cordero de Altura
              </h3>
              <p className="text-gray-600 mb-4">
                Cordero de pasturas andinas, cocido a baja temperatura con hierbas aromáticas 
                silvestres y vegetales de altura.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-primary bg-primary/10 px-3 py-1 rounded-full text-sm">
                  Plato Insignia
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowModal(true)}
                  className="text-primary hover:underline underline-offset-4"
                >
                  Ver detalles →
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Modal del Menú de Altura */}
      <AnimatePresence>
        {showModal && <HeightMenuModal />}
      </AnimatePresence>
    </section>
  );
}
