'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Users, 
  Activity, 
  BarChart3, 
  Settings,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Globe,
  FileText,
  Clock,
  DollarSign
} from 'lucide-react';
import toast from 'react-hot-toast';

interface EnterpriseMetrics {
  totalUsers: number;
  activeUsers: number;
  ssoUsers: number;
  projects: {
    total: number;
    active: number;
    completed: number;
  };
  revenue: {
    total: number;
    monthly: number;
    growth: number;
  };
  security: {
    auditEvents: number;
    criticalEvents: number;
    lastIncident: string | null;
  };
  performance: {
    uptime: number;
    responseTime: number;
    errorRate: number;
  };
}

interface SystemHealth {
  database: 'healthy' | 'warning' | 'critical';
  api: 'healthy' | 'warning' | 'critical';
  sso: 'healthy' | 'warning' | 'critical';
  backup: 'healthy' | 'warning' | 'critical';
}

export default function EnterpriseManagement() {
  const [metrics, setMetrics] = useState<EnterpriseMetrics | null>(null);
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    setLoading(true);
    try {
      // Load enterprise metrics and system health
      const [metricsResponse, healthResponse] = await Promise.all([
        fetch('/api/admin/enterprise?action=metrics'),
        fetch('/api/admin/enterprise?action=health')
      ]);

      if (metricsResponse.ok) {
        const metricsData = await metricsResponse.json();
        setMetrics(metricsData.data);
      }

      if (healthResponse.ok) {
        const healthData = await healthResponse.json();
        setSystemHealth(healthData.data);
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getHealthIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-5 h-5 text-safe-success" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-safe-warning" />;
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-safe-error" />;
      default:
        return <Clock className="w-5 h-5 text-safe-muted" />;
    }
  };

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-safe-success bg-green-50';
      case 'warning':
        return 'text-safe-warning bg-yellow-50';
      case 'critical':
        return 'text-safe-error bg-red-50';
      default:
        return 'text-safe-muted bg-gray-50';
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-safe">Enterprise Management</h1>
        <div className="flex space-x-2">
          <button
            onClick={loadDashboard}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', name: 'Overview', icon: BarChart3 },
            { id: 'users', name: 'User Management', icon: Users },
            { id: 'security', name: 'Security & SSO', icon: Shield },
            { id: 'audit', name: 'Audit Logs', icon: Activity },
            { id: 'projects', name: 'Project Management', icon: FileText },
            { id: 'settings', name: 'System Settings', icon: Settings }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                activeTab === tab.id
                  ? 'border-blue-500 text-safe-accent'
                  : 'border-transparent text-safe-muted hover:text-safe hover:border-gray-300'
              } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-safe-muted">Total Users</p>
                  <p className="text-2xl font-bold text-safe">{metrics?.totalUsers || 0}</p>
                </div>
                <Users className="w-8 h-8 text-safe-accent" />
              </div>
              <div className="mt-2">
                <span className="text-sm text-safe-success">
                  {metrics?.ssoUsers || 0} SSO users
                </span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-safe-muted">Active Projects</p>
                  <p className="text-2xl font-bold text-safe">{metrics?.projects?.active || 0}</p>
                </div>
                <FileText className="w-8 h-8 text-safe-success" />
              </div>
              <div className="mt-2">
                <span className="text-sm text-safe-muted">
                  {metrics?.projects?.total || 0} total projects
                </span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-safe-muted">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-safe">
                    ${metrics?.revenue?.monthly?.toLocaleString() || 0}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-safe-accent" />
              </div>
              <div className="mt-2">
                <span className="text-sm text-safe-success flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {metrics?.revenue?.growth || 0}% growth
                </span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-safe-muted">System Uptime</p>
                  <p className="text-2xl font-bold text-safe">
                    {metrics?.performance?.uptime || 99.9}%
                  </p>
                </div>
                <Globe className="w-8 h-8 text-safe-accent" />
              </div>
              <div className="mt-2">
                <span className="text-sm text-safe-muted">
                  {metrics?.performance?.responseTime || 150}ms avg response
                </span>
              </div>
            </div>
          </div>

          {/* System Health Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-safe mb-4">System Health</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {systemHealth && Object.entries(systemHealth).map(([system, status]) => (
                <div
                  key={system}
                  className={`p-4 rounded-lg border ${getHealthColor(status)}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium capitalize">{system}</p>
                      <p className="text-sm capitalize">{status}</p>
                    </div>
                    {getHealthIcon(status)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security Overview */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-safe mb-4">Security Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-safe">
                  {metrics?.security?.auditEvents || 0}
                </div>
                <div className="text-sm text-safe-muted">Audit Events (24h)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-safe-error">
                  {metrics?.security?.criticalEvents || 0}
                </div>
                <div className="text-sm text-safe-muted">Critical Events</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-safe">Last Incident</div>
                <div className="text-sm text-safe-muted">
                  {metrics?.security?.lastIncident || 'No incidents'}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Placeholder for other tabs */}
      {activeTab !== 'overview' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="text-center py-12">
            <div className="text-safe-muted mb-4">
              {activeTab === 'users' && <Users className="w-16 h-16 mx-auto" />}
              {activeTab === 'security' && <Shield className="w-16 h-16 mx-auto" />}
              {activeTab === 'audit' && <Activity className="w-16 h-16 mx-auto" />}
              {activeTab === 'projects' && <FileText className="w-16 h-16 mx-auto" />}
              {activeTab === 'settings' && <Settings className="w-16 h-16 mx-auto" />}
            </div>
            <h3 className="text-lg font-medium text-safe mb-2">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
            </h3>
            <p className="text-safe-muted">
              Advanced {activeTab} management features are available in the full enterprise dashboard.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setActiveTab('overview')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Back to Overview
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
