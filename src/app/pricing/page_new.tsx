'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ModernNavigation } from '@/components/ui/ModernComponents';
import EnhancedFooter from '@/components/layout/EnhancedFooter';
import { DarkModeToggle } from '@/components/ui/DarkModeToggle';
import ScrollToTop from '@/components/ui/ScrollToTop';
import SubscriptionPlans from '@/components/payment/SubscriptionPlans';
import { PlanType, BillingInterval } from '@/lib/stripe';
import Link from 'next/link';

export default function PricingPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Navigation items
  const navItems = [
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Resources', href: '/resources' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ];

  const handleSelectPlan = async (planType: PlanType, billingInterval: BillingInterval) => {
    setLoading(true);
    
    try {
      // Get auth token from localStorage or context
      const token = localStorage.getItem('auth_token');
      
      if (!token) {
        toast.error('Please log in to subscribe to a plan');
        router.push('/login');
        return;
      }

      // Create checkout session
      const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          action: 'create_checkout',
          planType,
          billingInterval,
        }),
      });

      const data = await response.json();

      if (data.success && data.checkoutUrl) {
        // Redirect to Stripe Checkout
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error(data.error || 'Failed to create checkout session');
      }

    } catch (error) {
      console.error('Error selecting plan:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to process subscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Modern Navigation */}
      <ModernNavigation
        logo={
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8">
              <svg viewBox="0 0 32 32" className="w-full h-full">
                <defs>
                  <linearGradient id="prismGradientPricing" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4f46e5" />
                    <stop offset="33%" stopColor="#0891b2" />
                    <stop offset="66%" stopColor="#059669" />
                    <stop offset="100%" stopColor="#dc2626" />
                  </linearGradient>
                </defs>
                <path d="M 6 10 L 16 8 L 16 20 L 6 22 Z" fill="url(#prismGradientPricing)" opacity="0.95"/>
                <line x1="16" y1="11" x2="24" y2="9" stroke="#4f46e5" strokeWidth="2" opacity="0.9"/>
                <line x1="16" y1="14" x2="26" y2="14" stroke="#0891b2" strokeWidth="2" opacity="0.9"/>
                <line x1="16" y1="17" x2="24" y2="19" stroke="#dc2626" strokeWidth="2" opacity="0.9"/>
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Prism Writing
            </span>
          </Link>
        }
        navItems={navItems}
        actions={
          <div className="flex items-center space-x-4">
            <DarkModeToggle />
            <Link
              href="/login"
              className="px-4 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/admin"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Admin
            </Link>
          </div>
        }
      />

      {/* Main Content */}
      <SubscriptionPlans
        onSelectPlan={handleSelectPlan}
        loading={loading}
      />

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Can I change my plan anytime?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated 
                and reflected in your next billing cycle.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We accept all major credit cards (Visa, MasterCard, American Express) and ACH bank transfers. 
                All payments are processed securely through Stripe.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Is there a free trial?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes, all plans come with a 14-day free trial. No credit card required to start your trial.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Do you offer refunds?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We offer a 30-day money-back guarantee. If you're not satisfied with our service, 
                contact us within 30 days for a full refund.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Can I cancel my subscription?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes, you can cancel your subscription at any time. You'll continue to have access 
                to all features until the end of your current billing period.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Do you offer team discounts?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes, we offer custom pricing for teams of 10 or more. Contact our sales team 
                for a personalized quote.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Our team is here to help you find the perfect plan for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@prismwriting.com"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Contact Sales
            </a>
            <a
              href="/support"
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Visit Help Center
            </a>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <EnhancedFooter />
      
      {/* Scroll to Top */}
      <ScrollToTop />
    </div>
  );
}
