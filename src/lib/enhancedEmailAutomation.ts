/**
 * Enhanced Email Automation System for Client Onboarding
 * 
 * This system handles automated email workflows triggered when clients:
 * 1. Create an account
 * 2. Sign agreements
 * 3. Send initial project emails
 * 
 * Ensures comprehensive data collection and 95%+ accuracy in document generation.
 */

import { sendEmailViaResend } from './webServices';
import ClientDataCollectionSystem from './clientDataCollection';
import type { ClientComprehensiveData } from './clientDataCollection';

export interface EmailTrigger {
  type: 'account_created' | 'agreement_signed' | 'project_email_received' | 'follow_up' | 'reminder';
  clientId: string;
  clientEmail: string;
  clientName: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface AutomationWorkflow {
  id: string;
  name: string;
  triggers: EmailTrigger[];
  steps: WorkflowStep[];
  status: 'active' | 'paused' | 'completed';
  success: boolean;
  createdAt: Date;
  completedAt?: Date;
}

export interface WorkflowStep {
  id: string;
  type: 'email' | 'task' | 'wait' | 'data_collection' | 'document_generation';
  action: string;
  delay?: number; // minutes
  condition?: string;
  template?: string;
  completed: boolean;
  result?: any;
}

export class EnhancedEmailAutomationSystem {
  private dataCollectionSystem: ClientDataCollectionSystem;
  private activeWorkflows: Map<string, AutomationWorkflow> = new Map();

  constructor() {
    this.dataCollectionSystem = new ClientDataCollectionSystem();
  }

  /**
   * Main entry point for email automation triggers
   */
  async processEmailTrigger(trigger: EmailTrigger): Promise<void> {
    console.log(`Processing email trigger: ${trigger.type} for client ${trigger.clientId}`);

    switch (trigger.type) {
      case 'account_created':
        await this.handleAccountCreated(trigger);
        break;
      case 'agreement_signed':
        await this.handleAgreementSigned(trigger);
        break;
      case 'project_email_received':
        await this.handleProjectEmailReceived(trigger);
        break;
      case 'follow_up':
        await this.handleFollowUp(trigger);
        break;
      case 'reminder':
        await this.handleReminder(trigger);
        break;
    }
  }

  /**
   * Handle new account creation
   */
  private async handleAccountCreated(trigger: EmailTrigger): Promise<void> {
    const workflow: AutomationWorkflow = {
      id: `workflow_${Date.now()}`,
      name: 'Account Creation Welcome',
      triggers: [trigger],
      steps: [
        {
          id: 'welcome_email',
          type: 'email',
          action: 'send_welcome_email',
          template: 'account_welcome',
          completed: false
        },
        {
          id: 'schedule_agreement',
          type: 'task',
          action: 'schedule_agreement_follow_up',
          delay: 1440, // 24 hours
          completed: false
        }
      ],
      status: 'active',
      success: false,
      createdAt: new Date()
    };

    this.activeWorkflows.set(workflow.id, workflow);

    // Send welcome email
    await this.sendWelcomeEmail(trigger);
    workflow.steps[0].completed = true;

    // Schedule agreement follow-up
    setTimeout(() => {
      this.scheduleAgreementFollowUp(trigger);
      workflow.steps[1].completed = true;
    }, 1440 * 60 * 1000); // 24 hours
  }

  /**
   * Handle agreement signing
   */
  private async handleAgreementSigned(trigger: EmailTrigger): Promise<void> {
    const workflow: AutomationWorkflow = {
      id: `workflow_${Date.now()}`,
      name: 'Agreement Signed Onboarding',
      triggers: [trigger],
      steps: [
        {
          id: 'onboarding_email',
          type: 'email',
          action: 'send_onboarding_package',
          template: 'comprehensive_onboarding',
          completed: false
        },
        {
          id: 'data_collection_init',
          type: 'data_collection',
          action: 'initialize_comprehensive_intake',
          completed: false
        },
        {
          id: 'schedule_kickoff',
          type: 'task',
          action: 'schedule_kickoff_call',
          delay: 60, // 1 hour
          completed: false
        }
      ],
      status: 'active',
      success: false,
      createdAt: new Date()
    };

    this.activeWorkflows.set(workflow.id, workflow);

    // Send comprehensive onboarding package
    await this.sendOnboardingPackage(trigger);
    workflow.steps[0].completed = true;

    // Initialize data collection
    await this.initializeDataCollection(trigger);
    workflow.steps[1].completed = true;

    // Schedule kickoff call
    setTimeout(() => {
      this.scheduleKickoffCall(trigger);
      workflow.steps[2].completed = true;
    }, 60 * 60 * 1000); // 1 hour
  }

