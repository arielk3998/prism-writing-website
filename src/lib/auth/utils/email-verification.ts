import { prisma } from '../prisma';
import { randomBytes } from 'crypto';

/**
 * Generates a secure, single-use token for email verification.
 * @returns A promise that resolves to the generated token.
 */
function generateVerificationToken(): Promise<string> {
  return new Promise((resolve, reject) => {
    randomBytes(32, (err, buffer) => {
      if (err) {
        return reject(err);
      }
      resolve(buffer.toString('hex'));
    });
  });
}

/**
 * Sends a verification email to the user.
 * @param email The email address of the user.
 * @param token The verification token.
 */
export async function sendVerificationEmail(email: string, token: string): Promise<void> {
  // In a real application, you would use a transactional email service
  // like Postmark, SendGrid, or AWS SES to send the email.
  console.log(`Sending verification email to ${email} with token ${token}`);
  // Example:
  // await emailService.send({
  //   to: email,
  //   subject: 'Verify your email address',
  //   html: `<p>Click <a href="https://yourapp.com/verify-email?token=${token}">here</a> to verify your email address.</p>`
  // });
}

/**
 * Verifies a user's email address.
 * @param token The verification token.
 * @returns A promise that resolves to true if the email is verified, otherwise false.
 */
export async function verifyEmail(token: string): Promise<boolean> {
  const user = await prisma.user.findFirst({
    where: {
      emailVerificationToken: token
    }
  });

  if (!user) {
    return false;
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: new Date(),
      emailVerificationToken: null
    }
  });

  return true;
}

/**
 * Generates and sends a verification email to the user.
 * @param userId The ID of the user.
 */
export async function sendAndSaveVerificationEmail(userId: string): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    throw new Error('User not found');
  }

  const token = await generateVerificationToken();

  await prisma.user.update({
    where: { id: userId },
    data: {
      emailVerificationToken: token
    }
  });

  await sendVerificationEmail(user.email, token);
}