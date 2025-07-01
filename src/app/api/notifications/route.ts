// 🔔 Notifications API Endpoint
// Phase 4: Production Features

import { NextRequest, NextResponse } from 'next/server';
import { notificationService } from '@/lib/notifications';
import { requireAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const authResult = await requireAuth(request);
    if ('error' in authResult) {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const unreadOnly = searchParams.get('unreadOnly') === 'true';
    const stats = searchParams.get('stats') === 'true';

    if (stats) {
      const notificationStats = await notificationService.getNotificationStats(authResult.user.id);
      return NextResponse.json({
        success: true,
        data: notificationStats,
      });
    }

    const notifications = await notificationService.getUserNotifications(
      authResult.user.id,
      limit,
      unreadOnly
    );

    return NextResponse.json({
      success: true,
      data: notifications,
    });

  } catch (error) {
    console.error('Notifications API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await requireAuth(request);
    if ('error' in authResult) {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { action, notificationId, data } = body;

    switch (action) {
      case 'markAsRead':
        if (!notificationId) {
          return NextResponse.json(
            { error: 'Notification ID is required' },
            { status: 400 }
          );
        }
        
        const success = await notificationService.markAsRead(notificationId, authResult.user.id);
        return NextResponse.json({
          success,
          message: success ? 'Notification marked as read' : 'Failed to mark notification as read',
        });

      case 'markAllAsRead':
        const allSuccess = await notificationService.markAllAsRead(authResult.user.id);
        return NextResponse.json({
          success: allSuccess,
          message: allSuccess ? 'All notifications marked as read' : 'Failed to mark all notifications as read',
        });

      case 'delete':
        if (!notificationId) {
          return NextResponse.json(
            { error: 'Notification ID is required' },
            { status: 400 }
          );
        }
        
        const deleteSuccess = await notificationService.deleteNotification(notificationId, authResult.user.id);
        return NextResponse.json({
          success: deleteSuccess,
          message: deleteSuccess ? 'Notification deleted' : 'Failed to delete notification',
        });

      case 'updatePreferences':
        if (!data) {
          return NextResponse.json(
            { error: 'Preferences data is required' },
            { status: 400 }
          );
        }
        
        const prefSuccess = await notificationService.updateUserPreferences(authResult.user.id, data);
        return NextResponse.json({
          success: prefSuccess,
          message: prefSuccess ? 'Preferences updated' : 'Failed to update preferences',
        });

      case 'send':
        // Admin only action
        if (authResult.user.role !== 'ADMIN') {
          return NextResponse.json(
            { error: 'Admin access required' },
            { status: 403 }
          );
        }

        const { userId, type, title, message, category, actionUrl, actionLabel } = data;
        if (!userId || !type || !title || !message || !category) {
          return NextResponse.json(
            { error: 'Missing required notification data' },
            { status: 400 }
          );
        }

        const notification = await notificationService.sendNotification(
          userId,
          type,
          title,
          message,
          actionUrl,
          { category, actionLabel }
        );

        return NextResponse.json({
          success: true,
          data: notification,
          message: 'Notification sent successfully',
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Notifications POST error:', error);
    return NextResponse.json(
      { error: 'Failed to process notification request' },
      { status: 500 }
    );
  }
}
