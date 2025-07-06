/**
 * Intelligent Workflow Orchestration API
 * Advanced automation and AI-driven workflow management
 */

import { NextRequest, NextResponse } from 'next/server';
import { intelligentWorkflowOrchestrator, type WorkflowContext, type LeadData } from '../../../../lib/intelligentWorkflowOrchestration';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    switch (action) {
      case 'execute_intelligent_workflow':
        return await handleIntelligentWorkflow(data);
      case 'adaptive_lead_engagement':
        return await handleAdaptiveLeadEngagement(data);
      case 'orchestrate_proposal_workflow':
        return await handleProposalWorkflow(data);
      case 'multi_channel_communication':
        return await handleMultiChannelCommunication(data);
      case 'optimize_workflow_performance':
        return await handleWorkflowOptimization(data);
      default:
        return NextResponse.json(
          { error: 'Invalid action specified' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error in workflow orchestration API:', error);
    return NextResponse.json(
      { error: 'Failed to process workflow request' },
      { status: 500 }
    );
  }
}

async function handleIntelligentWorkflow(data: {
  leadId: string;
  leadData: LeadData;
  currentStage: string;
}) {
  try {
    const context: WorkflowContext = {
      leadId: data.leadId,
      leadData: data.leadData,
      currentStage: data.currentStage,
      previousActions: [],
      performanceMetrics: {
        totalExecutions: 0,
        successRate: 0.75,
        averageConversionTime: 5.2,
        averageEngagementScore: 0.68,
        costPerConversion: 150,
        customerSatisfactionScore: 8.5
      }
    };

    const result = await intelligentWorkflowOrchestrator.executeIntelligentWorkflow(context);

    return NextResponse.json({
      success: true,
      data: result,
      message: 'Intelligent workflow executed successfully'
    });
  } catch (error) {
    console.error('Error executing intelligent workflow:', error);
    return NextResponse.json(
      { error: 'Failed to execute intelligent workflow' },
      { status: 500 }
    );
  }
}

async function handleAdaptiveLeadEngagement(data: {
  leadData: LeadData;
}) {
  try {
    const result = await intelligentWorkflowOrchestrator.executeAdaptiveLeadEngagement(data.leadData);

    return NextResponse.json({
      success: true,
      data: result,
      message: 'Adaptive lead engagement plan generated successfully'
    });
  } catch (error) {
    console.error('Error in adaptive lead engagement:', error);
    return NextResponse.json(
      { error: 'Failed to generate adaptive engagement plan' },
      { status: 500 }
    );
  }
}

async function handleProposalWorkflow(data: {
  leadData: LeadData;
}) {
  try {
    const result = await intelligentWorkflowOrchestrator.orchestrateProposalWorkflow(data.leadData);

    return NextResponse.json({
      success: true,
      data: result,
      message: 'Proposal workflow orchestrated successfully'
    });
  } catch (error) {
    console.error('Error in proposal workflow orchestration:', error);
    return NextResponse.json(
      { error: 'Failed to orchestrate proposal workflow' },
      { status: 500 }
    );
  }
}

async function handleMultiChannelCommunication(data: {
  leadData: LeadData;
  channels: ('email' | 'slack' | 'phone' | 'linkedin' | 'sms')[];
}) {
  try {
    const result = await intelligentWorkflowOrchestrator.orchestrateMultiChannelCommunication(
      data.leadData,
      data.channels
    );

    return NextResponse.json({
      success: true,
      data: result,
      message: 'Multi-channel communication orchestrated successfully'
    });
  } catch (error) {
    console.error('Error in multi-channel communication:', error);
    return NextResponse.json(
      { error: 'Failed to orchestrate multi-channel communication' },
      { status: 500 }
    );
  }
}

async function handleWorkflowOptimization(data: {
  workflowId: string;
}) {
  try {
    // Note: workflowId is provided but current implementation optimizes generally
    console.log(`Optimizing workflow: ${data.workflowId}`);
    const result = await intelligentWorkflowOrchestrator.optimizeWorkflowPerformance();

    return NextResponse.json({
      success: true,
      data: result,
      message: 'Workflow optimization completed successfully'
    });
  } catch (error) {
    console.error('Error in workflow optimization:', error);
    return NextResponse.json(
      { error: 'Failed to optimize workflow performance' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Intelligent Workflow Orchestration API',
    endpoints: {
      'POST /': {
        actions: [
          'execute_intelligent_workflow',
          'adaptive_lead_engagement',
          'orchestrate_proposal_workflow',
          'multi_channel_communication',
          'optimize_workflow_performance'
        ]
      }
    },
    version: '2.0.0'
  });
}
