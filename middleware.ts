import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { enhancedAuthMiddleware } from './src/lib/enhancedAuthMiddleware'

// Security headers
const securityHeaders = {
  // Content Security Policy
  'Content-Security-Policy': `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://va.vercel-scripts.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    font-src 'self' https://fonts.gstatic.com;
    img-src 'self' data: https: blob:;
    connect-src 'self' https://vercel.live wss://ws-us3.pusher.com https://api.stripe.com;
    frame-src 'self' https://js.stripe.com;
    media-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    upgrade-insecure-requests;
  `.replace(/\s+/g, ' ').trim(),
  
  // Referrer Policy
  'Referrer-Policy': 'origin-when-cross-origin',
  
  // Permissions Policy
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  
  // Security headers
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'X-DNS-Prefetch-Control': 'false',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'X-XSS-Protection': '1; mode=block',
}

// Rate limiting store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Rate limiting function
function rateLimit(ip: string, limit: number = 100, windowMs: number = 60 * 1000): boolean {
  const now = Date.now()
  const windowStart = now - windowMs
  
  // Clean old entries
  for (const [key, value] of rateLimitStore.entries()) {
    if (value.resetTime < now) {
      rateLimitStore.delete(key)
    }
  }
  
  const current = rateLimitStore.get(ip)
  
  if (!current) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }
  
  if (current.resetTime < now) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }
  
  if (current.count >= limit) {
    return false
  }
  
  current.count++
  return true
}

// Bot detection patterns
const botPatterns = [
  /bot/i,
  /crawler/i,
  /spider/i,
  /scraper/i,
  /wget/i,
  /curl/i,
  /http/i,
]

function isBot(userAgent: string): boolean {
  return botPatterns.some(pattern => pattern.test(userAgent))
}

export async function middleware(request: NextRequest) {
  // First apply enhanced authentication middleware
  try {
    const authResponse = await enhancedAuthMiddleware(request, {
      enforceCSP: true,
      auditLogging: true,
      sessionTimeout: 8 * 60 * 60 * 1000, // 8 hours
      maxLoginAttempts: 5,
      workspaceIsolation: true,
      requireSSL: process.env.NODE_ENV === 'production',
    })
    
    // If auth middleware returns a redirect or error, use that
    if (authResponse.status !== 200) {
      return authResponse
    }
  } catch (error) {
    console.error('[Middleware] Auth check failed:', error)
  }
  
  const response = NextResponse.next()
  const { pathname } = request.nextUrl
  
  // Get client IP
  const ip = request.headers.get('X-Forwarded-For')?.split(',')[0] || 
    request.headers.get('X-Real-IP') || 
    request.headers.get('CF-Connecting-IP') ||
    'unknown'
  
  // Get user agent
  const userAgent = request.headers.get('User-Agent') || ''
  
  // Add device detection headers for client-side optimization
  const isMobile = /Mobile|Android|iPhone|iPad/i.test(userAgent)
  const isTablet = /iPad|Tablet/i.test(userAgent)
  const isTouchDevice = isMobile || isTablet

  response.headers.set('X-Device-Type', isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop')
  response.headers.set('X-Is-Touch-Device', isTouchDevice.toString())
  response.headers.set('X-Is-Mobile', isMobile.toString())
  
  // Apply security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  
  // Rate limiting for API routes
  if (pathname.startsWith('/api/')) {
    const limit = pathname.includes('/translation-quote') ? 10 : 50
    
    if (!rateLimit(ip, limit)) {
      return new NextResponse('Too Many Requests', {
        status: 429,
        headers: {
          'Retry-After': '60',
          ...Object.fromEntries(Object.entries(securityHeaders)),
        },
      })
    }
    
    // Add rate limit headers
    response.headers.set('X-RateLimit-Limit', limit.toString())
    response.headers.set('X-RateLimit-Remaining', 
      Math.max(0, limit - (rateLimitStore.get(ip)?.count || 0)).toString()
    )
  }
  
  // Block suspicious user agents
  if (userAgent.length > 500 || userAgent.includes('<script>')) {
    return new NextResponse('Forbidden', { status: 403 })
  }
  
  // Bot protection for sensitive paths
  if (isBot(userAgent) && pathname.includes('/admin')) {
    return new NextResponse('Forbidden', { status: 403 })
  }
  
  // Add security and performance headers
  response.headers.set('X-Powered-By', '')
  response.headers.set('Server', '')
  
  // CORS headers for API routes
  if (pathname.startsWith('/api/')) {
    response.headers.set('Access-Control-Allow-Origin', 'https://prismwriting.com')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    response.headers.set('Access-Control-Max-Age', '86400')
  }
  
  // Add cache headers for static assets
  if (pathname.includes('/_next/static/') || pathname.includes('/favicon')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  }
  
  // Add performance monitoring headers
  response.headers.set('X-Response-Time', Date.now().toString())
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
