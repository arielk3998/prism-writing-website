import Navigation from '../components/layout/Navigation'
import Link from 'next/link'
import { siteConfig } from '../config/siteConfig'
import { FeatureCard, IndustryCard } from '../components/shared/Cards'
import { IconName } from '../components/ui/Icons'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Navigation currentPage="/" />
      
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {siteConfig.company.tagline.split(' ').slice(0, -2).join(' ')}
            <span className="text-indigo-600 dark:text-indigo-400 block">
              {siteConfig.company.tagline.split(' ').slice(-2).join(' ')}
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            {siteConfig.company.description}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link 
              href={siteConfig.cta.primary.href}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition duration-300"
            >
              {siteConfig.cta.primary.text}
            </Link>
            <Link 
              href={siteConfig.cta.secondary.href}
              className="bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 border-2 border-indigo-600 dark:border-indigo-400 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-indigo-50 dark:hover:bg-gray-700 transition duration-300"
            >
              {siteConfig.cta.secondary.text}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Why Choose {siteConfig.company.shortName}?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {siteConfig.features.map((feature) => (
              <FeatureCard
                key={feature.id}
                title={feature.title}
                description={feature.description}
                icon={feature.icon as IconName}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From API documentation to user manuals, we provide comprehensive technical writing solutions 
              tailored to your business needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {siteConfig.services.map((service) => (
              <div key={service.id} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <div className="bg-indigo-100 dark:bg-indigo-900 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  {/* Simple icon rendering for homepage preview */}
                  <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {service.description}
                </p>
                <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                  {service.features.slice(0, 4).map((feature, index) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Industry Focus */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">Industries We Serve</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              {siteConfig.industries.map((industry) => (
                <IndustryCard
                  key={industry.id}
                  title={industry.title}
                  description={industry.description}
                  icon={industry.icon as IconName}
                />
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link 
              href="/services" 
              className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition duration-300"
            >
              View All Services & Pricing
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Need something custom? <Link href="/contact" className="text-indigo-600 dark:text-indigo-400 hover:underline">Let&apos;s discuss your project</Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
