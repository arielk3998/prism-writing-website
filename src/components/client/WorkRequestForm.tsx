'use client'

import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'

type WorkRequestType = 'content-writing' | 'technical-writing' | 'copywriting' | 'editing' | 'other'
type Priority = 'low' | 'medium' | 'high' | 'urgent'

interface WorkRequest {
  id: string
  title: string
  description: string
  type: WorkRequestType
  priority: Priority
  deadline?: string
  budget?: number
  attachments?: File[]
  status: 'draft' | 'submitted' | 'in-progress' | 'review' | 'completed'
  createdAt: string
  clientId: string
}

export default function WorkRequestForm() {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'content-writing' as WorkRequestType,
    priority: 'medium' as Priority,
    deadline: '',
    budget: '',
    requirements: ''
  })
  const [attachments, setAttachments] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Create work request object
      const workRequest: WorkRequest = {
        id: `wr_${Date.now()}`,
        title: formData.title,
        description: formData.description,
        type: formData.type,
        priority: formData.priority,
        deadline: formData.deadline || undefined,
        budget: formData.budget ? parseFloat(formData.budget) : undefined,
        status: 'submitted',
        createdAt: new Date().toISOString(),
        clientId: user?.id || 'unknown'
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Store work request (in real app, this would go to backend)
      const workRequests = JSON.parse(localStorage.getItem('workRequests') || '[]')
      workRequests.push(workRequest)
      localStorage.setItem('workRequests', JSON.stringify(workRequests))

      // Store file references (in real app, files would be uploaded to cloud storage)
      if (attachments.length > 0) {
        const fileRefs = attachments.map(file => ({
          name: file.name,
          size: file.size,
          type: file.type,
          workRequestId: workRequest.id
        }))
        const storedFiles = JSON.parse(localStorage.getItem('workRequestFiles') || '[]')
        storedFiles.push(...fileRefs)
        localStorage.setItem('workRequestFiles', JSON.stringify(storedFiles))
      }

      setSuccess(true)
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        type: 'content-writing',
        priority: 'medium',
        deadline: '',
        budget: '',
        requirements: ''
      })
      setAttachments([])

    } catch (error) {
      console.error('Failed to submit work request:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files))
    }
  }

  const removeFile = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index))
  }

  if (success) {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-8 text-center">
        <div className="text-safe-success text-5xl mb-4">✓</div>
        <h3 className="text-xl font-semibold text-safe-success dark:text-green-200 mb-2">
          Work Request Submitted!
        </h3>
        <p className="text-safe-success mb-4">
          Your request has been sent to our cooperative members. You&apos;ll receive updates via email and in your portal dashboard.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Submit Another Request
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-safe mb-6">
        Submit Work Request
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-safe mb-1">
            Project Title *
          </label>
          <input
            id="title"
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Brief, descriptive title for your project"
            required
            disabled={isLoading}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-safe mb-1">
              Project Type *
            </label>
            <select
              id="type"
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as WorkRequestType }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              required
              disabled={isLoading}
            >
              <option value="content-writing">Content Writing</option>
              <option value="technical-writing">Technical Writing</option>
              <option value="copywriting">Copywriting</option>
              <option value="editing">Editing & Proofreading</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-safe mb-1">
              Priority Level
            </label>
            <select
              id="priority"
              value={formData.priority}
              onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as Priority }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              disabled={isLoading}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="deadline" className="block text-sm font-medium text-safe mb-1">
              Preferred Deadline
            </label>
            <input
              id="deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-safe mb-1">
              Budget (USD)
            </label>
            <input
              id="budget"
              type="number"
              value={formData.budget}
              onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Optional budget range"
              min="0"
              step="0.01"
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-safe mb-1">
            Project Description *
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Detailed description of your project, goals, target audience, and any specific requirements"
            rows={5}
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="files" className="block text-sm font-medium text-safe mb-1">
            Attachments
          </label>
          <input
            id="files"
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-safe-accent hover:file:bg-blue-100"
            disabled={isLoading}
          />
          <p className="text-xs text-safe-muted mt-1">
            Upload any relevant files, documents, or reference materials
          </p>
          
          {attachments.length > 0 && (
            <div className="mt-3 space-y-2">
              {attachments.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-2 rounded">
                  <span className="text-sm text-safe">
                    {file.name} ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-safe-error hover:text-safe-error text-sm"
                    disabled={isLoading}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || !formData.title || !formData.description}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          {isLoading ? 'Submitting Request...' : 'Submit Work Request'}
        </button>
      </form>
    </div>
  )
}
