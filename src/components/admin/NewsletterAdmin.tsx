'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  TrendingUp, 
  Download, 
  Trash2, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  RefreshCw
} from 'lucide-react';

interface SubscriberStats {
  total: {
    confirmed: number;
    pending: number;
    unsubscribed: number;
    all: number;
  };
  growth: {
    last30Days: number;
    conversionRate: number;
  };
  sources: Record<string, number>;
  recent: Array<{
    id: string;
    email: string;
    source: string;
    subscribedAt: string;
    confirmed: boolean;
  }>;
}

interface NewsletterAdminProps {
  className?: string;
}

export default function NewsletterAdmin({ className = '' }: NewsletterAdminProps) {
  const [stats, setStats] = useState<SubscriberStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [exportFormat, setExportFormat] = useState<'json' | 'csv'>('csv');
  const [includeUnsubscribed, setIncludeUnsubscribed] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/newsletter/admin', {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ADMIN_API_KEY || 'demo-admin-key'}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch subscriber statistics');
      }

      const data = await response.json();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const response = await fetch(
        `/api/newsletter/admin?action=export&format=${exportFormat}&includeUnsubscribed=${includeUnsubscribed}`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ADMIN_API_KEY || 'demo-admin-key'}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Export failed');
      }

      if (exportFormat === 'csv') {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        const data = await response.json();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Export failed');
    }
  };

  const handleRemoveSubscriber = async (subscriberId: string) => {
    if (!confirm('Are you sure you want to remove this subscriber? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/newsletter/admin?id=${subscriberId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ADMIN_API_KEY || 'demo-admin-key'}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to remove subscriber');
      }

      // Refresh stats
      fetchStats();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove subscriber');
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 ${className}`}>
        <div className="flex items-center justify-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
          <span className="ml-3 text-gray-600 dark:text-gray-300">Loading subscriber data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 ${className}`}>
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Error Loading Data</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
          <button
            onClick={fetchStats}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Newsletter Subscriptions</h2>
            <p className="text-gray-600 dark:text-gray-300">Manage and track your email subscribers</p>
          </div>
          <button
            onClick={fetchStats}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Confirmed</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total.confirmed}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Pending</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total.pending}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Last 30 Days</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.growth.last30Days}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.growth.conversionRate}%</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Export Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Export Subscribers</h3>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Format:</label>
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value as 'json' | 'csv')}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="csv">CSV</option>
              <option value="json">JSON</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="include-unsubscribed"
              checked={includeUnsubscribed}
              onChange={(e) => setIncludeUnsubscribed(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="include-unsubscribed" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Include unsubscribed users
            </label>
          </div>
          
          <button
            onClick={handleExport}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>
      </div>

      {/* Recent Subscribers */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Subscribers</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Email</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Source</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stats.recent.map((subscriber) => (
                <tr key={subscriber.id} className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3 px-4 text-gray-900 dark:text-white">{subscriber.email}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300 capitalize">{subscriber.source}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                    {new Date(subscriber.subscribedAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      subscriber.confirmed 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {subscriber.confirmed ? 'Confirmed' : 'Pending'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleRemoveSubscriber(subscriber.id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      title="Remove subscriber"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Source Breakdown */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Subscription Sources</h3>
        <div className="space-y-3">
          {Object.entries(stats.sources).map(([source, count]) => (
            <div key={source} className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300 capitalize">{source}</span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(count / stats.total.confirmed) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white w-8 text-right">{count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
