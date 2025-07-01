// 📊 Advanced Analytics Dashboard Component
// Phase 4: Production Features - Simplified Version

'use client';

import React, { useState, useEffect } from 'react';

interface BusinessMetrics {
  revenue: {
    total: number;
    recurring: number;
    growth: number;
    forecast: number;
  };
  users: {
    total: number;
    active: number;
    churn: number;
    retention: number;
  };
  projects: {
    total: number;
    completed: number;
    averageTime: number;
    successRate: number;
  };
  performance: {
    pageViews: number;
    sessionDuration: number;
    bounceRate: number;
    conversion: number;
  };
}

interface MLInsights {
  predictions: {
    revenue: number[];
    userGrowth: number[];
    churnRisk: { userId: string; risk: number; factors: string[] }[];
  };
  recommendations: {
    priority: 'high' | 'medium' | 'low';
    category: string;
    suggestion: string;
    impact: string;
  }[];
  anomalies: {
    metric: string;
    value: number;
    expected: number;
    confidence: number;
  }[];
}

interface AnalyticsData {
  metrics: BusinessMetrics;
  insights: MLInsights | null;
  timeRange: string;
  lastUpdated: string;
}

export default function AdvancedAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/analytics?timeRange=${timeRange}&insights=true`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setData(result.data);
      } else {
        console.error('Failed to fetch analytics data');
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]); // eslint-disable-line react-hooks/exhaustive-deps

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(Math.round(value));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium';
      case 'medium': return 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium';
      case 'low': return 'bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium';
      default: return 'bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-900">📊 Advanced Analytics</h2>
          <div className="animate-spin h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow border animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-12">
        <div className="text-yellow-500 text-4xl mb-4">⚠️</div>
        <h3 className="text-lg font-semibold mb-2">No Analytics Data Available</h3>
        <p className="text-gray-600 mb-4">Unable to load analytics data at this time.</p>
        <button 
          onClick={fetchAnalytics}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          🔄 Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900">📊 Advanced Analytics</h2>
        <div className="flex gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button 
            onClick={fetchAnalytics}
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Revenue */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Total Revenue</h3>
            <span className="text-green-600">💰</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{formatCurrency(data.metrics.revenue.total)}</div>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <span className={data.metrics.revenue.growth >= 0 ? 'text-green-600' : 'text-red-600'}>
              {data.metrics.revenue.growth >= 0 ? '📈' : '📉'} {formatPercentage(Math.abs(data.metrics.revenue.growth))}
            </span>
            <span className="ml-1">from previous period</span>
          </div>
        </div>

        {/* Users */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Active Users</h3>
            <span className="text-blue-600">👥</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{formatNumber(data.metrics.users.active)}</div>
          <div className="text-xs text-gray-500 mt-1">
            {formatPercentage(data.metrics.users.retention)} retention rate
          </div>
        </div>

        {/* Projects */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Completed Projects</h3>
            <span className="text-purple-600">📊</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{formatNumber(data.metrics.projects.completed)}</div>
          <div className="text-xs text-gray-500 mt-1">
            {formatPercentage(data.metrics.projects.successRate)} success rate
          </div>
        </div>

        {/* Performance */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Page Views</h3>
            <span className="text-orange-600">📈</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{formatNumber(data.metrics.performance.pageViews)}</div>
          <div className="text-xs text-gray-500 mt-1">
            {formatPercentage(data.metrics.performance.conversion)} conversion rate
          </div>
        </div>
      </div>

      {/* ML Insights */}
      {data.insights && (
        <div className="space-y-6">
          {/* Predictions */}
          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-2">🧠</span>
              <h3 className="text-lg font-semibold text-gray-900">ML-Powered Predictions</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Revenue Forecast</h4>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(data.metrics.revenue.forecast)}
                </p>
                <p className="text-sm text-gray-600 mt-1">Next month</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">User Growth</h4>
                <p className="text-2xl font-bold text-blue-600">
                  +{formatNumber(data.insights.predictions.userGrowth[0] || 0)}
                </p>
                <p className="text-sm text-gray-600 mt-1">New users predicted</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Churn Risk</h4>
                <p className="text-2xl font-bold text-red-600">
                  {data.insights.predictions.churnRisk.length}
                </p>
                <p className="text-sm text-gray-600 mt-1">Users at risk</p>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-2">💡</span>
              <h3 className="text-lg font-semibold text-gray-900">AI Recommendations</h3>
            </div>
            <div className="space-y-4">
              {data.insights.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                  <span className={getPriorityColor(rec.priority)}>
                    {rec.priority.toUpperCase()}
                  </span>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{rec.category}</h4>
                    <p className="text-gray-700 mb-1">{rec.suggestion}</p>
                    <p className="text-sm text-green-600">💡 {rec.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Anomalies */}
          {data.insights.anomalies.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow border">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-2">⚠️</span>
                <h3 className="text-lg font-semibold text-gray-900">Detected Anomalies</h3>
              </div>
              <div className="space-y-3">
                {data.insights.anomalies.map((anomaly, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-900">{anomaly.metric}</h4>
                      <p className="text-sm text-gray-600">
                        Current: {formatNumber(anomaly.value)} | Expected: {formatNumber(anomaly.expected)}
                      </p>
                    </div>
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">
                      {formatPercentage(anomaly.confidence * 100)} confidence
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="text-center text-sm text-gray-500">
        Last updated: {new Date(data.lastUpdated).toLocaleString()}
      </div>
    </div>
  );
}
