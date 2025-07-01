/**
 * CRM Dashboard Component
 * 
 * Client Relationship Management interface
 * 
 * @module CRMDashboard
 * @version 1.0.0
 */

'use client';

import React, { useState } from 'react';
import { User } from '../../lib/auth';

interface CRMDashboardProps {
  user: User;
}

interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  status: 'active' | 'inactive' | 'prospect';
  projects: number;
  totalValue: number;
  lastContact: string;
}

export default function CRMDashboard({ user }: CRMDashboardProps) {
  const [activeTab, setActiveTab] = useState<'clients' | 'leads' | 'analytics'>('clients');

  const clients: Client[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john@acmecorp.com',
      company: 'Acme Corporation',
      status: 'active',
      projects: 3,
      totalValue: 15000,
      lastContact: '2 days ago'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@techstart.io',
      company: 'TechStart Inc',
      status: 'active',
      projects: 2,
      totalValue: 8500,
      lastContact: '1 week ago'
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike@consulting.com',
      company: 'Wilson Consulting',
      status: 'prospect',
      projects: 0,
      totalValue: 0,
      lastContact: '3 days ago'
    }
  ];

  const getStatusColor = (status: Client['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      case 'prospect': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Client Management</h3>
        
        {/* Navigation */}
        <div className="flex space-x-4 mb-6">
          {[
            { key: 'clients', label: 'Clients', icon: '👥' },
            { key: 'leads', label: 'Leads', icon: '🎯' },
            { key: 'analytics', label: 'Analytics', icon: '📊' }
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key as typeof activeTab)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === item.key
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'clients' && (
          <div className="space-y-4">
            {/* Client Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-1">Total Clients</h4>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  {clients.filter(c => c.status === 'active').length}
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-1">Active Projects</h4>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                  {clients.reduce((sum, client) => sum + client.projects, 0)}
                </p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-1">Total Value</h4>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                  ${clients.reduce((sum, client) => sum + client.totalValue, 0).toLocaleString()}
                </p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">Prospects</h4>
                <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
                  {clients.filter(c => c.status === 'prospect').length}
                </p>
              </div>
            </div>

            {/* Client List */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Client</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Company</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Projects</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Value</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Last Contact</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <tr key={client.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{client.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{client.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-900 dark:text-white">{client.company}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(client.status)}`}>
                          {client.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-900 dark:text-white">{client.projects}</td>
                      <td className="py-3 px-4 text-gray-900 dark:text-white">${client.totalValue.toLocaleString()}</td>
                      <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{client.lastContact}</td>
                      <td className="py-3 px-4">
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">🎯</span>
            <p className="text-gray-600 dark:text-gray-400">Lead management coming soon</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              Track and convert prospects into clients
            </p>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">📊</span>
            <p className="text-gray-600 dark:text-gray-400">Client analytics coming soon</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              Detailed insights into client relationships
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
