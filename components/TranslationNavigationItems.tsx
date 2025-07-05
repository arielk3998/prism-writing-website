// Advanced Navigation Structure with Enhanced UX
const navigationItems = [
  // ...existing navigation items
  {
    name: 'Translation Services',
    href: '/translation-services',
    description: 'Global linguistic solutions across 80+ languages',
    icon: '🌐',
    gradient: 'from-blue-600 via-purple-600 to-indigo-700',
    subItems: [
      {
        name: 'All Translation Services',
        href: '/translation-services',
        description: 'Comprehensive multilingual solutions',
        icon: '📚',
        color: 'text-blue-600'
      },
      {
        name: 'Get Instant Quote',
        href: '/translation-quote',
        description: 'AI-powered pricing in seconds',
        icon: '⚡',
        color: 'text-purple-600'
      },
      {
        name: 'Business Translation',
        href: '/translation-services#business',
        description: 'Corporate & commercial documents',
        icon: '💼',
        color: 'text-emerald-600'
      },
      {
        name: 'Legal Translation',
        href: '/translation-services#legal',
        description: 'Certified legal documentation',
        icon: '⚖️',
        color: 'text-amber-600'
      },
      {
        name: 'Medical Translation',
        href: '/translation-services#medical',
        description: 'Healthcare & pharmaceutical expertise',
        icon: '🏥',
        color: 'text-red-600'
      },
      {
        name: 'Technical Translation',
        href: '/translation-services#technical',
        description: 'Engineering & technical manuals',
        icon: '⚙️',
        color: 'text-slate-600'
      }
    ]
  }
  // ...other navigation items
];

