/**
 * Validation Schemas
 * Zod schemas for form validation and type safety
 */

import { z } from 'zod'

// File upload validation constants
export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
export const ACCEPTED_FILE_TYPES = [
  // Text documents
  '.doc', '.docx', '.pdf', '.txt', '.rtf', '.odt',
  // Spreadsheets  
  '.xls', '.xlsx', '.csv', '.ods',
  // CAD files
  '.dwg', '.dxf', '.step', '.stp', '.iges', '.igs', '.stl',
  // Images and media
  '.png', '.jpg', '.jpeg', '.gif', '.svg', '.bmp', '.tiff',
  '.mp4', '.avi', '.mov', '.wmv',
  // Presentations
  '.ppt', '.pptx', '.odp',
  // Archives
  '.zip', '.rar', '.7z', '.tar', '.gz',
  // Other technical formats
  '.json', '.xml', '.yaml', '.yml', '.md', '.html', '.htm'
]

/**
 * File validation helper
 */
const fileSchema = z.object({
  name: z.string(),
  size: z.number().max(MAX_FILE_SIZE, 'File size must be less than 10MB'),
  type: z.string(),
})

/**
 * Contact form validation schema
 */
export const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters'),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  company: z
    .string()
    .optional(),
  projectType: z
    .string()
    .optional(),
  timeline: z
    .string()
    .optional(),
  budget: z
    .string()
    .optional(),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
  files: z
    .array(fileSchema)
    .max(5, 'Maximum 5 files allowed')
    .optional(),
  newsletter: z
    .boolean()
    .optional()
    .default(false),
})

/**
 * Newsletter subscription schema
 */
export const newsletterSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address'),
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .optional(),
})

/**
 * Comment schema (for future blog functionality)
 */
export const commentSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  message: z
    .string()
    .min(10, 'Comment must be at least 10 characters')
    .max(500, 'Comment must be less than 500 characters'),
  website: z
    .string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
})

// Export TypeScript types
export type ContactFormData = z.infer<typeof contactFormSchema>
export type NewsletterData = z.infer<typeof newsletterSchema>
export type CommentData = z.infer<typeof commentSchema>
export type FileData = z.infer<typeof fileSchema>
