/**
 * Email Utilities
 * Functions for sending emails using Nodemailer
 */

import nodemailer from 'nodemailer'
import type { ContactFormData } from './validations'

// Email configuration
const EMAIL_CONFIG = {
  // In production, use environment variables
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
}

/**
 * Create email transporter
 */
function createTransporter() {
  return nodemailer.createTransport(EMAIL_CONFIG)
}

/**
 * Send contact form email
 */
export async function sendContactEmail(data: ContactFormData): Promise<boolean> {
  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('Email configuration not set up - would send:', data)
      return true // In development, simulate success
    }

    const transporter = createTransporter()
    
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      subject: `New Contact Form Submission from ${data.firstName} ${data.lastName}`,
      html: generateContactEmailHTML(data),
      replyTo: data.email,
    }

    await transporter.sendMail(mailOptions)
    
    // Send confirmation email to user
    const confirmationOptions = {
      from: process.env.SMTP_USER,
      to: data.email,
      subject: 'Thank you for contacting Prism Writing',
      html: generateConfirmationEmailHTML(data),
    }

    await transporter.sendMail(confirmationOptions)
    
    return true
  } catch (error) {
    console.error('Email send error:', error)
    return false
  }
}

/**
 * Generate HTML for contact email
 */
function generateContactEmailHTML(data: ContactFormData): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1f2937;">New Contact Form Submission</h2>
      
      <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #374151; margin-top: 0;">Contact Information</h3>
        <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
        ${data.projectType ? `<p><strong>Project Type:</strong> ${data.projectType}</p>` : ''}
        ${data.timeline ? `<p><strong>Timeline:</strong> ${data.timeline}</p>` : ''}
        ${data.budget ? `<p><strong>Budget:</strong> ${data.budget}</p>` : ''}
      </div>

      <div style="background: #fff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h3 style="color: #374151; margin-top: 0;">Message</h3>
        <p style="white-space: pre-wrap;">${data.message}</p>
      </div>

      ${data.files && data.files.length > 0 ? `
        <div style="margin: 20px 0;">
          <h3 style="color: #374151;">Attached Files</h3>
          <ul>
            ${data.files.map(file => `<li>${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      <div style="margin-top: 30px; padding: 20px; background: #f3f4f6; border-radius: 8px; text-align: center;">
        <p style="margin: 0; color: #6b7280; font-size: 14px;">
          This email was sent from the Prism Writing contact form.
        </p>
      </div>
    </div>
  `
}

/**
 * Generate HTML for confirmation email
 */
function generateConfirmationEmailHTML(data: ContactFormData): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1f2937;">Thank you for contacting us!</h2>
      
      <p>Hi ${data.firstName},</p>
      
      <p>Thank you for reaching out to Prism Writing. We have received your message and will get back to you within 24 hours.</p>
      
      <div style="background: #f0f9ff; padding: 20px; border-left: 4px solid #3b82f6; margin: 20px 0;">
        <h3 style="color: #1e40af; margin-top: 0;">Your Message Summary:</h3>
        <p style="margin: 10px 0;"><strong>Subject:</strong> ${data.projectType || 'General Inquiry'}</p>
        <p style="margin: 10px 0;"><strong>Message:</strong></p>
        <p style="color: #6b7280; font-style: italic;">${data.message.substring(0, 150)}${data.message.length > 150 ? '...' : ''}</p>
      </div>
      
      <p>If you have any urgent questions, please don't hesitate to contact us directly.</p>
      
      <p>Best regards,<br>The Prism Writing Team</p>
      
      <div style="margin-top: 30px; padding: 20px; background: #f9fafb; border-radius: 8px; text-align: center;">
        <p style="margin: 0; color: #6b7280; font-size: 14px;">
          Prism Writing - Professional Technical Writing Services
        </p>
      </div>
    </div>
  `
}

/**
 * Send newsletter subscription confirmation
 */
export async function sendNewsletterConfirmation(email: string, name?: string): Promise<boolean> {
  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.log('Newsletter signup - would send to:', email)
      return true
    }

    const transporter = createTransporter()
    
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Welcome to Prism Writing Newsletter',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1f2937;">Welcome to our newsletter!</h2>
          <p>Hi ${name || 'there'},</p>
          <p>Thank you for subscribing to the Prism Writing newsletter. You'll receive updates about:</p>
          <ul>
            <li>Technical writing tips and best practices</li>
            <li>Industry trends and insights</li>
            <li>New service offerings</li>
            <li>Helpful resources and guides</li>
          </ul>
          <p>We respect your privacy and will never share your email address.</p>
          <p>Best regards,<br>The Prism Writing Team</p>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)
    return true
  } catch (error) {
    console.error('Newsletter confirmation error:', error)
    return false
  }
}
