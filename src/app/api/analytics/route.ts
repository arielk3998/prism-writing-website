// 📊 Advanced Analytics API Endpoint
// Phase 4: Production Features

import { NextRequest, NextResponse } from 'next/server';
import { analytics } from '@/lib/analytics';
import { requireAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const authResult = await requireAuth(request);
    if ('error' in authResult || authResult.user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('timeRange') || '30d';
    const includeInsights = searchParams.get('insights') === 'true';

    // Get business metrics
    const metrics = await analytics.getBusinessMetrics(timeRange);
    
    let insights = null;
    if (includeInsights) {
      insights = await analytics.generateMLInsights();
    }

    return NextResponse.json({
      success: true,
      data: {
        metrics,
        insights,
        timeRange,
        lastUpdated: new Date().toISOString(),
      },
    });

  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication (any authenticated user can track events)
    const authResult = await requireAuth(request);
    if ('error' in authResult) {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { event, metadata } = body;

    if (!event) {
      return NextResponse.json(
        { error: 'Event name is required' },
        { status: 400 }
      );
    }

    // Track the event
    await analytics.trackEvent(event, authResult.user?.id, metadata);

    return NextResponse.json({
      success: true,
      message: 'Event tracked successfully',
    });

  } catch (error) {
    console.error('Event tracking error:', error);
    return NextResponse.json(
      { error: 'Failed to track event' },
      { status: 500 }
    );
  }
}
