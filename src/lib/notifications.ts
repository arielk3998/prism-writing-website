// Notifications System - Stub Version
// This is a stub implementation to resolve build issues

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
  inApp: boolean;
}

export class NotificationService {
  constructor() {
    console.log('NotificationService stub initialized');
  }

  async createNotification(
    userId: string,
    type: string,
    title: string,
    message: string,
    data?: any
  ): Promise<Notification> {
    console.log('STUB: createNotification called', { userId, type, title, message, data });
    return {
      id: 'stub-notification-id',
      userId,
      type,
      title,
      message,
      read: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  async getUserNotifications(userId: string, limit: number = 50): Promise<Notification[]> {
    console.log('STUB: getUserNotifications called for:', userId, 'limit:', limit);
    return [];
  }

  async markAsRead(notificationId: string): Promise<boolean> {
    console.log('STUB: markAsRead called for:', notificationId);
    return true;
  }

  async markAllAsRead(userId: string): Promise<boolean> {
    console.log('STUB: markAllAsRead called for:', userId);
    return true;
  }

  async deleteNotification(notificationId: string): Promise<boolean> {
    console.log('STUB: deleteNotification called for:', notificationId);
    return true;
  }

  async sendEmailNotification(email: string, subject: string, body: string): Promise<boolean> {
    console.log('STUB: sendEmailNotification called', { email, subject, body });
    return true;
  }

  async sendPushNotification(userId: string, title: string, body: string): Promise<boolean> {
    console.log('STUB: sendPushNotification called', { userId, title, body });
    return true;
  }

  async getUserPreferences(userId: string): Promise<NotificationPreferences> {
    console.log('STUB: getUserPreferences called for:', userId);
    return {
      email: true,
      push: true,
      sms: false,
      inApp: true
    };
  }

  async updateUserPreferences(userId: string, preferences: Partial<NotificationPreferences>): Promise<NotificationPreferences> {
    console.log('STUB: updateUserPreferences called', { userId, preferences });
    return {
      email: true,
      push: true,
      sms: false,
      inApp: true,
      ...preferences
    };
  }

  async getUnreadCount(userId: string): Promise<number> {
    console.log('STUB: getUnreadCount called for:', userId);
    return 0;
  }
}

// Export instance
export const notificationService = new NotificationService();

// Helper functions for compatibility
export const createNotification = async (userId: string, type: string, title: string, message: string, data?: any) => {
  return notificationService.createNotification(userId, type, title, message, data);
};

export const getUserNotifications = async (userId: string, limit?: number) => {
  return notificationService.getUserNotifications(userId, limit);
};

export const markAsRead = async (notificationId: string) => {
  return notificationService.markAsRead(notificationId);
};

export const markAllAsRead = async (userId: string) => {
  return notificationService.markAllAsRead(userId);
};

export const sendEmailNotification = async (email: string, subject: string, body: string) => {
  return notificationService.sendEmailNotification(email, subject, body);
};

export default notificationService;
