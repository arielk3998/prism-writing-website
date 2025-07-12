// Temporary types until Prisma client is generated
export interface PrismaUser {
  id: string;
  email: string;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  passwordHash: string;
  role: string;
  status: string;
  lockoutUntil: Date | null;
  loginAttempts: number;
  emailVerified: Date | null;
  lastLogin: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSession {
  id: string;
  userId: string;
  sessionToken: string;
  expires: Date;
  createdAt: Date;
}

export type User = Omit<PrismaUser, 'passwordHash'>;

export type Session = UserSession;

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
  refreshToken?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegistrationPayload {
  email: string;
  password: string;
  name?: string;
}