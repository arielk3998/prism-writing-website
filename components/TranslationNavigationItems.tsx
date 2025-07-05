// Add this to your main navigation component

const navigationItems = [
  // ...existing navigation items
  {
    name: 'Translation Services',
    href: '/translation-services',
    description: 'Professional translation for 80+ languages',
    subItems: [
      {
        name: 'All Translation Services',
        href: '/translation-services',
        description: 'Comprehensive translation solutions'
      },
      {
        name: 'Get Quote',
        href: '/translation-quote',
        description: 'Instant pricing and quotes'
      },
      {
        name: 'Business Translation',
        href: '/translation-services#business',
        description: 'Corporate documents and materials'
      },
      {
        name: 'Legal Translation',
        href: '/translation-services#legal',
        description: 'Certified legal document translation'
      },
      {
        name: 'Medical Translation',
        href: '/translation-services#medical',
        description: 'Specialized medical and pharmaceutical'
      },
      {
        name: 'Technical Translation',
        href: '/translation-services#technical',
        description: 'Technical documentation and manuals'
      }
    ]
  }
  // ...other navigation items
];

// Quick translation service card for homepage
export const TranslationServiceCard = () => (
  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
    <div className="flex items-center space-x-3 mb-4">
      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
        <span className="text-white text-xl">🌍</span>
      </div>
      <h3 className="text-xl font-semibold text-gray-900">Translation Services</h3>
    </div>
    <p className="text-gray-600 mb-4">
      Professional translation for every language in the world. From business documents 
      to technical manuals, we deliver precise, culturally-aware translations.
    </p>
    <div className="space-y-2 mb-4">
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
        <span>80+ languages supported</span>
      </div>
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
        <span>24-48 hour turnaround available</span>
      </div>
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
        <span>Certified professional translators</span>
      </div>
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
        <span>Try sample translations instantly</span>
      </div>
    </div>
    <div className="flex space-x-3">
      <a
        href="/translation-services"
        className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        Explore Services
      </a>
      <a
        href="/translation-quote"
        className="flex-1 border border-blue-600 text-blue-600 text-center py-2 px-4 rounded-lg font-medium hover:bg-blue-50 transition-colors"
      >
        Get Quote
      </a>
    </div>
  </div>
);
