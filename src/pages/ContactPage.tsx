import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  PhoneCall,
  Navigation,
  Share2,
  ChevronRight,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { HOSPITAL_INFO } from '../utils/constants';
import {
  contactService,
  ContactSubmission,
  ContactResponse,
} from '../services/contactService';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input, Select, Textarea } from '../components/ui/Form';
import { motion } from 'framer-motion';
import { fadeInUp, slideInLeft, slideInRight, staggerContainer, viewportStandard } from '../utils/animations';

export const ContactPage: React.FC = () => {
  const { language, t } = useLanguage();
  const isHindi = language === 'hi';

  // Contact Form State
  const [formData, setFormData] = useState<ContactSubmission>({
    fullName: '',
    mobileNumber: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionResult, setSubmissionResult] = useState<ContactResponse | null>(null);

  // Subject options
  const subjectOptions = [
    { value: 'General Inquiry', label: 'General Hospital Inquiry', hindiLabel: 'सामान्य अस्पताल पूछताछ' },
    { value: 'OPD Consultation', label: 'Doctor & OPD Consultation Query', hindiLabel: 'डॉक्टर एवं ओपीडी परामर्श संबंधी' },
    { value: 'Cashless TPA', label: 'Cashless Insurance & TPA Claim', hindiLabel: 'कैशलेस मेडिक्लेम एवं टीपीए क्लेम' },
    { value: 'Medical Records', label: 'Lab Reports & Health Records', hindiLabel: 'जांच रिपोर्ट व मेडिकल रिकॉर्ड' },
    { value: 'Feedback & Grievance', label: 'Patient Experience & Feedback', hindiLabel: 'मरीज सुझाव अथवा शिकायत' },
    { value: 'Health Camp', label: 'Corporate Health Checkup / Camp', hindiLabel: 'कॉर्पोरेट चेकअप व स्वास्थ्य शिविर' },
  ];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errors.fullName = isHindi ? 'कृपया अपना पूरा नाम दर्ज करें।' : 'Please enter your full name.';
    }

    const cleanMobile = formData.mobileNumber.replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      errors.mobileNumber = isHindi
        ? 'कृपया वैध 10-अंकों का भारतीय मोबाइल नंबर दर्ज करें।'
        : 'Please enter a valid 10-digit Indian mobile number.';
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = isHindi
        ? 'कृपया मान्य ईमेल पता दर्ज करें।'
        : 'Please enter a valid email address.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = isHindi
        ? 'कृपया कम से कम 10 अक्षरों में अपना संदेश लिखें।'
        : 'Please provide at least 10 characters describing your inquiry.';
    }

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    try {
      const res = await contactService.submitContactEnquiry({
        ...formData,
        mobileNumber: cleanMobile,
      });
      setSubmissionResult(res);
      setFormData({
        fullName: '',
        mobileNumber: '',
        email: '',
        subject: 'General Inquiry',
        message: '',
      });
    } catch {
      // fallback
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-navy-950 pb-24">
      {/* ========================================================================= */}
      {/* QUICK CONTACT ACTION BAR (DIRECTLY BELOW NAVBAR)                          */}
      {/* ========================================================================= */}
      <section className="relative pt-6 sm:pt-8 pb-8 bg-gradient-to-b from-medical-50/50 via-white to-slate-50/70 dark:from-navy-900/60 dark:via-navy-950 dark:to-navy-950 border-b border-slate-200/80 dark:border-white/[0.08] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Quick Click-to-Action Bar */}
          <motion.div
            variants={staggerContainer(0.06)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportStandard}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
          >
            {/* 1. Emergency Toll-Free */}
            <motion.div variants={fadeInUp}>
              <a
                href={`tel:${HOSPITAL_INFO.emergencyPhone.replace(/-/g, '')}`}
                className="p-3.5 sm:p-4 rounded-2xl bg-emergency-600 text-white shadow-md hover:bg-emergency-700 hover:-translate-y-1 transition-all flex items-center gap-3 group h-full"
              >
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <PhoneCall className="w-5 h-5 animate-pulse" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-emergency-100 uppercase tracking-wider block truncate">
                    {isHindi ? '24/7 इमरजेंसी' : '24/7 Emergency'}
                  </span>
                  <span className="text-xs sm:text-sm font-mono font-bold truncate block">
                    {HOSPITAL_INFO.emergencyPhone}
                  </span>
                </div>
              </a>
            </motion.div>

            {/* 2. WhatsApp Desk */}
            <motion.div variants={fadeInUp}>
              <a
                href={`https://wa.me/${HOSPITAL_INFO.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
                  isHindi
                    ? 'नमस्ते जनहित हॉस्पिटल, मुझे डॉक्टर अपॉइंटमेंट या अस्पताल संबंधी सहायता चाहिए।'
                    : 'Hello Janhit Hospital, I would like assistance regarding patient consultations.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 sm:p-4 rounded-2xl bg-emerald-600 text-white shadow-md hover:bg-emerald-700 hover:-translate-y-1 transition-all flex items-center gap-3 group h-full"
              >
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <Share2 className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-emerald-100 uppercase tracking-wider block truncate">
                    {t('contactPage.whatsappBtn')}
                  </span>
                  <span className="text-xs sm:text-sm font-bold truncate block">
                    {isHindi ? 'तुरंत चैट करें' : 'Chat Instantly'}
                  </span>
                </div>
              </a>
            </motion.div>

            {/* 3. General Helpdesk */}
            <motion.div variants={fadeInUp}>
              <a
                href={`tel:${HOSPITAL_INFO.generalInquiryPhone.replace(/\D/g, '')}`}
                className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/[0.08] text-navy-950 dark:text-white shadow-sm hover:border-medical-500 hover:-translate-y-1 transition-all flex items-center gap-3 group h-full"
              >
                <div className="w-10 h-10 rounded-xl bg-medical-50 dark:bg-medical-950/60 text-medical-600 dark:text-medical-400 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block truncate">
                    {isHindi ? 'ओपीडी हेल्पलाइन' : 'OPD Helpline'}
                  </span>
                  <span className="text-xs sm:text-sm font-mono font-bold truncate block">
                    {HOSPITAL_INFO.generalInquiryPhone}
                  </span>
                </div>
              </a>
            </motion.div>

            {/* 4. Google Maps Directions */}
            <motion.div variants={fadeInUp}>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Garhiya+Rangeen+Uttar+Pradesh"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/[0.08] text-navy-950 dark:text-white shadow-sm hover:border-accent-500 hover:-translate-y-1 transition-all flex items-center gap-3 group h-full"
              >
                <div className="w-10 h-10 rounded-xl bg-accent-50 dark:bg-accent-950/60 text-accent-600 dark:text-accent-400 flex items-center justify-center shrink-0">
                  <Navigation className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block truncate">
                    {isHindi ? 'रास्ता देखें' : 'Get Directions'}
                  </span>
                  <span className="text-xs sm:text-sm font-bold truncate block text-accent-600 dark:text-accent-400">
                    Google Maps
                  </span>
                </div>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. MAIN CONTACT GRID & FORM                                               */}
      {/* ========================================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* 2A. LEFT DETAILS & MAP COLUMN (5 Cols) */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportStandard}
            className="lg:col-span-5 space-y-6"
          >
            {/* Campus Address Card */}
            <Card className="p-6 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-medical-50 dark:bg-medical-950/60 text-medical-600 dark:text-medical-400 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-navy-950 dark:text-white">
                    {t('contactPage.addressTitle')}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isHindi ? HOSPITAL_INFO.hindiName : HOSPITAL_INFO.name}
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed pt-1">
                {isHindi ? HOSPITAL_INFO.hindiAddress : HOSPITAL_INFO.address}
              </p>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200/70 dark:border-white/[0.06] text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-navy-950 dark:text-white">
                  {isHindi ? 'स्थान / लैंडमार्क:' : 'Location / Landmark:'}
                </span>{' '}
                {isHindi
                  ? 'गढ़िया रंगीन, उत्तर प्रदेश 242303'
                  : 'Garhiya Rangeen, Uttar Pradesh 242303'}
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Garhiya+Rangeen+Uttar+Pradesh"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-medical-600 hover:bg-medical-700 text-white font-bold text-xs transition-colors shadow-sm"
              >
                <Navigation className="w-4 h-4" />
                <span>{t('contactPage.getDirectionsBtn')}</span>
              </a>
            </Card>

            {/* Operating Hours Card */}
            <Card className="p-6 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-navy-950 dark:text-white">
                  {t('contactPage.workingHoursTitle')}
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/[0.06]">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    {isHindi ? '24/7 इमरजेंसी एवं आईसीयू' : '24/7 Emergency & ICU'}:
                  </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {isHindi ? '24 घंटे खुला' : '24 Hours Open'}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/[0.06]">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    {isHindi ? 'ओपीडी परामर्श (सोम - शनि)' : 'OPD Consultations (Mon-Sat)'}:
                  </span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    08:00 AM – 08:00 PM
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/[0.06]">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    {isHindi ? 'मरीज मुलाकात समय' : 'Inpatient Visiting Hours'}:
                  </span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    05:00 PM – 07:00 PM
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">
                    {isHindi ? 'सेंट्रल पैथोलॉजी व फार्मेसी' : 'Central Lab & Pharmacy'}:
                  </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {isHindi ? '24 घंटे संचालित' : 'Round the Clock'}
                  </span>
                </div>
              </div>
            </Card>

            {/* Email & Contact Details Card */}
            <Card className="p-6 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent-50 dark:bg-accent-950/60 text-accent-600 dark:text-accent-400 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-navy-950 dark:text-white">
                  {t('contactPage.emailTitle')}
                </h3>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-400 block">{isHindi ? 'मरीज देखभाल एवं पूछताछ' : 'Patient Care & Inquiries'}:</span>
                  <a
                    href={`mailto:${HOSPITAL_INFO.email}`}
                    className="font-semibold text-medical-600 dark:text-medical-400 hover:underline"
                  >
                    {HOSPITAL_INFO.email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block">{isHindi ? 'अपॉइंटमेंट डेस्क' : 'Appointments Desk'}:</span>
                  <a
                    href="mailto:appointments@janhithospital.com"
                    className="font-semibold text-medical-600 dark:text-medical-400 hover:underline"
                  >
                    appointments@janhithospital.com
                  </a>
                </div>
              </div>
            </Card>

            {/* Social Media Links Card */}
            <Card className="p-6 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-sm">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-3">
                {t('contactPage.socialLinksTitle')}
              </h3>
              <div className="flex items-center gap-2">
                <a
                  href={HOSPITAL_INFO.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-navy-800 hover:bg-blue-600 hover:text-white flex items-center justify-center text-slate-600 dark:text-slate-300 transition-colors"
                  title="Facebook"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href={HOSPITAL_INFO.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-navy-800 hover:bg-slate-700 hover:text-white flex items-center justify-center text-slate-600 dark:text-slate-300 transition-colors"
                  title="Twitter / X"
                  aria-label="Twitter / X"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href={HOSPITAL_INFO.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-navy-800 hover:bg-pink-600 hover:text-white flex items-center justify-center text-slate-600 dark:text-slate-300 transition-colors"
                  title="Instagram"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href={HOSPITAL_INFO.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-navy-800 hover:bg-red-600 hover:text-white flex items-center justify-center text-slate-600 dark:text-slate-300 transition-colors"
                  title="YouTube"
                  aria-label="YouTube"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a
                  href={HOSPITAL_INFO.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-navy-800 hover:bg-blue-700 hover:text-white flex items-center justify-center text-slate-600 dark:text-slate-300 transition-colors"
                  title="LinkedIn"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.738-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </Card>
          </motion.div>

          {/* 2B. RIGHT CONTACT FORM & GOOGLE MAPS COLUMN (7 Cols) */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportStandard}
            className="lg:col-span-7 space-y-8"
          >
            {/* Contact Inquiry Form Card */}
            <Card className="p-6 sm:p-8 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-sm">
              <div className="max-w-xl mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-navy-950 dark:text-white">
                  {t('contactPage.formTitle')}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                  {t('contactPage.formSubtitle')}
                </p>
              </div>

              {submissionResult ? (
                <div className="p-6 sm:p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-emerald-950 dark:text-emerald-100">
                      {t('contactPage.successTitle')}
                    </h3>
                    <p className="text-sm text-emerald-800 dark:text-emerald-300 mt-1 max-w-md mx-auto leading-relaxed">
                      {t('contactPage.successDesc').replace('{id}', submissionResult.referenceId)}
                    </p>
                  </div>
                  <div className="pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setSubmissionResult(null)}
                    >
                      {t('contactPage.submitAnother')}
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <Input
                      label={t('contactPage.formName')}
                      isRequired
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder={t('contactPage.formNamePlaceholder')}
                      error={formErrors.fullName}
                    />

                    {/* Mobile Number */}
                    <Input
                      label={t('contactPage.formMobile')}
                      isRequired
                      type="tel"
                      maxLength={10}
                      value={formData.mobileNumber}
                      onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                      placeholder={t('contactPage.formMobilePlaceholder')}
                      error={formErrors.mobileNumber}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <Input
                      label={t('contactPage.formEmail')}
                      isRequired
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t('contactPage.formEmailPlaceholder')}
                      error={formErrors.email}
                    />

                    {/* Subject */}
                    <Select
                      label={t('contactPage.formSubject')}
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      options={subjectOptions.map((opt) => ({
                        value: opt.value,
                        label: isHindi ? opt.hindiLabel : opt.label,
                      }))}
                    />
                  </div>

                  {/* Message Area */}
                  <Textarea
                    label={t('contactPage.formMessage')}
                    isRequired
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t('contactPage.formMessagePlaceholder')}
                    error={formErrors.message}
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    isLoading={isSubmitting}
                    leftIcon={<Send className="w-4 h-4" />}
                    className="w-full sm:w-auto px-8"
                  >
                    {isSubmitting ? t('contactPage.submitting') : t('contactPage.submitBtn')}
                  </Button>
                </form>
              )}
            </Card>

            {/* Google Maps Interactive Frame */}
            <Card className="overflow-hidden border-slate-200 dark:border-white/[0.08] bg-white dark:bg-navy-900 shadow-sm">
              <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-navy-950 dark:text-white flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-medical-600" />
                    <span>{isHindi ? 'अस्पताल नक्शा एवं लाइव लोकेशन' : 'Campus Location & Live Map'}</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Garhiya Rangeen, Uttar Pradesh - 242303
                  </p>
                </div>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Garhiya+Rangeen+Uttar+Pradesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-medical-600 dark:text-medical-400 hover:underline flex items-center gap-1"
                >
                  <span>{isHindi ? 'बड़ा नक्शा' : 'Full Map'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Map Iframe */}
              <div className="relative w-full h-80 sm:h-96 bg-slate-100 dark:bg-navy-950">
                <iframe
                  title="Janhit Hospital Campus Location Map - Garhiya Rangeen"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14100.943470704877!2d79.50467521815357!3d27.925413526118064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399fe70a70a66977%3A0xbb2791d5b14448ab!2sGarhiya%20Rangeen%2C%20Uttar%20Pradesh%20242303!5e0!3m2!1sen!2sin!4v1793949781123!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="w-full h-full filter contrast-100 opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};
export default ContactPage;

