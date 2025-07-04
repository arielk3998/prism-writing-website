/**
 * Comprehensive Enhanced Dashboard
 * 
 * Advanced dashboard component with full integration of all platform features
 * including projects, analytics, accounting, CRM, and enterprise tools.
 * 
 * @module ComprehensiveDashboard
 * @version 2.0.0
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth, usePermissions } from '../../contexts/AuthContext';
import { User } from '../../lib/auth';
import { DarkModeToggle } from '../ui/DarkModeToggle';

// Import enhanced components
import ProjectManagement from './ProjectManagement';
import AnalyticsDashboard from './AnalyticsDashboard';
import AccountingDashboard from './AccountingDashboard';
import CRMDashboard from './CRMDashboard';
import NotificationCenter from './NotificationCenter';
import EnhancedFileManager from './EnhancedFileManager';
import MemberResources from './MemberResources';
import AccountManagement from './AccountManagement';

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
  link?: string;
}

interface Activity {
  id: string;
  type: 'project' | 'payment' | 'document' | 'task' | 'user' | 'system';
  title: string;
  description: string;
  timestamp: string;
  user: string;
  icon: string;
  priority: 'low' | 'medium' | 'high';
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

export default function ComprehensiveDashboard({ user }: DashboardProps) {
  const { logout } = useAuth();
  const { hasRole } = usePermissions();
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Load notifications and statistics
  useEffect(() => {
    if (user) {
      loadNotifications();
      loadRealtimeStats();
    }
  }, [user]);

  const loadNotifications = async () => {
    // Mock notifications - replace with actual API call
    const mockNotifications: Notification[] = [
      {
        id: '1',
        title: 'Project Update',
        message: 'Technical Writing Project Phase 2 has been completed',
        type: 'success',
        timestamp: '5 minutes ago',
        read: false
      },
      {
        id: '2',
        title: 'Payment Received',
        message: 'Payment of $2,500 received from Acme Corp',
        type: 'success',
        timestamp: '2 hours ago',
        read: false
      },
      {
        id: '3',
        title: 'New Team Member',
        message: 'Sarah Johnson has joined the writing team',
        type: 'info',
        timestamp: '1 day ago',
        read: true
      }
    ];
    
    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  };

  const loadRealtimeStats = async () => {
    // Mock real-time stats loading
    // Replace with actual API calls to /api/analytics, /api/projects, etc.
  };

  // Enhanced quick stats with real data integration
  const getQuickStats = (): QuickStat[] => {
    const baseStats: QuickStat[] = [
      {
        label: 'Active Projects',
        value: hasRole('ADMIN') ? 24 : hasRole('MEMBER') ? 12 : 5,
        icon: '🚀',
        color: 'bg-blue-500',
        trend: { value: 15, direction: 'up' as const },
        link: '/portal-enhanced?tab=projects'
      },
      {
        label: 'Total Revenue',
        value: hasRole('ADMIN') ? '$45,750' : hasRole('MEMBER') ? '$12,300' : '$3,200',
        icon: '💰',
        color: 'bg-green-500',
        trend: { value: 22, direction: 'up' as const },
        link: '/portal-enhanced?tab=accounting'
      }
    ];

    if (hasRole('ADMIN')) {
      baseStats.push(
        {
          label: 'Team Members',
          value: 18,
          icon: '👥',
          color: 'bg-purple-500',
          trend: { value: 12, direction: 'up' as const },
          link: '/portal-enhanced?tab=admin'
        },
        {
          label: 'Client Satisfaction',
          value: '4.9/5',
          icon: '⭐',
          color: 'bg-yellow-500',
          trend: { value: 5, direction: 'up' as const },
          link: '/portal-enhanced?tab=crm'
        },
        {
          label: 'Monthly Revenue',
          value: '$28,450',
          icon: '📊',
          color: 'bg-indigo-500',
          trend: { value: 18, direction: 'up' as const },
          link: '/portal-enhanced?tab=analytics'
        },
        {
          label: 'Documents Created',
          value: 156,
          icon: '📄',
          color: 'bg-pink-500',
          trend: { value: 8, direction: 'up' as const },
          link: '/portal-enhanced?tab=files'
        }
      );
    } else if (hasRole('MEMBER')) {
      baseStats.push(
        {
          label: 'Hours This Month',
          value: 168,
          icon: '⏰',
          color: 'bg-indigo-500',
          trend: { value: 15, direction: 'up' as const }
        },
        {
          label: 'Tasks Completed',
          value: 42,
          icon: '✅',
          color: 'bg-emerald-500',
          trend: { value: 20, direction: 'up' as const }
        },
        {
          label: 'Client Reviews',
          value: '4.8/5',
          icon: '⭐',
          color: 'bg-amber-500'
        },
        {
          label: 'Documents',
          value: 89,
          icon: '📁',
          color: 'bg-cyan-500',
          trend: { value: 12, direction: 'up' as const },
          link: '/portal-enhanced?tab=files'
        }
      );
    } else {
      baseStats.push(
        {
          label: 'Projects',
          value: 5,
          icon: '📋',
          color: 'bg-teal-500',
          link: '/portal-enhanced?tab=projects'
        },
        {
          label: 'Deliverables',
          value: 28,
          icon: '📄',
          color: 'bg-orange-500',
          link: '/portal-enhanced?tab=files'
        },
        {
          label: 'Support Score',
          value: '5/5',
          icon: '🎯',
          color: 'bg-red-500'
        },
        {
          label: 'Messages',
          value: 12,
          icon: '💬',
          color: 'bg-violet-500',
          link: '/portal-enhanced?tab=messages'
        }
      );
    }

    return baseStats;
  };

  const getRecentActivity = (): Activity[] => {
    const activities: Activity[] = [
      {
        id: '1',
        type: 'project',
        title: 'Project milestone completed',
        description: 'API Documentation Project - Phase 2 delivered',
        timestamp: '15 minutes ago',
        user: user.name,
        icon: '🎯',
        priority: 'high'
      },
      {
        id: '2',
        type: 'payment',
        title: 'Payment processed',
        description: '$2,500 payment received from Acme Corp',
        timestamp: '2 hours ago',
        user: 'System',
        icon: '💳',
        priority: 'medium'
      },
      {
        id: '3',
        type: 'document',
        title: 'Document uploaded',
        description: 'User Manual v3.2.pdf added to project files',
        timestamp: '4 hours ago',
        user: 'Sarah Johnson',
        icon: '📄',
        priority: 'low'
      },
      {
        id: '4',
        type: 'task',
        title: 'Task assigned',
        description: 'Review technical specifications for new client',
        timestamp: '6 hours ago',
        user: 'Project Manager',
        icon: '📋',
        priority: 'medium'
      },
      {
        id: '5',
        type: 'user',
        title: 'New team member',
        description: 'Alex Chen joined the development team',
        timestamp: '1 day ago',
        user: 'HR Team',
        icon: '👤',
        priority: 'low'
      }
    ];

    return hasRole('ADMIN') ? activities : activities.slice(0, 3);
  };

  // Enhanced tab configuration
  const tabs = [
    { id: 'overview', label: 'Dashboard', icon: '📊', description: 'Overview and quick stats' },
    { id: 'projects', label: 'Projects', icon: '🚀', description: 'Project management and tracking' },
    { id: 'files', label: 'Files', icon: '📁', description: 'Document and file management' },
    { id: 'resources', label: 'Resources', icon: '📚', description: 'Member templates and guides', roles: ['ADMIN', 'MEMBER'] as const },
    { id: 'analytics', label: 'Analytics', icon: '📈', description: 'Performance metrics and reports', adminOnly: true },
    { id: 'accounting', label: 'Accounting', icon: '💰', description: 'Financial management', roles: ['ADMIN', 'MEMBER'] as const },
    { id: 'crm', label: 'CRM', icon: '👥', description: 'Client relationship management', roles: ['ADMIN', 'MEMBER'] as const },
    { id: 'messages', label: 'Messages', icon: '💬', description: 'Communication center' },
    { id: 'notifications', label: 'Notifications', icon: '🔔', description: 'System notifications', badge: unreadCount },
    { id: 'account', label: 'Account', icon: '👤', description: 'Profile and account settings' },
    ...(hasRole('ADMIN') ? [{ 
      id: 'admin', 
      label: 'Admin', 
      icon: '⚙️', 
      description: 'System administration',
      adminOnly: true 
    }] : []),
    { id: 'settings', label: 'Settings', icon: '⚙️', description: 'Application preferences' }
  ].filter(tab => {
    if (tab.adminOnly && !hasRole('ADMIN')) return false;
    if (tab.roles && !tab.roles.some(role => hasRole(role as 'ADMIN' | 'MEMBER'))) return false;
    return true;
  });

  if (!user) return null;

  const handleLogout = async () => {
    await logout();
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-xl p-8 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">
                    Welcome back, {user.name}! 👋
                  </h2>
                  <p className="text-blue-100 text-lg">
                    {hasRole('ADMIN') && "Manage your writing cooperative and track business performance"}
                    {hasRole('MEMBER') && "Track your projects and collaborate with the team"}
                    {hasRole('CLIENT') && "Monitor your projects and access deliverables"}
                  </p>
                </div>
                <div className="hidden md:block">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-4xl">
                      {hasRole('ADMIN') ? '👑' : hasRole('MEMBER') ? '✍️' : '🎯'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {getQuickStats().map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={stat.link || '#'} className={stat.link ? 'cursor-pointer' : 'cursor-default'}>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 group-hover:scale-105">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                          {stat.icon}
                        </div>
                        {stat.trend && (
                          <div className={`flex items-center text-sm ${
                            stat.trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            <span className="mr-1">
                              {stat.trend.direction === 'up' ? '↗' : '↘'}
                            </span>
                            <span>{stat.trend.value}%</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                        {stat.label}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity and Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activity */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
                  <button 
                    onClick={() => setActiveTab('notifications')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View All →
                  </button>
                </div>
                <div className="space-y-4">
                  {getRecentActivity().map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                        activity.priority === 'high' ? 'bg-red-100 text-red-600' :
                        activity.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        <span className="text-lg">{activity.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {activity.title}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {activity.description}
                        </p>
                        <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                          <span>{activity.timestamp}</span>
                          <span className="mx-1">•</span>
                          <span>{activity.user}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Quick Actions</h3>
                <div className="grid grid-cols-1 gap-4">
                  {hasRole('ADMIN') && (
                    <>
                      <button 
                        onClick={() => setActiveTab('projects')}
                        className="flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors text-left"
                      >
                        <span className="text-2xl mr-3">➕</span>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Create New Project</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Start a new writing project</p>
                        </div>
                      </button>
                      <button 
                        onClick={() => setActiveTab('admin')}
                        className="flex items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors text-left"
                      >
                        <span className="text-2xl mr-3">👥</span>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Manage Team</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Add or manage team members</p>
                        </div>
                      </button>
                    </>
                  )}
                  <button 
                    onClick={() => setActiveTab('files')}
                    className="flex items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors text-left"
                  >
                    <span className="text-2xl mr-3">📁</span>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Upload Documents</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Add files to your projects</p>
                    </div>
                  </button>
                  <button 
                    onClick={() => setActiveTab('messages')}
                    className="flex items-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/40 transition-colors text-left"
                  >
                    <span className="text-2xl mr-3">💬</span>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Send Message</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Communicate with your team</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'projects':
        return <ProjectManagement user={user} />;

      case 'files':
        return <EnhancedFileManager />;

      case 'resources':
        return (hasRole('ADMIN') || hasRole('MEMBER')) ? <MemberResources userRole={user?.role?.toLowerCase() as 'admin' | 'member' | 'client'} /> : null;

      case 'analytics':
        return hasRole('ADMIN') ? <AnalyticsDashboard user={user} /> : null;

      case 'accounting':
        return (hasRole('ADMIN') || hasRole('MEMBER')) ? <AccountingDashboard user={user} /> : null;

      case 'crm':
        return (hasRole('ADMIN') || hasRole('MEMBER')) ? <CRMDashboard user={user} /> : null;

      case 'notifications':
        return <NotificationCenter notifications={notifications} onMarkAsRead={markNotificationAsRead} />;

      case 'messages':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Messages</h3>
            <div className="text-center py-12">
              <span className="text-6xl mb-4 block">💬</span>
              <p className="text-gray-600 dark:text-gray-400">Message center coming soon</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                Direct messaging with team members and clients
              </p>
            </div>
          </div>
        );

      case 'account':
        return <AccountManagement user={user} />;

      case 'admin':
        return hasRole('ADMIN') ? (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Administrative Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link href="/admin-panel" className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-2">
                    <span className="text-xl mr-2">⚙️</span>
                    <h4 className="font-medium text-gray-900 dark:text-white">Control Panel</h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Access the full administrative control panel
                  </p>
                  <span className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Open Control Panel →
                  </span>
                </Link>
                <button 
                  onClick={() => setActiveTab('crm')}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow text-left"
                >
                  <div className="flex items-center mb-2">
                    <span className="text-xl mr-2">👥</span>
                    <h4 className="font-medium text-gray-900 dark:text-white">User Management</h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Manage users, roles, and permissions
                  </p>
                  <span className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Manage Users →
                  </span>
                </button>
                <button 
                  onClick={() => setActiveTab('analytics')}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow text-left"
                >
                  <div className="flex items-center mb-2">
                    <span className="text-xl mr-2">📊</span>
                    <h4 className="font-medium text-gray-900 dark:text-white">Analytics</h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    View detailed system analytics and reports
                  </p>
                  <span className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View Analytics →
                  </span>
                </button>
              </div>
            </div>
          </div>
        ) : null;

      case 'settings':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Settings</h3>
            <div className="space-y-6">
              {/* Profile Settings */}
              <div>
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Profile Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                    <input
                      type="text"
                      value={user.name}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <input
                      type="email"
                      value={user.email}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                      readOnly
                    />
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <div>
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Notification Preferences</h4>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      defaultChecked 
                      className="rounded border-gray-300 mr-3 focus:ring-2 focus:ring-blue-500" 
                      aria-describedby="email-notifications-desc"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300" id="email-notifications-desc">
                      Email notifications for project updates
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      defaultChecked 
                      className="rounded border-gray-300 mr-3 focus:ring-2 focus:ring-blue-500"
                      aria-describedby="push-notifications-desc"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300" id="push-notifications-desc">
                      Push notifications for messages
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 mr-3 focus:ring-2 focus:ring-blue-500"
                      aria-describedby="marketing-notifications-desc"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300" id="marketing-notifications-desc">
                      Marketing communications
                    </span>
                  </label>
                </div>
              </div>

              {/* Security */}
              <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Security</h4>
                <div className="space-y-3">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                    Change Password
                  </button>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors ml-3">
                    Enable 2FA
                  </button>
                </div>
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
      {/* Enhanced Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="font-medium">Back to Home</span>
              </Link>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Member Portal</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Welcome back, {user.name} • {user.role}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Notification Bell */}
              <button 
                onClick={() => setActiveTab('notifications')}
                className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-3.5-3.5c-.5-.5-.5-1.5 0-2l3.5-3.5h-5m-6 9h5l3.5-3.5c.5-.5.5-1.5 0-2L13 7H8m0 10V7" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              <DarkModeToggle />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{user.role}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Enhanced Sidebar Navigation */}
          <div className="lg:w-72">
            <nav className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
              <ul className="space-y-2">
                {tabs.map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{tab.icon}</span>
                        <div className="text-left">
                          <div className="font-medium">{tab.label}</div>
                          <div className="text-xs opacity-75 hidden lg:block">{tab.description}</div>
                        </div>
                      </div>
                      {tab.badge && tab.badge > 0 && (
                        <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {tab.badge}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Cooperative Info Panel */}
            <div className="mt-6 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg p-4 text-white">
              <h4 className="font-semibold mb-2">Prism Writing Cooperative</h4>
              <p className="text-sm opacity-90 mb-3">
                Professional writing services for the digital age
              </p>
              <div className="text-xs space-y-1">
                <div>📈 Revenue: ${hasRole('ADMIN') ? '125,750' : 'Private'}</div>
                <div>👥 Members: {hasRole('ADMIN') ? '18 Active' : 'Private'}</div>
                <div>⭐ Rating: 4.9/5</div>
              </div>
            </div>
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
