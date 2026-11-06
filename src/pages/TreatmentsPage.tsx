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
  Clock,
  BedDouble,
  Sparkle,
  Activity,
} from 'lucide-react';
import { TREATMENTS_DATA } from '../data/hospitalData';
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

export const TreatmentsPage: React.FC = () => {
  const { language, t } = useLanguage();
  const outletContext = useOutletContext<LayoutOutletContext>();
  const isHindi = language === 'hi';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');

  // Extract unique departments for filter chips
  const departmentsList = useMemo(() => {
    const map = new Map<string, { id: string; name: string; hindiName: string }>();
    TREATMENTS_DATA.forEach((tr) => {
      if (!map.has(tr.departmentId)) {
        map.set(tr.departmentId, {
          id: tr.departmentId,
          name: tr.departmentName,
          hindiName: tr.hindiDepartmentName,
        });
      }
    });
    return Array.from(map.values());
  }, []);

  // Filter treatments
  const filteredTreatments = useMemo(() => {
    return TREATMENTS_DATA.filter((tr) => {
      // Department filter
      if (selectedDepartment !== 'all' && tr.departmentId !== selectedDepartment) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = tr.name.toLowerCase().includes(q) || tr.hindiName.includes(q);
        const matchShortDesc = tr.shortDesc.toLowerCase().includes(q) || tr.hindiShortDesc.includes(q);
        const matchDept = tr.departmentName.toLowerCase().includes(q) || tr.hindiDepartmentName.includes(q);
        const matchSymptoms =
          tr.symptomsAndIndications.some((s) => s.toLowerCase().includes(q)) ||
          tr.hindiSymptomsAndIndications.some((s) => s.includes(q));

        if (!matchName && !matchShortDesc && !matchDept && !matchSymptoms) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedDepartment]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-bg transition-colors duration-300">
      {/* ========================================================================= */}
      {/* SEARCH & DEPARTMENT FILTER TOOLBAR (CLEAN TOP SPACING)                    */}
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
                placeholder={t('treatmentsPage.searchPlaceholder')}
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
              {t('treatmentsPage.showingResults').replace('{count}', filteredTreatments.length.toString())}
            </p>
          </div>

          {/* Department Chips Filter Row */}
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-dark-border flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <button
              type="button"
              onClick={() => setSelectedDepartment('all')}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${selectedDepartment === 'all'
                ? 'bg-medical-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-dark-card text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-dark-border'
                }`}
            >
              {t('treatmentsPage.allDepartments')} ({TREATMENTS_DATA.length})
            </button>
            {departmentsList.map((dept) => {
              const count = TREATMENTS_DATA.filter((tr) => tr.departmentId === dept.id).length;
              const isSelected = selectedDepartment === dept.id;
              return (
                <button
                  key={dept.id}
                  type="button"
                  onClick={() => setSelectedDepartment(dept.id)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${isSelected
                    ? 'bg-medical-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-dark-card text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-dark-border'
                    }`}
                >
                  {isHindi ? dept.hindiName : dept.name} ({count})
                </button>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 3. TREATMENTS & PROCEDURES GRID                                           */}
      {/* ========================================================================= */}
      <section className="py-12">
        <Container size="xl">
          {filteredTreatments.length > 0 ? (
            <motion.div
              variants={staggerContainer(0.06)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportStandard}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredTreatments.map((tr) => {
                const displayName = isHindi ? tr.hindiName : tr.name;
                const displayDept = isHindi ? tr.hindiDepartmentName : tr.departmentName;
                const displayBadge = isHindi ? tr.hindiBadge : tr.badge;
                const displayDesc = isHindi ? tr.hindiShortDesc : tr.shortDesc;
                const fastFacts = tr.fastFacts;

                return (
                  <motion.div key={tr.id} variants={fadeInUp} className="flex flex-col h-full">
                    <Card
                      variant="elevated"
                      className="group flex flex-col justify-between h-full overflow-hidden border border-slate-200/80 dark:border-dark-border hover:shadow-card-hover transition-all duration-300"
                    >
                      <div>
                        {/* Image Header with Badge */}
                        <div className="relative aspect-[16/10] bg-slate-100 dark:bg-dark-card overflow-hidden">
                          <img
                            src={tr.image}
                            alt={displayName}
                            loading="lazy"
                            decoding="async"
                            srcSet={getResponsiveSrcSet(tr.image)}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="w-full h-full object-cover group-hover:scale-105 duration-500 transition-transform"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                          {/* Top Technique Badge */}
                          <div className="absolute top-3 left-3 bg-teal-600/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm flex items-center gap-1.5">
                            <Sparkle className="w-3.5 h-3.5 text-teal-200" />
                            <span>{displayBadge}</span>
                          </div>

                          {/* Department Badge */}
                          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md text-xs font-medium text-white border border-white/20">
                            {displayDept}
                          </div>
                        </div>

                        {/* Content Body */}
                        <div className="p-6 space-y-4">
                          <div>
                            <Link to={`/treatments/${tr.id}`}>
                              <h2 className="text-xl font-bold text-navy-950 dark:text-white group-hover:text-medical-600 dark:group-hover:text-medical-400 transition-colors leading-snug">
                                {displayName}
                              </h2>
                            </Link>
                          </div>

                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed font-sans">
                            {displayDesc}
                          </p>

                          {/* Fast Facts Grid */}
                          <div className="pt-3 border-t border-slate-100 dark:border-dark-border grid grid-cols-2 gap-2 text-xs">
                            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                              <Clock className="w-3.5 h-3.5 text-medical-600 shrink-0" />
                              <span className="truncate">{isHindi ? fastFacts.hindiDuration : fastFacts.duration}</span>
                            </div>

                            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                              <BedDouble className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                              <span className="truncate">{isHindi ? fastFacts.hindiHospitalStay : fastFacts.hospitalStay}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="p-6 pt-0 space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <Link to={`/treatments/${tr.id}`} className="w-full">
                            <Button
                              variant="outline"
                              size="sm"
                              fullWidth
                              className="text-xs"
                              rightIcon={<ArrowRight className="w-3 h-3" />}
                            >
                              {t('treatmentsPage.viewDetailsBtn')}
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
                            {t('common.bookAppointment')}
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
                <Activity className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-navy-950 dark:text-white mb-2">
                {t('treatmentsPage.noTreatmentsFound')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6 font-sans">
                {t('treatmentsPage.noTreatmentsFoundDesc')}
              </p>
              <Button
                variant="primary"
                size="sm"
                leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDepartment('all');
                }}
              >
                {t('treatmentsPage.resetFilters')}
              </Button>
            </div>
          )}
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 4. EMERGENCY & PROCEDURE INQUIRY HELPLINE (2-SIDE SLIDE LEFT / SLIDE RIGHT) */}
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
                {isHindi ? 'विशिष्ट सर्जिकल एवं प्रक्रिया परामर्श' : 'Surgical Evaluation & Second Opinions'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug mb-3">
                {isHindi
                  ? 'क्या आप किसी विशिष्ट सर्जरी या उपचार की योजना बना रहे हैं?'
                  : 'Planning a Major Surgery or Seeking a Specialized Second Opinion?'}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-sans mb-6">
                {isHindi
                  ? 'जनहित हॉस्पिटल की समर्पित क्लीनिकल हेल्पडेस्क आपको उपचार पूर्व परामर्श, आयुष्मान भारत/बीमा कैशलेस क्लीयरेंस और अनुमानित खर्च की पारदर्शी जानकारी उपलब्ध कराती है।'
                  : 'Our dedicated clinical coordinators assist with transparent pre-surgery estimates, cashless TPA pre-authorization, and fast-tracked senior surgeon consultations.'}
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

              <a href={`tel:${HOSPITAL_INFO.generalInquiryPhone.replace(/[^0-9+]/g, '')}`} className="w-full sm:w-auto lg:w-full">
                <Button
                  variant="outline"
                  size="md"
                  className="w-full justify-center border-white/40 text-white hover:bg-white/10"
                  leftIcon={<PhoneCall className="w-4 h-4 text-emerald-400" />}
                >
                  <span>{HOSPITAL_INFO.generalInquiryPhone}</span>
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
