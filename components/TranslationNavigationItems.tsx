// Professional Navigation Structure - Clarity Over Spectacle
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

// Professional Translation Service Card - Form Follows Function
export const TranslationServiceCard = () => (
  <article className="relative bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow duration-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2">
    
    {/* Subtle accent line - purposeful, not decorative */}
    <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400"></div>

    <div className="p-6">
      
      {/* Clean header with proper hierarchy */}
      <header className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              Translation Services
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Professional • Certified • Reliable
            </p>
          </div>
        </div>
        
        {/* Clear value proposition */}
        <div className="text-right">
          <div className="text-lg font-bold text-slate-900 dark:text-slate-100">80+</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Languages</div>
        </div>
      </header>

      {/* Clear, scannable description */}
      <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
        Professional translation services that maintain accuracy, tone, and cultural context. 
        From business documents to technical manuals, we ensure your message resonates 
        across language barriers.
      </p>

      {/* Organized feature list - no visual noise */}
      <div className="space-y-3 mb-6">
        {[
          "Native speaker expertise across 80+ languages",
          "24-48 hour standard delivery timeline", 
          "Certified professional linguists and translators",
          "Quality assurance with multiple review stages"
        ].map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
            <span className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              {feature}
            </span>
          </div>
        ))}
      </div>

      {/* Clear, actionable CTAs */}
      <div className="grid grid-cols-2 gap-3">
        <a
          href="/translation-services"
          className="bg-blue-600 text-white text-center py-2.5 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-150"
        >
          View Services
        </a>
        <a
          href="/translation-quote"
          className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-center py-2.5 px-4 rounded-md font-medium hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-150"
        >
          Get Quote
        </a>
      </div>

      {/* Subtle credibility indicators */}
      <footer className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-center space-x-6 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center space-x-1">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            <span>Available 24/7</span>
          </span>
          <span>•</span>
          <span>ISO 17100 Certified</span>
        </div>
      </footer>
    </div>
  </article>
);
