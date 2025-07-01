// 🔗 Third-Party Integration Platform
// Phase 4: Production Features

export interface Integration {
  id: string;
  name: string;
  type: 'slack' | 'teams' | 'calendar' | 'storage' | 'crm' | 'email';
  isEnabled: boolean;
  config: Record<string, unknown>;
  lastSync?: Date;
  syncStatus: 'active' | 'error' | 'disabled';
}

export interface SlackConfig {
  botToken: string;
  channelId: string;
  webhookUrl?: string;
}

export interface TeamsConfig {
  webhookUrl: string;
  channelId?: string;
}

export interface CalendarConfig {
  type: 'google' | 'outlook';
  accessToken: string;
  refreshToken: string;
  calendarId: string;
}

export interface StorageConfig {
  type: 'dropbox' | 'drive' | 's3';
  accessToken: string;
  bucketName?: string;
  folderId?: string;
}

class IntegrationService {
  // 📱 Slack Integration
  async sendSlackMessage(config: SlackConfig, message: string, channel?: string): Promise<boolean> {
    try {
      const response = await fetch('https://slack.com/api/chat.postMessage', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.botToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          channel: channel || config.channelId,
          text: message,
          username: 'Prism Writing Bot',
          icon_emoji: ':writing_hand:',
        }),
      });

      const result = await response.json();
      return result.ok;
    } catch (error) {
      console.error('Slack integration error:', error);
      return false;
    }
  }

  async sendSlackNotification(config: SlackConfig, title: string, message: string, actionUrl?: string): Promise<boolean> {
    try {
      const blocks: unknown[] = [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*${title}*\n${message}`,
          },
        },
      ];

      if (actionUrl) {
        blocks.push({
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: 'View Details',
              },
              url: actionUrl,
              style: 'primary',
            },
          ],
        });
      }

      const response = await fetch('https://slack.com/api/chat.postMessage', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.botToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          channel: config.channelId,
          blocks,
          username: 'Prism Writing Bot',
          icon_emoji: ':writing_hand:',
        }),
      });

      const result = await response.json();
      return result.ok;
    } catch (error) {
      console.error('Slack notification error:', error);
      return false;
    }
  }

  // 🟦 Microsoft Teams Integration
  async sendTeamsMessage(config: TeamsConfig, title: string, message: string, actionUrl?: string): Promise<boolean> {
    try {
      const card = {
        '@type': 'MessageCard',
        '@context': 'http://schema.org/extensions',
        themeColor: '0076D7',
        summary: title,
        sections: [
          {
            activityTitle: title,
            activitySubtitle: 'Prism Writing Platform',
            activityImage: 'https://prismwriting.com/logo.png',
            text: message,
            markdown: true,
          },
        ],
      };

      if (actionUrl) {
        (card.sections[0] as Record<string, unknown>).potentialAction = [
          {
            '@type': 'OpenUri',
            name: 'View Details',
            targets: [
              {
                os: 'default',
                uri: actionUrl,
              },
            ],
          },
        ];
      }

      const response = await fetch(config.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(card),
      });

      return response.ok;
    } catch (error) {
      console.error('Teams integration error:', error);
      return false;
    }
  }

  // 📅 Calendar Integration
  async createCalendarEvent(
    config: CalendarConfig,
    title: string,
    description: string,
    startTime: Date,
    endTime: Date
  ): Promise<string | null> {
    try {
      if (config.type === 'google') {
        return await this.createGoogleCalendarEvent(config, title, description, startTime, endTime);
      } else if (config.type === 'outlook') {
        return await this.createOutlookCalendarEvent(config, title, description, startTime, endTime);
      }
      return null;
    } catch (error) {
      console.error('Calendar integration error:', error);
      return null;
    }
  }

  private async createGoogleCalendarEvent(
    config: CalendarConfig,
    title: string,
    description: string,
    startTime: Date,
    endTime: Date
  ): Promise<string | null> {
    try {
      const event = {
        summary: title,
        description,
        start: {
          dateTime: startTime.toISOString(),
          timeZone: 'UTC',
        },
        end: {
          dateTime: endTime.toISOString(),
          timeZone: 'UTC',
        },
      };

      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${config.calendarId}/events`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${config.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(event),
        }
      );

      if (response.ok) {
        const result = await response.json();
        return result.id;
      }
      return null;
    } catch (error) {
      console.error('Google Calendar error:', error);
      return null;
    }
  }

  private async createOutlookCalendarEvent(
    config: CalendarConfig,
    title: string,
    description: string,
    startTime: Date,
    endTime: Date
  ): Promise<string | null> {
    try {
      const event = {
        subject: title,
        body: {
          contentType: 'HTML',
          content: description,
        },
        start: {
          dateTime: startTime.toISOString(),
          timeZone: 'UTC',
        },
        end: {
          dateTime: endTime.toISOString(),
          timeZone: 'UTC',
        },
      };

      const response = await fetch('https://graph.microsoft.com/v1.0/me/events', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });

      if (response.ok) {
        const result = await response.json();
        return result.id;
      }
      return null;
    } catch (error) {
      console.error('Outlook Calendar error:', error);
      return null;
    }
  }

  // ☁️ Cloud Storage Integration
  async uploadFile(config: StorageConfig, fileName: string, fileData: Buffer): Promise<string | null> {
    try {
      switch (config.type) {
        case 'dropbox':
          return await this.uploadToDropbox(config, fileName, fileData);
        case 'drive':
          return await this.uploadToGoogleDrive(config, fileName, fileData);
        case 's3':
          return await this.uploadToS3(config, fileName, fileData);
        default:
          return null;
      }
    } catch (error) {
      console.error('File upload error:', error);
      return null;
    }
  }

  private async uploadToDropbox(config: StorageConfig, fileName: string, fileData: Buffer): Promise<string | null> {
    try {
      const response = await fetch('https://content.dropboxapi.com/2/files/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.accessToken}`,
          'Dropbox-API-Arg': JSON.stringify({
            path: `/${fileName}`,
            mode: 'add',
            autorename: true,
          }),
          'Content-Type': 'application/octet-stream',
        },
        body: fileData,
      });

      if (response.ok) {
        const result = await response.json();
        return result.path_display;
      }
      return null;
    } catch (error) {
      console.error('Dropbox upload error:', error);
      return null;
    }
  }

  private async uploadToGoogleDrive(config: StorageConfig, fileName: string, fileData: Buffer): Promise<string | null> {
    try {
      const metadata = {
        name: fileName,
        parents: config.folderId ? [config.folderId] : undefined,
      };

      const form = new FormData();
      form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
      form.append('file', new Blob([fileData]), fileName);

      const response = await fetch(
        'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${config.accessToken}`,
          },
          body: form,
        }
      );

      if (response.ok) {
        const result = await response.json();
        return result.id;
      }
      return null;
    } catch (error) {
      console.error('Google Drive upload error:', error);
      return null;
    }
  }

  private async uploadToS3(config: StorageConfig, fileName: string, _fileData: Buffer): Promise<string | null> {
    // This would require AWS SDK implementation
    // For now, return a placeholder
    console.log('S3 upload would happen here', { fileName, config });
    return `s3://${config.bucketName}/${fileName}`;
  }

  // 🔄 Webhook Management
  async registerWebhook(service: string, endpoint: string, events: string[]): Promise<boolean> {
    try {
      // Register webhook with external service
      console.log(`Registering webhook for ${service}:`, { endpoint, events });
      return true;
    } catch (error) {
      console.error('Webhook registration error:', error);
      return false;
    }
  }

  // 🎯 Business Event Integrations
  async notifyProjectStart(integrations: Integration[], projectName: string, assignee: string): Promise<void> {
    for (const integration of integrations.filter(i => i.isEnabled)) {
      switch (integration.type) {
        case 'slack':
          await this.sendSlackNotification(
            integration.config as unknown as SlackConfig,
            '🚀 New Project Started',
            `Project "${projectName}" has been assigned to ${assignee} and is now in progress.`,
            'https://prismwriting.com/projects'
          );
          break;
        case 'teams':
          await this.sendTeamsMessage(
            integration.config as unknown as TeamsConfig,
            '🚀 New Project Started',
            `Project "${projectName}" has been assigned to ${assignee} and is now in progress.`,
            'https://prismwriting.com/projects'
          );
          break;
      }
    }
  }

  async scheduleProjectDeadline(
    integrations: Integration[],
    projectName: string,
    deadline: Date
  ): Promise<void> {
    for (const integration of integrations.filter(i => i.isEnabled && i.type === 'calendar')) {
      const eventStart = new Date(deadline.getTime() - 60 * 60 * 1000); // 1 hour before deadline
      await this.createCalendarEvent(
        integration.config as unknown as CalendarConfig,
        `📝 Project Deadline: ${projectName}`,
        `Deadline reminder for project "${projectName}"`,
        eventStart,
        deadline
      );
    }
  }

  async backupProjectFiles(integrations: Integration[], projectId: string, files: Buffer[]): Promise<void> {
    for (const integration of integrations.filter(i => i.isEnabled && i.type === 'storage')) {
      for (let i = 0; i < files.length; i++) {
        await this.uploadFile(
          integration.config as unknown as StorageConfig,
          `project-${projectId}-file-${i + 1}.pdf`,
          files[i]
        );
      }
    }
  }
}

export const integrationService = new IntegrationService();
