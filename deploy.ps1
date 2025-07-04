# Deployment Script for Prism Writing Translation Services
# Run this script from your project directory: c:\Users\Merla-Margot\Desktop\prism-writing-website

Write-Host "🚀 Starting deployment process for Translation Services Website..." -ForegroundColor Cyan

# Step 1: Navigate to project directory
Set-Location "c:\Users\Merla-Margot\Desktop\prism-writing-website"
Write-Host "📁 Current directory: $(Get-Location)" -ForegroundColor Yellow

# Step 2: Install dependencies (if needed)
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

# Step 3: Build the application
Write-Host "🔨 Building the application..." -ForegroundColor Yellow
npm run build

# Step 4: Check if build was successful
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Build successful!" -ForegroundColor Green
    
    # Step 5: Install Vercel CLI if not already installed
    Write-Host "🛠️ Installing Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
    
    # Step 6: Deploy to Vercel
    Write-Host "🚀 Deploying to Vercel..." -ForegroundColor Yellow
    Write-Host "Follow the prompts to:" -ForegroundColor Cyan
    Write-Host "  1. Login to Vercel (GitHub recommended)" -ForegroundColor White
    Write-Host "  2. Choose your project settings" -ForegroundColor White
    Write-Host "  3. Confirm deployment" -ForegroundColor White
    
    vercel --prod
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "🎉 Deployment successful!" -ForegroundColor Green
        Write-Host "Your translation services website is now live!" -ForegroundColor Green
    } else {
        Write-Host "❌ Deployment failed. Please check the error messages above." -ForegroundColor Red
    }
} else {
    Write-Host "❌ Build failed. Please fix the errors and try again." -ForegroundColor Red
    Write-Host "Common issues to check:" -ForegroundColor Yellow
    Write-Host "  - TypeScript errors" -ForegroundColor White
    Write-Host "  - Missing dependencies" -ForegroundColor White
    Write-Host "  - Import/export issues" -ForegroundColor White
}

Write-Host "📋 Post-deployment checklist:" -ForegroundColor Cyan
Write-Host "  ✓ Test all translation features" -ForegroundColor White
Write-Host "  ✓ Verify language selector works" -ForegroundColor White
Write-Host "  ✓ Check quote form submission" -ForegroundColor White
Write-Host "  ✓ Test mobile responsiveness" -ForegroundColor White
Write-Host "  ✓ Verify navigation between pages" -ForegroundColor White
