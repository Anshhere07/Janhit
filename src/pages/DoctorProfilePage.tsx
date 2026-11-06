import React from 'react';
import { useParams, Link, useOutletContext, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CalendarCheck,
  Clock,
  MapPin,
  Award,
  Languages,
  CheckCircle2,
  PhoneCall,
  ArrowLeft,
  GraduationCap,
  Sparkles,
  ShieldAlert,
  Building2,
  Calendar,
} from 'lucide-react';
import { ALL_DOCTORS } from '../data/hospitalData';
import { useLanguage } from '../contexts/LanguageContext';
import { Container } from '../components/ui/Container';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
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

export const DoctorProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const outletContext = useOutletContext<LayoutOutletContext>();
  const isHindi = language === 'hi';

  // Find target doctor
  const doctor = ALL_DOCTORS.find((doc) => doc.id === id);

  // If doctor not found, render fallback
  if (!doctor) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 bg-slate-50 dark:bg-dark-bg">
        <div className="max-w-md w-full text-center bg-white dark:bg-dark-surface p-8 rounded-3xl shadow-card border border-slate-200 dark:border-dark-border">
          <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center mb-4">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-navy-950 dark:text-white mb-2">
            {t('doctorsPage.doctorNotFound')}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 font-sans">
            {t('doctorsPage.doctorNotFoundDesc')}
          </p>
          <Link to="/doctors">
            <Button variant="primary" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              {t('doctorsPage.backToDirectory')}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const displayName = isHindi ? doctor.hindiName : doctor.name;
  const displaySpecialization = isHindi ? doctor.hindiSpecialization : doctor.specialization;
  const displayDepartment = isHindi ? doctor.hindiDepartment : doctor.department;
  const displayExperience = isHindi ? doctor.hindiExperience : doctor.experience;
  const displayDesignation = isHindi ? doctor.hindiDesignation : doctor.designation;
  const displayBio = isHindi ? doctor.hindiBio : doctor.bio;
  const displayExpertise = isHindi ? doctor.hindiExpertise : doctor.expertise;
  const displayLanguages = isHindi ? doctor.hindiLanguagesSpoken : doctor.languagesSpoken;

  // Find related doctors (same department, excluding current doctor, or other departments if fewer than 3)
  const sameDeptDoctors = ALL_DOCTORS.filter(
    (d) => d.id !== doctor.id && d.departmentId === doctor.departmentId
  );
  const otherDoctors = ALL_DOCTORS.filter(
    (d) => d.id !== doctor.id && d.departmentId !== doctor.departmentId
  );
  const relatedDoctors = [...sameDeptDoctors, ...otherDoctors].slice(0, 3);

  const handleBookAppointment = () => {
    if (outletContext?.openAppointmentModal) {
      outletContext.openAppointmentModal();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-bg transition-colors duration-300">
      {/* ========================================================================= */}
      {/* 1. BREADCRUMB & HEADER SECTION                                            */}
      {/* ========================================================================= */}
      <section className="pt-8 pb-10 bg-gradient-to-b from-medical-50/50 via-white to-slate-50 dark:from-dark-surface dark:via-dark-bg dark:to-dark-bg border-b border-slate-200/60 dark:border-dark-border">
        <Container size="xl">
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: isHindi ? 'होम' : 'Home', path: '/' },
                { label: isHindi ? 'विशेषज्ञ डॉक्टर्स' : 'Doctors', path: '/doctors' },
                { label: displayName },
              ]}
            />
          </div>

          {/* Quick back link */}
          <button
            type="button"
            onClick={() => navigate('/doctors')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-medical-600 dark:text-slate-400 dark:hover:text-medical-400 transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t('doctorsPage.backToDirectory')}</span>
          </button>

          {/* ======================================================================= */}
          {/* 2. DOCTOR HERO PROFILE HERO CARD                                        */}
          {/* ======================================================================= */}
          <div className="bg-white dark:bg-dark-surface rounded-3xl p-6 sm:p-8 lg:p-10 shadow-card border border-slate-200/80 dark:border-dark-border">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Doctor Portrait Image Frame (Slide In Left) */}
              <motion.div
                variants={slideInLeft}
                initial="hidden"
                animate="visible"
                className="lg:col-span-4 xl:col-span-4"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-md bg-slate-100 dark:bg-dark-card border-2 border-slate-100 dark:border-dark-border aspect-[4/5] max-w-sm mx-auto lg:max-w-none">
                  <img
                    src={doctor.image}
                    alt={displayName}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    srcSet={getResponsiveSrcSet(doctor.image)}
                    sizes="(max-width: 1024px) 100vw, 380px"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50" />

                  {/* Availability Badge */}
                  {doctor.isAvailableToday && (
                    <div className="absolute top-3 left-3 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                      <span>{isHindi ? 'आज ओपीडी उपलब्ध' : 'Available Today'}</span>
                    </div>
                  )}

                  {/* Experience Badge */}
                  <div className="absolute bottom-3 right-3 bg-white/95 dark:bg-dark-surface/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-teal-700 dark:text-teal-400 shadow-md border border-slate-200/50 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                    <span>{displayExperience}</span>
                  </div>
                </div>

                {/* Quick Consultation helpline below photo on desktop */}
                <div className="mt-4 p-4 rounded-2xl bg-medical-50/70 dark:bg-dark-card border border-medical-100 dark:border-dark-border">
                  <div className="flex items-center gap-2 text-xs font-semibold text-medical-800 dark:text-medical-400 mb-1">
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{t('doctorsPage.callDirect')}</span>
                  </div>
                  <a
                    href={`tel:${HOSPITAL_INFO.generalInquiryPhone.replace(/[^0-9+]/g, '')}`}
                    className="text-sm font-bold text-navy-950 dark:text-white hover:text-medical-600 transition-colors"
                  >
                    {HOSPITAL_INFO.generalInquiryPhone}
                  </a>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    {isHindi ? 'सोम-शनि: सुबह 8:00 - रात 8:00' : 'Mon-Sat: 8:00 AM - 8:00 PM'}
                  </p>
                </div>
              </motion.div>

              {/* Doctor Credentials & Overview (Slide In Right) */}
              <motion.div
                variants={slideInRight}
                initial="hidden"
                animate="visible"
                className="lg:col-span-8 xl:col-span-8 flex flex-col justify-between space-y-6"
              >
                <div>
                  {/* Department & Faculty Badges */}
                  <div className="flex items-center gap-2 flex-wrap mb-3">
                    <Badge variant="medical" size="md">
                      {displayDepartment}
                    </Badge>
                    <Badge variant="accent" size="md">
                      {displayDesignation}
                    </Badge>
                  </div>

                  {/* Doctor Name */}
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-950 dark:text-white tracking-tight">
                    {displayName}
                  </h1>

                  {/* Specialization */}
                  <p className="text-base sm:text-lg font-semibold text-medical-600 dark:text-medical-400 mt-1.5">
                    {displaySpecialization}
                  </p>

                  {/* Official Qualifications - verbatim preserved */}
                  <div className="mt-3.5 flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-dark-card border border-slate-200/80 dark:border-dark-border text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans">
                    <GraduationCap className="w-4 h-4 text-medical-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-navy-950 dark:text-white block sm:inline sm:mr-2">
                        {t('doctorsPage.qualificationLabel')}:
                      </span>
                      <span>{doctor.qualifications}</span>
                    </div>
                  </div>

                  {/* Meta badges: Languages & Room */}
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Languages className="w-4 h-4 text-slate-400" />
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {t('doctorsPage.languagesKnown')}:
                      </span>
                      <span>{displayLanguages.join(', ')}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {t('doctorsPage.opdScheduleLabel')}:
                      </span>
                      <span>{isHindi ? doctor.hindiOpdTimings : doctor.opdTimings}</span>
                    </div>
                  </div>
                </div>

                {/* Primary Action Row */}
                <div className="pt-4 border-t border-slate-200 dark:border-dark-border flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Button
                    variant="primary"
                    size="lg"
                    leftIcon={<CalendarCheck className="w-4 h-4" />}
                    onClick={handleBookAppointment}
                    className="shadow-md"
                  >
                    {t('common.bookAppointment')}
                  </Button>

                  <a href={`tel:${HOSPITAL_INFO.generalInquiryPhone.replace(/[^0-9+]/g, '')}`}>
                    <Button
                      variant="outline"
                      size="lg"
                      fullWidth
                      leftIcon={<PhoneCall className="w-4 h-4" />}
                    >
                      {t('common.callHospital')}
                    </Button>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 3. BIOGRAPHY & CLINICAL EXPERTISE DETAILS (2 Columns: Left & Right)        */}
      {/* ========================================================================= */}
      <section className="py-12">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 Cols: Bio and Clinical Areas (Slide In Left) */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewportStandard}
              className="lg:col-span-8 space-y-8"
            >
              {/* Doctor Biography */}
              <div className="bg-white dark:bg-dark-surface p-6 sm:p-8 rounded-3xl shadow-card border border-slate-200/80 dark:border-dark-border">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-medical-600" />
                  <h2 className="text-xl font-bold text-navy-950 dark:text-white">
                    {t('doctorsPage.aboutDoctor')}
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  {displayBio}
                </p>
              </div>

              {/* Clinical Expertise */}
              <div className="bg-white dark:bg-dark-surface p-6 sm:p-8 rounded-3xl shadow-card border border-slate-200/80 dark:border-dark-border">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-4 h-4 text-teal-600" />
                  <h2 className="text-xl font-bold text-navy-950 dark:text-white">
                    {t('doctorsPage.clinicalExpertise')}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  {displayExpertise.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-dark-card border border-slate-100 dark:border-dark-border"
                    >
                      <CheckCircle2 className="w-4 h-4 text-medical-600 dark:text-medical-400 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Consultation Schedule Table */}
              <div className="bg-white dark:bg-dark-surface p-6 sm:p-8 rounded-3xl shadow-card border border-slate-200/80 dark:border-dark-border">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-medical-600" />
                    <h2 className="text-xl font-bold text-navy-950 dark:text-white">
                      {t('doctorsPage.consultationSchedule')}
                    </h2>
                  </div>
                  <span className="text-xs font-semibold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40 px-2.5 py-1 rounded-full border border-teal-200 dark:border-teal-800">
                    OPD Hours
                  </span>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 font-sans">
                  {t('doctorsPage.consultationScheduleDesc')}
                </p>

                {/* Schedule Table */}
                <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-dark-border">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 dark:bg-dark-card text-navy-950 dark:text-white font-bold border-b border-slate-200 dark:border-dark-border">
                      <tr>
                        <th className="py-3 px-4">{t('doctorsPage.scheduleDay')}</th>
                        <th className="py-3 px-4">{t('doctorsPage.scheduleTime')}</th>
                        <th className="py-3 px-4">{t('doctorsPage.scheduleRoom')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-dark-border text-slate-700 dark:text-slate-300">
                      {doctor.schedule.map((slot, index) => (
                        <tr
                          key={index}
                          className="hover:bg-slate-50/50 dark:hover:bg-dark-card/50 transition-colors"
                        >
                          <td className="py-3.5 px-4 font-semibold text-navy-950 dark:text-white">
                            {isHindi ? slot.hindiDay : slot.day}
                          </td>
                          <td className="py-3.5 px-4 flex items-center gap-1.5 text-medical-600 dark:text-medical-400 font-medium">
                            <Clock className="w-3.5 h-3.5 shrink-0" />
                            <span>{isHindi ? slot.hindiTime : slot.time}</span>
                          </td>
                          <td className="py-3.5 px-4 font-medium">
                            <span className="inline-flex items-center gap-1 bg-slate-100 dark:bg-dark-card px-2.5 py-1 rounded-md text-slate-700 dark:text-slate-300">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              {slot.room}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Book Consultation quick prompt */}
                <div className="mt-6 p-4 rounded-2xl bg-slate-50 dark:bg-dark-card border border-slate-200/80 dark:border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    <span className="font-bold text-navy-950 dark:text-white block sm:inline">
                      {isHindi ? 'क्या आप परामर्श बुक करना चाहते हैं?' : 'Prefer to book in advance?'}
                    </span>
                    <span className="sm:ml-2">
                      {isHindi
                        ? 'ऑनलाइन अपॉइंटमेंट से कतार में प्रतीक्षा समय कम होता है।'
                        : 'Pre-booked slots minimize waiting time at the OPD registration desk.'}
                    </span>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    className="shrink-0"
                    leftIcon={<CalendarCheck className="w-3.5 h-3.5" />}
                    onClick={handleBookAppointment}
                  >
                    {t('doctorsPage.bookApptBtn')}
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Right 4 Cols: Quick Info Sidebar (Slide In Right) */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewportStandard}
              className="lg:col-span-4 space-y-6"
            >
              {/* Emergency Helpline Box */}
              <div className="bg-gradient-to-br from-emergency-600 to-rose-700 text-white p-6 rounded-3xl shadow-md space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-rose-200" />
                  <h3 className="text-base font-bold text-white">
                    {t('common.emergency247')}
                  </h3>
                </div>

                <p className="text-xs text-rose-100 leading-relaxed font-sans">
                  {t('doctorsPage.directHelplineNotice')}
                </p>

                <div className="pt-2">
                  <a
                    href={`tel:${HOSPITAL_INFO.emergencyPhone.replace(/-/g, '')}`}
                    className="block w-full text-center py-2.5 px-4 bg-white text-emergency-700 hover:bg-rose-50 font-bold rounded-xl text-sm transition-colors shadow-sm"
                  >
                    {HOSPITAL_INFO.emergencyPhone}
                  </a>
                </div>
              </div>

              {/* Department Overview Link Card */}
              <Card variant="elevated" className="p-6 rounded-3xl space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-medical-50 dark:bg-dark-card text-medical-600 flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-navy-950 dark:text-white">
                      {displayDepartment}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {isHindi ? 'विशिष्ट चिकित्सा केंद्र' : 'Centre of Excellence'}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {isHindi
                    ? 'उन्नत डायग्नोस्टिक्स, अत्याधुनिक ऑपरेशन थिएटर एवं आईसीयू सुविधाओं से सुसज्जित समर्पित क्लिनिकल विभाग।'
                    : 'Fully equipped with modern diagnostic facilities, laminar modular OTs, and dedicated post-operative care units.'}
                </p>

                <div className="pt-2">
                  <Link to="/departments">
                    <Button variant="outline" size="sm" fullWidth>
                      {isHindi ? 'विभाग की सभी सुविधाएं देखें' : 'Explore Department Details'}
                    </Button>
                  </Link>
                </div>
              </Card>

              {/* Verified Hospital Standards Notice */}
              <div className="p-5 rounded-2xl bg-white dark:bg-dark-surface border border-slate-200 dark:border-dark-border text-xs text-slate-500 dark:text-slate-400 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-navy-950 dark:text-white">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  <span>NABH & NABL Clinical Governance</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  {isHindi
                    ? 'डॉक्टर की योग्यताएं एवं मेडिकल काउंसिल पंजीकरण राष्ट्रीय स्वास्थ्य मानकों के अनुसार सत्यापित हैं।'
                    : 'Faculty credentials, degrees and medical council registrations are verified under institutional hospital governance.'}
                </p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 4. RELATED DOCTORS SECTION (Staggered 3-Card Cascade)                      */}
      {/* ========================================================================= */}
      {relatedDoctors.length > 0 && (
        <section className="py-12 bg-white dark:bg-dark-surface border-t border-slate-200/80 dark:border-dark-border">
          <Container size="xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-navy-950 dark:text-white">
                  {t('doctorsPage.relatedDoctors')}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {t('doctorsPage.relatedDoctorsSubtitle')}
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
              {relatedDoctors.map((doc) => (
                <motion.div key={doc.id} variants={threeCardItem}>
                  <DoctorCard
                    doctor={doc}
                    onBookAppointment={handleBookAppointment}
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
