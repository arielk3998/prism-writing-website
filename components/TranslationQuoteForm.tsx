'use client';

import React, { useState } from 'react';
import { Send, Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { Language } from '../lib/languages';

interface QuoteFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  wordCount: number;
  sourceLanguage: Language | null;
  targetLanguage: Language | null;
  documentType: string;
  complexity: string;
  tier: string;
  requirements: string;
  deadline: string;
  files: FileList | null;
}

export default function TranslationQuoteForm() {
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    wordCount: 0,
    sourceLanguage: null,
    targetLanguage: null,
    documentType: 'business',
    complexity: 'intermediate',
    tier: 'premium',
    requirements: '',
    deadline: '',
    files: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quote, setQuote] = useState<any>(null);

  const handleInputChange = (field: keyof QuoteFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFormData(prev => ({ ...prev, files }));
      
      // Estimate word count based on file size (rough approximation)
      let totalSize = 0;
      for (let i = 0; i < files.length; i++) {
        totalSize += files[i].size;
      }
      // Rough estimate: 1KB ≈ 150 words for text documents
      const estimatedWords = Math.round(totalSize / 1024 * 150);
      setFormData(prev => ({ ...prev, wordCount: estimatedWords }));
    }
  };

  const validateForm = (): string | null => {
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.email.trim()) return 'Email is required';
    if (!formData.email.includes('@')) return 'Valid email is required';
    if (!formData.targetLanguage) return 'Target language is required';
    if (formData.wordCount <= 0) return 'Word count must be greater than 0';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/translation-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          wordCount: formData.wordCount,
          sourceLanguage: formData.sourceLanguage?.code,
          targetLanguage: formData.targetLanguage?.code,
          documentType: formData.documentType,
          complexity: formData.complexity,
          tier: formData.tier,
          requirements: formData.requirements,
          deadline: formData.deadline
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit quote request');
      }

      const result = await response.json();
      setQuote(result.quote);
      setSubmitted(true);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted && quote) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-safe-success" />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-safe mb-2">Quote Generated Successfully!</h2>
            <p className="text-safe-muted">Your translation quote has been prepared. We'll contact you within 2 hours.</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 text-left space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium text-safe">Quote ID:</span>
              <span className="font-mono text-sm bg-blue-100 text-safe-accent px-2 py-1 rounded">
                {quote.quoteId}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium text-safe">Estimated Price:</span>
              <span className="text-2xl font-bold text-safe-success">${quote.pricing.totalPrice}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium text-safe">Turnaround Time:</span>
              <span className="font-semibold text-safe-accent">
                {quote.timeline.turnaroundDays} {quote.timeline.turnaroundDays === 1 ? 'day' : 'days'}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-medium text-safe">Project Details:</span>
              <span className="text-sm text-safe-muted">
                {quote.projectDetails.wordCount} words, {quote.projectDetails.tier}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => window.print()}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Save Quote (Print/PDF)
            </button>
            <button
              onClick={() => {
                setSubmitted(false);
                setQuote(null);
                setFormData({
                  name: '',
                  email: '',
                  company: '',
                  phone: '',
                  wordCount: 0,
                  sourceLanguage: null,
                  targetLanguage: null,
                  documentType: 'business',
                  complexity: 'intermediate',
                  tier: 'premium',
                  requirements: '',
                  deadline: '',
                  files: null
                });
              }}
              className="w-full border border-gray-300 text-safe py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Request Another Quote
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-safe mb-2">Get Your Translation Quote</h2>
          <p className="text-safe-muted">
            Fill out the form below to receive a detailed quote for your translation project.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-safe">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-safe mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-safe mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-safe mb-1">
                  Company/Organization
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your company name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-safe mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your phone number"
                />
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-safe">Project Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-safe mb-1">
                  Source Language
                </label>
                <LanguageSelector
                  selectedLanguage={formData.sourceLanguage}
                  onLanguageSelect={(lang) => handleInputChange('sourceLanguage', lang)}
                  placeholder="Select source language..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-safe mb-1">
                  Target Language *
                </label>
                <LanguageSelector
                  selectedLanguage={formData.targetLanguage}
                  onLanguageSelect={(lang) => handleInputChange('targetLanguage', lang)}
                  placeholder="Select target language..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-safe mb-1">
                  Word Count *
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={formData.wordCount || ''}
                  onChange={(e) => handleInputChange('wordCount', Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Number of words"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-safe mb-1">
                  Document Type
                </label>
                <select
                  value={formData.documentType}
                  onChange={(e) => handleInputChange('documentType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="business">Business</option>
                  <option value="legal">Legal</option>
                  <option value="medical">Medical</option>
                  <option value="technical">Technical</option>
                  <option value="marketing">Marketing</option>
                  <option value="academic">Academic</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-safe mb-1">
                  Complexity Level
                </label>
                <select
                  value={formData.complexity}
                  onChange={(e) => handleInputChange('complexity', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="basic">Basic</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-safe mb-1">
                  Service Level
                </label>
                <select
                  value={formData.tier}
                  onChange={(e) => handleInputChange('tier', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="standard">Standard (3-5 days)</option>
                  <option value="premium">Premium (2-3 days)</option>
                  <option value="express">Express (24-48 hours)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-safe mb-1">
                  Deadline (Optional)
                </label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => handleInputChange('deadline', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-safe">Document Upload (Optional)</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <Upload className="w-12 h-12 text-safe-muted mx-auto mb-4" />
              <label className="cursor-pointer">
                <span className="text-safe-accent font-medium hover:text-safe-accent">
                  Click to upload files
                </span>
                <span className="text-safe-muted"> or drag and drop</span>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.txt,.rtf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <p className="text-sm text-safe-muted mt-2">
                Supported formats: PDF, DOC, DOCX, TXT, RTF (Max 10MB per file)
              </p>
            </div>
          </div>

          {/* Additional Requirements */}
          <div>
            <label className="block text-sm font-medium text-safe mb-1">
              Additional Requirements or Notes
            </label>
            <textarea
              rows={4}
              value={formData.requirements}
              onChange={(e) => handleInputChange('requirements', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Any specific requirements, formatting needs, or important context..."
            />
          </div>

          {/* Error Display */}
          {error && (
            <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-safe-error" />
              <span className="text-safe-error">{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Generating Quote...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Get Free Quote</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
