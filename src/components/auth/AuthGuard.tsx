/**
 * Strict Authentication Guard Component
 * 
 * Enforces role-based access control and workspace isolation.
 * Users must login to access protected areas with proper permissions.
 * 
 * @version 2.0.0
 * @author Prism Writing Enterprise System
 */

'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { UserRole } from '../../lib/auth'
import { 
  getCurrentUserClient, 
  hasPermission, 
  hasWorkspaceAccess, 
  isAuthenticated, 
  isSessionExpired,
  ClientUser 
} from '../../lib/clientAuth'
import AuthenticationPage from './AuthenticationPage'
import { motion, AnimatePresence } from 'framer-motion'

interface AuthGuardProps {
  children: ReactNode
  requiredRole?: UserRole | UserRole[]
  requiredPermissions?: string[]
  workspaceId?: string
  redirectTo?: string
  showLoading?: boolean
}

interface AuthState {
  user: ClientUser | null
  isLoading: boolean
  isAuthenticated: boolean
  hasAccess: boolean
}

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  '/',
  '/services',
  '/portfolio', 
  '/contact',
  '/translation-quote',
  '/translation-services',
  '/resources',
  '/auth'
]

// Route access configuration
const ROUTE_ACCESS: Record<string, { roles: UserRole[], workspace?: string }> = {
  '/portal': { roles: ['SUPER_ADMIN', 'ADMIN', 'MEMBER'] },
  '/dashboard': { roles: ['SUPER_ADMIN', 'ADMIN', 'MEMBER'] },
  '/admin': { roles: ['SUPER_ADMIN', 'ADMIN'] },
  '/client-portal': { roles: ['SUPER_ADMIN', 'ADMIN', 'CLIENT'] },
  '/client-dashboard': { roles: ['SUPER_ADMIN', 'ADMIN', 'CLIENT'] },
}

export function AuthGuard({
  children,
  requiredRole,
  requiredPermissions = [],
  workspaceId,
  redirectTo = '/auth',
  showLoading = true,
}: AuthGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    hasAccess: false,
  })

  // Check authentication and permissions
  useEffect(() => {
    async function checkAuth() {
      try {
        // Skip auth check for public routes
        if (PUBLIC_ROUTES.includes(pathname)) {
          setAuthState({
            user: null,
            isLoading: false,
            isAuthenticated: false,
            hasAccess: true, // Public access
          })
          return
        }

        // Check if user is authenticated
        if (!isAuthenticated() || isSessionExpired()) {
          setAuthState({
            user: null,
            isLoading: false,
            isAuthenticated: false,
            hasAccess: false,
          })
          return
        }

        // Get current user
        const user = getCurrentUserClient()
        
        if (!user) {
          setAuthState({
            user: null,
            isLoading: false,
            isAuthenticated: false,
            hasAccess: false,
          })
          return
        }

        // Check route-specific access
        const routeConfig = ROUTE_ACCESS[pathname]
        let hasRouteAccess = true
        
        if (routeConfig) {
          hasRouteAccess = routeConfig.roles.includes(user.role)
          
          // Check workspace isolation for clients
          if (user.role === 'CLIENT' && workspaceId && !hasWorkspaceAccess(user, workspaceId)) {
            hasRouteAccess = false
          }
        }

        // Check specific role requirements
        if (requiredRole) {
          const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole]
          if (!allowedRoles.includes(user.role)) {
            hasRouteAccess = false
          }
        }

        // Check specific permission requirements
        if (requiredPermissions.length > 0) {
          const hasAllPermissions = requiredPermissions.every(permission => 
            hasPermission(user, permission)
          )
          if (!hasAllPermissions) {
            hasRouteAccess = false
          }
        }

        setAuthState({
          user,
          isLoading: false,
          isAuthenticated: true,
          hasAccess: hasRouteAccess,
        })

      } catch (error) {
        console.error('[Auth Guard] Authentication check failed:', error)
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
          hasAccess: false,
        })
      }
    }

    checkAuth()
  }, [pathname, requiredRole, requiredPermissions, workspaceId])

  // Loading state
  if (authState.isLoading && showLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-safe-muted">Authenticating...</p>
        </motion.div>
      </div>
    )
  }

  // Not authenticated - show login
  if (!authState.isAuthenticated && !PUBLIC_ROUTES.includes(pathname)) {
    return <AuthenticationPage />
  }

  // Authenticated but no access - show forbidden
  if (authState.isAuthenticated && !authState.hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-md w-full text-center"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="text-safe-error text-6xl mb-4">🚫</div>
            <h2 className="text-2xl font-bold text-safe mb-4">
              Access Denied
            </h2>
            <p className="text-safe-muted mb-6">
              You don't have permission to access this area. Please contact your administrator if you believe this is an error.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => router.back()}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Go Back
              </button>
              <button
                onClick={() => router.push('/')}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Return Home
              </button>
            </div>
            {authState.user && (
              <div className="mt-6 text-sm text-safe-muted">
                Logged in as: {authState.user.email} ({authState.user.role})
              </div>
            )}
          </div>
        </motion.div>
      </div>
    )
  }

  // Authenticated and has access - render children
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default AuthGuard
