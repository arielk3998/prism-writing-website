import Navigation from '../../../components/layout/Navigation';
import EnhancedFooter from '../../../components/layout/EnhancedFooter';
import Link from 'next/link';

export default function APIDocumentation() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation currentPage="/services/api-documentation" />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900 dark:to-blue-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              API Documentation Services
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Transform your API from developer frustration to developer delight with clear, comprehensive, 
              and interactive documentation that drives adoption and reduces support burden.
            </p>
          </div>
        </div>
      </section>

      {/* What We Deliver */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            What We Deliver
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Interactive API Reference",
                description: "Complete endpoint documentation with interactive examples, request/response schemas, and live testing capabilities.",
                icon: "🔗"
              },
              {
                title: "Developer Guides",
                description: "Step-by-step tutorials, quickstart guides, and integration examples that get developers productive fast.",
                icon: "📚"
              },
              {
                title: "Code Examples",
                description: "Real-world code samples in multiple programming languages with explanations and best practices.",
                icon: "💻"
              },
              {
                title: "Authentication Guides",
                description: "Clear documentation for OAuth, API keys, and other authentication methods with security best practices.",
                icon: "🔐"
              },
              {
                title: "Error Handling",
                description: "Comprehensive error code documentation with troubleshooting guides and common solutions.",
                icon: "⚠️"
              },
              {
                title: "SDKs & Libraries",
                description: "Documentation for client libraries, SDKs, and tools that complement your API ecosystem.",
                icon: "🛠️"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Our API Documentation Process
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "API Discovery",
                description: "We analyze your API structure, endpoints, and existing documentation to understand the current state and opportunities."
              },
              {
                step: "02",
                title: "Developer Persona Mapping",
                description: "We identify your target developers, their skill levels, use cases, and documentation preferences."
              },
              {
                step: "03",
                title: "Information Architecture",
                description: "We design the documentation structure, navigation, and content organization for optimal developer experience."
              },
              {
                step: "04",
                title: "Content Creation",
                description: "We write clear, comprehensive content with interactive examples, code samples, and practical guides."
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-indigo-600 dark:bg-indigo-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Platforms */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Tools & Platforms We Work With
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
            {[
              "OpenAPI/Swagger",
              "Postman",
              "GitBook",
              "Notion",
              "Confluence",
              "README.io",
              "Stoplight",
              "Insomnia",
              "Apiary",
              "Slate",
              "Redoc",
              "Custom Docs"
            ].map((tool, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <span className="text-gray-900 dark:text-white font-medium">
                  {tool}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            API Documentation Pricing
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter API",
                price: "$2,500 - $5,000",
                description: "Perfect for small APIs with basic documentation needs",
                features: [
                  "Up to 20 endpoints",
                  "Basic reference documentation",
                  "Getting started guide",
                  "Authentication documentation",
                  "2 rounds of revisions"
                ]
              },
              {
                name: "Professional API",
                price: "$5,000 - $12,000",
                description: "Comprehensive documentation for growing APIs",
                features: [
                  "Up to 50 endpoints",
                  "Interactive documentation",
                  "Multiple developer guides",
                  "Code examples in 3+ languages",
                  "Error handling documentation",
                  "3 rounds of revisions"
                ],
                popular: true
              },
              {
                name: "Enterprise API",
                price: "$12,000+",
                description: "Full-scale documentation for complex API ecosystems",
                features: [
                  "Unlimited endpoints",
                  "Complete developer portal",
                  "Advanced tutorials & guides",
                  "SDK documentation",
                  "Custom integrations",
                  "Ongoing maintenance"
                ]
              }
            ].map((tier, index) => (
              <div key={index} className={`bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8 ${tier.popular ? 'ring-2 ring-indigo-600 dark:ring-indigo-500' : ''}`}>
                {tier.popular && (
                  <div className="bg-indigo-600 text-white text-center py-2 px-4 rounded-lg mb-6 font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {tier.name}
                </h3>
                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
                  {tier.price}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {tier.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white text-center py-3 px-6 rounded-lg font-semibold transition duration-300"
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-indigo-600 dark:bg-indigo-700">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Improve Your API Adoption?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Great API documentation can increase developer adoption by 40% and reduce support tickets by 50%.
          </p>
          <Link 
            href="/contact"
            className="inline-flex items-center bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition duration-300"
          >
            Start Your API Documentation Project
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      <EnhancedFooter />
    </div>
  );
}
