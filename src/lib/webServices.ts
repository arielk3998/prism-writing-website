/**
 * Free Web Services Integration
 * 
 * Integration with beneficial free web APIs and services to enhance
 * the Prism Writing website functionality.
 * 
 * @module WebServicesIntegration
 * @version 1.0.0
 */

// Free APIs and Services that would benefit Prism Writing:

/**
 * 1. Email Services (Free Tiers)
 */
export const EMAIL_SERVICES = {
  // Resend - Free tier: 3,000 emails/month
  resend: {
    apiKey: process.env.RESEND_API_KEY,
    endpoint: 'https://api.resend.com/emails',
    features: ['Contact forms', 'Newsletter', 'Welcome emails']
  },
  
  // EmailJS - Free tier: 200 emails/month
  emailjs: {
    serviceId: process.env.EMAILJS_SERVICE_ID,
    templateId: process.env.EMAILJS_TEMPLATE_ID,
    userId: process.env.EMAILJS_USER_ID,
    features: ['Client-side email sending', 'Contact forms']
  }
};

/**
 * 2. Analytics Services (Free)
 */
export const ANALYTICS_SERVICES = {
  // Google Analytics 4 (Free)
  googleAnalytics: {
    measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    features: ['Page views', 'User behavior', 'Conversion tracking']
  },
  
  // Vercel Analytics (Free for personal/hobby)
  vercelAnalytics: {
    features: ['Web vitals', 'Page speed', 'User experience metrics']
  },
  
  // Umami (Self-hosted, privacy-focused)
  umami: {
    endpoint: process.env.UMAMI_ENDPOINT,
    websiteId: process.env.UMAMI_WEBSITE_ID,
    features: ['Privacy-focused analytics', 'GDPR compliant']
  }
};

/**
 * 3. Content Delivery and Performance (Free Tiers)
 */
export const CDN_SERVICES = {
  // Cloudflare (Free tier)
  cloudflare: {
    features: ['CDN', 'DDoS protection', 'SSL certificates', 'Caching']
  },
  
  // Vercel Edge Functions (Free tier)
  vercelEdge: {
    features: ['Global edge network', 'Fast API responses', 'Image optimization']
  }
};

/**
 * 4. SEO and Social Media APIs (Free)
 */
export const SEO_SERVICES = {
  // Open Graph preview
  openGraph: {
    endpoint: 'https://opengraph.io/api/1.1/site/',
    features: ['Social media previews', 'Link previews']
  },
  
  // Google Search Console API (Free)
  searchConsole: {
    features: ['Search performance', 'Index status', 'SEO insights']
  }
};

/**
 * 5. Communication APIs (Free Tiers)
 */
export const COMMUNICATION_SERVICES = {
  // Slack Webhook (Free)
  slack: {
    webhookUrl: process.env.SLACK_WEBHOOK_URL,
    features: ['New client notifications', 'Form submissions', 'Team alerts']
  },
  
  // Discord Webhook (Free)
  discord: {
    webhookUrl: process.env.DISCORD_WEBHOOK_URL,
    features: ['Community notifications', 'Project updates']
  }
};

/**
 * 6. File Storage and Media (Free Tiers)
 */
export const STORAGE_SERVICES = {
  // Cloudinary (Free tier: 25 credits/month)
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    features: ['Image optimization', 'Portfolio images', 'Automatic compression']
  },
  
  // Supabase Storage (Free tier: 1GB)
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_ANON_KEY,
    features: ['Document storage', 'Sample file hosting', 'Real-time features']
  }
};

/**
 * 7. Form and Survey Services (Free Tiers)
 */
export const FORM_SERVICES = {
  // Formspree (Free tier: 50 submissions/month)
  formspree: {
    endpoint: 'https://formspree.io/f/',
    formId: process.env.FORMSPREE_FORM_ID,
    features: ['Contact forms', 'File uploads', 'Email notifications']
  },
  
  // Typeform (Free tier: 100 responses/month)
  typeform: {
    features: ['Client onboarding forms', 'Project requirements', 'Feedback surveys']
  }
};

/**
 * 8. Project Management Integration (Free Tiers)
 */
export const PROJECT_SERVICES = {
  // Notion API (Free for personal use)
  notion: {
    token: process.env.NOTION_TOKEN,
    databaseId: process.env.NOTION_DATABASE_ID,
    features: ['Project tracking', 'Client documentation', 'Team collaboration']
  },
  
  // Airtable (Free tier: 1,200 records/base)
  airtable: {
    apiKey: process.env.AIRTABLE_API_KEY,
    baseId: process.env.AIRTABLE_BASE_ID,
    features: ['Client database', 'Project pipeline', 'Portfolio management']
  }
};

/**
 * Implementation Helper Functions
 */

// Send email via Resend
export async function sendEmailViaResend(to: string, subject: string, html: string) {
  if (!EMAIL_SERVICES.resend.apiKey) return false;
  
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${EMAIL_SERVICES.resend.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Prism Writing <hello@prismwriting.com>',
        to: [to],
        subject,
        html,
      }),
    });
    return response.ok;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
}

// Send Slack notification
export async function sendSlackNotification(message: string) {
  if (!COMMUNICATION_SERVICES.slack.webhookUrl) return false;
  
  try {
    const response = await fetch(COMMUNICATION_SERVICES.slack.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: message }),
    });
    return response.ok;
  } catch (error) {
    console.error('Slack notification failed:', error);
    return false;
  }
}

// Track analytics event
export function trackAnalyticsEvent(eventName: string, parameters?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, parameters);
  }
}

// Optimize image with Cloudinary
export function getOptimizedImageUrl(publicId: string, transforms: string = 'f_auto,q_auto') {
  const cloudName = STORAGE_SERVICES.cloudinary.cloudName;
  if (!cloudName) return '';
  
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transforms}/${publicId}`;
}

export default {
  EMAIL_SERVICES,
  ANALYTICS_SERVICES,
  CDN_SERVICES,
  SEO_SERVICES,
  COMMUNICATION_SERVICES,
  STORAGE_SERVICES,
  FORM_SERVICES,
  PROJECT_SERVICES,
  sendEmailViaResend,
  sendSlackNotification,
  trackAnalyticsEvent,
  getOptimizedImageUrl,
} as const;
