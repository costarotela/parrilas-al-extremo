import { useState } from 'react';
import { FiCheck, FiAlertCircle } from 'react-icons/fi';

const DIETARY_RESTRICTIONS = [
  { id: 'vegetarian', label: 'Vegetariano', description: 'Sin carnes ni pescados' },
  { id: 'vegan', label: 'Vegano', description: 'Sin productos de origen animal' },
  { id: 'gluten-free', label: 'Sin Gluten', description: 'Apto para celíacos' },
  { id: 'lactose-free', label: 'Sin Lactosa', description: 'Sin productos lácteos' },
  { id: 'kosher', label: 'Kosher', description: 'Según leyes dietéticas judías' },
  { id: 'halal', label: 'Halal', description: 'Según leyes dietéticas islámicas' }
];

const ALLERGIES = [
  'Frutos secos',
  'Mariscos',
  'Huevos',
  'Lácteos',
  'Soja',
  'Pescado',
  'Maní'
];

export default function DietaryPreferences({ onSelect, bookingData }) {
  const [selectedDiets, setSelectedDiets] = useState([]);
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [otherAllergies, setOtherAllergies] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  const handleDietChange = (dietId) => {
    setSelectedDiets(prev => {
      const newSelection = prev.includes(dietId)
        ? prev.filter(id => id !== dietId)
        : [...prev, dietId];
      
      onSelect?.({
        diets: newSelection,
        allergies: selectedAllergies,
        otherAllergies,
        specialRequests
      });
      
      return newSelection;
    });
  };

  const handleAllergyChange = (allergy) => {
    setSelectedAllergies(prev => {
      const newSelection = prev.includes(allergy)
        ? prev.filter(a => a !== allergy)
        : [...prev, allergy];
      
      onSelect?.({
        diets: selectedDiets,
        allergies: newSelection,
        otherAllergies,
        specialRequests
      });
      
      return newSelection;
    });
  };

  const handleOtherAllergiesChange = (e) => {
    setOtherAllergies(e.target.value);
    onSelect?.({
      diets: selectedDiets,
      allergies: selectedAllergies,
      otherAllergies: e.target.value,
      specialRequests
    });
  };

  const handleSpecialRequestsChange = (e) => {
    setSpecialRequests(e.target.value);
    onSelect?.({
      diets: selectedDiets,
      allergies: selectedAllergies,
      otherAllergies,
      specialRequests: e.target.value
    });
  };

  return (
    <div className="space-y-8">
      {/* Resumen de la reserva */}
      {bookingData && (
        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <h3 className="font-semibold text-lg text-primary">Resumen de Reserva</h3>
          <div className="text-gray-600">
            <p>Evento: {bookingData.event.name}</p>
            <p>Comensales: {bookingData.guests.count}</p>
            <p>Reservado por: {bookingData.personalInfo.fullName}</p>
          </div>
        </div>
      )}

      {/* Restricciones dietéticas */}
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-4">Restricciones Dietéticas</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {DIETARY_RESTRICTIONS.map((diet) => (
            <div
              key={diet.id}
              onClick={() => handleDietChange(diet.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all
                ${selectedDiets.includes(diet.id)
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-primary/50'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                  ${selectedDiets.includes(diet.id)
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-300'}`}
                >
                  {selectedDiets.includes(diet.id) && <FiCheck size={12} />}
                </div>
                <div>
                  <h4 className="font-medium">{diet.label}</h4>
                  <p className="text-sm text-gray-500">{diet.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alergias */}
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-4">Alergias</h3>
        <div className="flex flex-wrap gap-3">
          {ALLERGIES.map((allergy) => (
            <button
              key={allergy}
              onClick={() => handleAllergyChange(allergy)}
              className={`px-4 py-2 rounded-full border-2 transition-all
                ${selectedAllergies.includes(allergy)
                  ? 'border-primary bg-primary text-white'
                  : 'border-gray-200 text-gray-700 hover:border-primary/50'}`}
            >
              {allergy}
            </button>
          ))}
        </div>

        <div className="mt-4">
          <label className="block text-gray-700 mb-2">
            Otras Alergias <span className="text-gray-400">(opcional)</span>
          </label>
          <input
            type="text"
            value={otherAllergies}
            onChange={handleOtherAllergiesChange}
            className="w-full p-3 border-2 border-gray-200 rounded-md focus:outline-none focus:border-primary"
            placeholder="Especifique otras alergias si las hay"
          />
        </div>
      </div>

      {/* Solicitudes especiales */}
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-4">
          Solicitudes Especiales <span className="text-gray-400">(opcional)</span>
        </h3>
        <textarea
          value={specialRequests}
          onChange={handleSpecialRequestsChange}
          rows="4"
          className="w-full p-4 border-2 border-gray-200 rounded-md focus:outline-none focus:border-primary"
          placeholder="Indique cualquier solicitud especial para el chef (preferencias de cocción, ingredientes específicos, etc.)"
        />
      </div>

      {/* Nota informativa */}
      <div className="flex items-start gap-2 text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
        <FiAlertCircle className="mt-0.5" />
        <p>
          Haremos todo lo posible por acomodar sus preferencias dietéticas y alergias. 
          Nuestro chef se pondrá en contacto si necesita aclarar algún detalle específico.
        </p>
      </div>
    </div>
  );
}
