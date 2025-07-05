'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  FileText, 
  Users, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle,
  TrendingUp,
  MessageSquare,
  Target,
  Workflow,
  Bot
} from 'lucide-react';
import ComprehensiveIntakeForm from '../client/ComprehensiveIntakeForm';
import UltimateAutomationDashboard from '../admin/UltimateAutomationDashboard-new';
import AITeamChatDashboard from '../admin/AITeamChatDashboard';
import type { ClientComprehensiveData, ValidationResult, ClientDataCollection } from '../../lib/clientDataCollection';
import ClientDataCollectionSystem from '../../lib/clientDataCollection';

interface EnhancedSuperAdminDashboardProps {
  user: {
    id: string;
    name: string;
    role: string;
    email: string;
  };
}

export default function EnhancedSuperAdminDashboard({ user }: EnhancedSuperAdminDashboardProps) {
  const [activeSection, setActiveSection] = useState('overview');
  const [dataCollections, setDataCollections] = useState<ClientDataCollection[]>([]);
  const [showIntakeForm, setShowIntakeForm] = useState(false);
  const [systemMetrics, setSystemMetrics] = useState({
    totalClients: 45,
    activeProjects: 23,
    completedProjects: 156,
    dataCompleteness: 87,
    documentAccuracy: 94,
    automationSuccess: 96,
    clientSatisfaction: 4.8
  });

  const dataCollectionSystem = new ClientDataCollectionSystem();

  useEffect(() => {
    // Load existing data collections
    loadDataCollections();
  }, []);

  const loadDataCollections = async () => {
    // In a real implementation, this would fetch from an API
    const mockCollections: ClientDataCollection[] = [
      {
        id: 'cdc_1',
        clientId: 'client_1',
        collectionType: 'onboarding',
        status: 'completed',
        completionPercentage: 95,
        accuracy: 96,
        createdAt: new Date('2025-07-01'),
        lastUpdated: new Date('2025-07-03'),
        data: {} as ClientComprehensiveData,
        validationResults: [],
        automationTriggers: []
      },
      {
        id: 'cdc_2',
        clientId: 'client_2',
        collectionType: 'project_requirements',
        status: 'in_progress',
        completionPercentage: 72,
        accuracy: 88,
        createdAt: new Date('2025-07-02'),
        lastUpdated: new Date('2025-07-05'),
        data: {} as ClientComprehensiveData,
        validationResults: [],
        automationTriggers: []
      }
    ];
    
    setDataCollections(mockCollections);
  };

  const handleIntakeSubmission = async (data: ClientComprehensiveData) => {
    try {
      // Process the comprehensive data
      const collection = await dataCollectionSystem.initializeDataCollection('new_client', 'comprehensive');
      collection.data = data;
      
      // Validate the data
      const validationResults = await dataCollectionSystem.validateDataCompleteness(collection);
      
      // Update state
      setDataCollections(prev => [...prev, collection]);
      setShowIntakeForm(false);
      
      // Trigger automation if data quality is sufficient
      if (collection.completionPercentage >= 95 && collection.accuracy >= 95) {
        await triggerDocumentGeneration(collection);
      }
      
      alert('Client data collection completed successfully!');
    } catch (error) {
      console.error('Error processing intake:', error);
      alert('Error processing client data. Please review and try again.');
    }
  };

  const triggerDocumentGeneration = async (collection: ClientDataCollection) => {
    try {
      const documentation = await dataCollectionSystem.generateDocumentationWithRationale(collection);
      console.log('Generated documentation:', documentation);
      
      // Update metrics
      setSystemMetrics(prev => ({
        ...prev,
        documentAccuracy: Math.round((prev.documentAccuracy + documentation.metadata.dataAccuracy) / 2)
      }));
      
    } catch (error) {
      console.error('Document generation error:', error);
    }
  };

  const handleValidationUpdate = (results: ValidationResult[]) => {
    console.log('Validation results updated:', results);
  };

  const renderOverviewSection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Key Metrics */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Clients</p>
              <p className="text-2xl font-bold text-gray-900">{systemMetrics.totalClients}</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
          <p className="text-xs text-gray-500 mt-1">+12% from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Projects</p>
              <p className="text-2xl font-bold text-gray-900">{systemMetrics.activeProjects}</p>
            </div>
            <FileText className="h-8 w-8 text-green-500" />
          </div>
          <p className="text-xs text-gray-500 mt-1">+8% from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Data Completeness</p>
              <p className="text-2xl font-bold text-gray-900">{systemMetrics.dataCompleteness}%</p>
            </div>
            <BarChart3 className="h-8 w-8 text-yellow-500" />
          </div>
          <p className="text-xs text-gray-500 mt-1">Target: 95%</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Document Accuracy</p>
              <p className="text-2xl font-bold text-gray-900">{systemMetrics.documentAccuracy}%</p>
            </div>
            <CheckCircle2 className="h-8 w-8 text-purple-500" />
          </div>
          <p className="text-xs text-gray-500 mt-1">Target: 95%</p>
        </CardContent>
      </Card>

      {/* Data Collection Status */}
      <Card className="md:col-span-2">
        <CardHeader>
          <h3 className="text-lg font-semibold flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Recent Data Collections
          </h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dataCollections.slice(0, 3).map((collection) => (
              <div key={collection.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">Client {collection.clientId}</p>
                  <p className="text-sm text-gray-600">{collection.collectionType}</p>
                  <div className="flex items-center mt-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${collection.completionPercentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">{collection.completionPercentage}%</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    collection.status === 'completed' ? 'bg-green-100 text-green-800' :
                    collection.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {collection.status.replace('_', ' ')}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Accuracy: {collection.accuracy}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Automation Status */}
      <Card className="md:col-span-2">
        <CardHeader>
          <h3 className="text-lg font-semibold flex items-center">
            <Workflow className="w-5 h-5 mr-2" />
            Automation Performance
          </h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{systemMetrics.automationSuccess}%</p>
              <p className="text-sm text-green-700">Success Rate</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{systemMetrics.clientSatisfaction}</p>
              <p className="text-sm text-blue-700">Client Rating</p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Email Automation</span>
              <span className="text-sm font-medium">98%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Data Collection</span>
              <span className="text-sm font-medium">94%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Document Generation</span>
              <span className="text-sm font-medium">96%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDataCollectionSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Client Data Collection Management</h2>
        <Button onClick={() => setShowIntakeForm(true)} className="bg-blue-500 hover:bg-blue-600">
          New Client Intake
        </Button>
      </div>

      {showIntakeForm ? (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Comprehensive Client Intake</h3>
            <Button 
              onClick={() => setShowIntakeForm(false)} 
              variant="outline"
              size="sm"
            >
              Cancel
            </Button>
          </div>
          <ComprehensiveIntakeForm
            onSubmit={handleIntakeSubmission}
            onValidationUpdate={handleValidationUpdate}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {dataCollections.map((collection) => (
            <Card key={collection.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">Client {collection.clientId}</h3>
                    <p className="text-sm text-gray-600">{collection.collectionType}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    collection.status === 'completed' ? 'bg-green-100 text-green-800' :
                    collection.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {collection.status.replace('_', ' ')}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Completion</span>
                      <span>{collection.completionPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${collection.completionPercentage}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Accuracy</span>
                      <span>{collection.accuracy}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          collection.accuracy >= 95 ? 'bg-green-500' :
                          collection.accuracy >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${collection.accuracy}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xs text-gray-500">
                      Updated {collection.lastUpdated.toLocaleDateString()}
                    </span>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        Review
                      </Button>
                      {collection.completionPercentage >= 95 && collection.accuracy >= 95 && (
                        <Button size="sm" className="bg-green-500 hover:bg-green-600">
                          Generate Docs
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'data_collection', label: 'Data Collection', icon: Target },
    { id: 'automation', label: 'Automation', icon: Workflow },
    { id: 'ultimate_automation', label: 'Ultimate Automation', icon: Bot },
    { id: 'ai_team_chat', label: 'AI Team Chat', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg h-screen sticky top-0">
          <div className="p-6">
            <h1 className="text-xl font-bold text-gray-900">Super Admin</h1>
            <p className="text-sm text-gray-600">{user.name}</p>
          </div>
          
          <nav className="mt-6">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center px-6 py-3 text-left transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {navigationItems.find(item => item.id === activeSection)?.label || 'Dashboard'}
            </h1>
            <p className="text-gray-600 mt-2">
              Comprehensive client management and automation control center
            </p>
          </div>

          {activeSection === 'overview' && renderOverviewSection()}
          {activeSection === 'data_collection' && renderDataCollectionSection()}
          {activeSection === 'automation' && (
            <div className="text-center py-12">
              <Workflow className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Automation Center</h3>
              <p className="text-gray-600">Advanced automation controls coming soon...</p>
            </div>
          )}
          {activeSection === 'ultimate_automation' && (
            <UltimateAutomationDashboard />
          )}
          {activeSection === 'ai_team_chat' && (
            <AITeamChatDashboard />
          )}
          {(activeSection === 'analytics' || activeSection === 'clients' || activeSection === 'messages') && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                {React.createElement(navigationItems.find(item => item.id === activeSection)?.icon || BarChart3, {
                  className: "w-8 h-8 text-gray-400"
                })}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {navigationItems.find(item => item.id === activeSection)?.label}
              </h3>
              <p className="text-gray-600">This section is under development...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
