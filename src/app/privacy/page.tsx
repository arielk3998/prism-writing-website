import { ModernNavigation } from '@/components/ui/ModernComponents';
import EnhancedFooter from '@/components/layout/EnhancedFooter';
import { DarkModeToggle } from '@/components/ui/DarkModeToggle';
import ScrollToTop from '@/components/ui/ScrollToTop';
import Link from 'next/link';

export default function Privacy() {
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
                  <linearGradient id="prismGradientPrivacy" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4f46e5" />
                    <stop offset="33%" stopColor="#0891b2" />
                    <stop offset="66%" stopColor="#059669" />
                    <stop offset="100%" stopColor="#dc2626" />
                  </linearGradient>
                </defs>
                <path d="M 6 10 L 16 8 L 16 20 L 6 22 Z" fill="url(#prismGradientPrivacy)" opacity="0.95"/>
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
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Privacy Policy</h1>
              <p className="text-gray-600 dark:text-gray-300">
                <strong>Last updated:</strong> June 28, 2025
              </p>
            </div>

            {/* Privacy Content */}
            <div className="prose dark:prose-invert max-w-none space-y-8">
              
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Introduction</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Prism Writing Cooperative is committed to protecting your privacy and maintaining the confidentiality of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Information We Collect</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Personal Information</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We may collect personal information that you voluntarily provide to us when you:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 ml-4">
                  <li>Contact us for information about our services</li>
                  <li>Request a quote or consultation</li>
                  <li>Subscribe to our newsletter or blog updates</li>
                  <li>Use our client portal</li>
                  <li>Provide feedback or testimonials</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Automatically Collected Information</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  When you visit our website, we may automatically collect certain information about your device and usage patterns, including:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 ml-4">
                  <li>IP address and browser information</li>
                  <li>Pages visited and time spent on our site</li>
                  <li>Referring website information</li>
                  <li>Device type and operating system</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">How We Use Your Information</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 ml-4">
                  <li>Provide and improve our technical writing services</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Send you relevant updates about our services (with your consent)</li>
                  <li>Analyze website usage to improve user experience</li>
                  <li>Comply with legal obligations and protect our rights</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Information Sharing and Disclosure</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 ml-4">
                  <li>When required by law or legal process</li>
                  <li>To protect our rights, property, or safety</li>
                  <li>With trusted service providers who assist in our operations (under strict confidentiality agreements)</li>
                  <li>In connection with a business transfer or merger</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Data Security</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 ml-4">
                  <li>SSL encryption for data transmission</li>
                  <li>Secure servers and data storage</li>
                  <li>Regular security assessments</li>
                  <li>Limited access to personal information on a need-to-know basis</li>
                  <li>Employee training on data protection practices</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Your Rights and Choices</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 ml-4">
                  <li>Access and review your personal information</li>
                  <li>Request corrections to inaccurate information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Opt out of marketing communications</li>
                  <li>Withdraw consent for data processing (where applicable)</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  To exercise these rights, please contact us using the information provided below.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Cookies and Tracking Technologies</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We use cookies and similar tracking technologies to enhance your browsing experience and analyze website traffic. You can control cookie settings through your browser preferences. Disabling cookies may affect some website functionality.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Third-Party Links</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Data Retention</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We retain personal information only as long as necessary to fulfill the purposes outlined in this Privacy Policy, comply with legal obligations, resolve disputes, and enforce our agreements.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Changes to This Privacy Policy</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by posting the updated policy on our website with a new effective date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  If you have questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-600 dark:text-gray-300">
                    <strong>Prism Writing Cooperative</strong><br />
                    Email: privacy@prismwriting.com<br />
                    Website: prismwriting.com<br />
                    Portal: prismwriting.com/portal
                  </p>
                </div>
              </section>

              <section className="border-t pt-6 mt-8">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  This Privacy Policy is effective as of June 28, 2025. By using our services, you acknowledge that you have read and understood this Privacy Policy.
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
