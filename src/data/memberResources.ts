/**
 * Member Resources Data
 * 
 * Centralized resource management for Prism Writing Cooperative members.
 * Includes templates, guides, tools, and shared resources.
 */

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'template' | 'guide' | 'tool' | 'reference' | 'training';
  type: 'pdf' | 'doc' | 'md' | 'link' | 'video' | 'tool';
  url: string;
  downloadUrl?: string;
  author: string;
  dateAdded: string;
  lastUpdated: string;
  tags: string[];
  accessLevel: 'public' | 'member' | 'admin';
  featured?: boolean;
  fileSize?: string;
}

export const memberResources: Resource[] = [
  // Templates - API Documentation
  {
    id: 'rest-api-documentation-template',
    title: 'REST API Documentation Template',
    description: 'Comprehensive template for documenting REST APIs with endpoints, authentication, and examples.',
    category: 'template',
    type: 'md',
    url: '/member-resources/templates/api-documentation/REST-API-Documentation-Template.md',
    downloadUrl: '/member-resources/templates/api-documentation/REST-API-Documentation-Template.md',
    author: 'Prism Writing Cooperative',
    dateAdded: '2025-07-02',
    lastUpdated: '2025-07-02',
    tags: ['API', 'REST', 'documentation', 'template', 'technical'],
    accessLevel: 'member',
    featured: true,
    fileSize: '15 KB'
  },
  {
    id: 'graphql-api-documentation-template',
    title: 'GraphQL API Documentation Template',
    description: 'Structured template for GraphQL API documentation including schema, queries, and mutations.',
    category: 'template',
    type: 'md',
    url: '/member-resources/templates/api-documentation/GraphQL-API-Documentation-Template.md',
    downloadUrl: '/member-resources/templates/api-documentation/GraphQL-API-Documentation-Template.md',
    author: 'Prism Writing Cooperative',
    dateAdded: '2025-07-02',
    lastUpdated: '2025-07-02',
    tags: ['API', 'GraphQL', 'documentation', 'template', 'schema'],
    accessLevel: 'member',
    fileSize: '18 KB'
  },
  {
    id: 'sdk-library-documentation-template',
    title: 'SDK/Library Documentation Template',
    description: 'Template for comprehensive SDK and library documentation with installation, usage, and examples.',
    category: 'template',
    type: 'md',
    url: '/member-resources/templates/api-documentation/SDK-Library-Documentation-Template.md',
    downloadUrl: '/member-resources/templates/api-documentation/SDK-Library-Documentation-Template.md',
    author: 'Prism Writing Cooperative',
    dateAdded: '2025-07-02',
    lastUpdated: '2025-07-02',
    tags: ['SDK', 'library', 'documentation', 'template', 'developer'],
    accessLevel: 'member',
    fileSize: '16 KB'
  },
  {
    id: 'webhook-integration-guide-template',
    title: 'Webhook Integration Guide Template',
    description: 'Template for creating webhook integration documentation with setup and troubleshooting.',
    category: 'template',
    type: 'md',
    url: '/member-resources/templates/api-documentation/Webhook-Integration-Guide-Template.md',
    downloadUrl: '/member-resources/templates/api-documentation/Webhook-Integration-Guide-Template.md',
    author: 'Prism Writing Cooperative',
    dateAdded: '2025-07-02',
    lastUpdated: '2025-07-02',
    tags: ['webhook', 'integration', 'documentation', 'template', 'API'],
    accessLevel: 'member',
    fileSize: '14 KB'
  },
  {
    id: 'api-reference-quick-start-template',
    title: 'API Reference Quick Start Template',
    description: 'Quick start template for API reference documentation with essential endpoints and examples.',
    category: 'template',
    type: 'md',
    url: '/member-resources/templates/api-documentation/API-Reference-Quick-Start-Template.md',
    downloadUrl: '/member-resources/templates/api-documentation/API-Reference-Quick-Start-Template.md',
    author: 'Prism Writing Cooperative',
    dateAdded: '2025-07-02',
    lastUpdated: '2025-07-02',
    tags: ['API', 'reference', 'quick start', 'template', 'documentation'],
    accessLevel: 'member',
    fileSize: '12 KB'
  },

  // Templates - Standard Operating Procedures
  {
    id: 'customer-service-sop-template',
    title: 'Customer Service SOP Template',
    description: 'Comprehensive template for customer service standard operating procedures.',
    category: 'template',
    type: 'md',
    url: '/member-resources/templates/sops/Customer-Service-SOP-Template.md',
    downloadUrl: '/member-resources/templates/sops/Customer-Service-SOP-Template.md',
    author: 'Prism Writing Cooperative',
    dateAdded: '2025-07-02',
    lastUpdated: '2025-07-02',
    tags: ['SOP', 'customer service', 'procedures', 'template', 'operations'],
    accessLevel: 'member',
    fileSize: '20 KB'
  },
  {
    id: 'quality-assurance-sop-template',
    title: 'Quality Assurance SOP Template',
    description: 'Template for quality assurance procedures and testing protocols.',
    category: 'template',
    type: 'md',
    url: '/member-resources/templates/sops/Quality-Assurance-SOP-Template.md',
    downloadUrl: '/member-resources/templates/sops/Quality-Assurance-SOP-Template.md',
    author: 'Prism Writing Cooperative',
    dateAdded: '2025-07-02',
    lastUpdated: '2025-07-02',
    tags: ['SOP', 'quality assurance', 'testing', 'template', 'QA'],
    accessLevel: 'member',
    fileSize: '18 KB'
  },
  {
    id: 'data-management-sop-template',
    title: 'Data Management SOP Template',
    description: 'Template for data management, backup, and security procedures.',
    category: 'template',
    type: 'md',
    url: '/member-resources/templates/sops/Data-Management-SOP-Template.md',
    downloadUrl: '/member-resources/templates/sops/Data-Management-SOP-Template.md',
    author: 'Prism Writing Cooperative',
    dateAdded: '2025-07-02',
    lastUpdated: '2025-07-02',
    tags: ['SOP', 'data management', 'security', 'template', 'backup'],
    accessLevel: 'member',
    fileSize: '22 KB'
  },
  {
    id: 'human-resources-sop-template',
    title: 'Human Resources SOP Template',
    description: 'Template for HR procedures including hiring, onboarding, and performance management.',
    category: 'template',
    type: 'md',
    url: '/member-resources/templates/sops/Human-Resources-SOP-Template.md',
    downloadUrl: '/member-resources/templates/sops/Human-Resources-SOP-Template.md',
    author: 'Prism Writing Cooperative',
    dateAdded: '2025-07-02',
    lastUpdated: '2025-07-02',
    tags: ['SOP', 'human resources', 'HR', 'template', 'hiring'],
    accessLevel: 'member',
    fileSize: '24 KB'
  },
  {
    id: 'it-systems-technology-sop-template',
    title: 'IT Systems & Technology SOP Template',
    description: 'Template for IT operations, system maintenance, and technology procedures.',
    category: 'template',
    type: 'md',
    url: '/member-resources/templates/sops/IT-Systems-Technology-SOP-Template.md',
    downloadUrl: '/member-resources/templates/sops/IT-Systems-Technology-SOP-Template.md',
    author: 'Prism Writing Cooperative',
    dateAdded: '2025-07-02',
    lastUpdated: '2025-07-02',
    tags: ['SOP', 'IT', 'technology', 'template', 'systems'],
    accessLevel: 'member',
    fileSize: '26 KB'
  },

  // Templates - User Manuals & Guides
  {
    id: 'software-user-manual-template',
    title: 'Software User Manual Template',
    description: 'Comprehensive template for software application user manuals and guides.',
    category: 'template',
    type: 'md',
    url: '/member-resources/templates/user-manuals/Software-User-Manual-Template.md',
    downloadUrl: '/member-resources/templates/user-manuals/Software-User-Manual-Template.md',
    author: 'Prism Writing Cooperative',
    dateAdded: '2025-07-02',
    lastUpdated: '2025-07-02',
    tags: ['user manual', 'software', 'documentation', 'template', 'guide'],
    accessLevel: 'member',
    featured: true,
    fileSize: '28 KB'
  },
  {
    id: 'hardware-device-user-guide-template',
    title: 'Hardware Device User Guide Template',
    description: 'Template for hardware device user guides with setup, operation, and troubleshooting.',
    category: 'template',
    type: 'md',
    url: '/member-resources/templates/user-manuals/Hardware-Device-User-Guide-Template.md',
    downloadUrl: '/member-resources/templates/user-manuals/Hardware-Device-User-Guide-Template.md',
    author: 'Prism Writing Cooperative',
    dateAdded: '2025-07-02',
    lastUpdated: '2025-07-02',
    tags: ['user guide', 'hardware', 'device', 'template', 'manual'],
    accessLevel: 'member',
    fileSize: '25 KB'
  },
  {
    id: 'web-application-user-guide-template',
    title: 'Web Application User Guide Template',
    description: 'Template for web application user guides with navigation and feature documentation.',
    category: 'template',
    type: 'md',
    url: '/member-resources/templates/user-manuals/Web-Application-User-Guide-Template.md',
    downloadUrl: '/member-resources/templates/user-manuals/Web-Application-User-Guide-Template.md',
    author: 'Prism Writing Cooperative',
    dateAdded: '2025-07-02',
    lastUpdated: '2025-07-02',
    tags: ['user guide', 'web application', 'documentation', 'template', 'interface'],
    accessLevel: 'member',
    fileSize: '23 KB'
  },
  {
    id: 'process-procedure-manual-template',
    title: 'Process & Procedure Manual Template',
    description: 'Template for creating detailed process and procedure manuals for organizational workflows.',
    category: 'template',
    type: 'md',
    url: '/member-resources/templates/user-manuals/Process-Procedure-Manual-Template.md',
    downloadUrl: '/member-resources/templates/user-manuals/Process-Procedure-Manual-Template.md',
    author: 'Prism Writing Cooperative',
    dateAdded: '2025-07-02',
    lastUpdated: '2025-07-02',
    tags: ['process', 'procedure', 'manual', 'template', 'workflow'],
    accessLevel: 'member',
    fileSize: '24 KB'
  },
  {
    id: 'quick-reference-guide-template',
    title: 'Quick Reference Guide Template',
    description: 'Template for creating concise quick reference guides and cheat sheets.',
    category: 'template',
    type: 'md',
    url: '/member-resources/templates/user-manuals/Quick-Reference-Guide-Template.md',
    downloadUrl: '/member-resources/templates/user-manuals/Quick-Reference-Guide-Template.md',
    author: 'Prism Writing Cooperative',
    dateAdded: '2025-07-02',
    lastUpdated: '2025-07-02',
    tags: ['quick reference', 'guide', 'cheat sheet', 'template', 'reference'],
    accessLevel: 'member',
    fileSize: '18 KB'
  },

  // Templates - Training Materials
  {
    id: 'employee-onboarding-training-template',
    title: 'Employee Onboarding Training Program Template',
    description: 'Comprehensive template for employee onboarding and orientation programs.',
    category: 'template',
    type: 'md',
    url: '/member-resources/templates/training-materials/Employee-Onboarding-Training-Program-Template.md',
    downloadUrl: '/member-resources/templates/training-materials/Employee-Onboarding-Training-Program-Template.md',
    author: 'Prism Writing Cooperative',
    dateAdded: '2025-07-02',
    lastUpdated: '2025-07-02',
    tags: ['training', 'onboarding', 'employee', 'template', 'orientation'],
    accessLevel: 'member',
    featured: true,
    fileSize: '30 KB'
  },
  {
    id: 'technical-skills-training-template',
    title: 'Technical Skills Training Manual Template',
    description: 'Template for technical skills training programs with hands-on exercises and assessments.',
    category: 'template',
    type: 'md',
    url: '/member-resources/templates/training-materials/Technical-Skills-Training-Manual-Template.md',
    downloadUrl: '/member-resources/templates/training-materials/Technical-Skills-Training-Manual-Template.md',
    author: 'Prism Writing Cooperative',
    dateAdded: '2025-07-02',
    lastUpdated: '2025-07-02',
    tags: ['training', 'technical skills', 'manual', 'template', 'education'],
    accessLevel: 'member',
    fileSize: '32 KB'
  },
  {
    id: 'safety-training-curriculum-template',
    title: 'Safety Training Curriculum Template',
    description: 'Template for workplace safety training programs with compliance and certification tracking.',
    category: 'template',
    type: 'md',
    url: '/member-resources/templates/training-materials/Safety-Training-Curriculum-Template.md',
    downloadUrl: '/member-resources/templates/training-materials/Safety-Training-Curriculum-Template.md',
    author: 'Prism Writing Cooperative',
    dateAdded: '2025-07-02',
    lastUpdated: '2025-07-02',
    tags: ['training', 'safety', 'curriculum', 'template', 'compliance'],
    accessLevel: 'member',
    fileSize: '29 KB'
  },
  {
    id: 'leadership-development-workshop-template',
    title: 'Leadership Development Workshop Template',
    description: 'Template for leadership development workshops with exercises and skill assessments.',
    category: 'template',
    type: 'md',
    url: '/member-resources/templates/training-materials/Leadership-Development-Workshop-Template.md',
    downloadUrl: '/member-resources/templates/training-materials/Leadership-Development-Workshop-Template.md',
    author: 'Prism Writing Cooperative',
    dateAdded: '2025-07-02',
    lastUpdated: '2025-07-02',
    tags: ['training', 'leadership', 'workshop', 'template', 'development'],
    accessLevel: 'member',
    fileSize: '27 KB'
  },
  {
    id: 'compliance-training-program-template',
    title: 'Compliance Training Program Template',
    description: 'Template for compliance training programs with regulatory requirements and assessments.',
    category: 'template',
    type: 'md',
    url: '/member-resources/templates/training-materials/Compliance-Training-Program-Template.md',
    downloadUrl: '/member-resources/templates/training-materials/Compliance-Training-Program-Template.md',
    author: 'Prism Writing Cooperative',
    dateAdded: '2025-07-02',
    lastUpdated: '2025-07-02',
    tags: ['training', 'compliance', 'program', 'template', 'regulatory'],
    accessLevel: 'member',
    fileSize: '34 KB'
  },

  // Legacy Templates (keeping existing entries for compatibility)
  {
    id: 'client-intake-checklist',
    title: 'Technical Writing Client Intake Checklist',
    description: 'Comprehensive checklist to gather all necessary information from clients before starting technical writing projects.',
    category: 'template',
    type: 'md',
    url: '/member-resources/templates/Client-Intake-Checklist.md',
    downloadUrl: '/member-resources/templates/Client-Intake-Checklist.md',
    author: 'Prism Writing Cooperative',
    dateAdded: '2025-07-02',
    lastUpdated: '2025-07-02',
    tags: ['client management', 'intake', 'technical writing', 'project planning'],
    accessLevel: 'member',
    featured: true,
    fileSize: '4 KB'
  },
  {
    id: 'api-documentation-template',
    title: 'API Documentation Template',
    description: 'Standard template for creating comprehensive API documentation including endpoints, authentication, and examples.',
    category: 'template',
    type: 'doc',
    url: '/member-resources/templates/API-Documentation-Template.docx',
    author: 'Technical Writing Team',
    dateAdded: '2025-07-02',
    lastUpdated: '2025-07-02',
    tags: ['API', 'documentation', 'template', 'technical'],
    accessLevel: 'member',
    featured: true,
    fileSize: '25 KB'
  },
  {
    id: 'user-manual-template',
    title: 'User Manual Template',
    description: 'Structured template for creating user manuals with consistent formatting and comprehensive coverage.',
    category: 'template',
    type: 'doc',
    url: '/member-resources/templates/User-Manual-Template.docx',
    author: 'Documentation Team',
    dateAdded: '2025-07-02',
    lastUpdated: '2025-07-02',
    tags: ['user manual', 'documentation', 'template', 'end-user'],
    accessLevel: 'member',
    fileSize: '30 KB'
  },
  
  // Guides
  {
    id: 'style-guide',
    title: 'Prism Writing Style Guide',
    description: 'Official style guide covering writing standards, formatting, terminology, and best practices.',
    category: 'guide',
    type: 'pdf',
    url: '/member-resources/guides/Prism-Writing-Style-Guide.pdf',
    downloadUrl: '/member-resources/guides/Prism-Writing-Style-Guide.pdf',
    author: 'Editorial Team',
    dateAdded: '2025-07-02',
    lastUpdated: '2025-07-02',
    tags: ['style guide', 'writing standards', 'editorial', 'reference'],
    accessLevel: 'member',
    featured: true,
    fileSize: '2.5 MB'
  },
  {
    id: 'project-workflow-guide',
    title: 'Project Workflow Guide',
    description: 'Step-by-step guide for managing technical writing projects from initial contact to delivery.',
    category: 'guide',
    type: 'pdf',
    url: '/member-resources/guides/Project-Workflow-Guide.pdf',
    author: 'Project Management Team',
    dateAdded: '2025-07-02',
    lastUpdated: '2025-07-02',
    tags: ['workflow', 'project management', 'process', 'collaboration'],
    accessLevel: 'member',
    fileSize: '1.8 MB'
  },
  {
    id: 'client-communication-guide',
    title: 'Client Communication Best Practices',
    description: 'Guidelines for effective client communication throughout the project lifecycle.',
    category: 'guide',
    type: 'pdf',
    url: '/member-resources/guides/Client-Communication-Guide.pdf',
    author: 'Business Development Team',
    dateAdded: '2025-07-02',
    lastUpdated: '2025-07-02',
    tags: ['client relations', 'communication', 'business', 'professional development'],
    accessLevel: 'member',
    fileSize: '1.2 MB'
  },

  // Tools
  {
    id: 'document-checklist-tool',
    title: 'Document Quality Checklist',
    description: 'Interactive checklist for ensuring document quality and completeness before delivery.',
    category: 'tool',
    type: 'tool',
    url: '/tools/document-checklist',
    author: 'Quality Assurance Team',
    dateAdded: '2025-07-02',
    lastUpdated: '2025-07-02',
    tags: ['quality assurance', 'checklist', 'review', 'tool'],
    accessLevel: 'member',
    featured: true
  },
  {
    id: 'pricing-calculator',
    title: 'Project Pricing Calculator',
    description: 'Tool to help estimate project costs based on scope, complexity, and timeline.',
    category: 'tool',
    type: 'tool',
    url: '/tools/pricing-calculator',
    author: 'Business Operations',
    dateAdded: '2025-07-02',
    lastUpdated: '2025-07-02',
    tags: ['pricing', 'calculator', 'business', 'estimation'],
    accessLevel: 'member'
  },

  // Training Resources
  {
    id: 'technical-writing-fundamentals',
    title: 'Technical Writing Fundamentals Course',
    description: 'Comprehensive training course covering the basics of technical writing for new team members.',
    category: 'training',
    type: 'video',
    url: '/training/technical-writing-fundamentals',
    author: 'Training Department',
    dateAdded: '2025-07-02',
    lastUpdated: '2025-07-02',
    tags: ['training', 'fundamentals', 'onboarding', 'education'],
    accessLevel: 'member',
    featured: true
  },
  {
    id: 'api-documentation-masterclass',
    title: 'API Documentation Masterclass',
    description: 'Advanced training on creating world-class API documentation with hands-on examples.',
    category: 'training',
    type: 'video',
    url: '/training/api-documentation-masterclass',
    author: 'Senior Technical Writers',
    dateAdded: '2025-07-02',
    lastUpdated: '2025-07-02',
    tags: ['API', 'advanced', 'training', 'documentation'],
    accessLevel: 'member'
  },

  // Reference Materials
  {
    id: 'industry-compliance-reference',
    title: 'Industry Compliance Reference',
    description: 'Comprehensive reference for compliance requirements across different industries.',
    category: 'reference',
    type: 'pdf',
    url: '/member-resources/reference/Industry-Compliance-Reference.pdf',
    author: 'Compliance Team',
    dateAdded: '2025-07-02',
    lastUpdated: '2025-07-02',
    tags: ['compliance', 'regulations', 'industry standards', 'reference'],
    accessLevel: 'member',
    fileSize: '5.2 MB'
  },
  {
    id: 'terminology-database',
    title: 'Technical Terminology Database',
    description: 'Searchable database of technical terms and definitions used across projects.',
    category: 'reference',
    type: 'tool',
    url: '/tools/terminology-database',
    author: 'Editorial Team',
    dateAdded: '2025-07-02',
    lastUpdated: '2025-07-02',
    tags: ['terminology', 'glossary', 'reference', 'database'],
    accessLevel: 'member'
  }
];

// Helper functions
export const getResourcesByCategory = (category: Resource['category']) => {
  return memberResources.filter(resource => resource.category === category);
};

export const getFeaturedResources = () => {
  return memberResources.filter(resource => resource.featured);
};

export const getResourcesByAccessLevel = (accessLevel: Resource['accessLevel']) => {
  return memberResources.filter(resource => resource.accessLevel === accessLevel);
};

export const searchResources = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return memberResources.filter(resource => 
    resource.title.toLowerCase().includes(lowercaseQuery) ||
    resource.description.toLowerCase().includes(lowercaseQuery) ||
    resource.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const resourceCategories = [
  { id: 'template', name: 'Templates', icon: '📄', description: 'Document templates and forms' },
  { id: 'guide', name: 'Guides', icon: '📚', description: 'Process guides and best practices' },
  { id: 'tool', name: 'Tools', icon: '🔧', description: 'Interactive tools and calculators' },
  { id: 'reference', name: 'Reference', icon: '📖', description: 'Reference materials and databases' },
  { id: 'training', name: 'Training', icon: '🎓', description: 'Training courses and materials' }
];
