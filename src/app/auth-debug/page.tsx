/**
 * Authentication Debug Page
 * 
 * A test page to verify authentication functionality and role-based access control.
 * Shows available test accounts and their roles.
 * 
 * @module AuthDebug
 * @version 1.0.0
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ModernNavigation, ModernButton } from '../../components/ui/ModernComponents';
import { DarkModeToggle } from '../../components/ui/DarkModeToggle';
import { AuthTester } from '../../components/auth/AuthTester';

export default function AuthDebug() {
  const [localStorageData, setLocalStorageData] = React.useState<{users: unknown, passwords: unknown, token: string | null}>({
    users: null,
    passwords: null,
    token: null
  });

  React.useEffect(() => {
    // Load current localStorage data
    const users = localStorage.getItem('prism-users');
    const passwords = localStorage.getItem('prism-passwords');
    const token = localStorage.getItem('prism-auth-token');
    
    setLocalStorageData({
      users: users ? JSON.parse(users) : null,
      passwords: passwords ? JSON.parse(passwords) : null,
      token
    });
  }, []);

  const resetLocalStorage = () => {
    localStorage.removeItem('prism-users');
    localStorage.removeItem('prism-passwords');
    localStorage.removeItem('prism-auth-token');
    window.location.reload();
  };

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Resources', href: '/resources' },
    { label: 'About', href: '/about' },
  ];

  const testAccounts = [
    {
      email: 'ariel.pk@outlook.com',
      password: 'Merlak0105!',
      role: 'admin',
      description: 'Primary admin account with full system access and management capabilities',
      features: ['Full System Access', 'User Management', 'System Analytics', 'All Project Access', 'File Management']
    },
    {
      email: 'admin@prismwriting.com',
      password: 'admin123',
      role: 'admin',
      description: 'Test administrative access with user management and system settings',
      features: ['User Management', 'System Analytics', 'All Project Access', 'Full File Management']
    },
    {
      email: 'member@prismwriting.com',
      password: 'member123',
      role: 'member',
      description: 'Cooperative member with project management and file upload capabilities',
      features: ['Project Management', 'File Upload/Download', 'Member Collaboration', 'Client Communication']
    },
    {
      email: 'client@example.com',
      password: 'client123',
      role: 'client',
      description: 'Client access for project viewing and file downloads',
      features: ['View Projects', 'Download Files', 'Communication Portal', 'Basic Account Management']
    }
  ];

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800 border-red-200';
      case 'member': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'client': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <ModernNavigation
        logo={
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Prism Writing
            </span>
          </Link>
        }
        navItems={navItems}
        actions={
          <div className="flex items-center space-x-3">
            <DarkModeToggle />
            <Link href="/contact">
              <ModernButton variant="outline" size="sm">
                Get Quote
              </ModernButton>
            </Link>
            <Link href="/portal-enhanced">
              <ModernButton variant="primary" size="sm">
                Login
              </ModernButton>
            </Link>
          </div>
        }
      />

      <main className="pt-20">
        {/* Header */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Authentication Test Center
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Test the role-based authentication system with different user accounts
              </p>
              <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-lg">
                <span className="text-lg">🔒</span>
                <span className="font-medium">Development Mode Only</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Test Accounts */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Test Accounts
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Use these pre-configured accounts to test different roles and permissions. 
                All accounts are reset periodically in development mode.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testAccounts.map((account, index) => (
                <motion.div
                  key={account.email}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                >
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {account.role.charAt(0).toUpperCase() + account.role.slice(1)} Account
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(account.role)}`}>
                        {account.role}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {account.description}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Login Credentials:</h4>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 font-mono text-sm">
                      <div className="mb-1">
                        <span className="text-gray-600 dark:text-gray-400">Email:</span>
                        <br />
                        <span className="text-gray-900 dark:text-white">{account.email}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">Password:</span>
                        <br />
                        <span className="text-gray-900 dark:text-white">{account.password}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Available Features:</h4>
                    <ul className="space-y-1">
                      {account.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <span className="text-green-500 mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link href="/portal-enhanced">
                    <ModernButton variant="primary" fullWidth>
                      Test This Account
                    </ModernButton>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Testing Instructions
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Click &ldquo;Test This Account&rdquo; for any role you want to test</li>
                <li>Use the provided email and password to log in</li>
                <li>Explore the dashboard features available for that role</li>
                <li>Test the account management, file uploads, and role-specific features</li>
                <li>Log out and try a different role to compare functionality</li>
              </ol>
            </motion.div>

            {/* Technical Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Technical Implementation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 dark:text-gray-300">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Features</h4>
                  <ul className="space-y-1">
                    <li>• Role-based access control (RBAC)</li>
                    <li>• Persistent localStorage sessions</li>
                    <li>• JWT-style token authentication</li>
                    <li>• Automatic session validation</li>
                    <li>• Password protection for sensitive areas</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Security</h4>
                  <ul className="space-y-1">
                    <li>• Session tokens with expiration</li>
                    <li>• Permission-based feature access</li>
                    <li>• Secure logout and session cleanup</li>
                    <li>• Development-only test accounts</li>
                    <li>• Client-side state management</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* LocalStorage Debug Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  🐛 Debug Information
                </h3>
                <ModernButton 
                  variant="outline" 
                  size="sm"
                  onClick={resetLocalStorage}
                >
                  Reset LocalStorage
                </ModernButton>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Current Auth Token:</h4>
                  <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs overflow-x-auto">
                    {localStorageData.token || 'None'}
                  </code>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Stored Users:</h4>
                  <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs overflow-x-auto max-h-32 overflow-y-auto">
                    {localStorageData.users ? JSON.stringify(localStorageData.users, null, 2) : 'None (will use defaults)'}
                  </code>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Stored Passwords:</h4>
                  <code className="block bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs overflow-x-auto">
                    {localStorageData.passwords ? JSON.stringify(localStorageData.passwords, null, 2) : 'None (will use defaults)'}
                  </code>
                </div>
                
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    💡 <strong>Troubleshooting Tips:</strong><br/>
                    1. If login fails, try clicking &quot;Reset LocalStorage&quot; above<br/>
                    2. Check browser console for error messages<br/>
                    3. Ensure exact case-sensitive email and password entry<br/>
                    4. Try in incognito/private browsing mode
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Direct Authentication Tester */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-8"
            >
              <AuthTester />
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
