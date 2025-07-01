import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { 
  createSubscriptionCheckout,
  createCustomerPortalSession,
  type CreateSubscriptionParams 
} from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { action, planType, billingInterval, customerEmail, customerName } = body;

    switch (action) {
      case 'create_checkout': {
        try {
          const params: CreateSubscriptionParams = {
            userId: payload.userId,
            planType,
            billingInterval,
            customerEmail: customerEmail || payload.email,
            customerName,
            successUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?payment=success`,
            cancelUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing?payment=cancelled`,
          };

          const session = await createSubscriptionCheckout(params);

          return NextResponse.json({
            success: true,
            checkoutUrl: session.url,
            sessionId: session.sessionId,
          });

        } catch (error) {
          console.error('Checkout session creation failed:', error);
          return NextResponse.json(
            { error: 'Failed to create checkout session' },
            { status: 400 }
          );
        }
      }

      case 'create_portal': {
        try {
          // First we need to get customer ID - for now using mock data
          const customerId = 'cus_demo_001'; // In real implementation, get from database
          
          const portalSession = await createCustomerPortalSession(
            customerId,
            `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`
          );

          return NextResponse.json({
            success: true,
            portalUrl: portalSession.url,
          });

        } catch (error) {
          console.error('Portal session creation failed:', error);
          return NextResponse.json(
            { error: 'Failed to create portal session' },
            { status: 400 }
          );
        }
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Error in subscription API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Get user's subscription information
    try {
      // This would normally fetch from database
      // For now, return mock data
      const mockSubscription = {
        id: 'sub_demo_001',
        status: 'active',
        planType: 'PRO',
        billingInterval: 'month',
        currentPeriodStart: Date.now() - 86400000 * 5, // 5 days ago
        currentPeriodEnd: Date.now() + 86400000 * 25, // 25 days from now
        cancelAtPeriodEnd: false,
        amount: 7999,
        currency: 'usd',
      };

      return NextResponse.json({
        subscription: mockSubscription,
        features: {
          maxProjects: -1, // Unlimited for PRO
          maxStorage: 100, // GB
          customBranding: true,
          advancedAnalytics: true,
          prioritySupport: true,
        },
      });

    } catch (error) {
      console.error('Error fetching subscription:', error);
      return NextResponse.json(
        { subscription: null, features: null },
        { status: 200 }
      );
    }

  } catch (error) {
    console.error('Error in subscription GET:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
