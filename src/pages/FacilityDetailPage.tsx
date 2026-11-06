import React, { useState } from 'react';
import { useParams, Link, useOutletContext, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CalendarCheck,
  PhoneCall,
  ArrowLeft,
  ArrowRight,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Cpu,
  BedDouble,
  Radio,
  TestTube,
  Baby,
  Activity,
  ShieldAlert,
  Ambulance,
  Pill,
  Sparkles,
  Info,
} from 'lucide-react';
import { FACILITIES_DATA, DEPARTMENTS_DATA, ALL_DOCTORS } from '../data/hospitalData';
import { useLanguage } from '../contexts/LanguageContext';
import { Container } from '../components/ui/Container';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { DoctorCard } from '../components/common/DoctorCard';
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

export const FacilityDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const outletContext = useOutletContext<LayoutOutletContext>();
  const isHindi = language === 'hi';

  const facility = FACILITIES_DATA.find((fac) => fac.id === id);

  // Active gallery image state
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!facility) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 bg-slate-50 dark:bg-dark-bg">
        <div className="max-w-md w-full text-center bg-white dark:bg-dark-surface p-8 rounded-3xl shadow-card border border-slate-200 dark:border-dark-border">
          <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center mb-4">
            <Building2 className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-navy-950 dark:text-white mb-2">
            {t('facilitiesPage.facilityNotFound')}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 font-sans">
            {t('facilitiesPage.facilityNotFoundDesc')}
          </p>
          <Link to="/facilities">
            <Button variant="primary" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              {t('facilitiesPage.backToDirectory')}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const displayName = isHindi ? facility.hindiName : facility.name;
  const displayCategory = isHindi ? facility.hindiCategory : facility.category;
  const displayBadge = isHindi ? facility.hindiBadge : facility.badge;
  const displayOverview = isHindi ? facility.hindiOverview : facility.overview;
  const patientInfo = facility.patientInfo;
  const allImages = [facility.mainImage, ...facility.galleryImages];
  const relatedDepartments = DEPARTMENTS_DATA.filter((d) => facility.relatedDepartmentIds.includes(d.id));
  const relevantDoctors = ALL_DOCTORS.filter((doc) => facility.relevantDoctorIds.includes(doc.id));

  const getFacilityIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5" />;
      case 'Activity':
        return <Activity className="w-5 h-5" />;
      case 'Baby':
        return <Baby className="w-5 h-5" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      case 'Radio':
        return <Radio className="w-5 h-5" />;
      case 'TestTube':
        return <TestTube className="w-5 h-5" />;
      case 'BedDouble':
        return <BedDouble className="w-5 h-5" />;
      case 'Ambulance':
        return <Ambulance className="w-5 h-5" />;
      case 'Pill':
        return <Pill className="w-5 h-5" />;
      default:
        return <Building2 className="w-5 h-5" />;
    }
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
                { label: isHindi ? 'सुविधाएं' : 'Facilities', path: '/facilities' },
                { label: displayName },
              ]}
            />
          </div>

          <button
            type="button"
            onClick={() => navigate('/facilities')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-medical-600 dark:text-slate-400 dark:hover:text-medical-400 transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t('facilitiesPage.backToDirectory')}</span>
          </button>

          {/* Facility Main Header Card (2 Columns: Left & Right) */}
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
                    <Badge variant="medical" size="md" className="flex items-center gap-1.5">
                      {getFacilityIcon(facility.icon)}
                      <span>{displayCategory}</span>
                    </Badge>
                    <span className="text-xs font-semibold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40 px-2.5 py-1 rounded-full border border-teal-200 dark:border-teal-800">
                      {displayBadge}
                    </span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 dark:text-white tracking-tight leading-tight">
                    {displayName}
                  </h1>

                  <p className="text-base sm:text-lg font-semibold text-slate-600 dark:text-slate-300 mt-2 font-sans">
                    {isHindi ? facility.hindiShortDesc : facility.shortDesc}
                  </p>
                </div>

                {/* Operating hours & Timing pill */}
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-dark-card border border-slate-100 dark:border-dark-border text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans">
                  <Clock className="w-4 h-4 text-medical-600 shrink-0" />
                  <div>
                    <span className="font-bold text-navy-950 dark:text-white block sm:inline sm:mr-2">
                      {t('facilitiesPage.timingLabel')}:
                    </span>
                    <span>{isHindi ? patientInfo.hindiTiming : patientInfo.timing}</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <a href={`tel:${patientInfo.contactNumber.replace(/[^0-9+]/g, '')}`} className="w-full sm:w-auto">
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      leftIcon={<PhoneCall className="w-4 h-4" />}
                    >
                      <span>{t('facilitiesPage.enquireBtn')}: {patientInfo.contactNumber}</span>
                    </Button>
                  </a>

                  <Button
                    variant="outline"
                    size="lg"
                    leftIcon={<CalendarCheck className="w-4 h-4" />}
                    onClick={() => outletContext?.openAppointmentModal?.()}
                  >
                    {t('common.bookAppointment')}
                  </Button>
                </div>
              </motion.div>

              {/* Right Column: Hero Visual & Interactive Gallery (Slide In Right) */}
              <motion.div
                variants={slideInRight}
                initial="hidden"
                animate="visible"
                className="lg:col-span-5 space-y-3"
              >
                {/* Main Selected Image */}
                <div className="rounded-2xl overflow-hidden shadow-elevated border-4 border-white dark:border-dark-card aspect-[4/3] bg-slate-100 dark:bg-dark-card">
                  <img
                    src={allImages[activeImageIndex]}
                    alt={displayName}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    srcSet={getResponsiveSrcSet(allImages[activeImageIndex])}
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                </div>

                {/* Interactive Thumbnail Carousel */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                        activeImageIndex === idx
                          ? 'border-medical-600 ring-2 ring-medical-500/30 scale-105'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${displayName} - Photo ${idx + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 2. PURPOSE, SERVICES, EQUIPMENT & PATIENT INFO (2 Columns: Left & Right)   */}
      {/* ========================================================================= */}
      <section className="py-12">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Cols: Overview, Capabilities & Equipment (Slide In Left) */}
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
                    {t('facilitiesPage.overviewHeading')}
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  {displayOverview}
                </p>
              </div>

              {/* Purpose & Clinical Capabilities */}
              <div className="bg-white dark:bg-dark-surface p-6 sm:p-8 rounded-3xl shadow-card border border-slate-200/80 dark:border-dark-border">
                <div className="flex items-center gap-2 mb-6">
                  <Building2 className="w-5 h-5 text-teal-600" />
                  <h2 className="text-xl font-bold text-navy-950 dark:text-white">
                    {t('facilitiesPage.servicesHeading')}
                  </h2>
                </div>

                <div className="space-y-4">
                  {facility.purposeAndServices.map((serv, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-dark-card border border-slate-100 dark:border-dark-border space-y-1.5"
                    >
                      <h3 className="text-sm font-bold text-navy-950 dark:text-white flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-medical-600 shrink-0" />
                        <span>{isHindi ? serv.hindiTitle : serv.title}</span>
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans pl-6">
                        {isHindi ? serv.hindiDescription : serv.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Medical Equipment Information */}
              <div className="bg-white dark:bg-dark-surface p-6 sm:p-8 rounded-3xl shadow-card border border-slate-200/80 dark:border-dark-border">
                <div className="flex items-center gap-2 mb-6">
                  <Cpu className="w-5 h-5 text-medical-600" />
                  <h2 className="text-xl font-bold text-navy-950 dark:text-white">
                    {t('facilitiesPage.equipmentHeading')}
                  </h2>
                </div>

                <div className="space-y-3.5">
                  {facility.equipmentList.map((eq, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-dark-card border border-slate-100 dark:border-dark-border space-y-1"
                    >
                      <h4 className="text-sm font-bold text-navy-950 dark:text-white">
                        {isHindi ? eq.hindiName : eq.name}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                        {isHindi ? eq.hindiSpecification : eq.specification}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right 5 Cols: Patient Info, Visiting Hours, Guidelines & Related Units (Slide In Right) */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewportStandard}
              className="lg:col-span-5 space-y-6"
            >
              {/* Patient & Visitor Information Card */}
              <div className="bg-white dark:bg-dark-surface p-6 sm:p-8 rounded-3xl shadow-card border border-slate-200/80 dark:border-dark-border space-y-5">
                <div className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-medical-600" />
                  <h3 className="text-lg font-bold text-navy-950 dark:text-white">
                    {t('facilitiesPage.patientInfoHeading')}
                  </h3>
                </div>

                {/* Visiting Hours */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-dark-card border border-slate-100 dark:border-dark-border space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    {t('facilitiesPage.visitingHoursLabel')}
                  </span>
                  <p className="text-xs font-semibold text-navy-950 dark:text-white font-sans">
                    {isHindi ? patientInfo.hindiVisitingHours : patientInfo.visitingHours}
                  </p>
                </div>

                {/* Safety & Visitor Rules */}
                <div className="space-y-2.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    {t('facilitiesPage.rulesLabel')}
                  </span>
                  {(isHindi ? patientInfo.hindiRules : patientInfo.rules).map((rule, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 font-sans">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>

                {/* Contact phone shortcut */}
                <div className="pt-2">
                  <a
                    href={`tel:${patientInfo.contactNumber.replace(/[^0-9+]/g, '')}`}
                    className="block w-full text-center py-2.5 px-4 bg-medical-50 dark:bg-medical-950/40 text-medical-700 dark:text-medical-300 hover:bg-medical-100 font-bold rounded-xl text-xs transition-colors border border-medical-200 dark:border-medical-800"
                  >
                    {t('facilitiesPage.enquireBtn')}: {patientInfo.contactNumber}
                  </a>
                </div>
              </div>

              {/* Associated Clinical Departments */}
              {relatedDepartments.length > 0 && (
                <div className="bg-white dark:bg-dark-surface p-6 sm:p-8 rounded-3xl shadow-card border border-slate-200/80 dark:border-dark-border space-y-4">
                  <h3 className="text-base font-bold text-navy-950 dark:text-white">
                    {t('facilitiesPage.relatedDeptsHeading')}
                  </h3>

                  <div className="space-y-2">
                    {relatedDepartments.map((dept) => (
                      <Link
                        key={dept.id}
                        to={`/departments/${dept.id}`}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-dark-card border border-slate-100 dark:border-dark-border hover:border-medical-300 transition-colors group"
                      >
                        <span className="text-xs font-bold text-navy-950 dark:text-white group-hover:text-medical-600 transition-colors">
                          {isHindi ? dept.hindiName : dept.name}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-medical-600 transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Quality & Safety Accreditation Assurance */}
              <div className="p-5 rounded-3xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200/80 dark:border-teal-900/60 space-y-2">
                <div className="flex items-center gap-2 text-teal-800 dark:text-teal-300 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>NABH & NABL Clinical Governance</span>
                </div>
                <p className="text-[11px] text-teal-900/80 dark:text-teal-300/80 leading-relaxed font-sans">
                  {isHindi
                    ? 'अस्पताल के सभी उपकरण नियमित रूप से कैलिब्रेटेड हैं एवं बायो-मेडिकल सुरक्षा व रेडिएशन मानकों के अंतर्गत प्रमाणित हैं।'
                    : 'All clinical equipment is calibrated under strict biomedical engineering maintenance protocols with radiation and microbiological safety validation.'}
                </p>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 3. RELEVANT CLINICAL FACULTY & SPECIALISTS (Staggered 3-Card Grid)          */}
      {/* ========================================================================= */}
      {relevantDoctors.length > 0 && (
        <section className="py-12 bg-white dark:bg-dark-surface border-t border-slate-200/80 dark:border-dark-border">
          <Container size="xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-navy-950 dark:text-white">
                  {t('facilitiesPage.relevantDoctorsHeading')}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-sans">
                  {t('facilitiesPage.relevantDoctorsSubtitle')}
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
              {relevantDoctors.map((doc) => (
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
