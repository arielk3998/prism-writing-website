/**
 * Member Resources Component
 * 
 * Comprehensive resource sharing system for Prism Writing Cooperative members.
 * Includes templates, guides, tools, and training materials.
 */

'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Download, 
  ExternalLink, 
  Star, 
  BookOpen,
  FileText,
  Wrench,
  GraduationCap,
  Database,
  Calendar,
  User,
  Grid,
  List
} from 'lucide-react';
import { memberResources, resourceCategories, searchResources, getFeaturedResources, Resource } from '../../data/memberResources';

interface MemberResourcesProps {
  userRole?: 'admin' | 'member' | 'client';
}

export default function MemberResources({ userRole = 'member' }: MemberResourcesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  // Filter resources based on access level and search criteria
  const filteredResources = useMemo(() => {
    let resources = memberResources.filter(resource => {
      // Filter by access level
      if (userRole === 'client' && resource.accessLevel !== 'public') return false;
      if (userRole === 'member' && resource.accessLevel === 'admin') return false;
      
      return true;
    });

    // Apply search filter
    if (searchTerm) {
      resources = searchResources(searchTerm).filter(resource => resources.includes(resource));
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      resources = resources.filter(resource => resource.category === selectedCategory);
    }

    // Apply featured filter
    if (showFeaturedOnly) {
      resources = resources.filter(resource => resource.featured);
    }

    return resources;
  }, [searchTerm, selectedCategory, showFeaturedOnly, userRole]);

  const featuredResources = getFeaturedResources().filter(resource => {
    if (userRole === 'client' && resource.accessLevel !== 'public') return false;
    if (userRole === 'member' && resource.accessLevel === 'admin') return false;
    return true;
  });

  const handleResourceClick = (resource: Resource) => {
    if (resource.downloadUrl) {
      // Handle download
      const link = document.createElement('a');
      link.href = resource.downloadUrl;
      link.download = resource.title;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Open in new tab
      window.open(resource.url, '_blank');
    }
  };

  const getCategoryIcon = (category: string) => {
    const iconMap = {
      template: FileText,
      guide: BookOpen,
      tool: Wrench,
      reference: Database,
      training: GraduationCap
    };
    return iconMap[category as keyof typeof iconMap] || FileText;
  };

  const ResourceCard = ({ resource }: { resource: Resource }) => {
    const Icon = getCategoryIcon(resource.category);
    
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-6 cursor-pointer border border-gray-200 dark:border-gray-700"
        onClick={() => handleResourceClick(resource)}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">
                {resource.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                {resource.category}
              </p>
            </div>
          </div>
          {resource.featured && (
            <Star className="w-5 h-5 text-yellow-500 fill-current" />
          )}
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {resource.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {resource.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
          {resource.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full">
              +{resource.tags.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span>{resource.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(resource.lastUpdated).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {resource.fileSize && (
              <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                {resource.fileSize}
              </span>
            )}
            {resource.downloadUrl ? (
              <Download className="w-4 h-4" />
            ) : (
              <ExternalLink className="w-4 h-4" />
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  const ResourceListItem = ({ resource }: { resource: Resource }) => {
    const Icon = getCategoryIcon(resource.category);
    
    return (
      <motion.div
        layout
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-4 cursor-pointer border border-gray-200 dark:border-gray-700"
        onClick={() => handleResourceClick(resource)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h3 className="font-medium text-gray-900 dark:text-white truncate">
                  {resource.title}
                </h3>
                {resource.featured && (
                  <Star className="w-4 h-4 text-yellow-500 fill-current flex-shrink-0" />
                )}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {resource.description}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="capitalize">{resource.category}</span>
            <span>{resource.author}</span>
            <span>{new Date(resource.lastUpdated).toLocaleDateString()}</span>
            {resource.fileSize && (
              <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">
                {resource.fileSize}
              </span>
            )}
            {resource.downloadUrl ? (
              <Download className="w-4 h-4" />
            ) : (
              <ExternalLink className="w-4 h-4" />
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Member Resources
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Access templates, guides, tools, and training materials to enhance your technical writing projects.
        </p>
      </div>

      {/* Featured Resources */}
      {featuredResources.length > 0 && !searchTerm && selectedCategory === 'all' && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Star className="w-5 h-5 text-yellow-500 mr-2" />
            Featured Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredResources.slice(0, 3).map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Categories</option>
              {resourceCategories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Featured Filter */}
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showFeaturedOnly}
                onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Featured only</span>
            </label>

            {/* View Mode */}
            <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' 
                  ? 'bg-white dark:bg-gray-600 shadow-sm' 
                  : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' 
                  ? 'bg-white dark:bg-gray-600 shadow-sm' 
                  : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4">
        <p className="text-gray-600 dark:text-gray-300">
          {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Resources Grid/List */}
      <AnimatePresence mode="wait">
        {filteredResources.length > 0 ? (
          <motion.div
            key={viewMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }
          >
            {filteredResources.map(resource => 
              viewMode === 'grid' ? (
                <ResourceCard key={resource.id} resource={resource} />
              ) : (
                <ResourceListItem key={resource.id} resource={resource} />
              )
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No resources found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search criteria or browse different categories.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
