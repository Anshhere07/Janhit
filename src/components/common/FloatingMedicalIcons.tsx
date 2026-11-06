import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Stethoscope,
  Heart,
  HeartPulse,
  Plus,
  Activity,
  Pill,
  Shield,
  Cross,
} from 'lucide-react';

interface FloatingIconItem {
  id: string;
  Icon: React.ElementType;
  className: string;
  sizeClass: string;
  style: React.CSSProperties;
  duration: number;
  delay: number;
  yRange: [number, number, number];
  rotateRange: [number, number, number];
  hideOnMobile?: boolean;
}

/**
 * ============================================================================
 * 1. HERO SECTION FLOATING MEDICAL ICONS (COMPLETELY ASYMMETRICAL & SCATTERED)
 * ============================================================================
 * - Designed specifically for the full-height 100vh Hero section
 * - Zero symmetry, zero vertical line or column pattern
 * - One icon is near the text/headline, another is far in the corner, another near CTAs
 * - Pure transparent SVGs without any container box or background
 */
const HERO_ICONS: FloatingIconItem[] = [
  {
    id: 'hero-near-headline-steth',
    Icon: Stethoscope,
    // Placed close to the main headline narrative text
    style: { top: '16%', left: '32%' },
    className: 'text-teal-500/22 dark:text-teal-400/18',
    sizeClass: 'w-10 h-10 sm:w-12 sm:h-12',
    duration: 13,
    delay: 0,
    yRange: [0, -18, 0],
    rotateRange: [0, 12, 0],
    hideOnMobile: true,
  },
  {
    id: 'hero-far-top-heart',
    Icon: Heart,
    // Far out in the top-right corner
    style: { top: '6%', right: '5%' },
    className: 'text-rose-500/22 dark:text-rose-400/18',
    sizeClass: 'w-7 h-7 sm:w-9 sm:h-9',
    duration: 11,
    delay: 1.5,
    yRange: [0, 20, 0],
    rotateRange: [0, -10, 0],
  },
  {
    id: 'hero-near-cta-pulse',
    Icon: HeartPulse,
    // Placed near the action buttons / stats text
    style: { bottom: '22%', left: '42%' },
    className: 'text-medical-600/24 dark:text-medical-400/20',
    sizeClass: 'w-8 h-8 sm:w-10 sm:h-10',
    duration: 12.5,
    delay: 0.8,
    yRange: [0, -22, 0],
    rotateRange: [0, 8, 0],
    hideOnMobile: true,
  },
  {
    id: 'hero-far-bottom-plus',
    Icon: Plus,
    // Far out in the lower-left corner
    style: { bottom: '8%', left: '4%' },
    className: 'text-teal-600/25 dark:text-teal-300/20',
    sizeClass: 'w-7 h-7 sm:w-8 sm:h-8',
    duration: 10.5,
    delay: 2.2,
    yRange: [0, 16, 0],
    rotateRange: [0, -14, 0],
  },
  {
    id: 'hero-mid-channel-pill',
    Icon: Pill,
    // Floating organically in the open channel between text and doctor card
    style: { top: '30%', right: '36%' },
    className: 'text-cyan-500/22 dark:text-cyan-400/18',
    sizeClass: 'w-7 h-7 sm:w-8 sm:h-8',
    duration: 14,
    delay: 1.2,
    yRange: [0, -16, 0],
    rotateRange: [0, 16, 0],
    hideOnMobile: true,
  },
  {
    id: 'hero-far-right-shield',
    Icon: Shield,
    // Far out below the doctor card on right margin
    style: { bottom: '12%', right: '6%' },
    className: 'text-emerald-500/22 dark:text-emerald-400/18',
    sizeClass: 'w-8 h-8 sm:w-10 sm:h-10',
    duration: 15,
    delay: 2.7,
    yRange: [0, 20, 0],
    rotateRange: [0, -8, 0],
  },
];

