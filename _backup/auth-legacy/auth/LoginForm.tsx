/**
 * Enhanced Login Form Component
 * 
 * Modern login form with proper validation, error handling,
 * and integration with the new authentication system.
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { Loader2, Eye, EyeOff, LogIn, Shield, AlertCircle } from 'lucide-react';

// Validation schema
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSuccess?: (user: { id: string; email: string; role: string; firstName?: string; lastName?: string }) => void;
  redirectTo?: string;
  title?: string;
  description?: string;
  showDemoAccounts?: boolean;
}

export default function LoginForm({ 
  onSuccess, 
  redirectTo = '/admin',
  title = 'Sign In to Prism Writing',
  description = 'Enter your credentials to access your account',
  showDemoAccounts = true
}: LoginFormProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const router = useRouter();

  const handleInputChange = (field: keyof LoginFormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = field === 'rememberMe' ? event.target.checked : event.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    if (submitError) setSubmitError('');
  };

  const validateForm = (): boolean => {
    try {
      loginSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/auth?action=login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store user data in localStorage for compatibility with existing auth system
      const userData = {
        id: data.user.id,
        name: `${data.user.firstName || ''} ${data.user.lastName || ''}`.trim() || data.user.email,
        email: data.user.email,
        role: data.user.role.toLowerCase().replace('_', '-') as 'admin' | 'member' | 'client',
        avatar: data.user.avatar
      };
      
      localStorage.setItem('prism_user', JSON.stringify(userData));
      localStorage.setItem('prism_token', 'authenticated'); // Simple token for compatibility

      // Success - call onSuccess callback or redirect
      if (onSuccess) {
        onSuccess(data.user);
      } else {
        router.push(redirectTo);
        router.refresh(); // Refresh to update auth state
      }
    } catch (error) {
      console.error('Login error:', error);
      setSubmitError(error instanceof Error ? error.message : 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const demoCredentials = [
    { email: 'admin@prismwriting.com', password: 'admin123', label: 'Admin Account', role: 'Super Admin' },
    { email: 'member@prismwriting.com', password: 'member123', label: 'Member Account', role: 'Member' },
    { email: 'client@example.com', password: 'client123', label: 'Client Account', role: 'Client' },
  ];

  const fillDemoCredentials = (email: string, password: string) => {
    setFormData(prev => ({ ...prev, email, password }));
    setErrors({});
    setSubmitError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-8 pb-6">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Shield className="h-8 w-8 text-safe-accent" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-safe mb-2">{title}</h1>
          <p className="text-center text-safe-muted text-sm">{description}</p>
        </div>

        {/* Content */}
        <div className="px-8 pb-8">
          {submitError && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 text-safe-error flex-shrink-0 mt-0.5" />
              <span className="text-sm text-safe-error dark:text-red-300">{submitError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-safe mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="your-email@example.com"
                value={formData.email}
                onChange={handleInputChange('email')}
                disabled={isLoading}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors
                  ${errors.email 
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                  } 
                  text-safe placeholder-gray-500 dark:placeholder-gray-400
                  disabled:opacity-50 disabled:cursor-not-allowed`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-safe-error">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-safe mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  disabled={isLoading}
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors
                    ${errors.password 
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                    } 
                    text-safe placeholder-gray-500 dark:placeholder-gray-400
                    disabled:opacity-50 disabled:cursor-not-allowed`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-safe-muted hover:text-safe dark:hover:text-gray-200 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-safe-error">{errors.password}</p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleInputChange('rememberMe')}
                disabled={isLoading}
                className="h-4 w-4 text-safe-accent focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-safe">
                Remember me for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          {showDemoAccounts && (
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
              <p className="text-sm text-safe-muted mb-4 text-center font-medium">
                Demo Accounts (Click to auto-fill):
              </p>
              <div className="space-y-2">
                {demoCredentials.map((cred, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => fillDemoCredentials(cred.email, cred.password)}
                    className="w-full text-left p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors disabled:opacity-50"
                    disabled={isLoading}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-safe text-sm">{cred.label}</div>
                        <div className="text-safe-muted text-xs">{cred.email}</div>
                      </div>
                      <span className="text-xs bg-blue-100 dark:bg-blue-900 text-safe-accent dark:text-blue-200 px-2 py-1 rounded">
                        {cred.role}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
