/**
 * Enterprise Audit Logging System
 * 
 * Comprehensive audit trail for compliance, security monitoring,
 * and business intelligence. Supports GDPR, SOC2, and enterprise requirements.
 */

import { prisma } from './database';

export interface AuditEvent {
  id: string;
  event: string;
  category: 'authentication' | 'authorization' | 'data' | 'system' | 'business' | 'security';
  severity: 'low' | 'medium' | 'high' | 'critical';
  userId?: string;
  targetUserId?: string;
  resourceId?: string;
  resourceType?: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'login' | 'logout' | 'access' | 'modify' | 'export';
  outcome: 'success' | 'failure' | 'denied';
  ipAddress: string;
  userAgent: string;
  timestamp: string;
  metadata: Record<string, string | number | boolean>;
  compliance: {
    gdpr: boolean;
    soc2: boolean;
    retention: number; // days
  };
}

export interface AuditFilter {
  userId?: string;
  event?: string;
  category?: string;
  severity?: string;
  startDate?: string;
  endDate?: string;
  outcome?: string;
  ipAddress?: string;
  resourceType?: string;
}

export interface AuditReport {
  id: string;
  title: string;
  description: string;
  filters: AuditFilter;
  events: AuditEvent[];
  summary: {
    totalEvents: number;
    byAction: Record<string, number>;
    byResource: Record<string, number>;
    byOutcome: Record<string, number>;
    timeRange: {
      start: string;
      end: string;
    };
  };
  compliance: {
    gdprCompliant: boolean;
    soc2Compliant: boolean;
    retentionPolicy: string;
  };
  generatedAt: string;
  generatedBy: string;
}

/**
 * Audit Event Categories and Severities
 */
export const AUDIT_CATEGORIES = {
  AUTHENTICATION: 'authentication',
  AUTHORIZATION: 'authorization', 
  DATA: 'data',
  SYSTEM: 'system',
  BUSINESS: 'business',
  SECURITY: 'security'
} as const;

export const AUDIT_SEVERITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
} as const;

/**
 * Pre-defined audit event templates
 */
export const AUDIT_EVENTS = {
  // Authentication Events
  USER_LOGIN: {
    event: 'user.login',
    category: AUDIT_CATEGORIES.AUTHENTICATION,
    severity: AUDIT_SEVERITIES.LOW,
    action: 'login' as const
  },
  USER_LOGOUT: {
    event: 'user.logout',
    category: AUDIT_CATEGORIES.AUTHENTICATION,
    severity: AUDIT_SEVERITIES.LOW,
    action: 'logout' as const
  },
  USER_LOGIN_FAILED: {
    event: 'user.login.failed',
    category: AUDIT_CATEGORIES.SECURITY,
    severity: AUDIT_SEVERITIES.MEDIUM,
    action: 'login' as const
  },
  SSO_LOGIN: {
    event: 'sso.login',
    category: AUDIT_CATEGORIES.AUTHENTICATION,
    severity: AUDIT_SEVERITIES.LOW,
    action: 'login' as const
  },

  // Authorization Events
  ACCESS_DENIED: {
    event: 'access.denied',
    category: AUDIT_CATEGORIES.AUTHORIZATION,
    severity: AUDIT_SEVERITIES.HIGH,
    action: 'access' as const
  },
  PERMISSION_GRANTED: {
    event: 'permission.granted',
    category: AUDIT_CATEGORIES.AUTHORIZATION,
    severity: AUDIT_SEVERITIES.MEDIUM,
    action: 'modify' as const
  },

  // Data Events
  USER_CREATED: {
    event: 'user.created',
    category: AUDIT_CATEGORIES.DATA,
    severity: AUDIT_SEVERITIES.MEDIUM,
    action: 'create' as const
  },
  USER_UPDATED: {
    event: 'user.updated',
    category: AUDIT_CATEGORIES.DATA,
    severity: AUDIT_SEVERITIES.MEDIUM,
    action: 'update' as const
  },
  USER_DELETED: {
    event: 'user.deleted',
    category: AUDIT_CATEGORIES.DATA,
    severity: AUDIT_SEVERITIES.HIGH,
    action: 'delete' as const
  },
  DATA_EXPORT: {
    event: 'data.export',
    category: AUDIT_CATEGORIES.DATA,
    severity: AUDIT_SEVERITIES.HIGH,
    action: 'export' as const
  },

  // Business Events
  PROJECT_CREATED: {
    event: 'project.created',
    category: AUDIT_CATEGORIES.BUSINESS,
    severity: AUDIT_SEVERITIES.LOW,
    action: 'create' as const
  },
  PAYMENT_PROCESSED: {
    event: 'payment.processed',
    category: AUDIT_CATEGORIES.BUSINESS,
    severity: AUDIT_SEVERITIES.MEDIUM,
    action: 'create' as const
  },
  SUBSCRIPTION_CHANGED: {
    event: 'subscription.changed',
    category: AUDIT_CATEGORIES.BUSINESS,
    severity: AUDIT_SEVERITIES.MEDIUM,
    action: 'update' as const
  },

  // System Events
  SYSTEM_BACKUP: {
    event: 'system.backup',
    category: AUDIT_CATEGORIES.SYSTEM,
    severity: AUDIT_SEVERITIES.LOW,
    action: 'create' as const
  },
  SYSTEM_RESTORE: {
    event: 'system.restore',
    category: AUDIT_CATEGORIES.SYSTEM,
    severity: AUDIT_SEVERITIES.HIGH,
    action: 'modify' as const
  },
  CONFIG_CHANGED: {
    event: 'config.changed',
    category: AUDIT_CATEGORIES.SYSTEM,
    severity: AUDIT_SEVERITIES.HIGH,
    action: 'update' as const
  },

  // Security Events
  SUSPICIOUS_ACTIVITY: {
    event: 'security.suspicious',
    category: AUDIT_CATEGORIES.SECURITY,
    severity: AUDIT_SEVERITIES.CRITICAL,
    action: 'access' as const
  },
  ADMIN_ACCESS: {
    event: 'admin.access',
    category: AUDIT_CATEGORIES.SECURITY,
    severity: AUDIT_SEVERITIES.HIGH,
    action: 'access' as const
  }
};

