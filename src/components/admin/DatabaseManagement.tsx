'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Database, 
  Play, 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  Users,
  Mail,
  FolderOpen,
  AlertTriangle,
  Activity
} from 'lucide-react';
import toast from 'react-hot-toast';

interface MigrationStatus {
  databaseConnected: boolean;
  userCount: number;
  newsletterCount: number;
  projectCount: number;
}

interface MigrationResult {
  success: boolean;
  message: string;
  data: {
    users: number;
    sessions: number;
    newsletters: number;
  };
  errors: string[];
}

export default function DatabaseManagement() {
  const [status, setStatus] = useState<MigrationStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [migrating, setMigrating] = useState(false);
  const [lastMigration, setLastMigration] = useState<MigrationResult | null>(null);

  useEffect(() => {
    loadStatus();
  }, []);

  const loadStatus = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/migration');
      if (response.ok) {
        const data = await response.json();
        setStatus(data.data);
      } else {
        throw new Error('Failed to load status');
      }
    } catch (error) {
      console.error('Error loading migration status:', error);
      toast.error('Failed to load database status');
    } finally {
      setLoading(false);
    }
  };

  const runMigration = async () => {
    setMigrating(true);
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        toast.error('Authentication required');
        return;
      }

      const response = await fetch('/api/admin/migration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ action: 'migrate' }),
      });

      const result = await response.json();
      setLastMigration(result);

      if (result.success) {
        toast.success('Database migration completed successfully!');
        await loadStatus(); // Refresh status
      } else {
        toast.error('Migration completed with errors. Check the details below.');
      }

    } catch (error) {
      console.error('Migration error:', error);
      toast.error('Failed to run migration');
    } finally {
      setMigrating(false);
    }
  };

  const getStatusColor = (connected: boolean) => {
    return connected ? 'text-safe-success' : 'text-safe-error';
  };

  const getStatusIcon = (connected: boolean) => {
    return connected ? (
      <CheckCircle className="w-5 h-5 text-safe-success" />
    ) : (
      <XCircle className="w-5 h-5 text-safe-error" />
    );
  };

  if (loading && !status) {
    return (
      <div className="flex items-center justify-center h-96">
        <RefreshCw className="w-8 h-8 animate-spin text-safe-accent" />
        <span className="ml-2 text-safe-muted">Loading database status...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Database Status Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
      >
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-safe flex items-center">
              <Database className="w-5 h-5 mr-2" />
              Database Status
            </h3>
            <button
              onClick={loadStatus}
              disabled={loading}
              className="px-3 py-2 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        <div className="p-6">
          {status ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Database Connection */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-safe-muted">Database</p>
                  <p className={`text-lg font-semibold ${getStatusColor(status.databaseConnected)}`}>
                    {status.databaseConnected ? 'Connected' : 'Disconnected'}
                  </p>
                </div>
                {getStatusIcon(status.databaseConnected)}
              </div>

              {/* Users Count */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-safe-muted">Users</p>
                  <p className="text-lg font-semibold text-safe">
                    {status.userCount}
                  </p>
                </div>
                <Users className="w-8 h-8 text-safe-accent" />
              </div>

              {/* Newsletter Subscriptions */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-safe-muted">Newsletters</p>
                  <p className="text-lg font-semibold text-safe">
                    {status.newsletterCount}
                  </p>
                </div>
                <Mail className="w-8 h-8 text-safe-success" />
              </div>

              {/* Projects */}
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-safe-muted">Projects</p>
                  <p className="text-lg font-semibold text-safe">
                    {status.projectCount}
                  </p>
                </div>
                <FolderOpen className="w-8 h-8 text-safe-accent" />
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertTriangle className="w-12 h-12 text-safe-warning mx-auto mb-4" />
              <p className="text-safe-muted">Unable to load database status</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Migration Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
      >
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-safe flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            Database Migration
          </h3>
          <p className="text-sm text-safe-muted mt-1">
            Migrate data from in-memory storage to PostgreSQL database
          </p>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-medium text-safe">
                Migrate to PostgreSQL
              </h4>
              <p className="text-sm text-safe-muted">
                This will create users, newsletter subscriptions, and sample projects in the database
              </p>
            </div>
            <button
              onClick={runMigration}
              disabled={migrating || !status?.databaseConnected}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {migrating ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Migrating...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Run Migration
                </>
              )}
            </button>
          </div>

          {!status?.databaseConnected && (
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg mb-4">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-safe-warning dark:text-yellow-400 mr-2" />
                <p className="text-sm text-safe-warning dark:text-yellow-200">
                  Database connection required before running migration
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Migration Results */}
      {lastMigration && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
        >
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-safe flex items-center">
              {lastMigration.success ? (
                <CheckCircle className="w-5 h-5 mr-2 text-safe-success" />
              ) : (
                <XCircle className="w-5 h-5 mr-2 text-safe-error" />
              )}
              Migration Results
            </h3>
          </div>

          <div className="p-6">
            <div className={`p-4 rounded-lg mb-4 ${
              lastMigration.success 
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
            }`}>
              <p className={`text-sm font-medium ${
                lastMigration.success 
                  ? 'text-safe-success dark:text-green-200'
                  : 'text-safe-error dark:text-red-200'
              }`}>
                {lastMigration.message}
              </p>
            </div>

            {/* Migration Statistics */}
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-2xl font-bold text-safe-accent">
                  {lastMigration.data.users}
                </p>
                <p className="text-sm text-safe-muted">Users Migrated</p>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-2xl font-bold text-safe-success">
                  {lastMigration.data.newsletters}
                </p>
                <p className="text-sm text-safe-muted">Newsletter Subs</p>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-2xl font-bold text-safe-accent dark:text-purple-400">
                  {lastMigration.data.sessions}
                </p>
                <p className="text-sm text-safe-muted">Sessions</p>
              </div>
            </div>

            {/* Errors */}
            {lastMigration.errors.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-safe mb-2">
                  Migration Errors:
                </h4>
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                  {lastMigration.errors.map((error, index) => (
                    <p key={index} className="text-sm text-safe-error dark:text-red-200 mb-1">
                      • {error}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
