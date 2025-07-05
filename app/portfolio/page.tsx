'use client';

import React from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import SampleDocumentTranslator from '../../components/SampleDocumentTranslator';

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
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <div className="container section-padding">
          {/* Header */}
          <div className="text-center section-header">
            <h1 className="heading-1 text-foreground mb-4">
              Translation Portfolio
            </h1>
            <p className="body-large text-muted max-w-3xl mx-auto">
              Explore our professional translation work across industries and languages. 
              Try our interactive demo with real project samples.
            </p>
          </div>

          {/* Interactive Demo Section */}
          <div className="mb-16">
            <h2 className="heading-3 text-foreground mb-6">
              🔍 Try Our Translation Service
            </h2>
            <SampleDocumentTranslator />
          </div>

          {/* Portfolio Samples */}
          <div className="grid gap-8">
            <h2 className="heading-3 text-foreground mb-6">
              📁 Featured Projects
            </h2>
            
            {portfolioSamples.map((sample, index) => (
              <div key={index} className="card shadow-lg border border-border">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Project Info */}
                  <div className="lg:w-1/3">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {sample.title}
                    </h3>
                    <p className="text-muted mb-4">
                      {sample.description}
                    </p>
                    <div className="mb-3">
                      <h4 className="font-medium text-foreground mb-1">Languages:</h4>
                      <div className="flex flex-wrap gap-2">
                        {sample.languages.map((lang, langIndex) => (
                          <span
                            key={langIndex}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-muted">
                      <strong>Client:</strong> {sample.client}
                    </div>
                  </div>

                  {/* Sample Text Display */}
                  <div className="lg:w-2/3">
                    <div className="bg-surface rounded-lg p-6">
                      <h4 className="font-semibold text-foreground mb-3">Original Text:</h4>
                      <p className="text-muted leading-relaxed">{sample.originalText}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {sample.languages.map((lang, i) => (
                          <span key={i} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center gradient-primary rounded-lg p-8 text-white">
            <h2 className="heading-2 mb-4">
              Ready to Start Your Translation Project?
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Experience the quality and precision demonstrated in our portfolio
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/translation-quote"
                className="btn-white text-center"
              >
                Get Instant Quote
              </a>
              <a
                href="/translation-services"
                className="btn-secondary text-center"
              >
                View All Services
              </a>
            </div>
          </div>

          {/* Technical Capabilities */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">80+ Languages</h3>
              <p className="text-muted">
                Comprehensive language support across all major world languages and dialects
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Real-time Preview</h3>
              <p className="text-muted">
                Interactive translation demos let you experience our quality instantly
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Industry Expertise</h3>
              <p className="text-muted">
                Specialized knowledge in technical, legal, medical, and marketing content
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
