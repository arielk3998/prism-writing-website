import React from 'react';
import { DocumentTranslator } from './DocumentTranslator';

interface TranslationWidgetProps {
  title?: string;
  subtitle?: string;
  initialText?: string;
  mode?: 'portfolio' | 'resources' | 'demo';
  compact?: boolean;
  showLanguageCount?: boolean;
}

export const TranslationWidget: React.FC<TranslationWidgetProps> = ({
  title = "Try Our Translation Service",
  subtitle = "Experience professional-quality translation with 80+ languages",
  initialText = "",
  mode = "demo",
  compact = false,
  showLanguageCount = true
}) => {
  if (compact) {
    return (
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          {showLanguageCount && (
            <div className="flex items-center justify-center space-x-4 text-sm opacity-90">
              <span>🌍 80+ Languages</span>
              <span>⚡ Real-time Demo</span>
              <span>🎯 Professional Quality</span>
            </div>
          )}
        </div>
        
        <div className="bg-white bg-opacity-10 backdrop-blur rounded-lg p-4">
          <DocumentTranslator
            mode={mode}
            initialText={initialText}
            className="bg-white rounded-lg"
          />
        </div>
        
        <div className="text-center mt-4">
          <a
            href="/translation-quote"
            className="inline-block px-6 py-2 bg-white text-safe-accent font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Get Professional Quote →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-xl border border-gray-200">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-lg">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="opacity-90">{subtitle}</p>
        
        {showLanguageCount && (
          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm">
            <div className="flex items-center space-x-2">
              <span>🌍</span>
              <span>80+ World Languages</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>⚡</span>
              <span>Real-time Processing</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>🎯</span>
              <span>Professional Quality</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>🔒</span>
              <span>Secure & Confidential</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <DocumentTranslator
          mode={mode}
          initialText={initialText}
        />
      </div>
      
      <div className="bg-gray-50 px-6 py-4 rounded-b-lg border-t border-gray-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-safe-muted">
            Experience the quality that powers professional translation services worldwide
          </div>
          <div className="flex gap-3">
            <a
              href="/translation-services"
              className="px-4 py-2 text-safe-accent border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Learn More
            </a>
            <a
              href="/translation-quote"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Quote
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
