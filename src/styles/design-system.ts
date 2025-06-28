/**
 * Prism Writing Design System
 * 
 * A comprehensive design system that defines the visual language and component
 * standards for the Prism Writing website. Inspired by modern technology websites
 * and following industry best practices for scalable, maintainable design.
 * 
 * Key Principles:
 * - Consistency across all components and pages
 * - Accessibility-first design approach
 * - Modular and reusable components
 * - Modern aesthetics with purposeful animations
 * - Professional typography and color systems
 * 
 * @module DesignSystem
 * @version 2.0.0
 * @author Prism Writing Cooperative
 */

/**
 * Color Palette
 * 
 * A sophisticated color system that supports both light and dark themes
 * while maintaining excellent contrast ratios and brand consistency.
 * Colors are organized by purpose and include semantic meanings.
 */
export const colors = {
  // Primary Brand Colors
  primary: {
    50: '#eff6ff',   // Very light blue - backgrounds, subtle accents
    100: '#dbeafe',  // Light blue - hover states, secondary backgrounds
    200: '#bfdbfe',  // Medium light blue - borders, dividers
    300: '#93c5fd',  // Medium blue - inactive states
    400: '#60a5fa',  // Bright blue - secondary buttons, links
    500: '#3b82f6',  // Main brand blue - primary buttons, main CTAs
    600: '#2563eb',  // Dark blue - button hover states
    700: '#1d4ed8',  // Darker blue - active states
    800: '#1e40af',  // Very dark blue - text on light backgrounds
    900: '#1e3a8a',  // Darkest blue - high contrast text
  },

  // Secondary Accent Colors
  secondary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',  // Main secondary color
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },

  // Success/Green System
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',  // Main success color
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },

  // Warning/Orange System
  warning: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',  // Main warning color
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
  },

  // Error/Red System
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',  // Main error color
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },

  // Neutral Gray System
  neutral: {
    50: '#f9fafb',   // Lightest gray - page backgrounds
    100: '#f3f4f6',  // Very light gray - card backgrounds
    200: '#e5e7eb',  // Light gray - borders, dividers
    300: '#d1d5db',  // Medium gray - inactive elements
    400: '#9ca3af',  // Gray - placeholder text, disabled states
    500: '#6b7280',  // Medium dark gray - secondary text
    600: '#4b5563',  // Dark gray - body text
    700: '#374151',  // Darker gray - headings
    800: '#1f2937',  // Very dark gray - primary text
    900: '#111827',  // Darkest gray - high contrast text
  },

  // Gradient Definitions
  gradients: {
    primary: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    secondary: 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)',
    success: 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)',
    sunset: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
    aurora: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #f59e0b 100%)',
    dark: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
  },
} as const;

/**
 * Typography System
 * 
 * A comprehensive typography scale that ensures consistent text hierarchy
 * and readability across all devices and contexts.
 */
export const typography = {
  // Font Families
  fonts: {
    sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
    serif: ['Georgia', 'ui-serif', 'serif'],
    mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
    display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'], // For headlines
  },

  // Font Sizes (mobile-first approach)
  sizes: {
    xs: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.025em' }],      // 12px
    sm: ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.025em' }],  // 14px
    base: ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],           // 16px
    lg: ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '-0.025em' }], // 18px
    xl: ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.025em' }],  // 20px
    '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.025em' }],   // 24px
    '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.05em' }], // 30px
    '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.05em' }],   // 36px
    '5xl': ['3rem', { lineHeight: '3rem', letterSpacing: '-0.05em' }],        // 48px
    '6xl': ['3.75rem', { lineHeight: '3.75rem', letterSpacing: '-0.05em' }],  // 60px
    '7xl': ['4.5rem', { lineHeight: '4.5rem', letterSpacing: '-0.075em' }],   // 72px
    '8xl': ['6rem', { lineHeight: '6rem', letterSpacing: '-0.075em' }],       // 96px
    '9xl': ['8rem', { lineHeight: '8rem', letterSpacing: '-0.1em' }],         // 128px
  },

  // Font Weights
  weights: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
} as const;

/**
 * Spacing System
 * 
 * A consistent spacing scale based on multiples of 4px (0.25rem)
 * that creates rhythm and hierarchy in layouts.
 */
export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  11: '2.75rem',    // 44px
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  28: '7rem',       // 112px
  32: '8rem',       // 128px
  36: '9rem',       // 144px
  40: '10rem',      // 160px
  44: '11rem',      // 176px
  48: '12rem',      // 192px
  52: '13rem',      // 208px
  56: '14rem',      // 224px
  60: '15rem',      // 240px
  64: '16rem',      // 256px
  72: '18rem',      // 288px
  80: '20rem',      // 320px
  96: '24rem',      // 384px
} as const;

