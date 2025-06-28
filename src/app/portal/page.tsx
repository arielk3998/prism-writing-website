'use client'

import Navigation from '../../components/layout/Navigation'
import LoginForm from '../../components/auth/LoginForm'
import Dashboard from '../../components/portal/Dashboard'
import { useAuth } from '../../hooks/useAuth'

export default function Portal() {
  const { user, isAuthenticated, logout } = useAuth()

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <Navigation currentPage="/portal" />
        
        <div className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Member Portal
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Sign in to access your dashboard and files
              </p>
            </div>
            
            <LoginForm />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation currentPage="/portal" />
      
      {/* Portal Header */}
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome back, {user?.name || 'Member'}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Member Portal Dashboard
              </p>
            </div>
            
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Dashboard user={user} />
      </div>
    </div>
  )
}
