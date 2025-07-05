/**
 * Client-side Authentication Utils
 * 
 * Provides authentication utilities for client-side components
 * 
 * @version 2.0.0
 * @author Prism Writing Enterprise System
 */

'use client'

import { UserRole } from './auth'

export interface ClientUser {
  id: string
  email: string
  firstName?: string | null
  lastName?: string | null
  role: UserRole
  permissions: string[]
  workspaceId?: string
}

// Role-based permissions mapping
const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  SUPER_ADMIN: ['*'], // All permissions
  ADMIN: [
    'users.view', 'users.edit', 'users.create', 'users.delete',
    'projects.view', 'projects.edit', 'projects.create', 'projects.delete',
    'clients.view', 'clients.edit', 'clients.create', 'clients.delete',
    'settings.view', 'settings.edit',
    'analytics.view',
    'workspace.manage'
  ],
  EDITOR: [
    'projects.view', 'projects.edit', 'projects.create',
    'clients.view',
    'workspace.view'
  ],
  MEMBER: [
    'projects.view', 'projects.edit',
    'clients.view',
    'workspace.view'
  ],
  CLIENT: [
    'projects.view', // Only own projects
    'workspace.view' // Only own workspace
  ],
  VIEWER: [
    'projects.view', // Read-only
    'workspace.view' // Read-only
  ]
}

/**
 * Get current user from browser storage
 */
export function getCurrentUserClient(): ClientUser | null {
  if (typeof window === 'undefined') return null
  
  try {
    const userData = localStorage.getItem('prism-user')
    const tokenData = localStorage.getItem('prism-token')
    
    if (!userData || !tokenData) return null
    
    const user = JSON.parse(userData)
    const permissions = ROLE_PERMISSIONS[user.role] || []
    
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      permissions,
      workspaceId: user.workspaceId || user.id, // Default workspace to user ID
    }
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

/**
 * Check if user has specific permission
 */
export function hasPermission(user: ClientUser | null, permission: string): boolean {
  if (!user) return false
  
  // Super admin has all permissions
  if (user.permissions.includes('*')) return true
  
  return user.permissions.includes(permission)
}

/**
 * Check if user has access to workspace
 */
export function hasWorkspaceAccess(user: ClientUser | null, workspaceId: string): boolean {
  if (!user) return false
  
  // Super admin and admin have access to all workspaces
  if (['SUPER_ADMIN', 'ADMIN'].includes(user.role)) return true
  
  // Other users only have access to their own workspace
  return user.workspaceId === workspaceId
}

/**
 * Check if current user is authenticated
 */
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  
  const token = localStorage.getItem('prism-token')
  const user = localStorage.getItem('prism-user')
  
  return !!(token && user)
}

/**
 * Logout user
 */
export function logoutUser(): void {
  if (typeof window === 'undefined') return
  
  localStorage.removeItem('prism-token')
  localStorage.removeItem('prism-user')
  localStorage.removeItem('prism-session')
  
  // Redirect to home page
  window.location.href = '/'
}

/**
 * Set user session data
 */
export function setUserSession(user: any, token: string): void {
  if (typeof window === 'undefined') return
  
  localStorage.setItem('prism-user', JSON.stringify(user))
  localStorage.setItem('prism-token', token)
  localStorage.setItem('prism-session', Date.now().toString())
}

/**
 * Check if session is expired
 */
export function isSessionExpired(): boolean {
  if (typeof window === 'undefined') return true
  
  const sessionTime = localStorage.getItem('prism-session')
  if (!sessionTime) return true
  
  const sessionAge = Date.now() - parseInt(sessionTime)
  const maxAge = 8 * 60 * 60 * 1000 // 8 hours
  
  return sessionAge > maxAge
}
