# 🚀 QUICK SETUP: Get prismwriting.com LIVE in 3 Steps

## Your Site is Ready - Just Need DNS!

**Current Live URL**: https://prism-writing-website-rfbql9y8h-prism-writings-projects.vercel.app

## Step 1: Vercel Dashboard Setup (2 minutes)

1. **Go to**: https://vercel.com/dashboard
2. **Click**: "prism-writing-website" project
3. **Navigate**: Settings → Domains
4. **Add Domain**: `prismwriting.com`
5. **Add WWW**: `www.prismwriting.com`

## Step 2: DNS Configuration (5 minutes)

### Go to Your Domain Registrar:
- **GoDaddy**: Domains → DNS Management
- **Namecheap**: Domain List → Manage → Advanced DNS
- **Cloudflare**: DNS → Records

### Add These DNS Records:

**Record 1 - Root Domain:**
```
Type: A
Name: @ (or blank)
Value: 76.76.19.61
TTL: 3600
```

**Record 2 - WWW Subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

## Step 3: Wait for Propagation (24-48 hours)

- **DNS propagation** takes time
- **Check status**: https://dnschecker.org
- **SSL Certificate** auto-provisioned by Vercel

## 🎉 Result

After DNS propagation:
- ✅ https://prismwriting.com → Your translation services
- ✅ https://www.prismwriting.com → Same site
- ✅ Automatic HTTPS with SSL certificate
- ✅ Professional domain for your business

## 🆘 Need Help?

**DNS Issues?** Most registrars have live chat support
**Vercel Issues?** Check https://vercel.com/docs/concepts/projects/custom-domains

---

**Your translation services platform is production-ready!**
The only step left is DNS configuration at your domain registrar.
