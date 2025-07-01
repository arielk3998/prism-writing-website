/**
 * Enhanced File Management System
 * 
 * Complete file upload, management, and sharing system for the
 * Prism Writing member portal webapp.
 * 
 * @module EnhancedFileManager
 * @version 1.0.0
 */

'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth, usePermissions } from '../../contexts/AuthContext';

interface FileItem {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
  uploadedBy: string;
  category: string;
  tags: string[];
  url?: string;
  description?: string;
  permissions: {
    read: string[];
    write: string[];
    delete: string[];
  };
}

interface FileCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  allowedTypes: string[];
}

const fileCategories: FileCategory[] = [
  {
    id: 'documents',
    name: 'Documents',
    icon: '📄',
    description: 'Word documents, PDFs, text files',
    allowedTypes: ['.pdf', '.doc', '.docx', '.txt', '.rtf']
  },
  {
    id: 'projects',
    name: 'Project Files',
    icon: '🚀',
    description: 'Project deliverables and working files',
    allowedTypes: ['.pdf', '.doc', '.docx', '.zip', '.tar', '.gz']
  },
  {
    id: 'resources',
    name: 'Resources',
    icon: '📚',
    description: 'Reference materials and templates',
    allowedTypes: ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx']
  },
  {
    id: 'media',
    name: 'Media',
    icon: '🎨',
    description: 'Images, videos, and design files',
    allowedTypes: ['.jpg', '.jpeg', '.png', '.gif', '.mp4', '.mov', '.avi', '.psd', '.ai']
  }
];

export default function EnhancedFileManager() {
  const { user } = useAuth();
  const { hasPermission } = usePermissions();
  const [files, setFiles] = useState<FileItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Load files from localStorage on component mount
  useEffect(() => {
    const savedFiles = localStorage.getItem('prism-files');
    if (savedFiles) {
      setFiles(JSON.parse(savedFiles));
    } else {
      // Initialize with some demo files
      const demoFiles: FileItem[] = [
        {
          id: '1',
          name: 'API Documentation Draft.pdf',
          size: 2048000,
          type: 'application/pdf',
          uploadedAt: '2024-06-25T10:00:00Z',
          uploadedBy: 'member@prismwriting.com',
          category: 'documents',
          tags: ['API', 'documentation', 'draft'],
          permissions: {
            read: ['admin', 'member', 'client'],
            write: ['admin', 'member'],
            delete: ['admin']
          }
        },
        {
          id: '2',
          name: 'Project Requirements.docx',
          size: 1024000,
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          uploadedAt: '2024-06-24T15:30:00Z',
          uploadedBy: 'client@example.com',
          category: 'projects',
          tags: ['requirements', 'project'],
          permissions: {
            read: ['admin', 'member', 'client'],
            write: ['admin', 'client'],
            delete: ['admin', 'client']
          }
        }
      ];
      setFiles(demoFiles);
      localStorage.setItem('prism-files', JSON.stringify(demoFiles));
    }
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string): string => {
    if (type.includes('pdf')) return '📄';
    if (type.includes('word') || type.includes('document')) return '📝';
    if (type.includes('image')) return '🖼️';
    if (type.includes('video')) return '🎥';
    if (type.includes('audio')) return '🎵';
    if (type.includes('zip') || type.includes('compressed')) return '📦';
    return '📁';
  };

  const filteredFiles = files.filter(file => {
    const matchesCategory = selectedCategory === 'all' || file.category === selectedCategory;
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const hasReadPermission = hasPermission('read') && 
                             file.permissions.read.includes(user?.role || 'client');
    
    return matchesCategory && matchesSearch && hasReadPermission;
  });

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (!uploadedFiles || !user) return;

    setIsUploading(true);

    for (let i = 0; i < uploadedFiles.length; i++) {
      const file = uploadedFiles[i];
      
      // Create new file object
      const newFile: FileItem = {
        id: Date.now().toString() + i,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString(),
        uploadedBy: user.email,
        category: 'documents', // Default category
        tags: [],
        permissions: {
          read: [user.role],
          write: [user.role],
          delete: user.role === 'ADMIN' ? ['ADMIN'] : [user.role]
        }
      };

      // Simulate file upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setFiles(prev => {
        const updated = [...prev, newFile];
        localStorage.setItem('prism-files', JSON.stringify(updated));
        return updated;
      });
    }

    setIsUploading(false);
    setShowUploadModal(false);
  }, [user]);

  const handleDeleteFiles = () => {
    if (selectedFiles.length === 0) return;

    const updatedFiles = files.filter(file => 
      !selectedFiles.includes(file.id) || 
      !file.permissions.delete.includes(user?.role || 'client')
    );
    
    setFiles(updatedFiles);
    localStorage.setItem('prism-files', JSON.stringify(updatedFiles));
    setSelectedFiles([]);
  };

  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">File Manager</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Upload, organize, and share your project files
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              {viewMode === 'grid' ? '📋' : '⚏'}
            </button>
            {hasPermission('write') && (
              <button
                onClick={() => setShowUploadModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <span>📤</span>
                Upload Files
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Category Filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                }`}
              >
                All Files
              </button>
              {fileCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors flex items-center gap-1 ${
                    selectedCategory === category.id
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span>{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="lg:w-64">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search Files
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or tags..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Selection Actions */}
        {selectedFiles.length > 0 && (
          <div className="mt-4 flex items-center gap-3">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {selectedFiles.length} file(s) selected
            </span>
            {hasPermission('delete') && (
              <button
                onClick={handleDeleteFiles}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                Delete Selected
              </button>
            )}
            <button
              onClick={() => setSelectedFiles([])}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 text-sm"
            >
              Clear Selection
            </button>
          </div>
        )}
      </div>

      {/* File Grid/List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        {filteredFiles.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No files found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {searchTerm ? 'Try adjusting your search criteria' : 'Upload your first file to get started'}
            </p>
            {hasPermission('write') && (
              <button
                onClick={() => setShowUploadModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Upload Files
              </button>
            )}
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' : 'space-y-2'}>
            <AnimatePresence>
              {filteredFiles.map(file => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={viewMode === 'grid' 
                    ? 'border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer'
                    : 'flex items-center gap-4 p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer'
                  }
                  onClick={() => toggleFileSelection(file.id)}
                >
                  <div className={`flex items-center gap-3 ${viewMode === 'grid' ? 'flex-col text-center' : ''}`}>
                    <div className={`text-3xl ${viewMode === 'grid' ? 'mb-2' : ''}`}>
                      {getFileIcon(file.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-medium text-gray-900 dark:text-white ${viewMode === 'grid' ? 'text-sm' : ''} truncate`}>
                        {file.name}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatFileSize(file.size)}
                      </p>
                      {viewMode === 'list' && (
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          Uploaded {new Date(file.uploadedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    {selectedFiles.includes(file.id) && (
                      <div className="text-blue-600 text-xl">✓</div>
                    )}
                  </div>
                  {viewMode === 'grid' && (
                    <div className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                      {new Date(file.uploadedAt).toLocaleDateString()}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Upload Files
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select Files
                  </label>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    disabled={isUploading}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {isUploading && (
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Uploading files...
                    </p>
                  </div>
                )}

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowUploadModal(false)}
                    disabled={isUploading}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                  >
                    Cancel
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
