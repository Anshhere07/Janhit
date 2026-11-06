import React, { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CalendarCheck,
  PhoneCall,
  Search,
  ShieldCheck,
  HeartPulse,
  Brain,
  Bone,
  Activity,
  Baby,
  Ambulance,
  ArrowRight,
  Sparkles,
  Stethoscope,
  UserCheck,
  CheckCircle,
  Clock,
  MapPin,
  Star,
  Award,
  Cpu,
  FileText,
  HeartHandshake,
  Navigation,
  SlidersHorizontal,
  Quote,
} from 'lucide-react';
import {
  Container,
  Section,
  SectionHeading,
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  Breadcrumb,
  Modal,
  ImageContainer,
} from '../components/ui';
import { DoctorCard } from '../components/common/DoctorCard';
import { CounterNumber } from '../components/common/CounterNumber';
import { HeroFloatingMedicalIcons } from '../components/common/FloatingMedicalIcons';
import {
  fadeInUp,
  staggerContainer,
  viewportStandard,
  slideInLeft,
  slideInRight,
  threeCardItem,
} from '../utils/animations';
import { getResponsiveSrcSet } from '../utils/imageUtils';
import { useLanguage } from '../hooks/useLanguage';
import {
  HOSPITAL_METRICS,
  HOSPITAL_SPECIALTIES,
  FEATURED_DOCTORS,
  HOSPITAL_INFRASTRUCTURE,
  WHY_CHOOSE_US_POINTS,
  PATIENT_TESTIMONIALS,
  HOSPITAL_GALLERY_PREVIEWS,
} from '../data/hospitalData';
import { HOSPITAL_INFO } from '../utils/constants';

