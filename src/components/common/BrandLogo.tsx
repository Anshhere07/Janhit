import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { useLanguage } from '../../hooks/useLanguage';

interface BrandLogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'iconOnly';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className,
  variant = 'full',
}) => {
  const { language } = useLanguage();

  return (
    <Link
      to="/"
      className={cn('inline-flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-500 rounded-lg p-1', className)}
      aria-label="Janhit Hospital Home"
    >
      {/* Brand Icon */}
      <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-navy-800 to-navy-950 dark:from-medical-700 dark:to-navy-900 flex items-center justify-center shadow-md shadow-navy-900/15 group-hover:scale-105 transition-transform duration-200 shrink-0">
        <svg
          className="w-6 h-6 text-teal-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Medical Cross with Heart Pulse */}
          <path d="M12 4v16m-8-8h16" />
        </svg>
        <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-medical-500 border-2 border-white dark:border-dark-bg rounded-full flex items-center justify-center">
          <span className="w-1.5 h-1.5 bg-white rounded-full" />
        </span>
      </div>

      {/* Typography */}
      {variant !== 'iconOnly' && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-navy-900 dark:text-white leading-none">
              JANHIT
            </span>
            <span className="font-medium text-xs uppercase px-1.5 py-0.5 rounded bg-medical-100 dark:bg-medical-900/60 text-medical-800 dark:text-medical-200">
              {language === 'hi' ? 'हॉस्पिटल' : 'Hospital'}
            </span>
          </div>
          <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 dark:text-slate-400 tracking-wider uppercase mt-1 leading-none">
            {language === 'hi' ? 'सुपर स्पेशलिटी एवं रिसर्च सेंटर' : 'Super Speciality & Research'}
          </span>
        </div>
      )}
    </Link>
  );
};

