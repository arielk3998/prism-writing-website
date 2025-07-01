import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { runFullMigration, getMigrationStatus } from '@/lib/migration';

export async function POST(request: NextRequest) {
  try {
    // Verify authentication and admin access
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Check if user has admin permissions
    if (!['SUPER_ADMIN', 'ADMIN'].includes(payload.role)) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { action } = body;

    switch (action) {
      case 'migrate':
        console.log('🚀 Starting database migration...');
        const migrationResult = await runFullMigration();
        
        return NextResponse.json({
          success: migrationResult.success,
          message: migrationResult.success ? 'Migration completed successfully' : 'Migration completed with errors',
          data: migrationResult.migrated,
          errors: migrationResult.errors,
        });

      case 'status':
        const status = await getMigrationStatus();
        
        return NextResponse.json({
          success: true,
          data: status,
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action. Use "migrate" or "status"' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Migration API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // For GET requests, just return migration status (no auth required for status check)
    const status = await getMigrationStatus();
    
    return NextResponse.json({
      success: true,
      data: status,
    });

  } catch (error) {
    console.error('Migration status error:', error);
    return NextResponse.json(
      { error: 'Failed to get migration status', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
