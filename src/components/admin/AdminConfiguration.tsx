/**
 * Administrative Configuration Component
 * 
 * Industry-standard administrative settings panel with comprehensive
 * system management features, security controls, and monitoring tools.
 * 
 * @module AdminConfig
 * @version 1.0.0
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ModernButton } from '../ui/ModernComponents';

interface AdminSettings {
  security: {
    sessionTimeout: number; // minutes
    maxLoginAttempts: number;
    passwordPolicy: {
      minLength: number;
      requireUppercase: boolean;
      requireLowercase: boolean;
      requireNumbers: boolean;
      requireSpecialChars: boolean;
      maxAge: number; // days
    };
    twoFactorAuth: boolean;
    ipWhitelist: string[];
    auditLogging: boolean;
  };
  system: {
    maintenanceMode: boolean;
    backupFrequency: 'daily' | 'weekly' | 'monthly';
    logRetention: number; // days
    maxFileSize: number; // MB
    allowedFileTypes: string[];
    rateLimiting: {
      enabled: boolean;
      requestsPerMinute: number;
    };
  };
  notifications: {
    emailNotifications: boolean;
    securityAlerts: boolean;
    systemUpdates: boolean;
    userRegistrations: boolean;
    adminEmail: string;
  };
  content: {
    autoModerationEnabled: boolean;
    contentApprovalRequired: boolean;
    spamFilterEnabled: boolean;
    profanityFilterEnabled: boolean;
  };
}

const defaultSettings: AdminSettings = {
  security: {
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    passwordPolicy: {
      minLength: 12,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      maxAge: 90
    },
    twoFactorAuth: true,
    ipWhitelist: [],
    auditLogging: true
  },
  system: {
    maintenanceMode: false,
    backupFrequency: 'daily',
    logRetention: 365,
    maxFileSize: 100,
    allowedFileTypes: ['.pdf', '.doc', '.docx', '.txt', '.md'],
    rateLimiting: {
      enabled: true,
      requestsPerMinute: 60
    }
  },
  notifications: {
    emailNotifications: true,
    securityAlerts: true,
    systemUpdates: true,
    userRegistrations: true,
    adminEmail: 'admin@prismwriting.com'
  },
  content: {
    autoModerationEnabled: true,
    contentApprovalRequired: false,
    spamFilterEnabled: true,
    profanityFilterEnabled: true
  }
};

export function AdminConfiguration() {
  const [settings, setSettings] = useState<AdminSettings>(defaultSettings);
  const [activeTab, setActiveTab] = useState<'security' | 'system' | 'notifications' | 'content'>('security');
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load settings from localStorage or API
    const savedSettings = localStorage.getItem('prism-admin-settings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (e) {
        console.error('Failed to load admin settings:', e);
      }
    }
  }, []);

  const updateSettings = (section: keyof AdminSettings, key: string, value: string | number | boolean) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  const updateNestedSettings = (section: keyof AdminSettings, parentKey: string, key: string, value: string | number | boolean) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [parentKey]: {
          ...(prev[section] as Record<string, unknown>)[parentKey] as Record<string, unknown>,
          [key]: value
        }
      }
    }));
    setHasChanges(true);
  };

  const saveSettings = async () => {
    setIsLoading(true);
    try {
      // Save to localStorage (in production, this would be an API call)
      localStorage.setItem('prism-admin-settings', JSON.stringify(settings));
      setHasChanges(false);
      
      // Show success message
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('Failed to save settings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetToDefaults = () => {
    if (confirm('Are you sure you want to reset all settings to defaults? This action cannot be undone.')) {
      setSettings(defaultSettings);
      setHasChanges(true);
    }
  };

  const tabs = [
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'system', label: 'System', icon: '⚙️' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'content', label: 'Content', icon: '📝' }
  ] as const;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-safe">
          Administrative Configuration
        </h2>
        <div className="flex space-x-3">
          <ModernButton
            variant="outline"
            size="sm"
            onClick={resetToDefaults}
          >
            Reset to Defaults
          </ModernButton>
          <ModernButton
            variant="primary"
            size="sm"
            onClick={saveSettings}
            isLoading={isLoading}
            disabled={!hasChanges}
          >
            Save Changes
          </ModernButton>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-all ${
              activeTab === tab.id
                ? 'bg-white dark:bg-gray-600 text-safe-accent shadow-sm'
                : 'text-safe-muted hover:text-safe dark:hover:text-white'
            }`}
          >
            <span>{tab.icon}</span>
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {activeTab === 'security' && (
          <SecuritySettings
            settings={settings.security}
            updateSettings={(key, value) => updateSettings('security', key, value)}
            updateNestedSettings={(parentKey, key, value) => updateNestedSettings('security', parentKey, key, value)}
          />
        )}

        {activeTab === 'system' && (
          <SystemSettings
            settings={settings.system}
            updateSettings={(key, value) => updateSettings('system', key, value)}
            updateNestedSettings={(parentKey, key, value) => updateNestedSettings('system', parentKey, key, value)}
          />
        )}

        {activeTab === 'notifications' && (
          <NotificationSettings
            settings={settings.notifications}
            updateSettings={(key, value) => updateSettings('notifications', key, value)}
          />
        )}

        {activeTab === 'content' && (
          <ContentSettings
            settings={settings.content}
            updateSettings={(key, value) => updateSettings('content', key, value)}
          />
        )}
      </motion.div>

      {hasChanges && (
        <div className="mt-6 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
          <p className="text-sm text-safe-warning dark:text-yellow-200">
            ⚠️ You have unsaved changes. Don&apos;t forget to save your configuration.
          </p>
        </div>
      )}
    </div>
  );
}

// Security Settings Component
function SecuritySettings({ 
  settings, 
  updateSettings, 
  updateNestedSettings 
}: {
  settings: AdminSettings['security'];
  updateSettings: (key: string, value: string | number | boolean) => void;
  updateNestedSettings: (parentKey: string, key: string, value: string | number | boolean) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-safe mb-2">
            Session Timeout (minutes)
          </label>
          <input
            type="number"
            value={settings.sessionTimeout}
            onChange={(e) => updateSettings('sessionTimeout', parseInt(e.target.value))}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-safe"
            min="5"
            max="480"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-safe mb-2">
            Max Login Attempts
          </label>
          <input
            type="number"
            value={settings.maxLoginAttempts}
            onChange={(e) => updateSettings('maxLoginAttempts', parseInt(e.target.value))}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-safe"
            min="3"
            max="10"
          />
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-safe mb-4">Password Policy</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-safe mb-2">
              Minimum Length
            </label>
            <input
              type="number"
              value={settings.passwordPolicy.minLength}
              onChange={(e) => updateNestedSettings('passwordPolicy', 'minLength', parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-safe"
              min="8"
              max="50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-safe mb-2">
              Max Age (days)
            </label>
            <input
              type="number"
              value={settings.passwordPolicy.maxAge}
              onChange={(e) => updateNestedSettings('passwordPolicy', 'maxAge', parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-safe"
              min="30"
              max="365"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {[
            { key: 'requireUppercase', label: 'Uppercase' },
            { key: 'requireLowercase', label: 'Lowercase' },
            { key: 'requireNumbers', label: 'Numbers' },
            { key: 'requireSpecialChars', label: 'Special Chars' }
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={settings.passwordPolicy[key as keyof typeof settings.passwordPolicy] as boolean}
                onChange={(e) => updateNestedSettings('passwordPolicy', key, e.target.checked)}
                className="rounded border-gray-300 text-safe-accent focus:ring-blue-500"
              />
              <span className="text-sm text-safe">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { key: 'twoFactorAuth', label: 'Two-Factor Authentication' },
          { key: 'auditLogging', label: 'Audit Logging' }
        ].map(({ key, label }) => (
          <label key={key} className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={settings[key as keyof typeof settings] as boolean}
              onChange={(e) => updateSettings(key, e.target.checked)}
              className="rounded border-gray-300 text-safe-accent focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-safe">{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

// System Settings Component
function SystemSettings({ 
  settings, 
  updateSettings, 
  updateNestedSettings 
}: {
  settings: AdminSettings['system'];
  updateSettings: (key: string, value: string | number | boolean) => void;
  updateNestedSettings: (parentKey: string, key: string, value: string | number | boolean) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-safe mb-2">
            Backup Frequency
          </label>
          <select
            value={settings.backupFrequency}
            onChange={(e) => updateSettings('backupFrequency', e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-safe"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-safe mb-2">
            Log Retention (days)
          </label>
          <input
            type="number"
            value={settings.logRetention}
            onChange={(e) => updateSettings('logRetention', parseInt(e.target.value))}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-safe"
            min="30"
            max="2555"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-safe mb-2">
            Max File Size (MB)
          </label>
          <input
            type="number"
            value={settings.maxFileSize}
            onChange={(e) => updateSettings('maxFileSize', parseInt(e.target.value))}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-safe"
            min="1"
            max="1000"
          />
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-safe mb-4">Rate Limiting</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={settings.rateLimiting.enabled}
              onChange={(e) => updateNestedSettings('rateLimiting', 'enabled', e.target.checked)}
              className="rounded border-gray-300 text-safe-accent focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-safe">Enable Rate Limiting</span>
          </label>

          <div>
            <label className="block text-sm font-medium text-safe mb-2">
              Requests per Minute
            </label>
            <input
              type="number"
              value={settings.rateLimiting.requestsPerMinute}
              onChange={(e) => updateNestedSettings('rateLimiting', 'requestsPerMinute', parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-safe"
              min="10"
              max="1000"
              disabled={!settings.rateLimiting.enabled}
            />
          </div>
        </div>
      </div>

      <label className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={settings.maintenanceMode}
          onChange={(e) => updateSettings('maintenanceMode', e.target.checked)}
          className="rounded border-gray-300 text-safe-accent focus:ring-blue-500"
        />
        <span className="text-sm font-medium text-safe">Maintenance Mode</span>
      </label>

      {settings.maintenanceMode && (
        <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
          <p className="text-sm text-safe-warning dark:text-yellow-200">
            ⚠️ Maintenance mode is enabled. Only administrators can access the system.
          </p>
        </div>
      )}
    </div>
  );
}

// Notification Settings Component
function NotificationSettings({ 
  settings, 
  updateSettings 
}: {
  settings: AdminSettings['notifications'];
  updateSettings: (key: string, value: string | number | boolean) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-safe mb-2">
          Admin Email Address
        </label>
        <input
          type="email"
          value={settings.adminEmail}
          onChange={(e) => updateSettings('adminEmail', e.target.value)}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-safe"
          placeholder="admin@prismwriting.com"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { key: 'emailNotifications', label: 'Email Notifications' },
          { key: 'securityAlerts', label: 'Security Alerts' },
          { key: 'systemUpdates', label: 'System Updates' },
          { key: 'userRegistrations', label: 'User Registrations' }
        ].map(({ key, label }) => (
          <label key={key} className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={settings[key as keyof typeof settings] as boolean}
              onChange={(e) => updateSettings(key, e.target.checked)}
              className="rounded border-gray-300 text-safe-accent focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-safe">{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

// Content Settings Component
function ContentSettings({ 
  settings, 
  updateSettings 
}: {
  settings: AdminSettings['content'];
  updateSettings: (key: string, value: string | number | boolean) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { key: 'autoModerationEnabled', label: 'Auto Moderation' },
          { key: 'contentApprovalRequired', label: 'Content Approval Required' },
          { key: 'spamFilterEnabled', label: 'Spam Filter' },
          { key: 'profanityFilterEnabled', label: 'Profanity Filter' }
        ].map(({ key, label }) => (
          <label key={key} className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={settings[key as keyof typeof settings] as boolean}
              onChange={(e) => updateSettings(key, e.target.checked)}
              className="rounded border-gray-300 text-safe-accent focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-safe">{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
