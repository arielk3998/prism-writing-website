type LogLevel = 'info' | 'warn' | 'error';

interface LogData {
  [key: string]: any;
}

const SENSITIVE_KEYS = ['password', 'token', 'refreshToken', 'passwordResetToken', 'emailVerificationToken'];

function sanitize(data: LogData): LogData {
  const sanitizedData: LogData = {};
  for (const key in data) {
    if (SENSITIVE_KEYS.includes(key)) {
      sanitizedData[key] = '[REDACTED]';
    } else if (typeof data[key] === 'object' && data[key] !== null) {
      sanitizedData[key] = sanitize(data[key]);
    } else {
      sanitizedData[key] = data[key];
    }
  }
  return sanitizedData;
}

function log(level: LogLevel, message: string, data?: LogData) {
  const timestamp = new Date().toISOString();
  const sanitizedData = data ? sanitize(data) : {};
  console[level](JSON.stringify({ timestamp, level, message, ...sanitizedData }));
}

export const logger = {
  info: (message: string, data?: LogData) => log('info', message, data),
  warn: (message: string, data?: LogData) => log('warn', message, data),
  error: (message: string, data?: LogData) => log('error', message, data),
};