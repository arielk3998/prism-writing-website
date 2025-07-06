/**
 * Project Management Component
 * 
 * Comprehensive project management interface for the member portal
 * 
 * @module ProjectManagement
 * @version 1.0.0
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User } from '../../lib/auth';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'PLANNING' | 'IN_PROGRESS' | 'ON_HOLD' | 'COMPLETED' | 'CANCELLED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  startDate: string;
  endDate?: string;
  progress: number;
  budget?: number;
  actualCost?: number;
  teamMembers: string[];
  tasks: number;
  completedTasks: number;
}

interface ProjectManagementProps {
  user: User;
}

export default function ProjectManagement({ }: ProjectManagementProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    // Mock data - replace with actual API call
    const mockProjects: Project[] = [
      {
        id: '1',
        name: 'API Documentation Rewrite',
        description: 'Complete rewrite of the API documentation for better developer experience',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        startDate: '2025-06-01',
        endDate: '2025-07-15',
        progress: 75,
        budget: 15000,
        actualCost: 11250,
        teamMembers: ['John Doe', 'Sarah Smith', 'Mike Johnson'],
        tasks: 12,
        completedTasks: 9
      },
      {
        id: '2',
        name: 'User Manual Updates',
        description: 'Update user manuals for the new software release',
        status: 'COMPLETED',
        priority: 'MEDIUM',
        startDate: '2025-05-15',
        endDate: '2025-06-10',
        progress: 100,
        budget: 8000,
        actualCost: 7500,
        teamMembers: ['Alice Brown', 'David Wilson'],
        tasks: 8,
        completedTasks: 8
      },
      {
        id: '3',
        name: 'Technical Blog Series',
        description: 'Create a series of technical blog posts for marketing',
        status: 'PLANNING',
        priority: 'MEDIUM',
        startDate: '2025-07-01',
        progress: 10,
        budget: 5000,
        teamMembers: ['Emma Davis'],
        tasks: 15,
        completedTasks: 1
      }
    ];

    setProjects(mockProjects);
    setLoading(false);
  };

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'PLANNING': return 'bg-blue-100 text-safe-accent dark:bg-blue-900 dark:text-blue-200';
      case 'IN_PROGRESS': return 'bg-yellow-100 text-safe-warning dark:bg-yellow-900 dark:text-yellow-200';
      case 'ON_HOLD': return 'bg-gray-100 text-safe dark:bg-gray-700 dark:text-gray-200';
      case 'COMPLETED': return 'bg-green-100 text-safe-success dark:bg-green-900 dark:text-green-200';
      case 'CANCELLED': return 'bg-red-100 text-safe-error dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-safe';
    }
  };

  const getPriorityColor = (priority: Project['priority']) => {
    switch (priority) {
      case 'LOW': return 'text-safe-success';
      case 'MEDIUM': return 'text-safe-warning';
      case 'HIGH': return 'text-safe-warning';
      case 'URGENT': return 'text-safe-error';
      default: return 'text-safe-muted';
    }
  };

  const filteredProjects = projects.filter(project => {
    if (filter === 'active') return ['PLANNING', 'IN_PROGRESS'].includes(project.status);
    if (filter === 'completed') return project.status === 'COMPLETED';
    return true;
  });

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-safe">Projects</h3>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Create new project"
          >
            + New Project
          </button>
        </div>

        {/* Filters */}
        <div className="flex space-x-4 mb-6" role="tablist" aria-label="Project filters">
          {['all', 'active', 'completed'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType as 'all' | 'active' | 'completed')}
              role="tab"
              aria-selected={filter === filterType}
              aria-label={`Show ${filterType} projects`}
              className={`px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                filter === filterType
                  ? 'bg-blue-100 text-safe-accent dark:bg-blue-900 dark:text-blue-300'
                  : 'text-safe-muted hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.button
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={() => setSelectedProject(project)}
              aria-label={`View project ${project.name}`}
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-semibold text-safe text-sm">
                  {project.name}
                </h4>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(project.status)}`}>
                  {project.status.replace('_', ' ')}
                </span>
              </div>

              <p className="text-sm text-safe-muted mb-4 line-clamp-2">
                {project.description}
              </p>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-safe-muted mb-1">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Project Stats */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-safe-muted">Tasks</span>
                  <p className="font-medium text-safe">
                    {project.completedTasks}/{project.tasks}
                  </p>
                </div>
                <div>
                  <span className="text-safe-muted">Priority</span>
                  <p className={`font-medium ${getPriorityColor(project.priority)}`}>
                    {project.priority}
                  </p>
                </div>
                {project.budget && (
                  <>
                    <div>
                      <span className="text-safe-muted">Budget</span>
                      <p className="font-medium text-safe">
                        ${project.budget.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <span className="text-safe-muted">Spent</span>
                      <p className="font-medium text-safe">
                        ${(project.actualCost || 0).toLocaleString()}
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Team Members */}
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-safe-muted">Team:</span>
                  <div className="flex space-x-1">
                    {project.teamMembers.slice(0, 3).map((member, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-xs text-safe-accent"
                      >
                        {member.charAt(0)}
                      </div>
                    ))}
                    {project.teamMembers.length > 3 && (
                      <div className="w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-xs text-safe-muted">
                        +{project.teamMembers.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">📋</span>
            <p className="text-safe-muted">No projects found</p>
            <p className="text-sm text-safe-muted dark:text-safe-muted mt-2">
              {filter === 'all' ? 'Create your first project to get started' : `No ${filter} projects`}
            </p>
          </div>
        )}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-safe">
                  {selectedProject.name}
                </h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-safe-muted hover:text-safe dark:hover:text-gray-200"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-safe mb-2">Description</h4>
                  <p className="text-safe-muted">{selectedProject.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-safe mb-2">Status</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedProject.status)}`}>
                      {selectedProject.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-safe mb-2">Priority</h4>
                    <span className={`font-medium ${getPriorityColor(selectedProject.priority)}`}>
                      {selectedProject.priority}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-safe mb-2">Progress</h4>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${selectedProject.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-safe-muted mt-1">
                    {selectedProject.progress}% complete
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-safe mb-2">Team Members</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.teamMembers.map((member, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-safe"
                      >
                        {member}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                    Edit Project
                  </button>
                  <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors">
                    View Tasks
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
