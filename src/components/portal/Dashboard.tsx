'use client'

import { useState } from 'react'
import Link from 'next/link'
import FileManager from './FileManager'
import UserStats from './UserStats'
import RecentActivity from './RecentActivity'
import QuickActions from './QuickActions'
import { DarkModeToggle } from '../ui/DarkModeToggle'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'member' | 'client'
  avatar?: string
}

interface WorkRequest {
  id: string;
  clientId: string;
  title: string;
  type: string;
  description: string;
  timeline: string;
  budget: string;
  status: string;
  submittedAt: string;
  priority: string;
  deadline?: string;
}

interface DashboardProps {
  user: User | null
}

export default function Dashboard({ user }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('overview')

  if (!user) return null

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'files', label: 'Files', icon: '📁' },
    ...(user.role === 'client' 
      ? [{ id: 'requests', label: 'My Requests', icon: '📝' }]
      : [{ id: 'projects', label: 'Projects', icon: '🚀' }]
    ),
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ]

  const getWorkRequests = () => {
    const workRequests = JSON.parse(localStorage.getItem('workRequests') || '[]')
    return workRequests.filter((req: WorkRequest) => req.clientId === user.id)
  }

  const renderClientRequests = () => {
    const requests = getWorkRequests()
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">My Work Requests</h3>
        {requests.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">📝</div>
            <p className="text-gray-500 dark:text-gray-400 mb-4">No work requests yet</p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Use the &quot;New Request&quot; tab to submit your first project
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request: WorkRequest) => (
              <div key={request.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">{request.title}</h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    request.status === 'submitted' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                    request.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    request.status === 'review' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                    request.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                  }`}>
                    {request.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{request.description}</p>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-4">
                  <span>Type: {request.type.replace('-', ' ')}</span>
                  <span>Priority: {request.priority}</span>
                  {request.deadline && <span>Due: {new Date(request.deadline).toLocaleDateString()}</span>}
                  {request.budget && <span>Budget: ${request.budget}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <UserStats user={user} />
            <div className="grid lg:grid-cols-2 gap-6">
              <RecentActivity user={user} />
              <QuickActions user={user} />
            </div>
          </div>
        )
      case 'files':
        return <FileManager user={user} />
      case 'projects':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Projects</h3>
            <p className="text-gray-600 dark:text-gray-300">Project management coming soon...</p>
          </div>
        )
      case 'requests':
        return renderClientRequests()
      case 'settings':
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={user.name}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={user.email}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Role
                </label>
                <input
                  type="text"
                  value={user.role}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white capitalize"
                  readOnly
                />
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Portal Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="font-medium">Back to Home</span>
              </Link>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Client Portal</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Welcome back, {user.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <DarkModeToggle />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{user.role}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  )
}
