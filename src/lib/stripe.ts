/**
 * Payment Service - Stripe Integration
 * 
 * Comprehensive payment processing system for subscriptions, one-time payments,
 * and billing management for the Prism Writing business platform.
 */

import Stripe from 'stripe';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

// Subscription Plans Configuration
export const SUBSCRIPTION_PLANS = {
  BASIC: {
    name: 'Basic Plan',
    description: 'Perfect for individuals and small teams',
    features: [
      'Up to 5 projects',
      'Basic document templates',
      'Email support',
      'Document download',
      '10 GB storage'
    ],
    monthlyPriceId: process.env.STRIPE_PRICE_BASIC_MONTHLY!,
    yearlyPriceId: process.env.STRIPE_PRICE_BASIC_YEARLY!,
    monthlyPrice: 29.99,
    yearlyPrice: 299.99,
    maxProjects: 5,
    maxStorage: 10, // GB
    priority: 1
  },
  PRO: {
    name: 'Professional Plan',
    description: 'Best for growing businesses and agencies',
    features: [
      'Unlimited projects',
      'Advanced templates',
      'Priority support',
      'Team collaboration',
      'Custom branding',
      '100 GB storage',
      'Advanced analytics'
    ],
    monthlyPriceId: process.env.STRIPE_PRICE_PRO_MONTHLY!,
    yearlyPriceId: process.env.STRIPE_PRICE_PRO_YEARLY!,
    monthlyPrice: 79.99,
    yearlyPrice: 799.99,
    maxProjects: -1, // Unlimited
    maxStorage: 100, // GB
    priority: 2
  },
  ENTERPRISE: {
    name: 'Enterprise Plan',
    description: 'For large organizations with advanced needs',
    features: [
      'Everything in Pro',
      'Dedicated account manager',
      'Custom integrations',
      'Advanced security',
      'SSO integration',
      'Unlimited storage',
      'Phone support',
      'SLA guarantee'
    ],
    monthlyPriceId: process.env.STRIPE_PRICE_ENTERPRISE_MONTHLY!,
    yearlyPriceId: process.env.STRIPE_PRICE_ENTERPRISE_YEARLY!,
    monthlyPrice: 199.99,
    yearlyPrice: 1999.99,
    maxProjects: -1, // Unlimited
    maxStorage: -1, // Unlimited
    priority: 3
  }
} as const;

export type PlanType = keyof typeof SUBSCRIPTION_PLANS;
export type BillingInterval = 'month' | 'year';

export interface CreateSubscriptionParams {
  userId: string;
  planType: PlanType;
  billingInterval: BillingInterval;
  customerEmail: string;
  customerName?: string;
  successUrl: string;
  cancelUrl: string;
}

export interface CreatePaymentParams {
  amount: number; // in cents
  currency: string;
  description: string;
  customerEmail: string;
  customerId?: string;
  metadata?: Record<string, string>;
}

export interface Customer {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  address?: Stripe.Address;
  metadata?: Record<string, string>;
}

/**
 * Create or retrieve a Stripe customer
 */
export async function createOrGetCustomer(
  email: string,
  name?: string,
  metadata?: Record<string, string>
): Promise<Stripe.Customer> {
  try {
    // First, try to find existing customer by email
    const existingCustomers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      return existingCustomers.data[0];
    }

    // Create new customer if none found
    const customer = await stripe.customers.create({
      email,
      name,
      metadata: {
        ...metadata,
        source: 'prism_writing_platform',
        createdAt: new Date().toISOString(),
      },
    });

    return customer;
  } catch (error) {
    console.error('Error creating/getting customer:', error);
    throw new Error('Failed to create or retrieve customer');
  }
}

/**
 * Create a checkout session for subscription
 */
export async function createSubscriptionCheckout(
  params: CreateSubscriptionParams
): Promise<{ sessionId: string; url: string }> {
  try {
    const plan = SUBSCRIPTION_PLANS[params.planType];
    const priceId = params.billingInterval === 'month' 
      ? plan.monthlyPriceId 
      : plan.yearlyPriceId;

    // Create or get customer
    const customer = await createOrGetCustomer(
      params.customerEmail,
      params.customerName,
      {
        userId: params.userId,
        planType: params.planType,
        billingInterval: params.billingInterval,
      }
    );

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
      metadata: {
        userId: params.userId,
        planType: params.planType,
        billingInterval: params.billingInterval,
      },
      subscription_data: {
        metadata: {
          userId: params.userId,
          planType: params.planType,
          billingInterval: params.billingInterval,
        },
      },
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      tax_id_collection: { enabled: true },
    });

    if (!session.url) {
      throw new Error('Failed to create checkout session URL');
    }

    return {
      sessionId: session.id,
      url: session.url,
    };
  } catch (error) {
    console.error('Error creating subscription checkout:', error);
    throw new Error('Failed to create subscription checkout session');
  }
}

/**
 * Create a one-time payment checkout session
 */
export async function createPaymentCheckout(
  params: CreatePaymentParams & { successUrl: string; cancelUrl: string }
): Promise<{ sessionId: string; url: string }> {
  try {
    let customer: Stripe.Customer | undefined;

    if (params.customerId) {
      customer = await stripe.customers.retrieve(params.customerId) as Stripe.Customer;
    } else {
      customer = await createOrGetCustomer(params.customerEmail);
    }

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: params.currency,
            product_data: {
              name: params.description,
            },
            unit_amount: params.amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
      metadata: params.metadata || {},
      billing_address_collection: 'required',
    });

    if (!session.url) {
      throw new Error('Failed to create payment session URL');
    }

    return {
      sessionId: session.id,
      url: session.url,
    };
  } catch (error) {
    console.error('Error creating payment checkout:', error);
    throw new Error('Failed to create payment checkout session');
  }
}

