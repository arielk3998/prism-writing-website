'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Users, 
  FileText, 
  TrendingUp, 
  Settings, 
  ArrowLeft,
  Mail,
  CreditCard
} from 'lucide-react';
import NewsletterAdmin from '@/components/admin/NewsletterAdmin';
import UserManagement from '@/components/admin/UserManagement';
import PaymentManagement from '@/components/admin/PaymentManagement';
import DatabaseManagement from '@/components/admin/DatabaseManagement';
import EnterpriseManagement from '@/components/admin/EnterpriseManagement';
import AdvancedAnalytics from '@/components/admin/AdvancedAnalytics';
import { DarkModeToggle } from '@/components/ui/DarkModeToggle';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('newsletter');

  const tabs = [
    { id: 'newsletter', label: 'Newsletter', icon: Mail },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'database', label: 'Database', icon: FileText },
    { id: 'enterprise', label: 'Enterprise', icon: Shield },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Site
              </Link>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Admin Dashboard
                </h1>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'newsletter' && <NewsletterAdmin />}
          
          {activeTab === 'users' && <UserManagement />}
          
          {activeTab === 'payments' && <PaymentManagement />}
          
          {activeTab === 'database' && <DatabaseManagement />}
          
          {activeTab === 'enterprise' && <EnterpriseManagement />}
          
          {activeTab === 'analytics' && <AdvancedAnalytics />}
          
          {activeTab === 'settings' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
              <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Settings
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Enterprise system settings and configuration management.
              </p>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
