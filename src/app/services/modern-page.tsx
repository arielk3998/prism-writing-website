/**
 * Services Page - Modern Refactored Version
 * 
 * A comprehensive services showcase using our modern design system.
 * Features service cards, pricing, interactive elements, and conversion-focused layout.
 * 
 * @module ServicesPage
 * @version 3.0.0
 * @author Prism Writing Cooperative
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ModernButton,
  ModernCard,
  ModernNavigation,
} from '../../components/ui/ModernComponents';
import EnhancedFooter from '../../components/layout/EnhancedFooter';

// Service icons
const DocumentIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const CodeIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const BookIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M5 13l4 4L19 7" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export default function Services() {
  // Navigation items
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services', isActive: true },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Resources', href: '/resources' },
    { label: 'About', href: '/about' },
  ];

  // Core services data
  const services = [
    {
      icon: <CodeIcon />,
      title: 'API Documentation',
      description: 'Developer-focused documentation that accelerates adoption and reduces support requests.',
      features: [
        'OpenAPI/Swagger Integration',
        'Interactive Code Examples',
        'Authentication & Security Guides',
        'SDKs & Client Libraries',
        'Postman Collections',
        'Testing & Troubleshooting'
      ],
      pricing: 'Starting at $2,500',
      timeline: '2-4 weeks',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: <ShieldIcon />,
      title: 'Standard Operating Procedures',
      description: 'Compliance-ready SOPs that ensure consistency, quality, and regulatory adherence.',
      features: [
        'ISO 9001/27001 Compliance',
        'Process Flow Diagrams',
        'Training Materials',
        'Quality Metrics & KPIs',
        'Audit Documentation',
        'Continuous Improvement'
      ],
      pricing: 'Starting at $1,800',
      timeline: '1-3 weeks',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: <DocumentIcon />,
      title: 'User Manuals & Guides',
      description: 'User-centered documentation that improves product adoption and reduces support costs.',
      features: [
        'User Journey Mapping',
        'Visual Tutorials & Screenshots',
        'Troubleshooting Guides',
        'Multi-format Publishing',
        'Accessibility Compliance',
        'Localization Support'
      ],
      pricing: 'Starting at $1,200',
      timeline: '1-2 weeks',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: <BookIcon />,
      title: 'Training Materials',
      description: 'Comprehensive learning resources that accelerate employee onboarding and skill development.',
      features: [
        'Interactive Learning Modules',
        'Assessment & Quizzes',
        'Video Script Writing',
        'Certification Programs',
        'LMS Integration',
        'Performance Tracking'
      ],
      pricing: 'Starting at $2,000',
      timeline: '2-4 weeks',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  // Package pricing tiers
  const pricingTiers = [
    {
      name: 'Starter',
      description: 'Perfect for small projects and startups',
      price: '$1,200',
      priceDetail: 'per project',
      features: [
        'Up to 20 pages of documentation',
        'Basic formatting & styling',
        'PDF & web delivery',
        '2 rounds of revisions',
        'Email support',
        '2-week delivery'
      ],
      color: 'border-gray-200',
      popular: false,
    },
    {
      name: 'Professional',
      description: 'Ideal for growing businesses',
      price: '$2,500',
      priceDetail: 'per project',
      features: [
        'Up to 50 pages of documentation',
        'Advanced formatting & branding',
        'Multiple format delivery',
        'Interactive elements',
        '3 rounds of revisions',
        'Priority support',
        'Custom templates',
        '3-week delivery'
      ],
      color: 'border-blue-500 ring-2 ring-blue-500',
      popular: true,
    },
    {
      name: 'Enterprise',
      description: 'For large-scale documentation needs',
      price: 'Custom',
      priceDetail: 'contact for quote',
      features: [
        'Unlimited pages',
        'Full brand integration',
        'Multi-language support',
        'API integrations',
        'Unlimited revisions',
        'Dedicated project manager',
        'Training & workshops',
        'Ongoing maintenance'
      ],
      color: 'border-gray-200',
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Modern Navigation */}
      <ModernNavigation
        logo={
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Prism Writing
            </span>
          </Link>
        }
        navItems={navItems}
        actions={
          <div className="flex items-center space-x-4">
            <Link href="/contact">
              <ModernButton variant="outline" size="sm">
                Get Quote
              </ModernButton>
            </Link>
            <Link href="/portal">
              <ModernButton variant="primary" size="sm">
                Client Portal
              </ModernButton>
            </Link>
          </div>
        }
      />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Services
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Comprehensive technical writing solutions designed to transform complex information 
            into clear, actionable content that drives user engagement and business results.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/contact">
              <ModernButton variant="primary" size="lg">
                Start Your Project
              </ModernButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 mb-20">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ModernCard variant="elevated" className="h-full">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${service.color} text-white mb-6`}>
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="font-semibold text-gray-900">Pricing</div>
                      <div className="text-blue-600 font-medium">{service.pricing}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="font-semibold text-gray-900">Timeline</div>
                      <div className="text-green-600 font-medium">{service.timeline}</div>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-gray-600">
                        <div className="w-5 h-5 text-green-500 mr-3 mt-0.5">
                          <CheckIcon />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex gap-3">
                    <Link href="/contact" className="flex-1">
                      <ModernButton variant="primary" size="sm" fullWidth>
                        Get Quote
                      </ModernButton>
                    </Link>
                    <Link href="/portfolio" className="flex-1">
                      <ModernButton variant="outline" size="sm" fullWidth>
                        View Samples
                      </ModernButton>
                    </Link>
                  </div>
                </ModernCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the package that fits your needs. All projects include expert writing, 
              professional formatting, and dedicated project management.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                      <StarIcon />
                      <span className="ml-1">Most Popular</span>
                    </div>
                  </div>
                )}
                <ModernCard 
                  variant="elevated" 
                  className={`h-full border-2 ${tier.color} ${tier.popular ? 'shadow-xl' : ''}`}
                >
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                    <p className="text-gray-600 mb-4">{tier.description}</p>
                    <div className="text-4xl font-bold text-gray-900 mb-2">{tier.price}</div>
                    <div className="text-gray-500">{tier.priceDetail}</div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-gray-600">
                        <div className="w-5 h-5 text-green-500 mr-3 mt-0.5">
                          <CheckIcon />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/contact">
                    <ModernButton 
                      variant={tier.popular ? "primary" : "outline"} 
                      size="md" 
                      fullWidth
                    >
                      {tier.name === 'Enterprise' ? 'Contact Us' : 'Get Started'}
                    </ModernButton>
                  </Link>
                </ModernCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Documentation?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Let&apos;s discuss your project and create documentation that drives real results. 
              Get a custom quote tailored to your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <ModernButton variant="secondary" size="lg">
                  Get Custom Quote
                </ModernButton>
              </Link>
              <Link href="/portfolio">
                <ModernButton variant="outline" size="lg">
                  View Our Portfolio
                </ModernButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <EnhancedFooter />
    </div>
  );
}
