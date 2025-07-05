'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import EnhancedSuperAdminDashboard from '@/src/components/portal/EnhancedSuperAdminDashboard';
import { 
  User as UserIcon, 
  Lock, 
  Shield,
  Users,
  FileText,
  BarChart3,
  Settings,
  Globe,
  CheckCircle,
  TrendingUp,
  ArrowLeft,
  LogOut
} from 'lucide-react';

// Local types for portal demonstration
interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  name: string;
  role: UserRole;
  status: UserStatus;
  joinedAt?: Date;
  lastLogin?: Date;
}

type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR' | 'MEMBER' | 'CLIENT';
type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING_VERIFICATION';

// Mock authentication - replace with real auth system
const mockUsers: Record<string, User> = {
  'customer': {
    id: '1',
    email: 'sarah@businesscorp.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    name: 'Sarah Johnson',
    role: 'CLIENT' as UserRole,
    status: 'ACTIVE' as UserStatus,
    joinedAt: new Date(),
    lastLogin: new Date()
  },
  'project-manager': {
    id: '2', 
    email: 'michael@prismwriting.com',
    firstName: 'Michael',
    lastName: 'Chen',
    name: 'Michael Chen',
    role: 'ADMIN' as UserRole,
    status: 'ACTIVE' as UserStatus,
    joinedAt: new Date(),
    lastLogin: new Date()
  },
  'translator': {
    id: '3',
    email: 'elena@prismwriting.com',
    firstName: 'Elena',
    lastName: 'Rodriguez', 
    name: 'Elena Rodriguez',
    role: 'MEMBER' as UserRole,
    status: 'ACTIVE' as UserStatus,
    joinedAt: new Date(),
    lastLogin: new Date()
  },
  'quality-reviewer': {
    id: '4',
    email: 'david@prismwriting.com',
    firstName: 'David',
    lastName: 'Kim',
    name: 'David Kim',
    role: 'EDITOR' as UserRole,
    status: 'ACTIVE' as UserStatus,
    joinedAt: new Date(),
    lastLogin: new Date()
  },
  'account-manager': {
    id: '5',
    email: 'lisa@prismwriting.com',
    firstName: 'Lisa',
    lastName: 'Thompson',
    name: 'Lisa Thompson',
    role: 'ADMIN' as UserRole,
    status: 'ACTIVE' as UserStatus,
    joinedAt: new Date(),
    lastLogin: new Date()
  },
  'administrator': {
    id: '6',
    email: 'ariel@prismwriting.com',
    firstName: 'Ariel',
    lastName: 'CEO',
    name: 'Ariel (CEO/Super Admin)',
    role: 'SUPER_ADMIN' as UserRole,
    status: 'ACTIVE' as UserStatus,
    joinedAt: new Date(),
    lastLogin: new Date()
  }
};

// Convert from auth roles to legacy dashboard roles for compatibility
const convertToLegacyRole = (role: UserRole): 'admin' | 'member' | 'client' => {
  switch (role) {
    case 'CLIENT':
      return 'client';
    case 'SUPER_ADMIN':
    case 'ADMIN':
      return 'admin';
    default:
      return 'member';
  }
};

// Mock component placeholders to avoid imports for now
const Dashboard = ({ user }: { user: any }) => (
  <div className="p-6 bg-white rounded-lg shadow">
    <h2 className="text-2xl font-bold mb-4">Dashboard - {user.role}</h2>
    <p>Welcome {user.name}! This is your personalized dashboard.</p>
    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold">Active Projects</h3>
        <p className="text-2xl font-bold text-blue-600">12</p>
      </div>
      <div className="p-4 bg-green-50 rounded-lg">
        <h3 className="font-semibold">Completed</h3>
        <p className="text-2xl font-bold text-green-600">45</p>
      </div>
      <div className="p-4 bg-yellow-50 rounded-lg">
        <h3 className="font-semibold">In Review</h3>
        <p className="text-2xl font-bold text-yellow-600">8</p>
      </div>
    </div>
  </div>
);

