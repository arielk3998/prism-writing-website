// Environment configuration and validation
// Validates environment variables and provides type-safe access

interface EnvironmentConfig {
  // App Configuration
  NODE_ENV: 'development' | 'production' | 'test';
  NEXT_PUBLIC_APP_URL: string;
  NEXT_PUBLIC_APP_NAME: string;
  
  // Email Configuration
  SMTP_HOST?: string;
  SMTP_PORT?: number;
  SMTP_USER?: string;
  SMTP_PASS?: string;
  CONTACT_EMAIL: string;
  
  // Payment Configuration
  STRIPE_PUBLISHABLE_KEY?: string;
  STRIPE_SECRET_KEY?: string;
  STRIPE_WEBHOOK_SECRET?: string;
  
  // Analytics
  NEXT_PUBLIC_GOOGLE_ANALYTICS_ID?: string;
  NEXT_PUBLIC_HOTJAR_ID?: string;
  
  // Error Reporting
  SENTRY_DSN?: string;
  
  // Database
  DATABASE_URL?: string;
  
  // Rate Limiting
  RATE_LIMIT_MAX?: number;
  RATE_LIMIT_WINDOW?: number;
  
  // Security
  JWT_SECRET?: string;
  ENCRYPTION_KEY?: string;
  
  // Feature Flags
  NEXT_PUBLIC_ENABLE_PWA: boolean;
  NEXT_PUBLIC_ENABLE_ANALYTICS: boolean;
  NEXT_PUBLIC_ENABLE_CHAT: boolean;
}

class Environment {
  private static instance: Environment;
  private config: EnvironmentConfig;
  private isValid: boolean = false;

  private constructor() {
    this.config = this.loadEnvironmentVariables();
    this.validateConfiguration();
  }

  public static getInstance(): Environment {
    if (!Environment.instance) {
      Environment.instance = new Environment();
    }
    return Environment.instance;
  }

  private loadEnvironmentVariables(): EnvironmentConfig {
    const getEnvVar = (key: string, defaultValue?: string): string => {
      const value = process.env[key] || defaultValue;
      if (!value) {
        console.warn(`Environment variable ${key} is not set`);
      }
      return value || '';
    };

    const getBooleanEnv = (key: string, defaultValue: boolean = false): boolean => {
      const value = process.env[key];
      if (!value) return defaultValue;
      return value.toLowerCase() === 'true' || value === '1';
    };

    const getNumberEnv = (key: string, defaultValue?: number): number | undefined => {
      const value = process.env[key];
      if (!value) return defaultValue;
      const parsed = parseInt(value, 10);
      return isNaN(parsed) ? defaultValue : parsed;
    };

    return {
      // App Configuration
      NODE_ENV: (process.env.NODE_ENV || 'development') as 'development' | 'production' | 'test',
      NEXT_PUBLIC_APP_URL: getEnvVar('NEXT_PUBLIC_APP_URL', 'http://localhost:3000'),
      NEXT_PUBLIC_APP_NAME: getEnvVar('NEXT_PUBLIC_APP_NAME', 'Prism Writing'),
      
      // Email Configuration
      SMTP_HOST: getEnvVar('SMTP_HOST'),
      SMTP_PORT: getNumberEnv('SMTP_PORT', 587),
      SMTP_USER: getEnvVar('SMTP_USER'),
      SMTP_PASS: getEnvVar('SMTP_PASS'),
      CONTACT_EMAIL: getEnvVar('CONTACT_EMAIL', 'contact@prismwriting.com'),
      
      // Payment Configuration
      STRIPE_PUBLISHABLE_KEY: getEnvVar('STRIPE_PUBLISHABLE_KEY'),
      STRIPE_SECRET_KEY: getEnvVar('STRIPE_SECRET_KEY'),
      STRIPE_WEBHOOK_SECRET: getEnvVar('STRIPE_WEBHOOK_SECRET'),
      
      // Analytics
      NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: getEnvVar('NEXT_PUBLIC_GOOGLE_ANALYTICS_ID'),
      NEXT_PUBLIC_HOTJAR_ID: getEnvVar('NEXT_PUBLIC_HOTJAR_ID'),
      
      // Error Reporting
      SENTRY_DSN: getEnvVar('SENTRY_DSN'),
      
      // Database
      DATABASE_URL: getEnvVar('DATABASE_URL'),
      
      // Rate Limiting
      RATE_LIMIT_MAX: getNumberEnv('RATE_LIMIT_MAX', 100),
      RATE_LIMIT_WINDOW: getNumberEnv('RATE_LIMIT_WINDOW', 60),
      
      // Security
      JWT_SECRET: getEnvVar('JWT_SECRET'),
      ENCRYPTION_KEY: getEnvVar('ENCRYPTION_KEY'),
      
      // Feature Flags
      NEXT_PUBLIC_ENABLE_PWA: getBooleanEnv('NEXT_PUBLIC_ENABLE_PWA', true),
      NEXT_PUBLIC_ENABLE_ANALYTICS: getBooleanEnv('NEXT_PUBLIC_ENABLE_ANALYTICS', false),
      NEXT_PUBLIC_ENABLE_CHAT: getBooleanEnv('NEXT_PUBLIC_ENABLE_CHAT', false),
    };
  }

