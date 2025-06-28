'use client'

import { useState, useEffect } from 'react'
import { AnimatedLogo } from '../ui/AnimatedLogo'

interface PasswordProtectionProps {
  children: React.ReactNode
  password?: string
}

export function PasswordProtection({ children, password = 'prism2024' }: PasswordProtectionProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [inputPassword, setInputPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Check if already authenticated in session storage
    const authenticated = sessionStorage.getItem('prism-authenticated')
    if (authenticated === 'true') {
      setIsAuthenticated(true)
      setShowContent(true)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simulate API call delay for dramatic effect
    await new Promise(resolve => setTimeout(resolve, 1500))

    if (inputPassword === password) {
      sessionStorage.setItem('prism-authenticated', 'true')
      setIsAuthenticated(true)
      
      // Dramatic reveal animation
      setTimeout(() => {
        setShowContent(true)
      }, 500)
    } else {
      setError('Access denied. Please check your credentials.')
      setInputPassword('')
    }
    
    setIsLoading(false)
  }

  if (isAuthenticated && showContent) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-md w-full mx-4">
        {isAuthenticated && !showContent ? (
          // Access granted animation
          <div className="text-center">
            <div className="mb-8 flex justify-center">
              <AnimatedLogo className="w-24 h-24" />
            </div>
            <div className="text-white text-xl font-light tracking-wider animate-pulse">
              Access Granted
            </div>
            <div className="w-full bg-white/20 rounded-full h-2 mt-8">
              <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full animate-pulse" style={{width: '100%'}}></div>
            </div>
          </div>
        ) : (
          // Password entry form
          <div className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl border border-white/20 shadow-2xl">
            <div className="text-center mb-8">
              <div className="mb-6 flex justify-center">
                <AnimatedLogo className="w-20 h-20" />
              </div>
              <h1 className="text-2xl font-light text-white mb-2 tracking-wide">
                Prism Writing
              </h1>
              <p className="text-white/70 text-sm">
                Authorized Access Required
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="password" className="sr-only">
                  Access Code
                </label>
                <input
                  type="password"
                  id="password"
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  placeholder="Enter access code"
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
                  required
                  disabled={isLoading}
                />
              </div>

              {error && (
                <div className="text-red-300 text-sm text-center animate-shake">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Authenticating...
                  </div>
                ) : (
                  'Access Portal'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white/50 text-xs">
                Secure access portal powered by Prism Writing
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  )
}
