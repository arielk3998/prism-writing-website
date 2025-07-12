/**
 * Authentication Context and Hooks
 * 
 * Provides React context for managing authentication state throughout
 * the member portal webapp.
 * 
 * @module AuthContext
 * @version 1.0.0
 */

'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, login, register, verifyToken, logout, LoginCredentials, RegisterData, UserStatus } from '../lib/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = !!user;

  // Initialize authentication state
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('prism-auth-token');
        if (token) {
          const tokenData = await verifyToken(token);
          if (tokenData) {
            // Convert TokenPayload to User object
            const userData: User = {
              id: tokenData.userId,
              email: tokenData.email,
              name: tokenData.email.split('@')[0], // Use email prefix as name
              role: tokenData.role,
              status: 'ACTIVE' as UserStatus, // Default status
              emailVerified: new Date(),
              createdAt: new Date(),
              updatedAt: new Date()
            };
            setUser(userData);
          } else {
            localStorage.removeItem('prism-auth-token');
          }
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        localStorage.removeItem('prism-auth-token');
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const handleLogin = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      setIsLoading(true);
      const result = await login(credentials);
      
      if (result && 'user' in result) {
        setUser(result.user);
        localStorage.setItem('prism-auth-token', result.tokens.accessToken);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data: RegisterData): Promise<boolean> => {
    try {
      setIsLoading(true);
      const result = await register(data);
      
      if (result && 'user' in result) {
        setUser(result.user);
        localStorage.setItem('prism-auth-token', result.tokens.accessToken);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async (): Promise<void> => {
    try {
      const token = localStorage.getItem('prism-auth-token');
      if (token) {
        await logout();
      }
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('prism-auth-token');
    }
  };

  const refreshUser = async (): Promise<void> => {
    try {
      const token = localStorage.getItem('prism-auth-token');
      if (token) {
        const tokenData = await verifyToken(token);
        if (tokenData) {
          // Convert TokenPayload to User object for refreshUser too
          const userData: User = {
            id: tokenData.userId,
            email: tokenData.email,
            name: tokenData.email.split('@')[0], // Use email prefix as name
            role: tokenData.role,
            status: 'ACTIVE' as UserStatus,
            emailVerified: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
          };
          setUser(userData);
        } else {
          await handleLogout();
        }
      }
    } catch (error) {
      console.error('User refresh failed:', error);
      await handleLogout();
    }
  };

  const contextValue: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Higher-order component for protected routes
interface WithAuthProps {
  fallback?: ReactNode;
  requiredRole?: User['role'];
}

export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options: WithAuthProps = {}
) {
  return function AuthenticatedComponent(props: P) {
    const { user, isAuthenticated, isLoading } = useAuth();
    const { fallback, requiredRole } = options;

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return fallback || <div>Please log in to access this content.</div>;
    }

    if (requiredRole && user?.role !== requiredRole) {
      return <div>You don&apos;t have permission to access this content.</div>;
    }

    return <Component {...props} />;
  };
}

// Hook for role-based access control
export function usePermissions() {
  const { user } = useAuth();

  const hasPermission = (permission: string): boolean => {
    return user?.permissions.includes(permission) ?? false;
  };

  const hasRole = (role: User['role']): boolean => {
    return user?.role === role;
  };

  const hasAnyRole = (roles: User['role'][]): boolean => {
    return user ? roles.includes(user.role) : false;
  };

  return {
    hasPermission,
    hasRole,
    hasAnyRole,
    user,
  };
}
