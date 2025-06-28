/**
 * Contact Page - Modern Refactored Version
 * 
 * A comprehensive contact page with modern design, interactive forms,
 * and enhanced user experience elements.
 * 
 * @module ContactPage
 * @version 3.0.0
 * @author Prism Writing Cooperative
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ModernButton,
  ModernCard,
  ModernContactForm,
  ModernNavigation,
  ModernSectionHeader,
} from '../../components/ui/ModernComponents';
import EnhancedFooter from '../../components/layout/EnhancedFooter';

// Contact method icons
const EmailIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ChatIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M5 13l4 4L19 7" />
  </svg>
);

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Navigation items
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Resources', href: '/resources' },
    { label: 'Contact', href: '/contact', isActive: true },
  ];

  // Contact methods
  const contactMethods = [
    {
      icon: <EmailIcon />,
      title: 'Email Us',
      description: 'Get a detailed response within 24 hours',
      contact: 'hello@prismwriting.coop',
      action: 'Send Email',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: <CalendarIcon />,
      title: 'Schedule a Call',
      description: 'Book a free 30-minute consultation',
      contact: 'Available Mon-Fri, 9AM-6PM EST',
      action: 'Book Meeting',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: <ChatIcon />,
      title: 'Live Chat',
      description: 'Quick questions and instant responses',
      contact: 'Available during business hours',
      action: 'Start Chat',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  // Project process steps
  const processSteps = [
    {
      step: '01',
      title: 'Discovery Call',
      description: 'We discuss your needs, timeline, and project scope to create a tailored proposal.',
    },
    {
      step: '02',
      title: 'Proposal & Agreement',
      description: 'Receive a detailed proposal with pricing, timeline, and deliverables for your approval.',
    },
    {
      step: '03',
      title: 'Content Creation',
      description: 'Our expert writers create your documentation with regular check-ins and updates.',
    },
    {
      step: '04',
      title: 'Review & Refinement',
      description: 'Collaborative review process with revisions to ensure perfect alignment with your needs.',
    },
    {
      step: '05',
      title: 'Delivery & Support',
      description: 'Final delivery in your preferred formats plus ongoing support and maintenance options.',
    },
  ];

  const handleFormSubmit = async (formData: {
    name: string;
    email: string;
    company: string;
    service: string;
    message: string;
  }) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <Link href="/portfolio">
              <ModernButton variant="outline" size="sm">
                View Portfolio
              </ModernButton>
            </Link>
            <Link href="/services">
              <ModernButton variant="primary" size="sm">
                Our Services
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
            Let&apos;s Work Together
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Ready to transform your technical documentation? Let&apos;s discuss your project 
            and explore how we can help you create content that drives real results.
          </motion.p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ModernSectionHeader
            title="Get In Touch"
            subtitle="Choose the method that works best for you. We're here to help bring your documentation vision to life."
            centered
            className="mb-16"
          />

          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ModernCard variant="elevated" className="h-full text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${method.color} text-white mb-6`}>
                    {method.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {method.description}
                  </p>
                  <div className="text-sm text-gray-500 mb-6">
                    {method.contact}
                  </div>
                  <ModernButton variant="outline" size="sm" fullWidth>
                    {method.action}
                  </ModernButton>
                </ModernCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Process */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <ModernSectionHeader
                title="Start Your Project"
                subtitle="Tell us about your documentation needs and we'll get back to you with a custom proposal."
                className="mb-8"
              />
              
              {submitted ? (
                <motion.div
                  className="bg-green-50 border border-green-200 rounded-lg p-8 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckIcon />
                  </div>
                  <h3 className="text-2xl font-bold text-green-800 mb-2">Message Sent!</h3>
                  <p className="text-green-600 mb-6">
                    Thank you for reaching out. We&apos;ll review your message and get back to you within 24 hours.
                  </p>
                  <ModernButton
                    variant="primary"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Message
                  </ModernButton>
                </motion.div>
              ) : (
                <ModernContactForm
                  onSubmit={handleFormSubmit}
                  isLoading={isSubmitting}
                />
              )}
            </div>

            {/* Project Process */}
            <div>
              <ModernSectionHeader
                title="Our Process"
                subtitle="From discovery to delivery, here's how we work together to create exceptional documentation."
                className="mb-8"
              />

              <div className="space-y-6">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {step.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <ModernSectionHeader
            title="Frequently Asked Questions"
            subtitle="Quick answers to common questions about our services and process."
            centered
            className="mb-16"
          />

          <div className="space-y-6">
            {[
              {
                question: "What's the typical timeline for a documentation project?",
                answer: "Project timelines vary based on scope and complexity. Simple user manuals typically take 1-2 weeks, while comprehensive API documentation or SOPs can take 2-4 weeks. We'll provide a detailed timeline in your custom proposal."
              },
              {
                question: "Do you work with companies of all sizes?",
                answer: "Yes! We work with startups, mid-size companies, and enterprises. Our flexible approach and scalable solutions ensure we can meet the needs of any organization, regardless of size."
              },
              {
                question: "What formats do you deliver documentation in?",
                answer: "We deliver in multiple formats including PDF, HTML, Markdown, Confluence, GitBook, and custom web portals. We adapt to your existing tools and preferred publishing platforms."
              },
              {
                question: "Can you help with existing documentation that needs improvement?",
                answer: "Absolutely! We offer documentation audits, restructuring, and improvement services. We can assess your current documentation and provide recommendations for enhancement."
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ModernCard variant="default" className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </ModernCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Every great documentation project starts with a conversation. 
              Let&apos;s discuss your needs and create something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ModernButton variant="secondary" size="lg">
                Schedule Free Consultation
              </ModernButton>
              <Link href="/portfolio">
                <ModernButton variant="outline" size="lg">
                  View Our Work
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
