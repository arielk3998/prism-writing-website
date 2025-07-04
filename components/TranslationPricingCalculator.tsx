'use client';

import React, { useState } from 'react';
import { Calculator, Clock, DollarSign, FileText, Zap, Star } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { Language } from '../lib/languages';

interface PricingTier {
  id: string;
  name: string;
  description: string;
  basePrice: number; // per word
  features: string[];
  turnaround: string;
  icon: React.ElementType;
  popular?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    id: 'standard',
    name: 'Standard',
    description: 'Professional translation for general content',
    basePrice: 0.12,
    turnaround: '3-5 business days',
    icon: FileText,
    features: [
      'Professional human translators',
      'Quality assurance review',
      'Basic proofreading',
      'Standard formatting',
      'Email support'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Enhanced quality with specialist translators',
    basePrice: 0.18,
    turnaround: '2-3 business days',
    icon: Star,
    popular: true,
    features: [
      'Subject matter experts',
      'Two-stage quality review',
      'Detailed proofreading',
      'Format preservation',
      'Glossary creation',
      'Priority support'
    ]
  },
  {
    id: 'express',
    name: 'Express',
    description: 'Fast turnaround for urgent projects',
    basePrice: 0.25,
    turnaround: '24-48 hours',
    icon: Zap,
    features: [
      'Rush delivery',
      'Dedicated project manager',
      'Real-time progress updates',
      'Expert translators',
      'Expedited review process',
      '24/7 support'
    ]
  }
];

const complexityMultipliers = {
  basic: 1.0,
  intermediate: 1.2,
  advanced: 1.5,
  expert: 2.0
};

const languageMultipliers: Record<string, number> = {
  // Common languages (lower cost)
  'es': 1.0, 'fr': 1.0, 'de': 1.0, 'it': 1.0, 'pt': 1.0,
  // Major Asian languages
  'zh': 1.3, 'ja': 1.4, 'ko': 1.3, 'ar': 1.3, 'hi': 1.2,
  // European languages
  'ru': 1.2, 'pl': 1.2, 'nl': 1.1, 'sv': 1.2, 'no': 1.2,
  // Less common languages
  'fi': 1.5, 'hu': 1.4, 'he': 1.3, 'th': 1.4, 'vi': 1.3,
  // Rare languages
  'mt': 2.0, 'is': 1.8, 'eu': 1.7, 'ka': 1.8, 'hy': 1.6
};