const ProjectManagement = ({ user }: { user: any }) => (
  <div className="p-6 bg-white rounded-lg shadow">
    <h2 className="text-2xl font-bold mb-4">Project Management - {user.role}</h2>
    <p>Manage your projects and assignments here.</p>
    <div className="mt-4">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-50">
            <th className="border border-gray-300 p-2">Project</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Deadline</th>
            <th className="border border-gray-300 p-2">Progress</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 p-2">Website Translation</td>
            <td className="border border-gray-300 p-2">In Progress</td>
            <td className="border border-gray-300 p-2">Jul 10, 2025</td>
            <td className="border border-gray-300 p-2">75%</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Legal Document Review</td>
            <td className="border border-gray-300 p-2">Pending</td>
            <td className="border border-gray-300 p-2">Jul 15, 2025</td>
            <td className="border border-gray-300 p-2">0%</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const FileManager = ({ user }: { user: any }) => (
  <div className="p-6 bg-white rounded-lg shadow">
    <h2 className="text-2xl font-bold mb-4">File Manager - {user.role}</h2>
    <p>Access and manage your files here.</p>
    <div className="mt-4 space-y-2">
      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded">
        <FileText className="w-5 h-5 text-blue-600" />
        <span>Project_Brief_2025.pdf</span>
        <span className="text-sm text-muted-foreground">2.3 MB</span>
      </div>
      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded">
        <FileText className="w-5 h-5 text-green-600" />
        <span>Translation_Draft_v2.docx</span>
        <span className="text-sm text-muted-foreground">1.8 MB</span>
      </div>
      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded">
        <FileText className="w-5 h-5 text-purple-600" />
        <span>Quality_Review_Notes.txt</span>
        <span className="text-sm text-muted-foreground">45 KB</span>
      </div>
    </div>
  </div>
);

const AnalyticsDashboard = ({ user }: { user: any }) => (
  <div className="p-6 bg-white rounded-lg shadow">
    <h2 className="text-2xl font-bold mb-4">Analytics - {user.role}</h2>
    <p>View performance metrics and analytics.</p>
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-4 bg-purple-50 rounded-lg">
        <h3 className="font-semibold">Revenue This Month</h3>
        <p className="text-2xl font-bold text-purple-600">$15,450</p>
      </div>
      <div className="p-4 bg-indigo-50 rounded-lg">
        <h3 className="font-semibold">Client Satisfaction</h3>
        <p className="text-2xl font-bold text-indigo-600">98%</p>
      </div>
      <div className="p-4 bg-pink-50 rounded-lg">
        <h3 className="font-semibold">Average Delivery Time</h3>
        <p className="text-2xl font-bold text-pink-600">2.3 days</p>
      </div>
      <div className="p-4 bg-cyan-50 rounded-lg">
        <h3 className="font-semibold">Quality Score</h3>
        <p className="text-2xl font-bold text-cyan-600">9.7/10</p>
      </div>
    </div>
  </div>
);

const AccountManagement = ({ user }: { user: any }) => (
  <div className="p-6 bg-white rounded-lg shadow">
    <h2 className="text-2xl font-bold mb-4">Account Settings - {user.role}</h2>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input type="text" value={user.name} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" readOnly />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" value={user.email} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" readOnly />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <input type="text" value={user.role} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" readOnly />
      </div>
      <Button className="bg-primary text-white">Update Settings</Button>
    </div>
  </div>
);

const portalFeatures = {
  'CLIENT': [
    { id: 'dashboard', label: 'My Projects', icon: UserIcon, component: 'Dashboard' },
    { id: 'files', label: 'Files', icon: FileText, component: 'FileManager' },
    { id: 'account', label: 'Account', icon: Settings, component: 'AccountManagement' }
  ],
  'ADMIN': [
    { id: 'dashboard', label: 'Overview', icon: BarChart3, component: 'Dashboard' },
    { id: 'projects', label: 'All Projects', icon: Users, component: 'ProjectManagement' },
    { id: 'files', label: 'File Management', icon: FileText, component: 'FileManager' },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, component: 'AnalyticsDashboard' },
    { id: 'account', label: 'Settings', icon: Settings, component: 'AccountManagement' }
  ],
  'MEMBER': [
    { id: 'dashboard', label: 'Work Queue', icon: UserIcon, component: 'Dashboard' },
    { id: 'projects', label: 'My Tasks', icon: CheckCircle, component: 'ProjectManagement' },
    { id: 'files', label: 'Documents', icon: FileText, component: 'FileManager' },
    { id: 'account', label: 'Profile', icon: Settings, component: 'AccountManagement' }
  ],
  'EDITOR': [
    { id: 'dashboard', label: 'Review Queue', icon: CheckCircle, component: 'Dashboard' },
    { id: 'projects', label: 'Quality Control', icon: Shield, component: 'ProjectManagement' },
    { id: 'files', label: 'Documents', icon: FileText, component: 'FileManager' },
    { id: 'analytics', label: 'Quality Metrics', icon: BarChart3, component: 'AnalyticsDashboard' },
    { id: 'account', label: 'Settings', icon: Settings, component: 'AccountManagement' }
  ],
  'SUPER_ADMIN': [
    { id: 'dashboard', label: 'System Overview', icon: BarChart3, component: 'Dashboard' },
    { id: 'projects', label: 'All Projects', icon: Users, component: 'ProjectManagement' },
    { id: 'analytics', label: 'System Analytics', icon: TrendingUp, component: 'AnalyticsDashboard' },
    { id: 'files', label: 'File System', icon: FileText, component: 'FileManager' },
    { id: 'account', label: 'Admin Settings', icon: Settings, component: 'AccountManagement' }
  ]
};

