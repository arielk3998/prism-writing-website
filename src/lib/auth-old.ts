/**
 * Authentication Service
 * 
 * Comprehensive authentication system with JWT tokens, password hashing,
 * session management, and security features for the business platform.
 */

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';
import { prisma } from './database';

// Types for our authentication system
export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR' | 'MEMBER' | 'CLIENT' | 'VIEWER';
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING_VERIFICATION';

export interface AuthUser {
  id: string;
  email: string;
  username?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  role: UserRole;
  status: UserStatus;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  username?: string;
}

export interface TokenPayload {
  userId: string;
  email: string;
  role: UserRole;
  sessionId: string;
}

// JWT Configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret-key';
const ACCESS_TOKEN_EXPIRE = '15m';
const REFRESH_TOKEN_EXPIRE = '7d';
const REMEMBER_TOKEN_EXPIRE = '30d';

// Security constants
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes
const BCRYPT_ROUNDS = 12;

/**
 * Hash password with bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_ROUNDS);
}

/**
 * Verify password against hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Generate JWT tokens
 */
export function generateTokens(payload: TokenPayload, rememberMe = false) {
  const accessToken = jwt.sign(payload, JWT_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRE,
  });

  const refreshToken = jwt.sign(payload, JWT_SECRET, {
    expiresIn: rememberMe ? REMEMBER_TOKEN_EXPIRE : REFRESH_TOKEN_EXPIRE,
  });

  return { accessToken, refreshToken };
}

/**
 * Verify JWT token
 */
export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

/**
 * Extract token from request headers
 */
export function extractTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  
  // Also check cookies for browser sessions
  const tokenFromCookie = request.cookies.get('accessToken');
  return tokenFromCookie?.value || null;
}

/**
 * User registration
 */
export async function registerUser(data: RegisterData): Promise<{ user: AuthUser; tokens: { accessToken: string; refreshToken: string } } | { error: string }> {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: data.email },
          ...(data.username ? [{ username: data.username }] : [])
        ]
      }
    });

    if (existingUser) {
      if (existingUser.email === data.email) {
        return { error: 'User with this email already exists' };
      }
      if (existingUser.username === data.username) {
        return { error: 'Username is already taken' };
      }
    }

    // Hash password
    const passwordHash = await hashPassword(data.password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        passwordHash,
        role: 'MEMBER',
        status: 'PENDING_VERIFICATION',
      }
    });

    // Create session
    const session = await prisma.session.create({
      data: {
        userId: user.id,
        sessionToken: generateSessionToken(),
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      }
    });

    // Generate tokens
    const tokenPayload: TokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role as UserRole,
      sessionId: session.id,
    };
    
    const tokens = generateTokens(tokenPayload);

    const authUser: AuthUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role as UserRole,
      status: user.status as UserStatus,
    };

    return { user: authUser, tokens };
  } catch (error) {
    console.error('Registration error:', error);
    return { error: 'Registration failed. Please try again.' };
  }
}

/**
 * User login
 */
