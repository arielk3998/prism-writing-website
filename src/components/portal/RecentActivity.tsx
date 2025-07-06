interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'member' | 'client'
}

interface Activity {
  id: string
  type: 'file_upload' | 'project_update' | 'login' | 'message' | 'task_complete'
  title: string
  description: string
  timestamp: string
  user: string
  icon: string
}

interface RecentActivityProps {
  user: User
}

export default function RecentActivity({ user }: RecentActivityProps) {
  const getActivitiesForRole = (role: string): Activity[] => {
    const baseActivities: Activity[] = [
      {
        id: '1',
        type: 'file_upload',
        title: 'New file uploaded',
        description: 'Brand_Guidelines.zip uploaded to Project Alpha',
        timestamp: '2 hours ago',
        user: 'client@example.com',
        icon: '📤'
      },
      {
        id: '2', 
        type: 'project_update',
        title: 'Project milestone reached',
        description: 'Content Strategy phase completed',
        timestamp: '4 hours ago',
        user: 'member@prismwriting.com',
        icon: '🎯'
      },
      {
        id: '3',
        type: 'login',
        title: 'User login',
        description: `${user.name} logged into the portal`,
        timestamp: '6 hours ago',
        user: user.email,
        icon: '🔐'
      },
      {
        id: '4',
        type: 'message',
        title: 'New message received',
        description: 'Client feedback on latest draft',
        timestamp: '1 day ago',
        user: 'client@example.com', 
        icon: '💬'
      },
      {
        id: '5',
        type: 'task_complete',
        title: 'Task completed',
        description: 'API documentation review finished',
        timestamp: '2 days ago',
        user: 'member@prismwriting.com',
        icon: '✅'
      }
    ]

    // Filter activities based on user role
    if (role === 'client') {
      return baseActivities.filter(activity => 
        activity.user === user.email || 
        activity.type === 'project_update' ||
        activity.type === 'task_complete'
      )
    }

    return baseActivities
  }

  const activities = getActivitiesForRole(user.role)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-safe">Recent Activity</h3>
        <p className="text-sm text-safe-muted">Latest updates and actions</p>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className="text-xl">{activity.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-safe">
                    {activity.title}
                  </h4>
                  <span className="text-xs text-safe-muted">
                    {activity.timestamp}
                  </span>
                </div>
                <p className="text-sm text-safe-muted mt-1">
                  {activity.description}
                </p>
                <p className="text-xs text-safe-muted mt-1">
                  by {activity.user}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {activities.length === 0 && (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">📊</div>
            <p className="text-safe-muted">No recent activity</p>
          </div>
        )}
      </div>
    </div>
  )
}
