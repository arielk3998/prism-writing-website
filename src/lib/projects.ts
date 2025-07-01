/**
 * Advanced Project Management System
 * 
 * Comprehensive project tracking, document collaboration, 
 * timeline management, and business intelligence for
 * professional writing services.
 */

import { prisma } from './database';

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
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  deliverables: string[];
}

export interface ProjectCollaboration {
  id: string;
  projectId: string;
  document: {
    id: string;
    title: string;
    content: string;
    version: number;
    lastModified: string;
    collaborators: ProjectCollaborator[];
  };
  comments: ProjectComment[];
  revisions: DocumentRevision[];
}

export interface ProjectCollaborator {
  userId: string;
  role: 'owner' | 'editor' | 'reviewer' | 'viewer';
  permissions: string[];
  joinedAt: string;
}

export interface ProjectComment {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
  resolved: boolean;
  position?: {
    start: number;
    end: number;
  };
}

export interface DocumentRevision {
  id: string;
  version: number;
  content: string;
  changes: string;
  authorId: string;
  timestamp: string;
}

export interface ProjectMetadata {
  template?: ProjectTemplate;
  phases?: ProjectPhase[];
  milestones?: Milestone[];
}

export interface DocumentMetadata {
  collaborators: ProjectCollaborator[];
  comments: ProjectComment[];
  revisions: DocumentRevision[];
}

/**
 * Project Templates for different writing services
 */
export const PROJECT_TEMPLATES: ProjectTemplate[] = [
  {
    id: 'blog-content-series',
    name: 'Blog Content Series',
    description: 'Multi-post blog content campaign with SEO optimization',
    estimatedHours: 40,
    defaultRate: 75,
    category: 'content-writing',
    phases: [
      {
        id: 'research',
        name: 'Research & Strategy',
        description: 'Topic research, keyword analysis, content calendar',
        estimatedHours: 8,
        order: 1,
        dependencies: [],
        milestones: [
          {
            id: 'keyword-research',
            name: 'Keyword Research Complete',
            description: 'Primary and secondary keywords identified',
            dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'pending',
            deliverables: ['Keyword Research Document', 'Content Calendar']
          }
        ]
      },
      {
        id: 'content-creation',
        name: 'Content Creation',
        description: 'Writing, editing, and optimizing blog posts',
        estimatedHours: 25,
        order: 2,
        dependencies: ['research'],
        milestones: [
          {
            id: 'first-draft',
            name: 'First Draft Complete',
            description: 'Initial drafts of all blog posts',
            dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'pending',
            deliverables: ['Blog Post Drafts']
          }
        ]
      },
      {
        id: 'review-publish',
        name: 'Review & Publishing',
        description: 'Final review, SEO optimization, and publishing',
        estimatedHours: 7,
        order: 3,
        dependencies: ['content-creation'],
        milestones: [
          {
            id: 'content-published',
            name: 'Content Published',
            description: 'All blog posts published and optimized',
            dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'pending',
            deliverables: ['Published Blog Posts', 'Performance Report']
          }
        ]
      }
    ],
    deliverables: [
      'Keyword Research Document',
      'Content Calendar',
      'Blog Post Series (5-10 posts)',
      'SEO Optimization Report',
      'Performance Analytics Setup'
    ]
  },
  {
    id: 'technical-documentation',
    name: 'Technical Documentation Suite',
    description: 'Comprehensive technical documentation with API references',
    estimatedHours: 60,
    defaultRate: 85,
    category: 'technical-writing',
    phases: [
      {
        id: 'analysis',
        name: 'Technical Analysis',
        description: 'System analysis and documentation planning',
        estimatedHours: 12,
        order: 1,
        dependencies: [],
        milestones: [
          {
            id: 'technical-audit',
            name: 'Technical Audit Complete',
            description: 'Full system analysis and documentation requirements',
            dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'pending',
            deliverables: ['Technical Audit Report', 'Documentation Plan']
          }
        ]
      },
      {
        id: 'documentation',
        name: 'Documentation Writing',
        description: 'Creating comprehensive technical documentation',
        estimatedHours: 35,
        order: 2,
        dependencies: ['analysis'],
        milestones: [
          {
            id: 'user-guides',
            name: 'User Guides Complete',
            description: 'End-user documentation finished',
            dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'pending',
            deliverables: ['User Guides', 'Admin Documentation']
          }
        ]
      },
      {
        id: 'api-docs',
        name: 'API Documentation',
        description: 'Technical API reference and examples',
        estimatedHours: 13,
        order: 3,
        dependencies: ['documentation'],
        milestones: [
          {
            id: 'api-reference',
            name: 'API Reference Complete',
            description: 'Complete API documentation with examples',
            dueDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'pending',
            deliverables: ['API Reference', 'Code Examples', 'Integration Guides']
          }
        ]
      }
    ],
    deliverables: [
      'Technical Audit Report',
      'User Documentation Suite',
      'Administrator Guides',
      'API Reference Documentation',
      'Integration Examples',
      'Troubleshooting Guides'
    ]
  }
];

