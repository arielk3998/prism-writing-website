/**
 * Simple Hero Section Component
 * 
 * A clean, focused hero section with call-to-action button
 * for landing pages and marketing content.
 * 
 * @module SimpleHero
 * @version 1.0.0
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface SimpleHeroProps {
  title: string;
  subtitle?: string;
  ctaText: string;
  ctaHref: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  backgroundImage?: string;
  overlay?: boolean;
  centered?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export function SimpleHero({
  title,
  subtitle,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  backgroundImage,
  overlay = true,
  centered = true,
  size = 'medium',
  className = ''
}: SimpleHeroProps) {
  const sizeClasses = {
    small: 'py-12 sm:py-16',
    medium: 'py-16 sm:py-24',
    large: 'py-24 sm:py-32'
  };

  const titleSizes = {
    small: 'text-3xl sm:text-4xl',
    medium: 'text-4xl sm:text-5xl lg:text-6xl',
    large: 'text-5xl sm:text-6xl lg:text-7xl'
  };

  return (
    <section 
      className={`relative ${sizeClasses[size]} ${className}`}
      style={backgroundImage ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      } : {}}
    >
      {/* Background Overlay */}
      {overlay && backgroundImage && (
        <div className="absolute inset-0 bg-black/40" />
      )}

      {/* Background Gradient (when no image) */}
      {!backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700" />
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`${centered ? 'text-center' : 'text-left'} max-w-4xl ${centered ? 'mx-auto' : ''}`}>
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`${titleSizes[size]} font-bold text-white mb-6 leading-tight`}
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-lg sm:text-xl text-gray-100 mb-8 leading-relaxed max-w-3xl mx-auto"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Call-to-Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className={`flex flex-col sm:flex-row gap-4 ${centered ? 'justify-center' : 'justify-start'}`}
          >
            {/* Primary CTA */}
            <Link
              href={ctaHref}
              className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-transparent"
            >
              {ctaText}
              <svg 
                className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            </Link>

            {/* Secondary CTA */}
            {secondaryCtaText && secondaryCtaHref && (
              <Link
                href={secondaryCtaHref}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 hover:border-white hover:bg-white/10 rounded-lg backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
              >
                {secondaryCtaText}
              </Link>
            )}
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-full border-2 border-white/30 flex items-center justify-center text-sm">👤</div>
                <div className="w-8 h-8 bg-white/20 rounded-full border-2 border-white/30 flex items-center justify-center text-sm">👤</div>
                <div className="w-8 h-8 bg-white/20 rounded-full border-2 border-white/30 flex items-center justify-center text-sm">👤</div>
              </div>
              <span className="text-sm">Trusted by 150+ clients</span>
            </div>
            
            <div className="hidden sm:block w-px h-6 bg-white/30" />
            
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {'★'.repeat(5)}
              </div>
              <span className="text-sm">4.9/5 satisfaction rate</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
      </div>
    </section>
  );
}

// Preset hero configurations for common use cases
export const HeroPresets = {
  // Landing page hero
  landing: {
    title: "Transform Your Ideas Into Powerful Documentation",
    subtitle: "Professional technical writing services that drive business results. From API guides to compliance materials, we create content that your users will love.",
    ctaText: "Get Started Today",
    ctaHref: "/contact",
    secondaryCtaText: "View Our Work",
    secondaryCtaHref: "/portfolio",
    size: "large" as const
  },

  // Service page hero
  service: {
    title: "Expert Technical Writing Services",
    subtitle: "Clear, comprehensive documentation that drives user adoption and reduces support costs.",
    ctaText: "Request a Quote",
    ctaHref: "/contact",
    size: "medium" as const
  },

  // About page hero
  about: {
    title: "Meet the Prism Writing Cooperative",
    subtitle: "A team of expert technical writers dedicated to creating documentation that makes a difference.",
    ctaText: "Join Our Team",
    ctaHref: "/contact",
    secondaryCtaText: "Learn More",
    secondaryCtaHref: "/about",
    size: "medium" as const
  },

  // Contact page hero
  contact: {
    title: "Ready to Get Started?",
    subtitle: "Let's discuss your project and create documentation that drives real business impact.",
    ctaText: "Schedule a Consultation",
    ctaHref: "/contact",
    size: "small" as const
  }
};

// Usage example component
export function ExampleHero() {
  return (
    <SimpleHero
      {...HeroPresets.landing}
      className="min-h-screen flex items-center"
    />
  );
}
