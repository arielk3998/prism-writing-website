"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Globe, Clock, CheckCircle, ArrowRight, Upload, Mail, User, Building } from 'lucide-react';
import Link from 'next/link';

export default function QuoteRequestPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceType: '',
    sourceLanguage: '',
    targetLanguages: [],
    urgency: '',
    wordCount: '',
    specializations: [],
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  const steps = [
    { id: 1, title: 'Service Type', icon: FileText },
    { id: 2, title: 'Languages', icon: Globe },
    { id: 3, title: 'Details', icon: Clock },
    { id: 4, title: 'Contact', icon: User }
  ];

  const serviceTypes = [
    { id: 'document', title: 'Document Translation', description: 'Professional translation of documents', price: 'From $0.12/word' },
    { id: 'website', title: 'Website Localization', description: 'Complete website translation and cultural adaptation', price: 'From $0.15/word' },
    { id: 'certified', title: 'Certified Translation', description: 'Official certified translations for legal use', price: 'From $35/page' },
    { id: 'interpretation', title: 'Interpretation Services', description: 'Live interpretation for meetings and events', price: 'Custom pricing' }
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦' }
  ];

  const urgencyOptions = [
    { id: 'standard', title: 'Standard (5-7 days)', multiplier: 1.0, description: 'Best value, thorough quality control' },
    { id: 'express', title: 'Express (2-3 days)', multiplier: 1.5, description: 'Faster turnaround, priority handling' },
    { id: 'urgent', title: 'Urgent (24 hours)', multiplier: 2.0, description: 'Emergency service, immediate start' }
  ];

  const specializations = [
    'Legal', 'Medical', 'Technical', 'Marketing', 'Financial', 'Academic', 'IT/Software', 'Automotive'
  ];

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/translation-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          wordCount: parseInt(formData.wordCount) || 0
        })
      });
      
      const result = await response.json();
      setSubmitResult(result);
    } catch (error) {
      setSubmitResult({ success: false, error: 'Failed to submit request' });
    }
    setIsSubmitting(false);
  };

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What type of service do you need?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {serviceTypes.map((service) => (
                <motion.div
                  key={service.id}
                  whileHover={{ scale: 1.02 }}
                  className={`p-6 border-2 rounded-lg cursor-pointer transition-colors ${
                    formData.serviceType === service.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setFormData({...formData, serviceType: service.id})}
                >
                  <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                  <p className="text-blue-600 font-medium text-sm">{service.price}</p>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Select your languages</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">From (Source Language)</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`p-3 border rounded-lg text-center transition-colors ${
                      formData.sourceLanguage === lang.code 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setFormData({...formData, sourceLanguage: lang.code})}
                  >
                    <div className="text-2xl mb-1">{lang.flag}</div>
                    <div className="text-xs">{lang.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">To (Target Languages)</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`p-3 border rounded-lg text-center transition-colors ${
                      formData.targetLanguages.includes(lang.code) 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => {
                      const targets = formData.targetLanguages.includes(lang.code)
                        ? formData.targetLanguages.filter(l => l !== lang.code)
                        : [...formData.targetLanguages, lang.code];
                      setFormData({...formData, targetLanguages: targets});
                    }}
                  >
                    <div className="text-2xl mb-1">{lang.flag}</div>
                    <div className="text-xs">{lang.name}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Project details</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Urgency Level</label>
              <div className="space-y-3">
                {urgencyOptions.map((option) => (
                  <div
                    key={option.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      formData.urgency === option.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setFormData({...formData, urgency: option.id})}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-gray-900">{option.title}</h4>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                      <div className="text-blue-600 font-medium">
                        {option.multiplier === 1.0 ? 'Standard Rate' : `+${Math.round((option.multiplier - 1) * 100)}%`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Word Count</label>
              <input
                type="number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 1000"
                value={formData.wordCount}
                onChange={(e) => setFormData({...formData, wordCount: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Specialization (optional)</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {specializations.map((spec) => (
                  <button
                    key={spec}
                    className={`p-2 border rounded-lg text-sm transition-colors ${
                      formData.specializations.includes(spec) 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => {
                      const specs = formData.specializations.includes(spec)
                        ? formData.specializations.filter(s => s !== spec)
                        : [...formData.specializations, spec];
                      setFormData({...formData, specializations: specs});
                    }}
                  >
                    {spec}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your company"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Requirements</label>
              <textarea
                rows={4}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Any specific requirements, file formats, delivery preferences, etc."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (submitResult) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            {submitResult.success ? (
              <>
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Quote Request Submitted!</h1>
                <p className="text-gray-600 mb-6">
                  Thank you for your quote request. We'll review your requirements and send you a detailed quote within 2 business hours.
                </p>
                {submitResult.estimatedPrice && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-blue-900 mb-2">Estimated Price Range</h3>
                    <p className="text-2xl font-bold text-blue-600">${submitResult.estimatedPrice.min} - ${submitResult.estimatedPrice.max}</p>
                    <p className="text-sm text-blue-700 mt-1">Final quote may vary based on content complexity</p>
                  </div>
                )}
                <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center">
                  Return Home
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-red-500 text-2xl">✕</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Submission Failed</h1>
                <p className="text-gray-600 mb-6">{submitResult.error || 'Please try again or contact us directly.'}</p>
                <button 
                  onClick={() => setSubmitResult(null)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600">Prism Writing</Link>
            <div className="text-sm text-gray-600">Step {currentStep} of 4</div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep >= step.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step.id ? <CheckCircle className="w-5 h-5" /> : step.id}
                </div>
                <div className="ml-3 flex-1">
                  <div className={`text-sm font-medium ${currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'}`}>
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {renderStep()}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            
            {currentStep < 4 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={
                  (currentStep === 1 && !formData.serviceType) ||
                  (currentStep === 2 && (!formData.sourceLanguage || formData.targetLanguages.length === 0)) ||
                  (currentStep === 3 && !formData.urgency)
                }
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
              >
                Next
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!formData.name || !formData.email || isSubmitting}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
