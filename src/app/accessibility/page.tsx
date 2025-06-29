/**
 * Accessibility Statement Page
 * 
 * Comprehensive accessibility statement demonstrating Prism Writing's
 * commitment to inclusive design and WCAG compliance.
 * 
 * @module AccessibilityStatement
 * @version 1.0.0
 */

import React from 'react';
import { ModernNavigation } from '../../components/ui/ModernComponents';
import Link from 'next/link';
import { DarkModeToggle } from '../../components/ui/DarkModeToggle';

export default function AccessibilityStatement() {
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Resources', href: '/resources' },
    { label: 'About', href: '/about' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
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
          <div className="flex items-center space-x-3">
            <DarkModeToggle />
            <Link href="/contact">
              <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                Get Quote
              </button>
            </Link>
            <Link href="/portal-enhanced">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Login
              </button>
            </Link>
          </div>
        }
      />

      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Accessibility Statement
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Our commitment to inclusive design and digital accessibility
            </p>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-8">
            {/* Our Commitment */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Our Commitment to Accessibility
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Prism Writing is committed to ensuring digital accessibility for people with disabilities. 
                We are continually improving the user experience for everyone and applying the relevant 
                accessibility standards to achieve these goals.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                We believe that accessibility is not just a legal requirement, but a fundamental aspect 
                of good design that benefits all users. Our websites and digital products are designed 
                to be accessible to the widest possible audience, regardless of ability or technology.
              </p>
            </section>

            {/* Standards */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Accessibility Standards
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Our website aims to comply with the Web Content Accessibility Guidelines (WCAG) 2.1 
                Level AA standards. These guidelines explain how to make web content more accessible 
                to people with disabilities.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  WCAG 2.1 Level AA Compliance includes:
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Perceivable content for users with visual impairments</li>
                  <li>• Operable interface for users with motor disabilities</li>
                  <li>• Understandable content and navigation</li>
                  <li>• Robust code that works with assistive technologies</li>
                </ul>
              </div>
            </section>

            {/* Features */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Accessibility Features
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Visual Accessibility
                  </h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• High contrast color schemes</li>
                    <li>• Dark mode support</li>
                    <li>• Scalable fonts and responsive design</li>
                    <li>• Alt text for all images</li>
                    <li>• Focus indicators for keyboard navigation</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Navigation & Interaction
                  </h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Keyboard navigation support</li>
                    <li>• Skip to main content links</li>
                    <li>• Consistent navigation structure</li>
                    <li>• Clear headings and page structure</li>
                    <li>• Descriptive link text</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Assistive Technologies */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Assistive Technology Support
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Our website is designed to work with assistive technologies including:
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                  <div className="text-2xl mb-2">🖥️</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Screen Readers</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">JAWS, NVDA, VoiceOver</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                  <div className="text-2xl mb-2">⌨️</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Keyboard Navigation</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Full keyboard support</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                  <div className="text-2xl mb-2">🗣️</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Voice Control</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Dragon, Voice Control</p>
                </div>
              </div>
            </section>

            {/* Known Issues */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Known Issues & Limitations
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We are continuously working to improve accessibility. Currently known issues include:
              </p>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Some third-party embedded content may not be fully accessible</li>
                  <li>• PDF documents are being updated for better accessibility</li>
                  <li>• Complex animations may be reduced for users with motion sensitivity</li>
                </ul>
              </div>
            </section>

            {/* Feedback */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Feedback & Contact
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We welcome your feedback on the accessibility of our website. If you encounter 
                any accessibility barriers or have suggestions for improvement, please contact us:
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p><strong>Email:</strong> accessibility@prismwriting.com</p>
                  <p><strong>Phone:</strong> (555) 123-4567</p>
                  <p><strong>Mail:</strong> Prism Writing Cooperative, Accessibility Team, [Address]</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                We aim to respond to accessibility feedback within 2 business days.
              </p>
            </section>

            {/* Last Updated */}
            <section className="pt-8 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <strong>Last updated:</strong> June 28, 2025
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <strong>Next review:</strong> December 28, 2025
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
