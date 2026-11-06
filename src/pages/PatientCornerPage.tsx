import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import {
  HeartHandshake,
  FileCheck,
  ShieldCheck,
  Receipt,
  UserCheck,
  MessageSquareWarning,
  ClipboardList,
  Stethoscope,
  VolumeX,
  ShieldAlert,
  Clock,
  CreditCard,
  ChevronRight,
  ChevronDown,
  Search,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Send,
  Star,
  PhoneCall,
  CalendarCheck,
  FileText,
  User,
  Phone,
  Quote,
  Info,
  Check,
  ExternalLink,
  Download,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  FAQ_CATEGORIES,
  PATIENT_FAQS,
  PATIENT_RIGHTS,
  PATIENT_RESPONSIBILITIES,
  VISITOR_GUIDELINES,
  ADMISSION_STEPS,
  DISCHARGE_STEPS,
  INSURANCE_PROVIDERS,
  VERIFIED_PATIENT_TESTIMONIALS,
  GENERAL_PATIENT_INSTRUCTIONS,
} from '../data/patientCornerData';
import {
  feedbackService,
  PatientFeedbackSubmission,
  FeedbackResponse,
} from '../services/feedbackService';
import { HOSPITAL_INFO } from '../utils/constants';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { motion, AnimatePresence } from 'framer-motion';

type SectionTab =
  | 'overview'
  | 'faqs'
  | 'rights'
  | 'visitors'
  | 'admission'
  | 'insurance'
  | 'testimonials'
  | 'feedback'
  | 'instructions'
  | 'reports';

