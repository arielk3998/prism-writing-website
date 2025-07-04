'use client';

import React, { useState, useMemo } from 'react';
import { Search, Globe, ChevronDown, Check } from 'lucide-react';
import { Language, languages, searchLanguages, getMostSpokenLanguages } from '../lib/languages';

interface LanguageSelectorProps {
  selectedLanguage: Language | null;
  onLanguageSelect: (language: Language) => void;
  placeholder?: string;
  showNativeName?: boolean;
  showSpeakers?: boolean;
  className?: string;
}

export default function LanguageSelector({
  selectedLanguage,
  onLanguageSelect,
  placeholder = "Select a language...",
  showNativeName = true,
  showSpeakers = false,
  className = ""
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'popular' | 'regions'>('all');

  const filteredLanguages = useMemo(() => {
    if (activeTab === 'popular') {
      const popular = getMostSpokenLanguages(20);
      return searchQuery ? popular.filter(lang => 
        lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase())
      ) : popular;
    } else if (activeTab === 'all') {
      return searchQuery ? searchLanguages(searchQuery) : languages;
    } else {
      // Group by regions for 'regions' tab
      const filtered = searchQuery ? searchLanguages(searchQuery) : languages;
      return filtered.sort((a, b) => a.region.localeCompare(b.region));
    }
  }, [searchQuery, activeTab]);

  const groupedByRegion = useMemo(() => {
    if (activeTab !== 'regions') return {};
    const groups: Record<string, Language[]> = {};
    filteredLanguages.forEach(lang => {
      if (!groups[lang.region]) {
        groups[lang.region] = [];
      }
      groups[lang.region].push(lang);
    });
    return groups;
  }, [filteredLanguages, activeTab]);

  const handleLanguageSelect = (language: Language) => {
    onLanguageSelect(language);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Globe className="w-5 h-5 text-gray-400" />
          <div className="text-left">
            {selectedLanguage ? (
              <div>
                <span className="text-gray-900 font-medium">{selectedLanguage.name}</span>
                {showNativeName && selectedLanguage.nativeName !== selectedLanguage.name && (
                  <span className="text-gray-500 ml-2">({selectedLanguage.nativeName})</span>
                )}
              </div>
            ) : (
              <span className="text-gray-500">{placeholder}</span>
            )}
          </div>
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-hidden">
          {/* Search Bar */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search languages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('popular')}
              className={`flex-1 py-2 px-4 text-sm font-medium ${
                activeTab === 'popular'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Popular
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-1 py-2 px-4 text-sm font-medium ${
                activeTab === 'all'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              All Languages ({languages.length})
            </button>
            <button
              onClick={() => setActiveTab('regions')}
              className={`flex-1 py-2 px-4 text-sm font-medium ${
                activeTab === 'regions'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              By Region
            </button>
          </div>

          {/* Languages List */}
          <div className="max-h-64 overflow-y-auto">
            {activeTab === 'regions' ? (
              // Grouped by region
              Object.entries(groupedByRegion).map(([region, regionLanguages]) => (
                <div key={region}>
                  <div className="px-4 py-2 bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    {region}
                  </div>
                  {regionLanguages.map((language) => (
                    <LanguageOption
                      key={language.code}
                      language={language}
                      isSelected={selectedLanguage?.code === language.code}
                      showNativeName={showNativeName}
                      showSpeakers={showSpeakers}
                      onClick={() => handleLanguageSelect(language)}
                    />
                  ))}
                </div>
              ))
            ) : (
              // Regular list
              filteredLanguages.map((language) => (
                <LanguageOption
                  key={language.code}
                  language={language}
                  isSelected={selectedLanguage?.code === language.code}
                  showNativeName={showNativeName}
                  showSpeakers={showSpeakers}
                  onClick={() => handleLanguageSelect(language)}
                />
              ))
            )}
            
            {filteredLanguages.length === 0 && (
              <div className="px-4 py-8 text-center text-gray-500">
                No languages found matching "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

interface LanguageOptionProps {
  language: Language;
  isSelected: boolean;
  showNativeName: boolean;
  showSpeakers: boolean;
  onClick: () => void;
}

function LanguageOption({ language, isSelected, showNativeName, showSpeakers, onClick }: LanguageOptionProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors ${
        isSelected ? 'bg-blue-50 text-blue-600' : 'text-gray-900'
      }`}
    >
      <div className="flex items-center space-x-3">
        <div className="text-left">
          <div className="font-medium">{language.name}</div>
          {showNativeName && language.nativeName !== language.name && (
            <div className="text-sm text-gray-500">{language.nativeName}</div>
          )}
          {showSpeakers && (
            <div className="text-xs text-gray-400">
              {language.speakers >= 1 
                ? `${language.speakers}M speakers` 
                : `${Math.round(language.speakers * 10) / 10}M speakers`
              }
            </div>
          )}
        </div>
      </div>
      {isSelected && <Check className="w-5 h-5 text-blue-600" />}
    </button>
  );
}
