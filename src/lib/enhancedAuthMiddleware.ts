/**
 * Enhanced Authentication Middleware
 * 
 * Provides strict role-based access control, workspace isolation,
 * and enhanced security features for the Prism Writing platform.
 * 
 * @version 2.0.0
 * @author Prism Writing Enterprise System
 */

import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser, hasPermission, UserRole } from './auth'

export interface SecurityConfig {
  enforceCSP: boolean
  auditLogging: boolean
  sessionTimeout: number
  maxLoginAttempts: number
  workspaceIsolation: boolean
  requireSSL: boolean
}

export interface WorkspaceAccess {
  workspaceId: string
  permissions: string[]
  accessLevel: 'read' | 'write' | 'admin'
  restrictions?: string[]
}

export interface SecurityHeaders {
  'Content-Security-Policy': string
  'X-Frame-Options': string
  'X-Content-Type-Options': string
  'Referrer-Policy': string
  'Permissions-Policy': string
  'Strict-Transport-Security': string
}

// Default security configuration
const DEFAULT_SECURITY_CONFIG: SecurityConfig = {
  enforceCSP: true,
  auditLogging: true,
  sessionTimeout: 8 * 60 * 60 * 1000, // 8 hours
  maxLoginAttempts: 5,
  workspaceIsolation: true,
  requireSSL: true,
}

// Workspace definitions
const WORKSPACE_DEFINITIONS = {
  public: {
    paths: ['/', '/services', '/portfolio', '/contact', '/translation-quote'],
    requiresAuth: false,
    allowedRoles: ['*'],
  },
  member: {
    paths: ['/portal', '/dashboard', '/projects', '/files', '/resources'],
    requiresAuth: true,
    allowedRoles: ['SUPER_ADMIN', 'ADMIN', 'MEMBER'],
  },
  client: {
    paths: ['/client-portal', '/client-dashboard', '/deliverables'],
    requiresAuth: true,
    allowedRoles: ['SUPER_ADMIN', 'ADMIN', 'CLIENT'],
  },
  admin: {
    paths: ['/admin', '/users', '/settings', '/analytics'],
    requiresAuth: true,
    allowedRoles: ['SUPER_ADMIN', 'ADMIN'],
  },
  api: {
    paths: ['/api'],
    requiresAuth: true,
    allowedRoles: ['*'],
  },
}

/**
 * Enhanced authentication middleware with workspace isolation
 */
export async function enhancedAuthMiddleware(
  request: NextRequest,
  config: Partial<SecurityConfig> = {}
): Promise<NextResponse> {
  const securityConfig = { ...DEFAULT_SECURITY_CONFIG, ...config }
  const { pathname } = request.nextUrl
  
  try {
    // Apply security headers
    const response = NextResponse.next()
    applySecurityHeaders(response, securityConfig)
    
    // Skip auth for public assets and API routes that don't require auth
    if (shouldSkipAuth(pathname)) {
      return response
    }
    
    // Determine workspace from path
    const workspace = getWorkspaceFromPath(pathname)
    const workspaceConfig = WORKSPACE_DEFINITIONS[workspace]
    
    // Check if authentication is required
    if (workspaceConfig.requiresAuth) {
      const authResult = await authenticateRequest(request)
      
      if (!authResult.success) {
        return redirectToAuth(request, authResult.error)
      }
      
      const user = authResult.user!
      
      // Check workspace access
      if (securityConfig.workspaceIsolation) {
        const hasAccess = await checkWorkspaceAccess(user, workspace, pathname)
        if (!hasAccess) {
          return createForbiddenResponse(pathname)
        }
      }
      
      // Check role-based permissions
      if (!checkRoleAccess(user.role, workspaceConfig.allowedRoles)) {
        return createForbiddenResponse(pathname)
      }
      
      // Log security event
      if (securityConfig.auditLogging) {
        await logSecurityEvent({
          type: 'access_granted',
          userId: user.id,
          workspace,
          path: pathname,
          userAgent: request.headers.get('user-agent') || '',
          ip: getClientIP(request),
          timestamp: new Date(),
        })
      }
      
      // Add user context to response headers (for debugging)
      response.headers.set('X-User-Role', user.role)
      response.headers.set('X-Workspace', workspace)
    }
    
    return response
    
  } catch (error) {
    console.error('[Auth Middleware Error]:', error)
    
    // Log security error
    if (securityConfig.auditLogging) {
      await logSecurityEvent({
        type: 'middleware_error',
        error: error instanceof Error ? error.message : 'Unknown error',
        path: pathname,
        userAgent: request.headers.get('user-agent') || '',
        ip: getClientIP(request),
        timestamp: new Date(),
      })
    }
    
    return NextResponse.redirect(new URL('/auth?error=system_error', request.url))
  }
}

/**
 * Authenticate request and return user information
 */
