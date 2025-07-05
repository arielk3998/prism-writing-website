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
import Navigation from './Navigation'
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
  showNavigation = true,
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
        {/* Navigation */}
        {showNavigation && <Navigation currentPage={pathname} />}
        
        {/* Main Content */}
        <main 
          className={`
            min-h-screen
            ${showNavigation ? 'pt-16' : ''}
            bg-white dark:bg-gray-900
            text-gray-900 dark:text-gray-100
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
