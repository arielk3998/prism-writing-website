// 🔔 Real-Time Notification System
// Phase 4: Production Features

import { prisma } from './database';

export interface Notification {
  id: string;
  userId: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR' | 'SYSTEM' | 'PROJECT' | 'TASK' | 'INVOICE' | 'PAYMENT';
  title: string;
  message: string;
  status: 'UNREAD' | 'READ' | 'ARCHIVED';
  actionUrl?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  readAt?: Date;
}

export interface NotificationPreferences {
  id: string;
  userId: string;
  emailEnabled: boolean;
  pushEnabled: boolean;
  smsEnabled: boolean;
  projectUpdates: boolean;
  taskReminders: boolean;
  invoiceUpdates: boolean;
  systemAlerts: boolean;
  marketing: boolean;
}

class NotificationService {
  // 📨 Send Notification
  async sendNotification(
    userId: string,
    type: Notification['type'],
    title: string,
    message: string,
    actionUrl?: string,
    metadata?: Record<string, any>
  ): Promise<Notification> {
    try {
      const notification = await prisma.notification.create({
        data: {
          userId,
          type,
          title,
          message,
          actionUrl,
          metadata
        }
      });

      // Send real-time notification via WebSocket/SSE
      await this.sendRealTimeNotification(userId, notification as Notification);

      // Send email if user preferences allow
      await this.sendEmailNotification(userId, notification as Notification);

      return notification as Notification;
    } catch (error) {
      console.error('Error sending notification:', error);
      throw error;
    }
  }

