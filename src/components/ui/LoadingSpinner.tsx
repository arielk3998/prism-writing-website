/**
 * Loading Spinner Component
 * 
 * Accessible loading indicator with proper ARIA attributes and visual feedback.
 * Supports different sizes and variants for various use cases.
 * 
 * @module LoadingSpinner
 * @version 1.0.0
 */

'use client';

import React from 'react';
import { cn } from '../../lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'light' | 'dark';
  className?: string;
  label?: string;
  showLabel?: boolean;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12'
};

const variantClasses = {
  primary: 'text-blue-600 dark:text-blue-400',
  secondary: 'text-muted-foreground',
  light: 'text-white',
  dark: 'text-gray-900'
};

export function LoadingSpinner({ 
  size = 'md', 
  variant = 'primary', 
  className = '',
  label = 'Loading...',
  showLabel = false 
}: LoadingSpinnerProps) {
  const spinnerClasses = cn(
    'animate-spin',
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  return (
    <div className="flex items-center justify-center space-x-2" role="status" aria-live="polite">
      <svg
        className={spinnerClasses}
        fill="none"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          className="opacity-25"
        />
        <path
          fill="currentColor"
          d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          className="opacity-75"
        />
      </svg>
      {showLabel && (
        <span className={cn(
          'text-sm font-medium',
          variantClasses[variant],
          'sr-only sm:not-sr-only'
        )}>
          {label}
        </span>
      )}
      <span className="sr-only">{label}</span>
    </div>
  );
}

// Page-level loading component
export function PageLoader({ message = 'Loading page...' }: { message?: string }) {
  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"
      role="status"
      aria-live="polite"
    >
      <div className="text-center">
        <LoadingSpinner size="xl" showLabel />
        <p className="mt-4 text-lg text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

// Inline loading component for buttons and small areas
export function InlineLoader({ 
  size = 'sm', 
  variant = 'light',
  className = '' 
}: Pick<LoadingSpinnerProps, 'size' | 'variant' | 'className'>) {
  return (
    <LoadingSpinner 
      size={size} 
      variant={variant} 
      className={className}
      label="Loading"
    />
  );
}

// Section loading component
export function SectionLoader({ 
  message = 'Loading content...',
  height = '200px' 
}: { 
  message?: string; 
  height?: string; 
}) {
  return (
    <div 
      className="flex items-center justify-center bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
      style={{ minHeight: height }}
      role="status"
      aria-live="polite"
    >
      <div className="text-center">
        <LoadingSpinner size="lg" showLabel />
        <p className="mt-2 text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

export default LoadingSpinner;
