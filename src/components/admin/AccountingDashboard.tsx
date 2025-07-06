'use client';

// 💰 Accounting Dashboard Component
// Main hub for all accounting and bookkeeping functions

import React, { useState, useEffect } from 'react';
import { Calculator, FileText, TrendingUp, Users, DollarSign, FolderTree, PlusCircle, BarChart3 } from 'lucide-react';
import GeneralLedger from './GeneralLedger';
import ChartOfAccounts from './ChartOfAccounts';
import JournalEntry from './JournalEntry';
import FinancialReports from './FinancialReports';

interface AccountingSummary {
  totalAssets: number;
  totalLiabilities: number;
  totalEquity: number;
  monthlyRevenue: number;
  monthlyExpenses: number;
  netIncome: number;
  accountsCount: number;
  journalEntriesCount: number;
  lastUpdated: string;
}

export default function AccountingDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [summary, setSummary] = useState<AccountingSummary | null>(null);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'chart-of-accounts', name: 'Chart of Accounts', icon: FolderTree },
    { id: 'journal-entry', name: 'Journal Entry', icon: PlusCircle },
    { id: 'general-ledger', name: 'General Ledger', icon: FileText },
    { id: 'financial-reports', name: 'Financial Reports', icon: TrendingUp }
  ];

  useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/accounting?action=dashboard-summary');
      const data = await response.json();
      if (data.success) {
        setSummary(data.data);
      }
    } catch (error) {
      console.error('Error loading accounting summary:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const StatCard = ({ title, value, icon: Icon, change, color }: {
    title: string;
    value: string | number;
    icon: React.ElementType;
    change?: number;
    color: string;
  }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow border p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-safe-muted">{title}</p>
          <p className="text-2xl font-bold text-safe">
            {typeof value === 'number' ? formatCurrency(value) : value}
          </p>
          {change !== undefined && (
            <p className={`text-xs ${change >= 0 ? 'text-safe-success' : 'text-safe-error'}`}>
              {change >= 0 ? '↗' : '↘'} {Math.abs(change).toFixed(1)}% from last month
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-3xl font-bold flex items-center gap-3 text-safe">
            <Calculator className="h-8 w-8" />
            Accounting & Bookkeeping
          </h1>
          <p className="mt-2 text-safe-muted">
            Manage your financial records with our comprehensive accounting system
          </p>
        </div>
        
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-safe-accent'
                      : 'border-transparent text-safe-muted hover:text-safe hover:border-gray-300 dark:text-safe-muted dark:hover:text-safe-muted'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Summary Stats */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow border p-6 animate-pulse">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : summary ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Assets"
                value={summary.totalAssets}
                icon={DollarSign}
                color="bg-green-500"
                change={5.2}
              />
              <StatCard
                title="Total Liabilities"
                value={summary.totalLiabilities}
                icon={TrendingUp}
                color="bg-red-500"
                change={-2.1}
              />
              <StatCard
                title="Owner's Equity"
                value={summary.totalEquity}
                icon={BarChart3}
                color="bg-blue-500"
                change={8.7}
              />
              <StatCard
                title="Net Income (MTD)"
                value={summary.netIncome}
                icon={Calculator}
                color={summary.netIncome >= 0 ? "bg-green-500" : "bg-red-500"}
                change={12.3}
              />
              <StatCard
                title="Monthly Revenue"
                value={summary.monthlyRevenue}
                icon={TrendingUp}
                color="bg-purple-500"
                change={15.6}
              />
              <StatCard
                title="Monthly Expenses"
                value={summary.monthlyExpenses}
                icon={FileText}
                color="bg-orange-500"
                change={-3.2}
              />
              <StatCard
                title="Chart of Accounts"
                value={summary.accountsCount}
                icon={FolderTree}
                color="bg-indigo-500"
              />
              <StatCard
                title="Journal Entries"
                value={summary.journalEntriesCount}
                icon={Users}
                color="bg-pink-500"
              />
            </div>
          ) : (
            <div className="text-center py-12">
              <Calculator className="h-12 w-12 text-safe-muted mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-safe mb-2">
                No Accounting Data Available
              </h3>
              <p className="text-safe-muted mb-4">
                Set up your chart of accounts to get started with accounting.
              </p>
              <button
                onClick={() => setActiveTab('chart-of-accounts')}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Set Up Chart of Accounts
              </button>
            </div>
          )}

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-safe">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => setActiveTab('journal-entry')}
                className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <PlusCircle className="h-6 w-6 text-safe-accent" />
                <div className="text-left">
                  <div className="font-medium text-safe">New Journal Entry</div>
                  <div className="text-sm text-safe-muted">Record a transaction</div>
                </div>
              </button>
              
              <button
                onClick={() => setActiveTab('general-ledger')}
                className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <FileText className="h-6 w-6 text-safe-success" />
                <div className="text-left">
                  <div className="font-medium text-safe">View General Ledger</div>
                  <div className="text-sm text-safe-muted">See all transactions</div>
                </div>
              </button>
              
              <button
                onClick={() => setActiveTab('financial-reports')}
                className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <TrendingUp className="h-6 w-6 text-safe-accent" />
                <div className="text-left">
                  <div className="font-medium text-safe">Financial Reports</div>
                  <div className="text-sm text-safe-muted">Generate statements</div>
                </div>
              </button>
              
              <button
                onClick={() => setActiveTab('chart-of-accounts')}
                className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <FolderTree className="h-6 w-6 text-safe-warning" />
                <div className="text-left">
                  <div className="font-medium text-safe">Manage Accounts</div>
                  <div className="text-sm text-safe-muted">Chart of accounts</div>
                </div>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-safe">Recent Activity</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-safe">
                    Journal Entry #JE-2024-001 posted
                  </div>
                  <div className="text-xs text-safe-muted">2 hours ago</div>
                </div>
                <div className="text-sm text-safe-muted">$1,500.00</div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-safe">
                    New account added: Office Supplies
                  </div>
                  <div className="text-xs text-safe-muted">1 day ago</div>
                </div>
                <div className="text-sm text-safe-muted">Account #6100</div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-safe">
                    Financial reports generated
                  </div>
                  <div className="text-xs text-safe-muted">2 days ago</div>
                </div>
                <div className="text-sm text-safe-muted">Balance Sheet</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'chart-of-accounts' && <ChartOfAccounts />}
      {activeTab === 'journal-entry' && <JournalEntry />}
      {activeTab === 'general-ledger' && <GeneralLedger />}
      {activeTab === 'financial-reports' && <FinancialReports />}
    </div>
  );
}
