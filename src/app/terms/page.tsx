import { ModernNavigation } from '@/components/ui/ModernComponents';
import EnhancedFooter from '@/components/layout/EnhancedFooter';
import { DarkModeToggle } from '@/components/ui/DarkModeToggle';
import ScrollToTop from '@/components/ui/ScrollToTop';
import Link from 'next/link';

export default function Terms() {
  // Navigation items
  const navItems = [
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Resources', href: '/resources' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Modern Navigation */}
      <ModernNavigation
        logo={
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8">
              <svg viewBox="0 0 32 32" className="w-full h-full">
                <defs>
                  <linearGradient id="prismGradientTerms" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4f46e5" />
                    <stop offset="33%" stopColor="#0891b2" />
                    <stop offset="66%" stopColor="#059669" />
                    <stop offset="100%" stopColor="#dc2626" />
                  </linearGradient>
                </defs>
                <path d="M 6 10 L 16 8 L 16 20 L 6 22 Z" fill="url(#prismGradientTerms)" opacity="0.95"/>
                <line x1="16" y1="11" x2="24" y2="9" stroke="#4f46e5" strokeWidth="2" opacity="0.9"/>
                <line x1="16" y1="14" x2="26" y2="14" stroke="#0891b2" strokeWidth="2" opacity="0.9"/>
                <line x1="16" y1="17" x2="24" y2="19" stroke="#dc2626" strokeWidth="2" opacity="0.9"/>
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Prism Writing
            </span>
          </Link>
        }
        navItems={navItems}
        actions={
          <div className="flex items-center space-x-4">
            <DarkModeToggle />
            <Link href="/portal">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
                Portal
              </button>
            </Link>
          </div>
        }
      />

      {/* Main Content */}
      <main className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Terms of Service</h1>
              <p className="text-gray-600 dark:text-gray-300">
                <strong>Last updated:</strong> June 28, 2025
              </p>
            </div>

            {/* Terms Content */}
            <div className="prose dark:prose-invert max-w-none space-y-8">
              
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  By accessing and using Prism Writing Cooperative&apos;s services, website, or any related platforms, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. Description of Services</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Prism Writing Cooperative provides professional technical writing services including but not limited to:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 ml-4">
                  <li>API documentation and developer guides</li>
                  <li>User manuals and instructional content</li>
                  <li>Standard Operating Procedures (SOPs)</li>
                  <li>Compliance documentation</li>
                  <li>Training materials and tutorials</li>
                  <li>Content strategy and information architecture</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. User Responsibilities</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  When using our services, you agree to:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 ml-4">
                  <li>Provide accurate and complete information for project requirements</li>
                  <li>Respond to requests for feedback and clarification in a timely manner</li>
                  <li>Respect intellectual property rights and confidentiality agreements</li>
                  <li>Make payments according to agreed-upon terms and schedules</li>
                  <li>Use our services only for lawful purposes</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. Intellectual Property</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  <strong>Client Content:</strong> You retain ownership of all materials, information, and content you provide to us. You grant us a limited license to use this content solely for the purpose of completing your project.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  <strong>Deliverables:</strong> Upon full payment, you will own the final deliverables created specifically for your project. We retain the right to use general methodologies, processes, and non-confidential insights for future work.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  <strong>Portfolio Use:</strong> We may showcase completed work in our portfolio with your permission, ensuring confidential information is protected.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Payment Terms</h2>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 ml-4">
                  <li>Project quotes are valid for 30 days unless otherwise specified</li>
                  <li>50% deposit required before work begins on projects over $1,000</li>
                  <li>Payment terms are Net 15 unless otherwise agreed</li>
                  <li>Late payment fees of 1.5% per month may apply to overdue invoices</li>
                  <li>All prices are in USD unless otherwise specified</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Confidentiality</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We understand that you may share confidential information with us during the course of our work. We commit to:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 ml-4">
                  <li>Treating all client information as strictly confidential</li>
                  <li>Using information only for the purpose of completing your project</li>
                  <li>Not disclosing any confidential information to third parties</li>
                  <li>Securing all client data using industry-standard practices</li>
                  <li>Returning or destroying confidential materials upon project completion</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Project Scope and Revisions</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  <strong>Scope:</strong> Project deliverables and timelines will be clearly defined in our project agreement. Changes to scope may result in additional costs and timeline adjustments.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  <strong>Revisions:</strong> We include up to three rounds of revisions in our standard pricing. Additional revisions beyond the agreed scope will be billed at our standard hourly rate.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. Cancellation and Refunds</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  <strong>Client Cancellation:</strong> You may cancel a project at any time. You will be charged for work completed up to the cancellation date.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  <strong>Our Cancellation:</strong> We reserve the right to terminate services if payment terms are not met or if the working relationship becomes untenable.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  <strong>Refunds:</strong> Refunds will be considered on a case-by-case basis for work not yet completed.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">9. Limitation of Liability</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Our liability for any claim related to our services is limited to the total amount paid for the specific project. We are not liable for any indirect, incidental, or consequential damages.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">10. Dispute Resolution</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Any disputes will first be addressed through good-faith negotiation. If resolution cannot be reached, disputes will be settled through binding arbitration in accordance with the rules of the American Arbitration Association.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">11. Force Majeure</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We are not liable for delays or failure to perform due to circumstances beyond our reasonable control, including but not limited to natural disasters, government actions, or other unforeseeable events.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">12. Changes to Terms</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We reserve the right to modify these terms at any time. Updated terms will be posted on our website with a new effective date. Continued use of our services after changes constitutes acceptance of the new terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">13. Contact Information</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  If you have questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Prism Writing Cooperative</strong><br />
                    Email: legal@prismwriting.com<br />
                    Website: prismwriting.com<br />
                    Portal: prismwriting.com/portal
                  </p>
                </div>
              </section>

              <section className="border-t pt-6 mt-8">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  These terms are effective as of June 28, 2025. By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                </p>
              </section>

            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <EnhancedFooter />
      
      {/* Scroll to Top */}
      <ScrollToTop />
    </div>
  );
}
