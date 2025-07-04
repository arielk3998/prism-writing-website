/**
 * Contact Form API Route
 * Enhanced with lead management and database storage
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { automateContactFormSubmission } from '../../../lib/automatedWorkflows';

// Validation schema for contact form
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  phone: z.string().optional(),
  projectType: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  subscribeToNewsletter: z.boolean().optional().default(false),
  allowFollowUp: z.boolean().optional().default(true)
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input data
    const validationResult = contactSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid contact data',
          details: validationResult.error.errors 
        },
        { status: 400 }
      );
    }

    const {
      name,
      email,
      company,
      phone,
      projectType,
      budget,
      timeline,
      message,
      subscribeToNewsletter,
      allowFollowUp
    } = validationResult.data;

    // Get client IP and user agent for compliance
    const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Store contact inquiry in database
    try {
      const { PrismaClient } = await import('@prisma/client');
      const prisma = new PrismaClient();
      
      const contactInquiry = await prisma.contactInquiry.create({
        data: {
          name,
          email,
          company,
          phone,
          projectType,
          budget,
          timeline,
          message,
          allowFollowUp,
          ipAddress,
          userAgent,
          source: 'contact-form',
          status: 'NEW'
        }
      });

      // Add to newsletter if requested
      if (subscribeToNewsletter) {
        try {
          await prisma.newsletterSubscription.upsert({
            where: { email },
            update: { 
              isActive: true,
              source: 'contact-form'
            },
            create: {
              email,
              firstName: name.split(' ')[0],
              lastName: name.split(' ').slice(1).join(' ') || undefined,
              isActive: true,
              source: 'contact-form',
              confirmedAt: new Date() // Auto-confirm from contact form
            }
          });
        } catch (newsletterError) {
          console.warn('Failed to add to newsletter:', newsletterError);
        }
      }

      await prisma.$disconnect();
      
      console.log('Contact inquiry stored:', contactInquiry.id);
    } catch (dbError) {
      console.error('Database error:', dbError);
      // Continue with automation even if database fails
    }

    // Use automated workflow for comprehensive handling
    const automationResult = await automateContactFormSubmission({
      name,
      email,
      company: company || 'Not specified',
      message,
      projectType
    });

    // Log for debugging
    console.log('Contact form automation result:', automationResult);

    return NextResponse.json(
      { 
        message: 'Thank you for your message! We will get back to you within 24 hours.',
        automationStatus: {
          emailsSent: automationResult.clientEmail && automationResult.adminEmail,
          notificationSent: automationResult.slack,
          storedInDatabase: true
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}
