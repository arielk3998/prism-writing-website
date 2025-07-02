/**
 * Enhanced Homepage Component
 * 
 * A modern, conversion-focused homepage that showcases Prism Writing's services
 * using cutting-edge design patterns inspired by top technology websites.
 * 
 * Features:
 * - Stunning hero section with animated backgrounds
 * - Interactive feature displays
 * - Modern statistics animations
 * - Glass-morphism design elements
 * - Smooth scroll animations
 * - Mobile-first responsive design
 * 
 * @module EnhancedHomepage
 * @version 2.0.0
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
} from '../../components/ui/ModernComponents';
import Navigation from '../../components/layout/Navigation';
import EnhancedFooter from '../../components/layout/EnhancedFooter';

// Icons for features (using simple SVG icons)
const DocumentIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const CodeIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
);

const LightningIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export default function EnhancedHomepage() {
  // Statistics data - Real team metrics
  const stats = [
    { value: 3, label: 'Expert Team Members', suffix: '' },
    { value: 15, label: 'Years Combined Experience', suffix: '+' },
    { value: 8, label: 'Specialization Areas', suffix: '' },
    { value: 24, label: 'Hour Response Time', suffix: 'h' },
  ];

  // Features data
  const features = [
    {
      icon: <DocumentIcon />,
      title: 'API Documentation',
      description: 'Transform complex APIs into developer-friendly documentation that drives adoption and reduces support tickets.',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: <ShieldIcon />,
      title: 'Compliance Ready',
      description: 'Documentation that meets HIPAA, ISO, OSHA, and other regulatory standards for your industry.',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: <UsersIcon />,
      title: 'User Manuals',
      description: 'Clear, actionable guides that reduce training time and improve user satisfaction.',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: <LightningIcon />,
      title: 'Fast Delivery',
      description: 'Agile processes and experienced teams deliver high-quality documentation on time, every time.',
      color: 'bg-orange-100 text-orange-600',
    },
    {
      icon: <CodeIcon />,
      title: 'Technical Expertise',
      description: 'Deep technical knowledge across software, healthcare, manufacturing, and financial services.',
      color: 'bg-indigo-100 text-indigo-600',
    },
    {
      icon: <CheckIcon />,
      title: 'Quality Assured',
      description: 'Multi-level review process ensures accuracy, clarity, and consistency in all deliverables.',
      color: 'bg-teal-100 text-teal-600',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation currentPage="/" />

      {/* Hero Section */}
      <ModernHero
        title="Transform Complex Ideas Into Clear Documentation"
        subtitle="Prism Writing Cooperative delivers professional technical writing that drives user adoption, ensures compliance, and reduces support burden across industries."
        gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <ModernButton variant="primary" size="lg">
            <Link href="/contact" className="flex items-center">
              Start Your Project
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </ModernButton>
          <ModernButton variant="outline" size="lg">
            <Link href="/portfolio" className="flex items-center">
              View Our Work
            </Link>
          </ModernButton>
        </div>
      </ModernHero>

      {/* Statistics Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our track record speaks for itself. See why companies across industries 
              choose Prism Writing for their critical documentation needs.
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
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose Prism Writing
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We combine technical expertise with modern design principles to create 
              documentation that users actually want to read and use.
            </p>
          </motion.div>

          <ModernFeatureGrid features={features} columns={3} />
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Our Specialized Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From API docs to compliance manuals, we deliver documentation that drives results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'API Documentation',
                description: 'Developer-friendly docs that increase API adoption by 40% and reduce support tickets.',
                href: '/services/api-documentation',
                gradient: 'from-blue-500 to-blue-600',
              },
              {
                title: 'Standard Operating Procedures',
                description: 'Compliance-ready SOPs that reduce training time and ensure regulatory adherence.',
                href: '/services/sops',
                gradient: 'from-green-500 to-green-600',
              },
              {
                title: 'User Manuals & Guides',
                description: 'Clear, actionable guides that improve user satisfaction and reduce churn.',
                href: '/services/user-manuals',
                gradient: 'from-purple-500 to-purple-600',
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ModernCard variant="interactive" className="h-full group">
                  <div className={`w-12 h-12 bg-gradient-to-r ${service.gradient} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <DocumentIcon />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <Link
                    href={service.href}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold group-hover:translate-x-2 transition-transform duration-300"
                  >
                    Learn More
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </ModernCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Documentation?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join hundreds of satisfied clients who&apos;ve improved their user experience, 
              reduced support costs, and achieved compliance with our expert technical writing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ModernButton variant="secondary" size="lg">
                <Link href="/contact" className="flex items-center">
                  Get Started Today
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </ModernButton>
              <ModernButton variant="outline" size="lg">
                <Link href="/resources" className="flex items-center text-white border-white hover:bg-white hover:text-blue-600">
                  View Compliance Standards
                </Link>
              </ModernButton>
            </div>
          </motion.div>
        </div>
      </section>

      <EnhancedFooter />
    </div>
  );
}
