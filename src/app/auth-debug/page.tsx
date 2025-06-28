'use client'

import { useAuth } from '../../hooks/useAuth'

export default function AuthDebug() {
  const { user, isAuthenticated, logout } = useAuth()

  const clearAllAuthData = () => {
    // Clear all authentication data
    localStorage.removeItem('prism_user')
    localStorage.removeItem('prism_token')
    // Force page reload to reset state
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Authentication Debug
        </h2>
        
        <div className="space-y-4">
          <div>
            <strong>Authentication Status:</strong> {isAuthenticated ? 'Logged In' : 'Not Logged In'}
          </div>
          
          {user && (
            <div>
              <strong>Current User:</strong>
              <div className="ml-4 text-sm text-gray-600 dark:text-gray-400">
                <div>Name: {user.name}</div>
                <div>Email: {user.email}</div>
                <div>Role: {user.role}</div>
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <button
              onClick={logout}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Standard Logout
            </button>
            
            <button
              onClick={clearAllAuthData}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Force Clear All Auth Data
            </button>
          </div>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Use this page to clear any cached authentication data if you&apos;re having login issues.
          </div>
        </div>
      </div>
    </div>
  )
}
