# Deploying Prism Writing Website to prismwriting.com

## 🚀 Quick Deployment Guide

### Option 1: Vercel Deployment (Recommended)

Vercel is the easiest way to deploy your Next.js application:

#### Prerequisites
- GitHub account
- Vercel account (free)
- Domain: prismwriting.com

#### Steps:

1. **Push to GitHub Repository**
   ```bash
   # Initialize git if not already done
   git init
   git add .
   git commit -m "Complete Prism Writing website with password protection"
   
   # Create repository on GitHub and push
   git remote add origin https://github.com/YOUR_USERNAME/prism-writing-website.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy with Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Connect your GitHub account
   - Import your repository
   - Deploy automatically (Vercel detects Next.js)

3. **Configure Custom Domain**
   - In Vercel dashboard, go to your project settings
   - Add custom domain: `prismwriting.com`
   - Follow DNS configuration instructions

#### Environment Variables (if needed)
```bash
# Add in Vercel dashboard under Settings > Environment Variables
NEXT_PUBLIC_SITE_URL=https://prismwriting.com
```

### Option 2: Traditional Hosting

#### Build for Production
```bash
npm run build
npm run start
```

#### Static Export (if needed)
```bash
# Add to next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

### Option 3: Docker Deployment

#### Dockerfile
```dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

## 🔧 Pre-Deployment Checklist

### 1. Update Configuration for Production

#### Update siteConfig.ts
```typescript
export const siteConfig = {
  // ...existing config
  url: 'https://prismwriting.com',
  // Ensure all URLs are absolute for production
}
```

#### Update Password (Recommended)
```typescript
// In PasswordProtection.tsx, change default password for production
const DEFAULT_PASSWORD = 'your-secure-password-here';
```

### 2. SEO Optimization
- ✅ Meta tags already configured
- ✅ Favicon already set up
- ✅ Open Graph images ready

### 3. Performance Check
```bash
npm run build
npm run start
# Test on http://localhost:3000
```

## 🌐 DNS Configuration

### For prismwriting.com:

#### If using Vercel:
1. **A Record**: Point to Vercel's IP (they'll provide)
2. **CNAME**: www.prismwriting.com → prismwriting.com

#### If using traditional hosting:
1. **A Record**: Point to your server's IP
2. **CNAME**: www → your-domain

### Example DNS Settings:
```
Type: A
Name: @
Value: [Vercel IP or your server IP]
TTL: 300

Type: CNAME  
Name: www
Value: prismwriting.com
TTL: 300
```

## 🔒 Security Considerations

### Password Protection
- Consider changing the default password for production
- Add rate limiting for authentication attempts
- Monitor access logs

### HTTPS
- Vercel provides automatic HTTPS
- For other hosts, ensure SSL certificate is configured

## 📊 Monitoring & Analytics

### Add Analytics (Optional)
```typescript
// In layout.tsx, add Google Analytics or similar
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

### Performance Monitoring
- Vercel provides built-in analytics
- Consider adding Vercel Speed Insights

## 🚀 Quick Deploy Commands

### For Vercel (after GitHub setup):
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### For Manual Deploy:
```bash
# Build
npm run build

# Copy .next/out/ to your web server
# (if using static export)
```

## ✅ Post-Deployment Testing

1. **Test Password Protection**: Verify the auth flow works
2. **Test All Pages**: Navigate through all sections
3. **Test Mobile**: Ensure responsive design works
4. **Test Logo Animations**: Verify interactive features
5. **Test Dark Mode**: Toggle and verify theme switching
6. **Test Performance**: Check page load speeds

## 🎉 Go Live!

Once deployed, your stunning password-protected Prism Writing website will be live at:

**🌐 https://prismwriting.com**

With the password: `prism2024` (or your custom password)

---

**Estimated Deployment Time**: 15-30 minutes with Vercel
**Recommended**: Use Vercel for easiest deployment and automatic HTTPS
