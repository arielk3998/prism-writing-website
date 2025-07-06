'use client';

// 📚 Cooperative Resources Component
// Comprehensive library of cooperative development resources

import React, { useState } from 'react';
import { Download, ExternalLink, BookOpen, Users, Scale, DollarSign, Building, Gavel, TreePine } from 'lucide-react';

interface Resource {
  title: string;
  description: string;
  type: 'PDF' | 'Template' | 'Guide' | 'Video' | 'Website' | 'Spreadsheet';
  category: string;
  source: string;
  url?: string;
  downloadable?: boolean;
  featured?: boolean;
}

export default function CooperativeResources() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', label: 'All Resources', icon: BookOpen },
    { id: 'legal', label: 'Legal & Formation', icon: Gavel },
    { id: 'financial', label: 'Financial Management', icon: DollarSign },
    { id: 'governance', label: 'Governance & Democracy', icon: Users },
    { id: 'startup', label: 'Startup & Development', icon: Building },
    { id: 'equity', label: 'Equity & Ownership', icon: Scale },
    { id: 'environment', label: 'Sustainability', icon: TreePine }
  ];

  const resources: Resource[] = [
    // Legal Resources
    {
      title: "Guide to Worker Cooperative Bylaws and Operating Agreements",
      description: "Comprehensive guide for creating legal documents that establish democratic governance and member rights in worker cooperatives.",
      type: "PDF",
      category: "legal",
      source: "Democracy at Work Institute",
      url: "https://institute.coop/resources/guide-worker-cooperative-bylaws-and-operating-agreements",
      downloadable: true,
      featured: true
    },
    {
      title: "28 Questions to Ask Before Meeting the Lawyer",
      description: "Essential preparation checklist for legal consultation when forming a worker cooperative.",
      type: "PDF",
      category: "legal",
      source: "Katovich & Kassan Law Group",
      downloadable: true
    },
    {
      title: "Choosing a Business Entity: A Guide for Worker Cooperatives",
      description: "Detailed comparison of legal structures (LLC, Corporation, Cooperative Corp) with pros and cons for each.",
      type: "PDF",
      category: "legal",
      source: "Democracy at Work Institute",
      downloadable: true,
      featured: true
    },
    {
      title: "Legal Guide to Cooperative Conversions",
      description: "Step-by-step guide for converting existing businesses to worker-owned cooperatives.",
      type: "PDF",
      category: "legal",
      source: "Sustainable Economies Law Center",
      downloadable: true
    },

    // Financial Resources
    {
      title: "Worker Cooperative Chart of Accounts (COA) Sample",
      description: "Ready-to-use accounting chart of accounts specifically designed for worker cooperatives with member equity tracking.",
      type: "Spreadsheet",
      category: "financial",
      source: "Democracy at Work Institute",
      downloadable: true,
      featured: true
    },
    {
      title: "Internal Capital Accounts",
      description: "Detailed guide on managing member capital accounts, including contributions, allocations, and redemptions.",
      type: "PDF",
      category: "financial",
      source: "ICA Group",
      downloadable: true
    },
    {
      title: "Patronage Calculation Template",
      description: "Excel template for calculating and distributing patronage refunds to cooperative members.",
      type: "Spreadsheet",
      category: "financial",
      source: "Democracy at Work Network",
      downloadable: true,
      featured: true
    },
    {
      title: "A Learning and Training Tool for Understanding Worker Cooperative Finances",
      description: "Interactive spreadsheet tool that demonstrates cooperative financial principles and member equity.",
      type: "Spreadsheet",
      category: "financial",
      source: "University of Wisconsin Center for Cooperatives",
      downloadable: true
    },
    {
      title: "Pro Forma Template",
      description: "Financial projection template specifically designed for worker cooperative business planning.",
      type: "Spreadsheet",
      category: "financial",
      source: "Democracy at Work Institute",
      downloadable: true
    },

    // Equity & Ownership
    {
      title: "Cooperative Equity and Ownership",
      description: "Comprehensive guide to member equity structures, including voting rights, profit sharing, and ownership transfer.",
      type: "PDF",
      category: "equity",
      source: "University of Wisconsin Center for Cooperatives",
      downloadable: true,
      featured: true
    },
    {
      title: "Indivisible Reserves: Unallocated Equity",
      description: "Best practices for building collective assets that strengthen cooperative resilience and sustainability.",
      type: "PDF",
      category: "equity",
      source: "USDA Rural Development",
      downloadable: true
    },

    // Governance Resources
    {
      title: "Democratic Governance Toolkit",
      description: "Practical tools for implementing participatory decision-making, conflict resolution, and member engagement.",
      type: "Guide",
      category: "governance",
      source: "US Federation of Worker Cooperatives",
      downloadable: true,
      featured: true
    },
    {
      title: "Consensus Decision-Making in Cooperatives",
      description: "Step-by-step guide to implementing consensus processes, including facilitation techniques and conflict resolution.",
      type: "PDF",
      category: "governance",
      source: "Cooperation Works!",
      downloadable: true
    },

    // Startup Resources
    {
      title: "Center for Family Life Cooperative Startup Guides",
      description: "Complete startup kit including business planning, legal formation, and member recruitment strategies.",
      type: "PDF",
      category: "startup",
      source: "Center for Family Life",
      downloadable: true,
      featured: true
    },
    {
      title: "Cooperative Business Development Guide",
      description: "Comprehensive roadmap from concept to launch, including market analysis, feasibility studies, and launch planning.",
      type: "Guide",
      category: "startup",
      source: "Cooperative Development Institute",
      downloadable: true
    },

    // Institute.coop Resources
    {
      title: "Democracy at Work Institute Resource Library",
      description: "Complete collection of cooperative development resources including legal, financial, and governance materials.",
      type: "Website",
      category: "all",
      source: "Democracy at Work Institute",
      url: "https://institute.coop/resource-library",
      featured: true
    },
    {
      title: "US Federation of Worker Cooperatives",
      description: "National organization providing advocacy, education, and networking for worker cooperatives.",
      type: "Website",
      category: "all",
      source: "USFWC",
      url: "https://www.usworker.coop/"
    },
    {
      title: "Sustainable Economies Law Center",
      description: "Legal resources and support for cooperative and community economic development.",
      type: "Website",
      category: "legal",
      source: "SELC",
      url: "https://www.theselc.org/"
    },

    // Environmental Resources
    {
      title: "Cooperative Principles for Environmental Sustainability",
      description: "Guide to integrating environmental sustainability into cooperative operations and governance.",
      type: "PDF",
      category: "environment",
      source: "International Cooperative Alliance",
      downloadable: true
    },
    {
      title: "Green Business Practices for Cooperatives",
      description: "Practical strategies for reducing environmental impact while maintaining cooperative principles.",
      type: "Guide",
      category: "environment",
      source: "Cooperative Sustainability Network",
      downloadable: true
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = activeCategory === 'all' || resource.category === activeCategory;
    const matchesSearch = !searchTerm || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.source.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const featuredResources = resources.filter(r => r.featured);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'PDF': return '📄';
      case 'Template': return '📋';
      case 'Guide': return '📖';
      case 'Video': return '🎥';
      case 'Website': return '🌐';
      case 'Spreadsheet': return '📊';
      default: return '📝';
    }
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'PDF': 'bg-red-100 text-safe-error dark:bg-red-900 dark:text-red-200',
      'Template': 'bg-blue-100 text-safe-accent dark:bg-blue-900 dark:text-blue-200',
      'Guide': 'bg-green-100 text-safe-success dark:bg-green-900 dark:text-green-200',
      'Video': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'Website': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'Spreadsheet': 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-safe dark:bg-gray-900 dark:text-gray-200';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-3xl font-bold flex items-center gap-3 text-safe">
            <BookOpen className="h-8 w-8 text-safe-accent" />
            Cooperative Resources Library
          </h1>
          <p className="text-safe-muted mt-2">
            Comprehensive collection of resources from Democracy at Work Institute, USFWC, and cooperative development organizations
          </p>
        </div>

        {/* Featured Resources */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-safe">Featured Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredResources.map((resource, index) => (
              <div key={index} className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-safe-accent dark:text-blue-100 text-sm">{resource.title}</h3>
                  <span className="text-lg">{getTypeIcon(resource.type)}</span>
                </div>
                <p className="text-safe-accent text-xs mb-3">{resource.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-safe-accent text-xs">{resource.source}</span>
                  {resource.url && (
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-safe-accent hover:text-safe-accent dark:hover:text-blue-200"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-safe"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-safe hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {category.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredResources.map((resource, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-medium text-safe mb-1">{resource.title}</h3>
                    <p className="text-safe-muted text-sm">{resource.description}</p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ml-3 ${getTypeColor(resource.type)}`}>
                    {getTypeIcon(resource.type)} {resource.type}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-safe-muted text-sm">{resource.source}</span>
                  <div className="flex gap-2">
                    {resource.downloadable && (
                      <button className="flex items-center gap-1 px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700">
                        <Download className="h-3 w-3" />
                        Download
                      </button>
                    )}
                    {resource.url && (
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        <ExternalLink className="h-3 w-3" />
                        View
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12 text-safe-muted">
              <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No resources found</h3>
              <p>Try adjusting your search terms or category filter.</p>
            </div>
          )}
        </div>

        {/* Additional Resources Section */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-safe">Key Organizations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-medium text-safe mb-2">Democracy at Work Institute</h3>
              <p className="text-safe-muted text-sm mb-3">
                Leading organization for worker cooperative development, providing training, resources, and technical assistance.
              </p>
              <a
                href="https://institute.coop/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-safe-accent hover:text-safe-accent dark:hover:text-blue-200 text-sm"
              >
                Visit Website →
              </a>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-medium text-safe mb-2">US Federation of Worker Cooperatives</h3>
              <p className="text-safe-muted text-sm mb-3">
                National grassroots membership organization representing worker cooperative businesses and organizations.
              </p>
              <a
                href="https://www.usworker.coop/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-safe-accent hover:text-safe-accent dark:hover:text-blue-200 text-sm"
              >
                Visit Website →
              </a>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-medium text-safe mb-2">International Cooperative Alliance</h3>
              <p className="text-safe-muted text-sm mb-3">
                Global organization representing cooperatives worldwide, promoting cooperative principles and values.
              </p>
              <a
                href="https://www.ica.coop/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-safe-accent hover:text-safe-accent dark:hover:text-blue-200 text-sm"
              >
                Visit Website →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
