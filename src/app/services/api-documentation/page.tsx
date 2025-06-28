import Navigation from '../../../components/layout/Navigation';
import EnhancedFooter from '../../../components/layout/EnhancedFooter';
import Link from 'next/link';
import { CTA_MESSAGES } from '../../../lib/constants';

export default function ApiDocumentationService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Navigation currentPage="/services/api-documentation" />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              API Documentation Services
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Clear, comprehensive API documentation that developers actually want to use. 
              We transform complex technical specifications into accessible, actionable guides.
            </p>
          </div>

          {/* Value Proposition */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Documentation That Drives Adoption
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Poor API documentation is the #1 reason developers abandon your platform. 
                Our technical writers specialize in creating documentation that not only explains 
                what your API does, but shows developers exactly how to succeed with it.
              </p>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Interactive examples that developers can test immediately
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Clear error handling and troubleshooting guides
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Code samples in multiple programming languages
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Comprehensive endpoint reference with auto-generated specs
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">What We Deliver</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-indigo-500 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Getting Started Guide</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Quick onboarding for new developers</p>
                </div>
                <div className="border-l-4 border-indigo-500 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Endpoint Documentation</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Complete API reference with examples</p>
                </div>
                <div className="border-l-4 border-indigo-500 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Authentication Guide</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Security implementation made simple</p>
                </div>
                <div className="border-l-4 border-indigo-500 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">SDKs & Libraries</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Documentation for wrapper libraries</p>
                </div>
              </div>
            </div>
          </div>

          {/* Process Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Our Process</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-indigo-100 dark:bg-indigo-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">API Analysis</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We dive deep into your API specifications, test endpoints, and understand your developer ecosystem.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-indigo-100 dark:bg-indigo-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Content Strategy</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We create a documentation structure that matches how developers actually work with your API.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-indigo-100 dark:bg-indigo-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Implementation</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We write, test, and refine documentation with real developers to ensure maximum usability.
                </p>
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">API Documentation Pricing</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Starter</h3>
                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">$2,500</p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Up to 10 endpoints</li>
                  <li>• Basic getting started guide</li>
                  <li>• Authentication documentation</li>
                  <li>• 2 weeks delivery</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-indigo-500">
                <div className="text-center mb-4">
                  <span className="bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-semibold">Most Popular</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Professional</h3>
                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">$7,500</p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Up to 50 endpoints</li>
                  <li>• Complete developer portal</li>
                  <li>• Interactive examples</li>
                  <li>• SDK documentation</li>
                  <li>• 4 weeks delivery</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Enterprise</h3>
                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">Custom</p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Unlimited endpoints</li>
                  <li>• Custom documentation platform</li>
                  <li>• Ongoing maintenance</li>
                  <li>• Training & support</li>
                  <li>• Flexible timeline</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Improve Your API Documentation?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss your API documentation needs and create documentation that developers love to use.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition duration-300"
              >
                {CTA_MESSAGES.services.primary}
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                href="/portfolio" 
                className="inline-flex items-center bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 border-2 border-indigo-600 dark:border-indigo-400 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-indigo-50 dark:hover:bg-gray-700 transition duration-300"
              >
                View API Documentation Samples
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
