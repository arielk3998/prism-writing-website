'use client'

interface PasswordProtectionProps {
  children: React.ReactNode
}

/**
 * Password Protection Component - DISABLED
 * 
 * This component previously provided password protection for the site.
 * Password protection has been removed as requested - the site is now publicly accessible.
 */
export function PasswordProtection({ children }: PasswordProtectionProps) {
  // Password protection removed - site is now publicly accessible
  return <>{children}</>
}
