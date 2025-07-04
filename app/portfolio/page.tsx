import React from 'react';
import { DocumentTranslator } from '../../components/DocumentTranslator';
import Layout from '../../components/Layout';

const portfolioSamples = [
  {
    title: "Technical Documentation Project",
    description: "Software API documentation translated for global development teams",
    originalText: "This API endpoint allows developers to authenticate users and manage session tokens. The response includes a JWT token that must be included in subsequent requests.",
    languages: ["English → Japanese", "English → German", "English → Spanish"],
    client: "TechCorp International"
  },
  {
    title: "Marketing Campaign Translation",
    description: "Brand messaging localized for European and Asian markets",
    originalText: "Our innovative solution transforms the way businesses connect with customers, delivering unprecedented value through cutting-edge technology.",
    languages: ["English → French", "English → Mandarin", "English → Korean"],
    client: "Global Brands Inc."
  },
  {
    title: "Legal Document Translation",
    description: "Contract and compliance documentation for international expansion",
    originalText: "This agreement shall be governed by the laws of the jurisdiction in which the principal place of business is located, without regard to conflict of law principles.",
    languages: ["English → Spanish", "English → Portuguese", "English → Italian"],
    client: "LegalTech Solutions"
  }
];

export default function PortfolioPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Translation Portfolio
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our professional translation work across industries and languages. 
            Try our interactive demo with real project samples.
          </p>
        </div>

        {/* Interactive Demo Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            🔍 Try Our Translation Service
          </h2>
          <DocumentTranslator 
            mode="portfolio"
            initialText="Enter any text from our portfolio samples below to see our translation capabilities in action."
            className="mb-8"
          />
        </div>

        {/* Portfolio Samples */}
        <div className="grid gap-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            📁 Featured Projects
          </h2>
          
          {portfolioSamples.map((sample, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Project Info */}
                <div className="lg:w-1/3">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {sample.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {sample.description}
                  </p>
                  <div className="mb-3">
                    <h4 className="font-medium text-gray-800 mb-1">Languages:</h4>
                    <div className="flex flex-wrap gap-2">
                      {sample.languages.map((lang, langIndex) => (
                        <span
                          key={langIndex}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    <strong>Client:</strong> {sample.client}
                  </div>
                </div>

                {/* Sample Text Demo */}
                <div className="lg:w-2/3">
                  <DocumentTranslator
                    mode="portfolio"
                    initialText={sample.originalText}
                    className="h-full"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Translation Project?
          </h2>
          <p className="text-xl mb-6 opacity-90">
            Experience the quality and precision demonstrated in our portfolio
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/translation-quote"
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get Instant Quote
            </a>
            <a
              href="/translation-services"
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              View All Services
            </a>
          </div>
        </div>

        {/* Technical Capabilities */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="text-4xl mb-4">🌍</div>
            <h3 className="text-xl font-semibold mb-2">80+ Languages</h3>
            <p className="text-gray-600">
              Comprehensive language support across all major world languages and dialects
            </p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Real-time Preview</h3>
            <p className="text-gray-600">
              Interactive translation demos let you experience our quality instantly
            </p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">Industry Expertise</h3>
            <p className="text-gray-600">
              Specialized knowledge in technical, legal, medical, and marketing content
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
