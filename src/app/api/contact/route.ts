/**
 * Contact Form API Route
 * Handles POST requests from the contact form with automated workflows
 */

import { NextRequest, NextResponse } from 'next/server';
import { automateContactFormSubmission } from '../../../lib/automatedWorkflows';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, message, projectType } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Use automated workflow for comprehensive handling
    const automationResult = await automateContactFormSubmission({
      name,
      email,
      company: company || 'Not specified',
      message,
      projectType
    });

    // Log for debugging
    console.log('Contact form automation result:', automationResult);

    // Always return success to user even if some automations fail
    return NextResponse.json(
      { 
        message: 'Thank you for your message! We will get back to you within 24 hours.',
        automationStatus: {
          emailsSent: automationResult.clientEmail && automationResult.adminEmail,
          notificationSent: automationResult.slack
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
