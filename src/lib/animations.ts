import type { Variants } from 'framer-motion';

// ─── Easing Curves ───────────────────────────────────────────────────────────
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.4, 0, 0.2, 1] as const;
export const EASE_SPRING = { type: 'spring', stiffness: 300, damping: 30 };

// ─── Fade Up ─────────────────────────────────────────────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
};

export const fadeUpSlow: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
};

// ─── Fade In ─────────────────────────────────────────────────────────────────
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: EASE_IN_OUT },
  },
};

// ─── Scale In ────────────────────────────────────────────────────────────────
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_OUT_EXPO },
  },
};

// ─── Slide In Left ───────────────────────────────────────────────────────────
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASE_OUT_EXPO },
  },
};

// ─── Slide In Right ──────────────────────────────────────────────────────────
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASE_OUT_EXPO },
  },
};

// ─── Stagger Container ───────────────────────────────────────────────────────
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.02,
    },
  },
};

// ─── Stagger Item ────────────────────────────────────────────────────────────
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT_EXPO },
  },
};

// ─── Page Transition ─────────────────────────────────────────────────────────
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: EASE_OUT_EXPO },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.2, ease: EASE_IN_OUT },
  },
};

// ─── Card Hover ──────────────────────────────────────────────────────────────
export const cardHover = {
  rest: { y: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  hover: {
    y: -4,
    boxShadow: '0 16px 40px rgba(0,0,0,0.10)',
    transition: { duration: 0.2, ease: EASE_IN_OUT },
  },
};

// ─── Button Hover ────────────────────────────────────────────────────────────
export const buttonHoverPrimary = {
  whileHover: { y: -2, boxShadow: '0 12px 28px rgba(0,0,0,0.18)' },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.2 },
};

export const buttonHoverSecondary = {
  whileHover: { y: -1 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.15 },
};

// ─── Viewport defaults ───────────────────────────────────────────────────────
export const VIEWPORT_ONCE = { once: true, amount: 0.2 } as const;
export const VIEWPORT_ONCE_STRICT = { once: true, amount: 0.4 } as const;
