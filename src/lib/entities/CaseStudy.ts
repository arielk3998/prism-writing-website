/**
 * CaseStudy Entity
 * Handles case study data and API interactions
 */

export interface CaseStudyData {
  id?: string;
  title: string;
  client_name: string;
  industry: string;
  service_type: 'document_translation' | 'website_localization' | 'content_writing' | 'copywriting' | 'technical_writing';
  challenge: string;
  solution: string;
  results: string;
  languages_involved?: string[];
  project_duration?: string;
  featured?: boolean;
  testimonial?: string;
  image_url?: string;
  created_date?: string;
}

export class CaseStudy {
  /**
   * Create a new case study
   */
  static async create(data: Omit<CaseStudyData, 'id' | 'created_date'>): Promise<CaseStudyData> {
    try {
      const response = await fetch('/api/case-studies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          created_date: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create case study');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating case study:', error);
      throw error;
    }
  }

  /**
   * Get all case studies
   */
  static async list(sortBy?: string): Promise<CaseStudyData[]> {
    try {
      // For demo purposes, return mock data
      const mockCaseStudies: CaseStudyData[] = [
        {
          id: '1',
          title: 'Global E-commerce Platform Localization',
          client_name: 'TechGlobal Inc.',
          industry: 'Technology',
          service_type: 'website_localization',
          challenge: 'TechGlobal needed to localize their e-commerce platform for 12 European markets with tight deadlines and complex technical requirements.',
          solution: 'We implemented a comprehensive localization strategy including cultural adaptation, SEO optimization, and technical integration with their existing CMS.',
          results: 'Achieved 300% increase in international sales within 6 months and 95% customer satisfaction across all markets.',
          languages_involved: ['Spanish', 'French', 'German', 'Italian', 'Portuguese'],
          project_duration: '3 months',
          featured: true,
          testimonial: 'Prism Writing transformed our global expansion. Their technical translation expertise is unmatched.',
          created_date: '2024-01-15T00:00:00Z'
        },
        {
          id: '2',
          title: 'Medical Device Documentation Translation',
          client_name: 'Healthcare Solutions',
          industry: 'Healthcare',
          service_type: 'document_translation',
          challenge: 'Complex medical device documentation requiring FDA compliance and precision across multiple languages.',
          solution: 'Our medical translation specialists worked with regulatory experts to ensure 100% compliance and accuracy.',
          results: 'Successfully approved by regulatory bodies in all target markets, enabling faster product launch.',
          languages_involved: ['Spanish', 'French', 'Japanese', 'Mandarin'],
          project_duration: '6 weeks',
          featured: true,
          testimonial: 'The quality and cultural sensitivity of their medical translations gave us complete confidence.',
          created_date: '2024-02-10T00:00:00Z'
        },
        {
          id: '3',
          title: 'Legal Contract Translation Suite',
          client_name: 'Global Law Partners',
          industry: 'Legal',
          service_type: 'document_translation',
          challenge: 'High-stakes international contract translations requiring legal expertise and cultural understanding.',
          solution: 'Legal translation specialists with jurisdiction-specific knowledge handled all documentation.',
          results: 'Zero legal disputes related to translation accuracy, enabling smooth international partnerships.',
          languages_involved: ['Spanish', 'German', 'Mandarin'],
          project_duration: '4 weeks',
          featured: false,
          testimonial: 'Their legal translation expertise saved us from potential costly mistakes.',
          created_date: '2024-03-05T00:00:00Z'
        },
        {
          id: '4',
          title: 'Marketing Campaign Localization',
          client_name: 'E-commerce Plus',
          industry: 'Retail',
          service_type: 'content_writing',
          challenge: 'Adapting marketing campaigns for Asian markets while maintaining brand voice and cultural sensitivity.',
          solution: 'Native content creators developed culturally appropriate marketing materials from scratch.',
          results: 'Campaign performance exceeded expectations with 400% ROI in target markets.',
          languages_involved: ['Japanese', 'Korean', 'Mandarin'],
          project_duration: '8 weeks',
          featured: true,
          testimonial: 'Their website localization increased our international sales by 300%. Outstanding work.',
          created_date: '2024-04-12T00:00:00Z'
        },
        {
          id: '5',
          title: 'Technical Manual Translation',
          client_name: 'Industrial Solutions Corp',
          industry: 'Technology',
          service_type: 'technical_writing',
          challenge: 'Complex industrial equipment manuals requiring technical accuracy and safety compliance.',
          solution: 'Technical writers with engineering backgrounds ensured precise terminology and safety protocols.',
          results: 'Reduced support tickets by 60% and improved customer satisfaction scores.',
          languages_involved: ['German', 'French', 'Spanish'],
          project_duration: '10 weeks',
          featured: false,
          testimonial: 'The technical accuracy and attention to detail exceeded our expectations.',
          created_date: '2024-05-20T00:00:00Z'
        },
        {
          id: '6',
          title: 'Financial Services Compliance Documentation',
          client_name: 'Global Financial Group',
          industry: 'Finance',
          service_type: 'document_translation',
          challenge: 'Regulatory compliance documentation for international banking operations.',
          solution: 'Financial translation experts ensured compliance with local regulations in each market.',
          results: 'Passed all regulatory audits and accelerated market entry by 40%.',
          languages_involved: ['French', 'German', 'Italian', 'Portuguese'],
          project_duration: '12 weeks',
          featured: false,
          testimonial: 'Their expertise in financial regulations made our international expansion seamless.',
          created_date: '2024-06-08T00:00:00Z'
        }
      ];

      // Apply sorting if specified
      if (sortBy) {
        const isDescending = sortBy.startsWith('-');
        const field = isDescending ? sortBy.substring(1) : sortBy;
        
        mockCaseStudies.sort((a, b) => {
          const aValue = a[field as keyof CaseStudyData] || '';
          const bValue = b[field as keyof CaseStudyData] || '';
          
          if (field === 'created_date') {
            const aDate = new Date(aValue as string);
            const bDate = new Date(bValue as string);
            return isDescending ? bDate.getTime() - aDate.getTime() : aDate.getTime() - bDate.getTime();
          }
          
          if (aValue < bValue) return isDescending ? 1 : -1;
          if (aValue > bValue) return isDescending ? -1 : 1;
          return 0;
        });
      }

      return mockCaseStudies;
    } catch (error) {
      console.error('Error fetching case studies:', error);
      return [];
    }
  }

  /**
   * Get a single case study by ID
   */
  static async get(id: string): Promise<CaseStudyData | null> {
    try {
      const studies = await this.list();
      return studies.find(study => study.id === id) || null;
    } catch (error) {
      console.error('Error fetching case study:', error);
      return null;
    }
  }

  /**
   * Update a case study
   */
  static async update(id: string, data: Partial<CaseStudyData>): Promise<CaseStudyData> {
    try {
      const response = await fetch(`/api/case-studies/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          updated_date: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update case study');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating case study:', error);
      throw error;
    }
  }

  /**
   * Delete a case study
   */
  static async delete(id: string): Promise<boolean> {
    try {
      const response = await fetch(`/api/case-studies/${id}`, {
        method: 'DELETE',
      });

      return response.ok;
    } catch (error) {
      console.error('Error deleting case study:', error);
      return false;
    }
  }
}
