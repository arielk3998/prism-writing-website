import React from 'react';
import { DocumentTranslator } from '../../components/DocumentTranslator';
import Layout from '../../components/Layout';

const resourceSamples = [
  {
    title: "API Documentation",
    category: "Technical",
    description: "RESTful API endpoint documentation with code examples",
    originalText: "GET /api/v1/users/{id} - Retrieves user information by ID. Authentication required via Bearer token in Authorization header. Returns JSON object with user data or 404 if not found.",
    complexity: "High",
    estimatedTime: "2-3 hours"
  },
  {
    title: "User Manual",
    category: "Documentation",
    description: "Software user guide with step-by-step instructions",
    originalText: "To configure the application settings, navigate to the Settings menu in the top navigation bar. Click on 'Preferences' and adjust the language, timezone, and notification settings according to your requirements.",
    complexity: "Medium",
    estimatedTime: "1-2 hours"
  },
  {
    title: "Privacy Policy",
    category: "Legal",
    description: "GDPR-compliant privacy policy for web applications",
    originalText: "We collect and process personal data in accordance with applicable data protection laws. Your data is stored securely and used only for the purposes described in this policy. You have the right to access, modify, or delete your personal information at any time.",
    complexity: "High",
    estimatedTime: "3-4 hours"
  },
  {
    title: "Training Materials",
    category: "Educational",
    description: "Employee onboarding and training documentation",
    originalText: "Welcome to our company training program. This module covers workplace safety protocols, emergency procedures, and company policies. Please complete all sections and take the quiz at the end of each chapter.",
    complexity: "Medium",
    estimatedTime: "2-3 hours"
  }
];

const translationTools = [
  {
    name: "Terminology Management",
    description: "Consistent use of industry-specific terms across all translations",
    icon: "📚"
  },
  {
    name: "Quality Assurance",
    description: "Multi-step review process ensuring accuracy and cultural appropriateness",
    icon: "✅"
  },
  {
    name: "Version Control",
    description: "Track changes and maintain document history throughout translation process",
    icon: "🔄"
  },
  {
    name: "Collaborative Platform",
    description: "Real-time collaboration between translators, reviewers, and project managers",
    icon: "👥"
  }
];

export default function ResourcesPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Translation Resources & Tools
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive translation capabilities with interactive demos. 
            Test how we handle various document types and technical content.
          </p>
        </div>

        {/* Interactive Resource Translator */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            🛠️ Resource Translation Demo
          </h2>
          <DocumentTranslator 
            mode="resources"
            initialText="Paste your technical documentation, user manuals, or resource content here to see how our translation service handles specialized content."
            className="mb-8"
          />
        </div>

        {/* Resource Samples */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            📋 Sample Resource Types
          </h2>
          
          <div className="grid gap-8">
            {resourceSamples.map((resource, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {resource.title}
                      </h3>
                      <p className="text-gray-600 mt-1">{resource.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {resource.category}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        resource.complexity === 'High' 
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {resource.complexity} Complexity
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {resource.estimatedTime}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <DocumentTranslator
                    mode="resources"
                    initialText={resource.originalText}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Translation Tools */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            🔧 Our Translation Tools & Process
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {translationTools.map((tool, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center border border-gray-200 hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{tool.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {tool.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {tool.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Supported Document Types */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            📄 Supported Document Types
          </h2>
          
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
                "Technical Manuals", "API Documentation", "User Guides", "Privacy Policies",
                "Terms of Service", "Training Materials", "Help Articles", "FAQ Documents",
                "Product Specifications", "Safety Instructions", "Compliance Documents", "Research Papers"
              ].map((docType, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">{docType}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* File Format Support */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            💾 Supported File Formats
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                📝 Documents
              </h3>
              <div className="space-y-2">
                {["PDF", "DOCX", "TXT", "RTF", "ODT"].map((format, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-700">{format}</span>
                    <span className="text-green-500">✓</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                📊 Spreadsheets
              </h3>
              <div className="space-y-2">
                {["XLSX", "CSV", "ODS", "TSV"].map((format, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-700">{format}</span>
                    <span className="text-green-500">✓</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                🌐 Web & Code
              </h3>
              <div className="space-y-2">
                {["HTML", "XML", "JSON", "YAML", "MD"].map((format, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-700">{format}</span>
                    <span className="text-green-500">✓</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Translate Your Resources?
          </h2>
          <p className="text-xl mb-6 opacity-90">
            Upload your documents and get professional translations with our proven process
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/translation-quote"
              className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get Quote for Resources
            </a>
            <a
              href="/translation-services"
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-purple-600 transition-colors"
            >
              View All Services
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
