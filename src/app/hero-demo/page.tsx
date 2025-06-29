/**
 * Simple Hero Demo Page
 * 
 * Demonstrates the SimpleHero component with different configurations
 * and use cases.
 * 
 * @module SimpleHeroDemo
 * @version 1.0.0
 */

import React from 'react';
import { SimpleHero, HeroPresets } from '../../components/ui/SimpleHero';
import Link from 'next/link';

export default function SimpleHeroDemo() {
  return (
    <div className="min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-medium">Back to Home</span>
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Simple Hero Demo</h1>
          </div>
        </div>
      </nav>

      {/* Demo Hero Section */}
      <SimpleHero
        title="Simple Hero Component Demo"
        subtitle="A clean, focused hero section with call-to-action button that drives conversions and engagement. Perfect for landing pages, product launches, and marketing campaigns."
        ctaText="Get Started Now"
        ctaHref="/portal-enhanced"
        secondaryCtaText="Learn More"
        secondaryCtaHref="/about"
        size="large"
        className="min-h-screen flex items-center"
      />

      {/* Demo Variations */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Different Hero Configurations</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The SimpleHero component supports multiple sizes, styles, and configurations
              to fit various use cases and design requirements.
            </p>
          </div>

          <div className="space-y-12">
            {/* Small Hero */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Small Size (Perfect for Contact Pages)</h3>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <SimpleHero
                  {...HeroPresets.contact}
                  className="rounded-lg"
                />
              </div>
            </div>

            {/* Medium Hero */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Medium Size (Great for Service Pages)</h3>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <SimpleHero
                  {...HeroPresets.service}
                  className="rounded-lg"
                />
              </div>
            </div>

            {/* Custom Hero with Background Image */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">With Background Image</h3>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <SimpleHero
                  title="Custom Background Hero"
                  subtitle="Add stunning visuals to your hero sections with background images and overlay effects."
                  ctaText="Explore Features"
                  ctaHref="/services"
                  backgroundImage="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  overlay={true}
                  size="medium"
                  className="rounded-lg"
                />
              </div>
            </div>

            {/* Left-aligned Hero */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Left-aligned Content</h3>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <SimpleHero
                  title="Left-Aligned Hero Section"
                  subtitle="Sometimes left-aligned content works better for certain designs and layouts, especially in dashboard or application contexts."
                  ctaText="Access Portal"
                  ctaHref="/portal-enhanced"
                  secondaryCtaText="Documentation"
                  secondaryCtaHref="/resources"
                  centered={false}
                  size="medium"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Usage Examples */}
          <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Usage Examples</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Basic Usage</h4>
                <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`<SimpleHero
  title="Your Amazing Product"
  subtitle="Description of your product"
  ctaText="Get Started"
  ctaHref="/signup"
/>`}
                </pre>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">With Presets</h4>
                <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`<SimpleHero
  {...HeroPresets.landing}
  className="min-h-screen"
/>`}
                </pre>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">With Background Image</h4>
                <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`<SimpleHero
  title="Beautiful Hero"
  ctaText="Explore"
  ctaHref="/explore"
  backgroundImage="/hero-bg.jpg"
  overlay={true}
/>`}
                </pre>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Custom Configuration</h4>
                <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`<SimpleHero
  title="Custom Hero"
  subtitle="Your description"
  ctaText="Primary Action"
  ctaHref="/action"
  secondaryCtaText="Secondary"
  secondaryCtaHref="/learn"
  size="large"
  centered={false}
/>`}
                </pre>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-xl">🎨</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Customizable Design</h4>
              <p className="text-gray-600">Multiple sizes, alignment options, and style configurations to match your brand.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-xl">📱</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Responsive</h4>
              <p className="text-gray-600">Looks great on all devices with mobile-first responsive design principles.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 text-xl">⚡</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Performance</h4>
              <p className="text-gray-600">Optimized animations and efficient rendering for smooth user experience.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
