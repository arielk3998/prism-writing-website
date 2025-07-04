'use client';

import React, { useState } from 'react';
import LanguageSelector from '../../components/LanguageSelector';
import { Language, languages } from '../../lib/languages';
import Layout from '../../components/Layout';

export default function TestLanguagesPage() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Language Selector Test</h1>
        
        <div className="bg-white border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Available Languages: {languages.length}</h2>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select a Language:
            </label>
            <LanguageSelector
              selectedLanguage={selectedLanguage}
              onLanguageSelect={setSelectedLanguage}
              placeholder="Choose from 95+ languages..."
              showNativeName={true}
              showSpeakers={true}
            />
          </div>
          
          {selectedLanguage && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded">
              <h3 className="font-semibold text-green-800">Selected Language:</h3>
              <p><strong>Name:</strong> {selectedLanguage.name}</p>
              <p><strong>Native Name:</strong> {selectedLanguage.nativeName}</p>
              <p><strong>Code:</strong> {selectedLanguage.code}</p>
              <p><strong>Region:</strong> {selectedLanguage.region}</p>
              <p><strong>Family:</strong> {selectedLanguage.family}</p>
              <p><strong>Speakers:</strong> {selectedLanguage.speakers} million</p>
            </div>
          )}
        </div>
        
        <div className="bg-gray-50 border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">All Available Languages ({languages.length}):</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-sm">
            {languages.map((lang) => (
              <div key={lang.code} className="p-2 bg-white rounded border">
                <div className="font-medium">{lang.name}</div>
                <div className="text-gray-500 text-xs">{lang.nativeName}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
