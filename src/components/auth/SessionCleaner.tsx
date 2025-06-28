'use client'

import { useEffect } from 'react'

export default function SessionCleaner() {
  useEffect(() => {
    // Clear any existing authentication data on page load
    // This ensures fresh login is always required
    localStorage.removeItem('prism_user')
    localStorage.removeItem('prism_token')
    sessionStorage.removeItem('prism_user')
    sessionStorage.removeItem('prism_token')
    sessionStorage.removeItem('prism_login_time')
    
    // Clear on page unload/close for extra security
    const handleBeforeUnload = () => {
      localStorage.removeItem('prism_user')
      localStorage.removeItem('prism_token')
      sessionStorage.removeItem('prism_user')
      sessionStorage.removeItem('prism_token')
      sessionStorage.removeItem('prism_login_time')
    }
    
    // Clear on visibility change (tab switch, minimize, etc.)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // User switched tabs or minimized - clear session for security
        localStorage.removeItem('prism_user')
        localStorage.removeItem('prism_token')
        sessionStorage.removeItem('prism_user')
        sessionStorage.removeItem('prism_token')
        sessionStorage.removeItem('prism_login_time')
      }
    }
    
    window.addEventListener('beforeunload', handleBeforeUnload)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return null // This component doesn't render anything
}
