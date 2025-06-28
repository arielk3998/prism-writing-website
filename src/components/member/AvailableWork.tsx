'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'

interface WorkRequest {
  id: string
  title: string
  description: string
  type: string
  priority: string
  deadline?: string
  budget?: number
  status: string
  createdAt: string
  clientId: string
  assignedTo?: string
}

export default function AvailableWork() {
  const { user } = useAuth()
  const [workRequests, setWorkRequests] = useState<WorkRequest[]>([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    loadWorkRequests()
  }, [])

  const loadWorkRequests = () => {
    const requests = JSON.parse(localStorage.getItem('workRequests') || '[]')
    setWorkRequests(requests)
  }

  const handleAcceptWork = (requestId: string) => {
    const updatedRequests = workRequests.map(req => 
      req.id === requestId 
        ? { ...req, status: 'in-progress', assignedTo: user?.id }
        : req
    )
    setWorkRequests(updatedRequests)
    localStorage.setItem('workRequests', JSON.stringify(updatedRequests))
  }

  const getFilteredRequests = () => {
    let filtered = workRequests
    
    if (filter === 'available') {
      filtered = filtered.filter(req => req.status === 'submitted')
    } else if (filter === 'my-work') {
      filtered = filtered.filter(req => req.assignedTo === user?.id)
    }
    
    return filtered.sort((a, b) => {
      const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 }
      return (priorityOrder[b.priority as keyof typeof priorityOrder] || 0) - 
             (priorityOrder[a.priority as keyof typeof priorityOrder] || 0)
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'in-progress': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      case 'review': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    }
  }

  const filteredRequests = getFilteredRequests()

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Work Opportunities
          </h2>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              All Requests
            </button>
            <button
              onClick={() => setFilter('available')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'available'
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              Available
            </button>
            <button
              onClick={() => setFilter('my-work')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === 'my-work'
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              My Work
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {filteredRequests.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {filter === 'available' ? 'No available work right now' :
               filter === 'my-work' ? 'No assigned work yet' :
               'No work requests yet'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {filter === 'available' ? 'Check back later for new opportunities' :
               filter === 'my-work' ? 'Accept some available work to get started' :
               'Work requests will appear here as clients submit them'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <div key={request.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {request.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {request.description}
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(request.priority)}`}>
                        {request.priority.toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(request.status)}`}>
                        {request.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                    
                    {request.status === 'submitted' && (
                      <button
                        onClick={() => handleAcceptWork(request.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
                      >
                        Accept Work
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 space-x-6">
                  <span className="flex items-center">
                    <span className="mr-1">📝</span>
                    {request.type.replace('-', ' ')}
                  </span>
                  
                  {request.deadline && (
                    <span className="flex items-center">
                      <span className="mr-1">📅</span>
                      Due: {new Date(request.deadline).toLocaleDateString()}
                    </span>
                  )}
                  
                  {request.budget && (
                    <span className="flex items-center">
                      <span className="mr-1">💰</span>
                      ${request.budget}
                    </span>
                  )}
                  
                  <span className="flex items-center">
                    <span className="mr-1">🕒</span>
                    {new Date(request.createdAt).toLocaleDateString()}
                  </span>
                  
                  {request.assignedTo === user?.id && (
                    <span className="flex items-center text-blue-600 dark:text-blue-400">
                      <span className="mr-1">👤</span>
                      Assigned to you
                    </span>
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