// Masterpiece Translation Service Card - A Work of Digital Art
export const TranslationServiceCard = () => (
  <div className="group relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-950 dark:to-purple-950 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 backdrop-blur-sm transition-all duration-700 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-300/50 dark:hover:border-blue-500/50 hover:-translate-y-1">
    
    {/* Animated Background Elements */}
    <div className="absolute inset-0 opacity-40 dark:opacity-20">
      <div className="absolute top-0 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
      <div className="absolute bottom-0 -left-4 w-32 h-32 bg-gradient-to-tr from-purple-400 to-pink-400 rounded-full blur-xl opacity-15 group-hover:opacity-30 transition-opacity duration-700"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-blue-300 to-purple-300 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-700"></div>
    </div>

    {/* Content Container */}
    <div className="relative z-10 p-8">
      
      {/* Header Section with Enhanced Visual Hierarchy */}
      <div className="flex items-start space-x-4 mb-6">
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-xl group-hover:shadow-blue-500/30 transition-all duration-500 group-hover:scale-110">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
            <span className="text-white text-2xl relative z-10 filter drop-shadow-sm">🌍</span>
          </div>
          
          {/* Floating Animation Ring */}
          <div className="absolute -inset-2 border-2 border-blue-200 dark:border-blue-400 rounded-2xl opacity-0 group-hover:opacity-40 transition-all duration-700 group-hover:scale-125 group-hover:rotate-180"></div>
        </div>
        
        <div className="flex-1 space-y-2">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-purple-700 dark:from-slate-100 dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent leading-tight">
            Translation Services
          </h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 tracking-wide">GLOBAL REACH</span>
          </div>
        </div>
        
        {/* Premium Badge */}
        <div className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold rounded-full shadow-lg">
          PRO
        </div>
      </div>

      {/* Enhanced Description */}
      <p className="text-slate-700 dark:text-slate-300 mb-8 text-lg leading-relaxed font-light">
        Transform your global communications with our 
        <span className="font-semibold text-blue-700 dark:text-blue-400"> precision-crafted translations</span>. 
        From boardroom presentations to technical documentation, we deliver 
        <span className="font-semibold text-purple-700 dark:text-purple-400"> culturally-intelligent solutions</span> 
        that preserve meaning and impact across every language barrier.
      </p>

      {/* Premium Feature List with Advanced Animations */}
      <div className="space-y-4 mb-8">
        {[
          { 
            text: "80+ languages with native expertise", 
            icon: "🌐", 
            delay: "delay-0",
            gradient: "from-blue-500 to-cyan-500"
          },
          { 
            text: "24-48 hour lightning delivery", 
            icon: "⚡", 
            delay: "delay-75",
            gradient: "from-purple-500 to-pink-500"
          },
          { 
            text: "Certified professional linguists", 
            icon: "🎓", 
            delay: "delay-150",
            gradient: "from-emerald-500 to-teal-500"
          },
          { 
            text: "AI-powered quality assurance", 
            icon: "🤖", 
            delay: "delay-225",
            gradient: "from-orange-500 to-red-500"
          }
        ].map((feature, index) => (
          <div 
            key={index}
            className={`group/item flex items-center space-x-4 p-3 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-600/50 hover:bg-white/80 dark:hover:bg-slate-700/80 hover:border-slate-300 dark:hover:border-slate-500 transition-all duration-500 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 ${feature.delay} hover:-translate-y-0.5`}
          >
            <div className={`relative w-8 h-8 bg-gradient-to-br ${feature.gradient} rounded-lg flex items-center justify-center shadow-md group-hover/item:shadow-lg group-hover/item:scale-110 transition-all duration-300`}>
              <span className="text-white text-sm filter drop-shadow-sm">{feature.icon}</span>
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-lg opacity-0 group-hover/item:opacity-30 transition-opacity duration-300`}></div>
            </div>
            
            <span className="flex-1 text-slate-800 dark:text-slate-200 font-medium group-hover/item:text-slate-900 dark:group-hover/item:text-slate-100 transition-colors duration-300">
              {feature.text}
            </span>
            
            {/* Hover Arrow */}
            <div className="w-5 h-5 text-slate-400 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all duration-300">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Premium CTA Buttons with Advanced Interactions */}
      <div className="grid grid-cols-2 gap-4">
        <a
          href="/translation-services"
          className="group/btn relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white text-center py-4 px-6 rounded-xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-500 hover:-translate-y-0.5 hover:scale-[1.02]"
        >
          {/* Button Background Animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
          
          {/* Button Content */}
          <div className="relative z-10 flex items-center justify-center space-x-2">
            <span>Explore Services</span>
            <div className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
          
          {/* Shine Effect */}
          <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 group-hover/btn:translate-x-full transition-all duration-700"></div>
        </a>

        <a
          href="/translation-quote"
          className="group/btn-alt relative overflow-hidden bg-white dark:bg-slate-800 border-2 border-blue-200 dark:border-blue-400 text-blue-700 dark:text-blue-300 text-center py-4 px-6 rounded-xl font-semibold hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:border-blue-400 dark:hover:border-blue-300 transition-all duration-500 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20"
        >
          <div className="relative z-10 flex items-center justify-center space-x-2">
            <div className="w-4 h-4">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span>Get Instant Quote</span>
          </div>
          
          {/* Subtle Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 opacity-0 group-hover/btn-alt:opacity-50 transition-opacity duration-500"></div>
        </a>
      </div>

      {/* Subtle Bottom Accent */}
      <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-slate-700/60">
        <div className="flex items-center justify-center space-x-6 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span>Active 24/7</span>
          </div>
          <div className="w-px h-4 bg-slate-300 dark:bg-slate-600"></div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span>ISO Certified</span>
          </div>
        </div>
      </div>
    </div>

    {/* Floating Particles for Extra Magic */}
    <div className="absolute top-4 right-4 w-1 h-1 bg-blue-400 rounded-full opacity-60 animate-ping"></div>
    <div className="absolute bottom-8 left-6 w-1 h-1 bg-purple-400 rounded-full opacity-40 animate-ping" style={{animationDelay: '1s'}}></div>
    <div className="absolute top-1/3 right-1/4 w-0.5 h-0.5 bg-indigo-400 rounded-full opacity-50 animate-ping" style={{animationDelay: '2s'}}></div>
  </div>
);