export const HeroFloatingMedicalIcons: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none"
    >
      {HERO_ICONS.map((item) => {
        const {
          Icon,
          id,
          className,
          sizeClass,
          style,
          duration,
          delay,
          yRange,
          rotateRange,
          hideOnMobile,
        } = item;

        return (
          <motion.div
            key={id}
            style={style}
            className={`absolute ${hideOnMobile ? 'hidden sm:block' : 'block'}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={
              shouldReduceMotion
                ? { opacity: 0.8, scale: 1 }
                : {
                    opacity: [0.6, 1, 0.6],
                    y: yRange,
                    rotate: rotateRange,
                  }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0.3 }
                : {
                    duration,
                    delay,
                    repeat: Infinity,
                    repeatType: 'mirror',
                    ease: 'easeInOut',
                  }
            }
          >
            <Icon
              className={`${sizeClass} drop-shadow-sm filter transition-opacity duration-300 ${className}`}
              strokeWidth={1.8}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

/**
 * ============================================================================
 * 2. FOOTER SECTION FLOATING MEDICAL ICONS (COMPLETELY ASYMMETRICAL & SCATTERED)
 * ============================================================================
 * - Embedded directly inside the Footer section
 * - Zero symmetry, zero line alignment
 * - One icon near the hospital brand text, another far in corner, another near quick links
 * - Pure outline SVGs with clean contrast against the dark navy footer
 */
const FOOTER_ICONS: FloatingIconItem[] = [
  {
    id: 'footer-near-brand-steth',
    Icon: Stethoscope,
    // Close to the hospital brand identity description text
    style: { top: '18%', left: '26%' },
    className: 'text-teal-400/22',
    sizeClass: 'w-9 h-9 sm:w-11 sm:h-11',
    duration: 13.5,
    delay: 0,
    yRange: [0, -18, 0],
    rotateRange: [0, 10, 0],
    hideOnMobile: true,
  },
  {
    id: 'footer-far-top-heart',
    Icon: Heart,
    // Far out in the top-right margin
    style: { top: '6%', right: '5%' },
    className: 'text-rose-400/20',
    sizeClass: 'w-7 h-7 sm:w-9 sm:h-9',
    duration: 11,
    delay: 1.8,
    yRange: [0, 18, 0],
    rotateRange: [0, -8, 0],
  },
  {
    id: 'footer-near-links-pulse',
    Icon: HeartPulse,
    // Positioned near clinical links / quick navigation
    style: { bottom: '34%', right: '38%' },
    className: 'text-cyan-400/22',
    sizeClass: 'w-8 h-8 sm:w-10 sm:h-10',
    duration: 12,
    delay: 0.6,
    yRange: [0, -20, 0],
    rotateRange: [0, 12, 0],
    hideOnMobile: true,
  },
  {
    id: 'footer-far-bottom-plus',
    Icon: Plus,
    // Far down in the lower-left corner
    style: { bottom: '8%', left: '4%' },
    className: 'text-teal-300/24',
    sizeClass: 'w-7 h-7 sm:w-8 sm:h-8',
    duration: 10.5,
    delay: 2.4,
    yRange: [0, 16, 0],
    rotateRange: [0, -14, 0],
  },
  {
    id: 'footer-far-bottom-shield',
    Icon: Shield,
    // Far down in the lower-right corner
    style: { bottom: '12%', right: '7%' },
    className: 'text-emerald-400/20',
    sizeClass: 'w-8 h-8 sm:w-9 sm:h-9',
    duration: 14.5,
    delay: 1.4,
    yRange: [0, -18, 0],
    rotateRange: [0, 8, 0],
  },
];

export const FooterFloatingMedicalIcons: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none"
    >
      {FOOTER_ICONS.map((item) => {
        const {
          Icon,
          id,
          className,
          sizeClass,
          style,
          duration,
          delay,
          yRange,
          rotateRange,
          hideOnMobile,
        } = item;

        return (
          <motion.div
            key={id}
            style={style}
            className={`absolute ${hideOnMobile ? 'hidden sm:block' : 'block'}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={
              shouldReduceMotion
                ? { opacity: 0.8, scale: 1 }
                : {
                    opacity: [0.55, 0.95, 0.55],
                    y: yRange,
                    rotate: rotateRange,
                  }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0.3 }
                : {
                    duration,
                    delay,
                    repeat: Infinity,
                    repeatType: 'mirror',
                    ease: 'easeInOut',
                  }
            }
          >
            <Icon
              className={`${sizeClass} drop-shadow-sm filter transition-opacity duration-300 ${className}`}
              strokeWidth={1.8}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

/**
 * ============================================================================
 * 3. GLOBAL BODY WATERMARK ICONS (ORGANICALLY SCATTERED ACROSS BODY CONTENT)
 * ============================================================================
 * - Exclusively placed in the mid-body page area (away from Hero and Footer)
 * - Scattered non-linearly to provide subtle medical ambiance without forming columns
 */
const BODY_WATERMARK_ICONS: FloatingIconItem[] = [
  {
    id: 'body-upper-pulse',
    Icon: HeartPulse,
    style: { top: '32%', left: '12%' },
    className: 'text-medical-600/18 dark:text-medical-400/15',
    sizeClass: 'w-8 h-8 sm:w-10 sm:h-10',
    duration: 14,
    delay: 0.5,
    yRange: [0, -22, 0],
    rotateRange: [0, 12, 0],
  },
  {
    id: 'body-mid-pill',
    Icon: Pill,
    style: { top: '48%', right: '8%' },
    className: 'text-cyan-500/18 dark:text-cyan-400/15',
    sizeClass: 'w-7 h-7 sm:w-8 sm:h-8',
    duration: 12.5,
    delay: 1.9,
    yRange: [0, 18, 0],
    rotateRange: [0, -14, 0],
    hideOnMobile: true,
  },
  {
    id: 'body-mid-activity',
    Icon: Activity,
    style: { top: '58%', left: '22%' },
    className: 'text-teal-500/18 dark:text-teal-400/15',
    sizeClass: 'w-8 h-8 sm:w-10 sm:h-10',
    duration: 13,
    delay: 2.8,
    yRange: [0, -20, 0],
    rotateRange: [0, 10, 0],
    hideOnMobile: true,
  },
  {
    id: 'body-lower-shield',
    Icon: Shield,
    style: { top: '68%', right: '14%' },
    className: 'text-emerald-500/18 dark:text-emerald-400/15',
    sizeClass: 'w-8 h-8 sm:w-9 sm:h-9',
    duration: 15,
    delay: 0.8,
    yRange: [0, 20, 0],
    rotateRange: [0, -8, 0],
  },
  {
    id: 'body-deep-cross',
    Icon: Cross,
    style: { top: '78%', left: '6%' },
    className: 'text-teal-500/18 dark:text-teal-400/15',
    sizeClass: 'w-7 h-7 sm:w-8 sm:h-8',
    duration: 13.5,
    delay: 1.5,
    yRange: [0, -16, 0],
    rotateRange: [0, 14, 0],
  },
];

export const FloatingMedicalIcons: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none min-h-full"
    >
      {BODY_WATERMARK_ICONS.map((item) => {
        const {
          Icon,
          id,
          className,
          sizeClass,
          style,
          duration,
          delay,
          yRange,
          rotateRange,
          hideOnMobile,
        } = item;

        return (
          <motion.div
            key={id}
            style={style}
            className={`absolute ${hideOnMobile ? 'hidden sm:block' : 'block'}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={
              shouldReduceMotion
                ? { opacity: 0.8, scale: 1 }
                : {
                    opacity: [0.5, 0.9, 0.5],
                    y: yRange,
                    rotate: rotateRange,
                  }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0.3 }
                : {
                    duration,
                    delay,
                    repeat: Infinity,
                    repeatType: 'mirror',
                    ease: 'easeInOut',
                  }
            }
          >
            <Icon
              className={`${sizeClass} drop-shadow-sm filter transition-opacity duration-300 ${className}`}
              strokeWidth={1.75}
            />
          </motion.div>
        );
      })}
    </div>
  );
};
