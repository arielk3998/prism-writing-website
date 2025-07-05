/**
 * Advanced API Resilience & Failover System
 * 
 * Implements Plan A-Z failover strategies to ensure zero downtime.
 * Automatically detects API failures and switches to alternative providers.
 * 
 * @version 2.0.0
 * @author Prism Writing Enterprise System
 */

export interface APIProvider {
  id: string;
  name: string;
  priority: number;
  endpoint: string;
  apiKey?: string;
  healthCheck: string;
  capabilities: string[];
  rateLimits: {
    requestsPerMinute: number;
    requestsPerDay: number;
  };
  reliability: number; // 0-100 score
  lastHealthCheck: Date;
  status: 'active' | 'degraded' | 'failed' | 'maintenance';
  failureCount: number;
  successCount: number;
}

export interface ServiceConfig {
  serviceName: string;
  providers: APIProvider[];
  currentProvider: string;
  fallbackStrategy: 'sequential' | 'load_balanced' | 'performance_based';
  autoFailover: boolean;
  healthCheckInterval: number; // minutes
  maxRetries: number;
  circuitBreakerThreshold: number;
}

export class APIResilienceSystem {
  private services: Map<string, ServiceConfig> = new Map();
  private healthCheckIntervals: Map<string, NodeJS.Timeout> = new Map();
  private circuitBreakers: Map<string, { isOpen: boolean; failureCount: number; lastFailure: Date }> = new Map();

  constructor() {
    this.initializeServices();
    this.startHealthMonitoring();
  }

  /**
   * Initialize all service configurations with multiple providers
   */
  private initializeServices(): void {
    // Email Service Configuration
    this.registerService({
      serviceName: 'email',
      providers: [
        {
          id: 'resend',
          name: 'Resend',
          priority: 1,
          endpoint: 'https://api.resend.com',
          healthCheck: 'https://api.resend.com/domains',
          capabilities: ['smtp', 'api', 'templates', 'analytics'],
          rateLimits: { requestsPerMinute: 100, requestsPerDay: 10000 },
          reliability: 98,
          lastHealthCheck: new Date(),
          status: 'active',
          failureCount: 0,
          successCount: 0
        },
        {
          id: 'sendgrid',
          name: 'SendGrid',
          priority: 2,
          endpoint: 'https://api.sendgrid.com',
          healthCheck: 'https://api.sendgrid.com/v3/user/profile',
          capabilities: ['smtp', 'api', 'templates', 'analytics'],
          rateLimits: { requestsPerMinute: 200, requestsPerDay: 40000 },
          reliability: 97,
          lastHealthCheck: new Date(),
          status: 'active',
          failureCount: 0,
          successCount: 0
        },
        {
          id: 'nodemailer_smtp',
          name: 'SMTP Fallback',
          priority: 3,
          endpoint: 'smtp://smtp.gmail.com:587',
          healthCheck: 'smtp://smtp.gmail.com:587',
          capabilities: ['smtp'],
          rateLimits: { requestsPerMinute: 50, requestsPerDay: 2000 },
          reliability: 95,
          lastHealthCheck: new Date(),
          status: 'active',
          failureCount: 0,
          successCount: 0
        }
      ],
      currentProvider: 'resend',
      fallbackStrategy: 'sequential',
      autoFailover: true,
      healthCheckInterval: 5,
      maxRetries: 3,
      circuitBreakerThreshold: 5
    });

    // Translation Service Configuration
    this.registerService({
      serviceName: 'translation',
      providers: [
        {
          id: 'openai',
          name: 'OpenAI GPT-4',
          priority: 1,
          endpoint: 'https://api.openai.com',
          healthCheck: 'https://api.openai.com/v1/models',
          capabilities: ['translation', 'context_aware', 'professional'],
          rateLimits: { requestsPerMinute: 60, requestsPerDay: 5000 },
          reliability: 96,
          lastHealthCheck: new Date(),
          status: 'active',
          failureCount: 0,
          successCount: 0
        },
        {
          id: 'google_translate',
          name: 'Google Translate',
          priority: 2,
          endpoint: 'https://translation.googleapis.com',
          healthCheck: 'https://translation.googleapis.com/language/translate/v2/languages',
          capabilities: ['translation', 'detection'],
          rateLimits: { requestsPerMinute: 100, requestsPerDay: 100000 },
          reliability: 99,
          lastHealthCheck: new Date(),
          status: 'active',
          failureCount: 0,
          successCount: 0
        },
        {
          id: 'azure_translator',
          name: 'Azure Translator',
          priority: 3,
          endpoint: 'https://api.cognitive.microsofttranslator.com',
          healthCheck: 'https://api.cognitive.microsofttranslator.com/languages',
          capabilities: ['translation', 'detection', 'transliteration'],
          rateLimits: { requestsPerMinute: 120, requestsPerDay: 50000 },
          reliability: 98,
          lastHealthCheck: new Date(),
          status: 'active',
          failureCount: 0,
          successCount: 0
        }
      ],
      currentProvider: 'openai',
      fallbackStrategy: 'performance_based',
      autoFailover: true,
      healthCheckInterval: 10,
      maxRetries: 2,
      circuitBreakerThreshold: 3
    });

    // Storage Service Configuration
    this.registerService({
      serviceName: 'storage',
      providers: [
        {
          id: 'vercel_blob',
          name: 'Vercel Blob Storage',
          priority: 1,
          endpoint: 'https://blob.vercel-storage.com',
          healthCheck: 'https://blob.vercel-storage.com',
          capabilities: ['file_storage', 'cdn', 'automatic_optimization'],
          rateLimits: { requestsPerMinute: 1000, requestsPerDay: 100000 },
          reliability: 99,
          lastHealthCheck: new Date(),
          status: 'active',
          failureCount: 0,
          successCount: 0
        },
        {
          id: 'aws_s3',
          name: 'Amazon S3',
          priority: 2,
          endpoint: 'https://s3.amazonaws.com',
          healthCheck: 'https://s3.amazonaws.com',
          capabilities: ['file_storage', 'cdn', 'versioning'],
          rateLimits: { requestsPerMinute: 2000, requestsPerDay: 1000000 },
          reliability: 99.9,
          lastHealthCheck: new Date(),
          status: 'active',
          failureCount: 0,
          successCount: 0
        },
        {
          id: 'cloudflare_r2',
          name: 'Cloudflare R2',
          priority: 3,
          endpoint: 'https://api.cloudflare.com/client/v4/accounts',
          healthCheck: 'https://api.cloudflare.com/client/v4/user',
          capabilities: ['file_storage', 'cdn', 'edge_computing'],
          rateLimits: { requestsPerMinute: 1200, requestsPerDay: 500000 },
          reliability: 99.8,
          lastHealthCheck: new Date(),
          status: 'active',
          failureCount: 0,
          successCount: 0
        }
      ],
      currentProvider: 'vercel_blob',
      fallbackStrategy: 'load_balanced',
      autoFailover: true,
      healthCheckInterval: 15,
      maxRetries: 3,
      circuitBreakerThreshold: 4
    });
  }