export const HomePage: React.FC = () => {
  const { t, language } = useLanguage();
  const outletContext = useOutletContext<{ openAppointmentModal?: () => void }>();
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [buttonLoadingDemo, setButtonLoadingDemo] = useState(false);
  const [activeInfrastructureTab, setActiveInfrastructureTab] = useState(0);
  const [showComponentShowcase, setShowComponentShowcase] = useState(false);

  // Helper for specialty icons
  const getSpecialtyIcon = (icon: string) => {
    switch (icon) {
      case 'HeartPulse':
        return <HeartPulse className="w-6 h-6 text-medical-600 dark:text-medical-400" />;
      case 'Brain':
        return <Brain className="w-6 h-6 text-medical-600 dark:text-medical-400" />;
      case 'Bone':
        return <Bone className="w-6 h-6 text-medical-600 dark:text-medical-400" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-medical-600 dark:text-medical-400" />;
      case 'Baby':
        return <Baby className="w-6 h-6 text-medical-600 dark:text-medical-400" />;
      case 'Ambulance':
        return <Ambulance className="w-6 h-6 text-emergency-600 dark:text-emergency-400" />;
      default:
        return <Stethoscope className="w-6 h-6 text-medical-600 dark:text-medical-400" />;
    }
  };

  // Helper for why choose us icons
  const getWhyChooseIcon = (icon: string) => {
    switch (icon) {
      case 'Clock':
        return <Clock className="w-6 h-6 text-teal-600 dark:text-teal-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-teal-600 dark:text-teal-400" />;
      case 'FileText':
        return <FileText className="w-6 h-6 text-teal-600 dark:text-teal-400" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-teal-600 dark:text-teal-400" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-teal-600 dark:text-teal-400" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-teal-600 dark:text-teal-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-teal-600 dark:text-teal-400" />;
    }
  };

  return (
    <div className="space-y-0 selection:bg-teal-500 selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (100VH FULL SCREEN HEIGHT & PREMIUM HEALTHCARE INTERFACE) */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-navy-50/90 via-slate-50 to-white dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg bg-ambient-mesh min-h-[calc(100vh-5rem)] flex flex-col justify-between border-b border-slate-200/60 dark:border-dark-border/60">
        {/* Asymmetrical Floating Medical Icons (One near text, one far, zero vertical line pattern) */}
        <HeroFloatingMedicalIcons />

        {/* Ambient Subtle Glow Orbs */}
        <div className="absolute top-12 left-1/4 w-80 sm:w-96 h-80 sm:h-96 bg-medical-500/10 dark:bg-medical-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-16 right-10 w-72 sm:w-80 h-72 sm:h-80 bg-teal-500/10 dark:bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex-grow flex items-center py-8 lg:py-12 relative z-10">
          <Container size="xl" className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
              
              {/* Left Column: Hero Text & Call to Action (Slide In Left) */}
              <motion.div
                variants={slideInLeft}
                initial="hidden"
                animate="visible"
                className="lg:col-span-7 space-y-6 text-left"
              >
                {/* Accreditation & Emergency Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 dark:bg-dark-card/95 backdrop-blur-md border border-slate-200/90 dark:border-dark-border shadow-sm text-xs font-semibold text-navy-900 dark:text-slate-200">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-teal-700 dark:text-teal-400 font-bold uppercase tracking-wider text-[11px]">
                    NABH & NABL ACCREDITED
                  </span>
                  <span className="text-slate-300 dark:text-slate-600">|</span>
                  <span className="text-slate-600 dark:text-slate-300 font-medium">{t('hero.badge')}</span>
                </div>

                {/* Main Headline with fluid typography */}
                <h1 className="text-[clamp(2.35rem,4.6vw+0.5rem,4.4rem)] font-extrabold text-navy-950 dark:text-white tracking-tight leading-[1.12] [text-wrap:balance]">
                  {t('hero.title')}
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-normal [text-wrap:pretty]">
                  {t('hero.subtitle')}
                </p>

                {/* Trust Highlights Pill Strip */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/50 text-teal-800 dark:text-teal-300 font-semibold border border-teal-200/60 dark:border-teal-900/40">
                    <CheckCircle className="w-3.5 h-3.5 text-teal-600" />
                    24/7 Trauma Care
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-medical-50 dark:bg-medical-950/50 text-medical-800 dark:text-medical-300 font-semibold border border-medical-200/60 dark:border-medical-900/40">
                    <CheckCircle className="w-3.5 h-3.5 text-medical-600" />
                    500+ Beds & OTs
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 font-semibold border border-amber-200/60 dark:border-amber-900/40">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-600" />
                    Cashless Ayushman & TPA
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                  <Button
                    variant="primary"
                    size="lg"
                    leftIcon={<CalendarCheck className="w-5 h-5" />}
                    onClick={() => outletContext?.openAppointmentModal?.()}
                    className="shadow-lg shadow-navy-950/20 dark:shadow-medical-600/30"
                  >
                    {t('hero.primaryCta')}
                  </Button>

                  <Link to="/doctors">
                    <Button
                      variant="outline"
                      size="lg"
                      fullWidth
                      leftIcon={<Search className="w-4 h-4 text-medical-600 dark:text-medical-400" />}
                    >
                      {t('hero.secondaryCta')}
                    </Button>
                  </Link>

                  <a
                    href={`tel:${HOSPITAL_INFO.emergencyPhone.replace(/-/g, '')}`}
                    className="sm:hidden"
                  >
                    <Button
                      variant="emergency"
                      size="lg"
                      fullWidth
                      leftIcon={<PhoneCall className="w-4 h-4" />}
                    >
                      {t('common.emergency247')}
                    </Button>
                  </a>
                </div>

                {/* Emergency Hotline Direct Callout */}
                <div className="pt-2 flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400 flex-wrap">
                  <div className="flex items-center gap-2 font-semibold text-emergency-600 dark:text-emergency-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-emergency-500 animate-ping" />
                    <span>{t('hero.emergencyDirect')}</span>
                  </div>
                  <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>
                  <span className="font-mono font-bold text-navy-950 dark:text-white">
                    {HOSPITAL_INFO.emergencyPhone}
                  </span>
                  <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>
                  <span>
                    {language === 'hi'
                      ? 'त्वरित ट्राइएज, 100+ आईसीयू बेड एवं 24/7 विशेषज्ञ टीम तत्पर'
                      : 'Zero-delay emergency triage, 100+ ICU beds & 24/7 trauma team on-site'}
                  </span>
                </div>
              </motion.div>

              {/* Right Column: Hero Image Composition (Slide In Right) */}
              <motion.div
                variants={slideInRight}
                initial="hidden"
                animate="visible"
                className="lg:col-span-5 relative"
              >
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  {/* Main Image */}
                  <div className="rounded-3xl overflow-hidden shadow-elevated border-4 border-white dark:border-dark-card ring-1 ring-slate-200/50 dark:ring-dark-border">
                    <ImageContainer
                      src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80"
                      alt="Janhit Hospital Modern Healthcare Infrastructure"
                      aspectRatio="4/3"
                      priority
                      layoutPreset="half"
                      zoomOnHover
                    />
                  </div>

                  {/* Floating Patient Care Card Badge */}
                  <div className="absolute -bottom-5 -left-5 bg-white/95 dark:bg-dark-surface/95 backdrop-blur-xl p-4 rounded-2xl shadow-elevated border border-slate-100/90 dark:border-dark-border max-w-[250px] hidden sm:flex items-center gap-3 animate-float">
                    <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 shadow-sm shadow-teal-500/10">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                        NABH & NABL Certified
                      </h5>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        100% Sterile & Infection Free Protocol
                      </p>
                    </div>
                  </div>

                  {/* Floating Doctors Active Count */}
                  <div className="absolute -top-4 -right-4 bg-white/95 dark:bg-dark-surface/95 backdrop-blur-xl py-2.5 px-4 rounded-2xl shadow-elevated border border-slate-100/90 dark:border-dark-border hidden sm:flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <UserCheck className="w-4 h-4 text-medical-600 dark:text-medical-400" />
                    <span className="text-xs font-bold text-navy-900 dark:text-white">
                      120+ Specialists Active
                    </span>
                  </div>

                  {/* Floating Patient Rating Badge */}
                  <div className="absolute top-1/2 -right-5 -translate-y-1/2 bg-white/95 dark:bg-dark-surface/95 backdrop-blur-xl py-2 px-3.5 rounded-2xl shadow-elevated border border-slate-100/90 dark:border-dark-border hidden sm:flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-xs font-bold text-navy-900 dark:text-white">
                      4.9/5
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">
                      (15k+ Reviews)
                    </span>
                  </div>
                </div>
              </motion.div>

            </div>
          </Container>
        </div>

        {/* Hero Bottom Docked Highlights Strip (Completes 100vh viewport grounding) */}
        <div className="relative z-10 w-full bg-white/80 dark:bg-dark-surface/80 backdrop-blur-md border-t border-slate-200/70 dark:border-dark-border/70 py-3.5 sm:py-4">
          <Container size="xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/60 dark:divide-dark-border/60">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-navy-950 dark:text-white">18+ Years</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Healing Excellence</div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:pl-6">
                <div className="w-9 h-9 rounded-xl bg-medical-50 dark:bg-medical-950/60 text-medical-600 dark:text-medical-400 flex items-center justify-center shrink-0">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-navy-950 dark:text-white">500+ Beds</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Advanced Modular OTs</div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:pl-6">
                <div className="w-9 h-9 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-navy-950 dark:text-white">60+ Specialists</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">25+ Medical Centres</div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:pl-6">
                <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                  <Ambulance className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-navy-950 dark:text-white">24/7 Emergency</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Mobile ICU On-Call</div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. QUICK ACTION SECTION (5 INTERACTIVE CARDS)                             */}
      {/* ========================================================================= */}
      <section className="py-12 bg-white dark:bg-dark-surface border-b border-slate-200/60 dark:border-dark-border/60">
        <Container size="xl">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-navy-950 dark:text-white">
              {t('quickActions.title')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {t('quickActions.subtitle')}
            </p>
          </div>

          <motion.div
            variants={staggerContainer(0.06)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportStandard}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
          >
            
            {/* Card 1: Find a Doctor */}
            <motion.div variants={fadeInUp} className="flex">
              <Link
                to="/doctors"
                className="w-full p-5 rounded-2xl bg-slate-50 dark:bg-dark-card border border-slate-200/80 dark:border-dark-border hover:border-medical-500 dark:hover:border-medical-400 hover:shadow-card hover:-translate-y-1 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-medical-50 dark:bg-medical-950/60 text-medical-600 dark:text-medical-400 flex items-center justify-center mb-3.5 group-hover:bg-medical-600 group-hover:text-white transition-colors">
                    <Search className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-navy-950 dark:text-white group-hover:text-medical-600 transition-colors">
                    {t('quickActions.findDoctorTitle')}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {t('quickActions.findDoctorDesc')}
                  </p>
                </div>
                <div className="pt-3 flex items-center text-xs font-semibold text-medical-600 dark:text-medical-400">
                  <span>{t('common.readMore')}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>

            {/* Card 2: Book Appointment */}
            <motion.div variants={fadeInUp} className="flex">
              <button
                type="button"
                onClick={() => outletContext?.openAppointmentModal?.()}
                className="w-full text-left p-5 rounded-2xl bg-medical-50/60 dark:bg-medical-950/30 border border-medical-200/80 dark:border-medical-900/60 hover:shadow-card hover:-translate-y-1 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-medical-600 text-white flex items-center justify-center mb-3.5 shadow-sm shadow-medical-600/30">
                    <CalendarCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-navy-950 dark:text-white group-hover:text-medical-600 transition-colors">
                    {t('quickActions.bookApptTitle')}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {t('quickActions.bookApptDesc')}
                  </p>
                </div>
                <div className="pt-3 flex items-center text-xs font-semibold text-medical-600 dark:text-medical-400">
                  <span>{t('common.bookAppointment')}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </motion.div>

            {/* Card 3: View Departments */}
            <motion.div variants={fadeInUp} className="flex">
              <Link
                to="/departments"
                className="w-full p-5 rounded-2xl bg-slate-50 dark:bg-dark-card border border-slate-200/80 dark:border-dark-border hover:border-teal-500 dark:hover:border-teal-400 hover:shadow-card hover:-translate-y-1 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-3.5 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                    <HeartPulse className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-navy-950 dark:text-white group-hover:text-teal-600 transition-colors">
                    {t('quickActions.viewDeptsTitle')}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {t('quickActions.viewDeptsDesc')}
                  </p>
                </div>
                <div className="pt-3 flex items-center text-xs font-semibold text-teal-600 dark:text-teal-400">
                  <span>{t('common.viewAll')}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>

            {/* Card 4: Emergency Assistance */}
            <motion.div variants={fadeInUp} className="flex">
              <a
                href={`tel:${HOSPITAL_INFO.emergencyPhone.replace(/-/g, '')}`}
                className="w-full p-5 rounded-2xl bg-emergency-50/70 dark:bg-emergency-950/30 border border-emergency-200/80 dark:border-emergency-900/60 hover:shadow-card hover:-translate-y-1 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-emergency-600 text-white flex items-center justify-center mb-3.5 shadow-sm shadow-emergency-600/30">
                    <PhoneCall className="w-5 h-5 animate-pulse" />
                  </div>
                  <h3 className="text-sm font-bold text-emergency-900 dark:text-emergency-300">
                    {t('quickActions.emergencyTitle')}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                    {t('quickActions.emergencyDesc')}
                  </p>
                </div>
                <div className="pt-3 flex items-center text-xs font-bold text-emergency-600 dark:text-emergency-400">
                  <span>{HOSPITAL_INFO.emergencyPhone}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            </motion.div>

            {/* Card 5: Hospital Directions */}
            <motion.div variants={fadeInUp} className="flex sm:col-span-2 lg:col-span-1">
              <Link
                to="/contact"
                className="w-full p-5 rounded-2xl bg-slate-50 dark:bg-dark-card border border-slate-200/80 dark:border-dark-border hover:border-slate-400 hover:shadow-card hover:-translate-y-1 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-dark-surface text-slate-700 dark:text-slate-300 flex items-center justify-center mb-3.5 group-hover:bg-navy-900 group-hover:text-white transition-colors">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-navy-950 dark:text-white group-hover:text-navy-700 transition-colors">
                    {t('quickActions.directionsTitle')}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {t('quickActions.directionsDesc')}
                  </p>
                </div>
                <div className="pt-3 flex items-center text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>{t('common.readMore')}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>

          </motion.div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 3. ABOUT HOSPITAL PREVIEW                                                 */}
      {/* ========================================================================= */}
      <Section variant="muted">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center overflow-hidden">
            
            {/* Left Image & Stats Card (Slide In Left) */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewportStandard}
              className="lg:col-span-5 relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-card border-4 border-white dark:border-dark-surface">
                <ImageContainer
                  src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80"
                  alt="Janhit Hospital Medical Facility"
                  aspectRatio="4/3"
                />
              </div>

              {/* Inset Credibility Chip */}
              <div className="absolute -bottom-6 -right-4 sm:right-6 bg-navy-950 text-white p-5 rounded-2xl shadow-elevated border border-navy-800 max-w-[260px]">
                <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <Award className="w-4 h-4" />
                  <span>Excellence in Care</span>
                </div>
                <p className="text-xs text-slate-300 leading-snug">
                  NABH & NABL accredited tertiary hospital with 25+ medical specialties.
                </p>
              </div>
            </motion.div>

            {/* Right Content (Slide In Right) */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewportStandard}
              className="lg:col-span-7 space-y-6"
            >
              <SectionHeading
                badge={t('aboutPreview.badge')}
                title={t('aboutPreview.title')}
                className="mb-6"
              />

              <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>{t('aboutPreview.descriptionP1')}</p>
                <p>{t('aboutPreview.descriptionP2')}</p>
              </div>

              {/* 4 Key Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white dark:bg-dark-surface border border-slate-200/80 dark:border-dark-border">
                  <CheckCircle className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {t('aboutPreview.highlight1')}
                  </span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white dark:bg-dark-surface border border-slate-200/80 dark:border-dark-border">
                  <CheckCircle className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {t('aboutPreview.highlight2')}
                  </span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white dark:bg-dark-surface border border-slate-200/80 dark:border-dark-border">
                  <CheckCircle className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {t('aboutPreview.highlight3')}
                  </span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white dark:bg-dark-surface border border-slate-200/80 dark:border-dark-border">
                  <CheckCircle className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {t('aboutPreview.highlight4')}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Link to="/about">
                  <Button variant="secondary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    {t('aboutPreview.learnMoreBtn')}
                  </Button>
                </Link>
              </div>
            </motion.div>

          </div>
        </Container>
      </Section>

      {/* ========================================================================= */}
      {/* 4. MEDICAL SPECIALTIES (6 DEPARTMENT CARDS)                                */}
      {/* ========================================================================= */}
      <Section variant="surface">
        <Container size="xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <SectionHeading
              badge="Clinical Centres"
              title={t('sections.specialtiesTitle')}
              subtitle={t('sections.specialtiesSubtitle')}
              className="mb-0"
            />
            <Link to="/departments" className="mt-4 md:mt-0 shrink-0">
              <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                {t('common.viewAll')}
              </Button>
            </Link>
          </div>

          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportStandard}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {HOSPITAL_SPECIALTIES.map((spec) => (
              <motion.div key={spec.id} variants={fadeInUp} className="flex">
                <Card
                  interactive
                  variant="glass"
                  className="group flex flex-col justify-between overflow-hidden w-full hover:border-teal-500/40 dark:hover:border-teal-500/40"
                >
                  <div>
                    {spec.image && (
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-dark-card">
                        <img
                          src={spec.image}
                          alt={spec.title}
                          loading="lazy"
                          decoding="async"
                          srcSet={getResponsiveSrcSet(spec.image)}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="w-full h-full object-cover group-hover:scale-105 duration-700 transition-transform"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                          <span className="text-xs font-semibold text-white bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md">
                            {spec.stats}
                          </span>
                          <div className="w-8 h-8 rounded-lg bg-white/90 text-medical-600 flex items-center justify-center">
                            {getSpecialtyIcon(spec.icon)}
                          </div>
                        </div>
                      </div>
                    )}

                    <CardHeader>
                      <CardTitle className="group-hover:text-medical-600 transition-colors">
                        {language === 'hi' ? spec.hindiTitle : spec.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3">
                        {language === 'hi' ? spec.hindiDescription : spec.description}
                      </CardDescription>
                    </CardHeader>
                  </div>

                  <CardFooter className="pt-3">
                    <Link
                      to={spec.path}
                      className="text-xs font-semibold text-medical-600 dark:text-medical-400 flex items-center gap-1.5 group-hover:gap-2.5 transition-all"
                    >
                      <span>{t('common.viewDetails')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <span className="text-[11px] text-slate-400">24/7 Consultation</span>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ========================================================================= */}
      {/* 5. FEATURED DOCTORS                                                       */}
      {/* ========================================================================= */}
      <Section variant="muted">
        <Container size="xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <SectionHeading
              badge={t('doctorsSection.badge')}
              title={t('doctorsSection.title')}
              subtitle={t('doctorsSection.subtitle')}
              className="mb-0"
            />
            <Link to="/doctors" className="mt-4 md:mt-0 shrink-0">
              <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                {t('doctorsSection.viewAllDoctorsBtn')}
              </Button>
            </Link>
          </div>

          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportStandard}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {FEATURED_DOCTORS.map((doc) => (
              <motion.div key={doc.id} variants={fadeInUp}>
                <DoctorCard
                  doctor={doc}
                  onBookAppointment={() => outletContext?.openAppointmentModal?.()}
                />
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ========================================================================= */}
      {/* 6. WHY CHOOSE US (VERIFIED CLINICAL STRENGTHS)                            */}
      {/* ========================================================================= */}
      <Section variant="surface">
        <Container size="xl">
          <SectionHeading
            badge={t('whyChooseUs.badge')}
            title={t('whyChooseUs.title')}
            subtitle={t('whyChooseUs.subtitle')}
            align="center"
          />

          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportStandard}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {WHY_CHOOSE_US_POINTS.map((item) => (
              <motion.div
                key={item.id}
                variants={fadeInUp}
                className="p-6 rounded-2xl bg-white/80 dark:bg-dark-card/80 backdrop-blur-sm border border-slate-200/80 dark:border-dark-border hover:border-teal-500/40 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                    {getWhyChooseIcon(item.icon)}
                  </div>
                  {item.stat && (
                    <Badge variant="accent" size="sm">
                      {item.stat}
                    </Badge>
                  )}
                </div>

                <h3 className="text-base font-bold text-navy-950 dark:text-white">
                  {language === 'hi' ? item.hindiTitle : item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {language === 'hi' ? item.hindiDescription : item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ========================================================================= */}
      {/* 7. HOSPITAL INFRASTRUCTURE (OT, ICU, MRI, NICU)                           */}
      {/* ========================================================================= */}
      <Section variant="muted">
        <Container size="xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <SectionHeading
              badge={t('infrastructure.badge')}
              title={t('infrastructure.title')}
              subtitle={t('infrastructure.subtitle')}
              className="mb-0"
            />
            <Link to="/facilities" className="mt-4 md:mt-0 shrink-0">
              <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                {t('infrastructure.exploreFacilitiesBtn')}
              </Button>
            </Link>
          </div>

          {/* Infrastructure Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
            {HOSPITAL_INFRASTRUCTURE.map((infra, idx) => (
              <button
                key={infra.id}
                type="button"
                onClick={() => setActiveInfrastructureTab(idx)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap focus-ring ${
                  activeInfrastructureTab === idx
                    ? 'bg-navy-900 text-white shadow-md dark:bg-medical-600'
                    : 'bg-white dark:bg-dark-surface text-slate-600 dark:text-slate-300 hover:bg-slate-100 border border-slate-200/80 dark:border-dark-border'
                }`}
              >
                {language === 'hi' ? infra.hindiTitle : infra.title}
              </button>
            ))}
          </div>

          {/* Active Infrastructure Showcase Card */}
          {(() => {
            const currentInfra = HOSPITAL_INFRASTRUCTURE[activeInfrastructureTab];
            return (
              <div className="rounded-3xl bg-white dark:bg-dark-surface border border-slate-200/80 dark:border-dark-border overflow-hidden shadow-card">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  {/* Left Specs */}
                  <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="medical" showDot>
                          {language === 'hi' ? currentInfra.hindiCategory : currentInfra.category}
                        </Badge>
                        <Badge variant="accent">
                          {currentInfra.badge}
                        </Badge>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-navy-950 dark:text-white">
                        {language === 'hi' ? currentInfra.hindiTitle : currentInfra.title}
                      </h3>

                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {language === 'hi' ? currentInfra.hindiDescription : currentInfra.description}
                      </p>

                      <div className="space-y-2.5 pt-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Key Clinical Capabilities:
                        </span>
                        {(language === 'hi' ? currentInfra.hindiSpecifications : currentInfra.specifications).map((spec, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium">
                            <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
                            <span>{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 flex items-center gap-4">
                      <Link to="/facilities">
                        <Button variant="secondary" size="md">
                          {t('common.viewDetails')}
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Right Image */}
                  <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-full bg-slate-100 dark:bg-dark-card">
                    <img
                      src={currentInfra.image}
                      alt={currentInfra.title}
                      loading="lazy"
                      decoding="async"
                      srcSet={getResponsiveSrcSet(currentInfra.image)}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            );
          })()}
        </Container>
      </Section>

      {/* ========================================================================= */}
      {/* 8. HOSPITAL STATISTICS & TRUST COUNTERS                                   */}
      {/* ========================================================================= */}
      <section className="bg-navy-950 text-white py-14 border-y border-navy-900">
        <Container size="xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {HOSPITAL_METRICS.map((metric) => (
              <div key={metric.id} className="space-y-2">
                <div className="text-3xl sm:text-5xl font-extrabold text-teal-400 tracking-tight font-sans">
                  <CounterNumber value={metric.value} />
                </div>
                <div className="text-sm sm:text-base font-semibold text-white">
                  {language === 'hi' ? metric.hindiLabel : metric.label}
                </div>
                <div className="text-xs text-slate-400 max-w-[200px] mx-auto hidden sm:block">
                  {metric.description}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 9. PATIENT TESTIMONIALS (APPROVED RECOVERY STORIES)                       */}
      {/* ========================================================================= */}
      <Section variant="surface">
        <Container size="xl">
          <SectionHeading
            badge={t('testimonials.badge')}
            title={t('testimonials.title')}
            subtitle={t('testimonials.subtitle')}
            align="center"
          />

          <motion.div
            variants={staggerContainer(0.14)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportStandard}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {PATIENT_TESTIMONIALS.map((item) => (
              <motion.div
                key={item.id}
                variants={threeCardItem}
                className="group relative p-6 sm:p-7 rounded-2xl bg-white dark:bg-dark-surface border border-slate-200/80 dark:border-dark-border shadow-soft hover:shadow-card-hover hover:border-teal-500/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Decorative Quote Watermark */}
                <Quote className="absolute top-5 right-5 w-8 h-8 text-slate-100 dark:text-dark-card pointer-events-none group-hover:text-teal-500/10 transition-colors" />

                <div className="space-y-4 relative z-10">
                  {/* Star Rating & Verified Label */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 stroke-none" />
                      ))}
                    </div>
                    {item.verified && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-2.5 py-0.5 rounded-full border border-teal-200/50 dark:border-teal-900/50">
                        <ShieldCheck className="w-3 h-3 text-teal-600 dark:text-teal-400" />
                        <span>{language === 'hi' ? 'सत्यापित मरीज' : 'Verified'}</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
                    "{language === 'hi' ? item.hindiReview : item.review}"
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-100 dark:border-dark-border mt-6 flex items-center gap-3.5 relative z-10">
                  <img
                    src={item.avatar}
                    alt={language === 'hi' ? item.hindiPatientName : item.patientName}
                    loading="lazy"
                    decoding="async"
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-teal-500/30 group-hover:ring-teal-500/60 transition-all"
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-navy-950 dark:text-white">
                      {language === 'hi' ? item.hindiPatientName : item.patientName}
                    </h4>
                    <p className="text-[11px] font-medium text-teal-600 dark:text-teal-400">
                      {language === 'hi' ? item.hindiTreatment : item.treatment}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ========================================================================= */}
      {/* 10. GALLERY PREVIEW (CAMPUS & CLINICAL INFRASTRUCTURE)                    */}
      {/* ========================================================================= */}
      <Section variant="surface">
        <Container size="xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <SectionHeading
              badge={t('gallerySection.badge')}
              title={t('gallerySection.title')}
              subtitle={t('gallerySection.subtitle')}
              className="mb-0"
            />
            <Link to="/gallery" className="mt-4 md:mt-0 shrink-0">
              <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                {t('gallerySection.viewFullGalleryBtn')}
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {HOSPITAL_GALLERY_PREVIEWS.map((item) => (
              <div
                key={item.id}
                className="relative group rounded-2xl overflow-hidden aspect-[4/3] bg-slate-200 dark:bg-dark-card shadow-soft"
              >
                <img
                  src={item.image}
                  alt={language === 'hi' ? item.hindiTitle : item.title}
                  loading="lazy"
                  decoding="async"
                  srcSet={getResponsiveSrcSet(item.image)}
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="w-full h-full object-cover group-hover:scale-110 duration-700 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                  <span className="text-[10px] sm:text-xs font-semibold text-teal-300 uppercase tracking-wider block mb-1">
                    {language === 'hi' ? item.hindiCategory : item.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">
                    {language === 'hi' ? item.hindiTitle : item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ========================================================================= */}
      {/* 12. LOCATION & MAP SECTION                                                */}
      {/* ========================================================================= */}
      <Section variant="muted">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Location Details */}
            <div className="lg:col-span-5 space-y-6">
              <SectionHeading
                badge={t('locationSection.badge')}
                title={t('locationSection.title')}
                subtitle={t('locationSection.subtitle')}
                className="mb-4"
              />

              <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-dark-surface border border-slate-200/80 dark:border-dark-border">
                  <MapPin className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-navy-950 dark:text-white text-xs uppercase tracking-wider mb-1">
                      {t('locationSection.addressTitle')}
                    </h5>
                    <p className="text-xs sm:text-sm">
                      {language === 'hi' ? HOSPITAL_INFO.hindiAddress : HOSPITAL_INFO.address}
                    </p>
                    <p className="text-xs text-teal-600 dark:text-teal-400 font-medium mt-1">
                      {t('locationSection.metroAccess')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-dark-surface border border-slate-200/80 dark:border-dark-border">
                  <PhoneCall className="w-5 h-5 text-emergency-600 shrink-0" />
                  <div>
                    <h5 className="font-bold text-navy-950 dark:text-white text-xs uppercase tracking-wider mb-0.5">
                      {t('locationSection.emergencyHotlineLabel')}
                    </h5>
                    <a
                      href={`tel:${HOSPITAL_INFO.emergencyPhone.replace(/-/g, '')}`}
                      className="text-sm font-bold text-emergency-600 dark:text-emergency-400 hover:underline"
                    >
                      {HOSPITAL_INFO.emergencyPhone} (24x7 Dedicated)
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-dark-surface border border-slate-200/80 dark:border-dark-border">
                  <Clock className="w-5 h-5 text-medical-600 shrink-0" />
                  <div>
                    <h5 className="font-bold text-navy-950 dark:text-white text-xs uppercase tracking-wider mb-0.5">
                      {t('locationSection.opdConsultationLabel')}
                    </h5>
                    <p className="text-xs sm:text-sm">
                      {language === 'hi' ? HOSPITAL_INFO.hindiOpdHours : HOSPITAL_INFO.opdHours}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="primary" size="md" leftIcon={<Navigation className="w-4 h-4" />}>
                    {t('locationSection.getDirectionsBtn')}
                  </Button>
                </a>
              </div>
            </div>

            {/* Right Interactive Map Frame */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl overflow-hidden shadow-card border border-slate-200 dark:border-dark-border h-[380px] sm:h-[420px] relative bg-slate-200 dark:bg-dark-surface">
                {/* Styled Map Embed */}
                <iframe
                  title="Janhit Hospital Campus Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112061.08272922718!2d77.1009!3d28.6139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full grayscale-[20%] dark:invert-[90%] dark:hue-rotate-180"
                />

                {/* Floating Campus Badge over map */}
                <div className="absolute top-4 left-4 bg-white/95 dark:bg-dark-surface/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-slate-200/60 dark:border-dark-border flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emergency-600 animate-pulse" />
                  <span className="text-xs font-bold text-navy-950 dark:text-white">
                    Janhit Hospital Main Campus
                  </span>
                </div>
              </div>
            </div>

          </div>
        </Container>
      </Section>

      {/* ========================================================================= */}
      {/* 13. FINAL APPOINTMENT CONVERSION CTA BANNER                                */}
      {/* ========================================================================= */}
      <section className="py-16 bg-gradient-to-r from-navy-950 via-navy-900 to-medical-950 text-white relative overflow-hidden border-t border-navy-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-transparent pointer-events-none" />
        <Container size="xl" className="relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge variant="accent" showDot className="mx-auto">
              {t('common.nabhAccredited')}
            </Badge>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              {t('finalCta.title')}
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
              {t('finalCta.subtitle')}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="secondary"
                size="lg"
                leftIcon={<CalendarCheck className="w-5 h-5" />}
                onClick={() => outletContext?.openAppointmentModal?.()}
                className="w-full sm:w-auto shadow-elevated"
              >
                {t('finalCta.btnBook')}
              </Button>

              <a
                href={`tel:${HOSPITAL_INFO.emergencyPhone.replace(/-/g, '')}`}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="emergency"
                  size="lg"
                  fullWidth
                  leftIcon={<PhoneCall className="w-5 h-5" />}
                >
                  {t('finalCta.btnEmergency')}
                </Button>
              </a>
            </div>

            <div className="pt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
              <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
              <span>{t('finalCta.responseTime')}</span>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* DEVELOPER / QA DESIGN SYSTEM COMPONENT PLAYGROUND (COLLAPSIBLE)            */}
      {/* ========================================================================= */}
      <section className="py-8 bg-slate-100 dark:bg-dark-card/60 border-t border-slate-200 dark:border-dark-border">
        <Container size="xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Phase 01 & 02 Architecture System Playground
              </span>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowComponentShowcase(!showComponentShowcase)}
            >
              {showComponentShowcase ? 'Hide Component Playground' : 'Show Component Playground'}
            </Button>
          </div>

          {showComponentShowcase && (
            <div className="mt-8 space-y-6">
              <div className="p-4 bg-white dark:bg-dark-surface rounded-xl border border-slate-200/80 dark:border-dark-border">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
                  Breadcrumb Component:
                </span>
                <Breadcrumb
                  items={[
                    { label: 'Patient Services', path: '/services' },
                    { label: 'Cardiology Center', path: '/departments/cardiology' },
                    { label: 'OPD Consultation' },
                  ]}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card variant="bordered" className="p-5 space-y-3">
                  <h4 className="text-xs font-bold uppercase text-navy-950 dark:text-white">
                    {t('uiDemo.buttonsHeading')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="primary" size="sm" isLoading={buttonLoadingDemo}>Primary</Button>
                    <Button variant="secondary" size="sm" isLoading={buttonLoadingDemo}>Secondary</Button>
                    <Button variant="accent" size="sm" isLoading={buttonLoadingDemo}>Accent</Button>
                    <Button variant="outline" size="sm">Outline</Button>
                    <Button variant="ghost" size="sm">Ghost</Button>
                    <Button variant="emergency" size="sm">Emergency</Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setButtonLoadingDemo(!buttonLoadingDemo)}
                    >
                      Toggle Loading
                    </Button>
                  </div>
                </Card>

                <Card variant="bordered" className="p-5 space-y-3">
                  <h4 className="text-xs font-bold uppercase text-navy-950 dark:text-white">
                    {t('uiDemo.badgesHeading')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="default" showDot>Navy</Badge>
                    <Badge variant="medical" showDot>Medical</Badge>
                    <Badge variant="accent" showDot>Teal</Badge>
                    <Badge variant="emergency" showDot>Emergency</Badge>
                    <Badge variant="success" showDot>Approved</Badge>
                    <Badge variant="warning" showDot>Review</Badge>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* Modal Dialog for Playground Demonstration */}
      <Modal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        title="Janhit Clinical Modal Dialog"
        description="This modal supports keyboard navigation, escape listener, backdrop blur and fluid transitions."
        footer={
          <>
            <Button variant="ghost" onClick={() => setDemoModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setDemoModalOpen(false)}>
              Confirm Action
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            The hospital homepage components are modular and ready for all specialized sub-routes.
          </p>
        </div>
      </Modal>

    </div>
  );
};
