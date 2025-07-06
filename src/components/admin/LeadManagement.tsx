/**
 * Lead Management Component
 * Comprehensive lead management interface for business inquiries
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  Building, 
  User, 
  Edit,
  Trash2,
  Filter,
  Plus,
  CheckCircle,
  AlertCircle,
  Star,
  Eye,
  RefreshCw
} from 'lucide-react';

// Types
interface Lead {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  projectType?: string;
  message: string;
  budget?: string;
  timeline?: string;
  status: 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL_SENT' | 'CONVERTED' | 'CLOSED_LOST' | 'FOLLOW_UP_SCHEDULED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  source?: string;
  lastContactedAt?: string;
  nextFollowUpAt?: string;
  assignedTo?: string;
  assignedUser?: {
    id: string;
    firstName?: string;
    lastName?: string;
    email: string;
  };
  notes?: string;
  autoResponded: boolean;
  addedToNewsletter: boolean;
  allowFollowUp: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  current: number;
  limit: number;
  total: number;
  pages: number;
}

interface LeadFilters {
  status?: string;
  priority?: string;
  assignedTo?: string;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}

const LeadManagement = () => {
  // State management
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination>({
    current: 1,
    limit: 25,
    total: 0,
    pages: 1
  });
  const [filters, setFilters] = useState<LeadFilters>({});
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Status and priority options
  const statusOptions = [
    { value: 'NEW', label: 'New', color: 'bg-blue-500' },
    { value: 'CONTACTED', label: 'Contacted', color: 'bg-yellow-500' },
    { value: 'QUALIFIED', label: 'Qualified', color: 'bg-green-500' },
    { value: 'PROPOSAL_SENT', label: 'Proposal Sent', color: 'bg-purple-500' },
    { value: 'CONVERTED', label: 'Converted', color: 'bg-emerald-500' },
    { value: 'CLOSED_LOST', label: 'Closed Lost', color: 'bg-red-500' },
    { value: 'FOLLOW_UP_SCHEDULED', label: 'Follow-up Scheduled', color: 'bg-orange-500' }
  ];

  const priorityOptions = [
    { value: 'LOW', label: 'Low', color: 'bg-gray-500' },
    { value: 'MEDIUM', label: 'Medium', color: 'bg-blue-500' },
    { value: 'HIGH', label: 'High', color: 'bg-orange-500' },
    { value: 'URGENT', label: 'Urgent', color: 'bg-red-500' }
  ];

  // Fetch leads
  const fetchLeads = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pagination.limit.toString(),
        ...filters
      });

      const response = await fetch(`/api/admin/leads?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch leads');
      }

      const data = await response.json();
      setLeads(data.leads);
      setPagination(data.pagination);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching leads:', err);
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.limit]);

  // Update lead
  const updateLead = async (leadId: string, updates: Partial<Lead>) => {
    try {
      const response = await fetch('/api/admin/leads', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: leadId,
          ...updates
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update lead');
      }

      const updatedLead = await response.json();
      setLeads(prev => prev.map(lead => 
        lead.id === leadId ? updatedLead : lead
      ));
      
      if (selectedLead?.id === leadId) {
        setSelectedLead(updatedLead);
      }
    } catch (err) {
      console.error('Error updating lead:', err);
      setError(err instanceof Error ? err.message : 'Failed to update lead');
    }
  };

  // Delete lead
  const deleteLead = async (leadId: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;

    try {
      const response = await fetch(`/api/admin/leads?id=${leadId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete lead');
      }

      setLeads(prev => prev.filter(lead => lead.id !== leadId));
      if (selectedLead?.id === leadId) {
        setSelectedLead(null);
        setShowDetails(false);
      }
    } catch (err) {
      console.error('Error deleting lead:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete lead');
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    return statusOptions.find(opt => opt.value === status)?.color || 'bg-gray-500';
  };

  // Get priority color
  const getPriorityColor = (priority: string) => {
    return priorityOptions.find(opt => opt.value === priority)?.color || 'bg-gray-500';
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Load leads on mount and filter changes
  useEffect(() => {
    fetchLeads();
  }, [filters, pagination.limit]);

  // Lead summary stats
  const leadStats = {
    total: leads.length,
    new: leads.filter(l => l.status === 'NEW').length,
    qualified: leads.filter(l => l.status === 'QUALIFIED').length,
    converted: leads.filter(l => l.status === 'CONVERTED').length,
    urgent: leads.filter(l => l.priority === 'URGENT').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-safe">
            Lead Management
          </h1>
          <p className="text-safe-muted">
            Manage and track business inquiries and potential clients
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchLeads(pagination.current)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Lead Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-safe-muted">Total Leads</p>
              <p className="text-2xl font-bold text-safe">{leadStats.total}</p>
            </div>
            <User className="w-8 h-8 text-safe-accent" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-safe-muted">New</p>
              <p className="text-2xl font-bold text-safe-accent">{leadStats.new}</p>
            </div>
            <Plus className="w-8 h-8 text-safe-accent" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-safe-muted">Qualified</p>
              <p className="text-2xl font-bold text-safe-success">{leadStats.qualified}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-safe-success" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-safe-muted">Converted</p>
              <p className="text-2xl font-bold text-emerald-600">{leadStats.converted}</p>
            </div>
            <Star className="w-8 h-8 text-emerald-500" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-safe-muted">Urgent</p>
              <p className="text-2xl font-bold text-safe-error">{leadStats.urgent}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-safe-error" />
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-safe mb-2">
                Search
              </label>
              <input
                type="text"
                value={filters.search || ''}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                placeholder="Name, email, company..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-safe mb-2">
                Status
              </label>
              <select
                value={filters.status || ''}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Statuses</option>
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-safe mb-2">
                Priority
              </label>
              <select
                value={filters.priority || ''}
                onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Priorities</option>
                {priorityOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => setFilters({})}
                className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-safe-error mr-2" />
            <p className="text-safe-error dark:text-red-400">{error}</p>
          </div>
        </div>
      )}

      {/* Leads Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-safe-muted uppercase tracking-wider">
                  Lead
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-safe-muted uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-safe-muted uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-safe-muted uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-safe-muted uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-safe-muted uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-safe-muted">
                    <div className="flex items-center justify-center">
                      <RefreshCw className="w-5 h-5 animate-spin mr-2" />
                      Loading leads...
                    </div>
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-safe-muted">
                    No leads found
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-safe">
                          {lead.name}
                        </div>
                        {lead.company && (
                          <div className="text-sm text-safe-muted">
                            {lead.company}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-safe">
                        <div className="flex items-center mb-1">
                          <Mail className="w-4 h-4 mr-1 text-safe-muted" />
                          {lead.email}
                        </div>
                        {lead.phone && (
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-1 text-safe-muted" />
                            {lead.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getStatusColor(lead.status)}`}>
                        {statusOptions.find(opt => opt.value === lead.status)?.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getPriorityColor(lead.priority)}`}>
                        {priorityOptions.find(opt => opt.value === lead.priority)?.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-safe">
                      {formatDate(lead.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedLead(lead);
                            setShowDetails(true);
                          }}
                          className="text-safe-accent hover:text-safe-accent dark:hover:text-blue-300"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteLead(lead.id)}
                          className="text-safe-error hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="text-sm text-safe">
                Showing {((pagination.current - 1) * pagination.limit) + 1} to {Math.min(pagination.current * pagination.limit, pagination.total)} of {pagination.total} leads
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => fetchLeads(pagination.current - 1)}
                  disabled={pagination.current === 1}
                  className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-sm text-safe hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-sm text-safe">
                  Page {pagination.current} of {pagination.pages}
                </span>
                <button
                  onClick={() => fetchLeads(pagination.current + 1)}
                  disabled={pagination.current === pagination.pages}
                  className="px-3 py-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-sm text-safe hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Lead Details Modal */}
      {showDetails && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-safe">
                  Lead Details
                </h2>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-safe-muted hover:text-safe-muted dark:hover:text-safe-muted"
                >
                  <span className="sr-only">Close</span>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Lead Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-safe mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <User className="w-5 h-5 text-safe-muted mr-3" />
                      <div>
                        <p className="text-sm text-safe-muted">Name</p>
                        <p className="text-safe">{selectedLead.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-safe-muted mr-3" />
                      <div>
                        <p className="text-sm text-safe-muted">Email</p>
                        <p className="text-safe">{selectedLead.email}</p>
                      </div>
                    </div>
                    {selectedLead.phone && (
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-safe-muted mr-3" />
                        <div>
                          <p className="text-sm text-safe-muted">Phone</p>
                          <p className="text-safe">{selectedLead.phone}</p>
                        </div>
                      </div>
                    )}
                    {selectedLead.company && (
                      <div className="flex items-center">
                        <Building className="w-5 h-5 text-safe-muted mr-3" />
                        <div>
                          <p className="text-sm text-safe-muted">Company</p>
                          <p className="text-safe">{selectedLead.company}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-safe mb-4">
                    Lead Status
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-safe-muted mb-2">Status</p>
                      <select
                        value={selectedLead.status}
                        onChange={(e) => updateLead(selectedLead.id, { status: e.target.value as Lead['status'] })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      >
                        {statusOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <p className="text-sm text-safe-muted mb-2">Priority</p>
                      <select
                        value={selectedLead.priority}
                        onChange={(e) => updateLead(selectedLead.id, { priority: e.target.value as Lead['priority'] })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      >
                        {priorityOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div>
                <h3 className="text-lg font-semibold text-safe mb-4">
                  Project Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedLead.projectType && (
                    <div>
                      <p className="text-sm text-safe-muted">Project Type</p>
                      <p className="text-safe">{selectedLead.projectType}</p>
                    </div>
                  )}
                  {selectedLead.budget && (
                    <div>
                      <p className="text-sm text-safe-muted">Budget</p>
                      <p className="text-safe">{selectedLead.budget}</p>
                    </div>
                  )}
                  {selectedLead.timeline && (
                    <div>
                      <p className="text-sm text-safe-muted">Timeline</p>
                      <p className="text-safe">{selectedLead.timeline}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <h3 className="text-lg font-semibold text-safe mb-4">
                  Message
                </h3>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <p className="text-safe whitespace-pre-wrap">
                    {selectedLead.message}
                  </p>
                </div>
              </div>

              {/* Notes */}
              <div>
                <h3 className="text-lg font-semibold text-safe mb-4">
                  Notes
                </h3>
                <textarea
                  value={selectedLead.notes || ''}
                  onChange={(e) => updateLead(selectedLead.id, { notes: e.target.value })}
                  placeholder="Add notes about this lead..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default LeadManagement;
