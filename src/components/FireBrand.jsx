import { motion } from 'framer-motion';

export default function FireBrand() {
  return (
    <div className="brand-container">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="brand-content"
      >
        <div className="brand-text-wrapper">
          <div className="brand-main-text">RUTAS DE FUEGO</div>
          <div className="brand-sub-text">SERVICIO DE GASTRONOMÍA ESPECIALIZADO</div>
        </div>
      </motion.div>
    </div>
  );
}
