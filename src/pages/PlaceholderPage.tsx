import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { Breadcrumb } from '../components/ui/Breadcrumb';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Clock, ShieldCheck, CalendarCheck, PhoneCall } from 'lucide-react';
import { Link, useOutletContext } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { HOSPITAL_INFO } from '../utils/constants';
import { slideInLeft, slideInRight, viewportStandard } from '../utils/animations';

interface PlaceholderPageProps {
  title: string;
  hindiTitle?: string;
  subtitle: string;
  hindiSubtitle?: string;
  phaseScheduled: string;
  badgeText?: string;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  title,
  hindiTitle,
  subtitle,
  hindiSubtitle,
  phaseScheduled,
  badgeText = 'Architecture Verified',
}) => {
  const { language, t } = useLanguage();
  const context = useOutletContext<{ openAppointmentModal?: () => void }>();

  const displayTitle = language === 'hi' && hindiTitle ? hindiTitle : title;
  const displaySubtitle = language === 'hi' && hindiSubtitle ? hindiSubtitle : subtitle;

  return (
    <div className="py-10 sm:py-16">
      <Container size="xl">
        {/* Dynamic Breadcrumbs */}
        <Breadcrumb
          items={[
            { label: language === 'hi' ? 'होम' : 'Home', path: '/' },
            { label: displayTitle },
          ]}
          className="mb-8"
        />

        <div className="bg-white dark:bg-dark-surface rounded-3xl border border-slate-200/80 dark:border-dark-border p-6 sm:p-12 shadow-soft">
          <SectionHeading
            badge={badgeText}
            badgeVariant="medical"
            title={displayTitle}
            subtitle={displaySubtitle}
          />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left box: Milestone status (Slide In Left) */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewportStandard}
              className="md:col-span-7 p-6 rounded-2xl bg-slate-50 dark:bg-dark-card border border-slate-200/80 dark:border-dark-border/80 space-y-4"
            >
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="accent" showDot>
                  {language === 'hi' ? 'विकास चरण' : 'Phase Milestone'}
                </Badge>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {phaseScheduled}
                </span>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {language === 'hi'
                  ? 'इस मॉड्यूल के लिए नेविगेशन, ड्रॉपडाउन रूट्स, वैश्विक लेआउट, द्विभाषी डिक्शनरी और यूआई टोकन्स पूरी तरह तैयार हैं। निर्धारित चरण में इसमें विस्तृत जानकारी जोड़ी जाएगी।'
                  : 'Navigation links, routes, dropdown hierarchies, responsive layouts, bilingual typography and UI tokens are fully wired for this module.'}
              </p>

              <div className="flex items-center gap-4 pt-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-medical-600 dark:text-medical-400" />
                  {language === 'hi' ? 'अगला कार्यान्वयन चरण' : 'Next Implementation Phase'}
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                  {language === 'hi' ? 'वैश्विक लेआउट सक्रिय' : 'Global Layout Active'}
                </span>
              </div>
            </motion.div>

            {/* Right box: Quick actions (Slide In Right) */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={viewportStandard}
              className="md:col-span-5 p-6 rounded-2xl bg-medical-50/60 dark:bg-medical-950/30 border border-medical-200/60 dark:border-medical-900/40 space-y-3.5"
            >
              <h4 className="text-sm font-bold text-navy-950 dark:text-white">
                {language === 'hi' ? 'मरीज त्वरित सहायता' : 'Quick Patient Assistance'}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {language === 'hi'
                  ? 'तत्काल डॉक्टर परामर्श या इमरजेंसी सहायता के लिए नीचे दिए गए बटन का उपयोग करें:'
                  : 'For immediate doctor consultation scheduling or emergency assistance, use the direct buttons below:'}
              </p>

              <div className="space-y-2 pt-1">
                <Button
                  variant="primary"
                  size="sm"
                  fullWidth
                  leftIcon={<CalendarCheck className="w-4 h-4" />}
                  onClick={() => context?.openAppointmentModal?.()}
                >
                  {t('common.bookAppointment')}
                </Button>

                <a
                  href={`tel:${HOSPITAL_INFO.emergencyPhone.replace(/-/g, '')}`}
                  className="block"
                >
                  <Button
                    variant="emergency"
                    size="sm"
                    fullWidth
                    leftIcon={<PhoneCall className="w-4 h-4" />}
                  >
                    {t('common.emergency247')}
                  </Button>
                </a>
              </div>
            </motion.div>

          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-dark-border/60 flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                {t('common.back')}
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};