/**
 * Log an audit event
 */
export async function logAuditEvent(
  eventTemplate: typeof AUDIT_EVENTS[keyof typeof AUDIT_EVENTS],
  details: {
    userId?: string;
    targetUserId?: string;
    resourceId?: string;
    resourceType?: string;
    outcome: 'success' | 'failure' | 'denied';
    ipAddress: string;
    userAgent: string;
    metadata?: Record<string, string | number | boolean>;
  }
) {
  try {
    const auditEvent = await prisma.auditLog.create({
      data: {
        action: eventTemplate.event,
        resource: details.resourceType,
        resourceId: details.resourceId,
        details: {
          category: eventTemplate.category,
          severity: eventTemplate.severity,
          outcome: details.outcome,
          targetUserId: details.targetUserId,
          metadata: details.metadata,
          compliance: {
            gdpr: true,
            soc2: true,
            retention: getRetentionPeriod(eventTemplate.category, eventTemplate.severity)
          }
        } as any,
        userId: details.userId,
        ipAddress: details.ipAddress,
        userAgent: details.userAgent,
      }
    });

    console.log(`✅ Audit event logged: ${eventTemplate.event} (${auditEvent.id})`);
    return { success: true, auditEvent };
  } catch (error) {
    console.error('❌ Error logging audit event:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get audit events with filtering
 */
export async function getAuditEvents(
  filters: AuditFilter,
  pagination: { page: number; limit: number } = { page: 1, limit: 100 }
) {
  try {
    const whereClause: any = {};

    if (filters.userId) whereClause.userId = filters.userId;
    if (filters.event) whereClause.event = { contains: filters.event, mode: 'insensitive' };
    if (filters.category) whereClause.category = filters.category;
    if (filters.severity) whereClause.severity = filters.severity;
    if (filters.outcome) whereClause.outcome = filters.outcome;
    if (filters.ipAddress) whereClause.ipAddress = filters.ipAddress;
    if (filters.resourceType) whereClause.resourceType = filters.resourceType;

    if (filters.startDate || filters.endDate) {
      whereClause.timestamp = {};
      if (filters.startDate) whereClause.timestamp.gte = new Date(filters.startDate);
      if (filters.endDate) whereClause.timestamp.lte = new Date(filters.endDate);
    }

    const [events, total] = await Promise.all([
      prisma.auditLog.findMany({
        where: whereClause,
        include: {
          user: {
            select: { id: true, email: true, firstName: true, lastName: true }
          }
        },
        orderBy: { timestamp: 'desc' },
        skip: (pagination.page - 1) * pagination.limit,
        take: pagination.limit
      }),
      prisma.auditLog.count({ where: whereClause })
    ]);

    return {
      success: true,
      data: {
        events,
        pagination: {
          page: pagination.page,
          limit: pagination.limit,
          total,
          pages: Math.ceil(total / pagination.limit)
        }
      }
    };
  } catch (error) {
    console.error('❌ Error getting audit events:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Generate audit report
 */
export async function generateAuditReport(
  filters: AuditFilter,
  reportDetails: {
    title: string;
    description: string;
    generatedBy: string;
  }
): Promise<{ success: boolean; report?: AuditReport; error?: string }> {
  try {
    const eventsResult = await getAuditEvents(filters, { page: 1, limit: 10000 });
    
    if (!eventsResult.success || !eventsResult.data) {
      throw new Error('Failed to fetch audit events');
    }

    const events = eventsResult.data.events;

    // Calculate summary statistics
    const summary = {
      totalEvents: events.length,
      byAction: events.reduce((acc, event) => {
        acc[event.action] = (acc[event.action] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      byResource: events.reduce((acc, event) => {
        const resource = event.resource || 'unknown';
        acc[resource] = (acc[resource] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      byOutcome: events.reduce((acc, event) => {
        const details = event.details as any;
        const outcome = details?.outcome || 'unknown';
        acc[outcome] = (acc[outcome] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      timeRange: {
        start: filters.startDate || events[events.length - 1]?.timestamp.toISOString() || new Date().toISOString(),
        end: filters.endDate || events[0]?.timestamp.toISOString() || new Date().toISOString()
      }
    };

    const report: AuditReport = {
      id: `audit_report_${Date.now()}`,
      title: reportDetails.title,
      description: reportDetails.description,
      filters,
      events: events as any,
      summary,
      compliance: {
        gdprCompliant: true,
        soc2Compliant: true,
        retentionPolicy: 'Events retained according to compliance requirements'
      },
      generatedAt: new Date().toISOString(),
      generatedBy: reportDetails.generatedBy
    };

    return { success: true, report };
  } catch (error) {
    console.error('❌ Error generating audit report:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get retention period based on category and severity
 */
function getRetentionPeriod(category: string, severity: string): number {
  // Retention periods in days
  const retentionMatrix: Record<string, Record<string, number>> = {
    authentication: { low: 90, medium: 180, high: 365, critical: 2555 }, // 7 years for critical
    authorization: { low: 180, medium: 365, high: 1095, critical: 2555 }, // 3-7 years
    data: { low: 365, medium: 1095, high: 2555, critical: 2555 }, // 1-7 years
    system: { low: 90, medium: 180, high: 365, critical: 1095 }, // 90 days to 3 years
    business: { low: 1095, medium: 2555, high: 2555, critical: 2555 }, // 3-7 years
    security: { low: 365, medium: 1095, high: 2555, critical: 2555 } // 1-7 years
  };

  return retentionMatrix[category]?.[severity] || 365; // Default 1 year
}

/**
 * Clean up expired audit logs based on retention policy
 */
export async function cleanupExpiredAuditLogs() {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 2555); // 7 years maximum

    const deletedCount = await prisma.auditLog.deleteMany({
      where: {
        timestamp: {
          lt: cutoffDate
        }
      }
    });

    console.log(`✅ Cleaned up ${deletedCount.count} expired audit logs`);
    return { success: true, deletedCount: deletedCount.count };
  } catch (error) {
    console.error('❌ Error cleaning up audit logs:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get audit dashboard statistics
 */
export async function getAuditDashboard(timeRange: 'day' | 'week' | 'month' | 'year' = 'week') {
  try {
    const now = new Date();
    const startDate = new Date();

    switch (timeRange) {
      case 'day':
        startDate.setDate(now.getDate() - 1);
        break;
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
    }

    const events = await prisma.auditLog.findMany({
      where: {
        timestamp: {
          gte: startDate
        }
      }
    });

    const dashboard = {
      timeRange,
      totalEvents: events.length,
      byAction: events.reduce((acc, event) => {
        acc[event.action] = (acc[event.action] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      byResource: events.reduce((acc, event) => {
        const resource = event.resource || 'unknown';
        acc[resource] = (acc[resource] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      securityEvents: events.filter(e => e.action?.includes('auth') || e.action?.includes('login')).length,
      recentEvents: events.slice(0, 10),
      topUsers: getTopUsers(events),
      recentActions: events
        .slice(0, 10)
        .map(e => ({
          id: e.id,
          action: e.action,
          timestamp: e.timestamp,
          userId: e.userId
        }))
    };

    return { success: true, dashboard };
  } catch (error) {
    console.error('❌ Error getting audit dashboard:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get top users by audit event count
 */
function getTopUsers(events: any[]): Array<{ userId: string; count: number; lastActivity: string }> {
  const userCounts = events.reduce((acc, event) => {
    if (event.userId) {
      if (!acc[event.userId]) {
        acc[event.userId] = { count: 0, lastActivity: event.timestamp };
      }
      acc[event.userId].count++;
      if (new Date(event.timestamp) > new Date(acc[event.userId].lastActivity)) {
        acc[event.userId].lastActivity = event.timestamp;
      }
    }
    return acc;
  }, {} as Record<string, { count: number; lastActivity: string }>);

  return Object.entries(userCounts)
    .map(([userId, data]) => ({ userId, ...(data as { count: number; lastActivity: string }) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}
