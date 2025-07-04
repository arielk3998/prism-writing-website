'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ModernContactForm, 
  ModernSectionHeader,
  ModernNavigation,
  ModernButton
} from '@/components/ui/ModernComponents';
import EnhancedFooter from '@/components/layout/EnhancedFooter';
import { DarkModeToggle } from '@/components/ui/DarkModeToggle';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { MapPin, Mail, Clock, MessageCircle, Zap, Globe, Users } from 'lucide-react';

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  
  // Navigation items
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Resources', href: '/resources' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
  ];
  const handleContactSubmit = async (data: {
    name: string;
    email: string;
    company: string;
    service: string;
    message: string;
  }) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          company: data.company,
          message: data.message,
          projectType: data.service,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Thank you for your message! We will get back to you within 24 hours.');
      } else {
        alert(result.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      alert('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const processSteps = [
    {
      icon: MessageCircle,
      title: "Tell Us About Your Project",
      description: "Share your requirements, timeline, and goals through our contact form."
    },
    {
      icon: Users,
      title: "Strategy Call",
      description: "We'll schedule a consultation to understand your needs and provide recommendations."
    },
    {
      icon: Zap,
      title: "Proposal & Timeline",
      description: "Receive a detailed proposal with scope, timeline, and transparent pricing."
    },
    {
      icon: Globe,
      title: "Project Delivery",
      description: "Experience seamless project execution with regular updates and quality deliverables."
    }
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      value: "ariel.pk@outlook.com",
      subtitle: "We respond within 24 hours",
      iconBg: "bg-blue-50 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Remote-First Company",
      subtitle: "Serving clients worldwide",
      iconBg: "bg-green-50 dark:bg-green-900/30",
      iconColor: "text-green-600 dark:text-green-400"
    },
    {
      icon: Clock,
      title: "Response Time",
      value: "24-48 hours",
      subtitle: "For project inquiries",
      iconBg: "bg-orange-50 dark:bg-orange-900/30",
      iconColor: "text-orange-600 dark:text-orange-400"
    }
  ];

  const faqs = [
    {
      question: "What's your typical turnaround time?",
      answer: "Most projects are completed within 1-3 weeks, depending on scope and complexity. We provide detailed timelines during our initial consultation."
    },
    {
      question: "Do you offer rush services?",
      answer: "Yes! We can accommodate urgent projects with 24-48 hour turnaround for an additional fee. Contact us to discuss expedited options."
    },
    {
      question: "What industries do you serve?",
      answer: "We work with technology companies, startups, healthcare, finance, manufacturing, and many other sectors requiring clear technical communication."
    },
    {
      question: "Do you provide revisions?",
      answer: "Absolutely! We include up to 3 rounds of revisions in all projects to ensure the final deliverable meets your exact requirements."
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
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
            <DarkModeToggle />
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
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-contrast-high mb-6 leading-tight">
              Let&apos;s Create Something
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block mt-2 pb-2">
                Amazing Together
              </span>
            </h1>
            <p className="text-xl text-muted-contrast max-w-3xl mx-auto leading-relaxed mb-8">
              Ready to transform your technical documentation? We&apos;re here to help you communicate complex ideas with clarity and impact.
            </p>
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full text-sm font-medium text-muted-contrast border border-blue-200/50 dark:border-blue-700/50">
              <Clock className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-400" />
              Quick Response • Expert Team • Quality Guaranteed
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ModernSectionHeader
            title="Our Simple Process"
            subtitle="From initial contact to final delivery, we make it easy"
            centered
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-purple-200 transform -translate-x-8"></div>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full transform translate-x-16 -translate-y-16"></div>
              <div className="relative">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Started Today</h2>
                  <p className="text-gray-600">
                    Tell us about your project and we&apos;ll get back to you within 24 hours with a personalized proposal.
                  </p>
                </div>
                <ModernContactForm 
                  onSubmit={handleContactSubmit} 
                  isLoading={isLoading}
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Details Grid */}
              <div className="grid sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 group">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 ${info.iconBg} dark:bg-opacity-20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <info.icon className={`w-6 h-6 ${info.iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-contrast-high mb-1">{info.title}</h4>
                        <p className="text-contrast-high font-medium">{info.value}</p>
                        <p className="text-sm text-muted-contrast mt-1">{info.subtitle}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* FAQ Section */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-contrast-high mb-6">Frequently Asked Questions</h3>
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-100 dark:border-gray-700 last:border-b-0 pb-4 last:pb-0">
                      <h4 className="font-semibold text-contrast-high mb-2">{faq.question}</h4>
                      <p className="text-muted-contrast text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Card */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                <p className="text-blue-100 mb-6">
                  Join hundreds of satisfied clients who trust us with their technical communication needs.
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    <span>24/7 Support</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    <span>Quick Turnaround</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    <span>Quality Guaranteed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ScrollToTop />
      <EnhancedFooter />
    </div>
  );
}
