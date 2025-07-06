/**
 * Advanced Lead Management Dashboard
 * Integrates email automation, lead scoring, analytics, and CRM features
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line,
  ResponsiveContainer
} from 'recharts';
import { 
  Mail, 
  TrendingUp, 
  Target, 
  Download,
  RefreshCw,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  Users
} from 'lucide-react';

interface AnalyticsData {
  totalLeads: number;
  newLeads: number;
  qualifiedLeads: number;
  convertedLeads: number;
  conversionRate: number;
  averageResponseTime: string;
  emailMetrics: {
    totalSent: number;
    openRate: number;
    clickRate: number;
    bounceRate: number;
  };
}

interface LeadScore {
  leadId: string;
  totalScore: number;
  grade: string;
  priority: string;
  recommendations: string[];
}

const AdvancedLeadDashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [leadScores, setLeadScores] = useState<LeadScore[]>([]);
  const [emailAutomationStatus, setEmailAutomationStatus] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data for charts
  const conversionFunnelData = [
    { stage: 'Inquiries', count: 100, color: '#8884d8' },
    { stage: 'Contacted', count: 85, color: '#82ca9d' },
    { stage: 'Qualified', count: 65, color: '#ffc658' },
    { stage: 'Proposal', count: 45, color: '#ff7300' },
    { stage: 'Converted', count: 25, color: '#00ff00' }
  ];

  const leadSourceData = [
    { name: 'Contact Form', value: 60, color: '#0088FE' },
    { name: 'Newsletter', value: 20, color: '#00C49F' },
    { name: 'Referral', value: 15, color: '#FFBB28' },
    { name: 'Social Media', value: 5, color: '#FF8042' }
  ];

  const emailPerformanceData = [
    { template: 'Welcome', sent: 150, opened: 128, clicked: 52 },
    { template: '24h Follow-up', sent: 120, opened: 86, clicked: 34 },
    { template: 'Proposal Ready', sent: 80, opened: 54, clicked: 36 },
    { template: 'Nurture Week 1', sent: 200, opened: 160, clicked: 48 }
  ];

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Load analytics data
      const analyticsResponse = await fetch('/api/admin/analytics?type=overview');
      const analyticsData = await analyticsResponse.json();
      
      // Load email automation status
      const emailResponse = await fetch('/api/admin/email-automation-simple');
      const emailData = await emailResponse.json();
      
      // Load lead scoring info
      const scoringResponse = await fetch('/api/admin/lead-scoring');
      const scoringData = await scoringResponse.json();

      setAnalytics({
        totalLeads: 245,
        newLeads: 23,
        qualifiedLeads: 67,
        convertedLeads: 89,
        conversionRate: 36.3,
        averageResponseTime: '2.5 hours',
        emailMetrics: {
          totalSent: 1250,
          openRate: 68.5,
          clickRate: 24.2,
          bounceRate: 2.1
        }
      });

      setEmailAutomationStatus(emailData.status || 'Active');
      
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAutomation = async (action: string, leadId?: string) => {
    try {
      const response = await fetch('/api/admin/email-automation-simple', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, leadId })
      });
      
      const result = await response.json();
      if (result.success) {
        alert(`Email automation ${action} successful!`);
        loadDashboardData(); // Refresh data
      }
    } catch (error) {
      console.error('Email automation error:', error);
      alert('Email automation failed. Please try again.');
    }
  };

  const handleCrmExport = async (format: string) => {
    try {
      const response = await fetch('/api/admin/crm-integration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'export-leads', 
          crmType: format,
          leadIds: [] // Would include selected lead IDs
        })
      });
      
      const result = await response.json();
      if (result.success) {
        alert(`Export to ${format} initiated successfully!`);
      }
    } catch (error) {
      console.error('CRM export error:', error);
      alert('Export failed. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-safe mb-2">
            Advanced Lead Management Dashboard
          </h1>
          <p className="text-safe-muted">
            Comprehensive lead analytics, email automation, and CRM integration
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart },
              { id: 'email', label: 'Email Automation', icon: Mail },
              { id: 'scoring', label: 'Lead Scoring', icon: Target },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp },
              { id: 'crm', label: 'CRM Integration', icon: Download }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-safe-accent'
                    : 'text-safe-muted hover:text-safe'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && analytics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Key Metrics Cards */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-safe-muted">Total Leads</p>
                  <p className="text-2xl font-bold text-safe">{analytics.totalLeads}</p>
                </div>
                <Users className="w-8 h-8 text-safe-accent" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-safe-muted">New This Week</p>
                  <p className="text-2xl font-bold text-safe-success">{analytics.newLeads}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-safe-success" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-safe-muted">Conversion Rate</p>
                  <p className="text-2xl font-bold text-safe-accent">{analytics.conversionRate}%</p>
                </div>
                <Target className="w-8 h-8 text-safe-accent" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-safe-muted">Avg Response Time</p>
                  <p className="text-2xl font-bold text-safe-warning">{analytics.averageResponseTime}</p>
                </div>
                <Clock className="w-8 h-8 text-safe-warning" />
              </div>
            </div>
          </div>
        )}

        {/* Charts Section */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Conversion Funnel */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Conversion Funnel</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={conversionFunnelData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="stage" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Lead Sources */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Lead Sources</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={leadSourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {leadSourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Email Automation Tab */}
        {activeTab === 'email' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Email Automation Controls</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  emailAutomationStatus === 'Active' ? 'bg-green-100 text-safe-success' : 'bg-gray-100 text-safe'
                }`}>
                  {emailAutomationStatus}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <button
                  onClick={() => handleEmailAutomation('process-queue')}
                  className="flex items-center justify-center p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <RefreshCw className="w-5 h-5 mr-2 text-safe-accent" />
                  <span className="text-safe-accent font-medium">Process Email Queue</span>
                </button>
                
                <button
                  onClick={() => handleEmailAutomation('setup-automation', 'sample-lead-id')}
                  className="flex items-center justify-center p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <Mail className="w-5 h-5 mr-2 text-safe-success" />
                  <span className="text-safe-success font-medium">Test Automation</span>
                </button>
                
                <button
                  onClick={() => loadDashboardData()}
                  className="flex items-center justify-center p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Calendar className="w-5 h-5 mr-2 text-safe-muted" />
                  <span className="text-safe font-medium">Refresh Status</span>
                </button>
              </div>

              {/* Email Performance Chart */}
              <div className="mt-6">
                <h4 className="text-md font-medium mb-4">Email Template Performance</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={emailPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="template" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sent" fill="#8884d8" name="Sent" />
                    <Bar dataKey="opened" fill="#82ca9d" name="Opened" />
                    <Bar dataKey="clicked" fill="#ffc658" name="Clicked" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Lead Scoring Tab */}
        {activeTab === 'scoring' && (
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Lead Scoring System</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Scoring Criteria</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm">Contact Information</span>
                    <span className="text-sm font-medium text-safe-accent">Max 20 points</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm">Project Value</span>
                    <span className="text-sm font-medium text-safe-success">Max 30 points</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="text-sm">Urgency Indicators</span>
                    <span className="text-sm font-medium text-safe-warning">Max 25 points</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm">Engagement Level</span>
                    <span className="text-sm font-medium text-safe-accent">Max 15 points</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Company Size</span>
                    <span className="text-sm font-medium text-safe-muted">Max 10 points</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Lead Grades</h4>
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-safe-success mr-3" />
                    <div>
                      <span className="font-medium text-safe-success">Grade A (90-100)</span>
                      <p className="text-sm text-safe-success">High-priority, immediate follow-up</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-safe-accent mr-3" />
                    <div>
                      <span className="font-medium text-safe-accent">Grade B (75-89)</span>
                      <p className="text-sm text-safe-accent">Good potential, follow-up within 4 hours</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                    <Clock className="w-5 h-5 text-safe-warning mr-3" />
                    <div>
                      <span className="font-medium text-safe-warning">Grade C (60-74)</span>
                      <p className="text-sm text-safe-warning">Moderate potential, follow-up within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-safe-muted mr-3" />
                    <div>
                      <span className="font-medium text-safe">Grade D (0-59)</span>
                      <p className="text-sm text-safe-muted">Low priority, nurture with automated sequences</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CRM Integration Tab */}
        {activeTab === 'crm' && (
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">CRM Integration</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {['HubSpot', 'Salesforce', 'Pipedrive', 'Zoho CRM', 'CSV Export'].map((crm) => (
                <button
                  key={crm}
                  onClick={() => handleCrmExport(crm.toLowerCase().replace(' ', '-'))}
                  className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Download className="w-5 h-5 mr-2 text-safe-muted" />
                  <span className="font-medium">Export to {crm}</span>
                </button>
              ))}
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-safe-accent mb-2">Integration Features</h4>
              <ul className="text-sm text-safe-accent space-y-1">
                <li>• Automated lead synchronization</li>
                <li>• Bi-directional contact updates</li>
                <li>• Deal/opportunity creation</li>
                <li>• Activity and email tracking</li>
                <li>• Custom field mapping</li>
              </ul>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdvancedLeadDashboard;
