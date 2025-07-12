import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret'

export interface User {
  id: string
  email: string
  name?: string
  role: string
  emailVerified?: Date
}

export interface AuthResponse {
  success: boolean
  user?: User
  token?: string
  error?: string
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AuthError'
  }
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash)
}

export function generateToken(user: User): string {
  return jwt.sign(
    { 
      userId: user.id, 
      email: user.email, 
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  )
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    throw new AuthError('Invalid token')
  }
}

export async function registerUser(email: string, password: string, name?: string): Promise<AuthResponse> {
  try {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    })

    if (existingUser) {
      return { success: false, error: 'User already exists' }
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password)
    
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash: hashedPassword,
        firstName: name || null,
        role: 'CLIENT',
        status: 'ACTIVE',
      }
    })

    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.firstName || null,
      role: user.role,
    })

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.firstName || null,
        role: user.role,
      },
      token
    }
  } catch (error) {
    console.error('Registration error:', error)
    return { success: false, error: 'Registration failed' }
  }
}

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    })

    if (!user) {
      return { success: false, error: 'Invalid credentials' }
    }

    const isValid = await verifyPassword(password, user.passwordHash)
    
    if (!isValid) {
      return { success: false, error: 'Invalid credentials' }
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      name: user.firstName || null,
      role: user.role,
    })

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.firstName || null,
        role: user.role,
      },
      token
    }
  } catch (error) {
    console.error('Login error:', error)
    return { success: false, error: 'Login failed' }
  }
}
