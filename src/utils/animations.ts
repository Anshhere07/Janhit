import { Variants, Transition } from 'framer-motion';

/**
 * High-End Centralized Animation System for Janhit Hospital
 * 
 * Features:
 * 1. Silky-smooth ease transitions (gentle ease-in acceleration, continuous glide, and soft landing).
 * 2. Pure GPU-accelerated transforms (transform & opacity only) with zero border jitter and zero layout shift.
 * 3. Responsive viewport triggering with natural lead-in timing.
 * 4. Context-aware animation patterns:
 *    - 2-card / 2-column sections: smooth slideInLeft + slideInRight
 *    - 3-card / multi-card sections: fluid staggered cascades
 */

// Silky smooth easing curves with gentle ease-in acceleration
// [0.35, 0.0, 0.2, 1.0] provides an ultra-smooth ease-in ramp into continuous glide and soft landing
export const smoothEase = [0.35, 0.0, 0.2, 1.0] as const;
export const smoothEaseInOut = [0.42, 0.0, 0.58, 1.0] as const;
export const easeOutCubic = [0.33, 1.0, 0.68, 1.0] as const;
export const springSmooth = { type: 'spring', stiffness: 120, damping: 22 } as const;

// Transition presets with silky timing
export const transitionFast: Transition = { duration: 0.4, ease: smoothEase };
export const transitionMedium: Transition = { duration: 0.75, ease: smoothEase };
export const transitionSlow: Transition = { duration: 0.95, ease: smoothEase };

// Viewport trigger presets (triggers gently as element starts entering the viewport)
export const viewportStandard = {
  once: true,
  amount: 0.06,
  margin: '0px 0px -30px 0px' as const,
};

// Immediate viewport trigger for top or near-fold items
export const viewportEarly = {
  once: true,
  amount: 0.03,
  margin: '0px 0px 0px 0px' as const,
};

// ============================================================================
// 1. STANDARD SECTION & CARD ENTRANCE VARIANTS (Silky Smooth Ease-In Transitions)
// ============================================================================

// Fade up animation with gentle ease-in float
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: smoothEase,
    },
  },
};

// Distinct slide-up animation for card grids
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: smoothEase,
    },
  },
};

// Fade down animation
export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: smoothEase,
    },
  },
};

// Pure fade in without translation
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.75,
      ease: smoothEase,
    },
  },
};

// Scale in animation (soft, subtle zoom in)
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: smoothEase,
    },
  },
};

// ============================================================================
// 2. TWO-CARD & TWO-COLUMN COMPOSITE ANIMATIONS (SLIDE LEFT & SLIDE RIGHT)
// ============================================================================

// Left card or left column: glides in smoothly from the left with gentle ease-in
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -26 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.85,
      ease: smoothEase,
    },
  },
};

// Right card or right column: glides in smoothly from the right with gentle ease-in
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 26 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.85,
      ease: smoothEase,
    },
  },
};

// Aliases for explicit 2-card semantic usage
export const twoCardLeft = slideInLeft;
export const twoCardRight = slideInRight;

// ============================================================================
// 3. THREE-CARD & MULTI-CARD CASCADE CONTAINERS
// ============================================================================

// Stagger container for card grids (3-card or 4-card layouts)
export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0.03): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

// Three-card item variant with silky smooth elevation glide
export const threeCardItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: smoothEase,
    },
  },
};
