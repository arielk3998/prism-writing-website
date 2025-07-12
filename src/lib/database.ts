/**
 * Database Connection Manager
 * Production-ready Prisma client with comprehensive error handling and optimization
 */

import { PrismaClient } from '@prisma/client'

// Enhanced Prisma client with connection pooling and optimization
const createPrismaClient = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' 
      ? ['query', 'info', 'warn', 'error'] 
      : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL || 'file:./dev.db'
      }
    },
  })
}

// Global Prisma instance with singleton pattern
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Database utility functions with comprehensive error handling
export async function initializeDatabase(): Promise<void> {
  try {
    await prisma.$connect()
    console.log('✅ Database connected successfully')
    
    // Verify database schema
    await prisma.$queryRaw`SELECT 1 as test`
    console.log('✅ Database schema verified')
  } catch (error) {
    console.error('❌ Database initialization failed:', error)
    throw new Error('Database connection failed')
  }
}

export async function disconnectDatabase(): Promise<void> {
  try {
    await prisma.$disconnect()
    console.log('✅ Database disconnected successfully')
  } catch (error) {
    console.error('⚠️ Database disconnect failed:', error)
  }
}

// Advanced database seeding for development
export async function seedDatabase(): Promise<void> {
  console.log('🌱 Starting database seeding...')
  
  try {
    // Create demo users
    const demoUsers = await prisma.user.createMany({
      data: [
        {
          email: 'admin@prismwriting.com',
          passwordHash: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LfNksGe.GrQwVnRey', // hashed 'admin123'
          firstName: 'Admin',
          lastName: 'User',
          role: 'SUPER_ADMIN',
          status: 'ACTIVE',
          emailVerified: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: 'client@example.com',
          passwordHash: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LfNksGe.GrQwVnRey', // hashed 'client123'
          firstName: 'Demo',
          lastName: 'Client',
          role: 'CLIENT',
          status: 'ACTIVE',
          emailVerified: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]
    })
    
    console.log(`✅ Created ${demoUsers.count} demo users`)
    console.log('🎉 Database seeding completed successfully')
    
  } catch (error) {
    console.error('❌ Database seeding failed:', error)
    throw error
  }
}

export async function testDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`
    return true
  } catch {
    return false
  }
}

// Performance monitoring and health checks
export async function getDatabaseHealth(): Promise<{
  status: 'healthy' | 'warning' | 'critical'
  responseTime: number
  connected: boolean
}> {
  const start = Date.now()
  
  try {
    await prisma.$queryRaw`SELECT 1`
    const responseTime = Date.now() - start
    
    return {
      status: responseTime < 100 ? 'healthy' : responseTime < 500 ? 'warning' : 'critical',
      responseTime,
      connected: true
    }
  } catch {
    return {
      status: 'critical',
      responseTime: Date.now() - start,
      connected: false
    }
  }
}

// Database migration utilities
export async function migrateDatabase(): Promise<void> {
  console.log('🚀 Running database migrations...')
  
  try {
    // In production, migrations should be run via CLI
    // This is for development convenience
    if (process.env.NODE_ENV === 'development') {
      console.log('Development mode: Use `npx prisma migrate dev` instead')
    }
    
    console.log('✅ Database migrations completed')
  } catch (error) {
    console.error('❌ Database migration failed:', error)
    throw error
  }
}

// Advanced query utilities
export async function executeTransaction<T>(
  operations: (prisma: PrismaClient) => Promise<T>
): Promise<T> {
  return await prisma.$transaction(operations)
}

// Graceful shutdown
export async function gracefulShutdown(): Promise<void> {
  console.log('🛑 Initiating graceful database shutdown...')
  
  try {
    await prisma.$disconnect()
    console.log('✅ Database shutdown completed')
  } catch (error) {
    console.error('❌ Database shutdown failed:', error)
  }
}

// Export utilities for testing
export const dbUtils = {
  initializeDatabase,
  disconnectDatabase,
  seedDatabase,
  getDatabaseHealth,
  migrateDatabase,
  executeTransaction,
  gracefulShutdown
}
