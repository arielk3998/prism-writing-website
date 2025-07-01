'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft, Mail } from 'lucide-react';
import EnhancedFooter from '@/components/layout/EnhancedFooter';
import { DarkModeToggle } from '@/components/ui/DarkModeToggle';

export default function NewsletterConfirmedPage() {
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Resources', href: '/resources' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
              Prism Writing
            </Link>
            
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            
            <div className="flex items-center gap-4">
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-8"
            >
              <div className="w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Subscription Confirmed!
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Thank you for subscribing to our newsletter. You&apos;ll receive monthly insights on technical writing best practices, industry trends, and exclusive resources.
            </motion.p>

            <motion.div
              className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    What to Expect
                  </h3>
                  <ul className="text-blue-800 dark:text-blue-200 space-y-1 text-sm">
                    <li>• Monthly newsletter with industry insights</li>
                    <li>• Technical writing tips and best practices</li>
                    <li>• Early access to new resources and templates</li>
                    <li>• Updates on compliance standards and regulations</li>
                    <li>• Exclusive content and case studies</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
              <Link
                href="/resources"
                className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Explore Resources
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Additional Information */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Manage Your Subscription
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  You can update your preferences or unsubscribe at any time using the links in our emails.
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  We respect your privacy and will never share your email address with third parties.
                </p>
              </motion.div>

              <motion.div
                className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Need Help?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  If you have any questions about our newsletter or need assistance, we&apos;re here to help.
                </p>
                <Link
                  href="/contact"
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-sm font-medium"
                >
                  Contact Support →
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <EnhancedFooter />
    </div>
  );
}
