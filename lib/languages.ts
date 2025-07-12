export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  speakers?: number;
  region?: string;
}

export const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', speakers: 1500000000, region: 'Global' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', speakers: 500000000, region: 'Europe, Americas' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', speakers: 280000000, region: 'Europe, Africa' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', speakers: 100000000, region: 'Europe' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', speakers: 65000000, region: 'Europe' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', speakers: 260000000, region: 'Europe, Americas, Africa' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', speakers: 258000000, region: 'Europe, Asia' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', speakers: 125000000, region: 'Asia' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', speakers: 77000000, region: 'Asia' },
  { code: 'zh', name: 'Chinese (Simplified)', nativeName: '中文 (简体)', flag: '🇨🇳', speakers: 918000000, region: 'Asia' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', nativeName: '中文 (繁體)', flag: '🇹🇼', speakers: 23000000, region: 'Asia' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', speakers: 422000000, region: 'Middle East, Africa' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', speakers: 600000000, region: 'Asia' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩', speakers: 265000000, region: 'Asia' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', speakers: 80000000, region: 'Europe, Asia' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱', speakers: 45000000, region: 'Europe' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', speakers: 24000000, region: 'Europe' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪', speakers: 10000000, region: 'Europe' },
  { code: 'da', name: 'Danish', nativeName: 'Dansk', flag: '🇩🇰', speakers: 6000000, region: 'Europe' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk', flag: '🇳🇴', speakers: 5000000, region: 'Europe' },
];

export function searchLanguages(query: string): Language[] {
  const lowercaseQuery = query.toLowerCase();
  return languages.filter(lang =>
    lang.name.toLowerCase().includes(lowercaseQuery) ||
    lang.nativeName.toLowerCase().includes(lowercaseQuery) ||
    lang.code.toLowerCase().includes(lowercaseQuery)
  );
}

export function getMostSpokenLanguages(count: number = 10): Language[] {
  return languages
    .filter(lang => lang.speakers)
    .sort((a, b) => (b.speakers || 0) - (a.speakers || 0))
    .slice(0, count);
}

export function getLanguageByCode(code: string): Language | undefined {
  return languages.find(lang => lang.code === code);
}

export function getLanguagesByRegion(region: string): Language[] {
  return languages.filter(lang => 
    lang.region?.toLowerCase().includes(region.toLowerCase())
  );
}
