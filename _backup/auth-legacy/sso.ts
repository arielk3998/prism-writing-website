/**
 * Enterprise Single Sign-On (SSO) Authentication
 * 
 * Supports Google Workspace, Microsoft Azure AD, and SAML-based SSO
 * for enterprise authentication and identity management.
 */

import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import AzureADProvider from 'next-auth/providers/azure-ad';
import { prisma } from '@prism/auth';

export interface SSOProvider {
  id: string;
  name: string;
  type: 'oauth' | 'saml';
  enabled: boolean;
  config: {
    clientId?: string;
    clientSecret?: string;
    issuer?: string;
    entityId?: string;
    entryPoint?: string;
    cert?: string;
    domainRestriction?: string[];
  };
}

export interface SSOUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  provider: string;
  providerAccountId: string;
  domain: string;
  roles: string[];
  permissions: string[];
  lastLogin: string;
  metadata: Record<string, string | number | boolean>;
}

/**
 * Enterprise SSO Providers Configuration
 */
export const SSO_PROVIDERS: SSOProvider[] = [
  {
    id: 'google-workspace',
    name: 'Google Workspace',
    type: 'oauth',
    enabled: true,
    config: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      domainRestriction: process.env.GOOGLE_ALLOWED_DOMAINS?.split(',') || []
    }
  },
  {
    id: 'microsoft-azure',
    name: 'Microsoft Azure AD',
    type: 'oauth',
    enabled: true,
    config: {
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      domainRestriction: process.env.AZURE_ALLOWED_DOMAINS?.split(',') || []
    }
  },
  {
    id: 'saml-generic',
    name: 'SAML SSO',
    type: 'saml',
    enabled: false,
    config: {
      issuer: process.env.SAML_ISSUER,
      entryPoint: process.env.SAML_ENTRY_POINT,
      cert: process.env.SAML_CERT,
      entityId: process.env.SAML_ENTITY_ID,
      domainRestriction: process.env.SAML_ALLOWED_DOMAINS?.split(',') || []
    }
  }
];

/**
 * NextAuth configuration with enterprise SSO
 */
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'openid email profile',
          prompt: 'select_account',
        },
      },
    }),
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        // Domain restriction check
        const email = user.email || '';
        const domain = email.split('@')[1];
        
        const provider = SSO_PROVIDERS.find(p => 
          (account?.provider === 'google' && p.id === 'google-workspace') ||
          (account?.provider === 'azure-ad' && p.id === 'microsoft-azure')
        );

        if (provider?.config.domainRestriction && provider.config.domainRestriction.length > 0) {
          if (!provider.config.domainRestriction.includes(domain)) {
            console.log(`❌ Domain ${domain} not allowed for ${provider.name}`);
            return false;
          }
        }

        // Check if user exists or create new user
        const existingUser = await prisma.user.findUnique({
          where: { email }
        });

        if (!existingUser) {
          // Create new user from SSO
          await prisma.user.create({
            data: {
              email,
              passwordHash: 'SSO_USER_NO_PASSWORD', // SSO users don't have passwords
              firstName: user.name?.split(' ')[0] || '',
              lastName: user.name?.split(' ').slice(1).join(' ') || '',
              role: 'MEMBER', // Default role, can be updated by admin
              status: 'ACTIVE',
              avatar: user.image || undefined,
              ssoProvider: account.provider,
              ssoId: account.providerAccountId,
            }
          });

          console.log(`✅ New SSO user created: ${email}`);
        } else {
          // Update last login
          await prisma.user.update({
            where: { id: existingUser.id },
            data: {
              lastLogin: new Date(),
              ssoProvider: account.provider,
              ssoId: account.providerAccountId,
            }
          });
        }

        return true;
      } catch (error) {
        console.error('❌ SSO SignIn Error:', error);
        return false;
      }
    },
    async jwt({ token, account, user }) {
      if (account && user) {
        // Get user details from database
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! }
        });

        if (dbUser) {
          token.userId = dbUser.id;
          token.role = dbUser.role;
          token.permissions = getRolePermissions(dbUser.role);
          token.domain = user.email?.split('@')[1];
          token.ssoProvider = account.provider;
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Add custom fields to session
      (session.user as any).id = token.userId as string;
      (session.user as any).role = token.role as string;
      (session.user as any).permissions = token.permissions as string[];
      (session.user as any).domain = token.domain as string;
      (session.user as any).ssoProvider = token.ssoProvider as string;
      
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 8 * 60 * 60, // 8 hours for enterprise security
  },
  events: {
    async signIn({ user, account, isNewUser }) {
      // Log SSO sign-in event
      await logSSOEvent('signin', {
        userId: user.id!,
        email: user.email!,
        provider: account?.provider || 'unknown',
        isNewUser,
        timestamp: new Date().toISOString()
      });
    },
    async signOut({ token }) {
      // Log SSO sign-out event
      await logSSOEvent('signout', {
        userId: token.userId as string,
        email: token.email as string,
        provider: token.ssoProvider as string,
        timestamp: new Date().toISOString()
      });
    },
  },
};

