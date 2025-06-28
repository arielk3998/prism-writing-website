'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'member' | 'client'
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  updateUser: (user: User) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    checkExistingSession()
  }, [])

  const checkExistingSession = async () => {
    try {
      // SECURITY: Disable persistent sessions - always require fresh login
      // This ensures coop members and all users must authenticate each time
      
      // Clear any existing stored data to force fresh login
      localStorage.removeItem('prism_user')
      localStorage.removeItem('prism_token')
      sessionStorage.removeItem('prism_user')
      sessionStorage.removeItem('prism_token')
      
      // Always start with no user - require fresh authentication
      setUser(null)
    } catch (error) {
      console.error('Session check failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true)
      
      // For demo purposes, we'll simulate authentication
      // In production, this would call your authentication API
      const demoUsers = [
        {
          id: '1',
          name: 'Ariel Karagodskiy',
          email: 'Ariel.karagodskiy@gmail.com',
          role: 'admin' as const,
          password: 'Merlak0105!'
        },
        {
          id: '2',
          name: 'Margot',
          email: 'MMRK2015@gmail.com',
          role: 'admin' as const,
          password: 'Margot93!'
        },
        {
          id: '3',
          name: 'Admin User',
          email: 'admin@prismwriting.com',
          role: 'admin' as const,
          password: 'admin123'
        },
        {
          id: '4', 
          name: 'Team Member',
          email: 'member@prismwriting.com',
          role: 'member' as const,
          password: 'member123'
        },
        {
          id: '5',
          name: 'Client User',
          email: 'client@example.com', 
          role: 'client' as const,
          password: 'client123'
        }
      ]

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      const foundUser = demoUsers.find(
        u => u.email === email && u.password === password
      )

      if (foundUser) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPassword } = foundUser
        setUser(userWithoutPassword)
        
        // SECURITY: Use sessionStorage only (clears when browser/tab closes)
        // Do NOT store in localStorage for persistent sessions
        sessionStorage.setItem('prism_user', JSON.stringify(userWithoutPassword))
        sessionStorage.setItem('prism_token', 'demo-token-' + foundUser.id)
        sessionStorage.setItem('prism_login_time', Date.now().toString())
        
        // Set automatic logout after 2 hours for security
        setTimeout(() => {
          logout()
          alert('Session expired for security. Please log in again.')
        }, 2 * 60 * 60 * 1000) // 2 hours
        
        return true
      }
      
      return false
    } catch (error) {
      console.error('Login failed:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    // Clear all possible storage locations
    localStorage.removeItem('prism_user')
    localStorage.removeItem('prism_token')
    sessionStorage.removeItem('prism_user')
    sessionStorage.removeItem('prism_token')
    sessionStorage.removeItem('prism_login_time')
    
    // Force page reload to ensure clean state
    window.location.href = '/portal'
  }

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser)
    // Only update session storage, not localStorage
    sessionStorage.setItem('prism_user', JSON.stringify(updatedUser))
  }

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    updateUser
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
