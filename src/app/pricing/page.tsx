import { ModernNavigation } from '@/components/ui/ModernComponents';
import EnhancedFooter from '@/components/layout/EnhancedFooter';
import { DarkModeToggle } from '@/components/ui/DarkModeToggle';
import ScrollToTop from '@/components/ui/ScrollToTop';
import Link from 'next/link';
import { siteConfig } from '../../config/siteConfig';
import { PackageCard, ServiceCard } from '../../components/shared/Cards';
import { IconName } from '../../components/ui/Icons';

export default function Pricing() {
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
                  <linearGradient id="prismGradientPricing" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4f46e5" />
                    <stop offset="33%" stopColor="#0891b2" />
                    <stop offset="66%" stopColor="#059669" />
                    <stop offset="100%" stopColor="#dc2626" />
                  </linearGradient>
                </defs>
                <path d="M 6 10 L 16 8 L 16 20 L 6 22 Z" fill="url(#prismGradientPricing)" opacity="0.95"/>
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

      <div className="pt-20">{/* Add padding for fixed header */}
      
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Choose the package that fits your documentation needs. All packages include revisions and collaborative feedback.
          </p>
        </div>
      </section>

      {/* Pricing Packages */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Choose Your Package</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Whether you need a single document or a comprehensive documentation suite, we have options to fit your budget and timeline.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {siteConfig.packages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                name={pkg.name}
                priceRange={pkg.priceRange}
                features={pkg.features}
                popular={pkg.popular}
                className={pkg.popular ? "transform scale-105" : ""}
              />
            ))}
          </div>

          {/* What's Included */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 mb-16">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">What&apos;s Included in Every Package</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Quality Guarantee</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">100% satisfaction or money back</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Collaborative Process</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Regular check-ins and feedback loops</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">On-Time Delivery</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Committed deadlines with progress tracking</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Multiple Formats</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Web, PDF, print-ready, and more</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Individual Services Pricing */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Individual Service Pricing</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Need just one type of documentation? Here&apos;s our pricing for individual services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteConfig.services.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                features={service.features.slice(0, 4)} // Show fewer features for cleaner layout
                startingPrice={service.startingPrice}
                icon={service.icon as IconName}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900 dark:to-blue-900 rounded-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Custom Projects</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                Need something unique? We work with clients on custom documentation projects, enterprise-wide initiatives, 
                and ongoing documentation maintenance contracts.
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition duration-300"
              >
                Discuss Custom Pricing
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Factors That Affect Pricing */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What Affects Pricing?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We believe in transparent pricing. Here are the key factors that influence project costs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Scope & Complexity</h3>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>• Number of pages/topics</li>
                <li>• Technical complexity</li>
                <li>• Research required</li>
                <li>• Integration complexity</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Timeline & Urgency</h3>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>• Standard delivery: Base price</li>
                <li>• Rush delivery (2 weeks): +25%</li>
                <li>• Express delivery (1 week): +50%</li>
                <li>• Emergency delivery: Custom quote</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Deliverables & Formats</h3>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>• Single format: Base price</li>
                <li>• Multiple formats: +$200 each</li>
                <li>• Interactive elements: +$500</li>
                <li>• Video tutorials: Custom quote</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Research & Discovery</h3>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>• Existing documentation: Base price</li>
                <li>• Interview SMEs: +$500</li>
                <li>• User research: +$1,000</li>
                <li>• Technical testing: +$1,500</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Collaboration Level</h3>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>• Standard collaboration: Base price</li>
                <li>• Embedded team member: +20%</li>
                <li>• Daily standups: +$200/week</li>
                <li>• On-site work: Travel + 25%</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Ongoing Support</h3>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                <li>• Maintenance: $200-500/month</li>
                <li>• Version updates: $100-300 each</li>
                <li>• Content reviews: $150/hour</li>
                <li>• Training sessions: $500/session</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process & Timeline */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Process</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From initial consultation to final delivery, here&apos;s what you can expect when working with us.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Discovery Call</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                30-minute consultation to understand your needs, audience, and goals.
              </p>
              <p className="text-indigo-600 dark:text-indigo-400 text-sm font-medium mt-2">Free • 30 minutes</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Proposal & Quote</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Detailed project scope, timeline, deliverables, and fixed-price quote.
              </p>
              <p className="text-indigo-600 dark:text-indigo-400 text-sm font-medium mt-2">24-48 hours</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Research & Writing</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                We dive deep into your product, conduct interviews, and create your documentation.
              </p>
              <p className="text-indigo-600 dark:text-indigo-400 text-sm font-medium mt-2">2-6 weeks</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">4</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Review & Delivery</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Collaborative review process with revisions, then final delivery in your preferred format.
              </p>
              <p className="text-indigo-600 dark:text-indigo-400 text-sm font-medium mt-2">1-2 weeks</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600 dark:bg-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Get a custom quote for your documentation project. No commitment required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors inline-block"
            >
              Get Your Quote
            </Link>
            <Link
              href="/portfolio"
              className="border-2 border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-3 rounded-lg font-semibold transition-colors inline-block"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>
      
      </div>
      
      {/* Footer */}
      <EnhancedFooter />
      
      {/* Scroll to Top */}
      <ScrollToTop />
    </div>
  );
}
