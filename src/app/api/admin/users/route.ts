/**
 * Users API Route for Lead Assignment
 * Returns active users for assigning leads
 */

import { NextResponse } from 'next/server';
import { getUsers } from '@/lib/leads';

export async function GET() {
  try {
    const users = await getUsers();
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
