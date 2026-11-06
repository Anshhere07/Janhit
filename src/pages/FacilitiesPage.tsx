import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  X,
  RotateCcw,
  ArrowRight,
  PhoneCall,
  Clock,
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
} from 'lucide-react';
import { FACILITIES_DATA, DEPARTMENTS_DATA } from '../data/hospitalData';
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

export const FacilitiesPage: React.FC = () => {
  const { language, t } = useLanguage();
  const isHindi = language === 'hi';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Extract unique categories
  const categoriesList = useMemo(() => {
    const set = new Set<string>();
    FACILITIES_DATA.forEach((fac) => set.add(fac.category));
    return Array.from(set);
  }, []);

  // Filter facilities
  const filteredFacilities = useMemo(() => {
    return FACILITIES_DATA.filter((fac) => {
      // Category filter
      if (selectedCategory !== 'all' && fac.category !== selectedCategory) {
        return false;
      }

      // Search matching
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = fac.name.toLowerCase().includes(q) || fac.hindiName.includes(q);
        const matchShortDesc = fac.shortDesc.toLowerCase().includes(q) || fac.hindiShortDesc.includes(q);
        const matchCategory = fac.category.toLowerCase().includes(q) || fac.hindiCategory.includes(q);
        const matchEquipment = fac.equipmentList.some(
          (eq) => eq.name.toLowerCase().includes(q) || eq.hindiName.includes(q)
        );

        if (!matchName && !matchShortDesc && !matchCategory && !matchEquipment) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedCategory]);

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
      {/* SEARCH & CATEGORY FILTER TOOLBAR (CLEAN TOP SPACING)                      */}
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
                placeholder={t('facilitiesPage.searchPlaceholder')}
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
              {t('facilitiesPage.showingResults').replace('{count}', filteredFacilities.length.toString())}
            </p>
          </div>

          {/* Category Chips Filter */}
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-dark-border flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${selectedCategory === 'all'
                  ? 'bg-medical-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-dark-card text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-dark-border'
                }`}
            >
              {t('facilitiesPage.allCategories')} ({FACILITIES_DATA.length})
            </button>
            {categoriesList.map((cat, idx) => {
              const count = FACILITIES_DATA.filter((fac) => fac.category === cat).length;
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${isSelected
                      ? 'bg-medical-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-dark-card text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-dark-border'
                    }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 3. FACILITIES GRID                                                        */}
      {/* ========================================================================= */}
      <section className="py-12">
        <Container size="xl">
          {filteredFacilities.length > 0 ? (
            <motion.div
              variants={staggerContainer(0.06)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportStandard}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredFacilities.map((fac) => {
                const displayName = isHindi ? fac.hindiName : fac.name;
                const displayCategory = isHindi ? fac.hindiCategory : fac.category;
                const displayBadge = isHindi ? fac.hindiBadge : fac.badge;
                const displayDesc = isHindi ? fac.hindiShortDesc : fac.shortDesc;
                const relatedDepts = DEPARTMENTS_DATA.filter((d) => fac.relatedDepartmentIds.includes(d.id));

                return (
                  <motion.div key={fac.id} variants={fadeInUp} className="flex flex-col h-full">
                    <Card
                      variant="elevated"
                      className="group flex flex-col justify-between h-full overflow-hidden border border-slate-200/80 dark:border-dark-border hover:shadow-card-hover transition-all duration-300"
                    >
                      <div>
                        {/* Image Header */}
                        <div className="relative aspect-[16/10] bg-slate-100 dark:bg-dark-card overflow-hidden">
                          <img
                            src={fac.mainImage}
                            alt={displayName}
                            loading="lazy"
                            decoding="async"
                            srcSet={getResponsiveSrcSet(fac.mainImage)}
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="w-full h-full object-cover group-hover:scale-105 duration-500 transition-transform"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                          {/* Top Badge */}
                          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm border border-white/20">
                            {displayBadge}
                          </div>

                          {/* Icon Pill */}
                          <div className="absolute bottom-3 right-3 w-10 h-10 rounded-xl bg-white/95 dark:bg-dark-surface/95 text-medical-600 dark:text-medical-400 flex items-center justify-center shadow-md">
                            {getFacilityIcon(fac.icon)}
                          </div>

                          {/* Timing pill */}
                          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-[11px] font-semibold text-white/90 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                            <Clock className="w-3 h-3 text-teal-400" />
                            <span>{isHindi ? fac.patientInfo.hindiTiming : fac.patientInfo.timing}</span>
                          </div>
                        </div>

                        {/* Content Body */}
                        <div className="p-6 space-y-4">
                          <div>
                            <span className="text-[11px] font-bold text-medical-600 dark:text-medical-400 uppercase tracking-wider block mb-1">
                              {displayCategory}
                            </span>
                            <Link to={`/facilities/${fac.id}`}>
                              <h2 className="text-xl font-bold text-navy-950 dark:text-white group-hover:text-medical-600 dark:group-hover:text-medical-400 transition-colors leading-snug">
                                {displayName}
                              </h2>
                            </Link>
                          </div>

                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed font-sans">
                            {displayDesc}
                          </p>

                          {/* Equipment Highlight Pills */}
                          {fac.equipmentList.length > 0 && (
                            <div className="pt-2">
                              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                                {t('facilitiesPage.equipmentHeading')}
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {fac.equipmentList.slice(0, 2).map((eq, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-dark-card text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-dark-border"
                                  >
                                    {isHindi ? eq.hindiName : eq.name}
                                  </span>
                                ))}
                                {fac.equipmentList.length > 2 && (
                                  <span className="px-2 py-1 rounded-md text-[11px] font-semibold text-medical-600 dark:text-medical-400 bg-medical-50 dark:bg-medical-950/40">
                                    +{fac.equipmentList.length - 2} {isHindi ? 'अन्य' : 'more'}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Related Departments Badges */}
                          {relatedDepts.length > 0 && (
                            <div className="pt-2 flex items-center gap-1.5 flex-wrap text-xs text-slate-500 dark:text-slate-400">
                              <span className="text-[11px] font-semibold text-slate-400">
                                {isHindi ? 'संबद्ध विभाग:' : 'Units:'}
                              </span>
                              {relatedDepts.map((d) => (
                                <Link
                                  key={d.id}
                                  to={`/departments/${d.id}`}
                                  className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 hover:text-medical-600 hover:underline"
                                >
                                  {isHindi ? d.hindiName : d.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Card Action Footer */}
                      <div className="p-6 pt-0 space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <Link to={`/facilities/${fac.id}`} className="w-full">
                            <Button
                              variant="outline"
                              size="sm"
                              fullWidth
                              className="text-xs"
                              rightIcon={<ArrowRight className="w-3 h-3" />}
                            >
                              {t('facilitiesPage.viewFacilityBtn')}
                            </Button>
                          </Link>

                          <a href={`tel:${fac.patientInfo.contactNumber.replace(/[^0-9+]/g, '')}`} className="w-full">
                            <Button
                              variant="primary"
                              size="sm"
                              fullWidth
                              className="text-xs"
                              leftIcon={<PhoneCall className="w-3.5 h-3.5" />}
                            >
                              {t('facilitiesPage.enquireBtn')}
                            </Button>
                          </a>
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
                {t('facilitiesPage.noFacilitiesFound')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6 font-sans">
                {t('facilitiesPage.noFacilitiesFoundDesc')}
              </p>
              <Button
                variant="primary"
                size="sm"
                leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                {t('facilitiesPage.resetFilters')}
              </Button>
            </div>
          )}
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 4. EMERGENCY & 24/7 HELPLINE BANNER (2-SIDE SLIDE LEFT / SLIDE RIGHT)     */}
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
                {isHindi ? '24/7 आपातकालीन भर्ती एवं एम्बुलेंस नेटवर्क' : '24/7 Emergency Admissions & Ambulance'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug mb-3">
                {isHindi
                  ? 'तत्काल आईसीयू, आपातकालीन भर्ती या एम्बुलेंस सहायता चाहिए?'
                  : 'Require Immediate Emergency Ambulance or Critical ICU Admission?'}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed font-sans mb-6">
                {t('facilitiesPage.emergencyHelplineNotice')}
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
              <a href={`tel:${HOSPITAL_INFO.emergencyPhone.replace(/-/g, '')}`} className="w-full sm:w-auto lg:w-full">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full justify-center shadow-lg shadow-teal-500/20"
                  leftIcon={<PhoneCall className="w-4 h-4 text-emerald-400" />}
                >
                  <span>{HOSPITAL_INFO.emergencyPhone} (24x7)</span>
                </Button>
              </a>

              <a href={`tel:${HOSPITAL_INFO.ambulancePhone.replace(/[^0-9+]/g, '')}`} className="w-full sm:w-auto lg:w-full">
                <Button
                  variant="outline"
                  size="md"
                  className="w-full justify-center border-white/40 text-white hover:bg-white/10"
                  leftIcon={<Ambulance className="w-4 h-4 text-teal-400" />}
                >
                  <span>{isHindi ? 'एम्बुलेंस हेल्पलाइन' : 'Ambulance:'} {HOSPITAL_INFO.ambulancePhone}</span>
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

