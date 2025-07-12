/**
 * PRISM WRITING DESIGN SYSTEM UTILITIES
 * Helper functions and utilities for consistent styling
 */

import { typography, colors, spacing, borderRadius, shadows, animations, breakpoints, zIndex } from './design-tokens'

// ============================================================================
// CSS VARIABLE GENERATORS
// ============================================================================

/**
 * Generate CSS custom properties for all design tokens
 * This function generates CSS variables that can be used in stylesheets
 */
export function generateCSSVariables(): string {
  const cssVars = [
    '/* Prism Writing Design System CSS Variables */',
    ':root {',
    
    // Typography
    '  /* Typography */',
    `  --font-sans: ${typography.fonts.sans.join(', ')};`,
    `  --font-mono: ${typography.fonts.mono.join(', ')};`,
    `  --font-display: ${typography.fonts.display.join(', ')};`,
    `  --font-body: ${typography.fonts.body.join(', ')};`,
    
    // Font weights
    ...Object.entries(typography.fontWeights).map(([key, value]) => 
      `  --font-weight-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`
    ),
    
    // Font sizes
    ...Object.entries(typography.fontSizes).map(([key, value]) => 
      `  --font-size-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value.rem};`
    ),
    
    // Line heights
    ...Object.entries(typography.lineHeights).map(([key, value]) => 
      `  --line-height-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`
    ),
    
    // Letter spacing
    ...Object.entries(typography.letterSpacing).map(([key, value]) => 
      `  --letter-spacing-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`
    ),
    
    // Colors - Light theme
    '  /* Colors - Light Theme */',
    ...Object.entries(colors.theme.light).map(([key, value]) => 
      `  --color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`
    ),
    
    // Spacing
    '  /* Spacing */',
    ...Object.entries(spacing.scale).map(([key, value]) => 
      `  --spacing-${key.replace(/\./g, '_')}: ${value};`
    ),
    
    // Border radius
    '  /* Border Radius */',
    ...Object.entries(borderRadius).map(([key, value]) => 
      `  --radius-${key}: ${value};`
    ),
    
    // Shadows
    '  /* Shadows */',
    ...Object.entries(shadows).map(([key, value]) => 
      `  --shadow-${key}: ${value};`
    ),
    
    // Animations
    '  /* Animations */',
    ...Object.entries(animations.duration).map(([key, value]) => 
      `  --animation-duration-${key}: ${value};`
    ),
    ...Object.entries(animations.easing).map(([key, value]) => 
      `  --animation-easing-${key}: ${value};`
    ),
    
    // Z-index
    '  /* Z-Index */',
    ...Object.entries(zIndex).map(([key, value]) => 
      `  --z-index-${key}: ${value};`
    ),
    
    '}',
    '',
    '.dark {',
    '  /* Colors - Dark Theme */',
    ...Object.entries(colors.theme.dark).map(([key, value]) => 
      `  --color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`
    ),
    '}',
  ]
  
  return cssVars.join('\n')
}

// ============================================================================
// COMPONENT STYLE GENERATORS
// ============================================================================

/**
 * Generate consistent button styles
 */
export function generateButtonStyles(variant: 'primary' | 'secondary' | 'outline' | 'ghost' = 'primary', size: 'sm' | 'md' | 'lg' = 'md') {
  const baseStyles = {
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 'var(--font-weight-medium)',
    borderRadius: 'var(--radius-md)',
    transition: 'all var(--animation-duration-normal) var(--animation-easing-ease-in-out)',
    cursor: 'pointer',
    outline: 'none',
    border: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
  }

  const sizeStyles = {
    sm: {
      height: '32px',
      padding: '0 var(--spacing-3)',
      fontSize: 'var(--font-size-xs)',
    },
    md: {
      height: '40px',
      padding: 'var(--spacing-2) var(--spacing-4)',
      fontSize: 'var(--font-size-sm)',
    },
    lg: {
      height: '48px',
      padding: 'var(--spacing-3) var(--spacing-8)',
      fontSize: 'var(--font-size-base)',
      borderRadius: 'var(--radius-lg)',
    },
  }

  const variantStyles = {
    primary: {
      backgroundColor: 'rgb(var(--primary))',
      color: 'rgb(var(--primary-foreground))',
      boxShadow: 'var(--shadow-md)',
    },
    secondary: {
      backgroundColor: 'rgb(var(--secondary))',
      color: 'rgb(var(--secondary-foreground))',
      border: '1px solid rgb(var(--border))',
    },
    outline: {
      border: '1px solid rgb(var(--border))',
      backgroundColor: 'rgb(var(--background))',
      color: 'rgb(var(--foreground))',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'rgb(var(--foreground))',
    },
  }

  return {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
  }
}

