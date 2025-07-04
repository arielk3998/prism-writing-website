/**
 * Lead Nurturing Workflow API
 * Manages automated lead nurturing workflows and sequences
 */

import { NextRequest, NextResponse } from 'next/server';
import { LeadNurturingService } from '@/lib/leadNurturing';

const nurturingService = new LeadNurturingService();

export async function POST(request: NextRequest) {
  try {
    const { action, leadId, workflowId, force, event, eventData } = await request.json();

    switch (action) {
      case 'execute-workflow':
        if (!leadId || !workflowId) {
          return NextResponse.json(
            { error: 'Lead ID and workflow ID are required' },
            { status: 400 }
          );
        }

        const executed = await nurturingService.executeWorkflow(leadId, workflowId);
        return NextResponse.json({ success: executed, executed });

      case 'trigger-workflow':
        if (!leadId || !workflowId) {
          return NextResponse.json(
            { error: 'Lead ID and workflow ID are required' },
            { status: 400 }
          );
        }

        const triggered = await nurturingService.triggerWorkflow(leadId, workflowId, force);
        return NextResponse.json({ success: triggered, triggered });

      case 'process-event':
        if (!leadId || !event) {
          return NextResponse.json(
            { error: 'Lead ID and event type are required' },
            { status: 400 }
          );
        }

        await nurturingService.processLeadEvent(leadId, event, eventData);
        return NextResponse.json({ success: true, message: 'Event processed successfully' });

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Lead nurturing workflow error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const leadId = searchParams.get('leadId');
    const action = searchParams.get('action');

    if (action === 'workflows') {
      const workflows = nurturingService.getAvailableWorkflows();
      return NextResponse.json({ workflows });
    }

    if (leadId && action === 'status') {
      const status = await nurturingService.getLeadWorkflowStatus(leadId);
      return NextResponse.json({ status });
    }

    // Default response with available workflows
    const workflows = nurturingService.getAvailableWorkflows();
    return NextResponse.json({
      message: 'Lead Nurturing Workflow API',
      availableWorkflows: workflows.map(w => ({
        id: w.id,
        name: w.name,
        description: w.description,
        active: w.active,
        triggerTypes: w.triggers.map(t => t.type),
        actionCount: w.actions.length
      })),
      endpoints: {
        POST: 'Execute workflows (execute-workflow, trigger-workflow, process-event)',
        GET: 'Get workflows (?action=workflows) or status (?leadId=X&action=status)'
      }
    });
  } catch (error) {
    console.error('Lead nurturing workflow GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
