import { describe, it, expect, vi } from 'vitest';
import { hasRole, withRole } from './rbac';
import { User } from '../types';
import { UnauthorizedError } from '../types/errors';

describe('RBAC Utilities', () => {
  const adminUser: User = {
    id: '1',
    email: 'admin@example.com',
    role: 'ADMIN',
    status: 'ACTIVE',
    name: 'Admin User',
    lockedUntil: null,
    failedLoginAttempts: 0,
    emailVerified: null,
    emailVerificationToken: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLoginAt: null,
    passwordResetToken: null,
    passwordResetExpires: null
  };

  const clientUser: User = {
    id: '2',
    email: 'client@example.com',
    role: 'CLIENT',
    status: 'ACTIVE',
    name: 'Client User',
    lockedUntil: null,
    failedLoginAttempts: 0,
    emailVerified: null,
    emailVerificationToken: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLoginAt: null,
    passwordResetToken: null,
    passwordResetExpires: null
  };

  describe('hasRole', () => {
    it('should return true if the user has the specified role', () => {
      expect(hasRole(adminUser, 'ADMIN')).toBe(true);
    });

    it('should return false if the user does not have the specified role', () => {
      expect(hasRole(clientUser, 'ADMIN')).toBe(false);
    });
  });

  describe('withRole', () => {
    it('should call the handler if the user has the required role', () => {
      const handler = vi.fn();
      const protectedHandler = withRole('ADMIN', handler);
      
      protectedHandler(adminUser);
      expect(handler).toHaveBeenCalled();
    });

    it('should throw UnauthorizedError if the user does not have the required role', () => {
      const handler = vi.fn();
      const protectedHandler = withRole('ADMIN', handler);
      
      expect(() => protectedHandler(clientUser)).toThrow(new UnauthorizedError('You must have the ADMIN role to perform this action.'));
      expect(handler).not.toHaveBeenCalled();
    });
  });
});
