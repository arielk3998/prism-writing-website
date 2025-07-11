# Production Deployment Guide - Prism Writing Website

## Overview
This guide covers deploying the Prism Writing Cooperative website to production with full payment integration and all enhanced features.

## Pre-Deployment Checklist

### ✅ Features Completed
- [x] Team member integration with resume downloads
- [x] Dynamic contact information system
- [x] Automated workflow system
- [x] Payment system with Stripe integration
- [x] UI/UX polish and bug fixes
- [x] TypeScript warning cleanup
- [x] Free web services integration framework
- [x] Responsive design improvements
- [x] Database integration (SQLite)
- [x] Authentication system

### ✅ Code Quality
- [x] Build passes successfully
- [x] TypeScript errors resolved
- [x] Lint warnings minimized
- [x] Core functionality tested
- [x] API endpoints verified

## Deployment Steps

### 1. GitHub Repository Setup
```bash
# If repository doesn't exist, create it on GitHub first
# Then update remote (replace with your actual repo URL)
git remote set-url origin https://github.com/YOUR_USERNAME/prism-writing-website.git
git push -u origin master
```

### 2. Vercel Deployment
1. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Select "Next.js" as framework

2. **Environment Variables**:
   Configure these in Vercel dashboard:
   ```bash
   # Required for production
   STRIPE_PUBLISHABLE_KEY=pk_live_...
   STRIPE_SECRET_KEY=sk_live_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   
   # Stripe Price IDs (from Stripe Dashboard)
   STRIPE_PRICE_BASIC_MONTHLY=price_...
   STRIPE_PRICE_BASIC_YEARLY=price_...
   STRIPE_PRICE_PRO_MONTHLY=price_...
   STRIPE_PRICE_PRO_YEARLY=price_...
   STRIPE_PRICE_ENTERPRISE_MONTHLY=price_...
   STRIPE_PRICE_ENTERPRISE_YEARLY=price_...
   
   # Site configuration
   NEXT_PUBLIC_SITE_URL=https://prismwriting.com
   VERCEL_URL=prismwriting.com
   
   # Optional: Email configuration
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   CONTACT_EMAIL=contact@prismwriting.com
   ```

3. **Domain Configuration**:
   - Add custom domain: `prismwriting.com`
   - Configure DNS settings
   - Enable HTTPS (automatic with Vercel)

### 3. Stripe Production Setup

#### A. Create Stripe Products
1. Log into Stripe Dashboard
2. Create products for each plan:
   - Basic Plan ($29.99/month, $299.99/year)
   - Professional Plan ($79.99/month, $799.99/year)
   - Enterprise Plan (custom pricing)

#### B. Configure Webhooks
- **Endpoint URL**: `https://prismwriting.com/api/webhooks/stripe`
- **Events to send**:
  - `payment_intent.succeeded`
  - `invoice.payment_succeeded`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`

#### C. Update Environment Variables
Copy the live price IDs and webhook secret from Stripe to Vercel environment variables.

### 4. DNS Configuration
Point your domain to Vercel:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.19.61
```

### 5. Database Setup (Production)
The current setup uses SQLite for simplicity. For production scaling:
```bash
# Optional: Upgrade to PostgreSQL
# 1. Set up database on Railway, Supabase, or Vercel Postgres
# 2. Update DATABASE_URL in environment variables
# 3. Run migrations: npx prisma migrate deploy
```

## Post-Deployment Verification

### 1. Test Core Features
- [ ] Homepage loads correctly
- [ ] Contact form works and sends notifications
- [ ] Team page displays with resume downloads
- [ ] Pricing page shows correctly
- [ ] Authentication system works
- [ ] Admin panel accessible

### 2. Test Payment System
- [ ] Pricing page displays plans correctly
- [ ] Checkout flow works (use test cards initially)
- [ ] Webhooks receive events properly
- [ ] Subscription management works
- [ ] Payment confirmation emails sent

### 3. Performance Checks
- [ ] PageSpeed Insights score > 90
- [ ] Core Web Vitals pass
- [ ] Mobile responsiveness verified
- [ ] SEO meta tags present

### 4. Security Verification
- [ ] HTTPS enabled
- [ ] Environment variables secure
- [ ] API endpoints protected
- [ ] Database access controlled

## Monitoring & Maintenance

### Analytics
- Set up Vercel Analytics
- Configure Google Analytics (optional)
- Monitor payment metrics in Stripe Dashboard

### Error Monitoring
- Vercel automatically provides error tracking
- Set up alerts for failed payments
- Monitor webhook delivery in Stripe

### Regular Updates
- Monthly dependency updates
- Security patches
- Performance optimizations
- Feature enhancements based on user feedback

## Support & Documentation

### For Developers
- Source code: GitHub repository
- API documentation: `/docs` folder
- Database schema: `prisma/schema.prisma`

### For Business Users
- Admin panel: `/admin-panel`
- Analytics dashboard: `/portal-enhanced`
- Payment management: Stripe Dashboard

## Contact for Deployment Issues
- Technical issues: Check Vercel deployment logs
- Payment issues: Check Stripe Dashboard
- DNS issues: Contact domain registrar

---

**Deployment Status**: Ready for Production  
**Last Updated**: ${new Date().toISOString()}  
**Version**: 1.0.0

## Next Steps After Going Live

1. **Marketing Integration**:
   - Set up Google Analytics
   - Configure social media pixels
   - Enable email marketing tools

2. **Business Operations**:
   - Train team on admin panel
   - Set up customer support workflows
   - Create content strategy

3. **Growth Features**:
   - A/B testing setup
   - User feedback collection
   - Performance monitoring

4. **Legal Compliance**:
   - Update privacy policy with actual data practices
   - Ensure GDPR compliance for EU customers
   - Review terms of service
