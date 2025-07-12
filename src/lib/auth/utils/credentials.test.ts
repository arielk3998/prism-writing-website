import { describe, it, expect } from 'vitest';
import { hashPassword, verifyPassword } from './credentials';

describe('Credential Utilities', () => {
  it('should hash a password', async () => {
    const password = 'password123';
    const hashedPassword = await hashPassword(password);
    expect(hashedPassword).toBeDefined();
    expect(hashedPassword).not.toBe(password);
  });

  it('should verify a correct password', async () => {
    const password = 'password123';
    const hashedPassword = await hashPassword(password);
    const isValid = await verifyPassword(password, hashedPassword);
    expect(isValid).toBe(true);
  });

  it('should not verify an incorrect password', async () => {
    const password = 'password123';
    const incorrectPassword = 'password456';
    const hashedPassword = await hashPassword(password);
    const isValid = await verifyPassword(incorrectPassword, hashedPassword);
    expect(isValid).toBe(false);
  });
});