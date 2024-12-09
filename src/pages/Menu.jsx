import React, { useState } from 'react';
import { FiClock, FiAward, FiWind, FiDroplet } from 'react-icons/fi';

const menuItems = [
  {
    id: 1,
    category: "Entradas",
    name: "Carpaccio de Ciervo Patagónico",
    description: "Finas láminas de ciervo curado en hierbas de altura, brotes orgánicos y vinagreta de frutos silvestres",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80",
    prepTime: "25 minutos",
    tags: ["Sin Gluten", "Especialidad"],
    details: {
      temperature: "Servido frío",
      origin: "Ciervo de la Patagonia",
      suggestion: "Ideal para compartir",
      pairing: "Malbec de altura"
    }
  },
  {
    id: 2,
    category: "Entradas",
    name: "Crema de Morillas Silvestres",
    description: "Hongos morillas recolectados en temporada, crema de papas andinas y aceite de trufa negra",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80",
    prepTime: "30 minutos",
    tags: ["Vegetariano", "De Temporada"],
    details: {
      temperature: "Servido caliente",
      origin: "Hongos de los Andes",
      suggestion: "Entrada reconfortante",
      pairing: "Chardonnay de altura"
    }
  },
  {
    id: 3,
    category: "Platos Principales",
    name: "Cordero de Altura 63°",
    description: "Cordero criado a 3000m, cocido a baja temperatura durante 63 horas, puré de tubérculos andinos",
    image: "https://images.unsplash.com/photo-1514516816066-12d807fdd43e?auto=format&fit=crop&q=80",
    prepTime: "63 horas",
    tags: ["Premiado", "Signature"],
    details: {
      temperature: "Servido caliente",
      origin: "Cordero andino",
      suggestion: "Nuestro plato más emblemático",
      pairing: "Pinot Noir de altura"
    }
  },
  {
    id: 4,
    category: "Platos Principales",
    name: "Trucha Arcoíris de Arroyo",
    description: "Trucha salvaje de arroyos de montaña, cocida en hojas de nalca, con risotto de quínoa",
    image: "https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b?auto=format&fit=crop&q=80",
    prepTime: "45 minutos",
    tags: ["Omega-3", "Sostenible"],
    details: {
      temperature: "Servido caliente",
      origin: "Arroyos patagónicos",
      suggestion: "Pesca sostenible de temporada",
      pairing: "Sauvignon Blanc de altura"
    }
  },
  {
    id: 5,
    category: "Postres",
    name: "Texturas de Chocolate y Calafate",
    description: "Mousse de chocolate Patagonia 70%, helado de calafate silvestre, tierra de chocolate",
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&q=80",
    prepTime: "40 minutos",
    tags: ["Vegetariano", "Signature"],
    details: {
      temperature: "Servido frío",
      origin: "Cacao patagónico y frutos nativos",
      suggestion: "Postre insignia de la casa",
      pairing: "Late Harvest de altura"
    }
  },
  {
    id: 6,
    category: "Postres",
    name: "Trilogía de Manzanas Silvestres",
    description: "Tarta tibia de manzanas silvestres, sorbete de manzana verde y espuma de sidra",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80",
    prepTime: "35 minutos",
    tags: ["Vegetariano", "De Temporada"],
    details: {
      temperature: "Temperaturas variadas",
      origin: "Manzanas de la región",
      suggestion: "Perfecto para los amantes de las manzanas",
      pairing: "Sidra artesanal de altura"
    }
  }
];

function MenuItem({ item }) {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div 
      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      onMouseEnter={() => setIsRevealed(true)}
      onMouseLeave={() => setIsRevealed(false)}
    >
      <div className="relative">
        <div className="h-56 md:h-64 relative overflow-hidden">
          <img 
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          <div className="absolute top-4 right-4 flex flex-wrap gap-2 justify-end">
            {item.tags.map((tag, index) => (
              <span 
                key={index}
                className="bg-white/90 backdrop-blur-sm text-primary text-xs px-3 py-1 rounded-full shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white font-display text-xl mb-2">
              {item.name}
            </h3>
            <p className="text-white/90 text-sm line-clamp-2">
              {item.description}
            </p>
          </div>
        </div>

        {/* Panel de detalles */}
        <div 
          className={`absolute inset-0 bg-white/95 backdrop-blur-sm transition-transform duration-500 ease-in-out ${
            isRevealed ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="p-6 h-full flex flex-col">
            <h4 className="font-display text-lg text-primary mb-4">{item.name}</h4>
            
            <div className="space-y-4 flex-grow">
              <div className="flex items-center gap-2 text-gray-600">
                <FiDroplet className="text-primary" />
                <span className="text-sm">{item.details.temperature}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <FiWind className="text-primary" />
                <span className="text-sm">{item.details.origin}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <FiAward className="text-primary" />
                <span className="text-sm">{item.details.suggestion}</span>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Maridaje: {item.details.pairing}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FiClock className="text-primary" />
            <span>{item.prepTime}</span>
          </div>
          <button 
            className="text-primary text-sm font-medium"
            onClick={() => setIsRevealed(!isRevealed)}
          >
            {isRevealed ? 'Cerrar' : 'Ver detalles'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Menu() {
  const categories = ["Entradas", "Platos Principales", "Postres"];

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display text-primary mb-4">
            Nuestra Propuesta Gastronómica
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Una selección cuidadosa de sabores que representan la esencia de la cordillera
          </p>
        </div>

        {categories.map((category) => (
          <section key={category} className="mb-16">
            <h2 className="text-2xl md:text-3xl font-display text-primary text-center mb-12">
              {category}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {menuItems
                .filter(item => item.category === category)
                .map(item => (
                  <MenuItem key={item.id} item={item} />
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