export const PatientCornerPage: React.FC = () => {
  const { language, t } = useLanguage();
  const isHindi = language === 'hi';
  const { id: sectionParam } = useParams<{ id?: string }>();
  const [searchParams] = useSearchParams();

  // Map route param to tab
  const getTabFromParam = (param?: string): SectionTab => {
    switch (param) {
      case 'admission-guide':
      case 'admission':
      case 'discharge':
        return 'admission';
      case 'insurance-tpa':
      case 'insurance':
      case 'tpa':
        return 'insurance';
      case 'visitor-policy':
      case 'visitors':
        return 'visitors';
      case 'patient-rights':
      case 'rights':
        return 'rights';
      case 'faqs':
      case 'faq':
        return 'faqs';
      case 'testimonials':
      case 'reviews':
        return 'testimonials';
      case 'feedback':
        return 'feedback';
      case 'instructions':
      case 'guidelines':
        return 'instructions';
      case 'lab-reports':
      case 'reports':
        return 'reports';
      default:
        return 'overview';
    }
  };

  const [activeTab, setActiveTab] = useState<SectionTab>(() => {
    const queryTab = searchParams.get('tab') as SectionTab;
    if (queryTab) return queryTab;
    return getTabFromParam(sectionParam);
  });

  // Sync tab with URL updates
  useEffect(() => {
    if (sectionParam) {
      setActiveTab(getTabFromParam(sectionParam));
    } else {
      const qTab = searchParams.get('tab') as SectionTab;
      if (qTab) setActiveTab(qTab);
    }
  }, [sectionParam, searchParams]);

  const handleTabChange = (tab: SectionTab) => {
    setActiveTab(tab);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('tab', tab);
    window.history.replaceState(null, '', `?${newParams.toString()}`);
    // Smooth scroll to top of section content
    const el = document.getElementById('patient-corner-content');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  /* ========================================================================= */
  /* FAQ ACCORDION & SEARCH STATE                                              */
  /* ========================================================================= */
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<string>('all');
  const [faqSearchQuery, setFaqSearchQuery] = useState<string>('');
  const [expandedFaqIds, setExpandedFaqIds] = useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-3': true,
  });

  const toggleFaq = (id: string) => {
    setExpandedFaqIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredFaqs = useMemo(() => {
    return PATIENT_FAQS.filter((faq) => {
      const matchesCategory =
        selectedFaqCategory === 'all' || faq.category === selectedFaqCategory;
      if (!matchesCategory) return false;

      if (!faqSearchQuery.trim()) return true;
      const query = faqSearchQuery.toLowerCase();
      const matchQ =
        faq.question.toLowerCase().includes(query) ||
        faq.hindiQuestion.toLowerCase().includes(query);
      const matchA =
        faq.answer.toLowerCase().includes(query) ||
        faq.hindiAnswer.toLowerCase().includes(query);
      const matchTags = faq.tags.some((tag) => tag.toLowerCase().includes(query));
      return matchQ || matchA || matchTags;
    });
  }, [selectedFaqCategory, faqSearchQuery]);

  /* ========================================================================= */
  /* TESTIMONIALS STATE & FILTER                                               */
  /* ========================================================================= */
  const [selectedTestimonialDept, setSelectedTestimonialDept] = useState<string>('all');

  const filteredTestimonials = useMemo(() => {
    if (selectedTestimonialDept === 'all') return VERIFIED_PATIENT_TESTIMONIALS;
    return VERIFIED_PATIENT_TESTIMONIALS.filter((t) =>
      t.department.toLowerCase().includes(selectedTestimonialDept.toLowerCase())
    );
  }, [selectedTestimonialDept]);

  /* ========================================================================= */
  /* PATIENT FEEDBACK FORM STATE                                               */
  /* ========================================================================= */
  const [feedbackForm, setFeedbackForm] = useState<PatientFeedbackSubmission>({
    patientName: '',
    contact: '',
    category: 'general',
    rating: 5,
    message: '',
    allowPublicDisplay: true,
  });
  const [feedbackErrors, setFeedbackErrors] = useState<Record<string, string>>({});
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [feedbackSuccess, setFeedbackSuccess] = useState<FeedbackResponse | null>(null);
  const [recentFeedbacks, setRecentFeedbacks] = useState<FeedbackResponse[]>([]);

  useEffect(() => {
    setRecentFeedbacks(feedbackService.getRecentFeedbacks());
  }, []);

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!feedbackForm.message.trim() || feedbackForm.message.trim().length < 10) {
      errors.message = isHindi
        ? 'कृपया कम से कम 10 अक्षरों में अपनी प्रतिक्रिया या सुझाव लिखें।'
        : 'Please provide at least 10 characters detailing your experience or feedback.';
    }

    if (feedbackForm.contact && feedbackForm.contact.trim()) {
      const cleanContact = feedbackForm.contact.replace(/\D/g, '');
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(feedbackForm.contact.trim());
      const isPhone = cleanContact.length === 10;
      if (!isEmail && !isPhone) {
        errors.contact = isHindi
          ? 'कृपया मान्य 10-अंकों का मोबाइल नंबर या ईमेल पता दर्ज करें।'
          : 'Please enter a valid 10-digit mobile number or email address.';
      }
    }

    setFeedbackErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSubmittingFeedback(true);
    try {
      const res = await feedbackService.submitFeedback(feedbackForm);
      setFeedbackSuccess(res);
      setRecentFeedbacks((prev) => [res, ...prev]);
      setFeedbackForm({
        patientName: '',
        contact: '',
        category: 'general',
        rating: 5,
        message: '',
        allowPublicDisplay: true,
      });
    } catch {
      // fallback
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  /* ========================================================================= */
  /* REPORTS DOWNLOAD SEARCH STATE                                             */
  /* ========================================================================= */
  const [reportSearchQuery, setReportSearchQuery] = useState('');
  const [downloadingReportId, setDownloadingReportId] = useState<string | null>(null);

  const sampleReports = [
    {
      id: 'REP-2026-9041',
      testName: isHindi ? 'कम्प्लीट ब्लड काउंट (सीबीसी) व हीमोग्राम' : 'Complete Blood Count (CBC) with Differential',
      department: isHindi ? 'पैथोलॉजी एवं हेमेटोलॉजी' : 'Pathology & Haematology',
      date: '02 Nov 2026',
      sampleCollected: '02 Nov 2026, 08:30 AM',
      status: 'VERIFIED',
      verifiedBy: 'Dr. Sunita Deshmukh, MD (Pathology)',
      fileSize: '420 KB PDF',
    },
    {
      id: 'REP-2026-9042',
      testName: isHindi ? 'लिपिड प्रोफाइल एवं फास्टिंग ब्लड ग्लूकोज' : 'Comprehensive Lipid Profile & Fasting Blood Sugar',
      department: isHindi ? 'क्लीनिकल बायोकेमिस्ट्री' : 'Clinical Biochemistry',
      date: '01 Nov 2026',
      sampleCollected: '01 Nov 2026, 09:15 AM',
      status: 'VERIFIED',
      verifiedBy: 'Dr. Sunita Deshmukh, MD (Pathology)',
      fileSize: '380 KB PDF',
    },
    {
      id: 'REP-2026-8819',
      testName: isHindi ? 'डिजिटल चेस्ट एक्स-रे (पीए व्यू)' : 'Digital Chest X-Ray (PA View)',
      department: isHindi ? 'रेडियोलॉजी एवं इमेजिंग' : 'Radiology & Imaging',
      date: '28 Oct 2026',
      sampleCollected: '28 Oct 2026, 11:00 AM',
      status: 'VERIFIED',
      verifiedBy: 'Dr. Arvind Sharma, MD (Radiodiagnosis)',
      fileSize: '1.2 MB PDF',
    },
    {
      id: 'REP-2026-8510',
      testName: isHindi ? '12-लीड इलेक्ट्रोकार्डियोग्राम (ईसीजी)' : '12-Lead Electrocardiogram (ECG)',
      department: isHindi ? 'कार्डियोलॉजी' : 'Cardiology',
      date: '20 Oct 2026',
      sampleCollected: '20 Oct 2026, 04:30 PM',
      status: 'VERIFIED',
      verifiedBy: 'Dr. Ashok Sharma, DM (Cardiology)',
      fileSize: '290 KB PDF',
    },
  ];

  const filteredReports = useMemo(() => {
    if (!reportSearchQuery.trim()) return sampleReports;
    const q = reportSearchQuery.toLowerCase();
    return sampleReports.filter(
      (r) =>
        r.id.toLowerCase().includes(q) ||
        r.testName.toLowerCase().includes(q) ||
        r.department.toLowerCase().includes(q)
    );
  }, [reportSearchQuery, isHindi]);

  const handleDownloadReport = (repId: string, testName: string) => {
    setDownloadingReportId(repId);
    setTimeout(() => {
      setDownloadingReportId(null);
      const element = document.createElement('a');
      const file = new Blob(
        [
          `JANHIT HOSPITAL & RESEARCH CENTRE\nNABL ACCREDITED CENTRAL DIAGNOSTIC LABORATORY\nOfficial Electronic Diagnostic Report\nReference ID: ${repId}\nInvestigation: ${testName}\nAccreditation: NABL / NABH Quality Certified\nVerification Date: ${new Date().toISOString()}\n\nNote: This is an authentic digitally signed laboratory report.`,
        ],
        { type: 'text/plain' }
      );
      element.href = URL.createObjectURL(file);
      element.download = `${repId}-${testName.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 600);
  };

  /* Helper to render icon for Patient Rights */
  const renderRightIcon = (name: string) => {
    switch (name) {
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-medical-600" />;
      case 'FileCheck':
        return <FileCheck className="w-6 h-6 text-medical-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-medical-600" />;
      case 'Receipt':
        return <Receipt className="w-6 h-6 text-medical-600" />;
      case 'UserCheck':
        return <UserCheck className="w-6 h-6 text-medical-600" />;
      case 'MessageSquareWarning':
        return <MessageSquareWarning className="w-6 h-6 text-medical-600" />;
      default:
        return <CheckCircle2 className="w-6 h-6 text-medical-600" />;
    }
  };

  /* Helper to render icon for Patient Responsibilities */
  const renderRespIcon = (name: string) => {
    switch (name) {
      case 'ClipboardList':
        return <ClipboardList className="w-6 h-6 text-accent-600" />;
      case 'Stethoscope':
        return <Stethoscope className="w-6 h-6 text-accent-600" />;
      case 'VolumeX':
        return <VolumeX className="w-6 h-6 text-accent-600" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6 text-accent-600" />;
      case 'Clock':
        return <Clock className="w-6 h-6 text-accent-600" />;
      case 'CreditCard':
        return <CreditCard className="w-6 h-6 text-accent-600" />;
      default:
        return <Info className="w-6 h-6 text-accent-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-navy-950 pb-24">
      {/* ========================================================================= */}
      {/* 1. HERO & BREADCRUMBS BANNER                                              */}
      {/* ========================================================================= */}
      <section className="relative pt-28 pb-16 bg-gradient-to-b from-medical-50/80 via-white to-slate-50/70 dark:from-navy-900 dark:via-navy-950 dark:to-navy-950 border-b border-slate-200/80 dark:border-white/[0.08] overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-medical-400/10 dark:bg-medical-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-80 h-80 bg-accent-400/10 dark:bg-accent-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumbs"
            className="flex items-center space-x-2 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mb-6"
          >
            <Link
              to="/"
              className="hover:text-medical-600 dark:hover:text-medical-400 transition-colors"
            >
              {isHindi ? 'होम' : 'Home'}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-slate-900 dark:text-white font-semibold">
              {isHindi ? 'मरीज सहायता केंद्र' : 'Patient Corner'}
            </span>
          </nav>

          {/* Heading Block */}
          <div className="max-w-3xl">
            <Badge variant="medical" className="mb-3 px-3 py-1 font-semibold uppercase tracking-wider text-xs">
              {t('patientCornerPage.heroBadge')}
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 dark:text-white tracking-tight leading-tight">
              {t('patientCornerPage.heroTitle')}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              {t('patientCornerPage.heroSubtitle')}
            </p>
          </div>

          {/* Quick Action Bar Cards */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <Link
              to="/appointment"
              className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200/90 dark:border-white/[0.08] hover:border-medical-500 dark:hover:border-medical-500 transition-all shadow-sm hover:shadow-md flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-medical-50 dark:bg-medical-950/60 text-medical-600 dark:text-medical-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-navy-950 dark:text-white truncate">
                  {isHindi ? 'अपॉइंटमेंट बुक करें' : 'Book Consultation'}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {isHindi ? 'ओपीडी समय व स्लॉट' : 'OPD Slots & Doctors'}
                </p>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => handleTabChange('insurance')}
              className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200/90 dark:border-white/[0.08] hover:border-medical-500 dark:hover:border-medical-500 transition-all shadow-sm hover:shadow-md flex items-center gap-3 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-accent-50 dark:bg-accent-950/60 text-accent-600 dark:text-accent-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <CreditCard className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-navy-950 dark:text-white truncate">
                  {isHindi ? 'कैशलेस टीपीए बीमा' : 'Cashless TPA'}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {isHindi ? 'आयुष्मान / 35+ बीमा' : 'Ayushman & 35+ TPAs'}
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('visitors')}
              className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200/90 dark:border-white/[0.08] hover:border-medical-500 dark:hover:border-medical-500 transition-all shadow-sm hover:shadow-md flex items-center gap-3 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Clock className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-navy-950 dark:text-white truncate">
                  {isHindi ? 'मुलाकात का समय' : 'Visiting Hours'}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {isHindi ? 'वार्ड एवं आईसीयू नियम' : 'Ward & ICU Guidelines'}
                </p>
              </div>
            </button>

            <a
              href={`tel:${HOSPITAL_INFO.emergencyPhone.replace(/-/g, '')}`}
              className="p-3.5 sm:p-4 rounded-2xl bg-emergency-50/90 dark:bg-emergency-950/40 border border-emergency-200/80 dark:border-emergency-800/40 hover:bg-emergency-100/90 transition-all shadow-sm hover:shadow-md flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-emergency-600 text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <PhoneCall className="w-5 h-5 animate-pulse" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-emergency-950 dark:text-emergency-100 truncate">
                  {isHindi ? '24/7 इमरजेंसी' : '24/7 Emergency'}
                </h4>
                <p className="text-[11px] font-mono font-bold text-emergency-700 dark:text-emergency-300 truncate">
                  {HOSPITAL_INFO.emergencyPhone}
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. STICKY TAB NAVIGATION BAR                                              */}
      {/* ========================================================================= */}
      <section className="sticky top-20 z-30 bg-white/95 dark:bg-navy-900/95 backdrop-blur-md border-b border-slate-200 dark:border-white/[0.08] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-3 no-scrollbar">
            {[
              { id: 'overview', label: t('patientCornerPage.tabOverview'), icon: Info },
              { id: 'faqs', label: t('patientCornerPage.tabFaqs'), icon: HelpCircle },
              { id: 'rights', label: t('patientCornerPage.tabRights'), icon: ShieldCheck },
              { id: 'visitors', label: t('patientCornerPage.tabVisitors'), icon: Clock },
              { id: 'admission', label: t('patientCornerPage.tabAdmission'), icon: FileText },
              { id: 'insurance', label: t('patientCornerPage.tabInsurance'), icon: CreditCard },
              { id: 'reports', label: t('patientCornerPage.tabReports'), icon: Download },
              { id: 'testimonials', label: t('patientCornerPage.tabTestimonials'), icon: Quote },
              { id: 'feedback', label: t('patientCornerPage.tabFeedback'), icon: MessageSquareWarning },
              { id: 'instructions', label: t('patientCornerPage.tabInstructions'), icon: AlertCircle },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabChange(tab.id as SectionTab)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-medical-600 text-white shadow-md shadow-medical-600/20'
                      : 'text-slate-600 dark:text-slate-300 hover:text-navy-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06]'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. MAIN SECTION CONTAINER                                                 */}
      {/* ========================================================================= */}
      <main id="patient-corner-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
        {/* ======================================================================= */}
        {/* TAB 1: OVERVIEW & DASHBOARD                                             */}
        {/* ======================================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-10">
            {/* Introductory Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-medical-50 dark:bg-medical-950/60 text-medical-600 dark:text-medical-400 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-navy-950 dark:text-white">
                  {isHindi ? 'एनएबीएच व एनएबीएल मान्यता' : 'NABH & NABL Standards'}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isHindi
                    ? 'अस्पताल के सभी प्रोटोकॉल राष्ट्रीय प्रत्यायन बोर्ड (NABH) और अंतरराष्ट्रीय गुणवत्ता मानकों के अनुरूप संचालित किए जाते हैं।'
                    : 'Every clinical protocol is governed by National Accreditation Board for Hospitals (NABH) standards ensuring patient safety and infection control.'}
                </p>
                <button
                  type="button"
                  onClick={() => handleTabChange('rights')}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-medical-600 dark:text-medical-400 hover:underline"
                >
                  <span>{isHindi ? 'मरीज अधिकार पढ़ें' : 'View Patient Rights'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </Card>

              <Card className="p-6 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-accent-50 dark:bg-accent-950/60 text-accent-600 dark:text-accent-400 flex items-center justify-center mb-4">
                  <CreditCard className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-navy-950 dark:text-white">
                  {isHindi ? 'कैशलेस मेडिक्लेम एवं टीपीए' : 'Cashless TPA Helpdesk'}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isHindi
                    ? 'आयुष्मान भारत (PM-JAY), सीजीएचएस और 35 से अधिक प्रमुख हेल्थ इंश्योरेंस कंपनियों के साथ कैशलेस इलाज की 24/7 सुविधा उपलब्ध है।'
                    : 'Empaneled with Ayushman Bharat, CGHS, and 35+ private health insurance TPAs with 24/7 dedicated cashless claim assistance.'}
                </p>
                <button
                  type="button"
                  onClick={() => handleTabChange('insurance')}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-accent-600 dark:text-accent-400 hover:underline"
                >
                  <span>{isHindi ? 'बीमा सूची देखें' : 'View Empaneled TPAs'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </Card>

              <Card className="p-6 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-navy-950 dark:text-white">
                  {isHindi ? 'भर्ती एवं डिस्चार्ज गाइड' : 'Admission & Discharge'}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isHindi
                    ? 'अस्पताल में भर्ती होने से लेकर डिस्चार्ज तक के चरणबद्ध नियम, आवश्यक दस्तावेज और स्वास्थ्य लाभ के संपूर्ण दिशा-निर्देश।'
                    : 'Complete step-by-step guidance for planned hospital admission, room allotment, medication counseling, and discharge summary handover.'}
                </p>
                <button
                  type="button"
                  onClick={() => handleTabChange('admission')}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline"
                >
                  <span>{isHindi ? 'भर्ती प्रक्रिया देखें' : 'Admission Steps'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </Card>
            </div>

            {/* Quick Summary Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Top FAQs Preview */}
              <div className="bg-white dark:bg-navy-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-white/[0.08] shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-navy-950 dark:text-white">
                      {isHindi ? 'शीर्ष पूछे जाने वाले सवाल' : 'Top Patient FAQs'}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {isHindi ? 'ओपीडी, जांच एवं भर्ती संबंधी' : 'Common questions on appointments & services'}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleTabChange('faqs')}
                  >
                    {isHindi ? 'सभी प्रश्न देखें' : 'View All FAQs'}
                  </Button>
                </div>

                <div className="space-y-4">
                  {PATIENT_FAQS.slice(0, 3).map((faq) => (
                    <div
                      key={faq.id}
                      className="p-4 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200/80 dark:border-white/[0.06]"
                    >
                      <h4 className="font-bold text-sm text-navy-950 dark:text-white">
                        {isHindi ? faq.hindiQuestion : faq.question}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                        {isHindi ? faq.hindiAnswer : faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Stories Preview */}
              <div className="bg-white dark:bg-navy-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-white/[0.08] shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-navy-950 dark:text-white">
                      {isHindi ? 'सत्यापित मरीजों के अनुभव' : 'Verified Patient Reviews'}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {isHindi ? 'लिखित सहमति से प्रकाशित' : 'Published with informed consent'}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleTabChange('testimonials')}
                  >
                    {isHindi ? 'सभी समीक्षाएं' : 'All Reviews'}
                  </Button>
                </div>

                <div className="space-y-4">
                  {VERIFIED_PATIENT_TESTIMONIALS.slice(0, 2).map((test) => (
                    <div
                      key={test.id}
                      className="p-4 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200/80 dark:border-white/[0.06] flex items-start gap-4"
                    >
                      <img
                        src={test.avatar}
                        alt={test.patientName}
                        className="w-12 h-12 rounded-full object-cover shrink-0 border border-slate-200 dark:border-white/[0.1]"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-navy-950 dark:text-white">
                            {isHindi ? test.hindiPatientName : test.patientName}
                          </span>
                          <Badge variant="accent" className="text-[10px] py-0 px-1.5">
                            {test.rating} ★
                          </Badge>
                        </div>
                        <p className="text-xs text-medical-600 dark:text-medical-400 font-medium mt-0.5">
                          {isHindi ? test.hindiTreatment : test.treatment}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 italic">
                          "{isHindi ? test.hindiStory : test.story}"
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================================= */}
        {/* TAB 2: EXPANDABLE FAQS WITH CATEGORIES & SEARCH                         */}
        {/* ======================================================================= */}
        {activeTab === 'faqs' && (
          <div className="space-y-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 dark:text-white">
                {t('patientCornerPage.faqTitle')}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2">
                {t('patientCornerPage.faqSubtitle')}
              </p>
            </div>

            {/* Search Input & Category Filters */}
            <div className="space-y-4">
              <div className="relative max-w-xl">
                <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={faqSearchQuery}
                  onChange={(e) => setFaqSearchQuery(e.target.value)}
                  placeholder={t('patientCornerPage.searchFaqPlaceholder')}
                  className="w-full pl-11 pr-4 py-3 bg-white dark:bg-navy-900 border border-slate-300 dark:border-navy-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-medical-500 shadow-sm"
                />
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {FAQ_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedFaqCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                      selectedFaqCategory === cat.id
                        ? 'bg-medical-600 text-white shadow-sm'
                        : 'bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06]'
                    }`}
                  >
                    {isHindi ? cat.hindiLabel : cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Accordion List */}
            {filteredFaqs.length > 0 ? (
              <div className="space-y-4">
                {filteredFaqs.map((faq) => {
                  const isExpanded = !!expandedFaqIds[faq.id];
                  return (
                    <Card
                      key={faq.id}
                      className="overflow-hidden border-slate-200 dark:border-white/[0.08] bg-white dark:bg-navy-900 shadow-sm transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full px-5 py-4.5 sm:px-6 sm:py-5 text-left flex items-start justify-between gap-4 hover:bg-slate-50/70 dark:hover:bg-white/[0.02] transition-colors focus:outline-none"
                        aria-expanded={isExpanded}
                      >
                        <span className="font-bold text-base sm:text-lg text-navy-950 dark:text-white leading-snug">
                          {isHindi ? faq.hindiQuestion : faq.question}
                        </span>
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                            isExpanded
                              ? 'bg-medical-600 text-white rotate-180'
                              : 'bg-slate-100 dark:bg-navy-800 text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-2 border-t border-slate-100 dark:border-white/[0.04] text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-4">
                              <p>{isHindi ? faq.hindiAnswer : faq.answer}</p>

                              {faq.link && (
                                <div>
                                  <Link
                                    to={faq.link.url}
                                    className="inline-flex items-center gap-1.5 font-bold text-medical-600 dark:text-medical-400 hover:underline text-xs"
                                  >
                                    <span>{isHindi ? faq.link.hindiText : faq.link.text}</span>
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </Link>
                                </div>
                              )}

                              <div className="flex flex-wrap gap-1.5 pt-1">
                                {faq.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-navy-800 text-slate-500 dark:text-slate-400"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="py-12 text-center rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/[0.08]">
                <HelpCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <h4 className="font-bold text-slate-900 dark:text-white text-base">
                  {t('patientCornerPage.noFaqsFound')}
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
                  {t('patientCornerPage.noFaqsDesc')}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFaqSearchQuery('');
                    setSelectedFaqCategory('all');
                  }}
                  className="mt-4"
                >
                  {isHindi ? 'सभी फ़िल्टर रीसेट करें' : 'Reset FAQ Search'}
                </Button>
              </div>
            )}
          </div>
        )}

        {/* ======================================================================= */}
        {/* TAB 3: PATIENT RIGHTS & RESPONSIBILITIES (NABH STANDARD)                */}
        {/* ======================================================================= */}
        {activeTab === 'rights' && (
          <div className="space-y-12">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 dark:text-white">
                  {isHindi ? 'मरीजों के अधिकार एवं दायित्व' : 'Patient Rights & Responsibilities'}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
                  {isHindi
                    ? 'राष्ट्रीय प्रत्यायन बोर्ड (NABH) के मानकों के तहत रोगियों के सम्मान, सूचित सहमति और पारदर्शी चिकित्सा देखभाल की गारंटी।'
                    : 'Statutory ethical healthcare framework formulated under National Accreditation Board for Hospitals (NABH) standards.'}
                </p>
              </div>
              <Badge variant="medical" className="px-3.5 py-1 text-xs font-bold">
                {t('patientCornerPage.nabhComplianceBadge')}
              </Badge>
            </div>

            {/* 1. Patient Rights Grid */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2.5 h-6 bg-medical-600 rounded-full" />
                <h3 className="text-xl font-bold text-navy-950 dark:text-white">
                  {t('patientCornerPage.rightsTitle')}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PATIENT_RIGHTS.map((right) => (
                  <Card
                    key={right.id}
                    className="p-6 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] hover:border-medical-500 transition-colors shadow-sm"
                  >
                    <div className="w-12 h-12 rounded-xl bg-medical-50 dark:bg-medical-950/60 flex items-center justify-center mb-4">
                      {renderRightIcon(right.iconName)}
                    </div>
                    <h4 className="font-bold text-base text-navy-950 dark:text-white">
                      {isHindi ? right.hindiTitle : right.title}
                    </h4>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {isHindi ? right.hindiDescription : right.description}
                    </p>
                  </Card>
                ))}
              </div>
            </div>

            {/* 2. Patient Responsibilities Grid */}
            <div className="pt-6 border-t border-slate-200/80 dark:border-white/[0.08]">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2.5 h-6 bg-accent-600 rounded-full" />
                <h3 className="text-xl font-bold text-navy-950 dark:text-white">
                  {t('patientCornerPage.respTitle')}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PATIENT_RESPONSIBILITIES.map((resp) => (
                  <Card
                    key={resp.id}
                    className="p-6 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] hover:border-accent-500 transition-colors shadow-sm"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent-50 dark:bg-accent-950/60 flex items-center justify-center mb-4">
                      {renderRespIcon(resp.iconName)}
                    </div>
                    <h4 className="font-bold text-base text-navy-950 dark:text-white">
                      {isHindi ? resp.hindiTitle : resp.title}
                    </h4>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {isHindi ? resp.hindiDescription : resp.description}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================================= */}
        {/* TAB 4: VISITOR GUIDELINES & POLICIES                                    */}
        {/* ======================================================================= */}
        {activeTab === 'visitors' && (
          <div className="space-y-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 dark:text-white">
                {t('patientCornerPage.visitorTitle')}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2">
                {t('patientCornerPage.visitorSubtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {VISITOR_GUIDELINES.map((zone, idx) => (
                <Card
                  key={idx}
                  className="p-6 sm:p-8 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-sm space-y-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Badge variant="medical" className="mb-2">
                        {isHindi ? 'मुलाकात नियम' : 'Visiting Zone'}
                      </Badge>
                      <h3 className="text-xl font-bold text-navy-950 dark:text-white">
                        {isHindi ? zone.hindiZone : zone.zone}
                      </h3>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-medical-50 dark:bg-medical-950/60 text-medical-600 dark:text-medical-400 flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Timing & Capacity Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200/80 dark:border-white/[0.06]">
                    <div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {isHindi ? 'मुलाकात समय' : 'Visiting Hours'}
                      </span>
                      <p className="font-bold text-sm text-navy-950 dark:text-white mt-0.5">
                        {isHindi ? zone.hindiTimings : zone.timings}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {isHindi ? 'अनुमति क्षमता' : 'Allowed Visitors'}
                      </span>
                      <p className="font-bold text-sm text-navy-950 dark:text-white mt-0.5">
                        {isHindi ? zone.hindiMaxVisitors : zone.maxVisitors}
                      </p>
                    </div>
                  </div>

                  {/* Specific Zone Rules */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                      {isHindi ? 'अनिवार्य सुरक्षा नियम' : 'Mandatory Hygiene & Visitor Rules'}
                    </h4>
                    <ul className="space-y-3">
                      {(isHindi ? zone.hindiRules : zone.rules).map((rule, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>

            {/* General Advice Banner */}
            <div className="p-6 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-800/40 text-xs sm:text-sm text-amber-900 dark:text-amber-200 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <p>
                {isHindi
                  ? 'विशेष नोट: चिकित्सक परामर्श अथवा मरीज की नाजुक स्थिति के आधार पर नर्सिंग सुपरवाइजर किसी भी समय आगंतुकों की संख्या सीमित या प्रतिबंधित कर सकते हैं।'
                  : 'Important Note: The nursing supervisor and attending critical care physician reserve the right to restrict visitors at any time based on clinical urgency or patient infection risk.'}
              </p>
            </div>
          </div>
        )}

        {/* ======================================================================= */}
        {/* TAB 5: ADMISSION & DISCHARGE PROCESS                                    */}
        {/* ======================================================================= */}
        {activeTab === 'admission' && (
          <div className="space-y-12">
            {/* 1. Admission Flow */}
            <div>
              <div className="max-w-3xl mb-8">
                <Badge variant="medical" className="mb-2">
                  {isHindi ? 'अस्पताल भर्ती' : 'Inpatient Care'}
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 dark:text-white">
                  {t('patientCornerPage.admissionTitle')}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                  {isHindi
                    ? 'योजनाबद्ध एवं आपातकालीन भर्ती की सुगम और पारदर्शी 5-चरणीय प्रक्रिया।'
                    : 'A transparent 5-step roadmap to ensure effortless admission, room selection, and clinical orientation.'}
                </p>
              </div>

              <div className="space-y-4">
                {ADMISSION_STEPS.map((step) => (
                  <Card
                    key={step.stepNumber}
                    className="p-6 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-sm flex flex-col md:flex-row items-start gap-6"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-medical-600 text-white font-extrabold text-lg flex items-center justify-center shrink-0 shadow-md shadow-medical-600/25">
                      0{step.stepNumber}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-navy-950 dark:text-white">
                        {isHindi ? step.hindiTitle : step.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                        {isHindi ? step.hindiDescription : step.description}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold text-slate-400">
                          {t('patientCornerPage.requiredDocs')}:
                        </span>
                        {(isHindi ? step.hindiDocuments : step.documents).map((doc, dIdx) => (
                          <Badge key={dIdx} variant="default" className="text-[11px] py-0.5 px-2">
                            {doc}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* 2. Discharge Flow */}
            <div className="pt-8 border-t border-slate-200/80 dark:border-white/[0.08]">
              <div className="max-w-3xl mb-8">
                <Badge variant="accent" className="mb-2">
                  {isHindi ? 'डिस्चार्ज एवं स्वास्थ्य लाभ' : 'Discharge & Recovery'}
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 dark:text-white">
                  {t('patientCornerPage.dischargeTitle')}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                  {isHindi
                    ? 'अंतिम बिलिंग, दवाइयों की समझाइश और डिस्चार्ज समरी के साथ सुरक्षित गृह रवानगी।'
                    : 'Systematic protocol for clinical audit, insurance final authorization, medication counseling, and post-discharge support.'}
                </p>
              </div>

              <div className="space-y-4">
                {DISCHARGE_STEPS.map((step) => (
                  <Card
                    key={step.stepNumber}
                    className="p-6 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-sm flex flex-col md:flex-row items-start gap-6"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-accent-600 text-white font-extrabold text-lg flex items-center justify-center shrink-0 shadow-md shadow-accent-600/25">
                      0{step.stepNumber}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-navy-950 dark:text-white">
                        {isHindi ? step.hindiTitle : step.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                        {isHindi ? step.hindiDescription : step.description}
                      </p>
                      <p className="text-xs text-medical-600 dark:text-medical-400 font-semibold mt-2">
                        {isHindi ? step.hindiNotes : step.notes}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================================= */}
        {/* TAB 6: INSURANCE & TPA EMPANELMENT                                      */}
        {/* ======================================================================= */}
        {activeTab === 'insurance' && (
          <div className="space-y-10">
            <div className="max-w-3xl">
              <Badge variant="accent" className="mb-2">
                {isHindi ? 'कैशलेस मेडिक्लेम' : 'Cashless Healthcare'}
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 dark:text-white">
                {t('patientCornerPage.tpaTitle')}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2">
                {t('patientCornerPage.tpaSubtitle')}
              </p>
            </div>

            {/* Helpline Advisory Notice */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-medical-600 to-teal-700 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base">
                    {isHindi ? '24/7 समर्पित टीपीए हेल्पडेस्क' : '24/7 Dedicated TPA Helpdesk'}
                  </h4>
                  <p className="text-xs text-medical-100 mt-0.5">
                    {t('patientCornerPage.tpaHelplineNotice')}
                  </p>
                </div>
              </div>
              <a
                href={`tel:${HOSPITAL_INFO.generalInquiryPhone.replace(/\D/g, '')}`}
                className="px-5 py-2.5 rounded-xl bg-white text-medical-800 font-bold text-xs hover:bg-medical-50 transition-colors shadow-sm shrink-0"
              >
                {isHindi ? 'टीपीए हेल्पडेस्क कॉल करें' : 'Call TPA Helpdesk'}
              </a>
            </div>

            {/* Empaneled Partners Grid */}
            <div>
              <h3 className="text-lg font-bold text-navy-950 dark:text-white mb-4">
                {isHindi ? 'संबद्ध सरकारी योजनाएं एवं प्रमुख टीपीए' : 'Empaneled Government Schemes & Private TPAs'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {INSURANCE_PROVIDERS.map((provider, idx) => (
                  <Card
                    key={idx}
                    className="p-5 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] hover:border-medical-500 transition-colors shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-sm text-navy-950 dark:text-white">
                        {provider.name}
                      </h4>
                      <Badge
                        variant={provider.type === 'Govt Scheme' ? 'accent' : 'default'}
                        className="text-[10px] py-0 px-2 shrink-0"
                      >
                        {provider.type}
                      </Badge>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>{isHindi ? 'कैशलेस सुविधा' : 'Cashless Facility'}:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        {isHindi ? 'सक्रिय' : 'Active'}
                      </span>
                    </div>

                    <div className="mt-1 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>{isHindi ? 'हेल्पलाइन' : 'Toll-Free Helpline'}:</span>
                      <span className="font-mono font-medium text-slate-700 dark:text-slate-300">
                        {provider.contact}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================================= */}
        {/* TAB 7: PATIENT TESTIMONIALS (CONSENT APPROVED)                         */}
        {/* ======================================================================= */}
        {activeTab === 'testimonials' && (
          <div className="space-y-10">
            <div className="max-w-3xl">
              <Badge variant="medical" className="mb-2">
                {isHindi ? 'सत्यापित अनुभव' : 'Verified Reviews'}
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 dark:text-white">
                {t('patientCornerPage.testimonialsTitle')}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2">
                {t('patientCornerPage.testimonialsSubtitle')}
              </p>
            </div>

            {/* Department Filter Bar */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: isHindi ? 'सभी विभाग' : 'All Specialties' },
                { id: 'cardiology', label: isHindi ? 'कार्डियोलॉजी' : 'Cardiology' },
                { id: 'orthopaedics', label: isHindi ? 'ऑर्थोपेडिक्स' : 'Orthopaedics' },
                { id: 'paediatrics', label: isHindi ? 'बाल रोग' : 'Paediatrics' },
                { id: 'neurology', label: isHindi ? 'न्यूरोलॉजी' : 'Neurology' },
                { id: 'gastroenterology', label: isHindi ? 'गैस्ट्रोएंटरोलॉजी' : 'Gastroenterology' },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setSelectedTestimonialDept(f.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    selectedTestimonialDept === f.id
                      ? 'bg-medical-600 text-white shadow-sm'
                      : 'bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.06]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTestimonials.map((item) => (
                <Card
                  key={item.id}
                  className="p-6 sm:p-7 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-sm flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Avatar, Name, Verified Tag */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <img
                          src={item.avatar}
                          alt={item.patientName}
                          className="w-14 h-14 rounded-full object-cover border-2 border-medical-500/30"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-bold text-base text-navy-950 dark:text-white">
                              {isHindi ? item.hindiPatientName : item.patientName}
                            </h4>
                            {item.verifiedPatient && (
                              <span title="Verified Patient Review">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {isHindi ? item.hindiLocation : item.location} • {isHindi ? item.hindiReviewDate : item.reviewDate}
                          </p>
                        </div>
                      </div>

                      {/* Star Rating */}
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>

                    {/* Headline Title */}
                    <h5 className="font-bold text-base text-navy-950 dark:text-white mt-4 leading-snug">
                      "{isHindi ? item.hindiTitle : item.title}"
                    </h5>

                    {/* Story Content */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                      {isHindi ? item.hindiStory : item.story}
                    </p>
                  </div>

                  {/* Footer Tagline */}
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/[0.06] flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="font-semibold text-medical-600 dark:text-medical-400">
                      {isHindi ? item.hindiTreatment : item.treatment}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {isHindi ? item.hindiDoctorName : item.doctorName}
                    </span>
                  </div>
                </Card>
              ))}
            </div>

            {/* Statutory Healthcare Disclaimer */}
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.06] text-xs text-slate-500 dark:text-slate-400">
              {t('patientCornerPage.testimonialDisclaimer')}
            </div>
          </div>
        )}

        {/* ======================================================================= */}
        {/* TAB 8: PATIENT FEEDBACK FORM                                            */}
        {/* ======================================================================= */}
        {activeTab === 'feedback' && (
          <div className="max-w-3xl mx-auto space-y-8">
            <div>
              <Badge variant="medical" className="mb-2">
                {isHindi ? 'मरीज प्रतिक्रिया' : 'Quality Feedback'}
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 dark:text-white">
                {t('patientCornerPage.feedbackTitle')}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2">
                {t('patientCornerPage.feedbackSubtitle')}
              </p>
            </div>

            {feedbackSuccess ? (
              <Card className="p-8 text-center space-y-4 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/40">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-emerald-950 dark:text-emerald-100">
                    {t('patientCornerPage.feedbackSuccessTitle')}
                  </h3>
                  <p className="text-sm text-emerald-800 dark:text-emerald-300 mt-1 max-w-md mx-auto">
                    {t('patientCornerPage.feedbackSuccessDesc').replace('{id}', feedbackSuccess.feedbackId)}
                  </p>
                </div>
                <div className="pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setFeedbackSuccess(null)}
                  >
                    {t('patientCornerPage.feedbackNewBtn')}
                  </Button>
                </div>
              </Card>
            ) : (
              <Card className="p-6 sm:p-8 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-sm">
                <form onSubmit={handleFeedbackSubmit} className="space-y-6">
                  {/* Category Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                      {t('patientCornerPage.formCategory')} <span className="text-emergency-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        { id: 'opd', label: isHindi ? 'ओपीडी परामर्श' : 'OPD Consultation' },
                        { id: 'inpatient', label: isHindi ? 'वार्ड / भर्ती' : 'Inpatient & Ward' },
                        { id: 'nursing', label: isHindi ? 'डॉक्टर व नर्सिंग' : 'Doctors & Nursing' },
                        { id: 'cleanliness', label: isHindi ? 'स्वच्छता व भोजन' : 'Cleanliness & Food' },
                        { id: 'billing', label: isHindi ? 'बिलिंग व टीपीए' : 'Billing & Insurance' },
                        { id: 'general', label: isHindi ? 'सामान्य अनुभव' : 'General Experience' },
                      ].map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setFeedbackForm({ ...feedbackForm, category: cat.id as any })}
                          className={`p-2.5 rounded-xl text-xs font-semibold text-center border transition-all ${
                            feedbackForm.category === cat.id
                              ? 'bg-medical-50 dark:bg-medical-950/60 border-medical-500 text-medical-700 dark:text-medical-300 font-bold'
                              : 'bg-slate-50 dark:bg-navy-950 border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-slate-300 hover:bg-slate-100'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rating Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                      {t('patientCornerPage.formRating')} <span className="text-emergency-500">*</span>
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFeedbackForm({ ...feedbackForm, rating: star })}
                          className="p-1 text-slate-300 hover:text-amber-400 focus:outline-none transition-colors"
                          title={`${star} Stars`}
                        >
                          <Star
                            className={`w-7 h-7 sm:w-8 sm:h-8 transition-transform ${
                              star <= feedbackForm.rating
                                ? 'fill-amber-400 text-amber-400 scale-105'
                                : 'text-slate-300 dark:text-navy-700'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-3 text-xs font-bold text-slate-600 dark:text-slate-400">
                        {feedbackForm.rating} / 5 Stars
                      </span>
                    </div>
                  </div>

                  {/* Name & Contact (Optional) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        {t('patientCornerPage.formName')}
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          value={feedbackForm.patientName || ''}
                          onChange={(e) => setFeedbackForm({ ...feedbackForm, patientName: e.target.value })}
                          placeholder={isHindi ? 'उदा. रविन्द्र कुमार' : 'e.g. Ravindra Kumar'}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-navy-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-medical-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        {t('patientCornerPage.formContact')}
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          value={feedbackForm.contact || ''}
                          onChange={(e) => setFeedbackForm({ ...feedbackForm, contact: e.target.value })}
                          placeholder={isHindi ? '10-अंकों का मोबाइल या ईमेल' : '10-digit mobile or email'}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-navy-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-medical-500"
                        />
                      </div>
                      {feedbackErrors.contact && (
                        <p className="text-xs text-emergency-500 mt-1">{feedbackErrors.contact}</p>
                      )}
                    </div>
                  </div>

                  {/* Message Area */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t('patientCornerPage.formMessage')} <span className="text-emergency-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={feedbackForm.message}
                      onChange={(e) => setFeedbackForm({ ...feedbackForm, message: e.target.value })}
                      placeholder={
                        isHindi
                          ? 'कृपया डॉक्टर, नर्सिंग, कमरों की स्वच्छता, भोजन अथवा बिलिंग संबंधी अपना अनुभव साझा करें...'
                          : 'Please describe your hospital experience, doctor care, nursing, cleanliness, or suggestions...'
                      }
                      className="w-full p-3.5 bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-navy-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-medical-500"
                    />
                    {feedbackErrors.message && (
                      <p className="text-xs text-emergency-500 mt-1">{feedbackErrors.message}</p>
                    )}
                  </div>

                  {/* Consent Checkbox */}
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={feedbackForm.allowPublicDisplay}
                      onChange={(e) =>
                        setFeedbackForm({ ...feedbackForm, allowPublicDisplay: e.target.checked })
                      }
                      className="w-4 h-4 mt-0.5 rounded text-medical-600 focus:ring-medical-500"
                    />
                    <span className="text-xs text-slate-600 dark:text-slate-300">
                      {t('patientCornerPage.formConsent')}
                    </span>
                  </label>

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={isSubmittingFeedback}
                    leftIcon={<Send className="w-4 h-4" />}
                    className="w-full sm:w-auto px-8"
                  >
                    {isSubmittingFeedback
                      ? t('patientCornerPage.submitting')
                      : t('patientCornerPage.submitBtn')}
                  </Button>
                </form>
              </Card>
            )}

            {/* Device Submitted Feedbacks */}
            {recentFeedbacks.length > 0 && (
              <Card className="p-6 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08]">
                <h4 className="font-bold text-sm text-navy-950 dark:text-white mb-3">
                  {isHindi ? 'इस डिवाइस पर दर्ज हालिया सुझाव' : 'Recent Feedback Submitted from this Device'}
                </h4>
                <div className="space-y-3">
                  {recentFeedbacks.slice(0, 3).map((fb) => (
                    <div
                      key={fb.feedbackId}
                      className="p-3.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200/70 dark:border-white/[0.06] flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-medical-600 dark:text-medical-400">
                            {fb.feedbackId}
                          </span>
                          <span className="text-slate-400">• {fb.category.toUpperCase()}</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 mt-0.5 line-clamp-1 italic">
                          "{fb.message}"
                        </p>
                      </div>
                      <Badge variant="default" className="text-[10px] py-0 px-2 shrink-0">
                        {fb.rating} ★
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        )}

        {/* ======================================================================= */}
        {/* TAB 9: GENERAL HOSPITAL INSTRUCTIONS                                    */}
        {/* ======================================================================= */}
        {activeTab === 'instructions' && (
          <div className="space-y-8">
            <div className="max-w-3xl">
              <Badge variant="medical" className="mb-2">
                {isHindi ? 'सुरक्षा व आचार संहिता' : 'Campus Safety'}
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 dark:text-white">
                {isHindi ? 'अस्पताल के सामान्य नियम एवं निर्देश' : 'General Hospital Rules & Safety Instructions'}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2">
                {isHindi
                  ? 'मरीजों के संक्रमण मुक्त उपचार, गोपनीयता और सुरक्षा हेतु सभी आगंतुकों के लिए अनिवार्य दिशा-निर्देश।'
                  : 'Important campus instructions designed to protect infection-sensitive wards, maintain tranquil healing, and ensure patient safety.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {GENERAL_PATIENT_INSTRUCTIONS.map((inst, idx) => (
                <Card
                  key={idx}
                  className="p-6 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-sm hover:border-medical-500 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-navy-800 text-medical-600 dark:text-medical-400 flex items-center justify-center font-bold text-sm mb-4">
                    {idx + 1}
                  </div>
                  <h4 className="font-bold text-base text-navy-950 dark:text-white">
                    {isHindi ? inst.hindiTitle : inst.title}
                  </h4>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {isHindi ? inst.hindiDescription : inst.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================================= */}
        {/* TAB 10: ONLINE LAB REPORTS & DIAGNOSTIC SCANS                           */}
        {/* ======================================================================= */}
        {activeTab === 'reports' && (
          <div className="space-y-8">
            <div className="max-w-3xl">
              <Badge variant="medical" className="mb-2">
                {t('patientCornerPage.nablVerified')}
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 dark:text-white">
                {t('patientCornerPage.reportsTitle')}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2">
                {t('patientCornerPage.reportsSubtitle')}
              </p>
            </div>

            {/* Search Box */}
            <Card className="p-6 sm:p-7 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-sm">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={reportSearchQuery}
                    onChange={(e) => setReportSearchQuery(e.target.value)}
                    placeholder={t('patientCornerPage.searchReportPlaceholder')}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-navy-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-medical-500"
                  />
                </div>
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  className="px-6 py-3 shrink-0"
                >
                  {t('patientCornerPage.searchReportBtn')}
                </Button>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span>{isHindi ? 'त्वरित खोज सुझाव:' : 'Quick Search Hints:'}</span>
                {['CBC', 'Lipid', 'X-Ray', 'ECG', 'REP-2026-9041'].map((hint) => (
                  <button
                    key={hint}
                    type="button"
                    onClick={() => setReportSearchQuery(hint)}
                    className="font-mono text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-navy-800 hover:text-medical-600 transition-colors"
                  >
                    {hint}
                  </button>
                ))}
              </div>
            </Card>

            {/* Reports List */}
            <div className="space-y-4">
              {filteredReports.map((report) => (
                <Card
                  key={report.id}
                  className="p-5 sm:p-6 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-medical-600 dark:text-medical-400">
                        {report.id}
                      </span>
                      <Badge variant="accent" className="text-[10px] py-0 px-2">
                        {report.status}
                      </Badge>
                      <span className="text-xs text-slate-400">• {report.date}</span>
                    </div>

                    <h4 className="font-bold text-base text-navy-950 dark:text-white">
                      {report.testName}
                    </h4>

                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {report.department} • {report.verifiedBy}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                      {report.fileSize}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={downloadingReportId === report.id}
                      onClick={() => handleDownloadReport(report.id, report.testName)}
                      leftIcon={<Download className="w-4 h-4" />}
                      className="w-full sm:w-auto"
                    >
                      {downloadingReportId === report.id
                        ? isHindi
                          ? 'डाउनलोड हो रहा है...'
                          : 'Downloading...'
                        : t('patientCornerPage.downloadPdf')}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* Lab Notice Info */}
            <div className="p-5 rounded-2xl bg-medical-50/80 dark:bg-medical-950/40 border border-medical-200/60 dark:border-medical-800/40 text-xs sm:text-sm text-medical-950 dark:text-medical-200 flex items-start gap-3">
              <Info className="w-5 h-5 text-medical-600 dark:text-medical-400 shrink-0 mt-0.5" />
              <p>
                {isHindi
                  ? 'मरीज गोपनीयता सूचना: सभी इलेक्ट्रॉनिक मेडिकल रिपोर्ट्स भारतीय स्वास्थ्य सुरक्षा मानकों (DISHA) और एनएबीएच प्रोटोकॉल के तहत एन्क्रिप्टेड हैं। हार्ड कॉपी रिपोर्ट अस्पताल के ग्राउंड फ्लोर स्थित सेंट्रल पैथोलॉजी काउंटर पर 24 घंटे उपलब्ध है।'
                  : 'Patient Privacy Notice: All electronic diagnostic records are encrypted under Indian Healthcare Data Standards and NABH guidelines. Physical stamped reports can also be collected round-the-clock from the Central Pathology Reception on the Ground Floor.'}
              </p>
            </div>
          </div>
        )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};
export default PatientCornerPage;
