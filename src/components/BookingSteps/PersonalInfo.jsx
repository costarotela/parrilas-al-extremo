import { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiFlag, FiMapPin, FiAlertCircle } from 'react-icons/fi';

export default function PersonalInfo({ onSelect, bookingData }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    nationality: '',
    address: '',
    observations: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Enviar datos actualizados al componente padre
    onSelect?.({
      ...formData,
      [name]: value
    });
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'fullName':
        return value.length < 3 ? 'El nombre completo es requerido' : '';
      case 'email':
        return !/\S+@\S+\.\S+/.test(value) ? 'Email inválido' : '';
      case 'phone':
        return !/^[+\d\s-]{8,}$/.test(value) ? 'Teléfono inválido' : '';
      case 'nationality':
        return !value ? 'La nacionalidad es requerida' : '';
      default:
        return '';
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  return (
    <div className="space-y-8">
      {/* Resumen de la reserva */}
      {bookingData && (
        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <h3 className="font-semibold text-lg text-primary">Resumen de Reserva</h3>
          <div className="text-gray-600">
            <p>Evento: {bookingData.event.name}</p>
            <p>Fecha: {new Date(bookingData.date.date).toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</p>
            <p>Horario: {bookingData.date.time}hs</p>
            <p>Comensales: {bookingData.guests.count}</p>
          </div>
        </div>
      )}

      {/* Formulario */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Nombre completo */}
        <div className="col-span-2">
          <label className="block text-gray-700 mb-2">Nombre Completo *</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiUser className="text-gray-400" />
            </div>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full pl-10 pr-4 py-2 border-2 rounded-md ${
                errors.fullName ? 'border-red-300' : 'border-gray-200'
              } focus:outline-none focus:border-primary`}
              placeholder="Ingrese su nombre completo"
            />
          </div>
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
              <FiAlertCircle />
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 mb-2">Email *</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMail className="text-gray-400" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full pl-10 pr-4 py-2 border-2 rounded-md ${
                errors.email ? 'border-red-300' : 'border-gray-200'
              } focus:outline-none focus:border-primary`}
              placeholder="ejemplo@email.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
              <FiAlertCircle />
              {errors.email}
            </p>
          )}
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-gray-700 mb-2">Teléfono *</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiPhone className="text-gray-400" />
            </div>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full pl-10 pr-4 py-2 border-2 rounded-md ${
                errors.phone ? 'border-red-300' : 'border-gray-200'
              } focus:outline-none focus:border-primary`}
              placeholder="+54 11 1234-5678"
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
              <FiAlertCircle />
              {errors.phone}
            </p>
          )}
        </div>

        {/* Nacionalidad */}
        <div>
          <label className="block text-gray-700 mb-2">Nacionalidad *</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiFlag className="text-gray-400" />
            </div>
            <input
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full pl-10 pr-4 py-2 border-2 rounded-md ${
                errors.nationality ? 'border-red-300' : 'border-gray-200'
              } focus:outline-none focus:border-primary`}
              placeholder="Ingrese su nacionalidad"
            />
          </div>
          {errors.nationality && (
            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
              <FiAlertCircle />
              {errors.nationality}
            </p>
          )}
        </div>

        {/* Dirección (opcional) */}
        <div className="col-span-2">
          <label className="block text-gray-700 mb-2">
            Dirección <span className="text-gray-400">(opcional)</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMapPin className="text-gray-400" />
            </div>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-primary"
              placeholder="Ingrese su dirección"
            />
          </div>
        </div>

        {/* Observaciones */}
        <div className="col-span-2">
          <label className="block text-gray-700 mb-2">
            Observaciones <span className="text-gray-400">(dietas especiales, alergias, etc.)</span>
          </label>
          <textarea
            name="observations"
            value={formData.observations}
            onChange={handleChange}
            rows="4"
            className="w-full p-4 border-2 border-gray-200 rounded-md focus:outline-none focus:border-primary"
            placeholder="Ingrese cualquier observación relevante para el chef"
          />
        </div>
      </div>

      {/* Nota de campos requeridos */}
      <div className="text-sm text-gray-500 flex items-center gap-1">
        <FiAlertCircle />
        Los campos marcados con * son obligatorios
      </div>
    </div>
  );
}
