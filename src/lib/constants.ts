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
 * Main navigation structure
 * Professional, conversion-focused navigation with clear hierarchy
 * Ordered by user journey: Services -> Portfolio -> About -> Resources -> Contact
 */
export const NAVIGATION_ITEMS = [
  { 
    name: 'Services', 
    href: '/services',
    submenu: [
      { name: 'API Documentation', href: '/services/api-documentation' },
      { name: 'Standard Operating Procedures', href: '/services/sops' },
      { name: 'User Manuals', href: '/services/user-manuals' },
      { name: 'Onboarding Guides', href: '/services/onboarding-guides' },
      { name: 'Process Documentation', href: '/services/process-documentation' },
      { name: 'Training Materials', href: '/services/training-materials' }
    ]
  },
  { name: 'Portfolio', href: '/portfolio' },
  { 
    name: 'About', 
    href: '/about',
    submenu: [
      { name: 'Our Mission', href: '/about#mission' },
      { name: 'Our Values', href: '/about#values' },
      { name: 'Our Expertise', href: '/about#expertise' },
      { name: 'Meet the Team', href: '/about#team' }
    ]
  },
  { 
    name: 'Resources', 
    href: '/resources',
    submenu: [
      { name: 'Blog', href: '/blog' },
      { name: 'Case Studies', href: '/case-studies' },
      { name: 'Best Practices', href: '/resources/best-practices' },
      { name: 'Templates', href: '/resources/templates' }
    ]
  },
  { name: 'Testimonials', href: '/testimonials' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' }
] as const;

/**
 * Footer navigation structure
 * Simplified version of main navigation plus legal/business info
 */
export const FOOTER_NAVIGATION = {
  quickLinks: [
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ],
  services: [
    { name: 'API Documentation', href: '/services/api-documentation' },
    { name: 'SOPs', href: '/services/sops' },
    { name: 'User Manuals', href: '/services/user-manuals' },
    { name: 'Training Materials', href: '/services/training-materials' }
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Accessibility Statement', href: '/accessibility' }
  ],
  resources: [
    { name: 'Blog', href: '/blog' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Templates', href: '/resources/templates' }
  ]
} as const;

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

/**
 * Business information for footer and contact sections
 * Complete business details for professional presentation
 */
export const BUSINESS_INFO = {
  name: 'Prism Writing Cooperative',
  tagline: 'Clear Documentation. Better Outcomes.',
  address: {
    street: '123 Technical Way',
    city: 'Austin',
    state: 'TX',
    zip: '78701',
    country: 'USA'
  },
  contact: {
    email: 'hello@prismwriting.com',
    phone: '+1 (555) 123-4567',
    hours: 'Monday-Friday, 9 AM - 6 PM CST'
  },
  founded: '2024',
  employees: '5-10',
  specialization: 'Technical Writing & Documentation Strategy'
} as const;

/**
 * Professional certifications and badges
 * Builds trust and demonstrates expertise
 */
export const CERTIFICATIONS = [
  {
    name: 'Society for Technical Communication',
    badge: 'STC Member',
    url: 'https://www.stc.org/',
    logo: '/images/certifications/stc-logo.svg'
  },
  {
    name: 'ISO 9001 Compliant',
    badge: 'Quality Management',
    url: '/about#quality',
    logo: '/images/certifications/iso-logo.svg'
  },
  {
    name: 'GDPR Compliant',
    badge: 'Data Protection',
    url: '/privacy',
    logo: '/images/certifications/gdpr-logo.svg'
  },
  {
    name: 'Accessibility Certified',
    badge: 'WCAG 2.1 AA',
    url: '/accessibility',
    logo: '/images/certifications/accessibility-logo.svg'
  }
] as const;

/**
 * Design system inspired by leading SaaS websites
 * Clean, professional, conversion-focused design tokens
 */
export const DESIGN_TOKENS = {
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      900: '#1e3a8a'
    },
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    neutral: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      500: '#6b7280',
      700: '#374151',
      900: '#111827'
    }
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['Fira Code', 'monospace']
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem'
    }
  },
  spacing: {
    section: '5rem',
    container: '1280px'
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem'
  }
} as const;

/**
 * Call-to-action messages for different sections
 * Conversion-optimized copy for key interaction points
 */
export const CTA_MESSAGES = {
  hero: {
    primary: 'Get Clear Documentation',
    secondary: 'Schedule Consultation'
  },
  services: {
    primary: 'Start Your Project',
    secondary: 'Learn More'
  },
  portfolio: {
    primary: 'See Our Work',
    secondary: 'Download Sample'
  },
  testimonials: {
    primary: 'Work With Us',
    secondary: 'Read More Reviews'
  },
  contact: {
    primary: 'Send Message',
    secondary: 'Call Now'
  }
} as const;

/**
 * SEO-optimized meta descriptions for each page
 * Tailored for technical writing business
 */
export const SEO_META = {
  home: {
    title: 'Professional Technical Writing Services | Prism Writing',
    description: 'Clear, user-focused technical documentation that drives results. API docs, user guides, SOPs, and training materials. Get your free consultation today.'
  },
  services: {
    title: 'Technical Writing Services | API Docs, SOPs, User Guides',
    description: 'Expert technical writing services including API documentation, standard operating procedures, user manuals, and onboarding guides. Quality guaranteed.'
  },
  portfolio: {
    title: 'Technical Writing Portfolio | Sample Documentation Projects',
    description: 'View our portfolio of professional technical writing projects. API documentation, user guides, training materials, and process documentation samples.'
  },
  about: {
    title: 'About Prism Writing | Expert Technical Writing Team',
    description: 'Meet our team of certified technical writers. Learn about our mission, values, and expertise in creating documentation that users actually love.'
  },
  contact: {
    title: 'Contact Prism Writing | Get Your Free Consultation',
    description: 'Ready to improve your documentation? Contact our technical writing experts for a free consultation. Quick response guaranteed.'
  }
} as const;
