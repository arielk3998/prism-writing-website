'use client';

// ✍️ Journal Entry Component
// Create and manage journal entries for double-entry bookkeeping

import React, { useState, useEffect } from 'react';
import { Plus, Minus, Save, Calculator, FileText } from 'lucide-react';

interface Account {
  id: string;
  accountNumber: string;
  accountName: string;
  accountType: string;
  balance: number;
}

interface JournalEntryLine {
  id: string;
  accountId: string;
  debitAmount: number;
  creditAmount: number;
  description: string;
}

interface JournalEntryForm {
  entryNumber: string;
  date: string;
  description: string;
  reference: string;
  lines: JournalEntryLine[];
}

export default function JournalEntry() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [journalEntry, setJournalEntry] = useState<JournalEntryForm>({
    entryNumber: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    reference: '',
    lines: [
      { id: '1', accountId: '', debitAmount: 0, creditAmount: 0, description: '' },
      { id: '2', accountId: '', debitAmount: 0, creditAmount: 0, description: '' }
    ]
  });

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

      // Generate entry number
      const entryResponse = await fetch('/api/accounting?action=next-entry-number');
      const entryData = await entryResponse.json();
      if (entryData.success) {
        setJournalEntry(prev => ({ ...prev, entryNumber: entryData.data }));
      }
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const addLine = () => {
    const newLine: JournalEntryLine = {
      id: Date.now().toString(),
      accountId: '',
      debitAmount: 0,
      creditAmount: 0,
      description: ''
    };
    setJournalEntry(prev => ({
      ...prev,
      lines: [...prev.lines, newLine]
    }));
  };

  const removeLine = (lineId: string) => {
    if (journalEntry.lines.length > 2) {
      setJournalEntry(prev => ({
        ...prev,
        lines: prev.lines.filter(line => line.id !== lineId)
      }));
    }
  };

  const updateLine = (lineId: string, field: keyof JournalEntryLine, value: string | number) => {
    setJournalEntry(prev => ({
      ...prev,
      lines: prev.lines.map(line => 
        line.id === lineId 
          ? { ...line, [field]: value }
          : line
      )
    }));
  };

  const getTotalDebits = () => {
    return journalEntry.lines.reduce((sum, line) => sum + (line.debitAmount || 0), 0);
  };

  const getTotalCredits = () => {
    return journalEntry.lines.reduce((sum, line) => sum + (line.creditAmount || 0), 0);
  };

  const isBalanced = () => {
    const debits = getTotalDebits();
    const credits = getTotalCredits();
    return Math.abs(debits - credits) < 0.01 && debits > 0 && credits > 0;
  };

  const handleSubmit = async (e: React.FormEvent, shouldPost: boolean = false) => {
    e.preventDefault();
    
    if (!isBalanced()) {
      alert('Journal entry must be balanced (total debits must equal total credits)');
      return;
    }

    try {
      setSaving(true);
      
      const response = await fetch('/api/accounting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create-journal-entry',
          ...journalEntry,
          isPosted: shouldPost,
          totalDebit: getTotalDebits(),
          totalCredit: getTotalCredits()
        })
      });
      
      const data = await response.json();
      if (data.success) {
        alert(`Journal entry ${shouldPost ? 'posted' : 'saved as draft'} successfully`);
        // Reset form
        setJournalEntry({
          entryNumber: '',
          date: new Date().toISOString().split('T')[0],
          description: '',
          reference: '',
          lines: [
            { id: '1', accountId: '', debitAmount: 0, creditAmount: 0, description: '' },
            { id: '2', accountId: '', debitAmount: 0, creditAmount: 0, description: '' }
          ]
        });
        // Generate new entry number
        loadData();
      } else {
        alert('Error saving journal entry: ' + data.error);
      }
    } catch (error) {
      console.error('Error saving journal entry:', error);
      alert('Failed to save journal entry');
    } finally {
      setSaving(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
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
          <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
            <FileText className="h-6 w-6" />
            Journal Entry
          </h2>
        </div>
        <div className="p-6">
          <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
            {/* Header Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Entry Number
                </label>
                <input
                  type="text"
                  value={journalEntry.entryNumber}
                  onChange={(e) => setJournalEntry(prev => ({ ...prev, entryNumber: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Date *
                </label>
                <input
                  type="date"
                  required
                  value={journalEntry.date}
                  onChange={(e) => setJournalEntry(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Reference
                </label>
                <input
                  type="text"
                  value={journalEntry.reference}
                  onChange={(e) => setJournalEntry(prev => ({ ...prev, reference: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Invoice #, Check #, etc."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Description *
              </label>
              <textarea
                required
                value={journalEntry.description}
                onChange={(e) => setJournalEntry(prev => ({ ...prev, description: e.target.value }))}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Brief description of the transaction"
              />
            </div>

            {/* Journal Entry Lines */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Journal Entry Lines</h3>
                <button
                  type="button"
                  onClick={addLine}
                  className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4" />
                  Add Line
                </button>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Account</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Debit</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Credit</th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {journalEntry.lines.map((line) => (
                        <tr key={line.id}>
                          <td className="px-4 py-3">
                            <select
                              value={line.accountId}
                              onChange={(e) => updateLine(line.id, 'accountId', e.target.value)}
                              className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              required
                            >
                              <option value="">Select account...</option>
                              {accounts.map(account => (
                                <option key={account.id} value={account.id}>
                                  {account.accountNumber} - {account.accountName}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="text"
                              value={line.description}
                              onChange={(e) => updateLine(line.id, 'description', e.target.value)}
                              className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              placeholder="Line description..."
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              value={line.debitAmount || ''}
                              onChange={(e) => {
                                updateLine(line.id, 'debitAmount', parseFloat(e.target.value) || 0);
                                updateLine(line.id, 'creditAmount', 0);
                              }}
                              className="w-full px-2 py-1 text-sm text-right border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              placeholder="0.00"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              value={line.creditAmount || ''}
                              onChange={(e) => {
                                updateLine(line.id, 'creditAmount', parseFloat(e.target.value) || 0);
                                updateLine(line.id, 'debitAmount', 0);
                              }}
                              className="w-full px-2 py-1 text-sm text-right border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              placeholder="0.00"
                            />
                          </td>
                          <td className="px-4 py-3 text-center">
                            {journalEntry.lines.length > 2 && (
                              <button
                                type="button"
                                onClick={() => removeLine(line.id)}
                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Totals */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Debits</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(getTotalDebits())}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Credits</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(getTotalCredits())}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Balance</div>
                  <div className={`text-lg font-semibold ${
                    isBalanced() 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {formatCurrency(Math.abs(getTotalDebits() - getTotalCredits()))}
                    {isBalanced() && ' ✓'}
                  </div>
                </div>
              </div>
              
              {!isBalanced() && getTotalDebits() > 0 && getTotalCredits() > 0 && (
                <div className="mt-3 p-3 bg-red-100 dark:bg-red-900 border border-red-200 dark:border-red-800 rounded-md">
                  <div className="text-sm text-red-800 dark:text-red-200">
                    ⚠️ Journal entry is not balanced. Total debits must equal total credits.
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving || !isBalanced()}
                className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="h-4 w-4" />
                {saving ? 'Saving...' : 'Save as Draft'}
              </button>
              <button
                type="button"
                onClick={(e) => handleSubmit(e, true)}
                disabled={saving || !isBalanced()}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Calculator className="h-4 w-4" />
                {saving ? 'Posting...' : 'Post Entry'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
