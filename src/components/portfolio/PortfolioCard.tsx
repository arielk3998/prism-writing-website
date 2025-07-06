'use client'

import { PortfolioItem } from '../../data/portfolioData';

interface PortfolioCardProps {
  item: PortfolioItem;
  onViewSample: () => void;
}

export default function PortfolioCard({ item, onViewSample }: PortfolioCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Visual Header */}
      <div className={`h-48 flex items-center justify-center bg-gradient-to-br ${
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
        <div className="text-white text-center">
          <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
            <path d={item.icon} />
          </svg>
          <h3 className="text-lg font-semibold">{item.category}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h4 className="text-xl font-semibold text-safe mb-2">
          {item.title}
        </h4>
        <p className="text-safe-muted mb-4 text-sm leading-relaxed">
          {item.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {item.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className={`px-3 py-1 text-xs rounded-full ${
                item.color.accent === 'indigo' ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200' :
                item.color.accent === 'purple' ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200' :
                item.color.accent === 'green' ? 'bg-green-100 dark:bg-green-900 text-safe-success dark:text-green-200' :
                item.color.accent === 'orange' ? 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200' :
                item.color.accent === 'teal' ? 'bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200' :
                item.color.accent === 'emerald' ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200' :
                item.color.accent === 'slate' ? 'bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200' :
                item.color.accent === 'red' ? 'bg-red-100 dark:bg-red-900 text-safe-error dark:text-red-200' :
                item.color.accent === 'yellow' ? 'bg-yellow-100 dark:bg-yellow-900 text-safe-warning dark:text-yellow-200' :
                'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200'
              }`}
            >
              {tag}
            </span>
          ))}
          {item.tags.length > 3 && (
            <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-safe-muted text-xs rounded-full">
              +{item.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-safe-muted">
            {item.pages} pages • {item.year}
          </span>
          <button
            onClick={onViewSample}
            className="text-safe-accent hover:text-indigo-800 dark:hover:text-indigo-300 font-semibold text-sm transition-colors duration-200 group"
          >
            View Sample →
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
