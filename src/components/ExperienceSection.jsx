import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiMapPin, FiX, FiChevronLeft, FiChevronRight, FiZoomIn } from 'react-icons/fi';

const experiences = [
  {
    id: 1,
    name: "María González",
    location: "Alpes Suizos",
    date: "Diciembre 2023",
    rating: 5,
    image: "https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&q=80",
    comment: "Una experiencia única en las alturas. La combinación de gastronomía excepcional y vistas espectaculares creó un momento inolvidable.",
    highlight: "La trucha de arroyo fue extraordinaria",
    gallery: [
      "https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1549488497-256795402cc0?auto=format&fit=crop&q=80"
    ]
  },
  {
    id: 2,
    name: "Carlos Ruiz",
    location: "Patagonia Argentina",
    date: "Octubre 2023",
    rating: 5,
    image: "https://images.unsplash.com/photo-1519659528534-7fd733a832a0?auto=format&fit=crop&q=80",
    comment: "Más que una cena, fue una aventura gastronómica. El cordero preparado con hierbas locales fue una revelación.",
    highlight: "El cordero de altura superó todas las expectativas",
    gallery: [
      "https://images.unsplash.com/photo-1519659528534-7fd733a832a0?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1515443961218-a51367888e4b?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80"
    ]
  },
  {
    id: 3,
    name: "Ana Martínez",
    location: "Bosque de Secuoyas",
    date: "Noviembre 2023",
    rating: 5,
    image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&q=80",
    comment: "La experiencia en el bosque fue mágica. La forma en que integraron los ingredientes locales con técnicas modernas fue brillante.",
    highlight: "Una fusión perfecta entre naturaleza y gastronomía",
    gallery: [
      "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80"
    ]
  }
];

export default function ExperienceSection() {
  const [currentExperience, setCurrentExperience] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const nextExperience = () => {
    setCurrentExperience((prev) => (prev + 1) % experiences.length);
  };

  const prevExperience = () => {
    setCurrentExperience((prev) => (prev - 1 + experiences.length) % experiences.length);
  };

  const openGallery = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsGalleryOpen(true);
  };

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl text-primary mb-4">
            Experiencias Extraordinarias
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Descubre lo que nuestros invitados dicen sobre sus experiencias únicas
            en nuestros destinos gastronómicos.
          </p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentExperience}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-xl overflow-hidden"
            >
              <div className="grid md:grid-cols-2">
                {/* Imagen Principal */}
                <div className="relative h-96">
                  <motion.img
                    src={experiences[currentExperience].image}
                    alt={experiences[currentExperience].location}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <FiMapPin className="text-primary" />
                      <span>{experiences[currentExperience].location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(experiences[currentExperience].rating)].map((_, i) => (
                        <FiStar key={i} className="fill-current text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-2xl text-primary mb-2">
                      {experiences[currentExperience].name}
                    </h3>
                    <p className="text-gray-500 mb-6">{experiences[currentExperience].date}</p>
                    <blockquote className="text-gray-600 italic mb-6">
                      "{experiences[currentExperience].comment}"
                    </blockquote>
                    <p className="text-primary font-medium">
                      Destacado: {experiences[currentExperience].highlight}
                    </p>
                  </div>

                  {/* Galería Miniatura */}
                  <div className="mt-6">
                    <h4 className="text-sm text-gray-500 mb-3">Galería de Momentos</h4>
                    <div className="flex gap-3">
                      {experiences[currentExperience].gallery.map((img, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          className="relative w-20 h-20 cursor-pointer group"
                          onClick={() => openGallery(img)}
                        >
                          <img
                            src={img}
                            alt={`Gallery ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <FiZoomIn className="text-white text-xl" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Botones de navegación */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevExperience}
              className="p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg text-primary hover:bg-primary hover:text-white transition-colors"
            >
              <FiChevronLeft size={24} />
            </motion.button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextExperience}
              className="p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg text-primary hover:bg-primary hover:text-white transition-colors"
            >
              <FiChevronRight size={24} />
            </motion.button>
          </div>
        </div>

        {/* Modal de Galería */}
        <AnimatePresence>
          {isGalleryOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            >
              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                onClick={() => setIsGalleryOpen(false)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
              >
                <FiX size={32} />
              </motion.button>
              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                src={selectedImage}
                alt="Gallery preview"
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