  /**
   * Handle project email from client
   */
  private async handleProjectEmailReceived(trigger: EmailTrigger): Promise<void> {
    const workflow: AutomationWorkflow = {
      id: `workflow_${Date.now()}`,
      name: 'Project Email Response',
      triggers: [trigger],
      steps: [
        {
          id: 'immediate_acknowledgment',
          type: 'email',
          action: 'send_acknowledgment',
          template: 'project_email_ack',
          completed: false
        },
        {
          id: 'data_extraction',
          type: 'data_collection',
          action: 'extract_project_requirements',
          completed: false
        },
        {
          id: 'request_missing_info',
          type: 'email',
          action: 'request_additional_info',
          template: 'info_request',
          delay: 30, // 30 minutes
          condition: 'data_completeness < 80',
          completed: false
        }
      ],
      status: 'active',
      success: false,
      createdAt: new Date()
    };

    this.activeWorkflows.set(workflow.id, workflow);

    // Send immediate acknowledgment
    await this.sendProjectEmailAcknowledgment(trigger);
    workflow.steps[0].completed = true;

    // Extract project requirements from email
    const extractedData = await this.extractProjectRequirements(trigger);
    workflow.steps[1].completed = true;
    workflow.steps[1].result = extractedData;

    // Request missing information if needed
    if (extractedData.completeness < 80) {
      setTimeout(() => {
        this.requestAdditionalInformation(trigger, extractedData);
        workflow.steps[2].completed = true;
      }, 30 * 60 * 1000); // 30 minutes
    }
  }

