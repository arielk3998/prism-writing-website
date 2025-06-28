'use client'

import { useState } from 'react';
import Navigation from '../../components/layout/Navigation';
import EnhancedFooter from '../../components/layout/EnhancedFooter';
import PortfolioCard from '../../components/portfolio/PortfolioCard';
import SampleViewer from '../../components/portfolio/SampleViewer';
import { portfolioItems, PortfolioItem } from '../../data/portfolioData';

export default function Portfolio() {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const handleViewSample = (item: PortfolioItem) => {
    setSelectedItem(item);
    setIsViewerOpen(true);
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Navigation currentPage="/portfolio" />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our Portfolio
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Explore our collection of high-quality technical documentation across various industries. 
            Each sample demonstrates our commitment to clarity, usability, and professional excellence.
          </p>
          <div className="flex justify-center items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>{portfolioItems.length} Premium Samples</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>10/10 Quality Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Interactive Previews</span>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Filter/Category Info */}
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Professional Documentation Samples
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Each sample showcases our expertise in creating user-focused documentation that drives results. 
              Click &quot;View Sample&quot; to explore detailed project information and see our methodology in action.
            </p>
          </div>

          {/* Portfolio Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item) => (
              <PortfolioCard
                key={item.id}
                item={item}
                onViewSample={() => handleViewSample(item)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Document Types Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Document Types We Handle
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Text Documents</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">DOC, DOCX, PDF, TXT, RTF, ODT</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Spreadsheets</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">XLS, XLSX, CSV, ODS</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 002 2h1a2 2 0 002-2V7a2 2 0 00-2-2H5zM5 15a2 2 0 00-2 2v3a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H5zM16 5a2 2 0 00-2 2v3a2 2 0 002 2h1a2 2 0 002-2V7a2 2 0 00-2-2h-1zM16 15a2 2 0 00-2 2v3a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2h-1z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">CAD Files</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">DWG, DXF, STEP, IGES, STL</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Media Files</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">PNG, JPG, SVG, MP4, presentations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Create Something Amazing?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Let&apos;s discuss how we can help you create documentation that your users will actually love to use.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact"
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Start Your Project
              </a>
              <a 
                href="/contact"
                className="border-2 border-indigo-500 text-indigo-600 dark:text-indigo-400 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
              >
                Schedule Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <EnhancedFooter />

      {/* Sample Viewer Modal */}
      {selectedItem && (
        <SampleViewer
          item={selectedItem}
          isOpen={isViewerOpen}
          onClose={handleCloseViewer}
        />
      )}
    </div>
  );
}
