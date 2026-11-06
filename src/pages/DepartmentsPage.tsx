import React, { useState, useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  X,
  RotateCcw,
  CalendarCheck,
  ArrowRight,
  PhoneCall,
  UserCheck,
  HeartPulse,
  Brain,
  Bone,
  Activity,
  Baby,
  Stethoscope,
  Building2,
} from 'lucide-react';
import { DEPARTMENTS_DATA, ALL_DOCTORS } from '../data/hospitalData';
import { useLanguage } from '../contexts/LanguageContext';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import {
  fadeInUp,
  staggerContainer,
  viewportStandard,
  slideInLeft,
  slideInRight,
} from '../utils/animations';
import { HOSPITAL_INFO } from '../utils/constants';
import { getResponsiveSrcSet } from '../utils/imageUtils';

interface LayoutOutletContext {
  openAppointmentModal?: () => void;
}

export const DepartmentsPage: React.FC = () => {
  const { language, t } = useLanguage();
  const outletContext = useOutletContext<LayoutOutletContext>();
  const isHindi = language === 'hi';

  const [searchQuery, setSearchQuery] = useState('');

  // Icon resolver
  const getDepartmentIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartPulse':
        return <HeartPulse className="w-5 h-5" />;
      case 'Brain':
        return <Brain className="w-5 h-5" />;
      case 'Bone':
        return <Bone className="w-5 h-5" />;
      case 'Activity':
        return <Activity className="w-5 h-5" />;
      case 'Baby':
        return <Baby className="w-5 h-5" />;
      case 'Stethoscope':
        return <Stethoscope className="w-5 h-5" />;
      default:
        return <Building2 className="w-5 h-5" />;
    }
  };

  // Filter departments based on search
  const filteredDepartments = useMemo(() => {
    if (!searchQuery.trim()) return DEPARTMENTS_DATA;
    const q = searchQuery.toLowerCase().trim();

    return DEPARTMENTS_DATA.filter((dept) => {
      const matchName = dept.name.toLowerCase().includes(q) || dept.hindiName.includes(q);
      const matchTagline = dept.tagline.toLowerCase().includes(q) || dept.hindiTagline.includes(q);
      const matchOverview = dept.overview.toLowerCase().includes(q) || dept.hindiOverview.includes(q);
      const matchTreatments =
        dept.treatmentsOffered.some((item) => item.toLowerCase().includes(q)) ||
        dept.hindiTreatmentsOffered.some((item) => item.includes(q));
      const matchConditions = dept.conditionsTreated.some(
        (c) => c.name.toLowerCase().includes(q) || c.hindiName.includes(q)
      );

      return matchName || matchTagline || matchOverview || matchTreatments || matchConditions;
    });
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-bg transition-colors duration-300">
      {/* ========================================================================= */}
      {/* SEARCH TOOLBAR (CLEAN TOP SPACING DIRECTLY BELOW NAVBAR)                  */}
      {/* ========================================================================= */}
      <section className="sticky top-[58px] sm:top-[64px] z-20 bg-white/95 dark:bg-dark-surface/95 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-dark-border py-4 transition-colors">
        <Container size="xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative flex-1 max-w-xl w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('departmentsPage.searchPlaceholder')}
                className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-medical-500/20 focus:border-medical-600 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 self-end sm:self-center">
              {t('departmentsPage.showingResults').replace('{count}', filteredDepartments.length.toString())}
            </p>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 3. DEPARTMENTS GRID                                                       */}
      {/* ========================================================================= */}
      <section className="py-12">
        <Container size="xl">
          {filteredDepartments.length > 0 ? (
            <motion.div
              variants={staggerContainer(0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportStandard}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredDepartments.map((dept) => {
                const displayName = isHindi ? dept.hindiName : dept.name;
                const displayTagline = isHindi ? dept.hindiTagline : dept.tagline;
                const displayTreatments = isHindi ? dept.hindiTreatmentsOffered : dept.treatmentsOffered;
                const associatedDoctors = ALL_DOCTORS.filter((doc) => dept.doctorIds.includes(doc.id));

                return (
                  <motion.div key={dept.id} variants={fadeInUp} className="flex flex-col h-full">
                    <Card
                      variant="elevated"
                      className="group flex flex-col justify-between h-full overflow-hidden border border-slate-200/80 dark:border-dark-border hover:shadow-card-hover transition-all duration-300"
                    >
                      <div>
                        {/* Image Frame */}
                        <div className="relative aspect-[16/10] bg-slate-100 dark:bg-dark-card overflow-hidden">
                          <img
                            src={dept.image}
                            alt={displayName}
                            loading="lazy"
                            decoding="async"
                            srcSet={getResponsiveSrcSet(dept.image)}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="w-full h-full object-cover group-hover:scale-105 duration-500 transition-transform"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                          {/* Floating Stats Badge */}
                          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white border border-white/20">
                            {dept.stats}
                          </div>

                          {/* Department Icon Pill */}
                          <div className="absolute bottom-3 right-3 w-10 h-10 rounded-xl bg-white/95 dark:bg-dark-surface/95 text-medical-600 dark:text-medical-400 flex items-center justify-center shadow-md">
                            {getDepartmentIcon(dept.icon)}
                          </div>
                        </div>

                        {/* Content Body */}
                        <div className="p-6 space-y-4">
                          <div>
                            <Link to={`/departments/${dept.id}`}>
                              <h2 className="text-xl font-bold text-navy-950 dark:text-white group-hover:text-medical-600 dark:group-hover:text-medical-400 transition-colors leading-snug">
                                {displayName}
                              </h2>
                            </Link>
                            <p className="text-xs font-semibold text-medical-600 dark:text-medical-400 mt-1 line-clamp-1">
                              {displayTagline}
                            </p>
                          </div>

                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed font-sans">
                            {isHindi ? dept.hindiOverview : dept.overview}
                          </p>

                          {/* Key Treatments Offered Chips */}
                          <div className="pt-2">
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                              {t('departmentsPage.treatmentsOfferedLabel')}
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {displayTreatments.slice(0, 3).map((treatment, idx) => (
                                <span
                                  key={idx}
                                  className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-dark-card text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-dark-border"
                                >
                                  {treatment}
                                </span>
                              ))}
                              {displayTreatments.length > 3 && (
                                <span className="px-2 py-1 rounded-md text-[11px] font-semibold text-medical-600 dark:text-medical-400 bg-medical-50 dark:bg-medical-950/40">
                                  +{displayTreatments.length - 3} {isHindi ? 'अन्य' : 'more'}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Associated Doctors Avatars & Preview */}
                          {associatedDoctors.length > 0 && (
                            <div className="pt-3 border-t border-slate-100 dark:border-dark-border flex items-center justify-between text-xs">
                              <span className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5">
                                <UserCheck className="w-3.5 h-3.5 text-medical-600" />
                                <span>{t('departmentsPage.consultantsLabel')}:</span>
                              </span>
                              <div className="flex items-center -space-x-2">
                                {associatedDoctors.map((doc) => (
                                  <Link
                                    key={doc.id}
                                    to={`/doctors/${doc.id}`}
                                    title={isHindi ? doc.hindiName : doc.name}
                                    className="relative inline-block w-7 h-7 rounded-full overflow-hidden border-2 border-white dark:border-dark-surface hover:scale-110 transition-transform"
                                  >
                                    <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" />
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Card Action Footer */}
                      <div className="p-6 pt-0 space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <Link to={`/departments/${dept.id}`} className="w-full">
                            <Button
                              variant="outline"
                              size="sm"
                              fullWidth
                              className="text-xs"
                              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                            >
                              {t('departmentsPage.viewDeptBtn')}
                            </Button>
                          </Link>

                          <Button
                            variant="primary"
                            size="sm"
                            fullWidth
                            className="text-xs"
                            leftIcon={<CalendarCheck className="w-3.5 h-3.5" />}
                            onClick={() => outletContext?.openAppointmentModal?.()}
                          >
                            {t('departmentsPage.bookApptBtn')}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            /* Empty State */
            <div className="text-center py-16 px-4 bg-white dark:bg-dark-surface rounded-3xl border border-dashed border-slate-300 dark:border-dark-border max-w-xl mx-auto my-8">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-dark-card text-slate-400 mx-auto flex items-center justify-center mb-4">
                <Building2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-navy-950 dark:text-white mb-2">
                {t('departmentsPage.noDeptsFound')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6 font-sans">
                {t('departmentsPage.noDeptsFoundDesc')}
              </p>
              <Button
                variant="primary"
                size="sm"
                leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                onClick={() => setSearchQuery('')}
              >
                {t('departmentsPage.resetSearch')}
              </Button>
            </div>
          )}
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 4. EMERGENCY & 24/7 OPD TRIAGE BANNER (2-SIDE SLIDE LEFT / SLIDE RIGHT)    */}
      {/* ========================================================================= */}
      <section className="py-12 bg-white dark:bg-dark-surface border-t border-slate-200/80 dark:border-dark-border overflow-hidden">
        <Container size="xl">
          <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-medical-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-elevated grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Narrative: Slide in Left */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewportStandard}
              className="relative z-10 lg:col-span-8"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-2 block">
                {isHindi ? '24/7 आपातकालीन ट्राइएज एवं विशेषज्ञ परामर्श' : '24/7 Emergency Triage & Admissions'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug mb-3">
                {isHindi
                  ? 'अस्पताल के किसी भी विभाग से त्वरित परामर्श प्राप्त करें'
                  : 'Need Immediate Medical Consultation Across Any Department?'}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-sans mb-6">
                {t('departmentsPage.emergencyCallout')}
              </p>
            </motion.div>

            {/* Right Buttons: Slide in Right */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewportStandard}
              className="relative z-10 lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5 justify-center lg:items-end"
            >
              <Button
                variant="primary"
                size="md"
                className="w-full sm:w-auto lg:w-full justify-center shadow-lg shadow-teal-500/20"
                leftIcon={<CalendarCheck className="w-4 h-4" />}
                onClick={() => outletContext?.openAppointmentModal?.()}
              >
                {t('common.bookAppointment')}
              </Button>

              <a href={`tel:${HOSPITAL_INFO.emergencyPhone.replace(/-/g, '')}`} className="w-full sm:w-auto lg:w-full">
                <Button
                  variant="outline"
                  size="md"
                  className="w-full justify-center border-white/40 text-white hover:bg-white/10"
                  leftIcon={<PhoneCall className="w-4 h-4 text-emerald-400" />}
                >
                  <span>{HOSPITAL_INFO.emergencyPhone}</span>
                </Button>
              </a>
            </motion.div>

            {/* Subtle background glow */}
            <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 w-96 h-96 rounded-full bg-medical-500/10 blur-3xl pointer-events-none" />
          </div>
        </Container>
      </section>
    </div>
  );
};
