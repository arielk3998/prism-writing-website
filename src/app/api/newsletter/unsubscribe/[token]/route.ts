/**
 * Newsletter Unsubscribe API Route
 * 
 * Handles email unsubscription requests in compliance with CAN-SPAM and GDPR.
 */

import { NextRequest, NextResponse } from 'next/server';

// This would be shared with the main newsletter route in production
const subscribers: Array<{
  id: string;
  email: string;
  consent: boolean;
  source: string;
  subscribedAt: string;
  confirmed: boolean;
  confirmationToken?: string;
  unsubscribeToken: string;
  ipAddress?: string;
  userAgent?: string;
  unsubscribedAt?: string;
}> = [];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    if (!token) {
      return NextResponse.json(
        { error: 'Invalid unsubscribe token' },
        { status: 400 }
      );
    }

    // Find subscriber by unsubscribe token
    const subscriberIndex = subscribers.findIndex(
      sub => sub.unsubscribeToken === token
    );

    if (subscriberIndex === -1) {
      return NextResponse.json(
        { error: 'Invalid unsubscribe token' },
        { status: 404 }
      );
    }

    // Mark as unsubscribed (keep record for compliance)
    const subscriber = subscribers[subscriberIndex];
    subscriber.unsubscribedAt = new Date().toISOString();

    console.log('User unsubscribed:', subscriber.email);

    // In production, redirect to an unsubscribe confirmation page
    return NextResponse.json(
      { 
        message: 'You have been successfully unsubscribed from our newsletter.',
        email: subscriber.email 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.json(
      { error: 'Failed to process unsubscribe request' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      );
    }

    // Find subscriber by email
    const subscriberIndex = subscribers.findIndex(
      sub => sub.email === email && !sub.unsubscribedAt
    );

    if (subscriberIndex === -1) {
      return NextResponse.json(
        { error: 'Email not found or already unsubscribed' },
        { status: 404 }
      );
    }

    // Mark as unsubscribed
    const subscriber = subscribers[subscriberIndex];
    subscriber.unsubscribedAt = new Date().toISOString();

    console.log('User unsubscribed via form:', subscriber.email);

    return NextResponse.json(
      { message: 'You have been successfully unsubscribed.' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.json(
      { error: 'Failed to process unsubscribe request' },
      { status: 500 }
    );
  }
}
