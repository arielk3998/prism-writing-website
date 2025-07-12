// 📊 Advanced Analytics Engine with ML-Powered Insights
// Phase 4: Production Features

import { prisma } from './database';

export interface AnalyticsData {
  id: string;
  timestamp: Date;
  event: string;
  userId?: string;
  metadata?: Record<string, unknown>;
}

export interface BusinessMetrics {
  revenue: {
    total: number;
    recurring: number;
    growth: number;
    forecast: number;
  };
  users: {
    total: number;
    active: number;
    churn: number;
    retention: number;
  };
  projects: {
    total: number;
    completed: number;
    averageTime: number;
    successRate: number;
  };
  performance: {
    pageViews: number;
    sessionDuration: number;
    bounceRate: number;
    conversion: number;
  };
}

export interface MLInsights {
  predictions: {
    revenue: number[];
    userGrowth: number[];
    churnRisk: { userId: string; risk: number; factors: string[] }[];
  };
  recommendations: {
    priority: 'high' | 'medium' | 'low';
    category: string;
    suggestion: string;
    impact: string;
  }[];
  anomalies: {
    metric: string;
    value: number;
    expected: number;
    confidence: number;
  }[];
}

class AdvancedAnalytics {
  // 📈 Track Events
  async trackEvent(event: string, userId?: string, metadata?: Record<string, unknown>) {
    try {
      await prisma.analyticsEvent.create({
        data: {
          eventType: event,
          userId,
          eventData: (metadata || {}) as any,
          timestamp: new Date(),
        },
      });
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  }

  // 📊 Generate Business Metrics
  async getBusinessMetrics(timeRange = '30d'): Promise<BusinessMetrics> {
    const endDate = new Date();
    const startDate = new Date();
    
    switch (timeRange) {
      case '7d':
        startDate.setDate(endDate.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(endDate.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(endDate.getDate() - 90);
        break;
      case '1y':
        startDate.setFullYear(endDate.getFullYear() - 1);
        break;
    }

    // Revenue Metrics
    const revenue = await this.calculateRevenueMetrics(startDate, endDate);
    
    // User Metrics
    const users = await this.calculateUserMetrics(startDate, endDate);
    
    // Project Metrics
    const projects = await this.calculateProjectMetrics(startDate, endDate);
    
    // Performance Metrics
    const performance = await this.calculatePerformanceMetrics(startDate, endDate);

    return {
      revenue,
      users,
      projects,
      performance,
    };
  }

  // 🤖 Generate ML-Powered Insights
  async generateMLInsights(): Promise<MLInsights> {
    const historical = await this.getHistoricalData();
    
    return {
      predictions: await this.generatePredictions(historical),
      recommendations: await this.generateRecommendations(historical),
      anomalies: await this.detectAnomalies(historical),
    };
  }

  // 💰 Revenue Analytics
  private async calculateRevenueMetrics(startDate: Date, endDate: Date) {
    const payments = await prisma.payment.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        status: 'COMPLETED',
      },
    });

    // TODO: Add subscription model to schema if needed
    // const subscriptions = await prisma.subscription.findMany({
    //   where: {
    //     status: 'active',
    //   },
    //   include: {
    //     payments: true,
    //   },
    // });

    const total = payments.reduce((sum, payment) => sum + Number(payment.amount), 0);
    // TODO: Enable when subscription model is available
    const recurring = 0; // subscriptions.reduce((sum, sub) => {
    //   const monthlyRevenue = sub.payments
    //     .filter(p => p.createdAt >= startDate && p.createdAt <= endDate)
    //     .reduce((pSum, payment) => pSum + payment.amount, 0) / 100;
    //   return sum + monthlyRevenue;
    // }, 0);

    // Calculate growth rate
    const previousPeriod = await this.getPreviousPeriodRevenue(startDate, endDate);
    const growth = previousPeriod > 0 ? ((total - previousPeriod) / previousPeriod) * 100 : 0;

    // Simple linear forecast
    const forecast = total * (1 + growth / 100);

    return { total, recurring, growth, forecast };
  }

  // 👥 User Analytics
  private async calculateUserMetrics(startDate: Date, endDate: Date) {
    const totalUsers = await prisma.user.count();
    
    const activeUsers = await prisma.user.count({
      where: {
        lastActiveAt: {
          gte: startDate,
        },
      },
    });

    const churnedUsers = await prisma.user.count({
      where: {
        lastActiveAt: {
          lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        },
      },
    });

    const churn = totalUsers > 0 ? (churnedUsers / totalUsers) * 100 : 0;
    const retention = 100 - churn;

    return { total: totalUsers, active: activeUsers, churn, retention };
  }

  // 📝 Project Analytics
  private async calculateProjectMetrics(startDate: Date, endDate: Date) {
    const projects = await prisma.project.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const total = projects.length;
    const completed = projects.filter(p => p.status === 'COMPLETED').length;
    
    const completedProjects = projects.filter(p => p.status === 'COMPLETED' && p.updatedAt);
    const averageTime = completedProjects.length > 0 
      ? completedProjects.reduce((sum, p) => {
          const duration = p.updatedAt!.getTime() - p.createdAt.getTime();
          return sum + duration;
        }, 0) / completedProjects.length / (1000 * 60 * 60 * 24) // Convert to days
      : 0;

    const successRate = total > 0 ? (completed / total) * 100 : 0;

    return { total, completed, averageTime, successRate };
  }

