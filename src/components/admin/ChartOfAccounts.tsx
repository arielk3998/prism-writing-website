'use client';

// 📋 Chart of Accounts Component
// Comprehensive management of the company's chart of accounts

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, FolderTree, DollarSign } from 'lucide-react';

interface Account {
  id: string;
  accountNumber: string;
  accountName: string;
  accountType: string;
  accountCategory: string;
  description?: string;
  isActive: boolean;
  parentAccountId?: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
  childAccounts?: Account[];
}

interface NewAccount {
  accountNumber: string;
  accountName: string;
  accountType: string;
  accountCategory: string;
  description: string;
  parentAccountId: string;
}

export default function ChartOfAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [newAccount, setNewAccount] = useState<NewAccount>({
    accountNumber: '',
    accountName: '',
    accountType: 'ASSET',
    accountCategory: 'CURRENT_ASSET',
    description: '',
    parentAccountId: ''
  });

  const accountTypes = [
    'ASSET',
    'LIABILITY', 
    'EQUITY',
    'REVENUE',
    'EXPENSE',
    'COST_OF_GOODS_SOLD'
  ];

  const accountCategories = [
    'CURRENT_ASSET',
    'FIXED_ASSET',
    'CURRENT_LIABILITY', 
    'LONG_TERM_LIABILITY',
    'OWNERS_EQUITY',
    'OPERATING_REVENUE',
    'NON_OPERATING_REVENUE',
    'OPERATING_EXPENSE',
    'NON_OPERATING_EXPENSE',
    'DIRECT_COSTS'
  ];

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/accounting?action=chart-of-accounts');
      const data = await response.json();
      if (data.success) {
        setAccounts(data.data);
      }
    } catch (error) {
      console.error('Error loading accounts:', error);
      alert('Failed to load chart of accounts');
    } finally {
      setLoading(false);
    }
  };

  const createDefaultAccounts = async () => {
    try {
      const response = await fetch('/api/accounting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create-default-accounts'
        })
      });
      
      const data = await response.json();
      if (data.success) {
        alert('Default chart of accounts created successfully');
        loadAccounts();
      } else {
        alert('Failed to create default accounts: ' + data.error);
      }
    } catch (error) {
      console.error('Error creating default accounts:', error);
      alert('Failed to create default accounts');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/accounting', {
        method: editingAccount ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: editingAccount ? 'update-account' : 'create-account',
          ...(editingAccount && { accountId: editingAccount.id }),
          ...newAccount
        })
      });
      
      const data = await response.json();
      if (data.success) {
        alert(editingAccount ? 'Account updated successfully' : 'Account created successfully');
        resetForm();
        loadAccounts();
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error saving account:', error);
      alert('Failed to save account');
    }
  };

  const handleEdit = (account: Account) => {
    setEditingAccount(account);
    setNewAccount({
      accountNumber: account.accountNumber,
      accountName: account.accountName,
      accountType: account.accountType,
      accountCategory: account.accountCategory,
      description: account.description || '',
      parentAccountId: account.parentAccountId || ''
    });
    setShowAddForm(true);
  };

  const handleDelete = async (accountId: string) => {
    if (confirm('Are you sure you want to delete this account?')) {
      try {
        const response = await fetch('/api/accounting', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'delete-account',
            accountId
          })
        });
        
        const data = await response.json();
        if (data.success) {
          alert('Account deleted successfully');
          loadAccounts();
        } else {
          alert('Error deleting account: ' + data.error);
        }
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Failed to delete account');
      }
    }
  };

  const resetForm = () => {
    setShowAddForm(false);
    setEditingAccount(null);
    setNewAccount({
      accountNumber: '',
      accountName: '',
      accountType: 'ASSET',
      accountCategory: 'CURRENT_ASSET',
      description: '',
      parentAccountId: ''
    });
  };

  const filteredAccounts = accounts.filter(account =>
    account.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.accountNumber.includes(searchTerm) ||
    account.accountType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getAccountTypeColor = (type: string) => {
    const colors = {
      'ASSET': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'LIABILITY': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      'EQUITY': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'REVENUE': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'EXPENSE': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'COST_OF_GOODS_SOLD': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
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
            <FolderTree className="h-6 w-6" />
            Chart of Accounts
          </h2>
        </div>
        <div className="p-6">
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search accounts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Plus className="h-4 w-4" />
                Add Account
              </button>
              <button
                onClick={createDefaultAccounts}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                <DollarSign className="h-4 w-4" />
                Create Default Accounts
              </button>
            </div>
          </div>

          {/* Accounts Table */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Account #</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Account Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Balance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredAccounts.map((account) => (
                    <tr key={account.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 dark:text-white">
                        {account.accountNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{account.accountName}</div>
                          {account.description && (
                            <div className="text-sm text-gray-500 dark:text-gray-400">{account.description}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAccountTypeColor(account.accountType)}`}>
                          {account.accountType.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {account.accountCategory.replace(/_/g, ' ')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-white">
                        {formatCurrency(account.balance)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          account.isActive 
                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                            : 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200'
                        }`}>
                          {account.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(account)}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(account.id)}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredAccounts.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No accounts found. Create your first account to get started.
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Account Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {editingAccount ? 'Edit Account' : 'Add New Account'}
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Account Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={newAccount.accountNumber}
                    onChange={(e) => setNewAccount(prev => ({ ...prev, accountNumber: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="e.g., 1000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Account Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newAccount.accountName}
                    onChange={(e) => setNewAccount(prev => ({ ...prev, accountName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="e.g., Cash and Cash Equivalents"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Account Type *
                  </label>
                  <select
                    required
                    value={newAccount.accountType}
                    onChange={(e) => setNewAccount(prev => ({ ...prev, accountType: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {accountTypes.map(type => (
                      <option key={type} value={type}>
                        {type.replace(/_/g, ' ')}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Account Category *
                  </label>
                  <select
                    required
                    value={newAccount.accountCategory}
                    onChange={(e) => setNewAccount(prev => ({ ...prev, accountCategory: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {accountCategories.map(category => (
                      <option key={category} value={category}>
                        {category.replace(/_/g, ' ')}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Parent Account
                  </label>
                  <select
                    value={newAccount.parentAccountId}
                    onChange={(e) => setNewAccount(prev => ({ ...prev, parentAccountId: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">No parent account</option>
                    {accounts.map(account => (
                      <option key={account.id} value={account.id}>
                        {account.accountNumber} - {account.accountName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  value={newAccount.description}
                  onChange={(e) => setNewAccount(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Optional description of the account"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {editingAccount ? 'Update Account' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
