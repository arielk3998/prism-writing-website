'use client';

import React from 'react';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import TranslationQuoteForm from '../../components/TranslationQuoteForm';
import TranslationPricingCalculator from '../../components/TranslationPricingCalculator';

export default function TranslationQuotePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <div className="section-padding bg-background">
          <div className="container">
            {/* Header */}
            <div className="text-center section-header">
              <h1 className="heading-1 text-foreground mb-4">
                Get Your Translation Quote
              </h1>
              <p className="body-large text-muted max-w-3xl mx-auto">
                Professional translation services with transparent pricing. 
                Get an instant estimate or request a detailed quote for your project.
              </p>
            </div>

            {/* Pricing Calculator Section */}
            <div className="mb-16">
              <TranslationPricingCalculator />
            </div>

            {/* Quote Form Section */}
            <div className="border-t border-border pt-16">
              <div className="text-center section-header">
                <h2 className="heading-2 text-foreground mb-4">
                  Request Detailed Quote
                </h2>
                <p className="body-large text-muted max-w-2xl mx-auto">
                  Need a more detailed quote? Fill out our form and our experts will 
                  provide you with a comprehensive proposal within 2 hours.
                </p>
              </div>
              <TranslationQuoteForm />
            </div>

            {/* Trust Signals */}
            <div className="mt-16 card-white shadow-lg">
              <div className="text-center mb-8">
                <h3 className="heading-3 text-foreground mb-4">Why Choose Our Translation Services?</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">99.8% Accuracy Rate</h4>
                  <p className="text-muted text-sm">
                    Our expert translators maintain the highest quality standards with rigorous quality control.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Fast Turnaround</h4>
                  <p className="text-muted text-sm">
                    Express delivery available with 24-48 hour turnaround for urgent projects.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔒</span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Secure & Confidential</h4>
                  <p className="text-muted text-sm">
                    Enterprise-grade security with strict confidentiality agreements for all projects.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
