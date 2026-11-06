import React, { useState } from 'react';
import { useParams, Link, useOutletContext, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CalendarCheck,
  PhoneCall,
  ArrowLeft,
  ArrowRight,
  Clock,
  BedDouble,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  Sparkle,
  Sparkles,
  ClipboardList,
  Stethoscope,
  HeartPulse,
} from 'lucide-react';
import { TREATMENTS_DATA, ALL_DOCTORS } from '../data/hospitalData';
import { useLanguage } from '../contexts/LanguageContext';
import { Container } from '../components/ui/Container';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { DoctorCard } from '../components/common/DoctorCard';
import { HOSPITAL_INFO } from '../utils/constants';
import { getResponsiveSrcSet } from '../utils/imageUtils';
import {
  slideInLeft,
  slideInRight,
  threeCardItem,
  staggerContainer,
  viewportStandard,
} from '../utils/animations';

interface LayoutOutletContext {
  openAppointmentModal?: () => void;
}

export const TreatmentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const outletContext = useOutletContext<LayoutOutletContext>();
  const isHindi = language === 'hi';

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const treatment = TREATMENTS_DATA.find((tr) => tr.id === id);

  if (!treatment) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 bg-slate-50 dark:bg-dark-bg">
        <div className="max-w-md w-full text-center bg-white dark:bg-dark-surface p-8 rounded-3xl shadow-card border border-slate-200 dark:border-dark-border">
          <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center mb-4">
            <Stethoscope className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-navy-950 dark:text-white mb-2">
            {t('treatmentsPage.treatmentNotFound')}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 font-sans">
            {t('treatmentsPage.treatmentNotFoundDesc')}
          </p>
          <Link to="/treatments">
            <Button variant="primary" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              {t('treatmentsPage.backToDirectory')}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const displayName = isHindi ? treatment.hindiName : treatment.name;
  const displayDept = isHindi ? treatment.hindiDepartmentName : treatment.departmentName;
  const displayBadge = isHindi ? treatment.hindiBadge : treatment.badge;
  const displayOverview = isHindi ? treatment.hindiOverview : treatment.overview;
  const displaySymptoms = isHindi ? treatment.hindiSymptomsAndIndications : treatment.symptomsAndIndications;
  const displayRecovery = isHindi ? treatment.hindiRecoveryGuidelines : treatment.recoveryGuidelines;
  const fastFacts = treatment.fastFacts;
  const specialistDoctors = ALL_DOCTORS.filter((doc) => treatment.specialistDoctorIds.includes(doc.id));

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-bg transition-colors duration-300">
      {/* ========================================================================= */}
      {/* 1. BREADCRUMB & HERO BANNER                                               */}
      {/* ========================================================================= */}
      <section className="relative pt-8 pb-12 bg-gradient-to-b from-medical-50/60 via-white to-slate-50 dark:from-dark-surface dark:via-dark-bg dark:to-dark-bg border-b border-slate-200/60 dark:border-dark-border">
        <Container size="xl">
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: isHindi ? 'होम' : 'Home', path: '/' },
                { label: isHindi ? 'उपचार व सर्जरी' : 'Treatments', path: '/treatments' },
                { label: displayName },
              ]}
            />
          </div>

          <button
            type="button"
            onClick={() => navigate('/treatments')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-medical-600 dark:text-slate-400 dark:hover:text-medical-400 transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t('treatmentsPage.backToDirectory')}</span>
          </button>

          {/* Treatment Hero Card (2 Columns: Left & Right) */}
          <div className="bg-white dark:bg-dark-surface rounded-3xl p-6 sm:p-8 lg:p-10 shadow-card border border-slate-200/80 dark:border-dark-border overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Details (Slide In Left) */}
              <motion.div
                variants={slideInLeft}
                initial="hidden"
                animate="visible"
                className="lg:col-span-7 space-y-6"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <Badge variant="accent" size="md" className="flex items-center gap-1.5">
                      <Sparkle className="w-3.5 h-3.5" />
                      <span>{displayBadge}</span>
                    </Badge>
                    <Link
                      to={`/departments/${treatment.departmentId}`}
                      className="text-xs font-semibold text-medical-600 dark:text-medical-400 hover:underline flex items-center gap-1 bg-medical-50 dark:bg-medical-950/40 px-2.5 py-1 rounded-full border border-medical-200 dark:border-medical-800"
                    >
                      <span>{displayDept}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 dark:text-white tracking-tight leading-tight">
                    {displayName}
                  </h1>

                  <p className="text-base sm:text-lg font-semibold text-slate-600 dark:text-slate-300 mt-2 font-sans">
                    {isHindi ? treatment.hindiShortDesc : treatment.shortDesc}
                  </p>
                </div>

                {/* Fast Facts Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-dark-card border border-slate-100 dark:border-dark-border text-xs">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 block mb-0.5">
                      {t('treatmentsPage.duration')}
                    </span>
                    <span className="font-bold text-navy-950 dark:text-white flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-medical-600 shrink-0" />
                      {isHindi ? fastFacts.hindiDuration : fastFacts.duration}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 block mb-0.5">
                      {t('treatmentsPage.anesthesia')}
                    </span>
                    <span className="font-bold text-navy-950 dark:text-white line-clamp-1">
                      {isHindi ? fastFacts.hindiAnesthesia : fastFacts.anesthesia}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 block mb-0.5">
                      {t('treatmentsPage.hospitalStay')}
                    </span>
                    <span className="font-bold text-navy-950 dark:text-white flex items-center gap-1">
                      <BedDouble className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      {isHindi ? fastFacts.hindiHospitalStay : fastFacts.hospitalStay}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 block mb-0.5">
                      {t('treatmentsPage.recoveryTime')}
                    </span>
                    <span className="font-bold text-navy-950 dark:text-white line-clamp-1">
                      {isHindi ? fastFacts.hindiRecoveryTime : fastFacts.recoveryTime}
                    </span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Button
                    variant="primary"
                    size="lg"
                    leftIcon={<CalendarCheck className="w-4 h-4" />}
                    onClick={() => outletContext?.openAppointmentModal?.()}
                  >
                    {t('common.bookAppointment')}
                  </Button>

                  <a href={`tel:${HOSPITAL_INFO.generalInquiryPhone.replace(/[^0-9+]/g, '')}`}>
                    <Button variant="outline" size="lg" fullWidth leftIcon={<PhoneCall className="w-4 h-4" />}>
                      {t('treatmentsPage.callHelplineCta')}
                    </Button>
                  </a>
                </div>
              </motion.div>

              {/* Right Column: Hero Visual (Slide In Right) */}
              <motion.div
                variants={slideInRight}
                initial="hidden"
                animate="visible"
                className="lg:col-span-5 relative"
              >
                <div className="rounded-2xl overflow-hidden shadow-elevated border-4 border-white dark:border-dark-card aspect-[4/3]">
                  <img
                    src={treatment.image}
                    alt={displayName}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    srcSet={getResponsiveSrcSet(treatment.image)}
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute -bottom-4 -right-4 bg-white dark:bg-dark-surface p-3.5 rounded-2xl shadow-elevated border border-slate-100 dark:border-dark-border hidden sm:flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-navy-950 dark:text-white">
                      Verified Surgical Protocol
                    </h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Evidence-Based Clinical Guidelines
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 2. PROCEDURE OVERVIEW, SYMPTOMS & PROTOCOLS (2 Columns: Left & Right)     */}
      {/* ========================================================================= */}
      <section className="py-12">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Cols: Overview, Indications & Steps (Slide In Left) */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewportStandard}
              className="lg:col-span-7 space-y-8"
            >
              {/* Detailed Overview */}
              <div className="bg-white dark:bg-dark-surface p-6 sm:p-8 rounded-3xl shadow-card border border-slate-200/80 dark:border-dark-border">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-medical-600" />
                  <h2 className="text-xl font-bold text-navy-950 dark:text-white">
                    {t('treatmentsPage.procedureOverview')}
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  {displayOverview}
                </p>
              </div>

              {/* Indications & Symptoms Treated */}
              <div className="bg-white dark:bg-dark-surface p-6 sm:p-8 rounded-3xl shadow-card border border-slate-200/80 dark:border-dark-border">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="w-5 h-5 text-medical-600" />
                  <h2 className="text-xl font-bold text-navy-950 dark:text-white">
                    {t('treatmentsPage.symptomsTitle')}
                  </h2>
                </div>

                <div className="space-y-2.5 pt-1">
                  {displaySymptoms.map((sym, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-dark-card border border-slate-100 dark:border-dark-border text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans"
                    >
                      <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                      <span>{sym}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Procedure Steps */}
              <div className="bg-white dark:bg-dark-surface p-6 sm:p-8 rounded-3xl shadow-card border border-slate-200/80 dark:border-dark-border">
                <div className="flex items-center gap-2 mb-4">
                  <ClipboardList className="w-5 h-5 text-teal-600" />
                  <h2 className="text-xl font-bold text-navy-950 dark:text-white">
                    {t('treatmentsPage.procedureSteps')}
                  </h2>
                </div>

                <div className="space-y-4 pt-1">
                  {treatment.procedureSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-dark-card border border-slate-100 dark:border-dark-border space-y-1.5"
                    >
                      <h3 className="text-sm font-bold text-navy-950 dark:text-white">
                        {isHindi ? step.hindiStep : step.step}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                        {isHindi ? step.hindiDetails : step.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Post-Procedure Recovery Guidelines */}
              <div className="bg-white dark:bg-dark-surface p-6 sm:p-8 rounded-3xl shadow-card border border-slate-200/80 dark:border-dark-border">
                <div className="flex items-center gap-2 mb-4">
                  <HeartPulse className="w-5 h-5 text-medical-600" />
                  <h2 className="text-xl font-bold text-navy-950 dark:text-white">
                    {t('treatmentsPage.recoveryGuidelines')}
                  </h2>
                </div>

                <div className="space-y-2.5 pt-1">
                  {displayRecovery.map((rec, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-dark-card border border-slate-100 dark:border-dark-border text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right 5 Cols: Diagnostics, FAQs & Disclaimer (Slide In Right) */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewportStandard}
              className="lg:col-span-5 space-y-6"
            >
              {/* Diagnostic Roadmap Card */}
              <div className="bg-white dark:bg-dark-surface p-6 sm:p-8 rounded-3xl shadow-card border border-slate-200/80 dark:border-dark-border space-y-4">
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-medical-600" />
                  <h3 className="text-lg font-bold text-navy-950 dark:text-white">
                    {t('treatmentsPage.diagnosticRoadmap')}
                  </h3>
                </div>

                <div className="space-y-3 pt-1">
                  {treatment.diagnosticTests.map((dt, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-dark-card border border-slate-100 dark:border-dark-border space-y-1"
                    >
                      <span className="text-xs font-bold text-navy-950 dark:text-white block">
                        {isHindi ? dt.hindiTest : dt.test}
                      </span>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                        {isHindi ? dt.hindiPurpose : dt.purpose}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Treatment FAQs Accordion */}
              <div className="bg-white dark:bg-dark-surface p-6 sm:p-8 rounded-3xl shadow-card border border-slate-200/80 dark:border-dark-border">
                <div className="flex items-center gap-2 mb-4">
                  <HelpCircle className="w-5 h-5 text-medical-600" />
                  <h3 className="text-lg font-bold text-navy-950 dark:text-white">
                    {t('departmentsPage.faqsTitle')}
                  </h3>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-dark-border">
                  {treatment.faqs.map((faq, index) => {
                    const isOpen = openFaqIndex === index;
                    return (
                      <div key={index} className="py-3">
                        <button
                          type="button"
                          onClick={() => toggleFaq(index)}
                          className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-bold text-navy-950 dark:text-white hover:text-medical-600 transition-colors gap-2"
                        >
                          <span>{isHindi ? faq.hindiQuestion : faq.question}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                              isOpen ? 'rotate-180 text-medical-600' : ''
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                            {isHindi ? faq.hindiAnswer : faq.answer}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Medical Notice / Educational Disclaimer */}
              <div className="p-5 rounded-3xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60 space-y-2">
                <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{t('treatmentsPage.medicalDisclaimerTitle')}</span>
                </div>
                <p className="text-[11px] text-amber-900/80 dark:text-amber-300/80 leading-relaxed font-sans">
                  {t('treatmentsPage.medicalDisclaimer')}
                </p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 3. SPECIALIST SURGEONS & DOCTORS (Staggered 3-Card Grid)                   */}
      {/* ========================================================================= */}
      {specialistDoctors.length > 0 && (
        <section className="py-12 bg-white dark:bg-dark-surface border-t border-slate-200/80 dark:border-dark-border">
          <Container size="xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-navy-950 dark:text-white">
                  {t('treatmentsPage.specialistsTitle')}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-sans">
                  {t('treatmentsPage.specialistsSubtitle')}
                </p>
              </div>

              <Link to="/doctors" className="mt-3 md:mt-0">
                <Button variant="outline" size="sm">
                  {t('doctorsSection.viewAllDoctorsBtn')}
                </Button>
              </Link>
            </div>

            <motion.div
              variants={staggerContainer(0.12)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportStandard}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {specialistDoctors.map((doc) => (
                <motion.div key={doc.id} variants={threeCardItem}>
                  <DoctorCard
                    doctor={doc}
                    onBookAppointment={() => outletContext?.openAppointmentModal?.()}
                  />
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </section>
      )}
    </div>
  );
};

