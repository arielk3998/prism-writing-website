'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, ArrowRight, Loader2 } from 'lucide-react';
import { SUBSCRIPTION_PLANS, type PlanType, type BillingInterval } from '@/lib/stripe';

interface SubscriptionPlansProps {
  currentPlan?: PlanType;
  onSelectPlan: (planType: PlanType, billingInterval: BillingInterval) => Promise<void>;
  loading?: boolean;
}

export default function SubscriptionPlans({ 
  currentPlan, 
  onSelectPlan, 
  loading = false 
}: SubscriptionPlansProps) {
  const [billingInterval, setBillingInterval] = useState<BillingInterval>('month');
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);

  const handleSelectPlan = async (planType: PlanType) => {
    setSelectedPlan(planType);
    try {
      await onSelectPlan(planType, billingInterval);
    } catch (error) {
      console.error('Error selecting plan:', error);
    } finally {
      setSelectedPlan(null);
    }
  };

  const getPrice = (planType: PlanType) => {
    const plan = SUBSCRIPTION_PLANS[planType];
    return billingInterval === 'month' ? plan.monthlyPrice : plan.yearlyPrice;
  };

  const getSavings = (planType: PlanType) => {
    const plan = SUBSCRIPTION_PLANS[planType];
    const monthlyTotal = plan.monthlyPrice * 12;
    const yearlyPrice = plan.yearlyPrice;
    return Math.round(((monthlyTotal - yearlyPrice) / monthlyTotal) * 100);
  };

  return (
    <div className="py-12 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Select the perfect plan for your writing business needs. Upgrade or downgrade anytime.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white dark:bg-gray-800 p-1 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <button
                onClick={() => setBillingInterval('month')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  billingInterval === 'month'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingInterval('year')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all relative ${
                  billingInterval === 'year'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Yearly
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {Object.entries(SUBSCRIPTION_PLANS).map(([planType, plan]) => {
            const isPopular = planType === 'PRO';
            const isCurrent = currentPlan === planType;
            const isLoading = selectedPlan === planType && loading;
            
            return (
              <motion.div
                key={planType}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: plan.priority * 0.1 }}
                className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 transition-all duration-300 hover:shadow-2xl ${
                  isPopular
                    ? 'border-blue-500 transform scale-105'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                } ${isCurrent ? 'ring-2 ring-green-500' : ''}`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Current Plan Badge */}
                {isCurrent && (
                  <div className="absolute -top-4 right-4">
                    <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Current Plan
                    </div>
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {plan.description}
                    </p>
                    
                    {/* Price */}
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        ${getPrice(planType as PlanType)}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400 ml-2">
                        /{billingInterval}
                      </span>
                    </div>

                    {/* Savings */}
                    {billingInterval === 'year' && (
                      <div className="text-green-600 dark:text-green-400 text-sm font-medium">
                        Save {getSavings(planType as PlanType)}% annually
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleSelectPlan(planType as PlanType)}
                    disabled={loading || isCurrent}
                    className={`w-full py-4 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${
                      isCurrent
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed'
                        : isPopular
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                        : 'bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900'
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Processing...
                      </>
                    ) : isCurrent ? (
                      'Current Plan'
                    ) : (
                      <>
                        Get Started
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Trusted by professional writers and businesses worldwide
          </p>
          <div className="flex justify-center items-center space-x-8 text-gray-400">
            <span className="flex items-center">
              <Check className="w-4 h-4 mr-2 text-green-500" />
              30-day money-back guarantee
            </span>
            <span className="flex items-center">
              <Check className="w-4 h-4 mr-2 text-green-500" />
              Cancel anytime
            </span>
            <span className="flex items-center">
              <Check className="w-4 h-4 mr-2 text-green-500" />
              Secure payment processing
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
