import React, { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  X,
  RotateCcw,
  CalendarCheck,
  PhoneCall,
  SlidersHorizontal,
  ChevronDown,
  Check,
} from 'lucide-react';
import { ALL_DOCTORS, Doctor } from '../data/hospitalData';
import { useLanguage } from '../contexts/LanguageContext';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { DoctorCard } from '../components/common/DoctorCard';
import { HOSPITAL_INFO } from '../utils/constants';
import {
  fadeInUp,
  staggerContainer,
  viewportStandard,
  slideInLeft,
  slideInRight,
} from '../utils/animations';

interface LayoutOutletContext {
  openAppointmentModal?: () => void;
}

type SortOption = 'exp-desc' | 'exp-asc' | 'name-asc' | 'name-desc';

export const DoctorsPage: React.FC = () => {
  const { language, t } = useLanguage();
  const outletContext = useOutletContext<LayoutOutletContext>();
  const isHindi = language === 'hi';

  // State Management for Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [availableTodayOnly, setAvailableTodayOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortOption>('exp-desc');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Extract unique departments dynamically
  const departments = useMemo(() => {
    const map = new Map<string, { id: string; name: string; hindiName: string }>();
    ALL_DOCTORS.forEach((doc) => {
      if (!map.has(doc.departmentId)) {
        map.set(doc.departmentId, {
          id: doc.departmentId,
          name: doc.department,
          hindiName: doc.hindiDepartment,
        });
      }
    });
    return Array.from(map.values());
  }, []);

  // Filter & Sort Logic
  const filteredDoctors = useMemo(() => {
    return ALL_DOCTORS.filter((doc) => {
      // Search matching (checks English name, Hindi name, specialization, qualifications)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = doc.name.toLowerCase().includes(query);
        const matchesHindiName = doc.hindiName.includes(query);
        const matchesSpecialization = doc.specialization.toLowerCase().includes(query);
        const matchesHindiSpecialization = doc.hindiSpecialization.includes(query);
        const matchesQualifications = doc.qualifications.toLowerCase().includes(query);
        const matchesDepartment = doc.department.toLowerCase().includes(query);
        const matchesHindiDepartment = doc.hindiDepartment.includes(query);

        if (
          !matchesName &&
          !matchesHindiName &&
          !matchesSpecialization &&
          !matchesHindiSpecialization &&
          !matchesQualifications &&
          !matchesDepartment &&
          !matchesHindiDepartment
        ) {
          return false;
        }
      }

      // Department filter
      if (selectedDepartment !== 'all' && doc.departmentId !== selectedDepartment) {
        return false;
      }

      // Availability filter
      if (availableTodayOnly && !doc.isAvailableToday) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'exp-desc':
          return b.experienceYears - a.experienceYears;
        case 'exp-asc':
          return a.experienceYears - b.experienceYears;
        case 'name-asc':
          return (isHindi ? a.hindiName : a.name).localeCompare(isHindi ? b.hindiName : b.name);
        case 'name-desc':
          return (isHindi ? b.hindiName : b.name).localeCompare(isHindi ? a.hindiName : a.name);
        default:
          return 0;
      }
    });
  }, [searchQuery, selectedDepartment, availableTodayOnly, sortBy, isHindi]);

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchQuery.trim()) count++;
    if (selectedDepartment !== 'all') count++;
    if (availableTodayOnly) count++;
    return count;
  }, [searchQuery, selectedDepartment, availableTodayOnly]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDepartment('all');
    setAvailableTodayOnly(false);
    setSortBy('exp-desc');
  };

  const handleBookAppointment = (_doctor?: Doctor) => {
    if (outletContext?.openAppointmentModal) {
      outletContext.openAppointmentModal();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-bg transition-colors duration-300">
      {/* ========================================================================= */}
      {/* SEARCH & FILTER CONTROLS (CLEAN TOP SPACING DIRECTLY BELOW NAVBAR)        */}
      {/* ========================================================================= */}
      <section className="sticky top-[58px] sm:top-[64px] z-20 bg-white/95 dark:bg-dark-surface/95 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-dark-border py-4 transition-colors">
        <Container size="xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('doctorsPage.searchPlaceholder')}
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

            {/* Desktop Filters & Sorters */}
            <div className="hidden lg:flex items-center gap-3 shrink-0 flex-wrap">
              {/* Department Selector */}
              <div className="relative">
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="appearance-none pl-3.5 pr-8 py-2.5 text-xs font-semibold bg-slate-50 dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-xl text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-medical-500/20 cursor-pointer"
                >
                  <option value="all">{t('doctorsPage.allDepartments')}</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {isHindi ? dept.hindiName : dept.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>

              {/* Available Today Filter Button */}
              <button
                type="button"
                onClick={() => setAvailableTodayOnly(!availableTodayOnly)}
                className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold rounded-xl border transition-all ${
                  availableTodayOnly
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700'
                    : 'bg-slate-50 dark:bg-dark-card text-slate-700 dark:text-slate-200 border-slate-200 dark:border-dark-border hover:bg-slate-100 dark:hover:bg-dark-border/40'
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${
                    availableTodayOnly
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-slate-400 dark:border-slate-500'
                  }`}
                >
                  {availableTodayOnly && <Check className="w-2.5 h-2.5" />}
                </div>
                <span>{t('doctorsPage.availableToday')}</span>
              </button>

              {/* Sort By Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none pl-3.5 pr-8 py-2.5 text-xs font-semibold bg-slate-50 dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-xl text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-medical-500/20 cursor-pointer"
                >
                  <option value="exp-desc">{t('doctorsPage.sortExperienceHigh')}</option>
                  <option value="exp-asc">{t('doctorsPage.sortExperienceLow')}</option>
                  <option value="name-asc">{t('doctorsPage.sortNameAsc')}</option>
                  <option value="name-desc">{t('doctorsPage.sortNameDesc')}</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>

              {/* Clear Filters Button (When active) */}
              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t('doctorsPage.clearFilters')}</span>
                </button>
              )}
            </div>

            {/* Mobile Filter Toggle Button */}
            <div className="flex lg:hidden items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
                className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-dark-card text-slate-800 dark:text-white"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>{t('doctorsPage.filterDepartment')} & {t('doctorsPage.sortBy')}</span>
                {activeFiltersCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-medical-600 text-white text-[10px] flex items-center justify-center font-bold">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs text-rose-600 dark:text-rose-400 font-semibold"
                >
                  {t('doctorsPage.clearFilters')}
                </button>
              )}
            </div>
          </div>

          {/* Mobile Filter Drawer / Collapsible */}
          <AnimatePresence>
            {isFilterDrawerOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden pt-4 mt-4 border-t border-slate-200 dark:border-dark-border space-y-3"
              >
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('doctorsPage.filterDepartment')}
                  </label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full py-2.5 px-3 text-xs bg-slate-50 dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-xl text-slate-800 dark:text-slate-200"
                  >
                    <option value="all">{t('doctorsPage.allDepartments')}</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {isHindi ? dept.hindiName : dept.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-between py-1">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {t('doctorsPage.availableToday')}
                  </span>
                  <button
                    type="button"
                    onClick={() => setAvailableTodayOnly(!availableTodayOnly)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg border ${
                      availableTodayOnly
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-slate-100 dark:bg-dark-card text-slate-700 dark:text-slate-300 border-slate-300 dark:border-dark-border'
                    }`}
                  >
                    {availableTodayOnly ? (isHindi ? 'हाँ' : 'Yes') : (isHindi ? 'नहीं' : 'No')}
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('doctorsPage.sortBy')}
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="w-full py-2.5 px-3 text-xs bg-slate-50 dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-xl text-slate-800 dark:text-slate-200"
                  >
                    <option value="exp-desc">{t('doctorsPage.sortExperienceHigh')}</option>
                    <option value="exp-asc">{t('doctorsPage.sortExperienceLow')}</option>
                    <option value="name-asc">{t('doctorsPage.sortNameAsc')}</option>
                    <option value="name-desc">{t('doctorsPage.sortNameDesc')}</option>
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Department Filter Chips Row (Quick Category Browsing) */}
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-dark-border flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <button
              type="button"
              onClick={() => setSelectedDepartment('all')}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedDepartment === 'all'
                  ? 'bg-medical-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-dark-card text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-dark-border'
              }`}
            >
              {t('doctorsPage.departmentAllTag')} ({ALL_DOCTORS.length})
            </button>
            {departments.map((dept) => {
              const count = ALL_DOCTORS.filter((d) => d.departmentId === dept.id).length;
              const isSelected = selectedDepartment === dept.id;
              return (
                <button
                  key={dept.id}
                  type="button"
                  onClick={() => setSelectedDepartment(dept.id)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isSelected
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
      {/* 3. DOCTORS DIRECTORY GRID & RESULTS                                       */}
      {/* ========================================================================= */}
      <section className="py-12">
        <Container size="xl">
          {/* Results count header */}
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-200/60 dark:border-dark-border/60">
            <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-400">
              {t('doctorsPage.showingResults').replace('{count}', filteredDoctors.length.toString())}
            </p>
            {activeFiltersCount > 0 && (
              <span className="text-xs text-medical-600 dark:text-medical-400 font-semibold">
                {activeFiltersCount} {t('doctorsPage.activeFilters')}
              </span>
            )}
          </div>

          {/* Doctors Grid */}
          {filteredDoctors.length > 0 ? (
            <motion.div
              variants={staggerContainer(0.1, 0.04)}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredDoctors.map((doctor) => (
                <motion.div key={doctor.id} variants={fadeInUp}>
                  <DoctorCard
                    doctor={doctor}
                    onBookAppointment={handleBookAppointment}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Empty State */
            <div className="text-center py-16 px-4 bg-white dark:bg-dark-surface rounded-3xl border border-dashed border-slate-300 dark:border-dark-border max-w-xl mx-auto my-8">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-dark-card text-slate-400 mx-auto flex items-center justify-center mb-4">
                <Filter className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-navy-950 dark:text-white mb-2">
                {t('doctorsPage.noDoctorsFound')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6 font-sans">
                {t('doctorsPage.noDoctorsFoundDesc')}
              </p>
              <Button
                variant="primary"
                size="sm"
                leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                onClick={handleResetFilters}
              >
                {t('doctorsPage.resetAllFilters')}
              </Button>
            </div>
          )}
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 4. HOSPITAL CONSULTATION CALLOUT BANNER (2-SIDE SLIDE LEFT / SLIDE RIGHT) */}
      {/* ========================================================================= */}
      <section className="py-12 bg-white dark:bg-dark-surface border-t border-slate-200/80 dark:border-dark-border overflow-hidden">
        <Container size="xl">
          <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-medical-950 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-elevated grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Heading and info (Slide in Left) */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewportStandard}
              className="relative z-10 lg:col-span-8"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-2 block">
                {isHindi ? 'त्वरित ओपीडी एवं आपातकालीन परामर्श' : 'Immediate OPD & Emergency Consultations'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug mb-3">
                {isHindi
                  ? 'क्या आप किसी विशिष्ट विशेषज्ञ से तत्काल मिलना चाहते हैं?'
                  : 'Looking to Consult a Specialist Immediately?'}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {isHindi
                  ? 'जनहित हॉस्पिटल की समर्पित ओपीडी हेल्पडेस्क सुबह 8:00 से रात 8:00 बजे तक आपके परामर्श स्लॉट की पुष्टि में सहायता करती है। गंभीर मामलों के लिए हमारी आपातकालीन ट्राइएज टीम 24/7 सक्रिय है।'
                  : 'Our dedicated OPD helpdesk assists in fast-tracking consultations and priority slots. In case of acute trauma or urgent medical attention, our 24/7 emergency unit is always on standby.'}
              </p>
            </motion.div>

            {/* Right Column: CTA Buttons (Slide in Right) */}
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
