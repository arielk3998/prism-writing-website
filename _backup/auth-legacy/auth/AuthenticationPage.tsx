'use client'

import { useState } from 'react'
import LoginForm from '../auth/LoginForm'
import RegisterForm from '../auth/RegisterForm'
import { GreenHighlight, SafeText } from '../../../components/ui/AutoContrastText'

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
            <GreenHighlight className="text-5xl mb-4">✓</GreenHighlight>
            <SafeText as="h2" className="text-xl font-semibold mb-2">
              Registration Submitted!
            </SafeText>
            <SafeText as="p" className="mb-6">
              {mode === 'register-member' 
                ? 'Your application has been submitted for review by our cooperative members.'
                : 'Your client account has been created. Please check your email for verification instructions.'
              }
            </SafeText>
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
          <h1 className="text-3xl font-bold text-safe mb-2">
            Prism Writing Collective
          </h1>
          <p className="text-safe-muted">
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
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-safe-accent border-b-2 border-blue-600'
                  : 'text-safe-muted hover:text-safe dark:hover:text-safe-muted'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('register-member')}
              className={`flex-1 py-3 px-4 text-sm font-medium text-center ${
                mode === 'register-member'
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-safe-accent border-b-2 border-blue-600'
                  : 'text-safe-muted hover:text-safe dark:hover:text-safe-muted'
              }`}
            >
              Join Coop
            </button>
            <button
              onClick={() => setMode('register-client')}
              className={`flex-1 py-3 px-4 text-sm font-medium text-center rounded-tr-lg ${
                mode === 'register-client'
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-safe-accent border-b-2 border-blue-600'
                  : 'text-safe-muted hover:text-safe dark:hover:text-safe-muted'
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
            <h3 className="text-sm font-medium text-safe-accent dark:text-blue-200 mb-2">
              {mode === 'register-member' ? 'Why Join Our Cooperative?' : mode === 'register-client' ? 'Why Choose Us?' : 'Need Help?'}
            </h3>
            <div className="text-xs text-safe-accent space-y-1">
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