/**
 * Generate consistent card styles
 */
export function generateCardStyles(interactive: boolean = false) {
  const baseStyles = {
    borderRadius: 'var(--radius-xl)',
    border: '1px solid rgb(var(--border))',
    backgroundColor: 'rgb(var(--card))',
    color: 'rgb(var(--card-foreground))',
    boxShadow: 'var(--shadow-sm)',
    transition: 'all var(--animation-duration-normal) var(--animation-easing-ease-in-out)',
  }

  if (interactive) {
    return {
      ...baseStyles,
      cursor: 'pointer',
      ':hover': {
        boxShadow: 'var(--shadow-xl)',
        transform: 'translateY(-8px) scale(1.02)',
      }
    }
  }

  return baseStyles
}

/**
 * Generate consistent input styles
 */
export function generateInputStyles(error: boolean = false, size: 'md' | 'lg' = 'md') {
  const baseStyles = {
    display: 'flex',
    width: '100%',
    borderRadius: 'var(--radius-md)',
    border: `1px solid rgb(var(--${error ? 'destructive' : 'input'}))`,
    backgroundColor: 'rgb(var(--background))',
    fontFamily: 'var(--font-sans)',
    transition: 'all var(--animation-duration-normal) var(--animation-easing-ease-in-out)',
    outline: 'none',
    '::placeholder': {
      color: 'rgb(var(--muted-foreground))',
    },
    ':focus-visible': {
      boxShadow: `0 0 0 2px rgb(var(--${error ? 'destructive' : 'ring'})), 0 0 0 4px rgb(var(--background))`,
    },
    ':disabled': {
      cursor: 'not-allowed',
      opacity: '0.5',
    },
  }

  const sizeStyles = {
    md: {
      height: '40px',
      padding: 'var(--spacing-2) var(--spacing-3)',
      fontSize: 'var(--font-size-sm)',
    },
    lg: {
      height: '48px',
      padding: 'var(--spacing-3) var(--spacing-4)',
      fontSize: 'var(--font-size-base)',
    },
  }

  return {
    ...baseStyles,
    ...sizeStyles[size],
  }
}

// ============================================================================
// RESPONSIVE UTILITIES
// ============================================================================

/**
 * Generate responsive container styles
 */
export function generateContainerStyles() {
  return {
    margin: '0 auto',
    maxWidth: '1280px',
    paddingLeft: 'var(--spacing-4)',
    paddingRight: 'var(--spacing-4)',
    '@media (min-width: 640px)': {
      paddingLeft: 'var(--spacing-6)',
      paddingRight: 'var(--spacing-6)',
    },
    '@media (min-width: 1024px)': {
      paddingLeft: 'var(--spacing-8)',
      paddingRight: 'var(--spacing-8)',
    },
  }
}

/**
 * Generate responsive grid styles
 */
export function generateGridStyles(type: 'responsive' | 'feature' | 'service' = 'responsive') {
  const gridTypes = {
    responsive: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: 'var(--spacing-6)',
      '@media (min-width: 640px)': {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
      '@media (min-width: 1024px)': {
        gridTemplateColumns: 'repeat(3, 1fr)',
      },
      '@media (min-width: 1280px)': {
        gridTemplateColumns: 'repeat(4, 1fr)',
      },
    },
    feature: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: 'var(--spacing-8)',
      '@media (min-width: 768px)': {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
      '@media (min-width: 1024px)': {
        gridTemplateColumns: 'repeat(3, 1fr)',
      },
    },
    service: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: 'var(--spacing-6)',
      '@media (min-width: 768px)': {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
      '@media (min-width: 1024px)': {
        gridTemplateColumns: 'repeat(4, 1fr)',
      },
    },
  }

  return gridTypes[type]
}

// ============================================================================
// SECTION UTILITIES
// ============================================================================

/**
 * Generate consistent section spacing
 */
