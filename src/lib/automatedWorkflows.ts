/**
 * Automated Workflow System
 * 
 * Automated workflows for common business processes in Prism Writing Cooperative.
 * Reduces manual work and ensures consistent processes.
 * 
 * @module AutomatedWorkflows
 * @version 1.0.0
 */

import { sendEmailViaResend, sendSlackNotification, trackAnalyticsEvent } from './webServices';
import { teamMembers } from '../data/teamData';

/**
 * Contact Form Automation Workflow
 */
export async function automateContactFormSubmission(formData: {
  name: string;
  email: string;
  company: string;
  message: string;
  projectType?: string;
}) {
  const contactInfo = getServerContactInfo();
  
  // 1. Send confirmation email to client
  const clientEmailSuccess = await sendEmailViaResend(
    formData.email,
    'Thank you for contacting Prism Writing!',
    `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">Thank you for reaching out!</h2>
      <p>Hi ${formData.name},</p>
      <p>We've received your message and will get back to you within 24 hours.</p>
      <p><strong>Your message:</strong></p>
      <blockquote style="border-left: 3px solid #2563eb; padding-left: 15px; color: #666;">
        ${formData.message}
      </blockquote>
      <p>Best regards,<br>
      ${contactInfo.name}<br>
      ${contactInfo.title}<br>
      Prism Writing Cooperative</p>
    </div>
    `
  );

  // 2. Send notification email to admin
  const adminEmailSuccess = await sendEmailViaResend(
    contactInfo.email,
    `New Contact Form Submission from ${formData.name}`,
    `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #dc2626;">New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Company:</strong> ${formData.company}</p>
      <p><strong>Project Type:</strong> ${formData.projectType || 'Not specified'}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="border-left: 3px solid #dc2626; padding-left: 15px;">
        ${formData.message}
      </blockquote>
      <p><a href="mailto:${formData.email}" style="background: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reply to ${formData.name}</a></p>
    </div>
    `
  );

  // 3. Send Slack notification
  const slackSuccess = await sendSlackNotification(
    `🎯 New contact form submission from ${formData.name} (${formData.company}). Email: ${formData.email}`
  );

  // 4. Track analytics event
  trackAnalyticsEvent('contact_form_submission', {
    company: formData.company,
    project_type: formData.projectType
  });

  return {
    clientEmail: clientEmailSuccess,
    adminEmail: adminEmailSuccess,
    slack: slackSuccess,
    success: clientEmailSuccess || adminEmailSuccess
  };
}

/**
 * Newsletter Signup Automation Workflow
 */
export async function automateNewsletterSignup(email: string, name?: string) {
  const contactInfo = getServerContactInfo();
  
  // 1. Send welcome email
  const welcomeEmailSuccess = await sendEmailViaResend(
    email,
    'Welcome to Prism Writing Newsletter!',
    `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">Welcome to our community!</h2>
      <p>Hi ${name || 'there'},</p>
      <p>Thank you for subscribing to the Prism Writing newsletter! You'll receive:</p>
      <ul>
        <li>Technical writing tips and best practices</li>
        <li>Industry insights and trends</li>
        <li>Exclusive content and resources</li>
        <li>Updates on our latest projects and services</li>
      </ul>
      <p>Best regards,<br>
      ${contactInfo.name}<br>
      Prism Writing Cooperative</p>
    </div>
    `
  );

  // 2. Notify admin
  const adminNotification = await sendSlackNotification(
    `📧 New newsletter subscription: ${email} ${name ? `(${name})` : ''}`
  );

  // 3. Track analytics
  trackAnalyticsEvent('newsletter_signup', { email });

  return {
    welcomeEmail: welcomeEmailSuccess,
    notification: adminNotification,
    success: welcomeEmailSuccess
  };
}

/**
 * Team Member Addition Workflow
 */
