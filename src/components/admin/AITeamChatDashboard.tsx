'use client';

/**
 * AI Team Chat Dashboard
 * 
 * Real-time communication interface with the multi-agent AI team.
 * Displays team suggestions, status updates, and collaborative discussions.
 * 
 * @version 1.0.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, 
  MessageSquare, 
  Bot, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Lightbulb,
  Activity,
  Brain,
  Zap,
  Target,
  Star,
  Send,
  Filter,
  Search,
  RefreshCw
} from 'lucide-react';
import { multiAgentTeamSystem } from '../../lib/multiAgentTeamSystem';
import type { 
  AIAgent, 
  TeamCommunication
} from '../../lib/multiAgentTeamSystem';

// Local interfaces for dashboard-specific types
interface TeamStatusOverview {
  timestamp: Date;
  teamSize: number;
  agentStatus: Record<string, number>;
  recentActivity: {
    communications: number;
    suggestions: number;
    collaborations: number;
    alerts: number;
  };
  performanceSnapshot: TeamPerformanceOverview;
  topPerformers: {
    id: string;
    name: string;
    role: string;
    score: number;
  }[];
  activeCollaborations: number;
}

interface TeamPerformanceOverview {
  totalAgents: number;
  activeAgents: number;
  averagePerformanceScore: number;
  totalTasksCompleted: number;
  averageQualityScore: number;
  collaborationEffectiveness: number;
  recentCommunications: number;
}

interface ChatMessage {
  id: string;
  sender: string;
  senderType: 'human' | 'agent' | 'system';
  message: string;
  timestamp: Date;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  type: 'message' | 'suggestion' | 'alert' | 'status' | 'collaboration';
  agentRole?: string;
  attachments?: any[];
}

export default function AITeamChatDashboard() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [agents, setAgents] = useState<AIAgent[]>([]);
  const [teamStatus, setTeamStatus] = useState<TeamStatusOverview | null>(null);
  const [performance, setPerformance] = useState<TeamPerformanceOverview | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load team data
  useEffect(() => {
    loadTeamData();
    const interval = setInterval(loadTeamData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadTeamData = async () => {
    try {
      const activeAgents = multiAgentTeamSystem.getActiveAgents();
      const recentComms = multiAgentTeamSystem.getRecentCommunications();
      const status = multiAgentTeamSystem.getTeamStatus();
      const perf = multiAgentTeamSystem.getTeamPerformanceMetrics();

      setAgents(activeAgents);
      setTeamStatus(status);
      setPerformance(perf);

      // Convert communications to chat messages
      const chatMessages: ChatMessage[] = recentComms.map(comm => ({
        id: comm.id,
        sender: getAgentName(comm.from) || comm.from,
        senderType: comm.from === 'system' ? 'system' : 'agent',
        message: comm.message,
        timestamp: comm.timestamp,
        priority: comm.priority,
        type: comm.type === 'status_update' ? 'status' : 
              comm.type === 'innovation' ? 'suggestion' : 
              comm.type === 'problem_report' ? 'alert' : 
              comm.type as 'message' | 'suggestion' | 'alert' | 'status' | 'collaboration',
        agentRole: getAgentRole(comm.from),
        attachments: comm.attachments
      }));

      setMessages(prev => {
        // Merge with existing messages, avoiding duplicates
        const existing = new Set(prev.map(m => m.id));
        const newMessages = chatMessages.filter(m => !existing.has(m.id));
        return [...prev, ...newMessages].sort((a, b) => 
          a.timestamp.getTime() - b.timestamp.getTime()
        );
      });
    } catch (error) {
      console.error('Error loading team data:', error);
    }
  };

  const getAgentName = (agentId: string): string | null => {
    if (agentId === 'system') return 'System';
    const agent = agents.find(a => a.id === agentId);
    return agent?.name || null;
  };

  const getAgentRole = (agentId: string): string | undefined => {
    const agent = agents.find(a => a.id === agentId);
    return agent?.role;
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      sender: 'Admin',
      senderType: 'human',
      message: newMessage,
      timestamp: new Date(),
      priority: 'medium',
      type: 'message'
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate AI team response
    setTimeout(() => {
      const responses = generateTeamResponses(newMessage);
      setMessages(prev => [...prev, ...responses]);
    }, 1000);
  };

  const generateTeamResponses = (userMessage: string): ChatMessage[] => {
    const responses: ChatMessage[] = [];
    
    // Randomly select 1-3 agents to respond
    const respondingAgents = agents
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 3) + 1);

    respondingAgents.forEach((agent, index) => {
      setTimeout(() => {
        const response: ChatMessage = {
          id: `response_${agent.id}_${Date.now()}`,
          sender: agent.name,
          senderType: 'agent',
          message: generateAgentResponse(agent, userMessage),
          timestamp: new Date(Date.now() + index * 2000),
          priority: 'medium',
          type: 'message',
          agentRole: agent.role
        };
        
        setMessages(prev => [...prev, response]);
      }, index * 2000);
    });

    return [];
  };

  const generateAgentResponse = (agent: AIAgent, message: string): string => {
    const responses = {
      senior_developer: [
        "I can help implement that technically. Let me analyze the requirements.",
        "From a development perspective, this looks achievable. I'll start working on it.",
        "That's an interesting technical challenge. I have some ideas for optimization.",
      ],
      business_analyst: [
        "I'll analyze the business impact and create a strategic plan.",
        "This aligns well with our business objectives. Let me prepare a cost-benefit analysis.",
        "I can see opportunities for process improvement here.",
      ],
      content_creator: [
        "I can help create compelling content for this initiative.",
        "This would make great material for our documentation and marketing.",
        "I'll draft some content options for your review.",
      ],
      quality_assurance: [
        "I'll ensure this meets our quality standards and create test cases.",
        "Let me review this for potential issues and edge cases.",
        "I can set up comprehensive testing for this feature.",
      ],
      customer_success: [
        "This should improve our customer experience significantly.",
        "I'll monitor customer feedback and satisfaction metrics.",
        "I can help communicate this to our clients effectively.",
      ],
      process_optimizer: [
        "I see opportunities to streamline this process.",
        "This could improve our efficiency by at least 25%.",
        "Let me optimize the workflow for maximum effectiveness.",
      ]
    };

    const roleResponses = responses[agent.role] || responses.process_optimizer;
    return roleResponses[Math.floor(Math.random() * roleResponses.length)];
  };

  const filteredMessages = messages.filter(message => {
    const matchesAgent = selectedAgent === 'all' || 
      message.sender === getAgentName(selectedAgent) ||
      (selectedAgent === 'system' && message.senderType === 'system') ||
      (selectedAgent === 'human' && message.senderType === 'human');
    
    const matchesType = filterType === 'all' || message.type === filterType;
    
    const matchesSearch = !searchTerm || 
      message.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.sender.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesAgent && matchesType && matchesSearch;
  });

  const suggestions = messages.filter(m => m.type === 'suggestion' && showSuggestions);
  const recentSuggestions = suggestions.slice(-5);

  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'suggestion': return <Lightbulb className="w-4 h-4 text-safe-warning" />;
      case 'alert': return <AlertTriangle className="w-4 h-4 text-safe-error" />;
      case 'collaboration': return <Users className="w-4 h-4 text-safe-accent" />;
      case 'status': return <Activity className="w-4 h-4 text-safe-success" />;
      default: return <MessageSquare className="w-4 h-4 text-safe-muted" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'border-l-red-500 bg-red-50';
      case 'high': return 'border-l-orange-500 bg-orange-50';
      case 'medium': return 'border-l-blue-500 bg-blue-50';
      case 'low': return 'border-l-gray-500 bg-gray-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getRoleIcon = (role?: string) => {
    switch (role) {
      case 'senior_developer': return <Bot className="w-4 h-4 text-safe-accent" />;
      case 'business_analyst': return <TrendingUp className="w-4 h-4 text-safe-accent" />;
      case 'content_creator': return <Star className="w-4 h-4 text-safe-warning" />;
      case 'quality_assurance': return <CheckCircle className="w-4 h-4 text-safe-success" />;
      case 'customer_success': return <Target className="w-4 h-4 text-pink-500" />;
      case 'process_optimizer': return <Zap className="w-4 h-4 text-safe-warning" />;
      default: return <Brain className="w-4 h-4 text-safe-muted" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-safe-accent" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-safe">AI Team Chat</h1>
              <p className="text-safe-muted">Real-time collaboration with your AI team</p>
            </div>
          </div>
          <button
            onClick={loadTeamData}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>

        {/* Team Status */}
        {teamStatus && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-safe-accent">Active Agents</p>
                  <p className="text-2xl font-bold text-safe-accent">{teamStatus.agentStatus.active || 0}</p>
                </div>
                <Users className="w-8 h-8 text-safe-accent" />
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-safe-success">Recent Activity</p>
                  <p className="text-2xl font-bold text-green-900">{teamStatus.recentActivity.communications}</p>
                </div>
                <Activity className="w-8 h-8 text-safe-success" />
              </div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-safe-warning">Suggestions</p>
                  <p className="text-2xl font-bold text-yellow-900">{teamStatus.recentActivity.suggestions}</p>
                </div>
                <Lightbulb className="w-8 h-8 text-safe-warning" />
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-safe-accent">Performance</p>
                  <p className="text-2xl font-bold text-purple-900">
                    {performance ? Math.round(performance.averagePerformanceScore * 100) : 0}%
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-safe-accent" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Team & Filters */}
        <div className="lg:col-span-1 space-y-4">
          {/* Team Members */}
          <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-200">
            <h3 className="text-lg font-semibold text-safe mb-3">Team Members</h3>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedAgent('all')}
                className={`w-full text-left p-2 rounded-lg transition-colors ${
                  selectedAgent === 'all' ? 'bg-blue-100 text-safe-accent' : 'hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>All Members</span>
                </div>
              </button>
              {agents.map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent.id)}
                  className={`w-full text-left p-2 rounded-lg transition-colors ${
                    selectedAgent === agent.id ? 'bg-blue-100 text-safe-accent' : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {getRoleIcon(agent.role)}
                    <div>
                      <p className="text-sm font-medium">{agent.name}</p>
                      <p className="text-xs text-safe-muted capitalize">{agent.role.replace('_', ' ')}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-200">
            <h3 className="text-lg font-semibold text-safe mb-3">Filters</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-safe mb-1">Message Type</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="message">Messages</option>
                  <option value="suggestion">Suggestions</option>
                  <option value="alert">Alerts</option>
                  <option value="status">Status Updates</option>
                  <option value="collaboration">Collaborations</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-safe mb-1">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-safe-muted" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search messages..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="showSuggestions"
                  checked={showSuggestions}
                  onChange={(e) => setShowSuggestions(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="showSuggestions" className="text-sm text-safe">
                  Show Suggestions
                </label>
              </div>
            </div>
          </div>

          {/* Recent Suggestions */}
          {showSuggestions && recentSuggestions.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-200">
              <h3 className="text-lg font-semibold text-safe mb-3">Recent Suggestions</h3>
              <div className="space-y-2">
                {recentSuggestions.map((suggestion) => (
                  <div key={suggestion.id} className="p-2 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                    <div className="flex items-start space-x-2">
                      <Lightbulb className="w-4 h-4 text-safe-warning mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-safe-warning">{suggestion.sender}</p>
                        <p className="text-xs text-safe-warning">{suggestion.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Chat Area */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-safe">Team Chat</h3>
                <div className="flex items-center space-x-2 text-sm text-safe-muted">
                  <Clock className="w-4 h-4" />
                  <span>{filteredMessages.length} messages</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`p-3 rounded-lg border-l-4 ${getPriorityColor(message.priority)}`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {message.senderType === 'human' ? (
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">A</span>
                        </div>
                      ) : message.senderType === 'system' ? (
                        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                          {getRoleIcon(message.agentRole)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-safe">{message.sender}</span>
                        {getMessageIcon(message.type)}
                        <span className="text-xs text-safe-muted">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                        {message.priority === 'urgent' && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-safe-error">
                            Urgent
                          </span>
                        )}
                      </div>
                      <p className="text-safe">{message.message}</p>
                      {message.agentRole && (
                        <p className="text-xs text-safe-muted mt-1 capitalize">
                          {message.agentRole.replace('_', ' ')}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message to your AI team..."
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-safe-muted mt-2">
                Your AI team is always listening and ready to help with suggestions, analysis, and automation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