/**
 * Create a customer portal session for subscription management
 */
export async function createCustomerPortalSession(
  customerId: string,
  returnUrl: string
): Promise<{ url: string }> {
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });

    return { url: session.url };
  } catch (error) {
    console.error('Error creating customer portal session:', error);
    throw new Error('Failed to create customer portal session');
  }
}

/**
 * Get subscription details
 */
export async function getSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
  try {
    return await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ['latest_invoice', 'customer', 'items.data.price'],
    });
  } catch (error) {
    console.error('Error retrieving subscription:', error);
    throw new Error('Failed to retrieve subscription');
  }
}

/**
 * Cancel a subscription
 */
export async function cancelSubscription(
  subscriptionId: string,
  cancelAtPeriodEnd: boolean = true
): Promise<Stripe.Subscription> {
  try {
    return await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: cancelAtPeriodEnd,
    });
  } catch (error) {
    console.error('Error canceling subscription:', error);
    throw new Error('Failed to cancel subscription');
  }
}

/**
 * Get customer's active subscriptions
 */
export async function getCustomerSubscriptions(customerId: string): Promise<Stripe.Subscription[]> {
  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
      expand: ['data.items.data.price'],
    });

    return subscriptions.data;
  } catch (error) {
    console.error('Error retrieving customer subscriptions:', error);
    throw new Error('Failed to retrieve customer subscriptions');
  }
}

/**
 * Create an invoice for custom services
 */
export async function createInvoice(params: {
  customerId: string;
  description: string;
  amount: number; // in cents
  currency: string;
  dueDate?: Date;
  metadata?: Record<string, string>;
}): Promise<Stripe.Invoice> {
  try {
    // Create invoice item
    await stripe.invoiceItems.create({
      customer: params.customerId,
      amount: params.amount,
      currency: params.currency,
      description: params.description,
      metadata: params.metadata || {},
    });

    // Create and finalize invoice
    const invoice = await stripe.invoices.create({
      customer: params.customerId,
      due_date: params.dueDate ? Math.floor(params.dueDate.getTime() / 1000) : undefined,
      auto_advance: true,
      metadata: params.metadata || {},
    });

    return await stripe.invoices.finalizeInvoice(invoice.id);
  } catch (error) {
    console.error('Error creating invoice:', error);
    throw new Error('Failed to create invoice');
  }
}

/**
 * Handle webhook events
 */
export async function handleWebhookEvent(
  payload: string | Buffer,
  signature: string
): Promise<Stripe.Event> {
  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
    return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    throw new Error('Invalid webhook signature');
  }
}

/**
 * Process webhook event and update database
 */
export async function processWebhookEvent(event: Stripe.Event): Promise<void> {
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      
      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.Invoice);
        break;
      
      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.Invoice);
        break;
      
      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object as Stripe.Subscription);
        break;
      
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
        break;
      
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
        break;
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    console.error(`Error processing webhook event ${event.type}:`, error);
    throw error;
  }
}

/**
 * Handle successful checkout completion
 */
async function handleCheckoutCompleted(session: Stripe.Checkout.Session): Promise<void> {
  console.log('Checkout completed:', session.id);
  
  // TODO: Update user subscription status in database
  // This will be implemented when we connect to the database
  
  const metadata = session.metadata;
  if (metadata?.userId) {
    console.log(`User ${metadata.userId} completed checkout for ${metadata.planType}`);
  }
}

/**
 * Handle successful payment
 */
async function handlePaymentSucceeded(invoice: Stripe.Invoice): Promise<void> {
  console.log('Payment succeeded:', invoice.id);
  
  // TODO: Update payment status in database
  // This will be implemented when we connect to the database
}

/**
 * Handle failed payment
 */
async function handlePaymentFailed(invoice: Stripe.Invoice): Promise<void> {
  console.log('Payment failed:', invoice.id);
  
  // TODO: Handle failed payment (notify user, update status)
  // This will be implemented when we connect to the database
}

/**
 * Handle new subscription
 */
async function handleSubscriptionCreated(subscription: Stripe.Subscription): Promise<void> {
  console.log('Subscription created:', subscription.id);
  
  // TODO: Create subscription record in database
  // This will be implemented when we connect to the database
}

/**
 * Handle subscription updates
 */
async function handleSubscriptionUpdated(subscription: Stripe.Subscription): Promise<void> {
  console.log('Subscription updated:', subscription.id);
  
  // TODO: Update subscription in database
  // This will be implemented when we connect to the database
}

/**
 * Handle subscription cancellation
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription): Promise<void> {
  console.log('Subscription deleted:', subscription.id);
  
  // TODO: Update subscription status in database
  // This will be implemented when we connect to the database
}

/**
 * Get plan information by type
 */
export function getPlanInfo(planType: PlanType) {
  return SUBSCRIPTION_PLANS[planType];
}

/**
 * Calculate annual savings percentage
 */
export function calculateAnnualSavings(planType: PlanType): number {
  const plan = SUBSCRIPTION_PLANS[planType];
  const annualMonthlyEquivalent = plan.monthlyPrice * 12;
  const savings = annualMonthlyEquivalent - plan.yearlyPrice;
  return Math.round((savings / annualMonthlyEquivalent) * 100);
}

export default stripe;
