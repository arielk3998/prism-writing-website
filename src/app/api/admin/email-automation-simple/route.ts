/**
 * Email Automation API
 * Handles scheduling, sending, and managing automated emails
 */

import { NextRequest, NextResponse } from 'next/server';
import { simpleEmailService } from '@/lib/simpleEmailAutomation';

const emailService = simpleEmailService;

export async function POST(request: NextRequest) {
  try {
    const { action, leadId } = await request.json();

    switch (action) {
      case 'setup-automation':
        if (!leadId) {
          return NextResponse.json(
            { error: 'Lead ID is required' },
            { status: 400 }
          );
        }

        const welcomeEmailSent = await emailService.sendWelcomeEmail(leadId);
        if (welcomeEmailSent) {
          await emailService.scheduleFollowUpSequence(leadId);
        }

        return NextResponse.json({ 
          success: true, 
          welcomeEmailSent,
          followUpScheduled: welcomeEmailSent
        });

      case 'process-queue':
        await emailService.processScheduledEmails();
        return NextResponse.json({ success: true });

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Email automation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    return NextResponse.json({ 
      status: 'Email automation service is running',
      templates: ['welcome', 'follow_up_24h', 'proposal_ready', 'nurture_week1', 'closing_final']
    });
  } catch (error) {
    console.error('Email automation GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
