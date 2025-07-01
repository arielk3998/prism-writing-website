/**
 * Newsletter Admin API Route
 * 
 * Provides admin functionality for managing newsletter subscriptions.
 * Includes viewing, exporting, and managing subscriber data.
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

// Simple admin authentication (in production, use proper JWT/session auth)
function isAuthenticated(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  const adminKey = process.env.ADMIN_API_KEY || 'demo-admin-key';
  return authHeader === `Bearer ${adminKey}`;
}

// GET - Fetch subscriber statistics and data
export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const format = searchParams.get('format') || 'json';
    const includeUnsubscribed = searchParams.get('includeUnsubscribed') === 'true';

    let filteredSubscribers = subscribers;

    // Filter out unsubscribed users unless requested
    if (!includeUnsubscribed) {
      filteredSubscribers = subscribers.filter(sub => !sub.unsubscribedAt);
    }

    if (action === 'export') {
      // Export subscriber data
      if (format === 'csv') {
        const csvHeader = 'Email,Source,Subscribed At,Confirmed,Unsubscribed At\n';
        const csvData = filteredSubscribers
          .map(sub => `${sub.email},${sub.source},${sub.subscribedAt},${sub.confirmed},${sub.unsubscribedAt || ''}`)
          .join('\n');
        
        return new NextResponse(csvHeader + csvData, {
          headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment; filename="newsletter-subscribers.csv"'
          }
        });
      } else {
        return NextResponse.json(filteredSubscribers);
      }
    }

    // Return dashboard statistics
    const confirmedSubs = filteredSubscribers.filter(sub => sub.confirmed);
    const pendingSubs = filteredSubscribers.filter(sub => !sub.confirmed);
    const unsubscribedSubs = subscribers.filter(sub => sub.unsubscribedAt);

    // Growth stats (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentSubs = confirmedSubs.filter(
      sub => new Date(sub.subscribedAt) > thirtyDaysAgo
    );

    // Source breakdown
    const sourceBreakdown = confirmedSubs.reduce((acc, sub) => {
      acc[sub.source] = (acc[sub.source] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const stats = {
      total: {
        confirmed: confirmedSubs.length,
        pending: pendingSubs.length,
        unsubscribed: unsubscribedSubs.length,
        all: subscribers.length
      },
      growth: {
        last30Days: recentSubs.length,
        conversionRate: subscribers.length > 0 
          ? Math.round((confirmedSubs.length / subscribers.length) * 100) 
          : 0
      },
      sources: sourceBreakdown,
      recent: filteredSubscribers
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
    console.error('Admin API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admin data' },
      { status: 500 }
    );
  }
}

// DELETE - Remove a subscriber
export async function DELETE(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const subscriberId = searchParams.get('id');

    if (!subscriberId) {
      return NextResponse.json(
        { error: 'Subscriber ID is required' },
        { status: 400 }
      );
    }

    const subscriberIndex = subscribers.findIndex(sub => sub.id === subscriberId);
    
    if (subscriberIndex === -1) {
      return NextResponse.json(
        { error: 'Subscriber not found' },
        { status: 404 }
      );
    }

    const removedSubscriber = subscribers.splice(subscriberIndex, 1)[0];
    
    console.log('Admin removed subscriber:', removedSubscriber.email);

    return NextResponse.json(
      { message: 'Subscriber removed successfully', email: removedSubscriber.email },
      { status: 200 }
    );

  } catch (error) {
    console.error('Admin delete error:', error);
    return NextResponse.json(
      { error: 'Failed to remove subscriber' },
      { status: 500 }
    );
  }
}
