'use client'

import { useTheme } from '@/src/components/providers/ThemeProvider'
import { useEffect, useState } from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'

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
        <Sun className="h-4 w-4" />
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
      return <Moon className="h-4 w-4" />
    } else if (theme === 'light') {
      return <Sun className="h-4 w-4" />
    } else {
      return <Monitor className="h-4 w-4" />
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
