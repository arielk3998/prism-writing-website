// 🔔 Real-Time Notification System
// Phase 4: Production Features

import { prisma } from './database';

export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  category: string;
  isRead: boolean;
  actionUrl?: string;
  actionLabel?: string;
  createdAt: Date;
  expiresAt?: Date;
}

export interface NotificationPreferences {
  userId: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  categories: {
    [key: string]: boolean;
  };
}

class NotificationService {
  // 📨 Send Notification
  async sendNotification(
    userId: string,
    type: Notification['type'],
    title: string,
    message: string,
    category: string,
    actionUrl?: string,
    actionLabel?: string,
    expiresAt?: Date
  ): Promise<Notification> {
    try {
      const notification = await prisma.notification.create({
        data: {
          userId,
          type,
          title,
          message,
          category,
          actionUrl,
          actionLabel,
          expiresAt,
          isRead: false,
        },
      });

      // Send real-time notification via WebSocket/SSE
      await this.sendRealTimeNotification(userId, notification);

      // Send email if user preferences allow
      await this.sendEmailNotification(userId, notification);

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
          ...(unreadOnly ? { isRead: false } : {}),
          OR: [
            { expiresAt: null },
            { expiresAt: { gt: new Date() } },
          ],
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
          isRead: true,
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
          isRead: false,
        },
        data: {
          isRead: true,
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

  // 🧹 Clean Expired Notifications
  async cleanExpiredNotifications(): Promise<number> {
    try {
      const result = await prisma.notification.deleteMany({
        where: {
          expiresAt: {
            lt: new Date(),
          },
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
          isRead: false,
        },
      });

      const byCategory = await prisma.notification.groupBy({
        by: ['category'],
        where: { userId },
        _count: { category: true },
      });

      return {
        total,
        unread,
        read: total - unread,
        categories: byCategory.reduce((acc, item) => {
          acc[item.category] = item._count.category;
          return acc;
        }, {} as Record<string, number>),
      };
    } catch (error) {
      console.error('Error getting notification stats:', error);
      return { total: 0, unread: 0, read: 0, categories: {} };
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
          emailNotifications: true,
          pushNotifications: true,
          categories: {},
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
    category: string
  ): Promise<number> {
    try {
      const notifications = userIds.map(userId => ({
        userId,
        type,
        title,
        message,
        category,
        isRead: false,
      }));

      const result = await prisma.notification.createMany({
        data: notifications,
      });

      // Send real-time notifications
      for (const userId of userIds) {
        await this.sendRealTimeNotification(userId, {
          userId,
          type,
          title,
          message,
          category,
          isRead: false,
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
      'success',
      'Payment Received',
      `Payment of ${amount / 100} USD has been processed successfully.`,
      'payment',
      '/dashboard/billing',
      'View Details'
    );
  }

  async notifyProjectCompleted(userId: string, projectName: string): Promise<void> {
    await this.sendNotification(
      userId,
      'success',
      'Project Completed',
      `Your project "${projectName}" has been completed and is ready for review.`,
      'project',
      '/dashboard/projects',
      'View Project'
    );
  }

  async notifySubscriptionExpiring(userId: string, daysUntilExpiry: number): Promise<void> {
    await this.sendNotification(
      userId,
      'warning',
      'Subscription Expiring',
      `Your subscription will expire in ${daysUntilExpiry} days. Renew to continue access.`,
      'subscription',
      '/dashboard/billing',
      'Renew Now'
    );
  }

  async notifySystemMaintenance(userIds: string[], startTime: Date): Promise<void> {
    await this.sendBulkNotification(
      userIds,
      'info',
      'Scheduled Maintenance',
      `System maintenance is scheduled for ${startTime.toLocaleString()}. Expect brief service interruption.`,
      'system'
    );
  }

  // 🔧 Private Methods
  private async createDefaultPreferences(userId: string): Promise<NotificationPreferences> {
    const defaultPrefs: NotificationPreferences = {
      userId,
      emailNotifications: true,
      pushNotifications: true,
      categories: {
        payment: true,
        project: true,
        subscription: true,
        system: true,
        marketing: false,
      },
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
      if (!prefs?.emailNotifications || !prefs.categories[notification.category]) {
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
