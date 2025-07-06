'use client';

import React from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import SampleDocumentTranslator from '../../components/SampleDocumentTranslator';

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
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <div className="container section-padding">
          {/* Header */}
          <div className="text-center section-header">
            <h1 className="heading-1 text-foreground mb-4">
              Translation Resources & Tools
            </h1>
            <p className="body-large text-muted max-w-3xl mx-auto">
              Explore our comprehensive translation capabilities with interactive demos. 
              Test how we handle various document types and technical content.
            </p>
          </div>

          {/* Interactive Resource Translator */}
          <div className="mb-16">
            <h2 className="heading-3 text-foreground mb-6">
              🛠️ Resource Translation Demo
            </h2>
            <SampleDocumentTranslator />
          </div>

          {/* Resource Samples */}
          <div className="mb-16">
            <h2 className="heading-3 text-foreground mb-8">
              📋 Sample Resource Types
            </h2>
            
            <div className="grid gap-8">
              {resourceSamples.map((resource, index) => (
                <div key={index} className="card shadow-lg border border-border overflow-hidden">
                  <div className="bg-surface px-6 py-4 border-b border-border">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">
                          {resource.title}
                        </h3>
                        <p className="text-muted mt-1">{resource.description}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                          {resource.category}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          resource.complexity === 'High' 
                            ? 'bg-red-100 text-safe-error'
                            : 'bg-yellow-100 text-safe-warning'
                        }`}>
                          {resource.complexity} Complexity
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-safe-success rounded-full text-sm">
                          {resource.estimatedTime}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="bg-surface rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-3">Sample Text:</h4>
                      <p className="text-muted leading-relaxed">{resource.originalText}</p>
                      <div className="mt-4 text-sm text-primary">
                        ✓ Available for translation into 80+ languages
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Translation Tools */}
          <div className="mb-16">
            <h2 className="heading-3 text-foreground mb-8 text-center">
              🔧 Our Translation Tools & Process
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {translationTools.map((tool, index) => (
                <div key={index} className="card-white shadow-lg text-center border border-border hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-4">{tool.icon}</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {tool.name}
                  </h3>
                  <p className="text-muted text-sm">
                    {tool.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Supported Document Types */}
          <div className="mb-16">
            <h2 className="heading-3 text-foreground mb-8 text-center">
              📄 Supported Document Types
            </h2>
            
            <div className="card shadow-lg border border-border">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[
                  "Technical Manuals", "API Documentation", "User Guides", "Privacy Policies",
                  "Terms of Service", "Training Materials", "Help Articles", "FAQ Documents",
                  "Product Specifications", "Safety Instructions", "Compliance Documents", "Research Papers"
                ].map((docType, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-safe-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-muted">{docType}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* File Format Support */}
          <div className="mb-16">
            <h2 className="heading-3 text-foreground mb-8 text-center">
              💾 Supported File Formats
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card-white shadow-lg border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  📝 Documents
                </h3>
                <div className="space-y-2">
                  {["PDF", "DOCX", "TXT", "RTF", "ODT"].map((format, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-muted">{format}</span>
                      <span className="text-safe-success">✓</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-white shadow-lg border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  📊 Spreadsheets
                </h3>
                <div className="space-y-2">
                  {["XLSX", "CSV", "ODS", "TSV"].map((format, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-muted">{format}</span>
                      <span className="text-safe-success">✓</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-white shadow-lg border border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  🌐 Web & Code
                </h3>
                <div className="space-y-2">
                  {["HTML", "XML", "JSON", "YAML", "MD"].map((format, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-muted">{format}</span>
                      <span className="text-safe-success">✓</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center gradient-primary rounded-lg p-8 text-white">
            <h2 className="heading-2 mb-4">
              Ready to Translate Your Resources?
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Upload your documents and get professional translations with our proven process
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/translation-quote"
                className="btn-white text-center"
              >
                Get Quote for Resources
              </a>
              <a
                href="/translation-services"
                className="btn-secondary text-center"
              >
                View All Services
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
