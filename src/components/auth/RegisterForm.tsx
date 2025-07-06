'use client'

import { useState } from 'react'

interface RegisterFormProps {
  onSuccess: () => void
  userType: 'member' | 'client'
}

export default function RegisterForm({ onSuccess, userType }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    organization: userType === 'client' ? '' : undefined,
    skills: userType === 'member' ? '' : undefined,
    experience: userType === 'member' ? '' : undefined
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all required fields')
      setIsLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      setIsLoading(false)
      return
    }

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Store pending registration (in real app, this would go to backend)
      const pendingUser = {
        ...formData,
        userType,
        status: 'pending',
        createdAt: new Date().toISOString()
      }
      
      const pendingRegistrations = JSON.parse(localStorage.getItem('pendingRegistrations') || '[]')
      pendingRegistrations.push(pendingUser)
      localStorage.setItem('pendingRegistrations', JSON.stringify(pendingRegistrations))
      
      onSuccess()
    } catch {
      setError('Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-safe mb-6">
        {userType === 'member' ? 'Join Our Cooperative' : 'Client Registration'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-safe mb-1">
            Full Name *
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Your full name"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-safe mb-1">
            Email Address *
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="your@email.com"
            disabled={isLoading}
          />
        </div>

        {userType === 'client' && (
          <div>
            <label htmlFor="organization" className="block text-sm font-medium text-safe mb-1">
              Organization
            </label>
            <input
              id="organization"
              type="text"
              value={formData.organization || ''}
              onChange={(e) => handleInputChange('organization', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Your company or organization"
              disabled={isLoading}
            />
          </div>
        )}

        {userType === 'member' && (
          <>
            <div>
              <label htmlFor="skills" className="block text-sm font-medium text-safe mb-1">
                Skills & Expertise
              </label>
              <textarea
                id="skills"
                value={formData.skills || ''}
                onChange={(e) => handleInputChange('skills', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="What are your writing specialties? (e.g., technical writing, content marketing, copywriting)"
                rows={3}
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-safe mb-1">
                Experience Level
              </label>
              <select
                id="experience"
                value={formData.experience || ''}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                disabled={isLoading}
              >
                <option value="">Select your experience level</option>
                <option value="entry">Entry Level (0-2 years)</option>
                <option value="intermediate">Intermediate (3-5 years)</option>
                <option value="senior">Senior (6-10 years)</option>
                <option value="expert">Expert (10+ years)</option>
              </select>
            </div>
          </>
        )}

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-safe mb-1">
            Password *
          </label>
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Create a password (min 6 characters)"
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-safe mb-1">
            Confirm Password *
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Confirm your password"
            disabled={isLoading}
          />
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 text-safe-error p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <div className="mt-4 text-sm text-safe-muted">
        {userType === 'member' 
          ? 'Your application will be reviewed by our cooperative members.'
          : 'Once registered, you can start submitting work requests immediately.'
        }
      </div>
    </div>
  )
}