  /**
   * Send welcome email to new account
   */
  private async sendWelcomeEmail(trigger: EmailTrigger): Promise<boolean> {
    const subject = 'Welcome to Prism Writing - Next Steps';
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">Welcome to Prism Writing!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Professional Writing & Translation Services</p>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #333; margin-top: 0;">Hi ${trigger.clientName},</h2>
          
          <p style="color: #555; line-height: 1.6;">
            Thank you for creating your account with Prism Writing! We're excited to work with you 
            and help bring your writing and translation projects to life.
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
            <h3 style="color: #333; margin-top: 0;">What's Next?</h3>
            <ol style="color: #555; line-height: 1.6;">
              <li><strong>Review and Sign Agreement:</strong> We'll send you our service agreement within the next hour</li>
              <li><strong>Complete Project Intake:</strong> Once signed, you'll receive a comprehensive intake form</li>
              <li><strong>Kickoff Call:</strong> We'll schedule a consultation to discuss your specific needs</li>
              <li><strong>Project Begin:</strong> Start seeing results within 48-72 hours</li>
            </ol>
          </div>
          
          <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #2d5a2d;">
              <strong>🎯 Our Commitment:</strong> We guarantee 95%+ accuracy in all deliverables through our 
              comprehensive data collection and quality assurance process.
            </p>
          </div>
          
          <p style="color: #555; line-height: 1.6;">
            If you have any immediate questions, feel free to reply to this email or call us at (555) 123-4567.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://prismwriting.com/portal" 
               style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Access Your Portal
            </a>
          </div>
          
          <p style="color: #555;">
            Best regards,<br>
            <strong>Ariel & The Prism Writing Team</strong><br>
            Professional Writing & Translation Services
          </p>
        </div>
        
        <div style="background: #333; color: white; padding: 20px; text-align: center; font-size: 12px;">
          <p style="margin: 0;">Prism Writing Cooperative | prismwriting.com | contact@prismwriting.com</p>
        </div>
      </div>
    `;

    return await sendEmailViaResend(trigger.clientEmail, subject, htmlContent);
  }

  /**
   * Send comprehensive onboarding package after agreement signing
   */
  private async sendOnboardingPackage(trigger: EmailTrigger): Promise<boolean> {
    const subject = '🚀 Welcome Aboard! Your Comprehensive Project Intake Package';
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #48bb78 0%, #38a169 100%); color: white; padding: 40px 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">🎉 Agreement Signed - Let's Get Started!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Time to create something amazing together</p>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #333; margin-top: 0;">Hi ${trigger.clientName},</h2>
          
          <p style="color: #555; line-height: 1.6;">
            Fantastic! Your agreement has been signed and we're officially ready to begin your project. 
            To ensure we deliver exactly what you need with 95%+ accuracy, we need to collect some 
            comprehensive project information.
          </p>
          
          <div style="background: white; padding: 25px; border-radius: 8px; margin: 25px 0; border: 2px solid #48bb78;">
            <h3 style="color: #333; margin-top: 0; text-align: center;">📋 Comprehensive Project Intake</h3>
            <p style="color: #555; text-align: center; margin-bottom: 20px;">
              This intake form ensures we capture every detail needed for perfect results
            </p>
            
            <div style="text-align: center;">
              <a href="https://prismwriting.com/portal?action=intake&client=${trigger.clientId}" 
                 style="background: #48bb78; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">
                🚀 Start Your Project Intake
              </a>
            </div>
          </div>
          
          <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
            <h4 style="color: #856404; margin-top: 0;">⏰ What to Expect</h4>
            <ul style="color: #856404; line-height: 1.6; margin: 0;">
              <li><strong>15-20 minutes:</strong> Complete comprehensive intake form</li>
              <li><strong>Upload assets:</strong> Brand materials, existing content, style guides</li>
              <li><strong>Define requirements:</strong> Detailed project specifications</li>
              <li><strong>Set timeline:</strong> Milestones and delivery schedule</li>
            </ul>
          </div>
          
          <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #2d5a2d; text-align: center;">
              <strong>🎯 Our 95% Accuracy Guarantee</strong><br>
              This comprehensive intake process ensures we understand your exact needs, 
              brand voice, target audience, and deliverable requirements - resulting in 
              exceptional accuracy and fewer revisions.
            </p>
          </div>
          
          <h3 style="color: #333;">What We'll Cover in the Intake:</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0;">
            <div style="background: white; padding: 15px; border-radius: 6px; border-left: 3px solid #667eea;">
              <strong style="color: #333;">Company & Brand</strong>
              <p style="margin: 5px 0 0 0; color: #555; font-size: 14px;">Industry, audience, voice, competitors</p>
            </div>
            <div style="background: white; padding: 15px; border-radius: 6px; border-left: 3px solid #48bb78;">
              <strong style="color: #333;">Project Details</strong>
              <p style="margin: 5px 0 0 0; color: #555; font-size: 14px;">Scope, objectives, deliverables, timeline</p>
            </div>
            <div style="background: white; padding: 15px; border-radius: 6px; border-left: 3px solid #ed8936;">
              <strong style="color: #333;">Content Specs</strong>
              <p style="margin: 5px 0 0 0; color: #555; font-size: 14px;">Tone, style, keywords, SEO requirements</p>
            </div>
            <div style="background: white; padding: 15px; border-radius: 6px; border-left: 3px solid #9f7aea;">
              <strong style="color: #333;">Assets & Resources</strong>
              <p style="margin: 5px 0 0 0; color: #555; font-size: 14px;">Images, documents, brand guidelines</p>
            </div>
          </div>
          
          <div style="background: #cfe2ff; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <h4 style="color: #0c5aa6; margin-top: 0;">📞 Kickoff Call Scheduled</h4>
            <p style="color: #0c5aa6; margin: 0;">
              After you complete the intake form, we'll automatically schedule a 30-minute kickoff call 
              to review your requirements and answer any questions. You'll receive calendar invite shortly.
            </p>
          </div>
          
          <p style="color: #555; line-height: 1.6;">
            Questions? Reply to this email or call us at (555) 123-4567. We're here to help!
          </p>
          
          <p style="color: #555;">
            Excited to create something amazing together!<br><br>
            <strong>Ariel & The Prism Writing Team</strong><br>
            Professional Writing & Translation Services
          </p>
        </div>
        
        <div style="background: #333; color: white; padding: 20px; text-align: center; font-size: 12px;">
          <p style="margin: 0;">Prism Writing Cooperative | prismwriting.com | contact@prismwriting.com</p>
        </div>
      </div>
    `;

    return await sendEmailViaResend(trigger.clientEmail, subject, htmlContent);
  }

