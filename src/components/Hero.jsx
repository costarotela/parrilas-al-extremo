import { useNavigate } from 'react-router-dom';
import { FiMapPin, FiCalendar, FiUsers, FiClock, FiAward, FiArrowRight } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function Hero() {
  const navigate = useNavigate();

  const dishes = [
    {
      image: "https://images.unsplash.com/photo-1542834291-c514e77b215f?auto=format&fit=crop&q=80",
      title: "Trucha de Arroyo Andino",
      description: "Con hierbas silvestres y vegetales de altura",
      tag: "Plato Destacado",
      details: {
        prepTime: "25 minutos",
        origin: "Arroyos Patagónicos",
        technique: "Cocción al vapor en hojas de nalca",
        price: "$45"
      }
    },
    {
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80",
      title: "Cordero de Altura",
      description: "Cocido a baja temperatura con hierbas aromáticas",
      tag: "Especialidad",
      details: {
        prepTime: "48 horas",
        origin: "Cordillera de los Andes",
        technique: "Cocción lenta a 63°",
        price: "$65"
      }
    }
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gray-50/90" />
        <img 
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80"
          alt="Mountain landscape"
          className="w-full h-full object-cover opacity-30 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 via-transparent to-gray-50/50" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-gray-800">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-display text-5xl lg:text-7xl mb-6"
            >
              Gastronomía de Altura
              <br />
              <span className="text-primary">en Estado Puro</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl mb-8 text-gray-600 max-w-xl"
            >
              Vive una experiencia gastronómica única donde la cocina de autor se fusiona con los paisajes más impresionantes de la cordillera.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4 mb-8"
            >
              {[
                { icon: FiMapPin, text: "Experiencias exclusivas a más de 2.500 metros de altura" },
                { icon: FiCalendar, text: "Eventos mensuales en ubicaciones únicas de los Andes" },
                { icon: FiUsers, text: "Grupos reducidos de máximo 12 comensales" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-3 text-gray-600 cursor-pointer group"
                >
                  <item.icon className="text-primary transform group-hover:scale-110 transition-transform" />
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/locations')}
                className="bg-primary text-white px-8 py-3 rounded-md text-lg hover:bg-primary/90 transition-colors"
              >
                Explorar Destinos
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/menu')}
                className="border-2 border-primary text-primary px-8 py-3 rounded-md text-lg hover:bg-primary/5 transition-colors"
              >
                Descubrir Menú
              </motion.button>
            </motion.div>
          </div>

          {/* Right Content - Flip Cards */}
          <div className="hidden lg:block space-y-6">
            {dishes.map((dish, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 * (index + 1) }}
                className="flip-card-container"
              >
                <div className="flip-card">
                  {/* Front Side */}
                  <div className="flip-card-front">
                    <div className="relative h-full">
                      <img
                        src={dish.image}
                        alt={dish.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-lg" />
                      
                      <div className="absolute top-4 right-4">
                        <span className="bg-primary/90 text-white px-4 py-2 rounded-full text-sm">
                          {dish.tag}
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-display text-xl mb-1">
                          {dish.title}
                        </h3>
                        <p className="text-white/90 text-sm">
                          {dish.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Back Side */}
                  <div className="flip-card-back">
                    <div className="p-6 h-full flex flex-col bg-white/95 backdrop-blur-sm rounded-lg">
                      <h3 className="font-display text-xl text-primary mb-4">{dish.title}</h3>
                      
                      <div className="space-y-4 flex-grow">
                        <div className="flex items-center gap-2 text-gray-600">
                          <FiClock className="text-primary" />
                          <span>Preparación: {dish.details.prepTime}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <FiMapPin className="text-primary" />
                          <span>Origen: {dish.details.origin}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <FiAward className="text-primary" />
                          <span>Técnica: {dish.details.technique}</span>
                        </div>
                        <div className="mt-4 text-2xl font-display text-primary">
                          {dish.details.price}
                        </div>
                      </div>

                      <button
                        onClick={() => navigate('/menu')}
                        className="mt-4 w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                      >
                        Ver en el menú
                        <FiArrowRight />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
