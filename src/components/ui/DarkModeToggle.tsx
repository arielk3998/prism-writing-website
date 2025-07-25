'use client'

import { useTheme } from '../providers/ThemeProvider'
import { useEffect, useState } from 'react'

// Inline SVG icons to avoid external dependencies
const SunIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
)

const MoonIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

export function DarkModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        className="relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-transparent text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        aria-label="Toggle theme"
      >
        <SunIcon />
      </button>
    )
  }

  const toggleTheme = () => {
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
      return <MoonIcon />
    } else if (theme === 'light') {
      return <SunIcon />
    } else {
      // System theme - show appropriate icon based on actual preference
      const systemIsDark = typeof window !== 'undefined' && 
        window.matchMedia('(prefers-color-scheme: dark)').matches
      return systemIsDark ? <MoonIcon /> : <SunIcon />
    }
  }

  const getLabel = () => {
    if (theme === 'dark') return 'Switch to system theme'
    if (theme === 'light') return 'Switch to dark mode'
    return 'Switch to light mode'
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-transparent text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      aria-label={getLabel()}
      title={getLabel()}
    >
      <span className="sr-only">{getLabel()}</span>
      {getIcon()}
    </button>
  )
}