export async function automateTeamMemberAddition(memberData: {
  name: string;
  email: string;
  role: string;
  specializations: string[];
}) {
  const contactInfo = getServerContactInfo();
  
  // 1. Send welcome email to new team member
  const welcomeEmail = await sendEmailViaResend(
    memberData.email,
    'Welcome to Prism Writing Cooperative!',
    `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">Welcome to the team!</h2>
      <p>Hi ${memberData.name},</p>
      <p>Welcome to Prism Writing Cooperative! We're excited to have you as our ${memberData.role}.</p>
      <p><strong>Your specializations:</strong> ${memberData.specializations.join(', ')}</p>
      <p>You'll receive additional onboarding information soon.</p>
      <p>Best regards,<br>
      ${contactInfo.name}<br>
      ${contactInfo.title}</p>
    </div>
    `
  );

  // 2. Notify team
  const teamNotification = await sendSlackNotification(
    `🎉 Welcome ${memberData.name} to the team as ${memberData.role}! Specializations: ${memberData.specializations.join(', ')}`
  );

  // 3. Update team count analytics
  const activeMembers = teamMembers.filter(member => member.isActive).length;
  trackAnalyticsEvent('team_member_added', {
    new_member: memberData.name,
    role: memberData.role,
    total_active_members: activeMembers + 1
  });

  return {
    welcomeEmail,
    teamNotification,
    success: welcomeEmail || teamNotification
  };
}

/**
 * Project Completion Workflow
 */
export async function automateProjectCompletion(projectData: {
  clientName: string;
  clientEmail: string;
  projectTitle: string;
  deliverables: string[];
  satisfactionRating?: number;
}) {
  const contactInfo = getServerContactInfo();
  
  // 1. Send completion email to client
  const completionEmail = await sendEmailViaResend(
    projectData.clientEmail,
    `Project Completed: ${projectData.projectTitle}`,
    `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #10b981;">Project Completed Successfully!</h2>
      <p>Hi ${projectData.clientName},</p>
      <p>We're pleased to inform you that <strong>${projectData.projectTitle}</strong> has been completed.</p>
      <p><strong>Deliverables:</strong></p>
      <ul>
        ${projectData.deliverables.map(item => `<li>${item}</li>`).join('')}
      </ul>
      <p>Thank you for choosing Prism Writing Cooperative. We'd appreciate your feedback!</p>
      <p>Best regards,<br>
      ${contactInfo.name}<br>
      Prism Writing Cooperative</p>
    </div>
    `
  );

  // 2. Internal notification
  const internalNotification = await sendSlackNotification(
    `✅ Project completed: "${projectData.projectTitle}" for ${projectData.clientName}. Rating: ${projectData.satisfactionRating || 'N/A'}/5`
  );

  // 3. Track project completion
  trackAnalyticsEvent('project_completed', {
    client: projectData.clientName,
    project: projectData.projectTitle,
    deliverables_count: projectData.deliverables.length,
    satisfaction_rating: projectData.satisfactionRating
  });

  return {
    completionEmail,
    internalNotification,
    success: completionEmail
  };
}

/**
 * Monthly Report Automation
 */
export async function generateMonthlyReport() {
  const contactInfo = getServerContactInfo();
  const activeMembers = teamMembers.filter(member => member.isActive);
  
  // Generate report data
  const reportData = {
    activeTeamMembers: activeMembers.length,
    specializations: [...new Set(activeMembers.flatMap(member => member.specializations))],
    industries: [...new Set(activeMembers.flatMap(member => member.industries))],
    date: new Date().toLocaleDateString()
  };

  // Send monthly report to admin
  const reportEmail = await sendEmailViaResend(
    contactInfo.email,
    'Prism Writing - Monthly Report',
    `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">Monthly Report - ${reportData.date}</h2>
      <h3>Team Status</h3>
      <p><strong>Active Team Members:</strong> ${reportData.activeTeamMembers}</p>
      <p><strong>Specializations:</strong> ${reportData.specializations.join(', ')}</p>
      <p><strong>Industries Served:</strong> ${reportData.industries.join(', ')}</p>
      <p>Report generated automatically.</p>
    </div>
    `
  );

  // Track report generation
  trackAnalyticsEvent('monthly_report_generated', reportData);

  return { reportEmail, reportData };
}

// Server-side compatible contact info getter
function getServerContactInfo() {
  const superAdmin = teamMembers.find(
    member => member.role.includes('Founder') || member.role.includes('CEO') || member.name === 'Ariel'
  );

  if (superAdmin) {
    return {
      name: superAdmin.name,
      email: superAdmin.email || 'Ariel.pk@outlook.com',
      title: superAdmin.title,
      bio: superAdmin.bio,
    };
  }

  return {
    name: 'Ariel',
    email: 'Ariel.pk@outlook.com',
    title: 'Founder & CEO',
    bio: 'Founder and leader of Prism Writing Cooperative',
  };
}

const automatedWorkflows = {
  automateContactFormSubmission,
  automateNewsletterSignup,
  automateTeamMemberAddition,
  automateProjectCompletion,
  generateMonthlyReport,
};

export default automatedWorkflows;
