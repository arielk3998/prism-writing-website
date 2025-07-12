/**
 * Advanced Admin Dashboard
 * 
 * Comprehensive administrative interface with member management,
 * project oversight, client tracking, and account impersonation.
 * 
 * @module AdminDashboard
 * @version 1.0.0
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ModernButton } from '../ui/ModernComponents';
import { 
  User, 
  Project, 
  Client, 
  getAllUsers, 
  getAllProjects, 
  getAllClients, 
  getAdminOverview,
  impersonateUser,
  updateProject,
  register
} from '../../lib/auth';
import { useAuth } from '../../contexts/AuthContext';

interface AdminOverview {
  totalMembers: number;
  totalClients: number;
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  overdueProjects: number;
  totalRevenue: number;
  avgCompletionRate: number;
}

export function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'projects' | 'clients'>('overview');
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [members, setMembers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateMember, setShowCreateMember] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [overviewData, usersData, projectsData, clientsData] = await Promise.all([
        getAdminOverview(),
        getAllUsers(),
        getAllProjects(),
        getAllClients()
      ]);

      setOverview(overviewData);
      setMembers(usersData.filter(u => u.role === 'MEMBER'));
      setProjects(projectsData);
      setClients(clientsData);
    } catch (error) {
      console.error('Failed to load admin data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImpersonate = async (targetUserId: string) => {
    if (!user) return;
    
    try {
      const result = await impersonateUser(user.id, targetUserId);
      if (result) {
        // Store impersonation token
        localStorage.setItem('prism-impersonation-token', result.tokens?.accessToken || '');
        localStorage.setItem('prism-original-admin-id', user.id);
        
        // Redirect to portal as the impersonated user
        window.location.href = '/portal-enhanced';
      }
    } catch (error) {
      alert('Failed to impersonate user: ' + (error as Error).message);
    }
  };

  const handleCreateMember = async (memberData: { name: string; email: string; password: string }) => {
    try {
      await register({
        ...memberData
      });
      setShowCreateMember(false);
      loadData(); // Refresh data
      alert('Member created successfully!');
    } catch (error) {
      alert('Failed to create member: ' + (error as Error).message);
    }
  };

  const handleUpdateProjectStatus = async (projectId: string, status: Project['status']) => {
    try {
      await updateProject(projectId, { status });
      loadData(); // Refresh data
    } catch (error) {
      console.error('Failed to update project:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-safe-muted">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'members', label: 'Members', icon: '👥' },
    { id: 'projects', label: 'Projects', icon: '📁' },
    { id: 'clients', label: 'Clients', icon: '🏢' }
  ] as const;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h1 className="text-3xl font-bold text-safe mb-2">
          Administrative Dashboard
        </h1>
        <p className="text-safe-muted">
          Complete oversight of members, projects, and clients
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md transition-all ${
              activeTab === tab.id
                ? 'bg-white dark:bg-gray-600 text-safe-accent shadow-sm'
                : 'text-safe-muted hover:text-safe dark:hover:text-white'
            }`}
          >
            <span>{tab.icon}</span>
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && overview && (
            <OverviewTab overview={overview} />
          )}

          {activeTab === 'members' && (
            <MembersTab 
              members={members} 
              projects={projects}
              onImpersonate={handleImpersonate}
              onCreateMember={() => setShowCreateMember(true)}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectsTab 
              projects={projects} 
              members={members}
              clients={clients}
              onUpdateStatus={handleUpdateProjectStatus}
            />
          )}

          {activeTab === 'clients' && (
            <ClientsTab clients={clients} projects={projects} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Create Member Modal */}
      {showCreateMember && (
        <CreateMemberModal
          onClose={() => setShowCreateMember(false)}
          onSubmit={handleCreateMember}
        />
      )}
    </div>
  );
}