export default function TranslationPricingCalculator() {
  const [wordCount, setWordCount] = useState<number>(500);
  const [sourceLanguage, setSourceLanguage] = useState<Language | null>(null);
  const [targetLanguage, setTargetLanguage] = useState<Language | null>(null);
  const [complexity, setComplexity] = useState<keyof typeof complexityMultipliers>('intermediate');
  const [selectedTier, setSelectedTier] = useState<string>('premium');
  const [documentType, setDocumentType] = useState<string>('business');

  const calculatePrice = (tier: PricingTier) => {
    if (!targetLanguage || wordCount <= 0) return 0;
    
    const langMultiplier = languageMultipliers[targetLanguage.code] || 1.5;
    const complexMultiplier = complexityMultipliers[complexity];
    
    const basePrice = tier.basePrice * wordCount * langMultiplier * complexMultiplier;
    
    // Document type multipliers
    const typeMultipliers: Record<string, number> = {
      business: 1.0,
      legal: 1.8,
      medical: 2.0,
      technical: 1.6,
      marketing: 1.2,
      academic: 1.4
    };
    
    return Math.round(basePrice * (typeMultipliers[documentType] || 1.0));
  };

  const getEstimatedDays = (tier: PricingTier) => {
    if (wordCount <= 1000) return tier.id === 'express' ? 1 : tier.id === 'premium' ? 2 : 3;
    if (wordCount <= 3000) return tier.id === 'express' ? 2 : tier.id === 'premium' ? 3 : 5;
    return tier.id === 'express' ? 3 : tier.id === 'premium' ? 5 : 7;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <Calculator className="w-8 h-8 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-900">Translation Pricing Calculator</h2>
        </div>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Get instant pricing estimates for your translation project. 
          Our transparent pricing is based on word count, language pair, and complexity.
        </p>
      </div>

      {/* Input Form */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Project Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Word Count */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Word Count
            </label>
            <input
              type="number"
              min="1"
              max="100000"
              value={wordCount}
              onChange={(e) => setWordCount(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter number of words"
            />
          </div>

          {/* Document Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Document Type
            </label>
            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
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

          {/* Source Language */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Source Language
            </label>
            <LanguageSelector
              selectedLanguage={sourceLanguage}
              onLanguageSelect={setSourceLanguage}
              placeholder="Select source language..."
            />
          </div>

          {/* Target Language */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Language
            </label>
            <LanguageSelector
              selectedLanguage={targetLanguage}
              onLanguageSelect={setTargetLanguage}
              placeholder="Select target language..."
            />
          </div>

          {/* Complexity */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content Complexity
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(complexityMultipliers).map(([level, multiplier]) => (
                <button
                  key={level}
                  onClick={() => setComplexity(level as keyof typeof complexityMultipliers)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    complexity === level
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium capitalize">{level}</div>
                  <div className="text-sm text-gray-500">+{Math.round((multiplier - 1) * 100)}%</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Tiers */}
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-gray-900 text-center">Choose Your Service Level</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingTiers.map((tier) => {
            const price = calculatePrice(tier);
            const days = getEstimatedDays(tier);
            
            return (
              <div
                key={tier.id}
                className={`relative bg-white rounded-xl shadow-lg p-6 border-2 transition-all cursor-pointer ${
                  selectedTier === tier.id
                    ? 'border-blue-500 ring-2 ring-blue-200'
                    : 'border-gray-200 hover:border-gray-300'
                } ${tier.popular ? 'ring-2 ring-blue-100' : ''}`}
                onClick={() => setSelectedTier(tier.id)}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                    <tier.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900">{tier.name}</h4>
                    <p className="text-gray-600 text-sm">{tier.description}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-gray-900">
                      ${price}
                      <span className="text-lg font-normal text-gray-500">
                        {wordCount > 0 ? ` (${(price / wordCount).toFixed(3)}/word)` : ''}
                      </span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{days} {days === 1 ? 'day' : 'days'}</span>
                    </div>
                  </div>
                  
                  <ul className="text-left space-y-2 text-sm">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Price Breakdown */}
      {targetLanguage && wordCount > 0 && (
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Breakdown</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Base rate ({wordCount} words)</span>
              <span className="font-medium">${(pricingTiers.find(t => t.id === selectedTier)?.basePrice || 0).toFixed(3)}/word</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Language pair ({sourceLanguage?.name || 'Any'} → {targetLanguage.name})</span>
              <span className="font-medium">×{languageMultipliers[targetLanguage.code] || 1.5}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Complexity ({complexity})</span>
              <span className="font-medium">×{complexityMultipliers[complexity]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Document type ({documentType})</span>
              <span className="font-medium">×{documentType === 'legal' ? '1.8' : documentType === 'medical' ? '2.0' : '1.0'}</span>
            </div>
            <div className="border-t border-gray-300 pt-3 flex justify-between text-lg font-semibold">
              <span>Total Price</span>
              <span className="text-blue-600">${calculatePrice(pricingTiers.find(t => t.id === selectedTier)!)}</span>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="text-center space-y-4">
        <a href="/translation-quote" className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-2">
          <DollarSign className="w-5 h-5" />
          <span>Get Official Quote</span>
        </a>
        <p className="text-sm text-gray-500">
          This is an estimate. Final pricing may vary based on specific requirements.
        </p>
      </div>
    </div>
  );
}
