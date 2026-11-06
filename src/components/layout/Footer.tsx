import React from 'react';
import { Link } from 'react-router-dom';
import {
  PhoneCall,
  Mail,
  MapPin,
  Clock,
  Award,
  ShieldCheck,
  Heart,
  ArrowRight,
  CalendarCheck,
} from 'lucide-react';
import { HOSPITAL_INFO } from '../../utils/constants';
import { useLanguage } from '../../hooks/useLanguage';
import { BrandLogo } from '../common/BrandLogo';
import { FooterFloatingMedicalIcons } from '../common/FloatingMedicalIcons';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  const clinicalCentres = [
    {
      name: language === 'hi' ? 'कार्डियोलॉजी एवं हार्ट केयर' : 'Cardiology & Heart Care',
      path: '/departments/cardiology',
    },
    {
      name: language === 'hi' ? 'न्यूरोलॉजी एवं स्पाइन सर्जरी' : 'Neurology & Neuro Surgery',
      path: '/departments/neurology',
    },
    {
      name: language === 'hi' ? 'ऑर्थोपेडिक्स एवं रोबोटिक रिप्लेसमेंट' : 'Orthopaedics & Joint Care',
      path: '/departments/orthopaedics',
    },
    {
      name: language === 'hi' ? 'मेडिकल एवं सर्जिकल ऑन्कोलॉजी' : 'Medical & Surgical Oncology',
      path: '/departments/oncology',
    },
    {
      name: language === 'hi' ? 'बाल रोग एवं एनआईसीयू (NICU)' : 'Paediatrics & Neonatology',
      path: '/departments/paediatrics',
    },
    {
      name: language === 'hi' ? 'गैस्ट्रोएंटरोलॉजी एवं हेपेटोलॉजी' : 'Gastroenterology & Hepatology',
      path: '/departments/gastroenterology',
    },
  ];

  const doctorLinks = [
    {
      name: language === 'hi' ? 'विशेषज्ञ डॉक्टर खोजें' : 'Find a Specialist Doctor',
      path: '/doctors',
    },
    {
      name: language === 'hi' ? 'ओपीडी परामर्श समय सारिणी' : 'OPD Consultation Schedule',
      path: '/appointment',
    },
    {
      name: language === 'hi' ? 'वरिष्ठ कंसल्टेंट्स एवं सर्जन' : 'Senior Consultants & Faculty',
      path: '/doctors',
    },
    {
      name: language === 'hi' ? 'ऑनलाइन डॉक्टर परामर्श' : 'Book Online Consultation',
      path: '/appointment',
    },
    {
      name: language === 'hi' ? 'चिकित्सा परामर्श एवं सहायता' : 'Medical Consultation & Support',
      path: '/contact',
    },
  ];

  const quickNav = [
    { name: language === 'hi' ? 'होम' : 'Home', path: '/' },
    { name: language === 'hi' ? 'हमारे बारे में' : 'About Hospital', path: '/about' },
    { name: language === 'hi' ? 'चिकित्सा विभाग' : 'Medical Departments', path: '/departments' },
    { name: language === 'hi' ? 'विशेषज्ञ डॉक्टर्स' : 'Doctors & Specialists', path: '/doctors' },
    { name: language === 'hi' ? 'उपचार व सर्जरी' : 'Treatments & Surgeries', path: '/treatments' },
    { name: language === 'hi' ? 'सुविधाएं एवं इन्फ्रास्ट्रक्चर' : 'Hospital Facilities', path: '/facilities' },
    { name: language === 'hi' ? 'फोटो एवं वीडियो गैलरी' : 'Hospital Gallery', path: '/gallery' },
    { name: language === 'hi' ? 'संपर्क एवं लोकेशन' : 'Contact & Directions', path: '/contact' },
  ];

  return (
    <footer className="bg-navy-950 text-slate-300 pt-16 pb-12 border-t border-navy-900 selection:bg-teal-500 selection:text-white relative overflow-hidden">
      {/* Asymmetrical Floating Medical Icons (One near text, one far, zero vertical line pattern) */}
      <FooterFloatingMedicalIcons />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* TOP CALLOUT BAR: EMERGENCY, APPOINTMENT & ACCREDITATION                   */}
        {/* ========================================================================= */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-navy-900 via-navy-900 to-navy-850 border border-navy-800 mb-12 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center lg:text-left">
            <div className="w-12 h-12 rounded-xl bg-emergency-500/20 text-emergency-400 flex items-center justify-center shrink-0 border border-emergency-500/30">
              <PhoneCall className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white tracking-tight">
                {t('footer.emergencyHelpline', 'Emergency & Trauma Assistance')}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                {language === 'hi'
                  ? 'गंभीर स्थिति में त्वरित एम्बुलेंस एवं आईसीयू सहायता उपलब्ध है।'
                  : 'Immediate response team, rapid resuscitation and cardiac ambulances on standby.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap justify-center">
            <a
              href={`tel:${HOSPITAL_INFO.emergencyPhone.replace(/-/g, '')}`}
              className="flex items-center gap-2 bg-emergency-600 hover:bg-emergency-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{HOSPITAL_INFO.emergencyPhone}</span>
            </a>

            <Link
              to="/doctors"
              className="flex items-center gap-2 bg-medical-600 hover:bg-medical-700 text-white font-medium text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>{t('common.bookAppointment')}</span>
            </Link>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MAIN 5-COLUMN FOOTER GRID                                                 */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 pb-12 border-b border-navy-900">
          
          {/* Column 1: Hospital Identity, Intro & Social Icons (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white/5 inline-block p-2 rounded-xl backdrop-blur-sm border border-white/10">
              <BrandLogo />
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t('footer.aboutText')}
            </p>

            {/* Social Media Links with High Quality SVGs */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">
                {t('common.followUs')}
              </span>
              <div className="flex items-center gap-2.5">
                {/* Facebook */}
                <a
                  href={HOSPITAL_INFO.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-navy-900/90 hover:bg-medical-600 text-slate-300 hover:text-white flex items-center justify-center border border-navy-800/80 hover:border-medical-500/50 shadow-sm hover:shadow-md hover:shadow-medical-500/20 hover:-translate-y-0.5 transition-all duration-200"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                {/* Twitter / X */}
                <a
                  href={HOSPITAL_INFO.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-navy-900/90 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center border border-navy-800/80 hover:border-slate-600 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  aria-label="Twitter / X"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                {/* Instagram */}
                <a
                  href={HOSPITAL_INFO.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-navy-900/90 hover:bg-gradient-to-tr hover:from-amber-600 hover:via-pink-600 hover:to-purple-600 text-slate-300 hover:text-white flex items-center justify-center border border-navy-800/80 hover:border-pink-500/50 shadow-sm hover:shadow-md hover:shadow-pink-500/20 hover:-translate-y-0.5 transition-all duration-200"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                {/* YouTube */}
                <a
                  href={HOSPITAL_INFO.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-navy-900/90 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center border border-navy-800/80 hover:border-red-500/50 shadow-sm hover:shadow-md hover:shadow-red-500/20 hover:-translate-y-0.5 transition-all duration-200"
                  aria-label="YouTube"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                {/* LinkedIn */}
                <a
                  href={HOSPITAL_INFO.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-navy-900/90 hover:bg-medical-700 text-slate-300 hover:text-white flex items-center justify-center border border-navy-800/80 hover:border-medical-500/50 shadow-sm hover:shadow-md hover:shadow-medical-500/20 hover:-translate-y-0.5 transition-all duration-200"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.738-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Accreditations */}
            <div className="pt-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                {t('common.nabhAccredited')}
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {HOSPITAL_INFO.accreditations.map((acc) => (
                  <span
                    key={acc.name}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-navy-900/90 border border-navy-800 text-[11px] font-medium text-slate-300"
                    title={acc.fullName}
                  >
                    <Award className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>{acc.name}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {quickNav.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="group text-slate-400 hover:text-teal-400 transition-all duration-200 inline-flex items-center gap-1.5 py-0.5 hover:translate-x-1"
                  >
                    <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-teal-400 group-hover:translate-x-0.5 transition-all" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Clinical Departments (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white">
              {t('footer.clinicalCentres')}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {clinicalCentres.map((dept) => (
                <li key={dept.path}>
                  <Link
                    to={dept.path}
                    className="group text-slate-400 hover:text-teal-400 transition-all duration-200 inline-flex items-center gap-1.5 py-0.5 hover:translate-x-1"
                  >
                    <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-teal-400 group-hover:translate-x-0.5 transition-all" />
                    <span>{dept.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Doctor Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white">
              {t('footer.doctorLinks')}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {doctorLinks.map((doc) => (
                <li key={doc.name}>
                  <Link
                    to={doc.path}
                    className="group text-slate-400 hover:text-teal-400 transition-all duration-200 inline-flex items-center gap-1.5 py-0.5 hover:translate-x-1"
                  >
                    <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-teal-400 group-hover:translate-x-0.5 transition-all" />
                    <span>{doc.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Contact, Address & Timings (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white">
              {t('footer.emergencyContacts')}
            </h4>
            
            <div className="space-y-3 text-xs sm:text-sm">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(HOSPITAL_INFO.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-2.5 text-slate-300 hover:text-teal-300 transition-colors"
                title={language === 'hi' ? 'गूगल मैप्स पर दिशा निर्देश देखें' : 'Get directions on Google Maps'}
              >
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="leading-snug underline-offset-2 group-hover:underline">
                  {language === 'hi' ? HOSPITAL_INFO.hindiAddress : HOSPITAL_INFO.address}
                </span>
              </a>

              <div className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-emergency-400 shrink-0" />
                <a
                  href={`tel:${HOSPITAL_INFO.emergencyPhone.replace(/-/g, '')}`}
                  className="text-emergency-300 font-bold hover:underline"
                >
                  {HOSPITAL_INFO.emergencyPhone} ({t('common.emergency247')})
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-medical-400 shrink-0" />
                <a
                  href={`mailto:${HOSPITAL_INFO.email}`}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  {HOSPITAL_INFO.email}
                </a>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-[11px] text-slate-400 space-y-1">
                  <div className="font-semibold text-slate-200">
                    {language === 'hi' ? HOSPITAL_INFO.hindiOperatingHours : HOSPITAL_INFO.operatingHours}
                  </div>
                  <div>
                    {language === 'hi' ? HOSPITAL_INFO.hindiOpdHours : HOSPITAL_INFO.opdHours}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* BOTTOM COPYRIGHT, POLICIES & COMPLIANCE BAR                               */}
        {/* ========================================================================= */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-1.5 text-center sm:text-left">
            <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
            <span>{t('footer.copyright')}</span>
          </div>

          <div className="flex items-center space-x-6 flex-wrap justify-center">
            <Link to="/privacy" className="hover:text-slate-300 transition-colors">
              {t('footer.privacyPolicy')}
            </Link>
            <Link to="/terms" className="hover:text-slate-300 transition-colors">
              {t('footer.termsOfService')}
            </Link>
            <Link to="/admin/login" className="hover:text-teal-400 transition-colors font-medium">
              {language === 'hi' ? 'स्टाफ लॉगिन' : 'Staff Portal'}
            </Link>
            <span className="flex items-center gap-1 text-slate-400">
              Made with <Heart className="w-3 h-3 text-emergency-500 inline fill-emergency-500" /> for Healthcare
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
