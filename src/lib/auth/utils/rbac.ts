import { User } from '../types';
import { UnauthorizedError } from '../types/errors';

/**
 * Checks if a user has a specific role.
 * @param user The user object.
 * @param role The role to check for.
 * @returns True if the user has the role, otherwise false.
 */
export function hasRole(user: User, role: string): boolean {
  return user.role === role;
}

/**
 * A higher-order function that protects a handler with a role check.
 * @param role The role required to access the handler.
 * @param handler The handler to protect.
 * @returns A new handler that performs the role check before executing the original handler.
 */
export function withRole<T extends any[], R>(
  role: string,
  handler: (user: User, ...args: T) => R
) {
  return (user: User, ...args: T): R => {
    if (!hasRole(user, role)) {
      throw new UnauthorizedError(`You must have the ${role} role to perform this action.`);
    }
    return handler(user, ...args);
  };
}