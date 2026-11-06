import React from 'react';
import { PhoneCall, ShieldAlert, Award } from 'lucide-react';
import { HOSPITAL_INFO } from '../../utils/constants';
import { useLanguage } from '../../hooks/useLanguage';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeSwitcher } from './ThemeSwitcher';

export const EmergencyBanner: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="bg-navy-950 text-white text-xs border-b border-navy-800/80">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col md:flex-row items-center justify-between gap-2.5">
        
        {/* Left: Emergency & Trauma notice */}
        <div className="flex items-center gap-3 text-slate-300 flex-wrap justify-center md:justify-start">
          <div className="flex items-center gap-1.5 font-semibold text-emergency-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emergency-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emergency-500"></span>
            </span>
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{t('common.emergency247')}</span>
          </div>

          <span className="hidden sm:inline text-navy-600">|</span>

          <a
            href={`tel:${HOSPITAL_INFO.emergencyPhone.replace(/-/g, '')}`}
            className="flex items-center gap-1.5 font-bold text-white hover:text-medical-300 transition-colors tracking-wide"
          >
            <PhoneCall className="w-3.5 h-3.5 text-teal-400" />
            <span>{HOSPITAL_INFO.emergencyPhone}</span>
          </a>

          <span className="hidden md:inline text-navy-600">|</span>

          <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('common.nabhAccredited')}</span>
          </div>
        </div>

        {/* Right: Language switch & Theme switch */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden sm:inline text-slate-400 text-[11px]">
            {language === 'hi' ? HOSPITAL_INFO.hindiOpdHours : HOSPITAL_INFO.opdHours}
          </span>
          <div className="h-3 w-px bg-navy-800 hidden sm:block" />
          <LanguageSwitcher />
          <ThemeSwitcher className="text-slate-400 hover:text-white hover:bg-navy-900" />
        </div>
      </div>
    </div>
  );
};

