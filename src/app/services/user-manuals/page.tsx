import Navigation from '../../../components/layout/Navigation';
import EnhancedFooter from '../../../components/layout/EnhancedFooter';
import Link from 'next/link';

export default function UserManuals() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation currentPage="/services/user-manuals" />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900 dark:to-blue-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              User Manual & Guide Creation
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Transform complex products into user-friendly experiences with comprehensive guides 
              that reduce support tickets and increase customer satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Types of Manuals */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Types of User Documentation
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Software User Guides",
                description: "Step-by-step guides for software applications, SaaS platforms, and digital tools.",
                icon: "💻",
                examples: ["Getting started guides", "Feature tutorials", "Admin guides", "Mobile app instructions"]
              },
              {
                title: "Product Manuals",
                description: "Comprehensive documentation for physical products and equipment.",
                icon: "📱",
                examples: ["Installation guides", "Operation procedures", "Maintenance instructions", "Troubleshooting"]
              },
              {
                title: "Training Materials",
                description: "Educational content designed for learning and skill development.",
                icon: "🎓",
                examples: ["Employee handbooks", "Course materials", "Certification guides", "Best practices"]
              },
              {
                title: "Quick Reference",
                description: "Concise guides for experienced users who need fast answers.",
                icon: "⚡",
                examples: ["Cheat sheets", "Command references", "Keyboard shortcuts", "FAQ compilations"]
              },
              {
                title: "Installation Guides",
                description: "Clear instructions for setup, configuration, and deployment.",
                icon: "⚙️",
                examples: ["System setup", "Software installation", "Hardware assembly", "Network configuration"]
              },
              {
                title: "Troubleshooting Guides",
                description: "Problem-solving documentation that helps users resolve issues independently.",
                icon: "🔧",
                examples: ["Error code references", "Diagnostic procedures", "Common problems", "Solution workflows"]
              }
            ].map((type, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="text-3xl mb-4">{type.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {type.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {type.description}
                </p>
                <div className="space-y-2">
                  {type.examples.map((example, exampleIndex) => (
                    <div key={exampleIndex} className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">{example}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Our User-Centered Approach
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-8">
                {[
                  {
                    title: "User Research",
                    description: "We identify your users' goals, skill levels, and context of use to create targeted documentation."
                  },
                  {
                    title: "Task-Oriented Structure",
                    description: "We organize content around what users want to accomplish, not how your product is built."
                  },
                  {
                    title: "Progressive Disclosure",
                    description: "We layer information complexity, starting simple and adding detail as needed."
                  },
                  {
                    title: "Visual Communication",
                    description: "We use screenshots, diagrams, and videos to complement written instructions."
                  }
                ].map((approach, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-600 dark:bg-purple-500 text-white rounded-full flex items-center justify-center mr-4 text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {approach.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {approach.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                User Manual Best Practices
              </h3>
              <ul className="space-y-4">
                {[
                  "Start with the user's goal, not product features",
                  "Use clear, actionable language with active voice",
                  "Include visual aids for complex procedures",
                  "Test instructions with real users",
                  "Organize content logically with clear navigation",
                  "Provide multiple learning styles (text, visual, video)",
                  "Include troubleshooting for common issues",
                  "Make content searchable and accessible"
                ].map((practice, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">{practice}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            What You Receive
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Written Guides",
                description: "Comprehensive manuals in your preferred format (PDF, HTML, etc.)",
                icon: "📖"
              },
              {
                title: "Visual Assets",
                description: "Screenshots, diagrams, flowcharts, and annotated images",
                icon: "🎨"
              },
              {
                title: "Video Tutorials",
                description: "Screen recordings and instructional videos for complex procedures",
                icon: "🎥"
              },
              {
                title: "Template Library",
                description: "Reusable templates for future documentation needs",
                icon: "📋"
              },
              {
                title: "Search Optimization",
                description: "Content structured for easy searching and navigation",
                icon: "🔍"
              },
              {
                title: "Accessibility Compliance",
                description: "Documentation that meets WCAG accessibility standards",
                icon: "♿"
              },
              {
                title: "Multi-Format Output",
                description: "Print-ready PDFs, responsive web pages, and mobile-friendly formats",
                icon: "📱"
              },
              {
                title: "Style Guide",
                description: "Consistent formatting and writing standards for your brand",
                icon: "✏️"
              }
            ].map((deliverable, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
                <div className="text-3xl mb-4">{deliverable.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {deliverable.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {deliverable.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-purple-50 dark:bg-purple-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Results You Can Expect
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                metric: "50%",
                result: "Reduction in Support Tickets",
                description: "Clear documentation empowers users to solve problems independently."
              },
              {
                metric: "25%",
                result: "Increase in User Satisfaction",
                description: "Users appreciate comprehensive, easy-to-follow documentation."
              },
              {
                metric: "40%",
                result: "Faster User Onboarding",
                description: "Well-structured guides help new users become productive quickly."
              },
              {
                metric: "60%",
                result: "Improved Feature Adoption",
                description: "Users discover and use more features when they're properly documented."
              },
              {
                metric: "30%",
                result: "Reduced Training Costs",
                description: "Self-service documentation reduces the need for one-on-one training."
              },
              {
                metric: "35%",
                result: "Lower Churn Rate",
                description: "Users who understand your product are more likely to continue using it."
              }
            ].map((result, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  {result.metric}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {result.result}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {result.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-purple-600 dark:bg-purple-700">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Improve Your User Experience?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Let us create user documentation that reduces support burden and increases customer satisfaction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="inline-flex items-center bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition duration-300"
            >
              Start Your User Manual Project
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link 
              href="/portfolio"
              className="inline-flex items-center border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 rounded-lg font-semibold text-lg transition duration-300"
            >
              View Sample Work
            </Link>
          </div>
        </div>
      </section>

      <EnhancedFooter />
    </div>
  );
}
