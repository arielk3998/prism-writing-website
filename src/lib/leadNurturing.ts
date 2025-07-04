/**
 * Lead Nurturing Workflow System
 * Automated workflows for lead engagement and conversion
 */

import { prisma } from '@/lib/leads';
import { EmailAutomationService } from '@/lib/emailAutomation';

export interface NurturingWorkflow {
  id: string;
  name: string;
  description: string;
  triggers: WorkflowTrigger[];
  actions: WorkflowAction[];
  conditions: WorkflowCondition[];
  active: boolean;
}

export interface WorkflowTrigger {
  type: 'NEW_LEAD' | 'STATUS_CHANGE' | 'TIME_DELAY' | 'EMAIL_INTERACTION' | 'SCORE_CHANGE';
  value?: string;
  delay?: number; // hours
}

export interface WorkflowAction {
  type: 'SEND_EMAIL' | 'UPDATE_STATUS' | 'ASSIGN_USER' | 'ADD_NOTE' | 'SCHEDULE_TASK' | 'SEND_SMS';
  parameters: Record<string, any>;
  delay?: number; // hours
}

export interface WorkflowCondition {
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than' | 'in_range';
  value: any;
}

export class LeadNurturingService {
  private emailService: EmailAutomationService;

  constructor() {
    this.emailService = new EmailAutomationService();
  }

  // Pre-defined nurturing workflows
  static readonly DEFAULT_WORKFLOWS: NurturingWorkflow[] = [
    {
      id: 'new-lead-welcome',
      name: 'New Lead Welcome Sequence',
      description: 'Automated welcome and follow-up sequence for new leads',
      triggers: [{ type: 'NEW_LEAD' }],
      actions: [
        {
          type: 'SEND_EMAIL',
          parameters: { templateId: 'welcome' },
          delay: 0
        },
        {
          type: 'SEND_EMAIL',
          parameters: { templateId: 'follow_up_24h' },
          delay: 24
        },
        {
          type: 'UPDATE_STATUS',
          parameters: { status: 'CONTACTED' },
          delay: 24
        }
      ],
      conditions: [
        {
          field: 'allowFollowUp',
          operator: 'equals',
          value: true
        }
      ],
      active: true
    },
    {
      id: 'high-value-lead',
      name: 'High-Value Lead Fast Track',
      description: 'Expedited workflow for high-budget leads',
      triggers: [{ type: 'NEW_LEAD' }],
      actions: [
        {
          type: 'UPDATE_STATUS',
          parameters: { priority: 'URGENT' },
          delay: 0
        },
        {
          type: 'ASSIGN_USER',
          parameters: { role: 'senior_sales' },
          delay: 0
        },
        {
          type: 'SEND_EMAIL',
          parameters: { templateId: 'high_priority_welcome' },
          delay: 1
        },
        {
          type: 'SCHEDULE_TASK',
          parameters: { 
            task: 'Personal phone call follow-up',
            dueDate: 'tomorrow'
          },
          delay: 2
        }
      ],
      conditions: [
        {
          field: 'budget',
          operator: 'in_range',
          value: ['10000+', '25000+', '50000+']
        }
      ],
      active: true
    },
    {
      id: 'nurture-cold-leads',
      name: 'Cold Lead Nurturing',
      description: 'Long-term nurturing for unresponsive leads',
      triggers: [{ type: 'STATUS_CHANGE', value: 'COLD' }],
      actions: [
        {
          type: 'SEND_EMAIL',
          parameters: { templateId: 'nurture_week1' },
          delay: 168 // 1 week
        },
        {
          type: 'SEND_EMAIL',
          parameters: { templateId: 'nurture_month1' },
          delay: 720 // 1 month
        },
        {
          type: 'SEND_EMAIL',
          parameters: { templateId: 'reengagement' },
          delay: 2160 // 3 months
        }
      ],
      conditions: [
        {
          field: 'allowFollowUp',
          operator: 'equals',
          value: true
        }
      ],
      active: true
    },
    {
      id: 'proposal-follow-up',
      name: 'Proposal Follow-up Sequence',
      description: 'Follow-up sequence after proposal is sent',
      triggers: [{ type: 'STATUS_CHANGE', value: 'PROPOSAL_SENT' }],
      actions: [
        {
          type: 'SEND_EMAIL',
          parameters: { templateId: 'proposal_sent_confirmation' },
          delay: 1
        },
        {
          type: 'SEND_EMAIL',
          parameters: { templateId: 'proposal_follow_up_48h' },
          delay: 48
        },
        {
          type: 'SEND_EMAIL',
          parameters: { templateId: 'proposal_follow_up_week' },
          delay: 168
        },
        {
          type: 'SCHEDULE_TASK',
          parameters: { 
            task: 'Call to discuss proposal',
            dueDate: 'in_3_days'
          },
          delay: 72
        }
      ],
      conditions: [],
      active: true
    }
  ];

