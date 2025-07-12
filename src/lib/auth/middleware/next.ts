import { NextRequest, NextResponse } from 'next/server';
import { User } from '../types';
import { verifyAuthToken } from '../utils/token';
import { prisma } from '../prisma';

async function getUserFromToken(token: string): Promise<User | null> {
  try {
    const decoded = verifyAuthToken(token);
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!user || user.status !== 'ACTIVE') {
      return null;
    }

    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch {
    return null;
  }
}

export async function requireAuth(request: NextRequest): Promise<{ user: User } | NextResponse> {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }

    const user = await getUserFromToken(token);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    return { user };
  } catch {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 }
    );
  }
}

export async function requireAdmin(request: NextRequest): Promise<{ user: User } | NextResponse> {
  const auth = await requireAuth(request);
  
  if (auth instanceof NextResponse) {
    return auth; // Return error response
  }

  if (auth.user.role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'Admin access required' },
      { status: 403 }
    );
  }

  return auth;
}