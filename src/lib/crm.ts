/**
 * Customer Relationship Management (CRM) System
 * 
 * Advanced client management, lead tracking, communication history,
 * and business intelligence for professional writing services.
 */

import { prisma } from './database';

export interface CRMContact {
  id: string;
  type: 'lead' | 'client' | 'partner' | 'vendor';
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  position?: string;
  source: 'website' | 'referral' | 'social-media' | 'networking' | 'cold-outreach' | 'other';
  status: 'new' | 'contacted' | 'qualified' | 'proposal-sent' | 'negotiating' | 'won' | 'lost' | 'client';
  tags: string[];
  customFields: Record<string, string | number | boolean>;
  createdAt: string;
  updatedAt: string;
}

export interface CRMActivity {
  id: string;
  contactId: string;
  type: 'email' | 'call' | 'meeting' | 'proposal' | 'contract' | 'project-update' | 'follow-up' | 'note';
  subject: string;
  description: string;
  outcome?: string;
  nextAction?: string;
  scheduledDate?: string;
  completedDate?: string;
  userId: string;
  metadata: Record<string, string | number | boolean>;
  createdAt: string;
}

export interface CRMOpportunity {
  id: string;
  contactId: string;
  name: string;
  description: string;
  value: number;
  probability: number; // 0-100
  stage: 'discovery' | 'qualification' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  source: string;
  expectedCloseDate: string;
  actualCloseDate?: string;
  products: string[];
  notes: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CRMPipeline {
  id: string;
  name: string;
  stages: PipelineStage[];
  opportunities: CRMOpportunity[];
  metrics: PipelineMetrics;
}

export interface PipelineStage {
  id: string;
  name: string;
  order: number;
  probability: number;
  color: string;
}

export interface PipelineMetrics {
  totalValue: number;
  weightedValue: number;
  averageDealSize: number;
  conversionRate: number;
  averageSalesCode: number; // days
}

export interface CRMAnalytics {
  leads: {
    total: number;
    thisMonth: number;
    conversionRate: number;
    sources: Record<string, number>;
  };
  opportunities: {
    total: number;
    totalValue: number;
    avgValue: number;
    pipeline: PipelineMetrics;
  };
  clients: {
    total: number;
    active: number;
    retention: number;
    satisfaction: number;
  };
  activities: {
    total: number;
    thisWeek: number;
    byType: Record<string, number>;
  };
}

/**
 * Default CRM Pipeline Stages
 */
export const DEFAULT_PIPELINE_STAGES: PipelineStage[] = [
  { id: 'discovery', name: 'Discovery', order: 1, probability: 10, color: '#E3F2FD' },
  { id: 'qualification', name: 'Qualification', order: 2, probability: 25, color: '#F3E5F5' },
  { id: 'proposal', name: 'Proposal Sent', order: 3, probability: 50, color: '#FFF3E0' },
  { id: 'negotiation', name: 'Negotiation', order: 4, probability: 75, color: '#E8F5E8' },
  { id: 'closed-won', name: 'Closed Won', order: 5, probability: 100, color: '#C8E6C9' },
  { id: 'closed-lost', name: 'Closed Lost', order: 6, probability: 0, color: '#FFCDD2' }
];

/**
 * Create a new CRM contact
 */
export async function createContact(contactData: Omit<CRMContact, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const contact = await prisma.contact.create({
      data: {
        firstName: contactData.firstName,
        lastName: contactData.lastName,
        email: contactData.email,
        phone: contactData.phone,
        company: contactData.company,
        position: contactData.position,
        type: contactData.type,
        status: contactData.status,
        source: contactData.source,
        tags: contactData.tags,
        metadata: contactData.customFields
      }
    });

    console.log(`✅ Contact created: ${contact.id}`);
    return { success: true, contact };
  } catch (error) {
    console.error('❌ Error creating contact:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get CRM dashboard with analytics
 */
export async function getCRMDashboard(userId: string) {
  try {
    const [contacts, opportunities, activities] = await Promise.all([
      prisma.contact.findMany({
        where: { ownerId: userId },
        orderBy: { updatedAt: 'desc' }
      }),
      prisma.opportunity.findMany({
        where: { ownerId: userId },
        include: { contact: true },
        orderBy: { updatedAt: 'desc' }
      }),
      prisma.activity.findMany({
        where: { userId },
        include: { contact: true },
        orderBy: { createdAt: 'desc' },
        take: 50
      })
    ]);

    const analytics = calculateCRMAnalytics(contacts, opportunities, activities);

    return {
      success: true,
      data: {
        contacts: contacts.slice(0, 10), // Recent contacts
        opportunities: opportunities.slice(0, 10), // Recent opportunities
        activities: activities.slice(0, 20), // Recent activities
        analytics,
        pipeline: createPipelineView(opportunities)
      }
    };
  } catch (error) {
    console.error('❌ Error getting CRM dashboard:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Create an opportunity
 */
export async function createOpportunity(opportunityData: Omit<CRMOpportunity, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const opportunity = await prisma.opportunity.create({
      data: {
        name: opportunityData.name,
        description: opportunityData.description,
        value: opportunityData.value,
        probability: opportunityData.probability,
        stage: opportunityData.stage,
        source: opportunityData.source,
        expectedCloseDate: new Date(opportunityData.expectedCloseDate),
        actualCloseDate: opportunityData.actualCloseDate ? new Date(opportunityData.actualCloseDate) : null,
        notes: opportunityData.notes,
        ownerId: opportunityData.ownerId,
        contactId: opportunityData.contactId,
        metadata: { products: opportunityData.products }
      }
    });

    console.log(`✅ Opportunity created: ${opportunity.id}`);
    return { success: true, opportunity };
  } catch (error) {
    console.error('❌ Error creating opportunity:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Log an activity
 */
export async function logActivity(activityData: Omit<CRMActivity, 'id' | 'createdAt'>) {
  try {
    const activity = await prisma.activity.create({
      data: {
        type: activityData.type,
        subject: activityData.subject,
        description: activityData.description,
        outcome: activityData.outcome,
        nextAction: activityData.nextAction,
        scheduledDate: activityData.scheduledDate ? new Date(activityData.scheduledDate) : null,
        completedDate: activityData.completedDate ? new Date(activityData.completedDate) : null,
        userId: activityData.userId,
        contactId: activityData.contactId,
        metadata: activityData.metadata
      }
    });

    console.log(`✅ Activity logged: ${activity.id}`);
    return { success: true, activity };
  } catch (error) {
    console.error('❌ Error logging activity:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update contact status (e.g., lead to client conversion)
 */
export async function updateContactStatus(contactId: string, newStatus: CRMContact['status']) {
  try {
    const contact = await prisma.contact.update({
      where: { id: contactId },
      data: { status: newStatus }
    });

    // Log status change activity
    await logActivity({
      contactId,
      type: 'note',
      subject: 'Status Updated',
      description: `Contact status changed to: ${newStatus}`,
      userId: contact.ownerId || 'system',
      metadata: { previousStatus: contact.status, newStatus }
    });

    return { success: true, contact };
  } catch (error) {
    console.error('❌ Error updating contact status:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update opportunity stage
 */
export async function updateOpportunityStage(opportunityId: string, newStage: CRMOpportunity['stage']) {
  try {
    const opportunity = await prisma.opportunity.update({
      where: { id: opportunityId },
      data: { 
        stage: newStage,
        probability: DEFAULT_PIPELINE_STAGES.find(s => s.id === newStage)?.probability || 0,
        actualCloseDate: ['closed-won', 'closed-lost'].includes(newStage) ? new Date() : null
      }
    });

    // Log stage change activity
    await logActivity({
      contactId: opportunity.contactId,
      type: 'note',
      subject: 'Opportunity Stage Updated',
      description: `Opportunity "${opportunity.name}" moved to: ${newStage}`,
      userId: opportunity.ownerId,
      metadata: { opportunityId, newStage, value: opportunity.value }
    });

    return { success: true, opportunity };
  } catch (error) {
    console.error('❌ Error updating opportunity stage:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Calculate CRM analytics
 */
function calculateCRMAnalytics(contacts: any[], opportunities: any[], activities: any[]): CRMAnalytics {
  const thisMonth = new Date();
  thisMonth.setDate(1);
  
  const thisWeek = new Date();
  thisWeek.setDate(thisWeek.getDate() - 7);

  return {
    leads: {
      total: contacts.filter(c => c.type === 'lead').length,
      thisMonth: contacts.filter(c => c.type === 'lead' && new Date(c.createdAt) >= thisMonth).length,
      conversionRate: contacts.length > 0 ? 
        contacts.filter(c => c.status === 'client').length / contacts.filter(c => c.type === 'lead').length * 100 : 0,
      sources: contacts.reduce((acc, c) => {
        acc[c.source] = (acc[c.source] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    },
    opportunities: {
      total: opportunities.length,
      totalValue: opportunities.reduce((sum, o) => sum + o.value, 0),
      avgValue: opportunities.length > 0 ? opportunities.reduce((sum, o) => sum + o.value, 0) / opportunities.length : 0,
      pipeline: {
        totalValue: opportunities.filter(o => !['closed-won', 'closed-lost'].includes(o.stage))
          .reduce((sum, o) => sum + o.value, 0),
        weightedValue: opportunities.filter(o => !['closed-won', 'closed-lost'].includes(o.stage))
          .reduce((sum, o) => sum + (o.value * o.probability / 100), 0),
        averageDealSize: opportunities.length > 0 ? opportunities.reduce((sum, o) => sum + o.value, 0) / opportunities.length : 0,
        conversionRate: opportunities.length > 0 ? 
          opportunities.filter(o => o.stage === 'closed-won').length / opportunities.length * 100 : 0,
        averageSalesCode: 30 // TODO: Calculate from actual data
      }
    },
    clients: {
      total: contacts.filter(c => c.type === 'client').length,
      active: contacts.filter(c => c.type === 'client' && c.status === 'client').length,
      retention: 95, // TODO: Calculate from actual data
      satisfaction: 4.8 // TODO: Calculate from feedback data
    },
    activities: {
      total: activities.length,
      thisWeek: activities.filter(a => new Date(a.createdAt) >= thisWeek).length,
      byType: activities.reduce((acc, a) => {
        acc[a.type] = (acc[a.type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    }
  };
}

/**
 * Create pipeline view
 */
function createPipelineView(opportunities: any[]): CRMPipeline {
  const stages = DEFAULT_PIPELINE_STAGES;
  const stageOpportunities = stages.map(stage => ({
    ...stage,
    opportunities: opportunities.filter(o => o.stage === stage.id),
    value: opportunities.filter(o => o.stage === stage.id).reduce((sum, o) => sum + o.value, 0)
  }));

  return {
    id: 'default',
    name: 'Sales Pipeline',
    stages,
    opportunities,
    metrics: {
      totalValue: opportunities.reduce((sum, o) => sum + o.value, 0),
      weightedValue: opportunities.reduce((sum, o) => sum + (o.value * o.probability / 100), 0),
      averageDealSize: opportunities.length > 0 ? opportunities.reduce((sum, o) => sum + o.value, 0) / opportunities.length : 0,
      conversionRate: opportunities.length > 0 ? 
        opportunities.filter(o => o.stage === 'closed-won').length / opportunities.length * 100 : 0,
      averageSalesCode: 30 // TODO: Calculate from actual data
    }
  };
}

/**
 * Search contacts
 */
export async function searchContacts(query: string, filters: {
  type?: string;
  status?: string;
  source?: string;
  tags?: string[];
}) {
  try {
    const whereClause: any = {
      OR: [
        { firstName: { contains: query, mode: 'insensitive' } },
        { lastName: { contains: query, mode: 'insensitive' } },
        { email: { contains: query, mode: 'insensitive' } },
        { company: { contains: query, mode: 'insensitive' } }
      ]
    };

    if (filters.type) whereClause.type = filters.type;
    if (filters.status) whereClause.status = filters.status;
    if (filters.source) whereClause.source = filters.source;
    if (filters.tags && filters.tags.length > 0) {
      whereClause.tags = { hasEvery: filters.tags };
    }

    const contacts = await prisma.contact.findMany({
      where: whereClause,
      orderBy: { updatedAt: 'desc' },
      take: 50
    });

    return { success: true, contacts };
  } catch (error) {
    console.error('❌ Error searching contacts:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
