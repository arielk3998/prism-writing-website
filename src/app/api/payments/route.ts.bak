import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

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

    // Check if user has admin permissions
    if (!['SUPER_ADMIN', 'ADMIN'].includes(payload.role)) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    try {
      // Fetch payment intents from Stripe
      const paymentIntents = await stripe.paymentIntents.list({
        limit: Math.min(limit, 100),
        created: {
          gte: Math.floor(Date.now() / 1000) - (30 * 24 * 60 * 60), // Last 30 days
        },
      });

      // Fetch customers for additional data
      const customerIds = [...new Set(paymentIntents.data
        .map(pi => pi.customer)
        .filter(Boolean) as string[])];
      
      const customers = customerIds.length > 0 
        ? await Promise.all(customerIds.map(id => stripe.customers.retrieve(id)))
        : [];
      
      const customerMap = new Map(
        customers.map(customer => [
          customer.id, 
          customer as Stripe.Customer
        ])
      );

      // Format payments data
      const payments = paymentIntents.data.map(pi => {
        const customer = pi.customer ? customerMap.get(pi.customer as string) : null;
        
        return {
          id: pi.id,
          amount: pi.amount,
          currency: pi.currency,
          status: pi.status,
          customerEmail: customer?.email || pi.receipt_email || '',
          customerName: customer?.name || '',
          description: pi.description || 'Payment',
          created: pi.created * 1000, // Convert to milliseconds
          subscriptionId: pi.metadata?.subscription_id,
          planType: pi.metadata?.plan_type,
        };
      });

      // Calculate statistics
      const succeededPayments = payments.filter(p => p.status === 'succeeded');
      const totalRevenue = succeededPayments.reduce((sum, p) => sum + p.amount, 0);
      
      // Get current month data
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const monthlyPayments = succeededPayments.filter(p => {
        const paymentDate = new Date(p.created);
        return paymentDate.getMonth() === currentMonth && 
               paymentDate.getFullYear() === currentYear;
      });
      const monthlyRevenue = monthlyPayments.reduce((sum, p) => sum + p.amount, 0);

      // Get subscription data
      const subscriptions = await stripe.subscriptions.list({
        status: 'active',
        limit: 100,
      });

      const stats = {
        totalRevenue,
        monthlyRevenue,
        totalCustomers: customerIds.length,
        activeSubscriptions: subscriptions.data.length,
        conversionRate: customerIds.length > 0 ? (subscriptions.data.length / customerIds.length) * 100 : 0,
        averageOrderValue: succeededPayments.length > 0 ? totalRevenue / succeededPayments.length : 0,
      };

      return NextResponse.json({
        payments: payments.slice(offset, offset + limit),
        stats,
        total: payments.length,
        hasMore: payments.length > offset + limit,
      });

    } catch (stripeError) {
      console.error('Stripe API error:', stripeError);
      
      // Return mock data if Stripe is not configured or fails
      const mockPayments = [
        {
          id: 'pay_demo_001',
          amount: 7999,
          currency: 'usd',
          status: 'succeeded',
          customerEmail: 'client@example.com',
          customerName: 'Demo Client',
          description: 'Professional Plan - Monthly',
          created: Date.now() - 86400000,
          subscriptionId: 'sub_demo_001',
          planType: 'PRO'
        },
        {
          id: 'pay_demo_002',
          amount: 2999,
          currency: 'usd',
          status: 'succeeded',
          customerEmail: 'member@prismwriting.com',
          customerName: 'Demo Member',
          description: 'Basic Plan - Monthly',
          created: Date.now() - 172800000,
          subscriptionId: 'sub_demo_002',
          planType: 'BASIC'
        },
        {
          id: 'pay_demo_003',
          amount: 19999,
          currency: 'usd',
          status: 'pending',
          customerEmail: 'enterprise@bigcorp.com',
          customerName: 'Enterprise Corp',
          description: 'Enterprise Plan - Monthly',
          created: Date.now() - 3600000,
          subscriptionId: 'sub_demo_003',
          planType: 'ENTERPRISE'
        }
      ];

      const mockStats = {
        totalRevenue: 127845,
        monthlyRevenue: 45670,
        totalCustomers: 127,
        activeSubscriptions: 89,
        conversionRate: 12.5,
        averageOrderValue: 89.99,
      };

      return NextResponse.json({
        payments: mockPayments.slice(offset, offset + limit),
        stats: mockStats,
        total: mockPayments.length,
        hasMore: false,
        demo: true,
      });
    }

  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

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
    const { action, paymentId, amount, reason } = body;

    switch (action) {
      case 'refund':
        try {
          const refund = await stripe.refunds.create({
            payment_intent: paymentId,
            amount: amount, // Optional partial refund
            reason: reason || 'requested_by_customer',
            metadata: {
              refunded_by: payload.userId,
              admin_email: payload.email,
            },
          });

          return NextResponse.json({
            success: true,
            refund: {
              id: refund.id,
              amount: refund.amount,
              status: refund.status,
              reason: refund.reason,
            },
          });

        } catch (stripeError) {
          console.error('Stripe refund error:', stripeError);
          return NextResponse.json(
            { error: 'Failed to process refund' },
            { status: 400 }
          );
        }

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Error processing payment action:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
