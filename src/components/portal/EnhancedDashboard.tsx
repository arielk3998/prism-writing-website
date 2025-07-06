/**
 * Enhanced Dashboard
 * 
 * Advanced dashboard component for the member portal webapp with
 * comprehensive features for different user roles.
 * 
 * @module EnhancedDashboard
 * @version 1.0.0
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth, usePermissions } from '../../contexts/AuthContext';
import { User } from '../../lib/auth';
import EnhancedFileManager from './EnhancedFileManager';
import AccountManagement from './AccountManagement';
import { EnhancedDarkModeToggle } from '../ui/EnhancedDarkModeToggle';

interface DashboardProps {
  user: User | null;
}

interface QuickStat {
  label: string;
  value: string | number;
  icon: string;
  color: string;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
}

interface Activity {
  id: string;
  type: 'file_upload' | 'project_update' | 'message' | 'task_completed';
  title: string;
  description: string;
  timestamp: string;
  user: string;
  icon: string;
}

export default function EnhancedDashboard({ user }: DashboardProps) {
  const { logout } = useAuth();
  const { hasRole } = usePermissions();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) return null;

  // Sample data based on user role
  const getQuickStats = (): QuickStat[] => {
    const baseStats: QuickStat[] = [
      {
        label: 'Active Projects',
        value: hasRole('ADMIN') ? 12 : hasRole('MEMBER') ? 8 : 3,
        icon: '🚀',
        color: 'bg-blue-500',
        trend: { value: 15, direction: 'up' as const }
      },
      {
        label: 'Files Uploaded',
        value: hasRole('ADMIN') ? 156 : hasRole('MEMBER') ? 89 : 23,
        icon: '📁',
        color: 'bg-green-500',
        trend: { value: 8, direction: 'up' as const }
      }
    ];

    if (hasRole('ADMIN')) {
      baseStats.push(
        {
          label: 'Total Members',
          value: 24,
          icon: '👥',
          color: 'bg-purple-500',
          trend: { value: 12, direction: 'up' as const }
        },
        {
          label: 'Revenue This Month',
          value: '$24,500' as string | number,
          icon: '💰',
          color: 'bg-yellow-500',
          trend: { value: 18, direction: 'up' as const }
        }
      );
    } else if (hasRole('MEMBER')) {
      baseStats.push(
        {
          label: 'Hours This Month',
          value: 156,
          icon: '⏰',
          color: 'bg-indigo-500',
          trend: { value: 5, direction: 'up' as const }
        },
        {
          label: 'Client Satisfaction',
          value: '4.9/5' as string | number,
          icon: '⭐',
          color: 'bg-pink-500'
        }
      );
    } else {
      baseStats.push(
        {
          label: 'Completed Tasks',
          value: 15,
          icon: '✅',
          color: 'bg-emerald-500',
          trend: { value: 20, direction: 'up' as const }
        },
        {
          label: 'Satisfaction Score',
          value: '5/5' as string | number,
          icon: '⭐',
          color: 'bg-amber-500'
        }
      );
    }

    return baseStats;
  };

  const getRecentActivity = (): Activity[] => {
    return [
      {
        id: '1',
        type: 'file_upload',
        title: 'New document uploaded',
        description: 'API Documentation v2.1.pdf',
        timestamp: '2 hours ago',
        user: user.name,
        icon: '📄'
      },
      {
        id: '2',
        type: 'project_update',
        title: 'Project milestone completed',
        description: 'Technical Writing Project Phase 1',
        timestamp: '5 hours ago',
        user: 'Team Member',
        icon: '🎯'
      },
      {
        id: '3',
        type: 'message',
        title: 'New message received',
        description: 'Project requirements clarification',
        timestamp: '1 day ago',
        user: 'Project Manager',
        icon: '💬'
      }
    ];
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'files', label: 'Files', icon: '📁' },
    { id: 'projects', label: hasRole('CLIENT') ? 'My Projects' : 'Projects', icon: '🚀' },
    { id: 'messages', label: 'Messages', icon: '💬' },
    { id: 'account', label: 'Account', icon: '👤' },
    ...(hasRole('ADMIN') ? [{ id: 'admin', label: 'Admin', icon: '⚙️' }] : []),
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  const handleLogout = async () => {
    await logout();
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {getQuickStats().map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-safe-muted">
                        {stat.label}
                      </p>
                      <p className="text-2xl font-bold text-safe">
                        {stat.value}
                      </p>
                      {stat.trend && (
                        <p className={`text-sm flex items-center mt-1 ${
                          stat.trend.direction === 'up' ? 'text-safe-success' : 'text-safe-error'
                        }`}>
                          <span className="mr-1">
                            {stat.trend.direction === 'up' ? '↗️' : '↘️'}
                          </span>
                          {stat.trend.value}% from last month
                        </p>
                      )}
                    </div>
                    <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                      {stat.icon}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-safe">Recent Activity</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {getRecentActivity().map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-safe-accent">
                        {activity.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-safe">
                          {activity.title}
                        </p>
                        <p className="text-sm text-safe-muted">
                          {activity.description}
                        </p>
                        <p className="text-xs text-safe-muted dark:text-safe-muted mt-1">
                          {activity.timestamp} • {activity.user}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'files':
        return <EnhancedFileManager />;

      case 'projects':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-safe mb-4">
              {hasRole('CLIENT') ? 'My Projects' : 'Projects'}
            </h3>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🚀</div>
              <p className="text-safe-muted mb-4">
                Project management coming soon
              </p>
              <p className="text-sm text-safe-muted dark:text-safe-muted">
                Advanced project tracking and collaboration features
              </p>
            </div>
          </div>
        );

      case 'messages':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-safe mb-4">Messages</h3>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💬</div>
              <p className="text-safe-muted mb-4">
                No messages yet
              </p>
              <p className="text-sm text-safe-muted dark:text-safe-muted">
                Integrated messaging system coming soon
              </p>
            </div>
          </div>
        );

      case 'account':
        return <AccountManagement user={user} />;

      case 'admin':
        return hasRole('ADMIN') ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-safe mb-4">Administrative Tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/admin-panel" className="block">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center mb-2">
                    <span className="text-xl mr-2">⚙️</span>
                    <h4 className="font-medium text-safe">Control Panel</h4>
                  </div>
                  <p className="text-sm text-safe-muted mb-3">
                    Access the full administrative control panel with industry-standard settings
                  </p>
                  <span className="text-safe-accent hover:text-safe-accent text-sm font-medium">
                    Open Control Panel →
                  </span>
                </div>
              </Link>
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center mb-2">
                  <span className="text-xl mr-2">👥</span>
                  <h4 className="font-medium text-safe">User Management</h4>
                </div>
                <p className="text-sm text-safe-muted mb-3">
                  Manage users, roles, and permissions
                </p>
                <button className="text-safe-accent hover:text-safe-accent text-sm font-medium">
                  Manage Users →
                </button>
              </div>
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center mb-2">
                  <span className="text-xl mr-2">📊</span>
                  <h4 className="font-medium text-safe">Analytics</h4>
                </div>
                <p className="text-sm text-safe-muted mb-3">
                  View detailed system analytics and reports
                </p>
                <button className="text-safe-accent hover:text-safe-accent text-sm font-medium">
                  View Analytics →
                </button>
              </div>
            </div>
          </div>
        ) : null;

      case 'settings':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-safe mb-6">Settings</h3>
            <div className="space-y-6">
              {/* Profile Settings */}
              <div>
                <h4 className="text-md font-medium text-safe mb-4">Profile Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-safe mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={user.name}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-safe mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-safe mb-1">
                      Role
                    </label>
                    <input
                      type="text"
                      value={user.role}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white capitalize"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-safe mb-1">
                      Status
                    </label>
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                      user.status === 'ACTIVE' ? 'bg-green-100 text-safe-success dark:bg-green-900 dark:text-green-200' :
                      'bg-gray-100 text-safe dark:bg-gray-700 dark:text-gray-200'
                    }`}>
                      {user.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Security */}
              <div>
                <h4 className="text-md font-medium text-safe mb-4">Security</h4>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Change Password
                </button>
              </div>

              {/* Logout */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-safe-accent hover:text-safe-accent transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="font-medium">Back to Home</span>
              </Link>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-safe">Member Portal</h1>
                <p className="text-sm text-safe-muted">Welcome back, {user.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <EnhancedDarkModeToggle 
                variant="prominent" 
                size="md"
                showLabel={true}
                showTooltip={true}
              />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-safe-accent font-medium text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm text-safe capitalize">{user.role}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64">
            <nav className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <ul className="space-y-2">
                {tabs.map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-safe-accent dark:bg-blue-900 dark:text-blue-300'
                          : 'text-safe-muted hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-safe dark:hover:text-safe-muted'
                      }`}
                    >
                      <span className="text-lg">{tab.icon}</span>
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderTabContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