/**
 * Breakpoints for Responsive Design
 * 
 * Mobile-first responsive breakpoints that ensure the website
 * looks great on all devices.
 */
export const breakpoints = {
  sm: '640px',    // Small devices (phones)
  md: '768px',    // Medium devices (tablets)
  lg: '1024px',   // Large devices (laptops)
  xl: '1280px',   // Extra large devices (desktops)
  '2xl': '1536px', // 2XL devices (large desktops)
} as const;

/**
 * Border Radius System
 * 
 * Consistent border radius values for creating cohesive
 * component shapes and visual hierarchy.
 */
export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',   // Fully rounded
} as const;

/**
 * Shadow System
 * 
 * Layered shadow system that creates depth and hierarchy
 * in the interface while maintaining consistency.
 */
export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  
  // Colored shadows for emphasis
  colored: {
    primary: '0 10px 15px -3px rgb(59 130 246 / 0.3), 0 4px 6px -4px rgb(59 130 246 / 0.3)',
    success: '0 10px 15px -3px rgb(34 197 94 / 0.3), 0 4px 6px -4px rgb(34 197 94 / 0.3)',
    warning: '0 10px 15px -3px rgb(249 115 22 / 0.3), 0 4px 6px -4px rgb(249 115 22 / 0.3)',
    error: '0 10px 15px -3px rgb(239 68 68 / 0.3), 0 4px 6px -4px rgb(239 68 68 / 0.3)',
  },
} as const;

/**
 * Animation and Transition System
 * 
 * Consistent timing functions and durations for smooth,
 * professional animations throughout the interface.
 */
export const animations = {
  // Duration presets
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '750ms',
    slowest: '1000ms',
  },

  // Easing functions
  easing: {
    linear: 'linear',
    ease: 'ease',
    'ease-in': 'ease-in',
    'ease-out': 'ease-out',
    'ease-in-out': 'ease-in-out',
    // Custom easing curves for more sophisticated animations
    spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },

  // Common transition patterns
  transitions: {
    default: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    fast: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    colors: 'color 300ms cubic-bezier(0.4, 0, 0.2, 1), background-color 300ms cubic-bezier(0.4, 0, 0.2, 1), border-color 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    transform: 'transform 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    opacity: 'opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

/**
 * Z-Index Scale
 * 
 * Consistent layering system to prevent z-index conflicts
 * and ensure proper stacking order.
 */
export const zIndex = {
  hide: -1,
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;

/**
 * Component Variants
 * 
 * Predefined component variations that can be easily
 * applied across different contexts.
 */
export const variants = {
  // Button variants
  button: {
    primary: {
      background: colors.primary[500],
      color: 'white',
      hover: colors.primary[600],
      active: colors.primary[700],
      shadow: shadows.colored.primary,
    },
    secondary: {
      background: colors.neutral[100],
      color: colors.neutral[900],
      hover: colors.neutral[200],
      active: colors.neutral[300],
      shadow: shadows.base,
    },
    outline: {
      background: 'transparent',
      color: colors.primary[500],
      border: colors.primary[500],
      hover: colors.primary[50],
      active: colors.primary[100],
    },
  },

  // Card variants
  card: {
    default: {
      background: 'white',
      border: colors.neutral[200],
      shadow: shadows.base,
      radius: borderRadius.lg,
    },
    elevated: {
      background: 'white',
      shadow: shadows.lg,
      radius: borderRadius.xl,
    },
    interactive: {
      background: 'white',
      border: colors.neutral[200],
      shadow: shadows.base,
      hoverShadow: shadows.lg,
      radius: borderRadius.lg,
      transition: animations.transitions.default,
    },
  },
} as const;

/**
 * Icon Sizes
 * 
 * Consistent icon sizing system that maintains
 * proper visual hierarchy and alignment.
 */
export const iconSizes = {
  xs: '0.75rem',   // 12px
  sm: '1rem',      // 16px
  base: '1.25rem', // 20px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '2.5rem', // 40px
  '3xl': '3rem',   // 48px
} as const;

/**
 * Layout Constraints
 * 
 * Maximum widths and layout constraints that ensure
 * optimal readability and visual composition.
 */
export const layout = {
  maxWidth: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
    '3xl': '1792px',
    '4xl': '2048px',
    full: '100%',
    min: 'min-content',
    max: 'max-content',
    prose: '65ch', // Optimal reading width
  },

  container: {
    center: true,
    padding: {
      default: '1rem',
      sm: '2rem',
      lg: '4rem',
      xl: '5rem',
      '2xl': '6rem',
    },
  },
} as const;

// Export the complete design system
export const designSystem = {
  colors,
  typography,
  spacing,
  breakpoints,
  borderRadius,
  shadows,
  animations,
  zIndex,
  variants,
  iconSizes,
  layout,
} as const;

export default designSystem;
