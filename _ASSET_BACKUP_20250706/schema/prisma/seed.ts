import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create default admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@prismwriting.com' },
    update: {},
    create: {
      email: 'admin@prismwriting.com',
      username: 'admin',
      firstName: 'Prism',
      lastName: 'Admin',
      passwordHash: adminPassword,
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
      emailVerified: new Date(),
    },
  });

  console.log('✅ Created admin user:', admin.email);

  // Create a demo user
  const userPassword = await bcrypt.hash('user123', 10);
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@prismwriting.com' },
    update: {},
    create: {
      email: 'demo@prismwriting.com',
      username: 'demo',
      firstName: 'Demo',
      lastName: 'User',
      passwordHash: userPassword,
      role: 'MEMBER',
      status: 'ACTIVE',
      emailVerified: new Date(),
    },
  });

  console.log('✅ Created demo user:', demoUser.email);

  // Create member demo user
  const memberPassword = await bcrypt.hash('member123', 10);
  const memberUser = await prisma.user.upsert({
    where: { email: 'member@prismwriting.com' },
    update: {},
    create: {
      email: 'member@prismwriting.com',
      username: 'member',
      firstName: 'Demo',
      lastName: 'Member',
      passwordHash: memberPassword,
      role: 'MEMBER',
      status: 'ACTIVE',
      emailVerified: new Date(),
    },
  });

  console.log('✅ Created member user:', memberUser.email);

  // Create client demo user
  const clientPassword = await bcrypt.hash('client123', 10);
  const clientUser = await prisma.user.upsert({
    where: { email: 'client@example.com' },
    update: {},
    create: {
      email: 'client@example.com',
      username: 'client',
      firstName: 'Demo',
      lastName: 'Client',
      passwordHash: clientPassword,
      role: 'CLIENT',
      status: 'ACTIVE',
      emailVerified: new Date(),
    },
  });

  console.log('✅ Created client user:', clientUser.email);

  // Create a sample project
  const project = await prisma.project.create({
    data: {
      name: 'Prism Writing Platform Development',
      description: 'Development of the Prism Writing cooperative business platform',
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      creatorId: admin.id,
      budget: 50000,
      startDate: new Date(),
      endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
    },
  });

  console.log('✅ Created sample project:', project.name);

  // Add demo user as project member
  await prisma.projectMember.create({
    data: {
      projectId: project.id,
      userId: demoUser.id,
      role: 'EDITOR',
    },
  });

  console.log('✅ Added demo user to project');

  // Add member user as project member
  await prisma.projectMember.create({
    data: {
      projectId: project.id,
      userId: memberUser.id,
      role: 'MEMBER',
    },
  });

  console.log('✅ Added member user to project');

  // Create sample tasks
  await prisma.task.createMany({
    data: [
      {
        title: 'Set up database schema',
        description: 'Design and implement the database schema for the platform',
        status: 'COMPLETED',
        priority: 'HIGH',
        projectId: project.id,
        assigneeId: admin.id,
        completedAt: new Date(),
        estimatedHours: 8,
        actualHours: 10,
      },
      {
        title: 'Implement user authentication',
        description: 'Build secure user authentication and authorization system',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        projectId: project.id,
        assigneeId: memberUser.id,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        estimatedHours: 16,
      },
      {
        title: 'Create admin dashboard',
        description: 'Build comprehensive admin dashboard with analytics',
        status: 'TODO',
        priority: 'MEDIUM',
        projectId: project.id,
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
        estimatedHours: 24,
      },
    ],
  });

  console.log('✅ Created sample tasks');

  // Create sample notification preferences
  await prisma.notificationPreference.createMany({
    data: [
      {
        userId: admin.id,
        emailEnabled: true,
        pushEnabled: true,
        projectUpdates: true,
        taskReminders: true,
        invoiceUpdates: true,
        systemAlerts: true,
        marketing: false,
      },
      {
        userId: demoUser.id,
        emailEnabled: true,
        pushEnabled: false,
        projectUpdates: true,
        taskReminders: true,
        invoiceUpdates: false,
        systemAlerts: true,
        marketing: true,
      },
    ],
  });

  console.log('✅ Created notification preferences');

  // Create sample chart of accounts
  await prisma.account.createMany({
    data: [
      {
        accountNumber: '1000',
        accountName: 'Cash',
        accountType: 'ASSET',
        accountCategory: 'CURRENT_ASSET',
        description: 'Primary cash account',
        balance: 10000,
      },
      {
        accountNumber: '1100',
        accountName: 'Accounts Receivable',
        accountType: 'ASSET',
        accountCategory: 'CURRENT_ASSET',
        description: 'Outstanding customer invoices',
        balance: 5000,
      },
      {
        accountNumber: '4000',
        accountName: 'Writing Services Revenue',
        accountType: 'REVENUE',
        accountCategory: 'OPERATING_REVENUE',
        description: 'Revenue from writing services',
        balance: 0,
      },
      {
        accountNumber: '5000',
        accountName: 'Operating Expenses',
        accountType: 'EXPENSE',
        accountCategory: 'OPERATING_EXPENSE',
        description: 'General operating expenses',
        balance: 0,
      },
    ],
  });

  console.log('✅ Created chart of accounts');

  // Create sample content
  await prisma.content.create({
    data: {
      title: 'Welcome to Prism Writing',
      slug: 'welcome-to-prism-writing',
      content: `# Welcome to Prism Writing

Prism Writing is a cooperative business platform designed to empower writers and content creators. Our platform provides:

- Project management tools
- Collaborative writing features
- Financial tracking and invoicing
- Client relationship management
- Analytics and reporting

Join our community of professional writers and take your writing business to the next level.`,
      excerpt: 'Welcome to Prism Writing - a cooperative platform for professional writers.',
      type: 'ARTICLE',
      status: 'PUBLISHED',
      authorId: admin.id,
      publishedAt: new Date(),
      metaTitle: 'Welcome to Prism Writing - Professional Writing Platform',
      metaDescription: 'Discover Prism Writing, the cooperative platform designed for professional writers and content creators.',
      tags: 'platform, writing, cooperative, professional',
      category: 'Getting Started',
    },
  });

  console.log('✅ Created sample content');

  console.log('🎉 Database seeding completed successfully!');
  console.log('');
  console.log('📋 Login Credentials:');
  console.log('Admin: admin@prismwriting.com / admin123');
  console.log('Demo User: demo@prismwriting.com / user123');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
