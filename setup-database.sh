#!/bin/bash

# Database Setup Script for Prism Writing Platform
# This script sets up PostgreSQL database and runs initial migrations

set -e  # Exit on any error

echo "🚀 Setting up Prism Writing Database..."

# Check if required environment variables are set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ ERROR: DATABASE_URL environment variable is not set"
    echo "Please set it to your PostgreSQL connection string:"
    echo "export DATABASE_URL=\"postgresql://username:password@host:port/database\""
    exit 1
fi

# Check if Prisma CLI is available
if ! command -v npx &> /dev/null; then
    echo "❌ ERROR: npm/npx is not installed"
    exit 1
fi

echo "✅ Environment check passed"

# Generate Prisma client
echo "📦 Generating Prisma client..."
npx prisma generate

# Run database migrations
echo "🗄️ Running database migrations..."
npx prisma migrate deploy

# Check database connection
echo "🔗 Testing database connection..."
npx prisma db execute --stdin <<EOF
SELECT 1 as connection_test;
EOF

if [ $? -eq 0 ]; then
    echo "✅ Database connection successful"
else
    echo "❌ Database connection failed"
    exit 1
fi

# Seed initial data
echo "🌱 Seeding initial data..."
cat > seed.sql <<EOF
-- Create initial admin user
INSERT INTO users (
    id, email, username, "firstName", "lastName", 
    "passwordHash", role, status, "emailVerified", 
    "createdAt", "updatedAt"
) VALUES (
    'admin-seed-001',
    'admin@prismwriting.com',
    'admin',
    'System',
    'Administrator',
    -- Password: admin123 (hashed with bcrypt, 12 rounds)
    '\$2b\$12\$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj3bp.Fh.1o6',
    'SUPER_ADMIN',
    'ACTIVE',
    NOW(),
    NOW(),
    NOW()
) ON CONFLICT (email) DO NOTHING;

-- Create sample content
INSERT INTO content (
    id, title, slug, content, excerpt, type, status,
    "authorId", "publishedAt", category, tags,
    "createdAt", "updatedAt"
) VALUES (
    'content-welcome-001',
    'Welcome to Prism Writing',
    'welcome-to-prism-writing',
    'Welcome to our professional writing and content creation platform. We provide comprehensive writing services for businesses and individuals.',
    'Get started with Prism Writing',
    'ARTICLE',
    'PUBLISHED',
    'admin-seed-001',
    NOW(),
    'Getting Started',
    ARRAY['welcome', 'introduction'],
    NOW(),
    NOW()
) ON CONFLICT (slug) DO NOTHING;

-- Create initial newsletter subscription for admin
INSERT INTO newsletter_subscriptions (
    id, email, "firstName", "lastName", "isActive",
    "confirmedAt", "userId", "createdAt", "updatedAt"
) VALUES (
    'newsletter-admin-001',
    'admin@prismwriting.com',
    'System',
    'Administrator',
    true,
    NOW(),
    'admin-seed-001',
    NOW(),
    NOW()
) ON CONFLICT (email) DO NOTHING;

EOF

# Execute seed SQL
npx prisma db execute --file seed.sql

# Clean up
rm -f seed.sql

echo "✅ Database setup completed successfully!"
echo ""
echo "📋 Summary:"
echo "  - Database migrations applied"
echo "  - Prisma client generated"
echo "  - Initial admin user created (admin@prismwriting.com)"
echo "  - Sample content added"
echo "  - Newsletter system initialized"
echo ""
echo "🔑 Default Admin Credentials:"
echo "  Email: admin@prismwriting.com"
echo "  Password: admin123"
echo "  Role: Super Admin"
echo ""
echo "⚠️  Important: Change the default password after first login!"
echo ""
echo "🌐 Your application is ready to run with:"
echo "  npm run dev    (development)"
echo "  npm run build && npm start  (production)"
