import { prisma } from '../prisma';
import { Session } from '../types';

/**
 * Creates a new session for a user.
 * @param userId The ID of the user.
 * @param token The refresh token for the session.
 * @param ipAddress The IP address of the user.
 * @param userAgent The user agent of the user.
 * @returns A promise that resolves to the created session.
 */
export async function createSession(userId: string, token: string, ipAddress?: string, userAgent?: string): Promise<Session> {
  return await prisma.userSession.create({
    data: {
      userId,
      token,
      ipAddress,
      userAgent,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    }
  });
}

/**
 * Invalidates a user's session.
 * @param token The refresh token of the session to invalidate.
 * @returns A promise that resolves when the session is invalidated.
 */
export async function invalidateSession(token: string): Promise<void> {
  await prisma.userSession.deleteMany({
    where: { token }
  });
}

/**
 * Cleans up expired sessions from the database.
 * @returns A promise that resolves when the expired sessions are cleaned up.
 */
export async function cleanupExpiredSessions(): Promise<void> {
  await prisma.userSession.deleteMany({
    where: {
      expiresAt: {
        lt: new Date()
      }
    }
  });
}