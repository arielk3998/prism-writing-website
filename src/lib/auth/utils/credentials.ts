import * as bcrypt from 'bcryptjs';

/**
 * Hashes a password using bcrypt.
 * @param password The plain-text password to hash.
 * @returns A promise that resolves to the hashed password.
 */
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}

/**
 * Verifies a password against a hash.
 * @param password The plain-text password to verify.
 * @param hashedPassword The hashed password to compare against.
 * @returns A promise that resolves to true if the password is valid, otherwise false.
 */
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}