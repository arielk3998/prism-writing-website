/**
 * Seed Contact Inquiries for Testing
 * Creates sample contact inquiries for testing the lead management system
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sampleInquiries = [
  {
    name: 'John Smith',
    email: 'john.smith@example.com',
    company: 'Tech Solutions Inc',
    phone: '+1 (555) 123-4567',
    projectType: 'Website Development',
    budget: '$5,000 - $10,000',
    timeline: '2-3 months',
    message: 'We need a new website for our growing tech company. Looking for a modern, responsive design with e-commerce capabilities.',
    priority: 'HIGH' as const,
    status: 'NEW' as const,
    source: 'contact-form',
    allowFollowUp: true,
    autoResponded: false,
    addedToNewsletter: true,
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  },
  {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@startup.com',
    company: 'StartupCorp',
    phone: '+1 (555) 234-5678',
    projectType: 'Content Writing',
    budget: '$2,000 - $5,000',
    timeline: '1-2 months',
    message: 'We need help with content writing for our new product launch. This includes blog posts, product descriptions, and marketing copy.',
    priority: 'MEDIUM' as const,
    status: 'CONTACTED' as const,
    source: 'contact-form',
    allowFollowUp: true,
    autoResponded: true,
    addedToNewsletter: false,
    ipAddress: '192.168.1.101',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    lastContactedAt: new Date('2024-01-15T10:30:00Z')
  },
  {
    name: 'Mike Davis',
    email: 'mike.davis@consulting.com',
    company: 'Davis Consulting',
    phone: '+1 (555) 345-6789',
    projectType: 'Technical Documentation',
    budget: '$3,000 - $7,000',
    timeline: '3-4 months',
    message: 'We need comprehensive technical documentation for our software products. This includes user manuals, API documentation, and training materials.',
    priority: 'LOW' as const,
    status: 'QUALIFIED' as const,
    source: 'contact-form',
    allowFollowUp: true,
    autoResponded: true,
    addedToNewsletter: true,
    ipAddress: '192.168.1.102',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    lastContactedAt: new Date('2024-01-10T14:15:00Z'),
    nextFollowUpAt: new Date('2024-01-20T09:00:00Z')
  },
  {
    name: 'Lisa Chen',
    email: 'lisa.chen@agency.com',
    company: 'Creative Agency',
    phone: '+1 (555) 456-7890',
    projectType: 'Marketing Copy',
    budget: '$1,000 - $3,000',
    timeline: '2-3 weeks',
    message: 'Urgent need for marketing copy for our client\'s new campaign. Need compelling headlines, ad copy, and social media content.',
    priority: 'URGENT' as const,
    status: 'PROPOSAL_SENT' as const,
    source: 'contact-form',
    allowFollowUp: true,
    autoResponded: true,
    addedToNewsletter: false,
    ipAddress: '192.168.1.103',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    lastContactedAt: new Date('2024-01-12T16:45:00Z'),
    nextFollowUpAt: new Date('2024-01-18T11:00:00Z')
  },
  {
    name: 'Robert Wilson',
    email: 'robert.wilson@ecommerce.com',
    company: 'E-commerce Solutions',
    phone: '+1 (555) 567-8901',
    projectType: 'E-commerce Content',
    budget: '$4,000 - $8,000',
    timeline: '1-2 months',
    message: 'We need product descriptions, category pages, and SEO content for our new e-commerce platform. Looking for conversion-focused copy.',
    priority: 'HIGH' as const,
    status: 'CONVERTED' as const,
    source: 'contact-form',
    allowFollowUp: true,
    autoResponded: true,
    addedToNewsletter: true,
    ipAddress: '192.168.1.104',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    lastContactedAt: new Date('2024-01-08T13:20:00Z')
  }
];

async function seedContactInquiries() {
  try {
    console.log('Seeding contact inquiries...');
    
    for (const inquiry of sampleInquiries) {
      // @ts-ignore - Prisma client model will be available at runtime
      await prisma.contactInquiry.create({
        data: inquiry
      });
    }
    
    console.log('Contact inquiries seeded successfully!');
  } catch (error) {
    console.error('Error seeding contact inquiries:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seeding if this file is executed directly
if (require.main === module) {
  seedContactInquiries();
}

export { seedContactInquiries };
