/**
 * Email integration for sending emails
 */

export interface EmailData {
  to: string;
  subject: string;
  body: string;
  from_name?: string;
  from_email?: string;
}

/**
 * Send an email using the API
 */
export async function SendEmail(data: EmailData): Promise<boolean> {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }

    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
