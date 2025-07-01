/**
 * Authentication API Routes
 * 
 * Handles user registration, login, logout, and token refresh
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { registerUser, loginUser, type RegisterData, type LoginCredentials } from '@/lib/auth';

// Validation schemas
const registerSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(1, 'First name is required').optional(),
  lastName: z.string().min(1, 'Last name is required').optional(),
  username: z.string().min(3, 'Username must be at least 3 characters').optional(),
});

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'register') {
      return await handleRegister(request);
    } else if (action === 'login') {
      return await handleLogin(request);
    } else {
      return NextResponse.json(
        { error: 'Invalid action. Use ?action=register or ?action=login' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Authentication API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function handleRegister(request: NextRequest) {
  try {
    const body = await request.json();
    const validationResult = registerSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Invalid registration data',
          details: validationResult.error.errors
        },
        { status: 400 }
      );
    }

    const result = await registerUser(validationResult.data as RegisterData);

    if ('error' in result) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    // Set secure HTTP-only cookies for tokens
    const response = NextResponse.json(
      {
        message: 'Registration successful',
        user: result.user
      },
      { status: 201 }
    );

    // Set secure cookies
    response.cookies.set('accessToken', result.tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60, // 15 minutes
      path: '/'
    });

    response.cookies.set('refreshToken', result.tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/'
    });

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}

async function handleLogin(request: NextRequest) {
  try {
    const body = await request.json();
    const validationResult = loginSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Invalid login data',
          details: validationResult.error.errors
        },
        { status: 400 }
      );
    }

    const result = await loginUser(validationResult.data as LoginCredentials);

    if ('error' in result) {
      return NextResponse.json(
        { error: result.error },
        { status: 401 }
      );
    }

    // Set secure HTTP-only cookies for tokens
    const response = NextResponse.json(
      {
        message: 'Login successful',
        user: result.user
      },
      { status: 200 }
    );

    // Cookie expiry based on remember me
    const accessTokenMaxAge = 15 * 60; // 15 minutes
    const refreshTokenMaxAge = validationResult.data.rememberMe 
      ? 30 * 24 * 60 * 60  // 30 days
      : 7 * 24 * 60 * 60;  // 7 days

    response.cookies.set('accessToken', result.tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: accessTokenMaxAge,
      path: '/'
    });

    response.cookies.set('refreshToken', result.tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: refreshTokenMaxAge,
      path: '/'
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}

// Handle logout
export async function DELETE() {
  try {
    const response = NextResponse.json(
      { message: 'Logout successful' },
      { status: 200 }
    );

    // Clear authentication cookies
    response.cookies.set('accessToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/'
    });

    response.cookies.set('refreshToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/'
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
}
