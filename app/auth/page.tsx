'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { 
  User, 
  Lock, 
  Mail, 
  ArrowRight,
  Shield,
  Users,
  FileText,
  BarChart3,
  Settings,
  Globe,
  CheckCircle,
  TrendingUp
} from 'lucide-react';

const userRoles = [
  // Customer Roles
  {
    id: 'business',
    title: 'Business Professional',
    description: 'Customer Portal: Project requests, status tracking, file exchange',
    features: [
      'Submit Project Requests',
      'Track Project Progress', 
      'Upload/Download Files',
      'View Invoices & Billing',
      'Communicate with Team',
      'Project History'
    ],
    icon: Users,
    color: 'blue',
    type: 'customer'
  },
  {
    id: 'academic',
    title: 'Academic Researcher',
    description: 'Customer Portal: Academic writing, research support, citation tools',
    features: [
      'Academic Project Requests',
      'Citation Style Management',
      'Research Timeline Tracking',
      'Publication Support',
      'Institutional Billing',
      'Peer Review Coordination'
    ],
    icon: FileText,
    color: 'green',
    type: 'customer'
  },
  {
    id: 'enterprise',
    title: 'Enterprise Company',
    description: 'Customer Portal: Multi-project management, compliance, dedicated support',
    features: [
      'Multi-project Dashboard',
      'Compliance Documentation',
      'Dedicated Account Manager',
      'API Access for Integration',
      'Custom Reporting',
      'Priority Support'
    ],
    icon: Shield,
    color: 'orange',
    type: 'customer'
  },
  // Internal Team Roles
  {
    id: 'project-manager',
    title: 'Project Manager',
    description: 'Internal Team: Oversee all client projects, assign tasks, manage quality',
    features: [
      'All Client Projects Overview',
      'Task Assignment & Scheduling',
      'Resource Allocation Tools',
      'Quality Control Workflows', 
      'Client Communication Management',
      'Revenue & Cost Analytics'
    ],
    icon: BarChart3,
    color: 'purple',
    type: 'internal'
  },
  {
    id: 'translator',
    title: 'Translator/Writer',
    description: 'Internal Team: Complete assigned work, collaborate with team, track progress',
    features: [
      'Personal Work Queue',
      'Collaborative Editing Tools',
      'Translation Memory Access',
      'Time Tracking & Billing',
      'Peer Communication',
      'Quality Self-Check Tools'
    ],
    icon: Globe,
    color: 'indigo',
    type: 'internal'
  },
  {
    id: 'quality-reviewer',
    title: 'Quality Reviewer',
    description: 'Internal Team: Review documents before client delivery, ensure quality standards',
    features: [
      'Document Review Queue',
      'Side-by-side Comparison Tools',
      'Multi-stage Approval Workflow',
      'Quality Metrics Dashboard',
      'Reviewer Feedback System',
      'Client-ready Document Preparation'
    ],
    icon: CheckCircle,
    color: 'emerald',
    type: 'internal'
  },
  {
    id: 'account-manager',
    title: 'Account Manager',
    description: 'Internal Team: Manage client relationships, track revenue, identify opportunities',
    features: [
      'Client Relationship Dashboard',
      'Revenue & Profitability Analytics',
      'Project History & Patterns',
      'Contract & SLA Management',
      'Upselling Opportunity Tracking',
      'Client Satisfaction Metrics'
    ],
    icon: TrendingUp,
    color: 'cyan',
    type: 'internal'
  },
  {
    id: 'administrator',
    title: 'Administrator',
    description: 'Internal Team: System management, user roles, security, analytics',
    features: [
      'User Management (Internal & Customer)',
      'System Configuration & Settings',
      'Security & Access Control',
      'Platform Analytics & Reporting',
      'Backup & Data Management',
      'Audit Logs & Compliance'
    ],
    icon: Settings,
    color: 'slate',
    type: 'internal'
  }
];

