import * as jwt from 'jsonwebtoken';
import { User } from '../types';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-minimum-32-characters';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

/**
 * Generates a JWT authentication token.
 * @param user The user object to encode in the token.
 * @param expiresIn The expiration time for the token (e.g., '24h').
 * @returns The generated JWT token.
 */
export function generateAuthToken(user: User, expiresIn: string = '24h'): string {
  const payload = { 
    userId: user.id, 
    email: user.email, 
    role: user.role 
  };
  
  return jwt.sign(payload, JWT_SECRET, { 
    expiresIn,
    algorithm: 'HS256'
  } as jwt.SignOptions);
}

/**
 * Generates a refresh token.
 * @param userId The ID of the user.
 * @returns The generated refresh token.
 */
export function generateRefreshToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
}

/**
 * Verifies a JWT token.
 * @param token The token to verify.
 * @returns The decoded token payload if valid.
 * @throws An error if the token is invalid.
 */
export function verifyAuthToken(token: string): { userId: string } {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch (error) {
    throw new Error('Invalid token');
  }
}