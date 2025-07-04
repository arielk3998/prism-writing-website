'use client';

import React, { useState } from 'react';
import { FileText, Languages, Clock, BarChart3, Globe2 } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { Language, getLanguageByCode } from '../lib/languages';
import { SampleDocument, sampleDocuments, getDocumentById } from '../lib/sample-documents';

export default function SampleDocumentTranslator() {
  const [selectedDocument, setSelectedDocument] = useState<SampleDocument>(sampleDocuments[0]);
  const [targetLanguage, setTargetLanguage] = useState<Language | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);

  const handleTranslate = async () => {
    if (!targetLanguage) return;
    
    setIsTranslating(true);
    // Simulate translation delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsTranslating(false);
  };

  const getTranslation = () => {
    if (!targetLanguage || !selectedDocument.translations[targetLanguage.code]) {
      return null;
    }
    return selectedDocument.translations[targetLanguage.code];
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'basic': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-orange-600 bg-orange-100';
      case 'expert': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'business': return '💼';
      case 'legal': return '⚖️';
      case 'technical': return '🔧';
      case 'marketing': return '📢';
      case 'academic': return '🎓';
      case 'medical': return '🏥';
      case 'literary': return '📚';
      default: return '📄';
    }
  };

  const estimatedTime = Math.ceil(selectedDocument.wordCount / 500 * 24); // hours
  const estimatedCost = Math.ceil(selectedDocument.wordCount * 0.12); // USD

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <Languages className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Translation Services Demo</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Explore our professional translation capabilities with real sample documents. 
          Select any document type and see instant translations to over 100+ languages.
        </p>
      </div>

      {/* Document Selection */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          Sample Documents
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {sampleDocuments.map((doc) => (
            <button
              key={doc.id}
              onClick={() => setSelectedDocument(doc)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedDocument.id === doc.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl">{getTypeIcon(doc.type)}</span>
                <span className="font-medium text-gray-900">{doc.title}</span>
              </div>
              <div className="space-y-1">
                <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getComplexityColor(doc.complexity)}`}>
                  {doc.complexity}
                </div>
                <p className="text-sm text-gray-500">{doc.wordCount} words</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Translation Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Source Document */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Original Document</h3>
              <div className="flex items-center space-x-2">
                <Globe2 className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500">
                  {getLanguageByCode(selectedDocument.originalLanguage)?.name}
                </span>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <BarChart3 className="w-4 h-4" />
                  <span>{selectedDocument.complexity}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{selectedDocument.wordCount} words</span>
                </div>
              </div>
            </div>

            <div className="prose prose-sm max-w-none">
              <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 leading-relaxed">
                  {selectedDocument.content}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Translation Controls */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Translation Options</h3>
            
            {/* Language Selection */}
            <div className="space-y-4 mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Target Language
              </label>
              <LanguageSelector
                selectedLanguage={targetLanguage}
                onLanguageSelect={setTargetLanguage}
                placeholder="Choose target language..."
                showNativeName={true}
                showSpeakers={true}
              />
            </div>

            {/* Translation Stats */}
            {targetLanguage && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">{estimatedTime}h</div>
                  <div className="text-sm text-blue-600">Estimated Time</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">${estimatedCost}</div>
                  <div className="text-sm text-green-600">Estimated Cost</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-600">99%</div>
                  <div className="text-sm text-purple-600">Accuracy Rate</div>
                </div>
              </div>
            )}

            {/* Translate Button */}
            <button
              onClick={handleTranslate}
              disabled={!targetLanguage || isTranslating}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              {isTranslating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Translating...</span>
                </>
              ) : (
                <>
                  <Languages className="w-5 h-5" />
                  <span>Translate Document</span>
                </>
              )}
            </button>

            {/* Translation Result */}
            {targetLanguage && getTranslation() && !isTranslating && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-md font-semibold text-gray-900">Translation Result</h4>
                  <div className="flex items-center space-x-2">
                    <Globe2 className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {targetLanguage.name} ({targetLanguage.nativeName})
                    </span>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <pre className={`whitespace-pre-wrap font-sans text-sm text-gray-700 leading-relaxed ${
                    targetLanguage.direction === 'rtl' ? 'text-right' : 'text-left'
                  }`} dir={targetLanguage.direction}>
                    {getTranslation()}
                  </pre>
                </div>
              </div>
            )}

            {/* No Translation Available */}
            {targetLanguage && !getTranslation() && !isTranslating && (
              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Languages className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-yellow-800">Translation Coming Soon</h4>
                    <p className="text-sm text-yellow-700">
                      We're preparing translations for {targetLanguage.name}. 
                      Contact us for a custom quote for this language pair.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Your Documents Translated?</h2>
        <p className="text-lg mb-6 opacity-90">
          Professional translation services for over 100+ languages with expert human translators
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/translation-quote" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center">
            Get Free Quote
          </a>
          <a href="/translation-quote" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors text-center">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
