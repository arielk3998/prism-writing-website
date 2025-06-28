import Navigation from '../../../components/layout/Navigation';
import EnhancedFooter from '../../../components/layout/EnhancedFooter';
import Link from 'next/link';
import { CTA_MESSAGES } from '../../../lib/constants';

export default function UserManualsService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Navigation currentPage="/services/user-manuals" />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              User Manual & Guide Services
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              User-friendly manuals and guides that actually help your customers succeed. 
              Transform complex products into intuitive experiences with clear, actionable documentation.
            </p>
          </div>

          {/* Value Proposition */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Documentation That Reduces Support Tickets
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Poor user documentation leads to frustrated customers and overwhelmed support teams. 
                Our user manuals empower customers to find answers quickly and use your product confidently.
              </p>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Task-oriented structure focused on user goals
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Screenshots, diagrams, and visual instructions
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Troubleshooting guides and FAQs
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Multi-format delivery (PDF, web, mobile-friendly)
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Types of User Documentation</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Quick Start Guides</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Get users up and running in minutes</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Feature Documentation</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Comprehensive guides for each feature</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Installation Guides</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Step-by-step setup instructions</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Video Tutorials</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Scripted content for video production</p>
                </div>
              </div>
            </div>
          </div>

          {/* Process Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Our User-Centered Process</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-xl">1</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">User Research</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  We interview your customers to understand their goals, pain points, and skill levels.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-xl">2</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Content Audit</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  We analyze your existing documentation and identify gaps and opportunities.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-xl">3</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Structure & Write</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  We create task-oriented content that matches how users actually work.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-xl">4</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">User Testing</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  We test documentation with real users to ensure it actually helps them succeed.
                </p>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Results You Can Measure</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">40%</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Fewer Support Tickets</div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Clear documentation reduces customer confusion and support burden</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">60%</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Faster Onboarding</div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Users get value from your product more quickly</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">85%</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">User Satisfaction</div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Customers feel more confident and successful</p>
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">User Manual Pricing</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Quick Start Guide</h3>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">$2,000</p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Essential tasks only</li>
                  <li>• 5-10 pages</li>
                  <li>• Basic screenshots</li>
                  <li>• 2 weeks delivery</li>
                </ul>
              </div>
              <div className="border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <div className="text-center mb-4">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">Most Popular</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Complete User Manual</h3>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">$8,000</p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Comprehensive feature coverage</li>
                  <li>• 20-50 pages</li>
                  <li>• Professional diagrams & screenshots</li>
                  <li>• Troubleshooting section</li>
                  <li>• 4-6 weeks delivery</li>
                </ul>
              </div>
              <div className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Documentation Suite</h3>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">Custom</p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Multiple user guides</li>
                  <li>• Video script writing</li>
                  <li>• Interactive tutorials</li>
                  <li>• User testing & optimization</li>
                  <li>• 8-12 weeks delivery</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Improve Your User Experience?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Let&apos;s create user documentation that actually helps your customers succeed and reduces your support burden.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition duration-300"
              >
                {CTA_MESSAGES.services.primary}
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                href="/portfolio" 
                className="inline-flex items-center bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition duration-300"
              >
                View User Manual Samples
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <EnhancedFooter />
    </div>
  );
}