export function generateSectionStyles(size: 'sm' | 'md' | 'lg' = 'md', withNav: boolean = false) {
  const sizeStyles = {
    sm: {
      paddingTop: 'var(--spacing-8)',
      paddingBottom: 'var(--spacing-8)',
      '@media (min-width: 768px)': {
        paddingTop: 'var(--spacing-12)',
        paddingBottom: 'var(--spacing-12)',
      },
    },
    md: {
      paddingTop: 'var(--spacing-16)',
      paddingBottom: 'var(--spacing-16)',
      '@media (min-width: 768px)': {
        paddingTop: 'var(--spacing-20)',
        paddingBottom: 'var(--spacing-16)',
      },
      '@media (min-width: 1024px)': {
        paddingTop: 'var(--spacing-24)',
        paddingBottom: 'var(--spacing-16)',
      },
    },
    lg: {
      paddingTop: 'var(--spacing-20)',
      paddingBottom: 'var(--spacing-20)',
      '@media (min-width: 768px)': {
        paddingTop: 'var(--spacing-28)',
        paddingBottom: 'var(--spacing-28)',
      },
      '@media (min-width: 1024px)': {
        paddingTop: 'var(--spacing-32)',
        paddingBottom: 'var(--spacing-32)',
      },
    },
  }

  const styles = sizeStyles[size]

  if (withNav) {
    return {
      ...styles,
      paddingTop: 'var(--spacing-20)',
      '@media (min-width: 768px)': {
        ...styles['@media (min-width: 768px)'],
        paddingTop: 'var(--spacing-24)',
      },
      '@media (min-width: 1024px)': {
        ...styles['@media (min-width: 1024px)'],
        paddingTop: 'var(--spacing-28)',
      },
    }
  }

  return styles
}

// ============================================================================
// EXPORT UTILITIES
// ============================================================================

/**
 * Generate Microsoft Word compatible styles
 */
export function generateWordExportStyles() {
  return {
    Normal: {
      fontFamily: typography.fonts.body[0],
      fontSize: typography.fontSizes.base.px,
      lineHeight: typography.lineHeights.normal,
      color: colors.theme.light.foreground,
      marginBottom: spacing.scale[4],
    },
    'Heading 1': {
      fontFamily: typography.fonts.display[0],
      fontSize: typography.fontSizes['5xl'].px,
      fontWeight: typography.fontWeights.bold,
      lineHeight: typography.lineHeights.tight,
      color: colors.theme.light.foreground,
      marginBottom: spacing.scale[6],
    },
    'Heading 2': {
      fontFamily: typography.fonts.display[0],
      fontSize: typography.fontSizes['4xl'].px,
      fontWeight: typography.fontWeights.bold,
      lineHeight: typography.lineHeights.tight,
      color: colors.theme.light.foreground,
      marginBottom: spacing.scale[5],
    },
    'Heading 3': {
      fontFamily: typography.fonts.display[0],
      fontSize: typography.fontSizes['3xl'].px,
      fontWeight: typography.fontWeights.semibold,
      lineHeight: typography.lineHeights.snug,
      color: colors.theme.light.foreground,
      marginBottom: spacing.scale[4],
    },
    'Body Text': {
      fontFamily: typography.fonts.body[0],
      fontSize: typography.fontSizes.base.px,
      fontWeight: typography.fontWeights.normal,
      lineHeight: typography.lineHeights.relaxed,
      color: colors.theme.light.foreground,
      marginBottom: spacing.scale[4],
    },
    'Emphasis': {
      fontWeight: typography.fontWeights.semibold,
      color: colors.brand.primary[500],
    },
    'List Paragraph': {
      fontFamily: typography.fonts.body[0],
      fontSize: typography.fontSizes.base.px,
      lineHeight: typography.lineHeights.relaxed,
      marginLeft: spacing.scale[6],
      marginBottom: spacing.scale[2],
    },
  }
}

/**
 * Generate CSS class names using design tokens
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * Get spacing value by key
 */
export function getSpacing(key: keyof typeof spacing.scale): string {
  return spacing.scale[key]
}

/**
 * Get color value by path
 */
export function getColor(path: string): string {
  // Helper to access nested color values
  // Example: getColor('brand.primary.500') or getColor('theme.light.background')
  const parts = path.split('.')
  let value: any = colors
  
  for (const part of parts) {
    value = value[part]
    if (value === undefined) return ''
  }
  
  return value
}

/**
 * Get typography value by path
 */
export function getTypography(path: string): any {
  const parts = path.split('.')
  let value: any = typography
  
  for (const part of parts) {
    value = value[part]
    if (value === undefined) return ''
  }
  
  return value
}
