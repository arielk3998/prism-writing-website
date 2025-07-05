/**
 * Device Detection and Mobile Optimization Hook
 * 
 * Provides intelligent device detection, automatic mobile optimizations,
 * and progressive enhancement based on device capabilities.
 * 
 * @version 1.0.0
 * @author Prism Writing Enterprise System
 */

'use client'

import { useState, useEffect } from 'react'

export interface DeviceInfo {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isTouchDevice: boolean
  isIOSDevice: boolean
  isAndroidDevice: boolean
  screenSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  orientation: 'portrait' | 'landscape'
  isOnline: boolean
  prefersReducedMotion: boolean
  prefersDarkMode: boolean
  devicePixelRatio: number
  connectionType?: string
}

export interface OptimizedSettings {
  shouldUseAnimations: boolean
  shouldLoadHighResImages: boolean
  shouldEnableParallax: boolean
  shouldPreloadContent: boolean
  recommendedChunkSize: number
  maxImageQuality: number
}

/**
 * Custom hook for comprehensive device detection and optimization
 */
export const useDeviceDetection = (): DeviceInfo & { optimizations: OptimizedSettings } => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isTouchDevice: false,
    isIOSDevice: false,
    isAndroidDevice: false,
    screenSize: 'lg',
    orientation: 'landscape',
    isOnline: true,
    prefersReducedMotion: false,
    prefersDarkMode: false,
    devicePixelRatio: 1,
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateDeviceInfo = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const userAgent = window.navigator.userAgent

      // Screen size detection
      let screenSize: DeviceInfo['screenSize'] = 'lg'
      if (width < 640) screenSize = 'xs'
      else if (width < 768) screenSize = 'sm'
      else if (width < 1024) screenSize = 'md'
      else if (width < 1280) screenSize = 'lg'
      else if (width < 1536) screenSize = 'xl'
      else screenSize = '2xl'

      // Device type detection
      const isMobile = width <= 768
      const isTablet = width > 768 && width <= 1024
      const isDesktop = width > 1024

      // Touch device detection
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

      // Platform detection
      const isIOSDevice = /iPad|iPhone|iPod/.test(userAgent)
      const isAndroidDevice = /Android/.test(userAgent)

      // Orientation detection
      const orientation = height > width ? 'portrait' : 'landscape'

      // System preferences
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches

      // Network and performance info
      const isOnline = navigator.onLine
      const devicePixelRatio = window.devicePixelRatio || 1

      // Connection type (if available)
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection
      const connectionType = connection ? connection.effectiveType : undefined

      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        isTouchDevice,
        isIOSDevice,
        isAndroidDevice,
        screenSize,
        orientation,
        isOnline,
        prefersReducedMotion,
        prefersDarkMode,
        devicePixelRatio,
        connectionType,
      })
    }

    // Initial detection
    updateDeviceInfo()

    // Event listeners for changes
    window.addEventListener('resize', updateDeviceInfo)
    window.addEventListener('orientationchange', updateDeviceInfo)
    window.addEventListener('online', updateDeviceInfo)
    window.addEventListener('offline', updateDeviceInfo)

    // Media query listeners
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      setDeviceInfo(prev => ({ ...prev, prefersReducedMotion: e.matches }))
    }
    
    const handleDarkModeChange = (e: MediaQueryListEvent) => {
      setDeviceInfo(prev => ({ ...prev, prefersDarkMode: e.matches }))
    }

    reducedMotionQuery.addEventListener('change', handleReducedMotionChange)
    darkModeQuery.addEventListener('change', handleDarkModeChange)

    return () => {
      window.removeEventListener('resize', updateDeviceInfo)
      window.removeEventListener('orientationchange', updateDeviceInfo)
      window.removeEventListener('online', updateDeviceInfo)
      window.removeEventListener('offline', updateDeviceInfo)
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange)
      darkModeQuery.removeEventListener('change', handleDarkModeChange)
    }
  }, [])

  // Calculate optimized settings based on device capabilities
  const optimizations: OptimizedSettings = {
    shouldUseAnimations: !deviceInfo.prefersReducedMotion && deviceInfo.isOnline,
    shouldLoadHighResImages: deviceInfo.devicePixelRatio > 1 && !deviceInfo.isMobile && deviceInfo.isOnline,
    shouldEnableParallax: deviceInfo.isDesktop && !deviceInfo.prefersReducedMotion,
    shouldPreloadContent: deviceInfo.isDesktop && deviceInfo.isOnline,
    recommendedChunkSize: deviceInfo.isMobile ? 50 : deviceInfo.isTablet ? 100 : 200,
    maxImageQuality: deviceInfo.isMobile ? 70 : deviceInfo.isTablet ? 85 : 95,
  }

  return {
    ...deviceInfo,
    optimizations,
  }
}

/**
 * Hook for responsive breakpoint detection
 */
export const useBreakpoint = () => {
  const { screenSize } = useDeviceDetection()
  
  return {
    isXs: screenSize === 'xs',
    isSm: screenSize === 'sm',
    isMd: screenSize === 'md',
    isLg: screenSize === 'lg',
    isXl: screenSize === 'xl',
    is2Xl: screenSize === '2xl',
    isMobileOrTablet: screenSize === 'xs' || screenSize === 'sm' || screenSize === 'md',
    isDesktopOrLarger: screenSize === 'lg' || screenSize === 'xl' || screenSize === '2xl',
  }
}

/**
 * Hook for touch gesture support
 */
export const useTouchGestures = () => {
  const { isTouchDevice } = useDeviceDetection()
  
  const getTouchHandlers = (onSwipe?: (direction: 'left' | 'right' | 'up' | 'down') => void) => {
    if (!isTouchDevice || !onSwipe) return {}
    
    let touchStartX = 0
    let touchStartY = 0
    
    return {
      onTouchStart: (e: React.TouchEvent) => {
        touchStartX = e.touches[0].clientX
        touchStartY = e.touches[0].clientY
      },
      onTouchEnd: (e: React.TouchEvent) => {
        const touchEndX = e.changedTouches[0].clientX
        const touchEndY = e.changedTouches[0].clientY
        const deltaX = touchEndX - touchStartX
        const deltaY = touchEndY - touchStartY
        const minSwipeDistance = 50
        
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          if (Math.abs(deltaX) > minSwipeDistance) {
            onSwipe(deltaX > 0 ? 'right' : 'left')
          }
        } else {
          if (Math.abs(deltaY) > minSwipeDistance) {
            onSwipe(deltaY > 0 ? 'down' : 'up')
          }
        }
      },
    }
  }
  
  return { getTouchHandlers, isTouchDevice }
}

/**
 * Hook for adaptive loading based on device capabilities
 */
export const useAdaptiveLoading = () => {
  const { optimizations, isOnline, connectionType } = useDeviceDetection()
  
  const shouldLoadResource = (priority: 'high' | 'medium' | 'low') => {
    if (!isOnline) return false
    
    switch (priority) {
      case 'high':
        return true
      case 'medium':
        return optimizations.shouldPreloadContent || connectionType !== 'slow-2g'
      case 'low':
        return optimizations.shouldPreloadContent && connectionType !== 'slow-2g' && connectionType !== '2g'
      default:
        return true
    }
  }
  
  const getImageQuality = () => optimizations.maxImageQuality
  
  const getChunkSize = () => optimizations.recommendedChunkSize
  
  return {
    shouldLoadResource,
    getImageQuality,
    getChunkSize,
    optimizations,
  }
}

export default useDeviceDetection
