'use client'

import Navigation from '../../components/layout/Navigation'
import AuthenticationPage from '../../components/auth/AuthenticationPage'
import Dashboard from '../../components/portal/Dashboard'
import WorkRequestForm from '../../components/client/WorkRequestForm'
import { useAuth } from '../../hooks/useAuth'
import { useState } from 'react'

export default function Portal() {
  const { user, isAuthenticated, logout } = useAuth()
  const [activeTab, setActiveTab] = useState<'dashboard' | 'work-request'>('dashboard')

  if (!isAuthenticated) {
    return <AuthenticationPage />
  }

  const isClient = user?.role === 'client'

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation currentPage="/portal" />
      
      {/* Portal Header */}
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome back, {user?.name || 'User'}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {user?.role === 'client' ? 'Client Portal' : 
                 user?.role === 'admin' ? 'Admin Dashboard' : 
                 'Member Portal'} Dashboard
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {/* Tab Navigation for Clients */}
              {isClient && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === 'dashboard'
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                    }`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => setActiveTab('work-request')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === 'work-request'
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                    }`}
                  >
                    New Request
                  </button>
                </div>
              )}
              
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Portal Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isClient && activeTab === 'work-request' ? (
          <WorkRequestForm />
        ) : (
          <Dashboard user={user} />
        )}
      </div>
    </div>
  )
}
