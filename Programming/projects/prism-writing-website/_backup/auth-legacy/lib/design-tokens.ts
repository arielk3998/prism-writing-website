/**
 * PRISM WRITING DESIGN SYSTEM
 * Central Design Tokens & Standards
 * 
 * This file serves as the single source of truth for all design decisions.
 * All components should reference these tokens for consistency.
 * 
 * Export formats supported:
 * - CSS Custom Properties
 * - Tailwind Config
 * - Style Dictionary
 * - Microsoft Word Styles
 * - Google Docs Styles
 */

// ============================================================================
// TYPOGRAPHY SYSTEM
// ============================================================================

export const typography = {
  // Font Families
  fonts: {
    sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
    mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
    display: ['Inter', 'system-ui', 'sans-serif'], // For headings
    body: ['Inter', 'system-ui', 'sans-serif'], // For body text
  },

  // Font Weights
  fontWeights: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  // Font Sizes (rem values with px equivalents)
  fontSizes: {
    xs: { rem: '0.75rem', px: '12px', lineHeight: '1rem' },     // Small text, captions
    sm: { rem: '0.875rem', px: '14px', lineHeight: '1.25rem' }, // Small UI text
    base: { rem: '1rem', px: '16px', lineHeight: '1.5rem' },    // Body text default
    lg: { rem: '1.125rem', px: '18px', lineHeight: '1.75rem' }, // Large body text
    xl: { rem: '1.25rem', px: '20px', lineHeight: '1.75rem' },  // Small headings
    '2xl': { rem: '1.5rem', px: '24px', lineHeight: '2rem' },   // H4
    '3xl': { rem: '1.875rem', px: '30px', lineHeight: '2.25rem' }, // H3
    '4xl': { rem: '2.25rem', px: '36px', lineHeight: '2.5rem' }, // H2
    '5xl': { rem: '3rem', px: '48px', lineHeight: '1' },        // H1
    '6xl': { rem: '3.75rem', px: '60px', lineHeight: '1' },     // Display Large
    '7xl': { rem: '4.5rem', px: '72px', lineHeight: '1' },      // Hero
    '8xl': { rem: '6rem', px: '96px', lineHeight: '1' },        // Massive
    '9xl': { rem: '8rem', px: '128px', lineHeight: '1' },       // Ultra
  },

  // Line Heights
  lineHeights: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // Letter Spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  // Text Styles (predefined combinations)
  textStyles: {
    // Headings
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.025em',
      fontFamily: 'Inter',
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 700,
      lineHeight: 1.25,
      letterSpacing: '-0.025em',
      fontFamily: 'Inter',
    },
    h3: {
      fontSize: '1.875rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.025em',
      fontFamily: 'Inter',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.35,
      fontFamily: 'Inter',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
      fontFamily: 'Inter',
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.4,
      fontFamily: 'Inter',
    },
    
    // Body Text
    bodyLarge: {
      fontSize: '1.125rem',
      fontWeight: 400,
      lineHeight: 1.6,
      fontFamily: 'Inter',
    },
    body: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.6,
      fontFamily: 'Inter',
    },
    bodySmall: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5,
      fontFamily: 'Inter',
    },
    
    // UI Text
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.25,
      fontFamily: 'Inter',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.25,
      fontFamily: 'Inter',
    },
    label: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.25,
      fontFamily: 'Inter',
    },
  },
}

// ============================================================================
// COLOR SYSTEM
// ============================================================================

export const colors = {
  // Brand Colors
  brand: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6', // Main brand blue
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554',
    },
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617',
    },
  },

  // Semantic Colors
  semantic: {
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
    },
    info: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      500: '#06b6d4',
      600: '#0891b2',
      700: '#0e7490',
    },
  },

  // Neutral Colors
  neutral: {
    white: '#ffffff',
    black: '#000000',
    transparent: 'transparent',
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
      950: '#030712',
    },
  },

  // Theme Colors (Light/Dark mode mappings)
  theme: {
    light: {
      background: '#ffffff',
      foreground: '#0f172a',
      muted: '#f1f5f9',
      mutedForeground: '#64748b',
      card: '#ffffff',
      cardForeground: '#0f172a',
      border: '#e2e8f0',
      input: '#e2e8f0',
      primary: '#3b82f6',
      primaryForeground: '#ffffff',
      secondary: '#f1f5f9',
      secondaryForeground: '#0f172a',
      accent: '#f1f5f9',
      accentForeground: '#0f172a',
      destructive: '#ef4444',
      destructiveForeground: '#ffffff',
      ring: '#3b82f6',
    },
    dark: {
      background: '#020617',
      foreground: '#f8fafc',
      muted: '#1e293b',
      mutedForeground: '#94a3b8',
      card: '#020617',
      cardForeground: '#f8fafc',
      border: '#1e293b',
      input: '#1e293b',
      primary: '#3b82f6',
      primaryForeground: '#0f172a',
      secondary: '#1e293b',
      secondaryForeground: '#f8fafc',
      accent: '#1e293b',
      accentForeground: '#f8fafc',
      destructive: '#ef4444',
      destructiveForeground: '#f8fafc',
      ring: '#3b82f6',
    },
  },
}

