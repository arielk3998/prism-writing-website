/**
 * Portfolio Page - Modern Refactored Version
 * 
 * A stunning portfolio showcase using modern design patterns with interactive
 * filtering, smooth animations, and enhanced visual hierarchy.
 * 
 * @module PortfolioPage
 * @version 3.0.0
 * @author Prism Writing Cooperative
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  ModernButton,
  ModernNavigation,
} from '../../components/ui/ModernComponents';
import { EnhancedPortfolioCard, TechIllustration } from '../../components/ui/EnhancedGraphics';
import EnhancedFooter from '../../components/layout/EnhancedFooter';
import SampleViewer from '../../components/portfolio/SampleViewer';
import { portfolioItems, PortfolioItem } from '../../data/portfolioData';

export default function Portfolio() {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const searchParams = useSearchParams();

  // Handle URL parameters for filtering
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setActiveFilter(categoryParam);
    }
  }, [searchParams]);

  // Navigation items
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio', isActive: true },
    { label: 'Resources', href: '/resources' },
    { label: 'About', href: '/about' },
  ];

  // Map portfolio categories to our enhanced graphics categories
  const getCategoryKey = (category: string): keyof typeof import('../../components/ui/EnhancedGraphics').CategoryBackgrounds => {
    const mapping: Record<string, keyof typeof import('../../components/ui/EnhancedGraphics').CategoryBackgrounds> = {
      'API Documentation': 'api-docs',
      'SDK Documentation': 'api-docs',
      'User Guide': 'user-manual',
      'Installation Guide': 'user-manual',
      'Process Documentation': 'sop',
      'Regulatory Documentation': 'compliance',
      'Technical Specifications': 'sop',
      'Change Management': 'sop',
      'Training Materials': 'training',
      'Research Documentation': 'research'
    };
    return mapping[category] || 'user-manual';
  };

  // Filter categories with enhanced icons
  const filterCategories = [
    { 
      id: 'all', 
      label: 'All Projects', 
      icon: <TechIllustration type="documentation" size="small" className="w-5 h-5" />, 
      count: portfolioItems.length 
    },
    { 
      id: 'API Documentation', 
      label: 'API & SDK', 
      icon: <TechIllustration type="api" size="small" className="w-5 h-5" />, 
      count: portfolioItems.filter(item => ['API Documentation', 'SDK Documentation'].includes(item.category)).length 
    },
    { 
      id: 'User Guide', 
      label: 'User Guides', 
      icon: <TechIllustration type="documentation" size="small" className="w-5 h-5" />, 
      count: portfolioItems.filter(item => ['User Guide', 'Installation Guide'].includes(item.category)).length 
    },
    { 
      id: 'Process Documentation', 
      label: 'Process & SOPs', 
      icon: <TechIllustration type="security" size="small" className="w-5 h-5" />, 
      count: portfolioItems.filter(item => ['Process Documentation', 'Technical Specifications', 'Change Management'].includes(item.category)).length 
    },
    { 
      id: 'Training Materials', 
      label: 'Training', 
      icon: <TechIllustration type="training" size="small" className="w-5 h-5" />, 
      count: portfolioItems.filter(item => item.category === 'Training Materials').length 
    },
    { 
      id: 'Research Documentation', 
      label: 'Research', 
      icon: <TechIllustration type="research" size="small" className="w-5 h-5" />, 
      count: portfolioItems.filter(item => ['Research Documentation', 'Regulatory Documentation'].includes(item.category)).length 
    },
  ];

  // Filter portfolio items
  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => {
        if (activeFilter === 'API Documentation') return ['API Documentation', 'SDK Documentation'].includes(item.category);
        if (activeFilter === 'User Guide') return ['User Guide', 'Installation Guide'].includes(item.category);
        if (activeFilter === 'Process Documentation') return ['Process Documentation', 'Technical Specifications', 'Change Management'].includes(item.category);
        if (activeFilter === 'Research Documentation') return ['Research Documentation', 'Regulatory Documentation'].includes(item.category);
        return item.category === activeFilter;
      });

  const handleViewSample = (item: PortfolioItem) => {
    setSelectedItem(item);
    setIsViewerOpen(true);
  };

  const handleDownloadSample = async (sampleId: string) => {
    try {
      // Call the download API
      const response = await fetch(`/api/download-sample/${sampleId}`);
      
      if (response.ok) {
        // Get the filename from the response headers or use a default
        const contentDisposition = response.headers.get('Content-Disposition');
        let filename = 'sample.pdf';
        if (contentDisposition) {
          const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
          if (filenameMatch) {
            filename = filenameMatch[1];
          }
        }

        // Create a blob and download the file
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else if (response.status === 501) {
        // Sample not yet implemented - show demo message
        const item = portfolioItems.find(item => item.downloadable?.sampleId === sampleId);
        const filename = item?.downloadable?.filename || 'sample.pdf';
        alert(`Sample download for "${filename}" is being prepared. This is a demo - in production, a watermarked PDF would be downloaded.`);
      } else {
        throw new Error('Download failed');
      }
    } catch (error) {
      console.error('Download error:', error);
      alert('Sorry, there was an error downloading the sample. Please try again later.');
    }
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
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

      {/* Hero Section with Enhanced Graphics */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          {/* Floating geometric shapes */}
          <motion.div
            className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl opacity-10"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 10, 0] 
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full opacity-10"
            animate={{ 
              y: [0, 15, 0],
              x: [0, 10, 0] 
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1 
            }}
          />
          <motion.div
            className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg opacity-10"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, -15, 0] 
            }}
            transition={{ 
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2 
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <TechIllustration type="documentation" size="large" className="mx-auto mb-6" />
          </motion.div>
          
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Our Portfolio
            </span>
          </motion.h1>
          
          <motion.p
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore our collection of <span className="font-semibold text-blue-600">high-quality technical documentation</span> across various industries. 
            Each sample demonstrates our commitment to <span className="font-semibold text-purple-600">clarity, usability, and professional excellence</span>.
          </motion.p>
          
          {/* Portfolio Stats */}
          <motion.div
            className="flex justify-center items-center gap-8 text-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="font-medium text-gray-700">{portfolioItems.length} Premium Samples</span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="font-medium text-gray-700">Interactive Previews</span>
            </div>
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="font-medium text-gray-700">Industry Leaders</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {filterCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.icon}
                <span>{category.label}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  activeFilter === category.id 
                    ? 'bg-white/20 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {category.count}
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section id="portfolio-grid" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Anchor sections for specific service types */}
          <div id="api-docs" className="scroll-mt-32"></div>
          <div id="process-docs" className="scroll-mt-32"></div>
          <div id="user-guides" className="scroll-mt-32"></div>
          <div id="training" className="scroll-mt-32"></div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <EnhancedPortfolioCard
                    title={item.title}
                    description={item.description}
                    category={getCategoryKey(item.category)}
                    tags={item.tags}
                    pages={item.pages}
                    year={item.year}
                    onViewSample={() => handleViewSample(item)}
                    downloadable={item.downloadable}
                    onDownload={handleDownloadSample}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredItems.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No samples found</h3>
              <p className="text-gray-600">Try selecting a different category to see more samples.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Impressed by What You See?
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              These samples represent just a fraction of our work. Let&apos;s create something 
              equally impressive for your project, tailored to your specific needs and goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <ModernButton variant="primary" size="lg">
                  Start Your Project
                </ModernButton>
              </Link>
              <Link href="/services">
                <ModernButton variant="outline" size="lg">
                  View Our Services
                </ModernButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sample Viewer Modal */}
      <SampleViewer
        item={selectedItem}
        isOpen={isViewerOpen}
        onClose={handleCloseViewer}
      />

      {/* Enhanced Footer */}
      <EnhancedFooter />
    </div>
  );
}
