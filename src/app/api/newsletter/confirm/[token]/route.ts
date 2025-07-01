/**
 * Newsletter Confirmation API Route
 * 
 * Handles email confirmation for double opt-in subscriptions.
 */

import { NextRequest, NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

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
}> = [];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    if (!token) {
      return NextResponse.json(
        { error: 'Invalid confirmation token' },
        { status: 400 }
      );
    }

    // Find subscriber by confirmation token
    const subscriberIndex = subscribers.findIndex(
      sub => sub.confirmationToken === token && !sub.confirmed
    );

    if (subscriberIndex === -1) {
      return NextResponse.json(
        { error: 'Invalid or expired confirmation token' },
        { status: 404 }
      );
    }

    // Confirm subscription
    subscribers[subscriberIndex].confirmed = true;
    subscribers[subscriberIndex].confirmationToken = undefined;

    console.log('Email confirmed:', subscribers[subscriberIndex].email);

    // Redirect to a confirmation page or return success
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    redirect(`${baseUrl}/newsletter/confirmed`);

  } catch (error) {
    console.error('Email confirmation error:', error);
    return NextResponse.json(
      { error: 'Failed to confirm subscription' },
      { status: 500 }
    );
  }
}