// Overview Tab Component
function OverviewTab({ overview }: { overview: AdminOverview }) {
  const stats = [
    { label: 'Total Members', value: overview.totalMembers, icon: '👥', color: 'blue' },
    { label: 'Active Projects', value: overview.activeProjects, icon: '📁', color: 'green' },
    { label: 'Total Clients', value: overview.totalClients, icon: '🏢', color: 'purple' },
    { label: 'Overdue Projects', value: overview.overdueProjects, icon: '⏰', color: 'red' },
    { label: 'Completed Projects', value: overview.completedProjects, icon: '✅', color: 'emerald' },
    { label: 'Total Revenue', value: `$${overview.totalRevenue.toLocaleString()}`, icon: '💰', color: 'yellow' },
    { label: 'Avg Completion', value: `${Math.round(overview.avgCompletionRate)}%`, icon: '📈', color: 'indigo' },
    { label: 'Total Projects', value: overview.totalProjects, icon: '📊', color: 'gray' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 * index }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-safe-muted">
                {stat.label}
              </p>
              <p className="text-3xl font-bold text-safe">
                {stat.value}
              </p>
            </div>
            <span className="text-3xl">{stat.icon}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Members Tab Component
function MembersTab({ 
  members, 
  projects, 
  onImpersonate, 
  onCreateMember 
}: { 
  members: User[];
  projects: Project[];
  onImpersonate: (userId: string) => void;
  onCreateMember: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-safe">
          Cooperative Members
        </h2>
        <ModernButton variant="primary" onClick={onCreateMember}>
          Add New Member
        </ModernButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => {
          const memberProjects = projects.filter(p => p.assignedMemberId === member.id);
          const activeProjects = memberProjects.filter(p => p.status === 'in_progress').length;
          const completedProjects = memberProjects.filter(p => p.status === 'completed').length;

          return (
            <div key={member.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-safe">{member.name}</h3>
                  <p className="text-sm text-safe-muted">{member.email}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm text-safe-muted">Active Projects:</span>
                  <span className="font-medium text-safe">{activeProjects}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-safe-muted">Completed:</span>
                  <span className="font-medium text-safe">{completedProjects}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-safe-muted">Joined:</span>
                  <span className="font-medium text-safe">
                    {new Date(member.joinedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-safe-muted">Status:</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    member.status === 'ACTIVE' ? 'bg-green-100 text-safe-success' : 'bg-gray-100 text-safe'
                  }`}>
                    {member.status}
                  </span>
                </div>
              </div>

              <ModernButton
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => onImpersonate(member.id)}
              >
                Access Account
              </ModernButton>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Projects Tab Component
function ProjectsTab({ 
  projects, 
  members, 
  clients,
  onUpdateStatus 
}: { 
  projects: Project[];
  members: User[];
  clients: Client[];
  onUpdateStatus: (projectId: string, status: Project['status']) => void;
}) {
  const [selectedStatus, setSelectedStatus] = useState<Project['status'] | 'all'>('all');

  const filteredProjects = selectedStatus === 'all' 
    ? projects 
    : projects.filter(p => p.status === selectedStatus);

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'completed': return 'text-safe-success bg-green-100';
      case 'in_progress': return 'text-safe-accent bg-blue-100';
      case 'review': return 'text-safe-warning bg-yellow-100';
      case 'draft': return 'text-safe-muted bg-gray-100';
      case 'cancelled': return 'text-safe-error bg-red-100';
      default: return 'text-safe-muted bg-gray-100';
    }
  };

  const getPriorityColor = (priority: Project['priority']) => {
    switch (priority) {
      case 'urgent': return 'text-safe-error bg-red-100';
      case 'high': return 'text-safe-warning bg-orange-100';
      case 'medium': return 'text-safe-warning bg-yellow-100';
      case 'low': return 'text-safe-success bg-green-100';
      default: return 'text-safe-muted bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-safe">
          Project Management
        </h2>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value as Project['status'] | 'all')}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-safe"
        >
          <option value="all">All Projects</option>
          <option value="draft">Draft</option>
          <option value="in_progress">In Progress</option>
          <option value="review">Review</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-safe-muted uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-safe-muted uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-safe-muted uppercase tracking-wider">
                  Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-safe-muted uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-safe-muted uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-safe-muted uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-safe-muted uppercase tracking-wider">
                  Deadline
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-safe-muted uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredProjects.map((project) => {
                const client = clients.find(c => c.id === project.clientId);
                const member = members.find(m => m.id === project.assignedMemberId);
                const isOverdue = project.deadline && new Date(project.deadline) < new Date() && project.status !== 'completed';

                return (
                  <tr key={project.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-safe">
                          {project.title}
                        </div>
                        <div className="text-sm text-safe-muted">
                          {project.type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-safe">
                      {client?.name || 'Unassigned'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-safe">
                      {member?.name || 'Unassigned'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}>
                        {project.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(project.priority)}`}>
                        {project.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mr-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${project.completionPercentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-safe">
                          {project.completionPercentage}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-safe">
                      {project.deadline ? (
                        <span className={isOverdue ? 'text-safe-error' : ''}>
                          {new Date(project.deadline).toLocaleDateString()}
                          {isOverdue && ' (Overdue)'}
                        </span>
                      ) : (
                        'No deadline'
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <select
                        value={project.status}
                        onChange={(e) => onUpdateStatus(project.id, e.target.value as Project['status'])}
                        className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-safe text-xs"
                      >
                        <option value="draft">Draft</option>
                        <option value="in_progress">In Progress</option>
                        <option value="review">Review</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Clients Tab Component
function ClientsTab({ clients, projects }: { clients: Client[]; projects: Project[] }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-safe">
        Client Management
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => {
          const clientProjects = projects.filter(p => p.clientId === client.id);
          const activeProjects = clientProjects.filter(p => p.status === 'in_progress').length;
          const completedProjects = clientProjects.filter(p => p.status === 'completed').length;

          return (
            <div key={client.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center text-white font-bold">
                  {client.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-safe">{client.name}</h3>
                  <p className="text-sm text-safe-muted">{client.company}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm text-safe-muted">Email:</span>
                  <span className="font-medium text-safe">{client.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-safe-muted">Active Projects:</span>
                  <span className="font-medium text-safe">{activeProjects}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-safe-muted">Completed:</span>
                  <span className="font-medium text-safe">{completedProjects}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-safe-muted">Total Budget:</span>
                  <span className="font-medium text-safe">${client.totalBudget.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-safe-muted">Status:</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    client.status === 'active' ? 'bg-green-100 text-safe-success' : 'bg-gray-100 text-safe'
                  }`}>
                    {client.status}
                  </span>
                </div>
              </div>

              <ModernButton variant="outline" size="sm" fullWidth>
                View Details
              </ModernButton>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Create Member Modal Component
function CreateMemberModal({ 
  onClose, 
  onSubmit 
}: { 
  onClose: () => void;
  onSubmit: (data: { name: string; email: string; password: string }) => void;
}) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md"
      >
        <h3 className="text-lg font-semibold text-safe mb-4">
          Create New Member
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-safe mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-safe"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-safe mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-safe"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-safe mb-1">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-safe"
              required
              minLength={6}
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <ModernButton variant="outline" onClick={onClose} fullWidth>
              Cancel
            </ModernButton>
            <ModernButton variant="primary" fullWidth>
              Create Member
            </ModernButton>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
