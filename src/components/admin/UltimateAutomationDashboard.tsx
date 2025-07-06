'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  Brain, 
  Zap, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  DollarSign,
  Settings,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

interface AutomationMetrics {
  totalAutomations: number;
  activeAutomations: number;
  automationUptime: number;
  decisionsPerDay: number;
  errorRate: number;
  costSavings: number;
  revenueGenerated: number;
  clientSatisfaction: number;
}

interface SystemComponent {
  name: string;
  status: 'operational' | 'degraded' | 'failed' | 'maintenance';
  uptime: number;
  lastCheck: Date;
  metrics: Record<string, number>;
}

interface AutonomousDecision {
  id: string;
  type: string;
  description: string;
  impact: string;
  confidence: number;
  status: 'pending' | 'approved' | 'implemented' | 'rejected';
  timestamp: Date;
  autoApproved: boolean;
}

export default function UltimateAutomationDashboard() {
  const [isAutomationActive, setIsAutomationActive] = useState(true);
  const [automationLevel, setAutomationLevel] = useState(4);
  const [activeTab, setActiveTab] = useState('overview');
  
  const [metrics] = useState<AutomationMetrics>({
    totalAutomations: 156,
    activeAutomations: 142,
    automationUptime: 99.8,
    decisionsPerDay: 47,
    errorRate: 0.02,
    costSavings: 125000,
    revenueGenerated: 890000,
    clientSatisfaction: 98.5
  });

  const [systemComponents] = useState<SystemComponent[]>([
    {
      name: 'API Resilience System (Plan A-Z)',
      status: 'operational',
      uptime: 99.9,
      lastCheck: new Date(),
      metrics: { 'failovers': 3, 'responseTime': 145 }
    },
    {
      name: 'Intelligent Review Processor',
      status: 'operational',
      uptime: 99.7,
      lastCheck: new Date(),
      metrics: { 'reviewsProcessed': 234, 'implementationRate': 67 }
    },
    {
      name: 'Autonomous Business Manager',
      status: 'operational',
      uptime: 99.95,
      lastCheck: new Date(),
      metrics: { 'decisionsToday': 12, 'autoApprovalRate': 85 }
    },
    {
      name: 'Turnkey Automation System',
      status: 'operational',
      uptime: 100,
      lastCheck: new Date(),
      metrics: { 'automationsRunning': 142, 'efficiency': 94 }
    }
  ]);

  const [recentDecisions] = useState<AutonomousDecision[]>([
    {
      id: '1',
      type: 'pricing',
      description: 'Adjusted premium service pricing by 8% based on market analysis',
      impact: '+$12,000 projected monthly revenue',
      confidence: 92,
      status: 'implemented',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      autoApproved: true
    },
    {
      id: '2',
      type: 'resource_allocation',
      description: 'Reallocated writing team to high-priority client projects',
      impact: 'Improved delivery time by 15%',
      confidence: 88,
      status: 'implemented',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      autoApproved: true
    },
    {
      id: '3',
      type: 'client_priority',
      description: 'Elevated Enterprise Client A to highest priority tier',
      impact: 'Potential $50K contract renewal',
      confidence: 95,
      status: 'pending',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      autoApproved: false
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'text-safe-success bg-green-100';
      case 'degraded':
        return 'text-safe-warning bg-yellow-100';
      case 'failed':
        return 'text-safe-error bg-red-100';
      case 'maintenance':
        return 'text-safe-accent bg-blue-100';
      default:
        return 'text-safe-muted bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-4 w-4 text-safe-success" />;
      case 'degraded':
        return <AlertTriangle className="h-4 w-4 text-safe-warning" />;
      case 'failed':
        return <AlertTriangle className="h-4 w-4 text-safe-error" />;
      case 'maintenance':
        return <Settings className="h-4 w-4 text-safe-accent" />;
      default:
        return <Activity className="h-4 w-4 text-safe-muted" />;
    }
  };

  const toggleAutomation = () => {
    setIsAutomationActive(!isAutomationActive);
  };

  const emergencyStop = () => {
    if (confirm('Are you sure you want to initiate emergency stop? This will halt all autonomous operations.')) {
      setIsAutomationActive(false);
      alert('Emergency stop initiated. All autonomous operations have been halted.');
    }
  };

  const ProgressBar = ({ value, className = "" }: { value: number; className?: string }) => (
    <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
      <div 
        className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      ></div>
    </div>
  );

  const Badge = ({ children, variant = "default", className = "" }: { 
    children: React.ReactNode; 
    variant?: string; 
    className?: string 
  }) => {
    const baseClass = "px-2 py-1 text-xs rounded-full font-medium";
    const variantClass = variant === "secondary" ? "bg-gray-100 text-safe" : "bg-blue-100 text-safe-accent";
    return <span className={`${baseClass} ${variantClass} ${className}`}>{children}</span>;
  };

  const TabButton = ({ value, children, active }: { value: string; children: React.ReactNode; active: boolean }) => (
    <button
      onClick={() => setActiveTab(value)}
      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
        active 
          ? 'bg-blue-600 text-white' 
          : 'text-safe-muted hover:text-safe-accent hover:bg-blue-50'
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-safe">Ultimate Automation Dashboard</h1>
          <p className="text-safe-muted">Enterprise-grade autonomous business management</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={toggleAutomation}
            variant={isAutomationActive ? "destructive" : "default"}
            className="flex items-center gap-2"
          >
            {isAutomationActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isAutomationActive ? 'Pause Automation' : 'Start Automation'}
          </Button>
          <Button
            onClick={emergencyStop}
            variant="destructive"
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700"
          >
            <AlertTriangle className="h-4 w-4" />
            Emergency Stop
          </Button>
        </div>
      </div>

      {/* Status Alert */}
      <Alert className={`border ${isAutomationActive ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
        <Activity className={`h-4 w-4 ${isAutomationActive ? 'text-safe-success' : 'text-safe-error'}`} />
        <AlertDescription className={isAutomationActive ? 'text-safe-success' : 'text-safe-error'}>
          {isAutomationActive 
            ? `Autonomous systems are operational. Running at Level ${automationLevel} automation with ${metrics.activeAutomations} active processes.`
            : 'Autonomous systems are paused. Click "Start Automation" to resume operations.'
          }
        </AlertDescription>
      </Alert>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost Savings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-safe-success">
              ${metrics.costSavings.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">+22% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Generated</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-safe-accent">
              ${metrics.revenueGenerated.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">+15% from automated decisions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-safe-success">
              {metrics.automationUptime}%
            </div>
            <p className="text-xs text-muted-foreground">99.9% target achieved</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Decisions/Day</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-safe-accent">
              {metrics.decisionsPerDay}
            </div>
            <p className="text-xs text-muted-foreground">85% auto-approved</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="systems">Systems</TabsTrigger>
          <TabsTrigger value="decisions">Decisions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Automation Level Control */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Automation Level
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Current Level: {automationLevel}</span>
                  <Badge variant="secondary">Enterprise Mode</Badge>
                </div>
                <Progress value={automationLevel * 20} className="w-full" />
                <div className="grid grid-cols-5 gap-2 text-xs text-center">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      onClick={() => setAutomationLevel(level)}
                      className={`p-2 rounded ${
                        automationLevel >= level 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-200 text-safe-muted'
                      }`}
                    >
                      L{level}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-safe-muted">
                  Level 5: Full autonomy with minimal human oversight
                </p>
              </CardContent>
            </Card>

            {/* Active Automations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Active Automations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Client Onboarding</span>
                    <Badge variant="secondary">Running</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Project Management</span>
                    <Badge variant="secondary">Running</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Financial Optimization</span>
                    <Badge variant="secondary">Running</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Marketing Campaigns</span>
                    <Badge variant="secondary">Running</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Quality Assurance</span>
                    <Badge variant="secondary">Running</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="systems" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {systemComponents.map((component, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      {getStatusIcon(component.status)}
                      {component.name}
                    </span>
                    <Badge 
                      className={`${getStatusColor(component.status)} text-white`}
                    >
                      {component.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-safe-muted">Uptime:</span>
                      <span className="font-medium">{component.uptime}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-safe-muted">Last Check:</span>
                      <span className="text-sm">{component.lastCheck.toLocaleTimeString()}</span>
                    </div>
                    {Object.entries(component.metrics).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-sm text-safe-muted capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="decisions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Recent Autonomous Decisions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDecisions.map((decision) => (
                  <div 
                    key={decision.id}
                    className="border rounded-lg p-4 space-y-3"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium">{decision.description}</h4>
                        <p className="text-sm text-safe-muted mt-1">{decision.impact}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Badge 
                          variant={decision.status === 'implemented' ? 'secondary' : 'outline'}
                        >
                          {decision.status}
                        </Badge>
                        {decision.autoApproved && (
                          <Badge variant="secondary" className="bg-blue-100 text-safe-accent">
                            Auto-approved
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm text-safe-muted">
                      <span>Confidence: {decision.confidence}%</span>
                      <span>{decision.timestamp.toLocaleString()}</span>
                    </div>
                    {decision.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Approve
                        </Button>
                        <Button size="sm" variant="outline">
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Automation Efficiency</span>
                      <span>94%</span>
                    </div>
                    <Progress value={94} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Cost Reduction</span>
                      <span>78%</span>
                    </div>
                    <Progress value={78} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Client Satisfaction</span>
                      <span>98.5%</span>
                    </div>
                    <Progress value={98.5} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>ROI Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-green-50 rounded">
                      <div className="text-2xl font-bold text-safe-success">$125K</div>
                      <div className="text-xs text-safe-success">Costs Saved</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded">
                      <div className="text-2xl font-bold text-safe-accent">$890K</div>
                      <div className="text-xs text-safe-accent">Revenue Added</div>
                    </div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded">
                    <div className="text-3xl font-bold text-safe-accent">712%</div>
                    <div className="text-sm text-safe-accent">Total ROI</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Automation Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Emergency Controls</h4>
                <div className="space-y-2">
                  <Button 
                    variant="destructive" 
                    onClick={emergencyStop}
                    className="w-full"
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Initiate Emergency Stop
                  </Button>
                  <Button variant="outline" className="w-full">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset All Systems
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Approval Thresholds</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Auto-approve decisions with confidence ≥</span>
                    <select className="px-3 py-1 border rounded">
                      <option value="85">85%</option>
                      <option value="90">90%</option>
                      <option value="95">95%</option>
                    </select>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Maximum daily spend limit</span>
                    <select className="px-3 py-1 border rounded">
                      <option value="1000">$1,000</option>
                      <option value="5000">$5,000</option>
                      <option value="10000">$10,000</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Notification Settings</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked />
                    <span className="text-sm">Email alerts for critical decisions</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked />
                    <span className="text-sm">Daily performance reports</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span className="text-sm">SMS alerts for system failures</span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
