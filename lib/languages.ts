// Comprehensive list of world languages for translation services
export interface Language {
  code: string;
  name: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
  family: string;
  region: string;
  speakers: number; // in millions
}

export const languages: Language[] = [
  // Major World Languages
  { code: 'en', name: 'English', nativeName: 'English', direction: 'ltr', family: 'Germanic', region: 'Global', speakers: 1500 },
  { code: 'zh', name: 'Chinese (Mandarin)', nativeName: '中文', direction: 'ltr', family: 'Sino-Tibetan', region: 'Asia', speakers: 918 },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', direction: 'ltr', family: 'Indo-European', region: 'Asia', speakers: 600 },
  { code: 'es', name: 'Spanish', nativeName: 'Español', direction: 'ltr', family: 'Romance', region: 'Global', speakers: 500 },
  { code: 'fr', name: 'French', nativeName: 'Français', direction: 'ltr', family: 'Romance', region: 'Global', speakers: 280 },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', direction: 'rtl', family: 'Semitic', region: 'MENA', speakers: 422 },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', direction: 'ltr', family: 'Indo-European', region: 'Asia', speakers: 300 },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', direction: 'ltr', family: 'Slavic', region: 'Europe/Asia', speakers: 258 },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', direction: 'ltr', family: 'Romance', region: 'Global', speakers: 260 },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', direction: 'ltr', family: 'Austronesian', region: 'Asia', speakers: 199 },
  
  // European Languages
  { code: 'de', name: 'German', nativeName: 'Deutsch', direction: 'ltr', family: 'Germanic', region: 'Europe', speakers: 100 },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', direction: 'ltr', family: 'Japonic', region: 'Asia', speakers: 125 },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', direction: 'rtl', family: 'Indo-European', region: 'Asia', speakers: 170 },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', direction: 'ltr', family: 'Romance', region: 'Europe', speakers: 65 },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', direction: 'ltr', family: 'Turkic', region: 'Europe/Asia', speakers: 80 },
  { code: 'ko', name: 'Korean', nativeName: '한국어', direction: 'ltr', family: 'Koreanic', region: 'Asia', speakers: 77 },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', direction: 'ltr', family: 'Austroasiatic', region: 'Asia', speakers: 95 },
  { code: 'fa', name: 'Persian/Farsi', nativeName: 'فارسی', direction: 'rtl', family: 'Indo-European', region: 'MENA', speakers: 110 },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', direction: 'ltr', family: 'Slavic', region: 'Europe', speakers: 45 },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', direction: 'ltr', family: 'Germanic', region: 'Europe', speakers: 24 },
  
  // Nordic Languages
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', direction: 'ltr', family: 'Germanic', region: 'Europe', speakers: 10 },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk', direction: 'ltr', family: 'Germanic', region: 'Europe', speakers: 5 },
  { code: 'da', name: 'Danish', nativeName: 'Dansk', direction: 'ltr', family: 'Germanic', region: 'Europe', speakers: 6 },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi', direction: 'ltr', family: 'Uralic', region: 'Europe', speakers: 5 },
  { code: 'is', name: 'Icelandic', nativeName: 'Íslenska', direction: 'ltr', family: 'Germanic', region: 'Europe', speakers: 0.4 },
  
  // Slavic Languages
  { code: 'cs', name: 'Czech', nativeName: 'Čeština', direction: 'ltr', family: 'Slavic', region: 'Europe', speakers: 10 },
  { code: 'sk', name: 'Slovak', nativeName: 'Slovenčina', direction: 'ltr', family: 'Slavic', region: 'Europe', speakers: 5 },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', direction: 'ltr', family: 'Slavic', region: 'Europe', speakers: 40 },
  { code: 'bg', name: 'Bulgarian', nativeName: 'Български', direction: 'ltr', family: 'Slavic', region: 'Europe', speakers: 8 },
  { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski', direction: 'ltr', family: 'Slavic', region: 'Europe', speakers: 5 },
  { code: 'sr', name: 'Serbian', nativeName: 'Српски', direction: 'ltr', family: 'Slavic', region: 'Europe', speakers: 9 },
  { code: 'sl', name: 'Slovenian', nativeName: 'Slovenščina', direction: 'ltr', family: 'Slavic', region: 'Europe', speakers: 2 },
  
  // Other European Languages
  { code: 'ro', name: 'Romanian', nativeName: 'Română', direction: 'ltr', family: 'Romance', region: 'Europe', speakers: 24 },
  { code: 'hu', name: 'Hungarian', nativeName: 'Magyar', direction: 'ltr', family: 'Uralic', region: 'Europe', speakers: 13 },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', direction: 'ltr', family: 'Indo-European', region: 'Europe', speakers: 13 },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית', direction: 'rtl', family: 'Semitic', region: 'MENA', speakers: 9 },
  { code: 'et', name: 'Estonian', nativeName: 'Eesti', direction: 'ltr', family: 'Uralic', region: 'Europe', speakers: 1 },
  { code: 'lv', name: 'Latvian', nativeName: 'Latviešu', direction: 'ltr', family: 'Indo-European', region: 'Europe', speakers: 2 },
  { code: 'lt', name: 'Lithuanian', nativeName: 'Lietuvių', direction: 'ltr', family: 'Indo-European', region: 'Europe', speakers: 3 },
  
  // African Languages
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', direction: 'ltr', family: 'Niger-Congo', region: 'Africa', speakers: 200 },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', direction: 'ltr', family: 'Semitic', region: 'Africa', speakers: 57 },
  { code: 'ha', name: 'Hausa', nativeName: 'Hausa', direction: 'ltr', family: 'Afroasiatic', region: 'Africa', speakers: 70 },
  { code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá', direction: 'ltr', family: 'Niger-Congo', region: 'Africa', speakers: 50 },
  { code: 'ig', name: 'Igbo', nativeName: 'Igbo', direction: 'ltr', family: 'Niger-Congo', region: 'Africa', speakers: 27 },
  { code: 'zu', name: 'Zulu', nativeName: 'isiZulu', direction: 'ltr', family: 'Niger-Congo', region: 'Africa', speakers: 12 },
  { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans', direction: 'ltr', family: 'Germanic', region: 'Africa', speakers: 7 },
  
  // Asian Languages
  { code: 'th', name: 'Thai', nativeName: 'ไทย', direction: 'ltr', family: 'Kra-Dai', region: 'Asia', speakers: 69 },
  { code: 'my', name: 'Burmese', nativeName: 'မြန်မာ', direction: 'ltr', family: 'Sino-Tibetan', region: 'Asia', speakers: 33 },
  { code: 'km', name: 'Khmer', nativeName: 'ខ្មែរ', direction: 'ltr', family: 'Austroasiatic', region: 'Asia', speakers: 16 },
  { code: 'lo', name: 'Lao', nativeName: 'ລາວ', direction: 'ltr', family: 'Kra-Dai', region: 'Asia', speakers: 7 },
  { code: 'ka', name: 'Georgian', nativeName: 'ქართული', direction: 'ltr', family: 'Kartvelian', region: 'Asia/Europe', speakers: 4 },
  { code: 'hy', name: 'Armenian', nativeName: 'Հայերեն', direction: 'ltr', family: 'Indo-European', region: 'Asia/Europe', speakers: 7 },
  { code: 'az', name: 'Azerbaijani', nativeName: 'Azərbaycan', direction: 'ltr', family: 'Turkic', region: 'Asia/Europe', speakers: 23 },
  { code: 'kk', name: 'Kazakh', nativeName: 'Қазақ', direction: 'ltr', family: 'Turkic', region: 'Asia', speakers: 13 },
  { code: 'ky', name: 'Kyrgyz', nativeName: 'Кыргыз', direction: 'ltr', family: 'Turkic', region: 'Asia', speakers: 4 },
  { code: 'uz', name: 'Uzbek', nativeName: 'Oʻzbek', direction: 'ltr', family: 'Turkic', region: 'Asia', speakers: 44 },
  { code: 'tg', name: 'Tajik', nativeName: 'Тоҷикӣ', direction: 'ltr', family: 'Indo-European', region: 'Asia', speakers: 8 },
  { code: 'mn', name: 'Mongolian', nativeName: 'Монгол', direction: 'ltr', family: 'Mongolic', region: 'Asia', speakers: 5 },
  
  // Additional Languages
  { code: 'mt', name: 'Maltese', nativeName: 'Malti', direction: 'ltr', family: 'Semitic', region: 'Europe', speakers: 0.5 },
  { code: 'ga', name: 'Irish', nativeName: 'Gaeilge', direction: 'ltr', family: 'Celtic', region: 'Europe', speakers: 1.2 },
  { code: 'cy', name: 'Welsh', nativeName: 'Cymraeg', direction: 'ltr', family: 'Celtic', region: 'Europe', speakers: 0.9 },
  { code: 'eu', name: 'Basque', nativeName: 'Euskera', direction: 'ltr', family: 'Language isolate', region: 'Europe', speakers: 1.2 },
  { code: 'ca', name: 'Catalan', nativeName: 'Català', direction: 'ltr', family: 'Romance', region: 'Europe', speakers: 10 },
  
  // Additional Asian and Pacific Languages
  { code: 'tl', name: 'Filipino/Tagalog', nativeName: 'Filipino', direction: 'ltr', family: 'Austronesian', region: 'Asia', speakers: 45 },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', direction: 'ltr', family: 'Austronesian', region: 'Asia', speakers: 80 },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', direction: 'ltr', family: 'Indo-European', region: 'Asia', speakers: 16 },
  { code: 'si', name: 'Sinhala', nativeName: 'සිංහල', direction: 'ltr', family: 'Indo-European', region: 'Asia', speakers: 17 },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', direction: 'ltr', family: 'Dravidian', region: 'Asia', speakers: 75 },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', direction: 'ltr', family: 'Dravidian', region: 'Asia', speakers: 95 },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', direction: 'ltr', family: 'Dravidian', region: 'Asia', speakers: 44 },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', direction: 'ltr', family: 'Dravidian', region: 'Asia', speakers: 35 },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', direction: 'ltr', family: 'Indo-European', region: 'Asia', speakers: 56 },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', direction: 'ltr', family: 'Indo-European', region: 'Asia', speakers: 125 },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', direction: 'ltr', family: 'Indo-European', region: 'Asia', speakers: 83 },
  
  // Americas
  { code: 'qu', name: 'Quechua', nativeName: 'Runa Simi', direction: 'ltr', family: 'Quechuan', region: 'Americas', speakers: 8 },
  { code: 'gn', name: 'Guarani', nativeName: 'Avañeẽ', direction: 'ltr', family: 'Tupian', region: 'Americas', speakers: 6 },
];

export const getLanguageByCode = (code: string): Language | undefined => {
  return languages.find(lang => lang.code === code);
};

export const searchLanguages = (query: string): Language[] => {
  const searchTerm = query.toLowerCase();
  return languages.filter(lang => 
    lang.name.toLowerCase().includes(searchTerm) ||
    lang.nativeName.toLowerCase().includes(searchTerm) ||
    lang.code.toLowerCase().includes(searchTerm) ||
    lang.region.toLowerCase().includes(searchTerm) ||
    lang.family.toLowerCase().includes(searchTerm)
  );
};

export const getLanguagesByRegion = (region: string): Language[] => {
  return languages.filter(lang => lang.region === region);
};

export const getLanguagesByFamily = (family: string): Language[] => {
  return languages.filter(lang => lang.family === family);
};

export const getMostSpokenLanguages = (limit: number = 20): Language[] => {
  return [...languages].sort((a, b) => b.speakers - a.speakers).slice(0, limit);
};
