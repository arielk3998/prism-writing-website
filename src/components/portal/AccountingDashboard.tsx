/**
 * Accounting Dashboard Component
 * 
 * Financial management and accounting interface
 * 
 * @module AccountingDashboard
 * @version 1.0.0
 */

'use client';

import React, { useState } from 'react';
import { User } from '../../lib/auth';

interface AccountingDashboardProps {
  user: User;
}

export default function AccountingDashboard({ user }: AccountingDashboardProps) {
  const [activeView, setActiveView] = useState<'overview' | 'invoices' | 'expenses' | 'reports'>('overview');

  const financialData = {
    revenue: 125750,
    expenses: 89200,
    profit: 36550,
    outstandingInvoices: 15400,
    monthlyGrowth: 12.5
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Financial Management</h3>
        
        {/* Navigation */}
        <div className="flex space-x-4 mb-6">
          {[
            { key: 'overview', label: 'Overview', icon: '📊' },
            { key: 'invoices', label: 'Invoices', icon: '📄' },
            { key: 'expenses', label: 'Expenses', icon: '💳' },
            { key: 'reports', label: 'Reports', icon: '📈' }
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveView(item.key as typeof activeView)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeView === item.key
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
        {activeView === 'overview' && (
          <div className="space-y-6">
            {/* Financial Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Total Revenue</h4>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                  ${financialData.revenue.toLocaleString()}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400">
                  +{financialData.monthlyGrowth}% this month
                </p>
              </div>
              
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">Total Expenses</h4>
                <p className="text-2xl font-bold text-red-900 dark:text-red-100">
                  ${financialData.expenses.toLocaleString()}
                </p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Net Profit</h4>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  ${financialData.profit.toLocaleString()}
                </p>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Outstanding</h4>
                <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
                  ${financialData.outstandingInvoices.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">Recent Transactions</h4>
              <div className="space-y-3">
                {[
                  { type: 'income', description: 'Payment from Acme Corp', amount: 2500, date: '2 hours ago' },
                  { type: 'expense', description: 'Software License', amount: -299, date: '1 day ago' },
                  { type: 'income', description: 'Project Milestone Payment', amount: 1800, date: '2 days ago' }
                ].map((transaction, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        transaction.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}>
                        {transaction.type === 'income' ? '↗' : '↙'}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{transaction.description}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{transaction.date}</p>
                      </div>
                    </div>
                    <span className={`font-semibold ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeView === 'invoices' && (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">📄</span>
            <p className="text-gray-600 dark:text-gray-400">Invoice management coming soon</p>
          </div>
        )}

        {activeView === 'expenses' && (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">💳</span>
            <p className="text-gray-600 dark:text-gray-400">Expense tracking coming soon</p>
          </div>
        )}

        {activeView === 'reports' && (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">📈</span>
            <p className="text-gray-600 dark:text-gray-400">Financial reports coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
}