  // 📊 Performance Analytics
  private async calculatePerformanceMetrics(startDate: Date, endDate: Date) {
    const events = await prisma.analyticsEvent.findMany({
      where: {
        timestamp: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    const pageViews = events.filter(e => e.eventType === 'page_view').length;
    const sessions = events.filter(e => e.eventType === 'session_start').length;
    const conversions = events.filter(e => e.eventType === 'conversion').length;

    // Calculate session duration (simplified)
    const sessionDuration = events
      .filter(e => e.eventType === 'session_end')
      .reduce((sum, e) => {
        const data = e.eventData as any;
        return sum + (data?.duration || 0);
      }, 0) / sessions || 0;

    const bounceRate = sessions > 0 ? (events.filter(e => e.eventType === 'bounce').length / sessions) * 100 : 0;
    const conversion = pageViews > 0 ? (conversions / pageViews) * 100 : 0;

    return { pageViews, sessionDuration, bounceRate, conversion };
  }

  // 🔮 Predictive Analytics
  private async generatePredictions(_historical: BusinessMetrics): Promise<MLInsights['predictions']> {
    // Simplified linear regression for revenue prediction
    const revenue = await this.generateRevenueForecast();
    const userGrowth = await this.generateUserGrowthForecast();
    const churnRisk = await this.identifyChurnRisk();

    return { revenue, userGrowth, churnRisk };
  }

  // 💡 Generate Recommendations
  private async generateRecommendations(historical: BusinessMetrics): Promise<MLInsights['recommendations']> {
    const recommendations = [];

    // Revenue optimization recommendations
    const revenueGrowth = historical.revenue?.growth || 0;
    if (revenueGrowth < 10) {
      recommendations.push({
        priority: 'high' as const,
        category: 'Revenue',
        suggestion: 'Implement upselling strategies for existing customers',
        impact: 'Could increase revenue by 15-25%',
      });
    }

    // User engagement recommendations
    const retention = historical.users?.retention || 0;
    if (retention < 80) {
      recommendations.push({
        priority: 'high' as const,
        category: 'Retention',
        suggestion: 'Implement onboarding flow and engagement campaigns',
        impact: 'Could improve retention by 10-15%',
      });
    }

    // Performance recommendations
    const bounceRate = historical.performance?.bounceRate || 0;
    if (bounceRate > 60) {
      recommendations.push({
        priority: 'medium' as const,
        category: 'Performance',
        suggestion: 'Optimize page load times and improve UX',
        impact: 'Could reduce bounce rate by 20-30%',
      });
    }

    return recommendations;
  }

  // 🚨 Anomaly Detection
  private async detectAnomalies(historical: BusinessMetrics): Promise<MLInsights['anomalies']> {
    const anomalies = [];

    // Check for revenue anomalies
    const avgRevenue = historical.revenue?.total || 0;
    const revenueStdDev = avgRevenue * 0.2; // Simplified
    
    if (Math.abs(avgRevenue - historical.revenue?.forecast) > revenueStdDev) {
      anomalies.push({
        metric: 'Revenue',
        value: avgRevenue,
        expected: historical.revenue?.forecast || 0,
        confidence: 0.85,
      });
    }

    return anomalies;
  }

  // Helper methods
  private async getPreviousPeriodRevenue(startDate: Date, endDate: Date): Promise<number> {
    const duration = endDate.getTime() - startDate.getTime();
    const prevEndDate = new Date(startDate.getTime());
    const prevStartDate = new Date(startDate.getTime() - duration);

    const payments = await prisma.payment.findMany({
      where: {
        createdAt: {
          gte: prevStartDate,
          lte: prevEndDate,
        },
        status: 'COMPLETED',
      },
    });

    return payments.reduce((sum, payment) => sum + Number(payment.amount), 0);
  }

  private async getHistoricalData() {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 90); // 90 days of data

    return await this.getBusinessMetrics('90d');
  }

  private async generateRevenueForecast(): Promise<number[]> {
    // Simplified forecast - in production, use more sophisticated ML models
    const historical = await this.getHistoricalData();
    const currentRevenue = historical.revenue.total;
    const growthRate = historical.revenue.growth / 100;

    return Array.from({ length: 12 }, (_, i) => 
      currentRevenue * Math.pow(1 + growthRate, i + 1)
    );
  }

  private async generateUserGrowthForecast(): Promise<number[]> {
    const historical = await this.getHistoricalData();
    const currentUsers = historical.users.total;
    const growthRate = 0.15; // Simplified 15% growth

    return Array.from({ length: 12 }, (_, i) => 
      Math.round(currentUsers * Math.pow(1 + growthRate, i + 1))
    );
  }

  private async identifyChurnRisk(): Promise<{ userId: string; risk: number; factors: string[] }[]> {
    const users = await prisma.user.findMany({
      where: {
        status: 'ACTIVE',
      },
      include: {
        // subscription: true, // TODO: Add subscription model if needed
        projects: true,
      },
    });

    return users.map(user => {
      let risk = 0;
      const factors = [];

      // Low activity
      const daysSinceActive = user.lastActiveAt 
        ? (Date.now() - user.lastActiveAt.getTime()) / (1000 * 60 * 60 * 24)
        : 30;
      
      if (daysSinceActive > 14) {
        risk += 0.3;
        factors.push('Low activity');
      }

      // No projects
      if (user.projects.length === 0) {
        risk += 0.4;
        factors.push('No projects created');
      }

      // Payment issues - TODO: Add subscription check when model is available
      // if (user.subscription?.status !== 'active') {
      //   risk += 0.5;
      //   factors.push('Payment issues');
      // }

      return {
        userId: user.id,
        risk: Math.min(risk, 1),
        factors,
      };
    }).filter(u => u.risk > 0.4).sort((a, b) => b.risk - a.risk);
  }

  // 📊 Real-time Dashboard Data
  async getDashboardData() {
    const metrics = await this.getBusinessMetrics('30d');
    const insights = await this.generateMLInsights();

    return {
      metrics,
      insights,
      lastUpdated: new Date(),
    };
  }
}

export const analytics = new AdvancedAnalytics();
