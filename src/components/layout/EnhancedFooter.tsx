/**
 * Enhanced Footer Component
 * 
 * Professional footer with comprehensive navigation, business info, and certifications
 * Inspired by leading SaaS websites for conversion optimization
 */

'use client';

import Link from 'next/link';
import { AnimatedLogo } from '../ui/AnimatedLogo';
import { 
  FOOTER_NAVIGATION, 
  BUSINESS_INFO, 
  CERTIFICATIONS, 
  SOCIAL_LINKS
} from '../../lib/constants';

export default function EnhancedFooter() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter CTA Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated on Documentation Best Practices</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Get weekly insights, templates, and tips delivered to your inbox. Join 1,000+ professionals improving their documentation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-5 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 md:col-span-2">
            <div className="mb-6">
              <AnimatedLogo width={180} height={60} variant="full" />
            </div>
            <p className="text-gray-300 mb-6 text-lg">
              {BUSINESS_INFO.tagline}
            </p>
            <p className="text-gray-400 mb-6">
              {BUSINESS_INFO.specialization} since {BUSINESS_INFO.founded}. 
              We transform complex technical concepts into clear, actionable documentation that drives results.
            </p>
            
            {/* Business Address */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3 text-white">Visit Us</h4>
              <address className="text-gray-400 not-italic">
                {BUSINESS_INFO.address.street}<br />
                {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state} {BUSINESS_INFO.address.zip}<br />
                {BUSINESS_INFO.address.country}
              </address>
            </div>

            {/* Contact Info */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3 text-white">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <p>
                  <a href={`mailto:${BUSINESS_INFO.contact.email}`} className="hover:text-indigo-400 transition-colors">
                    {BUSINESS_INFO.contact.email}
                  </a>
                </p>
                <p>
                  <a href={`tel:${BUSINESS_INFO.contact.phone}`} className="hover:text-indigo-400 transition-colors">
                    {BUSINESS_INFO.contact.phone}
                  </a>
                </p>
                <p className="text-sm">{BUSINESS_INFO.contact.hours}</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {FOOTER_NAVIGATION.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-indigo-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Services</h4>
            <ul className="space-y-3">
              {FOOTER_NAVIGATION.services.map((service) => (
                <li key={service.name}>
                  <Link 
                    href={service.href} 
                    className="text-gray-400 hover:text-indigo-400 transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Resources</h4>
            <ul className="space-y-3">
              {FOOTER_NAVIGATION.resources.map((resource) => (
                <li key={resource.name}>
                  <Link 
                    href={resource.href} 
                    className="text-gray-400 hover:text-indigo-400 transition-colors"
                  >
                    {resource.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Certifications */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <h4 className="font-semibold mb-6 text-white text-center">Certifications & Compliance</h4>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {CERTIFICATIONS.map((cert) => (
              <Link
                key={cert.name}
                href={cert.url}
                className="flex items-center gap-3 text-gray-400 hover:text-indigo-400 transition-colors group"
              >
                <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-sm">{cert.badge}</div>
                  <div className="text-xs text-gray-500">{cert.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Social Links & Legal */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Media */}
            <div className="flex items-center gap-6">
              <span className="text-gray-400 text-sm">Follow us:</span>
              <div className="flex gap-4">
                <Link 
                  href={SOCIAL_LINKS.linkedin} 
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </Link>
                <Link 
                  href={SOCIAL_LINKS.twitter} 
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </Link>
                <Link 
                  href={SOCIAL_LINKS.github} 
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                  aria-label="GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </Link>
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6">
              {FOOTER_NAVIGATION.legal.map((legal) => (
                <Link
                  key={legal.name}
                  href={legal.href}
                  className="text-gray-400 hover:text-indigo-400 transition-colors text-sm"
                >
                  {legal.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center mt-8 pt-8 border-t border-gray-800">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved. | 
              Built with ❤️ for the technical writing community.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
