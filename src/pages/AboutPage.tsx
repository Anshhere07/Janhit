import React, { useState, useRef } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  ShieldCheck,
  Award,
  Heart,
  Cpu,
  HeartHandshake,
  Users,
  CheckCircle,
  CalendarCheck,
  PhoneCall,
  ArrowRight,
  Compass,
  Target,
  FileCheck2,
  Sparkles,
} from 'lucide-react';
import {
  Container,
  Section,
  SectionHeading,
  Button,
  Badge,
  Card,
  ImageContainer,
} from '../components/ui';
import { CounterNumber } from '../components/common/CounterNumber';
import { getResponsiveSrcSet } from '../utils/imageUtils';
import { useLanguage } from '../hooks/useLanguage';
import {
  fadeInUp,
  slideInLeft,
  slideInRight,
  staggerContainer,
  threeCardItem,
  viewportStandard,
} from '../utils/animations';
import {
  HOSPITAL_HISTORY_TIMELINE,
  CORE_VALUES,
  HOSPITAL_LEADERSHIP,
  DETAILED_ACCREDITATIONS,
  INSTITUTIONAL_ACHIEVEMENTS,
  HOSPITAL_INFRASTRUCTURE,
  WHY_CHOOSE_US_POINTS,
  HOSPITAL_METRICS,
} from '../data/hospitalData';

