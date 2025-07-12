// Projects System - Stub Version
// This is a stub implementation to resolve build issues

export interface Project {
  id: string;
  title: string;
  description?: string;
  status: string;
  type?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  deadline?: Date;
  completionPercentage?: number;
  createdAt: Date;
  updatedAt: Date;
  userId?: string;
  clientId?: string;
  assignedMemberId?: string;
}

export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  estimatedHours: number;
  defaultRate: number;
  phases: ProjectPhase[];
  deliverables: string[];
  category: 'content-writing' | 'copywriting' | 'technical-writing' | 'editing' | 'strategy';
}

export interface ProjectPhase {
  id: string;
  name: string;
  description: string;
  estimatedHours: number;
  order: number;
  dependencies: string[];
  milestones: Milestone[];
}

export interface Milestone {
  id: string;
  name: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  deliverables: string[];
}

export class ProjectManager {
  constructor() {
    console.log('ProjectManager stub initialized');
  }

  async getProjects(userId?: string): Promise<Project[]> {
    console.log('STUB: getProjects called for user:', userId);
    return [];
  }

  async getProject(id: string): Promise<Project | null> {
    console.log('STUB: getProject called for:', id);
    return null;
  }

  async createProject(data: Partial<Project>): Promise<Project> {
    console.log('STUB: createProject called with:', data);
    return {
      id: 'stub-project-id',
      title: data.title || 'New Project',
      description: data.description,
      status: data.status || 'ACTIVE',
      type: data.type,
      priority: data.priority || 'medium',
      deadline: data.deadline,
      completionPercentage: data.completionPercentage || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: data.userId,
      clientId: data.clientId,
      assignedMemberId: data.assignedMemberId
    };
  }

  async updateProject(id: string, data: Partial<Project>): Promise<Project | null> {
    console.log('STUB: updateProject called for:', id, data);
    return null;
  }

  async deleteProject(id: string): Promise<boolean> {
    console.log('STUB: deleteProject called for:', id);
    return false;
  }

  async getProjectTemplates(): Promise<ProjectTemplate[]> {
    console.log('STUB: getProjectTemplates called');
    return [];
  }

  async createProjectFromTemplate(templateId: string, customData: any): Promise<Project> {
    console.log('STUB: createProjectFromTemplate called', { templateId, customData });
    return {
      id: 'stub-project-id',
      title: customData.name || 'Project from Template',
      description: customData.description || 'Created from template',
      status: 'ACTIVE',
      type: 'content-writing',
      priority: 'medium',
      completionPercentage: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: customData.userId,
      clientId: customData.clientId
    };
  }

  async getProjectStats(userId?: string): Promise<any> {
    console.log('STUB: getProjectStats called for user:', userId);
    return {
      total: 0,
      active: 0,
      completed: 0,
      overdue: 0
    };
  }
}

// Export instance
export const projectManager = new ProjectManager();

// Helper functions for compatibility
export const getProjects = async (userId?: string) => {
  return projectManager.getProjects(userId);
};

export const getProject = async (id: string) => {
  return projectManager.getProject(id);
};

export const createProject = async (data: Partial<Project>) => {
  return projectManager.createProject(data);
};

export const updateProject = async (id: string, data: Partial<Project>) => {
  return projectManager.updateProject(id, data);
};

export const deleteProject = async (id: string) => {
  return projectManager.deleteProject(id);
};

export const getProjectTemplates = async () => {
  return projectManager.getProjectTemplates();
};

export const createProjectFromTemplate = async (templateId: string, customData: any) => {
  return projectManager.createProjectFromTemplate(templateId, customData);
};

export default projectManager;
