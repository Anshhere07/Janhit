import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { HeartPulse, Award, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

interface InitialWebsiteLoaderProps {
  onLoadingComplete?: () => void;
  minDurationMs?: number;
  maxTimeoutMs?: number;
}

export const InitialWebsiteLoader: React.FC<InitialWebsiteLoaderProps> = ({
  onLoadingComplete,
  minDurationMs = 850,
  maxTimeoutMs = 1500,
}) => {
  const { language } = useLanguage();
  const isHindi = language === 'hi';
  const shouldReduceMotion = useReducedMotion();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    // If user prefers reduced motion, finish immediately
    if (shouldReduceMotion) {
      setIsLoading(false);
      onLoadingComplete?.();
      return;
    }

    const startTime = performance.now();
    let animationFrameId: number;

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const calculatedProgress = Math.min(100, Math.round((elapsed / minDurationMs) * 100));
      setProgress(calculatedProgress);

      if (elapsed < minDurationMs) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        setTimeout(() => {
          setIsLoading(false);
          onLoadingComplete?.();
        }, 150);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    // Hard fallback timeout ensures loader never hangs
    const fallbackTimer = setTimeout(() => {
      setProgress(100);
      setIsLoading(false);
      onLoadingComplete?.();
    }, maxTimeoutMs);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(fallbackTimer);
    };
  }, [minDurationMs, maxTimeoutMs, shouldReduceMotion, onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="initial-app-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.985 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white dark:bg-[#080E1A] text-slate-900 dark:text-white select-none transition-colors duration-300 overflow-hidden"
          role="status"
          aria-live="polite"
          aria-label={
            isHindi
              ? 'जनहित हॉस्पिटल डिजिटल हेल्थकेयर पोर्टल लोड हो रहा है'
              : 'Loading Janhit Hospital digital healthcare platform'
          }
        >
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-medical-500/10 dark:bg-medical-500/15 blur-3xl pointer-events-none" />
          <div className="absolute w-[380px] h-[380px] rounded-full bg-teal-500/10 dark:bg-teal-500/10 blur-2xl pointer-events-none" />

          {/* Center Brand Identity Container */}
          <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-md w-full">
            
            {/* Glowing Medical Emblem */}
            <div className="relative mb-6">
              {/* Pulsing ring */}
              <motion.div
                animate={shouldReduceMotion ? {} : { scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-3xl bg-medical-500/20 dark:bg-medical-400/25 blur-lg"
              />

              <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-navy-900 via-navy-850 to-medical-700 dark:from-dark-card dark:via-dark-surface dark:to-medical-900 text-white flex items-center justify-center shadow-xl border border-white/20 dark:border-medical-500/30">
                <HeartPulse className="w-10 h-10 text-teal-400 animate-pulse-soft" />
              </div>
            </div>

            {/* Hospital Name & Typography */}
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
              {isHindi ? 'जनहित हॉस्पिटल' : 'Janhit Hospital'}
            </h1>
            <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1 max-w-xs">
              {isHindi
                ? 'सुपर स्पेशलिटी हेल्थकेयर एवं रिसर्च सेन्टर'
                : 'Super Speciality Healthcare & Research Centre'}
            </p>

            {/* Accreditation Badge */}
            <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-dark-card border border-slate-200/80 dark:border-dark-border text-[11px] font-semibold text-slate-700 dark:text-slate-300 shadow-sm">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>{isHindi ? 'NABH एवं NABL प्रमाणित' : 'NABH & NABL Accredited'}</span>
            </div>

            {/* Animated ECG Pulse Waveform SVG */}
            <div className="w-48 h-8 my-5 flex items-center justify-center">
              <svg
                viewBox="0 0 160 40"
                className="w-full h-full text-medical-600 dark:text-medical-400 overflow-visible"
              >
                <motion.path
                  d="M 0 20 L 45 20 L 53 6 L 61 34 L 70 12 L 78 28 L 86 20 L 160 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={shouldReduceMotion ? {} : { pathLength: 0, opacity: 0.3 }}
                  animate={
                    shouldReduceMotion
                      ? {}
                      : {
                          pathLength: [0, 1, 1],
                          opacity: [0.4, 1, 0.4],
                          pathOffset: [0, 0, 1],
                        }
                  }
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </svg>
            </div>

            {/* Progress Bar Container */}
            <div className="w-56 sm:w-64 space-y-2">
              <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200/50 dark:border-white/[0.06]">
                <motion.div
                  className="h-full bg-gradient-to-r from-medical-600 via-teal-400 to-teal-500 rounded-full shadow-sm"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'linear' }}
                />
              </div>

              {/* Progress Percentage and Status text */}
              <div className="flex items-center justify-between text-[11px] font-medium text-slate-400">
                <span>
                  {isHindi ? 'सिस्टम प्रारंभ हो रहा है...' : 'Initializing clinical systems...'}
                </span>
                <span className="font-mono font-bold text-teal-600 dark:text-teal-400">
                  {progress}%
                </span>
              </div>
            </div>

            {/* 24/7 Life Care Assurance Notice */}
            <div className="mt-8 flex items-center gap-2 text-[11px] text-slate-400 dark:text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-500 shrink-0" />
              <span>
                {isHindi
                  ? '24/7 आपातकालीन एवं ट्रॉमा सेवा सक्रिय'
                  : '24/7 Emergency & Trauma Centre Active'}
              </span>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

