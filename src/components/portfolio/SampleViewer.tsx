'use client'

import { PortfolioItem } from '../../data/portfolioData';

interface SampleViewerProps {
  item: PortfolioItem;
  isOpen: boolean;
  onClose: () => void;
}

export default function SampleViewer({ item, isOpen, onClose }: SampleViewerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className={`px-6 py-4 text-white bg-gradient-to-r ${
          item.color.from === 'blue-500' ? 'from-blue-500 to-indigo-600' :
          item.color.from === 'purple-500' ? 'from-purple-500 to-pink-600' :
          item.color.from === 'green-500' ? 'from-green-500 to-emerald-600' :
          item.color.from === 'orange-500' ? 'from-orange-500 to-red-600' :
          item.color.from === 'teal-500' ? 'from-teal-500 to-cyan-600' :
          item.color.from === 'emerald-500' ? 'from-emerald-500 to-green-600' :
          item.color.from === 'slate-500' ? 'from-slate-500 to-gray-600' :
          item.color.from === 'red-500' ? 'from-red-500 to-pink-600' :
          item.color.from === 'yellow-500' ? 'from-yellow-500 to-orange-600' :
          'from-indigo-500 to-purple-600'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{item.title}</h2>
              <p className="text-blue-100 opacity-90">{item.subtitle}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
              aria-label="Close sample viewer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          {/* Overview */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Project Overview</h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
              {item.sampleContent.excerpt}
            </p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-3 py-1 text-sm rounded-full ${
                    item.color.accent === 'indigo' ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200' :
                    item.color.accent === 'purple' ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200' :
                    item.color.accent === 'green' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                    item.color.accent === 'orange' ? 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200' :
                    item.color.accent === 'teal' ? 'bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200' :
                    item.color.accent === 'emerald' ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200' :
                    item.color.accent === 'slate' ? 'bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200' :
                    item.color.accent === 'red' ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' :
                    item.color.accent === 'yellow' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                    'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Project Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{item.pages}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Pages</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{item.year}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Year</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{item.category}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Type</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">10/10</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Quality</div>
              </div>
            </div>
          </div>

          {/* Key Highlights */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Key Features & Highlights</h3>
            <div className="grid gap-3">
              {item.sampleContent.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className={`w-6 h-6 rounded-full bg-${item.color.accent}-500 flex-shrink-0 flex items-center justify-center mt-0.5`}>
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{highlight}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Metrics */}
          {item.sampleContent.metrics && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Project Impact & Results</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {item.sampleContent.metrics.map((metric, index) => (
                  <div key={index} className={`text-center p-4 bg-gradient-to-br from-${item.color.from} to-${item.color.to} text-white rounded-lg`}>
                    <div className="text-2xl font-bold mb-1">{metric.value}</div>
                    <div className="text-sm opacity-90">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sample Content Preview */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Sample Content Preview</h3>
            <div className="border-l-4 border-indigo-500 pl-4 py-2 bg-gray-50 dark:bg-gray-700 rounded-r-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Extract from: {item.title}</div>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 italic">
                  &ldquo;{item.sampleContent.excerpt}&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Interested in Similar Work?
            </h4>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              See how we can create exceptional documentation for your project.
            </p>
            <button
              onClick={onClose}
              className={`bg-gradient-to-r from-${item.color.from} to-${item.color.to} text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
