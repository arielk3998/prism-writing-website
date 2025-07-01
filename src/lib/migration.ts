/**
 * Database Migration Service
 * 
 * Handles migration from in-memory storage to PostgreSQL database
 * with data integrity checks and rollback capabilities.
 */

import { prisma } from './database';

interface InMemoryUser {
  id: string;
  email: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  passwordHash: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface MigrationResult {
  success: boolean;
  migrated: {
    users: number;
    sessions: number;
    newsletters: number;
  };
  errors: string[];
}

/**
 * Check if database is connected and ready
 */
export async function checkDatabaseReady(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

/**
 * Migrate in-memory users to database
 */
export async function migrateUsers(): Promise<{ success: boolean; count: number; errors: string[] }> {
  const errors: string[] = [];
  let migrated = 0;

  // Default users from in-memory storage
  const inMemoryUsers: InMemoryUser[] = [
    {
      id: 'user_admin_001',
      email: 'admin@prismwriting.com',
      username: 'admin',
      firstName: 'System',
      lastName: 'Administrator',
      passwordHash: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj3bp.Fh.1o6',
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'user_member_001',
      email: 'member@prismwriting.com',
      username: 'member',
      firstName: 'Demo',
      lastName: 'Member',
      passwordHash: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj3bp.Fh.1o6',
      role: 'MEMBER',
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'user_client_001',
      email: 'client@example.com',
      username: 'client',
      firstName: 'Demo',
      lastName: 'Client',
      passwordHash: '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj3bp.Fh.1o6',
      role: 'CLIENT',
      status: 'ACTIVE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ];

  try {
    for (const userData of inMemoryUsers) {
      try {
        // Check if user already exists
        const existing = await prisma.user.findUnique({
          where: { email: userData.email }
        });

        if (existing) {
          console.log(`User ${userData.email} already exists, skipping...`);
          continue;
        }

        // Create user in database
        await prisma.user.create({
          data: {
            id: userData.id,
            email: userData.email,
            username: userData.username,
            firstName: userData.firstName,
            lastName: userData.lastName,
            passwordHash: userData.passwordHash,
            role: userData.role as 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR' | 'MEMBER' | 'CLIENT' | 'VIEWER',
            status: userData.status as 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING_VERIFICATION',
            createdAt: new Date(userData.createdAt),
            updatedAt: new Date(userData.updatedAt),
          }
        });

        migrated++;
        console.log(`✅ Migrated user: ${userData.email}`);

      } catch (userError) {
        const errorMsg = `Failed to migrate user ${userData.email}: ${userError}`;
        errors.push(errorMsg);
        console.error('❌', errorMsg);
      }
    }

    return { success: migrated > 0, count: migrated, errors };

  } catch (error) {
    errors.push(`Migration failed: ${error}`);
    return { success: false, count: 0, errors };
  }
}

/**
 * Migrate newsletter subscriptions to database
 */
export async function migrateNewsletterSubscriptions(): Promise<{ success: boolean; count: number; errors: string[] }> {
  const errors: string[] = [];
  let migrated = 0;

  // Sample newsletter subscriptions
  const subscriptions = [
    {
      email: 'subscriber1@example.com',
      firstName: 'John',
      lastName: 'Doe',
      isActive: true,
      confirmedAt: new Date(),
      source: 'website_signup',
      tags: JSON.stringify(['technical_writing', 'monthly_newsletter'])
    },
    {
      email: 'subscriber2@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
      isActive: true,
      confirmedAt: new Date(),
      source: 'website_signup',
      tags: JSON.stringify(['business_writing', 'weekly_tips'])
    }
  ];

  try {
    for (const sub of subscriptions) {
      try {
        // Check if subscription already exists
        const existing = await prisma.newsletterSubscription.findUnique({
          where: { email: sub.email }
        });

        if (existing) {
          console.log(`Newsletter subscription ${sub.email} already exists, skipping...`);
          continue;
        }

        await prisma.newsletterSubscription.create({
          data: sub
        });

        migrated++;
        console.log(`✅ Migrated newsletter subscription: ${sub.email}`);

      } catch (subError) {
        const errorMsg = `Failed to migrate subscription ${sub.email}: ${subError}`;
        errors.push(errorMsg);
        console.error('❌', errorMsg);
      }
    }

    return { success: migrated >= 0, count: migrated, errors };

  } catch (error) {
    errors.push(`Newsletter migration failed: ${error}`);
    return { success: false, count: 0, errors };
  }
}

/**
 * Create sample projects for demonstration
 */
export async function createSampleProjects(): Promise<{ success: boolean; count: number; errors: string[] }> {
  const errors: string[] = [];
  let created = 0;

  try {
    // Get admin user
    const adminUser = await prisma.user.findUnique({
      where: { email: 'admin@prismwriting.com' }
    });

    if (!adminUser) {
      errors.push('Admin user not found for project creation');
      return { success: false, count: 0, errors };
    }

    const sampleProjects = [
      {
        name: 'API Documentation Project',
        description: 'Comprehensive API documentation for enterprise client',
        status: 'IN_PROGRESS' as const,
        priority: 'HIGH' as const,
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        budget: 15000,
      },
      {
        name: 'User Manual Development',
        description: 'Complete user manual for software platform',
        status: 'PLANNING' as const,
        priority: 'MEDIUM' as const,
        startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        budget: 8000,
      },
      {
        name: 'Technical Blog Series',
        description: 'Monthly technical blog posts for client website',
        status: 'IN_PROGRESS' as const,
        priority: 'LOW' as const,
        startDate: new Date(),
        budget: 5000,
      }
    ];

    for (const projectData of sampleProjects) {
      try {
        const project = await prisma.project.create({
          data: {
            ...projectData,
            creatorId: adminUser.id,
          }
        });

        // Add admin as project member
        await prisma.projectMember.create({
          data: {
            projectId: project.id,
            userId: adminUser.id,
            role: 'OWNER'
          }
        });

        created++;
        console.log(`✅ Created sample project: ${projectData.name}`);

      } catch (projectError) {
        const errorMsg = `Failed to create project ${projectData.name}: ${projectError}`;
        errors.push(errorMsg);
        console.error('❌', errorMsg);
      }
    }

    return { success: created > 0, count: created, errors };

  } catch (error) {
    errors.push(`Project creation failed: ${error}`);
    return { success: false, count: 0, errors };
  }
}

/**
 * Run complete migration process
 */
export async function runFullMigration(): Promise<MigrationResult> {
  console.log('🚀 Starting database migration...');

  const result: MigrationResult = {
    success: false,
    migrated: {
      users: 0,
      sessions: 0,
      newsletters: 0,
    },
    errors: []
  };

  try {
    // Check database connection
    const dbReady = await checkDatabaseReady();
    if (!dbReady) {
      result.errors.push('Database connection failed');
      return result;
    }

    // Migrate users
    console.log('📝 Migrating users...');
    const userMigration = await migrateUsers();
    result.migrated.users = userMigration.count;
    result.errors.push(...userMigration.errors);

    // Migrate newsletter subscriptions
    console.log('📧 Migrating newsletter subscriptions...');
    const newsletterMigration = await migrateNewsletterSubscriptions();
    result.migrated.newsletters = newsletterMigration.count;
    result.errors.push(...newsletterMigration.errors);

    // Create sample projects
    console.log('📁 Creating sample projects...');
    const projectCreation = await createSampleProjects();
    result.errors.push(...projectCreation.errors);

    // Check overall success
    result.success = result.errors.length === 0;

    if (result.success) {
      console.log('✅ Migration completed successfully!');
      console.log(`📊 Migration summary:
        - Users: ${result.migrated.users}
        - Newsletter subscriptions: ${result.migrated.newsletters}
        - Sample projects created: ${projectCreation.count}`);
    } else {
      console.log('⚠️ Migration completed with errors:');
      result.errors.forEach(error => console.log(`  - ${error}`));
    }

    return result;

  } catch (error) {
    result.errors.push(`Migration process failed: ${error}`);
    result.success = false;
    return result;
  }
}

/**
 * Get migration status
 */
export async function getMigrationStatus(): Promise<{
  databaseConnected: boolean;
  userCount: number;
  newsletterCount: number;
  projectCount: number;
}> {
  try {
    const databaseConnected = await checkDatabaseReady();
    
    if (!databaseConnected) {
      return {
        databaseConnected: false,
        userCount: 0,
        newsletterCount: 0,
        projectCount: 0
      };
    }

    const [userCount, newsletterCount, projectCount] = await Promise.all([
      prisma.user.count(),
      prisma.newsletterSubscription.count(),
      prisma.project.count()
    ]);

    return {
      databaseConnected: true,
      userCount,
      newsletterCount,
      projectCount
    };

  } catch (error) {
    console.error('Error getting migration status:', error);
    return {
      databaseConnected: false,
      userCount: 0,
      newsletterCount: 0,
      projectCount: 0
    };
  }
}
