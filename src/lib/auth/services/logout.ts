import { prisma } from '../prisma';
import { AuthResponse } from '../types';

export async function logout(token: string): Promise<AuthResponse> {
  try {
    await prisma.userSession.deleteMany({
      where: { token }
    });

    return {
      success: true,
      message: 'Logged out successfully'
    };
  } catch {
    return {
      success: false,
      message: 'Logout failed'
    };
  }
}