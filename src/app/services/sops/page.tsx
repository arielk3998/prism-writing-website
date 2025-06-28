import Navigation from '../../../components/layout/Navigation';
import EnhancedFooter from '../../../components/layout/EnhancedFooter';
import Link from 'next/link';
import { CTA_MESSAGES } from '../../../lib/constants';

export default function SOPsService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Navigation currentPage="/services/sops" />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Standard Operating Procedures (SOPs)
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Clear, actionable SOPs that ensure consistency, compliance, and efficiency across your organization. 
              Transform tribal knowledge into documented best practices.
            </p>
          </div>

          {/* Value Proposition */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Documentation That Drives Consistency
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Inconsistent processes cost organizations thousands of hours and create compliance risks. 
                Our SOPs eliminate guesswork and ensure every team member can execute critical processes correctly, every time.
              </p>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Step-by-step procedures with visual aids and checklists
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Compliance frameworks and regulatory requirements
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Version control and change management processes
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Training materials and competency assessments
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Common SOP Types We Create</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Operational Procedures</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Daily workflows, quality control, safety protocols</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Technical Procedures</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Equipment operation, software deployment, troubleshooting</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Administrative Procedures</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">HR policies, procurement, document management</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Emergency Procedures</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Incident response, business continuity, crisis management</p>
                </div>
              </div>
            </div>
          </div>

          {/* Industries Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Industries We Serve</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Manufacturing</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Quality control, safety procedures, equipment maintenance</p>
              </div>
              <div className="text-center p-4">
                <div className="bg-green-100 dark:bg-green-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Healthcare</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Clinical protocols, compliance procedures, patient care</p>
              </div>
              <div className="text-center p-4">
                <div className="bg-purple-100 dark:bg-purple-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Technology</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Software deployment, security protocols, change management</p>
              </div>
              <div className="text-center p-4">
                <div className="bg-orange-100 dark:bg-orange-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Financial Services</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Compliance procedures, risk management, audit processes</p>
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">SOP Development Pricing</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Single SOP</h3>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">$1,500</p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• 1 standard operating procedure</li>
                  <li>• Process mapping & analysis</li>
                  <li>• Stakeholder interviews</li>
                  <li>• 1 round of revisions</li>
                  <li>• 2 weeks delivery</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-green-500">
                <div className="text-center mb-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">Best Value</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">SOP Package</h3>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">$6,000</p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• 5 related SOPs</li>
                  <li>• Process integration analysis</li>
                  <li>• Training materials included</li>
                  <li>• Change management guide</li>
                  <li>• 6 weeks delivery</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Enterprise</h3>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">Custom</p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li>• Comprehensive SOP library</li>
                  <li>• Process optimization consulting</li>
                  <li>• Ongoing maintenance & updates</li>
                  <li>• Staff training & certification</li>
                  <li>• Flexible timeline</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Standardize Your Operations?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss your process documentation needs and create SOPs that drive consistency and efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition duration-300"
              >
                {CTA_MESSAGES.services.primary}
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                href="/portfolio" 
                className="inline-flex items-center bg-white dark:bg-gray-800 text-green-600 dark:text-green-400 border-2 border-green-600 dark:border-green-400 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-green-50 dark:hover:bg-gray-700 transition duration-300"
              >
                View SOP Samples
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
