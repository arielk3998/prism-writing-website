import Navigation from '../../components/layout/Navigation';
import EnhancedFooter from '../../components/layout/EnhancedFooter';
import { siteConfig } from '../../config/siteConfig';
import Link from 'next/link';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Navigation currentPage="/contact" />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Let&apos;s Work Together
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Ready to transform your technical documentation? Let&apos;s discuss your project and explore how {siteConfig.company.shortName} can help.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Get In Touch</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Email Us</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      <a href={`mailto:${siteConfig.company.email}`} className="text-indigo-600 dark:text-indigo-400 hover:underline">
                        {siteConfig.company.email}
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {siteConfig.company.responseTime}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Call Us</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      <a href={`tel:${siteConfig.company.phone}`} className="text-indigo-600 dark:text-indigo-400 hover:underline">
                        {siteConfig.company.phone}
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Business hours: {siteConfig.company.businessHours}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Quick Response</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      Free {siteConfig.company.consultationDuration} consultation call
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Available same week for urgent projects
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Types */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">What Can We Help With?</h2>
              
              <div className="grid gap-6">
                {siteConfig.services.slice(0, 4).map((service) => (
                  <div key={service.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {service.description}
                    </p>
                    <p className="text-indigo-600 dark:text-indigo-400 font-medium text-sm">
                      Starting at ${service.startingPrice.toLocaleString()}
                    </p>
                  </div>
                ))}
                
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900 dark:to-blue-900 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Custom Projects
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    Don&apos;t see what you need? We work on custom documentation projects and enterprise initiatives.
                  </p>
                  <Link 
                    href="/services"
                    className="text-indigo-600 dark:text-indigo-400 font-medium text-sm hover:underline"
                  >
                    View All Services →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How We Work</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our collaborative process ensures you get exactly what you need, on time and on budget.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Discovery Call</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Free {siteConfig.company.consultationDuration} consultation to understand your needs and goals.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Proposal</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Detailed scope, timeline, and fixed-price quote delivered within 48 hours.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Collaborative Work</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Regular check-ins and feedback loops throughout the project.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">4</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Delivery</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Final documentation delivered in your preferred format.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Industries We Serve</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our expertise spans multiple industries, bringing specialized knowledge to your documentation needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteConfig.industries.map((industry) => (
              <div key={industry.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {industry.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {industry.description}
                </p>
              </div>
            ))}
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
            Drop us a line and let&apos;s discuss how we can help improve your technical documentation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`mailto:${siteConfig.company.email}?subject=Documentation Project Inquiry`}
              className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors inline-block"
            >
              Send Email
            </a>
            <a
              href={`tel:${siteConfig.company.phone}`}
              className="border-2 border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-3 rounded-lg font-semibold transition-colors inline-block"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <EnhancedFooter />
    </div>
  );
}
