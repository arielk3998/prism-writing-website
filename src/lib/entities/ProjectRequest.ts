/**
 * ProjectRequest Entity
 * Handles project request data and API interactions
 */

export interface ProjectRequestData {
  client_name: string;
  client_email: string;
  company_name?: string;
  service_type: 'document_translation' | 'website_localization' | 'content_writing' | 'copywriting' | 'technical_writing';
  source_language?: string;
  target_languages: string[];
  industry?: 'legal' | 'medical' | 'technical' | 'marketing' | 'finance' | 'education' | 'government' | 'retail' | 'other';
  project_description: string;
  word_count?: number;
  deadline?: string;
  budget_range?: 'under_1000' | '1000_5000' | '5000_15000' | '15000_50000' | 'over_50000';
  urgency?: 'standard' | 'urgent' | 'rush';
  status?: 'pending' | 'reviewed' | 'quoted' | 'accepted' | 'in_progress' | 'completed';
  estimated_quote?: number;
  notes?: string;
}

export class ProjectRequest {
  /**
   * Create a new project request
   */
  static async create(data: Omit<ProjectRequestData, 'status'>): Promise<ProjectRequestData> {
    try {
      const response = await fetch('/api/project-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          status: 'pending',
          created_date: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create project request');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating project request:', error);
      throw error;
    }
  }

  /**
   * Get all project requests
   */
  static async list(sortBy?: string): Promise<ProjectRequestData[]> {
    try {
      const url = new URL('/api/project-requests', window.location.origin);
      if (sortBy) {
        url.searchParams.append('sort', sortBy);
      }

      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error('Failed to fetch project requests');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching project requests:', error);
      return [];
    }
  }

  /**
   * Get a single project request by ID
   */
  static async get(id: string): Promise<ProjectRequestData | null> {
    try {
      const response = await fetch(`/api/project-requests/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error('Failed to fetch project request');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching project request:', error);
      return null;
    }
  }

  /**
   * Update a project request
   */
  static async update(id: string, data: Partial<ProjectRequestData>): Promise<ProjectRequestData> {
    try {
      const response = await fetch(`/api/project-requests/${id}`, {
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
        throw new Error('Failed to update project request');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating project request:', error);
      throw error;
    }
  }
}