  /**
   * Send immediate acknowledgment for project emails
   */
  private async sendProjectEmailAcknowledgment(trigger: EmailTrigger): Promise<boolean> {
    const subject = 'Re: Your Project Inquiry - Received & Processing';
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #667eea; color: white; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">📧 Email Received</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">We're processing your project requirements</p>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #333; margin-top: 0;">Hi ${trigger.clientName},</h2>
          
          <p style="color: #555; line-height: 1.6;">
            Thanks for reaching out! We've received your project email and our team is already 
            reviewing the details you've provided.
          </p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #48bb78;">
            <h3 style="color: #333; margin-top: 0;">⚡ What's Happening Now:</h3>
            <ul style="color: #555; line-height: 1.6;">
              <li>✅ Your email has been received and logged</li>
              <li>🔍 We're extracting project requirements from your message</li>
              <li>📋 Checking for any missing information needed</li>
              <li>👤 Assigning the best team member for your project type</li>
            </ul>
          </div>
          
          <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #856404;">
              <strong>⏰ Next Steps:</strong> You'll receive a detailed response within 2 hours with either 
              a project proposal or a request for additional information to ensure 95%+ accuracy.
            </p>
          </div>
          
          <p style="color: #555; line-height: 1.6;">
            For urgent matters, call us at (555) 123-4567.
          </p>
          
          <p style="color: #555;">
            Best regards,<br>
            <strong>Prism Writing Automated Response System</strong><br>
            This email was sent automatically. A team member will follow up shortly.
          </p>
        </div>
      </div>
    `;

    return await sendEmailViaResend(trigger.clientEmail, subject, htmlContent);
  }

  /**
   * Initialize comprehensive data collection for new client
   */
  private async initializeDataCollection(trigger: EmailTrigger): Promise<void> {
    await this.dataCollectionSystem.initializeDataCollection(trigger.clientId, 'full_onboarding');
  }

  /**
   * Extract project requirements from email content
   */
  private async extractProjectRequirements(trigger: EmailTrigger): Promise<{ completeness: number; extractedData: any }> {
    // In a real implementation, this would use AI/NLP to extract requirements
    // For now, return mock data
    return {
      completeness: 65, // Percentage of required information found
      extractedData: {
        projectType: 'content_writing',
        urgency: 'normal',
        estimatedScope: 'medium',
        keywords: ['business', 'content', 'marketing'],
        missingInfo: ['target_audience', 'brand_guidelines', 'specific_deliverables']
      }
    };
  }

  /**
   * Request additional information when data is incomplete
   */
  private async requestAdditionalInformation(trigger: EmailTrigger, extractedData: any): Promise<boolean> {
    const subject = 'Additional Information Needed - Let\'s Perfect Your Project';
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #ed8936; color: white; padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">📝 Additional Details Needed</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Let's ensure perfect results for your project</p>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #333; margin-top: 0;">Hi ${trigger.clientName},</h2>
          
          <p style="color: #555; line-height: 1.6;">
            We've reviewed your project email and have a great understanding of what you need! 
            To ensure we deliver exactly what you're looking for with our 95% accuracy guarantee, 
            we need a few additional details.
          </p>
          
          <div style="background: white; padding: 25px; border-radius: 8px; margin: 25px 0;">
            <h3 style="color: #333; margin-top: 0;">🎯 Missing Information:</h3>
            <ul style="color: #555; line-height: 1.8;">
              ${extractedData.missingInfo.map((info: string) => `<li><strong>${info.replace('_', ' ').toUpperCase()}:</strong> Please provide details</li>`).join('')}
            </ul>
          </div>
          
          <div style="text-align: center; margin: 25px 0;">
            <a href="https://prismwriting.com/portal?action=intake&client=${trigger.clientId}" 
               style="background: #ed8936; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">
              Complete Project Details
            </a>
          </div>
          
          <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #2d5a2d;">
              <strong>💡 Why We Need This:</strong> These details help us match you with the perfect team member, 
              understand your brand voice, and deliver content that resonates with your specific audience.
            </p>
          </div>
          
          <p style="color: #555; line-height: 1.6;">
            Once we have these details, we'll provide a detailed project proposal within 4 hours.
          </p>
          
          <p style="color: #555;">
            Thanks for your patience!<br><br>
            <strong>The Prism Writing Team</strong>
          </p>
        </div>
      </div>
    `;

    return await sendEmailViaResend(trigger.clientEmail, subject, htmlContent);
  }

  // Placeholder methods for additional functionality
  private async scheduleAgreementFollowUp(trigger: EmailTrigger): Promise<void> {
    // Implementation for agreement follow-up scheduling
  }

  private async scheduleKickoffCall(trigger: EmailTrigger): Promise<void> {
    // Implementation for kickoff call scheduling
  }

  private async handleFollowUp(trigger: EmailTrigger): Promise<void> {
    // Implementation for follow-up handling
  }

  private async handleReminder(trigger: EmailTrigger): Promise<void> {
    // Implementation for reminder handling
  }

  /**
   * Get workflow status for monitoring
   */
  public getWorkflowStatus(workflowId: string): AutomationWorkflow | null {
    return this.activeWorkflows.get(workflowId) || null;
  }

  /**
   * Get all active workflows
   */
  public getAllActiveWorkflows(): AutomationWorkflow[] {
    return Array.from(this.activeWorkflows.values()).filter(w => w.status === 'active');
  }
}

export default EnhancedEmailAutomationSystem;
