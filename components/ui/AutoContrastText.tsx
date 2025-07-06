import React from 'react';
import { getAccessibleTextColor, createHighlightClass } from '../../lib/contrast-utils';

interface AutoContrastTextProps {
  children: React.ReactNode;
  backgroundColor?: string;
  className?: string;
  as?: React.ElementType;
}

/**
 * AutoContrastText component that automatically adjusts text color
 * based on background color for optimal readability
 */
export function AutoContrastText({ 
  children, 
  backgroundColor = 'bg-white', 
  className = '',
  as: Component = 'span'
}: AutoContrastTextProps) {
  const textColor = getAccessibleTextColor(backgroundColor);
  const combinedClassName = `${textColor} ${className}`.trim();

  return React.createElement(Component, { className: combinedClassName }, children);
}

interface HighlightTextProps {
  children: React.ReactNode;
  color?: 'blue' | 'green' | 'purple' | 'yellow' | 'red';
  className?: string;
}

/**
 * HighlightText component with guaranteed high contrast
 */
export function HighlightText({ 
  children, 
  color = 'blue', 
  className = '' 
}: HighlightTextProps) {
  const highlightClass = createHighlightClass(color);
  const combinedClassName = `${highlightClass} ${className}`.trim();

  return <span className={combinedClassName}>{children}</span>;
}

interface SafeTextProps {
  children: React.ReactNode;
  onBackground?: 'light' | 'dark' | 'auto';
  className?: string;
  as?: React.ElementType;
}

/**
 * SafeText component that ensures readable text in any context
 */
export function SafeText({ 
  children, 
  onBackground = 'auto', 
  className = '',
  as: Component = 'span'
}: SafeTextProps) {
  let textColor = '';
  
  switch (onBackground) {
    case 'light':
      textColor = 'text-safe';
      break;
    case 'dark':
      textColor = 'text-white dark:text-gray-100';
      break;
    default:
      textColor = 'text-safe';
  }
  
  const combinedClassName = `${textColor} ${className}`.trim();

  return React.createElement(Component, { className: combinedClassName }, children);
}

// Pre-built components for common use cases
export const BlueHighlight = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <HighlightText color="blue" className={className}>{children}</HighlightText>
);

export const GreenHighlight = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <HighlightText color="green" className={className}>{children}</HighlightText>
);

export const YellowHighlight = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <HighlightText color="yellow" className={className}>{children}</HighlightText>
);

export const PurpleHighlight = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <HighlightText color="purple" className={className}>{children}</HighlightText>
);

export const RedHighlight = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <HighlightText color="red" className={className}>{children}</HighlightText>
);
