import React, { useState } from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingActions } from '../common/FloatingActions';
import { FloatingMedicalIcons } from '../common/FloatingMedicalIcons';
import { Modal } from '../ui/Modal';
import { AppointmentBookingWizard } from '../common/AppointmentBookingWizard';
import { useLanguage } from '../../hooks/useLanguage';
import { ExternalLink } from 'lucide-react';
import { SEOHead } from '../common/SEOHead';

export const MainLayout: React.FC = () => {
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const { t, language } = useLanguage();
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  const handleCloseModal = () => {
    setAppointmentModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-dark-bg text-slate-900 dark:text-slate-100 font-sans selection:bg-teal-500 selection:text-white transition-colors duration-200 relative overflow-x-hidden">
      {/* Dynamic SEO, Canonical, Hreflang & Schema Metadata */}
      <SEOHead />

      {/* Floating Medical Background Elements (Stethoscope, Heart, Plus, Activity) */}
      <FloatingMedicalIcons />

      {/* 0. Accessible Skip-to-Content Link for Screen Readers & Keyboard Users (WCAG 2.1 AA) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-medical-600 focus:text-white focus:font-bold focus:rounded-xl focus:shadow-2xl focus:outline-none focus:ring-4 focus:ring-medical-400"
      >
        {language === 'hi' ? 'मुख्य सामग्री पर जाएं (Skip to main content)' : 'Skip to main content'}
      </a>

      {/* 1. Primary Sticky Navigation Bar with Dropdown Menus */}
      <Header onOpenAppointmentModal={() => setAppointmentModalOpen(true)} />

      {/* 2. Main Routed View with Instant High-Performance Page Transition */}
      <main id="main-content" tabIndex={-1} className="flex-grow focus:outline-none relative z-10">
        <motion.div
          key={location.pathname}
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0.05 : 0.22,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <Outlet context={{ openAppointmentModal: () => setAppointmentModalOpen(true) }} />
        </motion.div>
      </main>

      {/* 4. Comprehensive Healthcare Footer */}
      <Footer />

      {/* 5. Floating Controls: WhatsApp, Mobile Call & Back-To-Top */}
      <FloatingActions onOpenAppointmentModal={() => setAppointmentModalOpen(true)} />

      {/* 6. Global Appointment Booking Modal Dialog */}
      <Modal
        isOpen={appointmentModalOpen}
        onClose={handleCloseModal}
        title={t('appointmentModal.title')}
        description={t('appointmentModal.description')}
        size="xl"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/[0.06]">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'hi'
                ? 'विस्तृत जानकारी एवं स्थिति जांचने हेतु'
                : 'Need more options or check existing status?'}
            </span>
            <Link
              to="/appointment"
              onClick={handleCloseModal}
              className="inline-flex items-center gap-1 text-xs font-semibold text-medical-600 dark:text-medical-400 hover:underline"
            >
              <span>{language === 'hi' ? 'पूरा अपॉइंटमेंट पोर्टल खोलें' : 'Open Full Appointment Portal'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          <AppointmentBookingWizard
            isCompactModal={true}
            onSuccess={() => {
              // Wizard maintains its own success state with printable receipt & copy token
            }}
          />
        </div>
      </Modal>

    </div>
  );
};
