// Top-Tier Website Design Inspiration: Apple + Stripe + Figma
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

// Apple-Inspired Clean Service Card with Stripe's Professional Touch
export const TranslationServiceCard = () => (
  <div className="relative bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
    
    {/* Header with clear hierarchy - Apple style */}
    <div className="px-8 pt-8 pb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          {/* Clean icon - Apple minimalism */}
          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold text-safe tracking-tight">
              Translation Services
            </h3>
            <p className="text-lg text-safe-muted mt-1">
              Professional. Fast. Accurate.
            </p>
          </div>
        </div>
        
        {/* Status badge - Subtle like Apple */}
        <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-safe-success text-sm font-medium rounded-full">
          Available
        </div>
      </div>

      {/* Clean description - Apple's clarity */}
      <p className="text-xl text-safe-muted leading-relaxed max-w-2xl">
        Connect with the world through expert translation. Our native speakers ensure 
        your message resonates across cultures with precision and clarity.
      </p>
    </div>

    {/* Feature grid - Stripe inspired layout */}
    <div className="px-8 pb-8">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-1">
          <div className="text-3xl font-bold text-safe">80+</div>
          <div className="text-sm text-safe-muted">Languages supported</div>
        </div>
        <div className="space-y-1">
          <div className="text-3xl font-bold text-safe">24hrs</div>
          <div className="text-sm text-safe-muted">Average delivery</div>
        </div>
        <div className="space-y-1">
          <div className="text-3xl font-bold text-safe">99.9%</div>
          <div className="text-sm text-safe-muted">Accuracy rate</div>
        </div>
        <div className="space-y-1">
          <div className="text-3xl font-bold text-safe">ISO</div>
          <div className="text-sm text-safe-muted">Certified quality</div>
        </div>
      </div>
    </div>

    {/* Key features - Clean list like Figma */}
    <div className="px-8 pb-8">
      <div className="space-y-4">
        {[
          'Native speaker expertise for authentic translations',
          'Quality assurance with multiple review stages',
          'Specialized knowledge across industries',
          'Secure handling of confidential documents'
        ].map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0"></div>
            <span className="text-base text-safe">{feature}</span>
          </div>
        ))}
      </div>
    </div>

    {/* CTA section - Apple button styling */}
    <div className="px-8 pb-8">
      <div className="flex space-x-4">
        <a
          href="/translation-services"
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-center py-4 px-6 rounded-xl font-semibold text-lg transition-colors duration-200"
        >
          Explore services
        </a>
        <a
          href="/translation-quote"
          className="flex-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-safe text-center py-4 px-6 rounded-xl font-semibold text-lg transition-colors duration-200"
        >
          Get quote
        </a>
      </div>
    </div>

    {/* Footer with trust signals - Stripe style */}
    <div className="border-t border-gray-100 dark:border-gray-800 px-8 py-6">
      <div className="flex items-center justify-between text-sm text-safe-muted">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span>Active 24/7</span>
        </div>
        <span>ISO 17100 Certified</span>
        <span>GDPR Compliant</span>
      </div>
    </div>
  </div>
);
