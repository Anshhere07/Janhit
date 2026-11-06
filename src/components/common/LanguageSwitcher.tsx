import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { cn } from '../../utils/cn';
import { Languages } from 'lucide-react';

export interface LanguageSwitcherProps {
  className?: string;
  variant?: 'pill' | 'compact';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className,
  variant = 'pill',
}) => {
  const { language, setLanguage } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLanguageChange = (targetLang: 'hi' | 'en') => {
    setLanguage(targetLang);
    const path = location.pathname;
    if (path.startsWith('/hi/') || path === '/hi') {
      const newPath = path.replace(/^\/hi/, `/${targetLang}`);
      navigate(`${newPath}${location.search}${location.hash}`, { replace: true });
    } else if (path.startsWith('/en/') || path === '/en') {
      const newPath = path.replace(/^\/en/, `/${targetLang}`);
      navigate(`${newPath}${location.search}${location.hash}`, { replace: true });
    }
  };

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={() => handleLanguageChange(language === 'en' ? 'hi' : 'en')}
        className={cn(
          'min-h-[36px] inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200/80 dark:border-dark-border hover:bg-slate-100/80 dark:hover:bg-dark-card transition-all duration-200 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-medical-500/40 select-none active:scale-95',
          className
        )}
        aria-label={`Switch language to ${language === 'en' ? 'Hindi' : 'English'}`}
      >
        <Languages className="w-3.5 h-3.5 text-medical-600 dark:text-medical-400" />
        <span>{language === 'en' ? 'हिंदी' : 'EN'}</span>
      </button>
    );
  }

  return (
    <div
      className={cn(
        'inline-flex items-center bg-slate-100/90 dark:bg-dark-card p-1 rounded-xl border border-slate-200/80 dark:border-dark-border text-xs font-medium select-none',
        className
      )}
      role="group"
      aria-label="Language selection"
    >
      <button
        type="button"
        onClick={() => handleLanguageChange('hi')}
        className={cn(
          'min-h-[30px] px-3 py-1 rounded-lg transition-all duration-200 flex items-center gap-1 font-hindi text-xs',
          language === 'hi'
            ? 'bg-white dark:bg-dark-surface text-navy-900 dark:text-white shadow-sm font-bold'
            : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
        )}
        aria-pressed={language === 'hi'}
      >
        हिंदी
      </button>
      <button
        type="button"
        onClick={() => handleLanguageChange('en')}
        className={cn(
          'min-h-[30px] px-3 py-1 rounded-lg transition-all duration-200 flex items-center gap-1 text-xs',
          language === 'en'
            ? 'bg-white dark:bg-dark-surface text-navy-900 dark:text-white shadow-sm font-bold'
            : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
        )}
        aria-pressed={language === 'en'}
      >
        English
      </button>
    </div>
  );
};