  /**
   * Register a new service configuration
   */
  public registerService(config: ServiceConfig): void {
    this.services.set(config.serviceName, config);
    this.circuitBreakers.set(config.serviceName, {
      isOpen: false,
      failureCount: 0,
      lastFailure: new Date(0)
    });
  }

  /**
   * Execute API call with automatic failover
   */
  public async executeWithFailover<T>(
    serviceName: string,
    operation: (provider: APIProvider) => Promise<T>,
    options: { timeout?: number; retries?: number } = {}
  ): Promise<T> {
    const service = this.services.get(serviceName);
    if (!service) {
      throw new Error(`Service ${serviceName} not found`);
    }

    const { timeout = 30000, retries = service.maxRetries } = options;
    let lastError: Error | null = null;

    // Check circuit breaker
    const circuitBreaker = this.circuitBreakers.get(serviceName);
    if (circuitBreaker?.isOpen) {
      if (Date.now() - circuitBreaker.lastFailure.getTime() < 60000) { // 1 minute cooldown
        throw new Error(`Circuit breaker open for ${serviceName}`);
      } else {
        // Reset circuit breaker after cooldown
        circuitBreaker.isOpen = false;
        circuitBreaker.failureCount = 0;
      }
    }

    // Get provider order based on strategy
    const providerOrder = this.getProviderOrder(service);

    for (const provider of providerOrder) {
      if (provider.status === 'failed') continue;

      for (let attempt = 1; attempt <= retries; attempt++) {
        try {
          const result = await Promise.race([
            operation(provider),
            new Promise<never>((_, reject) => 
              setTimeout(() => reject(new Error('Timeout')), timeout)
            )
          ]);

          // Success - update metrics
          provider.successCount++;
          provider.status = 'active';
          service.currentProvider = provider.id;
          
          // Reset circuit breaker on success
          if (circuitBreaker) {
            circuitBreaker.failureCount = 0;
            circuitBreaker.isOpen = false;
          }

          this.logSuccess(serviceName, provider.id, attempt);
          return result;

        } catch (error) {
          lastError = error as Error;
          provider.failureCount++;
          
          this.logFailure(serviceName, provider.id, attempt, lastError.message);

          if (attempt === retries) {
            // Mark provider as degraded after max retries
            provider.status = 'degraded';
            
            // Update circuit breaker
            if (circuitBreaker) {
              circuitBreaker.failureCount++;
              if (circuitBreaker.failureCount >= service.circuitBreakerThreshold) {
                circuitBreaker.isOpen = true;
                circuitBreaker.lastFailure = new Date();
              }
            }
            break;
          }

          // Progressive backoff
          await this.sleep(Math.pow(2, attempt) * 1000);
        }
      }
    }

    // All providers failed
    this.logCriticalFailure(serviceName, lastError?.message || 'All providers failed');
    throw new Error(`All providers failed for ${serviceName}: ${lastError?.message}`);
  }

