import { prisma } from '../prisma';
import { AuthResponse } from '../types';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-minimum-32-characters';

export async function requestPasswordReset(email: string): Promise<AuthResponse> {
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      // Don't reveal that user doesn't exist
      return {
        success: true,
        message: 'If the email exists, you will receive a reset link'
      };
    }

    // Generate reset token
    const resetToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    const resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetToken: resetToken,
        passwordResetExpires: resetExpires
      }
    });

    // TODO: Send email with reset link
    // await sendPasswordResetEmail(user.email, resetToken);

    return {
      success: true,
      message: 'If the email exists, you will receive a reset link'
    };
  } catch {
    return {
      success: false,
      message: 'Password reset request failed'
    };
  }
}