/**
 * Test API Route for Lead Management
 * Simple test to check database connectivity
 */

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Test database connection
    const testCount = await prisma.$queryRaw`SELECT COUNT(*) as count FROM contact_inquiries`;
    
    return NextResponse.json({ 
      message: 'Database connection successful',
      count: testCount 
    });
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json(
      { error: 'Database connection failed', details: error },
      { status: 500 }
    );
  }
}