export async function loginUser(credentials: LoginCredentials): Promise<{ user: AuthUser; tokens: { accessToken: string; refreshToken: string } } | { error: string }> {
  try {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email: credentials.email }
    });

    if (!user) {
      return { error: 'Invalid email or password' };
    }

    // Check if account is locked
    if (user.lockoutUntil && user.lockoutUntil > new Date()) {
      return { error: 'Account is temporarily locked due to too many failed login attempts' };
    }

    // Verify password
    const isValidPassword = await verifyPassword(credentials.password, user.passwordHash);
    
    if (!isValidPassword) {
      // Increment login attempts
      const attempts = user.loginAttempts + 1;
      const lockoutUntil = attempts >= MAX_LOGIN_ATTEMPTS 
        ? new Date(Date.now() + LOCKOUT_DURATION)
        : null;

      await prisma.user.update({
        where: { id: user.id },
        data: {
          loginAttempts: attempts,
          lockoutUntil,
        }
      });

      return { error: 'Invalid email or password' };
    }

    // Check user status
    if (user.status === 'SUSPENDED') {
      return { error: 'Account is suspended. Please contact support.' };
    }

    if (user.status === 'INACTIVE') {
      return { error: 'Account is inactive. Please contact support.' };
    }

    // Reset login attempts and update last login
    await prisma.user.update({
      where: { id: user.id },
      data: {
        loginAttempts: 0,
        lockoutUntil: null,
        lastLogin: new Date(),
      }
    });

    // Create new session
    const session = await prisma.session.create({
      data: {
        userId: user.id,
        sessionToken: generateSessionToken(),
        expires: new Date(Date.now() + (credentials.rememberMe ? 30 : 7) * 24 * 60 * 60 * 1000),
      }
    });

    // Generate tokens
    const tokenPayload: TokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role as UserRole,
      sessionId: session.id,
    };
    
    const tokens = generateTokens(tokenPayload, credentials.rememberMe);

    const authUser: AuthUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role as UserRole,
      status: user.status as UserStatus,
    };

    return { user: authUser, tokens };
  } catch (error) {
    console.error('Login error:', error);
    return { error: 'Login failed. Please try again.' };
  }
}

/**
 * Get current user from token
 */
export async function getCurrentUser(token: string): Promise<AuthUser | null> {
  try {
    const payload = verifyToken(token);
    if (!payload) return null;

    // Verify session exists
    const session = await prisma.session.findUnique({
      where: { id: payload.sessionId },
      include: { user: true }
    });

    if (!session || session.expires < new Date()) {
      return null;
    }

    const user = session.user;
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role as UserRole,
      status: user.status as UserStatus,
    };
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
}

/**
 * Check if user has required permission
 */
export function hasPermission(userRole: UserRole, requiredPermission: string): boolean {
  const ROLE_PERMISSIONS = {
    SUPER_ADMIN: '*', // All permissions
    ADMIN: [
      'user:create', 'user:read', 'user:update', 'user:delete',
      'content:create', 'content:read', 'content:update', 'content:delete',
      'project:create', 'project:read', 'project:update', 'project:delete',
      'newsletter:read', 'newsletter:manage', 'newsletter:export',
      'analytics:read', 'settings:update'
    ],
    EDITOR: [
      'content:create', 'content:read', 'content:update',
      'project:read', 'project:update',
      'newsletter:read'
    ],
    MEMBER: [
      'content:read', 'project:read'
    ],
    CLIENT: [
      'content:read', 'project:read'
    ],
    VIEWER: [
      'content:read'
    ]
  };

  if (userRole === 'SUPER_ADMIN') return true;
  
  const permissions = ROLE_PERMISSIONS[userRole] || [];
  return Array.isArray(permissions) && permissions.includes(requiredPermission);
}

/**
 * Generate secure session token
 */
function generateSessionToken(): string {
  return jwt.sign(
    { random: Math.random().toString(36) },
    JWT_SECRET,
    { expiresIn: '30d' }
  );
}

/**
 * Middleware for authentication
 */
export async function requireAuth(request: NextRequest): Promise<{ user: AuthUser } | { error: string; status: number }> {
  const token = extractTokenFromRequest(request);
  
  if (!token) {
    return { error: 'Authentication required', status: 401 };
  }

  const user = await getCurrentUser(token);
  if (!user) {
    return { error: 'Invalid or expired token', status: 401 };
  }

  return { user };
}

/**
 * Middleware for permission-based authorization
 */
export async function requirePermission(request: NextRequest, permission: string): Promise<{ user: AuthUser } | { error: string; status: number }> {
  const authResult = await requireAuth(request);
  
  if ('error' in authResult) {
    return authResult;
  }

  if (!hasPermission(authResult.user.role, permission)) {
    return { error: 'Insufficient permissions', status: 403 };
  }

  return authResult;
}

// Legacy support for existing demo authentication
export function isAuthenticated(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  const adminKey = process.env.ADMIN_API_KEY || 'demo-admin-key';
  return authHeader === `Bearer ${adminKey}`;
}
