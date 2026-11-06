import React, { createContext, useContext, useEffect, useState } from 'react';
import { translations, Language, TranslationKeys } from '../translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (path: string, fallback?: string, variables?: Record<string, string | number>) => string;
  strings: TranslationKeys;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'janhit_language_preference';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default language is 'hi' (Hindi) as per strict specification
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
      if (saved && (saved === 'en' || saved === 'hi')) {
        return saved;
      }
    }
    return 'hi';
  });

  useEffect(() => {
    document.documentElement.lang = language;
    if (language === 'hi') {
      document.documentElement.classList.add('font-hindi');
      document.body.classList.add('font-hindi');
      document.title = 'जनहित हॉस्पिटल | सुपर स्पेशलिटी स्वास्थ्य एवं अनुसंधान केंद्र';
    } else {
      document.documentElement.classList.remove('font-hindi');
      document.body.classList.remove('font-hindi');
      document.title = 'Janhit Hospital | Super Speciality Healthcare & Research Centre';
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    const nextLang: Language = language === 'hi' ? 'en' : 'hi';
    setLanguage(nextLang);
  };

  /**
   * Helper to fetch translated text using dot notation (e.g. 'nav.aboutHospital')
   * Supports variable interpolation like {{count}} or {name}.
   */
  const t = (path: string, fallback?: string, variables?: Record<string, string | number>): string => {
    const currentDict = translations[language];
    const keys = path.split('.');
    
    let result: unknown = currentDict;
    for (const key of keys) {
      if (result && typeof result === 'object' && key in result) {
        result = (result as Record<string, unknown>)[key];
      } else {
        result = undefined;
        break;
      }
    }

    // Fallback to English if translation is missing in Hindi
    if (typeof result !== 'string') {
      let fallbackResult: unknown = translations.en;
      for (const key of keys) {
        if (fallbackResult && typeof fallbackResult === 'object' && key in fallbackResult) {
          fallbackResult = (fallbackResult as Record<string, unknown>)[key];
        } else {
          fallbackResult = undefined;
          break;
        }
      }
      if (typeof fallbackResult === 'string') {
        result = fallbackResult;
      }
    }

    if (typeof result === 'string') {
      let text = result;
      if (variables) {
        Object.entries(variables).forEach(([k, v]) => {
          text = text.replace(new RegExp(`{{${k}}}|{${k}}`, 'g'), String(v));
        });
      }
      return text;
    }

    return fallback || path;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        strings: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
