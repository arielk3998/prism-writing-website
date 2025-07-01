/**
 * Hybrid Authentication Service
 * 
 * Falls back to in-memory authentication when database is not available
 * while providing the new JWT-based authentication features.
 */

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';

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
  name?: string; // Added for compatibility
  role?: string; // Added for compatibility
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

// In-memory fallback storage
const inMemoryUsers = [
  {
    id: 'user_admin_001',
    email: 'admin@prismwriting.com',
    username: 'admin',
    firstName: 'System',
    lastName: 'Administrator',
    passwordHash: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj3bp.Fh.1o6', // admin123
    role: 'SUPER_ADMIN' as UserRole,
    status: 'ACTIVE' as UserStatus,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'user_member_001',
    email: 'member@prismwriting.com',
    username: 'member',
    firstName: 'Demo',
    lastName: 'Member',
    passwordHash: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj3bp.Fh.1o6', // member123 (same hash for demo)
    role: 'MEMBER' as UserRole,
    status: 'ACTIVE' as UserStatus,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'user_client_001',
    email: 'client@example.com',
    username: 'client',
    firstName: 'Demo',
    lastName: 'Client',
    passwordHash: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj3bp.Fh.1o6', // client123 (same hash for demo)
    role: 'CLIENT' as UserRole,
    status: 'ACTIVE' as UserStatus,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const inMemorySessions: Array<{
  id: string;
  userId: string;
  sessionToken: string;
  expires: Date;
}> = [];

/**
 * Check if database is available
 */
async function isDatabaseAvailable(): Promise<boolean> {
  try {
    // Try to import and use Prisma
    const { prisma } = await import('./database');
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}

/**
 * Hash password with bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
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
 * User login with database fallback
 */
export async function loginUser(credentials: LoginCredentials): Promise<{ user: AuthUser; tokens: { accessToken: string; refreshToken: string } } | { error: string }> {
  try {
    const dbAvailable = await isDatabaseAvailable();
    
    if (dbAvailable) {
      // Use database authentication
      return await loginUserDatabase(credentials);
    } else {
      // Use in-memory authentication
      return await loginUserMemory(credentials);
    }
  } catch (error) {
    console.error('Login error:', error);
    return { error: 'Login failed. Please try again.' };
  }
}

/**
 * Database-based login
 */
async function loginUserDatabase(credentials: LoginCredentials): Promise<{ user: AuthUser; tokens: { accessToken: string; refreshToken: string } } | { error: string }> {
  const { prisma } = await import('./database');
  
  // Find user
  const user = await prisma.user.findUnique({
    where: { email: credentials.email }
  });

  if (!user) {
    return { error: 'Invalid email or password' };
  }

  // Verify password
  const isValidPassword = await verifyPassword(credentials.password, user.passwordHash);
  
  if (!isValidPassword) {
    return { error: 'Invalid email or password' };
  }

  // Check user status
  if (user.status === 'SUSPENDED') {
    return { error: 'Account is suspended. Please contact support.' };
  }

  if (user.status === 'INACTIVE') {
    return { error: 'Account is inactive. Please contact support.' };
  }

  // Update last login
  await prisma.user.update({
    where: { id: user.id },
    data: { lastLogin: new Date() }
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
}

/**
 * In-memory login fallback
 */
async function loginUserMemory(credentials: LoginCredentials): Promise<{ user: AuthUser; tokens: { accessToken: string; refreshToken: string } } | { error: string }> {
  // Find user in memory
  const user = inMemoryUsers.find(u => u.email === credentials.email);

  if (!user) {
    return { error: 'Invalid email or password' };
  }

  // For demo, check simple passwords first, then hashed
  let isValidPassword = false;
  
  // Simple password check for demo accounts
  const simplePasswords: Record<string, string> = {
    'admin@prismwriting.com': 'admin123',
    'member@prismwriting.com': 'member123',
    'client@example.com': 'client123'
  };
  
  if (simplePasswords[credentials.email] === credentials.password) {
    isValidPassword = true;
  } else {
    // Check hashed password
    isValidPassword = await verifyPassword(credentials.password, user.passwordHash);
  }
  
  if (!isValidPassword) {
    return { error: 'Invalid email or password' };
  }

  // Check user status
  if (user.status === 'SUSPENDED') {
    return { error: 'Account is suspended. Please contact support.' };
  }

  if (user.status === 'INACTIVE') {
    return { error: 'Account is inactive. Please contact support.' };
  }

  // Create session in memory
  const session = {
    id: `session_${Date.now()}_${Math.random().toString(36).substring(2)}`,
    userId: user.id,
    sessionToken: generateSessionToken(),
    expires: new Date(Date.now() + (credentials.rememberMe ? 30 : 7) * 24 * 60 * 60 * 1000),
  };
  
  inMemorySessions.push(session);

  // Generate tokens
  const tokenPayload: TokenPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    sessionId: session.id,
  };
  
  const tokens = generateTokens(tokenPayload, credentials.rememberMe);

  const authUser: AuthUser = {
    id: user.id,
    email: user.email,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    status: user.status,
  };

  return { user: authUser, tokens };
}

/**
 * User registration with database fallback
 */
export async function registerUser(data: RegisterData): Promise<{ user: AuthUser; tokens: { accessToken: string; refreshToken: string } } | { error: string }> {
  try {
    const dbAvailable = await isDatabaseAvailable();
    
    if (dbAvailable) {
      return await registerUserDatabase(data);
    } else {
      return await registerUserMemory(data);
    }
  } catch (error) {
    console.error('Registration error:', error);
    return { error: 'Registration failed. Please try again.' };
  }
}

/**
 * Database-based registration
 */
async function registerUserDatabase(data: RegisterData): Promise<{ user: AuthUser; tokens: { accessToken: string; refreshToken: string } } | { error: string }> {
  const { prisma } = await import('./database');
  
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
}

/**
 * In-memory registration fallback
 */
async function registerUserMemory(data: RegisterData): Promise<{ user: AuthUser; tokens: { accessToken: string; refreshToken: string } } | { error: string }> {
  // Check if user already exists
  const existingUser = inMemoryUsers.find(u => 
    u.email === data.email || (data.username && u.username === data.username)
  );

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
  const user = {
    id: `user_${Date.now()}_${Math.random().toString(36).substring(2)}`,
    email: data.email,
    username: data.username,
    firstName: data.firstName,
    lastName: data.lastName,
    passwordHash,
    role: 'MEMBER' as UserRole,
    status: 'PENDING_VERIFICATION' as UserStatus,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  inMemoryUsers.push(user);

  // Create session
  const session = {
    id: `session_${Date.now()}_${Math.random().toString(36).substring(2)}`,
    userId: user.id,
    sessionToken: generateSessionToken(),
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  };
  
  inMemorySessions.push(session);

  // Generate tokens
  const tokenPayload: TokenPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    sessionId: session.id,
  };
  
  const tokens = generateTokens(tokenPayload);

  const authUser: AuthUser = {
    id: user.id,
    email: user.email,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    status: user.status,
  };

  return { user: authUser, tokens };
}

/**
 * Get current user from token
 */
export async function getCurrentUser(token: string): Promise<AuthUser | null> {
  try {
    const payload = verifyToken(token);
    if (!payload) return null;

    const dbAvailable = await isDatabaseAvailable();
    
    if (dbAvailable) {
      return await getCurrentUserDatabase(payload);
    } else {
      return await getCurrentUserMemory(payload);
    }
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
}

/**
 * Database-based get current user
 */
async function getCurrentUserDatabase(payload: TokenPayload): Promise<AuthUser | null> {
  const { prisma } = await import('./database');
  
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
}

/**
 * In-memory get current user
 */
async function getCurrentUserMemory(payload: TokenPayload): Promise<AuthUser | null> {
  // Verify session exists
  const session = inMemorySessions.find(s => s.id === payload.sessionId);
  if (!session || session.expires < new Date()) {
    return null;
  }

  const user = inMemoryUsers.find(u => u.id === payload.userId);
  if (!user) return null;

  return {
    id: user.id,
    email: user.email,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    status: user.status,
  };
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

// Backward compatibility exports
export const login = loginUser;
export const register = registerUser;
export const logout = async () => ({ success: true }); // Simplified logout

// Admin function stubs (for deployment compatibility)
export async function getAdminOverview() {
  return {
    totalMembers: 0,
    totalClients: 0,
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    overdueProjects: 0,
    totalRevenue: 0,
    avgCompletionRate: 0
  };
}

export async function getAllUsers() {
  return [];
}

export async function getAllProjects() {
  return [];
}

export async function getAllClients() {
  return [];
}

export async function updateProject(id: string, data: Record<string, unknown>) {
  return { success: true, project: { id, ...data } };
}

export async function impersonateUser() {
  return { success: true, token: 'demo-token' };
}

// Type exports for compatibility
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  name?: string; // Added for compatibility
  role: UserRole;
  status: UserStatus;
  joinedAt?: Date; // Added for compatibility
  lastLogin?: Date; // Added for compatibility
  permissions?: string[]; // Added for compatibility
}

export interface Project {
  id: string;
  title: string;
  status: string;
  createdAt: Date;
  clientId?: string; // Added for compatibility
  assignedMemberId?: string; // Added for compatibility
  deadline?: Date; // Added for compatibility
  priority?: string; // Added for compatibility
  type?: string; // Added for compatibility
  completionPercentage?: number; // Added for compatibility
}

export interface Client {
  id: string;
  name: string;
  email: string;
  company?: string;
  totalBudget?: number; // Added for compatibility
  status?: string; // Added for compatibility
}
