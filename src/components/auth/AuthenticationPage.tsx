'use client'

import { useState } from 'react'
import LoginForm from '../auth/LoginForm'
import RegisterForm from '../auth/RegisterForm'

export default function AuthenticationPage() {
  const [mode, setMode] = useState<'login' | 'register-member' | 'register-client'>('login')
  const [showSuccess, setShowSuccess] = useState(false)

  const handleRegistrationSuccess = () => {
    setShowSuccess(true)
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-8 text-center">
            <div className="text-green-600 dark:text-green-400 text-5xl mb-4">✓</div>
            <h2 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2">
              Registration Submitted!
            </h2>
            <p className="text-green-700 dark:text-green-300 mb-6">
              {mode === 'register-member' 
                ? 'Your application has been submitted for review by our cooperative members.'
                : 'Your client account has been created. Please check your email for verification instructions.'
              }
            </p>
            <button
              onClick={() => {
                setShowSuccess(false)
                setMode('login')
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Continue to Login
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Prism Writing Collective
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {mode === 'login' && 'Welcome back to your account'}
            {mode === 'register-member' && 'Join our writing cooperative'}
            {mode === 'register-client' && 'Get started with professional writing services'}
          </p>
        </div>

        {/* Mode Selection Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-6">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-3 px-4 text-sm font-medium text-center rounded-tl-lg ${
                mode === 'login'
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('register-member')}
              className={`flex-1 py-3 px-4 text-sm font-medium text-center ${
                mode === 'register-member'
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Join Coop
            </button>
            <button
              onClick={() => setMode('register-client')}
              className={`flex-1 py-3 px-4 text-sm font-medium text-center rounded-tr-lg ${
                mode === 'register-client'
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              I Need Writing
            </button>
          </div>
        </div>

        {/* Form Content */}
        {mode === 'login' && <LoginForm />}
        {mode === 'register-member' && (
          <RegisterForm 
            userType="member" 
            onSuccess={handleRegistrationSuccess}
          />
        )}
        {mode === 'register-client' && (
          <RegisterForm 
            userType="client" 
            onSuccess={handleRegistrationSuccess}
          />
        )}

        {/* Additional Information */}
        <div className="mt-8 text-center">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
              {mode === 'register-member' ? 'Why Join Our Cooperative?' : mode === 'register-client' ? 'Why Choose Us?' : 'Need Help?'}
            </h3>
            <div className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
              {mode === 'register-member' && (
                <>
                  <div>• Collaborative ownership and decision-making</div>
                  <div>• Fair profit sharing and transparent compensation</div>
                  <div>• Professional development and peer support</div>
                  <div>• Flexible work arrangements</div>
                </>
              )}
              {mode === 'register-client' && (
                <>
                  <div>• Professional writers with diverse expertise</div>
                  <div>• Collaborative approach to your projects</div>
                  <div>• Transparent pricing and timelines</div>
                  <div>• Direct communication with your writers</div>
                </>
              )}
              {mode === 'login' && (
                <>
                  <div>Forgot your password? Contact support</div>
                  <div>Need technical help? Check our FAQ</div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
