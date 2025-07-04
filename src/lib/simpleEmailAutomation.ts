/**
 * Simplified Email Automation Service for Testing
 * Works without requiring external API keys
 */

export class SimpleEmailAutomationService {
  
  // Send immediate welcome email (simulated)
  async sendWelcomeEmail(leadId: string): Promise<boolean> {
    try {
      console.log(`Sending welcome email to lead ${leadId}`);
      
      // Simulate email sending
      await new Promise(resolve => setTimeout(resolve, 100));
      
      console.log(`Welcome email sent successfully to lead ${leadId}`);
      return true;
    } catch (error) {
      console.error('Welcome email error:', error);
      return false;
    }
  }

  // Schedule follow-up emails (simulated)
  async scheduleFollowUpSequence(leadId: string): Promise<void> {
    try {
      console.log(`Scheduling follow-up sequence for lead ${leadId}`);
      
      const followUpTemplates = [
        { id: 'follow_up_24h', delay: 24 },
        { id: 'nurture_week1', delay: 168 },
        { id: 'closing_final', delay: 336 }
      ];

      for (const template of followUpTemplates) {
        const scheduledFor = new Date();
        scheduledFor.setHours(scheduledFor.getHours() + template.delay);
        
        console.log(`Scheduled ${template.id} for ${scheduledFor.toISOString()}`);
      }
      
      console.log(`Follow-up sequence scheduled for lead ${leadId}`);
    } catch (error) {
      console.error('Error scheduling follow-up sequence:', error);
    }
  }

  // Process scheduled emails (simulated)
  async processScheduledEmails(): Promise<void> {
    try {
      console.log('Processing scheduled emails...');
      
      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 200));
      
      console.log('Scheduled emails processed successfully');
    } catch (error) {
      console.error('Error processing scheduled emails:', error);
    }
  }

  // Get email statistics (simulated)
  async getEmailStats(): Promise<any> {
    return {
      totalSent: 156,
      totalScheduled: 23,
      openedEmails: 98,
      clickedEmails: 34,
      bouncedEmails: 3,
      openRate: 62.8,
      clickRate: 21.8,
      bounceRate: 1.9
    };
  }
}

// Export singleton instance
export const simpleEmailService = new SimpleEmailAutomationService();
