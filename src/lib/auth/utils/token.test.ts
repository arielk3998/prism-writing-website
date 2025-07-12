import { describe, it, expect } from 'vitest';
import { generateAuthToken, generateRefreshToken, verifyAuthToken } from './token';
import { User } from '../types';

describe('Token Utilities', () => {
  const user: User = {
    id: '1',
    email: 'test@example.com',
    role: 'CLIENT',
    status: 'ACTIVE',
    name: 'Test User',
    lockedUntil: null,
    failedLoginAttempts: 0,
    emailVerified: null,
    emailVerificationToken: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLoginAt: null,
    passwordResetToken: null,
    passwordResetExpires: null
  };

  it('should generate an auth token', () => {
    const token = generateAuthToken(user);
    expect(token).toBeDefined();
  });

  it('should generate a refresh token', () => {
    const token = generateRefreshToken(user.id);
    expect(token).toBeDefined();
  });

  it('should verify a valid auth token', () => {
    const token = generateAuthToken(user);
    const decoded = verifyAuthToken(token);
    expect(decoded.userId).toBe(user.id);
  });

  it('should throw an error for an invalid auth token', () => {
    const invalidToken = 'invalid.token.here';
    expect(() => verifyAuthToken(invalidToken)).toThrow();
  });
});
