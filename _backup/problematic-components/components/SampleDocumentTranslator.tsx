'use client';

import React, { useState } from 'react';
import { FileText, Languages, Clock, BarChart3, Globe2 } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { Language, getLanguageByCode, languages } from '../lib/languages';
import { SampleDocument, sampleDocuments, getDocumentById } from '../lib/sample-documents';
import { BlueHighlight, SafeText } from './ui/AutoContrastText';

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
      case 'basic': return 'highlight-green';
      case 'intermediate': return 'highlight-yellow';
      case 'advanced': return 'highlight-orange';
      case 'expert': return 'highlight-red';
      default: return 'highlight-neutral';
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
          <BlueHighlight className="w-8 h-8">
            <Languages className="w-8 h-8" />
          </BlueHighlight>
          <SafeText as="h1" className="text-3xl font-bold">Translation Services Demo</SafeText>
        </div>
        <SafeText as="p" className="text-lg max-w-3xl mx-auto">
          Explore our professional translation capabilities with real sample documents. 
          Select any document type and see instant translations to <BlueHighlight>80+ languages</BlueHighlight>.
        </SafeText>
        <div className="flex justify-center mt-4">
          <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg px-4 py-2">
            <SafeText onBackground="light" className="font-semibold">🌍 80+ World Languages Available</SafeText>
            <SafeText onBackground="light" className="text-sm ml-2">Click "All Languages" tab to browse complete list</SafeText>
          </div>
        </div>
      </div>

      {/* Document Selection */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <SafeText as="h2" className="text-xl font-semibold mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          Sample Documents
        </SafeText>
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
                <SafeText className="font-medium">{doc.title}</SafeText>
              </div>
              <div className="space-y-1">
                <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getComplexityColor(doc.complexity)}`}>
                  {doc.complexity}
                </div>
                <p className="text-sm text-muted-foreground">{doc.wordCount} words</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Instruction Banner */}
      {!targetLanguage && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <BlueHighlight className="w-5 h-5">
                <Languages className="w-5 h-5" />
              </BlueHighlight>
            </div>
            <div>
              <SafeText as="h3" className="text-lg font-semibold">📱 Click "Target Language" to See 80+ Languages</SafeText>
              <SafeText as="p" className="">
                Select any target language from our complete list of 80+ world languages to see professional translations of the {selectedDocument.title.toLowerCase()}. 
                <BlueHighlight className="ml-1">Try Spanish, French, Chinese, Arabic, or browse all 80+ languages!</BlueHighlight>
              </SafeText>
            </div>
          </div>
        </div>
      )}

      {/* Translation Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Source Document */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <SafeText as="h3" className="text-lg font-semibold">Original Document</SafeText>
              <div className="flex items-center space-x-2">
                <Globe2 className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {getLanguageByCode(selectedDocument.originalLanguage)?.name}
                </span>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
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
                <SafeText as="pre" className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                  {selectedDocument.content}
                </SafeText>
              </div>
            </div>
          </div>
        </div>

        {/* Translation Controls */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <SafeText as="h3" className="text-lg font-semibold mb-6">Translation Options</SafeText>
            
            {/* Language Selection */}
            <div className="space-y-4 mb-6">
              <SafeText as="label" className="block text-sm font-medium">
                Target Language
              </SafeText>
              <SafeText className="mb-2 text-sm">
                📍 We support {languages.length} world languages - click below to browse all options
              </SafeText>
              <div className="mb-3 text-xs text-muted-foreground">
                Popular languages: Spanish, French, German, Chinese, Japanese, Arabic, Russian, Portuguese, Italian, Korean, and {languages.length - 10} more...
              </div>
              <LanguageSelector
                selectedLanguage={targetLanguage}
                onLanguageSelect={setTargetLanguage}
                placeholder="🌍 Click here to choose from 95 languages..."
                showNativeName={true}
                showSpeakers={true}
              />
            </div>

            {/* Translation Stats */}
            {targetLanguage && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4">
                  <div className="text-2xl font-bold text-safe-accent dark:text-blue-100">{estimatedTime}h</div>
                  <div className="text-sm text-safe-accent">Estimated Time</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-safe-success">${estimatedCost}</div>
                  <div className="text-sm text-safe-success">Estimated Cost</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-safe-accent">99%</div>
                  <div className="text-sm text-safe-accent">Accuracy Rate</div>
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
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-safe-success text-lg">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-safe-success">Professional Translation Complete!</h4>
                      <p className="text-sm text-safe-success">
                        This is a real example translated by our professional team
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-md font-semibold text-safe">Translation Result</h4>
                  <div className="flex items-center space-x-2">
                    <Globe2 className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {targetLanguage.name} ({targetLanguage.nativeName})
                    </span>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <pre className={`whitespace-pre-wrap font-sans text-sm text-safe leading-relaxed ${
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
                    <Languages className="w-4 h-4 text-safe-warning" />
                  </div>
                  <div>
                    <h4 className="font-medium text-safe-warning">Translation Coming Soon</h4>
                    <p className="text-sm text-safe-warning">
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
        <h2 className="text-2xl font-bold mb-4 text-white drop-shadow-lg">Ready to Get Your Documents Translated?</h2>
        <p className="text-lg mb-6 text-white/95 drop-shadow-md">
          Professional translation services for over 80+ languages with expert human translators
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/translation-quote" className="bg-white text-safe-accent px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center">
            Get Free Quote
          </a>
          <a href="/translation-quote" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-safe-accent transition-colors text-center">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
