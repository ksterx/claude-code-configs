// Template: Framer Motion Animation Components
// Usage: Reusable animation wrappers

"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { ReactNode } from "react";

// ============================================
// Animation Variants (reusable)
// ============================================

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const scaleIn: Variants = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.95, opacity: 0 },
};

export const slideInRight: Variants = {
  initial: { x: 20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -20, opacity: 0 },
};

export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// ============================================
// Animation Components
// ============================================

interface AnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Fade in with upward motion
 */
export function FadeInUp({ children, className, delay = 0 }: AnimationProps) {
  return (
    <motion.div
      className={className}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeInUp}
      transition={{ duration: 0.3, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Simple fade in/out
 */
export function FadeIn({ children, className, delay = 0 }: AnimationProps) {
  return (
    <motion.div
      className={className}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeIn}
      transition={{ duration: 0.2, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Scale in animation (good for modals)
 */
export function ScaleIn({ children, className, delay = 0 }: AnimationProps) {
  return (
    <motion.div
      className={className}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={scaleIn}
      transition={{ duration: 0.2, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Interactive card with hover/tap effects
 */
export function InteractiveCard({ children, className }: AnimationProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Staggered list container
 */
export function StaggerList({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  );
}

/**
 * Staggered list item (use inside StaggerList)
 */
export function StaggerItem({ children, className }: AnimationProps) {
  return (
    <motion.div className={className} variants={fadeInUp}>
      {children}
    </motion.div>
  );
}

// ============================================
// Page Transitions
// ============================================

/**
 * Page transition wrapper
 * Usage: Wrap page content for enter/exit animations
 */
export function PageTransition({ children, className }: AnimationProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

// ============================================
// Conditional Animation Wrapper
// ============================================

interface AnimatePresenceWrapperProps {
  children: ReactNode;
  show: boolean;
  mode?: "wait" | "sync" | "popLayout";
}

/**
 * Conditional render with animations
 */
export function AnimatedPresence({
  children,
  show,
  mode = "wait",
}: AnimatePresenceWrapperProps) {
  return (
    <AnimatePresence mode={mode}>
      {show && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================
// Loading Skeleton Animation
// ============================================

export function SkeletonPulse({ className }: { className?: string }) {
  return (
    <motion.div
      className={`bg-muted rounded ${className}`}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  );
}
