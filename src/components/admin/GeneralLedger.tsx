'use client';

// 📊 General Ledger Component
// Comprehensive view of all accounting transactions

import React, { useState, useEffect } from 'react';
import { Calendar, Download, Plus, Search, Eye } from 'lucide-react';

interface LedgerEntry {
  id: string;
  date: string;
  accountName: string;
  accountNumber: string;
  description: string;
  reference?: string;
  debitAmount: number;
  creditAmount: number;
  journalEntryId: string;
  entryNumber: string;
  isPosted: boolean;
}

interface Account {
  id: string;
  accountNumber: string;
  accountName: string;
  accountType: string;
  balance: number;
}

interface JournalEntry {
  id: string;
  entryNumber: string;
  date: string;
  description: string;
  reference?: string;
  totalDebit: number;
  totalCredit: number;
  isPosted: boolean;
  createdBy: string;
}

export default function GeneralLedger() {
  const [ledgerEntries, setLedgerEntries] = useState<LedgerEntry[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState<string>('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [showJournalDialog, setShowJournalDialog] = useState(false);
  const [selectedJournalEntry, setSelectedJournalEntry] = useState<JournalEntry | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load accounts
      const accountsResponse = await fetch('/api/accounting?action=chart-of-accounts');
      const accountsData = await accountsResponse.json();
      if (accountsData.success) {
        setAccounts(accountsData.data);
      }

      // Load general ledger
      const ledgerResponse = await fetch('/api/accounting?action=general-ledger');
      const ledgerData = await ledgerResponse.json();
      if (ledgerData.success) {
        setLedgerEntries(ledgerData.data);
      }

      // Load journal entries
      const journalResponse = await fetch('/api/accounting?action=journal-entries');
      const journalData = await journalResponse.json();
      if (journalData.success) {
        setJournalEntries(journalData.data);
      }
    } catch (error) {
      console.error('Error loading accounting data:', error);
      alert('Failed to load accounting data');
    } finally {
      setLoading(false);
    }
  };

  const filteredEntries = ledgerEntries.filter(entry => {
    const matchesAccount = !selectedAccount || entry.accountName.includes(selectedAccount);
    const matchesSearch = !searchTerm || 
      entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.reference?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.entryNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const entryDate = new Date(entry.date);
    const matchesDateRange = (!dateRange.start || entryDate >= new Date(dateRange.start)) &&
                           (!dateRange.end || entryDate <= new Date(dateRange.end));
    
    return matchesAccount && matchesSearch && matchesDateRange;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const exportLedger = async () => {
    try {
      const params = new URLSearchParams({
        action: 'export-ledger',
        ...(selectedAccount && { accountId: selectedAccount }),
        ...(dateRange.start && { startDate: dateRange.start }),
        ...(dateRange.end && { endDate: dateRange.end })
      });

      const response = await fetch(`/api/accounting?${params}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `general-ledger-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      alert('General ledger exported successfully');
    } catch (error) {
      console.error('Error exporting ledger:', error);
      alert('Failed to export general ledger');
    }
  };

  const viewJournalEntry = (entryId: string) => {
    const entry = journalEntries.find(je => je.id === entryId);
    if (entry) {
      setSelectedJournalEntry(entry);
      setShowJournalDialog(true);
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-safe">
            <Calendar className="h-6 w-6" />
            General Ledger
          </h2>
        </div>
        <div className="p-6">
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-safe">Account</label>
              <select 
                value={selectedAccount} 
                onChange={(e) => setSelectedAccount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-safe"
              >
                <option value="">All accounts</option>
                {accounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.accountNumber} - {account.accountName}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-safe">Start Date</label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-safe"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-safe">End Date</label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-safe"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-safe">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-safe-muted" />
                <input
                  placeholder="Search entries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-safe"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 mb-6">
            <button 
              onClick={exportLedger}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 text-safe"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
            <button 
              onClick={() => window.location.href = '/admin/accounting/journal-entry'}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              New Journal Entry
            </button>
          </div>

          {/* Ledger Table */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-safe-muted uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-safe-muted uppercase tracking-wider">Account</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-safe-muted uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-safe-muted uppercase tracking-wider">Reference</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-safe-muted uppercase tracking-wider">Debit</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-safe-muted uppercase tracking-wider">Credit</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-safe-muted uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-safe-muted uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredEntries.map((entry) => (
                    <tr key={entry.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-safe">
                        {new Date(entry.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-safe">{entry.accountNumber}</div>
                          <div className="text-sm text-safe-muted">{entry.accountName}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-safe">{entry.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {entry.reference && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-safe dark:text-gray-200">
                            {entry.reference}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-safe">
                        {entry.debitAmount > 0 ? formatCurrency(entry.debitAmount) : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-safe">
                        {entry.creditAmount > 0 ? formatCurrency(entry.creditAmount) : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          entry.isPosted 
                            ? 'bg-green-100 dark:bg-green-900 text-safe-success dark:text-green-200' 
                            : 'bg-yellow-100 dark:bg-yellow-900 text-safe-warning dark:text-yellow-200'
                        }`}>
                          {entry.isPosted ? 'Posted' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => viewJournalEntry(entry.journalEntryId)}
                          className="text-safe-accent hover:text-safe-accent dark:hover:text-blue-300"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredEntries.length === 0 && (
            <div className="text-center py-8 text-safe-muted">
              No ledger entries found matching your criteria.
            </div>
          )}
        </div>
      </div>

      {/* Journal Entry Modal */}
      {showJournalDialog && selectedJournalEntry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-safe">Journal Entry Details</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-safe">Entry Number</label>
                  <div className="text-lg font-mono text-safe">{selectedJournalEntry.entryNumber}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-safe">Date</label>
                  <div className="text-safe">{new Date(selectedJournalEntry.date).toLocaleDateString()}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-safe">Total Debit</label>
                  <div className="text-safe-success font-medium">
                    {formatCurrency(selectedJournalEntry.totalDebit)}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-safe">Total Credit</label>
                  <div className="text-safe-error font-medium">
                    {formatCurrency(selectedJournalEntry.totalCredit)}
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-safe">Description</label>
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-md text-safe">{selectedJournalEntry.description}</div>
              </div>
              {selectedJournalEntry.reference && (
                <div>
                  <label className="block text-sm font-medium mb-1 text-safe">Reference</label>
                  <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-md text-safe">{selectedJournalEntry.reference}</div>
                </div>
              )}
              <div className="flex items-center gap-2">
                <label className="block text-sm font-medium text-safe">Status:</label>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  selectedJournalEntry.isPosted 
                    ? 'bg-green-100 dark:bg-green-900 text-safe-success dark:text-green-200' 
                    : 'bg-yellow-100 dark:bg-yellow-900 text-safe-warning dark:text-yellow-200'
                }`}>
                  {selectedJournalEntry.isPosted ? 'Posted' : 'Draft'}
                </span>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button
                onClick={() => setShowJournalDialog(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
