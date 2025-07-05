// Leveraging Proven Design Patterns - Standing on Giants' Shoulders
const navigationItems = [
  // ...existing navigation items
  {
    name: 'Translation Services',
    href: '/translation-services',
    description: 'Professional translation across 80+ languages',
    subItems: [
      {
        name: 'All Translation Services',
        href: '/translation-services',
        description: 'Comprehensive multilingual solutions'
      },
      {
        name: 'Get Quote',
        href: '/translation-quote',
        description: 'Instant pricing calculator'
      },
      {
        name: 'Business Translation',
        href: '/translation-services#business',
        description: 'Corporate documents & materials'
      },
      {
        name: 'Legal Translation',
        href: '/translation-services#legal',
        description: 'Certified legal documentation'
      },
      {
        name: 'Medical Translation',
        href: '/translation-services#medical',
        description: 'Healthcare & pharmaceutical expertise'
      },
      {
        name: 'Technical Translation',
        href: '/translation-services#technical',
        description: 'Engineering & technical manuals'
      }
    ]
  }
  // ...other navigation items
];

// Battle-Tested Service Card - Inspired by Stripe, Linear, and Vercel
export const TranslationServiceCard = () => (
  <div className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-700">
    
    {/* Header - Stripe-inspired clean layout */}
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center space-x-3">
        {/* Icon - GitHub/Linear style */}
        <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">Translation Services</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">80+ languages available</p>
        </div>
      </div>
      
      {/* Badge - Vercel-style */}
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
        Popular
      </span>
    </div>

    {/* Description - Optimized for scanning */}
    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
      Professional translation services with native speakers. Fast turnaround, 
      certified quality, and cultural accuracy guaranteed.
    </p>

    {/* Features - Simple, scannable list */}
    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 mb-6">
      <li className="flex items-center">
        <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Native speaker expertise
      </li>
      <li className="flex items-center">
        <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        24-48 hour delivery
      </li>
      <li className="flex items-center">
        <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Quality assurance included
      </li>
    </ul>

    {/* CTA Buttons - GitHub/Tailwind UI pattern */}
    <div className="flex space-x-3">
      <a
        href="/translation-services"
        className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-center py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-700 dark:hover:bg-gray-100 transition-colors"
      >
        View all services
      </a>
      <a
        href="/translation-quote"
        className="flex-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-center py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        Get quote
      </a>
    </div>

    {/* Footer - Subtle trust indicators */}
    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span className="flex items-center">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
          Available now
        </span>
        <span>ISO certified</span>
      </div>
    </div>
  </div>
);
