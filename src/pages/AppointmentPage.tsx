import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CalendarPlus,
  Search,
  MessageSquareHeart,
  ChevronRight,
  Clock,
  PhoneCall,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Printer,
  Share2,
  User,
  Phone,
  Mail,
  Send,
  CreditCard,
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  appointmentService,
  AppointmentResponse,
  PatientEnquiry,
  EnquiryResponse,
} from '../services/appointmentService';
import { AppointmentBookingWizard } from '../components/common/AppointmentBookingWizard';
import { DEPARTMENTS_DATA } from '../data/hospitalData';
import { HOSPITAL_INFO } from '../utils/constants';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import {
  slideInLeft,
  slideInRight,
} from '../utils/animations';

type TabType = 'book' | 'track' | 'enquiry';

export const AppointmentPage: React.FC = () => {
  const { language, t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  // Active tab state
  const initialTab = (searchParams.get('tab') as TabType) || 'book';
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);

  // URL pre-fills for booking wizard
  const initialDoctorId = searchParams.get('doctor') || undefined;
  const initialDepartmentId = searchParams.get('department') || undefined;

  // Status tracking state
  const [trackRefInput, setTrackRefInput] = useState<string>(searchParams.get('ref') || '');
  const [isSearchingTrack, setIsSearchingTrack] = useState<boolean>(false);
  const [searchedAppointment, setSearchedAppointment] = useState<AppointmentResponse | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [recentBookings, setRecentBookings] = useState<AppointmentResponse[]>([]);
  const [copiedRef, setCopiedRef] = useState<boolean>(false);

  // General enquiry state
  const [enquiryForm, setEnquiryForm] = useState<PatientEnquiry>({
    fullName: '',
    phone: '',
    email: '',
    department: '',
    message: '',
  });
  const [enquiryErrors, setEnquiryErrors] = useState<Record<string, string>>({});
  const [isSubmittingEnquiry, setIsSubmittingEnquiry] = useState<boolean>(false);
  const [enquirySuccess, setEnquirySuccess] = useState<EnquiryResponse | null>(null);

  // Synchronize tab change with URL search params
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setSearchParams((prev) => {
      const updated = new URLSearchParams(prev);
      updated.set('tab', tab);
      return updated;
    });
  };

  // Load recent bookings from local storage
  useEffect(() => {
    const list = appointmentService.getRecentAppointments();
    setRecentBookings(list);

    // Auto search if ref query param was present
    const refParam = searchParams.get('ref');
    if (refParam) {
      handleSearchTrack(refParam);
    }
  }, []);

  // Track search action
  const handleSearchTrack = async (refToSearch?: string) => {
    const query = (refToSearch || trackRefInput).trim().toUpperCase();
    if (!query) return;

    setIsSearchingTrack(true);
    setHasSearched(true);
    try {
      const result = await appointmentService.getAppointmentStatus(query);
      setSearchedAppointment(result);
    } catch {
      setSearchedAppointment(null);
    } finally {
      setIsSearchingTrack(false);
    }
  };

  // Copy reference number to clipboard
  const handleCopyReference = (ref: string) => {
    navigator.clipboard.writeText(ref);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2500);
  };

  // Print appointment slip
  const handlePrintSlip = () => {
    window.print();
  };

  // Validate and submit patient enquiry form
  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!enquiryForm.fullName.trim()) {
      errors.fullName =
        language === 'hi' ? 'कृपया अपना पूरा नाम दर्ज करें।' : 'Please enter your full name.';
    }

    const cleanPhone = enquiryForm.phone.replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      errors.phone =
        language === 'hi'
          ? 'कृपया वैध 10-अंकों का भारतीय मोबाइल नंबर दर्ज करें।'
          : 'Please enter a valid 10-digit Indian mobile number.';
    }

    if (enquiryForm.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiryForm.email.trim())) {
      errors.email =
        language === 'hi' ? 'कृपया मान्य ईमेल पता दर्ज करें।' : 'Please enter a valid email address.';
    }

    if (!enquiryForm.message.trim() || enquiryForm.message.trim().length < 10) {
      errors.message =
        language === 'hi'
          ? 'कृपया कम से कम 10 अक्षरों में अपना सवाल लिखें।'
          : 'Please provide at least 10 characters describing your inquiry.';
    }

    setEnquiryErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSubmittingEnquiry(true);
    try {
      const res = await appointmentService.submitPatientEnquiry({
        ...enquiryForm,
        phone: cleanPhone,
      });
      setEnquirySuccess(res);
      setEnquiryForm({ fullName: '', phone: '', email: '', department: '', message: '' });
    } catch {
      // Resilience fallback
    } finally {
      setIsSubmittingEnquiry(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-navy-950 pb-20">
      {/* ========================================================================= */}
      {/* OPD SCHEDULE & EMERGENCY ALERT (CLEAN SPACING DIRECTLY BELOW NAVBAR)       */}
      {/* ========================================================================= */}
      <section className="relative pt-6 sm:pt-8 pb-4 bg-gradient-to-b from-medical-50/50 via-white to-slate-50/70 dark:from-navy-900/60 dark:via-navy-950 dark:to-navy-950 border-b border-slate-200/80 dark:border-white/[0.08] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* OPD Schedule & Emergency Alert Ribbon (2 Cards: Slide Left & Slide Right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              animate="visible"
              className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/90 dark:bg-navy-900/90 border border-slate-200/90 dark:border-white/[0.08] shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-medical-50 dark:bg-medical-950/60 text-medical-600 dark:text-medical-400 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-navy-950 dark:text-white">
                  {t('appointmentPage.opdTimingsTitle')}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                  {t('appointmentPage.opdTimingsDesc')}
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={slideInRight}
              initial="hidden"
              animate="visible"
              className="flex items-start gap-3.5 p-4 rounded-2xl bg-emergency-50/80 dark:bg-emergency-950/40 border border-emergency-200/60 dark:border-emergency-800/40 text-emergency-900 dark:text-emergency-200"
            >
              <div className="w-10 h-10 rounded-xl bg-emergency-100 dark:bg-emergency-900/60 text-emergency-600 dark:text-emergency-400 flex items-center justify-center shrink-0">
                <PhoneCall className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-emergency-900 dark:text-emergency-100 flex items-center gap-2">
                  <span>{language === 'hi' ? '24/7 आपातकालीन सहायता' : '24/7 Emergency Helpline'}</span>
                  <span className="text-xs font-mono font-bold bg-emergency-600 text-white px-2 py-0.5 rounded-full">
                    {HOSPITAL_INFO.emergencyPhone}
                  </span>
                </h4>
                <p className="text-xs text-emergency-800 dark:text-emergency-300 mt-0.5">
                  {t('appointmentPage.immediateEmergencyNotice')}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. MAIN INTERACTIVE CONTENT AREA (TABS + SIDEBAR)                         */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Navigation Tabs Pill Bar */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white/90 dark:bg-navy-900/90 backdrop-blur-md rounded-2xl border border-slate-200/90 dark:border-white/[0.08] shadow-sm mb-8 w-fit max-w-full">
          <button
            type="button"
            onClick={() => handleTabChange('book')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
              activeTab === 'book'
                ? 'bg-medical-600 text-white shadow-md shadow-medical-600/25'
                : 'text-slate-600 dark:text-slate-300 hover:text-navy-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06]'
            }`}
          >
            <CalendarPlus className="w-4 h-4" />
            <span>{t('appointmentPage.tabBookAppointment')}</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('track')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
              activeTab === 'track'
                ? 'bg-medical-600 text-white shadow-md shadow-medical-600/25'
                : 'text-slate-600 dark:text-slate-300 hover:text-navy-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06]'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>{t('appointmentPage.tabTrackStatus')}</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('enquiry')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
              activeTab === 'enquiry'
                ? 'bg-medical-600 text-white shadow-md shadow-medical-600/25'
                : 'text-slate-600 dark:text-slate-300 hover:text-navy-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06]'
            }`}
          >
            <MessageSquareHeart className="w-4 h-4" />
            <span>{t('appointmentPage.tabGeneralEnquiry')}</span>
          </button>
        </div>

        {/* Dynamic Grid Layout (Left: Wizard/Tracking, Right: Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Primary Column (8 Cols on Desktop - Slide In Left) */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate="visible"
            className="lg:col-span-8"
          >
            {/* TAB 1: BOOKING WIZARD */}
            {activeTab === 'book' && (
              <AppointmentBookingWizard
                initialDoctorId={initialDoctorId}
                initialDepartmentId={initialDepartmentId}
                onSuccess={(res) => {
                  setRecentBookings((prev) => [res, ...prev]);
                }}
              />
            )}

            {/* TAB 2: TRACK STATUS */}
            {activeTab === 'track' && (
              <div className="space-y-6">
                <Card className="p-6 sm:p-8 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-sm">
                  <div className="max-w-xl">
                    <h2 className="text-xl sm:text-2xl font-bold text-navy-950 dark:text-white">
                      {t('appointmentPage.trackTitle')}
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">
                      {t('appointmentPage.trackSubtitle')}
                    </p>
                  </div>

                  {/* Search Bar */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSearchTrack();
                    }}
                    className="mt-6 flex flex-col sm:flex-row gap-3"
                  >
                    <div className="relative flex-1">
                      <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      <input
                        type="text"
                        value={trackRefInput}
                        onChange={(e) => setTrackRefInput(e.target.value.toUpperCase())}
                        placeholder={t('appointmentPage.trackInputPlaceholder')}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-navy-700 rounded-xl text-slate-900 dark:text-white font-mono font-medium uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-medical-500"
                        maxLength={15}
                      />
                    </div>
                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      disabled={isSearchingTrack || !trackRefInput.trim()}
                      className="px-6 py-3 shrink-0"
                    >
                      {isSearchingTrack
                        ? t('appointmentPage.trackSearching')
                        : t('appointmentPage.trackSearchBtn')}
                    </Button>
                  </form>

                  {/* Track Result Card */}
                  {hasSearched && (
                    <div className="mt-8 pt-8 border-t border-slate-100 dark:border-white/[0.06]">
                      {searchedAppointment ? (
                        <div className="rounded-2xl p-6 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-white/[0.08] space-y-6">
                          <div className="flex flex-wrap items-center justify-between gap-4">
                            <div>
                              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                {language === 'hi' ? 'रेफरेंस नंबर' : 'Booking Reference'}
                              </span>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="font-mono text-2xl font-extrabold text-navy-950 dark:text-white tracking-wider">
                                  {searchedAppointment.referenceNumber}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleCopyReference(searchedAppointment.referenceNumber)}
                                  className="p-1.5 text-slate-500 hover:text-medical-600 rounded-lg hover:bg-white dark:hover:bg-navy-900 transition-colors"
                                  title="Copy Reference Number"
                                >
                                  {copiedRef ? (
                                    <Check className="w-4 h-4 text-emerald-600" />
                                  ) : (
                                    <Copy className="w-4 h-4" />
                                  )}
                                </button>
                              </div>
                            </div>

                            <Badge
                              variant={searchedAppointment.status === 'CONFIRMED' ? 'accent' : 'medical'}
                              className="px-3 py-1 font-bold"
                            >
                              {searchedAppointment.status === 'CONFIRMED'
                                ? t('appointmentPage.statusConfirmed')
                                : t('appointmentPage.statusPending')}
                            </Badge>
                          </div>

                          {/* Detail Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-slate-200/60 dark:border-white/[0.06]">
                            <div>
                              <span className="text-xs text-slate-500 dark:text-slate-400">
                                {language === 'hi' ? 'मरीज का नाम' : 'Patient Name'}
                              </span>
                              <p className="font-bold text-slate-900 dark:text-white mt-0.5">
                                {searchedAppointment.data.patientName} ({searchedAppointment.data.age} Yrs)
                              </p>
                            </div>

                            <div>
                              <span className="text-xs text-slate-500 dark:text-slate-400">
                                {language === 'hi' ? 'चिकित्सक' : 'Consultant Doctor'}
                              </span>
                              <p className="font-bold text-slate-900 dark:text-white mt-0.5">
                                {language === 'hi'
                                  ? searchedAppointment.data.hindiDoctorName
                                  : searchedAppointment.data.doctorName}
                              </p>
                            </div>

                            <div>
                              <span className="text-xs text-slate-500 dark:text-slate-400">
                                {language === 'hi' ? 'विभाग' : 'Department'}
                              </span>
                              <p className="font-bold text-slate-900 dark:text-white mt-0.5">
                                {language === 'hi'
                                  ? searchedAppointment.data.hindiDepartmentName
                                  : searchedAppointment.data.departmentName}
                              </p>
                            </div>

                            <div>
                              <span className="text-xs text-slate-500 dark:text-slate-400">
                                {language === 'hi' ? 'परामर्श तिथि' : 'Appointment Date'}
                              </span>
                              <p className="font-bold text-medical-600 dark:text-medical-400 mt-0.5">
                                {searchedAppointment.data.appointmentDate}
                              </p>
                            </div>

                            <div>
                              <span className="text-xs text-slate-500 dark:text-slate-400">
                                {language === 'hi' ? 'समय स्लॉट' : 'Time Slot'}
                              </span>
                              <p className="font-bold text-slate-900 dark:text-white mt-0.5">
                                {language === 'hi'
                                  ? searchedAppointment.data.hindiPreferredTime
                                  : searchedAppointment.data.preferredTime}
                              </p>
                            </div>

                            <div>
                              <span className="text-xs text-slate-500 dark:text-slate-400">
                                {t('appointmentPage.chamberNumber')}
                              </span>
                              <p className="font-bold text-slate-900 dark:text-white mt-0.5">
                                {searchedAppointment.estimatedOpdChamber}
                              </p>
                            </div>
                          </div>

                          {/* Advisory Box */}
                          <div className="p-4 rounded-xl bg-medical-50/80 dark:bg-medical-950/40 border border-medical-200/60 dark:border-medical-800/40 text-xs sm:text-sm text-medical-950 dark:text-medical-200 flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-medical-600 dark:text-medical-400 shrink-0 mt-0.5" />
                            <p>
                              {language === 'hi'
                                ? searchedAppointment.hindiConfirmationNotice
                                : searchedAppointment.confirmationNotice}
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-wrap items-center gap-3 pt-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={handlePrintSlip}
                              leftIcon={<Printer className="w-4 h-4" />}
                            >
                              {language === 'hi' ? 'पर्ची प्रिंट करें' : 'Print Slip'}
                            </Button>
                            <a
                              href={`https://wa.me/${HOSPITAL_INFO.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
                                `Hello Janhit Hospital, please assist regarding my appointment reference: ${searchedAppointment.referenceNumber}`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                            >
                              <Share2 className="w-3.5 h-3.5" />
                              <span>{language === 'hi' ? 'व्हाट्सएप पर सहायता' : 'WhatsApp OPD Desk'}</span>
                            </a>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8 px-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/40">
                          <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
                          <h4 className="font-bold text-slate-900 dark:text-white text-base">
                            {t('appointmentPage.trackNotFoundTitle')}
                          </h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1">
                            {t('appointmentPage.trackNotFoundDesc')}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </Card>

                {/* Recent Bookings stored locally */}
                {recentBookings.length > 0 && (
                  <Card className="p-6 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08]">
                    <h3 className="font-bold text-base text-navy-950 dark:text-white mb-4">
                      {t('appointmentPage.recentBookingsTitle')}
                    </h3>
                    <div className="space-y-3">
                      {recentBookings.map((item) => (
                        <div
                          key={item.referenceNumber}
                          className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200/70 dark:border-white/[0.06] hover:border-medical-500 transition-colors"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-medical-600 dark:text-medical-400">
                                {item.referenceNumber}
                              </span>
                              <Badge variant="default" className="text-[10px] py-0 px-2">
                                {item.status}
                              </Badge>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                              {language === 'hi' ? item.data.hindiDoctorName : item.data.doctorName} •{' '}
                              {item.data.appointmentDate}
                            </p>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setTrackRefInput(item.referenceNumber);
                              handleSearchTrack(item.referenceNumber);
                            }}
                          >
                            {t('appointmentPage.viewDetails')}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            )}

            {/* TAB 3: GENERAL ENQUIRY */}
            {activeTab === 'enquiry' && (
              <Card className="p-6 sm:p-8 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08] shadow-sm">
                <div className="max-w-xl">
                  <h2 className="text-xl sm:text-2xl font-bold text-navy-950 dark:text-white">
                    {t('appointmentPage.enquiryTitle')}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">
                    {t('appointmentPage.enquirySubtitle')}
                  </p>
                </div>

                {enquirySuccess ? (
                  <div className="mt-8 p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-center space-y-4">
                    <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-emerald-900 dark:text-emerald-100">
                        {t('appointmentPage.enquirySuccessTitle')}
                      </h4>
                      <p className="text-sm text-emerald-800 dark:text-emerald-300 mt-1 max-w-md mx-auto">
                        {t('appointmentPage.enquirySuccessDesc').replace('{id}', enquirySuccess.enquiryId)}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setEnquirySuccess(null)}
                      className="mt-2"
                    >
                      {t('appointmentPage.enquiryNewBtn')}
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleEnquirySubmit} className="mt-6 space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          {t('appointmentPage.enquiryFullName')}{' '}
                          <span className="text-emergency-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            value={enquiryForm.fullName}
                            onChange={(e) =>
                              setEnquiryForm({ ...enquiryForm, fullName: e.target.value })
                            }
                            placeholder={t('appointmentPage.enquiryFullNamePlaceholder')}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-navy-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-medical-500"
                          />
                        </div>
                        {enquiryErrors.fullName && (
                          <p className="text-xs text-emergency-500 mt-1">{enquiryErrors.fullName}</p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          {t('appointmentPage.enquiryPhone')}{' '}
                          <span className="text-emergency-500">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="tel"
                            value={enquiryForm.phone}
                            onChange={(e) =>
                              setEnquiryForm({ ...enquiryForm, phone: e.target.value })
                            }
                            placeholder={t('appointmentPage.enquiryPhonePlaceholder')}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-navy-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-medical-500"
                            maxLength={10}
                          />
                        </div>
                        {enquiryErrors.phone && (
                          <p className="text-xs text-emergency-500 mt-1">{enquiryErrors.phone}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          {t('appointmentPage.enquiryEmail')}
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="email"
                            value={enquiryForm.email}
                            onChange={(e) =>
                              setEnquiryForm({ ...enquiryForm, email: e.target.value })
                            }
                            placeholder={t('appointmentPage.enquiryEmailPlaceholder')}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-navy-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-medical-500"
                          />
                        </div>
                        {enquiryErrors.email && (
                          <p className="text-xs text-emergency-500 mt-1">{enquiryErrors.email}</p>
                        )}
                      </div>

                      {/* Department Subject */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          {t('appointmentPage.enquiryDept')}
                        </label>
                        <select
                          value={enquiryForm.department}
                          onChange={(e) =>
                            setEnquiryForm({ ...enquiryForm, department: e.target.value })
                          }
                          className="w-full px-3 py-2.5 bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-navy-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-medical-500"
                        >
                          <option value="">{t('appointmentPage.enquiryDeptPlaceholder')}</option>
                          {DEPARTMENTS_DATA.map((dept) => (
                            <option key={dept.id} value={dept.id}>
                              {language === 'hi' ? dept.hindiName : dept.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message Area */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        {t('appointmentPage.enquiryMessage')}{' '}
                        <span className="text-emergency-500">*</span>
                      </label>
                      <textarea
                        rows={4}
                        value={enquiryForm.message}
                        onChange={(e) =>
                          setEnquiryForm({ ...enquiryForm, message: e.target.value })
                        }
                        placeholder={t('appointmentPage.enquiryMessagePlaceholder')}
                        className="w-full p-3.5 bg-slate-50 dark:bg-navy-950 border border-slate-300 dark:border-navy-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-medical-500"
                      />
                      {enquiryErrors.message && (
                        <p className="text-xs text-emergency-500 mt-1">{enquiryErrors.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="md"
                      disabled={isSubmittingEnquiry}
                      leftIcon={<Send className="w-4 h-4" />}
                      className="px-8"
                    >
                      {isSubmittingEnquiry
                        ? t('appointmentPage.enquirySubmitting')
                        : t('appointmentPage.enquirySubmitBtn')}
                    </Button>
                  </form>
                )}
              </Card>
            )}
          </motion.div>

          {/* Right Support Sidebar (4 Cols on Desktop - Slide In Right) */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="lg:col-span-4 space-y-6"
          >
            {/* 1. WhatsApp Instant Helpdesk */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-700/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <Share2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-base leading-tight">
                    {language === 'hi' ? 'व्हाट्सएप ओपीडी डेस्क' : 'WhatsApp OPD Desk'}
                  </h4>
                  <p className="text-xs text-emerald-100 mt-0.5">
                    {language === 'hi' ? 'तुरंत सहायता एवं अपॉइंटमेंट' : 'Instant appointment assistance'}
                  </p>
                </div>
              </div>
              <p className="text-xs text-emerald-50 mt-3 leading-relaxed">
                {t('appointmentPage.whatsappFollowup')}
              </p>
              <a
                href={`https://wa.me/${HOSPITAL_INFO.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
                  language === 'hi'
                    ? 'नमस्ते जनहित हॉस्पिटल, मुझे डॉक्टर परामर्श अपॉइंटमेंट हेतु जानकारी चाहिए।'
                    : 'Hello Janhit Hospital, I would like assistance with OPD appointment booking.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white text-emerald-800 font-bold text-xs hover:bg-emerald-50 transition-colors shadow-sm"
              >
                <span>{language === 'hi' ? 'व्हाट्सएप चैट शुरू करें' : 'Chat on WhatsApp'}</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            {/* 2. Patient Guidelines Card */}
            <Card className="p-5 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08]">
              <div className="flex items-center gap-2 text-medical-600 dark:text-medical-400 font-bold text-sm mb-3">
                <ShieldCheck className="w-4 h-4" />
                <span>{t('appointmentPage.guidelinesTitle')}</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-medical-500 mt-1.5 shrink-0" />
                  <span>{t('appointmentPage.guideline1')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-medical-500 mt-1.5 shrink-0" />
                  <span>{t('appointmentPage.guideline2')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-medical-500 mt-1.5 shrink-0" />
                  <span>{t('appointmentPage.guideline3')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-medical-500 mt-1.5 shrink-0" />
                  <span>{t('appointmentPage.guideline4')}</span>
                </li>
              </ul>
            </Card>

            {/* 3. Cashless & Ayushman Bharat Empanelled Card */}
            <Card className="p-5 bg-white dark:bg-navy-900 border-slate-200 dark:border-white/[0.08]">
              <div className="flex items-center gap-2 text-navy-950 dark:text-white font-bold text-sm mb-2">
                <CreditCard className="w-4 h-4 text-accent-600" />
                <span>{t('appointmentPage.cashlessHelpdesk')}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {t('appointmentPage.cashlessDesc')}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <Badge variant="accent" className="text-[10px] py-0.5 px-2">
                  Ayushman PM-JAY
                </Badge>
                <Badge variant="default" className="text-[10px] py-0.5 px-2">
                  Star Health
                </Badge>
                <Badge variant="default" className="text-[10px] py-0.5 px-2">
                  HDFC ERGO
                </Badge>
                <Badge variant="default" className="text-[10px] py-0.5 px-2">
                  Medi Assist TPA
                </Badge>
              </div>
            </Card>

            {/* 4. Phone Assistance Hotline Card */}
            <div className="p-5 rounded-2xl bg-slate-100/80 dark:bg-navy-950/80 border border-slate-200/80 dark:border-white/[0.06] flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {t('appointmentPage.helplineSupport')}
                </span>
                <p className="font-mono font-bold text-sm text-navy-950 dark:text-white mt-0.5">
                  {HOSPITAL_INFO.generalInquiryPhone}
                </p>
              </div>
              <a
                href={`tel:${HOSPITAL_INFO.generalInquiryPhone.replace(/\D/g, '')}`}
                className="p-2.5 rounded-xl bg-medical-600 text-white hover:bg-medical-700 transition-colors"
                title="Call Hospital Helpline"
              >
                <PhoneCall className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
export default AppointmentPage;