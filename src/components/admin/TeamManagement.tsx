/**
 * Team Management Component
 * 
 * Admin interface for managing team members, their roles, and permissions.
 * Allows adding, editing, and removing team members with proper validation.
 * 
 * @module TeamManagement
 * @version 1.0.0
 * @author Prism Writing Cooperative
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  CheckCircle, 
  XCircle,
  RefreshCw,
  Mail,
  Award,
  Briefcase
} from 'lucide-react';
import { TeamMember } from '../../data/teamData';

interface TeamManagementProps {
  className?: string;
}

const TEAM_ROLES = {
  FOUNDER: 'Founding Member',
  SENIOR_WRITER: 'Senior Technical Writer',
  TECHNICAL_WRITER: 'Technical Writer',
  CONTENT_STRATEGIST: 'Content Strategist',
  UX_WRITER: 'UX Writer',
  EDITOR: 'Editor',
  PROJECT_MANAGER: 'Project Manager',
  ADMIN: 'Administrator'
} as const;

const ROLE_COLORS = {
  [TEAM_ROLES.FOUNDER]: 'bg-purple-100 text-purple-800 border-purple-200',
  [TEAM_ROLES.SENIOR_WRITER]: 'bg-blue-100 text-blue-800 border-blue-200',
  [TEAM_ROLES.TECHNICAL_WRITER]: 'bg-green-100 text-green-800 border-green-200',
  [TEAM_ROLES.CONTENT_STRATEGIST]: 'bg-orange-100 text-orange-800 border-orange-200',
  [TEAM_ROLES.UX_WRITER]: 'bg-pink-100 text-pink-800 border-pink-200',
  [TEAM_ROLES.EDITOR]: 'bg-cyan-100 text-cyan-800 border-cyan-200',
  [TEAM_ROLES.PROJECT_MANAGER]: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  [TEAM_ROLES.ADMIN]: 'bg-red-100 text-red-800 border-red-200'
};

export default function TeamManagement({ className = '' }: TeamManagementProps) {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filters and search
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingMember, setDeletingMember] = useState<TeamMember | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    title: '',
    bio: '',
    specializations: [] as string[],
    industries: [] as string[],
    skills: [] as string[],
    experience: '',
    education: [] as string[],
    certifications: [] as string[],
    achievements: [] as string[],
    isActive: true,
    isFoundingMember: false
  });
  
  // Success/error states
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Load team members
  const loadMembers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/team');
      const data = await response.json();
      
      if (data.success) {
        setMembers(data.data);
      } else {
        setError(data.error || 'Failed to load team members');
      }
    } catch (err) {
      setError('Network error loading team members');
      console.error('Error loading team members:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  // Filter members based on search and filters
  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !roleFilter || member.role === roleFilter;
    const matchesStatus = !statusFilter || 
                         (statusFilter === 'active' && member.isActive) ||
                         (statusFilter === 'inactive' && !member.isActive);
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Handle form submission for creating/editing members
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingMember ? '/api/team' : '/api/team';
      const method = editingMember ? 'PUT' : 'POST';
      const body = editingMember ? { ...formData, id: editingMember.id } : formData;
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      
      const data = await response.json();
      
      if (data.success) {
        showSuccessNotification(data.message);
        resetForm();
        setShowCreateModal(false);
        setShowEditModal(false);
        loadMembers();
      } else {
        setError(data.error || 'Failed to save team member');
      }
    } catch (err) {
      setError('Network error saving team member');
      console.error('Error saving team member:', err);
    }
  };

  // Handle member deletion
  const handleDelete = async () => {
    if (!deletingMember) return;
    
    try {
      const response = await fetch(`/api/team?id=${deletingMember.id}`, {
        method: 'DELETE'
      });
      
      const data = await response.json();
      
      if (data.success) {
        showSuccessNotification(data.message);
        setShowDeleteModal(false);
        setDeletingMember(null);
        loadMembers();
      } else {
        setError(data.error || 'Failed to delete team member');
      }
    } catch (err) {
      setError('Network error deleting team member');
      console.error('Error deleting team member:', err);
    }
  };

  // Reset form data
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      role: '',
      title: '',
      bio: '',
      specializations: [],
      industries: [],
      skills: [],
      experience: '',
      education: [],
      certifications: [],
      achievements: [],
      isActive: true,
      isFoundingMember: false
    });
    setEditingMember(null);
  };

  // Show success notification
  const showSuccessNotification = (message: string) => {
    setSuccessMessage(message);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setSuccessMessage(null);
    }, 3000);
  };

  // Open edit modal with member data
  const openEditModal = (member: TeamMember) => {
    setFormData({
      name: member.name,
      email: member.email || '',
      role: member.role,
      title: member.title,
      bio: member.bio,
      specializations: member.specializations,
      industries: member.industries,
      skills: member.skills,
      experience: member.experience,
      education: member.education,
      certifications: member.certifications,
      achievements: member.achievements,
      isActive: member.isActive,
      isFoundingMember: member.isFoundingMember || false
    });
    setEditingMember(member);
    setShowEditModal(true);
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center py-12 ${className}`}>
        <RefreshCw className="w-8 h-8 animate-spin text-blue-500" />
        <span className="ml-2 text-gray-600 dark:text-gray-300">Loading team members...</span>
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
            className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            {successMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center">
            <XCircle className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-red-700 dark:text-red-300">{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <Users className="w-6 h-6 mr-2 text-blue-500" />
            Team Management
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Manage team members, roles, and permissions
          </p>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={loadMembers}
            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
          
          <button
            onClick={() => {
              resetForm();
              setShowCreateModal(true);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Member
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Roles</option>
          {Object.values(TEAM_ROLES).map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
        
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        
        <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
          <Users className="w-4 h-4 mr-1" />
          {filteredMembers.length} member(s) found
        </div>
      </div>

      {/* Members Grid */}
      <div className="grid gap-6">
        {filteredMembers.map((member) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col lg:flex-row lg:items-start gap-6">
              {/* Member Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {member.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">{member.title}</p>
                    {member.email && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                        <Mail className="w-3 h-3 mr-1" />
                        {member.email}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs rounded-full border ${
                      ROLE_COLORS[member.role as keyof typeof ROLE_COLORS] || 'bg-gray-100 text-gray-800 border-gray-200'
                    }`}>
                      {member.role}
                    </span>
                    
                    {member.isFoundingMember && (
                      <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                        Founder
                      </span>
                    )}
                    
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      member.isActive 
                        ? 'bg-green-100 text-green-800 border border-green-200' 
                        : 'bg-red-100 text-red-800 border border-red-200'
                    }`}>
                      {member.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">{member.bio}</p>
                
                {/* Specializations */}
                {member.specializations.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                      <Briefcase className="w-4 h-4 mr-1" />
                      Specializations
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {member.specializations.slice(0, 5).map((spec, index) => (
                        <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                          {spec}
                        </span>
                      ))}
                      {member.specializations.length > 5 && (
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                          +{member.specializations.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Recent Achievement */}
                {member.achievements.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                      <Award className="w-4 h-4 mr-1" />
                      Recent Achievement
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {member.achievements[0]}
                    </p>
                  </div>
                )}
              </div>
              
              {/* Actions */}
              <div className="flex lg:flex-col gap-2">
                <button
                  onClick={() => openEditModal(member)}
                  className="px-3 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors flex items-center"
                >
                  <Edit3 className="w-4 h-4 mr-1" />
                  Edit
                </button>
                
                <button
                  onClick={() => {
                    setDeletingMember(member);
                    setShowDeleteModal(true);
                  }}
                  className="px-3 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex items-center"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Remove
                </button>
                
                <button
                  onClick={() => {
                    // Toggle member status
                    // In a real implementation, this would make an API call
                    showSuccessNotification(`Member ${member.isActive ? 'deactivated' : 'activated'} successfully`);
                  }}
                  className={`px-3 py-2 rounded-lg transition-colors flex items-center ${
                    member.isActive
                      ? 'text-orange-600 hover:text-orange-800 hover:bg-orange-50 dark:hover:bg-orange-900/20'
                      : 'text-green-600 hover:text-green-800 hover:bg-green-50 dark:hover:bg-green-900/20'
                  }`}
                >
                  {member.isActive ? (
                    <>
                      <XCircle className="w-4 h-4 mr-1" />
                      Deactivate
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Activate
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredMembers.length === 0 && !loading && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No team members found
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {searchTerm || roleFilter || statusFilter 
              ? 'Try adjusting your filters to see more results.'
              : 'Get started by adding your first team member.'
            }
          </p>
          {!searchTerm && !roleFilter && !statusFilter && (
            <button
              onClick={() => {
                resetForm();
                setShowCreateModal(true);
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center mx-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add First Member
            </button>
          )}
        </div>
      )}

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {(showCreateModal || showEditModal) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => {
              setShowCreateModal(false);
              setShowEditModal(false);
              resetForm();
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Role *
                      </label>
                      <select
                        required
                        value={formData.role}
                        onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Role</option>
                        {Object.values(TEAM_ROLES).map(role => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Bio
                    </label>
                    <textarea
                      rows={3}
                      value={formData.bio}
                      onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Experience Summary
                    </label>
                    <textarea
                      rows={2}
                      value={formData.experience}
                      onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Active Member</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isFoundingMember}
                        onChange={(e) => setFormData(prev => ({ ...prev, isFoundingMember: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Founding Member</span>
                    </label>
                  </div>
                  
                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowCreateModal(false);
                        setShowEditModal(false);
                        resetForm();
                      }}
                      className="px-4 py-2 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      {editingMember ? 'Update Member' : 'Add Member'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && deletingMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => {
              setShowDeleteModal(false);
              setDeletingMember(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Remove Team Member
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Are you sure you want to remove <strong>{deletingMember.name}</strong> from the team? 
                This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeletingMember(null);
                  }}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Remove Member
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
