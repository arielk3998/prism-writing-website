/**
 * AI Content Generation Dashboard
 * Interactive interface for automated content creation
 */

'use client';

import React, { useState, useEffect } from 'react';

interface ContentGenerationRequest {
  type: 'email_template' | 'proposal' | 'follow_up' | 'blog_post' | 'marketing_copy';
  clientData: {
    name: string;
    company: string;
    industry: string;
    projectType: string;
    budgetRange: string;
    companySize: string;
    urgency: string;
  };
  context: string;
  tone: 'professional' | 'friendly' | 'technical' | 'persuasive' | 'consultative';
  length: 'short' | 'medium' | 'long';
}

interface GeneratedContent {
  content: string;
  subject?: string;
  callToAction: string;
  personalizationElements: string[];
  recommendedFollowUp?: string;
  estimatedEngagementScore: number;
}

interface PerformanceData {
  averageEngagementScore: number;
  openRate?: number;
  viewRate?: number;
  responseRate?: number;
  clickRate?: number;
  acceptanceRate?: number;
  conversionRate?: number;
}

interface PerformanceMetrics {
  totalContentGenerated: number;
  averageEngagementScore: number;
  contentTypes: Record<string, number>;
  performanceByType: Record<string, PerformanceData>;
}

type TabType = 'generate' | 'proposals' | 'sequences' | 'analytics';