/**
 * Create a new project from template
 */
export async function createProjectFromTemplate(
  templateId: string,
  customData: {
    clientId: string;
    name: string;
    description?: string;
    budget?: number;
    deadline?: string;
    customRequirements?: string[];
  }
) {
  try {
    const template = PROJECT_TEMPLATES.find(t => t.id === templateId);
    if (!template) {
      throw new Error('Template not found');
    }

    const project = await prisma.project.create({
      data: {
        name: customData.name,
        description: customData.description || template.description,
        status: 'draft',
        type: template.category,
        totalBudget: customData.budget || template.estimatedHours * template.defaultRate,
        clientId: customData.clientId,
        estimatedHours: template.estimatedHours,
        deadline: customData.deadline ? new Date(customData.deadline) : undefined,
        requirements: customData.customRequirements || template.deliverables,
        templateId: template.id,
        phase: 'planning',
        metadata: {
          template: template,
          phases: template.phases,
          milestones: template.phases.flatMap(p => p.milestones)
        } as ProjectMetadata
      }
    });

    console.log(`✅ Project created from template: ${project.id}`);
    return { success: true, project };
  } catch (error) {
    console.error('❌ Error creating project from template:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get project dashboard with analytics
 */
export async function getProjectDashboard(userId: string) {
  try {
    const [projects, analytics] = await Promise.all([
      prisma.project.findMany({
        where: {
          OR: [
            { ownerId: userId },
            { assignedUsers: { some: { userId } } }
          ]
        },
        include: {
          client: true,
          owner: true,
          assignedUsers: {
            include: { user: true }
          }
        },
        orderBy: { updatedAt: 'desc' }
      }),
      getProjectAnalytics(userId)
    ]);

    return {
      success: true,
      data: {
        projects,
        analytics,
        summary: {
          total: projects.length,
          active: projects.filter(p => p.status === 'active').length,
          completed: projects.filter(p => p.status === 'completed').length,
          overdue: projects.filter(p => 
            p.deadline && new Date(p.deadline) < new Date() && p.status !== 'completed'
          ).length
        }
      }
    };
  } catch (error) {
    console.error('❌ Error getting project dashboard:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get project analytics
 */
export async function getProjectAnalytics(userId: string) {
  try {
    const projects = await prisma.project.findMany({
      where: {
        OR: [
          { ownerId: userId },
          { assignedUsers: { some: { userId } } }
        ]
      },
      include: {
        timeEntries: true,
        invoices: true
      }
    });

    const analytics = {
      revenue: {
        total: projects.reduce((sum, p) => sum + (p.totalBudget || 0), 0),
        thisMonth: 0,
        lastMonth: 0,
        growth: 0
      },
      time: {
        totalHours: projects.reduce((sum, p) => 
          sum + p.timeEntries.reduce((timeSum, entry) => timeSum + entry.hours, 0), 0
        ),
        billableHours: 0,
        efficiency: 0
      },
      projects: {
        completion: projects.filter(p => p.status === 'completed').length / projects.length * 100,
        avgDuration: 0,
        onTimeDelivery: 0
      },
      clients: {
        total: new Set(projects.map(p => p.clientId)).size,
        returning: 0,
        satisfaction: 0
      }
    };

    return analytics;
  } catch (error) {
    console.error('❌ Error getting project analytics:', error);
    return null;
  }
}

/**
 * Real-time document collaboration
 */
export async function createCollaborativeDocument(
  projectId: string,
  title: string,
  initialContent: string = '',
  ownerId: string
) {
  try {
    const document = await prisma.document.create({
      data: {
        title,
        content: initialContent,
        projectId,
        ownerId,
        version: 1,
        metadata: {
          collaborators: [{ userId: ownerId, role: 'owner', permissions: ['read', 'write', 'admin'], joinedAt: new Date().toISOString() }],
          comments: [],
          revisions: []
        } as DocumentMetadata
      }
    });

    return { success: true, document };
  } catch (error) {
    console.error('❌ Error creating collaborative document:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Add collaborator to document
 */
export async function addDocumentCollaborator(
  documentId: string,
  userId: string,
  role: 'editor' | 'reviewer' | 'viewer' = 'viewer'
) {
  try {
    const document = await prisma.document.findUnique({
      where: { id: documentId }
    });

    if (!document) {
      throw new Error('Document not found');
    }

    const metadata = document.metadata as DocumentMetadata;
    const collaborators = metadata.collaborators || [];

    // Check if user is already a collaborator
    const existingCollaborator = collaborators.find((c: ProjectCollaborator) => c.userId === userId);
    if (existingCollaborator) {
      // Update role
      existingCollaborator.role = role;
    } else {
      // Add new collaborator
      collaborators.push({
        userId,
        role,
        permissions: getPermissions(role),
        joinedAt: new Date().toISOString()
      });
    }

    await prisma.document.update({
      where: { id: documentId },
      data: {
        metadata: {
          ...metadata,
          collaborators
        }
      }
    });

    return { success: true };
  } catch (error) {
    console.error('❌ Error adding document collaborator:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get permissions for a role
 */
function getPermissions(role: string): string[] {
  switch (role) {
    case 'owner':
      return ['read', 'write', 'admin', 'delete'];
    case 'editor':
      return ['read', 'write'];
    case 'reviewer':
      return ['read', 'comment'];
    case 'viewer':
    default:
      return ['read'];
  }
}

/**
 * Save document revision
 */
export async function saveDocumentRevision(
  documentId: string,
  content: string,
  authorId: string,
  changes?: string
) {
  try {
    const document = await prisma.document.findUnique({
      where: { id: documentId }
    });

    if (!document) {
      throw new Error('Document not found');
    }

    const newVersion = document.version + 1;
    const metadata = document.metadata as DocumentMetadata;
    const revisions = metadata.revisions || [];

    // Add new revision
    revisions.push({
      id: `rev_${newVersion}`,
      version: newVersion,
      content: document.content, // Save previous content as revision
      changes: changes || 'Document updated',
      authorId,
      timestamp: new Date().toISOString()
    });

    // Update document with new content and revision
    await prisma.document.update({
      where: { id: documentId },
      data: {
        content,
        version: newVersion,
        updatedAt: new Date(),
        metadata: {
          ...metadata,
          revisions
        }
      }
    });

    return { success: true, version: newVersion };
  } catch (error) {
    console.error('❌ Error saving document revision:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Add comment to document
 */
export async function addDocumentComment(
  documentId: string,
  userId: string,
  content: string,
  position?: { start: number; end: number }
) {
  try {
    const document = await prisma.document.findUnique({
      where: { id: documentId }
    });

    if (!document) {
      throw new Error('Document not found');
    }

    const metadata = document.metadata as DocumentMetadata;
    const comments = metadata.comments || [];

    const newComment = {
      id: `comment_${Date.now()}`,
      userId,
      content,
      timestamp: new Date().toISOString(),
      resolved: false,
      position
    };

    comments.push(newComment);

    await prisma.document.update({
      where: { id: documentId },
      data: {
        metadata: {
          ...metadata,
          comments
        }
      }
    });

    return { success: true, comment: newComment };
  } catch (error) {
    console.error('❌ Error adding document comment:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
