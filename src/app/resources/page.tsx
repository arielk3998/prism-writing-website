'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  ModernButton,
  ModernNavigation,
} from '@/components/ui/ModernComponents';
import { IndustryIconMap } from '@/components/ui/IndustryIcons';
import { industriesData, ComplianceResource, IndustryCategory } from '@/data/complianceData';
import EnhancedFooter from '@/components/layout/EnhancedFooter';
import { DarkModeToggle } from '@/components/ui/DarkModeToggle';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { 
  Search, 
  ExternalLink, 
  BookOpen,
  FileText,
  AlertCircle,
  CheckCircle2,
  Clock,
  Building,
  Shield,
  Users,
  TrendingUp,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';

export default function ResourcesPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [resourceTypeFilter, setResourceTypeFilter] = useState('all');
  const [criticalityFilter, setCriticalityFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'industries' | 'resources'>('industries');

  // Navigation items
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Resources', href: '/resources', isActive: true },
    { label: 'About', href: '/about' },
  ];

  // Filter industries based on search and active filter
  const filteredIndustries = industriesData.filter(industry => {
    if (activeFilter !== 'all' && industry.id !== activeFilter) return false;
    if (!searchTerm) return true;
    return industry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           industry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
           industry.keyAreas.some(area => area.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  // Get all resources with filtering
  const getAllFilteredResources = (): (ComplianceResource & { industryTitle: string; industryId: string })[] => {
    return industriesData.flatMap(industry => 
      industry.resources
        .filter(resource => {
          if (resourceTypeFilter !== 'all' && resource.type !== resourceTypeFilter) return false;
          if (criticalityFilter !== 'all' && resource.criticality !== criticalityFilter) return false;
          if (!searchTerm) return true;
          return resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 resource.documentTypes.some(type => type.toLowerCase().includes(searchTerm.toLowerCase()));
        })
        .map(resource => ({
          ...resource,
          industryTitle: industry.title,
          industryId: industry.id
        }))
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Modern Navigation */}
      <ModernNavigation
        logo={
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Prism Writing
            </span>
          </Link>
        }
        navItems={navItems}
        actions={
          <div className="flex items-center space-x-4">
            <DarkModeToggle />
            <Link href="/contact">
              <ModernButton variant="outline" size="sm">
                Get Quote
              </ModernButton>
            </Link>
            <Link href="/portal">
              <ModernButton variant="primary" size="sm">
                Client Portal
              </ModernButton>
            </Link>
          </div>
        }
      />

      {selectedIndustry ? (
        // Detailed Industry View
        <DetailedIndustryView 
          industry={industriesData.find(i => i.id === selectedIndustry)!}
          onBack={() => setSelectedIndustry(null)}
        />
      ) : (
        // Main Resources View
        <>
          {/* Hero Section */}
          <section className="pt-32 pb-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <div className="text-center">
                <motion.h1
                  className="text-5xl md:text-6xl font-bold mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-gray-900">Compliance</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block mt-2">
                    Resources
                  </span>
                </motion.h1>
                <motion.p
                  className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Comprehensive collection of industry standards, compliance requirements, and best practices 
                  for technical documentation across all major sectors.
                </motion.p>
                
                {/* Stats */}
                <motion.div
                  className="flex justify-center items-center gap-8 text-sm"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="flex items-center gap-2 bg-blue-50 rounded-full px-4 py-2">
                    <Building className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-700">{industriesData.length} Industries</span>
                  </div>
                  <div className="flex items-center gap-2 bg-purple-50 rounded-full px-4 py-2">
                    <Shield className="w-4 h-4 text-purple-600" />
                    <span className="font-medium text-purple-700">{getAllFilteredResources().length} Standards</span>
                  </div>
                  <div className="flex items-center gap-2 bg-green-50 rounded-full px-4 py-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-green-700">Updated 2024</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Search and Filter Section */}
          <section className="py-8 bg-gray-50 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search industries or standards..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Quick Filters */}
                <div className="flex gap-3 flex-wrap">
                  {['all', 'healthcare', 'technology', 'financial', 'manufacturing', 'biotechnology', 'telecommunications'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        activeFilter === filter
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      {filter === 'all' ? 'All Industries' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Advanced Filters */}
                <div className="flex gap-3 flex-wrap items-center">
                  {/* View Mode Toggle */}
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('industries')}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                        viewMode === 'industries'
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      By Industry
                    </button>
                    <button
                      onClick={() => setViewMode('resources')}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                        viewMode === 'resources'
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      All Resources
                    </button>
                  </div>

                  <select
                    value={resourceTypeFilter}
                    onChange={(e) => setResourceTypeFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    <option value="all">All Types</option>
                    <option value="regulation">Regulations</option>
                    <option value="standard">Standards</option>
                    <option value="framework">Frameworks</option>
                    <option value="guideline">Guidelines</option>
                  </select>
                  
                  <select
                    value={criticalityFilter}
                    onChange={(e) => setCriticalityFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    <option value="all">All Criticality</option>
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Industries Grid or Resources Table */}
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {viewMode === 'industries' ? (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <AnimatePresence>
                    {filteredIndustries.map((industry, index) => {
                      const IconComponent = IndustryIconMap[industry.iconKey as keyof typeof IndustryIconMap];
                      
                      return (
                        <motion.div
                          key={industry.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          onClick={() => setSelectedIndustry(industry.id)}
                          className="group cursor-pointer"
                        >                        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group">
                          {/* Background Gradient */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${industry.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
                          
                          <div className="relative p-6">
                            {/* Industry Icon */}
                            <div className={`w-16 h-16 ${industry.bgColor} dark:bg-gray-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 ease-out`}>
                              <IconComponent className="text-current smooth-hover" size="medium" />
                            </div>

                              {/* Content */}
                              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                                {industry.title}
                              </h3>
                              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                {industry.shortDesc}
                              </p>

                              {/* Stats */}
                              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                                <span className="flex items-center gap-1">
                                  <Shield className="w-3 h-3" />
                                  {industry.resources.length} Standards
                                </span>
                                <span className="flex items-center gap-1">
                                  <FileText className="w-3 h-3" />
                                  {industry.keyAreas.length} Areas
                                </span>
                              </div>

                              {/* Key Areas Preview */}
                              <div className="space-y-1 mb-4">
                                {industry.keyAreas.slice(0, 2).map((area, i) => (
                                  <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                                    {area}
                                  </div>
                                ))}
                                {industry.keyAreas.length > 2 && (
                                  <div className="text-xs text-gray-500 font-medium">
                                    +{industry.keyAreas.length - 2} more areas
                                  </div>
                                )}
                              </div>

                              {/* Action */}
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-blue-600">
                                  Explore Resources
                                </span>
                                <ChevronRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform duration-300" />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <AllResourcesView 
                  resources={getAllFilteredResources()}
                  onIndustryClick={(industryId) => {
                    setSelectedIndustry(industryId);
                    setViewMode('industries');
                  }}
                />
              )}
            </div>
          </section>
        </>
      )}

      <ScrollToTop />
      <EnhancedFooter />
    </div>
  );
}

// Detailed Industry View Component
function DetailedIndustryView({ 
  industry, 
  onBack 
}: { 
  industry: IndustryCategory; 
  onBack: () => void; 
}) {
  const IconComponent = IndustryIconMap[industry.iconKey as keyof typeof IndustryIconMap];

  const getCriticalityColor = (criticality: string) => {
    switch (criticality) {
      case 'high': return 'text-red-600 bg-red-100 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'regulation': return <AlertCircle className="w-4 h-4" />;
      case 'standard': return <CheckCircle2 className="w-4 h-4" />;
      case 'framework': return <Building className="w-4 h-4" />;
      case 'guideline': return <BookOpen className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Industries
        </button>

        {/* Industry Header */}
        <div className="flex items-start gap-6 mb-12">
          <div className={`w-20 h-20 ${industry.bgColor} rounded-2xl flex items-center justify-center`}>
            <IconComponent className="text-current" size="large" />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{industry.title}</h1>
            <p className="text-xl text-gray-600 mb-6">{industry.description}</p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 bg-blue-50 rounded-full px-4 py-2">
                <Shield className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">
                  {industry.resources.length} Compliance Standards
                </span>
              </div>
              <div className="flex items-center gap-2 bg-purple-50 rounded-full px-4 py-2">
                <FileText className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-700">
                  {industry.keyAreas.length} Key Areas
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Key Compliance Areas
            </h3>
            <div className="space-y-3">
              {industry.keyAreas.map((area, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-gray-700">{area}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-600" />
              Documentation Focus
            </h3>
            <div className="space-y-3">
              {industry.documentationFocus.map((focus, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <span className="text-gray-700">{focus}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Compliance Resources */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Compliance Standards & Resources</h2>
          
          {industry.resources.map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(resource.type)}
                      <span className="text-sm font-medium text-gray-600 capitalize">
                        {resource.type}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getCriticalityColor(resource.criticality)}`}>
                      {resource.criticality.toUpperCase()}
                    </span>
                    {resource.lastUpdated && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                        <Clock className="w-3 h-3 mr-1" />
                        {resource.lastUpdated}
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{resource.name}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-700">Authority: </span>
                  <span className="text-sm text-gray-600">{resource.authority}</span>
                </div>

                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-700">Relevance: </span>
                  <span className="text-sm text-gray-600">{resource.relevance}</span>
                </div>

                {resource.documentTypes && (
                  <div className="mb-4">
                    <span className="text-sm font-medium text-gray-700 mb-2 block">Document Types:</span>
                    <div className="flex flex-wrap gap-2">
                      {resource.documentTypes.map((type, i) => (
                        <span key={i} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  View Official Resource
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// All Resources View Component
function AllResourcesView({ 
  resources, 
  onIndustryClick 
}: { 
  resources: (ComplianceResource & { industryTitle: string; industryId: string })[]; 
  onIndustryClick: (industryId: string) => void;
}) {
  const getCriticalityColor = (criticality: string) => {
    switch (criticality) {
      case 'high': return 'text-red-600 bg-red-100 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'regulation': return <AlertCircle className="w-4 h-4" />;
      case 'standard': return <CheckCircle2 className="w-4 h-4" />;
      case 'framework': return <Building className="w-4 h-4" />;
      case 'guideline': return <BookOpen className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">All Compliance Resources</h2>
        <span className="text-sm text-gray-600">{resources.length} resources found</span>
      </div>

      {resources.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No resources match your current filters.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {resources.map((resource, index) => (
            <motion.div
              key={`${resource.industryId}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(resource.type)}
                      <span className="text-sm font-medium text-gray-600 capitalize">
                        {resource.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getCriticalityColor(resource.criticality)}`}>
                        {resource.criticality.toUpperCase()}
                      </span>
                      {resource.lastUpdated && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                          <Clock className="w-3 h-3 mr-1" />
                          {resource.lastUpdated}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => onIndustryClick(resource.industryId)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium px-3 py-1 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors"
                  >
                    {resource.industryTitle}
                  </button>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">{resource.name}</h3>
                <p className="text-gray-600 mb-3">{resource.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Authority: </span>
                    <span className="text-gray-600">{resource.authority}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Relevance: </span>
                    <span className="text-gray-600">{resource.relevance}</span>
                  </div>
                </div>

                {resource.documentTypes && (
                  <div className="mb-4">
                    <span className="text-sm font-medium text-gray-700 mb-2 block">Document Types:</span>
                    <div className="flex flex-wrap gap-2">
                      {resource.documentTypes.map((type, i) => (
                        <span key={i} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  View Official Resource
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