export default function AIContentGenerationDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('generate');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Form data for content generation
  const [contentRequest, setContentRequest] = useState<ContentGenerationRequest>({
    type: 'email_template',
    clientData: {
      name: '',
      company: '',
      industry: 'Technology',
      projectType: 'Technical Documentation',
      budgetRange: '$5,000 - $15,000',
      companySize: 'Medium',
      urgency: 'Standard'
    },
    context: '',
    tone: 'professional',
    length: 'medium'
  });

  // Load performance metrics on component mount
  useEffect(() => {
    loadPerformanceMetrics();
  }, []);

  const loadPerformanceMetrics = async () => {
    try {
      const response = await fetch('/api/admin/ai-content-generation?action=performance_metrics');
      const data = await response.json();
      
      if (data.success) {
        setPerformanceMetrics(data.metrics);
      }
    } catch (error) {
      console.error('Error loading performance metrics:', error);
    }
  };

  const generateContent = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/ai-content-generation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'generate_content',
          ...contentRequest
        })
      });

      const data = await response.json();

      if (data.success) {
        setGeneratedContent(data.content);
      } else {
        setError(data.error || 'Failed to generate content');
      }
    } catch (error) {
      setError('Network error occurred while generating content');
      console.error('Error generating content:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateProposal = async (leadId: string) => {
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/ai-content-generation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'generate_proposal',
          leadId
        })
      });

      const data = await response.json();

      if (data.success) {
        // Handle proposal data
        console.log('Proposal generated:', data.proposal);
      } else {
        setError(data.error || 'Failed to generate proposal');
      }
    } catch (error) {
      setError('Network error occurred while generating proposal');
      console.error('Error generating proposal:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Could add a toast notification here
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const renderGenerateTab = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Content Generation Form */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold text-safe mb-4">Content Generation</h3>
          
          {/* Content Type */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-safe mb-2">Content Type</label>
            <select
              value={contentRequest.type}
              onChange={(e) => setContentRequest({
                ...contentRequest,
                type: e.target.value as ContentGenerationRequest['type']
              })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="email_template">Email Template</option>
              <option value="proposal">Proposal</option>
              <option value="follow_up">Follow-up Email</option>
              <option value="blog_post">Blog Post</option>
              <option value="marketing_copy">Marketing Copy</option>
            </select>
          </div>

          {/* Client Information */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-safe mb-1">Client Name</label>
              <input
                type="text"
                value={contentRequest.clientData.name}
                onChange={(e) => setContentRequest({
                  ...contentRequest,
                  clientData: { ...contentRequest.clientData, name: e.target.value }
                })}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John Smith"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-safe mb-1">Company</label>
              <input
                type="text"
                value={contentRequest.clientData.company}
                onChange={(e) => setContentRequest({
                  ...contentRequest,
                  clientData: { ...contentRequest.clientData, company: e.target.value }
                })}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tech Corp Inc."
              />
            </div>
          </div>

          {/* Industry and Project Type */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-safe mb-1">Industry</label>
              <select
                value={contentRequest.clientData.industry}
                onChange={(e) => setContentRequest({
                  ...contentRequest,
                  clientData: { ...contentRequest.clientData, industry: e.target.value }
                })}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Finance">Finance</option>
                <option value="Education">Education</option>
                <option value="Retail">Retail</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-safe mb-1">Project Type</label>
              <select
                value={contentRequest.clientData.projectType}
                onChange={(e) => setContentRequest({
                  ...contentRequest,
                  clientData: { ...contentRequest.clientData, projectType: e.target.value }
                })}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Technical Documentation">Technical Documentation</option>
                <option value="User Manuals">User Manuals</option>
                <option value="API Documentation">API Documentation</option>
                <option value="Training Materials">Training Materials</option>
                <option value="Process Documentation">Process Documentation</option>
              </select>
            </div>
          </div>

          {/* Tone and Length */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-safe mb-1">Tone</label>
              <select
                value={contentRequest.tone}
                onChange={(e) => setContentRequest({
                  ...contentRequest,
                  tone: e.target.value as ContentGenerationRequest['tone']
                })}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="professional">Professional</option>
                <option value="friendly">Friendly</option>
                <option value="technical">Technical</option>
                <option value="persuasive">Persuasive</option>
                <option value="consultative">Consultative</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-safe mb-1">Length</label>
              <select
                value={contentRequest.length}
                onChange={(e) => setContentRequest({
                  ...contentRequest,
                  length: e.target.value as ContentGenerationRequest['length']
                })}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="short">Short</option>
                <option value="medium">Medium</option>
                <option value="long">Long</option>
              </select>
            </div>
          </div>

          {/* Context */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-safe mb-1">Context/Additional Information</label>
            <textarea
              value={contentRequest.context}
              onChange={(e) => setContentRequest({
                ...contentRequest,
                context: e.target.value
              })}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Any specific requirements, background information, or context for the content..."
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={generateContent}
            disabled={isGenerating}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Generating Content...
              </>
            ) : (
              <>
                <span className="mr-2">🤖</span>
                Generate Content
              </>
            )}
          </button>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-safe-error text-sm">{error}</p>
            </div>
          )}
        </div>
      </div>

      {/* Generated Content Display */}
      <div className="space-y-6">
        {generatedContent && (
          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-safe">Generated Content</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-safe-muted">
                  Engagement Score: {generatedContent.estimatedEngagementScore}%
                </span>
                <button
                  onClick={() => copyToClipboard(generatedContent.content)}
                  className="text-safe-accent hover:text-safe-accent text-sm"
                >
                  Copy
                </button>
              </div>
            </div>

            {generatedContent.subject && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-safe mb-1">Subject Line</label>
                <div className="p-3 bg-gray-50 rounded-md">
                  <p className="text-safe">{generatedContent.subject}</p>
                </div>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-safe mb-1">Content</label>
              <div className="p-4 bg-gray-50 rounded-md max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-safe">{generatedContent.content}</pre>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-safe mb-1">Call to Action</label>
              <div className="p-3 bg-blue-50 rounded-md">
                <p className="text-safe-accent font-medium">{generatedContent.callToAction}</p>
              </div>
            </div>

            {generatedContent.personalizationElements.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-safe mb-1">Personalization Elements</label>
                <div className="flex flex-wrap gap-2">
                  {generatedContent.personalizationElements.map((element, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-green-100 text-safe-success text-xs rounded-full"
                    >
                      {element}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {generatedContent.recommendedFollowUp && (
              <div>
                <label className="block text-sm font-medium text-safe mb-1">Recommended Follow-up</label>
                <div className="p-3 bg-yellow-50 rounded-md">
                  <p className="text-safe-warning">{generatedContent.recommendedFollowUp}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold text-safe mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => setContentRequest({
                ...contentRequest,
                type: 'email_template',
                context: 'Welcome email for new leads'
              })}
              className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
            >
              <div className="font-medium text-safe">📧 Welcome Email Template</div>
              <div className="text-sm text-safe-muted">Generate a warm welcome email for new leads</div>
            </button>
            
            <button
              onClick={() => setContentRequest({
                ...contentRequest,
                type: 'follow_up',
                context: '24-hour follow-up after initial contact'
              })}
              className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
            >
              <div className="font-medium text-safe">⏰ 24-Hour Follow-up</div>
              <div className="text-sm text-safe-muted">Create a professional follow-up email</div>
            </button>

            <button
              onClick={() => setContentRequest({
                ...contentRequest,
                type: 'proposal',
                context: 'Comprehensive project proposal'
              })}
              className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
            >
              <div className="font-medium text-safe">📋 Project Proposal</div>
              <div className="text-sm text-safe-muted">Generate a detailed project proposal</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="space-y-6">
      {performanceMetrics && (
        <>
          {/* Overview Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow border">
              <div className="flex items-center">
                <span className="text-3xl mr-3">📄</span>
                <div>
                  <h3 className="text-lg font-semibold text-safe">Total Content</h3>
                  <p className="text-3xl font-bold text-safe-accent">{performanceMetrics.totalContentGenerated}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
              <div className="flex items-center">
                <span className="text-3xl mr-3">📊</span>
                <div>
                  <h3 className="text-lg font-semibold text-safe">Avg. Engagement</h3>
                  <p className="text-3xl font-bold text-safe-success">{performanceMetrics.averageEngagementScore}%</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border">
              <div className="flex items-center">
                <span className="text-3xl mr-3">🎯</span>
                <div>
                  <h3 className="text-lg font-semibold text-safe">Top Performance</h3>
                  <p className="text-3xl font-bold text-safe-accent">
                    {Math.max(...Object.values(performanceMetrics.performanceByType).map((p: PerformanceData) => p.averageEngagementScore))}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Types Breakdown */}
          <div className="bg-white p-6 rounded-lg shadow border">
            <h3 className="text-lg font-semibold text-safe mb-4">Content Types Generated</h3>
            <div className="space-y-4">
              {Object.entries(performanceMetrics.contentTypes).map(([type, count]) => (
                <div key={type} className="flex items-center justify-between">
                  <span className="text-safe capitalize">{type.replace('_', ' ')}</span>
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-200 rounded-full h-2 mr-4">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${(count / performanceMetrics.totalContentGenerated) * 100}%`
                        }}
                      ></div>
                    </div>
                    <span className="text-safe font-medium">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance by Type */}
          <div className="bg-white p-6 rounded-lg shadow border">
            <h3 className="text-lg font-semibold text-safe mb-4">Performance by Content Type</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 font-medium text-safe">Content Type</th>
                    <th className="text-center py-2 font-medium text-safe">Engagement Score</th>
                    <th className="text-center py-2 font-medium text-safe">Success Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(performanceMetrics.performanceByType).map(([type, data]: [string, PerformanceData]) => (
                    <tr key={type} className="border-b border-gray-100">
                      <td className="py-3 text-safe capitalize">{type.replace('_', ' ')}</td>
                      <td className="py-3 text-center">
                        <span className="px-2 py-1 bg-blue-100 text-safe-accent rounded-full text-sm">
                          {data.averageEngagementScore}%
                        </span>
                      </td>
                      <td className="py-3 text-center">
                        <span className="px-2 py-1 bg-green-100 text-safe-success rounded-full text-sm">
                          {data.openRate || data.viewRate || data.responseRate || 'N/A'}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-safe mb-2">AI Content Generation</h1>
        <p className="text-safe-muted">
          Leverage AI to create personalized, high-engaging content for leads and clients
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'generate', label: 'Generate Content', icon: '🤖' },
            { id: 'proposals', label: 'Proposals', icon: '📋' },
            { id: 'sequences', label: 'Email Sequences', icon: '📧' },
            { id: 'analytics', label: 'Analytics', icon: '📊' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-safe-accent'
                  : 'border-transparent text-safe-muted hover:text-safe hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'generate' && renderGenerateTab()}
      {activeTab === 'analytics' && renderAnalyticsTab()}
      {activeTab === 'proposals' && (
        <div className="text-center py-12">
          <span className="text-6xl mb-4 block">🚧</span>
          <h3 className="text-lg font-medium text-safe mb-2">Proposal Generation</h3>
          <p className="text-safe-muted">Coming soon - AI-powered proposal generation</p>
        </div>
      )}
      {activeTab === 'sequences' && (
        <div className="text-center py-12">
          <span className="text-6xl mb-4 block">🚧</span>
          <h3 className="text-lg font-medium text-safe mb-2">Email Sequences</h3>
          <p className="text-safe-muted">Coming soon - Automated email sequence generation</p>
        </div>
      )}
    </div>
  );
}
