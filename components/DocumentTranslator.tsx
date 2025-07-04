import React, { useState, useEffect } from 'react';
import { languages, Language, getLanguageByCode, searchLanguages } from '../lib/languages';

interface DocumentTranslatorProps {
  mode?: 'portfolio' | 'resources' | 'demo';
  initialText?: string;
  className?: string;
}

export const DocumentTranslator: React.FC<DocumentTranslatorProps> = ({
  mode = 'demo',
  initialText = '',
  className = ''
}) => {
  const [sourceText, setSourceText] = useState(initialText);
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState<Language>(getLanguageByCode('en')!);
  const [targetLang, setTargetLang] = useState<Language>(getLanguageByCode('es')!);
  const [isTranslating, setIsTranslating] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [languageSearch, setLanguageSearch] = useState('');
  const [selectingFor, setSelectingFor] = useState<'source' | 'target' | null>(null);

  // Sample translations for demo purposes
  const sampleTranslations: Record<string, Record<string, string>> = {
    en: {
      es: "Esta es una traducción de ejemplo que demuestra nuestras capacidades profesionales de traducción.",
      fr: "Ceci est un exemple de traduction démontrant nos capacités de traduction professionnelles.",
      de: "Dies ist eine Beispielübersetzung, die unsere professionellen Übersetzungsfähigkeiten demonstriert.",
      zh: "这是一个展示我们专业翻译能力的示例翻译。",
      ja: "これは、私たちのプロフェッショナルな翻訳能力を実証するサンプル翻訳です。",
      ar: "هذه ترجمة عينة تظهر قدراتنا المهنية في الترجمة.",
      ru: "Это образец перевода, демонстрирующий наши профессиональные переводческие возможности."
    }
  };

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;

    setIsTranslating(true);
    
    // Simulate translation delay for realistic effect
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Use sample translation or generate a realistic demo
    const sampleKey = `${sourceLang.code}_${targetLang.code}`;
    if (sampleTranslations[sourceLang.code]?.[targetLang.code]) {
      setTranslatedText(sampleTranslations[sourceLang.code][targetLang.code]);
    } else {
      // Generate a demo translation response
      setTranslatedText(`[${targetLang.name} Translation] ${sourceText}`);
    }
    
    setIsTranslating(false);
  };

  const openLanguageSelector = (type: 'source' | 'target') => {
    setSelectingFor(type);
    setShowLanguageSelector(true);
    setLanguageSearch('');
  };

  const selectLanguage = (language: Language) => {
    if (selectingFor === 'source') {
      setSourceLang(language);
    } else if (selectingFor === 'target') {
      setTargetLang(language);
    }
    setShowLanguageSelector(false);
    setSelectingFor(null);
  };

  const filteredLanguages = languageSearch 
    ? searchLanguages(languageSearch).slice(0, 10)
    : languages.slice(0, 20);

  const getPlaceholderText = () => {
    switch (mode) {
      case 'portfolio':
        return 'Enter text from your portfolio project to see our translation capabilities...';
      case 'resources':
        return 'Paste resource content here to see how we handle technical documentation...';
      default:
        return 'Enter text to translate and experience our professional translation service...';
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">
          {mode === 'portfolio' && '📁 Portfolio Translation Demo'}
          {mode === 'resources' && '📚 Resource Translation Demo'}
          {mode === 'demo' && '🌍 Live Translation Demo'}
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Powered by Prism Translation</span>
        </div>
      </div>

      {/* Language Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
          <button
            onClick={() => openLanguageSelector('source')}
            className="w-full p-3 border border-gray-300 rounded-md text-left hover:border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">{sourceLang.name}</span>
                <span className="text-gray-500 ml-2">{sourceLang.nativeName}</span>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
          <button
            onClick={() => openLanguageSelector('target')}
            className="w-full p-3 border border-gray-300 rounded-md text-left hover:border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">{targetLang.name}</span>
                <span className="text-gray-500 ml-2">{targetLang.nativeName}</span>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* Text Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Source Text ({sourceLang.name})
          </label>
          <textarea
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            placeholder={getPlaceholderText()}
            className="w-full h-40 p-3 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
            dir={sourceLang.direction}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">
              {sourceText.length} characters
            </span>
            <button
              onClick={handleTranslate}
              disabled={!sourceText.trim() || isTranslating}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isTranslating ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Translating...
                </div>
              ) : (
                'Translate'
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Translation ({targetLang.name})
          </label>
          <textarea
            value={translatedText}
            readOnly
            placeholder="Translation will appear here..."
            className="w-full h-40 p-3 border border-gray-300 rounded-md bg-gray-50 resize-none"
            dir={targetLang.direction}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">
              {translatedText.length} characters
            </span>
            {translatedText && (
              <button
                onClick={() => navigator.clipboard.writeText(translatedText)}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              >
                Copy
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Language Selector Modal */}
      {showLanguageSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-96 overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-semibold">
                  Select {selectingFor === 'source' ? 'Source' : 'Target'} Language
                </h4>
                <button
                  onClick={() => setShowLanguageSelector(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <input
                type="text"
                placeholder="Search languages..."
                value={languageSearch}
                onChange={(e) => setLanguageSearch(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                autoFocus
              />
            </div>
            <div className="overflow-y-auto max-h-64">
              {filteredLanguages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => selectLanguage(language)}
                  className="w-full p-3 text-left hover:bg-gray-50 border-b border-gray-100"
                >
                  <div className="font-medium">{language.name}</div>
                  <div className="text-sm text-gray-500">{language.nativeName} • {language.region}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Demo Note */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
        <p className="text-sm text-blue-800">
          <strong>Demo Mode:</strong> This is a demonstration of our translation interface. 
          In production, this would connect to professional translation APIs for real-time translation.
          {mode === 'portfolio' && ' Perfect for showcasing multilingual project capabilities.'}
          {mode === 'resources' && ' Ideal for technical documentation and resource translation.'}
        </p>
      </div>
    </div>
  );
};
