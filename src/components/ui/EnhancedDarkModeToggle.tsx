/**
 * Enhanced Dark Mode Toggle Component
 * 
 * Provides an improved dark mode toggle with better visibility,
 * accessibility, and user experience enhancements.
 * 
 * @version 2.0.0
 * @author Prism Writing Enterprise System
 */

'use client'

import { useTheme } from '../providers/ThemeProvider'
import { useEffect, useState } from 'react'
import { useDeviceDetection } from '../../hooks/useDeviceDetection'
import { motion, AnimatePresence } from 'framer-motion'

interface EnhancedDarkModeToggleProps {
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  showTooltip?: boolean
  variant?: 'minimal' | 'prominent' | 'floating'
  className?: string
}

// Enhanced SVG icons with better visibility
const SunIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="5" strokeWidth="2" />
    <path strokeWidth="2" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
)

const MoonIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeWidth="2" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

const SystemIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" strokeWidth="2" />
    <line x1="8" y1="21" x2="16" y2="21" strokeWidth="2" />
    <line x1="12" y1="17" x2="12" y2="21" strokeWidth="2" />
  </svg>
)

export function EnhancedDarkModeToggle({
  size = 'md',
  showLabel = false,
  showTooltip = true,
  variant = 'minimal',
  className = '',
}: EnhancedDarkModeToggleProps) {
  const { theme, setTheme } = useTheme()
  const { prefersDarkMode, isMobile } = useDeviceDetection()
  const [mounted, setMounted] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
    
    // Check if user has set a theme preference
    const hasThemePreference = localStorage.getItem('prism-writing-theme')
    
    // Show system preference notification if no user preference and system prefers dark
    if (!hasThemePreference && prefersDarkMode && !hasUserInteracted) {
      setTimeout(() => setShowNotification(true), 2000)
    }
  }, [prefersDarkMode, hasUserInteracted])

  if (!mounted) {
    return (
      <div className={`${getSizeClasses(size)} ${getVariantClasses(variant)} ${className}`}>
        <SunIcon className={getIconSizeClasses(size)} />
      </div>
    )
  }

  const cycleTheme = () => {
    setHasUserInteracted(true)
    setShowNotification(false)
    
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  const getIcon = () => {
    if (theme === 'dark') {
      return <MoonIcon className={getIconSizeClasses(size)} />
    } else if (theme === 'light') {
      return <SunIcon className={getIconSizeClasses(size)} />
    } else {
      return <SystemIcon className={getIconSizeClasses(size)} />
    }
  }

  const getLabel = () => {
    if (theme === 'dark') return 'Switch to system theme'
    if (theme === 'light') return 'Switch to dark mode'
    return 'Switch to light mode'
  }

  const getCurrentModeLabel = () => {
    if (theme === 'dark') return 'Dark'
    if (theme === 'light') return 'Light'
    return 'Auto'
  }

  return (
    <div className="relative">
      {/* Main Toggle Button */}
      <motion.button
        onClick={cycleTheme}
        className={`
          relative inline-flex items-center justify-center
          transition-all duration-300 ease-out
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          disabled:pointer-events-none disabled:opacity-50
          group
          ${getSizeClasses(size)}
          ${getVariantClasses(variant)}
          ${className}
        `}
        aria-label={getLabel()}
        title={showTooltip ? getLabel() : undefined}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Background glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
          initial={false}
          animate={{ opacity: variant === 'prominent' ? 0.1 : 0 }}
        />
        
        {/* Icon container */}
        <motion.div
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="relative z-10"
        >
          {getIcon()}
        </motion.div>

        {/* Label for prominent variant */}
        {showLabel && (
          <span className={`
            ml-2 font-medium transition-colors duration-300
            ${size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'}
          `}>
            {getCurrentModeLabel()}
          </span>
        )}

        {/* Screen reader only text */}
        <span className="sr-only">{getLabel()}</span>
      </motion.button>

      {/* System Preference Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className={`
              absolute z-50 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600
              rounded-lg shadow-lg max-w-xs
              ${isMobile ? 'right-0 top-12' : 'left-1/2 transform -translate-x-1/2 top-12'}
            `}
          >
            <div className="flex items-start space-x-2">
              <div className="text-safe-accent mt-0.5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-safe font-medium">
                  Dark mode detected
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Your system prefers dark mode. Click to switch themes.
                </p>
                <button
                  onClick={() => setShowNotification(false)}
                  className="text-xs text-safe-accent hover:underline mt-1"
                >
                  Got it
                </button>
              </div>
            </div>
            
            {/* Arrow pointing to toggle */}
            <div className={`
              absolute w-2 h-2 bg-white dark:bg-gray-800 border-t border-l border-gray-200 dark:border-gray-600
              transform rotate-45
              ${isMobile ? 'top-3 -left-1' : 'top-3 left-1/2 -translate-x-1/2'}
            `} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Size utility functions
function getSizeClasses(size: 'sm' | 'md' | 'lg') {
  switch (size) {
    case 'sm':
      return 'h-7 w-7 text-sm'
    case 'lg':
      return 'h-11 w-11 text-lg'
    default:
      return 'h-9 w-9 text-base'
  }
}

function getIconSizeClasses(size: 'sm' | 'md' | 'lg') {
  switch (size) {
    case 'sm':
      return 'h-3 w-3'
    case 'lg':
      return 'h-5 w-5'
    default:
      return 'h-4 w-4'
  }
}

function getVariantClasses(variant: 'minimal' | 'prominent' | 'floating') {
  const baseClasses = 'rounded-full border transition-all duration-300'
  
  switch (variant) {
    case 'prominent':
      return `${baseClasses} 
        bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20
        border-blue-200 dark:border-blue-700
        text-safe-accent
        shadow-md hover:shadow-lg
        hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30`
    case 'floating':
      return `${baseClasses}
        bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm
        border-gray-200/50 dark:border-gray-600/50
        text-safe
        shadow-lg hover:shadow-xl
        hover:bg-white/90 dark:hover:bg-gray-800/90`
    default:
      return `${baseClasses}
        bg-transparent
        border-gray-300 dark:border-gray-600
        text-safe
        hover:bg-gray-100 dark:hover:bg-gray-800
        hover:border-gray-400 dark:hover:border-gray-500`
  }
}

export default EnhancedDarkModeToggle
