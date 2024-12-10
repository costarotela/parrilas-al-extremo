import { useTranslation } from 'react-i18next';
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
      <button className="inline-flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-primary transition-colors">
        <FiGlobe className="h-5 w-5 mr-2" />
        <span className="hidden md:block">{currentLanguage.name}</span>
        <span className="md:hidden">{currentLanguage.flag}</span>
      </button>
      
      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <div className="py-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => i18n.changeLanguage(lang.code)}
              className={`w-full text-left px-4 py-2 text-sm ${
                i18n.language === lang.code
                  ? 'text-primary bg-primary/5'
                  : 'text-gray-700 hover:bg-gray-50'
              } flex items-center gap-2`}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
