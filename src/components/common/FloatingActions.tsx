import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneCall, ArrowUp } from 'lucide-react';
import { HOSPITAL_INFO } from '../../utils/constants';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useLanguage } from '../../hooks/useLanguage';

interface FloatingActionsProps {
  onOpenAppointmentModal?: () => void;
}

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413Z" />
  </svg>
);

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenAppointmentModal: _onOpenAppointmentModal }) => {
  const { isScrolled } = useScrollPosition(300);
  const { language, t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const whatsappMessage = language === 'hi'
    ? 'नमस्ते, मुझे जनहित हॉस्पिटल में अपॉइंटमेंट या चिकित्सा सेवाओं की जानकारी चाहिए।'
    : 'Hello, I would like to inquire about medical services and doctor appointments at Janhit Hospital.';

  const whatsappUrl = `https://wa.me/${HOSPITAL_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. FLOATING CALL BUTTON (MOBILE ONLY)                                     */}
      {/* ========================================================================= */}
      <aside aria-label="Mobile emergency contact" className="fixed bottom-4 left-4 z-40 sm:hidden">
        <a
          href={`tel:${HOSPITAL_INFO.emergencyPhone.replace(/-/g, '')}`}
          className="flex items-center gap-2 bg-emergency-600 hover:bg-emergency-700 text-white font-bold text-xs px-3.5 py-2.5 rounded-full shadow-elevated focus-ring active:scale-95 transition-all"
          title={t('floating.callTooltip')}
          aria-label={t('floating.callTooltip')}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <PhoneCall className="w-4 h-4" />
          <span>{HOSPITAL_INFO.emergencyPhone}</span>
        </a>
      </aside>

      {/* ========================================================================= */}
      {/* 2. FLOATING WHATSAPP & BACK-TO-TOP STACK (BOTTOM RIGHT)                   */}
      {/* ========================================================================= */}
      <aside aria-label="Quick contact and navigation" className="fixed bottom-5 sm:bottom-6 right-5 sm:right-6 z-40 flex flex-col items-center gap-3 pointer-events-none">
        
        {/* Back-to-Top Button */}
        <AnimatePresence>
          {isScrolled && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ duration: 0.2 }}
              type="button"
              onClick={scrollToTop}
              className="pointer-events-auto p-3 rounded-full bg-white dark:bg-dark-surface text-slate-700 dark:text-slate-200 shadow-card border border-slate-200/80 dark:border-dark-border hover:bg-slate-50 dark:hover:bg-dark-card focus-ring transition-transform hover:scale-105 active:scale-90 group"
              title={t('floating.backToTopTooltip')}
              aria-label={t('floating.backToTopTooltip')}
            >
              <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Circular Floating WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white flex items-center justify-center shadow-[0_6px_22px_rgba(37,211,102,0.45)] hover:shadow-[0_10px_32px_rgba(37,211,102,0.65)] hover:scale-110 active:scale-95 transition-all duration-300 focus-ring"
          title={t('floating.whatsappTooltip')}
          aria-label={language === 'hi' ? 'व्हाट्सएप पर संपर्क करें' : 'Chat with Janhit Hospital on WhatsApp'}
        >
          <WhatsAppIcon className="w-7 h-7 sm:w-8 sm:h-8 fill-white" />
        </a>

      </aside>
    </>
  );
};

