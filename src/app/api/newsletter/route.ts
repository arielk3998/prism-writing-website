/**
 * Newsletter Subscription API Route
 * 
 * Handles email subscription requests with GDPR compliance features.
 * Implements double opt-in, consent tracking, and admin management capabilities.
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Validation schema for newsletter subscription
const subscriptionSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  consent: z.boolean().refine(val => val === true, {
    message: 'You must consent to receive emails'
  }),
  source: z.string().optional().default('footer'),
  doubleOptIn: z.boolean().optional().default(true)
});

// In-memory storage for demo (in production, use a proper database)
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

function generateToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input data
    const validationResult = subscriptionSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid subscription data',
          details: validationResult.error.errors 
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Check if email already exists
    const existingSubscriber = subscribers.find(sub => sub.email === data.email);
    
    if (existingSubscriber) {
      if (existingSubscriber.confirmed) {
        return NextResponse.json(
          { message: 'You are already subscribed to our newsletter!' },
          { status: 200 }
        );
      } else {
        // Resend confirmation if not confirmed
        return NextResponse.json(
          { 
            message: 'A confirmation email has been sent. Please check your inbox.',
            requiresConfirmation: true 
          },
          { status: 200 }
        );
      }
    }

    // Create new subscription
    const subscription = {
      id: generateToken(),
      email: data.email,
      consent: data.consent,
      source: data.source,
      subscribedAt: new Date().toISOString(),
      confirmed: !data.doubleOptIn, // Auto-confirm if double opt-in is disabled
      confirmationToken: data.doubleOptIn ? generateToken() : undefined,
      unsubscribeToken: generateToken(),
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown'
    };

    subscribers.push(subscription);

    // Log subscription for analytics
    console.log('Newsletter subscription:', {
      email: data.email,
      source: data.source,
      timestamp: subscription.subscribedAt,
      requiresConfirmation: data.doubleOptIn
    });

    if (data.doubleOptIn) {
      // In production, send confirmation email here
      console.log(`Confirmation email would be sent to: ${data.email}`);
      console.log(`Confirmation link: ${process.env.NEXT_PUBLIC_BASE_URL}/api/newsletter/confirm/${subscription.confirmationToken}`);
      
      return NextResponse.json(
        { 
          message: 'Thank you! Please check your email to confirm your subscription.',
          requiresConfirmation: true 
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: 'Successfully subscribed to our newsletter!' },
        { status: 200 }
      );
    }

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}

// GET endpoint for admin to view subscriptions
export async function GET() {
  try {
    // In production, add authentication check here
    const stats = {
      total: subscribers.length,
      confirmed: subscribers.filter(sub => sub.confirmed).length,
      pending: subscribers.filter(sub => !sub.confirmed).length,
      recentSubs: subscribers
        .sort((a, b) => new Date(b.subscribedAt).getTime() - new Date(a.subscribedAt).getTime())
        .slice(0, 10)
        .map(sub => ({
          id: sub.id,
          email: sub.email,
          source: sub.source,
          subscribedAt: sub.subscribedAt,
          confirmed: sub.confirmed
        }))
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching subscriber stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscriber statistics' },
      { status: 500 }
    );
  }
}
