import type { Config } from 'tailwindcss'
import { typography, breakpoints } from './lib/design-tokens'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    screens: {
      xs: breakpoints.xs,
      sm: breakpoints.sm,
      md: breakpoints.md,
      lg: breakpoints.lg,
      xl: breakpoints.xl,
      '2xl': breakpoints['2xl'],
    },
    extend: {
      fontFamily: {
        sans: typography.fonts.sans,
        serif: typography.fonts.serif,
        mono: typography.fonts.mono,
      },
      fontSize: {
        xs: typography.fontSizes.xs,
        sm: typography.fontSizes.sm,
        base: typography.fontSizes.base,
        lg: typography.fontSizes.lg,
        xl: typography.fontSizes.xl,
        '2xl': typography.fontSizes['2xl'],
        '3xl': typography.fontSizes['3xl'],
        '4xl': typography.fontSizes['4xl'],
      },
      fontWeight: {
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
      lineHeight: {
        none: '1',
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },
      colors: {
        border: "rgb(var(--border) / <alpha-value>)",
        input: "rgb(var(--input) / <alpha-value>)",
        ring: "rgb(var(--ring) / <alpha-value>)",
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          foreground: "rgb(var(--primary-foreground) / <alpha-value>)",
          50: "rgb(var(--brand-primary-50) / <alpha-value>)",
          100: "rgb(var(--brand-primary-100) / <alpha-value>)",
          200: "rgb(var(--brand-primary-200) / <alpha-value>)",
          300: "rgb(var(--brand-primary-300) / <alpha-value>)",
          400: "rgb(var(--brand-primary-400) / <alpha-value>)",
          500: "rgb(var(--brand-primary-500) / <alpha-value>)",
          600: "rgb(var(--brand-primary-600) / <alpha-value>)",
          700: "rgb(var(--brand-primary-700) / <alpha-value>)",
          800: "rgb(var(--brand-primary-800) / <alpha-value>)",
          900: "rgb(var(--brand-primary-900) / <alpha-value>)",
          950: "rgb(var(--brand-primary-950) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary) / <alpha-value>)",
          foreground: "rgb(var(--secondary-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "rgb(var(--destructive) / <alpha-value>)",
          foreground: "rgb(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "rgb(var(--muted) / <alpha-value>)",
          foreground: "rgb(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          foreground: "rgb(var(--accent-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "rgb(var(--card) / <alpha-value>)",
          foreground: "rgb(var(--card-foreground) / <alpha-value>)",
        },
        success: "rgb(var(--success) / <alpha-value>)",
        warning: "rgb(var(--warning) / <alpha-value>)",
        error: "rgb(var(--error) / <alpha-value>)",
        info: "rgb(var(--info) / <alpha-value>)",
      },
      spacing: {
        '0': '0px',
        'px': '1px',
        '0_5': '2px',
        '1': '4px',
        '1_5': '6px',
        '2': '8px',
        '2_5': '10px',
        '3': '12px',
        '3_5': '14px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '7': '28px',
        '8': '32px',
        '9': '36px',
        '10': '40px',
        '11': '44px',
        '12': '48px',
        '14': '56px',
        '16': '64px',
        '20': '80px',
        '24': '96px',
        '28': '112px',
        '32': '128px',
        '36': '144px',
        '40': '160px',
        '44': '176px',
        '48': '192px',
        '52': '208px',
        '56': '224px',
        '60': '240px',
        '64': '256px',
        '72': '288px',
        '80': '320px',
        '96': '384px',
        // Semantic spacing
        'component-xs': '8px',
        'component-sm': '12px',
        'component-md': '16px',
        'component-lg': '24px',
        'component-xl': '32px',
        'section-xs': '32px',
        'section-sm': '48px',
        'section-md': '64px',
        'section-lg': '96px',
        'section-xl': '128px',
        'container-mobile': '16px',
        'container-tablet': '24px',
        'container-desktop': '32px',
      },
      borderRadius: {
        none: '0px',
        sm: '2px',
        md: '4px',
        lg: '8px',
        xl: '12px',
        '2xl': '16px',
        '3xl': '24px',
        full: '9999px',
      },
      boxShadow: {
        none: 'none',
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
      },
      transitionDuration: {
        fast: '150ms',
        normal: '300ms',
        slow: '500ms',
        slower: '750ms',
        slowest: '1000ms',
      },
      transitionTimingFunction: {
        'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideInFromBottom: {
          from: { 
            opacity: "0", 
            transform: "translateY(20px)" 
          },
          to: { 
            opacity: "1", 
            transform: "translateY(0)" 
          },
        },
        slideInFromTop: {
          from: { 
            opacity: "0", 
            transform: "translateY(-20px)" 
          },
          to: { 
            opacity: "1", 
            transform: "translateY(0)" 
          },
        },
        slideInFromLeft: {
          from: { 
            opacity: "0", 
            transform: "translateX(-20px)" 
          },
          to: { 
            opacity: "1", 
            transform: "translateX(0)" 
          },
        },
        slideInFromRight: {
          from: { 
            opacity: "0", 
            transform: "translateX(20px)" 
          },
          to: { 
            opacity: "1", 
            transform: "translateX(0)" 
          },
        },
        scaleIn: {
          from: { 
            opacity: "0", 
            transform: "scale(0.95)" 
          },
          to: { 
            opacity: "1", 
            transform: "scale(1)" 
          },
        },
        bounceIn: {
          "0%": {
            opacity: "0",
            transform: "scale(0.3)",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.05)",
          },
          "70%": {
            transform: "scale(0.9)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fadeIn 300ms ease-out",
        "slide-in-from-bottom": "slideInFromBottom 300ms ease-out",
        "slide-in-from-top": "slideInFromTop 300ms ease-out",
        "slide-in-from-left": "slideInFromLeft 300ms ease-out",
        "slide-in-from-right": "slideInFromRight 300ms ease-out",
        "scale-in": "scaleIn 300ms ease-out",
        "bounce-in": "bounceIn 500ms ease-out",
      },
    },
  },
  plugins: [],
} satisfies Config

export default config