  // Execute workflow for a lead
  async executeWorkflow(leadId: string, workflowId: string): Promise<boolean> {
    try {
      const workflow = LeadNurturingService.DEFAULT_WORKFLOWS.find(w => w.id === workflowId);
      if (!workflow || !workflow.active) {
        console.error(`Workflow ${workflowId} not found or inactive`);
        return false;
      }

      // Check if lead meets workflow conditions
      const leadMeetsConditions = await this.checkWorkflowConditions(leadId, workflow.conditions);
      if (!leadMeetsConditions) {
        console.log(`Lead ${leadId} does not meet conditions for workflow ${workflowId}`);
        return false;
      }

      // Execute workflow actions
      for (const action of workflow.actions) {
        await this.scheduleWorkflowAction(leadId, action);
      }

      // Log workflow execution
      await this.logWorkflowExecution(leadId, workflowId);

      return true;
    } catch (error) {
      console.error('Error executing workflow:', error);
      return false;
    }
  }

  // Check if lead meets workflow conditions
  private async checkWorkflowConditions(leadId: string, conditions: WorkflowCondition[]): Promise<boolean> {
    if (conditions.length === 0) return true;

    try {
      // This would fetch the actual lead data
      // const lead = await prisma.contactInquiry.findUnique({ where: { id: leadId } });
      
      // For now, return true as a placeholder
      // In a real implementation, we would check each condition against the lead data
      return true;
    } catch (error) {
      console.error('Error checking workflow conditions:', error);
      return false;
    }
  }

  // Schedule a workflow action
  private async scheduleWorkflowAction(leadId: string, action: WorkflowAction): Promise<void> {
    try {
      const executeAt = new Date();
      if (action.delay) {
        executeAt.setHours(executeAt.getHours() + action.delay);
      }

      switch (action.type) {
        case 'SEND_EMAIL':
          if (action.delay && action.delay > 0) {
            // Schedule email for later
            await this.emailService.scheduleFollowUpSequence(leadId);
          } else {
            // Send email immediately
            await this.emailService.sendWelcomeEmail(leadId);
          }
          break;

        case 'UPDATE_STATUS':
          // This would update the lead status
          console.log(`Scheduled status update for lead ${leadId}:`, action.parameters);
          break;

        case 'ASSIGN_USER':
          // This would assign the lead to a user
          console.log(`Scheduled user assignment for lead ${leadId}:`, action.parameters);
          break;

        case 'ADD_NOTE':
          // This would add a note to the lead
          console.log(`Scheduled note addition for lead ${leadId}:`, action.parameters);
          break;

        case 'SCHEDULE_TASK':
          // This would create a task
          console.log(`Scheduled task creation for lead ${leadId}:`, action.parameters);
          break;

        case 'SEND_SMS':
          // This would send an SMS
          console.log(`Scheduled SMS for lead ${leadId}:`, action.parameters);
          break;

        default:
          console.warn(`Unknown workflow action type: ${action.type}`);
      }
    } catch (error) {
      console.error('Error scheduling workflow action:', error);
    }
  }

  // Log workflow execution
  private async logWorkflowExecution(leadId: string, workflowId: string): Promise<void> {
    try {
      // This would log the workflow execution in the database
      console.log(`Workflow ${workflowId} executed for lead ${leadId} at ${new Date()}`);
      
      // In a real implementation:
      // await prisma.workflowExecution.create({
      //   data: {
      //     leadId,
      //     workflowId,
      //     executedAt: new Date(),
      //     status: 'COMPLETED'
      //   }
      // });
    } catch (error) {
      console.error('Error logging workflow execution:', error);
    }
  }

  // Execute workflows triggered by lead events
  async processLeadEvent(leadId: string, event: 'NEW_LEAD' | 'STATUS_CHANGE' | 'EMAIL_INTERACTION', eventData?: any): Promise<void> {
    try {
      const applicableWorkflows = LeadNurturingService.DEFAULT_WORKFLOWS.filter(workflow => 
        workflow.active && workflow.triggers.some(trigger => trigger.type === event)
      );

      for (const workflow of applicableWorkflows) {
        await this.executeWorkflow(leadId, workflow.id);
      }
    } catch (error) {
      console.error('Error processing lead event:', error);
    }
  }

  // Get available workflows
  getAvailableWorkflows(): NurturingWorkflow[] {
    return LeadNurturingService.DEFAULT_WORKFLOWS;
  }

  // Get workflow status for a lead
  async getLeadWorkflowStatus(leadId: string): Promise<any> {
    try {
      // This would fetch workflow execution history from the database
      return {
        leadId,
        activeWorkflows: ['new-lead-welcome'],
        completedWorkflows: [],
        scheduledActions: [],
        lastExecuted: new Date()
      };
    } catch (error) {
      console.error('Error getting lead workflow status:', error);
      return null;
    }
  }

  // Manual workflow execution
  async triggerWorkflow(leadId: string, workflowId: string, force = false): Promise<boolean> {
    try {
      if (force) {
        // Skip condition checks if forced
        const workflow = LeadNurturingService.DEFAULT_WORKFLOWS.find(w => w.id === workflowId);
        if (!workflow) return false;

        for (const action of workflow.actions) {
          await this.scheduleWorkflowAction(leadId, action);
        }

        await this.logWorkflowExecution(leadId, workflowId);
        return true;
      } else {
        return await this.executeWorkflow(leadId, workflowId);
      }
    } catch (error) {
      console.error('Error triggering workflow manually:', error);
      return false;
    }
  }
}

// Singleton instance
export const leadNurturingService = new LeadNurturingService();
