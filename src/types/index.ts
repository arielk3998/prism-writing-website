/**
 * Global TypeScript Type Definitions
 * Shared types used across the application
 */

import { ReactNode } from 'react'

// Navigation types
export interface NavigationItem {
  label: string
  href: string
  description?: string
}

// Theme types
export type Theme = 'light' | 'dark' | 'system'

// Component prop types
export interface BaseComponentProps {
  className?: string
  children?: ReactNode
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// File upload types
export interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  url?: string
  uploadedAt: Date
}

// Project types (for portfolio/services)
export interface Project {
  id: string
  title: string
  description: string
  category: ProjectCategory
  technologies: string[]
  imageUrl?: string
  demoUrl?: string
  githubUrl?: string
  featured: boolean
  completedAt: Date
}

export type ProjectCategory = 
  | 'technical-documentation'
  | 'api-documentation' 
  | 'user-guides'
  | 'process-documentation'
  | 'training-materials'
  | 'website-content'

// Service types
export interface Service {
  id: string
  title: string
  description: string
  features: string[]
  pricing?: ServicePricing
  category: ServiceCategory
}

export type ServiceCategory =
  | 'documentation'
  | 'content-writing'
  | 'editing'
  | 'consultation'

export interface ServicePricing {
  type: 'fixed' | 'hourly' | 'project'
  amount: number
  currency: string
  description?: string
}

// Blog types (for future blog functionality)
export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  authorId: string
  categoryId: string
  tags: string[]
  publishedAt: Date
  updatedAt: Date
  featured: boolean
  imageUrl?: string
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  description?: string
}

export interface Author {
  id: string
  name: string
  email: string
  bio?: string
  avatarUrl?: string
  socialLinks?: SocialLinks
}

export interface SocialLinks {
  twitter?: string
  linkedin?: string
  github?: string
  website?: string
}

// SEO Meta types
export interface SEOMeta {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  canonicalUrl?: string
  noindex?: boolean
}

// Error types
export interface AppError {
  code: string
  message: string
  details?: unknown
}

// Form state types
export interface FormState<T = unknown> {
  data: T
  errors: Record<string, string>
  isSubmitting: boolean
  isValid: boolean
}

// Toast notification types
export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  type: ToastType
  title: string
  message?: string
  duration?: number
  actions?: ToastAction[]
}

export interface ToastAction {
  label: string
  onClick: () => void
  variant?: 'default' | 'destructive'
}

// Analytics types (for future analytics)
export interface AnalyticsEvent {
  name: string
  properties?: Record<string, unknown>
  userId?: string
  timestamp: Date
}

// Search types (for future search functionality)
export interface SearchResult {
  id: string
  title: string
  excerpt: string
  url: string
  type: 'page' | 'blog' | 'service' | 'project'
  score: number
}

export interface SearchFilters {
  type?: string[]
  category?: string[]
  dateRange?: {
    from: Date
    to: Date
  }
}

// Generic utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>

// API error response
export interface ApiError {
  statusCode: number
  message: string
  error?: string
  timestamp: string
  path: string
}
