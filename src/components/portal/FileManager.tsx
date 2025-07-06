'use client'

import { useState, useRef } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'member' | 'client'
}

interface FileItem {
  id: string
  name: string
  size: number
  type: string
  uploadedBy: string
  uploadedAt: string
  downloadUrl?: string
}

interface FileManagerProps {
  user: User
}

export default function FileManager({ user }: FileManagerProps) {
  const [files, setFiles] = useState<FileItem[]>([
    {
      id: '1',
      name: 'Project_Brief_2024.pdf',
      size: 2048576, // 2MB
      type: 'application/pdf',
      uploadedBy: 'client@example.com',
      uploadedAt: '2024-06-25T10:30:00Z'
    },
    {
      id: '2', 
      name: 'Content_Strategy.docx',
      size: 1024000, // 1MB
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      uploadedBy: 'member@prismwriting.com',
      uploadedAt: '2024-06-24T14:15:00Z'
    },
    {
      id: '3',
      name: 'Brand_Guidelines.zip',
      size: 5242880, // 5MB
      type: 'application/zip',
      uploadedBy: 'client@example.com',
      uploadedAt: '2024-06-23T09:45:00Z'
    }
  ])
  
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return '📄'
    if (type.includes('word') || type.includes('document')) return '📝'
    if (type.includes('image')) return '🖼️'
    if (type.includes('zip') || type.includes('archive')) return '📦'
    if (type.includes('video')) return '🎥'
    if (type.includes('audio')) return '🎵'
    return '📁'
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
    if (!selectedFiles) return

    setUploading(true)

    // Simulate file upload
    for (const file of Array.from(selectedFiles)) {
      // In a real app, you'd upload to your server/cloud storage
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const newFile: FileItem = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedBy: user.email,
        uploadedAt: new Date().toISOString()
      }
      
      setFiles(prev => [newFile, ...prev])
    }

    setUploading(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleDownload = (file: FileItem) => {
    // In a real app, this would download from your server
    alert(`Downloading ${file.name}...`)
  }

  const handleDelete = (fileId: string) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      setFiles(prev => prev.filter(f => f.id !== fileId))
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-safe">File Manager</h3>
            <p className="text-sm text-safe-muted">
              Upload and manage project files
            </p>
          </div>
          
          <div className="flex gap-3">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              accept=".pdf,.doc,.docx,.zip,.jpg,.jpeg,.png,.gif,.mp4,.mov"
            />
            
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              {uploading ? 'Uploading...' : '📎 Upload Files'}
            </button>
          </div>
        </div>
      </div>

      {/* File List */}
      <div className="p-6">
        {files.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📁</div>
            <h4 className="text-lg font-medium text-safe mb-2">No files yet</h4>
            <p className="text-safe-muted mb-4">
              Upload your first file to get started
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Upload Files
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{getFileIcon(file.type)}</div>
                  <div>
                    <h4 className="font-medium text-safe">
                      {file.name}
                    </h4>
                    <div className="text-sm text-safe-muted">
                      {formatFileSize(file.size)} • Uploaded by {file.uploadedBy} • {formatDate(file.uploadedAt)}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDownload(file)}
                    className="text-safe-accent hover:text-safe-accent p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                    title="Download"
                  >
                    ⬇️
                  </button>
                  
                  {(user.role === 'admin' || file.uploadedBy === user.email) && (
                    <button
                      onClick={() => handleDelete(file.id)}
                      className="text-safe-error hover:text-safe-error dark:text-red-400 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      title="Delete"
                    >
                      🗑️
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