  // 📋 Get User Notifications
  async getUserNotifications(
    userId: string,
    limit = 50,
    unreadOnly = false
  ): Promise<Notification[]> {
    try {
      const notifications = await prisma.notification.findMany({
        where: {
          userId,
          ...(unreadOnly ? { status: 'UNREAD' } : {}),
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
      });

      return notifications as Notification[];
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return [];
    }
  }

  // ✅ Mark as Read
  async markAsRead(notificationId: string, userId: string): Promise<boolean> {
    try {
      await prisma.notification.updateMany({
        where: {
          id: notificationId,
          userId,
        },
        data: {
          status: 'READ',
          readAt: new Date(),
        },
      });
      return true;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      return false;
    }
  }

  // ✅ Mark All as Read
  async markAllAsRead(userId: string): Promise<boolean> {
    try {
      await prisma.notification.updateMany({
        where: {
          userId,
          status: 'UNREAD',
        },
        data: {
          status: 'READ',
          readAt: new Date(),
        },
      });
      return true;
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      return false;
    }
  }

  // 🗑️ Delete Notification
  async deleteNotification(notificationId: string, userId: string): Promise<boolean> {
    try {
      await prisma.notification.deleteMany({
        where: {
          id: notificationId,
          userId,
        },
      });
      return true;
    } catch (error) {
      console.error('Error deleting notification:', error);
      return false;
    }
  }

  // 🧹 Clean Expired Notifications (based on age)
  async cleanExpiredNotifications(maxAgeDays: number = 30): Promise<number> {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - maxAgeDays);
      
      const result = await prisma.notification.deleteMany({
        where: {
          createdAt: {
            lt: cutoffDate,
          },
          status: 'READ', // Only clean read notifications
        },
      });
      return result.count;
    } catch (error) {
      console.error('Error cleaning expired notifications:', error);
      return 0;
    }
  }

  // 📊 Get Notification Stats
  async getNotificationStats(userId: string) {
    try {
      const total = await prisma.notification.count({
        where: { userId },
      });

      const unread = await prisma.notification.count({
        where: {
          userId,
          status: 'UNREAD',
        },
      });

      const byType = await prisma.notification.groupBy({
        by: ['type'],
        where: { userId },
        _count: { type: true },
      });

      return {
        total,
        unread,
        read: total - unread,
        types: byType.reduce((acc, item) => {
          acc[item.type] = item._count.type;
          return acc;
        }, {} as Record<string, number>),
      };
    } catch (error) {
      console.error('Error getting notification stats:', error);
      return { total: 0, unread: 0, read: 0, types: {} };
    }
  }

  // ⚙️ User Preferences
  async getUserPreferences(userId: string): Promise<NotificationPreferences | null> {
    try {
      const prefs = await prisma.notificationPreference.findUnique({
        where: { userId },
      });

      if (!prefs) {
        // Create default preferences
        return await this.createDefaultPreferences(userId);
      }

      return prefs as NotificationPreferences;
    } catch (error) {
      console.error('Error getting user preferences:', error);
      return null;
    }
  }

  async updateUserPreferences(
    userId: string,
    preferences: Partial<NotificationPreferences>
  ): Promise<boolean> {
    try {
      await prisma.notificationPreference.upsert({
        where: { userId },
        update: preferences,
        create: {
          userId,
          emailEnabled: true,
          pushEnabled: true,
          smsEnabled: false,
          projectUpdates: true,
          taskReminders: true,
          invoiceUpdates: true,
          systemAlerts: true,
          marketing: false,
          ...preferences,
        },
      });
      return true;
    } catch (error) {
      console.error('Error updating user preferences:', error);
      return false;
    }
  }

  // 🚀 Bulk Notifications
  async sendBulkNotification(
    userIds: string[],
    type: Notification['type'],
    title: string,
    message: string,
    metadata?: Record<string, unknown>
  ): Promise<number> {
    try {
      const notifications = userIds.map(userId => ({
        userId,
        type,
        title,
        message,
        metadata: metadata ? metadata as any : undefined
      }));

      const result = await prisma.notification.createMany({
        data: notifications,
      });

      // Send real-time notifications
      for (const userId of userIds) {
        await this.sendRealTimeNotification(userId, {
          id: `temp_${Date.now()}_${userId}`,
          userId,
          type,
          title,
          message,
          status: 'UNREAD' as const,
          metadata,
          createdAt: new Date(),
        } as Notification);
      }

      return result.count;
    } catch (error) {
      console.error('Error sending bulk notifications:', error);
      return 0;
    }
  }

  // 📱 Business Event Notifications
  async notifyPaymentReceived(userId: string, amount: number): Promise<void> {
    await this.sendNotification(
      userId,
      'SUCCESS',
      'Payment Received',
      `Payment of ${amount / 100} USD has been processed successfully.`,
      '/dashboard/billing',
      { category: 'payment' }
    );
  }

  async notifyProjectCompleted(userId: string, projectName: string): Promise<void> {
    await this.sendNotification(
      userId,
      'SUCCESS',
      'Project Completed',
      `Your project "${projectName}" has been completed and is ready for review.`,
      '/dashboard/projects',
      { category: 'project', projectName }
    );
  }

  async notifySubscriptionExpiring(userId: string, daysUntilExpiry: number): Promise<void> {
    await this.sendNotification(
      userId,
      'WARNING',
      'Subscription Expiring',
      `Your subscription will expire in ${daysUntilExpiry} days. Renew to continue access.`,
      '/dashboard/billing',
      { category: 'subscription', daysUntilExpiry }
    );
  }

  async notifySystemMaintenance(userIds: string[], startTime: Date): Promise<void> {
    await this.sendBulkNotification(
      userIds,
      'INFO',
      'Scheduled Maintenance',
      `System maintenance is scheduled for ${startTime.toLocaleString()}. Expect brief service interruption.`,
      { category: 'system', startTime: startTime.toISOString() }
    );
  }

  // 🔧 Private Methods
  private async createDefaultPreferences(userId: string): Promise<NotificationPreferences> {
    const defaultPrefs: NotificationPreferences = {
      id: '', // Will be generated by database
      userId,
      emailEnabled: true,
      pushEnabled: true,
      smsEnabled: false,
      projectUpdates: true,
      taskReminders: true,
      invoiceUpdates: true,
      systemAlerts: true,
      marketing: false,
    };

    await this.updateUserPreferences(userId, defaultPrefs);
    return defaultPrefs;
  }

  private async sendRealTimeNotification(userId: string, notification: Notification): Promise<void> {
    // In a real implementation, this would use WebSockets or Server-Sent Events
    // For now, we'll just log it
    console.log(`Real-time notification sent to user ${userId}:`, {
      type: notification.type,
      title: notification.title,
      message: notification.message,
    });
  }

  private async sendEmailNotification(userId: string, notification: Notification): Promise<void> {
    try {
      // Check user preferences
      const prefs = await this.getUserPreferences(userId);
      if (!prefs?.emailEnabled) {
        return;
      }

      // Get user email
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { email: true, firstName: true, lastName: true },
      });

      if (!user) return;

      // In a real implementation, send email via your email service
      console.log(`Email notification sent to ${user.email}:`, {
        type: notification.type,
        title: notification.title,
        message: notification.message,
      });
    } catch (error) {
      console.error('Error sending email notification:', error);
    }
  }
}

export const notificationService = new NotificationService();