/**
 * Get role-based permissions
 */
function getRolePermissions(role: string): string[] {
  const permissions: Record<string, string[]> = {
    'super-admin': [
      'user:read', 'user:write', 'user:delete',
      'project:read', 'project:write', 'project:delete',
      'billing:read', 'billing:write',
      'analytics:read', 'analytics:write',
      'settings:read', 'settings:write',
      'sso:manage', 'audit:read'
    ],
    'admin': [
      'user:read', 'user:write',
      'project:read', 'project:write',
      'billing:read',
      'analytics:read',
      'settings:read'
    ],
    'manager': [
      'user:read',
      'project:read', 'project:write',
      'analytics:read'
    ],
    'user': [
      'project:read',
      'profile:write'
    ]
  };

  return permissions[role] || permissions['user'];
}

/**
 * Log SSO events for audit trail
 */
async function logSSOEvent(event: string, data: Record<string, any>) {
  try {
    await prisma.auditLog.create({
      data: {
        action: `sso:${event}`,
        userId: data.userId,
        details: data as any,
        ipAddress: data.ipAddress || 'unknown',
        userAgent: data.userAgent || 'unknown'
      }
    });
  } catch (error) {
    console.error('❌ Error logging SSO event:', error);
  }
}

/**
 * Validate SSO domain restrictions
 */
export function validateSSODomain(email: string, providerId: string): boolean {
  const domain = email.split('@')[1];
  const provider = SSO_PROVIDERS.find(p => p.id === providerId);
  
  if (!provider || !provider.enabled) {
    return false;
  }

  if (provider.config.domainRestriction && provider.config.domainRestriction.length > 0) {
    return provider.config.domainRestriction.includes(domain);
  }

  return true;
}

/**
 * Get SSO provider configuration
 */
export function getSSOProvider(providerId: string): SSOProvider | null {
  return SSO_PROVIDERS.find(p => p.id === providerId) || null;
}

/**
 * Create SAML SSO configuration
 */
export function createSAMLConfig(provider: SSOProvider) {
  if (provider.type !== 'saml') {
    throw new Error('Provider is not SAML type');
  }

  return {
    entryPoint: provider.config.entryPoint,
    issuer: provider.config.issuer,
    cert: provider.config.cert,
    identifierFormat: 'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress',
    signatureAlgorithm: 'sha256',
    digestAlgorithm: 'sha256',
    validateInResponseTo: false,
    disableRequestedAuthnContext: true,
  };
}

/**
 * Middleware to check SSO permissions
 */
export function checkSSOPermission(requiredPermission: string) {
  return (session: any) => {
    if (!session?.user?.permissions) {
      return false;
    }
    
    return session.user.permissions.includes(requiredPermission);
  };
}

/**
 * Get user's SSO information
 */
export async function getUserSSOInfo(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      return null;
    }
    
    return {
      id: user.id,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
      role: user.role,
      ssoProvider: 'local', // Default since no metadata available
      domain: user.email.split('@')[1],
      firstLogin: user.createdAt?.toISOString(),
      lastLogin: user.lastLogin?.toISOString(),
      permissions: getRolePermissions(user.role)
    };
  } catch (error) {
    console.error('❌ Error getting user SSO info:', error);
    return null;
  }
}