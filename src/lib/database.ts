/**
 * Database Connection and Utilities
 * 
 * Centralized database connection management using Prisma ORM
 * with connection pooling and error handling for production use.
 */

import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Prevent multiple instances of Prisma Client in development
const prisma = globalThis.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

export { prisma };

/**
 * Database connection health check
 */
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

/**
 * Gracefully disconnect from database
 */
export async function disconnectDatabase(): Promise<void> {
  await prisma.$disconnect();
}

/**
 * Initialize database with seed data (for development)
 */
export async function seedDatabase(): Promise<void> {
  try {
    console.log('Seeding database...');
    
    // Check if admin user already exists
    const existingAdmin = await prisma.user.findFirst({
      where: { role: 'SUPER_ADMIN' }
    });

    if (!existingAdmin) {
      const bcrypt = await import('bcryptjs');
      const hashedPassword = await bcrypt.hash('admin123', 12);
      
      await prisma.user.create({
        data: {
          email: 'admin@prismwriting.com',
          username: 'admin',
          firstName: 'System',
          lastName: 'Administrator',
          passwordHash: hashedPassword,
          role: 'SUPER_ADMIN',
          status: 'ACTIVE',
          emailVerified: new Date(),
        }
      });
      
      console.log('Admin user created successfully');
    }

    // Create sample project categories and content
    const existingContent = await prisma.content.findFirst();
    if (!existingContent) {
      const admin = await prisma.user.findFirst({
        where: { role: 'SUPER_ADMIN' }
      });

      if (admin) {
        await prisma.content.createMany({
          data: [
            {
              title: 'Welcome to Prism Writing',
              slug: 'welcome-to-prism-writing',
              content: 'Welcome to our professional writing and content creation platform.',
              excerpt: 'Get started with Prism Writing',
              type: 'ARTICLE',
              status: 'PUBLISHED',
              authorId: admin.id,
              publishedAt: new Date(),
              category: 'Getting Started',
              tags: JSON.stringify(['welcome', 'introduction'])
            },
            {
              title: 'Our Services',
              slug: 'our-services',
              content: 'Comprehensive writing services for businesses and individuals.',
              excerpt: 'Professional writing services',
              type: 'PAGE',
              status: 'PUBLISHED',
              authorId: admin.id,
              publishedAt: new Date(),
              category: 'Services',
              tags: JSON.stringify(['services', 'writing'])
            }
          ]
        });
        
        console.log('Sample content created successfully');
      }
    }

    console.log('Database seeding completed');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

/**
 * Database backup utility (development)
 */
export async function backupDatabase(): Promise<void> {
  // Implementation would depend on specific backup requirements
  console.log('Database backup feature - to be implemented based on production needs');
}

/**
 * Performance monitoring for database queries
 */
export function setupDatabaseMonitoring(): void {
  if (process.env.NODE_ENV === 'production') {
    // Add performance monitoring, query optimization tracking
    prisma.$use(async (params, next) => {
      const before = Date.now();
      const result = await next(params);
      const after = Date.now();
      
      // Log slow queries (> 1000ms)
      if (after - before > 1000) {
        console.warn(`Slow query detected: ${params.model}.${params.action} took ${after - before}ms`);
      }
      
      return result;
    });
  }
}

export default prisma;
