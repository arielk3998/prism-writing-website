/**
 * Cookie Policy Page
 * 
 * Comprehensive cookie policy explaining how Prism Writing uses
 * cookies and similar technologies.
 * 
 * @module CookiePolicy
 * @version 1.0.0
 */

import React from 'react';
import { ModernNavigation } from '../../components/ui/ModernComponents';
import Link from 'next/link';
import { DarkModeToggle } from '../../components/ui/DarkModeToggle';

export default function CookiePolicy() {
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
              Cookie Policy
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              How we use cookies and similar technologies
            </p>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-8">
            {/* Last Updated */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Last updated:</strong> June 28, 2025
              </p>
            </div>

            {/* What are Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                What Are Cookies?
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Cookies are small text files that are placed on your computer or mobile device when 
                you visit our website. They are widely used to make websites work, or work more 
                efficiently, as well as to provide information to the owners of the site.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Cookies allow us to recognize you when you return to our website, remember your 
                preferences, and provide you with a better user experience.
              </p>
            </section>

            {/* How We Use Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                How We Use Cookies
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Prism Writing uses cookies for several purposes:
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300 ml-6">
                <li>• <strong>Essential functionality:</strong> To provide core website features</li>
                <li>• <strong>User preferences:</strong> To remember your settings and preferences</li>
                <li>• <strong>Authentication:</strong> To keep you logged in securely</li>
                <li>• <strong>Analytics:</strong> To understand how our website is used</li>
                <li>• <strong>Performance:</strong> To optimize website speed and functionality</li>
              </ul>
            </section>

            {/* Types of Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Types of Cookies We Use
              </h2>
              <div className="space-y-6">
                {/* Essential Cookies */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Essential Cookies (Required)
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    These cookies are necessary for the website to function properly and cannot be disabled.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-2 text-gray-900 dark:text-white">Cookie Name</th>
                          <th className="text-left py-2 text-gray-900 dark:text-white">Purpose</th>
                          <th className="text-left py-2 text-gray-900 dark:text-white">Duration</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-700 dark:text-gray-300">
                        <tr className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-2">prism-session</td>
                          <td className="py-2">User authentication and session management</td>
                          <td className="py-2">24 hours</td>
                        </tr>
                        <tr className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-2">prism-csrf</td>
                          <td className="py-2">Security protection against CSRF attacks</td>
                          <td className="py-2">Session</td>
                        </tr>
                        <tr>
                          <td className="py-2">prism-preferences</td>
                          <td className="py-2">Remember user preferences (dark mode, etc.)</td>
                          <td className="py-2">1 year</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Analytics Cookies (Optional)
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    These cookies help us understand how visitors interact with our website.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-2 text-gray-900 dark:text-white">Cookie Name</th>
                          <th className="text-left py-2 text-gray-900 dark:text-white">Purpose</th>
                          <th className="text-left py-2 text-gray-900 dark:text-white">Duration</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-700 dark:text-gray-300">
                        <tr className="border-b border-gray-100 dark:border-gray-800">
                          <td className="py-2">_ga</td>
                          <td className="py-2">Google Analytics - distinguish users</td>
                          <td className="py-2">2 years</td>
                        </tr>
                        <tr>
                          <td className="py-2">_gid</td>
                          <td className="py-2">Google Analytics - distinguish users</td>
                          <td className="py-2">24 hours</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Performance Cookies */}
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Performance Cookies (Optional)
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    These cookies help us improve website performance and user experience.
                  </p>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="text-left py-2 text-gray-900 dark:text-white">Cookie Name</th>
                          <th className="text-left py-2 text-gray-900 dark:text-white">Purpose</th>
                          <th className="text-left py-2 text-gray-900 dark:text-white">Duration</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-700 dark:text-gray-300">
                        <tr>
                          <td className="py-2">prism-performance</td>
                          <td className="py-2">Website performance monitoring</td>
                          <td className="py-2">30 days</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>

            {/* Managing Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Managing Your Cookie Preferences
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                You have several options for managing cookies:
              </p>
              
              <div className="space-y-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Cookie Consent Manager
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    Use our cookie consent manager to control which cookies you allow:
                  </p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Manage Cookie Preferences
                  </button>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Browser Settings
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    You can also control cookies through your browser settings:
                  </p>
                  <ul className="space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                    <li>• <strong>Chrome:</strong> Settings → Privacy and security → Cookies</li>
                    <li>• <strong>Firefox:</strong> Preferences → Privacy & Security → Cookies</li>
                    <li>• <strong>Safari:</strong> Preferences → Privacy → Cookies</li>
                    <li>• <strong>Edge:</strong> Settings → Cookies and site permissions</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Third-Party Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Third-Party Cookies
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Some cookies on our website are set by third-party services that we use:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Google Analytics</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                    Helps us understand website usage and improve user experience.
                  </p>
                  <a href="https://policies.google.com/privacy" className="text-blue-600 hover:text-blue-700 text-sm">
                    Google Privacy Policy →
                  </a>
                </div>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Vercel Analytics</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                    Performance monitoring and optimization.
                  </p>
                  <a href="https://vercel.com/legal/privacy-policy" className="text-blue-600 hover:text-blue-700 text-sm">
                    Vercel Privacy Policy →
                  </a>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Contact Us About Cookies
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If you have any questions about our use of cookies, please contact us:
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p><strong>Email:</strong> ariel.pk@outlook.com</p>
                  <p><strong>Phone:</strong> (555) 123-4567</p>
                  <p><strong>Mail:</strong> Prism Writing Cooperative, Privacy Team, [Address]</p>
                </div>
              </div>
            </section>

            {/* Changes to Policy */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Changes to This Cookie Policy
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                We may update this Cookie Policy from time to time to reflect changes in technology, 
                legislation, or our practices. We will notify you of any significant changes by 
                posting the updated policy on our website with a new effective date.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
