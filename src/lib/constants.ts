/**
 * Application Constants
 * 
 * This file contains all static configuration values, data constants, and 
 * other immutable values used throughout the Prism Writing website.
 * Centralizing constants improves maintainability and ensures consistency.
 * 
 * Key Benefits:
 * - Single source of truth for configuration
 * - Easy to update site-wide settings
 * - Type safety with 'as const' assertions
 * - Intellisense support for constant values
 * - Prevents magic strings and numbers
 * 
 * Organization:
 * - Site configuration (metadata, URLs, contact info)
 * - Navigation structure
 * - Social media links
 * - Form dropdown options
 * 
 * @module Constants
 */

/**
 * Core site configuration
 * Used for metadata, SEO, and site-wide settings
 */
export const SITE_CONFIG = {
  name: 'Prism Writing',
  title: 'Prism Writing - Professional Technical Writing Services',
  description: 'Prism Writing Technical Writing Cooperative delivers clear, comprehensive documentation that transforms complex technical concepts into accessible, actionable content for your audience.',
  url: 'https://prismwriting.vercel.app',    // Production URL for canonical links
  email: 'contact@prismwriting.coop',        // Main business contact email
} as const;

/**
 * Main navigation items
 * Used in both desktop and mobile navigation components
 * Order matters - reflects information hierarchy
 */
export const NAVIGATION_ITEMS = [
  { name: 'Services', href: '/services' },     // Primary offering - first priority
  { name: 'About', href: '/about' },           // Company information
  { name: 'Portfolio', href: '/portfolio' },   // Work samples and case studies
  { name: 'Pricing', href: '/pricing' },       // Pricing information
  { name: 'Portal', href: '/portal' },         // Member portal access
  { name: 'Contact', href: '/contact' },       // Contact form - final CTA
] as const;

/**
 * Social media links for the business
 * Used in footer and potentially in header or contact page
 */
export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/prismwriting',
  linkedin: 'https://linkedin.com/company/prismwriting',
  github: 'https://github.com/prismwriting',
} as const;

/**
 * Project type options for contact form
 * Helps qualify leads and route inquiries appropriately
 * Ordered by commonality and complexity
 */
export const PROJECT_TYPES = [
  'API Documentation',          // Most common technical writing request
  'User Guides',               // Common for SaaS and software companies
  'Process Documentation',     // Internal documentation needs
  'Technical Blog Posts',      // Content marketing
  'Developer Tutorials',       // Educational content
  'Product Documentation',     // Comprehensive product docs
  'Content Strategy',          // High-level consulting
  'Other',                     // Catch-all for custom projects
] as const;

/**
 * Timeline options for project planning
 * Helps with resource allocation and pricing
 * Ordered from most urgent to least urgent
 */
export const TIMELINES = [
  'ASAP (Rush Job)',          // Emergency projects (premium pricing)
  '1-2 weeks',               // Quick turnaround projects
  '3-4 weeks',               // Standard project timeline
  '1-2 months',              // Larger projects
  '3+ months',               // Complex, ongoing projects
  'Ongoing/Retainer',        // Long-term partnerships
] as const;

/**
 * Budget range options for project scoping
 * Helps qualify leads and set appropriate expectations
 * Ranges reflect typical technical writing project costs
 */
export const BUDGETS = [
  'Under $1,000',            // Small projects, blog posts
  '$1,000 - $5,000',        // Standard user guides, small API docs
  '$5,000 - $10,000',       // Comprehensive API docs, multiple guides
  '$10,000 - $25,000',      // Large documentation projects
  '$25,000+',               // Enterprise-level projects
  'Let\'s discuss',         // Custom or ongoing arrangements
] as const;
