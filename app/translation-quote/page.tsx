import React from 'react';
import { Metadata } from 'next';
import Layout from '../../components/Layout';
import TranslationQuoteForm from '../../components/TranslationQuoteForm';
import TranslationPricingCalculator from '../../components/TranslationPricingCalculator';

export const metadata: Metadata = {
  title: 'Get Translation Quote - Professional Translation Services | Prism Writing',
  description: 'Get instant quotes for professional translation services. Upload your documents and receive accurate pricing for 100+ languages with fast turnaround times.',
  keywords: 'translation quote, translation pricing, document translation cost, professional translation estimate'
};

export default function TranslationQuotePage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Get Your Translation Quote
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional translation services with transparent pricing. 
            Get an instant estimate or request a detailed quote for your project.
          </p>
        </div>

        {/* Pricing Calculator Section */}
        <div className="mb-16">
          <TranslationPricingCalculator />
        </div>

        {/* Quote Form Section */}
        <div className="border-t border-gray-200 pt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Request Detailed Quote
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Need a more detailed quote? Fill out our form and our experts will 
              provide you with a comprehensive proposal within 2 hours.
            </p>
          </div>
          <TranslationQuoteForm />
        </div>

        {/* Trust Signals */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Our Translation Services?</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">99.8% Accuracy Rate</h4>
              <p className="text-gray-600 text-sm">
                Our expert translators maintain the highest quality standards with rigorous quality control.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Fast Turnaround</h4>
              <p className="text-gray-600 text-sm">
                Express delivery available with 24-48 hour turnaround for urgent projects.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Secure & Confidential</h4>
              <p className="text-gray-600 text-sm">
                Enterprise-grade security with strict confidentiality agreements for all projects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
}
