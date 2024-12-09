import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiGlobe } from 'react-icons/fi';

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  
  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇬🇧' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors px-3 py-2 rounded-md">
        <FiGlobe className="text-lg" />
        <span className="text-sm hidden md:inline">{currentLanguage.name}</span>
        <span className="md:hidden">{currentLanguage.flag}</span>
      </button>
      
      <motion.div 
        initial={false}
        className="absolute right-0 mt-2 py-2 w-40 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2
              ${i18n.language === lang.code ? 'text-primary bg-primary/5' : 'text-gray-700 hover:bg-gray-50'}`}
          >
            <span>{lang.flag}</span>
            <span>{lang.name}</span>
          </button>
        ))}
      </motion.div>
    </div>
  );
}
