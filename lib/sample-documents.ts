export interface SampleDocument {
  id: string;
  title: string;
  type: 'legal' | 'medical' | 'technical' | 'business' | 'academic' | 'marketing';
  sourceLanguage: string;
  targetLanguages: string[];
  wordCount: number;
  estimatedTime: string;
  complexity: 'basic' | 'intermediate' | 'advanced' | 'expert';
  content: string;
  keywords: string[];
  description: string;
}

export const sampleDocuments: SampleDocument[] = [
  {
    id: 'legal-contract-001',
    title: 'International Business Contract',
    type: 'legal',
    sourceLanguage: 'en',
    targetLanguages: ['es', 'fr', 'de', 'zh'],
    wordCount: 2500,
    estimatedTime: '3-5 business days',
    complexity: 'expert',
    content: `This Agreement is entered into on [Date] between [Company A], a corporation organized under the laws of [Jurisdiction A], and [Company B], a corporation organized under the laws of [Jurisdiction B]. The parties agree to the following terms and conditions...`,
    keywords: ['contract', 'legal', 'international', 'business', 'agreement'],
    description: 'Complex international business contract requiring legal expertise and cultural adaptation.'
  },
  {
    id: 'medical-report-001',
    title: 'Medical Research Report',
    type: 'medical',
    sourceLanguage: 'en',
    targetLanguages: ['es', 'fr', 'de', 'ja'],
    wordCount: 5000,
    estimatedTime: '5-7 business days',
    complexity: 'expert',
    content: `ABSTRACT: This study examines the efficacy of novel therapeutic interventions in treating chronic conditions. Methods included randomized controlled trials with 500 participants over 12 months...`,
    keywords: ['medical', 'research', 'clinical', 'therapeutic', 'study'],
    description: 'Medical research document requiring specialized medical terminology and accuracy.'
  },
  {
    id: 'technical-manual-001',
    title: 'Software Installation Manual',
    type: 'technical',
    sourceLanguage: 'en',
    targetLanguages: ['es', 'fr', 'de', 'ja', 'ko'],
    wordCount: 1200,
    estimatedTime: '2-3 business days',
    complexity: 'intermediate',
    content: `INSTALLATION REQUIREMENTS: Before installing the software, ensure your system meets the following minimum requirements: Operating System: Windows 10 or later, macOS 10.15 or later...`,
    keywords: ['technical', 'software', 'installation', 'manual', 'instructions'],
    description: 'Technical documentation with specific terminology and step-by-step procedures.'
  },
  {
    id: 'business-presentation-001',
    title: 'Corporate Quarterly Report',
    type: 'business',
    sourceLanguage: 'en',
    targetLanguages: ['es', 'fr', 'de', 'zh', 'ja'],
    wordCount: 800,
    estimatedTime: '1-2 business days',
    complexity: 'intermediate',
    content: `Q3 2025 EXECUTIVE SUMMARY: Our company achieved significant milestones this quarter, with revenue increasing by 15% year-over-year. Key performance indicators show strong growth across all market segments...`,
    keywords: ['business', 'quarterly', 'report', 'financial', 'corporate'],
    description: 'Business document with financial terms and corporate language requiring cultural sensitivity.'
  },
  {
    id: 'academic-paper-001',
    title: 'Climate Change Research Paper',
    type: 'academic',
    sourceLanguage: 'en',
    targetLanguages: ['es', 'fr', 'de', 'zh'],
    wordCount: 6000,
    estimatedTime: '7-10 business days',
    complexity: 'expert',
    content: `INTRODUCTION: Climate change represents one of the most significant challenges of the 21st century. This paper analyzes current trends in global temperature variations and their impact on ecosystems...`,
    keywords: ['academic', 'research', 'climate', 'scientific', 'peer-reviewed'],
    description: 'Academic research paper requiring scientific accuracy and formal academic style.'
  },
  {
    id: 'marketing-campaign-001',
    title: 'Global Marketing Campaign',
    type: 'marketing',
    sourceLanguage: 'en',
    targetLanguages: ['es', 'fr', 'de', 'zh', 'ja', 'ko'],
    wordCount: 1500,
    estimatedTime: '2-3 business days',
    complexity: 'advanced',
    content: `Discover the Future: Our revolutionary new product transforms the way you work, live, and connect. Experience innovation like never before with cutting-edge technology that adapts to your lifestyle...`,
    keywords: ['marketing', 'campaign', 'advertising', 'promotional', 'brand'],
    description: 'Marketing content requiring cultural adaptation and persuasive language optimization.'
  }
];

export function getSampleDocumentsByType(type: SampleDocument['type']): SampleDocument[] {
  return sampleDocuments.filter(doc => doc.type === type);
}

export function getSampleDocumentById(id: string): SampleDocument | undefined {
  return sampleDocuments.find(doc => doc.id === id);
}

export function getSampleDocumentsByComplexity(complexity: SampleDocument['complexity']): SampleDocument[] {
  return sampleDocuments.filter(doc => doc.complexity === complexity);
}

export function getSampleDocumentsByLanguage(sourceLanguage: string, targetLanguage?: string): SampleDocument[] {
  return sampleDocuments.filter(doc => {
    if (targetLanguage) {
      return doc.sourceLanguage === sourceLanguage && doc.targetLanguages.includes(targetLanguage);
    }
    return doc.sourceLanguage === sourceLanguage;
  });
}

export function searchSampleDocuments(query: string): SampleDocument[] {
  const lowercaseQuery = query.toLowerCase();
  return sampleDocuments.filter(doc =>
    doc.title.toLowerCase().includes(lowercaseQuery) ||
    doc.description.toLowerCase().includes(lowercaseQuery) ||
    doc.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery)) ||
    doc.content.toLowerCase().includes(lowercaseQuery)
  );
}
