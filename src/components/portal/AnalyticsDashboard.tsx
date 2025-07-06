/**
 * Analytics Dashboard Component
 * 
 * Comprehensive analytics and reporting interface
 * 
 * @module AnalyticsDashboard
 * @version 1.0.0
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User } from '../../lib/auth';

interface AnalyticsDashboardProps {
  user: User;
}

export default function AnalyticsDashboard({ user }: AnalyticsDashboardProps) {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  const analyticsData = {
    revenue: {
      current: 28450,
      previous: 24200,
      trend: 17.5
    },
    projects: {
      active: 12,
      completed: 28,
      total: 45
    },
    team: {
      utilization: 87,
      satisfaction: 4.8,
      productivity: 92
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-safe">Analytics Dashboard</h3>
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as typeof timeRange)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-white"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>

        {/* Revenue Chart Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-gray-50 dark:bg-gray-700 rounded-lg p-6 h-64">
            <h4 className="font-medium text-safe mb-4">Revenue Trend</h4>
            <div className="flex items-center justify-center h-full text-safe-muted">
              📊 Chart visualization coming soon
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <h5 className="font-medium text-safe-success dark:text-green-200">Total Revenue</h5>
              <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                ${analyticsData.revenue.current.toLocaleString()}
              </p>
              <p className="text-sm text-safe-success">
                +{analyticsData.revenue.trend}% from last period
              </p>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <h5 className="font-medium text-safe-accent dark:text-blue-200">Active Projects</h5>
              <p className="text-2xl font-bold text-safe-accent dark:text-blue-100">
                {analyticsData.projects.active}
              </p>
              <p className="text-sm text-safe-accent">
                {analyticsData.projects.completed} completed this month
              </p>
            </div>
          </div>
        </div>

        {/* Team Performance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <h5 className="font-medium text-safe mb-2">Team Utilization</h5>
            <div className="relative w-32 h-32 mx-auto">
              <svg className="transform -rotate-90 w-32 h-32">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-gray-200 dark:text-safe"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${analyticsData.team.utilization * 3.51} 351`}
                  className="text-safe-accent"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-safe">
                  {analyticsData.team.utilization}%
                </span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h5 className="font-medium text-safe mb-2">Client Satisfaction</h5>
            <div className="flex items-center justify-center space-x-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <span 
                  key={i} 
                  className={`text-2xl ${i < Math.floor(analyticsData.team.satisfaction) ? 'text-yellow-400' : 'text-safe-muted'}`}
                >
                  ⭐
                </span>
              ))}
            </div>
            <p className="text-2xl font-bold text-safe">
              {analyticsData.team.satisfaction}/5
            </p>
          </div>

          <div className="text-center">
            <h5 className="font-medium text-safe mb-2">Productivity Score</h5>
            <div className="relative w-32 h-32 mx-auto">
              <svg className="transform -rotate-90 w-32 h-32">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-gray-200 dark:text-safe"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${analyticsData.team.productivity * 3.51} 351`}
                  className="text-safe-success"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-safe">
                  {analyticsData.team.productivity}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
