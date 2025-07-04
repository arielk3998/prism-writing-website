/**
 * Email Integration Service - Simplified for Build
 * Handles automated follow-ups and lead nurturing emails
 */

import type { User } from '@/lib/auth';

// Mock types for compatibility
interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  phone?: string;
  message: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  industry?: string;
  addedToNewsletter: boolean;
  allowFollowUp: boolean;
  status?: string;
  priority?: string;
  leadScore?: number;
  lastContactDate?: Date;
  nextFollowUpDate?: Date;
  source?: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: 'WELCOME' | 'FOLLOW_UP' | 'PROPOSAL' | 'NURTURE' | 'CLOSING';
  delay?: number; // Hours to wait before sending
}

export interface EmailScheduleData {
  leadId: string;
  templateId: string;
  scheduledFor: Date;
  sent: boolean;
  emailId?: string;
}

export interface EmailStats {
  totalSent: number;
  totalScheduled: number;
  openedEmails: number;
  clickedEmails: number;
  bouncedEmails: number;
  openRate: number;
  clickRate: number;
  bounceRate: number;
}

export interface AutomationSetupResult {
  welcomeEmailSent: boolean;
  followUpScheduled: boolean;
}

// Simplified class for build compatibility
export class EmailAutomationService {
  // Mock implementations to prevent build errors
  async sendWelcomeEmail(leadId: string): Promise<{ success: boolean; messageId?: string }> {
    console.log('Mock: Send welcome email for lead:', leadId);
    return { success: true, messageId: 'mock-message-id' };
  }

  async scheduleFollowUp(leadId: string, delay: number = 24): Promise<boolean> {
    console.log('Mock: Schedule follow up for lead:', leadId, 'delay:', delay);
    return true;
  }

  async getEmailStats(): Promise<EmailStats> {
    return {
      totalSent: 0,
      totalScheduled: 0,
      openedEmails: 0,
      clickedEmails: 0,
      bouncedEmails: 0,
      openRate: 0,
      clickRate: 0,
      bounceRate: 0
    };
  }

  async setupAutomatedSequence(leadId: string): Promise<AutomationSetupResult> {
    console.log('Mock: Setup automated sequence for lead:', leadId);
    return {
      welcomeEmailSent: true,
      followUpScheduled: true
    };
  }
}

// Export singleton instance
export const emailAutomationService = new EmailAutomationService();