// ============================================================================
// 5. EDITORIAL TIMELINE SUBCOMPONENT WITH DYNAMIC SCROLL GLOW & ANIMATED NODES
// ============================================================================
const EditorialTimeline: React.FC<{
  language: string;
}> = ({ language }) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 85%', 'end 70%'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <Section id="history" variant="muted" spacing="lg">
      <Container size="xl">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-medical-50 dark:bg-medical-950/60 border border-medical-200 dark:border-medical-800 text-xs font-semibold text-medical-700 dark:text-medical-300 mb-3">
            <span className="w-2 h-2 rounded-full bg-medical-600 animate-pulse" />
            <span>{language === 'hi' ? 'विकास का इतिहास' : 'Our Development Heritage'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-950 dark:text-white tracking-tight leading-tight">
            {language === 'hi' ? 'हमारी स्थापना एवं 18 वर्षों का सेवा सफर' : 'Our 18-Year Healthcare Journey & Heritage'}
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {language === 'hi'
              ? '100 बिस्तरों के प्राथमिक केंद्र से 500 बिस्तरों वाले विशाल सुपर स्पेशलिटी रिसर्च संस्थान तक का प्रेरणादायक सफर।'
              : 'From a humble 100-bed regional hospital to a 500-bed super speciality tertiary care and research landmark.'}
          </p>

          {/* Centered Teal-to-Blue Gradient Accent Bar (Matching Reference Image) */}
          <div className="w-12 h-1 rounded-full bg-gradient-to-r from-teal-400 to-medical-500 mx-auto mt-4" />
        </div>

        <div ref={timelineRef} className="max-w-4xl mx-auto relative pt-4 pb-12">
          {/* Central Background Rule */}
          <div className="absolute top-0 bottom-0 left-4 sm:left-1/2 w-1 bg-slate-200/90 dark:bg-slate-800 -translate-x-1/2 rounded-full" />

          {/* Dynamic Visual Glowing Progress Line that fills down as user scrolls! */}
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute top-0 bottom-0 left-4 sm:left-1/2 w-1.5 -translate-x-1/2 rounded-full bg-gradient-to-b from-teal-400 via-medical-500 to-cyan-400 shadow-[0_0_14px_rgba(13,148,136,0.9),0_0_28px_rgba(13,148,136,0.5)] z-[2]"
          />

          <div className="space-y-12 sm:space-y-16">
            {HOSPITAL_HISTORY_TIMELINE.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={item.year}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  } gap-6 sm:gap-12 pl-12 sm:pl-0`}
                >
                  {/* Center Timeline Node Dot with Bullseye Ring (Matching Reference Image) */}
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, ease: [0.35, 0.0, 0.2, 1.0] }}
                    className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white dark:bg-dark-surface border-[3px] border-medical-500 dark:border-medical-400 shadow-md flex items-center justify-center z-10"
                  >
                    <span className="w-3 h-3 rounded-full bg-medical-600 dark:bg-medical-400 shadow-[0_0_8px_rgba(14,165,233,0.9)]" />
                    <span className="absolute inset-0 rounded-full border-2 border-teal-400/40 animate-ping pointer-events-none" />
                  </motion.div>

                  {/* Timeline Card with Smooth Left/Right Entrance Animations & Consistent Left-Aligned Interior */}
                  <motion.div
                    variants={isEven ? slideInRight : slideInLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportStandard}
                    className="w-full sm:w-1/2 text-left"
                  >
                    <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-dark-surface border border-slate-200/90 dark:border-dark-border shadow-soft hover:shadow-card hover:border-teal-500/50 hover:-translate-y-1 transition-all duration-300 space-y-3.5">
                      <div className="flex items-center gap-2.5 justify-start">
                        <Badge variant="accent" size="sm" className="bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 border-teal-200">
                          {language === 'hi' ? item.hindiBadge : item.badge}
                        </Badge>
                        <span className="text-xl font-extrabold text-medical-600 dark:text-medical-400 font-mono tracking-tight">
                          {item.year}
                        </span>
                      </div>

                      <h4 className="text-base sm:text-lg font-bold text-navy-950 dark:text-white">
                        {language === 'hi' ? item.hindiTitle : item.title}
                      </h4>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {language === 'hi' ? item.hindiDescription : item.description}
                      </p>

                      {item.highlightStat && (
                        <div className="pt-2 text-xs font-semibold text-teal-700 dark:text-teal-400 flex items-center gap-1.5 justify-start">
                          <CheckCircle className="w-4 h-4 text-teal-500" />
                          <span>{item.highlightStat}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* Empty spacer for opposite side */}
                  <div className="hidden sm:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export const AboutPage: React.FC = () => {
  const { t, language } = useLanguage();
  const outletContext = useOutletContext<{ openAppointmentModal?: () => void }>();
  const [activeNavTab, setActiveNavTab] = useState('overview');

  const navSections = [
    { id: 'overview', label: t('aboutPage.navOverview') },
    { id: 'vision-mission', label: t('aboutPage.navVisionMission') },
    { id: 'values', label: t('aboutPage.navValues') },
    { id: 'history', label: t('aboutPage.navHistory') },
    { id: 'leadership', label: t('aboutPage.navLeadership') },
    { id: 'infrastructure', label: t('aboutPage.navInfrastructure') },
    { id: 'accreditations', label: t('aboutPage.navAccreditations') },
    { id: 'milestones', label: t('aboutPage.navMilestones') },
    { id: 'why-choose-us', label: t('aboutPage.navWhyChooseUs') },
  ];

  const scrollToSection = (id: string) => {
    setActiveNavTab(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const getValueIcon = (icon: string) => {
    switch (icon) {
      case 'Heart':
        return <Heart className="w-5 h-5 text-medical-600 dark:text-medical-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-teal-600 dark:text-teal-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-medical-600 dark:text-medical-400" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-teal-600 dark:text-teal-400" />;
      case 'Users':
        return <Users className="w-5 h-5 text-medical-600 dark:text-medical-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-teal-600 dark:text-teal-400" />;
    }
  };

  return (
    <div className="space-y-0 selection:bg-teal-500 selection:text-white">
      
      {/* ========================================================================= */}
      {/* STICKY SUB-NAVIGATION BAR                                                 */}
      {/* ========================================================================= */}
      <div className="sticky top-[58px] sm:top-[64px] z-30 bg-white/95 dark:bg-dark-surface/95 backdrop-blur-md border-b border-slate-200/60 dark:border-dark-border/60 shadow-sm">
        <Container size="xl">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 scrollbar-none">
            {navSections.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap select-none ${
                  activeNavTab === item.id
                    ? 'bg-navy-900 text-white shadow-sm dark:bg-medical-600'
                    : 'text-slate-600 dark:text-slate-300 hover:text-navy-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </Container>
      </div>

      {/* ========================================================================= */}
      {/* 2. SECTION: HOSPITAL OVERVIEW (2-COLUMN SLIDE LEFT / SLIDE RIGHT)         */}
      {/* ========================================================================= */}
      <Section id="overview" variant="surface" spacing="lg">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center overflow-hidden">
            
            {/* Left Narrative (Slide in Left) */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewportStandard}
              className="lg:col-span-7 space-y-6"
            >
              <SectionHeading
                badge={t('aboutPage.overviewBadge')}
                title={t('aboutPage.overviewTitle')}
                className="mb-4"
              />

              <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>{t('aboutPage.overviewP1')}</p>
                <p>{t('aboutPage.overviewP2')}</p>
                <p>{t('aboutPage.overviewP3')}</p>
              </div>

              {/* Verified Metrics Counter Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100 dark:border-dark-border">
                {HOSPITAL_METRICS.map((metric) => (
                  <div key={metric.id} className="space-y-1">
                    <div className="text-2xl sm:text-3xl font-extrabold text-medical-600 dark:text-medical-400 font-sans">
                      <CounterNumber value={metric.value} />
                    </div>
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {language === 'hi' ? metric.hindiLabel : metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Visual Image Frame (Slide in Right) */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewportStandard}
              className="lg:col-span-5 relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-card border-4 border-white dark:border-dark-surface">
                <ImageContainer
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80"
                  alt="Janhit Hospital Campus Infrastructure"
                  aspectRatio="4/3"
                />
              </div>

              {/* Floating Quality Seal */}
              <div className="absolute -bottom-6 -left-4 sm:left-4 bg-white dark:bg-dark-surface p-4 rounded-2xl shadow-elevated border border-slate-100 dark:border-dark-border max-w-[260px] hidden sm:flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    NABH & NABL Accredited
                  </h5>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Highest national benchmark for ethical medical care.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </Container>
      </Section>

      {/* ========================================================================= */}
      {/* 3. SECTION: VISION & MISSION (2-CARD SLIDE LEFT & SLIDE RIGHT)             */}
      {/* ========================================================================= */}
      <Section id="vision-mission" variant="muted" spacing="lg">
        <Container size="xl">
          <SectionHeading
            badge={t('aboutPage.visionBadge')}
            title={language === 'hi' ? 'हमारा विज़न एवं मिशन' : 'Our Vision & Strategic Mission'}
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto overflow-hidden">
            
            {/* Vision Card (Slide In Left) */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewportStandard}
              className="p-8 rounded-3xl bg-white dark:bg-dark-surface border border-slate-200/80 dark:border-dark-border shadow-soft flex flex-col justify-between space-y-6 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-teal-500 to-teal-400" />
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-navy-950 dark:text-white">
                  {t('aboutPage.visionTitle')}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {t('aboutPage.visionDesc')}
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-dark-border/60 flex items-center gap-2 text-xs font-semibold text-teal-600 dark:text-teal-400">
                <Sparkles className="w-4 h-4" />
                <span>Excellence • Compassion • Research</span>
              </div>
            </motion.div>

            {/* Mission Card (Slide In Right) */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewportStandard}
              className="p-8 rounded-3xl bg-white dark:bg-dark-surface border border-slate-200/80 dark:border-dark-border shadow-soft flex flex-col justify-between space-y-6 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-medical-600 to-medical-400" />
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-medical-50 dark:bg-medical-950/60 text-medical-600 dark:text-medical-400 flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-navy-950 dark:text-white">
                  {t('aboutPage.missionTitle')}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {t('aboutPage.missionDesc')}
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-dark-border/60 flex items-center gap-2 text-xs font-semibold text-medical-600 dark:text-medical-400">
                <CheckCircle className="w-4 h-4" />
                <span>Patient Safety • Zero Infection • Transparency</span>
              </div>
            </motion.div>

          </div>
        </Container>
      </Section>

      {/* ========================================================================= */}
      {/* 4. SECTION: CORE VALUES (HEART FRAMEWORK)                                 */}
      {/* ========================================================================= */}
      <Section id="values" variant="surface" spacing="lg">
        <Container size="xl">
          <SectionHeading
            badge={t('aboutPage.valuesBadge')}
            title={t('aboutPage.valuesTitle')}
            subtitle={t('aboutPage.valuesSubtitle')}
            align="center"
          />

          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportStandard}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
          >
            {CORE_VALUES.map((item) => (
              <motion.div
                key={item.id}
                variants={fadeInUp}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-sm hover:shadow-card hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-dark-surface flex items-center justify-center shadow-subtle border border-slate-100 dark:border-dark-border">
                      {getValueIcon(item.icon)}
                    </div>
                    <span className="text-2xl font-black text-slate-300 dark:text-slate-700 font-mono">
                      {item.letter}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-navy-950 dark:text-white leading-snug">
                    {language === 'hi' ? item.hindiTitle : item.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {language === 'hi' ? item.hindiDescription : item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ========================================================================= */}
      {/* 5. SECTION: OUR HISTORY AND JOURNEY (EDITORIAL TIMELINE WITH SCROLL GLOW) */}
      {/* ========================================================================= */}
      <EditorialTimeline language={language} />

      {/* ========================================================================= */}
      {/* 6. SECTION: HOSPITAL LEADERSHIP AND MANAGEMENT                             */}
      {/* ========================================================================= */}
      <Section id="leadership" variant="surface" spacing="lg">
        <Container size="xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <SectionHeading
              badge={t('aboutPage.leadershipBadge')}
              title={t('aboutPage.leadershipTitle')}
              subtitle={t('aboutPage.leadershipSubtitle')}
              className="mb-0"
            />
            <div className="mt-4 md:mt-0 text-xs text-slate-500 dark:text-slate-400 max-w-xs text-left md:text-right">
              {t('aboutPage.leadershipNotice')}
            </div>
          </div>

          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportStandard}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {HOSPITAL_LEADERSHIP.map((leader) => (
              <motion.div key={leader.id} variants={fadeInUp}>
                <Card
                  variant="elevated"
                  className="overflow-hidden flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Photo Frame */}
                    <div className="relative aspect-[4/3.5] bg-slate-100 dark:bg-dark-card overflow-hidden">
                      <img
                        src={leader.image}
                        alt={leader.name}
                        loading="lazy"
                        decoding="async"
                        srcSet={getResponsiveSrcSet(leader.image)}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="w-full h-full object-cover object-top hover:scale-105 duration-500 transition-transform"
                      />
                      <div className="absolute top-3 right-3 bg-white/95 dark:bg-dark-surface/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-navy-950 dark:text-white shadow-sm border border-slate-200/60 dark:border-dark-border">
                        {leader.badge}
                      </div>
                    </div>

                    <div className="p-5 space-y-2">
                      <h4 className="text-base font-bold text-navy-950 dark:text-white">
                        {language === 'hi' ? leader.hindiName : leader.name}
                      </h4>

                      <p className="text-xs font-semibold text-medical-600 dark:text-medical-400">
                        {language === 'hi' ? leader.hindiDesignation : leader.designation}
                      </p>

                      <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 line-clamp-2">
                        {leader.qualifications}
                      </p>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-2 border-t border-slate-100 dark:border-dark-border">
                        {language === 'hi' ? leader.hindiBio : leader.bio}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <div className="flex items-center gap-1.5 text-[11px] text-teal-600 dark:text-teal-400 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Clinical Governance Verified</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ========================================================================= */}
      {/* 7. SECTION: INFRASTRUCTURE OVERVIEW                                       */}
      {/* ========================================================================= */}
      <Section id="infrastructure" variant="muted" spacing="lg">
        <Container size="xl">
          <SectionHeading
            badge={t('aboutPage.infraBadge')}
            title={t('aboutPage.infraTitle')}
            subtitle={t('aboutPage.infraSubtitle')}
            align="center"
          />

          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportStandard}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {HOSPITAL_INFRASTRUCTURE.map((item) => (
              <motion.div
                key={item.id}
                variants={fadeInUp}
                className="rounded-2xl overflow-hidden bg-white dark:bg-dark-surface border border-slate-200/80 dark:border-dark-border shadow-soft flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden relative bg-slate-100 dark:bg-dark-card">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      srcSet={getResponsiveSrcSet(item.image)}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="w-full h-full object-cover hover:scale-105 duration-500 transition-transform"
                    />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
                      {item.badge}
                    </div>
                  </div>

                  <div className="p-5 space-y-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                      {language === 'hi' ? item.hindiCategory : item.category}
                    </span>

                    <h4 className="text-sm sm:text-base font-bold text-navy-950 dark:text-white">
                      {language === 'hi' ? item.hindiTitle : item.title}
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                      {language === 'hi' ? item.hindiDescription : item.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-slate-100 dark:border-dark-border flex items-center justify-between text-xs font-semibold text-medical-600 dark:text-medical-400">
                    <Link to="/facilities" className="hover:underline flex items-center gap-1">
                      <span>{t('common.viewDetails')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ========================================================================= */}
      {/* 8. SECTION: ACCREDITATIONS & CERTIFICATIONS                               */}
      {/* ========================================================================= */}
      <Section id="accreditations" variant="surface" spacing="lg">
        <Container size="xl">
          <SectionHeading
            badge={t('aboutPage.accreditationsBadge')}
            title={t('aboutPage.accreditationsTitle')}
            subtitle={t('aboutPage.accreditationsSubtitle')}
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto overflow-hidden">
            {DETAILED_ACCREDITATIONS.map((acc, index) => (
              <motion.div
                key={acc.id}
                variants={index === 0 ? slideInLeft : slideInRight}
                initial="hidden"
                whileInView="visible"
                viewport={viewportStandard}
                className="p-7 rounded-3xl bg-slate-50 dark:bg-dark-card border border-slate-200/80 dark:border-dark-border shadow-soft flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 font-extrabold text-sm font-mono border border-teal-200/60 dark:border-teal-900">
                      {acc.name}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-white dark:bg-dark-surface px-2.5 py-1 rounded-md border border-slate-200 dark:border-dark-border">
                      {acc.validity}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-navy-950 dark:text-white">
                      {language === 'hi' ? acc.hindiTitle : acc.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Issuing Body: {acc.issuingBody}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {language === 'hi' ? acc.hindiDescription : acc.description}
                  </p>

                  <div className="pt-2 space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      {t('aboutPage.scopeOfAccreditation')}:
                    </span>
                    {(language === 'hi' ? acc.hindiScope : acc.scope).map((scopeItem, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-200">
                        <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span>{scopeItem}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/70 dark:border-dark-border flex items-center gap-1.5 text-xs text-teal-700 dark:text-teal-400 font-semibold">
                  <FileCheck2 className="w-4 h-4" />
                  <span>Audited Quality Compliance</span>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ========================================================================= */}
      {/* 9. SECTION: ACHIEVEMENTS AND MILESTONES                                   */}
      {/* ========================================================================= */}
      <section id="milestones" className="bg-navy-950 text-white py-16 border-y border-navy-900">
        <Container size="xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="accent" showDot className="mb-3">
              {t('aboutPage.achievementsBadge')}
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {t('aboutPage.achievementsTitle')}
            </h2>
            <p className="text-sm text-slate-300 mt-2">
              {t('aboutPage.achievementsSubtitle')}
            </p>
          </div>

          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportStandard}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {INSTITUTIONAL_ACHIEVEMENTS.map((item) => (
              <motion.div
                key={item.id}
                variants={fadeInUp}
                className="p-6 rounded-2xl bg-navy-900/80 border border-navy-800 text-center space-y-3"
              >
                <div className="text-3xl sm:text-4xl font-extrabold text-teal-400 font-sans tracking-tight">
                  {item.metric}
                </div>
                <h4 className="text-sm font-bold text-white">
                  {language === 'hi' ? item.hindiTitle : item.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {language === 'hi' ? item.hindiDescription : item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 10. SECTION: WHY CHOOSE JANHIT HOSPITAL?                                  */}
      {/* ========================================================================= */}
      <Section id="why-choose-us" variant="surface" spacing="lg">
        <Container size="xl">
          <SectionHeading
            badge={t('aboutPage.navWhyChooseUs')}
            title={t('aboutPage.whyChooseTitle')}
            subtitle={t('aboutPage.whyChooseSubtitle')}
            align="center"
          />

          <motion.div
            variants={staggerContainer(0.14)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportStandard}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {WHY_CHOOSE_US_POINTS.map((item) => (
              <motion.div
                key={item.id}
                variants={threeCardItem}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-dark-card border border-slate-200/80 dark:border-dark-border hover:shadow-card hover:-translate-y-1.5 transition-all duration-300 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  {item.stat && (
                    <Badge variant="accent" size="sm">
                      {item.stat}
                    </Badge>
                  )}
                </div>

                <h4 className="text-base font-bold text-navy-950 dark:text-white">
                  {language === 'hi' ? item.hindiTitle : item.title}
                </h4>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {language === 'hi' ? item.hindiDescription : item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ========================================================================= */}
      {/* 11. FINAL CONVERSION CTA BANNER                                           */}
      {/* ========================================================================= */}
      <section className="py-16 bg-gradient-to-r from-navy-950 via-navy-900 to-medical-950 text-white relative overflow-hidden border-t border-navy-800">
        <Container size="xl" className="relative z-10 text-center space-y-6 max-w-3xl mx-auto">
          <Badge variant="accent" showDot className="mx-auto">
            {t('common.nabhAccredited')}
          </Badge>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {t('aboutPage.ctaTitle')}
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {t('aboutPage.ctaSubtitle')}
          </p>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="secondary"
              size="lg"
              leftIcon={<CalendarCheck className="w-5 h-5" />}
              onClick={() => outletContext?.openAppointmentModal?.()}
              className="w-full sm:w-auto shadow-elevated"
            >
              {t('aboutPage.bookConsultationBtn')}
            </Button>

            <Link to="/contact" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                fullWidth
                leftIcon={<PhoneCall className="w-4 h-4 text-teal-400" />}
                className="border-slate-700 text-white hover:bg-slate-800"
              >
                {t('aboutPage.contactHelpdeskBtn')}
              </Button>
            </Link>
          </div>
        </Container>
      </section>

    </div>
  );
};
