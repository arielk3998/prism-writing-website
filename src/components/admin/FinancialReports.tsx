// 📊 Financial Reports Component
// GAAP/IFRS Compliant Financial Reports

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  AlertCircle, 
  Download, 
  Eye, 
  Calendar
} from 'lucide-react';

interface FinancialStatement {
  balanceSheet?: {
    asOfDate: string;
    standard: string;
    assets: {
      currentAssets: Array<{ accountName: string; balance: number }>;
      fixedAssets: Array<{ accountName: string; balance: number }>;
      totalAssets: number;
    };
    liabilities: {
      currentLiabilities: Array<{ accountName: string; balance: number }>;
      longTermLiabilities: Array<{ accountName: string; balance: number }>;
      totalLiabilities: number;
    };
    equity: {
      equityAccounts: Array<{ accountName: string; balance: number }>;
      totalEquity: number;
    };
  };
  incomeStatement?: {
    period: { startDate: string; endDate: string };
    standard: string;
    revenue: {
      operatingRevenue: Array<{ accountName: string; balance: number }>;
      nonOperatingRevenue: Array<{ accountName: string; balance: number }>;
      totalRevenue: number;
    };
    expenses: {
      costOfGoodsSold: Array<{ accountName: string; balance: number }>;
      operatingExpenses: Array<{ accountName: string; balance: number }>;
      nonOperatingExpenses: Array<{ accountName: string; balance: number }>;
      totalExpenses: number;
    };
    netIncome: number;
  };
  cashFlowStatement?: {
    period: { startDate: string; endDate: string };
    standard: string;
    operatingActivities: number;
    investingActivities: number;
    financingActivities: number;
    netCashFlow: number;
  };
  trialBalance?: Array<{
    accountNumber: string;
    accountName: string;
    debitBalance: number;
    creditBalance: number;
  }>;
  metadata?: {
    reportType: string;
    period: { startDate: string; endDate: string };
    standard: string;
    format: string;
    generatedAt: string;
  };
}

const FinancialReports: React.FC = () => {
  const [reports, setReports] = useState<FinancialStatement | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('balance-sheet');
  
  // Form state
  const [reportType, setReportType] = useState('comprehensive');
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setMonth(0, 1); // January 1st of current year
    return date.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });
  const [standard, setStandard] = useState('GAAP');

  const loadReports = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        action: 'financial-reports',
        reportType,
        startDate,
        endDate,
        standard,
        format: 'summary'
      });

      const response = await fetch(`/api/accounting?${params}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to load financial reports');
      }

      setReports(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [reportType, startDate, endDate, standard]);

  useEffect(() => {
    loadReports();
  }, [loadReports]);

  const exportReport = async (exportFormat: string) => {
    try {
      const params = new URLSearchParams({
        action: 'export-report',
        reportType,
        startDate,
        endDate,
        exportFormat
      });

      const response = await fetch(`/api/accounting?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to export report');
      }

      // Create download link
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `financial-report-${reportType}-${new Date().toISOString().split('T')[0]}.${exportFormat}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Export failed');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Financial Reports</h2>
        <div className="flex gap-2">
          <button
            onClick={() => exportReport('csv')}
            disabled={loading || !reports}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-safe bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:text-safe-muted dark:hover:bg-gray-600"
          >
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </button>
          <button
            onClick={() => exportReport('json')}
            disabled={loading || !reports}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-safe bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:text-safe-muted dark:hover:bg-gray-600"
          >
            <Download className="h-4 w-4 mr-2" />
            Export JSON
          </button>
        </div>
      </div>

      {/* Report Parameters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Report Parameters
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label htmlFor="reportType" className="block text-sm font-medium text-safe mb-1">
              Report Type
            </label>
            <select
              id="reportType"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-safe-muted"
            >
              <option value="comprehensive">Comprehensive</option>
              <option value="balance-sheet">Balance Sheet</option>
              <option value="income-statement">Income Statement</option>
              <option value="cash-flow">Cash Flow</option>
              <option value="trial-balance">Trial Balance</option>
            </select>
          </div>

          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-safe mb-1">
              Start Date
            </label>
            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-safe-muted"
            />
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-safe mb-1">
              End Date
            </label>
            <input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-safe-muted"
            />
          </div>

          <div>
            <label htmlFor="standard" className="block text-sm font-medium text-safe mb-1">
              Accounting Standard
            </label>
            <select
              id="standard"
              value={standard}
              onChange={(e) => setStandard(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-safe-muted"
            >
              <option value="GAAP">US GAAP</option>
              <option value="IFRS">IFRS</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={loadReports}
              disabled={loading}
              className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Eye className="h-4 w-4 mr-2" />
              {loading ? 'Generating...' : 'Generate Report'}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-safe-error" />
            <span className="text-safe-error dark:text-red-200">{error}</span>
          </div>
        </div>
      )}

      {reports && (
        <div className="space-y-4">
          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'balance-sheet', label: 'Balance Sheet', disabled: !reports.balanceSheet },
                { id: 'income-statement', label: 'Income Statement', disabled: !reports.incomeStatement },
                { id: 'cash-flow', label: 'Cash Flow', disabled: !reports.cashFlowStatement },
                { id: 'trial-balance', label: 'Trial Balance', disabled: !reports.trialBalance }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  disabled={tab.disabled}
                  className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-safe-accent'
                      : 'border-transparent text-safe-muted hover:text-safe hover:border-gray-300 dark:text-safe-muted dark:hover:text-safe-muted'
                  } ${tab.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="mt-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <p className="text-safe-muted">
                Financial reports will be displayed here when the backend accounting system is fully connected.
                The export functionality is ready and the UI components for Balance Sheet, Income Statement, 
                Cash Flow Statement, and Trial Balance are prepared.
              </p>
              
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-medium text-safe-accent dark:text-blue-200 mb-2">Available Reports:</h4>
                <ul className="text-sm text-safe-accent space-y-1">
                  <li>• Balance Sheet (GAAP/IFRS compliant)</li>
                  <li>• Income Statement with profit margins</li>
                  <li>• Cash Flow Statement</li>
                  <li>• Trial Balance with validation</li>
                  <li>• Export to CSV/JSON formats</li>
                </ul>
              </div>

              {reports.metadata && (
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <label className="block text-sm font-medium text-safe mb-1">Report Type</label>
                    <p className="font-mono">{reports.metadata.reportType}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-safe mb-1">Standard</label>
                    <p className="font-mono">{reports.metadata.standard}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-safe mb-1">Format</label>
                    <p className="font-mono">{reports.metadata.format}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-safe mb-1">Generated</label>
                    <p className="font-mono text-xs">{formatDate(reports.metadata.generatedAt)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialReports;
