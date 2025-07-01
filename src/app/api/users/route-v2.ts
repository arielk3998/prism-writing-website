/**
 * Enhanced User Management API Route
 * 
 * Updated to use the new authentication system with database support
 * while maintaining backward compatibility with the existing system.
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { isAuthenticated } from '@/lib/auth';

// User role definitions with hierarchical permissions
const USER_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin', 
  EDITOR: 'editor',
  MEMBER: 'member',
  CLIENT: 'client',
  VIEWER: 'viewer'
} as const;

const PERMISSIONS = {
  // User management
  USER_CREATE: 'user:create',
  USER_READ: 'user:read', 
  USER_UPDATE: 'user:update',
  USER_DELETE: 'user:delete',
  
  // Content management
  CONTENT_CREATE: 'content:create',
  CONTENT_READ: 'content:read',
  CONTENT_UPDATE: 'content:update',
  CONTENT_DELETE: 'content:delete',
  
  // Newsletter management
  NEWSLETTER_READ: 'newsletter:read',
  NEWSLETTER_MANAGE: 'newsletter:manage',
  NEWSLETTER_EXPORT: 'newsletter:export',
  
  // System administration
  SYSTEM_ADMIN: 'system:admin',
  ANALYTICS_READ: 'analytics:read',
  SETTINGS_UPDATE: 'settings:update'
} as const;

// Role-based permission matrix
const ROLE_PERMISSIONS = {
  [USER_ROLES.SUPER_ADMIN]: Object.values(PERMISSIONS),
  [USER_ROLES.ADMIN]: [
    PERMISSIONS.USER_CREATE,
    PERMISSIONS.USER_READ,
    PERMISSIONS.USER_UPDATE,
    PERMISSIONS.CONTENT_CREATE,
    PERMISSIONS.CONTENT_READ,
    PERMISSIONS.CONTENT_UPDATE,
    PERMISSIONS.CONTENT_DELETE,
    PERMISSIONS.NEWSLETTER_READ,
    PERMISSIONS.NEWSLETTER_MANAGE,
    PERMISSIONS.NEWSLETTER_EXPORT,
    PERMISSIONS.ANALYTICS_READ,
    PERMISSIONS.SETTINGS_UPDATE
  ],
  [USER_ROLES.EDITOR]: [
    PERMISSIONS.USER_READ,
    PERMISSIONS.CONTENT_CREATE,
    PERMISSIONS.CONTENT_READ,
    PERMISSIONS.CONTENT_UPDATE,
    PERMISSIONS.NEWSLETTER_READ,
    PERMISSIONS.ANALYTICS_READ
  ],
  [USER_ROLES.MEMBER]: [
    PERMISSIONS.USER_READ,
    PERMISSIONS.CONTENT_READ,
    PERMISSIONS.NEWSLETTER_READ
  ],
  [USER_ROLES.CLIENT]: [
    PERMISSIONS.CONTENT_READ
  ],
  [USER_ROLES.VIEWER]: [
    PERMISSIONS.CONTENT_READ
  ]
};

// Validation schemas
const createUserSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.enum(Object.values(USER_ROLES) as [string, ...string[]]),
  customPermissions: z.array(z.string()).optional(),
  sendWelcomeEmail: z.boolean().default(true),
  temporaryPassword: z.boolean().default(true)
});

const updateUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(2).optional(),
  role: z.enum(Object.values(USER_ROLES) as [string, ...string[]]).optional(),
  customPermissions: z.array(z.string()).optional(),
  isActive: z.boolean().optional()
});

// Enhanced in-memory user storage with additional fields for database compatibility
const users: Array<{
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  role: string;
  customPermissions: string[];
  isActive: boolean;
  status: 'active' | 'inactive' | 'suspended' | 'pending_verification';
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  createdBy: string;
  emailVerified?: string;
  twoFactorEnabled: boolean;
  loginAttempts: number;
}> = [
  {
    id: 'user_1',
    email: 'admin@prismwriting.com',
    name: 'System Administrator',
    firstName: 'System',
    lastName: 'Administrator',
    username: 'admin',
    role: USER_ROLES.SUPER_ADMIN,
    customPermissions: [],
    isActive: true,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    createdBy: 'system',
    emailVerified: new Date().toISOString(),
    twoFactorEnabled: false,
    loginAttempts: 0
  }
];

function generateUserId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substring(2)}`;
}

function generateTemporaryPassword(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
  let password = '';
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

function getUserPermissions(role: string, customPermissions: string[] = []): string[] {
  const rolePermissions = ROLE_PERMISSIONS[role as keyof typeof ROLE_PERMISSIONS] || [];
  return [...new Set([...rolePermissions, ...customPermissions])];
}

// GET - Fetch users with filtering and pagination
export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const role = searchParams.get('role') || '';
    const status = searchParams.get('status') || '';

    const filteredUsers = users.filter(user => {
      const matchesSearch = search === '' || 
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());
      
      const matchesRole = role === '' || user.role === role;
      const matchesStatus = status === '' || 
        (status === 'active' && user.isActive) ||
        (status === 'inactive' && !user.isActive);

      return matchesSearch && matchesRole && matchesStatus;
    });

    const total = filteredUsers.length;
    const startIndex = (page - 1) * limit;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + limit);

    // Remove sensitive data and add computed fields
    const safeUsers = paginatedUsers.map(user => ({
      ...user,
      permissions: getUserPermissions(user.role, user.customPermissions),
      roleName: user.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
    }));

    const stats = {
      total,
      active: users.filter(u => u.isActive).length,
      inactive: users.filter(u => !u.isActive).length,
      byRole: Object.fromEntries(
        Object.values(USER_ROLES).map(role => [
          role, users.filter(u => u.role === role).length
        ])
      )
    };

    return NextResponse.json({
      users: safeUsers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      stats,
      roles: Object.values(USER_ROLES),
      permissions: Object.values(PERMISSIONS),
      systemInfo: {
        version: '2.0.0',
        databaseType: 'in-memory', // Will change to 'postgresql' when database is connected
        authSystem: 'enhanced'
      }
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// POST - Create new user
export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validationResult = createUserSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid user data',
          details: validationResult.error.errors 
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Check if email already exists
    const existingUser = users.find(user => user.email === data.email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'A user with this email already exists' },
        { status: 409 }
      );
    }

    // Generate temporary password if requested
    const temporaryPassword = data.temporaryPassword ? generateTemporaryPassword() : null;

    // Parse name into first and last name
    const nameParts = data.name.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Create new user
    const newUser = {
      id: generateUserId(),
      email: data.email,
      name: data.name,
      firstName,
      lastName,
      username: data.email.split('@')[0], // Generate username from email
      role: data.role,
      customPermissions: data.customPermissions || [],
      isActive: true,
      status: 'pending_verification' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'admin', // In production, get from authenticated user
      twoFactorEnabled: false,
      loginAttempts: 0
    };

    users.push(newUser);

    // Log user creation
    console.log('User created:', {
      id: newUser.id,
      email: data.email,
      role: data.role,
      temporaryPassword: !!temporaryPassword
    });

    // In production, send welcome email here
    if (data.sendWelcomeEmail) {
      console.log(`Welcome email would be sent to: ${data.email}`);
      if (temporaryPassword) {
        console.log(`Temporary password: ${temporaryPassword}`);
      }
    }

    return NextResponse.json(
      { 
        message: 'User created successfully',
        user: {
          ...newUser,
          permissions: getUserPermissions(newUser.role, newUser.customPermissions),
          temporaryPassword: temporaryPassword
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}

// PUT - Update user
export async function PUT(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const validationResult = updateUserSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Invalid user data',
          details: validationResult.error.errors 
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex === -1) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if email is being changed and if it conflicts
    if (data.email && data.email !== users[userIndex].email) {
      const emailExists = users.some(user => user.email === data.email && user.id !== userId);
      if (emailExists) {
        return NextResponse.json(
          { error: 'A user with this email already exists' },
          { status: 409 }
        );
      }
    }

    // Update user with enhanced fields
    const updatedFields: Record<string, unknown> = {
      ...data,
      updatedAt: new Date().toISOString()
    };

    // Parse name if provided
    if (data.name) {
      const nameParts = data.name.split(' ');
      updatedFields.firstName = nameParts[0] || '';
      updatedFields.lastName = nameParts.slice(1).join(' ') || '';
    }

    const updatedUser = {
      ...users[userIndex],
      ...updatedFields
    };

    users[userIndex] = updatedUser;

    console.log('User updated:', {
      id: userId,
      changes: data
    });

    return NextResponse.json(
      { 
        message: 'User updated successfully',
        user: {
          ...updatedUser,
          permissions: getUserPermissions(updatedUser.role, updatedUser.customPermissions)
        }
      }
    );

  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

// DELETE - Delete user
export async function DELETE(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex === -1) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Prevent deletion of super admin
    if (users[userIndex].role === USER_ROLES.SUPER_ADMIN) {
      return NextResponse.json(
        { error: 'Cannot delete super admin user' },
        { status: 403 }
      );
    }

    const deletedUser = users.splice(userIndex, 1)[0];

    console.log('User deleted:', {
      id: userId,
      email: deletedUser.email
    });

    return NextResponse.json(
      { 
        message: 'User deleted successfully',
        deletedUser: {
          id: deletedUser.id,
          email: deletedUser.email,
          name: deletedUser.name
        }
      }
    );

  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}
