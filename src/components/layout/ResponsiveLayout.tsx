/**
 * Enhanced Responsive Layout Component
 * 
 * Provides automatic device detection and adaptive layouts
 * with optimal user experience across all devices.
 * 
 * @version 2.0.0
 * @author Prism Writing Enterprise System
 */

'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import { useDeviceDetection, useBreakpoint, useTouchGestures } from '../../hooks/useDeviceDetection'
import { motion, AnimatePresence } from 'framer-motion'

interface ResponsiveLayoutProps {
  children: ReactNode
  enableTouchGestures?: boolean
  enableAutoOptimizations?: boolean
  showDeviceInfo?: boolean // For development/debugging
  className?: string
}

interface LayoutAdaptations {
  spacing: 'compact' | 'normal' | 'spacious'
  typography: 'small' | 'medium' | 'large'
  interactions: 'touch' | 'mouse' | 'hybrid'
  navigation: 'mobile' | 'tablet' | 'desktop'
  content: 'single-column' | 'two-column' | 'multi-column'
}

export function ResponsiveLayout({
  children,
  enableTouchGestures = true,
  enableAutoOptimizations = true,
  showDeviceInfo = false,
  className = '',
}: ResponsiveLayoutProps) {
  const deviceInfo = useDeviceDetection()
  const breakpoint = useBreakpoint()
  const { getTouchHandlers } = useTouchGestures()
  
  const [layoutAdaptations, setLayoutAdaptations] = useState<LayoutAdaptations>({
    spacing: 'normal',
    typography: 'medium',
    interactions: 'mouse',
    navigation: 'desktop',
    content: 'multi-column',
  })

  // Calculate layout adaptations based on device
  useEffect(() => {
    if (!enableAutoOptimizations) return

    const adaptations: LayoutAdaptations = {
      spacing: deviceInfo.isMobile ? 'compact' : deviceInfo.isTablet ? 'normal' : 'spacious',
      typography: deviceInfo.isMobile ? 'small' : deviceInfo.isTablet ? 'medium' : 'large',
      interactions: deviceInfo.isTouchDevice ? 'touch' : 'mouse',
      navigation: deviceInfo.isMobile ? 'mobile' : deviceInfo.isTablet ? 'tablet' : 'desktop',
      content: deviceInfo.isMobile ? 'single-column' : deviceInfo.isTablet ? 'two-column' : 'multi-column',
    }

    setLayoutAdaptations(adaptations)
  }, [deviceInfo, enableAutoOptimizations])

  // Touch gesture handlers
  const touchHandlers = enableTouchGestures 
    ? getTouchHandlers((direction) => {
        // Handle global swipe gestures
        console.log(`Global swipe: ${direction}`)
        // You can implement global navigation here
      })
    : {}

  // Dynamic CSS variables based on device
  const cssVariables = {
    '--spacing-unit': layoutAdaptations.spacing === 'compact' ? '0.75rem' : 
                     layoutAdaptations.spacing === 'spacious' ? '1.5rem' : '1rem',
    '--font-scale': layoutAdaptations.typography === 'small' ? '0.875' :
                   layoutAdaptations.typography === 'large' ? '1.125' : '1',
    '--touch-target': deviceInfo.isTouchDevice ? '44px' : '32px',
    '--animation-speed': deviceInfo.prefersReducedMotion ? '0ms' : '300ms',
    '--content-max-width': layoutAdaptations.content === 'single-column' ? '100%' :
                          layoutAdaptations.content === 'two-column' ? '768px' : '1200px',
  } as React.CSSProperties

  return (
    <div
      className={`
        responsive-layout
        ${getLayoutClasses(layoutAdaptations)}
        ${className}
      `}
      style={cssVariables}
      {...touchHandlers}
    >
      {/* Development Device Info Panel */}
      {showDeviceInfo && (
        <DeviceInfoPanel deviceInfo={deviceInfo} adaptations={layoutAdaptations} />
      )}

      {/* Optimized Content Rendering */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: deviceInfo.prefersReducedMotion ? 0 : 0.3,
          ease: 'easeOut' 
        }}
        className="responsive-content"
      >
        {children}
      </motion.div>

      {/* Performance Monitoring */}
      {enableAutoOptimizations && (
        <PerformanceMonitor deviceInfo={deviceInfo} />
      )}
    </div>
  )
}

/**
 * Device Information Panel (Development Tool)
 */
