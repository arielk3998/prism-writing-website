interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'member' | 'client'
}

interface QuickAction {
  id: string
  title: string
  description: string
  icon: string
  href?: string
  onClick?: () => void
  color: string
}

interface QuickActionsProps {
  user: User
}

export default function QuickActions({ user }: QuickActionsProps) {
  const getActionsForRole = (role: string): QuickAction[] => {
    switch (role) {
      case 'admin':
        return [
          {
            id: '1',
            title: 'Manage Users',
            description: 'Add or remove team members',
            icon: '👥',
            onClick: () => alert('User management coming soon!'),
            color: 'bg-blue-500 hover:bg-blue-600'
          },
          {
            id: '2',
            title: 'System Settings',
            description: 'Configure portal settings',
            icon: '⚙️',
            onClick: () => alert('Settings panel coming soon!'),
            color: 'bg-purple-500 hover:bg-purple-600'
          },
          {
            id: '3',
            title: 'Analytics',
            description: 'View usage statistics',
            icon: '📊',
            onClick: () => alert('Analytics dashboard coming soon!'),
            color: 'bg-green-500 hover:bg-green-600'
          },
          {
            id: '4',
            title: 'Backup Data',
            description: 'Create system backup',
            icon: '💾',
            onClick: () => alert('Backup initiated!'),
            color: 'bg-yellow-500 hover:bg-yellow-600'
          }
        ]
      case 'member':
        return [
          {
            id: '1',
            title: 'New Project',
            description: 'Start a new writing project',
            icon: '🚀',
            onClick: () => alert('Project creation coming soon!'),
            color: 'bg-blue-500 hover:bg-blue-600'
          },
          {
            id: '2',
            title: 'Upload Files',
            description: 'Add files to current project',
            icon: '📤',
            onClick: () => {
              const fileInput = document.createElement('input')
              fileInput.type = 'file'
              fileInput.multiple = true
              fileInput.click()
            },
            color: 'bg-green-500 hover:bg-green-600'
          },
          {
            id: '3',
            title: 'Time Tracker',
            description: 'Log work hours',
            icon: '⏰',
            onClick: () => alert('Time tracking coming soon!'),
            color: 'bg-purple-500 hover:bg-purple-600'
          },
          {
            id: '4',
            title: 'Client Communication',
            description: 'Send update to client',
            icon: '💬',
            onClick: () => alert('Messaging system coming soon!'),
            color: 'bg-orange-500 hover:bg-orange-600'
          }
        ]
      case 'client':
        return [
          {
            id: '1',
            title: 'Upload Files',
            description: 'Share files with your team',
            icon: '📤',
            onClick: () => {
              const fileInput = document.createElement('input')
              fileInput.type = 'file'
              fileInput.multiple = true
              fileInput.click()
            },
            color: 'bg-blue-500 hover:bg-blue-600'
          },
          {
            id: '2',
            title: 'Project Status',
            description: 'Check project progress',
            icon: '📈',
            onClick: () => alert('Project status coming soon!'),
            color: 'bg-green-500 hover:bg-green-600'
          },
          {
            id: '3',
            title: 'Send Message',
            description: 'Contact your writing team',
            icon: '💬',
            onClick: () => alert('Messaging system coming soon!'),
            color: 'bg-purple-500 hover:bg-purple-600'
          },
          {
            id: '4',
            title: 'Download Results',
            description: 'Get completed work',
            icon: '⬇️',
            onClick: () => alert('Download center coming soon!'),
            color: 'bg-orange-500 hover:bg-orange-600'
          }
        ]
      default:
        return []
    }
  }

  const actions = getActionsForRole(user.role)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-safe">Quick Actions</h3>
        <p className="text-sm text-safe-muted">Common tasks for your role</p>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {actions.map((action) => (
            <button
              key={action.id}
              onClick={action.onClick}
              className={`${action.color} text-white p-4 rounded-lg text-left transition-colors hover:shadow-lg`}
            >
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{action.icon}</div>
                <div>
                  <h4 className="font-medium">{action.title}</h4>
                  <p className="text-sm opacity-90 mt-1">{action.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
        
        {actions.length === 0 && (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">🎯</div>
            <p className="text-safe-muted">No quick actions available</p>
          </div>
        )}
      </div>
    </div>
  )
}
