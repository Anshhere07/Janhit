import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, CalendarCheck, ArrowRight, Award, CheckCircle2, Stethoscope } from 'lucide-react';
import { Doctor } from '../../data/hospitalData';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { getResponsiveSrcSet } from '../../utils/imageUtils';

interface DoctorCardProps {
  doctor: Doctor;
  onBookAppointment?: (doctor: Doctor) => void;
  className?: string;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
  onBookAppointment,
  className = '',
}) => {
  const { language, t } = useLanguage();
  const isHindi = language === 'hi';
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const displayName = isHindi ? doctor.hindiName : doctor.name;
  const displaySpecialization = isHindi ? doctor.hindiSpecialization : doctor.specialization;
  const displayDepartment = isHindi ? doctor.hindiDepartment : doctor.department;
  const displayExperience = isHindi ? doctor.hindiExperience : doctor.experience;
  const displayOpdTimings = isHindi ? doctor.hindiOpdTimings : doctor.opdTimings;

  return (
    <Card
      variant="elevated"
      className={`group flex flex-col justify-between overflow-hidden border border-slate-200/80 dark:border-dark-border hover:border-teal-500/50 dark:hover:border-teal-500/50 hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 rounded-2xl bg-white dark:bg-dark-surface ${className}`}
    >
      <div>
        {/* Doctor Image Header with aspect-ratio preservation */}
        <div className="relative aspect-[4/3.5] bg-gradient-to-br from-medical-100/60 to-slate-200 dark:from-dark-card dark:to-navy-900 overflow-hidden">
          {/* Subtle medical placeholder underneath */}
          <div className="absolute inset-0 flex items-center justify-center text-medical-600/30 dark:text-medical-400/20">
            <Stethoscope className="w-12 h-12 stroke-[1.5]" />
          </div>

          {!imgError ? (
            <img
              src={doctor.image}
              alt={displayName}
              loading="lazy"
              decoding="async"
              srcSet={getResponsiveSrcSet(doctor.image)}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
              className={`w-full h-full object-cover object-top transition-all duration-500 ease-out group-hover:scale-105 ${
                imgLoaded ? 'opacity-100 filter-none' : 'opacity-70 blur-[1px]'
              }`}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-medical-600/10 to-teal-600/20 text-medical-700 dark:text-medical-300">
              <Stethoscope className="w-10 h-10 mb-2 opacity-60" />
              <span className="text-xs font-bold">{displayName}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent opacity-70 group-hover:opacity-60 transition-opacity" />

          {/* Floating Verified Experience Badge */}
          <div className="absolute top-3 right-3 bg-white/95 dark:bg-dark-surface/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-teal-700 dark:text-teal-400 shadow-sm border border-slate-200/50 dark:border-dark-border flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>{displayExperience}</span>
          </div>

          {/* Availability Status Badge */}
          {doctor.isAvailableToday && (
            <div className="absolute bottom-3 left-3 bg-emerald-600/95 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-200" />
              <span>{isHindi ? 'आज ओपीडी में उपलब्ध' : 'Available Today in OPD'}</span>
            </div>
          )}
        </div>

        {/* Doctor Content Body */}
        <div className="p-5 space-y-3">
          {/* Department Badge */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <Badge variant="medical" size="sm" icon={<Stethoscope className="w-3 h-3" />}>
              {displayDepartment}
            </Badge>
          </div>

          {/* Name & Specialization */}
          <div>
            <Link
              to={`/doctors/${doctor.id}`}
              className="inline-block group-hover:text-medical-600 dark:group-hover:text-medical-400 transition-colors"
            >
              <h3 className="text-lg font-bold text-navy-950 dark:text-white leading-snug">
                {displayName}
              </h3>
            </Link>
            <p className="text-xs font-semibold text-medical-600 dark:text-medical-400 mt-1 line-clamp-1">
              {displaySpecialization}
            </p>
          </div>

          {/* Official Qualifications - preserved verbatim */}
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed font-sans">
            {doctor.qualifications}
          </p>

          {/* OPD Timing summary with clock icon */}
          <div className="pt-2.5 border-t border-slate-100 dark:border-dark-border flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <Clock className="w-3.5 h-3.5 text-medical-600 dark:text-medical-400 shrink-0" />
            <span className="truncate">{displayOpdTimings}</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-5 pt-0 space-y-2.5">
        <div className="grid grid-cols-2 gap-2">
          <Link to={`/doctors/${doctor.id}`} className="w-full">
            <Button
              variant="outline"
              size="sm"
              fullWidth
              className="text-xs font-semibold"
              rightIcon={<ArrowRight className="w-3 h-3" />}
            >
              {t('doctorsPage.viewProfileBtn')}
            </Button>
          </Link>

          <Button
            variant="primary"
            size="sm"
            fullWidth
            className="text-xs font-semibold"
            leftIcon={<CalendarCheck className="w-3.5 h-3.5" />}
            onClick={() => onBookAppointment?.(doctor)}
          >
            {t('doctorsPage.bookApptBtn')}
          </Button>
        </div>
      </div>
    </Card>
  );
};