async function authenticateRequest(request: NextRequest): Promise<{
  success: boolean
  user?: any
  error?: string
}> {
  try {
    // Check for authentication token
    const token = request.cookies.get('auth-token')?.value ||
                 request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return { success: false, error: 'No authentication token' }
    }
    
    // Validate token and get user
    const user = await getCurrentUser(token)
    
    if (!user) {
      return { success: false, error: 'Invalid or expired token' }
    }
    
    // Check if user is active
    if (user.status !== 'ACTIVE') {
      return { success: false, error: 'User account is not active' }
    }
    
    return { success: true, user }
    
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Authentication failed' 
    }
  }
}

/**
 * Check workspace access for user
 */
async function checkWorkspaceAccess(
  user: any,
  workspace: string,
  path: string
): Promise<boolean> {
  // Super admins have access to all workspaces
  if (user.role === 'SUPER_ADMIN') {
    return true
  }
  
  // Check specific workspace permissions
  switch (workspace) {
    case 'member':
      return ['ADMIN', 'MEMBER'].includes(user.role)
    
    case 'client':
      // Clients can only access their own client portal
      return user.role === 'CLIENT' || ['ADMIN'].includes(user.role)
    
    case 'admin':
      return ['ADMIN'].includes(user.role)
    
    case 'api':
      // API access depends on the specific endpoint
      return await checkAPIAccess(user, path)
    
    case 'public':
    default:
      return true
  }
}

/**
 * Check API access permissions
 */
async function checkAPIAccess(user: any, path: string): Promise<boolean> {
  // Admin API endpoints
  if (path.startsWith('/api/admin/')) {
    return ['SUPER_ADMIN', 'ADMIN'].includes(user.role)
  }
  
  // Member API endpoints
  if (path.startsWith('/api/member/')) {
    return ['SUPER_ADMIN', 'ADMIN', 'MEMBER'].includes(user.role)
  }
  
  // Client API endpoints
  if (path.startsWith('/api/client/')) {
    return ['SUPER_ADMIN', 'ADMIN', 'CLIENT'].includes(user.role)
  }
  
  // General API endpoints (authenticated users)
  return ['SUPER_ADMIN', 'ADMIN', 'MEMBER', 'CLIENT'].includes(user.role)
}

/**
 * Check role-based access
 */
function checkRoleAccess(userRole: UserRole, allowedRoles: string[]): boolean {
  if (allowedRoles.includes('*')) {
    return true
  }
  
  return allowedRoles.includes(userRole)
}

/**
 * Determine workspace from request path
 */
function getWorkspaceFromPath(pathname: string): string {
  // API routes
  if (pathname.startsWith('/api/')) {
    return 'api'
  }
  
  // Admin routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/users') || 
      pathname.startsWith('/settings') || pathname.startsWith('/analytics')) {
    return 'admin'
  }
  
  // Client routes
  if (pathname.startsWith('/client-')) {
    return 'client'
  }
  
  // Member routes
  if (pathname.startsWith('/portal') || pathname.startsWith('/dashboard') ||
      pathname.startsWith('/projects') || pathname.startsWith('/files') ||
      pathname.startsWith('/resources')) {
    return 'member'
  }
  
  // Public routes (default)
  return 'public'
}

/**
 * Apply security headers to response
 */
function applySecurityHeaders(response: NextResponse, config: SecurityConfig): void {
  if (!config.enforceCSP) return
  
  const securityHeaders: SecurityHeaders = {
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https: wss:",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  }
  
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
}

/**
 * Check if authentication should be skipped for this path
 */
function shouldSkipAuth(pathname: string): boolean {
  const skipPaths = [
    '/favicon.ico',
    '/robots.txt',
    '/sitemap.xml',
    '/_next/',
    '/api/health',
    '/api/translation-quote',
  ]
  
  return skipPaths.some(path => pathname.startsWith(path))
}

/**
 * Redirect to authentication page
 */
function redirectToAuth(request: NextRequest, error?: string): NextResponse {
  const authUrl = new URL('/auth', request.url)
  
  if (error) {
    authUrl.searchParams.set('error', error)
  }
  
  // Store the intended destination
  authUrl.searchParams.set('redirect', request.nextUrl.pathname)
  
  return NextResponse.redirect(authUrl)
}

/**
 * Create forbidden response
 */
function createForbiddenResponse(pathname: string): NextResponse {
  return new NextResponse(
    JSON.stringify({
      error: 'Access denied',
      message: `You don't have permission to access ${pathname}`,
      code: 403,
    }),
    {
      status: 403,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}

/**
 * Get client IP address
 */
function getClientIP(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    request.headers.get('cf-connecting-ip') ||
    'unknown'
  )
}

/**
 * Log security events for auditing
 */
async function logSecurityEvent(event: {
  type: string
  userId?: string
  workspace?: string
  path?: string
  userAgent?: string
  ip?: string
  timestamp: Date
  error?: string
}): Promise<void> {
  try {
    // In production, this would write to a secure audit log
    console.log('[Security Audit]:', JSON.stringify(event, null, 2))
    
    // TODO: Implement secure audit logging to database or external service
    // await auditLogger.log(event)
    
  } catch (error) {
    console.error('[Audit Log Error]:', error)
  }
}

export default enhancedAuthMiddleware
