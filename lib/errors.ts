// Error handling utilities for production-ready error management
import React from 'react';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly context?: Record<string, any>;

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true,
    context?: Record<string, any>
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.context = context;

    // Maintains proper stack trace for where our error was thrown
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, field?: string) {
    super(message, 400, true, { field, type: 'validation' });
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 401, true, { type: 'authentication' });
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(message, 403, true, { type: 'authorization' });
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 404, true, { type: 'not_found' });
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Rate limit exceeded') {
    super(message, 429, true, { type: 'rate_limit' });
  }
}

export class ExternalServiceError extends AppError {
  constructor(service: string, originalError?: Error) {
    super(
      `External service error: ${service}`,
      502,
      true,
      { 
        type: 'external_service',
        service,
        originalMessage: originalError?.message
      }
    );
  }
}

// Error handler utility for async operations
export const asyncHandler = (fn: Function) => {
  return (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Error response formatter
export const formatError = (error: Error) => {
  if (error instanceof AppError) {
    return {
      success: false,
      error: {
        message: error.message,
        statusCode: error.statusCode,
        type: error.context?.type || 'application_error',
        ...(process.env.NODE_ENV === 'development' && {
          stack: error.stack,
          context: error.context
        })
      }
    };
  }

  // Generic error
  return {
    success: false,
    error: {
      message: process.env.NODE_ENV === 'development' 
        ? error.message 
        : 'An unexpected error occurred',
      statusCode: 500,
      type: 'internal_error',
      ...(process.env.NODE_ENV === 'development' && {
        stack: error.stack
      })
    }
  };
};

// Client-side error handler hook
export const useErrorHandler = () => {
  const handleError = (error: Error, errorInfo?: any) => {
    // Log error
    console.error('Error caught by error handler:', error, errorInfo);
    
    // Send to error reporting service in production
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to Sentry, LogRocket, etc.
      // errorReportingService.captureException(error, errorInfo);
    }
  };

  return { handleError };
};
