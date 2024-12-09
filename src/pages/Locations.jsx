import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LocationCard from '../components/LocationCard';
import LocationModal from '../components/LocationModal';
import { FiMapPin, FiCalendar, FiClock } from 'react-icons/fi';

const locationsData = {
  es: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1519659528534-7fd733a832a0?auto=format&fit=crop&q=80",
      name: "Montañas Patagónicas",
      date: "Octubre 2023",
      status: "past",
      description: "Experiencia gastronómica entre glaciares y montañas.",
      fullDescription: "Una velada única rodeada de glaciares milenarios y montañas majestuosas. Disfruta de una cocina de altura inspirada en los sabores patagónicos mientras contemplas uno de los paisajes más impresionantes del mundo.",
      duration: "3 horas",
      price: "desde $150",
      location: "Patagonia Argentina",
      capacity: "20 comensales"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&q=80",
      name: "Bosque Encantado",
      date: "Noviembre 2023",
      status: "past",
      description: "Cena mágica en un antiguo bosque de secuoyas.",
      fullDescription: "Una experiencia única entre árboles centenarios y naturaleza virgen. La magia del bosque se combina con una gastronomía que rinde homenaje a los ingredientes locales y las técnicas ancestrales.",
      duration: "4 horas",
      price: "desde $160",
      location: "Bosque de Secuoyas",
      capacity: "18 comensales"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&q=80",
      name: "Alturas Alpinas",
      date: "Diciembre 2023",
      status: "current",
      description: "Una experiencia gastronómica única entre picos nevados.",
      fullDescription: "Disfruta de una velada extraordinaria a 2.500 metros de altura. Nuestra cocina de autor se fusiona con el imponente paisaje alpino para crear una experiencia sensorial inolvidable.",
      duration: "3 horas",
      price: "desde $180",
      location: "Alpes Suizos",
      capacity: "20 comensales"
    }
  ],
  en: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1519659528534-7fd733a832a0?auto=format&fit=crop&q=80",
      name: "Patagonian Mountains",
      date: "October 2023",
      status: "past",
      description: "Gastronomic experience among glaciers and mountains.",
      fullDescription: "A unique evening surrounded by ancient glaciers and majestic mountains. Enjoy high-altitude cuisine inspired by Patagonian flavors while contemplating one of the world's most impressive landscapes.",
      duration: "3 hours",
      price: "from $150",
      location: "Argentinian Patagonia",
      capacity: "20 guests"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&q=80",
      name: "Enchanted Forest",
      date: "November 2023",
      status: "past",
      description: "Magical dinner in an ancient sequoia forest.",
      fullDescription: "A unique experience among centennial trees and pristine nature. The magic of the forest combines with a gastronomy that pays homage to local ingredients and ancestral techniques.",
      duration: "4 hours",
      price: "from $160",
      location: "Sequoia Forest",
      capacity: "18 guests"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&q=80",
      name: "Alpine Heights",
      date: "December 2023",
      status: "current",
      description: "A unique dining experience among snowy peaks.",
      fullDescription: "Enjoy an extraordinary evening at 2,500 meters altitude. Our signature cuisine merges with the imposing Alpine landscape to create an unforgettable sensory experience.",
      duration: "3 hours",
      price: "from $180",
      location: "Swiss Alps",
      capacity: "20 guests"
    }
  ]
};

export default function Locations() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    setIsModalOpen(true);
  };

  const currentLocations = locationsData[i18n.language] || locationsData.en;

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-display text-5xl text-primary mb-4">
            {t('locations.title')}
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-6">
            {t('locations.subtitle')}
          </p>
          <div className="flex justify-center gap-8 text-gray-600">
            <div className="flex items-center gap-2">
              <FiMapPin className="text-primary" />
              <span>Ubicaciones Exclusivas</span>
            </div>
            <div className="flex items-center gap-2">
              <FiCalendar className="text-primary" />
              <span>Eventos Mensuales</span>
            </div>
            <div className="flex items-center gap-2">
              <FiClock className="text-primary" />
              <span>Experiencias Únicas</span>
            </div>
          </div>
        </motion.div>

        {/* Timeline Section */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-300 via-primary to-gray-300" />
          
          <div className="space-y-8">
            {currentLocations.map((location) => (
              <div key={location.id} className="relative flex-1 ml-8">
                <div className={`absolute w-4 h-4 rounded-full -left-10 top-1/2 -translate-y-1/2
                  ${location.status === 'past' 
                    ? 'bg-gray-400' 
                    : location.status === 'current'
                      ? 'bg-primary ring-4 ring-primary/20'
                      : 'bg-white border-2 border-primary'
                  }`} 
                />
                <LocationCard 
                  location={location} 
                  onClick={handleLocationClick}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Descripción adicional */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 max-w-3xl mx-auto">
            {t('locations.description')}
          </p>
        </motion.div>
      </div>

      <LocationModal 
        location={selectedLocation}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