function DeviceInfoPanel({ 
  deviceInfo, 
  adaptations 
}: { 
  deviceInfo: any
  adaptations: LayoutAdaptations 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed top-4 left-4 z-50 bg-black/80 text-white p-3 rounded-lg text-xs font-mono max-w-xs"
    >
      <h4 className="font-bold mb-2">Device Info</h4>
      <div className="space-y-1">
        <div>Screen: {deviceInfo.screenSize}</div>
        <div>Type: {deviceInfo.isMobile ? 'Mobile' : deviceInfo.isTablet ? 'Tablet' : 'Desktop'}</div>
        <div>Touch: {deviceInfo.isTouchDevice ? 'Yes' : 'No'}</div>
        <div>Orientation: {deviceInfo.orientation}</div>
        <div>DPR: {deviceInfo.devicePixelRatio}</div>
        <div>Online: {deviceInfo.isOnline ? 'Yes' : 'No'}</div>
        <div>Motion: {deviceInfo.prefersReducedMotion ? 'Reduced' : 'Normal'}</div>
        <div>Theme: {deviceInfo.prefersDarkMode ? 'Dark' : 'Light'}</div>
      </div>
      
      <h4 className="font-bold mt-3 mb-2">Adaptations</h4>
      <div className="space-y-1">
        <div>Spacing: {adaptations.spacing}</div>
        <div>Typography: {adaptations.typography}</div>
        <div>Interactions: {adaptations.interactions}</div>
        <div>Navigation: {adaptations.navigation}</div>
        <div>Content: {adaptations.content}</div>
      </div>
    </motion.div>
  )
}

/**
 * Performance Monitoring Component
 */
function PerformanceMonitor({ deviceInfo }: { deviceInfo: any }) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Monitor performance metrics
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      
      entries.forEach((entry) => {
        // Log performance metrics for optimization
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming
          console.log('[Performance]:', {
            type: 'navigation',
            loadTime: navEntry.loadEventEnd - navEntry.loadEventStart,
            domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
            device: {
              mobile: deviceInfo.isMobile,
              connection: deviceInfo.connectionType,
            }
          })
        }
        
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('[Performance]: LCP', entry.startTime)
        }
        
        if (entry.entryType === 'first-input') {
          console.log('[Performance]: FID', (entry as any).processingStart - entry.startTime)
        }
        
        if (entry.entryType === 'layout-shift') {
          console.log('[Performance]: CLS', (entry as any).value)
        }
      })
    })

    // Observe different performance metrics
    try {
      observer.observe({ entryTypes: ['navigation', 'largest-contentful-paint', 'first-input', 'layout-shift'] })
    } catch (error) {
      console.warn('[Performance Monitor]: Some metrics not supported')
    }

    return () => observer.disconnect()
  }, [deviceInfo])

  return null
}

/**
 * Generate layout classes based on adaptations
 */
function getLayoutClasses(adaptations: LayoutAdaptations): string {
  const classes = []

  // Spacing classes
  classes.push(`spacing-${adaptations.spacing}`)

  // Typography classes
  classes.push(`typography-${adaptations.typography}`)

  // Interaction classes
  classes.push(`interactions-${adaptations.interactions}`)

  // Navigation classes
  classes.push(`navigation-${adaptations.navigation}`)

  // Content layout classes
  classes.push(`content-${adaptations.content}`)

  return classes.join(' ')
}

/**
 * Responsive Container Component
 */
export function ResponsiveContainer({
  children,
  maxWidth = 'auto',
  padding = 'auto',
  className = '',
}: {
  children: ReactNode
  maxWidth?: 'auto' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  padding?: 'auto' | 'none' | 'sm' | 'md' | 'lg'
  className?: string
}) {
  const { isMobile, isTablet } = useDeviceDetection()

  const getMaxWidth = () => {
    if (maxWidth === 'auto') {
      return isMobile ? 'max-w-full' : isTablet ? 'max-w-4xl' : 'max-w-6xl'
    }
    return `max-w-${maxWidth}`
  }

  const getPadding = () => {
    if (padding === 'auto') {
      return isMobile ? 'px-4' : isTablet ? 'px-6' : 'px-8'
    }
    if (padding === 'none') return ''
    return `px-${padding}`
  }

  return (
    <div className={`
      mx-auto
      ${getMaxWidth()}
      ${getPadding()}
      ${className}
    `}>
      {children}
    </div>
  )
}

/**
 * Responsive Grid Component
 */
export function ResponsiveGrid({
  children,
  columns = 'auto',
  gap = 'auto',
  className = '',
}: {
  children: ReactNode
  columns?: 'auto' | number | { mobile?: number; tablet?: number; desktop?: number }
  gap?: 'auto' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}) {
  const { isMobile, isTablet, isDesktop } = useDeviceDetection()

  const getGridColumns = () => {
    if (columns === 'auto') {
      return isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-3'
    }
    
    if (typeof columns === 'number') {
      return `grid-cols-${columns}`
    }

    if (typeof columns === 'object') {
      if (isMobile && columns.mobile) return `grid-cols-${columns.mobile}`
      if (isTablet && columns.tablet) return `grid-cols-${columns.tablet}`
      if (isDesktop && columns.desktop) return `grid-cols-${columns.desktop}`
    }

    return 'grid-cols-1'
  }

  const getGap = () => {
    if (gap === 'auto') {
      return isMobile ? 'gap-4' : isTablet ? 'gap-6' : 'gap-8'
    }
    return `gap-${gap}`
  }

  return (
    <div className={`
      grid
      ${getGridColumns()}
      ${getGap()}
      ${className}
    `}>
      {children}
    </div>
  )
}

export default ResponsiveLayout
