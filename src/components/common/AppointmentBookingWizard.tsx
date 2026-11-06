import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  CheckCircle2,
  AlertCircle,
  Building2,
  Stethoscope,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  Printer,
  ShieldCheck,
  Send,
  CalendarCheck,
  Share2,
} from 'lucide-react';
import {
  appointmentService,
  AppointmentRequest,
  AppointmentResponse,
  AppointmentSlot,
} from '../../services/appointmentService';
import { ALL_DOCTORS, DEPARTMENTS_DATA } from '../../data/hospitalData';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { AppointmentSlotSkeleton } from '../ui/Skeletons';
import { HOSPITAL_INFO } from '../../utils/constants';

interface AppointmentBookingWizardProps {
  initialDoctorId?: string;
  initialDepartmentId?: string;
  onSuccess?: (response: AppointmentResponse) => void;
  className?: string;
  isCompactModal?: boolean;
}

export const AppointmentBookingWizard: React.FC<AppointmentBookingWizardProps> = ({
  initialDoctorId,
  initialDepartmentId,
  onSuccess,
  className = '',
  isCompactModal = false,
}) => {
  const { language, t } = useLanguage();
  const isHindi = language === 'hi';

  // Step state: 1 to 5
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form Fields
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string>(
    initialDepartmentId || ''
  );
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(
    initialDoctorId || ''
  );
  const [appointmentDate, setAppointmentDate] = useState<string>(() => {
    // Default to tomorrow or next valid day
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (tomorrow.getDay() === 0) tomorrow.setDate(tomorrow.getDate() + 1); // Skip Sunday
    return tomorrow.toISOString().split('T')[0];
  });
  const [preferredSlot, setPreferredSlot] = useState<AppointmentSlot | null>(null);
  const [availableSlots, setAvailableSlots] = useState<AppointmentSlot[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState<boolean>(false);

  // Patient Info Fields
  const [patientName, setPatientName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other' | ''>('male');
  const [reasonForVisit, setReasonForVisit] = useState('');
  const [hasInsurance, setHasInsurance] = useState(false);
  const [patientConsent, setPatientConsent] = useState(true);

  // Validation Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<AppointmentResponse | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  // Derived entities
  const selectedDepartment = useMemo(
    () => DEPARTMENTS_DATA.find((d) => d.id === selectedDepartmentId),
    [selectedDepartmentId]
  );

  const availableDoctors = useMemo(() => {
    if (!selectedDepartmentId) return ALL_DOCTORS;
    return ALL_DOCTORS.filter((d) => d.departmentId === selectedDepartmentId);
  }, [selectedDepartmentId]);

  const selectedDoctor = useMemo(
    () => ALL_DOCTORS.find((d) => d.id === selectedDoctorId),
    [selectedDoctorId]
  );

  // Auto-sync department when doctor changes
  useEffect(() => {
    if (selectedDoctor && selectedDoctor.departmentId !== selectedDepartmentId) {
      setSelectedDepartmentId(selectedDoctor.departmentId);
    }
  }, [selectedDoctor, selectedDepartmentId]);

  // Load time slots when doctor or date changes
  useEffect(() => {
    if (selectedDoctorId && appointmentDate) {
      setIsLoadingSlots(true);
      appointmentService
        .getAvailableTimeSlots(selectedDoctorId, appointmentDate)
        .then((slots) => {
          setAvailableSlots(slots);
          setIsLoadingSlots(false);
          // If previous preferredSlot is in new slots and available, keep it, else reset
          if (preferredSlot) {
            const stillValid = slots.find(
              (s) => s.id === preferredSlot.id && s.isAvailable
            );
            if (!stillValid) setPreferredSlot(null);
          }
        });
    }
  }, [selectedDoctorId, appointmentDate]);

  // Validation functions
  const validateStep = (stepNumber: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (stepNumber === 1) {
      if (!selectedDepartmentId) {
        newErrors.department = isHindi
          ? 'कृपया चिकित्सा विभाग चुनें'
          : 'Please select a medical department';
      }
      if (!selectedDoctorId) {
        newErrors.doctor = isHindi
          ? 'कृपया विशेषज्ञ डॉक्टर चुनें'
          : 'Please select a specialist doctor';
      }
    }

    if (stepNumber === 2) {
      if (!appointmentDate) {
        newErrors.date = isHindi ? 'कृपया तारीख चुनें' : 'Please select an appointment date';
      } else {
        const d = new Date(appointmentDate);
        if (d.getDay() === 0) {
          newErrors.date = isHindi
            ? 'रविवार को नियमित ओपीडी बंद रहती है। कृपया अन्य दिन चुनें।'
            : 'Routine OPD is closed on Sundays. Please pick another day.';
        }
      }
      if (!preferredSlot) {
        newErrors.slot = isHindi
          ? 'कृपया परामर्श का समय स्लॉट चुनें'
          : 'Please select an available consultation slot';
      }
    }

    if (stepNumber === 3) {
      if (!patientName.trim() || patientName.trim().length < 3) {
        newErrors.name = isHindi
          ? 'कृपया पूरा नाम दर्ज करें (कम से कम 3 अक्षर)'
          : 'Please enter patient full name (min 3 characters)';
      }

      // Mobile validation: 10 digits
      const cleanedPhone = mobileNumber.replace(/\D/g, '');
      const validPhone = /^[6-9]\d{9}$/.test(cleanedPhone.slice(-10));
      if (!validPhone) {
        newErrors.mobile = isHindi
          ? 'कृपया वैध 10 अंकों का मोबाइल नंबर दर्ज करें'
          : 'Please enter a valid 10-digit mobile number';
      }

      // Email validation if entered
      if (email.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
          newErrors.email = isHindi
            ? 'कृपया वैध ईमेल पता दर्ज करें'
            : 'Please enter a valid email address';
        }
      }

      // Age validation
      const ageNum = parseInt(age, 10);
      if (!age || isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
        newErrors.age = isHindi ? 'कृपया वैध उम्र दर्ज करें (1 - 120)' : 'Please enter valid age (1-120)';
      }
    }

    if (stepNumber === 4) {
      if (!patientConsent) {
        newErrors.consent = isHindi
          ? 'कृपया नियम एवं शर्तों की सहमति स्वीकार करें'
          : 'Please accept the consent terms to proceed';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmitRequest = async () => {
    if (!validateStep(4)) return;

    if (!selectedDepartment || !selectedDoctor || !preferredSlot) return;

    setIsSubmitting(true);
    setErrors({});

    const requestPayload: AppointmentRequest = {
      departmentId: selectedDepartment.id,
      departmentName: selectedDepartment.name,
      hindiDepartmentName: selectedDepartment.hindiName,
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      hindiDoctorName: selectedDoctor.hindiName,
      appointmentDate,
      preferredTime: preferredSlot.time,
      hindiPreferredTime: preferredSlot.hindiTime,
      patientName: patientName.trim(),
      mobileNumber: mobileNumber.trim(),
      email: email.trim() || undefined,
      age: age.trim(),
      gender,
      reasonForVisit: reasonForVisit.trim() || undefined,
      hasInsurance,
    };

    try {
      const response = await appointmentService.submitAppointmentRequest(requestPayload);
      setSubmissionResult(response);
      setCurrentStep(5);
      onSuccess?.(response);
    } catch {
      setErrors({
        submit: isHindi
          ? 'अनुरोध दर्ज करने में त्रुटि हुई। कृपया पुनः प्रयास करें अथवा हेल्पलाइन पर कॉल करें।'
          : 'Failed to record appointment request. Please retry or call our direct helpline.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyReference = () => {
    if (submissionResult?.referenceNumber) {
      navigator.clipboard.writeText(submissionResult.referenceNumber);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const minDateString = useMemo(() => {
    return new Date().toISOString().split('T')[0];
  }, []);

  const maxDateString = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split('T')[0];
  }, []);

  // Format display date
  const displayFormattedDate = useMemo(() => {
    if (!appointmentDate) return '';
    const dateObj = new Date(appointmentDate);
    return dateObj.toLocaleDateString(isHindi ? 'hi-IN' : 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, [appointmentDate, isHindi]);

  return (
    <div className={`bg-white dark:bg-dark-surface rounded-3xl border border-slate-200/80 dark:border-dark-border shadow-card overflow-hidden ${className}`}>
      {/* ========================================================================= */}
      {/* WIZARD STEP HEADER / PROGRESS INDICATOR (Steps 1 to 4)                    */}
      {/* ========================================================================= */}
      {currentStep < 5 && (
        <div className="p-6 pb-4 border-b border-slate-100 dark:border-dark-border/60 bg-slate-50/70 dark:bg-dark-card/50">
          <div className="flex items-center justify-between gap-2 max-w-xl mx-auto">
            {[
              { num: 1, label: isHindi ? 'डॉक्टर' : 'Doctor' },
              { num: 2, label: isHindi ? 'तारीख व समय' : 'Date & Slot' },
              { num: 3, label: isHindi ? 'मरीज विवरण' : 'Patient' },
              { num: 4, label: isHindi ? 'समीक्षा' : 'Review' },
            ].map((step, idx) => {
              const isActive = currentStep === step.num;
              const isDone = currentStep > step.num;

              return (
                <div key={idx} className="flex-1 flex flex-col items-center relative">
                  <div className="flex items-center w-full">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all mx-auto z-10 ${
                        isDone
                          ? 'bg-teal-600 text-white'
                          : isActive
                          ? 'bg-medical-600 text-white ring-4 ring-medical-500/20'
                          : 'bg-slate-200 dark:bg-dark-border text-slate-500'
                      }`}
                    >
                      {isDone ? <Check className="w-4 h-4" /> : step.num}
                    </div>
                  </div>
                  <span
                    className={`text-[11px] font-semibold mt-1.5 transition-colors hidden sm:inline ${
                      isActive
                        ? 'text-medical-600 dark:text-medical-400'
                        : isDone
                        ? 'text-teal-700 dark:text-teal-400'
                        : 'text-slate-400'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* WIZARD BODY                                                               */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8">
        {/* ======================================================================= */}
        {/* STEP 1: SELECT DEPARTMENT & DOCTOR                                      */}
        {/* ======================================================================= */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-navy-950 dark:text-white flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-medical-600" />
                <span>{isHindi ? '1. चिकित्सा विभाग एवं डॉक्टर का चयन' : '1. Select Department & Doctor'}</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-sans">
                {isHindi
                  ? 'अपनी स्वास्थ्य समस्या अनुसार उपयुक्त विभाग और संबंधित विशेषज्ञ का चयन करें।'
                  : 'Choose the appropriate clinical department and senior faculty for consultation.'}
              </p>
            </div>

            {/* Department Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                {isHindi ? 'चिकित्सा विभाग *' : 'Medical Department *'}
              </label>
              <div className="relative">
                <select
                  value={selectedDepartmentId}
                  onChange={(e) => {
                    setSelectedDepartmentId(e.target.value);
                    setSelectedDoctorId(''); // Reset doctor when dept changes
                  }}
                  className="w-full py-3 pl-10 pr-4 text-xs sm:text-sm bg-slate-50 dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-medical-500/20"
                >
                  <option value="">{isHindi ? '-- विभाग चुनें --' : '-- Choose Department --'}</option>
                  {DEPARTMENTS_DATA.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {isHindi ? dept.hindiName : dept.name}
                    </option>
                  ))}
                </select>
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              {errors.department && (
                <p className="text-xs text-rose-500 mt-1 flex items-center gap-1 font-sans">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.department}</span>
                </p>
              )}
            </div>

            {/* Doctor Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                {isHindi ? 'विशेषज्ञ डॉक्टर *' : 'Specialist Doctor *'}
              </label>
              <div className="relative">
                <select
                  value={selectedDoctorId}
                  onChange={(e) => setSelectedDoctorId(e.target.value)}
                  disabled={!selectedDepartmentId}
                  className="w-full py-3 pl-10 pr-4 text-xs sm:text-sm bg-slate-50 dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-medical-500/20 disabled:opacity-50"
                >
                  <option value="">
                    {!selectedDepartmentId
                      ? isHindi
                        ? '-- पहले विभाग चुनें --'
                        : '-- First Choose Department --'
                      : isHindi
                      ? '-- डॉक्टर चुनें --'
                      : '-- Choose Doctor --'}
                  </option>
                  {availableDoctors.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {isHindi ? doc.hindiName : doc.name} ({doc.qualifications})
                    </option>
                  ))}
                </select>
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              {errors.doctor && (
                <p className="text-xs text-rose-500 mt-1 flex items-center gap-1 font-sans">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.doctor}</span>
                </p>
              )}
            </div>

            {/* Selected Doctor Preview Snapshot */}
            {selectedDoctor && (
              <div className="p-4 rounded-2xl bg-medical-50/60 dark:bg-dark-card border border-medical-100 dark:border-dark-border flex items-start gap-4">
                <img
                  src={selectedDoctor.image}
                  alt={selectedDoctor.name}
                  className="w-16 h-16 rounded-xl object-cover object-top shrink-0 border-2 border-white dark:border-dark-border"
                />
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-bold text-sm text-navy-950 dark:text-white">
                      {isHindi ? selectedDoctor.hindiName : selectedDoctor.name}
                    </span>
                    <Badge variant="medical" size="sm">
                      {isHindi ? selectedDoctor.hindiExperience : selectedDoctor.experience}
                    </Badge>
                  </div>
                  <p className="text-medical-700 dark:text-medical-400 font-semibold">
                    {isHindi ? selectedDoctor.hindiSpecialization : selectedDoctor.specialization}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
                    {selectedDoctor.qualifications}
                  </p>
                  <div className="pt-1 flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{isHindi ? selectedDoctor.hindiOpdTimings : selectedDoctor.opdTimings}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================================================================= */}
        {/* STEP 2: SELECT DATE & TIME SLOT                                         */}
        {/* ======================================================================= */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-navy-950 dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-medical-600" />
                <span>{isHindi ? '2. परामर्श तारीख एवं समय स्लॉट का चयन' : '2. Select Appointment Date & Time Slot'}</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-sans">
                {isHindi
                  ? 'अपनी सुविधा अनुसार आगामी 30 दिनों में से किसी भी कार्य दिवस का समय चुनें।'
                  : 'Select your preferred working day and consultation slot over the next 30 days.'}
              </p>
            </div>

            {/* Date Picker */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                {isHindi ? 'परामर्श तारीख *' : 'Consultation Date *'}
              </label>
              <input
                type="date"
                min={minDateString}
                max={maxDateString}
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                className="w-full py-3 px-4 text-xs sm:text-sm bg-slate-50 dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-medical-500/20"
              />
              {appointmentDate && (
                <p className="text-xs font-semibold text-teal-700 dark:text-teal-400 mt-1.5 font-sans">
                  {displayFormattedDate}
                </p>
              )}
              {errors.date && (
                <p className="text-xs text-rose-500 mt-1 flex items-center gap-1 font-sans">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.date}</span>
                </p>
              )}
            </div>

            {/* Time Slots Grid */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                {isHindi ? 'उपलब्ध ओपीडी समय स्लॉट *' : 'Available OPD Time Slots *'}
              </label>

              {isLoadingSlots ? (
                <div className="py-4">
                  <AppointmentSlotSkeleton />
                </div>
              ) : availableSlots.length > 0 ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {availableSlots.map((slot) => {
                      const isSelected = preferredSlot?.id === slot.id;
                      return (
                        <button
                          key={slot.id}
                          type="button"
                          disabled={!slot.isAvailable}
                          onClick={() => setPreferredSlot(slot)}
                          className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-left flex items-center justify-between ${
                            isSelected
                              ? 'bg-medical-600 text-white border-medical-600 shadow-sm'
                              : slot.isAvailable
                              ? 'bg-slate-50 dark:bg-dark-card text-slate-800 dark:text-slate-200 border-slate-200 dark:border-dark-border hover:border-medical-400'
                              : 'opacity-40 bg-slate-100 dark:bg-dark-card text-slate-400 border-dashed cursor-not-allowed'
                          }`}
                        >
                          <span>{isHindi ? slot.hindiTime : slot.time}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                  {errors.slot && (
                    <p className="text-xs text-rose-500 mt-1 flex items-center gap-1 font-sans">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.slot}</span>
                    </p>
                  )}
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 text-xs text-amber-800 dark:text-amber-300 font-sans">
                  {isHindi
                    ? 'चयनित तारीख पर कोई ओपीडी स्लॉट उपलब्ध नहीं है। कृपया अन्य तारीख चुनें।'
                    : 'No OPD consultation slots available on selected date. Please pick another working date.'}
                </div>
              )}
            </div>

            {/* Scheduling Reality Disclosure */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-dark-card border border-slate-200 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-2 font-sans">
              <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span>
                {isHindi
                  ? 'सूचना: यह एक आधिकारिक अपॉइंटमेंट अनुरोध है। हमारा अस्पताल ओपीडी डेस्क 15 मिनट के भीतर आपके नंबर पर संपर्क करके टोकन नंबर की पुष्टि करेगा।'
                  : 'Notice: This registers an appointment request. Our hospital coordination desk will contact you via phone/SMS within 15 minutes to confirm your final token.'}
              </span>
            </div>
          </div>
        )}

        {/* ======================================================================= */}
        {/* STEP 3: PATIENT INFORMATION FORM                                        */}
        {/* ======================================================================= */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-navy-950 dark:text-white flex items-center gap-2">
                <User className="w-5 h-5 text-medical-600" />
                <span>{isHindi ? '3. मरीज विवरण दर्ज करें' : '3. Enter Patient Information'}</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-sans">
                {isHindi
                  ? 'अस्पताल रिकॉर्ड्स एवं ओपीडी पर्ची तैयार करने हेतु आवश्यक विवरण भरें।'
                  : 'Please enter patient details required for OPD registration and clinical records.'}
              </p>
            </div>

            {/* Patient Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {isHindi ? 'मरीज का पूरा नाम *' : 'Patient Full Name *'}
              </label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder={isHindi ? 'उदा. राजेश कुमार शर्मा' : 'e.g. Ramesh Kumar'}
                className="w-full py-2.5 px-3.5 text-xs sm:text-sm bg-slate-50 dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-medical-500/20"
              />
              {errors.name && (
                <p className="text-xs text-rose-500 mt-1 flex items-center gap-1 font-sans">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>

            {/* Mobile & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isHindi ? 'मोबाइल नंबर *' : 'Mobile Number *'}
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder={isHindi ? '10 अंकों का मोबाइल नंबर' : '10-digit mobile number'}
                    maxLength={13}
                    className="w-full py-2.5 pl-10 pr-3.5 text-xs sm:text-sm bg-slate-50 dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-medical-500/20"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
                {errors.mobile && (
                  <p className="text-xs text-rose-500 mt-1 flex items-center gap-1 font-sans">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.mobile}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isHindi ? 'ईमेल पता (वैकल्पिक)' : 'Email Address (Optional)'}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="patient@example.com"
                    className="w-full py-2.5 pl-10 pr-3.5 text-xs sm:text-sm bg-slate-50 dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-medical-500/20"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
                {errors.email && (
                  <p className="text-xs text-rose-500 mt-1 flex items-center gap-1 font-sans">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Age & Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isHindi ? 'उम्र (वर्ष) *' : 'Age (Years) *'}
                </label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder={isHindi ? 'उदा. 45' : 'e.g. 45'}
                  className="w-full py-2.5 px-3.5 text-xs sm:text-sm bg-slate-50 dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-medical-500/20"
                />
                {errors.age && (
                  <p className="text-xs text-rose-500 mt-1 flex items-center gap-1 font-sans">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.age}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {isHindi ? 'लिंग (Gender)' : 'Gender'}
                </label>
                <div className="flex items-center gap-2 pt-1">
                  {[
                    { val: 'male', label: isHindi ? 'पुरुष' : 'Male' },
                    { val: 'female', label: isHindi ? 'महिला' : 'Female' },
                    { val: 'other', label: isHindi ? 'अन्य' : 'Other' },
                  ].map((g) => (
                    <button
                      key={g.val}
                      type="button"
                      onClick={() => setGender(g.val as 'male' | 'female' | 'other')}
                      className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                        gender === g.val
                          ? 'bg-medical-600 text-white border-medical-600'
                          : 'bg-slate-50 dark:bg-dark-card text-slate-700 dark:text-slate-300 border-slate-200 dark:border-dark-border'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Reason for Appointment (Optional) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {isHindi ? 'परामर्श का मुख्य कारण / लक्षण (वैकल्पिक)' : 'Reason for Consultation / Symptoms (Optional)'}
              </label>
              <textarea
                value={reasonForVisit}
                onChange={(e) => setReasonForVisit(e.target.value)}
                rows={2}
                placeholder={
                  isHindi
                    ? 'उदा. सीने में दर्द, ब्लड प्रेशर जांच, पूर्व रिपोर्ट का परीक्षण...'
                    : 'e.g. routine checkup, knee pain, second opinion...'
                }
                className="w-full py-2.5 px-3.5 text-xs sm:text-sm bg-slate-50 dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-medical-500/20"
              />
            </div>

            {/* Insurance Cardholder Toggle */}
            <div className="pt-1">
              <label className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasInsurance}
                  onChange={(e) => setHasInsurance(e.target.checked)}
                  className="rounded border-slate-300 text-medical-600 focus:ring-medical-500 w-4 h-4"
                />
                <span className="font-semibold">
                  {isHindi
                    ? 'मेरे पास आयुष्मान भारत / स्वास्थ्य बीमा (TPA) कार्ड है'
                    : 'I have Ayushman Bharat / Health Insurance (TPA) coverage'}
                </span>
              </label>
            </div>
          </div>
        )}

        {/* ======================================================================= */}
        {/* STEP 4: REVIEW BOOKING DETAILS & SUBMIT                                 */}
        {/* ======================================================================= */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-navy-950 dark:text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-medical-600" />
                <span>{isHindi ? '4. विवरण की समीक्षा एवं अनुरोध प्रेषण' : '4. Review Booking Details & Submit'}</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-sans">
                {isHindi
                  ? 'कृपया पुष्टि से पूर्व अपने अपॉइंटमेंट विवरण की जांच कर लें।'
                  : 'Please verify all consultation details before transmitting your booking request.'}
              </p>
            </div>

            {/* Consolidated Summary Review Card */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-dark-card border border-slate-200 dark:border-dark-border space-y-3.5 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-3 border-b border-slate-200/80 dark:border-dark-border">
                <div>
                  <span className="text-[11px] text-slate-400 block font-semibold">
                    {isHindi ? 'चिकित्सा विभाग' : 'Department'}
                  </span>
                  <span className="font-bold text-navy-950 dark:text-white">
                    {isHindi ? selectedDepartment?.hindiName : selectedDepartment?.name}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block font-semibold">
                    {isHindi ? 'विशेषज्ञ डॉक्टर' : 'Doctor'}
                  </span>
                  <span className="font-bold text-navy-950 dark:text-white">
                    {isHindi ? selectedDoctor?.hindiName : selectedDoctor?.name}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-3 border-b border-slate-200/80 dark:border-dark-border">
                <div>
                  <span className="text-[11px] text-slate-400 block font-semibold">
                    {isHindi ? 'परामर्श तारीख' : 'Appointment Date'}
                  </span>
                  <span className="font-bold text-teal-700 dark:text-teal-400">
                    {displayFormattedDate}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block font-semibold">
                    {isHindi ? 'समय स्लॉट' : 'Selected Time Slot'}
                  </span>
                  <span className="font-bold text-medical-600 dark:text-medical-400">
                    {isHindi ? preferredSlot?.hindiTime : preferredSlot?.time}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <span className="text-[11px] text-slate-400 block font-semibold">
                    {isHindi ? 'मरीज का नाम' : 'Patient Name'}
                  </span>
                  <span className="font-bold text-navy-950 dark:text-white">{patientName}</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block font-semibold">
                    {isHindi ? 'मोबाइल नंबर' : 'Phone'}
                  </span>
                  <span className="font-bold text-navy-950 dark:text-white">{mobileNumber}</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block font-semibold">
                    {isHindi ? 'उम्र / लिंग' : 'Age / Gender'}
                  </span>
                  <span className="font-bold text-navy-950 dark:text-white">
                    {age} yrs, {gender || 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* Consent Checkbox */}
            <div>
              <label className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-400 cursor-pointer font-sans">
                <input
                  type="checkbox"
                  checked={patientConsent}
                  onChange={(e) => setPatientConsent(e.target.checked)}
                  className="rounded border-slate-300 text-medical-600 focus:ring-medical-500 w-4 h-4 mt-0.5"
                />
                <span>
                  {isHindi
                    ? 'मैं प्रमाणित करता/करती हूँ कि दी गई जानकारी सत्य है। मैं अस्पताल द्वारा अपॉइंटमेंट टोकन पुष्टि हेतु फोन/एसएमएस पर संपर्क किए जाने की सहमति देता/देती हूँ।'
                    : 'I verify that the information provided is correct. I consent to Janhit Hospital contacting me via phone/SMS for OPD token confirmation.'}
                </span>
              </label>
              {errors.consent && (
                <p className="text-xs text-rose-500 mt-1 flex items-center gap-1 font-sans">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.consent}</span>
                </p>
              )}
            </div>

            {errors.submit && (
              <div className="p-3.5 rounded-xl bg-rose-50 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errors.submit}</span>
              </div>
            )}
          </div>
        )}

        {/* ======================================================================= */}
        {/* STEP 5: CONFIRMATION SUCCESS VIEW                                       */}
        {/* ======================================================================= */}
        {currentStep === 5 && submissionResult && (
          <div className="py-6 flex flex-col items-center text-center space-y-6">
            <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="max-w-md">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40 px-3 py-1 rounded-full border border-teal-200">
                {isHindi ? 'अनुरोध सफलतापूर्वक दर्ज' : 'Request Successfully Recorded'}
              </span>

              <h3 className="text-2xl font-extrabold text-navy-950 dark:text-white mt-3">
                {isHindi ? 'आपका अपॉइंटमेंट अनुरोध दर्ज हो चुका है' : 'Your Appointment Request is Recorded'}
              </h3>

              {/* Reference Number Box */}
              <div className="mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-dark-card border-2 border-dashed border-medical-300 dark:border-medical-800 flex items-center justify-between gap-3 max-w-sm mx-auto">
                <div className="text-left">
                  <span className="text-[11px] text-slate-400 block font-semibold uppercase">
                    {isHindi ? 'अपॉइंटमेंट संदर्भ संख्या' : 'Booking Reference No.'}
                  </span>
                  <span className="font-mono text-xl font-extrabold text-medical-600 dark:text-medical-400 tracking-wider">
                    {submissionResult.referenceNumber}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCopyReference}
                  className="p-2 rounded-xl bg-white dark:bg-dark-surface border border-slate-200 dark:border-dark-border text-slate-600 hover:text-medical-600 transition-colors shadow-sm"
                  title="Copy Reference Number"
                >
                  {copiedRef ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-4 leading-relaxed font-sans">
                {isHindi ? submissionResult.hindiConfirmationNotice : submissionResult.confirmationNotice}
              </p>
            </div>

            {/* Quick Summary Card */}
            <div className="w-full max-w-md p-4 rounded-2xl bg-slate-50 dark:bg-dark-card border border-slate-200 dark:border-dark-border text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-500">{isHindi ? 'डॉक्टर:' : 'Doctor:'}</span>
                <span className="font-bold text-navy-950 dark:text-white">
                  {isHindi ? submissionResult.data.hindiDoctorName : submissionResult.data.doctorName}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-500">{isHindi ? 'समय स्लॉट:' : 'Scheduled Slot:'}</span>
                <span className="font-bold text-medical-600">
                  {isHindi ? submissionResult.data.hindiPreferredTime : submissionResult.data.preferredTime}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{isHindi ? 'ओपीडी कक्ष:' : 'OPD Chamber:'}</span>
                <span className="font-bold text-navy-950 dark:text-white">
                  {submissionResult.estimatedOpdChamber}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Printer className="w-3.5 h-3.5" />}
                onClick={handlePrint}
              >
                {isHindi ? 'पर्ची प्रिंट करें' : 'Print Receipt'}
              </Button>

              <a
                href={`https://wa.me/${HOSPITAL_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `Namaste Janhit Hospital, I have booked an appointment with Ref: ${submissionResult.referenceNumber} for ${submissionResult.data.patientName}.`
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                  leftIcon={<Share2 className="w-3.5 h-3.5" />}
                >
                  {isHindi ? 'व्हाट्सएप पर सहायता लें' : 'WhatsApp Support'}
                </Button>
              </a>

              <Button
                variant="primary"
                size="sm"
                leftIcon={<CalendarCheck className="w-3.5 h-3.5" />}
                onClick={() => {
                  setCurrentStep(1);
                  setSubmissionResult(null);
                  setSelectedDoctorId('');
                  setPatientName('');
                }}
              >
                {isHindi ? 'नया अपॉइंटमेंट बुक करें' : 'Book Another'}
              </Button>
            </div>
          </div>
        )}

        {/* ======================================================================= */}
        {/* WIZARD NAVIGATION FOOTER (Steps 1 to 4)                                 */}
        {/* ======================================================================= */}
        {currentStep < 5 && (
          <div className="pt-6 mt-6 border-t border-slate-100 dark:border-dark-border/60 flex items-center justify-between gap-3">
            {currentStep > 1 ? (
              <Button
                variant="outline"
                size={isCompactModal ? 'sm' : 'md'}
                leftIcon={<ArrowLeft className="w-4 h-4" />}
                onClick={handlePrevStep}
              >
                {t('common.back')}
              </Button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <Button
                variant="primary"
                size={isCompactModal ? 'sm' : 'md'}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={handleNextStep}
              >
                {isHindi ? 'आगे बढ़ें' : 'Continue'}
              </Button>
            ) : (
              <Button
                variant="primary"
                size={isCompactModal ? 'sm' : 'md'}
                isLoading={isSubmitting}
                leftIcon={<Send className="w-4 h-4" />}
                onClick={handleSubmitRequest}
              >
                {isHindi ? 'अपॉइंटमेंट अनुरोध भेजें' : 'Submit Appointment Request'}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
