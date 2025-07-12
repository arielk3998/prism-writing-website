// Leads System - Stub Version
// This is a stub implementation to resolve build issues

export interface Lead {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  company?: string;
  status: string;
  score?: number;
  source?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LeadFilters {
  status?: string[];
  score?: { min?: number; max?: number };
  source?: string[];
  dateRange?: { start?: Date; end?: Date };
  search?: string;
}

export interface LeadPaginationResult {
  leads: Lead[];
  totalCount: number;
  hasMore: boolean;
}

export class LeadManager {
  constructor() {
    console.log('LeadManager stub initialized');
  }

  async getLeads(
    filters: LeadFilters = {},
    page: number = 1,
    limit: number = 20
  ): Promise<LeadPaginationResult> {
    console.log('STUB: getLeads called', { filters, page, limit });
    return {
      leads: [],
      totalCount: 0,
      hasMore: false
    };
  }

  async getLeadById(id: string): Promise<Lead | null> {
    console.log('STUB: getLeadById called for:', id);
    return null;
  }

  async createLead(data: Partial<Lead>): Promise<Lead> {
    console.log('STUB: createLead called with:', data);
    return {
      id: 'stub-id',
      email: data.email || 'stub@example.com',
      name: data.name,
      phone: data.phone,
      company: data.company,
      status: data.status || 'NEW',
      score: data.score,
      source: data.source,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  async updateLead(id: string, data: Partial<Lead>): Promise<Lead | null> {
    console.log('STUB: updateLead called for:', id, data);
    return null;
  }

  async deleteLead(id: string): Promise<boolean> {
    console.log('STUB: deleteLead called for:', id);
    return false;
  }

  async updateLeadStatus(id: string, status: string): Promise<Lead | null> {
    console.log('STUB: updateLeadStatus called for:', id, status);
    return null;
  }

  async getLeadsByStatus(status: string): Promise<Lead[]> {
    console.log('STUB: getLeadsByStatus called for:', status);
    return [];
  }

  async searchLeads(query: string): Promise<Lead[]> {
    console.log('STUB: searchLeads called with:', query);
    return [];
  }

  async getLeadStats(): Promise<any> {
    console.log('STUB: getLeadStats called');
    return {
      total: 0,
      byStatus: {},
      bySource: {},
      averageScore: 0
    };
  }
}

// Export instance
export const leadManager = new LeadManager();

// Additional helper functions for compatibility
export const getLeads = async (filters: LeadFilters = {}, page: number = 1, limit: number = 20) => {
  return leadManager.getLeads(filters, page, limit);
};

export const getLeadById = async (id: string) => {
  return leadManager.getLeadById(id);
};

export const createLead = async (data: Partial<Lead>) => {
  return leadManager.createLead(data);
};

export const updateLead = async (id: string, data: Partial<Lead>) => {
  return leadManager.updateLead(id, data);
};

export const deleteLead = async (id: string) => {
  return leadManager.deleteLead(id);
};

export const updateLeadStatus = async (id: string, status: string) => {
  return leadManager.updateLeadStatus(id, status);
};

// Prisma stub for compatibility
export const prisma = {
  lead: {
    findMany: async () => [],
    findUnique: async () => null,
    create: async () => null,
    update: async () => null,
    delete: async () => null
  }
};

export default leadManager;
