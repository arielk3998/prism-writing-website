// Production-ready logging utility
// Replaces console.log statements with proper logging

export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3
}

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, any>;
  error?: Error;
  userId?: string;
  sessionId?: string;
}

class Logger {
  private static instance: Logger;
  private logLevel: LogLevel;
  private isDevelopment: boolean;

  private constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development';
    this.logLevel = this.isDevelopment ? LogLevel.DEBUG : LogLevel.INFO;
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatMessage(entry: LogEntry): string {
    const { level, message, timestamp, context, error } = entry;
    const levelName = LogLevel[level];
    
    let formatted = `[${timestamp}] ${levelName}: ${message}`;
    
    if (context && Object.keys(context).length > 0) {
      formatted += ` | Context: ${JSON.stringify(context)}`;
    }
    
    if (error) {
      formatted += ` | Error: ${error.message}`;
      if (this.isDevelopment && error.stack) {
        formatted += `\nStack: ${error.stack}`;
      }
    }
    
    return formatted;
  }

  private shouldLog(level: LogLevel): boolean {
    return level <= this.logLevel;
  }

  private log(level: LogLevel, message: string, context?: Record<string, any>, error?: Error): void {
    if (!this.shouldLog(level)) return;

    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
      error,
      userId: this.getCurrentUserId(),
      sessionId: this.getSessionId()
    };

    const formatted = this.formatMessage(entry);

    // In development, use console methods
    if (this.isDevelopment) {
      switch (level) {
        case LogLevel.ERROR:
          console.error(formatted);
          break;
        case LogLevel.WARN:
          console.warn(formatted);
          break;
        case LogLevel.INFO:
          console.info(formatted);
          break;
        case LogLevel.DEBUG:
          console.debug(formatted);
          break;
      }
    } else {
      // In production, send to logging service
      this.sendToLoggingService(entry);
    }
  }

  private getCurrentUserId(): string | undefined {
    // Implementation would depend on your auth system
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('userId') || undefined;
    }
    return undefined;
  }

  private getSessionId(): string | undefined {
    // Implementation would depend on your session management
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('sessionId') || undefined;
    }
    return undefined;
  }

  private async sendToLoggingService(entry: LogEntry): Promise<void> {
    try {
      // In production, you would send logs to a service like:
      // - DataDog
      // - New Relic
      // - CloudWatch
      // - Custom logging endpoint
      
      await fetch('/api/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
      });
    } catch (error) {
      // Fallback to console if logging service fails
      console.error('Failed to send log to service:', error);
      console.error('Original log:', this.formatMessage(entry));
    }
  }

  // Public methods
  public error(message: string, context?: Record<string, any>, error?: Error): void {
    this.log(LogLevel.ERROR, message, context, error);
  }

  public warn(message: string, context?: Record<string, any>): void {
    this.log(LogLevel.WARN, message, context);
  }

  public info(message: string, context?: Record<string, any>): void {
    this.log(LogLevel.INFO, message, context);
  }

  public debug(message: string, context?: Record<string, any>): void {
    this.log(LogLevel.DEBUG, message, context);
  }

  // Performance logging
  public performance(metric: string, value: number, context?: Record<string, any>): void {
    this.info(`Performance: ${metric}`, { 
      metric, 
      value, 
      unit: 'ms',
      ...context 
    });
  }

  // Security logging
  public security(event: string, context?: Record<string, any>): void {
    this.warn(`Security: ${event}`, {
      type: 'security_event',
      ...context
    });
  }

  // Business logic logging
  public business(event: string, context?: Record<string, any>): void {
    this.info(`Business: ${event}`, {
      type: 'business_event',
      ...context
    });
  }

  // API request logging
  public api(method: string, url: string, status: number, duration: number, context?: Record<string, any>): void {
    this.info(`API: ${method} ${url}`, {
      method,
      url,
      status,
      duration,
      type: 'api_request',
      ...context
    });
  }
}

// Export singleton instance
export const logger = Logger.getInstance();

// Export convenience functions for easier migration from console.log
export const log = {
  error: (message: string, context?: Record<string, any>, error?: Error) => 
    logger.error(message, context, error),
  warn: (message: string, context?: Record<string, any>) => 
    logger.warn(message, context),
  info: (message: string, context?: Record<string, any>) => 
    logger.info(message, context),
  debug: (message: string, context?: Record<string, any>) => 
    logger.debug(message, context),
  performance: (metric: string, value: number, context?: Record<string, any>) => 
    logger.performance(metric, value, context),
  security: (event: string, context?: Record<string, any>) => 
    logger.security(event, context),
  business: (event: string, context?: Record<string, any>) => 
    logger.business(event, context),
  api: (method: string, url: string, status: number, duration: number, context?: Record<string, any>) => 
    logger.api(method, url, status, duration, context)
};

export default logger;