  private validateConfiguration(): void {
    const errors: string[] = [];

    // Required in production
    if (this.config.NODE_ENV === 'production') {
      if (!this.config.NEXT_PUBLIC_APP_URL || this.config.NEXT_PUBLIC_APP_URL.includes('localhost')) {
        errors.push('NEXT_PUBLIC_APP_URL must be set to production URL');
      }
      
      if (!this.config.JWT_SECRET) {
        errors.push('JWT_SECRET is required in production');
      }
      
      if (!this.config.ENCRYPTION_KEY) {
        errors.push('ENCRYPTION_KEY is required in production');
      }
    }

    // Email validation
    if (this.config.SMTP_HOST && (!this.config.SMTP_USER || !this.config.SMTP_PASS)) {
      errors.push('SMTP_USER and SMTP_PASS are required when SMTP_HOST is set');
    }

    // Stripe validation
    const hasStripePublic = !!this.config.STRIPE_PUBLISHABLE_KEY;
    const hasStripeSecret = !!this.config.STRIPE_SECRET_KEY;
    if (hasStripePublic !== hasStripeSecret) {
      errors.push('Both STRIPE_PUBLISHABLE_KEY and STRIPE_SECRET_KEY must be set together');
    }

    // URL validation
    try {
      new URL(this.config.NEXT_PUBLIC_APP_URL);
    } catch {
      errors.push('NEXT_PUBLIC_APP_URL must be a valid URL');
    }

    if (errors.length > 0) {
      console.error('Environment configuration errors:');
      errors.forEach(error => console.error(`  - ${error}`));
      
      if (this.config.NODE_ENV === 'production') {
        throw new Error('Invalid environment configuration for production');
      }
    } else {
      this.isValid = true;
    }
  }

  // Public getters
  public get(key: keyof EnvironmentConfig): any {
    if (!this.isValid && this.config.NODE_ENV === 'production') {
      throw new Error('Environment not properly configured');
    }
    return this.config[key];
  }

  public isProduction(): boolean {
    return this.config.NODE_ENV === 'production';
  }

  public isDevelopment(): boolean {
    return this.config.NODE_ENV === 'development';
  }

  public isTest(): boolean {
    return this.config.NODE_ENV === 'test';
  }

  public isFeatureEnabled(feature: 'PWA' | 'ANALYTICS' | 'CHAT'): boolean {
    switch (feature) {
      case 'PWA':
        return this.config.NEXT_PUBLIC_ENABLE_PWA;
      case 'ANALYTICS':
        return this.config.NEXT_PUBLIC_ENABLE_ANALYTICS;
      case 'CHAT':
        return this.config.NEXT_PUBLIC_ENABLE_CHAT;
      default:
        return false;
    }
  }

  public getAppUrl(): string {
    return this.config.NEXT_PUBLIC_APP_URL;
  }

  public getContactEmail(): string {
    return this.config.CONTACT_EMAIL;
  }

  public hasEmailConfiguration(): boolean {
    return !!(this.config.SMTP_HOST && this.config.SMTP_USER && this.config.SMTP_PASS);
  }

  public hasStripeConfiguration(): boolean {
    return !!(this.config.STRIPE_PUBLISHABLE_KEY && this.config.STRIPE_SECRET_KEY);
  }

  public hasAnalyticsConfiguration(): boolean {
    return !!(this.config.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && this.config.NEXT_PUBLIC_ENABLE_ANALYTICS);
  }

  public getConfiguration(): Readonly<EnvironmentConfig> {
    return Object.freeze({ ...this.config });
  }
}

// Export singleton instance
export const env = Environment.getInstance();

// Export convenient getters
export const isProduction = () => env.isProduction();
export const isDevelopment = () => env.isDevelopment();
export const isTest = () => env.isTest();
export const getAppUrl = () => env.getAppUrl();
export const getContactEmail = () => env.getContactEmail();

export default env;
