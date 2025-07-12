// Core Services
export { register } from './services/register';
export { login } from './services/login';
export { logout } from './services/logout';
export { requestPasswordReset } from './services/request-password-reset';
export { resetPassword } from './services/reset-password';

// Middleware
export { requireAuth, requireAdmin } from './middleware/next';

// Type Definitions
export type { User, AuthResponse, Session, LoginCredentials, RegistrationPayload } from './types';
export { InvalidCredentialsError, UserExistsError, UnauthorizedError } from './types/errors';

// Utility Functions
export { hashPassword, verifyPassword } from './utils/credentials';
export { generateAuthToken, generateRefreshToken, verifyAuthToken } from './utils/token';
export { createSession, invalidateSession, cleanupExpiredSessions } from './utils/session';
export { sendVerificationEmail, verifyEmail, sendAndSaveVerificationEmail } from './utils/email-verification';
export { hasRole, withRole } from './utils/rbac';
export { logger } from './utils/logger';