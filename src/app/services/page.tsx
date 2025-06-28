import Navigation from '../../components/layout/Navigation';
import Link from 'next/link';
import { siteConfig } from '../../config/siteConfig';
import { ServiceCard, PackageCard, IndustryCard } from '../../components/shared/Cards';
import { IconName } from '../../components/ui/Icons';

export default function Services() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <Navigation currentPage="/services" />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Comprehensive technical writing solutions designed to meet your specific documentation needs and improve user experience.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {siteConfig.services.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                features={service.features}
                startingPrice={service.startingPrice}
                icon={service.icon as IconName}
              />
            ))}
          </div>

          {/* Pricing Information */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Pricing & Packages</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {siteConfig.packages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  name={pkg.name}
                  priceRange={pkg.priceRange}
                  features={pkg.features}
                  popular={pkg.popular}
                />
              ))}
            </div>
          </div>

          {/* Industry Focus */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Industries We Serve</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {siteConfig.industries.map((industry) => (
                <IndustryCard
                  key={industry.id}
                  title={industry.title}
                  description={industry.description}
                  icon={industry.icon as IconName}
                  detailed={true}
                />
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ready to Get Started?</h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss your project and create documentation that truly serves your users and business goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition duration-300"
              >
                Start Your Project
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                href="/portfolio" 
                className="inline-flex items-center bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 border-2 border-indigo-600 dark:border-indigo-400 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-indigo-50 dark:hover:bg-gray-700 transition duration-300"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
