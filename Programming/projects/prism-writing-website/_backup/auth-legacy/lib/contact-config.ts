// Global contact information configuration
// This file centralizes all contact information for consistent use across the platform

export const CONTACT_INFO = {
  // Business Identity
  businessName: "Prism Writing",
  tagline: "Professional Translation & Writing Services",
  legalName: "Prism Writing Cooperative LLC",
  
  // Primary Contact Information
  email: {
    primary: "contact@prismwriting.com",
    support: "support@prismwriting.com",
    business: "business@prismwriting.com",
    info: "info@prismwriting.com",
    security: "security@prismwriting.com",
    legal: "legal@prismwriting.com"
  },
  
  // Phone Information
  phone: {
    display: "+1 (555) 123-4567", // UPDATE WITH YOUR REAL NUMBER
    clickToCall: "tel:+15551234567",
    hours: "Monday - Friday, 9:00 AM - 6:00 PM EST",
    emergency: "For urgent translation needs"
  },
  
  // Business Address
  address: {
    display: "Serving Clients Worldwide",
    full: "Remote-First Translation Cooperative",
    city: "Global Operations",
    country: "International",
    timezone: "EST (UTC-5)"
  },
  
  // Social Media Links (UPDATE WITH YOUR ACTUAL HANDLES)
  social: {
    linkedin: "https://linkedin.com/company/prism-writing",
    twitter: "https://twitter.com/prismwriting",
    facebook: "https://facebook.com/prismwriting",
    instagram: "https://instagram.com/prismwriting",
    youtube: "https://youtube.com/@prismwriting"
  },
  
  // Business Hours
  hours: {
    monday: "9:00 AM - 6:00 PM EST",
    tuesday: "9:00 AM - 6:00 PM EST", 
    wednesday: "9:00 AM - 6:00 PM EST",
    thursday: "9:00 AM - 6:00 PM EST",
    friday: "9:00 AM - 6:00 PM EST",
    saturday: "10:00 AM - 4:00 PM EST",
    sunday: "Closed",
    holidays: "Closed on major holidays"
  },
  
  // Service Level Agreements
  response: {
    email: "Within 24 hours",
    phone: "Same business day",
    quotes: "Within 2 hours",
    emergency: "Within 4 hours",
    support: "Within 12 hours"
  },
  
  // Legal Information
  legal: {
    businessRegistration: "Prism Writing Cooperative LLC",
    taxId: "Available upon request", // Professional tax information available to clients
    licenses: "Professional Translation Services Licensed",
    privacy: "GDPR & CCPA Compliant",
    terms: "Standard Terms of Service Apply"
  },

  // Quality Standards
  standards: {
    accuracy: "99.8% minimum accuracy rate",
    turnaround: "24-48 hour standard delivery",
    languages: "80+ professional language pairs",
    certification: "ISO 17100 Translation Standard",
    security: "Enterprise-grade data protection"
  }
} as const;

// Type definitions for better TypeScript support
export type EmailType = keyof typeof CONTACT_INFO.email;
export type SocialPlatform = keyof typeof CONTACT_INFO.social;
export type BusinessDay = keyof typeof CONTACT_INFO.hours;

// Helper functions for easy access across components
export const getContactEmail = (type: EmailType = 'primary'): string => 
  CONTACT_INFO.email[type];

export const getContactPhone = () => ({
  display: CONTACT_INFO.phone.display,
  clickToCall: CONTACT_INFO.phone.clickToCall,
  hours: CONTACT_INFO.phone.hours
});

export const getBusinessHours = () => CONTACT_INFO.hours;

export const getSocialLinks = () => CONTACT_INFO.social;

export const getResponseTime = (type: keyof typeof CONTACT_INFO.response) => 
  CONTACT_INFO.response[type];

export const getBusinessInfo = () => ({
  name: CONTACT_INFO.businessName,
  legalName: CONTACT_INFO.legalName,
  tagline: CONTACT_INFO.tagline,
  address: CONTACT_INFO.address
});

// Validation helpers
export const isValidEmailType = (type: string): type is EmailType => 
  type in CONTACT_INFO.email;

export const isValidSocialPlatform = (platform: string): platform is SocialPlatform => 
  platform in CONTACT_INFO.social;

// Business hours utilities
export const isBusinessHours = (): boolean => {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const hour = now.getHours();
  
  // Weekend check
  if (day === 0 || day === 6) return false; // Sunday or Saturday
  
  // Business hours: 9 AM - 6 PM EST
  return hour >= 9 && hour < 18;
};

export const getNextBusinessDay = (): string => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const now = new Date();
  let nextDay = (now.getDay() + 1) % 7;
  
  // Skip weekends
  if (nextDay === 0) nextDay = 1; // Skip Sunday
  if (nextDay === 6) nextDay = 1; // Skip Saturday
  
  return days[nextDay];
};

// SEO and structured data helpers
export const getStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": CONTACT_INFO.businessName,
  "description": CONTACT_INFO.tagline,
  "email": getContactEmail('primary'),
  "telephone": CONTACT_INFO.phone.display,
  "url": "https://prismwriting.com",
  "serviceType": "Translation and Writing Services",
  "areaServed": "Worldwide",
  "openingHours": [
    "Mo-Fr 09:00-18:00",
    "Sa 10:00-16:00"
  ]
});

export default CONTACT_INFO;
