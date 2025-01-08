import { keyframes } from '@emotion/react';

// Floating animation for elements
export const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

// Pulse animation for hearts and like buttons
export const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

// Fade in animation for cards and modals
export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Slide in animation for notifications
export const slideIn = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`;

// Bounce animation for buttons
export const bounce = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

// Spin animation for loading states
export const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// Wave animation for text
export const wave = keyframes`
  0% { transform: rotate(0deg); }
  20% { transform: rotate(14deg); }
  40% { transform: rotate(-8deg); }
  60% { transform: rotate(14deg); }
  80% { transform: rotate(-4deg); }
  100% { transform: rotate(10deg); }
`;

// Page transition animations
export const pageTransitions = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

// Card hover animations
export const cardHover = {
  rest: {
    scale: 1,
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    transition: {
      duration: 0.2,
      type: 'tween',
      ease: 'easeOut',
    },
  },
  hover: {
    scale: 1.05,
    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.15)',
    transition: {
      duration: 0.2,
      type: 'tween',
      ease: 'easeIn',
    },
  },
};

// Button hover animations
export const buttonHover = {
  rest: {
    scale: 1,
    transition: {
      duration: 0.2,
      type: 'tween',
      ease: 'easeOut',
    },
  },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.2,
      type: 'tween',
      ease: 'easeIn',
    },
  },
  tap: {
    scale: 0.95,
  },
};

// Stagger container animation
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

// Stagger item animation
export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};
