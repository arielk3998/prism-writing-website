/**
 * Admin Panel Page
 * 
 * Comprehensive administrative interface for managing the Prism Writing
 * portal with industry-standard controls and monitoring tools.
 * 
 * @module AdminPanel
 * @version 1.0.0
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ModernNavigation, ModernButton } from '../../components/ui/ModernComponents';
import { DarkModeToggle } from '../../components/ui/DarkModeToggle';
import { AdminDashboard } from '../../components/admin/AdminDashboard';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminPanel() {
  const { user, isAuthenticated } = useAuth();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Portal', href: '/portal-enhanced' },
    { label: 'Resources', href: '/resources' },
    { label: 'About', href: '/about' },
  ];

  // Redirect if not admin (using correct UserRole enum values)
  if (!isAuthenticated || (user?.role !== 'ADMIN' && user?.role !== 'SUPER_ADMIN')) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600 dark:text-red-400 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Administrator privileges required to access this page.
          </p>
          <Link href="/portal-enhanced">
            <ModernButton variant="primary">
              Return to Portal
            </ModernButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <ModernNavigation
        logo={
          <Link href="/" className="flex items-center space-x-3">
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
                Portal
              </ModernButton>
            </Link>
          </div>
        }
      />

      <main className="pt-20">
        {/* Header */}
        <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center mb-6">
                <span className="text-6xl mr-4">⚙️</span>
                <h1 className="text-4xl font-bold text-white">
                  Administrative Control Panel
                </h1>
              </div>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Comprehensive system management, security controls, and operational oversight
                for the Prism Writing Cooperative platform.
              </p>
              <div className="inline-flex items-center space-x-2 bg-blue-500/20 text-blue-100 px-4 py-2 rounded-lg">
                <span className="text-lg">👨‍💼</span>
                <span className="font-medium">Welcome, {user?.email}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            >
              {[
                { label: 'Active Users', value: '24', icon: '👥', color: 'blue' },
                { label: 'Total Projects', value: '156', icon: '📁', color: 'green' },
                { label: 'System Health', value: '98%', icon: '💚', color: 'emerald' },
                { label: 'Security Score', value: 'A+', icon: '🔒', color: 'purple' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border-l-4 border-${stat.color}-500`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        {stat.label}
                      </p>
                      <p className={`text-3xl font-bold text-${stat.color}-600 dark:text-${stat.color}-400`}>
                        {stat.value}
                      </p>
                    </div>
                    <span className="text-3xl">{stat.icon}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'User Management', icon: '👥', href: '#users' },
                  { label: 'System Logs', icon: '📋', href: '#logs' },
                  { label: 'Backup & Recovery', icon: '💾', href: '#backup' },
                  { label: 'Security Audit', icon: '🔍', href: '#security' }
                ].map((action, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <span className="text-2xl mb-2">{action.icon}</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {action.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Administrative Dashboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <AdminDashboard />
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
