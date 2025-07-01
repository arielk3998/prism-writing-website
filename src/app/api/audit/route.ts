/**
 * Audit Logging API
 * 
 * Enterprise audit trail endpoints for compliance and monitoring
 */

import { NextRequest, NextResponse } from 'next/server';
import { 
  logAuditEvent,
  getAuditEvents,
  generateAuditReport,
  getAuditDashboard,
  cleanupExpiredAuditLogs,
  AUDIT_EVENTS
} from '@/lib/audit';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    switch (action) {
      case 'events':
        const filters = {
          userId: searchParams.get('userId') || undefined,
          event: searchParams.get('event') || undefined,
          category: searchParams.get('category') || undefined,
          severity: searchParams.get('severity') || undefined,
          startDate: searchParams.get('startDate') || undefined,
          endDate: searchParams.get('endDate') || undefined,
          outcome: searchParams.get('outcome') || undefined,
          ipAddress: searchParams.get('ipAddress') || undefined,
          resourceType: searchParams.get('resourceType') || undefined
        };

        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '100');

        const events = await getAuditEvents(filters, { page, limit });
        return NextResponse.json(events);

      case 'dashboard':
        const timeRange = searchParams.get('timeRange') as 'day' | 'week' | 'month' | 'year' || 'week';
        const dashboard = await getAuditDashboard(timeRange);
        return NextResponse.json(dashboard);

      case 'events-list':
        // Return available audit event types
        return NextResponse.json({
          success: true,
          data: Object.entries(AUDIT_EVENTS).map(([key, event]) => ({
            key,
            ...event
          }))
        });

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('❌ Audit API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    switch (action) {
      case 'log-event':
        const { eventKey, details } = body;
        if (!eventKey || !details) {
          return NextResponse.json({ error: 'Event key and details required' }, { status: 400 });
        }

        const eventTemplate = AUDIT_EVENTS[eventKey as keyof typeof AUDIT_EVENTS];
        if (!eventTemplate) {
          return NextResponse.json({ error: 'Invalid event key' }, { status: 400 });
        }

        const result = await logAuditEvent(eventTemplate, details);
        return NextResponse.json(result);

      case 'generate-report':
        const { filters, reportDetails } = body;
        if (!reportDetails) {
          return NextResponse.json({ error: 'Report details required' }, { status: 400 });
        }

        const report = await generateAuditReport(filters || {}, reportDetails);
        return NextResponse.json(report);

      case 'cleanup-expired':
        const cleanup = await cleanupExpiredAuditLogs();
        return NextResponse.json(cleanup);

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('❌ Audit API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
