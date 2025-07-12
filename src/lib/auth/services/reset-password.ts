import { prisma } from '../prisma';
import { AuthResponse } from '../types';
import { hashPassword } from '../utils/credentials';
import { verifyAuthToken } from '../utils/token';

export async function resetPassword(token: string, newPassword: string): Promise<AuthResponse> {
  try {
    const decoded = verifyAuthToken(token);
    
    const user = await prisma.user.findFirst({
      where: {
        id: decoded.userId,
        passwordResetToken: token,
        passwordResetExpires: {
          gt: new Date()
        }
      }
    });

    if (!user) {
      return {
        success: false,
        message: 'Invalid or expired reset token'
      };
    }

    const hashedPassword = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
        failedLoginAttempts: 0,
        lockedUntil: null
      }
    });

    // Invalidate all existing sessions
    await prisma.userSession.deleteMany({
      where: { userId: user.id }
    });

    return {
      success: true,
      message: 'Password reset successful'
    };
  } catch {
    return {
      success: false,
      message: 'Password reset failed'
    };
  }
}