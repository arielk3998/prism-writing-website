import { NextRequest, NextResponse } from 'next/server';
import { handleWebhookEvent, processWebhookEvent } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      console.error('Missing Stripe signature');
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      );
    }

    // Verify webhook signature and construct event
    const event = await handleWebhookEvent(body, signature);
    
    console.log(`Received webhook event: ${event.type}`);

    // Process the webhook event
    await processWebhookEvent(event);

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook error:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('signature')) {
        return NextResponse.json(
          { error: 'Invalid signature' },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

// Only allow POST requests
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
