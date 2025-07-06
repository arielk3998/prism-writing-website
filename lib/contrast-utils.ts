/**
 * Contrast Utilities for Automatic Text Color Adjustment
 * 
 * These utilities help ensure proper text contrast based on background colors,
 * addressing the WCAG AA standards for accessibility.
 */

// Convert hex color to RGB
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// Calculate relative luminance
export function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Calculate contrast ratio between two colors
export function getContrastRatio(color1: { r: number; g: number; b: number }, color2: { r: number; g: number; b: number }): number {
  const lum1 = getLuminance(color1.r, color1.g, color1.b);
  const lum2 = getLuminance(color2.r, color2.g, color2.b);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

// Determine if a color is light or dark
export function isLightColor(r: number, g: number, b: number): boolean {
  const luminance = getLuminance(r, g, b);
  return luminance > 0.5;
}

// Get optimal text color for a given background
export function getOptimalTextColor(backgroundColor: string): string {
  const rgb = hexToRgb(backgroundColor);
  if (!rgb) return 'text-safe'; // fallback
  
  const isLight = isLightColor(rgb.r, rgb.g, rgb.b);
  return isLight ? 'text-safe' : 'text-white dark:text-gray-100';
}

// Get high contrast text color for highlights
export function getHighContrastTextColor(backgroundColor: string): string {
  const rgb = hexToRgb(backgroundColor);
  if (!rgb) return 'text-safe'; // fallback
  
  const isLight = isLightColor(rgb.r, rgb.g, rgb.b);
  return isLight ? 'text-safe' : 'text-white';
}

// Pre-defined color combinations that meet WCAG AA standards
export const accessibleColorCombinations = {
  // Light backgrounds
  'bg-blue-50': 'text-safe-accent dark:text-blue-100',
  'bg-indigo-50': 'text-indigo-900 dark:text-indigo-100',
  'bg-purple-50': 'text-purple-900 dark:text-purple-100',
  'bg-pink-50': 'text-pink-900 dark:text-pink-100',
  'bg-red-50': 'text-red-900 dark:text-red-100',
  'bg-orange-50': 'text-orange-900 dark:text-orange-100',
  'bg-yellow-50': 'text-yellow-900 dark:text-yellow-100',
  'bg-green-50': 'text-green-900 dark:text-green-100',
  'bg-teal-50': 'text-teal-900 dark:text-teal-100',
  'bg-cyan-50': 'text-cyan-900 dark:text-cyan-100',
  'bg-gray-50': 'text-safe',
  
  // Medium backgrounds
  'bg-blue-100': 'text-safe-accent dark:text-blue-100',
  'bg-indigo-100': 'text-indigo-900 dark:text-indigo-100',
  'bg-purple-100': 'text-purple-900 dark:text-purple-100',
  'bg-pink-100': 'text-pink-900 dark:text-pink-100',
  'bg-red-100': 'text-red-900 dark:text-red-100',
  'bg-orange-100': 'text-orange-900 dark:text-orange-100',
  'bg-yellow-100': 'text-yellow-900 dark:text-yellow-100',
  'bg-green-100': 'text-green-900 dark:text-green-100',
  'bg-teal-100': 'text-teal-900 dark:text-teal-100',
  'bg-cyan-100': 'text-cyan-900 dark:text-cyan-100',
  'bg-gray-100': 'text-safe',
  
  // Dark backgrounds
  'bg-blue-500': 'text-white',
  'bg-indigo-500': 'text-white',
  'bg-purple-500': 'text-white',
  'bg-pink-500': 'text-white',
  'bg-red-500': 'text-white',
  'bg-orange-500': 'text-white',
  'bg-yellow-500': 'text-black',
  'bg-green-500': 'text-white',
  'bg-teal-500': 'text-white',
  'bg-cyan-500': 'text-white',
  'bg-gray-500': 'text-white',
  
  // Very dark backgrounds
  'bg-blue-900': 'text-white',
  'bg-indigo-900': 'text-white',
  'bg-purple-900': 'text-white',
  'bg-pink-900': 'text-white',
  'bg-red-900': 'text-white',
  'bg-orange-900': 'text-white',
  'bg-yellow-900': 'text-white',
  'bg-green-900': 'text-white',
  'bg-teal-900': 'text-white',
  'bg-cyan-900': 'text-white',
  'bg-gray-900': 'text-white',
} as const;

// Helper function to get accessible text color for a background class
export function getAccessibleTextColor(backgroundClass: string): string {
  return accessibleColorCombinations[backgroundClass as keyof typeof accessibleColorCombinations] || 'text-safe';
}

// Create a highlight class with proper contrast
export function createHighlightClass(color: 'blue' | 'green' | 'purple' | 'yellow' | 'red' = 'blue'): string {
  const colorMap = {
    blue: 'bg-blue-50 dark:bg-blue-950/30 text-safe-accent dark:text-blue-100 border border-blue-200 dark:border-blue-800',
    green: 'bg-green-50 dark:bg-green-950/30 text-green-900 dark:text-green-100 border border-green-200 dark:border-green-800',
    purple: 'bg-purple-50 dark:bg-purple-950/30 text-purple-900 dark:text-purple-100 border border-purple-200 dark:border-purple-800',
    yellow: 'bg-yellow-50 dark:bg-yellow-950/30 text-yellow-900 dark:text-yellow-100 border border-yellow-200 dark:border-yellow-800',
    red: 'bg-red-50 dark:bg-red-950/30 text-red-900 dark:text-red-100 border border-red-200 dark:border-red-800',
  };
  
  return `${colorMap[color]} px-2 py-1 rounded-md`;
}
