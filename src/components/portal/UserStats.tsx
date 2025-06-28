interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'member' | 'client'
}

interface UserStatsProps {
  user: User
}

export default function UserStats({ user }: UserStatsProps) {
  const getStatsForRole = (role: string) => {
    switch (role) {
      case 'admin':
        return [
          { label: 'Total Projects', value: '24', icon: '🚀', color: 'text-blue-600' },
          { label: 'Active Members', value: '8', icon: '👥', color: 'text-green-600' },
          { label: 'Files Managed', value: '156', icon: '📁', color: 'text-purple-600' },
          { label: 'System Uptime', value: '99.9%', icon: '⚡', color: 'text-yellow-600' }
        ]
      case 'member':
        return [
          { label: 'Active Projects', value: '6', icon: '🚀', color: 'text-blue-600' },
          { label: 'Files Accessed', value: '32', icon: '📁', color: 'text-green-600' },
          { label: 'Hours This Week', value: '28', icon: '⏰', color: 'text-purple-600' },
          { label: 'Tasks Completed', value: '15', icon: '✅', color: 'text-yellow-600' }
        ]
      case 'client':
        return [
          { label: 'My Projects', value: '3', icon: '🚀', color: 'text-blue-600' },
          { label: 'Files Uploaded', value: '12', icon: '📤', color: 'text-green-600' },
          { label: 'Messages', value: '8', icon: '💬', color: 'text-purple-600' },
          { label: 'Project Status', value: 'On Track', icon: '📈', color: 'text-yellow-600' }
        ]
      default:
        return []
    }
  }

  const stats = getStatsForRole(user.role)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="text-3xl mr-4">{stat.icon}</div>
            <div>
              <div className={`text-2xl font-bold ${stat.color} dark:text-white`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {stat.label}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