  /**
   * Get provider order based on strategy
   */
  private getProviderOrder(service: ServiceConfig): APIProvider[] {
    const availableProviders = service.providers.filter(p => p.status !== 'failed');

    switch (service.fallbackStrategy) {
      case 'sequential':
        return availableProviders.sort((a, b) => a.priority - b.priority);
      
      case 'performance_based':
        return availableProviders.sort((a, b) => {
          const aScore = (a.reliability * 0.7) + ((a.successCount / Math.max(a.successCount + a.failureCount, 1)) * 0.3);
          const bScore = (b.reliability * 0.7) + ((b.successCount / Math.max(b.successCount + b.failureCount, 1)) * 0.3);
          return bScore - aScore;
        });
      
      case 'load_balanced':
        // Simple round-robin based on recent usage
        return availableProviders.sort(() => Math.random() - 0.5);
      
      default:
        return availableProviders.sort((a, b) => a.priority - b.priority);
    }
  }

  /**
   * Start continuous health monitoring
   */
  private startHealthMonitoring(): void {
    for (const [serviceName, service] of this.services) {
      const interval = setInterval(async () => {
        await this.performHealthChecks(serviceName);
      }, service.healthCheckInterval * 60 * 1000);

      this.healthCheckIntervals.set(serviceName, interval);
    }
  }

  /**
   * Perform health checks for all providers of a service
   */
  private async performHealthChecks(serviceName: string): Promise<void> {
    const service = this.services.get(serviceName);
    if (!service) return;

    const healthCheckPromises = service.providers.map(async (provider) => {
      try {
        const response = await fetch(provider.healthCheck, { 
          method: 'HEAD',
          signal: AbortSignal.timeout(10000) // 10 second timeout
        });

        if (response.ok) {
          provider.status = 'active';
          provider.lastHealthCheck = new Date();
        } else {
          provider.status = 'degraded';
        }
      } catch (error) {
        provider.status = 'failed';
        this.logHealthCheckFailure(serviceName, provider.id, error as Error);
      }
    });

    await Promise.allSettled(healthCheckPromises);
  }

  /**
   * Get current system status
   */
  public getSystemStatus(): Record<string, any> {
    const status: Record<string, any> = {};

    for (const [serviceName, service] of this.services) {
      const activeProviders = service.providers.filter(p => p.status === 'active').length;
      const totalProviders = service.providers.length;
      
      status[serviceName] = {
        currentProvider: service.currentProvider,
        availableProviders: activeProviders,
        totalProviders,
        healthStatus: activeProviders > 0 ? 'healthy' : 'critical',
        circuitBreaker: this.circuitBreakers.get(serviceName),
        providers: service.providers.map(p => ({
          id: p.id,
          name: p.name,
          status: p.status,
          reliability: p.reliability,
          successRate: p.successCount / Math.max(p.successCount + p.failureCount, 1),
          lastHealthCheck: p.lastHealthCheck
        }))
      };
    }

    return status;
  }

  /**
   * Manual failover to specific provider
   */
  public async forceFailover(serviceName: string, providerId: string): Promise<boolean> {
    const service = this.services.get(serviceName);
    if (!service) return false;

    const provider = service.providers.find(p => p.id === providerId);
    if (!provider || provider.status === 'failed') return false;

    service.currentProvider = providerId;
    this.logManualFailover(serviceName, providerId);
    return true;
  }

  // Logging methods
  private logSuccess(serviceName: string, providerId: string, attempt: number): void {
    console.log(`✅ [${serviceName}] Success with ${providerId} on attempt ${attempt}`);
  }

  private logFailure(serviceName: string, providerId: string, attempt: number, error: string): void {
    console.warn(`⚠️ [${serviceName}] Failure with ${providerId} on attempt ${attempt}: ${error}`);
  }

  private logCriticalFailure(serviceName: string, error: string): void {
    console.error(`🚨 [${serviceName}] CRITICAL: All providers failed - ${error}`);
  }

  private logHealthCheckFailure(serviceName: string, providerId: string, error: Error): void {
    console.warn(`🔍 [${serviceName}] Health check failed for ${providerId}: ${error.message}`);
  }

  private logManualFailover(serviceName: string, providerId: string): void {
    console.info(`🔄 [${serviceName}] Manual failover to ${providerId}`);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Cleanup method
   */
  public destroy(): void {
    for (const interval of this.healthCheckIntervals.values()) {
      clearInterval(interval);
    }
    this.healthCheckIntervals.clear();
  }
}

export default APIResilienceSystem;
