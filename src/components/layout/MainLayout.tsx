/**
 * Main Layout Component
 * 
 * Provides automatic responsive behavior, enhanced accessibility,
 * and consistent user experience across all pages.
 * 
 * @version 2.0.0
 * @author Prism Writing Enterprise System
 */

'use client'

import React, { ReactNode } from 'react'
import { ResponsiveLayout } from './ResponsiveLayout'
import { usePathname } from 'next/navigation'
import { ThemeProvider } from '../providers/ThemeProvider'
import { useDeviceDetection } from '../../hooks/useDeviceDetection'

interface MainLayoutProps {
  children: ReactNode
  showNavigation?: boolean
  className?: string
}

export function MainLayout({
  children,
  showNavigation = false, // Disabled by default since pages handle their own navigation
  className = '',
}: MainLayoutProps) {
  const pathname = usePathname()
  const deviceInfo = useDeviceDetection()

  return (
    <ThemeProvider>
      <ResponsiveLayout
        enableTouchGestures={deviceInfo.isTouchDevice}
        enableAutoOptimizations={true}
        showDeviceInfo={process.env.NODE_ENV === 'development'}
        className={className}
      >
        {/* Main Content - No navigation here, pages handle their own */}
        <main 
          className={`
            min-h-screen
            bg-white dark:bg-gray-900
            text-safe
            transition-colors duration-300
          `}
          role="main"
          aria-label="Main content"
        >
          {children}
        </main>
      </ResponsiveLayout>
    </ThemeProvider>
  )
}

export default MainLayout
