/**
 * Authentication Library
 * 
 * Provides user authentication, session management, and role-based access control
 * for the Prism Writing member portal webapp.
 * 
 * @module AuthLib
 * @version 1.0.0
 */

import { randomBytes, createHash } from 'crypto';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'member' | 'client';
  avatar?: string;
  joinedAt: string;
  lastLogin?: string;
  permissions: string[];
  status: 'active' | 'inactive' | 'suspended';
}

export interface AuthSession {
  id: string;
  userId: string;
  token: string;
  expiresAt: string;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role?: 'member' | 'client';
}

// Mock user database with localStorage persistence
let mockUsers: User[] = [];

// Initialize users from localStorage or use defaults
function initializeUsers(): User[] {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('prism-users');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse stored users:', e);
      }
    }
  }
  
  // Default users
  return [
    {
      id: '1',
      email: 'admin@prismwriting.com',
      name: 'Admin User',
      role: 'admin',
      joinedAt: '2024-01-01T00:00:00Z',
      permissions: ['read', 'write', 'delete', 'admin'],
      status: 'active'
    },
    {
      id: '2',
      email: 'member@prismwriting.com',
      name: 'Cooperative Member',
      role: 'member',
      joinedAt: '2024-01-15T00:00:00Z',
      permissions: ['read', 'write'],
      status: 'active'
    },
    {
      id: '3',
      email: 'client@example.com',
      name: 'Client User',
      role: 'client',
      joinedAt: '2024-02-01T00:00:00Z',
      permissions: ['read'],
      status: 'active'
    }
  ];
}

// Initialize users
mockUsers = initializeUsers();

// Mock password storage with localStorage persistence  
let mockPasswords: Record<string, string> = {};

function initializePasswords(): Record<string, string> {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('prism-passwords');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse stored passwords:', e);
      }
    }
  }
  
  // Default passwords
  return {
    'admin@prismwriting.com': 'admin123',
    'member@prismwriting.com': 'member123',
    'client@example.com': 'client123'
  };
}

// Initialize passwords
mockPasswords = initializePasswords();

// Function to persist users to localStorage
function persistUsers() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('prism-users', JSON.stringify(mockUsers));
  }
}

// Function to persist passwords to localStorage
function persistPasswords() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('prism-passwords', JSON.stringify(mockPasswords));
  }
}

// Session storage
const sessions: AuthSession[] = [];

/**
 * Hash a password (simplified for demo - in production use bcrypt or similar)
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex');
}

/**
 * Generate a secure session token
 */
function generateToken(): string {
  return randomBytes(32).toString('hex');
}

/**
 * Authenticate a user with email and password
 */
export async function login(credentials: LoginCredentials): Promise<{ user: User; token: string } | null> {
  const { email, password } = credentials;
  
  // Find user by email
  const user = mockUsers.find(u => u.email === email && u.status === 'active');
  if (!user) {
    return null;
  }

  // Verify password
  const storedPassword = mockPasswords[email];
  if (storedPassword !== password) {
    return null;
  }

  // Create session
  const token = generateToken();
  const session: AuthSession = {
    id: generateToken(),
    userId: user.id,
    token,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
    createdAt: new Date().toISOString()
  };

  sessions.push(session);

  // Update last login
  user.lastLogin = new Date().toISOString();
  persistUsers();

  return { user, token };
}

/**
 * Register a new user
 */
export async function register(data: RegisterData): Promise<{ user: User; token: string } | null> {
  const { email, password, name, role = 'client' } = data;

  // Check if user already exists
  if (mockUsers.find(u => u.email === email)) {
    throw new Error('User already exists');
  }

  // Create new user
  const user: User = {
    id: (mockUsers.length + 1).toString(),
    email,
    name,
    role,
    joinedAt: new Date().toISOString(),
    permissions: role === 'member' ? ['read', 'write'] : ['read'],
    status: 'active'
  };

  mockUsers.push(user);
  mockPasswords[email] = password;

  // Persist to localStorage
  persistUsers();
  persistPasswords();

  // Create session
  const token = generateToken();
  const session: AuthSession = {
    id: generateToken(),
    userId: user.id,
    token,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString()
  };

  sessions.push(session);

  return { user, token };
}

/**
 * Verify a session token and return the user
 */
export async function verifyToken(token: string): Promise<User | null> {
  const session = sessions.find(s => s.token === token && new Date(s.expiresAt) > new Date());
  if (!session) {
    return null;
  }

  const user = mockUsers.find(u => u.id === session.userId);
  return user || null;
}

/**
 * Logout a user (invalidate session)
 */
export async function logout(token: string): Promise<boolean> {
  const sessionIndex = sessions.findIndex(s => s.token === token);
  if (sessionIndex >= 0) {
    sessions.splice(sessionIndex, 1);
    return true;
  }
  return false;
}

/**
 * Get all users (admin only)
 */
export async function getAllUsers(): Promise<User[]> {
  return mockUsers;
}

/**
 * Update user profile
 */
export async function updateUser(userId: string, updates: Partial<User>): Promise<User | null> {
  const userIndex = mockUsers.findIndex(u => u.id === userId);
  if (userIndex >= 0) {
    mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates };
    return mockUsers[userIndex];
  }
  return null;
}

/**
 * Check if user has permission
 */
export function hasPermission(user: User, permission: string): boolean {
  return user.permissions.includes(permission);
}

/**
 * Get role-based permissions
 */
export function getRolePermissions(role: User['role']): string[] {
  switch (role) {
    case 'admin':
      return ['read', 'write', 'delete', 'admin'];
    case 'member':
      return ['read', 'write'];
    case 'client':
      return ['read'];
    default:
      return [];
  }
}