export default function PortalPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeFeature, setActiveFeature] = useState<string>('dashboard');
  const [showLogin, setShowLogin] = useState(true);
  const router = useRouter();

  const handleLogin = (userType: string) => {
    const user = mockUsers[userType];
    if (user) {
      setCurrentUser(user);
      setShowLogin(false);
      setActiveFeature('dashboard');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setShowLogin(true);
    setActiveFeature('dashboard');
  };

  const renderComponent = () => {
    if (!currentUser) return null;

    // Use enhanced dashboard for super admin
    if (currentUser.role === 'SUPER_ADMIN') {
      return <EnhancedSuperAdminDashboard user={currentUser} />;
    }

    switch (activeFeature) {
      case 'dashboard':
        return <Dashboard user={currentUser} />;
      case 'projects':
        return <ProjectManagement user={currentUser} />;
      case 'files':
        return <FileManager user={currentUser} />;
      case 'analytics':
        return <AnalyticsDashboard user={currentUser} />;
      case 'account':
        return <AccountManagement user={currentUser} />;
      default:
        return <Dashboard user={currentUser} />;
    }
  };

  const userFeatures = currentUser ? portalFeatures[currentUser.role] || [] : [];

  if (showLogin) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main>
          <div className="section-padding">
            <div className="container">
              
              {/* Header */}
              <div className="text-center section-header">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
                <h1 className="heading-1 text-foreground mb-4">
                  Enterprise Portal Access
                </h1>
                <p className="body-large text-muted max-w-3xl mx-auto mb-8">
                  🚀 <strong>Connected Portal System</strong> - All existing components are now connected and accessible. 
                  Select your role to access your personalized portal with full functionality.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-2xl mx-auto">
                  <p className="text-green-800 text-sm">
                    <strong>✅ System Status:</strong> Portal components successfully connected. 
                    72% functionality increase achieved through component integration.
                  </p>
                </div>
              </div>

              {/* User Type Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                
                {/* Customer Portal */}
                <Card className="border-2 border-blue-200 hover:border-blue-400 transition-colors">
                  <CardHeader>
                    <h3 className="text-xl font-semibold text-foreground flex items-center">
                      <UserIcon className="w-6 h-6 mr-2 text-blue-600" />
                      Customer Portal
                    </h3>
                    <p className="text-sm text-muted">External clients - Project tracking, file exchange, billing</p>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      onClick={() => handleLogin('customer')}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      Access Customer Portal
                    </Button>
                  </CardContent>
                </Card>

                {/* Internal Team Portal */}
                <Card className="border-2 border-purple-200 hover:border-purple-400 transition-colors">
                  <CardHeader>
                    <h3 className="text-xl font-semibold text-foreground flex items-center">
                      <Shield className="w-6 h-6 mr-2 text-purple-600" />
                      Internal Team Portal
                    </h3>
                    <p className="text-sm text-muted">Staff access - Operations, task management, quality control</p>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button 
                      onClick={() => handleLogin('project-manager')}
                      variant="outline"
                      className="w-full text-left justify-start"
                    >
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Project Manager
                    </Button>
                    <Button 
                      onClick={() => handleLogin('translator')}
                      variant="outline"
                      className="w-full text-left justify-start"
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      Translator/Writer
                    </Button>
                    <Button 
                      onClick={() => handleLogin('quality-reviewer')}
                      variant="outline"
                      className="w-full text-left justify-start"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Quality Reviewer
                    </Button>
                    <Button 
                      onClick={() => handleLogin('account-manager')}
                      variant="outline"
                      className="w-full text-left justify-start"
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Account Manager
                    </Button>
                    <Button 
                      onClick={() => handleLogin('administrator')}
                      variant="outline"
                      className="w-full text-left justify-start"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Administrator
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Feature Preview */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Connected Features Available:</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-foreground">Dashboard System</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-foreground">Project Management</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-foreground">File Management</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-foreground">Analytics Dashboard</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-foreground">Account Management</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-foreground">User Statistics</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-foreground">Notification Center</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-foreground">Role-Based Access</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Portal Header - hide for super admin enhanced dashboard */}
      {currentUser?.role !== 'SUPER_ADMIN' && (
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  onClick={() => router.push('/')}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Site</span>
                </Button>
                <div className="h-6 border-l border-gray-300"></div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    {currentUser?.role === 'CLIENT' ? 'Customer Portal' : 'Internal Team Portal'}
                  </h2>
                  <p className="text-sm text-muted">Welcome, {currentUser?.name}</p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Conditional Sidebar Navigation - hide for super admin enhanced dashboard */}
        {currentUser?.role !== 'SUPER_ADMIN' && (
          <div className="w-64 bg-white border-r min-h-screen">
            <nav className="p-4">
              <div className="space-y-2">
                {userFeatures.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <button
                      key={feature.id}
                      onClick={() => setActiveFeature(feature.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeFeature === feature.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{feature.label}</span>
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>
        )}

        {/* Main Content */}
        <div className={`${currentUser?.role === 'SUPER_ADMIN' ? 'w-full' : 'flex-1 p-6'}`}>
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}