export default function AuthPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [showDemo, setShowDemo] = useState(false);
  const [activeTab, setActiveTab] = useState<'customer' | 'internal'>('customer');

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <div className="section-padding">
          <div className="container">
            
            {!showDemo ? (
              <>
                {/* Header */}
                <div className="text-center section-header">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Lock className="w-8 h-8 text-primary" />
                  </div>
                  <h1 className="heading-1 text-foreground mb-4">
                    Access Your Professional Portal
                  </h1>
                  <p className="body-large text-muted max-w-3xl mx-auto mb-8">
                    🚧 <strong>Demo Access</strong> - The full portal features are available but authentication is not yet deployed. 
                    Select your role to preview the functionality available for your user type.
                  </p>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-2xl mx-auto">
                    <p className="text-safe-warning text-sm">
                      <strong>Functional Audit Discovery:</strong> Advanced portal components exist in the codebase 
                      but are not currently accessible to users. This represents significant hidden value.
                    </p>
                  </div>
                </div>

                {/* Role Selection Tabs */}
                <div className="flex justify-center mb-8">
                  <div className="bg-gray-100 rounded-lg p-1 flex">
                    <button
                      onClick={() => {
                        setActiveTab('customer');
                        setSelectedRole(null);
                      }}
                      className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                        activeTab === 'customer'
                          ? 'bg-white text-primary shadow-sm'
                          : 'text-safe-muted hover:text-safe'
                      }`}
                    >
                      Customer Portals
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('internal');
                        setSelectedRole(null);
                      }}
                      className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                        activeTab === 'internal'
                          ? 'bg-white text-primary shadow-sm'
                          : 'text-safe-muted hover:text-safe'
                      }`}
                    >
                      Internal Team
                    </button>
                  </div>
                </div>

                {/* Tab Description */}
                <div className="text-center mb-8">
                  {activeTab === 'customer' ? (
                    <div className="max-w-2xl mx-auto">
                      <h2 className="text-xl font-semibold text-foreground mb-2">Customer Portals</h2>
                      <p className="text-muted">
                        <strong>External Users</strong> - Limited access to their own projects, billing, and communication with assigned teams. 
                        Secure, project-specific functionality with no access to internal operations.
                      </p>
                    </div>
                  ) : (
                    <div className="max-w-2xl mx-auto">
                      <h2 className="text-xl font-semibold text-foreground mb-2">Internal Team Portal</h2>
                      <p className="text-muted">
                        <strong>Staff Members</strong> - Full operational access including task management, quality control, 
                        team collaboration, and system administration. Complete workflow management tools.
                      </p>
                    </div>
                  )}
                </div>

                {/* Role Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  {userRoles
                    .filter(role => role.type === activeTab)
                    .map((role) => (
                    <Card 
                      key={role.id} 
                      className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                        selectedRole === role.id ? 'ring-2 ring-primary shadow-lg' : ''
                      }`}
                      onClick={() => setSelectedRole(role.id)}
                    >
                      <CardHeader>
                        <div className="flex items-start space-x-4">
                          <div className={`w-12 h-12 bg-${role.color}-100 rounded-xl flex items-center justify-center`}>
                            <role.icon className={`w-6 h-6 text-${role.color}-600`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-foreground">{role.title}</h3>
                            <p className="text-sm text-muted mt-1">{role.description}</p>
                          </div>
                          {selectedRole === role.id && (
                            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <h4 className="font-medium text-foreground">Available Features:</h4>
                          <ul className="space-y-1">
                            {role.features.map((feature, idx) => (
                              <li key={idx} className="flex items-center text-sm text-muted">
                                <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Tab Description */}
                <div className="text-center mb-8">
                  {activeTab === 'customer' ? (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
                      <p className="text-safe-accent text-sm">
                        <strong>Customer Portals:</strong> External-facing interfaces for clients to manage their projects, 
                        view progress, and communicate with the team. Customers only see their own projects and data.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 max-w-2xl mx-auto">
                      <p className="text-purple-800 text-sm">
                        <strong>Internal Team Tools:</strong> Private interfaces for Prism Writing staff to manage workflows, 
                        review documents, coordinate projects, and analyze performance across all client accounts.
                      </p>
                    </div>
                  )}
                </div>

                {/* Demo Access */}
                {selectedRole && (
                  <div className="text-center">
                    <Button 
                      size="lg" 
                      onClick={() => setShowDemo(true)}
                      className="hover:shadow-lg transition-all duration-300"
                    >
                      <Globe className="w-5 h-5 mr-2" />
                      Preview {userRoles.find(r => r.id === selectedRole)?.title} Portal
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                )}
              </>
            ) : (
              /* Demo Portal Preview */
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="heading-2 text-foreground">
                      {userRoles.find(r => r.id === selectedRole)?.title} Portal
                    </h1>
                    <p className="text-muted">Demo preview of available functionality</p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowDemo(false)}
                  >
                    Back to Role Selection
                  </Button>
                </div>

                {/* Portal Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  
                  {/* Project Dashboard */}
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <BarChart3 className="w-6 h-6 text-primary" />
                        <h3 className="font-semibold">Project Dashboard</h3>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Active Projects</span>
                          <span className="font-medium">12</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                        <p className="text-xs text-muted">75% completion rate</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* File Management */}
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <FileText className="w-6 h-6 text-primary" />
                        <h3 className="font-semibold">File Management</h3>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          <span>Documents: 156</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                          <span>Translations: 89</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                          <span>In Progress: 23</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Team Collaboration */}
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <Users className="w-6 h-6 text-primary" />
                        <h3 className="font-semibold">Team Collaboration</h3>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <User className="w-4 h-4 mr-2 text-safe-success" />
                          <span>5 Active Members</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Mail className="w-4 h-4 mr-2 text-safe-accent" />
                          <span>12 Notifications</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Settings className="w-4 h-4 mr-2 text-safe-muted" />
                          <span>Role Management</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Feature Availability Notice */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-semibold text-safe-accent mb-2">🔧 Implementation Status</h3>
                  <p className="text-safe-accent text-sm mb-4">
                    These features are fully developed and available in the codebase at 
                    <code className="bg-blue-100 px-2 py-1 rounded mx-1">/src/components/portal/</code>
                    but require authentication deployment to be accessible.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong className="text-safe-accent">Ready Components:</strong>
                      <ul className="mt-1 space-y-1 text-safe-accent">
                        <li>• Dashboard.tsx</li>
                        <li>• ProjectManagement.tsx</li>
                        <li>• FileManager.tsx</li>
                        <li>• UserStats.tsx</li>
                      </ul>
                    </div>
                    <div>
                      <strong className="text-safe-accent">Implementation Needed:</strong>
                      <ul className="mt-1 space-y-1 text-safe-accent">
                        <li>• User authentication routes</li>
                        <li>• Portal page deployment</li>
                        <li>• Role-based access control</li>
                        <li>• Database integration</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
