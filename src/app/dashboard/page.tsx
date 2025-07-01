'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { 
  User, 
  CreditCard, 
  FileText, 
  Settings,
  Download,
  RefreshCw,
  ExternalLink,
  ArrowLeft,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';
import { DarkModeToggle } from '@/components/ui/DarkModeToggle';

interface User {
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
}

interface UserSubscription {
  id: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  planType: string;
  billingInterval: string;
  currentPeriodStart: number;
  currentPeriodEnd: number;
  cancelAtPeriodEnd: boolean;
  amount: number;
  currency: string;
}

export default function UserDashboard() {
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadUserData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('auth_token');
        if (!token) {
          router.push('/login');
          return;
        }

        // Load user subscription data
        const subResponse = await fetch('/api/subscriptions', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (subResponse.ok) {
          const subData = await subResponse.json();
          setSubscription(subData.subscription);
        }

        // Load user profile data
        const userResponse = await fetch('/api/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData.user);
        } else {
          // Mock user data for demo
          setUser({
            email: 'demo@prismwriting.com',
            firstName: 'Demo',
            lastName: 'User',
            role: 'MEMBER',
          });
        }

      } catch (error) {
        console.error('Error loading user data:', error);
        toast.error('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };
    
    loadUserData();
  }, [router]);

  const handleManageSubscription = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          action: 'create_portal',
        }),
      });

      const data = await response.json();

      if (data.success && data.portalUrl) {
        window.location.href = data.portalUrl;
      } else {
        throw new Error(data.error || 'Failed to create portal session');
      }

    } catch (error) {
      console.error('Error creating portal session:', error);
      toast.error('Failed to open billing portal');
    }
  };

  const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(timestamp));
  };

  const formatCurrency = (amount: number, currency = 'usd') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'trialing':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'past_due':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'canceled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'trialing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'past_due':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'canceled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600 dark:text-gray-400">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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
                <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  My Dashboard
                </h1>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <DarkModeToggle />
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Welcome, {user?.firstName || 'User'}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Subscription Card */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Subscription
                  </h2>
                  <button
                    onClick={handleManageSubscription}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Manage Billing
                  </button>
                </div>
              </div>

              <div className="p-6">
                {subscription ? (
                  <div className="space-y-6">
                    {/* Status */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {getStatusIcon(subscription.status)}
                        <span className={`ml-2 px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(subscription.status)}`}>
                          {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {formatCurrency(subscription.amount, subscription.currency)}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          /{subscription.billingInterval}
                        </div>
                      </div>
                    </div>

                    {/* Plan Details */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Plan</label>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                          {subscription.planType} Plan
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Billing</label>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">
                          {subscription.billingInterval}ly
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Period</label>
                        <p className="text-sm text-gray-900 dark:text-white">
                          {formatDate(subscription.currentPeriodStart)} - {formatDate(subscription.currentPeriodEnd)}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Next Billing</label>
                        <p className="text-sm text-gray-900 dark:text-white">
                          {formatDate(subscription.currentPeriodEnd)}
                        </p>
                      </div>
                    </div>

                    {subscription.cancelAtPeriodEnd && (
                      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">
                          Your subscription will end on {formatDate(subscription.currentPeriodEnd)}. 
                          You can reactivate it anytime before then.
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      No Active Subscription
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Start your journey with one of our subscription plans.
                    </p>
                    <Link
                      href="/pricing"
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      View Plans
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link
                  href="/resources"
                  className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Download className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" />
                  <span className="text-gray-900 dark:text-white">Download Resources</span>
                </Link>
                <Link
                  href="/services"
                  className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <FileText className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" />
                  <span className="text-gray-900 dark:text-white">Request Service</span>
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Settings className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-3" />
                  <span className="text-gray-900 dark:text-white">Contact Support</span>
                </Link>
              </div>
            </motion.div>

            {/* Account Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Account Information
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
                  <p className="text-sm text-gray-900 dark:text-white">{user?.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</label>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {user?.firstName} {user?.lastName}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Role</label>
                  <p className="text-sm text-gray-900 dark:text-white">{user?.role}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