// ============================================================================
// SPACING SYSTEM
// ============================================================================

export const spacing = {
  // Base spacing unit (4px)
  unit: 4,
  
  // Spacing scale
  scale: {
    0: '0px',
    px: '1px',
    0.5: '2px',
    1: '4px',
    1.5: '6px',
    2: '8px',
    2.5: '10px',
    3: '12px',
    3.5: '14px',
    4: '16px',
    5: '20px',
    6: '24px',
    7: '28px',
    8: '32px',
    9: '36px',
    10: '40px',
    11: '44px',
    12: '48px',
    14: '56px',
    16: '64px',
    20: '80px',
    24: '96px',
    28: '112px',
    32: '128px',
    36: '144px',
    40: '160px',
    44: '176px',
    48: '192px',
    52: '208px',
    56: '224px',
    60: '240px',
    64: '256px',
    72: '288px',
    80: '320px',
    96: '384px',
  },

  // Semantic spacing
  semantic: {
    // Component spacing
    componentPadding: {
      xs: '8px',
      sm: '12px',
      md: '16px',
      lg: '24px',
      xl: '32px',
    },
    
    // Section spacing
    sectionPadding: {
      xs: '32px',
      sm: '48px',
      md: '64px',
      lg: '96px',
      xl: '128px',
    },
    
    // Container spacing
    containerPadding: {
      mobile: '16px',
      tablet: '24px',
      desktop: '32px',
    },
  },
}

// ============================================================================
// BORDER RADIUS SYSTEM
// ============================================================================

export const borderRadius = {
  none: '0px',
  sm: '2px',
  md: '4px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  '3xl': '24px',
  full: '9999px',
}

// ============================================================================
// SHADOW SYSTEM
// ============================================================================

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
}

// ============================================================================
// ANIMATION SYSTEM
// ============================================================================

export const animations = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '750ms',
    slowest: '1000ms',
  },
  
  easing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
}

// ============================================================================
// BREAKPOINT SYSTEM
// ============================================================================

export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

// ============================================================================
// Z-INDEX SYSTEM
// ============================================================================

export const zIndex = {
  hide: -1,
  auto: 'auto',
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
}

// ============================================================================
// EXPORT UTILITIES
// ============================================================================

/**
 * Generate CSS Custom Properties for all design tokens
 */
export function generateCSSVariables() {
  const cssVars = [
    '/* Prism Writing Design System CSS Variables */',
    ':root {',
    
    // Typography
    '  /* Typography */',
    `  --font-sans: ${typography.fonts.sans.join(', ')};`,
    `  --font-mono: ${typography.fonts.mono.join(', ')};`,
    
    // Colors
    '  /* Colors */',
    ...Object.entries(colors.theme.light).map(([key, value]) => 
      `  --color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`
    ),
    
    // Spacing
    '  /* Spacing */',
    ...Object.entries(spacing.scale).map(([key, value]) => 
      `  --spacing-${key}: ${value};`
    ),
    
    // Shadows
    '  /* Shadows */',
    ...Object.entries(shadows).map(([key, value]) => 
      `  --shadow-${key}: ${value};`
    ),
    
    '}',
    '',
    '.dark {',
    ...Object.entries(colors.theme.dark).map(([key, value]) => 
      `  --color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`
    ),
    '}',
  ]
  
  return cssVars.join('\n')
}

/**
 * Generate Microsoft Word styles mapping
 */
export function generateWordStyles() {
  return {
    Normal: {
      fontFamily: typography.fonts.body[0],
      fontSize: typography.fontSizes.base.px,
      lineHeight: typography.lineHeights.normal,
      color: colors.theme.light.foreground,
    },
    'Heading 1': {
      fontFamily: typography.fonts.display[0],
      fontSize: typography.fontSizes['5xl'].px,
      fontWeight: typography.fontWeights.bold,
      lineHeight: typography.lineHeights.tight,
      color: colors.theme.light.foreground,
    },
    'Heading 2': {
      fontFamily: typography.fonts.display[0],
      fontSize: typography.fontSizes['4xl'].px,
      fontWeight: typography.fontWeights.bold,
      lineHeight: typography.lineHeights.tight,
      color: colors.theme.light.foreground,
    },
    'Heading 3': {
      fontFamily: typography.fonts.display[0],
      fontSize: typography.fontSizes['3xl'].px,
      fontWeight: typography.fontWeights.semibold,
      lineHeight: typography.lineHeights.snug,
      color: colors.theme.light.foreground,
    },
    // Add more styles as needed
  }
}
