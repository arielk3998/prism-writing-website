/**
 * User Export API Route
 * 
 * Handles exporting user data to CSV format for admin use.
 * Includes proper headers and authentication checks.
 */

import { NextRequest, NextResponse } from 'next/server';

// Import users storage from main users route
// In a real application, this would be a proper database
interface ExportUser {
  id: string;
  email: string;
  name: string;
  role: string;
  roleName: string;
  customPermissions: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin: string | null;
  createdBy: string;
  permissions: string[];
}

const users: ExportUser[] = [
  {
    id: '1',
    email: 'admin@prismwriting.com',
    name: 'System Admin',
    role: 'super_admin',
    roleName: 'Super Admin',
    customPermissions: [],
    isActive: true,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    lastLogin: '2024-01-15T10:30:00.000Z',
    createdBy: 'system',
    permissions: [
      'user:create', 'user:read', 'user:update', 'user:delete',
      'content:create', 'content:read', 'content:update', 'content:delete',
      'newsletter:read', 'newsletter:manage', 'newsletter:export',
      'system:admin', 'analytics:read', 'settings:update'
    ]
  },
  {
    id: '2',
    email: 'editor@prismwriting.com',
    name: 'Content Editor',
    role: 'editor',
    roleName: 'Editor',
    customPermissions: ['newsletter:manage'],
    isActive: true,
    createdAt: '2024-01-02T00:00:00.000Z',
    updatedAt: '2024-01-02T00:00:00.000Z',
    lastLogin: '2024-01-14T15:20:00.000Z',
    createdBy: '1',
    permissions: [
      'user:read', 'content:create', 'content:read', 'content:update',
      'newsletter:read', 'newsletter:manage', 'analytics:read'
    ]
  },
  {
    id: '3',
    email: 'client@example.com',
    name: 'Test Client',
    role: 'client',
    roleName: 'Client',
    customPermissions: [],
    isActive: false,
    createdAt: '2024-01-03T00:00:00.000Z',
    updatedAt: '2024-01-03T00:00:00.000Z',
    lastLogin: null,
    createdBy: '1',
    permissions: ['content:read']
  }
];

function formatDateForCSV(dateString: string | null): string {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString();
}

function escapeCSVField(field: string): string {
  if (field.includes(',') || field.includes('"') || field.includes('\n')) {
    return `"${field.replace(/"/g, '""')}"`;
  }
  return field;
}

function generateCSV(users: ExportUser[]): string {
  const headers = [
    'ID',
    'Name', 
    'Email',
    'Role',
    'Status',
    'Permissions',
    'Created Date',
    'Last Login',
    'Created By'
  ];

  const csvRows = [headers.join(',')];

  for (const user of users) {
    const row = [
      escapeCSVField(user.id),
      escapeCSVField(user.name),
      escapeCSVField(user.email),
      escapeCSVField(user.roleName),
      user.isActive ? 'Active' : 'Inactive',
      escapeCSVField(user.permissions.join('; ')),
      formatDateForCSV(user.createdAt),
      formatDateForCSV(user.lastLogin),
      escapeCSVField(user.createdBy)
    ];
    csvRows.push(row.join(','));
  }

  return csvRows.join('\n');
}

export async function GET(request: NextRequest) {
  try {
    // Simple authentication check - in production, use proper JWT validation
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Generate CSV content
    const csvContent = generateCSV(users);
    
    // Return CSV as downloadable file
    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="users-export-${new Date().toISOString().split('T')[0]}.csv"`,
        'Cache-Control': 'no-cache'
      }
    });

  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
