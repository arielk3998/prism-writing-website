/**
 * Prism Writing Homepage - Modern Refactored Version
 * 
 * A complete transformation of the homepage using our modern design system
 * and component library. Features stunning visuals, micro-interactions,
 * and conversion-focused layout inspired by top technology websites.
 * 
 * @module Homepage
 * @version 3.0.0
 * @author Prism Writing Cooperative
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ModernHero,
  ModernButton,
  ModernCard,
  ModernStats,
  ModernFeatureGrid,
  ModernNavigation,
} from '../components/ui/ModernComponents';
import { TechIllustration } from '../components/ui/EnhancedGraphics';
import EnhancedFooter from '../components/layout/EnhancedFooter';

const CheckIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M5 13l4 4L19 7" />
  </svg>
);

const RocketIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

export default function Home() {
  // Navigation items
  const navItems = [
    { label: 'Home', href: '/', isActive: true },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Resources', href: '/resources' },
    { label: 'About', href: '/about' },
  ];

  // Company statistics
  const stats = [
    { value: 500, label: 'Projects Completed', suffix: '+' },
    { value: 150, label: 'Happy Clients', suffix: '+' },
    { value: 99, label: 'Success Rate', suffix: '%' },
    { value: 24, label: 'Hour Support', suffix: '/7' },
  ];

  // Core features for the feature grid
  const features = [
    {
      icon: <TechIllustration type="documentation" size="small" />,
      title: 'Technical Documentation',
      description: 'Comprehensive technical writing services including API docs, user manuals, and SOPs that drive user engagement and reduce support tickets.',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: <TechIllustration type="api" size="small" />,
      title: 'API Documentation',
      description: 'Developer-focused documentation that makes complex APIs accessible, with interactive examples and clear implementation guides.',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: <TechIllustration type="security" size="small" />,
      title: 'Compliance Documentation',
      description: 'Regulatory compliance documentation for HIPAA, SOX, ISO standards, and industry-specific requirements that keep you audit-ready.',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: <TechIllustration type="training" size="small" />,
      title: 'User Experience Design',
      description: 'User-centered documentation design that improves product adoption and reduces training costs through intuitive information architecture.',
      color: 'bg-orange-100 text-orange-600',
    },
    {
      icon: <TechIllustration type="analytics" size="small" />,
      title: 'Analytics & Optimization',
      description: 'Data-driven documentation strategies with performance tracking, user analytics, and continuous optimization for maximum impact.',
      color: 'bg-pink-100 text-pink-600',
    },
    {
      icon: <TechIllustration type="research" size="small" />,
      title: 'Quality Assurance',
      description: 'Rigorous quality control processes ensuring accuracy, consistency, and brand alignment across all documentation deliverables.',
      color: 'bg-cyan-100 text-cyan-600',
    },
  ];

  // Service highlights for preview section
  const serviceHighlights = [
    {
      title: 'API Documentation',
      description: 'Interactive developer guides that accelerate adoption',
      features: ['OpenAPI Integration', 'Code Examples', 'Authentication Guides', 'SDKs & Libraries'],
      icon: <TechIllustration type="api" size="small" />,
      color: 'from-blue-500 to-purple-600',
    },
    {
      title: 'Standard Operating Procedures',
      description: 'Clear processes that ensure compliance and efficiency',
      features: ['ISO Compliance', 'Process Mapping', 'Training Materials', 'Quality Metrics'],
      icon: <TechIllustration type="security" size="small" />,
      color: 'from-green-500 to-teal-600',
    },
    {
      title: 'User Manuals',
      description: 'Intuitive guides that reduce support costs',
      features: ['User Journey Maps', 'Visual Tutorials', 'Troubleshooting', 'Multi-format Publishing'],
      icon: <TechIllustration type="documentation" size="small" />,
      color: 'from-purple-500 to-pink-600',
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
      <ModernHero
        title="Transform Ideas Into Powerful Documentation"
        subtitle="We create technical documentation that drives business results. From API guides to compliance materials, our expert writers turn complex information into clear, actionable content that your users will love."
        gradient="linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)"
      >
        <Link href="/services">
          <ModernButton variant="primary" size="lg">
            Explore Our Services
          </ModernButton>
        </Link>
        <Link href="/portfolio">
          <ModernButton variant="outline" size="lg">
            View Our Work
          </ModernButton>
        </Link>
      </ModernHero>

      {/* Statistics Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Companies Worldwide
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our track record speaks for itself. We&apos;ve helped hundreds of companies 
              create documentation that drives real business impact.
            </p>
          </motion.div>
          <ModernStats stats={stats} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Prism Writing?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We don&apos;t just write documentation—we create strategic content that drives 
              user engagement, reduces support costs, and accelerates product adoption.
            </p>
          </motion.div>
          <ModernFeatureGrid features={features} columns={3} />
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From API documentation to compliance materials, we provide end-to-end 
              technical writing solutions that grow with your business.
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {serviceHighlights.map((service, index) => (
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-600">
                        <div className="w-4 h-4 text-green-500 mr-3">
                          <CheckIcon />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/services">
                    <ModernButton variant="outline" size="sm" fullWidth>
                      Learn More
                    </ModernButton>
                  </Link>
                </ModernCard>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/services">
              <ModernButton variant="primary" size="lg">
                View All Services & Pricing
              </ModernButton>
            </Link>
            <p className="mt-4 text-gray-600">
              Need something custom?{' '}
              <Link href="/contact" className="text-blue-600 hover:underline font-medium">
                Let&apos;s discuss your project
              </Link>
            </p>
          </motion.div>
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
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 text-white mb-6">
              <RocketIcon />
            </div>
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Documentation?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Join hundreds of companies who&apos;ve revolutionized their user experience 
              with our expert technical writing services. Start your project today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <ModernButton variant="secondary" size="lg">
                  Start Your Project
                </ModernButton>
              </Link>
              <Link href="/portfolio">
                <ModernButton variant="outline" size="lg">
                  See Our Work
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
