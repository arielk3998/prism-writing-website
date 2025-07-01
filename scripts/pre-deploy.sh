#!/bin/bash

# 🚀 Pre-Deployment Validation Script
# Prevents common deployment issues by validating everything before build

set -e  # Exit on any error

echo "🔍 Starting pre-deployment validation..."

# 1. Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -f "prisma/schema.prisma" ]; then
    echo "❌ Error: Must be run from project root directory"
    exit 1
fi

# 2. Validate Prisma schema syntax
echo "📊 Validating Prisma schema..."
npx prisma validate || {
    echo "❌ Prisma schema validation failed"
    exit 1
}

# 3. Check for common schema issues
echo "🔍 Checking for schema issues..."
if grep -q "model.*model" prisma/schema.prisma; then
    echo "❌ Warning: Possible duplicate model definitions found"
fi

# 4. Generate fresh Prisma client
echo "🔄 Generating Prisma client..."
npx prisma generate || {
    echo "❌ Prisma client generation failed"
    exit 1
}

# 5. Check dependencies (but don't reinstall if they exist)
echo "📦 Checking dependencies..."
if [ ! -d "node_modules" ] || [ ! -f "node_modules/.package-lock.json" ]; then
    echo "Installing dependencies..."
    npm ci --silent || {
        echo "❌ Dependency installation failed"
        exit 1
    }
else
    echo "Dependencies already installed"
fi

# 6. TypeScript compilation check (no emit)
echo "🔍 Running TypeScript type check..."
npx tsc --noEmit || {
    echo "❌ TypeScript compilation failed"
    exit 1
}

# 7. ESLint check (non-blocking for warnings)
echo "🔧 Running ESLint..."
npm run lint || {
    echo "⚠️  ESLint issues found, but continuing..."
}

# 8. Build the application
echo "🏗️  Building application..."
npm run build || {
    echo "❌ Build failed"
    exit 1
}

echo "✅ All pre-deployment checks passed!"
echo "🚀 Ready for deployment!"
