'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Shield, 
  CheckCircle, 
  XCircle,
  RefreshCw,
  Download,
  AlertCircle,
  UserCheck,
  UserX
} from 'lucide-react';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  customPermissions: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  createdBy: string;
  permissions: string[];
  roleName: string;
}

interface UserStats {
  total: number;
  active: number;
  inactive: number;
  byRole: Record<string, number>;
}

interface UserManagementProps {
  className?: string;
}

const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin', 
  EDITOR: 'editor',
  MEMBER: 'member',
  CLIENT: 'client',
  VIEWER: 'viewer'
} as const;

const ROLE_COLORS = {
  [USER_ROLES.SUPER_ADMIN]: 'bg-red-100 text-red-800 border-red-200',
  [USER_ROLES.ADMIN]: 'bg-purple-100 text-purple-800 border-purple-200',
  [USER_ROLES.EDITOR]: 'bg-blue-100 text-blue-800 border-blue-200',
  [USER_ROLES.MEMBER]: 'bg-green-100 text-green-800 border-green-200',
  [USER_ROLES.CLIENT]: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  [USER_ROLES.VIEWER]: 'bg-gray-100 text-gray-800 border-gray-200'
};

export default function UserManagement({ className = '' }: UserManagementProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filters and pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  
  // Notification states
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: USER_ROLES.VIEWER as string,
    customPermissions: [] as string[],
    sendWelcomeEmail: true,
    temporaryPassword: true
  });

  // Show success notification
  const showSuccessNotification = (message: string) => {
    setSuccessMessage(message);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setSuccessMessage(null);
    }, 4000);
  };

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        search: searchTerm,
        role: roleFilter,
        status: statusFilter
      });

      const response = await fetch(`/api/users?${params}`, {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ADMIN_API_KEY || 'demo-admin-key'}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data.users);
      setStats(data.stats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users');
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, searchTerm, roleFilter, statusFilter]);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ADMIN_API_KEY || 'demo-admin-key'}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setShowCreateModal(false);
        setFormData({
          name: '',
          email: '',
          role: USER_ROLES.VIEWER as string,
          customPermissions: [],
          sendWelcomeEmail: true,
          temporaryPassword: true
        });
        fetchUsers();
        showSuccessNotification('User created successfully!');
        
        // Show temporary password if generated
        if (data.user?.temporaryPassword) {
          alert(`User created successfully!\nTemporary password: ${data.user.temporaryPassword}`);
        }
      } else {
        setError(data.error || 'Failed to create user');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    setLoading(true);

    try {
      const response = await fetch(`/api/users?id=${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ADMIN_API_KEY || 'demo-admin-key'}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setShowEditModal(false);
        setEditingUser(null);
        fetchUsers();
        showSuccessNotification('User updated successfully!');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to update user');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!deletingUser) return;

    setLoading(true);

    try {
      const response = await fetch(`/api/users?id=${deletingUser.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ADMIN_API_KEY || 'demo-admin-key'}`
        }
      });

      if (response.ok) {
        setShowDeleteModal(false);
        setDeletingUser(null);
        fetchUsers();
        showSuccessNotification('User deleted successfully!');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to delete user');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete user');
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      customPermissions: user.customPermissions,
      sendWelcomeEmail: false,
      temporaryPassword: false
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (user: User) => {
    setDeletingUser(user);
    setShowDeleteModal(true);
  };

  const handleExportUsers = async () => {
    try {
      const response = await fetch('/api/users/export', {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ADMIN_API_KEY || 'demo-admin-key'}`
        }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `users-export-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        showSuccessNotification('Users exported successfully!');
      } else {
        setError('Failed to export users');
      }
    } catch (err) {
      console.error('Export error:', err);
      setError('Failed to export users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading && users.length === 0) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 ${className}`}>
        <div className="flex items-center justify-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
          <span className="ml-3 text-gray-600 dark:text-gray-300">Loading users...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 ${className}`}>
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Error Loading Users</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
          <button
            onClick={fetchUsers}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            {successMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Users className="w-6 h-6" />
              User Management
            </h2>
            <p className="text-gray-600 dark:text-gray-300">Manage users, roles, and permissions</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchUsers}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add User
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Users</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <UserCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Active</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.active}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="flex items-center">
              <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                <UserX className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Inactive</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.inactive}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Admins</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {(stats.byRole.admin || 0) + (stats.byRole.super_admin || 0)}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div className="flex gap-3 flex-wrap items-center">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">All Roles</option>
              {Object.values(USER_ROLES).map(role => (
                <option key={role} value={role}>
                  {role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <button 
              onClick={handleExportUsers}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-700 dark:text-gray-300">User</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700 dark:text-gray-300">Role</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700 dark:text-gray-300">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700 dark:text-gray-300">Last Login</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700 dark:text-gray-300">Created</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {users.map((user) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${ROLE_COLORS[user.role as keyof typeof ROLE_COLORS] || ROLE_COLORS[USER_ROLES.VIEWER]}`}>
                      {user.roleName}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                      user.isActive 
                        ? 'bg-green-100 text-green-800 border border-green-200'
                        : 'bg-red-100 text-red-800 border border-red-200'
                    }`}>
                      {user.isActive ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-300">
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-300">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(user)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        title="Edit user"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      {user.role !== USER_ROLES.SUPER_ADMIN && (
                        <button
                          onClick={() => openDeleteModal(user)}
                          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                          title="Delete user"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {users.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, stats?.total || 0)} of {stats?.total || 0} users
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                Previous
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.ceil((stats?.total || 0) / itemsPerPage) }, (_, i) => i + 1)
                  .filter(page => page === 1 || page === Math.ceil((stats?.total || 0) / itemsPerPage) || Math.abs(page - currentPage) <= 1)
                  .map((page, index, array) => (
                    <React.Fragment key={page}>
                      {index > 0 && array[index - 1] < page - 1 && (
                        <span className="px-2 text-gray-500">...</span>
                      )}
                      <button
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 rounded-lg text-sm ${
                          currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                        }`}
                      >
                        {page}
                      </button>
                    </React.Fragment>
                  ))}
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(Math.ceil((stats?.total || 0) / itemsPerPage), prev + 1))}
                disabled={currentPage >= Math.ceil((stats?.total || 0) / itemsPerPage)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create User Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-screen overflow-y-auto"
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add New User</h3>
                <form onSubmit={handleCreateUser} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Role *
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      {Object.values(USER_ROLES).map(role => (
                        <option key={role} value={role}>
                          {role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="sendWelcomeEmail"
                        checked={formData.sendWelcomeEmail}
                        onChange={(e) => setFormData(prev => ({ ...prev, sendWelcomeEmail: e.target.checked }))}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="sendWelcomeEmail" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        Send welcome email
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="temporaryPassword"
                        checked={formData.temporaryPassword}
                        onChange={(e) => setFormData(prev => ({ ...prev, temporaryPassword: e.target.checked }))}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="temporaryPassword" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        Generate temporary password
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowCreateModal(false)}
                      className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      {loading ? 'Creating...' : 'Create User'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit User Modal */}
      <AnimatePresence>
        {showEditModal && editingUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-screen overflow-y-auto"
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Edit User</h3>
                <form onSubmit={handleUpdateUser} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Role *
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      {Object.values(USER_ROLES).map(role => (
                        <option key={role} value={role}>
                          {role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Custom Permissions
                    </label>
                    <div className="max-h-32 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg p-3 space-y-2">
                      {[
                        'user:create', 'user:update', 'user:delete',
                        'content:create', 'content:update', 'content:delete',
                        'newsletter:manage', 'analytics:read', 'settings:update'
                      ].map(permission => (
                        <div key={permission} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`edit-${permission}`}
                            checked={formData.customPermissions.includes(permission)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData(prev => ({
                                  ...prev,
                                  customPermissions: [...prev.customPermissions, permission]
                                }));
                              } else {
                                setFormData(prev => ({
                                  ...prev,
                                  customPermissions: prev.customPermissions.filter(p => p !== permission)
                                }));
                              }
                            }}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <label htmlFor={`edit-${permission}`} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            {permission.replace(':', ' - ').replace(/\b\w/g, l => l.toUpperCase())}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowEditModal(false);
                        setEditingUser(null);
                      }}
                      className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      {loading ? 'Updating...' : 'Update User'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete User Modal */}
      <AnimatePresence>
        {showDeleteModal && deletingUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                    <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Delete User
                  </h3>
                </div>
                
                <div className="mb-6">
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    Are you sure you want to delete this user? This action cannot be undone.
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {deletingUser.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{deletingUser.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{deletingUser.email}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowDeleteModal(false);
                      setDeletingUser(null);
                    }}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteUser}
                    disabled={loading}
                    className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    {loading ? 'Deleting...' : 'Delete User'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
